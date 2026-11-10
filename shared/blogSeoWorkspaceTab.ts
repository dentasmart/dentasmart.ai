/** Blog Editor's seven SEO workspace tabs, separate from StoryBrand/Rich Text mode. */
export const BLOG_SEO_WORKSPACE_TABS = [
  "seo", "readability", "social", "media", "schema", "reviewer", "advanced",
] as const;

export type BlogSeoWorkspaceTab = (typeof BLOG_SEO_WORKSPACE_TABS)[number];

/** Keep tab preferences separate across articles in the same browser tab. */
export function blogSeoWorkspaceTabKey(articleId: number | null): string {
  return `dentasmart:blog-seo-workspace:${articleId !== null && Number.isInteger(articleId) && articleId > 0 ? articleId : "new"}`;
}

/** Invalid/outdated storage values must never open an unknown panel. */
export function parseBlogSeoWorkspaceTab(value: string | null): BlogSeoWorkspaceTab {
  return BLOG_SEO_WORKSPACE_TABS.find(tab => tab === value) ?? "seo";
}
