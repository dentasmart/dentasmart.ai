import { useState } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Trash2,
  RefreshCw,
  ExternalLink,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

function formatDate(d: Date | null | undefined): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Admin404s() {
  const utils = trpc.useUtils();
  const [confirmClear, setConfirmClear] = useState(false);

  const { data: entries = [], isLoading, refetch } = trpc.notFound.list.useQuery();

  const deleteMutation = trpc.notFound.delete.useMutation({
    onSuccess: () => {
      utils.notFound.list.invalidate();
      toast.success("Entry deleted");
    },
    onError: () => toast.error("Delete failed"),
  });

  const clearAllMutation = trpc.notFound.clearAll.useMutation({
    onSuccess: () => {
      utils.notFound.list.invalidate();
      setConfirmClear(false);
      toast.success("All entries cleared");
    },
    onError: () => toast.error("Clear failed"),
  });

  const dryRunCount = entries.filter((e) => e.isDryRun).length;
  const enforceCount = entries.filter((e) => !e.isDryRun).length;
  const totalHits = entries.reduce((sum, e) => sum + (e.hitCount ?? 0), 0);

  return (
    <AdminLayout activeId="404s">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
              404 Log
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Paths that returned unknown — logged in dry-run mode (no real 404 served yet).
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            {!confirmClear ? (
              <Button
                variant="outline"
                size="sm"
                className="text-destructive border-destructive/30 hover:bg-destructive/5"
                onClick={() => setConfirmClear(true)}
                disabled={entries.length === 0}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm text-destructive">Confirm clear all?</span>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => clearAllMutation.mutate()}
                  disabled={clearAllMutation.isPending}
                >
                  Yes, clear
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setConfirmClear(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Dry-run notice */}
        <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <Info className="w-4 h-4 mt-0.5 shrink-0" />
          <div>
            <strong>Dry-run mode active.</strong> Unknown paths are logged here but still return HTTP 200.
            Review this list, then set <code className="font-mono bg-amber-100 px-1 rounded">NOT_FOUND_MODE=enforce</code> in
            Secrets to enable real 404 responses.
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-lg border bg-card p-4">
            <div className="text-2xl font-bold text-foreground">{entries.length}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">Unique Paths</div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-2xl font-bold text-foreground">{totalHits}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">Total Hits</div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-2xl font-bold text-amber-600">{dryRunCount}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
              Dry-run / {enforceCount} Enforce
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg border bg-card overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground text-sm">Loading…</div>
          ) : entries.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">
              No unknown paths logged yet. Check back after some traffic.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/40">
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Path</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground w-16">Hits</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground w-28">First Seen</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground w-28">Last Seen</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground w-24">Mode</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Last Referrer</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground w-28">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-foreground">{entry.path}</span>
                          <a
                            href={entry.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-medium">{entry.hitCount}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{formatDate(entry.firstSeenAt)}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{formatDate(entry.lastSeenAt)}</td>
                      <td className="px-4 py-3">
                        {entry.isDryRun ? (
                          <Badge variant="outline" className="text-amber-600 border-amber-300 text-xs">Dry Run</Badge>
                        ) : (
                          <Badge variant="destructive" className="text-xs">Enforce</Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs max-w-xs truncate">
                        {entry.lastReferrer || "—"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/admin/redirects?prefill=${encodeURIComponent(entry.path)}`}>
                            <Button variant="outline" size="sm" className="text-xs h-7 px-2">
                              + Redirect
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                            onClick={() => deleteMutation.mutate({ id: entry.id })}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
