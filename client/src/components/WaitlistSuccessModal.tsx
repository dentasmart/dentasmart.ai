import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { Link } from "wouter";

interface WaitlistSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  email?: string;
  autoCloseSecs?: number;
}



export function WaitlistSuccessModal({
  isOpen,
  onClose,
  name,
  email,
  autoCloseSecs = 10,
}: WaitlistSuccessModalProps) {
  const [countdown, setCountdown] = useState(autoCloseSecs);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(autoCloseSecs);
      return;
    }
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, autoCloseSecs, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden border-0 max-w-md w-full rounded-3xl shadow-2xl bg-white">
        {/* Visually hidden title for screen reader accessibility */}
        <DialogTitle className="sr-only">DentaSmart Download</DialogTitle>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top gradient banner */}
        <div className="relative bg-gradient-to-br from-[#0ABFBC] to-[#0891B2] px-8 pt-10 pb-16 text-center overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-12 -left-8 w-48 h-48 rounded-full bg-white/10" />
          <div className="absolute top-4 left-8 w-16 h-16 rounded-full bg-white/5" />

          {/* Animated checkmark icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            className="relative z-10 mx-auto mb-4 w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg"
          >
            <motion.svg
              viewBox="0 0 40 40"
              className="w-10 h-10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.path
                d="M8 20 L17 29 L32 12"
                stroke="#0ABFBC"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
            </motion.svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative z-10"
          >
            <h2 className="text-2xl font-bold text-white mb-1">
              DentaSmart is ready{name ? `, ${name.split(" ")[0]}` : ""}!
            </h2>
            <p className="text-white/85 text-sm">
              Download the app on iOS or Android to get started.
            </p>
          </motion.div>
        </div>

        {/* White card body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="px-8 pt-6 pb-8 -mt-6 relative z-10 bg-white rounded-t-3xl"
        >
          {/* What's next */}
          <div className="space-y-3 mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 text-center">
              DentaSmart is available now
            </p>
            <Link
              href="/download/"
              className="block"
              onClick={() => trackEvent("download_page_view", { source: "waitlist_success_modal" })}
            >
              <div className="flex items-center justify-center gap-3 bg-primary text-white rounded-xl py-3.5 px-6 hover:bg-primary/90 transition-colors">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white flex-shrink-0">
                  <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.18l5.6 3.5L12 11.18 6.4 7.68 12 4.18zM6 9.06l5 3.12v6.26l-5-3.12V9.06zm8 9.38v-6.26l5-3.12v6.26l-5 3.12z"/>
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-white/70 leading-none">Available on iOS & Android</p>
                  <p className="text-base font-semibold leading-tight">Download DentaSmart</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Auto-close countdown */}
          <div className="flex items-center justify-center gap-2">
            <div className="relative w-6 h-6">
              <svg viewBox="0 0 24 24" className="w-6 h-6 -rotate-90">
                <circle cx="12" cy="12" r="10" fill="none" stroke="#e5e7eb" strokeWidth="2" />
                <motion.circle
                  cx="12" cy="12" r="10"
                  fill="none"
                  stroke="#0ABFBC"
                  strokeWidth="2"
                  strokeDasharray={`${2 * Math.PI * 10}`}
                  strokeDashoffset={`${2 * Math.PI * 10 * (1 - countdown / autoCloseSecs)}`}
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-xs text-gray-400">
              Closing in {countdown}s
            </p>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
