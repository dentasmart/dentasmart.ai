import { ArrowRight, Camera, Stethoscope, DollarSign, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
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

  const handleClick = () => {
    trackEvent("mid_content_cta_click", {
      source: location,
      label: trackingLabel,
      content_type: contentType,
      cta_text: finalButtonText,
    });

    if (resolvedContext.ctaAction === "symptom-quiz" || resolvedContext.ctaAction === "instant-scan") {
      // Internal navigation — handled by Link wrapper
      return;
    }
    window.location.href = "/download";
  };

  const isInternalLink = resolvedContext.ctaAction === "symptom-quiz" || resolvedContext.ctaAction === "instant-scan";

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
              <h4 className="text-lg font-semibold text-stone-900 mb-1">
                {finalHeadline}
              </h4>
              <p className="text-stone-600 text-sm leading-relaxed">
                {finalDescription}
              </p>
            </div>
          </div>

          {/* Social proof bar */}
          <div className="flex items-center gap-4 mb-4 pl-15">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full bg-stone-200 border-2 border-white flex items-center justify-center text-[10px] font-medium text-stone-500"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="text-xs text-stone-500">
              <span className="font-medium text-stone-700">50,000+</span> people have checked their oral health
            </span>
          </div>

          <div className="pl-15">
            {isInternalLink ? (
              <Link
                href={resolvedContext.ctaLink}
                onClick={handleClick}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.02] cursor-pointer shadow-md shadow-primary/15"
              >
                {finalButtonText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <button
                onClick={handleClick}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.02] cursor-pointer shadow-md shadow-primary/15"
              >
                {finalButtonText}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
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
            <h4 className="text-lg font-semibold text-stone-900 mb-1">
              {finalHeadline}
            </h4>
            <p className="text-stone-600 text-sm leading-relaxed">
              {finalDescription}
            </p>
            {/* Inline social proof */}
            <p className="text-xs text-stone-400 mt-1.5">
              <span className="text-yellow-500">&#9733;</span> 4.9 rating &middot; 50K+ scans &middot; Free to start
            </p>
          </div>
          {isInternalLink ? (
            <Link
              href={resolvedContext.ctaLink}
              onClick={handleClick}
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-3 text-sm font-semibold whitespace-nowrap cursor-pointer shadow-md shadow-primary/15 inline-flex items-center gap-1.5 transition-all hover:scale-[1.02]"
            >
              {finalButtonText}
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Button
              onClick={handleClick}
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-3 text-sm font-semibold whitespace-nowrap cursor-pointer shadow-md shadow-primary/15"
            >
              {finalButtonText}
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          )}
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
        {isInternalLink ? (
          <Link
            href={resolvedContext.ctaLink}
            onClick={handleClick}
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-5 py-2.5 text-sm font-medium whitespace-nowrap cursor-pointer inline-flex items-center gap-1"
          >
            {finalButtonText}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <Button
            onClick={handleClick}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-5 py-2.5 text-sm font-medium whitespace-nowrap cursor-pointer"
          >
            {finalButtonText}
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}
