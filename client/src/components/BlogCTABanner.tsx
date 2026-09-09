import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useLocation } from "wouter";

/**
 * BlogCTABanner: Floating bottom banner that appears at 25% scroll on blog/content pages.
 * - Tracks mid_content_cta_click events
 * - Links directly to app store (not scroll-to-download which may not exist on all pages)
 * - Dismissible per session
 */
export function BlogCTABanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Calculate scroll percentage
      const scrollPercentage =
        (scrollPosition / (documentHeight - windowHeight)) * 100;

      // Show at 25% scroll
      if (scrollPercentage > 25) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  if (isDismissed) return null;

  const handleCTAClick = () => {
    trackEvent("mid_content_cta_click", {
      source: location,
      label: "blog_floating_banner",
    });
    window.location.href = "/download/";
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="bg-stone-900 text-white rounded-2xl shadow-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 relative border border-stone-800">
              <button
                onClick={() => setIsDismissed(true)}
                className="absolute top-2 right-2 md:top-4 md:right-4 text-stone-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close banner"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center md:text-left pr-8">
                <h3 className="text-lg md:text-xl font-medium mb-1 text-white">
                  Start with a Free Quick Check
                </h3>
                <p className="text-stone-400 text-sm hidden md:block">
                  Use mouth photos from your phone. No X-ray required. Paid X-ray analysis is available separately.
                </p>
              </div>

              <Button
                onClick={handleCTAClick}
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-6 text-base font-medium shadow-lg whitespace-nowrap w-full md:w-auto cursor-pointer"
              >
                Start Free Quick Check
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
