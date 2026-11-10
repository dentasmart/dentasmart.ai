import { useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, ArrowLeft, ChevronDown, Clock3, ExternalLink, Eye, FileStack, History, Image as ImageIcon, LockKeyhole, RotateCcw, Save, Send, ShieldCheck, Tags, Trash2, EyeOff } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import CmsBlockEditor, { CmsImageSlotsEditor } from "@/components/cms/CmsBlockEditor";
import CmsSeoPanels from "@/components/cms/CmsSeoPanels";
import CmsOrganizationReviewPanel from "@/components/cms/CmsOrganizationReviewPanel";
import { cmsDocumentSchema, type CmsDocument } from "@shared/cmsBlocks";
import { cmsAdminHubDefinitions, createCmsBlankDocument, getCmsHub, isCmsAdminHub, type CmsHubId } from "@shared/cmsHubRegistry";
import { getCmsStructuredSource } from "@shared/cmsSourceImports";
import CmsDeleteDraftDialog from "@/components/cms/CmsDeleteDraftDialog";
import { getCmsDraftDeletePolicy } from "@shared/cmsDraftDeletePolicy";
import { hasActiveCmsTestPublication } from "@shared/cmsPublicationUiPolicy";
import { isOnlyCmsAltChange } from "@shared/mediaAltSync";
import {
  cmsEditorSessionKey, parseCmsEditorMainTab, parseCmsEditorSeoTab,
  type CmsEditorMainTab, type CmsEditorSeoTab,
} from "@shared/cmsEditorTabState";

function getInitial() {
  const params = typeof window === "undefined" ? new URLSearchParams() : new URLSearchParams(window.location.search);
  const requested = params.get("hub");
  const hubId: CmsHubId = requested && getCmsHub(requested) ? requested as CmsHubId : "conditions";
  const slug = params.get("slug") || "toothache";
  return { hubId, slug, title: params.get("title") || "" };
}

/**
 * Unified CMS editor. Imports structured source-backed Conditions, Symptoms and
 * Guides. All other hubs use isolated private drafts, NOT public-route edits.
 * Only the existing Toothache test-publish API is enabled.
 */
