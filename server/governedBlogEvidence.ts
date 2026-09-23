import { and, desc, eq, inArray } from "drizzle-orm";
import { agentRuns, governanceApprovals, governanceSources, type BlogPost } from "../drizzle/schema";
import type { ContentGovernance, ContentSourceRef } from "../shared/contentGovernance";
import { isExternalEvidenceUrl } from "../shared/contentGovernance";
import { getDb } from "./db";
import { governedBlogContentKey, isApprovalEligibleForGovernedPublication } from "./governancePublishing";
import { createGovernedContentVersionHash } from "./governanceReview";

function integerIds(value: unknown): number[] {
  return Array.isArray(value)
    ? Array.from(new Set(value.filter((item): item is number => Number.isInteger(item) && item > 0)))
    : [];
}

/**
 * Returns public evidence only for a governed post with an exact version-matched,
 * display-authorized approval. Legacy posts intentionally receive no synthetic
 * provenance, reviewer, FAQ, or review state from this resolver.
 */
export async function getApprovedPublicBlogGovernance(post: BlogPost): Promise<ContentGovernance | undefined> {
  if (!post.governanceCandidateId) return undefined;

  const db = await getDb();
  if (!db) return undefined;

  const [run] = await db.select().from(agentRuns)
    .where(and(
      eq(agentRuns.postId, post.id),
      eq(agentRuns.governanceVersion, "phase2-governed-draft-v1"),
    ))
    .orderBy(desc(agentRuns.createdAt))
    .limit(1);
  if (!run?.contentVersionHash) return undefined;

  const currentVersionHash = createGovernedContentVersionHash({
    contentKey: governedBlogContentKey(post.id),
    title: post.title,
    routePath: `/oral-health-hub/${post.slug}`,
    bodyHtml: post.bodyHtml ?? undefined,
    metadata: {
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      ogTitle: post.ogTitle,
      ogDescription: post.ogDescription,
      atAGlanceAnswer: post.atAGlanceAnswer,
      faqs: post.faqs,
    },
    claimIds: integerIds(run.claimContextIds),
    sourceIds: integerIds(run.sourceContextIds),
  });
  if (currentVersionHash !== run.contentVersionHash) return undefined;

  const [approval] = await db.select().from(governanceApprovals)
    .where(and(
      eq(governanceApprovals.contentKey, governedBlogContentKey(post.id)),
      eq(governanceApprovals.contentVersionHash, run.contentVersionHash),
    ))
    .orderBy(desc(governanceApprovals.createdAt))
    .limit(1);

  if (!approval?.publicDisplayAllowed || !isApprovalEligibleForGovernedPublication(approval, run.contentVersionHash)) {
    return undefined;
  }

  const approvedSourceIds = new Set(integerIds(approval.sourceIdsReviewed));
  const runSourceIds = integerIds(run.sourceContextIds).filter((id) => approvedSourceIds.has(id));
  if (runSourceIds.length === 0) return undefined;

  const sources = await db.select().from(governanceSources).where(inArray(governanceSources.id, runSourceIds));
  const publicSources: ContentSourceRef[] = sources
    .filter((source) => source.publicDisplayAllowed && source.verificationStatus === "verified" && isExternalEvidenceUrl(source.location))
    .map((source) => ({
      id: source.sourceKey,
      title: source.title,
      publisher: source.publisher ?? undefined,
      url: source.location,
      sourceType: source.sourceType,
      verificationStatus: "verified",
      publicationDate: source.sourceDate ?? undefined,
      accessedOn: source.accessedAt?.toISOString().slice(0, 10),
      appliesTo: ["Approved governed article evidence"],
      notes: source.scope ?? undefined,
      publicDisplayAllowed: true,
    }));

  if (publicSources.length === 0) return undefined;

  return {
    contentId: `blog:${post.id}`,
    contentVersion: run.contentVersionHash,
    riskClass: run.governanceRiskLevel === "CRITICAL" || run.governanceRiskLevel === "HIGH" ? "health" : "general",
    claimClasses: [],
    sourceRefs: publicSources,
    review: {
      verificationStatus: "not_applicable",
    },
    ctaPolicy: {
      placement: "after_educational_context",
      requiresProfessionalCareBoundary: true,
    },
  };
}

export function parseGovernedFaqs(value: string | null): Array<{ question: string; answer: string }> {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is { question: string; answer: string } => Boolean(
      item && typeof item === "object" && typeof (item as { question?: unknown }).question === "string" &&
      typeof (item as { answer?: unknown }).answer === "string" && (item as { question: string }).question.trim() &&
      (item as { answer: string }).answer.trim(),
    ));
  } catch {
    return [];
  }
}

export function parseGovernedAnswer(value: string | null): string | undefined {
  const answer = value?.trim();
  return answer || undefined;
}
