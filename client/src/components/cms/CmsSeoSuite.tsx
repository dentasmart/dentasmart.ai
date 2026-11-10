import { useMemo, useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp, CircleHelp, CircleX, Copy, Eye, FileText, Image as ImageIcon, Info, Link2, Plus, Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { CmsDocument } from "@shared/cmsBlocks";
import { getCmsHub } from "@shared/cmsHubRegistry";
import { isValidCmsPublicPath } from "@shared/cmsUrlPolicy";
import { cmsSeoReadabilityTarget } from "@shared/cmsReadabilityTargets";
import {
  analyzeCmsSeo, suggestCmsInternalLinks,
  type CmsSeoCategory, type CmsSeoCheck, type CmsSeoLinkCandidate,
} from "@shared/cmsSeoAnalysis";

interface Props {
  document: CmsDocument;
  onChange: (document: CmsDocument) => void;
  candidateConditions: readonly CmsSeoLinkCandidate[];
}

const CATEGORIES: CmsSeoCategory[] = ["Keyphrase", "Metadata", "Content", "Links", "Images", "Readability"];

function CheckSymbol({ status }: { status: CmsSeoCheck["status"] }) {
  if (status === "good") return <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />;
  if (status === "critical" || status === "improve") return <CircleX className="h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />;
  return <Info className="h-5 w-5 shrink-0 text-slate-500" aria-hidden="true" />;
}

function CheckStatus({ check }: { check: CmsSeoCheck }) {
  const failed = check.status === "critical" || check.status === "improve";
  const readabilityTarget = cmsSeoReadabilityTarget(check.id);
  return <div className="flex items-start gap-3 rounded-lg border border-stone-200 p-3" aria-label={`${check.title}: ${failed ? "Needs attention" : check.status === "good" ? "Passed" : "Information"}`}>
    <CheckSymbol status={check.status} />
    <div className="min-w-0 flex-1 space-y-1">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="text-sm font-medium text-stone-900">{check.title}</p>
        <span className={`text-xs font-medium ${failed ? "text-red-700" : check.status === "good" ? "text-emerald-700" : "text-stone-500"}`}>
          {check.status === "info" && check.id === "alt" ? "Not applicable" : check.maxPoints && check.status !== "info" ? `${check.points}/${check.maxPoints} pts` : failed ? "Needs attention" : check.status === "good" ? "Passed" : "Info"}
        </span>
      </div>
      {readabilityTarget && <p className="text-xs leading-relaxed text-teal-800">{readabilityTarget}</p>}
      <p className="text-xs leading-relaxed text-stone-600">{check.detail}</p>
    </div>
  </div>;
}

function CharacterCounter({ value, idealMin, idealMax }: { value: string; idealMin: number; idealMax: number }) {
  const length = value.trim().length;
  const adequate = length >= idealMin && length <= idealMax;
  return <p className={`text-xs ${adequate ? "text-teal-700" : "text-amber-700"}`}>
    {length} characters · Suggested {idealMin}–{idealMax} (not a guaranteed search snippet limit)
  </p>;
}

export default function CmsSeoSuite({ document, onChange, candidateConditions }: Props) {
  const [newSecondary, setNewSecondary] = useState("");
  const [newSynonym, setNewSynonym] = useState("");
  const [copiedLink, setCopiedLink] = useState("");
  const [filter, setFilter] = useState<"all" | "improve" | "good">("improve");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [previewWidth, setPreviewWidth] = useState<"desktop" | "mobile">("desktop");
  const report = useMemo(() => analyzeCmsSeo(document), [document]);
  const suggestions = useMemo(() => suggestCmsInternalLinks(document, candidateConditions), [document, candidateConditions]);
  const seo = document.seo;
  const sourcePrefix = getCmsHub(document.hubId || "")?.sourcePath || "/" + document.contentType + "s/";
  const defaultPath = sourcePrefix.replace(/\/$/, "") + "/" + document.slug + "/";
  const path = seo.requestedPath || defaultPath;
  const previewUrl = "https://dentasmart.ai" + path;
  const pathInvalid = !!seo.requestedPath && !isValidCmsPublicPath(seo.requestedPath);
  const updateSeo = (patch: Partial<CmsDocument["seo"]>) => {
    onChange({ ...document, seo: { ...seo, ...patch } });
  };
  const addSecondary = () => {
    const phrase = newSecondary.trim();
    if (!phrase || phrase.length > 200 || seo.secondaryKeywords.length >= 30 ||
      [seo.focusKeyword, ...seo.secondaryKeywords].some((key) => key.toLocaleLowerCase() === phrase.toLocaleLowerCase())) return;
    updateSeo({ secondaryKeywords: [...seo.secondaryKeywords, phrase] });
    setNewSecondary("");
  };
  const addSynonym = () => {
    const phrase = newSynonym.trim();
    if (!phrase || phrase.length > 200 || (seo.synonyms || []).length >= 30 ||
      [seo.focusKeyword, ...seo.secondaryKeywords, ...(seo.synonyms || [])].some(
        value => value.toLowerCase() === phrase.toLowerCase())) return;
    updateSeo({ synonyms: [...(seo.synonyms || []), phrase] });
    setNewSynonym("");
  };
  const good = report.checks.filter((check) => check.status === "good").length;
  const informative = report.checks.filter((check) => check.status === "info").length;
  const linkAudit = report.checks.filter((check) => check.id === "internal-links" || check.id === "external" || check.id === "alt");
  const improve = report.checks.filter((check) => check.status === "improve" || check.status === "critical").length;
  const scoreLabel = report.score >= 80 ? "Strong editorial signals" : report.score >= 60 ? "Room to improve" : "Needs optimization";

  return <div className="space-y-5">
    <section className="rounded-xl border bg-white p-4 md:p-5" aria-label="SEO analysis overview">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-stone-900">Advanced SEO Suite</h2>
          <p className="text-sm text-stone-600">Live on-page guidance based on your current draft. Changes are stored only when you save the draft.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-stone-900">{scoreLabel}</p>
            <p className="text-xs text-stone-500" aria-live="polite">{good} passed · {improve} to review · {informative} info</p>
          </div>
          <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full border-[6px] border-teal-600 bg-teal-50" role="img" aria-label={`Editorial SEO score ${report.score} out of 100`}>
            <span className="text-2xl font-semibold text-stone-900">{report.score}</span>
            <span className="text-[10px] text-stone-600">/ 100</span>
          </div>
        </div>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-stone-200" role="progressbar" aria-label="Editorial SEO score" aria-valuenow={report.score} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-teal-600 transition-all" style={{ width: `${report.score}%` }} />
      </div>
      <p className="mt-3 text-xs text-stone-500">This is a transparent editorial checklist, not a Google score or a ranking prediction. Clinical accuracy, source verification, crawl/indexing health and approval are separate reviews. The score never approves publication.</p>
    </section>

    <div className="grid items-start gap-4 2xl:grid-cols-2">
      <section className="min-w-0 space-y-4 rounded-xl border bg-white p-4 md:p-5">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-stone-900"><Search className="h-5 w-5 text-teal-700" /> Focus keyphrases</h2>
          <p className="text-xs text-stone-500">One primary phrase and optional supporting phrases. Write for readers, not keyword density.</p>
        </div>
        <div className="space-y-1">
          <Label htmlFor="cms-focus">Primary focus keyphrase</Label>
          <Input id="cms-focus" value={seo.focusKeyword} maxLength={200} placeholder="e.g. toothache"
            onChange={(event) => updateSeo({ focusKeyword: event.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cms-secondary-new">Secondary keyphrases</Label>
          <div className="flex gap-2">
            <Input id="cms-secondary-new" value={newSecondary} maxLength={200} placeholder="Add a supporting phrase"
              onChange={(event) => setNewSecondary(event.target.value)}
              onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addSecondary(); } }} />
            <Button type="button" variant="outline" disabled={!newSecondary.trim() || seo.secondaryKeywords.length >= 30} onClick={addSecondary}>
              <Plus className="mr-1 h-4 w-4" /> Add
            </Button>
          </div>
          <div className="space-y-1" aria-label="Configured secondary keyphrases">
            {seo.secondaryKeywords.length === 0 && <p className="text-xs text-stone-500">No secondary phrases added yet (optional).</p>}
            {seo.secondaryKeywords.map((phrase, index) => {
              const finding = report.secondary[index];
              return <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border bg-stone-50 px-3 py-2 text-sm" key={index}>
                <div>
                  <span className="font-medium text-stone-800">{phrase}</span>
                  <span className="ml-2 text-xs text-stone-500">{finding?.matches || 0} body match(es){finding?.inHeading ? " · in heading" : ""}</span>
                </div>
                <Button type="button" size="sm" variant="ghost" aria-label={`Remove secondary phrase ${phrase}`}
                  onClick={() => updateSeo({ secondaryKeywords: seo.secondaryKeywords.filter((_, i) => i !== index) })}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>;
            })}
          </div>
        </div>
        <div className="space-y-2 rounded-lg border border-stone-200 p-3">
          <Label htmlFor="cms-synonym-new">Primary keyphrase synonyms (optional)</Label>
          <p className="text-xs text-stone-500">Track natural alternatives to your primary phrase. Synonyms are not counted as exact matches and do not increase the score automatically.</p>
          <div className="flex gap-2">
            <Input id="cms-synonym-new" value={newSynonym} maxLength={200} placeholder="e.g. dental pain"
              onChange={event => setNewSynonym(event.target.value)}
              onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); addSynonym(); } }} />
            <Button variant="outline" type="button" disabled={!newSynonym.trim()} onClick={addSynonym}>Add</Button>
          </div>
          {(seo.synonyms || []).map((phrase, index) => <div className="flex items-center justify-between rounded-md bg-stone-50 px-3 py-2 text-sm" key={phrase}>
            <div><span className="font-medium">{phrase}</span><span className="ml-2 text-xs text-stone-500">{report.synonyms[index]?.matches || 0} body match(es)</span></div>
            <Button variant="ghost" size="sm" type="button" aria-label={`Remove synonym ${phrase}`} onClick={() => updateSeo({synonyms:(seo.synonyms || []).filter((_, i) => i !== index)})}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>)}
        </div>
        <div className="grid grid-cols-2 gap-3 rounded-lg bg-stone-50 p-3 text-sm">
          <div><span className="block text-xs text-stone-500">Primary phrase in body</span><strong>{report.metrics.keywordOccurrences} matches</strong></div>
          <div><span className="block text-xs text-stone-500">Frequency / 100 words</span><strong>{report.metrics.keywordDensity}</strong></div>
          <div><span className="block text-xs text-stone-500">Body words</span><strong>{report.metrics.wordCount}</strong></div>
          <div><span className="block text-xs text-stone-500">Section headings</span><strong>{report.metrics.headingCount}</strong></div>
        </div>
      </section>

      <section className="min-w-0 space-y-4 rounded-xl border bg-white p-4 md:p-5">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-stone-900"><FileText className="h-5 w-5 text-teal-700" /> Search metadata</h2>
          <p className="text-xs text-stone-500">Page H1 is edited at the top of the CMS. These fields are independent and saved with the draft.</p>
        </div>
        <div className="space-y-1">
          <Label htmlFor="cms-meta-title">SEO title</Label>
          <Textarea id="cms-meta-title" rows={2} maxLength={250} value={seo.metaTitle}
            className="min-h-[70px] resize-y" onChange={(event) => updateSeo({ metaTitle: event.target.value })} />
          <CharacterCounter value={seo.metaTitle} idealMin={30} idealMax={60} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="cms-meta-description">Meta description</Label>
          <Textarea id="cms-meta-description" rows={3} maxLength={1000} value={seo.metaDescription}
            onChange={(event) => updateSeo({ metaDescription: event.target.value })} />
          <CharacterCounter value={seo.metaDescription} idealMin={110} idealMax={160} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="cms-requested-path">Page URL (proposed public path)</Label>
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs text-stone-500">dentasmart.ai</span>
            <Input id="cms-requested-path" value={seo.requestedPath ?? defaultPath}
              maxLength={500} aria-invalid={pathInvalid}
              onChange={event => updateSeo({ requestedPath: event.target.value === defaultPath ? undefined : event.target.value })}
              placeholder={defaultPath}/>
          </div>
          <p className={`text-xs ${pathInvalid ? "text-red-700" : "text-stone-600"}`}>
            {(seo.requestedPath ?? defaultPath).length} / 500 characters (path only) · {pathInvalid ? "Invalid path. Use lowercase letters, digits, / and hyphens." : "URL suggestion saved with this draft."}
          </p>
          <p className="text-xs text-amber-800">
            Existing public URLs are source-controlled. Editing this proposed URL does not rename a live page or create a redirect yet.
            Automatic 301 redirects and sitemap changes require an approved CMS-owned publishing route.
          </p>
        </div>
        <div className="space-y-1">
          <Label htmlFor="cms-canonical">Canonical URL override (optional)</Label>
          <Input id="cms-canonical" value={seo.canonicalUrl || ""} placeholder="Leave blank to use the website's canonical rules"
            onChange={(event) => updateSeo({ canonicalUrl: event.target.value || undefined })} />
          <p className="text-xs text-stone-500">Only set when necessary. An incorrect canonical can prevent indexing. The test website remains noindex regardless.</p>
        </div>
      </section>
    </div>

    <div className="grid items-start gap-4 2xl:grid-cols-2">
      <section className="min-w-0 space-y-4 rounded-xl border bg-white p-4 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-stone-900"><Eye className="h-5 w-5 text-teal-700" /> Search appearance preview</h2>
          <div className="inline-flex rounded-md border p-1 text-xs" aria-label="Preview width">
            <button type="button" aria-pressed={previewWidth === "desktop"}
              className={`rounded px-2 py-1 ${previewWidth === "desktop" ? "bg-teal-100 text-teal-900" : "text-stone-600"}`}
              onClick={() => setPreviewWidth("desktop")}>Desktop</button>
            <button type="button" aria-pressed={previewWidth === "mobile"}
              className={`rounded px-2 py-1 ${previewWidth === "mobile" ? "bg-teal-100 text-teal-900" : "text-stone-600"}`}
              onClick={() => setPreviewWidth("mobile")}>Mobile</button>
          </div>
        </div>
        <div className={`rounded-lg border bg-white p-4 ${previewWidth === "mobile" ? "max-w-[360px]" : "w-full"}`}>
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-800">D</span>
            <div><p>DentaSmart</p><p className="break-all text-[11px]">{previewUrl}</p></div>
          </div>
          <p className="mt-2 break-words text-lg leading-snug text-blue-700">{seo.metaTitle || document.title || "SEO title preview"}</p>
          <p className="mt-1 break-words text-sm text-stone-700">{seo.metaDescription || "Your meta description will appear here when added."}</p>
        </div>
        <p className="text-xs text-stone-500">Illustration only. Search engines may rewrite the title or description. This preview does not make the testing page indexable.</p>
      </section>

      <section className="min-w-0 space-y-4 rounded-xl border bg-white p-4 md:p-5">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-stone-900"><Link2 className="h-5 w-5 text-teal-700" /> Internal links & media</h2>
        <div className="grid grid-cols-2 gap-3 rounded-lg bg-stone-50 p-3 text-sm" aria-live="polite">
          <div><span className="block text-xs text-stone-500">Internal links</span><strong>{report.metrics.internalLinks}</strong></div>
          <div><span className="block text-xs text-stone-500">External source links</span><strong>{report.metrics.externalLinks}</strong></div>
          <div><span className="block text-xs text-stone-500">On-page images with alt text</span><strong>{report.metrics.imagesWithAlt} / {report.metrics.imageCount}</strong></div>
          <div><span className="block text-xs text-stone-500">Images missing alt text</span><strong>{report.metrics.imagesWithoutAlt}</strong></div>
          <div><span className="block text-xs text-stone-500">Generic alt / decorative</span><strong>{report.metrics.imagesWeakAlt} / {report.metrics.decorativeImages}</strong></div>
          <div><span className="block text-xs text-stone-500">Long paragraphs</span><strong>{report.metrics.longParagraphs}</strong></div>
        </div>
        <div className="space-y-2" aria-label="Live link and image audit" aria-live="polite">
          <h3 className="text-base font-semibold text-stone-800">Link & image checks</h3>
          {linkAudit.map((check) => <CheckStatus key={check.id} check={check} />)}
        </div>
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-stone-800">Suggested related pages</h3>
          <p className="text-xs text-stone-500">Prioritized by specific topic overlap. Suggestions are optional and are not added automatically.</p>
          {suggestions.length === 0 && <p className="text-sm text-stone-500">No matching published-source candidates were found in the available inventory. Add useful links manually in Sections where relevant.</p>}
          <div className="max-h-[390px] space-y-2 overflow-y-auto pr-1">
          {suggestions.map((item) => <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3" key={item.url}>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-stone-900">{item.title}</p>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="break-all text-xs text-teal-800 underline">{item.url}</a>
              <p className="mt-1 text-xs text-stone-500">{item.reason}</p>
            </div>
            <Button type="button" size="sm" variant="outline" onClick={async () => {
              try {
                await navigator.clipboard.writeText("https://dentasmart.ai" + item.url);
                setCopiedLink(item.url);
              } catch { setCopiedLink(""); }
            }}><Copy className="mr-1 h-4 w-4" />{copiedLink === item.url ? "Copied" : "Copy URL"}</Button>
          </div>)}
          </div>
          <p className="text-xs text-stone-500">Suggestions use topic-word overlap, not search traffic or live link crawling. Add suitable links in Sections → Related Links or Rich Text. Existing and self-links are excluded.</p>
        </div>
        <div className="flex items-start gap-2 rounded-lg bg-teal-50 p-3 text-xs text-teal-900">
          <ImageIcon className="mt-0.5 h-4 w-4 shrink-0" />
          <p>On-page image checks cover the hero, content image blocks and images embedded in rich text. Featured thumbnails and social (OG) images are excluded from this count. Add meaningful alt text in Images or Sections; purely decorative images can be marked as decorative and use empty alt text.</p>
        </div>
      </section>
    </div>

    <section className="space-y-3 rounded-xl border bg-white p-4 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-stone-900"><CircleHelp className="h-5 w-5 text-teal-700" /> SEO & readability checklist</h2>
          <p className="text-xs text-stone-500">Weighted checks total 100 points. Some informational checks carry no points.</p>
        </div>
        <div className="inline-flex gap-1 rounded-md border p-1">
          <Button type="button" size="sm" aria-pressed={filter === "improve"} variant={filter === "improve" ? "default" : "ghost"}
            onClick={() => setFilter("improve")}>Needs work ({improve})</Button>
          <Button type="button" size="sm" aria-pressed={filter === "good"} variant={filter === "good" ? "default" : "ghost"}
            onClick={() => setFilter("good")}>Passed ({good})</Button>
          <Button type="button" size="sm" aria-pressed={filter === "all"} variant={filter === "all" ? "default" : "ghost"}
            onClick={() => setFilter("all")}>All ({report.checks.length})</Button>
        </div>
      </div>
      {filter === "improve" && improve === 0 && <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">All scored editorial checks currently pass. This is not a publishing approval or a ranking guarantee.</p>}
      {CATEGORIES.map((category) => {
        const checks = report.checks.filter((item) => item.category === category && (
          filter === "all" || (filter === "good" ? item.status === "good" :
            item.status === "improve" || item.status === "critical")));
        if (!checks.length) return null;
        const open = expandedGroups[category] !== false;
        return <section key={category} className="rounded-lg border border-stone-200">
          <button type="button" aria-expanded={open}
            onClick={() => setExpandedGroups(current => ({ ...current, [category]: !open }))}
            className="flex w-full items-center justify-between rounded-t-lg bg-stone-50 px-3 py-3 text-left text-sm font-semibold text-stone-800">
            <span>{category} <span className="ml-1 text-xs font-normal text-stone-500">({checks.length})</span></span>
            {open ? <ChevronUp className="h-4 w-4"/> : <ChevronDown className="h-4 w-4"/>}
          </button>
          {open && <div className="space-y-2 p-2">{checks.map(check => <CheckStatus key={check.id} check={check}/>)}</div>}
        </section>;
      })}
      <p className="border-t pt-3 text-xs text-stone-500">SEO analysis is calculated locally from the current CMS draft and never modifies content or publishes it automatically. Live backlink data, broken-link crawling, search traffic, structured data validation, accessibility and clinical review are outside this on-page module.</p>
    </section>
  </div>;
}
