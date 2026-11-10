import type { BlogSeoDraft } from "./blogSeoAdapter";

/**
 * Navigate a readability warning back to the *active* original Blog Editor.
 * Never cross over to the other authoring mode or mutate the article.
 */
export type BlogReadabilityTarget =
  | { mode: "wysiwyg"; elementId: "blog-wysiwyg-content" }
  | { mode: "structured"; elementId: string; sectionIndex: number };

export function getBlogReadabilityTarget(
  mode: BlogSeoDraft["editorMode"],
  blockId: string,
): BlogReadabilityTarget | null {
  if (mode === "wysiwyg") {
    return blockId === "blog-body" ? { mode: "wysiwyg", elementId: "blog-wysiwyg-content" } : null;
  }
  const match = /^blog-story-([0-4])$/.exec(blockId);
  if (!match) return null;
  const sectionIndex = Number(match[1]);
  return { mode: "structured", elementId: `blog-story-section-${sectionIndex}`, sectionIndex };
}

/**
 * Align the beginning of a selected review passage a little below the sticky
 * editor header. Input coordinates are viewport-relative (TipTap coordsAtPos).
 * Does not mutate the document, selection or any persisted article data.
 */
export function getBlogReadabilityScrollDelta(
  passageViewportTop: number,
  viewportHeight: number,
  stickyHeaderHeight = 108,
): number {
  if (!Number.isFinite(passageViewportTop) || !Number.isFinite(viewportHeight) || viewportHeight <= 0) return 0;
  const header = Math.max(0, Math.min(stickyHeaderHeight, viewportHeight));
  const comfortableTop = header + (viewportHeight - header) * 0.3;
  return Math.round(passageViewportTop - comfortableTop);
}
