import { useMemo, useState } from "react";
import { Search, BookText, Share2, Braces, ShieldAlert, CheckCircle2, CircleX, Info, Image as ImageIcon, AlertTriangle, Copy, Check, ShieldCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CmsSeoSuite from "@/components/cms/CmsSeoSuite";
import CmsMediaPicker from "@/components/cms/CmsMediaPicker";
import { getCmsSchemaPreview } from "@shared/cmsSchemaPreview";
import { analyzeCmsSeo, type CmsSeoLinkCandidate } from "@shared/cmsSeoAnalysis";
import { getCmsReadingInsights } from "@shared/cmsReadingInsights";
import { getCmsReadabilityCheckStatus } from "@shared/cmsReadabilityUiPolicy";
import { getCmsReadabilityScore } from "@shared/cmsReadabilityScore";
import { CMS_READABILITY_TARGETS } from "@shared/cmsReadabilityTargets";
import { getCmsReadabilityEvidence, type CmsReadingExcerpt } from "@shared/cmsReadabilityEvidence";
import type { CmsDocument } from "@shared/cmsBlocks";
import { parseCmsEditorSeoTab, type CmsEditorSeoTab } from "@shared/cmsEditorTabState";

interface Props {
  document: CmsDocument;
  onChange: (next: CmsDocument) => void;
  candidates: readonly CmsSeoLinkCandidate[];
  onLocate?: (example: CmsReadingExcerpt) => void;
  /** Optional controlled tab for continuity in the Advanced CMS editor. */
  activeTab?: CmsEditorSeoTab;
  onActiveTabChange?: (tab: CmsEditorSeoTab) => void;
  tabListId?: string;
}

function AdvancedSeoPanel({ document, onChange }: Pick<Props, "document" | "onChange">) {
  const seo = document.seo;
  const update = (patch: Partial<CmsDocument["seo"]>) =>
    onChange({ ...document, seo: { ...seo, ...patch } });
  const options = [
    { key: "robotsNoindex" as const, title: "Ask search engines not to index this page", detail: "Future public HTML: robots noindex. Test drafts and previews are already noindex." },
    { key: "robotsNofollow" as const, title: "Ask search engines not to follow links from this page", detail: "Future public HTML: page-level robots nofollow. Individual links can instead use rel=nofollow in the rich-text editor." },
    { key: "robotsDisallow" as const, title: "Disallow crawling this URL in robots.txt", detail: "Future public robots.txt only, once route publication is CMS-managed. Blocking crawling may prevent robots from seeing noindex." },
  ];
  return <section className="space-y-4 rounded-xl border bg-white p-4 md:p-5">
    <div><h3 className="!text-lg font-semibold text-stone-900">Advanced SEO · Indexing & crawling</h3>
      <p className="mt-1 text-xs text-stone-600">Save editorial preferences on this private draft. Publishing, robots.txt and sitemap output remain controlled by the existing website until route migration.</p></div>
    {options.map(option => <label key={option.key} className="flex cursor-pointer items-start gap-3 rounded-lg border border-stone-200 p-3">
      <input type="checkbox" className="mt-1" checked={!!seo[option.key]}
        onChange={event => update({ [option.key]: event.target.checked })} />
      <span><strong className="block text-sm text-stone-900">{option.title}</strong>
        <span className="mt-1 block text-xs text-stone-600">{option.detail}</span></span>
    </label>)}
    {seo.robotsDisallow && seo.robotsNoindex && <p role="alert" className="rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
      Caution: robots.txt Disallow can stop crawlers from seeing a page's noindex directive. To remove a page from search results, use a crawlable noindex response first.
    </p>}
    <p className="rounded-md bg-stone-50 p-3 text-xs text-stone-700">
      These controls do not change production robots.txt or public pages today. The test environment enforces noindex independently of the draft settings.
    </p>
  </section>;
}

export function ReadingPanel({ document, onLocate }: { document: CmsDocument; onLocate?: (example: CmsReadingExcerpt) => void }) {
  const seo = useMemo(() => analyzeCmsSeo(document), [document]);
  const reading = useMemo(() => getCmsReadingInsights(document), [document]);
  const evidence = useMemo(() => getCmsReadabilityEvidence(document), [document]);
  const difficulty = reading.easeEstimate === null ? "Add text to estimate reading ease" :
    reading.easeEstimate >= 70 ? "Generally easier to read" :
    reading.easeEstimate >= 60 ? "Fairly easy to read" :
    reading.easeEstimate >= 50 ? "Moderately difficult" : "More demanding to read";
  const paragraphCheck = seo.checks.find(check => check.id === "paragraphs");
  const advice = [
    { name: "Long sentences", status: getCmsReadabilityCheckStatus(reading, "longSentences"), examples: evidence.longSentences,
      target: CMS_READABILITY_TARGETS.longSentences,
      detail: reading.longSentencePercent + "% of sentences exceed 20 words. Shorten where it helps patients follow the instructions." },
    { name: "Scannable paragraphs", status: getCmsReadabilityCheckStatus(reading, "paragraphs"), examples: evidence.longParagraphs,
      target: CMS_READABILITY_TARGETS.paragraphs,
      detail: paragraphCheck?.detail || "Keep paragraphs focused on one idea." },
    { name: "Section structure", status: getCmsReadabilityCheckStatus(reading, "structure"), examples: evidence.structure,
      target: CMS_READABILITY_TARGETS.structure,
      detail: reading.contentHeadings + " populated section heading(s); " + reading.emptyHeadings + " empty section heading(s). Short pages can use one useful section; complete empty sections before treating them as finished." },
    { name: "Varied sentence openings", status: getCmsReadabilityCheckStatus(reading, "openings"), examples: evidence.repeatedStarts,
      target: CMS_READABILITY_TARGETS.openings,
      detail: reading.repeatedStarts + " adjacent repeated two-word openings identified. Vary them only if clarity improves." },
  ];
  const evaluated = reading.words > 0;
  const { score: readabilityScore, passed, checks: totalChecks } = getCmsReadabilityScore(reading);
  return <div className="space-y-4">
    <section className="rounded-xl border bg-white p-4 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2"><BookText className="h-5 w-5 text-teal-700"/>
          <h3 className="!text-lg font-semibold text-stone-900">Readability overview</h3></div>
        <div className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-2 text-right" aria-label="Readability editorial score">
          <p className="text-xs text-teal-800">Readability score · 4 editorial checks</p>
          <p className="text-2xl font-semibold tabular-nums text-teal-900">{readabilityScore === null ? "Not evaluated" : readabilityScore + " / 100"}</p>
          <p className="text-xs text-teal-800">{evaluated ? passed + " of " + totalChecks + " checks passed" : "Add body text to begin"}</p>
        </div>
      </div>
      <p className="mt-1 text-xs text-stone-500">Live estimates based on the current draft. A score of 100 means four editorial thresholds passed, not that every sentence is short or the Flesch reading ease is 100. They cannot measure patient understanding or medical accuracy. Body words here exclude formatted section headings; the SEO count can include headings, so totals may differ.</p>
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          {label:"Reading time",value:reading.readingMinutes + " min",target:CMS_READABILITY_TARGETS.readingMinutes},
          {label:"Body words",value:reading.words.toLocaleString(),target:CMS_READABILITY_TARGETS.bodyWords},
          {label:"Average sentence",value:reading.words ? reading.avgWordsPerSentence + " words" : "—",target:CMS_READABILITY_TARGETS.averageSentence},
          {label:"Long sentences",value:reading.words ? reading.longSentencePercent + "%" : "—",target:CMS_READABILITY_TARGETS.longSentences},
        ].map(item => <div key={item.label} className="rounded-lg border border-stone-100 bg-stone-50 p-3">
          <p className="text-xs text-stone-500">{item.label}</p>
          <p className="mt-1 text-xl font-semibold tabular-nums text-stone-900">{item.value}</p>
          <p className="mt-1 text-[11px] leading-snug text-stone-500">{item.target}</p>
        </div>)}
      </div>
      <div className="mt-4 rounded-lg border border-teal-100 bg-teal-50/50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div><p className="text-sm font-semibold text-stone-900">Flesch reading-ease estimate</p>
            <p className="text-sm text-teal-800">{difficulty}</p></div>
          <span className="text-2xl font-semibold tabular-nums text-teal-800">{reading.easeEstimate ?? "—"}{reading.easeEstimate !== null && <span className="text-sm font-normal"> / 100</span>}</span>
        </div>
        <p className="mt-2 text-xs font-medium text-teal-900">{CMS_READABILITY_TARGETS.flesch}</p>
        <p className="mt-1 text-xs leading-relaxed text-stone-600">This English-language syllable estimate favors common, shorter words and sentences. Keep essential dental terminology, urgent-care instructions and clinical meaning intact.</p>
      </div>
    </section>
    <section className="rounded-xl border bg-white p-4 md:p-5">
      <h3 className="!text-lg font-semibold text-stone-900">Reading checks</h3>
      <p className="mt-1 text-xs text-stone-500">Editorial guidance. Sentence length (4 SEO points), paragraph length (4) and section structure (2) also contribute to the Blog Editor's SEO checklist. Varied openings, Flesch and technical language do not add SEO points. The 100-point Readability score is separate.</p>
      {reading.words === 0 && <p className="mt-3 rounded-md border border-stone-200 bg-stone-50 p-3 text-sm text-stone-600">
        No body text yet. Readability checks are not evaluated until you add content.
      </p>}
      <div className="mt-3 space-y-2">
        {advice.map(item => <div key={item.name} className="flex items-start gap-3 rounded-lg border border-stone-200 p-3">
          {item.status === "not_evaluated" ? <Info className="mt-0.5 h-5 w-5 shrink-0 text-stone-500"/> :
            item.status === "good" ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"/> :
            <CircleX className="mt-0.5 h-5 w-5 shrink-0 text-red-600"/>}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-stone-900">{item.name}</p>
            <p className="mt-1 text-xs text-teal-800">{item.target}</p>
            <p className="mt-1 text-xs leading-relaxed text-stone-600">
              {item.status === "not_evaluated" ? "Not evaluated — add body text to run this check." : `Your content: ${item.detail}`}
            </p>
            {item.status !== "not_evaluated" && item.examples.length > 0 && <div className="mt-3 space-y-2">
               {item.status === "good" && <p className="text-xs text-amber-800">This overall check passed, but the following individual passages may still be worth reviewing.</p>}
              {item.examples.slice(0, 8).map((example, index) => <div key={example.blockId + "-" + index}
                className="rounded-lg border border-amber-100 bg-amber-50/40 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-stone-800">{example.section} · {example.opening ? `Repeated opening: “${example.opening}”` : `${example.words} words`}</span>
                  {onLocate && <Button size="sm" variant="outline" type="button" onClick={() => onLocate(example)}>Find in article</Button>}
                </div>
                <p className="mt-1 whitespace-pre-line break-words text-xs leading-relaxed text-stone-700">“{example.excerpt.length > 320 ? example.excerpt.slice(0, 320).trimEnd() + "…" : example.excerpt}”</p>
                {example.excerpt.length > 320 && <p className="mt-1 text-xs text-stone-500">Preview shortened; Find in article selects the complete passage.</p>}
              </div>)}
              {item.examples.length > 8 && <p className="text-xs text-stone-500">Showing the first eight flagged passages. Fix these and recheck.</p>}
            </div>}
            {item.status === "improve" && item.examples.length === 0 && <p className="mt-2 text-xs text-stone-500">
              {item.name === "Section structure"
                ? "Review headings in the article content above. For longer articles, use at least two populated H2 sections, and remove empty headings."
                : "Review the article text above for this issue. The example matcher did not find a specific passage."}
            </p>}
          </div>
        </div>)}
        <div className="flex items-start gap-3 rounded-lg border border-stone-200 p-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-700"/>
          <div><p className="text-sm font-semibold text-stone-900">Technical language — advisory</p>
            <p className="mt-1 text-xs text-teal-800">{CMS_READABILITY_TARGETS.technical}</p>
            <p className="mt-1 text-xs leading-relaxed text-stone-600">
              {reading.words === 0 ? "Not evaluated — add body text to review technical language." :
                `Approximately ${reading.technicalWordPercent}% of words have three or more syllables. Explain unfamiliar terms where helpful; do not remove medically accurate terminology just to improve a score.`}
            </p></div>
        </div>
      </div>
      {!!reading.longSentenceExamples.length && <details className="mt-3 rounded-lg border bg-stone-50 p-3">
        <summary className="cursor-pointer text-sm font-semibold text-stone-800">
          Show {reading.longSentenceExamples.length} example long sentence{reading.longSentenceExamples.length !== 1 ? "s" : ""}
        </summary>
        <div className="mt-2 space-y-2">
          {reading.longSentenceExamples.map((sentence,index) => <div className="flex flex-wrap items-start justify-between gap-2 rounded-md bg-white p-2" key={index}>
             <p className="min-w-0 flex-1 text-xs leading-relaxed text-stone-700">{sentence}</p>
             {onLocate && evidence.longSentences[index] && <Button type="button" size="sm" variant="outline" onClick={() => onLocate(evidence.longSentences[index])}>Find in article</Button>}
           </div>)}
        </div>
        <p className="mt-2 text-xs text-stone-500">Use Find in article to select the exact passage in the active editor. Nothing is changed automatically.</p>
      </details>}
      <p className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-900">
        <Info className="mt-0.5 h-4 w-4 shrink-0"/>
        Passive voice and transition-word detection are not yet reliable enough for clinical content, so they are deliberately excluded from automated scoring.
      </p>
    </section>
    <section className="rounded-xl border bg-white p-4 md:p-5">
      <div className="flex items-center justify-between gap-2">
        <h3 className="!text-lg font-semibold text-stone-900">Prominent topic words</h3>
        <span className="text-xs text-stone-500">Top {reading.prominentWords.length}</span>
      </div>
      <p className="mt-1 text-xs text-stone-500">Common variants such as tooth/teeth and cause/causes are grouped. Use this only to check topic emphasis. {CMS_READABILITY_TARGETS.topicWords}</p>
      <div className="mt-4 space-y-2">
        {reading.prominentWords.length === 0 && <p className="text-sm text-stone-500">Add article text to see prominent words.</p>}
        {reading.prominentWords.map(({word,count}) => <div key={word} className="flex items-center gap-3 text-sm">
          <span className="w-24 shrink-0 truncate font-medium text-stone-700" title={word}>{word}</span>
          <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-stone-100">
            <div className="h-full rounded-full bg-teal-600" style={{width: (100 * count / reading.prominentWords[0].count) + "%"}}/>
          </div><span className="w-9 text-right text-xs tabular-nums text-stone-600">{count}</span>
        </div>)}
      </div>
    </section>
  </div>;
}

