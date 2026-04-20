import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { trackPixelLead } from "@/lib/fbpixel";

interface WaitlistPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WaitlistPopup({ isOpen, onClose }: WaitlistPopupProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const joinBenefits = trpc.waitlist.joinBenefits.useMutation({
    onSuccess: (data) => {
      setIsSubmitted(true);
      trackPixelLead({ content_name: "Benefits Waitlist", content_category: "waitlist_signup" });
      if (data.alreadyExists) {
        toast.info("You're already on the waitlist! We'll be in touch soon.");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    joinBenefits.mutate({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      message: message.trim() || undefined,
    });
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-white p-0 overflow-hidden rounded-2xl border-0 shadow-2xl">
        {!isSubmitted ? (
          <div className="p-8">
            <DialogHeader className="mb-6 text-left">
              <DialogTitle className="text-2xl font-medium text-stone-900 mb-2">
                Stop Overpaying for Dental Care.
              </DialogTitle>
              <DialogDescription className="text-stone-600 text-base">
                Join the waitlist to get exclusive access to our dental benefits membership and start saving 20-60% on procedures.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-stone-700">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="name" 
                  required 
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-lg border-stone-200 focus:border-primary focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-stone-700">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  required 
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg border-stone-200 focus:border-primary focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-stone-700">
                  Phone Number
                </Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="(555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-lg border-stone-200 focus:border-primary focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-stone-700">
                  Message (Optional)
                </Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us what you're looking for..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="rounded-lg border-stone-200 focus:border-primary focus:ring-primary/20 min-h-[80px]"
                />
              </div>

              <Button 
                type="submit" 
                disabled={joinBenefits.isPending}
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-6 text-lg font-medium transition-all duration-300 shadow-lg mt-2 cursor-pointer"
              >
                {joinBenefits.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Joining...
                  </>
                ) : (
                  "Join the Waitlist"
                )}
              </Button>
            </form>
          </div>
        ) : (
          <div className="p-12 flex flex-col items-center text-center bg-stone-50 h-full justify-center min-h-[400px]">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-medium text-stone-900 mb-3">You're on the list!</h3>
            <p className="text-stone-600 mb-8 max-w-[260px]">
              Thanks for joining. We'll notify you as soon as our benefits membership becomes available in your area.
            </p>
            <Button 
              onClick={handleClose}
              variant="outline"
              className="rounded-full px-8 border-stone-300 text-stone-700 hover:bg-white hover:text-primary cursor-pointer"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
