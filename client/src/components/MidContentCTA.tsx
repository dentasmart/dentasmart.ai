import { ArrowRight, Camera, Stethoscope, DollarSign, Shield, Sparkles } from "lucide-react";
import { trackConversionEvent } from "@/lib/analytics";
import { useLocation, Link } from "wouter";
import { getPageContext, type ContentType } from "@/lib/pageContext";

interface MidContentCTAProps {
  /** Override headline (otherwise auto-detected from page context) */
  headline?: string;
  /** Override description */
  description?: string;
  /** Override button text */
  buttonText?: string;
  /** Visual variant */
  variant?: "inline" | "card" | "interactive";
  /** Source label for tracking */
  trackingLabel?: string;
  /** Force a specific content type context */
  forceContentType?: ContentType;
}

/** Icon mapping for content types */
function getIcon(contentType: ContentType) {
  switch (contentType) {
    case "symptom":
    case "emergency":
      return <Stethoscope className="w-5 h-5 text-primary" />;
    case "cost":
      return <DollarSign className="w-5 h-5 text-primary" />;
    case "treatment":
    case "comparison":
      return <Shield className="w-5 h-5 text-primary" />;
    case "condition":
      return <Camera className="w-5 h-5 text-primary" />;
    default:
      return <Sparkles className="w-5 h-5 text-primary" />;
  }
}

/**
 * MidContentCTA: Context-aware inline CTA that adapts copy and action
 * based on the page content type. Uses the "If you're [doing X], [take action Y]"
 * copywriting pattern for higher relevance and conversion.
 */
export default function MidContentCTA({
  headline,
  description,
  buttonText,
  variant = "card",
  trackingLabel = "mid_content_cta",
  forceContentType,
}: MidContentCTAProps) {
  const [location] = useLocation();
  const context = getPageContext(location);
  const contentType = forceContentType || context.contentType;
  const resolvedContext = forceContentType ? getPageContext(`/${forceContentType}s/`) : context;

  const finalHeadline = headline || resolvedContext.ctaHeadline;
  const finalDescription = description || resolvedContext.ctaDescription;
  const finalButtonText = buttonText || resolvedContext.ctaButtonText;
  const icon = getIcon(contentType);
  const isFreeQuiz = resolvedContext.ctaAction === "symptom-quiz";

  const handleClick = () => {
    trackConversionEvent("cta_click", {
      cta_id: `mid_content_${trackingLabel.replace(/[^a-z0-9_]/gi, "_").toLowerCase().slice(0, 80)}`,
      surface: "mid_content",
      intent: isFreeQuiz ? "quick_check" : "content_engagement",
      destination_type: "internal_route",
      destination_path: resolvedContext.ctaLink,
    });
  };

  // ── Interactive variant: mini engagement prompt ──
  if (variant === "interactive") {
    return (
      <div className="my-10 rounded-2xl bg-gradient-to-br from-primary/5 via-white to-primary/5 border border-primary/15 p-6 md:p-8 relative overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full" />

        <div className="relative">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              {icon}
            </div>
            <div>
              <p className="text-lg font-semibold text-stone-900 mb-1">
                {finalHeadline}
              </p>
              <p className="text-stone-600 text-sm leading-relaxed">
                {finalDescription}
              </p>
            </div>
          </div>

          <div className="mb-4 pl-15">
            <span className="text-xs text-stone-500">
              {isFreeQuiz ? "Free symptom quiz" : "Prices shown before purchase"}
            </span>
          </div>

          <div className="pl-15">
            <Link
              href={resolvedContext.ctaLink}
              onClick={handleClick}
              className="inline-flex min-h-11 items-center gap-2 bg-action hover:bg-action-hover text-action-foreground rounded-full px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.02] cursor-pointer shadow-md shadow-primary/15"
            >
              {finalButtonText}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Card variant: prominent standalone section ──
  if (variant === "card") {
    return (
      <div className="my-8 rounded-2xl bg-gradient-to-br from-primary/5 via-primary/8 to-primary/5 border border-primary/15 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-5">
          <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="text-lg font-semibold text-stone-900 mb-1">
              {finalHeadline}
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              {finalDescription}
            </p>
            {/* Purchase context */}
            <p className="text-xs text-stone-400 mt-1.5">
              {isFreeQuiz ? "Free symptom quiz" : "Prices shown before purchase"}
            </p>
          </div>
          <Link
            href={resolvedContext.ctaLink}
            onClick={handleClick}
            className="bg-action hover:bg-action-hover text-action-foreground rounded-full px-6 py-3 text-sm font-semibold whitespace-nowrap cursor-pointer shadow-md shadow-primary/15 inline-flex min-h-11 items-center gap-1.5 transition-all hover:scale-[1.02]"
          >
            {finalButtonText}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // ── Inline variant: subtle, fits within article text flow ──
  return (
    <div className="my-6 py-4 px-5 rounded-xl bg-stone-50 border border-stone-200 hover:border-primary/20 transition-colors">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-3 flex-1 text-center sm:text-left">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 hidden sm:flex">
            {icon}
          </div>
          <p className="text-stone-800 font-medium text-sm">
            {finalHeadline}{" "}
            <span className="text-stone-500 font-normal">{finalDescription}</span>
          </p>
        </div>
        <Link
          href={resolvedContext.ctaLink}
          onClick={handleClick}
          className="bg-action hover:bg-action-hover text-action-foreground rounded-full px-5 py-2.5 text-sm font-medium whitespace-nowrap cursor-pointer inline-flex min-h-11 items-center gap-1"
        >
          {finalButtonText}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
