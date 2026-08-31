import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Camera, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useLocation, Link } from "wouter";
import { getPageContext } from "@/lib/pageContext";

/**
 * ScrollProgressCTA: Replaces the old BlogCTABanner with a smarter
 * scroll-triggered slide-in that shows progressive CTAs at different
 * scroll depths.
 *
 * - 40% scroll: Soft nudge ("Enjoying this? Check your own teeth")
 * - 75% scroll: Stronger prompt with social proof
 * - Dismissible per session
 * - Does not show on excluded pages
 * - Coordinates with StickyDownloadBanner (only shows on desktop where
 *   sticky shows as slide-in on opposite side)
 */
export function ScrollProgressCTA() {
  const [scrollPct, setScrollPct] = useState(0);
  const [phase, setPhase] = useState<"hidden" | "soft" | "strong">("hidden");
  const [isDismissed, setIsDismissed] = useState(false);
  const [location] = useLocation();
  const hasTrackedSoft = useRef(false);
  const hasTrackedStrong = useRef(false);

  const context = getPageContext(location);

  const excludedPaths = ["/admin", "/download", "/pricing", "/instant-scan", "/symptom-quiz", "/"];
  const isExcluded = excludedPaths.some((p) => location === p || (p !== "/" && location.startsWith(p)));

  useEffect(() => {
    try {
      if (sessionStorage.getItem("ds_scroll_cta_dismissed") === "1") {
        setIsDismissed(true);
        return;
      }
    } catch {}

    // Only show on desktop (mobile has the sticky banner)
    if (window.innerWidth < 768) return;

    const handleScroll = () => {
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setScrollPct(pct);

      if (pct >= 75) {
        setPhase("strong");
      } else if (pct >= 40) {
        setPhase("soft");
      } else {
        setPhase("hidden");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track scroll depth milestones
  useEffect(() => {
    if (phase === "soft" && !hasTrackedSoft.current) {
      hasTrackedSoft.current = true;
      trackEvent("scroll_depth_50", { source: location });
    }
    if (phase === "strong" && !hasTrackedStrong.current) {
      hasTrackedStrong.current = true;
      trackEvent("scroll_depth_75", { source: location });
    }
  }, [phase, location]);

  if (isDismissed || isExcluded || phase === "hidden") return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem("ds_scroll_cta_dismissed", "1");
    } catch {}
  };

  const handleClick = () => {
    trackEvent("mid_content_cta_click", {
      source: location,
      label: `scroll_progress_${phase}`,
      content_type: context.contentType,
    });

    if (context.ctaAction === "symptom-quiz" || context.ctaAction === "instant-scan") {
      return; // Internal navigation handled by Link
    }
    window.location.href = "/download";
  };

  const isInternalLink = context.ctaAction === "symptom-quiz" || context.ctaAction === "instant-scan";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={phase}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-6 left-6 z-50 hidden md:block max-w-xs"
      >
        {phase === "soft" ? (
          /* ── Soft nudge at 40% ── */
          <div className="bg-white rounded-xl shadow-lg border border-stone-200/80 p-4 relative">
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 min-h-11 min-w-11 inline-flex items-center justify-center rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-3 pr-6">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Camera className="w-4.5 h-4.5 text-action" />
              </div>
              <div>
                <p className="text-sm font-medium text-stone-800">
                  Want to check your own teeth?
                </p>
                {isInternalLink ? (
                  <Link
                    href={context.ctaLink}
                    onClick={handleClick}
                    className="text-xs text-action font-medium hover:underline cursor-pointer inline-flex min-h-11 items-center gap-0.5 mt-0.5"
                  >
                    Try it free <ArrowRight className="w-3 h-3" />
                  </Link>
                ) : (
                  <button
                    onClick={handleClick}
                    className="text-xs text-action font-medium hover:underline cursor-pointer inline-flex min-h-11 items-center gap-0.5 mt-0.5"
                  >
                    Try it free <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* ── Strong prompt at 75% ── */
          <div className="bg-white rounded-2xl shadow-2xl border border-stone-200/80 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/50" />
            <div className="p-5 relative">
              <button
                onClick={handleDismiss}
                className="absolute top-3 right-3 min-h-11 min-w-11 inline-flex items-center justify-center rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-action" />
                <span className="text-xs font-semibold text-action uppercase tracking-wider">
                  Free Assessment
                </span>
              </div>

              <p className="text-base font-semibold text-stone-900 mb-1 pr-6">
                {context.ctaHeadline}
              </p>
              <p className="text-sm text-stone-500 leading-relaxed mb-3">
                {context.ctaDescription}
              </p>

              {/* Social proof */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex -space-x-1.5">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full bg-stone-200 border-2 border-white flex items-center justify-center text-[9px] font-medium text-stone-500"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-stone-400">
                  Free &middot; No insurance needed
                </span>
              </div>

              {isInternalLink ? (
                <Link
                  href={context.ctaLink}
                  onClick={handleClick}
                  className="w-full bg-action hover:bg-action-hover text-action-foreground rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:scale-[1.02] cursor-pointer shadow-md shadow-primary/15 inline-flex min-h-11 items-center justify-center gap-1.5"
                >
                  {context.ctaButtonText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <button
                  onClick={handleClick}
                  className="w-full bg-action hover:bg-action-hover text-action-foreground rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:scale-[1.02] cursor-pointer shadow-md shadow-primary/15 inline-flex min-h-11 items-center justify-center gap-1.5"
                >
                  {context.ctaButtonText}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
