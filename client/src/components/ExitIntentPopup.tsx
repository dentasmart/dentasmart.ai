import { useState, useEffect, useCallback, useRef } from "react";
import { X, ArrowRight, Stethoscope, DollarSign, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackConversionEvent } from "@/lib/analytics";
import { useLocation, Link } from "wouter";
import { getPageContext, type ContentType } from "@/lib/pageContext";

/**
 * Exit-intent popup variation definitions.
 * Each variation targets a different user mindset.
 */
interface PopupVariation {
  id: "symptom" | "cost" | "second-opinion" | "root-canal-treatment-plan";
  icon: React.ReactNode;
  badge: string;
  headline: string;
  description: string;
  supportingText: string;
  ctaText: string;
  dismissText: string;
  /** "internal" = Link to a page, "external" = app store */
  action: "internal" | "external";
  link: string;
}

const variations: PopupVariation[] = [
  {
    id: "symptom",
    icon: <Stethoscope className="w-7 h-7 text-primary" />,
    badge: "60-Second Quiz",
    headline: "Not sure what is going on with your teeth?",
    description:
      "Take our free symptom quiz. Answer 8 quick questions and get a personalized summary with possible next steps. It does not provide a diagnosis.",
    supportingText: "Educational guidance, not a diagnosis",
    ctaText: "Take the Free Quiz",
    dismissText: "No thanks, I will figure it out myself",
    action: "internal",
    link: "/symptom-quiz/",
  },
  {
    id: "cost",
    icon: <DollarSign className="w-7 h-7 text-primary" />,
    badge: "Plan Clarity",
    headline: "Could you be overpaying for dental care?",
    description:
      "Compare DentaSmart's one-time checks and annual plans before making an expensive dental decision.",
    supportingText: "Plans start at $19.99",
    ctaText: "Compare Plans",
    dismissText: "No thanks, I trust my current plan",
    action: "internal",
    link: "/pricing/",
  },
  {
    id: "second-opinion",
    icon: <Shield className="w-7 h-7 text-primary" />,
    badge: "Second Opinion",
    headline: "Wondering if you really need that procedure?",
    description:
      "Upload a treatment plan and supporting records for a plain-English comparison before you decide.",
    supportingText: "$29.99 one-time",
    ctaText: "Get a Second Opinion",
    dismissText: "No thanks, I will decide another way",
    action: "internal",
    link: "/pricing/#second-opinion",
  },
  {
    id: "root-canal-treatment-plan",
    icon: <Shield className="w-7 h-7 text-primary" />,
    badge: "Treatment Plan Review",
    headline: "Already have a treatment recommendation?",
    description:
      "Upload a supported dentist treatment plan and relevant records for a plain-language review and questions to discuss with your dentist.",
    supportingText: "$29.99 one-time",
    ctaText: "Review Your Treatment Plan",
    dismissText: "No thanks, I will decide another way",
    action: "internal",
    link: "/pricing/#second-opinion",
  },
];

/**
 * Select the most relevant popup variation based on the page content type.
 * Falls back to a rotation based on session count if no strong match.
 */