function SchemaPanel({ document, onChange }: Pick<Props, "document" | "onChange">) {
  const [copied, setCopied] = useState(false);
  const preview = useMemo(() => getCmsSchemaPreview(document), [document]);
  const original: NonNullable<CmsDocument["editorial"]> = document.editorial || {
    categories: [], cornerstone: false, schemaPageType: "WebPage", schemaArticleType: "none",
  };
  const patch = (change: Partial<NonNullable<CmsDocument["editorial"]>>) => {
    setCopied(false);
    onChange({ ...document, editorial: { ...original, ...change } });
  };
  const manualMode = preview.selectionMode === "manual";
  // Prior manual type selections are displayed as editable JSON-LD, never silently discarded.
  const manualText = original.manualSchemaJsonLd ??
    JSON.stringify(preview.jsonLd, null, 2);
  const blockers = preview.issues.filter(issue => issue.level === "error").length;
  const warnings = preview.issues.filter(issue => issue.level === "warning").length;
  return <div className="space-y-4">
    <section className="rounded-xl border bg-white p-4 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-stone-900">
            <Braces className="h-5 w-5 text-teal-700" /> Schema markup
          </h3>
          <p className="mt-1 text-xs text-stone-600">Automatically generated for this CMS page. Use manual JSON-LD only when a custom schema is required.</p>
        </div>
        <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
          Preview only · Not published
        </span>
      </div>
      <div className="mt-4 rounded-lg border border-teal-100 bg-teal-50/60 p-3 text-sm text-teal-950">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <strong>{manualMode ? "Manual override" : "Automatic schema"}</strong>
          {manualMode ?
            <Button type="button" variant="outline" size="sm" onClick={() =>
              patch({ schemaMode: "auto", manualSchemaJsonLd: undefined })}>
              Restore automatic schema
            </Button> :
            <Button type="button" variant="outline" size="sm" onClick={() =>
              patch({ schemaMode: "manual", manualSchemaJsonLd: JSON.stringify(preview.automaticJsonLd, null, 2) })}>
              Edit schema manually
            </Button>}
        </div>
        <p className="mt-2">Page: <strong>{preview.pageType}</strong> · Content: <strong>{preview.articleType === "none" ? "No article markup" : preview.articleType}</strong></p>
        <p className="mt-1 text-xs text-teal-800">
          {manualMode
            ? "Manual JSON-LD replaces this CMS page's automatic nodes. Restore automatic at any time."
            : preview.recommendationReason}
        </p>
      </div>
      {manualMode && <div className="mt-4 space-y-2">
        <Label htmlFor="cms-manual-jsonld">Manual JSON-LD for this CMS page</Label>
        <Textarea id="cms-manual-jsonld" value={manualText} spellCheck={false}
          className="min-h-[270px] font-mono text-xs"
          aria-invalid={Boolean(preview.manualError)}
          onChange={event => patch({ schemaMode: "manual", manualSchemaJsonLd: event.target.value })} />
        <p className="text-xs text-stone-600">Edit one Schema.org object or an @graph. This only affects the private draft preview. Sitewide Organization and WebSite markup cannot be replaced.</p>
        {preview.manualError && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-800">
          Manual schema invalid: {preview.manualError}. Save Draft will reject invalid JSON-LD.
        </p>}
        {(preview.manualMissingReviewer || preview.manualMissingReviewDate) &&
          <p role="status" className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            Manual schema is missing reviewer attribution or the review date supplied in the Reviewer tab.
            Add verified information manually or restore automatic schema.
          </p>}
      </div>}
    </section>
    <section className="rounded-xl border bg-white p-4 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h3 className="!text-lg font-semibold text-stone-900">Structural checks</h3>
          <p className="mt-1 text-xs text-stone-500">Checked against this draft only. Not a Google Rich Results Test.</p></div>
        <div className="flex items-center gap-2 text-xs font-medium">
          {!!blockers && <span className="text-red-700">{blockers} issue{blockers !== 1 ? "s" : ""}</span>}
          {!!warnings && <span className="text-amber-700">{warnings} warning{warnings !== 1 ? "s" : ""}</span>}
          {!blockers && !warnings && <span className="text-emerald-700">No structural issues found</span>}
        </div>
      </div>
      <div className="mt-3 space-y-2">
        {preview.issues.map((issue,index) => <div key={index} className="flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm">
          {issue.level === "error" ? <CircleX className="mt-0.5 h-4 w-4 shrink-0 text-red-600"/> :
          issue.level === "warning" ? <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"/> :
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700"/>}
          <p className="text-stone-700">{issue.message}</p>
        </div>)}
      </div>
    </section>
    <section className="rounded-xl border bg-white p-4 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h3 className="!text-lg font-semibold text-stone-900">Live JSON-LD draft preview</h3>
          <p className="mt-1 text-xs text-stone-500">Updates immediately as content, reviewer details and schema changes.</p></div>
        <Button type="button" variant="outline" size="sm" onClick={async () => {
          try { await navigator.clipboard.writeText(JSON.stringify(preview.jsonLd,null,2)); setCopied(true); }
          catch { setCopied(false); }
        }}>{copied ? <Check className="mr-2 h-4 w-4"/> : <Copy className="mr-2 h-4 w-4"/>}
          {copied ? "Copied" : "Copy preview"}
        </Button>
      </div>
      {preview.manualError && <p className="mt-3 text-xs text-amber-700">
        Invalid manual JSON-LD; showing the automatic fallback preview until it is fixed.
      </p>}
      <pre className="mt-3 max-h-[480px] overflow-auto rounded-lg bg-slate-900 p-4 text-xs leading-relaxed text-slate-100">{JSON.stringify(preview.jsonLd,null,2)}</pre>
      <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-3 text-xs leading-relaxed text-amber-900">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0"/>
        <p><strong>Not active markup:</strong> this preview is never injected into the website. Existing server-owned sitewide JSON-LD remains authoritative. Reviewer identity, qualifications, review dates and rich-results eligibility require independent verification.</p>
      </div>
    </section>
  </div>;
}

function SocialPanel({ document, onChange }: Pick<Props, "document" | "onChange">) {
  const seo = document.seo;
  const [network, setNetwork] = useState<"og" | "x">("og");
  const [size, setSize] = useState<{width:number;height:number}|null>(null);
  const [broken, setBroken] = useState(false);
  const changeSeo = (patch: Partial<CmsDocument["seo"]>) => onChange({ ...document, seo: {...seo, ...patch} });
  const image = document.images.og?.url ? document.images.og : document.images.featured;
  const safeImage = image?.url && (
    image.url.startsWith("https://") || image.url.startsWith("http://") ||
    (image.url.startsWith("/") && !image.url.startsWith("//"))) ? image.url : "";
  const isOg = network === "og";
  const title = (isOg ? seo.ogTitle : seo.twitterTitle || seo.ogTitle) || seo.metaTitle || document.title;
  const description = (isOg ? seo.ogDescription : seo.twitterDescription || seo.ogDescription) || seo.metaDescription;
  const currentTitle = isOg ? seo.ogTitle || "" : seo.twitterTitle || "";
  const currentDescription = isOg ? seo.ogDescription || "" : seo.twitterDescription || "";
  const replaceImage = (picked: NonNullable<typeof image>) => {
    setSize(null); setBroken(false);
    onChange({ ...document, images: {...document.images, og: picked} });
  };
  const removeImage = () => {
    setSize(null); setBroken(false);
    onChange({ ...document, images: {...document.images, og: null} });
  };
  const imageTypeWarning = !!safeImage && /\.(?:svg|gif)(?:[?#]|$)/i.test(safeImage);
  const sizeWarning = !!size && (size.width < 1200 || size.height < 630 ||
    (size.height > 0 && (size.width / size.height < 1.7 || size.width / size.height > 2.1)));
  return <div className="space-y-4">
    <section className="rounded-xl border bg-white p-4 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h3 className="flex items-center gap-2 text-lg font-semibold text-stone-900">
          <Share2 className="h-5 w-5 text-teal-700" /> Social share appearance</h3>
          <p className="mt-1 text-xs text-stone-600">Live draft preview. Platforms choose their final layout and may rewrite text.</p></div>
        <div className="inline-flex rounded-lg border border-stone-200 bg-stone-50 p-1">
          <button type="button" aria-pressed={network === "og"} onClick={() => setNetwork("og")}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold ${network === "og" ? "bg-white text-teal-800 shadow-sm" : "text-stone-600"}`}>
            Facebook / LinkedIn
          </button>
          <button type="button" aria-pressed={network === "x"} onClick={() => setNetwork("x")}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold ${network === "x" ? "bg-white text-teal-800 shadow-sm" : "text-stone-600"}`}>
            X / Twitter
          </button>
        </div>
      </div>
      <div className="mt-4 max-w-[720px] overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
        {safeImage && !broken
          ? <img key={safeImage} src={safeImage} alt="Selected image for social share preview"
            onLoad={event => setSize({width:event.currentTarget.naturalWidth,height:event.currentTarget.naturalHeight})}
            onError={() => {setBroken(true); setSize(null);}}
            className="aspect-[1.91/1] max-h-[340px] w-full object-cover"/>
          : <div className="flex aspect-[1.91/1] min-h-36 items-center justify-center gap-2 bg-stone-100 text-sm text-stone-500">
              <ImageIcon className="h-5 w-5"/>{broken ? "Image could not be loaded" : "No social image selected"}
            </div>}
        <div className="space-y-1 p-4">
          <p className="text-xs uppercase tracking-wide text-stone-500">dentasmart.ai</p>
          <p className="text-base font-semibold leading-snug text-stone-900">{title || "Social title preview"}</p>
          <p className="line-clamp-3 text-sm text-stone-600">{description || "Add a meta description to preview how the page may be shared."}</p>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <div className="space-y-1">
          <Label htmlFor="cms-share-title">{isOg ? "Social share title" : "X-specific title"} (optional)</Label>
          <Input id="cms-share-title" maxLength={250} value={currentTitle}
            placeholder={isOg ? "Defaults to SEO title" : "Defaults to social title / SEO title"}
            onChange={event => changeSeo(isOg ? {ogTitle:event.target.value || undefined} : {twitterTitle:event.target.value || undefined})}/>
          <p className="text-xs text-stone-500">{currentTitle.length} characters · Overrides the default only when filled in.</p>
        </div>
        <div className="space-y-1">
          <Label htmlFor="cms-share-description">{isOg ? "Social share description" : "X-specific description"} (optional)</Label>
          <Textarea id="cms-share-description" rows={3} maxLength={1000} value={currentDescription}
            placeholder={isOg ? "Defaults to meta description" : "Defaults to social / meta description"}
            onChange={event => changeSeo(isOg ? {ogDescription:event.target.value || undefined} : {twitterDescription:event.target.value || undefined})}/>
        </div>
      </div>
      <p className="mt-3 text-xs text-stone-500">{isOg ?
        "Open Graph values are used for typical Facebook, LinkedIn and other social shares." :
        "X-specific text is saved separately. X uses the same OG or featured image; no separate X image override is stored."}</p>
    </section>
    <section className="rounded-xl border bg-white p-4 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h3 className="!text-base font-semibold text-stone-900">Social image</h3>
          <p className="mt-1 text-xs text-stone-500">Custom OG image takes priority. Featured Image is the fallback; Hero Image stays independent in the Media tab.</p></div>
        <div className="flex flex-wrap gap-2">
          <CmsMediaPicker buttonText={document.images.og?.url ? "Replace social image" : "Choose social image"} onSelect={replaceImage}/>
          {document.images.og?.url && <Button type="button" variant="outline" size="sm" onClick={removeImage}>
            Remove override
          </Button>}
        </div>
      </div>
      <div className="mt-3 space-y-2">
        {!image?.url && <p className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-900">
          <Info className="mt-0.5 h-4 w-4 shrink-0"/>No share image is available. For a visual share card, select a custom OG image or set a Featured Image in Media.</p>}
        {!!image?.url && <p className="flex items-start gap-2 rounded-lg bg-teal-50 p-3 text-xs text-teal-900">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0"/>
          {document.images.og?.url ? "Using custom OG image." : "Using Featured Image as fallback."}
          {size && ` Detected dimensions: ${size.width} × ${size.height}.`}
        </p>}
        {(imageTypeWarning || sizeWarning || broken) && <p className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-900">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0"/>
          {broken ? "The selected image could not load in the preview. Verify its URL and accessibility." :
            "For broad social compatibility, prefer JPG, PNG or WebP with approximately 1200 × 630 pixels (1.91:1)."}
        </p>}
        {image?.url && !image.altText.trim() && <p className="flex items-start gap-2 rounded-lg bg-stone-50 p-3 text-xs text-stone-700">
          <Info className="mt-0.5 h-4 w-4 shrink-0"/>No alt text is recorded for this selected image. Add accurate text in Media if the image conveys information; purely decorative images can use empty alt text.
        </p>}
        <p className="text-xs text-stone-500">Image checks are local previews, not social crawler tests. Selecting media updates only this draft until you save it.</p>
      </div>
    </section>
  </div>;
}

export default function CmsSeoPanels({ document, onChange, candidates, onLocate, activeTab, onActiveTabChange, tabListId }: Props) {
  const [localTab, setLocalTab] = useState<CmsEditorSeoTab>("seo");
  const tab = activeTab ?? localTab;
  const changeTab = (value: string) => {
    const next = parseCmsEditorSeoTab(value);
    if (next !== value) return;
    if (onActiveTabChange) onActiveTabChange(next);
    else setLocalTab(next);
  };
  return <Tabs value={tab} onValueChange={changeTab} className="space-y-3">
    <TabsList id={tabListId} className="flex h-auto flex-wrap gap-2 bg-transparent p-0 scroll-mt-24">
      <TabsTrigger value="seo" className="border bg-white"><Search className="mr-2 h-4 w-4"/> SEO</TabsTrigger>
      <TabsTrigger value="readability" className="border bg-white"><BookText className="mr-2 h-4 w-4"/> Readability</TabsTrigger>
      <TabsTrigger value="schema" className="border bg-white"><Braces className="mr-2 h-4 w-4"/> Schema</TabsTrigger>
      <TabsTrigger value="social" className="border bg-white"><Share2 className="mr-2 h-4 w-4"/> Social</TabsTrigger>
      <TabsTrigger value="advanced" className="border bg-white"><ShieldAlert className="mr-2 h-4 w-4"/> Advanced</TabsTrigger>
    </TabsList>
    <TabsContent value="seo"><CmsSeoSuite document={document} onChange={onChange} candidateConditions={candidates}/></TabsContent>
    <TabsContent value="readability"><ReadingPanel document={document} onLocate={onLocate}/></TabsContent>
    <TabsContent value="schema"><SchemaPanel document={document} onChange={onChange}/></TabsContent>
    <TabsContent value="social"><SocialPanel document={document} onChange={onChange}/></TabsContent>
    <TabsContent value="advanced"><AdvancedSeoPanel document={document} onChange={onChange}/></TabsContent>
  </Tabs>;
}
