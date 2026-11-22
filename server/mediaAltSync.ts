/**
 * Media reference inventory and alt-only synchronization. Changes to published
 * content are NEVER made by this service; review/publishing remains separate.
 */
import { eq } from "drizzle-orm";
import { blogPosts, cmsPages, cmsPageRevisions, mediaItems } from "../drizzle/schema";
import type { CmsDocument } from "../shared/cmsBlocks";
import { syncHtmlImageAlt, syncCmsDocumentAlt, type MediaIdentity } from "../shared/mediaAltSync";
import { isCmsTestPublicationEnvironment, isCmsIsolatedDraftQaEnvironment } from "./cmsTestPublication";
import { getPrivateCmsMediaConfig } from "./cmsPrivateMediaS3";

type MediaRow = typeof mediaItems.$inferSelect;
type Usage = {
  kind: "blog" | "cms";
  id: number;
  title: string;
  status: "draft" | "published" | "unpublished";
  references: number;
  slug?: string;
};

export function shouldInventoryCmsMedia(
  nodeEnv: string | undefined,
  localTest: boolean,
  isolatedQa: boolean
): boolean {
  return localTest || isolatedQa || nodeEnv === "production";
}

export function blocksProductionCmsMediaDeletion(
  nodeEnv: string | undefined,
  usages: Array<{ kind: "cms" | "blog" }>
): boolean {
  return nodeEnv === "production" &&
    usages.some(usage => usage.kind === "cms");
}

export function isMissingCmsTableError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const e = error as { code?: string; cause?: { code?: string } };
  return e.code === "ER_NO_SUCH_TABLE" ||
    e.cause?.code === "ER_NO_SUCH_TABLE";
}

export function mediaIdentity(item: MediaRow): MediaIdentity {
  return { id: item.id, urls: Array.from(new Set([
    item.url, item.thumbnailUrl, item.mediumUrl, item.webpUrl,
  ].filter((u): u is string => !!u))) };
}

export async function scanMediaReferences(db: any, item: MediaRow) {
  const identity = mediaIdentity(item);
  const blogRows: Array<{ id: number; slug: string; title: string;
    status: "draft" | "unpublished" | "published"; bodyHtml: string | null;
    featuredImage: string | null }> = await db.select({
    id: blogPosts.id, slug: blogPosts.slug, title: blogPosts.title,
    status: blogPosts.status, bodyHtml: blogPosts.bodyHtml,
    featuredImage: blogPosts.featuredImage,
  }).from(blogPosts);
  let cmsRows: Array<{ id: number; routePath: string; draftContent: CmsDocument;
    draftRevision: number; publishedContent: CmsDocument | null;
    publishedRevision: number | null }> = [];
  let cmsInventoryComplete = false;

  if (shouldInventoryCmsMedia(
    process.env.NODE_ENV,
    isCmsTestPublicationEnvironment(),
    isCmsIsolatedDraftQaEnvironment()
  )) {
    try {
      cmsRows = await db.select({
        id: cmsPages.id, routePath: cmsPages.routePath, draftContent: cmsPages.draftContent,
        draftRevision: cmsPages.draftRevision, publishedContent: cmsPages.publishedContent,
        publishedRevision: cmsPages.publishedRevision,
      }).from(cmsPages);
      cmsInventoryComplete = true;
    } catch (error) {
      // Read-only inventory may report incomplete CMS data.
      // Production deletion must reject incomplete inventories.
      if (process.env.NODE_ENV !== "production" ||
          !isMissingCmsTableError(error)) throw error;
    }
  }

  const usages: Usage[] = [];
  for (const post of blogRows) {
    const inline = syncHtmlImageAlt(post.bodyHtml || "", identity, item.altText || "");
    const featured = identity.urls.includes(post.featuredImage || "") ? 1 : 0;
    if (inline.references + featured > 0) usages.push({
      kind: "blog", id: post.id, title: post.title, slug: post.slug, status: post.status,
      references: inline.references + featured,
    });
  }
  for (const page of cmsRows) {
    const draft = syncCmsDocumentAlt(page.draftContent, identity, item.altText || "");
    if (draft.references > 0) usages.push({
      kind: "cms", id: page.id, title: page.draftContent.title,
      status: "draft", references: draft.references,
    });
    if (page.publishedContent) {
      const published = syncCmsDocumentAlt(page.publishedContent, identity, item.altText || "");
      if (published.references > 0) usages.push({
        kind: "cms", id: page.id, title: page.publishedContent.title,
        status: "published", references: published.references,
      });
    }
  }
  return { identity, usages, blogRows, cmsRows, cmsInventoryComplete };
}

