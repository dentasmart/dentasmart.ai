import { TRPCError } from "@trpc/server";
import { and, desc, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import {
  governanceApprovals,
  governanceCandidates,
  governanceClaimSources,
  governanceClaims,
  governanceClaimUses,
  governanceSources,
} from "../drizzle/schema";
import {
  GOVERNANCE_APPROVAL_ROLES,
  GOVERNANCE_CLAIM_STATUSES,
  GOVERNANCE_CONTENT_CHANNELS,
  GOVERNANCE_RISK_LEVELS,
  evaluateGovernedClaimUse,
  type GovernanceApprovalRole,
} from "../shared/claimGovernance";
import {
  CONTENT_DISPOSITION_DECISIONS,
  CANNIBALIZATION_CRITERIA,
  assessCannibalization,
  emptyCannibalizationScores,
  evaluateCreateCandidateGate,
} from "../shared/contentDisposition";
import {
  governanceClaimSeeds,
  governanceSourceSeeds,
} from "../shared/governanceSeeds";
import {
  getIntentOwner,
  getStaticRoutePaths,
  intentOwnershipRegistry,
} from "../shared/intentOwnership";
import { adminProcedure } from "./adminAuth";
import { getDb } from "./db";
import {
  GOVERNANCE_DECISIONS,
  createGovernedContentVersionHash,
  evaluateReReviewRequirement,
  requiredReviewForClaimClasses,
} from "./governanceReview";
import { router } from "./_core/trpc";

const claimClassSchema = z.enum([
  "PRODUCT_FACT",
  "CLINICAL_EDUCATION",
  "URGENT_CARE",
  "TREATMENT_INFORMATION",
  "COST_INFORMATION",
  "EXTERNAL_COMPARISON",
  "POLICY",
  "TESTIMONIAL_OR_USER_CLAIM",
  "BUSINESS_ROI",
  "REGULATORY",
  "PRIVACY",
]);

const decisionSchema = z.enum(GOVERNANCE_DECISIONS);
const claimStatusSchema = z.enum(GOVERNANCE_CLAIM_STATUSES);
const riskLevelSchema = z.enum(GOVERNANCE_RISK_LEVELS);
const channelSchema = z.enum(GOVERNANCE_CONTENT_CHANNELS);
const approvalRoleSchema = z.enum(GOVERNANCE_APPROVAL_ROLES);
const dispositionSchema = z.enum(CONTENT_DISPOSITION_DECISIONS);
const overlapScoreSchema = z.union([z.literal(0), z.literal(1), z.literal(2)]);
const cannibalizationScoresSchema = z.object({
  routeFamily: overlapScoreSchema,
  titleAndH1: overlapScoreSchema,
  directAnswerPromise: overlapScoreSchema,
  audience: overlapScoreSchema,
  funnelStage: overlapScoreSchema,
  queryFamily: overlapScoreSchema,
  commercialIntent: overlapScoreSchema,
  ctaDestination: overlapScoreSchema,
  namedEntities: overlapScoreSchema,
  contentOverlap: overlapScoreSchema,
  internalLinkRelationship: overlapScoreSchema,
  conversionRole: overlapScoreSchema,
});

function requireDatabase<T>(db: T | null): T {
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Governance database is not available" });
  return db;
}

function assertKnownIntentOwner(intentOwnerId: string): void {
  if (!getIntentOwner(intentOwnerId)) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Unknown intent owner ID" });
  }
}

function assertKnownStaticRoute(path: string | null | undefined, label: string): void {
  if (!path) return;
  if (!getStaticRoutePaths().has(path.replace(/\/+$/, "") || "/")) {
    throw new TRPCError({ code: "BAD_REQUEST", message: `${label} must be present in the static route authority` });
  }
}

function approvalMapFromRoles(roles: readonly GovernanceApprovalRole[]) {
  return Object.fromEntries(roles.map((role) => [role, true]));
}

