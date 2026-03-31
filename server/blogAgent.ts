/**
 * AI Blog Agent — generates and publishes SEO-optimized blog posts
 * using the built-in LLM helper. Each run:
 *   1. Picks a topic (keyword research via LLM)
 *   2. Creates an outline
 *   3. Writes the full article (1,500–2,000 words, human voice)
 *   4. Fills SEO fields
 *   5. Creates the blog post in the database and publishes it
 */

import { invokeLLM } from "./_core/llm";
import { getDb } from "./db";
import { agentRuns, blogPosts, blogCategories } from "../drizzle/schema";
import { eq, desc, sql } from "drizzle-orm";
import { invalidateSitemapCache } from "./seo";

// ─── DB Helpers ───────────────────────────────────────────────

export async function createAgentRun(data: {
  triggerType: "manual" | "scheduled";
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(agentRuns).values({
    status: "running",
    triggerType: data.triggerType,
  }).$returningId();
  return result.id;
}

export async function updateAgentRun(id: number, data: Partial<{
  status: "running" | "success" | "draft" | "failed";
  title: string;
  slug: string;
  primaryKeyword: string;
  postId: number;
  error: string;
  durationMs: number;
}>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(agentRuns).set(data).where(eq(agentRuns.id, id));
}

export async function listAgentRuns(limit = 50) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(agentRuns).orderBy(desc(agentRuns.createdAt)).limit(limit);
}

// ─── Slug helpers ─────────────────────────────────────────────

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 200);
}

async function ensureUniqueSlug(baseSlug: string): Promise<string> {
  let slug = baseSlug;
  let counter = 0;
  while (true) {
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const existing = await db.select({ id: blogPosts.id })
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);
    if (existing.length === 0) return slug;
    counter++;
    slug = `${baseSlug}-${counter}`;
  }
}

// ─── Get existing titles to avoid duplicates ──────────────────

async function getRecentTitles(): Promise<string[]> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const posts = await db.select({ title: blogPosts.title })
    .from(blogPosts)
    .orderBy(desc(blogPosts.createdAt))
    .limit(60);
  return posts.map((p: { title: string }) => p.title);
}

// ─── Get existing slugs for internal linking ──────────────────

async function getPublishedSlugs(): Promise<{ slug: string; title: string }[]> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const posts = await db.select({ slug: blogPosts.slug, title: blogPosts.title })
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishedAt))
    .limit(40);
  return posts;
}

// ─── Main generation pipeline ─────────────────────────────────

