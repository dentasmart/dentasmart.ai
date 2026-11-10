/**
 * Admin-only saved-revision preview. No new public routes, sitemap entries,
 * CMS publication or clinical approval. Preview data comes exclusively from
 * adminProcedure-protected cms.getDraft.
 */
import { ArrowLeft, Edit3, Eye, LockKeyhole, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import CmsPublishedCondition from "@/components/cms/CmsPublishedCondition";
import AdminLayout from "@/components/AdminLayout";
import { getCmsHub, isCmsAdminHub, type CmsHubId } from "@shared/cmsHubRegistry";

export default function AdminCmsDraftPreview() {
  const query = new URLSearchParams(typeof window === "undefined" ? "" : window.location.search);
  const hubQuery = query.get("hub") || "";
  const slug = query.get("slug") || "";
  const hubId = hubQuery && getCmsHub(hubQuery) ? hubQuery as CmsHubId : null;
  const validSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length <= 200;
  const enabled = Boolean(hubId && isCmsAdminHub(hubId) && validSlug);
  const draft = trpc.cms.getDraft.useQuery(
    { hubId: hubId || "conditions", slug: validSlug ? slug : "invalid" },
    { enabled, retry: false, refetchOnWindowFocus: false }
  );
  const editorUrl = "/admin/cms-preview?hub=" + encodeURIComponent(hubId || "conditions") +
    "&slug=" + encodeURIComponent(slug);
  const listUrl = "/admin/content-workspace?hub=" + encodeURIComponent(hubId || "conditions");
  if (!enabled || draft.error || !draft.data || draft.data.revision < 1 || draft.data.source !== "saved_draft") {
    return <AdminLayout activeId="cms-workspace">
      <div className="mx-auto max-w-3xl space-y-3 p-6">
        <h1 className="text-2xl font-semibold text-stone-900">Preview Draft</h1>
        {draft.isLoading && enabled
          ? <p>Loading your saved draft…</p>
          : <p className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              {hubId === "articles" ? "Blogs are managed in the original Blog Management editor." : !enabled ? "Invalid content hub or draft link." : draft.error
                ? "Cannot open this draft: " + draft.error.message
                : "This page has no saved private draft yet. Save it in the editor first."}
            </p>}
        <Link href={hubId === "articles" ? "/admin" : editorUrl}><span className="inline-flex cursor-pointer items-center gap-2 font-semibold text-teal-700"><ArrowLeft className="h-4 w-4"/> {hubId === "articles" ? "Open Blog Management" : "Back to editor"}</span></Link>
      </div>
    </AdminLayout>;
  }
  return <div className="min-h-screen">
    <div className="sticky top-0 z-[70] border-b border-teal-200 bg-white px-4 py-3 shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        <div className="flex items-start gap-2">
          <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" />
          <div>
            <p className="text-sm font-semibold text-stone-900">Private preview · Revision {draft.data.revision}</p>
            <p className="text-xs text-stone-600">Saved draft only · {getCmsHub(hubId!)?.label} · Not published or indexed</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href={listUrl} className="inline-flex h-9 items-center justify-center rounded-md border border-stone-200 bg-white px-3 text-sm font-medium text-stone-800 hover:bg-stone-50">
            <ArrowLeft className="mr-1 h-4 w-4"/> All Content
          </a>
          <a href={editorUrl} className="inline-flex h-9 items-center justify-center rounded-md bg-teal-600 px-3 text-sm font-medium text-white hover:bg-teal-700">
            <Edit3 className="mr-1 h-4 w-4"/> Edit this draft
          </a>
        </div>
      </div>
    </div>
    <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs text-amber-900">
      <Eye className="mr-1 inline h-4 w-4"/> Previewing the saved version. Return to the editor, make changes and save to update this preview.
      {hubId !== "conditions" && " This is a generic content-layout preview, not the final hub-specific public template."}
    </div>
    <CmsPublishedCondition document={draft.data.document} mode="private-preview" />
  </div>;
}