async function ensureSeededGovernanceData() {
  const db = requireDatabase(await getDb());
  const now = new Date();

  for (const source of governanceSourceSeeds) {
    await db.insert(governanceSources).values({
      sourceKey: source.sourceKey,
      sourceType: source.sourceType,
      publisher: source.publisher,
      title: source.title,
      location: source.location,
      verificationStatus: source.verificationStatus,
      scope: source.scope,
      publicDisplayAllowed: source.publicDisplayAllowed,
      verifiedAt: now,
    }).onDuplicateKeyUpdate({
      set: {
        publisher: source.publisher,
        title: source.title,
        location: source.location,
        verificationStatus: source.verificationStatus,
        scope: source.scope,
        publicDisplayAllowed: source.publicDisplayAllowed,
        verifiedAt: now,
      },
    });
  }

  const sourceRows = await db.select().from(governanceSources);
  const sourcesByKey = new Map(sourceRows.map((source) => [source.sourceKey, source]));

  for (const claim of governanceClaimSeeds) {
    await db.insert(governanceClaims).values({
      claimKey: claim.claimKey,
      claimText: claim.claimText,
      approvedWording: claim.approvedWording,
      claimClass: claim.claimClass,
      riskLevel: claim.riskLevel,
      status: claim.status,
      productEntity: claim.productEntity,
      audience: claim.audience,
      allowedParaphrase: claim.allowedParaphrase,
      allowedChannels: claim.allowedChannels,
      prohibitedChannels: claim.prohibitedChannels,
      qualification: claim.qualification,
      effectiveAt: now,
      reviewedAt: now,
    }).onDuplicateKeyUpdate({
      set: {
        claimText: claim.claimText,
        approvedWording: claim.approvedWording,
        claimClass: claim.claimClass,
        riskLevel: claim.riskLevel,
        status: claim.status,
        productEntity: claim.productEntity,
        audience: claim.audience,
        allowedParaphrase: claim.allowedParaphrase,
        allowedChannels: claim.allowedChannels,
        prohibitedChannels: claim.prohibitedChannels,
        qualification: claim.qualification,
        reviewedAt: now,
      },
    });
  }

  const claimRows = await db.select().from(governanceClaims);
  const claimsByKey = new Map(claimRows.map((claim) => [claim.claimKey, claim]));
  for (const claim of governanceClaimSeeds) {
    const claimRow = claimsByKey.get(claim.claimKey);
    if (!claimRow) continue;
    for (const sourceKey of claim.sourceKeys) {
      const sourceRow = sourcesByKey.get(sourceKey);
      if (!sourceRow) continue;
      await db.insert(governanceClaimSources).values({ claimId: claimRow.id, sourceId: sourceRow.id })
        .onDuplicateKeyUpdate({ set: { claimId: claimRow.id } });
    }
  }

  return { sourceCount: governanceSourceSeeds.length, claimCount: governanceClaimSeeds.length };
}