export async function runBlogAgent(triggerType: "manual" | "scheduled" = "manual") {
  const startTime = Date.now();
  const runId = await createAgentRun({ triggerType });

  try {
    // Step 1: Topic selection
    const recentTitles = await getRecentTitles();
    const publishedSlugs = await getPublishedSlugs();

    const topicResult = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are a dental health content strategist for DentaSmart, an AI-powered oral health app. Your job is to pick ONE blog topic that will drive organic search traffic and app downloads.

Target audience: everyday people with dental questions (not dental professionals). Focus on uninsured or confused dental patients.

Topic priorities:
P1: High-intent, high-volume keyword not yet covered
P2: Trending dental question (educational, evergreen), dentist issues, dental insurance challenges
P3: Expand an existing condition hub (cluster building)

Alternate between: dental issues, dentist issues/challenges + second opinions, dental insurance challenges.

The topic MUST fit a single search intent (e.g., "causes," "treatment," "timeline," "cost," "when to see a dentist," "emergency steps," "dental insurance challenges," "no dental insurance," "dentist trust," "dentist issues").`
        },
        {
          role: "user",
          content: `Here are the most recent blog titles already published (DO NOT repeat these topics):
${recentTitles.map(t => `- ${t}`).join("\n")}

Pick ONE new topic. Return JSON with these fields:
- title: The blog post title (H1). Must be specific, keyword-rich, and compelling.
- primaryKeyword: The main keyword to target (2-4 words)
- secondaryKeywords: 2-4 secondary keywords (comma-separated)
- searchIntent: The search intent this post targets
- category: One of "Dental Problems", "Dentist Problems", "Insurance Problems", "Symptoms", "Gums", "Cavities", "X-Rays", "Costs"
- categoryName: A human-readable category name for the hierarchical system (e.g., "Dental Issues", "Dentist Challenges", "Insurance Problems")
- subcategoryName: A subcategory name (e.g., "Tooth Pain & Sensitivity", "Gum Disease", "Coverage Gaps")`
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "topic_selection",
          strict: true,
          schema: {
            type: "object",
            properties: {
              title: { type: "string" },
              primaryKeyword: { type: "string" },
              secondaryKeywords: { type: "string" },
              searchIntent: { type: "string" },
              category: { type: "string", enum: ["Dental Problems", "Dentist Problems", "Insurance Problems", "Symptoms", "Gums", "Cavities", "X-Rays", "Costs"] },
              categoryName: { type: "string" },
              subcategoryName: { type: "string" },
            },
            required: ["title", "primaryKeyword", "secondaryKeywords", "searchIntent", "category", "categoryName", "subcategoryName"],
            additionalProperties: false,
          },
        },
      },
    });

    const topic = JSON.parse(topicResult.choices[0].message.content as string);
    await updateAgentRun(runId, { title: topic.title, primaryKeyword: topic.primaryKeyword });

    // Step 2: Write the full article
    const internalLinksContext = publishedSlugs.slice(0, 20).map((p: { slug: string; title: string }) =>
      `- /oral-health-hub/${p.slug} — "${p.title}"`
    ).join("\n");

    const articleResult = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are an expert dental health writer for DentaSmart (dentasmart.ai), an AI-powered oral health app positioned as "Your Personal AI Oral Health Guide."

WRITING RULES (must follow):
- 1,500–2,000 words total
- NO "Key Takeaways" section anywhere
- Paragraphs: 2–4 sentences max; no giant blocks
- Use concrete examples ("If cold water stings for 3 seconds…") and "what to do next" advice
- Avoid medical certainty; use appropriate hedging + encourage dental evaluation
- Include a "When to See a Dentist" checklist section
- Include FAQ section (3–6 questions)
- Reading level: 8th grade, conversational tone, human-sounding
- Varied sentence length — mix short punchy sentences with longer ones
- NO inflated, vague, overly-polished phrasing
- NO generic transitions like "In conclusion" or "Let's dive in"
- NO repetitive patterns like "It's not just X, it's Y"
- Be helpful, not promotional or salesy

INTERNAL LINKING (2–4 links required):
Use descriptive anchor text (never "click here"). Only use these verified slugs:
${internalLinksContext}

Format links as: <a href="/oral-health-hub/SLUG" style="color: #DC2626; text-decoration: underline;">anchor text</a>

CTA (end of post — required):
- Bold lead-in question
- 1–2 lines mentioning "Your Personal AI Oral Health Guide"
- Link: <a href="https://dentasmart.ai/download" style="color: #DC2626; text-decoration: underline; font-weight: bold;">Check your symptoms with DentaSmart AI</a>

DISCLAIMER (very end — italicize):
<em>This article is for informational purposes only and does not replace professional dental advice. Always consult a qualified dentist for diagnosis and treatment.</em>

OUTPUT FORMAT:
Return the article as clean HTML with proper heading tags (h2, h3), paragraphs, lists, bold text, and links. Do NOT include h1 (the CMS adds it). Do NOT wrap in a code block.`
        },
        {
          role: "user",
          content: `Write a blog post with this topic:
Title: ${topic.title}
Primary keyword: ${topic.primaryKeyword}
Secondary keywords: ${topic.secondaryKeywords}
Search intent: ${topic.searchIntent}

Write the full article now as HTML.`
        }
      ],
      maxTokens: 8192,
    });

    let articleHtml = articleResult.choices[0].message.content as string;
    // Clean up any markdown code fences the LLM might wrap around HTML
    articleHtml = articleHtml.replace(/^```html?\n?/i, "").replace(/\n?```$/i, "").trim();

    // Step 3: Generate SEO pack
    const seoResult = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are an SEO specialist for DentaSmart. Generate the SEO metadata for a blog post.`
        },
        {
          role: "user",
          content: `Blog title: ${topic.title}
