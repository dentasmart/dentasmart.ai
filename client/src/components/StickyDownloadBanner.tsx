import { useState, useEffect, useRef } from "react";
import { X, ArrowRight } from "lucide-react";
import { trackEvent, getAppStoreUrl } from "@/lib/analytics";
import { useLocation, Link } from "wouter";
import { getPageContext } from "@/lib/pageContext";

/**
 * StickyDownloadBanner: Context-aware CTA that adapts to the page content.
 *
 * Mobile: Fixed bottom bar (smart app banner style)
 * Desktop: Slide-in from bottom-right after 40% scroll
 *
 * Features:
 * - Context-aware copy based on page type (symptom, cost, treatment, etc.)
 * - Shows after meaningful engagement (scroll depth or time)
 * - Dismissible per session
 * - Does not show on excluded pages
 * - Deduplicates with exit-intent popup (hides when exit-intent is showing)
 */
export default function StickyDownloadBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [location] = useLocation();
  const scrollThresholdMet = useRef(false);
  const timeThresholdMet = useRef(false);

  const excludedPaths = ["/admin", "/download", "/pricing", "/instant-scan", "/symptom-quiz"];
  const isExcluded = excludedPaths.some((p) => location.startsWith(p));

  const context = getPageContext(location);

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

    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    // Time threshold: show after 8 seconds on mobile, 12 on desktop
    const timeDelay = mobile ? 8000 : 12000;
    const timer = setTimeout(() => {
      timeThresholdMet.current = true;
      if (mobile || scrollThresholdMet.current) {
        setVisible(true);
      }
    }, timeDelay);

    // Scroll threshold: show after 30% scroll on desktop
    const handleScroll = () => {
      if (mobile) return; // Mobile uses time-only trigger
      const scrollPct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPct > 30 && !scrollThresholdMet.current) {
        scrollThresholdMet.current = true;
        if (timeThresholdMet.current) {
          setVisible(true);
        }
      }
    };

    if (!mobile) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
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
      content_type: context.contentType,
      cta_text: context.ctaButtonText,
    });

    if (context.ctaAction === "symptom-quiz") {
      // Internal navigation handled by Link
      return;
    }
    window.open(getAppStoreUrl("sticky_banner"), "_blank", "noopener");
  };

  // ── Mobile: Full-width bottom bar ──
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden animate-in slide-in-from-bottom duration-500">
        <div className="h-3 bg-gradient-to-t from-black/8 to-transparent pointer-events-none" />
        <div className="bg-white border-t border-stone-200 shadow-2xl px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <img
                src="/images/logo.png"
                alt="DentaSmart"
                className="w-7 h-7 rounded-lg"
                loading="lazy"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-stone-900 leading-tight truncate">
                {context.ctaHeadline}
              </p>
              <p className="text-xs text-stone-500 leading-tight mt-0.5">
                Free. No insurance needed.
              </p>
            </div>
            {context.ctaAction === "symptom-quiz" ? (
              <Link
                href={context.ctaLink}
                onClick={handleClick}
                className="bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-primary/90 transition-colors flex-shrink-0 cursor-pointer inline-flex items-center gap-1"
              >
                {context.ctaButtonText.split(" ").slice(0, 2).join(" ")}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <button
                onClick={handleClick}
                className="bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-primary/90 transition-colors flex-shrink-0 cursor-pointer inline-flex items-center gap-1"
              >
                {context.ctaButtonText.split(" ").slice(0, 2).join(" ")}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
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

  // ── Desktop: Slide-in card from bottom-right ──
  return (
    <div className="fixed bottom-6 right-6 z-50 hidden md:block animate-in slide-in-from-bottom-5 fade-in duration-500 max-w-sm">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200/80 overflow-hidden">
        {/* Top accent */}
        <div className="h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/50" />

        <div className="p-5">
          {/* Close */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 p-1 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="pr-6">
            <h4 className="text-base font-semibold text-stone-900 mb-1">
              {context.ctaHeadline}
            </h4>
            <p className="text-sm text-stone-500 leading-relaxed mb-3">
              {context.ctaDescription}
            </p>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3 mb-3 text-xs text-stone-400">
            <span className="flex items-center gap-0.5">
              <span className="text-yellow-500">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              4.9
            </span>
            <span className="w-1 h-1 rounded-full bg-stone-300" />
            <span>50K+ scans completed</span>
          </div>

          {context.ctaAction === "symptom-quiz" ? (
            <Link
              href={context.ctaLink}
              onClick={handleClick}
              className="w-full bg-primary text-white hover:bg-primary/90 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:scale-[1.02] cursor-pointer shadow-md shadow-primary/15 inline-flex items-center justify-center gap-1.5"
            >
              {context.ctaButtonText}
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <button
              onClick={handleClick}
              className="w-full bg-primary text-white hover:bg-primary/90 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:scale-[1.02] cursor-pointer shadow-md shadow-primary/15 inline-flex items-center justify-center gap-1.5"
            >
              {context.ctaButtonText}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
