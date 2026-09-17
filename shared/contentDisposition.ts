import type { IntentFunnelStage } from "./intentOwnership";
import type { GovernanceContentChannel, GovernanceRiskLevel } from "./claimGovernance";

export const CONTENT_DISPOSITION_DECISIONS = [
  "KEEP",
  "IMPROVE",
  "REFRESH",
  "MERGE",
  "REDIRECT",
  "NOINDEX",
  "REMOVE",
  "CREATE_CANDIDATE",
  "DEFER",
] as const;

export type ContentDispositionDecision = (typeof CONTENT_DISPOSITION_DECISIONS)[number];

export const CANNIBALIZATION_CRITERIA = [
  "routeFamily",
  "titleAndH1",
  "directAnswerPromise",
  "audience",
  "funnelStage",
  "queryFamily",
  "commercialIntent",
  "ctaDestination",
  "namedEntities",
  "contentOverlap",
  "internalLinkRelationship",
  "conversionRole",
] as const;

export type CannibalizationCriterion = (typeof CANNIBALIZATION_CRITERIA)[number];
export type CannibalizationScores = Record<CannibalizationCriterion, 0 | 1 | 2>;

export type CannibalizationBand = "DISTINCT" | "RELATED" | "HIGH_OVERLAP" | "DUPLICATE_CANDIDATE";

export interface CannibalizationAssessment {
  total: number;
  band: CannibalizationBand;
  requiresOwnerDecision: boolean;
}

export interface ContentCandidateDraft {
  workingQuestion: string;
  targetAudience: string;
  funnelStage: IntentFunnelStage;
  queryFamily: string;
  intentOwnerId: string;
  cmsCategory: string;
  informationGain?: string;
  sourceFeasibility: "VERIFIED" | "PENDING" | "NOT_FEASIBLE";
  claimIds: readonly number[];
  sourceIds: readonly number[];
  riskLevel: GovernanceRiskLevel;
  canonicalPlan?: string;
  internalLinkPlan: readonly string[];
  ctaDestination?: string;
  requiredReviewerRoles: readonly string[];
  overlapScores: CannibalizationScores;
}

export interface CandidateGateResult {
  allowed: boolean;
  missing: readonly string[];
}

export const emptyCannibalizationScores = (): CannibalizationScores => ({
  routeFamily: 0,
  titleAndH1: 0,
  directAnswerPromise: 0,
  audience: 0,
  funnelStage: 0,
  queryFamily: 0,
  commercialIntent: 0,
  ctaDestination: 0,
  namedEntities: 0,
  contentOverlap: 0,
  internalLinkRelationship: 0,
  conversionRole: 0,
});

export function assessCannibalization(scores: CannibalizationScores): CannibalizationAssessment {
  const total = CANNIBALIZATION_CRITERIA.reduce((sum, criterion) => sum + scores[criterion], 0);
  const band: CannibalizationBand = total <= 5
    ? "DISTINCT"
    : total <= 11
      ? "RELATED"
      : total <= 17
        ? "HIGH_OVERLAP"
        : "DUPLICATE_CANDIDATE";
  const requiresOwnerDecision = scores.directAnswerPromise === 2 && scores.ctaDestination === 2;

  return { total, band, requiresOwnerDecision };
}

/**
 * A CREATE_CANDIDATE record is an evidence gate. Passing this gate does not
 * register a route, publish content, redirect a URL, or change SEO output.
 */
export function evaluateCreateCandidateGate(candidate: ContentCandidateDraft): CandidateGateResult {
  const missing: string[] = [];
  if (!candidate.workingQuestion.trim()) missing.push("workingQuestion");
  if (!candidate.targetAudience.trim()) missing.push("targetAudience");
  if (!candidate.queryFamily.trim()) missing.push("queryFamily");
  if (!candidate.intentOwnerId.trim()) missing.push("intentOwnerId");
  if (!candidate.cmsCategory.trim()) missing.push("cmsCategory");
  if (!candidate.informationGain?.trim()) missing.push("informationGain");
  if (candidate.sourceFeasibility !== "VERIFIED") missing.push("verifiedSources");
  if (candidate.claimIds.length === 0) missing.push("claimIds");
  if (candidate.sourceIds.length === 0) missing.push("sourceIds");
  if (!candidate.canonicalPlan?.trim()) missing.push("canonicalPlan");
  if (candidate.internalLinkPlan.length === 0) missing.push("internalLinkPlan");
  if (!candidate.ctaDestination?.trim()) missing.push("ctaDestination");
  if (candidate.requiredReviewerRoles.length === 0) missing.push("requiredReviewerRoles");

  return { allowed: missing.length === 0, missing };
}

export function isGovernedChannel(value: string): value is GovernanceContentChannel {
  return [
    "visible_body",
    "title",
    "meta_description",
    "open_graph",
    "faq",
    "direct_answer",
    "schema",
    "llms",
  ].includes(value);
}
