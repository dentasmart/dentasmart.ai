import { useState, useMemo, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
} from "@/components/ui/dialog";
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
import {
  Search,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Download,
  Users,
  Smartphone,
  ClipboardCheck,
  AlertTriangle,
  Mail,
  Eye,
  Calendar,
  Trash2,
  FileSpreadsheet,
  Heart,
} from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/AdminLayout";

type LeadSource = "quiz" | "android-waitlist" | "benefits-waitlist";

interface LeadItem {
  id: number;
  source: LeadSource;
  name: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
  riskLevel: string | null;
  matchedConditions: string[];
  answers: Record<string, string> | null;
  createdAt: string | Date;
}

export default function AdminLeads() {
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("all");
  const [riskLevel, setRiskLevel] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Stable query inputs
  const queryInput = useMemo(
    () => ({
      source: source !== "all" ? (source as LeadSource) : undefined,
      riskLevel: riskLevel !== "all" ? (riskLevel as "low" | "moderate" | "high") : undefined,
      search: search || undefined,
      page,
      limit,
    }),
    [source, riskLevel, search, page, limit]
  );

  const exportInput = useMemo(
    () => ({
      source: source !== "all" ? (source as LeadSource) : undefined,
      riskLevel: riskLevel !== "all" ? (riskLevel as "low" | "moderate" | "high") : undefined,
      search: search || undefined,
    }),
    [source, riskLevel, search]
  );

  // Leads data
  const { data, isLoading, refetch } = trpc.leads.list.useQuery(queryInput);

  // Stats
  const { data: stats, refetch: refetchStats } = trpc.leads.stats.useQuery();

  // CSV export
  const exportCsvQuery = trpc.leads.exportCsv.useQuery(exportInput, { enabled: false });

  // Excel export
  const exportExcelQuery = trpc.leads.exportExcel.useQuery(exportInput, { enabled: false });

  // Delete mutation
  const deleteMutation = trpc.leads.delete.useMutation({
    onSuccess: (result) => {
      toast.success(`Deleted ${result.deleted} lead(s)`);
      setSelectedIds(new Set());
      refetch();
      refetchStats();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete leads");
    },
  });

  // Unique key for each lead
  const getLeadKey = (lead: { source: string; id: number }) => `${lead.source}:${lead.id}`;

  // Toggle single checkbox
  const toggleSelect = useCallback((key: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  // Toggle select all on current page
  const toggleSelectAll = useCallback(() => {
    if (!data?.leads) return;
    const allKeys = data.leads.map((l) => getLeadKey(l));
    const allSelected = allKeys.every((k) => selectedIds.has(k));
    if (allSelected) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        allKeys.forEach((k) => next.delete(k));
        return next;
      });
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        allKeys.forEach((k) => next.add(k));
        return next;
      });
    }
  }, [data?.leads, selectedIds]);

  const isAllSelected = useMemo(() => {
    if (!data?.leads || data.leads.length === 0) return false;
    return data.leads.every((l) => selectedIds.has(getLeadKey(l)));
  }, [data?.leads, selectedIds]);

  const isSomeSelected = useMemo(() => {
    if (!data?.leads || data.leads.length === 0) return false;
    return data.leads.some((l) => selectedIds.has(getLeadKey(l)));
  }, [data?.leads, selectedIds]);

  // Handle bulk delete
  const handleBulkDelete = () => {
    const items = Array.from(selectedIds).map((key) => {
      const [src, id] = key.split(":");
      return { source: src as LeadSource, id: Number(id) };
    });
    deleteMutation.mutate({ items });
    setShowDeleteDialog(false);
  };

  // Handle CSV export
  const handleExportCsv = async () => {
    try {
      const result = await exportCsvQuery.refetch();
      if (result.data) {
        const blob = new Blob([result.data.csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `dentasmart-leads-${new Date().toISOString().split("T")[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast.success(`Exported ${result.data.count} leads to CSV`);
      }
    } catch {
      toast.error("Failed to export leads");
    }
  };

  // Handle Excel export
  const handleExportExcel = async () => {
    try {
      const result = await exportExcelQuery.refetch();
      if (result.data) {
        const blob = new Blob([result.data.data], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `dentasmart-leads-${new Date().toISOString().split("T")[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast.success(`Exported ${result.data.count} leads to Excel`);
      }
    } catch {
      toast.error("Failed to export leads");
    }
  };

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  const getSourceBadge = (s: string) => {
    switch (s) {
      case "quiz":
        return (
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-0">
            <ClipboardCheck className="w-3 h-3 mr-1" />
            Symptom Quiz
          </Badge>
        );
      case "android-waitlist":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0">
            <Smartphone className="w-3 h-3 mr-1" />
            Android Waitlist
          </Badge>
        );
      case "benefits-waitlist":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0">
            <Heart className="w-3 h-3 mr-1" />
            Benefits Waitlist
          </Badge>
        );
      default:
        return <Badge variant="secondary">{s}</Badge>;
    }
  };

  const getRiskBadge = (level: string | null) => {
    switch (level) {
      case "high":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-0">High Risk</Badge>;
      case "moderate":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-0">Moderate</Badge>;
      case "low":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0">Low Risk</Badge>;
      default:
        return <span className="text-stone-400 text-sm">N/A</span>;
    }
  };

  return (
    <AdminLayout activeId="leads">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-stone-900">Leads Management</h1>
        <div className="flex items-center gap-2 flex-wrap">
          {selectedIds.size > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteDialog(true)}
              disabled={deleteMutation.isPending}
              className="cursor-pointer"
            >
              {deleteMutation.isPending ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 mr-1" />
              )}
              Delete Selected ({selectedIds.size})
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCsv}
            disabled={exportCsvQuery.isFetching}
            className="cursor-pointer"
          >
            {exportCsvQuery.isFetching ? (
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-1" />
            )}
            CSV
          </Button>
          <Button
            size="sm"
            onClick={handleExportExcel}
            disabled={exportExcelQuery.isFetching}
            className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
          >
            {exportExcelQuery.isFetching ? (
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
            ) : (
              <FileSpreadsheet className="w-4 h-4 mr-1" />
            )}
            Excel
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
        <StatCard
          label="Total Leads"
          value={stats?.total || 0}
          icon={<Users className="w-5 h-5 text-primary" />}
        />
        <StatCard
          label="Quiz Leads"
          value={stats?.quizLeads || 0}
          icon={<ClipboardCheck className="w-5 h-5 text-purple-600" />}
        />
        <StatCard
          label="Android Waitlist"
          value={stats?.androidWaitlist || 0}
          icon={<Smartphone className="w-5 h-5 text-blue-600" />}
        />
        <StatCard
          label="Benefits Waitlist"
          value={stats?.benefitsWaitlist || 0}
          icon={<Heart className="w-5 h-5 text-emerald-600" />}
        />
        <StatCard
          label="High Risk"
          value={stats?.highRisk || 0}
          icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
        />
        <StatCard
          label="With Email"
          value={stats?.withEmail || 0}
          icon={<Mail className="w-5 h-5 text-green-600" />}
        />
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
              setSelectedIds(new Set());
            }}
            className="pl-10 bg-white border-stone-200"
          />
        </div>
        <Select
          value={source}
          onValueChange={(v) => {
            setSource(v);
            setPage(1);
            setSelectedIds(new Set());
          }}
        >
          <SelectTrigger className="w-full sm:w-48 bg-white border-stone-200">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="quiz">Symptom Quiz</SelectItem>
            <SelectItem value="android-waitlist">Android Waitlist</SelectItem>
            <SelectItem value="benefits-waitlist">Benefits Waitlist</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={riskLevel}
          onValueChange={(v) => {
            setRiskLevel(v);
            setPage(1);
            setSelectedIds(new Set());
          }}
        >
          <SelectTrigger className="w-full sm:w-40 bg-white border-stone-200">
            <SelectValue placeholder="Risk Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Risk Levels</SelectItem>
            <SelectItem value="high">High Risk</SelectItem>
            <SelectItem value="moderate">Moderate</SelectItem>
            <SelectItem value="low">Low Risk</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={String(limit)}
          onValueChange={(v) => {
            setLimit(Number(v));
            setPage(1);
            setSelectedIds(new Set());
          }}
        >
          <SelectTrigger className="w-full sm:w-32 bg-white border-stone-200">
            <SelectValue placeholder="Per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="50">50 per page</SelectItem>
            <SelectItem value="100">100 per page</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : data?.leads.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-stone-700 mb-1">No leads found</h3>
            <p className="text-stone-500 text-sm">
              {search || source !== "all" || riskLevel !== "all"
                ? "Try adjusting your filters"
                : "Leads will appear here as users complete the symptom quiz, join the Android waitlist, or sign up for Benefits"}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-stone-50/50">
                    <TableHead className="w-10">
                      <Checkbox
                        checked={isAllSelected}
                        onCheckedChange={toggleSelectAll}
                        aria-label="Select all"
                        className="cursor-pointer"
                        {...(isSomeSelected && !isAllSelected ? { "data-state": "indeterminate" } : {})}
                      />
                    </TableHead>
                    <TableHead className="font-semibold text-stone-700">Name</TableHead>
                    <TableHead className="font-semibold text-stone-700">Email</TableHead>
                    <TableHead className="font-semibold text-stone-700 hidden sm:table-cell">Source</TableHead>
                    <TableHead className="font-semibold text-stone-700 hidden md:table-cell">Risk Level</TableHead>
                    <TableHead className="font-semibold text-stone-700 hidden lg:table-cell">Conditions</TableHead>
                    <TableHead className="font-semibold text-stone-700 hidden md:table-cell">Date</TableHead>
                    <TableHead className="font-semibold text-stone-700 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.leads.map((lead) => {
                    const key = getLeadKey(lead);
                    const isSelected = selectedIds.has(key);
                    return (
                      <TableRow
                        key={key}
                        className={`hover:bg-stone-50/50 group ${isSelected ? "bg-primary/5" : ""}`}
                      >
                        <TableCell>
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleSelect(key)}
                            aria-label={`Select ${lead.name || lead.email}`}
                            className="cursor-pointer"
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-stone-900 group-hover:text-primary transition-colors">
                              {lead.name || <span className="text-stone-400 italic">-</span>}
                            </p>
                            <div className="sm:hidden mt-1 flex gap-1 flex-wrap">
                              {getSourceBadge(lead.source)}
                              {getRiskBadge(lead.riskLevel)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-stone-700 text-sm">
                            {lead.email || <span className="text-stone-400 italic">No email</span>}
                          </p>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{getSourceBadge(lead.source)}</TableCell>
                        <TableCell className="hidden md:table-cell">{getRiskBadge(lead.riskLevel)}</TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {lead.matchedConditions && lead.matchedConditions.length > 0 ? (
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {lead.matchedConditions.slice(0, 2).map((c, i) => (
                                <Badge key={i} variant="secondary" className="text-xs bg-stone-100 text-stone-600">
                                  {c}
                                </Badge>
                              ))}
                              {lead.matchedConditions.length > 2 && (
                                <Badge variant="secondary" className="text-xs bg-stone-100 text-stone-600">
                                  +{lead.matchedConditions.length - 2} more
                                </Badge>
                              )}
                            </div>
                          ) : (
                            <span className="text-stone-400 text-sm">-</span>
                          )}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-sm text-stone-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(lead.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-1">
                            {(lead.source === "quiz" || lead.source === "benefits-waitlist") && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedLead(lead)}
                                className="text-stone-500 hover:text-primary cursor-pointer"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 0 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-stone-200">
                <p className="text-sm text-stone-500">
                  Showing {(page - 1) * limit + 1}-{Math.min(page * limit, data?.total || 0)} of{" "}
                  {data?.total || 0}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPage((p) => Math.max(1, p - 1));
                      setSelectedIds(new Set());
                    }}
                    disabled={page === 1}
                    className="cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-stone-600 px-2">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPage((p) => Math.min(totalPages, p + 1));
                      setSelectedIds(new Set());
                    }}
                    disabled={page === totalPages}
                    className="cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Lead Detail Dialog */}
      <Dialog open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Lead Details</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              {/* Name, Email & Source */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-500">Name</p>
                  <p className="font-medium text-stone-900">
                    {selectedLead.name || <span className="text-stone-400 italic">Not provided</span>}
                  </p>
                </div>
                {getSourceBadge(selectedLead.source)}
              </div>
              <div>
                <p className="text-sm text-stone-500">Email</p>
                <p className="font-medium text-stone-900">
                  {selectedLead.email || <span className="text-stone-400 italic">Not provided</span>}
                </p>
              </div>

              {/* Phone (benefits waitlist) */}
              {selectedLead.phone && (
                <div>
                  <p className="text-sm text-stone-500">Phone</p>
                  <p className="font-medium text-stone-900">{selectedLead.phone}</p>
                </div>
              )}

              {/* Message (benefits waitlist) */}
              {selectedLead.message && (
                <div>
                  <p className="text-sm text-stone-500">Message</p>
                  <p className="text-sm text-stone-800 bg-stone-50 rounded-lg p-3">{selectedLead.message}</p>
                </div>
              )}

              {/* Risk Level */}
              {selectedLead.riskLevel && (
                <div>
                  <p className="text-sm text-stone-500 mb-1">Risk Level</p>
                  {getRiskBadge(selectedLead.riskLevel)}
                </div>
              )}

              {/* Matched Conditions */}
              {selectedLead.matchedConditions && selectedLead.matchedConditions.length > 0 && (
                <div>
                  <p className="text-sm text-stone-500 mb-2">Matched Conditions</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedLead.matchedConditions.map((c: string, i: number) => (
                      <Badge key={i} className="bg-red-50 text-red-700 border border-red-200">
                        {c}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Quiz Answers */}
              {selectedLead.answers && (
                <div>
                  <p className="text-sm text-stone-500 mb-2">Quiz Answers</p>
                  <div className="bg-stone-50 rounded-lg p-4 space-y-3">
                    {Object.entries(selectedLead.answers).map(([question, answer]) => (
                      <div key={question}>
                        <p className="text-xs font-medium text-stone-500 uppercase tracking-wide">{question}</p>
                        <p className="text-sm text-stone-800 mt-0.5">{answer as string}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Date */}
              <div>
                <p className="text-sm text-stone-500">Submitted</p>
                <p className="text-sm text-stone-700">
                  {new Date(selectedLead.createdAt).toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {selectedIds.size} lead(s)?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The selected leads will be permanently removed from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
            >
              {deleteMutation.isPending ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 mr-1" />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-4 flex items-center gap-3">
      <div className="p-2 bg-stone-50 rounded-lg">{icon}</div>
      <div>
        <p className="text-2xl font-semibold text-stone-900">{value}</p>
        <p className="text-xs text-stone-500">{label}</p>
      </div>
    </div>
  );
}
