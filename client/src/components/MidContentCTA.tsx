import { ArrowRight, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent, getAppStoreUrl } from "@/lib/analytics";
import { useLocation } from "wouter";

interface MidContentCTAProps {
  /** Headline text. Defaults to "Want clarity about your own mouth?" */
  headline?: string;
  /** Description text */
  description?: string;
  /** Button text. Defaults to "Get My Oral Health Score" */
  buttonText?: string;
  /** Variant: "inline" for within content, "card" for standalone section */
  variant?: "inline" | "card";
  /** Source label for tracking */
  trackingLabel?: string;
}

/**
 * MidContentCTA: An inline CTA component that can be embedded within
 * article content, hub pages, condition pages, and symptom pages.
 * Tracks clicks as mid_content_cta_click events.
 */
export default function MidContentCTA({
  headline = "Want clarity about your own mouth?",
  description = "Snap a photo of your teeth and get your free AI oral health score in 10 minutes. No insurance needed.",
  buttonText = "Get My Oral Health Score",
  variant = "inline",
  trackingLabel = "mid_content_cta",
}: MidContentCTAProps) {
  const [location] = useLocation();

  const handleClick = () => {
    trackEvent("mid_content_cta_click", {
      source: location,
      label: trackingLabel,
    });
    window.open(getAppStoreUrl("mid_content_cta"), "_blank", "noopener");
  };

  if (variant === "card") {
    return (
      <div className="my-8 rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/15 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-5">
          <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
            <Smartphone className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-lg font-semibold text-stone-900 mb-1">
              {headline}
            </h4>
            <p className="text-stone-600 text-sm leading-relaxed">
              {description}
            </p>
          </div>
          <Button
            onClick={handleClick}
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-5 text-sm font-semibold whitespace-nowrap cursor-pointer shadow-md shadow-primary/15"
          >
            {buttonText}
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </div>
    );
  }

  // Inline variant: more subtle, fits within article text flow
  return (
    <div className="my-6 py-5 px-6 rounded-xl bg-stone-50 border border-stone-200">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 text-center sm:text-left">
          <p className="text-stone-800 font-medium text-sm">
            {headline}{" "}
            <span className="text-stone-500 font-normal">{description}</span>
          </p>
        </div>
        <Button
          onClick={handleClick}
          size="sm"
          className="bg-primary hover:bg-primary/90 text-white rounded-full px-5 py-4 text-sm font-medium whitespace-nowrap cursor-pointer"
        >
          {buttonText}
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>
    </div>
  );
}
