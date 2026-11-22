import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { AlertTriangle, Braces, CheckCircle2, Copy, Image as ImageIcon, Info, Share2, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CmsMediaPicker from "@/components/cms/CmsMediaPicker";
import { blogDraftToCmsSeoDocument, blogSocialPreview, type BlogSeoDraft } from "@shared/blogSeoAdapter";
import { ReadingPanel } from "@/components/cms/CmsSeoPanels";
import { getBlogSchemaDraftPreview } from "@shared/blogSchemaDraftPreview";
import { getManualBlogSchemaText, isManualBlogSchema, parseManualBlogSchema, storeManualBlogSchema } from "@shared/blogSchemaOverride";
import { getPublicBlogReviewerMetadata, getPublicLastReviewed } from "@shared/blogReviewerMetadata";
import type { CmsReadingExcerpt } from "@shared/cmsReadabilityEvidence";

type EditableField = "ogTitle" | "ogDescription" | "ogImage" | "featuredImage";
type Panel = "readability" | "social" | "media" | "schema" | "advanced";
interface Props {
  panel: Panel;
  draft: BlogSeoDraft;
  onChange: (field: EditableField, value: string) => void;
  onLocateReadability?: (example: CmsReadingExcerpt) => void;
  onSchemaChange?: (storedValue: string) => void;
  onSchemaReset?: () => void;
}
const inputHelp = "Existing Blog Editor fields; changes are saved only when you save the article.";

function SafeImagePreview({ src, purpose }: { src: string; purpose: string }) {
  const [failed, setFailed] = useState(false);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  useEffect(() => { setFailed(false); setDimensions(null); }, [src]);
  const safe = /^(https?:\/\/|\/(?!\/))/i.test(src.trim()) ? src.trim() : "";
  const tooSmall = !!dimensions && (dimensions.width < 1200 || dimensions.height < 630);
  return <div className="min-w-0 space-y-2">
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-stone-50">
      {safe && !failed
        ? <img key={safe} src={safe} alt={purpose} className="aspect-[1.91/1] w-full object-contain"
          onLoad={event => setDimensions({width:event.currentTarget.naturalWidth,height:event.currentTarget.naturalHeight})}
          onError={() => setFailed(true)} />
        : <div className="flex aspect-[1.91/1] items-center justify-center gap-2 text-sm text-stone-500">
          <ImageIcon className="h-5 w-5" />{failed ? "Preview image could not load" : "No image selected"}
        </div>}
    </div>
    {dimensions && <p className="text-xs text-stone-500">Image dimensions: {dimensions.width} × {dimensions.height}</p>}
    {tooSmall && <p className="text-xs text-amber-800">For social previews, approximately 1200 × 630 pixels is recommended.</p>}
    {!!src && !safe && <p className="text-xs text-amber-800">Use an HTTPS image URL or a valid relative URL.</p>}
  </div>;
}

/** The original blog table stores only the Featured Image URL, not a separate ALT column.
 * ALT is edited in the Media Library, which is the sole persisted source here.
 * Existing published image references are protected by the media update endpoint.
 */
function FeaturedMediaAltField({ url }: { url: string }) {
  const utils = trpc.useUtils();
  const trimmedUrl = url.trim();
  const lookup = trpc.media.findByUrl.useQuery({ url: trimmedUrl || "__no_image__" },
    { enabled: !!trimmedUrl, retry: false, refetchOnWindowFocus: false });
  const save = trpc.media.update.useMutation();
  const item = lookup.data;
  const [altText, setAltText] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    setAltText(item?.altText || "");
    setError("");
  }, [item?.id, item?.altText, trimmedUrl]);
  const saveAlt = async () => {
    if (!item || save.isPending) return;
    setError("");
    const next = altText.trim();
    if (next === (item.altText || "")) return;
    try {
      try {
        await save.mutateAsync({ id: item.id, altText: next });
      } catch (err) {
        if (!(err instanceof Error) || !err.message.includes("MULTIPLE_USE_CONFIRMATION_REQUIRED") ||
            !window.confirm("This image is used on several pages. Update ALT text in their saved drafts?")) throw err;
        await save.mutateAsync({ id: item.id, altText: next, confirmMultiple: true });
      }
      await Promise.all([utils.media.findByUrl.invalidate(), utils.media.list.invalidate()]);
      toast.success("Featured image ALT text saved to Media Library.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "ALT text could not be saved.");
    }
  };
  return <div className="space-y-2 rounded-lg border border-stone-200 bg-stone-50 p-3">
    <Label htmlFor="blog-featured-image-alt" className="text-sm font-medium">Featured Image ALT text</Label>
    {!trimmedUrl ? <p className="text-xs text-stone-600">Select or upload a Featured Image to edit its ALT text.</p>
      : lookup.isLoading ? <p className="text-xs text-stone-600">Loading image ALT text from Media Library…</p>
      : lookup.error ? <p role="alert" className="text-xs text-red-700">Unable to load Media Library ALT text: {lookup.error.message}</p>
      : !item ? <p className="text-xs text-amber-800">This URL is not registered in Media Library. Select or upload a Media Library image to save ALT text. External URLs cannot persist ALT text in the current blog table.</p>
      : <>
        <Input id="blog-featured-image-alt" value={altText} maxLength={500}
          placeholder="Describe what the featured image shows…"
          onChange={event => setAltText(event.target.value)} disabled={save.isPending} />
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" type="button" variant="outline" onClick={() => void saveAlt()}
            disabled={save.isPending || altText.trim() === (item.altText || "")}>
            {save.isPending ? "Saving ALT…" : "Save ALT to Media Library"}
          </Button>
          <span className="text-xs text-stone-500">{altText.length}/500 characters</span>
        </div>
        <p className="text-xs text-stone-600">Loaded from Media Library. ALT changes save independently of the article draft; only eligible drafts synchronize. Published articles are not automatically changed.</p>
        {error && <p role="alert" className="text-xs text-red-700">{error}</p>}
      </>}
  </div>;
}

