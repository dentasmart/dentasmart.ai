/**
 * A cached/refetched server blog must hydrate the editor once, for its own ID.
 * Returning false leaves every local draft field exactly as the editor has it.
 */
export function shouldHydrateBlogEditor(
  editId: number | null,
  incomingId: number | null | undefined,
  hydratedArticleId: number | null,
): boolean {
  return !!editId && incomingId === editId && hydratedArticleId !== editId;
}
