import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
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
  Bot,
  Play,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  ExternalLink,
  RefreshCw,
  Settings2,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/AdminLayout";

export default function AdminAIBlogAgent() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [candidateId, setCandidateId] = useState("");

  // Fetch run history
  const { data: runs, isLoading: runsLoading, refetch: refetchRuns } = trpc.blog.agentListRuns.useQuery();
  const { data: governance, isLoading: governanceLoading, isError: governanceError } = trpc.governance.snapshot.useQuery(undefined, { retry: false });
  const approvedCandidates = governance?.candidates.filter((candidate) => candidate.status === "APPROVED" && candidate.approvalState === "APPROVED") ?? [];

  // Manual trigger mutation
  const triggerMutation = trpc.blog.agentTrigger.useMutation({
    onMutate: () => {
      setIsGenerating(true);
    },
    onSuccess: (result) => {
      setIsGenerating(false);
      if (result.success) {
        toast.success(`Draft created: "${result.title}"`);
      } else {
        toast.error(`Generation failed: ${result.error}`);
      }
      refetchRuns();
    },
    onError: (err) => {
      setIsGenerating(false);
      toast.error(`Agent error: ${err.message}`);
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge className="bg-green-100 text-green-700 border-0 gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Completed
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-amber-100 text-amber-700 border-0 gap-1">
            <FileText className="w-3 h-3" />
            Draft
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-700 border-0 gap-1">
            <XCircle className="w-3 h-3" />
            Failed
          </Badge>
        );
      case "running":
        return (
          <Badge className="bg-blue-100 text-blue-700 border-0 gap-1">
            <Loader2 className="w-3 h-3 animate-spin" />
            Running
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <AdminLayout activeId="ai-blog-agent">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-stone-900 flex items-center gap-2">
              <Bot className="w-6 h-6 text-primary" />
              AI Blog Agent
            </h1>
            <p className="text-sm text-stone-500 mt-1">
              Generates SEO-optimized blog posts for the Oral Health Hub.
            </p>
          </div>
          <Button
            onClick={() => triggerMutation.mutate({ candidateId: Number(candidateId) })}
            disabled={isGenerating || triggerMutation.isPending || !candidateId || governanceLoading || governanceError}
            className="bg-primary hover:bg-primary/90 text-white cursor-pointer gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Generate Now
              </>
            )}
          </Button>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
          <label htmlFor="governance-candidate" className="block text-sm font-semibold text-stone-900">Approved content candidate</label>
          <p className="mt-1 text-sm text-stone-600">The agent can run only from a candidate with a documented owner, claim and source context, canonical plan, internal-link plan, required reviewers, and approval state.</p>
          {governanceError ? (
            <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">Governance candidates are unavailable until the reviewed governance migration is applied. No agent run can begin.</p>
          ) : (
            <select
              id="governance-candidate"
              value={candidateId}
              onChange={(event) => setCandidateId(event.target.value)}
              disabled={governanceLoading || approvedCandidates.length === 0}
              className="mt-3 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">{governanceLoading ? "Loading approved candidates…" : approvedCandidates.length === 0 ? "No approved governance candidates available" : "Select an approved candidate"}</option>
              {approvedCandidates.map((candidate) => (
                <option key={candidate.id} value={candidate.id}>{candidate.workingQuestion}</option>
              ))}
            </select>
          )}
        </div>

        {/* Publication safeguards */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Settings2 className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-base font-semibold text-stone-900 mb-1">Publication safeguards</h2>
                <p className="text-sm text-stone-600">
                  The agent can generate a governed draft, but it cannot publish an article.
                </p>
              </div>

              <div className="flex items-start justify-between gap-4 bg-amber-50 rounded-lg px-4 py-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-stone-900">Drafts require manual review</p>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Review each draft in the editor. Candidate approval does not replace editorial, clinical, product, business, legal, privacy, or manual publication review.
                  </p>
                </div>
                <Badge className="bg-amber-100 text-amber-800 border-0 whitespace-nowrap">Draft-only</Badge>
              </div>

              {/* Scheduling info */}
              <div className="flex items-start gap-2.5 bg-blue-50 rounded-lg px-4 py-3">
                <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800 font-medium">Recurring runs are disabled</p>
                  <p className="text-xs text-blue-600 mt-0.5">
                    This agent accepts only a manual run tied to an approved governance candidate. Future recurring operation needs separate authorization and schedule design.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
          <h2 className="text-base font-semibold text-stone-900 mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: "1", title: "Select", desc: "Choose an approved candidate with one documented intent owner and evidence context" },
              { step: "2", title: "Constrain", desc: "Loads only the candidate’s approved claims, verified sources, canonical plan, and link plan" },
              { step: "3", title: "Draft", desc: "Creates an educational HTML draft and metadata for human review" },
              { step: "4", title: "Validate & Save", desc: "Records validation and saves a draft only. It cannot publish, schedule, redirect, or change SEO settings" },
            ].map((item) => (
              <div key={item.step} className="relative p-4 bg-stone-50 rounded-xl">
                <div className="text-3xl font-bold text-primary/20 absolute top-2 right-3">{item.step}</div>
                <h3 className="text-sm font-semibold text-stone-900 mb-1">{item.title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Run History */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
            <h2 className="text-base font-semibold text-stone-900">Run History</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetchRuns()}
              disabled={runsLoading}
              className="cursor-pointer border-stone-200"
            >
              <RefreshCw className={`w-4 h-4 mr-1.5 ${runsLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {runsLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="ml-2 text-stone-500 text-sm">Loading history...</span>
            </div>
          ) : !runs || runs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Bot className="w-12 h-12 text-stone-300" />
              <p className="text-stone-500 font-medium">No runs yet</p>
              <p className="text-stone-400 text-sm">Click "Generate Now" to create your first AI-written article.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-stone-50/50">
                  <TableHead className="font-semibold text-stone-700">Date</TableHead>
                  <TableHead className="font-semibold text-stone-700">Title</TableHead>
                  <TableHead className="font-semibold text-stone-700">Keyword</TableHead>
                  <TableHead className="font-semibold text-stone-700">Candidate</TableHead>
                  <TableHead className="font-semibold text-stone-700">Status</TableHead>
                  <TableHead className="font-semibold text-stone-700 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {runs.map((run) => (
                  <TableRow key={run.id} className="hover:bg-stone-50/50">
                    <TableCell className="text-sm text-stone-600 whitespace-nowrap">
                      {new Date(run.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-stone-900 line-clamp-1 text-sm">{run.title || " - "}</p>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-mono text-stone-500 bg-stone-50 px-2 py-1 rounded">
                        {run.primaryKeyword || " - "}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-stone-600">{run.governanceCandidateId ?? "Legacy run"}</TableCell>
                    <TableCell>{getStatusBadge(run.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        {run.slug && run.status === "success" && (
                          <a
                            href={`/oral-health-hub/${run.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-stone-500 hover:text-primary cursor-pointer h-8"
                              title="View live article"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </a>
                        )}
                        {run.postId && (
                          <a href={`/admin/edit/${run.postId}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-stone-500 hover:text-primary cursor-pointer h-8"
                              title="Edit article"
                            >
                              <FileText className="w-4 h-4" />
                            </Button>
                          </a>
                        )}
                        {run.status === "failed" && run.error && (
                          <span className="text-xs text-red-500 max-w-[200px] truncate" title={run.error}>
                            {run.error}
                          </span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
