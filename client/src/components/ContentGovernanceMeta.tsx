import { canDisplayVerifiedReview, type ContentGovernance } from "@shared/contentGovernance";

interface ContentGovernanceMetaProps {
  governance?: ContentGovernance;
}

export default function ContentGovernanceMeta({ governance }: ContentGovernanceMetaProps) {
  if (!governance || !canDisplayVerifiedReview(governance.review)) return null;

  const review = governance.review!;
  const reviewer = review.reviewer!;

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-stone-500 text-sm" aria-label="Content review information">
      <span>Reviewed by {reviewer.displayName}, {reviewer.credentials}</span>
      <span aria-hidden="true">|</span>
      <span>Last reviewed: {new Date(review.reviewedOn!).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
    </div>
  );
}
