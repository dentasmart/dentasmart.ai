/**
 * Test-only CMS publication gate and read helper.
 *
 * Production deployments MUST never read this data. A branch name or NODE_ENV
 * is not sufficient isolation; require the exact local test DB endpoint.
 */
import { eq } from "drizzle-orm";
import { cmsPages } from "../drizzle/schema";
import { cmsDocumentSchema, type CmsDocument } from "../shared/cmsBlocks";
import { getDb } from "./db";

export function isCmsTestPublicationEnvironment(): boolean {
  const connection = process.env.DATABASE_URL;
  if (!connection) return false;
  try {
    const url = new URL(connection);
    return (url.hostname === "127.0.0.1" || url.hostname === "localhost") &&
      url.port === "3307" &&
      decodeURIComponent(url.pathname) === "/dentasmart_test";
  } catch {
    return false;
  }
}

/**
 * Private CMS draft/media QA only.
 * This does NOT authorize publishing or unpublishing.
 */
export function isCmsIsolatedDraftQaEnvironment(): boolean {
  if (
    process.env.CMS_DRAFT_QA_MODE !== "1" ||
    process.env.NODE_ENV !== "development" ||
    process.env.PORT !== "3137"
  ) return false;

  const connection = process.env.DATABASE_URL;
  if (!connection) return false;

  try {
    const url = new URL(connection);
    return url.protocol === "mysql:" &&
      (url.hostname === "localhost" || url.hostname === "127.0.0.1") &&
      url.port === "3307" &&
      decodeURIComponent(url.pathname) === "/dentasmart_vitest";
  } catch {
    return false;
  }
}

export function validateCmsTestPublication(document: CmsDocument): string | null {
  const validated = cmsDocumentSchema.safeParse(document);
  if (!validated.success) return "Document validation failed. Correct invalid blocks before publishing.";
  if (document.contentType !== "condition" || document.slug !== "toothache") {
    return "Initial test publishing is restricted to the Toothache pilot.";
  }
  if (document.blocks.some(block => block.type === "image" && !block.image?.url?.trim())) {
    return "Select an image for every Image block before TEST publication.";
  }
  const urgent = document.blocks.find(block => block.type === "urgent_care");
  if (!urgent || urgent.type !== "urgent_care" || urgent.items.every(item => !item.trim())) {
    return "Urgent dental-care instructions cannot be empty.";
  }
  // Section order is editorial choice. The editor recommends putting
  // Urgent Care before promotions; publication still requires complete
  // emergency-care instructions regardless of where the section appears.
  const urgentText = urgent.items.join(" ").toLowerCase();
  if (!urgentText.includes("breath") || !urgentText.includes("swallow")) {
    return "Keep emergency instructions for breathing or swallowing difficulties before publishing.";
  }
  if (!document.blocks.some(block => block.type === "quick_answer" && block.answer.trim().length > 20)) {
    return "A meaningful Quick Answer is required.";
  }
  if (!document.seo.metaTitle.trim() || !document.seo.metaDescription.trim()) {
    return "SEO title and description are required.";
  }
  return null;
}

/** Public endpoint reads ONLY the immutable test-published snapshot, never drafts. */
export async function getCmsTestPublishedToothache(): Promise<CmsDocument | null> {
  if (!isCmsTestPublicationEnvironment()) return null;
  const db = await getDb();
  if (!db) return null;
  try {
    const [row] = await db.select({
      publishedContent: cmsPages.publishedContent,
    }).from(cmsPages).where(eq(cmsPages.routePath, "/conditions/toothache")).limit(1);
    const parsed = cmsDocumentSchema.safeParse(row?.publishedContent);
    return parsed.success && !validateCmsTestPublication(parsed.data)
      ? { ...parsed.data, reviewer: undefined } // Never leak unverified reviewer claims publicly.
      : null;
  } catch (error) {
    console.error("[CMS] Unable to resolve test-published Toothache; using original page.");
    return null;
  }
}
