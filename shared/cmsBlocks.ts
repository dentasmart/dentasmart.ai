import { z } from "zod";
import { isValidCmsPublicPath } from "./cmsUrlPolicy";
import { parseManualCmsSchema } from "./cmsSchemaOverride";

/**
 * Shared CMS content contract (v1).
 *
 * Safe to import from client and server. This module defines editable content
 * data, not HTML rendering or permission to publish.
 *
 * SECURITY: Rich-text HTML is untrusted content. Public renderers MUST sanitize
 * it on the server and must apply the existing content-governance/reviewer gates.
 */

export const cmsContentTypeSchema = z.enum([
  "blog",
  "condition",
  "symptom",
  "guide",
  "treatment",
  "cost",
  "other",
]);

export const cmsImageSchema = z.object({
  url: z.string().trim().min(1).max(2048),
  altText: z.string().max(500).default(""),
  /** Explicitly decorative images may have a correctly empty alt attribute. */
  decorative: z.boolean().optional(),
  caption: z.string().max(2000).optional(),
  mediaId: z.number().int().positive().optional(),
});

export const cmsImageSlotsSchema = z.object({
  /** Listing/card thumbnail. Never overwritten by the page hero. */
  featured: cmsImageSchema.nullable().optional(),
  /** Main page visual, independent from featured and OG images. */
  hero: cmsImageSchema.nullable().optional(),
  /** Explicit social image. Falls back ONLY to featured when absent. */
  og: cmsImageSchema.nullable().optional(),
});

export type CmsImage = z.infer<typeof cmsImageSchema>;
export type CmsImageSlots = z.infer<typeof cmsImageSlotsSchema>;

/** Resolve social image for og:image and twitter:image. Never use hero. */
export function resolveCmsSocialImage(slots: CmsImageSlots): CmsImage | null {
  if (slots.og?.url?.trim()) return slots.og;
  if (slots.featured?.url?.trim()) return slots.featured;
  return null;
}

export const cmsHeadingAlignmentSchema = z.enum(["left", "center", "right"]);
export type CmsHeadingAlignment = z.infer<typeof cmsHeadingAlignmentSchema>;
export const cmsSectionHeadingLevelSchema = z.enum(["h2", "h3", "h4"]);
export type CmsSectionHeadingLevel = z.infer<typeof cmsSectionHeadingLevelSchema>;

const cmsBlockBase = z.object({
  id: z.string().trim().min(1).max(100),
  /** Visual alignment only; does not change semantic heading order. */
  headingAlign: cmsHeadingAlignmentSchema.optional(),
  /** Optional so existing saved drafts default to H2 without a data migration. */
  headingLevel: cmsSectionHeadingLevelSchema.optional(),
});

const linkSchema = z.object({
  title: z.string().trim().min(1).max(250),
  url: z.string().trim().min(1).max(2048),
});

export const cmsBlockSchema = z.discriminatedUnion("type", [
  cmsBlockBase.extend({
    type: z.literal("hero"),
    heading: z.string().max(500),
    subheading: z.string().max(3000).default(""),
    subheadingAlign: cmsHeadingAlignmentSchema.optional(),
  }),
  cmsBlockBase.extend({
    type: z.literal("quick_answer"),
    heading: z.string().max(500).default("Quick Answer"),
    answer: z.string().max(10000),
  }),
  cmsBlockBase.extend({
    type: z.literal("urgent_care"),
    heading: z.string().max(500).default("When to Seek Urgent Care"),
    items: z.array(z.string().max(3000)).max(40),
  }),
  cmsBlockBase.extend({
    type: z.literal("rich_text"),
    heading: z.string().max(500).optional(),
    /** Sanitize before publishing/rendering. Do not treat this as trusted HTML. */
    html: z.string().max(250000),
  }),
  cmsBlockBase.extend({
    type: z.literal("causes"),
    heading: z.string().max(500).default("Common Causes"),
    items: z.array(z.object({
      title: z.string().max(500),
      titleAlign: cmsHeadingAlignmentSchema.optional(),
      description: z.string().max(10000),
    })).max(50),
  }),
  cmsBlockBase.extend({
    type: z.literal("symptoms"),
    heading: z.string().max(500).default("Signs and Symptoms"),
    items: z.array(z.object({
      text: z.string().max(3000),
      severity: z.enum(["mild", "moderate", "severe"]),
    })).max(60),
  }),
  cmsBlockBase.extend({
    type: z.literal("list"),
    heading: z.string().max(500),
    items: z.array(z.string().max(5000)).max(100),
  }),
  cmsBlockBase.extend({
    type: z.literal("faq"),
    heading: z.string().max(500).default("Frequently Asked Questions"),
    items: z.array(z.object({
      question: z.string().max(1000),
      answer: z.string().max(12000),
    })).max(100),
  }),
  cmsBlockBase.extend({
    type: z.literal("related_links"),
    heading: z.string().max(500).default("Related Topics"),
    links: z.array(linkSchema).max(100),
  }),
  cmsBlockBase.extend({
    type: z.literal("image"),
    heading: z.string().max(500).optional(),
    /** Empty image blocks may be saved as drafts, not test-published. */
    image: cmsImageSchema.nullable(),
  }),
  cmsBlockBase.extend({
    type: z.literal("table"),
    heading: z.string().max(500).optional(),
    headers: z.array(z.string().max(500)).max(20),
    rows: z.array(z.array(z.string().max(4000)).max(20)).max(100),
  }),
  cmsBlockBase.extend({
    type: z.literal("cta"),
    heading: z.string().max(500),
    description: z.string().max(3000).default(""),
    buttonLabel: z.string().max(250),
    buttonUrl: z.string().max(2048),
  }),
]);

