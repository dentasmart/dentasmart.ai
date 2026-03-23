import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { trackEvent } from "@/lib/analytics";
import { Loader2 } from "lucide-react";
import { WaitlistSuccessModal } from "./WaitlistSuccessModal";

interface AndroidEarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AndroidEarlyAccessModal({ isOpen, onClose }: AndroidEarlyAccessModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const joinWaitlist = trpc.waitlist.joinAndroid.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await joinWaitlist.mutateAsync({
        name: name.trim(),
        email: email.trim(),
      });

      setSubmittedName(name.trim());
      setSubmittedEmail(email.trim());
      setShowSuccess(true);
      trackEvent("android_waitlist_submit", { source: "modal" });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error("Waitlist submission failed:", err);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setName("");
    setEmail("");
    onClose();
  };

  return (
    <>
      {/* Success modal — shown after submission */}
      <WaitlistSuccessModal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        name={submittedName}
        email={submittedEmail}
      />

      {/* Sign-up form modal */}
      <Dialog open={isOpen && !showSuccess} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Join Android Early Access</DialogTitle>
            <DialogDescription>
              Be the first to know when DentaSmart launches on Android.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="modal-name">Name</Label>
              <Input
                id="modal-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="modal-email">Email</Label>
              <Input
                id="modal-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={joinWaitlist.isPending} className="w-full">
                {joinWaitlist.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Joining...
                  </>
                ) : (
                  "Join Waitlist"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
