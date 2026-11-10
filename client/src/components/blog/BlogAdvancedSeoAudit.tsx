import { useMemo } from "react";
import { CheckCircle2, ChevronDown, CircleX, Info, Search } from "lucide-react";
import { analyzeCmsSeo, type CmsSeoCategory, type CmsSeoCheck } from "@shared/cmsSeoAnalysis";
import { getCmsReadingInsights } from "@shared/cmsReadingInsights";
import { formatBlogSeoChecks } from "@shared/blogSeoFeedback";
import { blogDraftToCmsSeoDocument, type BlogSeoDraft } from "@shared/blogSeoAdapter";

interface Props { draft: BlogSeoDraft; }

const GROUPS: Array<{ category: CmsSeoCategory; title: string; help: string }> = [
  { category: "Keyphrase", title: "Keywords", help: "Focus phrase, URL and natural usage" },
  { category: "Metadata", title: "Search metadata", help: "Title, description and canonical review" },
  { category: "Content", title: "Content structure", help: "Opening, headings and useful coverage" },
  { category: "Links", title: "Links & sources", help: "Relevant internal links and source references" },
  { category: "Images", title: "Image accessibility", help: "Descriptive alternative text" },
  { category: "Readability", title: "Readability", help: "Sentences and scannable paragraphs" },
];

function CheckIcon({ status }: { status: CmsSeoCheck["status"] }) {
  if (status === "good") return <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />;
  if (status === "info") return <Info className="mt-0.5 h-4 w-4 shrink-0 text-stone-500" aria-hidden="true" />;
  return <CircleX className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />;
}

