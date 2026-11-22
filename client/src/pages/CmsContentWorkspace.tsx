import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearch } from "wouter";
import {
  ArrowRight, ArrowUpRight, BookOpen, CheckCircle2, ChevronLeft, ChevronRight,
  FilePlus2, Files, Filter, LayoutGrid, LockKeyhole, PencilLine, Search, ShieldCheck,
  Sparkles, X, AlertTriangle, Trash2, EyeOff,
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { cmsAdminHubDefinitions, getCmsHub, isCmsAdminHub, type CmsHubId } from "@shared/cmsHubRegistry";
import CmsDeleteDraftDialog from "@/components/cms/CmsDeleteDraftDialog";
import { getCmsDraftDeletePolicy } from "@shared/cmsDraftDeletePolicy";
import { hasActiveCmsTestPublication } from "@shared/cmsPublicationUiPolicy";

const PER_PAGE = 20;
type StatusFilter = "all" | "ready" | "saved" | "migration";
function slugify(text: string) {
  return text.toLowerCase().trim().normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "").slice(0, 200);
}

export default function CmsContentWorkspace() {
  const [, setLocation] = useLocation();
  const query = useSearch();
  const requested = new URLSearchParams(query).get("hub");
  const hubId: CmsHubId | "all" = requested && isCmsAdminHub(requested) ? requested as CmsHubId : "all";
  const [status, setStatus] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [createHub, setCreateHub] = useState<CmsHubId>("conditions");
  const [newTitle, setNewTitle] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [problem, setProblem] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{
    hubId: CmsHubId; slug: string; title: string; revision: number;
    publishedRevision: number | null; origin: "source" | "draft"; editable: boolean;
  } | null>(null);
  const unpublish = trpc.cms.unpublishTestDraft.useMutation();
  const [actionError, setActionError] = useState("");
  const unpublishEntry = async (entry: {hubId: CmsHubId; slug: string; revision: number; title: string}) => {
    if (!window.confirm("Withdraw the TEST CMS publication for \"" + entry.title + "\"? The original source page will remain accessible. Continue?")) return;
    setActionError("");
    try {
      await unpublish.mutateAsync({ hubId: entry.hubId, slug: entry.slug, expectedRevision: entry.revision });
      await utils.cms.listContent.invalidate();
    } catch(error) { setActionError(error instanceof Error ? error.message : "Unable to unpublish."); }
  };
  const utils = trpc.useUtils();
  const all = trpc.cms.listContent.useQuery({}, { retry: false, refetchOnWindowFocus: false });
  const records = (all.data ?? []).filter(entry => isCmsAdminHub(entry.hubId));
  const selected = hubId === "all" ? undefined : getCmsHub(hubId);
  const activeHub = createHub;

  useEffect(() => {
    if (requested === "articles") setLocation("/admin");
  }, [requested, setLocation]);

  useEffect(() => {
    if (hubId !== "all") setCreateHub(hubId);
    setPage(1);
  }, [hubId]);

  const stats = useMemo(() => ({
    total: records.length,
    editable: records.filter(entry => entry.editable).length,
    saved: records.filter(entry => entry.revision > 0).length,
    pending: records.filter(entry => !entry.editable).length,
  }), [records]);
  const visible = useMemo(() => {
    const needle = search.trim().toLocaleLowerCase();
    return records.filter(entry => {
      if (hubId !== "all" && entry.hubId !== hubId) return false;
      if (status === "saved" && entry.revision === 0) return false;
      if (status === "ready" && !entry.editable) return false;
      if (status === "migration" && entry.editable) return false;
      return !needle || [entry.title, entry.slug, entry.hubLabel, entry.publicPath || ""]
        .some(value => value.toLocaleLowerCase().includes(needle));
    });
  }, [records, hubId, status, search]);
  const pages = Math.max(1, Math.ceil(visible.length / PER_PAGE));
  const displayed = visible.slice((Math.min(page, pages) - 1) * PER_PAGE, Math.min(page, pages) * PER_PAGE);
  const selectHub = (id: CmsHubId | "all") => {
    setPage(1);
    setStatus("all");
    setSearch("");
    if (id !== "all") setCreateHub(id);
    setLocation("/admin/content-workspace" + (id === "all" ? "" : "?hub=" + encodeURIComponent(id)));
  };
  const openEditor = (id: string, slug: string) =>
    setLocation("/admin/cms-preview?hub=" + encodeURIComponent(id) + "&slug=" + encodeURIComponent(slug));
  const startNew = () => {
    if (!isCmsAdminHub(activeHub)) { setProblem("Manage blog posts in the existing Blog Management editor."); return; }
    const slug = slugify(customSlug || newTitle);
    if (!newTitle.trim() || !slug) { setProblem("Enter a page title and a valid slug."); return; }
    if (records.some(item => item.hubId === activeHub && item.slug === slug)) {
      setProblem("This slug already exists in the chosen hub. Open its existing page instead."); return;
    }
    setProblem("");
    setLocation("/admin/cms-preview?hub=" + activeHub + "&slug=" + encodeURIComponent(slug)
      + "&title=" + encodeURIComponent(newTitle.trim()));
  };
  const buttonClass = "rounded-lg border px-3 py-2 text-sm font-medium transition-colors";
  return <AdminLayout activeId={hubId === "all" ? "cms-workspace" : "cms-hub-" + hubId}>
    <main className="mx-auto max-w-[1480px] space-y-5 px-4 py-6 lg:px-7">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.13em] text-teal-700">
            <LayoutGrid className="h-4 w-4" /> Content management
            <span className="rounded-full bg-teal-50 px-2 py-0.5 normal-case tracking-normal">Test workspace</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-stone-900 md:text-3xl">
            {selected ? selected.label : "All Content"}
          </h1>
          <p className="mt-1 text-sm text-stone-600">Manage drafts and source pages across DentaSmart's 14 non-blog content hubs.</p>
        </div>
        <Button type="button" onClick={() => { setShowNew(v => !v); setProblem(""); }}>
          {showNew ? <X className="mr-2 h-4 w-4" /> : <FilePlus2 className="mr-2 h-4 w-4" />}
          {showNew ? "Close" : "Create new draft"}
        </Button>
      </header>

      <section aria-label="CMS content summary" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Source & draft entries", value: stats.total, hint: "Across 14 hubs", icon: Files, filter: "all" as const },
          { label: "Editable sources & drafts", value: stats.editable, hint: "Open in the unified editor", icon: PencilLine, filter: "ready" as const },
          { label: "Saved private drafts", value: stats.saved, hint: "Revision history available", icon: CheckCircle2, filter: "saved" as const },
          { label: "Migration pending", value: stats.pending, hint: "Original pages stay read-only", icon: LockKeyhole, filter: "migration" as const },
        ].map(item => <button key={item.label} type="button"
          aria-pressed={hubId === "all" && status === item.filter}
          onClick={() => {
            setLocation("/admin/content-workspace");
            setStatus(item.filter);
            setSearch("");
            setPage(1);
          }}
          className={`w-full rounded-xl border bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600 ${hubId === "all" && status === item.filter ? "border-teal-400 ring-1 ring-teal-200" : "border-stone-200"}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-600">{item.label}</span>
            <item.icon className="h-4 w-4 text-teal-700" />
          </div>
          <div className="mt-2 text-2xl font-semibold tabular-nums text-stone-900">{all.isLoading ? "—" : item.value}</div>
          <div className="mt-1 flex items-center justify-between gap-1">
            <span className="text-xs text-stone-500">{item.hint}</span>
            <ArrowRight className="h-4 w-4 shrink-0 text-teal-700" aria-hidden="true" />
          </div>
        </button>)}
      </section>

      <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
        <p><strong>Safe testing mode:</strong> all new content is a private draft. Only source-backed Conditions, Symptoms and Guides can be imported for editing. Unsupported public pages are read-only. Only Toothache can publish to the isolated test website.</p>
      </div>

      {showNew && <section className="rounded-xl border border-teal-200 bg-white p-5 shadow-sm" aria-label="Create new CMS draft">
        <div className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-teal-700" />
          <h2 className="text-lg font-semibold text-stone-900">Create a private draft</h2></div>
        <p className="mt-1 text-xs text-stone-600">Choose a hub and name your page. Nothing goes live until a supported publishing workflow is explicitly enabled and approved.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="space-y-1"><Label htmlFor="cms-new-hub">Content hub</Label>
            <select id="cms-new-hub" className="h-10 w-full rounded-md border border-stone-200 bg-white px-3 text-sm"
              value={activeHub} onChange={event => setCreateHub(event.target.value as CmsHubId)}>
              {cmsAdminHubDefinitions.map(hub => <option key={hub.id} value={hub.id}>{hub.label}</option>)}
            </select></div>
          <div className="space-y-1"><Label htmlFor="cms-new-title">Page title</Label>
            <Input id="cms-new-title" maxLength={200} value={newTitle} onChange={event => setNewTitle(event.target.value)} placeholder="e.g. Caring for your gums" /></div>
          <div className="space-y-1"><Label htmlFor="cms-new-slug">Slug (optional)</Label>
            <Input id="cms-new-slug" maxLength={200} value={customSlug} onChange={event => setCustomSlug(event.target.value)}
              placeholder={slugify(newTitle) || "your-page-slug"} /></div>
        </div>
        {problem && <p className="mt-3 flex items-center gap-2 text-sm text-red-700"><AlertTriangle className="h-4 w-4" />{problem}</p>}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button type="button" onClick={startNew} disabled={!newTitle.trim() || all.isLoading}>
            Continue to editor <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <span className="text-xs text-stone-500">Draft URL stays private; no sitemap or live page created.</span>
        </div>
      </section>}

      <section className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-end gap-3 border-b border-stone-200 p-4">
          <div className="min-w-[185px] flex-1 space-y-1">
            <Label htmlFor="cms-hub-filter" className="text-xs text-stone-600">Content hub</Label>
            <select id="cms-hub-filter" className="h-10 w-full rounded-md border border-stone-200 bg-white px-3 text-sm"
              value={hubId} onChange={event => selectHub(event.target.value as CmsHubId | "all")}>
              <option value="all">All 14 content hubs</option>
              {cmsAdminHubDefinitions.map(hub => <option value={hub.id} key={hub.id}>{hub.label}</option>)}
            </select>
          </div>
          <div className="min-w-[175px] flex-1 space-y-1">
            <Label htmlFor="cms-status-filter" className="text-xs text-stone-600">Status</Label>
            <div className="relative"><Filter className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-stone-500" />
              <select id="cms-status-filter" className="h-10 w-full rounded-md border border-stone-200 bg-white pl-9 pr-2 text-sm"
                value={status} onChange={event => { setStatus(event.target.value as StatusFilter); setPage(1); }}>
                <option value="all">All statuses</option><option value="ready">Editable</option>
                <option value="saved">Saved drafts</option><option value="migration">Migration pending</option>
              </select></div>
          </div>
          <div className="min-w-[230px] flex-[2] space-y-1">
            <Label htmlFor="cms-content-search" className="text-xs text-stone-600">Search content</Label>
            <div className="relative"><Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-stone-500"/>
              <Input id="cms-content-search" className="pl-9" value={search} placeholder="Search pages, slugs or URLs…"
                onChange={event => { setSearch(event.target.value); setPage(1); }}/></div>
          </div>
          {(search || status !== "all") && <Button variant="outline" type="button" onClick={() => { setSearch(""); setStatus("all"); setPage(1); }}>
            <X className="mr-1 h-4 w-4" /> Clear
          </Button>}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b bg-stone-50 px-4 py-2 text-xs text-stone-600">
          <span className="font-medium">{visible.length} matching page{visible.length === 1 ? "" : "s"}</span>
          <span>Showing {visible.length ? (Math.min(page, pages) - 1) * PER_PAGE + 1 : 0}–{Math.min(Math.min(page, pages) * PER_PAGE, visible.length)}</span>
        </div>
        {actionError && <p role="alert" className="border-b bg-red-50 p-3 text-sm text-red-800">{actionError}</p>}
        {all.isLoading && <div className="p-8 text-center text-sm text-stone-600">Loading content inventory…</div>}
        {all.error && <div className="p-6 text-sm text-red-700" role="alert">Unable to load isolated CMS database: {all.error.message}</div>}
        {!all.isLoading && !all.error && displayed.length === 0 && <div className="p-8 text-center">
          <BookOpen className="mx-auto h-7 w-7 text-stone-400"/><p className="mt-2 font-medium text-stone-800">No matching pages</p>
          <p className="mt-1 text-sm text-stone-500">Try another hub or search term, or create a private draft.</p>
        </div>}
        <div className="divide-y divide-stone-100">
          {displayed.map(entry => <div key={entry.hubId + "/" + entry.slug}
            className="group flex flex-wrap items-center gap-4 px-4 py-3.5 transition-colors hover:bg-stone-50">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="break-words text-sm font-semibold text-stone-900">{entry.title}</span>
                {entry.revision > 0 && <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[11px] font-medium text-teal-800">Draft rev. {entry.revision}</span>}
                {hasActiveCmsTestPublication(entry) && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-900">TEST published · rev. {entry.publishedRevision}</span>}
              </div>
              <p className="mt-1 break-all text-xs text-stone-500">{hubId === "all" ? entry.hubLabel + " · " : ""}{entry.publicPath || "Private draft only"} · {entry.slug}</p>
              <div className="mt-2 flex items-center gap-2">
                {entry.editable ? <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                  <CheckCircle2 className="h-3.5 w-3.5"/>{entry.revision > 0 ? "Saved private draft" : entry.origin === "draft" ? "Private draft" : "Source import available"}
                </span> : <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-800">
                  <LockKeyhole className="h-3.5 w-3.5"/> Read-only until migrated
                </span>}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {entry.publicPath && <a href={entry.publicPath} target="_blank" rel="noopener noreferrer"
                title="View existing source page" aria-label={"View " + entry.title}
                className={buttonClass + " text-stone-600 hover:border-teal-300 hover:text-teal-800"}>
                <ArrowUpRight className="h-4 w-4"/></a>}
              {entry.revision > 0 && <a
                href={"/admin/cms-draft-preview?hub=" + encodeURIComponent(entry.hubId) + "&slug=" + encodeURIComponent(entry.slug)}
                target="_blank" rel="noopener noreferrer"
                className={buttonClass + " text-teal-800 hover:border-teal-300"}
                title="Admin-only preview of the saved private draft; does not publish.">Preview Draft</a>}
              <Button type="button" size="sm" variant="outline"
                disabled={!getCmsDraftDeletePolicy(entry).allowed}
                title={getCmsDraftDeletePolicy(entry).explanation}
                className="border-red-200 text-red-700 enabled:hover:border-red-400 enabled:hover:bg-red-50"
                onClick={() => setDeleteTarget(entry)}>
                <Trash2 className="mr-1.5 h-4 w-4"/>{entry.origin === "source" ? "Discard draft" : "Delete"}
              </Button>
              {hasActiveCmsTestPublication(entry) && <Button type="button" size="sm" variant="outline"
                disabled={unpublish.isPending}
                title="Withdraw only the isolated Toothache TEST publication (source page remains)."
                onClick={() => void unpublishEntry(entry)}>
                <EyeOff className="mr-1.5 h-4 w-4"/>Unpublish TEST
              </Button>}
              {entry.editable ? <Button type="button" size="sm" variant="outline" onClick={() => openEditor(entry.hubId, entry.slug)}>
                <PencilLine className="mr-2 h-4 w-4"/> Edit draft
              </Button> : <span className="rounded-md bg-stone-100 px-3 py-2 text-xs text-stone-600">View only</span>}
            </div>
          </div>)}
        </div>
        {pages > 1 && !all.isLoading && <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-stone-50 px-4 py-3">
          <span className="text-xs text-stone-600">Page {Math.min(page, pages)} of {pages}</span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" disabled={page <= 1}
              onClick={() => setPage(p => Math.max(1,p-1))}><ChevronLeft className="mr-1 h-4 w-4"/> Previous</Button>
            <Button size="sm" variant="outline" disabled={page >= pages}
              onClick={() => setPage(p => Math.min(pages,p+1))}>Next <ChevronRight className="ml-1 h-4 w-4"/></Button>
          </div>
        </div>}
      </section>
      <p className="flex items-start gap-2 px-1 text-xs text-stone-500">
        <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0"/> Existing public routes remain source-controlled. Private drafts do not automatically publish, create redirects or change the production website.
      </p>
      {deleteTarget && <CmsDeleteDraftDialog key={deleteTarget.hubId + "/" + deleteTarget.slug}
        open={true} onOpenChange={open => {if (!open) setDeleteTarget(null);}}
        hubId={deleteTarget.hubId} slug={deleteTarget.slug} title={deleteTarget.title}
        candidate={deleteTarget} onDeleted={() => {
          setDeleteTarget(null);
          void utils.cms.listContent.invalidate();
        }}/>}

    </main>
  </AdminLayout>;
}
