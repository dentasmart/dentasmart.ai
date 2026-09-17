import { describe, expect, it } from "vitest";
import {
  evaluateGovernedClaimUse,
  getMissingClaimApprovals,
  type GovernanceClaimDefinition,
} from "../shared/claimGovernance";
import {
  assessCannibalization,
  emptyCannibalizationScores,
  evaluateCreateCandidateGate,
} from "../shared/contentDisposition";
import {
  createGovernedContentVersionHash,
  doesApprovalBindCurrentVersion,
  evaluateReReviewRequirement,
} from "./governanceReview";

const verifiedProductClaim: GovernanceClaimDefinition = {
  claimKey: "verified-product",
  claimText: "A verified product fact.",
  approvedWording: "A verified product fact.",
  claimClass: "PRODUCT_FACT",
  riskLevel: "HIGH",
  status: "VERIFIED",
  allowedParaphrase: false,
  allowedChannels: ["visible_body", "schema"],
};

describe("Phase 2 governance core", () => {
  it("blocks pending, retired, rejected, expired, and incompatible claim uses", () => {
    expect(evaluateGovernedClaimUse({ ...verifiedProductClaim, status: "PENDING" }, { channel: "visible_body" }).reason).toBe("PENDING");
    expect(evaluateGovernedClaimUse({ ...verifiedProductClaim, status: "RETIRED" }, { channel: "visible_body" }).reason).toBe("RETIRED");
    expect(evaluateGovernedClaimUse({ ...verifiedProductClaim, status: "REJECTED" }, { channel: "visible_body" }).reason).toBe("REJECTED");
    expect(evaluateGovernedClaimUse({ ...verifiedProductClaim, expiresAt: "2020-01-01" }, { channel: "visible_body" }).reason).toBe("EXPIRED");
    expect(evaluateGovernedClaimUse(verifiedProductClaim, { channel: "llms" }).reason).toBe("CHANNEL_NOT_ALLOWED");
  });

  it("requires approval roles based on governed claim risk and class", () => {
    expect(getMissingClaimApprovals(verifiedProductClaim, { EDITORIAL: true })).toEqual(["PRODUCT_BUSINESS"]);
    expect(evaluateGovernedClaimUse(verifiedProductClaim, {
      channel: "schema",
      approvals: { EDITORIAL: true, PRODUCT_BUSINESS: true },
    })).toEqual({ allowed: true, reason: "ALLOWED" });
  });

  it("creates deterministic hashes that change with reviewed content", () => {
    const original = createGovernedContentVersionHash({
      contentKey: "blog:1",
      routePath: "/oral-health-hub/example/",
      title: "Example",
      bodyHtml: "<p>Answer</p>",
      metadata: { title: "Example", description: "Short answer" },
      claimIds: [4, 2],
      sourceIds: [8, 6],
    });
    const equivalent = createGovernedContentVersionHash({
      contentKey: "blog:1",
      routePath: "/oral-health-hub/example",
      title: "Example",
      bodyHtml: "<p>Answer</p>",
      metadata: { description: "Short answer", title: "Example" },
      claimIds: [2, 4],
      sourceIds: [6, 8],
    });
    const changed = createGovernedContentVersionHash({
      contentKey: "blog:1",
      routePath: "/oral-health-hub/example",
      title: "Example",
      bodyHtml: "<p>Changed answer</p>",
    });

    expect(original).toBe(equivalent);
    expect(changed).not.toBe(original);
  });

  it("binds approval to the exact final content version and marks material changes for review", () => {
    const hash = createGovernedContentVersionHash({ contentKey: "blog:1", bodyHtml: "<p>Approved</p>" });
    expect(doesApprovalBindCurrentVersion({
      contentVersionHash: hash,
      finalApprovedVersionHash: hash,
      clinicalDecision: "APPROVED",
      productBusinessDecision: "REVIEW_NOT_REQUIRED",
      legalPrivacyDecision: "REVIEW_NOT_REQUIRED",
      editorialDecision: "APPROVED",
      reReviewRequired: false,
    }, hash)).toBe(true);
    expect(evaluateReReviewRequirement(["urgent_instruction", "price", "privacy", "reviewer_credential"])).toEqual({
      clinical: true,
      productBusiness: true,
      legalPrivacy: true,
      reviewerVerification: true,
      required: true,
    });
  });

  it("scores structural cannibalization without treating it as performance evidence", () => {
    const scores = emptyCannibalizationScores();
    scores.directAnswerPromise = 2;
    scores.ctaDestination = 2;
    scores.contentOverlap = 2;
    scores.conversionRole = 2;
    scores.queryFamily = 2;
    scores.audience = 2;

    expect(assessCannibalization(scores)).toEqual({
      total: 12,
      band: "HIGH_OVERLAP",
      requiresOwnerDecision: true,
    });
  });

  it("requires documented information gain and governance inputs before a new URL candidate can proceed", () => {
    const base = {
      workingQuestion: "How do I prepare questions for a dental treatment plan?",
      targetAudience: "Consumers",
      funnelStage: "CONSIDERATION" as const,
      queryFamily: "treatment-plan-questions",
      intentOwnerId: "treatment-plan-review",
      cmsCategory: "Dental Problems",
      informationGain: "Answers a distinct preparation question not covered by the owner page.",
      sourceFeasibility: "VERIFIED" as const,
      claimIds: [1],
      sourceIds: [1],
      riskLevel: "HIGH" as const,
      canonicalPlan: "/oral-health-hub/treatment-plan-questions",
      internalLinkPlan: ["/pricing", "/oral-health-hub/second-opinion"],
      ctaDestination: "/pricing",
      requiredReviewerRoles: ["EDITORIAL", "CLINICAL"],
      overlapScores: emptyCannibalizationScores(),
    };

    expect(evaluateCreateCandidateGate(base)).toEqual({ allowed: true, missing: [] });
    expect(evaluateCreateCandidateGate({ ...base, informationGain: "", sourceFeasibility: "PENDING" }).missing).toEqual([
      "informationGain",
      "verifiedSources",
    ]);
  });
});
