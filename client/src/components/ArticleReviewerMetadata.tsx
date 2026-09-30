import { BadgeCheck, CalendarDays, UserRound } from "lucide-react";
import { formatReviewedDate, type PublicBlogReviewerMetadata } from "@shared/blogReviewerMetadata";

interface ArticleReviewerMetadataProps {
  review?: PublicBlogReviewerMetadata;
  lastReviewed?: string;
}

/** Displays only complete, separately validated public review metadata. */
export default function ArticleReviewerMetadata({ review, lastReviewed }: ArticleReviewerMetadataProps) {
  if (!review) return null;

  return (
    <aside
      className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6"
      aria-label="Article reviewer information"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <UserRound className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-sm font-medium text-primary">
            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
            Medically reviewed by
          </p>
          <h2 className="mt-1 text-xl font-semibold text-stone-900">
            {review.name}{review.credentials ? `, ${review.credentials}` : ""}
          </h2>
          {review.shortBio && <p className="mt-2 text-sm leading-relaxed text-stone-700">{review.shortBio}</p>}
          <a href={review.profileUrl} className="mt-4 inline-flex text-sm font-medium text-action underline underline-offset-4 hover:text-action-hover">
            View reviewer profile
          </a>
          {lastReviewed && (
            <p className="mt-4 flex items-center gap-2 text-sm text-stone-600">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              Last reviewed: {formatReviewedDate(lastReviewed)}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
