import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { validateGovernedDraft } from "./blogAgent";
import { governedBlogContentKey, isApprovalEligibleForGovernedPublication } from "./governancePublishing";
import type { GovernedDraftContext } from "./governanceAgent";

const context: GovernedDraftContext = {
  candidateId: 1,
  candidateKey: "example",
  intentOwnerId: "treatment-plan-review",
  workingQuestion: "What questions can I ask about a dental treatment plan?",
  targetAudience: "Consumers",
  queryFamily: "dental-treatment-plan-questions",
  cmsCategory: "Dental Problems",
  riskLevel: "HIGH",
  requiredReviewerRoles: ["CLINICAL", "EDITORIAL"],
  informationGain: "Focuses on preparation questions, not a treatment determination.",
  internalLinkPlan: ["/pricing", "/oral-health-hub/second-opinion"],
  ctaDestination: "/pricing",
  canonicalPlan: "/oral-health-hub/dental-treatment-plan-questions",
  claims: [{ id: 1, claimKey: "boundary", approvedWording: "Treatment Plan Review provides educational context.", qualification: null }],
  sources: [{ id: 1, sourceKey: "central-facts-registry", title: "Central Facts Registry", publisher: "DentaSmart", scope: "Product facts" }],
};

const validSeo = {
  metaTitle: "Questions to Ask About a Dental Treatment Plan",
  metaDescription: "Prepare for a dental treatment plan discussion with practical questions that can help you understand the recommendation and talk with your dentist.",
  ogTitle: "Questions to Ask About a Dental Treatment Plan",
  ogDescription: "A practical discussion guide for a dental treatment plan.",
  readTime: "7 min read",
  atAGlanceAnswer: Array.from({ length: 70 }, () => "answer").join(" "),
  faqs: JSON.stringify([
    { question: "What should I ask?", answer: "Ask what the recommendation is intended to address." },
    { question: "Can I ask about options?", answer: "Yes, ask about options and timing." },
    { question: "Can I take notes?", answer: "Notes can help you remember the discussion." },
  ]),
};

const longHtml = `<h2>Start with the recommendation</h2><p>${Array.from({ length: 400 }, () => "Clear educational wording").join(" ")}</p><p><a href="/pricing">Learn about Treatment Plan Review</a></p>`;

describe("Phase 2 governed blog draft safeguards", () => {
  it("accepts a structurally valid draft that uses only planned internal links", () => {
    expect(validateGovernedDraft(context, longHtml, validSeo)).toMatchObject({ status: "passed", issues: [] });
  });

  it("blocks unplanned links and prohibited clinical or commercial claims", () => {
    const invalid = validateGovernedDraft(context, `${longHtml}<p><a href="/download">Unplanned link</a> DentaSmart can diagnose you with 100% accuracy.</p>`, validSeo);
    expect(invalid.status).toBe("blocked");
    expect(invalid.issues).toContain("Draft contains an unplanned link: /download");
    expect(invalid.issues).toContain("Draft contains a restricted claim or clinical representation.");
  });

  it("enforces the governed publication guard without changing legacy post behavior", () => {
    const approval = {
      contentVersionHash: "hash",
      finalApprovedVersionHash: "hash",
      publicationState: "approved_for_publish" as const,
      reReviewRequired: false,
      clinicalDecision: "APPROVED",
      productBusinessDecision: "REVIEW_NOT_REQUIRED",
      legalPrivacyDecision: "REVIEW_NOT_REQUIRED",
      editorialDecision: "APPROVED",
    };
    // Cases 1–5: no approval, pending approval, mismatched version, changed version, and exact approval.
    expect(isApprovalEligibleForGovernedPublication(undefined, "hash")).toBe(false);
    expect(isApprovalEligibleForGovernedPublication({ ...approval, publicationState: "pending_review" }, "hash")).toBe(false);
    expect(isApprovalEligibleForGovernedPublication({ ...approval, finalApprovedVersionHash: "other" }, "hash")).toBe(false);
    expect(isApprovalEligibleForGovernedPublication({ ...approval, contentVersionHash: "old", finalApprovedVersionHash: "old" }, "hash")).toBe(false);
    expect(isApprovalEligibleForGovernedPublication(approval, "hash")).toBe(true);
    expect(isApprovalEligibleForGovernedPublication({ ...approval, finalApprovedVersionHash: "old" }, "hash")).toBe(false);
    expect(isApprovalEligibleForGovernedPublication({ ...approval, reReviewRequired: true }, "hash")).toBe(false);
    expect(governedBlogContentKey(123)).toBe("blog:123");

    // Case 6: only Phase 2 governed runs invoke the approval lookup; legacy posts return allowed.
    const publishing = readFileSync(resolve(import.meta.dirname, "governancePublishing.ts"), "utf8");
    const blogRouter = readFileSync(resolve(import.meta.dirname, "blogRouter.ts"), "utf8");
    expect(publishing).toContain('eq(agentRuns.governanceVersion, "phase2-governed-draft-v1")');
    expect(publishing).toContain("if (!run && !post?.governanceCandidateId) return { allowed: true }");
    expect((blogRouter.match(/canPublishBlogPost\(/g) ?? [])).toHaveLength(2);
  });

  it("keeps the agent manual-only and does not retain a scheduled trigger path", () => {
    const root = resolve(import.meta.dirname, "..");
    const agent = readFileSync(resolve(root, "server/blogAgent.ts"), "utf8");
    const router = readFileSync(resolve(root, "server/blogRouter.ts"), "utf8");
    expect(agent).toContain('triggerType: "manual"');
    expect(agent).toContain("const shouldPublish = false");
    expect(agent).not.toMatch(/runBlogAgent\([^)]*scheduled/);
    expect(router).toContain("candidateId: z.number().int().positive()");
    expect(router).toContain("Auto-publish is disabled");
  });
});
