export const treatmentPlanReviewHashes = [
  "#treatment-plan-review",
  "#second-opinion",
] as const;

export const treatmentPlanReviewSectionId = "treatment-plan-review";

export function isTreatmentPlanReviewHash(hash: string): boolean {
  return (treatmentPlanReviewHashes as readonly string[]).includes(hash);
}

export function getTreatmentPlanReviewTargetId(hash: string): string | null {
  return isTreatmentPlanReviewHash(hash) ? treatmentPlanReviewSectionId : null;
}
