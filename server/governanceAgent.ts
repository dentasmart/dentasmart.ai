import { TRPCError } from "@trpc/server";
import { and, eq, inArray } from "drizzle-orm";
import {
  governanceCandidates,
  governanceClaims,
  governanceSources,
} from "../drizzle/schema";
import { evaluateGovernedClaimUse } from "../shared/claimGovernance";
import { evaluateCreateCandidateGate, type CannibalizationScores } from "../shared/contentDisposition";
import { getIntentOwner } from "../shared/intentOwnership";
import { getDb } from "./db";

export interface GovernedDraftContext {
  candidateId: number;
  candidateKey: string;
  intentOwnerId: string;
  workingQuestion: string;
  targetAudience: string;
  queryFamily: string;
  cmsCategory: "Dentist Problems" | "Dental Problems" | "Insurance Problems" | "Symptoms" | "Gums" | "Cavities" | "X-Rays" | "Costs";
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  requiredReviewerRoles: readonly string[];
  informationGain: string;
  internalLinkPlan: readonly string[];
  ctaDestination: string;
  canonicalPlan: string;
  claims: readonly {
    id: number;
    claimKey: string;
    approvedWording: string;
    qualification: string | null;
  }[];
  sources: readonly {
    id: number;
    sourceKey: string;
    title: string;
    publisher: string | null;
    scope: string | null;
  }[];
}

function asNumberArray(value: unknown): number[] {
  if (!Array.isArray(value) || !value.every((item) => typeof item === "number" && Number.isInteger(item) && item > 0)) return [];
  return Array.from(new Set(value));
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value) || !value.every((item) => typeof item === "string" && item.startsWith("/"))) return [];
  return Array.from(new Set(value));
}

/**
 * This resolver is intentionally called before the LLM. It returns only approved
 * operational context and blocks drafts when any governed dependency is missing.
 */
export async function resolveGovernedDraftContext(candidateId: number): Promise<GovernedDraftContext> {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Governance database is not available" });

  const [candidate] = await db.select().from(governanceCandidates)
    .where(and(
      eq(governanceCandidates.id, candidateId),
      eq(governanceCandidates.status, "APPROVED"),
      eq(governanceCandidates.approvalState, "APPROVED"),
    ))
    .limit(1);
  if (!candidate) {
    throw new TRPCError({ code: "PRECONDITION_FAILED", message: "An approved governance candidate is required before drafting" });
  }

  if (!getIntentOwner(candidate.intentOwnerId)) {
    throw new TRPCError({ code: "PRECONDITION_FAILED", message: "The candidate has no valid intent owner" });
  }

  const claimIds = asNumberArray(candidate.claimIds);
  const sourceIds = asNumberArray(candidate.sourceIds);
  const internalLinkPlan = asStringArray(candidate.internalLinkPlan);
  const requiredReviewerRoles = Array.isArray(candidate.requiredReviewerRoles)
    ? candidate.requiredReviewerRoles.filter((role): role is string => typeof role === "string")
    : [];
  const gate = evaluateCreateCandidateGate({
    workingQuestion: candidate.workingQuestion,
    targetAudience: candidate.targetAudience,
    funnelStage: candidate.funnelStage as "AWARENESS" | "CONSIDERATION" | "CONVERSION" | "RETENTION" | "TRUST",
    queryFamily: candidate.queryFamily,
    intentOwnerId: candidate.intentOwnerId,
    cmsCategory: candidate.cmsCategory,
    informationGain: candidate.informationGain ?? undefined,
    sourceFeasibility: candidate.sourceFeasibility,
    claimIds,
    sourceIds,
    riskLevel: candidate.riskLevel,
    canonicalPlan: candidate.canonicalPlan ?? undefined,
    internalLinkPlan,
    ctaDestination: candidate.ctaDestination ?? undefined,
    requiredReviewerRoles,
    overlapScores: candidate.overlapScores as CannibalizationScores,
  });
  if (!gate.allowed) {
    throw new TRPCError({ code: "PRECONDITION_FAILED", message: `Candidate governance is incomplete: ${gate.missing.join(", ")}` });
  }

  const [claims, sources] = await Promise.all([
    db.select().from(governanceClaims).where(inArray(governanceClaims.id, claimIds)),
    db.select().from(governanceSources).where(inArray(governanceSources.id, sourceIds)),
  ]);
  if (claims.length !== claimIds.length || sources.length !== sourceIds.length) {
    throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Candidate claim or source references are incomplete" });
  }
  if (sources.some((source) => source.verificationStatus !== "verified")) {
    throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Candidate sources must be verified before drafting" });
  }
  for (const claim of claims) {
    const claimUse = evaluateGovernedClaimUse({
      claimKey: claim.claimKey,
      claimText: claim.claimText,
      approvedWording: claim.approvedWording,
      claimClass: claim.claimClass,
      riskLevel: claim.riskLevel,
      status: claim.status,
      allowedParaphrase: claim.allowedParaphrase,
      allowedChannels: (claim.allowedChannels as any[]) ?? [],
      prohibitedChannels: (claim.prohibitedChannels as any[]) ?? [],
      expiresAt: claim.expiresAt,
    }, {
      channel: "visible_body",
      approvals: { EDITORIAL: true, CLINICAL: true, PRODUCT_BUSINESS: true, LEGAL_PRIVACY: true },
    });
    if (!claimUse.allowed) {
      throw new TRPCError({ code: "PRECONDITION_FAILED", message: `Claim ${claim.claimKey} cannot be used in governed body content: ${claimUse.reason}` });
    }
  }

  return {
    candidateId: candidate.id,
    candidateKey: candidate.candidateKey,
    intentOwnerId: candidate.intentOwnerId,
    workingQuestion: candidate.workingQuestion,
    targetAudience: candidate.targetAudience,
    queryFamily: candidate.queryFamily,
    cmsCategory: candidate.cmsCategory,
    riskLevel: candidate.riskLevel,
    requiredReviewerRoles,
    informationGain: candidate.informationGain!,
    internalLinkPlan,
    ctaDestination: candidate.ctaDestination!,
    canonicalPlan: candidate.canonicalPlan!,
    claims: claims.map((claim) => ({
      id: claim.id,
      claimKey: claim.claimKey,
      approvedWording: claim.approvedWording,
      qualification: claim.qualification,
    })),
    sources: sources.map((source) => ({
      id: source.id,
      sourceKey: source.sourceKey,
      title: source.title,
      publisher: source.publisher,
      scope: source.scope,
    })),
  };
}
