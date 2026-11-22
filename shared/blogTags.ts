/** Editor-only blog tags. Distinct from SEO meta keywords and from public blog taxonomy. */
export const MAX_BLOG_TAGS = 30;
export const MAX_BLOG_TAG_LENGTH = 100;

/** Normalize comma-separated or structured tags without quietly truncating information. */
export function normalizeBlogTags(input: string | readonly string[]): string[] {
  const parts = typeof input === "string" ? input.split(",") : input;
  const tags: string[] = [];
  const seen = new Set<string>();
  for (const part of parts) {
    const tag = part.trim().replace(/\s+/g, " ");
    if (!tag) continue;
    if (tag.length > MAX_BLOG_TAG_LENGTH) throw new Error("Each tag must be 100 characters or fewer.");
    const key = tag.toLocaleLowerCase("en-US");
    if (seen.has(key)) continue;
    if (tags.length === MAX_BLOG_TAGS) throw new Error("A blog can have at most 30 tags.");
    seen.add(key);
    tags.push(tag);
  }
  return tags;
}

/** Append comma-separated input to saved tags without replacing any existing tags. */
export function appendBlogTags(saved: readonly string[], input: string): string[] {
  return normalizeBlogTags([...saved, ...normalizeBlogTags(input)]);
}

/** Remove only the selected chip; its deletion is persisted by the editor. */
export function removeBlogTag(saved: readonly string[], tagToRemove: string): string[] {
  return saved.filter(tag => tag !== tagToRemove);
}