export default function AdminCmsPreview() {
  const [initial] = useState(getInitial);
  const [hubId] = useState<CmsHubId>(initial.hubId);
  const [slug] = useState(initial.slug);
  const [, setLocation] = useLocation();
  const [document, setDocument] = useState<CmsDocument>(() =>
    getCmsStructuredSource(initial.hubId, initial.slug) ||
    createCmsBlankDocument(initial.hubId, initial.slug, initial.title || initial.slug.replace(/-/g, " ")));
  // The only persisted state is the selected tab, scoped to this hub and slug.
  // Article text and reviewer information are never written to browser storage.
  const [restoredTabs] = useState(() => {
    let storedMain: string | null = null;
    let storedSeo: string | null = null;
    try {
      storedMain = window.sessionStorage.getItem(cmsEditorSessionKey(hubId, slug, "main"));
      storedSeo = window.sessionStorage.getItem(cmsEditorSessionKey(hubId, slug, "seo"));
    } catch { /* Private browsing or blocked storage: use safe defaults. */ }
    const main = parseCmsEditorMainTab(storedMain);
    return {
      main,
      seo: parseCmsEditorSeoTab(storedSeo),
      shouldRestore: storedMain === main,
    };
  });
  const [tab, setTab] = useState<CmsEditorMainTab>(restoredTabs.main);
  const [seoTab, setSeoTab] = useState<CmsEditorSeoTab>(restoredTabs.seo);
  const pendingTabScroll = useRef(restoredTabs.shouldRestore);
  const [focusReview, setFocusReview] = useState<{ blockId: string; excerpt: string; requestId: number } | null>(null);
  const [dirty, setDirty] = useState(false);
  const [revision, setRevision] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const utils = trpc.useUtils();
  const selection = { hubId, slug };
  const savedDraft = trpc.cms.getDraft.useQuery(selection, { retry: false, refetchOnWindowFocus: false });
  const history = trpc.cms.listRevisions.useQuery(selection, { enabled: showHistory, retry: false });
  const hubInventory = trpc.cms.listContent.useQuery({ hubId }, { retry: false, refetchOnWindowFocus: false });
  const allInventory = trpc.cms.listContent.useQuery({}, { retry: false, refetchOnWindowFocus: false });
  const saveDraft = trpc.cms.saveDraft.useMutation();
  const restoreDraft = trpc.cms.restoreRevision.useMutation();
  const publishDraft = trpc.cms.publishTestDraft.useMutation();
  const unpublishDraft = trpc.cms.unpublishTestDraft.useMutation();
  const publishedStatus = trpc.cms.getPublicationStatus.useQuery(selection, { retry: false, refetchOnWindowFocus: false });

  useEffect(() => {
    if (!savedDraft.data || dirty || savedDraft.data.document.slug !== slug) return;
    const candidate = savedDraft.data.source === "new_draft" && initial.title
      ? createCmsBlankDocument(hubId, slug, initial.title)
      : savedDraft.data.document;
    setDocument(candidate);
    setRevision(savedDraft.data.revision);
  }, [savedDraft.data, dirty, slug, initial.title, hubId]);

  const changeMainTab = (value: string) => {
    const next = parseCmsEditorMainTab(value);
    if (next !== value) return;
    pendingTabScroll.current = false;
    setTab(next);
    try { window.sessionStorage.setItem(cmsEditorSessionKey(hubId, slug, "main"), next); }
    catch { /* Session storage is optional; navigation still works. */ }
  };
  const changeSeoTab = (next: CmsEditorSeoTab) => {
    pendingTabScroll.current = false;
    setSeoTab(next);
    try { window.sessionStorage.setItem(cmsEditorSessionKey(hubId, slug, "seo"), next); }
    catch { /* Session storage is optional; navigation still works. */ }
  };

  // Restore the actual editor workspace after saved-draft hydration, not the
  // temporary loader/top of page. SEO's nested tab is mounted before scrolling.
  useEffect(() => {
    if (!pendingTabScroll.current || savedDraft.isLoading || savedDraft.isFetching) return;
    let nextFrame: number | null = null;
    const frame = window.requestAnimationFrame(() => {
      nextFrame = window.requestAnimationFrame(() => {
        const id = tab === "seo" ? "cms-advanced-seo-tabs" : "cms-advanced-main-tabs";
        const navigation = window.document.getElementById(id);
        if (!navigation) return;
        navigation.scrollIntoView({ behavior: "auto", block: "start" });
        pendingTabScroll.current = false;
      });
    });
    return () => {
      window.cancelAnimationFrame(frame);
      if (nextFrame !== null) window.cancelAnimationFrame(nextFrame);
    };
  }, [savedDraft.isLoading, savedDraft.isFetching, tab, seoTab]);

  const update = (next: CmsDocument) => {
    // Alt text persists directly to Media Library on field blur. It must not
    // make the CMS draft dirty or force an unrelated Save Private Draft.
    if (!isOnlyCmsAltChange(document, next)) setDirty(true);
    setDocument(next);
    setFeedback(null);
    setFocusReview(null);
  };
  const validation = cmsDocumentSchema.safeParse(document);
  const sourceEntry = hubInventory.data?.find(entry => entry.slug === slug && entry.hubId === hubId);
  const deletionCandidate = {
    editable: sourceEntry?.editable ?? true,
    revision,
    publishedRevision: sourceEntry?.publishedRevision ?? publishedStatus.data?.publishedRevision ?? null,
    origin: sourceEntry?.origin ??
      (getCmsStructuredSource(hubId, slug) ? "source" as const : "draft" as const),
  };
  const deletePolicy = getCmsDraftDeletePolicy(deletionCandidate);
  const testPublishAllowed = hubId === "conditions" && slug === "toothache" && publishedStatus.data?.permitted === true;
  const activeTestPublication = testPublishAllowed && hasActiveCmsTestPublication({ hubId, slug, publishedRevision: publishedStatus.data?.publishedRevision });
  const canEdit = !savedDraft.isLoading && !savedDraft.error && validation.success;
  const hub = getCmsHub(hubId)!;
  const candidateLinks = useMemo(() => (allInventory.data || [])
    .filter(item => !!item.publicPath && !(item.hubId === hubId && item.slug === slug))
    .map(item => ({ slug: item.slug, title: item.title, path: item.publicPath || undefined })),
    [allInventory.data, hubId, slug]);

  const handleSave = async () => {
    if (!validation.success) { setFeedback("Fix the invalid draft fields before saving."); return; }
    if (!canEdit) { setFeedback("Draft storage is not ready."); return; }
    try {
      const payload = { ...validation.data, hubId };
      const result = await saveDraft.mutateAsync({ document: payload, expectedRevision: revision });
      setRevision(result.revision);
      setDocument(result.document);
      utils.cms.getDraft.setData(selection, { document: result.document, revision: result.revision, source: "saved_draft" });
      setDirty(false);
      setFeedback("Private draft saved as revision " + result.revision + ". No public page was updated.");
      await Promise.all([history.refetch(), hubInventory.refetch()]);
    } catch (error) { setFeedback(error instanceof Error ? error.message : "Unable to save draft."); }
  };
  const handlePublish = async () => {
    if (!testPublishAllowed || !validation.success) { setFeedback("Only the Toothache pilot can publish to the isolated test website."); return; }
    if (!window.confirm("Publish Toothache to the ISOLATED TEST WEBSITE? This will not affect dentasmart.ai. The page remains noindex and marked TEST.")) return;
    try {
      let toPublish = revision;
      if (dirty) {
        const payload = { ...validation.data, hubId };
        const saved = await saveDraft.mutateAsync({ document: payload, expectedRevision: revision });
        toPublish = saved.revision;
        setDocument(saved.document);
        setRevision(toPublish);
        setDirty(false);
      }
      if (toPublish < 1) { setFeedback("Save the initial draft before publishing."); return; }
      const published = await publishDraft.mutateAsync({ slug, expectedRevision: toPublish });
      setRevision(published.publishedRevision);
      utils.cms.getDraft.setData(selection, { document: { ...validation.data, hubId },
        revision: published.publishedRevision, source: "saved_draft" });
      setFeedback("Test-published revision " + published.publishedRevision + ". The production site is unchanged.");
      await Promise.all([savedDraft.refetch(), history.refetch(), publishedStatus.refetch(), hubInventory.refetch()]);
    } catch (error) { setFeedback(error instanceof Error ? error.message : "Unable to publish test page."); }
  };
  const handleUnpublish = async () => {
    if (!testPublishAllowed || publishedStatus.data?.publishedRevision == null || dirty) return;
    if (!window.confirm("Withdraw the saved Toothache TEST publication? The original source page remains available; no production changes. Continue?")) return;
    try {
      await unpublishDraft.mutateAsync({ hubId, slug, expectedRevision: revision });
      setFeedback("Test CMS overlay unpublished. The original Toothache source page is still available and remains in the source sitemap.");
      await Promise.all([publishedStatus.refetch(), hubInventory.refetch(), allInventory.refetch()]);
    } catch(error) { setFeedback(error instanceof Error ? error.message : "Unable to withdraw test publication."); }
  };
  const handleRestore = async (restoreRevision: number) => {
    if (dirty || !window.confirm("Restore revision " + restoreRevision + " as a new private draft?")) return;
    try {
      const result = await restoreDraft.mutateAsync({ hubId, slug, restoreRevision, expectedRevision: revision });
      setDocument(result.document);
      setRevision(result.revision);
      utils.cms.getDraft.setData(selection, { document: result.document, revision: result.revision, source: "saved_draft" });
      setDirty(false);
      setFeedback("Revision restored into new private draft " + result.revision + ".");
      await Promise.all([history.refetch(), hubInventory.refetch()]);
    } catch (error) { setFeedback(error instanceof Error ? error.message : "Unable to restore revision."); }
  };
  const goTo = (nextHub: string, nextSlug: string) => {
    if (dirty && !window.confirm("Discard unsaved edits and open another page?")) return;
    window.location.assign("/admin/cms-preview?hub=" + encodeURIComponent(nextHub) + "&slug=" + encodeURIComponent(nextSlug));
  };

  if (!isCmsAdminHub(hubId)) return <AdminLayout activeId="articles">
    <main className="mx-auto max-w-3xl space-y-3 p-6">
      <h1 className="text-2xl font-semibold">Blogs use Blog Management</h1>
      <p>Blogs and their categories are managed in the original Blog Editor, not in Advanced CMS.</p>
      <Button type="button" onClick={() => setLocation("/admin")}>Open Blog Management</Button>
    </main>
  </AdminLayout>;

  return <AdminLayout activeId="cms-preview">
    <div className="mx-auto max-w-7xl space-y-5 p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="flex items-center gap-2 text-2xl font-semibold text-stone-900"><FileStack className="h-6 w-6 text-teal-700"/> Advanced CMS — Unified Editor</h1>
          <p className="text-sm text-stone-600">Edit, optimize and save content drafts in a single workspace. Live publishing stays disabled.</p>
        </div>
        <Button variant="outline" onClick={() => {
          if (dirty && !window.confirm("Leave and discard unsaved changes?")) return;
          setLocation("/admin/content-workspace?hub=" + hubId);
        }}><ArrowLeft className="mr-2 h-4 w-4"/> All Content</Button>
      </div>
      <div className="flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
        <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0" />
        <div><strong>Private editing in isolated test environment.</strong> New content is not added to public routes, sitemaps or search results. Only an existing Toothache draft can publish to the isolated test page after existing medical safeguards.</div>
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-5">
          <section className="rounded-xl border bg-white p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <Label htmlFor="cms-current-hub">Content hub</Label>
                <select id="cms-current-hub" className="w-full rounded-md border px-3 py-2 text-sm" value={hubId}
                  onChange={event => {
                    const candidate = hubInventory.data?.find(item => item.editable && item.hubId === event.target.value);
                    if (candidate) goTo(event.target.value, candidate.slug);
                    else if (!dirty || window.confirm("Leave and discard unsaved edits?"))
                      setLocation("/admin/content-workspace?hub=" + event.target.value);
                  }}>
                  {cmsAdminHubDefinitions.map(entry => <option key={entry.id} value={entry.id}>{entry.label}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="cms-current-page">Existing page or private draft</Label>
                <select id="cms-current-page" className="w-full rounded-md border px-3 py-2 text-sm" value={slug}
                  onChange={event => goTo(hubId, event.target.value)}>
                  {hubInventory.data?.filter(item => item.editable).map(item =>
                    <option key={item.slug} value={item.slug}>{item.title}</option>)}
                  {!hubInventory.data?.some(item => item.slug === slug && item.editable) &&
                    <option value={slug}>{document.title} (unsaved template)</option>}
                </select>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
              <span>Hub: {hub.label} · Slug: {slug} · {revision ? "Saved private draft" : savedDraft.data?.source === "original_code" ? "Source-backed import" : "Unsaved new template"}</span>
              <Button variant="outline" size="sm" onClick={() => {
                if (dirty && !window.confirm("Leave and discard unsaved changes?")) return;
                setLocation("/admin/content-workspace?hub=" + hubId);
              }}>Browse / New Page</Button>
            </div>
          </section>

          <section className="space-y-3 rounded-xl border bg-white p-4">
            <Label htmlFor="cms-document-title">Page title (visible H1)</Label>
            <Input id="cms-document-title" value={document.title} maxLength={500} onChange={event => {
              const title = event.target.value;
              update({ ...document, title, blocks: document.blocks.map(block =>
                block.type === "hero" ? {...block, heading:title} : block) });
            }}/>
            <p className="text-xs text-stone-500">Edit your public-facing headline independently from the SEO title. Changing this does not rename an existing public URL.</p>
            <p className={`text-xs ${validation.success ? "text-teal-700" : "text-red-700"}`}>
              {validation.success ? "Draft structure valid" : "Draft validation failed: " + validation.error.issues[0]?.message}</p>
          </section>

          <Tabs value={tab} onValueChange={changeMainTab} className="space-y-3">
            <TabsList id="cms-advanced-main-tabs" className="flex h-auto flex-wrap gap-2 bg-transparent p-0 scroll-mt-24">
              <TabsTrigger value="sections" className="border bg-white"><FileStack className="mr-2 h-4 w-4"/> Content & Sections</TabsTrigger>
              <TabsTrigger value="images" className="border bg-white"><ImageIcon className="mr-2 h-4 w-4"/> Media</TabsTrigger>
              <TabsTrigger value="seo" className="border bg-white"><ShieldCheck className="mr-2 h-4 w-4"/> SEO Workspace</TabsTrigger>
              <TabsTrigger value="organization" className="border bg-white"><Tags className="mr-2 h-4 w-4"/> Organization & Review</TabsTrigger>
            </TabsList>
            <TabsContent value="sections"><CmsBlockEditor document={document} onChange={update} focusReview={focusReview}/></TabsContent>
            <TabsContent value="images"><section className="rounded-xl border bg-white p-4"><CmsImageSlotsEditor value={document.images}
              onChange={images => update({...document,images})}/></section></TabsContent>
            <TabsContent value="seo"><CmsSeoPanels document={document} onChange={update} candidates={candidateLinks}
              activeTab={seoTab} onActiveTabChange={changeSeoTab} tabListId="cms-advanced-seo-tabs"
              onLocate={example => {
                setFocusReview(previous => ({
                  blockId: example.blockId, excerpt: example.excerpt,
                  requestId: (previous?.requestId ?? 0) + 1,
                }));
                changeMainTab("sections");
              }}/></TabsContent>
            <TabsContent value="organization">
              <CmsOrganizationReviewPanel document={document} onChange={update} />
            </TabsContent>
          </Tabs>
        </div>

        <aside className="min-w-0 space-y-4 xl:sticky xl:top-20">
          <section className="space-y-3 rounded-xl border bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2"><h2 className="!text-base font-semibold text-stone-900">Draft & publishing</h2>
              <LockKeyhole className="h-4 w-4 text-teal-700"/></div>
            <div className="space-y-1 text-xs text-stone-600">
              <p><strong>Status:</strong> {dirty ? "Unsaved changes" : revision ? "Private draft saved" : "Not yet saved"}</p>
              <p><strong>Revision:</strong> {revision}</p>
              <p><strong>Public availability:</strong> {testPublishAllowed ? "Toothache TEST site only" : "Private draft only"}</p>
              {activeTestPublication &&
                <p className="text-teal-800"><strong>TEST published:</strong> revision {publishedStatus.data?.publishedRevision}</p>}
            </div>
            {savedDraft.isLoading && <p className="text-xs text-stone-500">Loading draft from isolated database…</p>}
            {savedDraft.error && <p className="text-xs text-red-700">Draft storage unavailable: {savedDraft.error.message}</p>}
            {feedback && <p className="rounded-md bg-stone-50 p-2 text-xs text-stone-700" role="status">{feedback}</p>}
            <Button className="w-full" onClick={handleSave}
              disabled={!dirty || !canEdit || saveDraft.isPending || publishDraft.isPending}>
              <Save className="mr-2 h-4 w-4"/>{saveDraft.isPending ? "Saving…" : "Save Private Draft"}
            </Button>
            <a href={"/admin/cms-draft-preview?hub=" + encodeURIComponent(hubId) + "&slug=" + encodeURIComponent(slug)}
              target="_blank" rel="noopener noreferrer"
              title="Admin-only preview of the saved draft; this does not publish the page."
              aria-disabled={revision < 1 || dirty}
              onClick={event => {if (revision < 1 || dirty) event.preventDefault();}}
              className={`flex w-full items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold transition-colors ${revision > 0 && !dirty
                ? "border-teal-400 bg-teal-50 text-teal-800 hover:bg-teal-100"
                : "pointer-events-none cursor-not-allowed border-stone-200 bg-stone-50 text-stone-400"}`}>
              <Eye className="h-4 w-4"/> Preview Draft <ExternalLink className="h-3.5 w-3.5"/>
            </a>
            {(dirty || !revision) && <p className="text-xs text-stone-500">Save your changes before opening the private preview.</p>}
            <Button className="w-full border-red-200 text-red-700 enabled:hover:border-red-400 enabled:hover:bg-red-50"
              variant="outline" disabled={!deletePolicy.allowed || dirty || saveDraft.isPending || publishDraft.isPending}
              title={deletePolicy.explanation} onClick={() => setShowDelete(true)}>
              <Trash2 className="mr-2 h-4 w-4"/>{deletePolicy.label}
            </Button>
            {activeTestPublication && <Button className="w-full" variant="outline"
              disabled={dirty || unpublishDraft.isPending}
              title="Withdraw only the isolated Toothache TEST publication; the source page stays available."
              onClick={() => void handleUnpublish()}>
              <EyeOff className="mr-2 h-4 w-4"/> {unpublishDraft.isPending ? "Unpublishing…" : "Unpublish TEST Site"}
            </Button>}
            <Button className="w-full" variant="outline" onClick={() => setShowHistory(v => !v)}>
              <History className="mr-2 h-4 w-4"/>{showHistory ? "Hide Revisions" : "Revision History"}
            </Button>
            {testPublishAllowed ? <>
              <Button className="w-full" variant="default" onClick={handlePublish}
                disabled={!canEdit || publishDraft.isPending || saveDraft.isPending}>
                <Send className="mr-2 h-4 w-4"/>{publishDraft.isPending ? "Publishing…" : activeTestPublication ? "Update TEST Publication" : "Publish to TEST Site"}
              </Button>
              {activeTestPublication && <a className="flex items-center justify-center gap-2 rounded-md border p-2 text-sm text-teal-700" href="/conditions/toothache/" target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4"/> Open Test Publication</a>}
            </> : <div className="flex gap-2 rounded-md bg-amber-50 p-3 text-xs text-amber-900">
              <LockKeyhole className="h-4 w-4 shrink-0"/><p>Live publishing is not available for this page. Save and preview privately; only Toothache supports isolated TEST publishing.</p>
            </div>}
          </section>
          {showHistory && <section className="space-y-2 rounded-xl border bg-white p-3">
            <h3 className="text-sm font-semibold">Revision history</h3>
            {history.isLoading && <p className="text-xs text-stone-500">Loading…</p>}
            {!revision && <p className="text-xs text-stone-500">No saved revisions yet.</p>}
            {history.data?.revisions.map(item => <div key={item.revision} className="rounded-md border p-2 text-xs">
              <div className="flex items-center gap-1"><Clock3 className="h-3 w-3"/><strong>Revision {item.revision}</strong></div>
              <div className="my-1 text-stone-600">{item.action.replace(/_/g," ")} · {new Date(item.createdAt).toLocaleString()}</div>
              <Button variant="outline" size="sm" className="w-full" disabled={dirty || restoreDraft.isPending}
                onClick={() => handleRestore(item.revision)}><RotateCcw className="mr-1 h-3 w-3"/> Restore</Button>
            </div>)}
          </section>}
          <section className="rounded-xl border border-stone-200 bg-stone-50 p-3 text-xs text-stone-600">
            <h3 className="mb-1 !text-sm font-semibold text-stone-800">Content safety</h3>
            Draft editing does not rewrite source-controlled pages. Test publication remains restricted to Toothache with a visible warning and noindex.
          </section>
        </aside>
      </div>
      <CmsDeleteDraftDialog open={showDelete} onOpenChange={setShowDelete}
        hubId={hubId} slug={slug} title={document.title} candidate={deletionCandidate}
        onDeleted={() => {
          void utils.cms.getDraft.invalidate(selection);
          void utils.cms.listContent.invalidate();
          setShowDelete(false);
          setLocation("/admin/content-workspace?hub=" + encodeURIComponent(hubId));
        }}/>
    </div>
  </AdminLayout>;
}
