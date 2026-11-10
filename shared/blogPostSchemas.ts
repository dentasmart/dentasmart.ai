import { toSchemaUrl, normalizeInternalSchemaUrl } from "./jsonLd";
import { getOrganizationSchema, getWebSiteSchema, ORGANIZATION_ID } from "./schemaOwnership";
import { buildBlogReviewWebPageSchema, getPublicBlogReviewerMetadata, getPublicLastReviewed, getPublicSupplementalJsonLd } from "./blogReviewerMetadata";
import { getPublicManualBlogSchema, isManualBlogSchema } from "./blogSchemaOverride";

const SITE_URL = "https://dentasmart.ai";

/**
 * Only use image URLs that could be fetched on the public website.
 * Test Media Library assets are private to the isolated CMS and must never be
 * advertised as dentasmart.ai/api/cms-test-media assets in public schema.
 */
export function resolvePublicBlogSchemaImage(value?: string | null): string | undefined {
  const raw = value?.trim();
  if (!raw || raw.startsWith("//")) return undefined;
  let url: URL;
  try { url = new URL(raw, SITE_URL); } catch { return undefined; }
  if (url.username || url.password) return undefined;
  if (url.protocol !== "https:" && url.protocol !== "http:") return undefined;
  if (url.pathname.startsWith("/api/cms-test-media/")) return undefined;
  const internal = ["dentasmart.ai", "www.dentasmart.ai"].includes(url.hostname.toLowerCase());
  if (!internal && url.protocol !== "https:") return undefined;
  return internal ? normalizeInternalSchemaUrl(url.toString()) : url.toString();
}

export interface PublicBlogPostSchemaInput {
  slug: string;
  title: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  featuredImage?: string | null;
  ogImage?: string | null;
  publishedAt?: Date | string | null;
  updatedAt?: Date | string | null;
  reviewedByName?: string | null;
  reviewedByCredentials?: string | null;
  reviewerShortBio?: string | null;
  reviewerProfileUrl?: string | null;
  lastReviewed?: string | null;
  reviewerJsonLd?: string | null;
}
/** Shared by public server markup, SPA navigation, and editor live preview. */
export function buildBlogPostingSchemas(post: PublicBlogPostSchemaInput): Record<string, unknown>[] {
  const siteSchemas = [getOrganizationSchema(), getWebSiteSchema()];
  const manual = getPublicManualBlogSchema(post);
  // Manual mode overrides page-specific nodes ONLY. Keep sitewide identities.
  if (manual) return [...siteSchemas, manual];
  // Invalid stored manual data falls back to automatic markup; the save API rejects it.
  const reviewer = getPublicBlogReviewerMetadata(post);
  const lastReviewed = getPublicLastReviewed(post);
  const canonical = toSchemaUrl(post.canonicalUrl || `${SITE_URL}/oral-health-hub/${post.slug}/`);
  const blogPosting: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metaTitle || post.title,
    description: post.metaDescription || "",
    url: canonical,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": reviewer || lastReviewed ? `${canonical}#webpage` : canonical,
    },
    publisher: { "@id": ORGANIZATION_ID },
    author: { "@id": ORGANIZATION_ID },
  };
  const image = resolvePublicBlogSchemaImage(post.featuredImage) || resolvePublicBlogSchemaImage(post.ogImage);
  if (image) blogPosting.image = image;
  if (post.publishedAt) blogPosting.datePublished = new Date(post.publishedAt).toISOString();
  if (post.updatedAt) blogPosting.dateModified = new Date(post.updatedAt).toISOString();
  const schemas: Record<string, unknown>[] = [...siteSchemas];
  if (reviewer || lastReviewed) {
    schemas.push(buildBlogReviewWebPageSchema({
      canonicalUrl: canonical,
      title: post.metaTitle || post.title,
      description: post.metaDescription || "",
      ...(lastReviewed ? { lastReviewed } : {}),
      ...(reviewer ? { review: reviewer } : {}),
    }));
  }
  schemas.push(blogPosting);
  if (!isManualBlogSchema(post.reviewerJsonLd)) {
    const legacySupplemental = getPublicSupplementalJsonLd(post);
    if (legacySupplemental) schemas.push(legacySupplemental);
  }
  return schemas;
}
