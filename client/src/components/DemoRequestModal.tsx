import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { trackEvent } from "@/lib/analytics";

interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoRequestModal({ isOpen, onClose }: DemoRequestModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    employeeCount: "",
    notes: ""
  });

  const joinBenefits = trpc.waitlist.joinBenefits.useMutation({
    onSuccess: () => {
      setIsSubmitting(false);
      setIsSuccess(true);
      trackEvent("employer_demo_request", { source: "employers_page" });
    },
    onError: () => {
      setIsSubmitting(false);
      setSubmitError("We could not send your demo request. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const message = [
      "Employer demo request",
      `Total employees: ${formData.employeeCount.trim()}`,
      formData.notes.trim() ? `Notes: ${formData.notes.trim()}` : "",
    ].filter(Boolean).join("\n");

    joinBenefits.mutate({
      name: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || undefined,
      message,
    });
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSuccess(false);
      setSubmitError(null);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        employeeCount: "",
        notes: ""
      });
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-white p-0 overflow-hidden border-0 shadow-2xl">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 md:p-8"
            >
              <DialogHeader className="mb-6 text-left">
                <DialogTitle className="text-2xl md:text-3xl font-normal text-stone-900 mb-2">
                  See DentaSmart in Action
                </DialogTitle>
                <DialogDescription className="text-stone-600 text-base">
                  Fill out the form below to schedule a personalized demo. We will discuss service access, eligibility, implementation questions, support, privacy responsibilities, and success measures.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-stone-700 font-medium">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    required
                    placeholder="John Doe"
                    className="bg-stone-50 border-stone-200 focus:border-primary focus:ring-primary/20 transition-all"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-stone-700 font-medium">
                      Work Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="john@company.com"
                      className="bg-stone-50 border-stone-200 focus:border-primary focus:ring-primary/20 transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-stone-700 font-medium">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="(555) 123-4567"
                      className="bg-stone-50 border-stone-200 focus:border-primary focus:ring-primary/20 transition-all"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeCount" className="text-stone-700 font-medium">
                    Total Employees <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="employeeCount"
                    type="number"
                    required
                    placeholder="e.g. 500"
                    className="bg-stone-50 border-stone-200 focus:border-primary focus:ring-primary/20 transition-all"
                    value={formData.employeeCount}
                    onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-stone-700 font-medium">
                    Anything specific you would like to see?
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Tell us about your current questions..."
                    className="bg-stone-50 border-stone-200 focus:border-primary focus:ring-primary/20 transition-all min-h-[100px] resize-none"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || joinBenefits.isPending}
                  className="w-full bg-action hover:bg-action-hover text-action-foreground rounded-full py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 mt-2 cursor-pointer"
                >
                  {isSubmitting || joinBenefits.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending Request...
                    </>
                  ) : (
                    "Schedule My Demo"
                  )}
                </Button>
                {submitError && (
                  <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    <p>{submitError}</p>
                    <Button type="button" variant="link" className="mt-1 h-auto p-0 text-red-800 underline" onClick={() => setSubmitError(null)}>
                      Try Again
                    </Button>
                  </div>
                )}
                <p className="text-xs text-center text-stone-400 mt-4">
                  We respect your privacy. Your information is shared with our sales team to respond to this request.
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-medium text-stone-900 mb-4">Request Received!</h3>
              <p className="text-stone-600 mb-8 leading-relaxed">
                Thanks for your interest, {formData.fullName.split(' ')[0]}. <br />
                Our team will be in touch shortly to schedule your demo.
              </p>
              <Button
                onClick={handleClose}
                className="bg-stone-900 text-white hover:bg-stone-800 rounded-full px-8 py-6"
              >
                Back to Website
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
