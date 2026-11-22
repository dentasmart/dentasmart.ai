/**
 * Link attributes used by both the existing Blog rich-text editor and
 * the Advanced CMS rich-text blocks. A rel=nofollow decision must belong to
 * the individual link; it must not be reset automatically when editing text.
 */
export function validEditorLinkHref(raw: string): string | null {
  const href = raw.trim();
  if (!href || href.length > 2048) return null;
  if (href.startsWith("/") && !href.startsWith("//") && !href.includes("\\")) return href;
  if (href.startsWith("#") && href.length > 1) return href;
  try {
    const url = new URL(href);
    return (url.protocol === "https:" || url.protocol === "http:") ? href : null;
  } catch { return null; }
}
export function isExternalEditorLink(href: string): boolean {
  const valid = validEditorLinkHref(href);
  if (!valid || valid.startsWith("/") || valid.startsWith("#")) return false;
  try {
    const hostname = new URL(valid).hostname.toLowerCase();
    return hostname !== "dentasmart.ai" && hostname !== "www.dentasmart.ai" && !hostname.endsWith(".dentasmart.ai");
  } catch { return false; }
}
export function editorLinkRel(noFollow: boolean, newTab: boolean): string | null {
  const attrs = [...(newTab ? ["noopener", "noreferrer"] : []), ...(noFollow ? ["nofollow"] : [])];
  return attrs.length ? attrs.join(" ") : null;
}
export function editorLinkHasNoFollow(value: unknown): boolean {
  return typeof value === "string" && value.split(/\s+/).some(part => part.toLowerCase() === "nofollow");
}
