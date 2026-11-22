/**
 * Prevent Save Draft from changing an existing published article's status.
 * This is UI intent only: server-side publication state is enforced separately.
 */
export type BlogPublicationStatus = "draft" | "published" | "unpublished";

export function getBlogSaveIntent(status: BlogPublicationStatus, isNew: boolean): {
  label: "Save Draft" | "Save Changes";
  submittedStatus: "draft" | undefined;
  changesLivePage: boolean;
} {
  if (isNew || status === "draft") {
    return { label: "Save Draft", submittedStatus: "draft", changesLivePage: false };
  }
  return {
    label: "Save Changes",
    submittedStatus: undefined, // Never change published/unpublished status on a content save.
    changesLivePage: status === "published",
  };
}

/** Only the dedicated Publish/Unpublish procedures may withdraw a live article. */
export function isUnsafeBlogStatusDemotion(
  existingStatus: BlogPublicationStatus | undefined,
  requestedStatus: BlogPublicationStatus | undefined,
): boolean {
  return existingStatus === "published" &&
    requestedStatus !== undefined && requestedStatus !== "published";
}