export const governanceRouter = router({
  listIntentOwners: adminProcedure.query(() => intentOwnershipRegistry),

  snapshot: adminProcedure.query(async () => {
    const db = requireDatabase(await getDb());
    const [sources, claims, candidates, approvals] = await Promise.all([
      db.select().from(governanceSources).orderBy(desc(governanceSources.updatedAt)),
      db.select().from(governanceClaims).orderBy(desc(governanceClaims.updatedAt)),
      db.select().from(governanceCandidates).orderBy(desc(governanceCandidates.updatedAt)),
      db.select().from(governanceApprovals).orderBy(desc(governanceApprovals.createdAt)),
    ]);
    return { intentOwners: intentOwnershipRegistry, sources, claims, candidates, approvals };
  }),

  seedApprovedBoundaries: adminProcedure.mutation(async () => ensureSeededGovernanceData()),

  createSource: adminProcedure
    .input(z.object({
      sourceKey: z.string().min(2).max(191),
      sourceType: z.enum(["government_public_health", "professional_dental_organization", "peer_reviewed_journal", "academic_health_system", "official_regulatory_product", "commercial_health_reference", "external_product_provider", "other", "unknown"]),
      publisher: z.string().max(500).optional(),
      title: z.string().min(2).max(1000),
      location: z.string().min(1).max(2000),
      sourceDate: z.string().max(64).optional(),
      verificationStatus: z.enum(["verified", "legacy_existing", "pending_verification", "not_applicable"]),
      scope: z.string().max(20_000).optional(),
      publicDisplayAllowed: z.boolean().default(false),
      snapshotHash: z.string().max(128).optional(),
      sourceVersion: z.string().max(255).optional(),
    }))
    .mutation(async ({ input }) => {
      const db = requireDatabase(await getDb());
      const [result] = await db.insert(governanceSources).values({
        ...input,
        verifiedAt: input.verificationStatus === "verified" ? new Date() : undefined,
      }).$returningId();
      return { id: result.id };
    }),

  createClaim: adminProcedure
    .input(z.object({
      claimKey: z.string().min(2).max(191),
      claimText: z.string().min(1).max(20_000),
      approvedWording: z.string().min(1).max(20_000),
      claimClass: claimClassSchema,
      riskLevel: riskLevelSchema,
      status: claimStatusSchema.default("PENDING"),
      productEntity: z.string().max(300).optional(),
      audience: z.string().max(300).optional(),
      geography: z.string().max(120).optional(),
      allowedParaphrase: z.boolean().default(false),
      allowedChannels: z.array(channelSchema),
      prohibitedChannels: z.array(channelSchema).optional(),
      qualification: z.string().max(20_000).optional(),
      effectiveAt: z.coerce.date().optional(),
      reviewedAt: z.coerce.date().optional(),
      expiresAt: z.coerce.date().nullable().optional(),
      sourceIds: z.array(z.number().int().positive()).default([]),
    }))
    .mutation(async ({ input }) => {
      const db = requireDatabase(await getDb());
      const { sourceIds, ...claim } = input;
      if (claim.status === "VERIFIED" && sourceIds.length === 0) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Verified claims require at least one source" });
      }
      if (sourceIds.length > 0) {
        const sources = await db.select({ id: governanceSources.id }).from(governanceSources).where(inArray(governanceSources.id, sourceIds));
        if (sources.length !== new Set(sourceIds).size) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "One or more claim sources do not exist" });
        }
      }
      const [result] = await db.insert(governanceClaims).values(claim).$returningId();
      for (const sourceId of Array.from(new Set(sourceIds))) {
        await db.insert(governanceClaimSources).values({ claimId: result.id, sourceId });
      }
      return { id: result.id };
    }),

  recordClaimUse: adminProcedure
    .input(z.object({
      claimId: z.number().int().positive(),
      contentKey: z.string().min(1).max(300),
      routePath: z.string().startsWith("/").max(1000),
      channel: channelSchema,
    }))
    .mutation(async ({ input }) => {
      const db = requireDatabase(await getDb());
      const [claim] = await db.select().from(governanceClaims).where(eq(governanceClaims.id, input.claimId)).limit(1);
      if (!claim) throw new TRPCError({ code: "NOT_FOUND", message: "Governance claim not found" });
      const decision = evaluateGovernedClaimUse({
        claimKey: claim.claimKey,
        claimText: claim.claimText,
        approvedWording: claim.approvedWording,
        claimClass: claim.claimClass,
        riskLevel: claim.riskLevel,
        status: claim.status,
        allowedParaphrase: claim.allowedParaphrase,
        allowedChannels: (claim.allowedChannels as string[]).filter((channel): channel is z.infer<typeof channelSchema> => GOVERNANCE_CONTENT_CHANNELS.includes(channel as z.infer<typeof channelSchema>)),
        prohibitedChannels: (claim.prohibitedChannels as string[] | null ?? []).filter((channel): channel is z.infer<typeof channelSchema> => GOVERNANCE_CONTENT_CHANNELS.includes(channel as z.infer<typeof channelSchema>)),
        expiresAt: claim.expiresAt,
      }, { channel: input.channel, approvals: approvalMapFromRoles(["EDITORIAL", "CLINICAL", "PRODUCT_BUSINESS", "LEGAL_PRIVACY"]) });
      if (!decision.allowed) throw new TRPCError({ code: "BAD_REQUEST", message: `Claim cannot be recorded for this use: ${decision.reason}` });
      await db.insert(governanceClaimUses).values(input).onDuplicateKeyUpdate({ set: { routePath: input.routePath } });
      return { ok: true };
    }),

  createCandidate: adminProcedure
    .input(z.object({
      candidateKey: z.string().min(2).max(191),
      workingQuestion: z.string().min(1).max(20_000),
      targetAudience: z.string().min(1).max(300),
      funnelStage: z.enum(["AWARENESS", "CONSIDERATION", "CONVERSION", "RETENTION", "TRUST"]),
      queryFamily: z.string().min(1).max(300),
      intentOwnerId: z.string().min(1).max(120),
      cmsCategory: z.enum(["Dentist Problems", "Dental Problems", "Insurance Problems", "Symptoms", "Gums", "Cavities", "X-Rays", "Costs"]),
      existingRoute: z.string().startsWith("/").max(1000).nullable().optional(),
      proposedRoute: z.string().startsWith("/").max(1000).nullable().optional(),
      informationGain: z.string().max(20_000).nullable().optional(),
      overlapScores: cannibalizationScoresSchema.default(emptyCannibalizationScores()),
      overlapEvidence: z.string().max(20_000).nullable().optional(),
      performanceEvidence: z.enum(["AVAILABLE", "UNAVAILABLE"]).default("UNAVAILABLE"),
      sourceFeasibility: z.enum(["VERIFIED", "PENDING", "NOT_FEASIBLE"]).default("PENDING"),
      claimIds: z.array(z.number().int().positive()).min(1),
      sourceIds: z.array(z.number().int().positive()).default([]),
      riskLevel: riskLevelSchema,
      requiredReviewerRoles: z.array(approvalRoleSchema),
      ctaDestination: z.string().startsWith("/").max(1000).nullable().optional(),
      canonicalPlan: z.string().startsWith("/").max(1000).nullable().optional(),
      internalLinkPlan: z.array(z.string().startsWith("/").max(1000)),
      decision: dispositionSchema.default("CREATE_CANDIDATE"),
      decisionReason: z.string().max(20_000).nullable().optional(),
      blocker: z.string().max(20_000).nullable().optional(),
      plannedWindow: z.string().max(120).nullable().optional(),
    }))
    .mutation(async ({ input }) => {
      assertKnownIntentOwner(input.intentOwnerId);
      assertKnownStaticRoute(input.existingRoute, "Existing route");
      for (const route of input.internalLinkPlan) assertKnownStaticRoute(route, "Internal link");
      if (input.ctaDestination) assertKnownStaticRoute(input.ctaDestination, "CTA destination");

      const assessment = assessCannibalization(input.overlapScores);
      const gate = evaluateCreateCandidateGate({
        workingQuestion: input.workingQuestion,
        targetAudience: input.targetAudience,
        funnelStage: input.funnelStage,
        queryFamily: input.queryFamily,
        intentOwnerId: input.intentOwnerId,
        cmsCategory: input.cmsCategory,
        informationGain: input.informationGain ?? undefined,
        sourceFeasibility: input.sourceFeasibility,
        claimIds: input.claimIds,
        sourceIds: input.sourceIds,
        riskLevel: input.riskLevel,
        canonicalPlan: input.canonicalPlan ?? undefined,
        internalLinkPlan: input.internalLinkPlan,
        ctaDestination: input.ctaDestination ?? undefined,
        requiredReviewerRoles: input.requiredReviewerRoles,
        overlapScores: input.overlapScores,
      });
      const db = requireDatabase(await getDb());
      const [result] = await db.insert(governanceCandidates).values({
        ...input,
        informationGain: input.informationGain ?? undefined,
        existingRoute: input.existingRoute ?? undefined,
        proposedRoute: input.proposedRoute ?? undefined,
        overlapScoreTotal: assessment.total,
        claimIds: input.claimIds,
        sourceIds: input.sourceIds,
        ctaDestination: input.ctaDestination ?? undefined,
        canonicalPlan: input.canonicalPlan ?? undefined,
        decisionReason: input.decisionReason ?? undefined,
        plannedWindow: input.plannedWindow ?? undefined,
        approvalState: gate.allowed && !assessment.requiresOwnerDecision ? "PENDING" : "BLOCKED",
        status: gate.allowed && !assessment.requiresOwnerDecision ? "OPEN" : "BLOCKED",
        blocker: gate.allowed
          ? assessment.requiresOwnerDecision ? "Direct-answer and CTA overlap require an owner decision." : input.blocker ?? undefined
          : `Candidate gate incomplete: ${gate.missing.join(", ")}`,
      }).$returningId();
      return { id: result.id, assessment, gate };
    }),

  approveCandidateForDraft: adminProcedure
    .input(z.object({
      candidateId: z.number().int().positive(),
      decisionMakerName: z.string().min(2).max(300),
      decisionMakerRole: z.string().min(2).max(300),
      reviewScope: z.string().min(2).max(20_000),
      changeSummary: z.string().min(2).max(20_000),
      decision: z.enum(["APPROVED", "REJECTED"]),
      notes: z.string().max(20_000).nullable().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = requireDatabase(await getDb());
      const [candidate] = await db.select().from(governanceCandidates).where(eq(governanceCandidates.id, input.candidateId)).limit(1);
      if (!candidate) throw new TRPCError({ code: "NOT_FOUND", message: "Governance candidate not found" });
      const gate = evaluateCreateCandidateGate({
        workingQuestion: candidate.workingQuestion,
        targetAudience: candidate.targetAudience,
        funnelStage: candidate.funnelStage as "AWARENESS" | "CONSIDERATION" | "CONVERSION" | "RETENTION" | "TRUST",
        queryFamily: candidate.queryFamily,
        intentOwnerId: candidate.intentOwnerId,
        cmsCategory: candidate.cmsCategory,
        informationGain: candidate.informationGain ?? undefined,
        sourceFeasibility: candidate.sourceFeasibility,
        claimIds: candidate.claimIds as number[],
        sourceIds: candidate.sourceIds as number[],
        riskLevel: candidate.riskLevel,
        canonicalPlan: candidate.canonicalPlan ?? undefined,
        internalLinkPlan: candidate.internalLinkPlan as string[],
        ctaDestination: candidate.ctaDestination ?? undefined,
        requiredReviewerRoles: candidate.requiredReviewerRoles as string[],
        overlapScores: candidate.overlapScores as ReturnType<typeof emptyCannibalizationScores>,
      });
      const assessment = assessCannibalization(candidate.overlapScores as ReturnType<typeof emptyCannibalizationScores>);
      const sourceIds = candidate.sourceIds as number[];
      const claimIds = candidate.claimIds as number[];
      const requiredReviewerRoles = Array.isArray(candidate.requiredReviewerRoles)
        ? candidate.requiredReviewerRoles.filter((role): role is z.infer<typeof approvalRoleSchema> => typeof role === "string" && GOVERNANCE_APPROVAL_ROLES.includes(role as z.infer<typeof approvalRoleSchema>))
        : [];
      const [claims, sources] = await Promise.all([
        db.select().from(governanceClaims).where(inArray(governanceClaims.id, claimIds)),
        db.select().from(governanceSources).where(inArray(governanceSources.id, sourceIds)),
      ]);
      const claimsReady = claims.length === new Set(claimIds).size && claims.every((claim) => claim.status === "VERIFIED");
      const sourcesReady = sources.length === new Set(sourceIds).size && sources.every((source) => source.verificationStatus === "verified");
      const allowed = input.decision === "APPROVED" && gate.allowed && !assessment.requiresOwnerDecision && claimsReady && sourcesReady;
      const approvalKey = `candidate-${candidate.id}-${Date.now()}`;
      const contentVersionHash = createGovernedContentVersionHash({
        contentKey: `candidate:${candidate.id}`,
        title: candidate.workingQuestion,
        routePath: candidate.canonicalPlan,
        metadata: {
          candidateKey: candidate.candidateKey,
          intentOwnerId: candidate.intentOwnerId,
          queryFamily: candidate.queryFamily,
        },
        claimIds,
        sourceIds,
      });
      await db.insert(governanceApprovals).values({
        approvalKey,
        contentKey: `candidate:${candidate.id}`,
        contentRoute: candidate.existingRoute,
        contentType: "candidate",
        intentOwnerId: candidate.intentOwnerId,
        contentVersionHash,
        finalApprovedVersionHash: allowed ? contentVersionHash : undefined,
        publicationState: allowed ? "approved_for_publish" : "pending_review",
        riskLevel: candidate.riskLevel,
        claimIdsReviewed: claimIds,
        sourceIdsReviewed: sourceIds,
        reviewScope: input.reviewScope,
        changeSummary: input.changeSummary,
        reReviewRequired: !allowed,
        decisionMakerName: input.decisionMakerName,
        decisionMakerRole: input.decisionMakerRole,
        publicDisplayAllowed: false,
        clinicalDecision: requiredReviewerRoles.includes("CLINICAL") ? input.decision : "REVIEW_NOT_REQUIRED",
        productBusinessDecision: requiredReviewerRoles.includes("PRODUCT_BUSINESS") ? input.decision : "REVIEW_NOT_REQUIRED",
        legalPrivacyDecision: requiredReviewerRoles.includes("LEGAL_PRIVACY") ? input.decision : "REVIEW_NOT_REQUIRED",
        editorialDecision: requiredReviewerRoles.includes("EDITORIAL") ? input.decision : "REVIEW_NOT_REQUIRED",
        approvedAt: allowed ? new Date() : undefined,
        publicationAuthority: allowed ? ctx.admin.username : undefined,
        notes: input.notes ?? undefined,
      });
      await db.update(governanceCandidates).set({
        status: allowed ? "APPROVED" : "BLOCKED",
        approvalState: allowed ? "APPROVED" : input.decision === "REJECTED" ? "REJECTED" : "BLOCKED",
        blocker: allowed
          ? null
          : input.decision === "REJECTED"
            ? "Human candidate approval was rejected."
            : "Candidate cannot be approved until structural, claim, source, and ownership prerequisites are complete.",
      }).where(eq(governanceCandidates.id, candidate.id));
      return { allowed, contentVersionHash };
    }),

  recordApproval: adminProcedure
    .input(z.object({
      approvalKey: z.string().min(2).max(191),
      contentKey: z.string().min(1).max(300),
      contentRoute: z.string().startsWith("/").max(1000).nullable().optional(),
      contentType: z.string().min(1).max(100),
      intentOwnerId: z.string().max(120).nullable().optional(),
      title: z.string().max(500).nullable().optional(),
      bodyHtml: z.string().max(200_000).nullable().optional(),
      metadata: z.record(z.string(), z.string().nullable()).optional(),
      claimIdsReviewed: z.array(z.number().int().positive()).default([]),
      sourceIdsReviewed: z.array(z.number().int().positive()).default([]),
      riskLevel: riskLevelSchema,
      reviewScope: z.string().max(20_000).nullable().optional(),
      changeSummary: z.string().max(20_000).nullable().optional(),
      decisionMakerName: z.string().min(2).max(300),
      decisionMakerRole: z.string().min(2).max(300),
      reReviewTriggers: z.array(z.enum(["health_claim", "urgent_instruction", "treatment_description", "clinical_source", "capability", "availability", "price", "plan", "billing", "family_limit", "commercial_offer", "privacy", "security", "retention", "sharing", "analytics", "employer_data_access", "terms", "refund_or_guarantee", "comparison_methodology", "reviewer_credential", "reviewer_role", "reviewer_display_permission", "reviewer_attribution"])).default([]),
      clinicalReviewerReference: z.string().max(300).nullable().optional(),
      clinicalReviewerCredentialsReference: z.string().max(500).nullable().optional(),
      verifiedReviewerProfileReference: z.string().max(300).nullable().optional(),
      publicDisplayAllowed: z.boolean().default(false),
      clinicalDecision: decisionSchema.default("PENDING"),
      productBusinessDecision: decisionSchema.default("PENDING"),
      legalPrivacyDecision: decisionSchema.default("PENDING"),
      editorialDecision: decisionSchema.default("PENDING"),
      publicationState: z.enum(["draft", "pending_review", "approved_for_publish", "published", "unpublished", "archived"]).default("draft"),
      publicationAuthority: z.string().max(300).nullable().optional(),
      nextReviewAt: z.coerce.date().nullable().optional(),
      supersededByApprovalId: z.number().int().positive().nullable().optional(),
      correctionReference: z.string().max(300).nullable().optional(),
      notes: z.string().max(20_000).nullable().optional(),
    }))
    .mutation(async ({ input }) => {
      if (input.intentOwnerId) assertKnownIntentOwner(input.intentOwnerId);
      assertKnownStaticRoute(input.contentRoute, "Content route");
      const reReview = evaluateReReviewRequirement(input.reReviewTriggers);
      const db = requireDatabase(await getDb());
      const distinctClaimIds = Array.from(new Set(input.claimIdsReviewed));
      const distinctSourceIds = Array.from(new Set(input.sourceIdsReviewed));
      const [reviewedClaims, reviewedSources] = await Promise.all([
        distinctClaimIds.length > 0
          ? db.select().from(governanceClaims).where(inArray(governanceClaims.id, distinctClaimIds))
          : Promise.resolve([]),
        distinctSourceIds.length > 0
          ? db.select().from(governanceSources).where(inArray(governanceSources.id, distinctSourceIds))
          : Promise.resolve([]),
      ]);
      if (reviewedClaims.length !== distinctClaimIds.length || reviewedSources.length !== distinctSourceIds.length) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "One or more reviewed claims or sources do not exist" });
      }
      const requiredReview = requiredReviewForClaimClasses(reviewedClaims.map((claim) => claim.claimClass), input.riskLevel);
      const hasRequiredApproval = (!requiredReview.clinical || input.clinicalDecision === "APPROVED")
        && (!requiredReview.productBusiness || input.productBusinessDecision === "APPROVED")
        && (!requiredReview.legalPrivacy || input.legalPrivacyDecision === "APPROVED")
        && input.editorialDecision === "APPROVED";
      const contentVersionHash = createGovernedContentVersionHash({
        contentKey: input.contentKey,
        title: input.title,
        routePath: input.contentRoute,
        bodyHtml: input.bodyHtml,
        metadata: input.metadata,
        claimIds: input.claimIdsReviewed,
        sourceIds: input.sourceIdsReviewed,
      });
      const isApproved = hasRequiredApproval && !reReview.required;
      const [result] = await db.insert(governanceApprovals).values({
        approvalKey: input.approvalKey,
        contentKey: input.contentKey,
        contentRoute: input.contentRoute ?? undefined,
        contentType: input.contentType,
        intentOwnerId: input.intentOwnerId ?? undefined,
        contentVersionHash,
        finalApprovedVersionHash: isApproved && !reReview.required ? contentVersionHash : undefined,
        publicationState: input.publicationState,
        riskLevel: input.riskLevel,
        claimIdsReviewed: distinctClaimIds,
        sourceIdsReviewed: distinctSourceIds,
        reviewScope: input.reviewScope ?? undefined,
        changeSummary: input.changeSummary ?? undefined,
        reReviewRequired: reReview.required,
        decisionMakerName: input.decisionMakerName,
        decisionMakerRole: input.decisionMakerRole,
        clinicalReviewerReference: input.clinicalReviewerReference ?? undefined,
        clinicalReviewerCredentialsReference: input.clinicalReviewerCredentialsReference ?? undefined,
        verifiedReviewerProfileReference: input.verifiedReviewerProfileReference ?? undefined,
        publicDisplayAllowed: input.publicDisplayAllowed,
        clinicalDecision: input.clinicalDecision,
        clinicalReviewedAt: input.clinicalDecision === "APPROVED" || input.clinicalDecision === "APPROVED_WITH_CHANGES" ? new Date() : undefined,
        productBusinessDecision: input.productBusinessDecision,
        legalPrivacyDecision: input.legalPrivacyDecision,
        editorialDecision: input.editorialDecision,
        approvedAt: isApproved && !reReview.required ? new Date() : undefined,
        publicationAuthority: input.publicationAuthority ?? undefined,
        nextReviewAt: input.nextReviewAt ?? undefined,
        supersededByApprovalId: input.supersededByApprovalId ?? undefined,
        correctionReference: input.correctionReference ?? undefined,
        notes: input.notes ?? undefined,
      }).$returningId();
      return { id: result.id, contentVersionHash, reReviewRequired: reReview.required };
    }),

  listEligibleClaims: adminProcedure
    .input(z.object({ channel: channelSchema, approvalRoles: z.array(approvalRoleSchema).default([]) }))
    .query(async ({ input }) => {
      const db = requireDatabase(await getDb());
      const claims = await db.select().from(governanceClaims).where(eq(governanceClaims.status, "VERIFIED"));
      const approvals = approvalMapFromRoles(input.approvalRoles);
      return claims.filter((claim) => evaluateGovernedClaimUse({
        claimKey: claim.claimKey,
        claimText: claim.claimText,
        approvedWording: claim.approvedWording,
        claimClass: claim.claimClass,
        riskLevel: claim.riskLevel,
        status: claim.status,
        allowedParaphrase: claim.allowedParaphrase,
        allowedChannels: (claim.allowedChannels as string[]).filter((channel): channel is z.infer<typeof channelSchema> => GOVERNANCE_CONTENT_CHANNELS.includes(channel as z.infer<typeof channelSchema>)),
        prohibitedChannels: (claim.prohibitedChannels as string[] | null ?? []).filter((channel): channel is z.infer<typeof channelSchema> => GOVERNANCE_CONTENT_CHANNELS.includes(channel as z.infer<typeof channelSchema>)),
        expiresAt: claim.expiresAt,
      }, { channel: input.channel, approvals }).allowed);
    }),

  getCandidateForGovernedDraft: adminProcedure
    .input(z.object({ candidateId: z.number().int().positive() }))
    .query(async ({ input }) => {
      const db = requireDatabase(await getDb());
      const [candidate] = await db.select().from(governanceCandidates)
        .where(and(eq(governanceCandidates.id, input.candidateId), eq(governanceCandidates.status, "APPROVED"), eq(governanceCandidates.approvalState, "APPROVED")))
        .limit(1);
      if (!candidate) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "An approved governance candidate is required before drafting" });
      const gate = evaluateCreateCandidateGate({
        workingQuestion: candidate.workingQuestion,
        targetAudience: candidate.targetAudience,
        funnelStage: candidate.funnelStage as "AWARENESS" | "CONSIDERATION" | "CONVERSION" | "RETENTION" | "TRUST",
        queryFamily: candidate.queryFamily,
        intentOwnerId: candidate.intentOwnerId,
        cmsCategory: candidate.cmsCategory,
        informationGain: candidate.informationGain ?? undefined,
        sourceFeasibility: candidate.sourceFeasibility,
        claimIds: candidate.claimIds as number[],
        sourceIds: candidate.sourceIds as number[],
        riskLevel: candidate.riskLevel,
        canonicalPlan: candidate.canonicalPlan ?? undefined,
        internalLinkPlan: candidate.internalLinkPlan as string[],
        ctaDestination: candidate.ctaDestination ?? undefined,
        requiredReviewerRoles: candidate.requiredReviewerRoles as string[],
        overlapScores: candidate.overlapScores as ReturnType<typeof emptyCannibalizationScores>,
      });
      if (!gate.allowed) throw new TRPCError({ code: "PRECONDITION_FAILED", message: `Candidate governance is incomplete: ${gate.missing.join(", ")}` });
      return candidate;
    }),
});
