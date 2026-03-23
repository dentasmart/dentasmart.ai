import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { trackEvent } from "@/lib/analytics";
import { Loader2, CheckCircle2 } from "lucide-react";

interface AndroidEarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AndroidEarlyAccessModal({ isOpen, onClose }: AndroidEarlyAccessModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successName, setSuccessName] = useState("");

  const joinWaitlist = trpc.waitlist.joinAndroid.useMutation();

  // Auto-close success screen after 5 seconds
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        onClose();
        setName("");
        setEmail("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await joinWaitlist.mutateAsync({
        name: name.trim(),
        email: email.trim(),
      });

      // Show success screen instead of toast
      setSuccessName(name.trim());
      setShowSuccess(true);
      trackEvent("android_waitlist_submit", { source: "modal" });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error("Waitlist submission failed:", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] overflow-hidden">
        {/* Success Screen */}
        {showSuccess && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary/85 flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
            <div className="text-center space-y-4 animate-in zoom-in duration-700 delay-200">
              <div className="flex justify-center">
                <CheckCircle2 className="w-16 h-16 text-white animate-in bounce duration-700 delay-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">You're In!</h2>
              <p className="text-white/90 text-sm">
                Thanks {successName}! We'll notify you as soon as DentaSmart launches on Android.
              </p>
              <p className="text-white/70 text-xs pt-2">Redirecting in 5 seconds...</p>
            </div>
          </div>
        )}

        {/* Form Screen */}
        {!showSuccess && (
          <>
            <DialogHeader>
              <DialogTitle>Join Android Early Access</DialogTitle>
              <DialogDescription>
                Be the first to know when DentaSmart launches on Android.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Your name" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
