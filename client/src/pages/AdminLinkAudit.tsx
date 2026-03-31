import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ShieldAlert,
  CheckCircle2,
  Wrench,
  RefreshCw,
  AlertTriangle,
  Loader2,
  Edit,
} from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/AdminLayout";

const ISSUE_LABELS: Record<string, { label: string; color: string }> = {
  leading_slash:  { label: "Leading slash",   color: "bg-red-100 text-red-700" },
  trailing_slash: { label: "Trailing slash",  color: "bg-red-100 text-red-700" },
  empty:          { label: "Empty slug",       color: "bg-red-100 text-red-700" },
  invalid_chars:  { label: "Invalid chars",    color: "bg-amber-100 text-amber-700" },
  too_long:       { label: "Too long",         color: "bg-amber-100 text-amber-700" },
  duplicate:      { label: "Duplicate",        color: "bg-purple-100 text-purple-700" },
};

export default function AdminLinkAudit() {
  const [fixingId, setFixingId] = useState<number | null>(null);
  const [fixSlugValue, setFixSlugValue] = useState("");

  const { data: auditData, isLoading: auditLoading, refetch: refetchAudit } = trpc.blog.auditSlugs.useQuery();

  const fixSlugMutation = trpc.blog.fixSlug.useMutation({
    onSuccess: (result) => {
      toast.success(`Slug fixed: /${result.slug}`);
      setFixingId(null);
      setFixSlugValue("");
      refetchAudit();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const getStatusBadge = (s: string) => {
    switch (s) {
      case "published":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0">Published</Badge>;
      case "draft":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-0">Draft</Badge>;
      default:
        return <Badge variant="secondary">{s}</Badge>;
    }
  };

  return (
    <AdminLayout activeId="link-audit" auditIssueCount={auditData?.totalIssues}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-stone-900 flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-primary" />
              Broken-Link Audit
            </h1>
            <p className="text-sm text-stone-500 mt-1">
              Checks every blog post slug for leading slashes, invalid characters, duplicates, and other issues that cause 404s.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetchAudit()}
            disabled={auditLoading}
            className="cursor-pointer border-stone-200 shrink-0"
          >
            <RefreshCw className={`w-4 h-4 mr-1.5 ${auditLoading ? "animate-spin" : ""}`} />
            Re-run Audit
          </Button>
        </div>

        {/* Audit Results */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
          {auditLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="ml-2 text-stone-500 text-sm">Scanning all slugs…</span>
            </div>
          ) : !auditData ? (
            <div className="text-center py-16 text-stone-400 text-sm">No data yet. Click Re-run to start.</div>
          ) : auditData.totalIssues === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
              <p className="text-stone-700 font-medium">All {auditData.totalChecked} slugs are valid</p>
              <p className="text-stone-400 text-sm">No broken links detected.</p>
            </div>
          ) : (
            <>
              {/* Summary bar */}
              <div className="flex items-center gap-4 px-6 py-3 bg-red-50 border-b border-red-100">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                <p className="text-sm text-red-700">
                  <span className="font-semibold">{auditData.totalIssues}</span> issue{auditData.totalIssues !== 1 ? "s" : ""} found
                  {" "}across <span className="font-semibold">{auditData.totalChecked}</span> posts.
                </p>
              </div>

              {/* Issue table */}
              <Table>
                <TableHeader>
                  <TableRow className="bg-stone-50/50">
                    <TableHead className="font-semibold text-stone-700">Article</TableHead>
                    <TableHead className="font-semibold text-stone-700 hidden sm:table-cell">Status</TableHead>
                    <TableHead className="font-semibold text-stone-700">Issues</TableHead>
                    <TableHead className="font-semibold text-stone-700">Suggested Fix</TableHead>
                    <TableHead className="font-semibold text-stone-700 text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditData.issues.map((item) => (
                    <TableRow key={item.id} className="hover:bg-stone-50/50 align-top">
                      <TableCell>
                        <p className="font-medium text-stone-900 line-clamp-1 text-sm">{item.title}</p>
                        <p className="text-xs text-red-500 font-mono mt-0.5 break-all">{item.slug || "(empty)"}</p>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{getStatusBadge(item.status)}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {item.issues.map((issue) => (
                            <Badge
                              key={issue}
                              className={`${ISSUE_LABELS[issue]?.color ?? "bg-stone-100 text-stone-600"} border-0 text-xs`}
                            >
                              {ISSUE_LABELS[issue]?.label ?? issue}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {fixingId === item.id ? (
                          <Input
                            value={fixSlugValue}
                            onChange={(e) => setFixSlugValue(e.target.value)}
                            className="text-xs h-8 font-mono w-48 border-primary"
                            placeholder="new-slug-here"
                            autoFocus
                          />
                        ) : (
                          <span className="text-xs font-mono text-green-700 bg-green-50 px-2 py-1 rounded">
                            {item.suggestedSlug ?? "—"}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          {fixingId === item.id ? (
                            <>
                              <Button
                                size="sm"
                                className="bg-primary hover:bg-primary/90 text-white cursor-pointer h-8 text-xs"
                                disabled={!fixSlugValue.trim() || fixSlugMutation.isPending}
                                onClick={() => fixSlugMutation.mutate({ id: item.id, newSlug: fixSlugValue })}
                              >
                                {fixSlugMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : "Save"}
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="cursor-pointer h-8 text-xs text-stone-500"
                                onClick={() => { setFixingId(null); setFixSlugValue(""); }}
                              >
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <>
                              {item.suggestedSlug && (
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700 text-white cursor-pointer h-8 text-xs"
                                  disabled={fixSlugMutation.isPending}
                                  onClick={() => fixSlugMutation.mutate({ id: item.id, newSlug: item.suggestedSlug! })}
                                  title="Apply suggested fix automatically"
                                >
                                  <Wrench className="w-3 h-3 mr-1" />
                                  Auto-fix
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                className="cursor-pointer h-8 text-xs border-stone-200"
                                onClick={() => { setFixingId(item.id); setFixSlugValue(item.suggestedSlug ?? item.slug); }}
                                title="Edit slug manually"
                              >
                                <Edit className="w-3 h-3 mr-1" />
                                Edit
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