export default function BlogSeoFeaturePanel({ panel, draft, onChange, onLocateReadability, onSchemaChange, onSchemaReset }: Props) {
  const [network, setNetwork] = useState<"og" | "x">("og");
  const [copied, setCopied] = useState(false);
  const document = useMemo(() => blogDraftToCmsSeoDocument(draft), [draft]);
  const schema = useMemo(() => getBlogSchemaDraftPreview(draft), [draft]);
  const social = blogSocialPreview(draft);
  const socialImage = draft.ogImage.trim() || draft.featuredImage.trim();

  if (panel === "readability") return <div className="space-y-4" aria-label="Blog readability analysis">
    <p className="rounded-lg border border-stone-200 bg-white p-3 text-sm text-stone-700">
      Analyzing the {draft.editorMode === "wysiwyg" ? "Rich Text Editor" : "StoryBrand Sections"} currently selected above.
      Checks update as you edit; any warnings below refer only to that active editor.
      Edit the highlighted text in the content editor above. Readability does not verify dental accuracy.
    </p>
    <ReadingPanel document={document} onLocate={onLocateReadability} />
  </div>;

  if (panel === "social") return <section className="space-y-5 rounded-xl border bg-white p-5">
    <div><h3 className="flex items-center gap-2 text-lg font-semibold text-stone-900"><Share2 className="h-5 w-5 text-teal-700" /> Social share appearance</h3>
      <p className="text-sm text-stone-600">This section edits the original Open Graph fields. It does not create another set of social metadata.</p></div>
    <div className="inline-flex flex-wrap gap-2 rounded-lg bg-stone-100 p-1" aria-label="Social preview network">
      {(["og","x"] as const).map(value=><button type="button" key={value} aria-pressed={network===value}
        onClick={()=>setNetwork(value)} className={`rounded-md px-3 py-2 text-sm font-medium ${network===value ? "bg-white text-teal-800 shadow-sm" : "text-stone-600"}`}>
        {value==="og"?"Facebook / LinkedIn":"X / Twitter"}
      </button>)}
    </div>
    <div className="grid items-start gap-5 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-1"><Label htmlFor="blog-social-og-title">OG Title (optional)</Label>
          <Input id="blog-social-og-title" value={draft.ogTitle} maxLength={200} onChange={e=>onChange("ogTitle",e.target.value)}
            placeholder="Uses SEO title when empty" />
          <p className="text-xs text-stone-500">{draft.ogTitle.length} characters</p>
        </div>
        <div className="space-y-1"><Label htmlFor="blog-social-og-description">OG Description (optional)</Label>
          <Textarea id="blog-social-og-description" value={draft.ogDescription} onChange={e=>onChange("ogDescription",e.target.value)}
            placeholder="Uses meta description when empty" rows={3} />
        </div>
        <div className="space-y-1"><Label htmlFor="blog-social-og-image">OG Image URL (optional)</Label>
          <Input id="blog-social-og-image" value={draft.ogImage} onChange={e=>onChange("ogImage",e.target.value)}
            placeholder="https://..." />
          <p className="text-xs text-stone-500">Takes priority over Featured Image for social shares. Does not change the article’s featured image.</p>
        </div>
        <CmsMediaPicker buttonText="Choose OG image from test Media Library" onSelect={image=>onChange("ogImage",image.url)} />
        <p className="text-xs text-stone-500">{inputHelp}</p>
        {network==="x" && <p className="rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
          X currently shares the existing Open Graph title, description and image. Separate X-only title and description fields are available in Advanced CMS, but not in the existing blog database; they will require an explicitly approved migration and publishing integration.
        </p>}
      </div>
      <div className="min-w-0 space-y-3">
        <SafeImagePreview src={socialImage} purpose="Illustrative social share image" />
        <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs uppercase tracking-wide text-stone-500">{network==="og"?"Facebook / LinkedIn preview":"X / Twitter preview"} · dentasmart.ai</p>
          <p className="mt-2 text-base font-semibold text-stone-900">{social.title || "Article social title"}</p>
          <p className="mt-1 text-sm text-stone-600">{social.description || "Add a meta description to preview the share card."}</p>
        </div>
        <p className="text-xs text-stone-500">Live appearance is illustrative; platforms determine the final card. Verify URL, image dimensions and public accessibility before publishing.</p>
      </div>
    </div>
  </section>;

  if (panel === "media") return <section className="space-y-5 rounded-xl border bg-white p-5">
    <div><h3 className="flex items-center gap-2 text-lg font-semibold text-stone-900"><ImageIcon className="h-5 w-5 text-teal-700" /> Featured image & media</h3>
      <p className="text-sm text-stone-600">The original Featured Image URL remains the only source for this article’s thumbnail. Social OG artwork is edited separately in Social.</p></div>
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-1"><Label htmlFor="blog-featured-image">Featured Image URL</Label>
          <Input id="blog-featured-image" value={draft.featuredImage} onChange={e=>onChange("featuredImage",e.target.value)} placeholder="https://..." />
        </div>
        <CmsMediaPicker buttonText="Choose featured image from test Media Library" editAltText
          onSelect={image=>onChange("featuredImage",image.url)} />
        <FeaturedMediaAltField url={draft.featuredImage} />
        <p className="text-xs text-stone-500">{inputHelp}</p>
        <div className="rounded-md border border-stone-200 bg-stone-50 p-3 text-xs text-stone-600">
          Featured Image is separate from OG Image and images embedded in the article body. Existing blog records are not replaced by opening this panel. For meaningful inline images, edit accurate alt text in the Rich Text Editor or media library.
        </div>
      </div>
      <SafeImagePreview src={draft.featuredImage} purpose="Article featured image preview" />
    </div>
  </section>;

  if (panel === "schema") {
    const manualMode = isManualBlogSchema(draft.reviewerJsonLd);
    const manualText = manualMode ? getManualBlogSchemaText(draft.reviewerJsonLd!) : "";
    const parsedManual = manualMode ? parseManualBlogSchema(manualText).schema : undefined;
    const manualNodes = parsedManual
      ? Array.isArray(parsedManual["@graph"])
        ? parsedManual["@graph"] as Record<string, unknown>[]
        : [parsedManual]
      : [];
    const reviewerExpected = Boolean(getPublicBlogReviewerMetadata(draft));
    const reviewDateExpected = Boolean(getPublicLastReviewed(draft));
    const missingManualReviewer = manualMode && reviewerExpected && !manualNodes.some(node => Boolean(node.reviewedBy));
    const missingManualReviewDate = manualMode && reviewDateExpected && !manualNodes.some(node => Boolean(node.lastReviewed));
    const articleNodes = schema.automaticSchemas
      .filter(node => node["@type"] !== "Organization" && node["@type"] !== "WebSite")
      .map(node => { const { "@context": _context, ...rest } = node; return rest; });
    const manualSeed = JSON.stringify({ "@context": "https://schema.org", "@graph": articleNodes }, null, 2);
    return <section className="space-y-4 rounded-xl border bg-white p-5" aria-label="Blog schema editor">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-stone-900"><Braces className="h-5 w-5 text-teal-700" /> Schema markup</h3>
          <p className="mt-1 text-sm text-stone-600">Automatically generated by default. SEO editors can override this blog's schema without changing website-wide Organization or WebSite markup.</p>
        </div>
        <span className="rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-900">{manualMode ? "Manual override" : "Automatic schema"}</span>
      </div>
      <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-stone-50 p-4">
        <div className="flex-1 text-sm text-stone-700">
          <p className="font-semibold">{manualMode ? "Your custom schema replaces this blog's automatic BlogPosting and reviewer WebPage nodes." : "BlogPosting and eligible reviewer markup update automatically."}</p>
          <p className="mt-1 text-xs">The JSON-LD preview updates immediately. Save Draft to store changes. Only published pages expose public schema.</p>
        </div>
        {manualMode ?
          <Button type="button" size="sm" variant="outline" disabled={!onSchemaReset} onClick={() => onSchemaReset?.()}>Restore automatic schema</Button> :
          <Button type="button" size="sm" variant="outline" disabled={!onSchemaChange} onClick={() => onSchemaChange?.(storeManualBlogSchema(manualSeed))}>Edit schema manually</Button>}
      </div>
      {manualMode && <div className="space-y-2">
        <Label htmlFor="blog-manual-jsonld">Manual JSON-LD for this article</Label>
        <Textarea id="blog-manual-jsonld" value={manualText} spellCheck={false}
          onChange={event => onSchemaChange?.(storeManualBlogSchema(event.target.value))}
          className="min-h-[260px] font-mono text-xs" aria-invalid={Boolean(schema.manualError)}
          placeholder='{"@context":"https://schema.org","@type":"Article","headline":"..."}'/>
        <p className="text-xs text-stone-600">Use one Schema.org object or an @graph. Manual markup overrides the blog-specific automatic nodes, including reviewer data. Keep dates and verified reviewer details accurate when editing manually.</p>
        {schema.manualError && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-800">Manual schema invalid: {schema.manualError}. The server will reject this on save.</p>}
        {(missingManualReviewer || missingManualReviewDate) && <p role="status" className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          Manual schema is missing {missingManualReviewer ? "eligible reviewer details" : ""}
          {missingManualReviewer && missingManualReviewDate ? " and " : ""}
          {missingManualReviewDate ? "the saved review date" : ""}.
          Manual mode replaces automatic blog markup. Add accurate reviewer information manually or restore automatic schema.
        </p>}
      </div>}
      {schema.issues.length > 0 && <div className="space-y-2">
        {schema.issues.map((issue,i)=><p key={i} className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />{issue}
        </p>)}
      </div>}
      {schema.issues.length===0 && <p className="flex items-center gap-2 text-sm text-emerald-700"><CheckCircle2 className="h-4 w-4"/> No basic schema warnings.</p>}
      <div className="rounded-lg border border-stone-200 p-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-semibold text-stone-900">Live JSON-LD preview {schema.manualError ? "(automatic fallback until valid manual markup is saved)" : ""}</p>
          <Button variant="outline" size="sm" type="button" onClick={() => {
            void navigator.clipboard.writeText(JSON.stringify(schema.schemas,null,2)).then(()=>setCopied(true)).catch(()=>setCopied(false));
          }}><Copy className="mr-1 h-4 w-4"/>{copied?"Copied":"Copy preview"}</Button>
        </div>
        <pre className="mt-3 max-h-[480px] overflow-auto rounded-lg bg-slate-900 p-4 text-xs leading-relaxed text-slate-100">{JSON.stringify(schema.schemas,null,2)}</pre>
      </div>
      <p className="rounded-lg bg-stone-50 p-3 text-xs text-stone-600">Draft preview only: never injected into an unpublished article. Existing supplemental JSON-LD remains active in automatic mode until explicitly overridden.</p>
    </section>;
  }

  return <section className="space-y-4 rounded-xl border bg-white p-5">
    <div><h3 className="flex items-center gap-2 text-lg font-semibold text-stone-900"><ShieldCheck className="h-5 w-5 text-teal-700" /> Advanced SEO & indexing</h3>
      <p className="text-sm text-stone-600">Current blog crawling and indexing settings are controlled by the existing public site and deployment pipeline.</p></div>
    <div className="space-y-3">
      {[
        ["Robots noindex / nofollow","Requires separate stored blog settings and explicit public HTML integration."],
        ["robots.txt Disallow","Requires a controlled robots.txt publishing workflow. Avoid combining Disallow with noindex without understanding crawler behavior."],
        ["301 redirects","A slug change does not automatically create a redirect; preserve established URLs."],
        ["Sitemaps and canonical URLs","The existing website owns sitemap generation and canonical rules. Canonical override stays under SEO metadata."],
      ].map(([name,detail])=><div key={name} className="rounded-lg border border-stone-200 p-4">
        <p className="font-medium text-stone-900">{name}</p><p className="mt-1 text-xs text-stone-600">{detail}</p>
      </div>)}
    </div>
    <p className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-900">
      <Info className="mt-0.5 h-4 w-4 shrink-0"/> These controls are informational here and do not change live website indexing. New stored settings need an approved isolated migration and separate production safety verification.
    </p>
  </section>;
}
