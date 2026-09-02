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

  // Fetch run history
  const { data: runs, isLoading: runsLoading, refetch: refetchRuns } = trpc.blog.agentListRuns.useQuery();

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
            Published
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
            onClick={() => triggerMutation.mutate()}
            disabled={isGenerating || triggerMutation.isPending}
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
                  The agent can generate a draft, but it cannot publish an article.
                </p>
              </div>

              <div className="flex items-start justify-between gap-4 bg-amber-50 rounded-lg px-4 py-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-stone-900">Drafts require manual review</p>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Review each draft in the editor and use the existing manual publication control only after the required checks are complete.
                  </p>
                </div>
                <Badge className="bg-amber-100 text-amber-800 border-0 whitespace-nowrap">Draft-only</Badge>
              </div>

              {/* Scheduling info */}
              <div className="flex items-start gap-2.5 bg-blue-50 rounded-lg px-4 py-3">
                <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800 font-medium">Scheduling is managed externally</p>
                  <p className="text-xs text-blue-600 mt-0.5">
                    Automated runs are triggered by Manus Scheduled Tasks. To change the schedule (day, time, frequency), update it in your Manus Scheduled Tasks settings.
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
              { step: "1", title: "Research", desc: "Identifies trending dental topics, keyword gaps, and competitor angles" },
              { step: "2", title: "Outline", desc: "Creates a tight outline with H2s, H3s, FAQ section, and CTA placement" },
              { step: "3", title: "Write & Humanize", desc: "Drafts 1,500-2,000 words in a human voice with SEO/AEO/GEO formatting" },
              { step: "4", title: "SEO & Save", desc: "Fills meta title, description, slug, and category, then saves a draft for manual review" },
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
