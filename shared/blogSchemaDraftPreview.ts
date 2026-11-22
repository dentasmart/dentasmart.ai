import type { BlogSeoDraft } from "./blogSeoAdapter";
import { buildBlogPostingSchemas, resolvePublicBlogSchemaImage } from "./blogPostSchemas";
import { getManualBlogSchemaText, isManualBlogSchema, parseManualBlogSchema } from "./blogSchemaOverride";

/**
 * Uses the same schema builder as the public server. The preview is never
 * injected into an unpublished draft's HTML and does not publish the article.
 */
export function getBlogSchemaDraftPreview(draft: BlogSeoDraft) {
  const articleUrl = `https://dentasmart.ai/oral-health-hub/${draft.slug.trim() || "new-article"}/`;
  const canonical = draft.canonicalUrl.trim() || articleUrl;
  const input = {
    slug: draft.slug.trim() || "new-article",
    title: draft.title,
    metaTitle: draft.metaTitle,
    metaDescription: draft.metaDescription,
    canonicalUrl: canonical,
    featuredImage: draft.featuredImage,
    ogImage: draft.ogImage,
    publishedAt: draft.status === "published" ? draft.publishedAt : undefined,
    updatedAt: draft.status === "published" ? draft.updatedAt : undefined,
    reviewedByName: draft.reviewedByName,
    reviewedByCredentials: draft.reviewedByCredentials,
    reviewerShortBio: draft.reviewerShortBio,
    reviewerProfileUrl: draft.reviewerProfileUrl,
    lastReviewed: draft.lastReviewed,
    reviewerJsonLd: draft.reviewerJsonLd,
  };
  const manual = isManualBlogSchema(draft.reviewerJsonLd);
  const schemas = buildBlogPostingSchemas(input);
  // Legacy supplemental schema is preserved in automatic mode, but manual mode
  // uses the fully generated default as an editable starting point.
  const automaticSchemas = buildBlogPostingSchemas({
    ...input, reviewerJsonLd: manual ? undefined : draft.reviewerJsonLd,
  });
  const manualError = manual ? parseManualBlogSchema(getManualBlogSchemaText(draft.reviewerJsonLd!)).error : undefined;
  const schema = schemas.find(item => item["@type"] === "BlogPosting") || schemas[schemas.length - 1];
  const issues: string[] = [];
  if (!draft.title.trim()) issues.push("Add a visible article title.");
  if (!draft.metaDescription.trim()) issues.push("Add a clear meta description.");
  if (!draft.bodyHtml.trim() && !draft.storySections.some(s => s.content.trim())) {
    issues.push("Add substantive article content before publishing.");
  }
  if (draft.canonicalUrl.trim()) {
    try {
      const url = new URL(draft.canonicalUrl);
      if (url.protocol !== "https:" || !["dentasmart.ai", "www.dentasmart.ai"].includes(url.hostname.toLowerCase())) {
        issues.push("Review canonical URL: expected a secure DentaSmart page address.");
      }
    } catch {
      issues.push("Canonical URL is not a valid absolute URL.");
    }
  }
  if (draft.featuredImage.trim().startsWith("/api/cms-test-media/") ||
      (!draft.featuredImage.trim() && draft.ogImage.trim().startsWith("/api/cms-test-media/"))) {
    issues.push("Test Media Library image is not public on dentasmart.ai; replace it with a public image before publishing.");
  } else if ((draft.featuredImage || draft.ogImage) && !resolvePublicBlogSchemaImage(draft.featuredImage || draft.ogImage)) {
    issues.push("Image URL is not eligible for public schema. Provide a public HTTPS image URL.");
  }
  if (manualError) issues.push(manualError);
  return { schema, schemas, automaticSchemas, manual, manualError, issues, articleUrl, type: "BlogPosting" as const, previewOnly: true as const };
}
