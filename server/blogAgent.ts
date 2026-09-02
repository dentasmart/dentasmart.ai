/**
 * AI Blog Agent. Generates SEO-optimized blog drafts
 * using the built-in LLM helper. Each run:
 *   1. Picks a topic (keyword research via LLM)
 *   2. Creates an outline
 *   3. Writes the full article (1,500-2,000 words, human voice)
 *   4. Fills SEO fields
 *   5. Creates the blog post as a draft for manual human publication
 */

import { invokeLLM } from "./_core/llm";
import { getDb } from "./db";
import { agentRuns, blogPosts, blogCategories } from "../drizzle/schema";
import { eq, desc } from "drizzle-orm";

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

/** Delete specific agent_runs by ID. used by tests to clean up after themselves */
export async function cleanupTestRuns(ids: number[]) {
  const db = await getDb();
  if (!db) return;
  for (const id of ids) {
    await db.delete(agentRuns).where(eq(agentRuns.id, id));
  }
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

  // Generated content must remain draft-only. A manual human publication
  // action remains the existing release gate and is not clinical-review proof.
  const shouldPublish = false;

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

TERMINOLOGY RULE: Always use "Second Opinion" (never "Second Review") when referring to DentaSmart's second opinion feature or the concept of getting a second opinion on dental work. This is the accepted industry term.

The topic MUST fit a single search intent (e.g., "causes," "treatment," "timeline," "cost," "when to see a dentist," "emergency steps," "dental insurance challenges," "no dental insurance," "dentist trust," "dentist issues").

Title rules:
- Write titles that sound like a real person asking a question or making a statement, not a marketing headline
- No exclamation marks
- No AI-tell words ("comprehensive", "ultimate", "essential", "everything you need to know")
- Prefer specific, concrete titles ("Why your tooth hurts when you bite down" over "Understanding tooth pain")
- Optimize for AEO: titles should match how people actually type questions into Google or ask AI assistants`
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
    const blogLinksContext = publishedSlugs.slice(0, 20).map((p: { slug: string; title: string }) =>
      `- /oral-health-hub/${p.slug}. "${p.title}"`
    ).join("\n");

    // Static content pages for cross-linking (improves internal linking & reduces orphaned pages)
    const staticPagesContext = [
      '- /conditions/cavities. "Cavities: Causes, Prevention & Treatment"',
      '- /conditions/gum-disease. "Gum Disease: Signs, Stages & Treatment"',
      '- /conditions/toothaches. "Toothache Guide: Causes & Relief"',
      '- /symptoms/tooth-sensitivity. "Tooth Sensitivity: Causes & Solutions"',
      '- /symptoms/bleeding-gums. "Bleeding Gums: What It Means"',
      '- /dental-costs/root-canal-cost. "Root Canal Cost Guide"',
      '- /dental-costs/dental-crown-cost. "Dental Crown Cost Guide"',
      '- /dental-costs/dental-implant-cost. "Dental Implant Cost Guide"',
      '- /treatments/root-canal. "Root Canal Treatment Guide"',
      '- /treatments/dental-crowns. "Dental Crowns: What to Expect"',
      '- /dental-emergencies. "Dental Emergency Guide"',
      '- /symptom-quiz. "Free AI Symptom Checker"',
      '- /download. "Download DentaSmart App"',
    ].join("\n");

    const internalLinksContext = `${blogLinksContext}\n\nStatic content pages (prefer these for relevant topics):\n${staticPagesContext}`;

    const articleResult = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are an expert dental health writer for DentaSmart (dentasmart.ai), an AI-powered oral health app positioned as "Your Personal AI Dentist in Your Pocket."

=== WRITING VOICE & ANTI-AI RULES (CRITICAL) ===
Your writing must be indistinguishable from a skilled human health writer. Follow these rules strictly:

1. NEVER use these AI-tell words/phrases:
   - "delve", "dive into", "navigate", "landscape", "tapestry", "multifaceted", "nuanced"
   - "crucial", "vital", "pivotal", "key" (as adjectives for importance)
   - "comprehensive", "intricate", "innovative", "groundbreaking"
   - "bustling", "vibrant", "renowned", "fostering", "leveraging", "harnessing"
   - "spearheaded", "underscored", "a testament to", "indelible mark"
   - "It is important to note", "It is worth noting", "Notably"
   - "Furthermore", "Moreover" as sentence starters
   - "In conclusion", "In summary", "Let's dive in", "Let's explore"
   - "Whether you're a... or a..." constructions
   - "Not only... but also" (overused)
   - "reflects broader trends", "setting the stage for", "evolving landscape"
   - "plays a vital role", "serves as a reminder", "stands as"

2. NEVER add disclaimers, caveats, or "consult a professional" notes at the end. No disclaimer section at all.

3. NEVER use exclamation marks. Zero.

4. NEVER use em dashes (—) or en dashes (–). Use commas, periods, or rewrite the sentence instead.

5. NEVER write meta-commentary about the article ("In this article, we will explore...", "Let's take a look at...").

6. NEVER use formulaic paragraph patterns. Vary your openings. Do not start 2+ paragraphs the same way.

7. Write like a real person talking to a friend:
   - Use contractions naturally ("you'll", "it's", "don't")
   - Use "you" and "your" directly
   - Include imperfect, real-world observations ("Most people put off flossing. That's normal.")
   - Vary sentence length dramatically: some 4-word sentences, some 20+ word sentences
   - Start some sentences with "And", "But", "So", "Or" for natural rhythm
   - Use specific numbers and examples ("If cold water stings for 3 seconds...")
   - Occasionally use colloquial phrasing ("here's the thing", "the short answer", "that said")

=== TERMINOLOGY ===
- Always use "Second Opinion" (never "Second Review") when referring to DentaSmart's second opinion feature or the concept of getting a second opinion on dental work. "Second Opinion" is the accepted dental industry term.

=== CONTENT RULES ===
- 1,500-2,000 words total
- NO "Key Takeaways" or summary section
- Paragraphs: 2-4 sentences max. No walls of text.
- Use concrete examples and "what to do next" advice
- Avoid medical certainty; use appropriate hedging + encourage dental evaluation
- Include a "When to See a Dentist" checklist section
- Include FAQ section (3-6 questions with direct, concise answers)
- Reading level: 8th grade, conversational tone
- Be genuinely helpful, not promotional or salesy

=== SEO / AEO / GEO FORMATTING (for search engines + AI answer engines) ===
- Start the article with a direct, concise answer to the primary search query in the first 2-3 sentences (this is what Google AI Overviews and featured snippets pull from)
- Use H2 for major sections, H3 for sub-points. Use sentence case for all headings.
- Structure at least one section as a numbered or bulleted list (Google pulls these for featured snippets)
- Write FAQ answers as standalone, self-contained responses (each answer should make sense without reading the question). This is critical for Answer Engine Optimization.
- Use <strong> tags strategically on key phrases a skimmer should catch (1-2 per section max, not every other sentence)
- Use <blockquote> for one powerful pull-quote or key stat mid-article
- Include specific data points, percentages, or dollar amounts where relevant (AI answer engines prefer concrete data)
- Front-load each section: put the most important information in the first sentence of each section
- Keep URL-friendly structure: each H2 should be a potential answer to a related search query

INTERNAL LINKING (2-4 links required):
Use descriptive anchor text (never "click here"). Only use these verified slugs:
${internalLinksContext}

Format links as: <a href="/PATH" style="color: #DC2626; text-decoration: underline;">anchor text</a>
Use the exact path from the list above (e.g., /oral-health-hub/SLUG for blog posts, /conditions/SLUG for conditions, etc.)

CTA (end of post, woven naturally into the closing paragraph):
- Bold lead-in question
- 1-2 lines mentioning "Your Personal AI Dentist in Your Pocket"
- Link: <a href="https://dentasmart.ai/download" style="color: #DC2626; text-decoration: underline; font-weight: bold;">Check your symptoms with DentaSmart AI</a>

NO DISCLAIMER. Do not add any disclaimer, legal note, or "consult a professional" statement at the end. The article ends with the CTA paragraph. Nothing after it.

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
    // Fix escaped quotes in href attributes (LLM sometimes outputs \" instead of ")
    articleHtml = articleHtml.replace(/\\"/g, '"');

    // Step 3: Generate SEO pack
    const seoResult = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are an SEO/AEO/GEO specialist for DentaSmart. Generate the SEO metadata for a blog post.

Rules:
- Always use "Second Opinion" (never "Second Review") when referring to DentaSmart's second opinion feature
- Write meta descriptions that directly answer the search query (AEO-optimized for AI answer engines)
- Use natural, human language. No AI-tell words ("comprehensive", "delve", "navigate", "landscape")
- No exclamation marks
- No em dashes or en dashes
- atAGlanceAnswer must be a direct, factual answer suitable for Google AI Overviews and featured snippets
- FAQ answers must be self-contained (each answer makes sense without reading the question)`
        },
        {
          role: "user",
          content: `Blog title: ${topic.title}
Primary keyword: ${topic.primaryKeyword}

Generate JSON with:
- metaTitle: ≤60 chars, includes primary keyword + benefit, optionally "| DentaSmart" if it fits
- metaDescription: 145-160 chars, active voice, includes primary keyword naturally + gentle CTA
- slug: short, keyword-rich, lowercase, hyphens only (no leading slash)
- ogTitle: slightly more click-oriented version of meta title
- ogDescription: compelling summary for social sharing
- readTime: estimated read time like "7 min read"
- atAGlanceAnswer: 80-120 word summary of the article
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

    // Step 5: Create a draft blog post. Manual publication remains required.
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
      status: "draft",
      publishedAt: null,
    }).$returningId();

    const durationMs = Date.now() - startTime;
    await updateAgentRun(runId, {
      status: "draft",
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
