/**
 * Library alt is a reusable default. Each page/image placement keeps its own
 * alt attribute; changing one placement must not rewrite existing articles.
 */
export function shouldSaveMediaAltDefault(
  mediaId: number | undefined | null,
  previousAlt: string,
  editedAlt: string,
  decorative = false,
): boolean {
  return Number.isInteger(mediaId) && (mediaId || 0) > 0 &&
    !decorative && previousAlt !== editedAlt;
}
