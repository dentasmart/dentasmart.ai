import type { CmsDocument } from "./cmsBlocks";

/**
 * Read-only adapter so the existing Blog Editor can reuse Advanced CMS SEO
 * analysis without adopting the 14-hub draft store or changing blog routes.
 */
export interface BlogSeoDraft {
  title: string;
  slug: string;
  bodyHtml: string;
  editorMode: "structured" | "wysiwyg";
  storySections: readonly { heading: string; content: string }[];
  primaryKeyword: string;
  secondaryKeywords: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  featuredImage: string;
  reviewedByName?: string;
  reviewedByCredentials?: string;
  reviewerShortBio?: string;
  reviewerProfileUrl?: string;
  lastReviewed?: string;
  reviewerJsonLd?: string;
  publishedAt?: Date | string | null;
  updatedAt?: Date | string | null;
  status?: "draft" | "published" | "unpublished";
}

export function blogSecondaryPhrases(value: string): string[] {
  const output: string[] = [];
  const seen = new Set<string>();
  for (const candidate of value.split(",")) {
    const phrase = candidate.trim().replace(/\s+/g, " ");
    if (!phrase || phrase.length > 200) continue;
    const key = phrase.toLocaleLowerCase("en-US");
    if (seen.has(key)) continue;
    seen.add(key);
    output.push(phrase);
    if (output.length >= 30) break; // CMS SEO checker supports 30 phrases.
  }
  return output;
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Analyze the mode currently selected by the editor, never count both copies. */
export function blogDraftToCmsSeoDocument(draft: BlogSeoDraft): CmsDocument {
  const blocks: CmsDocument["blocks"] = [];
  if (draft.editorMode === "wysiwyg") {
    if (draft.bodyHtml.trim()) {
      blocks.push({ type: "rich_text", id: "blog-body", html: draft.bodyHtml });
    }
  } else {
    draft.storySections.forEach((section, index) => {
      if (!section.heading.trim() && !section.content.trim()) return;
      blocks.push({
        type: "rich_text",
        id: "blog-story-" + index,
        heading: section.heading.trim() || undefined,
        html: section.content.trim() ? "<p>" + escapeHtml(section.content) + "</p>" : "",
      });
    });
  }
  return {
    contentType: "blog",
    slug: draft.slug.trim() || "unsaved-draft",
    title: draft.title.trim() || "Untitled draft",
    templateKey: "existing-blog-editor",
    templateVersion: 1,
    blocks,
    images: {}, // Featured and OG artwork are metadata, not on-page image blocks.
    tags: [],
    seo: {
      focusKeyword: draft.primaryKeyword.trim(),
      secondaryKeywords: blogSecondaryPhrases(draft.secondaryKeywords),
      // Missing SEO title must not inherit the visible article title for scoring.
      // Search/social previews keep their display-only fallbacks.
      metaTitle: draft.metaTitle.trim(),
      metaDescription: draft.metaDescription,
      canonicalUrl: draft.canonicalUrl.trim() || undefined,
      ogTitle: draft.ogTitle.trim() || undefined,
      ogDescription: draft.ogDescription.trim() || undefined,
    },
  };
}

/** Social card never falls back to a page hero image. */
export function blogSocialPreview(draft: BlogSeoDraft) {
  return {
    title: draft.ogTitle.trim() || draft.metaTitle.trim() || draft.title.trim(),
    description: draft.ogDescription.trim() || draft.metaDescription.trim(),
    image: draft.ogImage.trim() || draft.featuredImage.trim(),
  };
}
