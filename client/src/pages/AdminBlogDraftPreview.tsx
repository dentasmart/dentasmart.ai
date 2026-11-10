/**
 * Private saved Blog Editor preview. Deliberately does not fetch by public slug,
 * publish, mutate an article, inject public JSON-LD or add a sitemap route.
 * The protected getPreviewById procedure enforces an admin session.
 */
import { useEffect } from "react";
import { useRoute } from "wouter";
import { ArrowLeft, Edit3, Eye, LockKeyhole, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import ArticleReviewerMetadata from "@/components/ArticleReviewerMetadata";
import {
  getPublicBlogReviewerMetadata,
  getPublicLastReviewed,
  formatReviewedDate,
} from "@shared/blogReviewerMetadata";

const sections = [
  ["problemHeading", "problemContent", "The Problem"],
  ["empathyHeading", "empathyContent", "Why It Matters"],
  ["solutionHeading", "solutionContent", "What You Can Do"],
  ["changeHeading", "changeContent", "What Happens Next"],
  ["resultHeading", "resultContent", "How DentaSmart Helps"],
] as const;

export default function AdminBlogDraftPreview() {
  const [match, params] = useRoute("/admin/blog-draft-preview/:id");
  const [revisionMatch, revisionParams] = useRoute("/admin/blog-revision-preview/:id/:revision");
  const idValue = revisionMatch ? revisionParams?.id || "" : params?.id || "";
  const articleId = /^\d+$/.test(idValue) ? Number(idValue) : 0;
  const revisionValue = revisionParams?.revision || "";
  const revisionNumber = /^\d+$/.test(revisionValue) ? Number(revisionValue) : -1;
  const validId = Boolean((match || revisionMatch) && Number.isSafeInteger(articleId) && articleId > 0 &&
    (!revisionMatch || (Number.isSafeInteger(revisionNumber) && revisionNumber >= 0)));
  const savedPreview = trpc.blog.getPreviewById.useQuery(
    { id: articleId },
    { enabled: validId && !revisionMatch, retry: false, refetchOnWindowFocus: false, refetchOnMount: "always" },
  );
  const revisionPreview = trpc.blog.getRevision.useQuery(
    { id: articleId, revision: Math.max(0, revisionNumber) },
    { enabled: validId && Boolean(revisionMatch), retry: false, refetchOnWindowFocus: false, refetchOnMount: "always" },
  );
  const preview = revisionMatch ? revisionPreview : savedPreview;

  // Prevent search indexing of the private admin preview URL; no public SEO component.
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Private Draft Preview | DentaSmart";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow, noarchive";
    meta.setAttribute("data-dentasmart-private-preview", "true");
    document.head.appendChild(meta);
    return () => {
      meta.remove();
      document.title = previousTitle;
    };
  }, []);
  const article = revisionMatch ? revisionPreview.data?.snapshot : savedPreview.data;
  const editorUrl = validId ? "/admin/edit/" + articleId : "/admin";
  const header = (
    <header className="sticky top-0 z-50 border-b border-teal-200 bg-white px-4 py-3 shadow-sm">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
        <div className="flex items-start gap-2">
          <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
          <div>
            <h1 className="text-sm font-semibold text-stone-900">{revisionMatch ? `Revision ${revisionNumber} · Historical snapshot` : article?.status === "published" ? "Preview Saved · Saved article" : "Preview Draft · Saved article"}</h1>
            <p className="text-xs text-stone-600">Admin preview only · No publishing or changes to article status</p>
          </div>
        </div>
        <a href={editorUrl}
          className="inline-flex items-center gap-2 rounded-md bg-teal-700 px-3 py-2 text-sm font-semibold text-white hover:bg-teal-800">
          <Edit3 className="h-4 w-4"/> Back to Editor
        </a>
      </div>
    </header>
  );
  if (!validId || preview.isLoading || preview.error || !article) {
    return <div className="min-h-screen bg-stone-50">
      {header}
      <div className="mx-auto max-w-3xl p-6">
        <div className="rounded-xl border border-stone-200 bg-white p-6 text-sm text-stone-700" role="status">
          {!validId ? "Invalid article preview link."
            : preview.isLoading ? <><Loader2 className="mr-2 inline h-4 w-4 animate-spin"/>Loading saved article…</>
            : preview.error?.data?.code === "UNAUTHORIZED"
              ? "Your admin session has expired. Sign in again before opening this private preview."
              : preview.error ? "Could not load this saved article. Check your admin session and try again."
                : "The saved article could not be found. Save the draft before previewing."}
        </div>
        <a href={editorUrl} className="mt-4 inline-flex items-center gap-2 text-sm text-teal-700 underline">
          <ArrowLeft className="h-4 w-4"/> Back to Editor
        </a>
      </div>
    </div>;
  }
  // Mirror the public article's verified attribution rules without changing
  // any stored data or declaring a draft clinically approved.
  const publicReviewerMetadata = getPublicBlogReviewerMetadata(article);
  const publicLastReviewed = getPublicLastReviewed(article);
  const hasIncompleteReviewerFields = !publicReviewerMetadata && Boolean(
    article.reviewedByName?.trim() || article.reviewedByCredentials?.trim() ||
    article.reviewerShortBio?.trim() || article.reviewerProfileUrl?.trim()
  );
  const hasBodyHtml = Boolean(article.bodyHtml?.trim());
  const hasStructured = sections.some(([, content]) => Boolean(article[content]?.trim()));
  return <div className="min-h-screen bg-white text-stone-900">
    {header}
    <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs text-amber-900">
      <Eye className="mr-1 inline h-4 w-4"/>
      {revisionMatch ? "Historical snapshot only. This version is read-only and does not replace the current saved article or public page." : <>Previewing the last saved version. Return to the editor, make changes, then {article.status === "published" ? "Save Changes" : "Save Draft"} to update this preview.</>}
    </div>
    <section className="border-b border-primary/10 bg-[#E6F4F6] px-4 py-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="mb-5 text-sm text-stone-600">
          {article.category} · {article.readTime || "Article"} · {revisionMatch ? "Status at this revision: " + article.status : article.status === "published" ? "Currently published" : "Not published"}
        </p>
        <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">{article.title}</h2>
        <p className="mt-4 text-sm text-stone-600">
          {publicReviewerMetadata ? (
            <>
              Medically reviewed by{" "}
              <a className="font-medium text-teal-800 underline underline-offset-2" href={publicReviewerMetadata.profileUrl}>
                {publicReviewerMetadata.name}
              </a>
              {publicReviewerMetadata.credentials ? `, ${publicReviewerMetadata.credentials}` : ""}
            </>
          ) : "By DentaSmart Editorial Team"}
          {publicLastReviewed && <span> · Last reviewed {formatReviewedDate(publicLastReviewed)}</span>}
        </p>
        <p className="mt-5 text-sm text-stone-600">
          DentaSmart articles are educational and do not replace professional dental care.
        </p>
      </div>
    </section>
    <main className="mx-auto max-w-3xl px-4 py-12 md:py-20">
      {hasBodyHtml
        ? <div className="blog-content" dangerouslySetInnerHTML={{ __html: article.bodyHtml! }}/>
        : hasStructured
          ? <div className="space-y-12">
              {sections.map(([headingKey, contentKey, fallback]) => {
                const body = article[contentKey];
                if (!body?.trim()) return null;
                return <section key={contentKey}>
                  <h3 className="mb-4 text-2xl font-bold">{article[headingKey] || fallback}</h3>
                  <p className="whitespace-pre-wrap text-lg leading-relaxed text-stone-700">{body}</p>
                </section>;
              })}
            </div>
          : <p className="text-stone-600">No article content has been saved yet.</p>}
      <ArticleReviewerMetadata review={publicReviewerMetadata} lastReviewed={publicLastReviewed} />
      {hasIncompleteReviewerFields && (
        <aside className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900" aria-label="Reviewer preview eligibility">
          <p className="font-semibold">Reviewer information saved, but not eligible for public attribution.</p>
          <p className="mt-1">
            A public "Medically reviewed by" label requires both an actual, verified reviewer name and a valid first-party
            DentaSmart Team or author profile URL. Review the saved fields in the Reviewer tab.
            A reviewer name on its own does not establish a clinical review.
          </p>
        </aside>
      )}
      <div className="mt-16 border-t border-stone-200 pt-6">
        <p className="text-sm text-stone-500">
          This is a private content-layout preview, not a public page or an exact reproduction of every public-page component.
          It does not publish, generate public schema, or approve clinical review.
        </p>
        <a href={editorUrl} className="mt-4 inline-flex items-center gap-2 rounded-md border border-teal-600 px-4 py-2 text-sm font-semibold text-teal-800 hover:bg-teal-50">
          <Edit3 className="h-4 w-4"/> Edit this draft
        </a>
      </div>
    </main>
  </div>;
}
