import { useState, useMemo } from "react";
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeftRight,
  Plus,
  Pencil,
  Trash2,
  Search,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface RedirectRow {
  id: number;
  sourcePath: string;
  targetPath: string;
  statusCode: number;
  isEnabled: boolean;
  hitCount: number;
  lastHitAt: Date | null;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const STATUS_CODE_OPTIONS = [
  { value: "301", label: "301 — Permanent" },
  { value: "302", label: "302 — Temporary" },
  { value: "307", label: "307 — Temporary (preserve method)" },
  { value: "308", label: "308 — Permanent (preserve method)" },
];

const STATUS_COLORS: Record<number, string> = {
  301: "bg-blue-100 text-blue-800",
  302: "bg-amber-100 text-amber-800",
  307: "bg-purple-100 text-purple-800",
  308: "bg-green-100 text-green-800",
};

function StatCard({
  label,
  value,
  icon,
  variant = "default",
  onClick,
  isActive,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  variant?: "default" | "warning" | "success";
  onClick?: () => void;
  isActive?: boolean;
}) {
  const bg =
    variant === "warning"
      ? "bg-amber-50 border-amber-200"
      : variant === "success"
        ? "bg-green-50 border-green-200"
        : "bg-white border-border";
  const text =
    variant === "warning"
      ? "text-amber-700"
      : variant === "success"
        ? "text-green-700"
        : "text-foreground";
  const activeCls = isActive ? "ring-2 ring-primary ring-offset-1 shadow-md" : "";
  const interactiveCls = onClick
    ? "cursor-pointer hover:shadow-md hover:border-primary/40 transition-all duration-150 select-none"
    : "";
  return (
    <div
      className={`rounded-xl border p-4 flex items-center gap-4 ${bg} ${activeCls} ${interactiveCls}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") onClick(); } : undefined}
      aria-pressed={onClick ? isActive : undefined}
    >
      <div className={`p-2 rounded-lg ${variant === "warning" ? "bg-amber-100" : variant === "success" ? "bg-green-100" : "bg-muted"}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className={`text-2xl font-bold ${text}`}>{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
      {isActive && (
        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-primary/10 text-primary shrink-0">
          Filtered
        </span>
      )}
    </div>
  );
}

const emptyForm = {
  sourcePath: "",
  targetPath: "",
  statusCode: "301",
  isEnabled: true,
  note: "",
};

export default function AdminRedirects() {
  const utils = trpc.useUtils();

  const { data: rows = [], isLoading } = trpc.redirects.listRedirects.useQuery();

  // ─── Filters ───────────────────────────────────────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterEnabled, setFilterEnabled] = useState<string>("all");

  // ─── Card filter (Part 1) ──────────────────────────────────────────────────────────
  type RedirectCardFilter = "active" | "disabled" | null;
  const [cardFilter, setCardFilter] = useState<RedirectCardFilter>(null);

  function toggleCardFilter(f: RedirectCardFilter) {
    setCardFilter((prev) => (prev === f ? null : f));
  }

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        r.sourcePath.toLowerCase().includes(q) ||
        r.targetPath.toLowerCase().includes(q) ||
        (r.note ?? "").toLowerCase().includes(q);
      const matchStatus =
        filterStatus === "all" || r.statusCode === parseInt(filterStatus);
      const matchEnabled =
        filterEnabled === "all" ||
        (filterEnabled === "enabled" ? r.isEnabled : !r.isEnabled);
      // Card filter overrides the enabled dropdown
      const matchCard =
        cardFilter === null ||
        (cardFilter === "active" ? r.isEnabled : !r.isEnabled);
      return matchSearch && matchStatus && matchEnabled && matchCard;
    });
  }, [rows, search, filterStatus, filterEnabled, cardFilter]);

  // ─── Summary stats ────────────────────────────────────────────────────────
  const totalHits = useMemo(
    () => rows.reduce((sum, r) => sum + (r.hitCount ?? 0), 0),
    [rows]
  );
  const activeCount = rows.filter((r) => r.isEnabled).length;
  const disabledCount = rows.filter((r) => !r.isEnabled).length;

  // ─── Edit modal ───────────────────────────────────────────────────────────
  const [editOpen, setEditOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<RedirectRow | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState<string | null>(null);

  function openAdd() {
    setEditTarget(null);
    setForm(emptyForm);
    setFormError(null);
    setEditOpen(true);
  }

  function openEdit(row: RedirectRow) {
    setEditTarget(row);
    setForm({
      sourcePath: row.sourcePath,
      targetPath: row.targetPath,
      statusCode: String(row.statusCode),
      isEnabled: row.isEnabled,
      note: row.note ?? "",
    });
    setFormError(null);
    setEditOpen(true);
  }

  const upsertMutation = trpc.redirects.upsertRedirect.useMutation({
    onSuccess: (result) => {
      utils.redirects.listRedirects.invalidate();
      setEditOpen(false);
      if (result.chainWarning) {
        toast.warning("Redirect saved", { description: result.chainWarning });
      } else {
        toast.success("Redirect saved", { description: "Changes are live immediately." });
      }
    },
    onError: (err) => {
      setFormError(err.message);
      toast.error(err.message);
    },
  });

  function handleSave() {
    setFormError(null);
    if (!form.sourcePath.startsWith("/")) {
      setFormError("Source path must start with /");
      return;
    }
    if (!form.targetPath) {
      setFormError("Target path is required");
      return;
    }
    if (form.sourcePath === form.targetPath) {
      setFormError("Source and target paths cannot be the same");
      return;
    }
    upsertMutation.mutate({
      id: editTarget?.id,
      sourcePath: form.sourcePath,
      targetPath: form.targetPath,
      statusCode: parseInt(form.statusCode),
      isEnabled: form.isEnabled,
      note: form.note || null,
    });
  }

  // ─── Toggle enabled ───────────────────────────────────────────────────────
  const toggleMutation = trpc.redirects.upsertRedirect.useMutation({
    onSuccess: () => {
      utils.redirects.listRedirects.invalidate();
      // Part 4a: toggling enabled/disabled changes orphan classification in pages panel
      utils.pages.listPages.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  function handleToggle(row: RedirectRow) {
    toggleMutation.mutate({
      id: row.id,
      sourcePath: row.sourcePath,
      targetPath: row.targetPath,
      statusCode: row.statusCode,
      isEnabled: !row.isEnabled,
      note: row.note,
    });
  }

  // ─── Delete ───────────────────────────────────────────────────────────────
  const [deleteTarget, setDeleteTarget] = useState<RedirectRow | null>(null);
  const deleteMutation = trpc.redirects.deleteRedirect.useMutation({
    onSuccess: () => {
      utils.redirects.listRedirects.invalidate();
      // Part 4a: deleting a redirect may promote an orphan from "redirected" to "needs action"
      utils.pages.listPages.invalidate();
      setDeleteTarget(null);
      toast.success("Redirect deleted");
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <AdminLayout activeId="redirects">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ArrowLeftRight className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Redirects</h1>
              <p className="text-sm text-muted-foreground">
                DB-backed server-side redirects. Changes are live immediately.
              </p>
            </div>
          </div>
          <Button onClick={openAdd} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Redirect
          </Button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="Total Redirects"
            value={rows.length}
            icon={<ArrowLeftRight className="w-5 h-5 text-muted-foreground" />}
          />
          <StatCard
            label="Active"
            value={activeCount}
            icon={<CheckCircle className="w-5 h-5 text-green-600" />}
            variant="success"
            onClick={() => toggleCardFilter("active")}
            isActive={cardFilter === "active"}
          />
          <StatCard
            label="Disabled"
            value={disabledCount}
            icon={<XCircle className="w-5 h-5 text-amber-600" />}
            variant={disabledCount > 0 ? "warning" : "default"}
            onClick={() => toggleCardFilter("disabled")}
            isActive={cardFilter === "disabled"}
          />
          <StatCard
            label="Total Hits"
            value={totalHits.toLocaleString()}
            icon={<Activity className="w-5 h-5 text-muted-foreground" />}
          />
        </div>

        {/* Active card filter banner */}
        {cardFilter && (
          <div className="flex items-center gap-2 px-3 py-2 bg-primary/5 border border-primary/20 rounded-lg text-sm text-primary">
            <span className="font-medium">
              Filtered by: {cardFilter === "active" ? "Active redirects" : "Disabled redirects"}
            </span>
            <button
              onClick={() => setCardFilter(null)}
              className="ml-auto text-xs underline cursor-pointer hover:no-underline"
            >
              Clear filter
            </button>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search source, target, or note…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Status code" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status codes</SelectItem>
              {STATUS_CODE_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterEnabled} onValueChange={setFilterEnabled}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Enabled" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="enabled">Active only</SelectItem>
              <SelectItem value="disabled">Disabled only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-xl border bg-white overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-2">
              <ArrowLeftRight className="w-8 h-8 opacity-30" />
              <p className="text-sm">No redirects match your filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/40 text-muted-foreground text-xs uppercase tracking-wide">
                    <th className="text-left px-4 py-3 font-medium">Source</th>
                    <th className="text-left px-4 py-3 font-medium">Target</th>
                    <th className="text-left px-4 py-3 font-medium w-28">Status</th>
                    <th className="text-left px-4 py-3 font-medium w-20">Enabled</th>
                    <th className="text-left px-4 py-3 font-medium w-20">Hits</th>
                    <th className="text-left px-4 py-3 font-medium w-32">Last Hit</th>
                    <th className="text-right px-4 py-3 font-medium w-28">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, i) => (
                    <tr
                      key={row.id}
                      className={`border-b last:border-0 hover:bg-muted/20 transition-colors ${!row.isEnabled ? "opacity-50" : ""}`}
                    >
                      <td className="px-4 py-3 font-mono text-xs max-w-[220px] truncate">
                        <span title={row.sourcePath}>{row.sourcePath}</span>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs max-w-[220px] truncate">
                        <span title={row.targetPath}>{row.targetPath}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[row.statusCode] ?? "bg-muted text-muted-foreground"}`}
                        >
                          {row.statusCode}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Switch
                          checked={row.isEnabled}
                          onCheckedChange={() => handleToggle(row)}
                          disabled={toggleMutation.isPending}
                          aria-label={`Toggle redirect ${row.sourcePath}`}
                        />
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {(row.hitCount ?? 0).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">
                        {row.lastHitAt
                          ? new Date(row.lastHitAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => openEdit(row)}
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                            asChild
                            title="Open source path"
                          >
                            <a href={row.sourcePath} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                            onClick={() => setDeleteTarget(row)}
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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
        <p className="text-xs text-muted-foreground">
          Showing {filtered.length} of {rows.length} redirects
        </p>
      </div>

      {/* Add / Edit modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editTarget ? "Edit Redirect" : "Add Redirect"}
            </DialogTitle>
            {editTarget && (
              <p className="text-xs text-muted-foreground font-mono mt-1">
                {editTarget.sourcePath}
              </p>
            )}
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="sourcePath">
                Source Path <span className="text-destructive">*</span>
              </Label>
              <Input
                id="sourcePath"
                placeholder="/old-page"
                value={form.sourcePath}
                onChange={(e) => setForm({ ...form, sourcePath: e.target.value })}
                disabled={!!editTarget}
                className={!!editTarget ? "bg-muted" : ""}
              />
              {!!editTarget && (
                <p className="text-xs text-muted-foreground">
                  Source path cannot be changed. Delete and recreate to change it.
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="targetPath">
                Target Path <span className="text-destructive">*</span>
              </Label>
              <Input
                id="targetPath"
                placeholder="/new-page or https://example.com/page"
                value={form.targetPath}
                onChange={(e) => setForm({ ...form, targetPath: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Status Code</Label>
                <Select
                  value={form.statusCode}
                  onValueChange={(v) => setForm({ ...form, statusCode: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_CODE_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Enabled</Label>
                <div className="flex items-center gap-2 pt-2">
                  <Switch
                    checked={form.isEnabled}
                    onCheckedChange={(v) => setForm({ ...form, isEnabled: v })}
                  />
                  <span className="text-sm text-muted-foreground">
                    {form.isEnabled ? "Active" : "Disabled"}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="note">Note (optional)</Label>
              <Textarea
                id="note"
                placeholder="Why this redirect exists…"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                rows={2}
              />
            </div>

            {formError && (
              <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                {formError}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={upsertMutation.isPending}>
              {upsertMutation.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete redirect?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the redirect from{" "}
              <code className="bg-muted px-1 rounded text-sm">
                {deleteTarget?.sourcePath}
              </code>{" "}
              to{" "}
              <code className="bg-muted px-1 rounded text-sm">
                {deleteTarget?.targetPath}
              </code>
              . This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteTarget && deleteMutation.mutate({ id: deleteTarget.id })}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
