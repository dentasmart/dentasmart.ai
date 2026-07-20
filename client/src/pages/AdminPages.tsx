import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  LayoutGrid,
  Search,
  Loader2,
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileSearch,
  Pencil,
  Info,
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import type { PageType } from "@shared/routes";

// ─── Types ────────────────────────────────────────────────────────────────────
type PageEntry = {
  path: string;
  label: string;
  type: PageType | "Orphaned";
  hasMetaTitle: boolean;
  hasMetaDesc: boolean;
  hasCanonical: boolean;
  metaTitle: string | null;
  metaDesc: string | null;
  overrideTitle: string | null;
  overrideDesc: string | null;
  overrideCanonical: string | null;
  hasOverride: boolean;
};

// ─── Constants ────────────────────────────────────────────────────────────────
const ALL_TYPES: Array<PageType | "Orphaned"> = [
  "Single Page",
  "Index",
  "Condition",
  "Symptom",
  "Treatment",
  "Dental Cost",
  "Comparison",
  "Guide",
  "Life Stage",
  "Lifestyle",
  "Dental Emergency",
  "Hub",
  "Orphaned",
];

const TYPE_COLORS: Record<string, string> = {
  "Single Page": "bg-blue-50 text-blue-700",
  "Index": "bg-purple-50 text-purple-700",
  "Condition": "bg-red-50 text-red-700",
  "Symptom": "bg-orange-50 text-orange-700",
  "Treatment": "bg-teal-50 text-teal-700",
  "Dental Cost": "bg-yellow-50 text-yellow-700",
  "Comparison": "bg-indigo-50 text-indigo-700",
  "Guide": "bg-green-50 text-green-700",
  "Life Stage": "bg-pink-50 text-pink-700",
  "Lifestyle": "bg-lime-50 text-lime-700",
  "Dental Emergency": "bg-rose-100 text-rose-800",
  "Hub": "bg-sky-50 text-sky-700",
  "Orphaned": "bg-amber-100 text-amber-800",
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  icon,
  highlight,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  highlight?: "warning" | "danger";
}) {
  const bg =
    highlight === "danger"
      ? "bg-red-50 border-red-200"
      : highlight === "warning"
      ? "bg-amber-50 border-amber-200"
      : "bg-white border-stone-200";
  return (
    <div className={`rounded-xl border ${bg} p-4 flex items-center gap-3`}>
      <div className="p-2 bg-stone-50 rounded-lg shrink-0">{icon}</div>
      <div>
        <p className="text-2xl font-semibold text-stone-900">{value}</p>
        <p className="text-xs text-stone-500">{label}</p>
      </div>
    </div>
  );
}

