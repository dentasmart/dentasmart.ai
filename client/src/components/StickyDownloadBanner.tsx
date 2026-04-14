import { useState, useEffect } from "react";
import { X, Smartphone } from "lucide-react";
import { trackEvent, getAppStoreUrl } from "@/lib/analytics";
import { useLocation } from "wouter";

/**
 * StickyDownloadBanner: A fixed bottom banner on mobile that encourages app download.
 * - Only shows on mobile devices (< 768px)
 * - Dismissible with X button (stays hidden for the session)
 * - Does not show on admin pages, download page, or pricing page
 * - Appears after 3 seconds of page load to avoid interrupting initial experience
 * - Tracks clicks as "sticky_cta_click" events
 */
export default function StickyDownloadBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [location] = useLocation();

  // Pages where the banner should NOT show
  const excludedPaths = ["/admin", "/download", "/pricing", "/instant-scan"];
  const isExcluded = excludedPaths.some((p) => location.startsWith(p));

  useEffect(() => {
    // Check if already dismissed this session
    try {
      if (sessionStorage.getItem("ds_banner_dismissed") === "1") {
        setDismissed(true);
        return;
      }
    } catch {
      // sessionStorage not available
    }

    // Only show on mobile
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    // Show after 3 seconds
    const timer = setTimeout(() => {
      setVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (dismissed || isExcluded || !visible) return null;

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem("ds_banner_dismissed", "1");
    } catch {
      // silently fail
    }
  };

  const handleClick = () => {
    trackEvent("sticky_cta_click", {
      source: location,
      platform: "ios",
    });
    window.open(getAppStoreUrl("sticky_banner"), "_blank", "noopener");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden animate-in slide-in-from-bottom duration-500">
      {/* Gradient shadow above */}
      <div className="h-4 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

      <div className="bg-white border-t border-stone-200 shadow-2xl px-4 py-3">
        <div className="flex items-center gap-3">
          {/* App icon */}
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <img
              src="/images/logo.png"
              alt="DentaSmart"
              className="w-8 h-8 rounded-lg"
              loading="lazy"
            />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-stone-900 leading-tight">
              Get Your Oral Health Score
            </p>
            <p className="text-xs text-stone-500 leading-tight mt-0.5">
              Free AI scan in 10 minutes
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleClick}
            className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-primary/90 transition-colors flex-shrink-0 cursor-pointer"
          >
            Open App
          </button>

          {/* Dismiss */}
          <button
            onClick={handleDismiss}
            className="p-1 text-stone-400 hover:text-stone-600 transition-colors flex-shrink-0 cursor-pointer"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
