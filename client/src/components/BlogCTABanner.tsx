import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function BlogCTABanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate scroll percentage
      const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;

      // Show at 25% scroll or at the end (90%+)
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
                className="absolute top-2 right-2 md:top-4 md:right-4 text-stone-400 hover:text-white transition-colors"
                aria-label="Close banner"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center md:text-left pr-8">
                <h3 className="text-lg md:text-xl font-medium mb-1 text-white">Want clarity about your own mouth?</h3>
                <p className="text-stone-400 text-sm hidden md:block">Get instant AI insights from your photos.</p>
              </div>
              
              <Button 
                onClick={() => document.getElementById('download-cta')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-6 text-base font-medium shadow-lg whitespace-nowrap w-full md:w-auto"
              >
                Get My Oral Health Score
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
