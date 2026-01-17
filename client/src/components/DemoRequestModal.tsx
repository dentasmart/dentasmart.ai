import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoRequestModal({ isOpen, onClose }: DemoRequestModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    employeeCount: "",
    notes: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real app, this would send data to sales@dentasmart.ai
    console.log("Form submitted:", formData);
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleClose = () => {
    onClose();
    // Reset form after closing animation
    setTimeout(() => {
      setIsSuccess(false);
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
                  Fill out the form below to schedule a personalized demo. We'll show you how to improve employee oral health while saving an estimated 75% on costs.
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
                    Anything specific you'd like to see?
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Tell us about your current challenges..."
                    className="bg-stone-50 border-stone-200 focus:border-primary focus:ring-primary/20 transition-all min-h-[100px] resize-none"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 mt-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending Request...
                    </>
                  ) : (
                    "Schedule My Demo"
                  )}
                </Button>
                
                <p className="text-xs text-center text-stone-400 mt-4">
                  We respect your privacy. Your information is sent securely to our sales team.
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
                Thanks for your interest, {formData.fullName.split(' ')[0]}. <br/>
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
