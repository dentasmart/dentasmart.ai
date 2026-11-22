import { useState } from "react";
import { AlertTriangle, CheckCircle2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CmsDocument } from "@shared/cmsBlocks";
import { getCmsHub } from "@shared/cmsHubRegistry";
import {
  appendCmsLabels, assessCmsReviewerDraft, cmsUsesManualCategoriesAndTags, CMS_MAX_LABELS,
  type CmsReviewerDraft,
} from "@shared/cmsOrganizationReview";

type Props = { document: CmsDocument; onChange: (next: CmsDocument) => void };

const emptyEditorial = {
  categories: [] as string[], cornerstone: false,
  schemaPageType: "WebPage" as const, schemaArticleType: "none" as const,
};

export default function CmsOrganizationReviewPanel({ document, onChange }: Props) {
  const [categoryInput, setCategoryInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const editorial = document.editorial ?? emptyEditorial;
  const categories = editorial.categories;
  const tags = document.tags;
  const assessment = assessCmsReviewerDraft(document.reviewer);
  const usesManualTaxonomy = cmsUsesManualCategoriesAndTags(document.hubId, document.contentType);
  const hubLabel = getCmsHub(document.hubId ?? "")?.label ?? "the selected Content Hub";

  const updateCategories = (updated: string[]) =>
    onChange({ ...document, editorial: { ...editorial, categories: updated } });
  const updateTags = (updated: string[]) =>
    onChange({ ...document, tags: updated });
  const addCategories = () => {
    const next = appendCmsLabels(categories, categoryInput);
    if (next.join("\u0000") !== categories.join("\u0000")) updateCategories(next);
    setCategoryInput("");
  };
  const addTags = () => {
    const next = appendCmsLabels(tags, tagInput);
    if (next.join("\u0000") !== tags.join("\u0000")) updateTags(next);
    setTagInput("");
  };
  const updateReviewer = (field: keyof CmsReviewerDraft, value: string) =>
    onChange({ ...document, reviewer: { ...document.reviewer, [field]: value } });

  return (
    <div className="space-y-4">
      {usesManualTaxonomy ? (
      <section className="space-y-4 rounded-xl border bg-white p-4">
        <div>
          <h2 className="font-semibold text-stone-900">Categories & tags</h2>
          <p className="mt-1 text-xs text-stone-600">
            Organize this private draft. These labels do not create public categories, URLs, or taxonomy pages.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cms-category-entry">Categories ({categories.length}/{CMS_MAX_LABELS})</Label>
          <div className="flex flex-wrap gap-1.5" aria-label="Saved draft categories">
            {categories.map((category, index) => (
              <span key={index} className="inline-flex max-w-full items-center gap-1 rounded-full bg-teal-50 px-2 py-1 text-xs text-teal-900">
                <span className="truncate">{category}</span>
                <button type="button" aria-label={"Remove category " + category}
                  onClick={() => updateCategories(categories.filter((_, i) => i !== index))}
                  className="rounded-full p-0.5 hover:bg-teal-100"><X className="h-3 w-3" /></button>
              </span>
            ))}
            {categories.length === 0 && <span className="text-xs text-stone-500">No categories added</span>}
          </div>
          <div className="flex gap-2">
            <Input id="cms-category-entry" value={categoryInput} placeholder="e.g. Preventive Care"
              disabled={categories.length >= CMS_MAX_LABELS}
              onChange={event => setCategoryInput(event.target.value)}
              onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); addCategories(); } }}
              onBlur={addCategories} />
            <Button type="button" size="sm" variant="outline" onMouseDown={event => event.preventDefault()}
              disabled={!categoryInput.trim() || categories.length >= CMS_MAX_LABELS}
              onClick={addCategories}><Plus className="mr-1 h-4 w-4" /> Add</Button>
          </div>
          <p className="text-xs text-stone-500">Enter or paste comma-separated labels. Duplicates are skipped.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cms-tag-entry">Tags ({tags.length}/{CMS_MAX_LABELS})</Label>
          <div className="flex flex-wrap gap-1.5" aria-label="Saved draft tags">
            {tags.map((tag, index) => (
              <span key={index} className="inline-flex max-w-full items-center gap-1 rounded-full bg-stone-100 px-2 py-1 text-xs text-stone-700">
                <span className="truncate">{tag}</span>
                <button type="button" aria-label={"Remove tag " + tag}
                  onClick={() => updateTags(tags.filter((_, i) => i !== index))}
                  className="rounded-full p-0.5 hover:bg-stone-200"><X className="h-3 w-3" /></button>
              </span>
            ))}
            {tags.length === 0 && <span className="text-xs text-stone-500">No tags added</span>}
          </div>
          <div className="flex gap-2">
            <Input id="cms-tag-entry" value={tagInput} placeholder="e.g. fluoride, brushing"
              disabled={tags.length >= CMS_MAX_LABELS}
              onChange={event => setTagInput(event.target.value)}
              onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); addTags(); } }}
              onBlur={addTags} />
            <Button type="button" size="sm" variant="outline" onMouseDown={event => event.preventDefault()}
              disabled={!tagInput.trim() || tags.length >= CMS_MAX_LABELS}
              onClick={addTags}><Plus className="mr-1 h-4 w-4" /> Add</Button>
          </div>
          <p className="text-xs text-stone-500">Please enter comma-separated values.</p>
          <p className="text-xs text-stone-500">Keep tags specific; they remain internal editorial metadata.</p>
        </div>
      </section>
      ) : (
      <section className="space-y-2 rounded-xl border bg-white p-4">
        <h2 className="font-semibold text-stone-900">Content placement</h2>
        <p className="text-sm text-stone-600">This page is organized automatically using its Content Hub and title.</p>
        <p className="text-sm text-stone-700"><strong>Hub:</strong> {hubLabel}</p>
        <p className="text-sm text-stone-700"><strong>Topic:</strong> {document.title}</p>
      </section>
      )}

      <section className="rounded-xl border bg-white p-4">
        <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm">
          <input type="checkbox" checked={editorial.cornerstone}
            onChange={event => onChange({ ...document, editorial: { ...editorial, cornerstone: event.target.checked } })}
            className="mt-1" />
          <span><strong className="block">Cornerstone content</strong>
            Flag as an important guide for planning. This does not boost rankings or change public pages.</span>
        </label>
      </section>

      <section className="space-y-4 rounded-xl border bg-white p-4">
        <div>
          <h2 className="font-semibold text-stone-900">Clinical review details</h2>
          <p className="mt-1 text-xs text-amber-800">
            Editor-entered claims only. Filling these fields is NOT clinical approval or independent verification.
            The existing server-controlled governance and publication checks still apply.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor="cms-reviewer">Reviewer name</Label>
            <Input id="cms-reviewer" maxLength={200} value={document.reviewer?.name || ""}
              onChange={event => updateReviewer("name", event.target.value)} placeholder="Professional's name" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="cms-reviewer-credentials">Professional credentials</Label>
            <Input id="cms-reviewer-credentials" maxLength={500} value={document.reviewer?.credentials || ""}
              onChange={event => updateReviewer("credentials", event.target.value)} placeholder="Qualifications (unverified)" />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor="cms-reviewer-profile">Professional profile URL</Label>
            <Input id="cms-reviewer-profile" type="url" maxLength={1000} value={document.reviewer?.profileUrl || ""}
              onChange={event => updateReviewer("profileUrl", event.target.value)} placeholder="https://..." />
          </div>
          <div className="space-y-1">
            <Label htmlFor="cms-reviewer-date">Claimed last clinical review date</Label>
            <Input id="cms-reviewer-date" type="date" maxLength={10} value={document.reviewer?.lastReviewed || ""}
              onChange={event => updateReviewer("lastReviewed", event.target.value)} />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <Label htmlFor="cms-reviewer-bio">Professional bio (optional)</Label>
            <Textarea id="cms-reviewer-bio" rows={3} maxLength={2000} value={document.reviewer?.shortBio || ""}
              onChange={event => updateReviewer("shortBio", event.target.value)}
              placeholder="Short professional background for the editorial draft" />
          </div>
        </div>
        <div className="rounded-lg border border-stone-200 bg-stone-50 p-3 text-sm" aria-live="polite">
          <div className="flex items-center gap-2 font-medium text-stone-800">
            {assessment.fieldsComplete
              ? <CheckCircle2 className="h-4 w-4 text-teal-700" />
              : <AlertTriangle className="h-4 w-4 text-amber-700" />}
            {assessment.fieldsComplete ? "Review details entered — not verified" : "Review details still need attention"}
          </div>
          {assessment.issues.length > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-stone-600">
              {assessment.issues.map(issue => <li key={issue}>{issue}</li>)}
            </ul>
          )}
          <p className="mt-2 text-xs text-stone-600">
            Clinical approval, reviewer identity, credentials, consent and the content version must be verified
            through the separate governed review workflow before public attribution.
          </p>
        </div>
      </section>
    </div>
  );
}
