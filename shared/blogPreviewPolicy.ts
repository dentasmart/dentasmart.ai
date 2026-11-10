/**
 * A private preview always reflects a saved snapshot, never unsaved form state.
 * Ineligible states cannot open an outdated preview and claim it reflects edits.
 */
export function canPreviewSavedBlog(input: {
  articleId: number | null;
  isDirty: boolean;
  tagsChanged: boolean;
  isSaving: boolean;
}): boolean {
  return Number.isSafeInteger(input.articleId) && (input.articleId ?? 0) > 0 &&
    !input.isDirty && !input.tagsChanged && !input.isSaving;
}
export function blogDraftPreviewPath(articleId: number): string {
  if (!Number.isSafeInteger(articleId) || articleId <= 0) throw new Error("Invalid saved blog ID.");
  return "/admin/blog-draft-preview/" + articleId;
}

/**
 * View the article served by this site's public blog route, never the private
 * saved preview or an external production host. Use the persisted record,
 * not an unsaved slug/status from an open editor form.
 */
export function blogLiveArticlePath(article: {
  status: "draft" | "published" | "unpublished";
  slug: string;
} | null | undefined): string | null {
  if (article?.status !== "published" || !article.slug.trim()) return null;
  return "/oral-health-hub/" + encodeURIComponent(article.slug.trim());
}