function MetaCheck({ has }: { has: boolean }) {
  return has ? (
    <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
  ) : (
    <XCircle className="w-4 h-4 text-red-400 mx-auto" />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminPages() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"All" | PageType | "Orphaned">("All");
  const [missingOnly, setMissingOnly] = useState(false);

  // Edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<PageEntry | null>(null);
  const [editForm, setEditForm] = useState({
    metaTitle: "",
    metaDesc: "",
    canonical: "",
  });

  const utils = trpc.useUtils();
  const { data: pages, isLoading } = trpc.pages.listPages.useQuery();

  const upsertMeta = trpc.pages.upsertPageMeta.useMutation({
    onSuccess: () => {
      toast.success("Meta saved successfully");
      setEditOpen(false);
      setEditTarget(null);
      utils.pages.listPages.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteMeta = trpc.pages.deletePageMeta.useMutation({
    onSuccess: () => {
      toast.success("Override removed — page reverted to default meta");
      setEditOpen(false);
      setEditTarget(null);
      utils.pages.listPages.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  function openEditModal(page: PageEntry) {
    setEditTarget(page);
    setEditForm({
      // Pre-populate from override first, then staticMeta
      metaTitle: page.overrideTitle ?? page.metaTitle ?? "",
      metaDesc: page.overrideDesc ?? page.metaDesc ?? "",
      canonical: page.overrideCanonical ?? "",
    });
    setEditOpen(true);
  }

  function handleSave() {
    if (!editTarget) return;
    upsertMeta.mutate({
      path: editTarget.path,
      metaTitle: editForm.metaTitle.trim() || null,
      metaDesc: editForm.metaDesc.trim() || null,
      canonical: editForm.canonical.trim() || null,
    });
  }

  function handleRevert() {
    if (!editTarget) return;
    deleteMeta.mutate({ path: editTarget.path });
  }

  // ── Derived stats ──────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    if (!pages) return null;
    const nonOrphaned = pages.filter((p) => p.type !== "Orphaned");
    return {
      total: nonOrphaned.length,
      missingTitle: nonOrphaned.filter((p) => !p.hasMetaTitle).length,
      missingDesc: nonOrphaned.filter((p) => !p.hasMetaDesc).length,
      missingCanonical: nonOrphaned.filter((p) => !p.hasCanonical).length,
      orphaned: pages.filter((p) => p.type === "Orphaned").length,
    };
  }, [pages]);

  // ── Filtered rows ──────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    if (!pages) return [];
    return pages.filter((p) => {
      if (typeFilter !== "All" && p.type !== typeFilter) return false;
      if (missingOnly && p.hasMetaTitle && p.hasMetaDesc && p.hasCanonical) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !p.path.toLowerCase().includes(q) &&
          !p.label.toLowerCase().includes(q) &&
          !(p.metaTitle ?? "").toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [pages, typeFilter, missingOnly, search]);

  const isSaving = upsertMeta.isPending;
  const isReverting = deleteMeta.isPending;

  // Source badge for modal field labels
  function SourceBadge({ field }: { field: "title" | "desc" | "canonical" }) {
    if (!editTarget) return null;
    const hasOverride =
      field === "title" ? editTarget.overrideTitle !== null :
      field === "desc"  ? editTarget.overrideDesc  !== null :
                          editTarget.overrideCanonical !== null;
    if (hasOverride) {
      return (
        <span className="ml-2 text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">
          DB override
        </span>
      );
    }
    const hasStatic =
      field === "title" ? !!editTarget.metaTitle :
      field === "desc"  ? !!editTarget.metaDesc  :
                          false;
    if (hasStatic) {
      return (
        <span className="ml-2 text-[10px] font-medium px-1.5 py-0.5 rounded bg-stone-100 text-stone-500">
          From page file
        </span>
      );
    }
    return (
      <span className="ml-2 text-[10px] font-medium px-1.5 py-0.5 rounded bg-red-50 text-red-500">
        Not set
      </span>
    );
  }

  return (
    <AdminLayout activeId="pages">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-stone-900 flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-primary" />
          Pages
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          All static pages and their SEO metadata coverage. Click Edit to set or override meta tags per page.
        </p>
      </div>

      {/* Summary Cards */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-stone-200 p-4 h-20 animate-pulse" />
          ))}
        </div>
      ) : stats ? (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <StatCard
            label="Total Pages"
            value={stats.total}
            icon={<LayoutGrid className="w-5 h-5 text-primary" />}
          />
          <StatCard
            label="Missing Meta Title"
            value={stats.missingTitle}
            icon={<XCircle className="w-5 h-5 text-red-500" />}
            highlight={stats.missingTitle > 0 ? "danger" : undefined}
          />
          <StatCard
            label="Missing Meta Desc"
            value={stats.missingDesc}
            icon={<XCircle className="w-5 h-5 text-orange-500" />}
            highlight={stats.missingDesc > 0 ? "warning" : undefined}
          />
          <StatCard
            label="Missing Canonical"
            value={stats.missingCanonical}
            icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
            highlight={stats.missingCanonical > 0 ? "warning" : undefined}
          />
          <StatCard
            label="Orphaned Meta"
            value={stats.orphaned}
            icon={<FileSearch className="w-5 h-5 text-amber-600" />}
            highlight={stats.orphaned > 0 ? "warning" : undefined}
          />
        </div>
      ) : null}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <Input
            placeholder="Search by path, label, or meta title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-white border-stone-200"
          />
        </div>
        <Select
          value={typeFilter}
          onValueChange={(v) => setTypeFilter(v as typeof typeFilter)}
        >
          <SelectTrigger className="w-full sm:w-52 bg-white border-stone-200">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            {ALL_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => setMissingOnly((v) => !v)}
          className={`shrink-0 border-stone-200 cursor-pointer ${
            missingOnly
              ? "bg-red-50 border-red-300 text-red-700 hover:bg-red-100"
              : "bg-white text-stone-600 hover:bg-stone-50"
          }`}
        >
          <XCircle className="w-4 h-4 mr-2" />
          {missingOnly ? "Showing: Missing Only" : "Show Missing Only"}
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <LayoutGrid className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-stone-700 mb-1">No pages found</h3>
            <p className="text-stone-500 text-sm">Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-stone-50/50">
                  <TableHead className="font-semibold text-stone-700 min-w-[180px]">
                    Title / Path
                  </TableHead>
                  <TableHead className="font-semibold text-stone-700 hidden md:table-cell w-36">
                    Type
                  </TableHead>
                  <TableHead className="font-semibold text-stone-700 text-center w-24">
                    Meta Title
                  </TableHead>
                  <TableHead className="font-semibold text-stone-700 text-center w-24">
                    Meta Desc
                  </TableHead>
                  <TableHead className="font-semibold text-stone-700 text-center w-24">
                    Canonical
                  </TableHead>
                  <TableHead className="font-semibold text-stone-700 w-20 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((page) => {
                  const allGood =
                    page.hasMetaTitle && page.hasMetaDesc && page.hasCanonical;
                  const isOrphaned = page.type === "Orphaned";
                  return (
                    <TableRow
                      key={page.path}
                      className={`hover:bg-stone-50/50 ${
                        isOrphaned
                          ? "bg-amber-50/40"
                          : !allGood
                          ? "bg-red-50/20"
                          : ""
                      }`}
                    >
                      {/* Title / Path */}
                      <TableCell>
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-medium text-stone-800 text-sm leading-snug">
                              {(page.overrideTitle ?? page.metaTitle)
                                ? (() => {
                                    const t = page.overrideTitle ?? page.metaTitle!;
                                    return t.length > 55 ? t.slice(0, 55) + "…" : t;
                                  })()
                                : <span className="text-stone-400 italic">{page.label}</span>
                              }
                            </span>
                            {page.hasOverride && (
                              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 shrink-0">
                                Overridden
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-stone-400 font-mono">{page.path}</span>
                        </div>
                      </TableCell>

                      {/* Type badge */}
                      <TableCell className="hidden md:table-cell">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
                            TYPE_COLORS[page.type] ?? "bg-stone-100 text-stone-600"
                          }`}
                        >
                          {isOrphaned && (
                            <AlertTriangle className="w-3 h-3 mr-1 shrink-0" />
                          )}
                          {page.type}
                        </span>
                      </TableCell>

                      {/* Meta Title ✓/✗ */}
                      <TableCell className="text-center">
                        <MetaCheck has={page.hasMetaTitle} />
                      </TableCell>

                      {/* Meta Desc ✓/✗ */}
                      <TableCell className="text-center">
                        <MetaCheck has={page.hasMetaDesc} />
                      </TableCell>

                      {/* Canonical ✓/✗ */}
                      <TableCell className="text-center">
                        <MetaCheck has={page.hasCanonical} />
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEditModal(page)}
                            className={`inline-flex items-center justify-center p-1.5 rounded-lg transition-colors cursor-pointer relative ${
                              page.hasOverride
                                ? "text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                                : "text-stone-400 hover:text-primary hover:bg-primary/5"
                            }`}
                            title="Edit meta tags"
                          >
                            <Pencil className="w-4 h-4" />
                            {page.hasOverride && (
                              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400" />
                            )}
                          </button>
                          <a
                            href={page.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center p-1.5 rounded-lg text-stone-400 hover:text-primary hover:bg-primary/5 transition-colors"
                            title={`Open ${page.path}`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Footer count */}
      {!isLoading && filtered.length > 0 && (
        <p className="text-xs text-stone-400 mt-3 text-right">
          Showing {filtered.length} of {pages?.length ?? 0} pages
        </p>
      )}

      {/* Edit Meta Modal */}
      <Dialog
        open={editOpen}
        onOpenChange={(open) => {
          if (!open) {
            setEditOpen(false);
            setEditTarget(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base">Edit Meta Tags</DialogTitle>
            <DialogDescription className="font-mono text-xs text-stone-500 break-all">
              {editTarget?.path}
            </DialogDescription>
          </DialogHeader>

          {/* SEO divergence notice */}
          <div className="flex gap-2.5 rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <p>
              Changes affect what search engines see in raw HTML. The in-browser page title is
              controlled by the page component and will not change until that is updated separately.
            </p>
          </div>

          <div className="space-y-4 py-1">
            {/* Meta Title */}
            <div>
              <Label className="text-sm font-medium text-stone-700 mb-1.5 flex items-center">
                Meta Title
                <SourceBadge field="title" />
              </Label>
              <Input
                value={editForm.metaTitle}
                onChange={(e) => setEditForm((f) => ({ ...f, metaTitle: e.target.value }))}
                placeholder="e.g. Toothache Guide | Causes, Relief & When to See a Dentist"
                className="border-stone-200"
                maxLength={200}
              />
              <p className="text-xs text-stone-400 mt-1">
                {editForm.metaTitle.length}/200 chars — recommended 50–60
              </p>
            </div>

            {/* Meta Description */}
            <div>
              <Label className="text-sm font-medium text-stone-700 mb-1.5 flex items-center">
                Meta Description
                <SourceBadge field="desc" />
              </Label>
              <Textarea
                value={editForm.metaDesc}
                onChange={(e) => setEditForm((f) => ({ ...f, metaDesc: e.target.value }))}
                placeholder="Brief description for search engine results..."
                className="border-stone-200 min-h-[80px] resize-none"
              />
              <p className={`text-xs mt-1 ${editForm.metaDesc.length > 160 ? "text-amber-600" : "text-stone-400"}`}>
                {editForm.metaDesc.length} chars — recommended under 160
              </p>
            </div>

            {/* Canonical URL */}
            <div>
              <Label className="text-sm font-medium text-stone-700 mb-1.5 flex items-center">
                Canonical URL
                <SourceBadge field="canonical" />
                <span className="ml-1.5 text-xs text-stone-400 font-normal">(optional)</span>
              </Label>
              <Input
                value={editForm.canonical}
                onChange={(e) => setEditForm((f) => ({ ...f, canonical: e.target.value }))}
                placeholder={
                  editTarget
                    ? `Auto: https://dentasmart.ai${editTarget.path}/`
                    : "https://dentasmart.ai/..."
                }
                className="border-stone-200 font-mono text-sm"
                maxLength={1000}
              />
              <p className="text-xs text-stone-400 mt-1">
                Leave blank to use the auto-computed canonical for this path.
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 flex-wrap">
            <Button
              variant="outline"
              onClick={() => setEditOpen(false)}
              className="cursor-pointer"
              disabled={isSaving || isReverting}
            >
              Cancel
            </Button>
            {editTarget?.hasOverride && (
              <Button
                variant="outline"
                onClick={handleRevert}
                disabled={isSaving || isReverting}
                className="border-amber-200 text-amber-700 hover:bg-amber-50 cursor-pointer"
              >
                {isReverting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Revert to default
              </Button>
            )}
            <Button
              onClick={handleSave}
              disabled={isSaving || isReverting}
              className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
            >
              {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
