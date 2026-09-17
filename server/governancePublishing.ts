import { and, desc, eq } from "drizzle-orm";
import { agentRuns, blogPosts, governanceApprovals } from "../drizzle/schema";
import { getDb } from "./db";

export interface ApprovalForPublication {
  contentVersionHash: string;
  finalApprovedVersionHash: string | null;
  publicationState: "draft" | "pending_review" | "approved_for_publish" | "published" | "unpublished" | "archived";
  reReviewRequired: boolean;
  clinicalDecision: string;
  productBusinessDecision: string;
  legalPrivacyDecision: string;
  editorialDecision: string;
}

const acceptableDecision = (value: string) => value === "APPROVED" || value === "REVIEW_NOT_REQUIRED";

export function governedBlogContentKey(postId: number): string {
  return `blog:${postId}`;
}

export function isApprovalEligibleForGovernedPublication(
  approval: ApprovalForPublication | undefined,
  contentVersionHash: string | null,
): boolean {
  if (!approval || !contentVersionHash) return false;
  return approval.publicationState === "approved_for_publish"
    && approval.reReviewRequired === false
    && approval.contentVersionHash === contentVersionHash
    && approval.finalApprovedVersionHash === contentVersionHash
    && acceptableDecision(approval.clinicalDecision)
    && acceptableDecision(approval.productBusinessDecision)
    && acceptableDecision(approval.legalPrivacyDecision)
    && acceptableDecision(approval.editorialDecision);
}

/**
 * Applies only to new runs bearing the Phase 2 governance version. It does not
 * retroactively block legacy CMS drafts that predate the governed workflow.
 */
export async function canPublishBlogPost(postId: number): Promise<{ allowed: boolean; reason?: string }> {
  const db = await getDb();
  if (!db) return { allowed: false, reason: "Governance database is not available" };
  const [post] = await db.select({ governanceCandidateId: blogPosts.governanceCandidateId })
    .from(blogPosts)
    .where(eq(blogPosts.id, postId))
    .limit(1);
  const [run] = await db.select().from(agentRuns)
    .where(and(eq(agentRuns.postId, postId), eq(agentRuns.governanceVersion, "phase2-governed-draft-v1")))
    .orderBy(desc(agentRuns.createdAt))
    .limit(1);
  if (!run && !post?.governanceCandidateId) return { allowed: true };
  if (!run?.contentVersionHash) {
    return { allowed: false, reason: "The governed draft audit record is incomplete; final approval is required before publishing" };
  }

  const [approval] = await db.select().from(governanceApprovals)
    .where(and(
      eq(governanceApprovals.contentKey, governedBlogContentKey(postId)),
      eq(governanceApprovals.contentVersionHash, run.contentVersionHash ?? ""),
    ))
    .orderBy(desc(governanceApprovals.createdAt))
    .limit(1);
  if (!isApprovalEligibleForGovernedPublication(approval, run.contentVersionHash)) {
    return { allowed: false, reason: "A final, version-matched governance approval is required before publishing this governed draft" };
  }
  return { allowed: true };
}
