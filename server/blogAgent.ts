/**
 * AI Blog Agent. Generates governed Oral Health Hub drafts only after an admin
 * has approved a candidate, its intent owner, claim set, sources, canonical plan,
 * internal links, and release prerequisites. The agent never publishes content.
 */

import { invokeLLM } from "./_core/llm";
import { getDb } from "./db";
import { agentRuns, blogPosts, blogCategories } from "../drizzle/schema";
import { desc, eq } from "drizzle-orm";
import { resolveGovernedDraftContext, type GovernedDraftContext } from "./governanceAgent";
import { createGovernedContentVersionHash } from "./governanceReview";
import { governedBlogContentKey } from "./governancePublishing";
import { createBlogPost } from "./blogDb";

export interface GovernedDraftValidation {
  status: "passed" | "blocked";
  checks: readonly string[];
  issues: readonly string[];
}

type AgentRunUpdate = Partial<{
  status: "running" | "success" | "draft" | "failed";
  title: string;
  slug: string;
  primaryKeyword: string;
  postId: number;
  error: string;
  durationMs: number;
  governanceCandidateId: number;
  intentOwnerId: string;
  governanceVersion: string;
  governanceRiskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  requiredReviewerRoles: string[];
  claimContextIds: number[];
  sourceContextIds: number[];
  contentVersionHash: string;
  validationResult: GovernedDraftValidation;
  governanceApprovalState: "PENDING" | "APPROVED" | "BLOCKED";
  governanceBlockReason: string | null;
}>;

export async function createAgentRun(data: {
  triggerType: "manual";
  governanceCandidateId: number;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [result] = await db.insert(agentRuns).values({
    status: "running",
    triggerType: data.triggerType,
    governanceCandidateId: data.governanceCandidateId,
    governanceApprovalState: "PENDING",
  }).$returningId();
  return result.id;
}

export async function updateAgentRun(id: number, data: AgentRunUpdate) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(agentRuns).set(data).where(eq(agentRuns.id, id));
}

export async function listAgentRuns(limit = 50) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(agentRuns).orderBy(desc(agentRuns.createdAt)).limit(limit);
}

/** Delete specific agent runs by ID. Used only by test cleanup. */
export async function cleanupTestRuns(ids: number[]) {
  const db = await getDb();
  if (!db) return;
  for (const id of ids) {
    await db.delete(agentRuns).where(eq(agentRuns.id, id));
  }
}

function slugFromCanonicalPlan(canonicalPlan: string): string {
  const path = canonicalPlan.replace(/[?#].*$/, "").replace(/\/+$/, "");
  const slug = path.split("/").filter(Boolean).at(-1) ?? "";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error("Candidate canonical plan must end with a URL-safe lowercase slug");
  }
  return slug;
}

async function assertSlugIsAvailable(slug: string): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await db.select({ id: blogPosts.id }).from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  if (existing.length > 0) throw new Error("Candidate canonical plan conflicts with an existing blog slug");
}

function stripFence(value: string): string {
  return value.replace(/^```html?\n?/i, "").replace(/\n?```$/i, "").replace(/\\"/g, '"').trim();
}

function wordCount(value: string): number {
  return value.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
}

function parseFaqs(value: string): readonly { question: string; answer: string }[] | null {
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed) || parsed.length < 3 || parsed.length > 6) return null;
    if (!parsed.every((faq) => typeof faq?.question === "string" && typeof faq?.answer === "string" && faq.question.trim() && faq.answer.trim())) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function validateGovernedDraft(
  context: GovernedDraftContext,
  articleHtml: string,
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogTitle: string;
    ogDescription: string;
    readTime: string;
    atAGlanceAnswer: string;
    faqs: string;
  },
): GovernedDraftValidation {
  const issues: string[] = [];
  const checks: string[] = [
    "approved candidate",
    "intent owner",
    "approved claim context",
    "verified source context",
    "canonical plan",
    "internal link plan",
    "manual-only draft status",
  ];
  const words = wordCount(articleHtml);
  if (words < 900 || words > 2400) issues.push("Draft word count must be between 900 and 2,400 words.");
  if (!articleHtml.includes("<h2")) issues.push("Draft requires at least one H2 heading.");
  if (!articleHtml.includes("<p")) issues.push("Draft requires paragraph content.");
  if (seo.metaTitle.length === 0 || seo.metaTitle.length > 60) issues.push("Meta title must be 1 to 60 characters.");
  if (seo.metaDescription.length < 120 || seo.metaDescription.length > 170) issues.push("Meta description must be 120 to 170 characters.");
  if (wordCount(seo.atAGlanceAnswer) < 60 || wordCount(seo.atAGlanceAnswer) > 140) issues.push("At-a-glance answer must be 60 to 140 words.");
  if (!parseFaqs(seo.faqs)) issues.push("FAQs must be a JSON array of 3 to 6 non-empty question-and-answer pairs.");

  const hrefs = Array.from(articleHtml.matchAll(/href=["']([^"']+)["']/gi)).map((match) => match[1]);
  const allowedLinks = new Set([...context.internalLinkPlan, context.ctaDestination]);
  for (const href of hrefs) {
    const normalized = href.replace(/^https:\/\/dentasmart\.ai/, "").replace(/\/+$/, "") || "/";
    if (!allowedLinks.has(normalized) && !allowedLinks.has(`${normalized}/`)) {
      issues.push(`Draft contains an unplanned link: ${href}`);
      break;
    }
  }

  const restrictedPatterns: readonly RegExp[] = [
    /\b100%\s+(?:accurate|accuracy|detection)\b/i,
    /\b50k\+?\s+(?:scans|users|patients)\b/i,
    /\b(?:save|saves|saving)\s+\$?\d/i,
    /\b(?:careington|dialcare)\b/i,
    /\b(?:broker|peo|association|self-insured)\s+(?:package|plan|offering)\b/i,
    /\b(?:diagnos(?:e|es|ed|is|ing)|prescrib(?:e|es|ed|ing))\b/i,
    /\bguarantee(?:d|s)?\b/i,
  ];
  const publicText = [articleHtml, seo.metaTitle, seo.metaDescription, seo.ogTitle, seo.ogDescription, seo.atAGlanceAnswer, seo.faqs].join("\n");
  if (restrictedPatterns.some((pattern) => pattern.test(publicText))) {
    issues.push("Draft contains a restricted claim or clinical representation.");
  }

  return { status: issues.length === 0 ? "passed" : "blocked", checks, issues };
}

