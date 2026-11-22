/** Allowed Advanced CMS editor tabs (not persisted article content). */
export const CMS_EDITOR_MAIN_TABS = ["sections", "images", "seo", "organization"] as const;
export type CmsEditorMainTab = (typeof CMS_EDITOR_MAIN_TABS)[number];

export const CMS_EDITOR_SEO_TABS = ["seo", "readability", "schema", "social", "advanced"] as const;
export type CmsEditorSeoTab = (typeof CMS_EDITOR_SEO_TABS)[number];

export function parseCmsEditorMainTab(value: string | null): CmsEditorMainTab {
  return CMS_EDITOR_MAIN_TABS.find(tab => tab === value) ?? "sections";
}
export function parseCmsEditorSeoTab(value: string | null): CmsEditorSeoTab {
  return CMS_EDITOR_SEO_TABS.find(tab => tab === value) ?? "seo";
}

/** A tab choice belongs to the exact draft being edited, not the entire CMS. */
export function cmsEditorSessionKey(
  hubId: string,
  slug: string,
  group: "main" | "seo",
): string {
  return `dentasmart:advanced-cms:tab:${encodeURIComponent(hubId)}:${encodeURIComponent(slug)}:${group}`;
}
