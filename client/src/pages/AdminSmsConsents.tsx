import { useMemo, useState } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  Loader2,
  MessageSquareText,
  Search,
  ShieldCheck,
} from "lucide-react";

const PAGE_SIZE = 25;

type SmsConsentDetail = {
  id: number;
  fullName: string | null;
  email: string | null;
  phoneE164: string;
  consentGranted: boolean;
  consentAt: Date | string;
  consentSource: string;
  sourcePath: string;
  consentWordingVersion: string;
  consentWording: string;
  privacyPolicyVersion: string;
  termsOfServiceVersion: string;
  sourceIp: string | null;
  userAgent: string | null;
  idempotencyKey: string;
  createdAt: Date | string;
};

type SmsConsentListItem = Pick<
  SmsConsentDetail,
  "id" | "fullName" | "email" | "phoneE164" | "consentGranted" | "consentAt" | "consentSource" | "createdAt"
>;

function formatDateTime(value: Date | string | null | undefined): string {
  if (!value) return "Not available";
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function consentBadge(granted: boolean) {
  return granted ? (
    <Badge className="border-0 bg-green-100 text-green-700 hover:bg-green-100">Granted</Badge>
  ) : (
    <Badge className="border-0 bg-stone-100 text-stone-700 hover:bg-stone-100">Not granted</Badge>
  );
}

function DetailItem({ label, children, mono = false }: { label: string; children: React.ReactNode; mono?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-medium uppercase tracking-wide text-stone-500">{label}</p>
      <div className={`mt-1 break-words text-sm text-stone-900 ${mono ? "font-mono text-xs" : ""}`}>{children}</div>
    </div>
  );
}

function ConsentDetails({ record }: { record: SmsConsentDetail }) {
  return (
    <div className="min-w-0 space-y-6">
      <section className="space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-stone-900">
          <MessageSquareText className="h-4 w-4 text-primary" />
          Identity
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <DetailItem label="ID">{record.id}</DetailItem>
          <DetailItem label="Phone number">{record.phoneE164}</DetailItem>
          <DetailItem label="Full name">{record.fullName || "Not provided"}</DetailItem>
          <DetailItem label="Email">{record.email || "Not provided"}</DetailItem>
        </div>
      </section>

      <section className="border-t border-stone-200 pt-5 space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-stone-900">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Consent
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <DetailItem label="Consent granted">{consentBadge(record.consentGranted)}</DetailItem>
          <DetailItem label="Consent date">{formatDateTime(record.consentAt)}</DetailItem>
          <DetailItem label="Consent source">{record.consentSource}</DetailItem>
          <DetailItem label="Source path">{record.sourcePath}</DetailItem>
        </div>
      </section>

      <section className="border-t border-stone-200 pt-5 space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-stone-900">
          <FileText className="h-4 w-4 text-primary" />
          Legal evidence
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <DetailItem label="Consent wording version">{record.consentWordingVersion}</DetailItem>
          <DetailItem label="Privacy Policy version">{record.privacyPolicyVersion}</DetailItem>
          <DetailItem label="Terms of Service version">{record.termsOfServiceVersion}</DetailItem>
        </div>
        <DetailItem label="Exact consent wording">
          <p className="break-words rounded-lg bg-stone-50 p-3 leading-6 text-stone-800">{record.consentWording}</p>
        </DetailItem>
      </section>

      <section className="border-t border-stone-200 pt-5 space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-stone-900">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Audit
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <DetailItem label="Source IP" mono>{record.sourceIp || "Not available"}</DetailItem>
          <DetailItem label="Created at">{formatDateTime(record.createdAt)}</DetailItem>
          <DetailItem label="User agent" mono>{record.userAgent || "Not available"}</DetailItem>
          <DetailItem label="Idempotency key" mono>{record.idempotencyKey}</DetailItem>
        </div>
      </section>
    </div>
  );
}

function MobileConsentCard({ record, onViewDetails }: { record: SmsConsentListItem; onViewDetails: () => void }) {
  return (
    <article className="rounded-lg border border-stone-200 bg-stone-50/50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="break-words font-medium text-stone-900">
            {record.fullName || <span className="italic text-stone-400">Not provided</span>}
          </p>
          <p className="mt-1 font-mono text-sm text-stone-700">{record.phoneE164}</p>
          {record.email && <p className="mt-1 break-words text-sm text-stone-500">{record.email}</p>}
        </div>
        {consentBadge(record.consentGranted)}
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="min-w-0">
          <dt className="text-xs font-medium uppercase tracking-wide text-stone-500">Consent date</dt>
          <dd className="mt-1 break-words text-stone-700">{formatDateTime(record.consentAt)}</dd>
        </div>
        <div className="min-w-0">
          <dt className="text-xs font-medium uppercase tracking-wide text-stone-500">Source</dt>
          <dd className="mt-1 break-words text-stone-700">{record.consentSource}</dd>
        </div>
      </dl>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-4 w-full text-stone-700 hover:text-primary"
        onClick={onViewDetails}
      >
        <Eye className="mr-1 h-4 w-4" />
        View details
      </Button>
    </article>
  );
}

export default function AdminSmsConsents() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const queryInput = useMemo(
    () => ({
      search: search.trim() || undefined,
      page,
      limit: PAGE_SIZE,
    }),
    [page, search]
  );

  const { data, isLoading, isError } = trpc.smsConsents.list.useQuery(queryInput);
  const detailsQuery = trpc.smsConsents.get.useQuery(
    { id: selectedId ?? 1 },
    { enabled: selectedId !== null }
  );

  const totalPages = Math.max(1, Math.ceil((data?.total ?? 0) / PAGE_SIZE));
  const records = data?.records ?? [];

  return (
    <AdminLayout activeId="sms-consents">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-semibold text-stone-900">
            <MessageSquareText className="h-6 w-6 text-primary" />
            SMS Consents
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Read-only records of submitted customer-care SMS consent.
          </p>
        </div>
        <Badge variant="outline" className="w-fit border-stone-200 bg-white text-stone-600">
          Immutable audit evidence
        </Badge>
      </div>

      <div className="mb-6 max-w-xl">
        <label className="sr-only" htmlFor="sms-consent-search">Search SMS consents</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <Input
            id="sms-consent-search"
            placeholder="Search full name, email, or mobile number"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            className="border-stone-200 bg-white pl-10"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div className="py-16 text-center">
            <h2 className="text-base font-medium text-stone-700">SMS consent records are unavailable right now.</h2>
            <p className="mt-1 text-sm text-stone-500">Please try again in a moment.</p>
          </div>
        ) : records.length === 0 ? (
          <div className="py-20 text-center">
            <MessageSquareText className="mx-auto mb-4 h-12 w-12 text-stone-300" />
            <h2 className="text-lg font-medium text-stone-700">No SMS consents found</h2>
            <p className="mt-1 text-sm text-stone-500">
              {search ? "Try a different name, email, or mobile number." : "Submitted consent records will appear here."}
            </p>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <Table className="min-w-[1080px]">
                <TableHeader>
                  <TableRow className="bg-stone-50/50">
                    <TableHead className="font-semibold text-stone-700">ID</TableHead>
                    <TableHead className="font-semibold text-stone-700">Full Name</TableHead>
                    <TableHead className="font-semibold text-stone-700">Email</TableHead>
                    <TableHead className="font-semibold text-stone-700">Mobile Number</TableHead>
                    <TableHead className="font-semibold text-stone-700">Consent Status</TableHead>
                    <TableHead className="font-semibold text-stone-700">Consent Date</TableHead>
                    <TableHead className="font-semibold text-stone-700">Source</TableHead>
                    <TableHead className="font-semibold text-stone-700">Created At</TableHead>
                    <TableHead className="text-right font-semibold text-stone-700">View Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record) => (
                    <TableRow key={record.id} className="group hover:bg-stone-50/50">
                      <TableCell className="font-mono text-xs text-stone-600">{record.id}</TableCell>
                      <TableCell className="font-medium text-stone-900">
                        {record.fullName || <span className="italic text-stone-400">Not provided</span>}
                      </TableCell>
                      <TableCell className="text-sm text-stone-700">
                        {record.email || <span className="italic text-stone-400">Not provided</span>}
                      </TableCell>
                      <TableCell className="font-mono text-sm text-stone-700">{record.phoneE164}</TableCell>
                      <TableCell>{consentBadge(record.consentGranted)}</TableCell>
                      <TableCell className="text-sm text-stone-600">{formatDateTime(record.consentAt)}</TableCell>
                      <TableCell className="text-sm text-stone-600">{record.consentSource}</TableCell>
                      <TableCell className="text-sm text-stone-600">{formatDateTime(record.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-stone-500 hover:text-primary"
                          onClick={() => setSelectedId(record.id)}
                        >
                          <Eye className="mr-1 h-4 w-4" />
                          View details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="grid gap-3 p-3 md:hidden">
              {records.map((record) => (
                <MobileConsentCard
                  key={record.id}
                  record={record}
                  onViewDetails={() => setSelectedId(record.id)}
                />
              ))}
            </div>

            <div className="flex flex-col gap-3 border-t border-stone-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-stone-500">
                Showing {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, data?.total ?? 0)} of {data?.total ?? 0}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="px-2 text-sm text-stone-600">Page {page} of {totalPages}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                  disabled={page >= totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      <Dialog open={selectedId !== null} onOpenChange={(open) => !open && setSelectedId(null)}>
        <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100%-1rem)] max-w-2xl overflow-x-hidden overflow-y-auto p-4 sm:w-full sm:p-6">
          <DialogHeader className="pr-8">
            <DialogTitle>SMS Consent Record</DialogTitle>
          </DialogHeader>
          {detailsQuery.isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : detailsQuery.data?.record ? (
            <ConsentDetails record={detailsQuery.data.record} />
          ) : (
            <div className="py-8 text-center text-sm text-stone-500">
              SMS consent record details are unavailable right now.
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