export default function BlogAdvancedSeoAudit({ draft }: Props) {
  const document = useMemo(() => blogDraftToCmsSeoDocument(draft), [draft]);
  const analysis = useMemo(() => analyzeCmsSeo(document, { requireOnPageImage: true, matchReadabilityPanel: true }), [document]);
  const checks = useMemo(() => formatBlogSeoChecks(analysis.checks, draft), [analysis.checks, draft]);
  const reading = useMemo(() => getCmsReadingInsights(document), [document]);
  const metaTitle = draft.metaTitle.trim() || draft.title.trim() || "Untitled article";
  const metaDescription = draft.metaDescription.trim();
  const siteUrl = "dentasmart.ai/oral-health-hub/" + (draft.slug.trim() || "new-article") + "/";
  const passed = checks.filter(check => check.status === "good").length;
  const needsReview = checks.filter(check => check.status === "critical" || check.status === "improve").length;
  const activeText = draft.editorMode === "structured" ? "StoryBrand Sections" : "Rich Text Editor";
  const hasImages = analysis.metrics.imageCount > 0;

  return (
    <section className="space-y-5 rounded-xl border border-teal-200 bg-white p-4 sm:p-6" aria-label="Advanced SEO analysis">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="max-w-2xl space-y-1">
          <h3 className="text-lg font-semibold text-stone-900">Live SEO analysis</h3>
          <p className="text-sm text-stone-600">
            Checking the selected {activeText} content against the existing article's SEO fields.
            The checklist updates as you type. Save Draft to store article changes.
          </p>
        </div>
        <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full border-[5px] border-teal-600 bg-teal-50"
          aria-label={`Editorial SEO score ${analysis.score} out of 100`} role="img">
          <strong className="text-2xl leading-6 text-teal-800">{analysis.score}</strong>
          <span className="text-xs text-stone-500">/ 100</span>
        </div>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-stone-100" role="progressbar"
        aria-label="Editorial SEO score" aria-valuenow={analysis.score} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full bg-teal-600 transition-all" style={{ width: `${analysis.score}%` }} />
      </div>
      <p className="text-sm text-stone-600">
        <span className="font-semibold text-emerald-700">{passed} passed</span>
        <span className="mx-2" aria-hidden="true">·</span>
        <span className="font-semibold text-amber-700">{needsReview} need attention</span>.
        This is a transparent editorial review—not a Google score, clinical verification or approval to publish.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { label: "Body words", value: analysis.metrics.wordCount },
          { label: "Focus phrase matches", value: analysis.metrics.keywordOccurrences },
          { label: "Internal links", value: analysis.metrics.internalLinks },
          { label: "Image alt text", value: hasImages
            ? `${analysis.metrics.imagesWithAlt}/${analysis.metrics.imageCount} with alt` : "No body images" },
          { label: "Reading time", value: reading.readingMinutes ? reading.readingMinutes + " min" : "—" },
          { label: "Average sentence", value: reading.words ? reading.avgWordsPerSentence + " words" : "—" },
        ].map(metric => (
          <div key={metric.label} className="min-w-0 rounded-lg border border-stone-200 bg-stone-50 p-3">
            <p className="text-xs text-stone-500">{metric.label}</p>
            <p className="mt-1 break-words text-base font-semibold text-stone-900">{metric.value}</p>
          </div>
        ))}
      </div>

      {!hasImages && <p role="status" className="rounded-md border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900"><strong>Article image recommendation:</strong> This article has no inline image. The DentaSmart editorial rubric holds back four image points until a relevant body image with accurate ALT text is added. The Featured Image and OG image are separate; this is not a Google ranking requirement.</p>}
      <p className="text-xs leading-relaxed text-stone-600">Featured Image: {draft.featuredImage.trim() ? "Selected — manage its ALT in the Featured Image tab" : "Not selected — recommended for article cards"}. This is separate from on-page ALT validation.</p>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(280px,2fr)]">
        <div className="min-w-0 space-y-3">
          <div>
            <h4 className="text-base font-semibold text-stone-900">SEO checklist</h4>
            <p className="text-sm text-stone-600">Expand a category to see what's good, what needs attention and how to improve.</p>
          </div>
          {GROUPS.map(group => {
            const groupChecks = checks.filter(check => check.category === group.category);
            if (groupChecks.length === 0) return null;
            const concerns = groupChecks.filter(check => check.status === "critical" || check.status === "improve").length;
            const good = groupChecks.filter(check => check.status === "good").length;
            const notEvaluated = groupChecks.every(check => check.status === "info");
            return (
              <details key={group.category} className="group overflow-hidden rounded-lg border border-stone-200 bg-white">
                <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-3 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 [&::-webkit-details-marker]:hidden">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-stone-900">{group.title}</p>
                    <p className="text-xs text-stone-500">{group.help}</p>
                  </div>
                  <span className="ml-auto flex items-center gap-2">
                    {concerns > 0
                      ? <span className="rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800">{concerns} to review</span>
                      : notEvaluated
                        ? <span className="rounded-full bg-stone-100 px-2 py-1 text-xs font-medium text-stone-700">Not evaluated</span>
                        : <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-800">No issues</span>}
                    <span className="text-xs text-stone-500">{good} passed</span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-stone-500 transition-transform group-open:rotate-180" aria-hidden="true" />
                  </span>
                </summary>
                <div className="space-y-2 border-t border-stone-100 p-3 sm:p-4">
                  {groupChecks.map(check => (
                    <div key={check.id} className="flex items-start gap-3 rounded-md bg-stone-50 px-3 py-2.5">
                      <CheckIcon status={check.status} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-stone-900">{check.title}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-stone-600">{check.status === "info" && /not evaluated|before evaluating/i.test(check.detail) && !/^not evaluated/i.test(check.detail) ? "Not evaluated · " : ""}{check.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            );
          })}
        </div>

        <div className="min-w-0 space-y-4">
          <div className="rounded-lg border border-stone-200 bg-stone-50 p-4" aria-label="Search preview">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-stone-900">
              <Search className="h-4 w-4 text-teal-700" /> Search result preview
            </h4>
            <p className="mt-3 break-all text-xs text-green-800">{siteUrl}</p>
            <p className="mt-1 text-base font-medium text-blue-800">{metaTitle}</p>
            <p className="mt-1 text-sm text-stone-600">{metaDescription || "Add a meta description to preview it here."}</p>
            {!draft.metaTitle.trim() && <p className="mt-2 text-xs text-amber-800">No SEO title provided; preview falls back to the article title.</p>}
          </div>
          <p className="text-xs leading-relaxed text-stone-500">
            This search preview is illustrative; search engines may choose different snippets.
            Use the dedicated Social tab for image and network previews. Existing BlogPosting
            schema and public SEO output remain controlled by the website.
            The audit does not change indexing, robots rules, sitemap or redirects.
          </p>
        </div>
      </div>
    </section>
  );
}