Primary keyword: ${topic.primaryKeyword}

Generate JSON with:
- metaTitle: ≤60 chars, includes primary keyword + benefit, optionally "| DentaSmart" if it fits
- metaDescription: 145–160 chars, active voice, includes primary keyword naturally + gentle CTA
- slug: short, keyword-rich, lowercase, hyphens only (no leading slash)
- ogTitle: slightly more click-oriented version of meta title
- ogDescription: compelling summary for social sharing
- readTime: estimated read time like "7 min read"
- atAGlanceAnswer: 80–120 word summary of the article
- faqs: JSON string of array of {question, answer} pairs (3-6 FAQs from the article)`
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "seo_pack",
          strict: true,
          schema: {
            type: "object",
            properties: {
              metaTitle: { type: "string" },
              metaDescription: { type: "string" },
              slug: { type: "string" },
              ogTitle: { type: "string" },
              ogDescription: { type: "string" },
              readTime: { type: "string" },
              atAGlanceAnswer: { type: "string" },
              faqs: { type: "string" },
            },
            required: ["metaTitle", "metaDescription", "slug", "ogTitle", "ogDescription", "readTime", "atAGlanceAnswer", "faqs"],
            additionalProperties: false,
          },
        },
      },
    });

    const seo = JSON.parse(seoResult.choices[0].message.content as string);

    // Sanitize slug
    const cleanSlug = seo.slug
      .trim()
      .replace(/^\/+|\/+$/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .substring(0, 200);

    const finalSlug = await ensureUniqueSlug(cleanSlug || generateSlug(topic.title));

    // Step 4: Look up category/subcategory IDs
    const db = await getDb();
    if (!db) throw new Error("Database not available");
    const allCategories = await db.select().from(blogCategories);
    
    // Find best matching category
    const parentCat = allCategories.find((c: any) => 
      !c.parentId && c.name.toLowerCase().includes(topic.categoryName.toLowerCase().split(" ")[0])
    );
    const subCat = parentCat ? allCategories.find((c: any) =>
      c.parentId === parentCat.id && c.name.toLowerCase().includes(topic.subcategoryName.toLowerCase().split(" ")[0])
    ) : null;

    // Step 5: Create and publish the blog post
    const [insertResult] = await db.insert(blogPosts).values({
      title: topic.title,
      slug: finalSlug,
      category: topic.category as any,
      readTime: seo.readTime,
      bodyHtml: articleHtml,
      metaTitle: seo.metaTitle,
      metaDescription: seo.metaDescription,
      metaKeywords: `${topic.primaryKeyword}, ${topic.secondaryKeywords}`,
      ogTitle: seo.ogTitle,
      ogDescription: seo.ogDescription,
      canonicalUrl: `https://dentasmart.ai/oral-health-hub/${finalSlug}`,
      primaryKeyword: topic.primaryKeyword,
      secondaryKeywords: topic.secondaryKeywords,
      atAGlanceAnswer: seo.atAGlanceAnswer,
      faqs: seo.faqs,
      categoryId: parentCat?.id ?? null,
      subcategoryId: subCat?.id ?? null,
      status: "published",
      publishedAt: new Date(),
    }).$returningId();

    invalidateSitemapCache();

    const durationMs = Date.now() - startTime;
    await updateAgentRun(runId, {
      status: "success",
      slug: finalSlug,
      postId: insertResult.id,
      durationMs,
    });

    return {
      success: true,
      runId,
      postId: insertResult.id,
      title: topic.title,
      slug: finalSlug,
      primaryKeyword: topic.primaryKeyword,
    };

  } catch (error: any) {
    const durationMs = Date.now() - startTime;
    await updateAgentRun(runId, {
      status: "failed",
      error: error.message?.substring(0, 1000) || "Unknown error",
      durationMs,
    });

    return {
      success: false,
      runId,
      error: error.message || "Unknown error",
    };
  }
}
