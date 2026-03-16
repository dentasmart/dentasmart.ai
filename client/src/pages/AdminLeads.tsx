import { useState, useMemo } from "react";
import { useLocation, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Search,
  LogOut,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Download,
  Users,
  Smartphone,
  ClipboardCheck,
  AlertTriangle,
  Mail,
  ArrowLeft,
  Eye,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";

export default function AdminLeads() {
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("all");
  const [riskLevel, setRiskLevel] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const limit = 20;

  // Auth check
  const { data: admin, isLoading: authLoading } = trpc.blog.adminMe.useQuery();
  const logoutMutation = trpc.blog.adminLogout.useMutation({
    onSuccess: () => setLocation("/admin/login"),
  });

  // Leads data
  const { data, isLoading } = trpc.leads.list.useQuery({
    source: source !== "all" ? (source as "quiz" | "android-waitlist") : undefined,
    riskLevel: riskLevel !== "all" ? (riskLevel as "low" | "moderate" | "high") : undefined,
    search: search || undefined,
    page,
    limit,
  });

  // Stats
  const { data: stats } = trpc.leads.stats.useQuery();

  // CSV export
  const exportQuery = trpc.leads.exportCsv.useQuery(
    {
      source: source !== "all" ? (source as "quiz" | "android-waitlist") : undefined,
      riskLevel: riskLevel !== "all" ? (riskLevel as "low" | "moderate" | "high") : undefined,
      search: search || undefined,
    },
    { enabled: false }
  );

  const handleExport = async () => {
    try {
      const result = await exportQuery.refetch();
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

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !admin) {
      setLocation("/admin/login");
    }
  }, [admin, authLoading, setLocation]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!admin) return null;

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
    <div className="min-h-screen bg-stone-50">
      {/* Top Navigation - matches AdminDashboard */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="DentaSmart" className="h-8" />
              <div className="hidden sm:block">
                <span className="text-stone-300 mx-2">|</span>
                <span className="text-sm font-medium text-stone-600">Leads Management</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-stone-500 hidden sm:block">
                Welcome, <span className="font-medium text-stone-700">{admin.displayName || admin.username}</span>
              </span>
              <Link href="/" target="_blank">
                <Button variant="ghost" size="sm" className="text-stone-500 hover:text-stone-700 cursor-pointer">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">View Site</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => logoutMutation.mutate()}
                className="text-stone-500 hover:text-red-600 cursor-pointer"
              >
                <LogOut className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back to Articles + Title */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/admin")}
              className="text-stone-500 hover:text-stone-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Articles
            </Button>
            <h1 className="text-2xl font-semibold text-stone-900">Leads Management</h1>
          </div>
          <Button
            onClick={handleExport}
            disabled={exportQuery.isFetching}
            className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
          >
            {exportQuery.isFetching ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            Export CSV
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
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
              placeholder="Search by email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-10 bg-white border-stone-200"
            />
          </div>
          <Select
            value={source}
            onValueChange={(v) => {
              setSource(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-48 bg-white border-stone-200">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="quiz">Symptom Quiz</SelectItem>
              <SelectItem value="android-waitlist">Android Waitlist</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={riskLevel}
            onValueChange={(v) => {
              setRiskLevel(v);
              setPage(1);
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
                  : "Leads will appear here as users complete the symptom quiz or join the Android waitlist"}
              </p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="bg-stone-50/50">
                    <TableHead className="font-semibold text-stone-700">Email</TableHead>
                    <TableHead className="font-semibold text-stone-700">Source</TableHead>
                    <TableHead className="font-semibold text-stone-700 hidden md:table-cell">Risk Level</TableHead>
                    <TableHead className="font-semibold text-stone-700 hidden lg:table-cell">Conditions</TableHead>
                    <TableHead className="font-semibold text-stone-700 hidden md:table-cell">Date</TableHead>
                    <TableHead className="font-semibold text-stone-700 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.leads.map((lead) => (
                    <TableRow key={`${lead.source}-${lead.id}`} className="hover:bg-stone-50/50 group">
                      <TableCell>
                        <div>
                          <p className="font-medium text-stone-900 group-hover:text-primary transition-colors">
                            {lead.email || <span className="text-stone-400 italic">No email provided</span>}
                          </p>
                          <div className="md:hidden mt-1 flex gap-1 flex-wrap">
                            {getSourceBadge(lead.source)}
                            {getRiskBadge(lead.riskLevel)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getSourceBadge(lead.source)}</TableCell>
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
                        <div className="flex items-center justify-end">
                          {lead.source === "quiz" && (
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
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-stone-200">
                  <p className="text-sm text-stone-500">
                    Showing {(page - 1) * limit + 1}–{Math.min(page * limit, data?.total || 0)} of{" "}
                    {data?.total || 0}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
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
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
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
      </main>

      {/* Lead Detail Dialog */}
      <Dialog open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Lead Details</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              {/* Email & Source */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-500">Email</p>
                  <p className="font-medium text-stone-900">
                    {selectedLead.email || <span className="text-stone-400 italic">Not provided</span>}
                  </p>
                </div>
                {getSourceBadge(selectedLead.source)}
              </div>

              {/* Risk Level */}
              <div>
                <p className="text-sm text-stone-500 mb-1">Risk Level</p>
                {getRiskBadge(selectedLead.riskLevel)}
              </div>

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
    </div>
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
