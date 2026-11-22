/**
 * Shared UI/server safety rules for deleting CMS draft records.
 *
 * A source-backed entry is never a deletable public page: only its private
 * saved CMS overlay can be discarded. Published test snapshots are protected.
 */
export interface CmsDraftDeleteCandidate {
  editable: boolean;
  revision: number;
  publishedRevision: number | null;
  origin: "source" | "draft";
}
export interface CmsDraftDeletePolicy {
  allowed: boolean;
  label: string;
  explanation: string;
}
export function getCmsDraftDeletePolicy(candidate: CmsDraftDeleteCandidate): CmsDraftDeletePolicy {
  const label = candidate.origin === "source" ? "Discard saved draft" : "Delete draft";
  if (!candidate.editable) {
    return { allowed: false, label, explanation: "This original page is read-only and cannot be deleted." };
  }
  if (candidate.revision < 1) {
    return { allowed: false, label, explanation: "There is no saved private draft to delete." };
  }
  if (candidate.publishedRevision != null) {
    return { allowed: false, label, explanation: "This draft has an existing test-published snapshot. Deletion is blocked to preserve the published record." };
  }
  return {
    allowed: true, label,
    explanation: candidate.origin === "source"
      ? "This removes only the saved CMS draft and its revision history. The original source-controlled public page stays unchanged."
      : "This permanently removes this private test draft and its revision history. It cannot be undone.",
  };
}
