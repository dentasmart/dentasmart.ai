import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface WaitlistSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  email: string;
  autoCloseSecs?: number;
}

const IOS_URL = "https://apps.apple.com/app/dentasmart/id6450970558";
const ANDROID_URL = "https://play.google.com/store/apps/details?id=com.dentasmart.app";

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
        <DialogTitle className="sr-only">Android Waitlist Confirmation</DialogTitle>
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
              You're on the list{name ? `, ${name.split(" ")[0]}` : ""}!
            </h2>
            <p className="text-white/85 text-sm">
              We'll notify you the moment DentaSmart hits Android.
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
          {/* Confirmation detail */}
          <div className="bg-gray-50 rounded-2xl px-5 py-4 mb-6 text-center">
            <p className="text-xs text-gray-500 mb-1">Confirmation sent to</p>
            <p className="text-sm font-semibold text-gray-800 truncate">{email}</p>
          </div>

          {/* What's next */}
          <div className="space-y-3 mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 text-center">
              While you wait — try DentaSmart on iOS
            </p>
            <div className="flex gap-3">
              <a
                href={IOS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <div className="flex items-center justify-center gap-2 bg-black text-white rounded-xl py-3 px-4 hover:bg-gray-900 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] text-white/70 leading-none">Download on the</p>
                    <p className="text-sm font-semibold leading-tight">App Store</p>
                  </div>
                </div>
              </a>
              <a
                href={ANDROID_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <div className="flex items-center justify-center gap-2 border-2 border-[#0ABFBC] text-[#0ABFBC] rounded-xl py-3 px-4 hover:bg-[#0ABFBC]/5 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#0ABFBC] flex-shrink-0">
                    <path d="M17.523 15.341l1.505-2.608a.3.3 0 0 0-.109-.41l-1.527-.882a5.86 5.86 0 0 0-.601-1.04l.611-1.726a.3.3 0 0 0-.19-.383l-1.67-.497a5.9 5.9 0 0 0-.958-.554l-.17-1.786a.3.3 0 0 0-.3-.272h-1.73a.3.3 0 0 0-.3.272l-.17 1.786a5.9 5.9 0 0 0-.958.554l-1.67.497a.3.3 0 0 0-.19.383l.611 1.726a5.86 5.86 0 0 0-.601 1.04l-1.527.882a.3.3 0 0 0-.109.41l1.505 2.608a.3.3 0 0 0 .41.109l1.527-.882c.319.228.66.424 1.02.584l.17 1.786a.3.3 0 0 0 .3.272h1.73a.3.3 0 0 0 .3-.272l.17-1.786c.36-.16.701-.356 1.02-.584l1.527.882a.3.3 0 0 0 .41-.109zM12 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] text-[#0ABFBC]/70 leading-none">Early Access on</p>
                    <p className="text-sm font-semibold leading-tight">Play Store</p>
                  </div>
                </div>
              </a>
            </div>
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
