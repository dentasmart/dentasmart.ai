import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Database, FileCheck2, Layers3, ShieldCheck } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

type Tab = "owners" | "claims" | "sources" | "candidates" | "approvals";

const tabs: readonly { id: Tab; label: string }[] = [
  { id: "owners", label: "Intent Owners" },
  { id: "claims", label: "Claims" },
  { id: "sources", label: "Sources" },
  { id: "candidates", label: "Candidates" },
  { id: "approvals", label: "Approvals" },
];

function DataUnavailable({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
      <div className="flex gap-2">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        <p>{message}</p>
      </div>
    </div>
  );
}

export default function AdminGovernance() {
  const [activeTab, setActiveTab] = useState<Tab>("owners");
  const utils = trpc.useUtils();
  const owners = trpc.governance.listIntentOwners.useQuery();
  const snapshot = trpc.governance.snapshot.useQuery(undefined, { retry: false });
  const seed = trpc.governance.seedApprovedBoundaries.useMutation({
    onSuccess: async () => {
      await utils.governance.snapshot.invalidate();
    },
  });

  const counts = useMemo(() => ({
    owners: owners.data?.length ?? 0,
    claims: snapshot.data?.claims.length ?? 0,
    sources: snapshot.data?.sources.length ?? 0,
    candidates: snapshot.data?.candidates.length ?? 0,
    approvals: snapshot.data?.approvals.length ?? 0,
  }), [owners.data, snapshot.data]);

  const renderTab = () => {
    if (activeTab === "owners") {
      if (owners.isError) return <DataUnavailable message="Intent ownership could not be loaded. Verify the admin session and server availability." />;
      return (
        <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
          <table className="min-w-[920px] w-full text-left text-sm">
            <thead className="border-b border-stone-200 bg-stone-50 text-xs uppercase tracking-wide text-stone-500">
              <tr>
                <th className="px-4 py-3">Intent</th>
                <th className="px-4 py-3">Primary owner</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Stage</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Support</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {owners.data?.map((owner) => (
                <tr key={owner.intentId}>
                  <td className="px-4 py-3 font-medium text-stone-900">
                    <div>{owner.intentName}</div>
                    <div className="mt-0.5 text-xs text-stone-500">{owner.queryFamily}</div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-stone-700">{owner.primaryRoute}</td>
                  <td className="px-4 py-3 text-stone-700">{owner.ownerRole.replaceAll("_", " ")}</td>
                  <td className="px-4 py-3 text-stone-700">{owner.funnelStage}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-stone-100 px-2 py-1 text-xs font-medium text-stone-700">{owner.governanceStatus.replaceAll("_", " ")}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-stone-600">{owner.supportingRoutes.join(", ") || "None"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (snapshot.isError) {
      return <DataUnavailable message="The governance database tables are unavailable until the reviewed migration is applied. No migration has been run from this workspace." />;
    }

    if (activeTab === "claims") {
      return (
        <div className="space-y-3">
          {snapshot.data?.claims.map((claim) => (
            <article key={claim.id} className="rounded-xl border border-stone-200 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-stone-900">{claim.claimKey}</p>
                  <p className="mt-1 text-sm text-stone-600">{claim.approvedWording}</p>
                </div>
                <div className="flex gap-2 text-xs font-medium">
                  <span className="rounded-full bg-stone-100 px-2 py-1 text-stone-700">{claim.status}</span>
                  <span className="rounded-full bg-stone-100 px-2 py-1 text-stone-700">{claim.riskLevel}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      );
    }

    if (activeTab === "sources") {
      return (
        <div className="space-y-3">
          {snapshot.data?.sources.map((source) => (
            <article key={source.id} className="rounded-xl border border-stone-200 bg-white p-4">
              <p className="font-medium text-stone-900">{source.title}</p>
              <p className="mt-1 text-sm text-stone-600">{source.publisher ?? "No publisher recorded"} · {source.verificationStatus}</p>
              <p className="mt-2 font-mono text-xs text-stone-500">{source.location}</p>
            </article>
          ))}
        </div>
      );
    }

    if (activeTab === "candidates") {
      return (
        <div className="space-y-3">
          {snapshot.data?.candidates.map((candidate) => (
            <article key={candidate.id} className="rounded-xl border border-stone-200 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-stone-900">{candidate.workingQuestion}</p>
                  <p className="mt-1 text-sm text-stone-600">{candidate.intentOwnerId} · {candidate.decision} · overlap {candidate.overlapScoreTotal}</p>
                </div>
                <span className="rounded-full bg-stone-100 px-2 py-1 text-xs font-medium text-stone-700">{candidate.approvalState}</span>
              </div>
              {candidate.blocker && <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">{candidate.blocker}</p>}
            </article>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {snapshot.data?.approvals.map((approval) => (
          <article key={approval.id} className="rounded-xl border border-stone-200 bg-white p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium text-stone-900">{approval.contentKey}</p>
                <p className="mt-1 font-mono text-xs text-stone-500">{approval.contentVersionHash}</p>
              </div>
              <span className="rounded-full bg-stone-100 px-2 py-1 text-xs font-medium text-stone-700">{approval.publicationState}</span>
            </div>
            <p className="mt-3 text-sm text-stone-600">Editorial: {approval.editorialDecision} · Clinical: {approval.clinicalDecision} · Product: {approval.productBusinessDecision} · Legal/privacy: {approval.legalPrivacyDecision}</p>
          </article>
        ))}
      </div>
    );
  };

  return (
    <AdminLayout activeId="governance">
      <section className="space-y-6">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <p className="text-sm font-medium text-primary">Internal control plane</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-stone-950">Content Governance</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600">Manage governed content evidence after the approved migration. This workspace does not publish content, register public URLs, alter sitemap output, issue redirects, or make clinical claims.</p>
          </div>
          <Button onClick={() => seed.mutate()} disabled={seed.isPending} className="shrink-0">
            <Database className="mr-2 h-4 w-4" />
            {seed.isPending ? "Seeding approved boundaries…" : "Seed approved boundaries"}
          </Button>
        </header>

        {seed.isError && <DataUnavailable message="Approved-boundary seeding was not completed. Confirm that the reviewed governance migration has been applied before retrying." />}
        {seed.isSuccess && (
          <div className="flex gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <p>Approved boundaries were synchronized from the source-controlled registry. Existing public content was not modified.</p>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {[
            { label: "Intent owners", value: counts.owners, icon: Layers3 },
            { label: "Claims", value: counts.claims, icon: ShieldCheck },
            { label: "Sources", value: counts.sources, icon: FileCheck2 },
            { label: "Candidates", value: counts.candidates, icon: AlertTriangle },
            { label: "Approvals", value: counts.approvals, icon: CheckCircle2 },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-xl border border-stone-200 bg-white p-4">
              <Icon className="h-4 w-4 text-primary" />
              <p className="mt-3 text-2xl font-semibold text-stone-950">{value}</p>
              <p className="text-xs text-stone-500">{label}</p>
            </div>
          ))}
        </div>

        <nav className="flex flex-wrap gap-2 border-b border-stone-200 pb-4" aria-label="Content Governance sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${activeTab === tab.id ? "bg-primary text-white" : "bg-white text-stone-600 hover:bg-stone-100"}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {renderTab()}
      </section>
    </AdminLayout>
  );
}
