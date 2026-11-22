/** UI-only safeguard: Unpublish is shown only for an active Toothache TEST snapshot.
 * The server independently checks the isolated test database and revision.
 * Never treat a source-controlled public page as CMS-published.
 */
export function hasActiveCmsTestPublication(entry: {
  hubId: string;
  slug: string;
  publishedRevision: number | null | undefined;
}): boolean {
  return entry.hubId === "conditions" &&
    entry.slug === "toothache" &&
    entry.publishedRevision != null;
}