export function summarizeMediaUsages(usages: Usage[]) {
  return {
    usages,
    total: usages.length,
    distinctPages: new Set(usages.map(u => u.kind + ":" + u.id)).size,
    draftCount: usages.filter(u => u.status !== "published").length,
    publishedCount: usages.filter(u => u.status === "published").length,
  };
}

export async function applyAltToUnpublishedContent(
  tx: any,
  scanned: Awaited<ReturnType<typeof scanMediaReferences>>,
  altText: string,
  originCms?: { hubId: string; slug: string },
) {
  let cmsUpdated = 0;
  let blogsUpdated = 0;
  for (const post of scanned.blogRows) {
    if (post.status === "published" || !post.bodyHtml) continue;
    const patched = syncHtmlImageAlt(post.bodyHtml, scanned.identity, altText);
    if (!patched.changed) continue;
    await tx.update(blogPosts).set({ bodyHtml: patched.html }).where(eq(blogPosts.id, post.id));
    blogsUpdated++;
  }
  for (const page of scanned.cmsRows) {
    if (originCms && page.draftContent.slug === originCms.slug &&
      (page.draftContent.hubId || "conditions") === originCms.hubId) continue;
    const patched = syncCmsDocumentAlt(page.draftContent, scanned.identity, altText);
    if (!patched.changed) continue;
    const revision = page.draftRevision + 1;
    await tx.update(cmsPages).set({
      draftContent: patched.document,
      draftRevision: revision,
    }).where(eq(cmsPages.id, page.id));
    await tx.insert(cmsPageRevisions).values({
      pageId: page.id, revision, action: "draft_saved", content: patched.document,
    });
    cmsUpdated++;
  }
  return { cmsUpdated, blogsUpdated };
}


/**
 * Read-through overlay for editor drafts. The Media Library is authoritative
 * for linked alt text; the persisted draft structure, images, captions, and
 * published snapshots remain untouched. Also used at draft-save time to
 * prevent a stale editor tab from restoring old alt text.
 */
export async function hydrateCmsAltFromLibrary(db: any, document: CmsDocument): Promise<CmsDocument> {
  if (!isCmsTestPublicationEnvironment() &&
      !isCmsIsolatedDraftQaEnvironment() &&
      !getPrivateCmsMediaConfig(process.env)) return document;
  const items: MediaRow[] = await db.select().from(mediaItems);
  let hydrated = document;
  for (const item of items) {
    const patched = syncCmsDocumentAlt(hydrated, mediaIdentity(item), item.altText || "");
    hydrated = patched.document;
  }
  return hydrated;
}

/** Unpublished blog editor loads follow the same rule without changing live posts. */
export async function hydrateBlogDraftAltFromLibrary(db: any, bodyHtml: string): Promise<string> {
  if (!isCmsTestPublicationEnvironment() || !bodyHtml) return bodyHtml;
  const items: MediaRow[] = await db.select().from(mediaItems);
  let hydrated = bodyHtml;
  for (const item of items) {
    hydrated = syncHtmlImageAlt(hydrated, mediaIdentity(item), item.altText || "").html;
  }
  return hydrated;
}
