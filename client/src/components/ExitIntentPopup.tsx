import { useState, useEffect, useCallback, useRef } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent, getAppStoreUrl } from "@/lib/analytics";
import { useLocation } from "wouter";

/**
 * ExitIntentPopup: Detects when a desktop user moves their cursor toward the
 * browser's close/back area (top of viewport) and shows a compelling download popup.
 *
 * - Desktop only (>= 768px)
 * - Fires once per session
 * - Does not show on admin, download, or pricing pages
 * - Tracks impressions and clicks
 * - Minimum 15 seconds on page before triggering
 */
export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [location] = useLocation();
  const hasShown = useRef(false);
  const pageLoadTime = useRef(Date.now());

  const excludedPaths = ["/admin", "/download", "/pricing", "/instant-scan"];
  const isExcluded = excludedPaths.some((p) => location.startsWith(p));

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      // Only trigger when cursor moves to the top of the viewport
      if (e.clientY > 10) return;
      // Must have been on page for at least 15 seconds
      if (Date.now() - pageLoadTime.current < 15000) return;
      if (hasShown.current) return;

      hasShown.current = true;
      setVisible(true);

      trackEvent("exit_intent_shown", {
        source: location,
      });
    },
    [location]
  );

  useEffect(() => {
    // Check if already shown this session
    try {
      if (sessionStorage.getItem("ds_exit_shown") === "1") {
        hasShown.current = true;
        return;
      }
    } catch {
      // sessionStorage not available
    }

    // Only on desktop
    if (window.innerWidth < 768) return;

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [handleMouseLeave]);

  if (dismissed || isExcluded || !visible) return null;

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem("ds_exit_shown", "1");
    } catch {
      // silently fail
    }
  };

  const handleDownload = () => {
    trackEvent("exit_intent_click", {
      source: location,
      platform: "ios",
    });
    try {
      sessionStorage.setItem("ds_exit_shown", "1");
    } catch {
      // silently fail
    }
    window.open(getAppStoreUrl("exit_intent"), "_blank", "noopener");
    setDismissed(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleDismiss}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full animate-in zoom-in-95 fade-in duration-300 overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors z-10 cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />

        <div className="p-8 text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>

          {/* Headline */}
          <h3 className="text-2xl font-semibold text-stone-900 mb-3">
            Wait, before you go...
          </h3>

          <p className="text-stone-600 mb-6 leading-relaxed">
            Get a <span className="font-semibold text-primary">free AI oral health score</span> in
            10 minutes. Just snap a photo of your teeth and find out what your
            dentist might not tell you.
          </p>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-4 mb-6 text-sm text-stone-500">
            <span className="flex items-center gap-1">
              <span className="text-yellow-500">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              4.9 rating
            </span>
            <span className="w-1 h-1 rounded-full bg-stone-300" />
            <span>50K+ scans</span>
          </div>

          {/* CTA */}
          <Button
            onClick={handleDownload}
            size="lg"
            className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-lg font-semibold w-full transition-all hover:scale-[1.02] cursor-pointer shadow-lg shadow-primary/20"
          >
            Get My Free Score
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          {/* Dismiss text */}
          <button
            onClick={handleDismiss}
            className="mt-4 text-sm text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
          >
            No thanks, I'll figure it out myself
          </button>
        </div>
      </div>
    </div>
  );
}
