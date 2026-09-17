import { createHash } from "node:crypto";
import type { ContentClaimClass } from "../shared/contentGovernance";
import type { GovernanceRiskLevel } from "../shared/claimGovernance";

export const GOVERNANCE_DECISIONS = [
  "APPROVED",
  "APPROVED_WITH_CHANGES",
  "REJECTED",
  "REVIEW_NOT_REQUIRED",
  "PENDING",
] as const;

export type GovernanceDecision = (typeof GOVERNANCE_DECISIONS)[number];

export interface ContentVersionInput {
  contentKey: string;
  title?: string | null;
  routePath?: string | null;
  bodyHtml?: string | null;
  metadata?: Record<string, string | null | undefined>;
  claimIds?: readonly number[];
  sourceIds?: readonly number[];
}

export interface GovernanceApprovalInput {
  contentVersionHash: string;
  finalApprovedVersionHash?: string | null;
  clinicalDecision: GovernanceDecision;
  productBusinessDecision: GovernanceDecision;
  legalPrivacyDecision: GovernanceDecision;
  editorialDecision: GovernanceDecision;
  reReviewRequired: boolean;
}

export type ReviewChangeTrigger =
  | "health_claim"
  | "urgent_instruction"
  | "treatment_description"
  | "clinical_source"
  | "capability"
  | "availability"
  | "price"
  | "plan"
  | "billing"
  | "family_limit"
  | "commercial_offer"
  | "privacy"
  | "security"
  | "retention"
  | "sharing"
  | "analytics"
  | "employer_data_access"
  | "terms"
  | "refund_or_guarantee"
  | "comparison_methodology"
  | "reviewer_credential"
  | "reviewer_role"
  | "reviewer_display_permission"
  | "reviewer_attribution";

export interface ReReviewRequirement {
  clinical: boolean;
  productBusiness: boolean;
  legalPrivacy: boolean;
  reviewerVerification: boolean;
  required: boolean;
}

function normalizeHtml(value: string | null | undefined): string {
  return (value ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/>\s+</g, "><")
    .trim();
}

function sortRecord(record: Record<string, string | null | undefined> | undefined): Record<string, string | null> {
  return Object.fromEntries(
    Object.entries(record ?? {})
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, value]) => [key, value ?? null]),
  );
}

/**
 * Deterministic hash for a reviewed content release. It deliberately excludes
 * timestamps, editor IDs, query strings, uploaded files, and private inputs.
 */
export function createGovernedContentVersionHash(input: ContentVersionInput): string {
  const payload = JSON.stringify({
    contentKey: input.contentKey.trim(),
    title: input.title?.trim() ?? null,
    routePath: input.routePath?.replace(/[?#].*$/, "").replace(/\/+$/, "") || null,
    bodyHtml: normalizeHtml(input.bodyHtml),
    metadata: sortRecord(input.metadata),
    claimIds: [...(input.claimIds ?? [])].sort((left, right) => left - right),
    sourceIds: [...(input.sourceIds ?? [])].sort((left, right) => left - right),
  });
  return createHash("sha256").update(payload).digest("hex");
}

export function evaluateReReviewRequirement(
  triggers: readonly ReviewChangeTrigger[],
): ReReviewRequirement {
  const triggerSet = new Set(triggers);
  const clinical = ["health_claim", "urgent_instruction", "treatment_description", "clinical_source"].some((trigger) => triggerSet.has(trigger as ReviewChangeTrigger));
  const productBusiness = ["capability", "availability", "price", "plan", "billing", "family_limit", "commercial_offer"].some((trigger) => triggerSet.has(trigger as ReviewChangeTrigger));
  const legalPrivacy = ["privacy", "security", "retention", "sharing", "analytics", "employer_data_access", "terms", "refund_or_guarantee", "comparison_methodology"].some((trigger) => triggerSet.has(trigger as ReviewChangeTrigger));
  const reviewerVerification = ["reviewer_credential", "reviewer_role", "reviewer_display_permission", "reviewer_attribution"].some((trigger) => triggerSet.has(trigger as ReviewChangeTrigger));

  return {
    clinical,
    productBusiness,
    legalPrivacy,
    reviewerVerification,
    required: clinical || productBusiness || legalPrivacy || reviewerVerification,
  };
}

export function doesApprovalBindCurrentVersion(
  approval: GovernanceApprovalInput,
  currentVersionHash: string,
): boolean {
  if (approval.reReviewRequired) return false;
  if (approval.clinicalDecision === "REJECTED" || approval.productBusinessDecision === "REJECTED" || approval.legalPrivacyDecision === "REJECTED" || approval.editorialDecision === "REJECTED") {
    return false;
  }
  return approval.finalApprovedVersionHash === currentVersionHash && approval.contentVersionHash === currentVersionHash;
}

export function requiredReviewForClaimClasses(
  claimClasses: readonly ContentClaimClass[],
  riskLevel: GovernanceRiskLevel,
): ReReviewRequirement {
  const triggers: ReviewChangeTrigger[] = [];
  if (claimClasses.some((claimClass) => ["CLINICAL_EDUCATION", "URGENT_CARE", "TREATMENT_INFORMATION", "COST_INFORMATION"].includes(claimClass))) {
    triggers.push("health_claim");
  }
  if (claimClasses.some((claimClass) => ["PRODUCT_FACT", "BUSINESS_ROI", "EXTERNAL_COMPARISON", "TESTIMONIAL_OR_USER_CLAIM"].includes(claimClass))) {
    triggers.push("commercial_offer");
  }
  if (claimClasses.some((claimClass) => ["POLICY", "REGULATORY", "PRIVACY"].includes(claimClass))) {
    triggers.push("privacy");
  }
  if (riskLevel === "CRITICAL" && triggers.length === 0) triggers.push("health_claim");
  return evaluateReReviewRequirement(triggers);
}