function selectVariation(contentType: ContentType, pathname: string): PopupVariation {
  const normalizedPathname = pathname.split(/[?#]/, 1)[0];
  if (normalizedPathname === "/treatments/root-canal-procedure" || normalizedPathname === "/treatments/root-canal-procedure/") {
    return variations[3];
  }

  // Direct content-type mapping
  switch (contentType) {
    case "symptom":
    case "emergency":
    case "condition":
      return variations[0]; // Symptom quiz
    case "cost":
    case "comparison":
      return variations[1]; // Cost saver
    case "treatment":
      return variations[2]; // Second opinion
    default:
      break;
  }

  // For general/article/guide pages, rotate based on a session counter
  let counter = 0;
  try {
    counter = parseInt(sessionStorage.getItem("ds_exit_counter") || "0", 10);
  } catch {}

  return variations[counter % variations.length];
}

/**
 * ExitIntentPopup: Detects when a desktop user moves their cursor toward the
 * browser's close/back area and shows a context-aware popup with one of
 * three high-converting variations.
 *
 * Changes from previous version:
 * - 3 rotating variations instead of 1 static popup
 * - Page-context awareness (symptom pages → quiz, cost pages → savings, etc.)
 * - Context-specific supporting text without unverified social proof
 * - Two-step opt-in feel (badge → headline → CTA)
 * - Reduced time threshold to 10 seconds (from 15)
 * - Tracks which variation was shown for A/B analysis
 */
export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [location] = useLocation();
  const hasShown = useRef(false);
  const pageLoadTime = useRef(Date.now());

  const excludedPaths = ["/admin", "/download", "/pricing", "/instant-scan", "/symptom-quiz"];
  const isExcluded = excludedPaths.some((p) => location.startsWith(p));

  const context = getPageContext(location);
  const variation = selectVariation(context.contentType, location);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (e.clientY > 10) return;
      if (Date.now() - pageLoadTime.current < 10000) return;
      if (hasShown.current) return;

      hasShown.current = true;
      setVisible(true);

      // Increment session counter for rotation
      try {
        const counter = parseInt(sessionStorage.getItem("ds_exit_counter") || "0", 10);
        sessionStorage.setItem("ds_exit_counter", String(counter + 1));
      } catch {}

      trackConversionEvent("content_engagement", {
        cta_id: `exit_intent_${variation.id}_shown`,
        surface: "exit_intent",
        intent: "content_engagement",
        destination_type: "internal_route",
        destination_path: variation.action === "external" ? "/download/" : variation.link,
      });
    },
    [location, variation.id, context.contentType]
  );

  useEffect(() => {
    try {
      if (sessionStorage.getItem("ds_exit_shown") === "1") {
        hasShown.current = true;
        return;
      }
    } catch {}

    if (window.innerWidth < 768) return;

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [handleMouseLeave]);

  if (dismissed || isExcluded || !visible) return null;

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem("ds_exit_shown", "1");
    } catch {}
  };

  const handleCTA = () => {
    trackConversionEvent("cta_click", {
      cta_id: `exit_intent_${variation.id}_cta`,
      surface: "exit_intent",
      intent: variation.id === "symptom" ? "quick_check" : variation.id.includes("treatment") || variation.id === "second-opinion" ? "treatment_plan_review" : "pricing",
      destination_type: "internal_route",
      destination_path: variation.action === "external" ? "/download/" : variation.link,
    });
    try {
      sessionStorage.setItem("ds_exit_shown", "1");
    } catch {}

    if (variation.action === "external") {
      window.location.href = "/download/";
    }
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
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            {variation.badge}
          </div>

          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
            {variation.icon}
          </div>

          {/* Headline */}
          <h3 className="text-2xl font-semibold text-stone-900 mb-3 leading-tight">
            {variation.headline}
          </h3>

          <p className="text-stone-600 mb-5 leading-relaxed text-sm">
            {variation.description}
          </p>

          {/* Verified supporting context */}
          <div className="flex items-center justify-center gap-3 mb-6 text-sm text-stone-500">
            <span>{variation.supportingText}</span>
          </div>

          {/* CTA */}
          {variation.action === "internal" ? (
            <Link
              href={variation.link}
              onClick={handleCTA}
              className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-4 text-lg font-semibold w-full transition-all hover:scale-[1.02] cursor-pointer shadow-lg shadow-primary/20 inline-flex items-center justify-center gap-2"
            >
              {variation.ctaText}
              <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <Button
              onClick={handleCTA}
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-lg font-semibold w-full transition-all hover:scale-[1.02] cursor-pointer shadow-lg shadow-primary/20"
            >
              {variation.ctaText}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}

          {/* Dismiss text */}
          <button
            onClick={handleDismiss}
            className="mt-4 text-sm text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
          >
            {variation.dismissText}
          </button>
        </div>
      </div>
    </div>
  );
}