export type CmsBlock = z.infer<typeof cmsBlockSchema>;
export type CmsContentType = z.infer<typeof cmsContentTypeSchema>;

export const cmsSeoSchema = z.object({
  /** Exactly one primary keyphrase; secondary phrases are tracked separately. */
  focusKeyword: z.string().trim().max(200).default(""),
  secondaryKeywords: z.array(z.string().trim().min(1).max(200)).max(30).default([]),
  synonyms: z.array(z.string().trim().min(1).max(200)).max(30).optional(),
  metaTitle: z.string().max(250).default(""),
  metaDescription: z.string().max(1000).default(""),
  canonicalUrl: z.string().max(2048).optional(),
  /** Future publication settings. Private drafts always remain noindex. */
  robotsNoindex: z.boolean().optional(),
  robotsNofollow: z.boolean().optional(),
  robotsDisallow: z.boolean().optional(),
  /** Proposed public URL path for when CMS routing is migrated; never rename a source page on draft save. */
  requestedPath: z.string().trim().max(500)
    .refine(value => !value || isValidCmsPublicPath(value),
      "Use a lowercase absolute URL path with safe segments; no query strings or fragments.")
    .optional(),
  ogTitle: z.string().max(250).optional(),
  ogDescription: z.string().max(1000).optional(),
  twitterTitle: z.string().max(250).optional(),
  twitterDescription: z.string().max(1000).optional(),
});

export const cmsReviewerFieldsSchema = z.object({
  name: z.string().max(200).optional(),
  credentials: z.string().max(500).optional(),
  shortBio: z.string().max(2000).optional(),
  profileUrl: z.string().max(1000).optional(),
  lastReviewed: z.string().max(10).optional(),
  /** Editorial input only. Must pass public attribution verification separately. */
});

export const cmsDocumentSchema = z.object({
  /** Hub identity determines admin draft ownership; does not authorize a public route. */
  hubId: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(60).optional(),
  contentType: cmsContentTypeSchema,
  slug: z.string().trim().min(1).max(500),
  title: z.string().trim().min(1).max(500),
  templateKey: z.string().trim().min(1).max(120),
  templateVersion: z.number().int().positive(),
  blocks: z.array(cmsBlockSchema).max(120),
  images: cmsImageSlotsSchema,
  seo: cmsSeoSchema,
  reviewer: cmsReviewerFieldsSchema.optional(),
  tags: z.array(z.string().trim().min(1).max(100)).max(30).default([]),
  editorial: z.object({
    categories: z.array(z.string().trim().min(1).max(100)).max(30).default([]),
    cornerstone: z.boolean().default(false),
    schemaPageType: z.enum(["WebPage", "MedicalWebPage", "CollectionPage", "FAQPage"]).default("WebPage"),
    schemaArticleType: z.enum(["none", "Article", "BlogPosting", "MedicalScholarlyArticle"]).default("none"),
    /** Legacy custom selections stay valid; new drafts use automatic type selection. */
    schemaMode: z.enum(["auto", "manual"]).optional(),
    /** Private draft-only manual JSON-LD; public schema injection is a separate workflow. */
    manualSchemaJsonLd: z.string().max(50_000).optional(),
  }).optional(),
}).superRefine((document, ctx) => {
  if (document.editorial?.schemaMode === "manual" && document.editorial.manualSchemaJsonLd !== undefined) {
    const parsed = parseManualCmsSchema(document.editorial.manualSchemaJsonLd);
    if (parsed.error) ctx.addIssue({ code: "custom", path: ["editorial", "manualSchemaJsonLd"], message: parsed.error });
  }
  const issue = validateCmsBlockOrder(document.blocks, document.contentType);
  if (issue) ctx.addIssue({ code: "custom", path: ["blocks"], message: issue });
});

