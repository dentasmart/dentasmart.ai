import { useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { getCmsDraftDeletePolicy, type CmsDraftDeleteCandidate } from "@shared/cmsDraftDeletePolicy";
import type { CmsHubId } from "@shared/cmsHubRegistry";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hubId: CmsHubId;
  slug: string;
  title: string;
  candidate: CmsDraftDeleteCandidate;
  onDeleted: () => void;
}

export default function CmsDeleteDraftDialog({ open, onOpenChange, hubId, slug, title, candidate, onDeleted }: Props) {
  const [typed, setTyped] = useState("");
  const [error, setError] = useState("");
  const mutation = trpc.cms.deleteDraft.useMutation();
  const policy = getCmsDraftDeletePolicy(candidate);
  const close = (value: boolean) => {
    if (mutation.isPending) return;
    if (!value) { setTyped(""); setError(""); }
    onOpenChange(value);
  };
  const submit = async () => {
    if (!policy.allowed || typed !== "DELETE" || mutation.isPending) return;
    setError("");
    try {
      await mutation.mutateAsync({ hubId, slug, expectedRevision: candidate.revision });
      setTyped("");
      onOpenChange(false);
      onDeleted();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete this draft.");
    }
  };
  return <Dialog open={open} onOpenChange={close}>
    <DialogContent className="max-w-lg">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-red-800">
          <Trash2 className="h-5 w-5"/>{policy.label}?
        </DialogTitle>
        <DialogDescription>Confirm which saved content will be removed from this isolated CMS test database.</DialogDescription>
      </DialogHeader>
      <div className="space-y-3 text-sm">
        <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
          <p className="font-semibold text-stone-900">{title}</p>
          <p className="mt-1 break-all text-xs text-stone-600">{hubId} / {slug} · Revision {candidate.revision}</p>
        </div>
        <div className="flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-amber-900">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0"/>
          <p>{policy.explanation} Existing production website content will not be changed.</p>
        </div>
        {policy.allowed && <div className="space-y-1">
          <label htmlFor="cms-delete-confirm" className="font-medium text-stone-800">
            Type <strong>DELETE</strong> to confirm
          </label>
          <Input id="cms-delete-confirm" autoComplete="off" value={typed}
            onChange={event => setTyped(event.target.value)} placeholder="DELETE" />
        </div>}
        {error && <p role="alert" className="rounded-md bg-red-50 p-2 text-xs text-red-800">{error}</p>}
        <div className="flex flex-wrap justify-end gap-2 pt-2">
          <Button type="button" variant="outline" disabled={mutation.isPending} onClick={() => close(false)}>Cancel</Button>
          <Button type="button" variant="destructive" disabled={!policy.allowed || typed !== "DELETE" || mutation.isPending}
            onClick={submit}><Trash2 className="mr-2 h-4 w-4"/>{mutation.isPending ? "Deleting…" : policy.label}</Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>;
}
