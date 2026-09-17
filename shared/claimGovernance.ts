import type { ContentClaimClass } from "./contentGovernance";

export const GOVERNANCE_CLAIM_STATUSES = [
  "VERIFIED",
  "PENDING",
  "RETIRED",
  "RESTRICTED",
  "REJECTED",
] as const;

export type GovernanceClaimStatus = (typeof GOVERNANCE_CLAIM_STATUSES)[number];

export const GOVERNANCE_CONTENT_CHANNELS = [
  "visible_body",
  "title",
  "meta_description",
  "open_graph",
  "faq",
  "direct_answer",
  "schema",
  "llms",
] as const;

export type GovernanceContentChannel = (typeof GOVERNANCE_CONTENT_CHANNELS)[number];

export const GOVERNANCE_RISK_LEVELS = ["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const;
export type GovernanceRiskLevel = (typeof GOVERNANCE_RISK_LEVELS)[number];

export const GOVERNANCE_APPROVAL_ROLES = [
  "EDITORIAL",
  "CLINICAL",
  "PRODUCT_BUSINESS",
  "LEGAL_PRIVACY",
] as const;

export type GovernanceApprovalRole = (typeof GOVERNANCE_APPROVAL_ROLES)[number];

export interface GovernanceClaimDefinition {
  claimKey: string;
  claimText: string;
  approvedWording: string;
  claimClass: ContentClaimClass;
  riskLevel: GovernanceRiskLevel;
  status: GovernanceClaimStatus;
  allowedParaphrase: boolean;
  allowedChannels: readonly GovernanceContentChannel[];
  prohibitedChannels?: readonly GovernanceContentChannel[];
  qualification?: string;
  expiresAt?: Date | string | null;
}

export type GovernanceApprovalState = Partial<Record<GovernanceApprovalRole, boolean>>;

export interface ClaimUseRequest {
  channel: GovernanceContentChannel;
  now?: Date;
  approvals?: GovernanceApprovalState;
}

export interface ClaimUseDecision {
  allowed: boolean;
  reason:
    | "ALLOWED"
    | "PENDING"
    | "RETIRED"
    | "REJECTED"
    | "EXPIRED"
    | "CHANNEL_NOT_ALLOWED"
    | "CHANNEL_PROHIBITED"
    | "MISSING_APPROVAL";
  missingApprovals?: readonly GovernanceApprovalRole[];
}

function hasExpired(expiresAt: GovernanceClaimDefinition["expiresAt"], now: Date): boolean {
  if (!expiresAt) return false;
  const date = expiresAt instanceof Date ? expiresAt : new Date(expiresAt);
  return !Number.isNaN(date.getTime()) && date.getTime() < now.getTime();
}

export function getRequiredApprovalRoles(claim: Pick<GovernanceClaimDefinition, "claimClass" | "riskLevel">): readonly GovernanceApprovalRole[] {
  const roles = new Set<GovernanceApprovalRole>();
  const clinicalClasses: readonly ContentClaimClass[] = [
    "CLINICAL_EDUCATION",
    "URGENT_CARE",
    "TREATMENT_INFORMATION",
    "COST_INFORMATION",
  ];
  const productClasses: readonly ContentClaimClass[] = [
    "PRODUCT_FACT",
    "BUSINESS_ROI",
    "EXTERNAL_COMPARISON",
    "TESTIMONIAL_OR_USER_CLAIM",
  ];
  const legalClasses: readonly ContentClaimClass[] = ["POLICY", "REGULATORY", "PRIVACY"];

  if (claim.riskLevel !== "LOW") roles.add("EDITORIAL");
  if (clinicalClasses.includes(claim.claimClass)) roles.add("CLINICAL");
  if (productClasses.includes(claim.claimClass)) roles.add("PRODUCT_BUSINESS");
  if (legalClasses.includes(claim.claimClass)) roles.add("LEGAL_PRIVACY");
  if (claim.riskLevel === "CRITICAL") roles.add("EDITORIAL");

  return Array.from(roles);
}

export function getMissingClaimApprovals(
  claim: Pick<GovernanceClaimDefinition, "claimClass" | "riskLevel">,
  approvals: GovernanceApprovalState = {},
): readonly GovernanceApprovalRole[] {
  return getRequiredApprovalRoles(claim).filter((role) => approvals[role] !== true);
}

/**
 * Applies governance checks only to new governed work. Existing public legacy
 * pages remain outside this gate until a separately approved migration maps them.
 */
export function evaluateGovernedClaimUse(
  claim: GovernanceClaimDefinition,
  request: ClaimUseRequest,
): ClaimUseDecision {
  if (claim.status === "PENDING") return { allowed: false, reason: "PENDING" };
  if (claim.status === "RETIRED") return { allowed: false, reason: "RETIRED" };
  if (claim.status === "REJECTED") return { allowed: false, reason: "REJECTED" };

  const now = request.now ?? new Date();
  if (claim.status === "VERIFIED" && hasExpired(claim.expiresAt, now)) {
    return { allowed: false, reason: "EXPIRED" };
  }
  if (!claim.allowedChannels.includes(request.channel)) {
    return { allowed: false, reason: "CHANNEL_NOT_ALLOWED" };
  }
  if (claim.prohibitedChannels?.includes(request.channel)) {
    return { allowed: false, reason: "CHANNEL_PROHIBITED" };
  }

  const missingApprovals = getMissingClaimApprovals(claim, request.approvals);
  if (missingApprovals.length > 0) {
    return { allowed: false, reason: "MISSING_APPROVAL", missingApprovals };
  }

  return { allowed: true, reason: "ALLOWED" };
}