export type CmsDocument = z.infer<typeof cmsDocumentSchema>;

/**
 * Private drafting invariants: unique block IDs and one Page Header maximum.
 * Ordering, including urgent-care position, is advisory while drafting.
 * Medical TEST publication performs its own safety validation.
 */
export function validateCmsBlockOrder(
  blocks: readonly CmsBlock[],
  _contentType: CmsContentType,
): string | null {
  const ids = new Set<string>();
  for (const block of blocks) {
    if (ids.has(block.id)) return "Each content block must have a unique ID.";
    ids.add(block.id);
  }
  if (blocks.filter(block => block.type === "hero").length > 1) {
    return "A page may only have one Page Header section.";
  }
  return null;
}

export type CmsMoveResult =
  | { ok: true; blocks: CmsBlock[] }
  | { ok: false; blocks: CmsBlock[]; reason: string };

/** New sections are appended and can be freely moved by the editor. */
export function insertCmsBlock(
  blocks: readonly CmsBlock[], newBlock: CmsBlock, contentType: CmsContentType,
): CmsMoveResult {
  const updated = [...blocks, newBlock];
  const issue = validateCmsBlockOrder(updated, contentType);
  return issue
    ? { ok: false, blocks: [...blocks], reason: issue }
    : { ok: true, blocks: updated };
}

/** Restore exactly the removed content and its previous index. */
export function restoreCmsDeletedBlock(
  blocks: readonly CmsBlock[], deleted: { block: CmsBlock; index: number },
  contentType: CmsContentType,
): CmsMoveResult {
  const index = Math.max(0, Math.min(deleted.index, blocks.length));
  const updated = [...blocks.slice(0, index), deleted.block, ...blocks.slice(index)];
  const issue = validateCmsBlockOrder(updated, contentType);
  return issue
    ? { ok: false, blocks: [...blocks], reason: issue }
    : { ok: true, blocks: updated };
}

/** Reordering is free in private drafts, subject to unique IDs and one H1 section. */
export function moveCmsBlock(
  blocks: readonly CmsBlock[],
  fromIndex: number,
  toIndex: number,
  contentType: CmsContentType,
): CmsMoveResult {
  if (!Number.isInteger(fromIndex) || !Number.isInteger(toIndex) ||
    fromIndex < 0 || toIndex < 0 || fromIndex >= blocks.length || toIndex >= blocks.length) {
    return { ok: false, blocks: [...blocks], reason: "Invalid section position." };
  }
  const reordered = [...blocks];
  const [moved] = reordered.splice(fromIndex, 1);
  reordered.splice(toIndex, 0, moved);
  const issue = validateCmsBlockOrder(reordered, contentType);
  return issue
    ? { ok: false, blocks: [...blocks], reason: issue }
    : { ok: true, blocks: reordered };
}

/** Advisory only; unsafe placement is rejected at medical TEST publication. */
export function getCmsUrgentCarePositionWarning(
  blocks: readonly CmsBlock[], contentType: CmsContentType,
): string | null {
  if (contentType !== "condition" && contentType !== "symptom") return null;
  const urgent = blocks.findIndex(block => block.type === "urgent_care");
  const firstCta = blocks.findIndex(block => block.type === "cta");
  if (urgent < 0) return "Urgent Care is missing. Add emergency guidance before medical TEST publication.";
  if (firstCta >= 0 && firstCta < urgent) {
    return "Recommended: Place Urgent Care before Call to Action so readers see important safety information first. This is a suggestion, not a publishing restriction.";
  }
  return null;
}

/** Advisory only: headings H2–H4 should form a logical outline below the page H1. */
export function getCmsHeadingOrderWarnings(blocks: readonly CmsBlock[]): string[] {
  const issues: string[] = [];
  let previous = 1; // The document title is the single H1, regardless of Page Header block.
  for (const block of blocks) {
    if (block.type === "hero" || !("heading" in block) || !block.heading?.trim()) continue;
    const level = Number((block.headingLevel ?? "h2").slice(1));
    if (level > previous + 1) {
      issues.push(`"${block.heading}" uses H${level} after H${previous}. Consider H${previous + 1} to avoid skipping a level.`);
    }
    previous = level;
  }
  return issues;
}

/** CMS Page title is the public H1. SEO title stays independent. */
export function getCmsPublishedHeading(document: Pick<CmsDocument, "title">): string {
  return document.title.trim();
}
