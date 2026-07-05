import { useState, useEffect, useCallback, useRef } from "react";
import { X, ArrowRight, Stethoscope, DollarSign, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useLocation, Link } from "wouter";
import { getPageContext, type ContentType } from "@/lib/pageContext";

/**
 * Exit-intent popup variation definitions.
 * Each variation targets a different user mindset.
 */
interface PopupVariation {
  id: "symptom" | "cost" | "second-opinion";
  icon: React.ReactNode;
  badge: string;
  headline: string;
  description: string;
  socialProof: string;
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
      "Take our free symptom quiz. Answer 8 quick questions and get a personalized risk assessment with clear next steps.",
    socialProof: "12,000+ people took this quiz last month",
    ctaText: "Take the Free Quiz",
    dismissText: "No thanks, I will figure it out myself",
    action: "internal",
    link: "/symptom-quiz",
  },
  {
    id: "cost",
    icon: <DollarSign className="w-7 h-7 text-primary" />,
    badge: "Free Analysis",
    headline: "Could you be overpaying for dental care?",
    description:
      "Get a free AI analysis of your teeth before spending money. Know what you actually need so you can make smart decisions.",
    socialProof: "Users save an average of $400 on unnecessary treatments",
    ctaText: "Get My Free Analysis",
    dismissText: "No thanks, I trust my current plan",
    action: "external",
    link: "",
  },
  {
    id: "second-opinion",
    icon: <Shield className="w-7 h-7 text-primary" />,
    badge: "AI Second Opinion",
    headline: "Wondering if you really need that procedure?",
    description:
      "Upload a photo and get a free AI second opinion in minutes. Over 50,000 scans analyzed with 4.9-star accuracy.",
    socialProof: "50,000+ scans analyzed with 4.9-star rating",
    ctaText: "Get a Free Second Opinion",
    dismissText: "No thanks, I am confident in my diagnosis",
    action: "external",
    link: "",
  },
];

/**
 * Select the most relevant popup variation based on the page content type.
 * Falls back to a rotation based on session count if no strong match.
 */
function selectVariation(contentType: ContentType): PopupVariation {
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
 * - Stronger social proof with specific numbers
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
  const variation = selectVariation(context.contentType);

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

      trackEvent("exit_intent_shown", {
        source: location,
        variation: variation.id,
        content_type: context.contentType,
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
    trackEvent("exit_intent_click", {
      source: location,
      variation: variation.id,
      platform: variation.action === "external" ? "ios" : "internal",
    });
    try {
      sessionStorage.setItem("ds_exit_shown", "1");
    } catch {}

    if (variation.action === "external") {
      window.location.href = "/download";
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

          {/* Social proof */}
          <div className="flex items-center justify-center gap-3 mb-6 text-sm text-stone-500">
            <span className="flex items-center gap-1">
              <span className="text-yellow-500">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              4.9
            </span>
            <span className="w-1 h-1 rounded-full bg-stone-300" />
            <span>{variation.socialProof}</span>
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