function formatClaimContext(context: GovernedDraftContext): string {
  return context.claims.map((claim) => [
    `- ID ${claim.id}: ${claim.approvedWording}`,
    claim.qualification ? `  Qualification: ${claim.qualification}` : "",
  ].filter(Boolean).join("\n")).join("\n");
}

function formatSourceContext(context: GovernedDraftContext): string {
  return context.sources.map((source) => `- ${source.title} (${source.publisher ?? "Publisher not recorded"}). Scope: ${source.scope ?? "No scope recorded"}`).join("\n");
}

async function resolveCategoryIds(categoryName: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const categories = await db.select().from(blogCategories);
  const parent = categories.find((category) => !category.parentId && category.name.toLowerCase() === categoryName.toLowerCase())
    ?? categories.find((category) => !category.parentId && category.name.toLowerCase().includes(categoryName.toLowerCase().split(" ")[0]));
  return { categoryId: parent?.id ?? null, subcategoryId: null };
}

/**
 * Generates one governed draft. Callers must provide an approved candidate ID.
 * There is no scheduled trigger and no auto-publish branch.
 */
export async function runBlogAgent(input: { candidateId: number }) {
  const startTime = Date.now();
  const runId = await createAgentRun({ triggerType: "manual", governanceCandidateId: input.candidateId });
  const shouldPublish = false;
  let governancePreflightComplete = false;

  try {
    const context = await resolveGovernedDraftContext(input.candidateId);
    governancePreflightComplete = true;
    const slug = slugFromCanonicalPlan(context.canonicalPlan);
    await assertSlugIsAvailable(slug);
    await updateAgentRun(runId, {
      intentOwnerId: context.intentOwnerId,
      governanceVersion: "phase2-governed-draft-v1",
      governanceRiskLevel: context.riskLevel,
      requiredReviewerRoles: Array.from(context.requiredReviewerRoles),
      claimContextIds: context.claims.map((claim) => claim.id),
      sourceContextIds: context.sources.map((source) => source.id),
      governanceApprovalState: "APPROVED",
      governanceBlockReason: null,
    });

    const internalLinks = context.internalLinkPlan.map((path) => `- ${path}`).join("\n");

    const articleResult = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You write a governed DentaSmart dental-health education draft for everyday people. Write in clear, natural language at roughly an eighth-grade reading level. This is a draft for human review, not a publication.

Candidate question: ${context.workingQuestion}
Audience: ${context.targetAudience}
Search-intent family: ${context.queryFamily}
Information gain: ${context.informationGain}
Intent owner: ${context.intentOwnerId}

Approved claims. Use only the exact approved wording when a claim is needed. Do not invent, extend, or paraphrase these claims.
${formatClaimContext(context)}

Verified source context. Use it only for the approved scope. Do not invent citations, statistics, clinical studies, reviewer identities, medical evidence, or unsupported facts.
${formatSourceContext(context)}

Safety and editorial boundaries:
- Keep the content educational. Do not diagnose, prescribe, confirm treatment need, replace a dentist, promise outcomes, or give false reassurance.
- Use appropriate uncertainty. Add accurate escalation guidance where the topic warrants it.
- Do not claim savings, partners, insurance, financing, benefits, employer access, compliance, privacy, security, ratings, or accuracy unless those exact claims appear above.
- Avoid em dashes, exclamation marks, generic AI phrasing, and formulaic transitions.
- Start with a concise direct answer. Use descriptive H2 headings, paragraphs, at least one list, and a 3 to 6 question FAQ section.

Internal links. Use only the relevant planned links below, with descriptive anchors. Do not add any other link.
${internalLinks}

CTA destination: ${context.ctaDestination}
Use the CTA only if it fits the approved educational context. Do not present the CTA as medical advice or a replacement for professional care.

Return clean HTML only. Do not include an H1, a source list, a disclaimer heading, markdown fences, or commentary about this instruction.`,
        },
        {
          role: "user",
          content: `Draft a 1,200 to 2,000 word article that answers: ${context.workingQuestion}`,
        },
      ],
      maxTokens: 8192,
    });
    const articleHtml = stripFence(articleResult.choices[0].message.content as string);

    const seoResult = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `Create an SEO and answer-engine metadata pack for a governed DentaSmart draft. Use only the supplied candidate and approved claim context. Do not introduce a product claim, clinical fact, medical statistic, citation, review proof, price, savings claim, diagnosis, or treatment recommendation. Use clear language with no em dashes or exclamation marks.`,
        },
        {
          role: "user",
          content: `Candidate question: ${context.workingQuestion}
Search-intent family: ${context.queryFamily}
Article HTML: ${articleHtml}

Return JSON with metaTitle (1-60 characters), metaDescription (120-170 characters), ogTitle, ogDescription, readTime, atAGlanceAnswer (60-140 words), and faqs (a JSON string representing 3-6 question-and-answer pairs).`,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "governed_seo_pack",
          strict: true,
          schema: {
            type: "object",
            properties: {
              metaTitle: { type: "string" },
              metaDescription: { type: "string" },
              ogTitle: { type: "string" },
              ogDescription: { type: "string" },
              readTime: { type: "string" },
              atAGlanceAnswer: { type: "string" },
              faqs: { type: "string" },
            },
            required: ["metaTitle", "metaDescription", "ogTitle", "ogDescription", "readTime", "atAGlanceAnswer", "faqs"],
            additionalProperties: false,
          },
        },
      },
    });
    const seo = JSON.parse(seoResult.choices[0].message.content as string) as {
      metaTitle: string;
      metaDescription: string;
      ogTitle: string;
      ogDescription: string;
      readTime: string;
      atAGlanceAnswer: string;
      faqs: string;
    };

    const validation = validateGovernedDraft(context, articleHtml, seo);
    if (validation.status !== "passed") {
      throw new Error(`Governance validation blocked the draft: ${validation.issues.join(" ")}`);
    }

    const { categoryId, subcategoryId } = await resolveCategoryIds(context.cmsCategory);
    const postId = await createBlogPost({
      title: context.workingQuestion,
      slug,
      category: context.cmsCategory,
      readTime: seo.readTime,
      bodyHtml: articleHtml,
      metaTitle: seo.metaTitle,
      metaDescription: seo.metaDescription,
      ogTitle: seo.ogTitle,
      ogDescription: seo.ogDescription,
      canonicalUrl: `https://dentasmart.ai/oral-health-hub/${slug}`,
      primaryKeyword: context.queryFamily,
      atAGlanceAnswer: seo.atAGlanceAnswer,
      faqs: seo.faqs,
      categoryId,
      subcategoryId,
      status: "draft",
      publishedAt: null,
      governanceCandidateId: context.candidateId,
      governanceIntentOwnerId: context.intentOwnerId,
    });

    const contentVersionHash = createGovernedContentVersionHash({
      contentKey: governedBlogContentKey(postId),
      title: context.workingQuestion,
      routePath: context.canonicalPlan,
      bodyHtml: articleHtml,
      metadata: {
        metaTitle: seo.metaTitle,
        metaDescription: seo.metaDescription,
        ogTitle: seo.ogTitle,
        ogDescription: seo.ogDescription,
        atAGlanceAnswer: seo.atAGlanceAnswer,
        faqs: seo.faqs,
      },
      claimIds: context.claims.map((claim) => claim.id),
      sourceIds: context.sources.map((source) => source.id),
    });

    const durationMs = Date.now() - startTime;
    await updateAgentRun(runId, {
      status: "draft",
      title: context.workingQuestion,
      slug,
      primaryKeyword: context.queryFamily,
      postId,
      durationMs,
      contentVersionHash,
      validationResult: validation,
      governanceApprovalState: "APPROVED",
    });
    return { success: true, runId, postId, title: context.workingQuestion, slug, primaryKeyword: context.queryFamily, candidateId: context.candidateId };
  } catch (error: any) {
    const durationMs = Date.now() - startTime;
    const reason = error.message?.substring(0, 1000) || "Unknown error";
    const blocked = !governancePreflightComplete || reason.includes("PRECONDITION_FAILED") || reason.includes("Candidate") || reason.includes("Governance validation");
    await updateAgentRun(runId, {
      status: "failed",
      error: reason,
      durationMs,
      validationResult: { status: "blocked", checks: ["governance preflight"], issues: [reason] },
      governanceApprovalState: blocked ? "BLOCKED" : "PENDING",
      governanceBlockReason: blocked ? reason : null,
    });
    return { success: false, runId, error: reason, candidateId: input.candidateId };
  }
}
