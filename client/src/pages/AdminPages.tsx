import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LayoutGrid,
  Search,
  Loader2,
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileSearch,
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

  const { data: pages, isLoading } = trpc.pages.listPages.useQuery();

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

  return (
    <AdminLayout activeId="pages">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-stone-900 flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-primary" />
          Pages
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          All static pages and their SEO metadata coverage. Pages missing meta tags are flagged for action.
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
                  <TableHead className="font-semibold text-stone-700 w-16 text-right">
                    View
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
                          <span className="font-medium text-stone-800 text-sm leading-snug">
                            {page.metaTitle
                              ? page.metaTitle.length > 55
                                ? page.metaTitle.slice(0, 55) + "…"
                                : page.metaTitle
                              : (
                                <span className="text-stone-400 italic">{page.label}</span>
                              )}
                          </span>
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

                      {/* View link */}
                      <TableCell className="text-right">
                        <a
                          href={page.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center p-1.5 rounded-lg text-stone-400 hover:text-primary hover:bg-primary/5 transition-colors"
                          title={`Open ${page.path}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
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
    </AdminLayout>
  );
}
