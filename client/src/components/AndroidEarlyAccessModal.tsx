import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { trackEvent } from "@/lib/analytics";
import { Loader2 } from "lucide-react";

interface AndroidEarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AndroidEarlyAccessModal({ isOpen, onClose }: AndroidEarlyAccessModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const joinWaitlist = trpc.waitlist.joinAndroid.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await joinWaitlist.mutateAsync({
        name: name.trim(),
        email: email.trim(),
      });

      if (result.alreadyExists) {
        toast.info("You're already on the list! We'll notify you when the Android app is ready.");
      } else {
        toast.success("Thanks for joining! We'll notify you when the Android app is ready.");
      }

      trackEvent("android_waitlist_submit", { source: "modal" });
      onClose();
      setName("");
      setEmail("");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error("Waitlist submission failed:", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
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
      </DialogContent>
    </Dialog>
  );
}
