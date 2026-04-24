import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { trackEvent, getAppStoreUrl } from "@/lib/analytics";
import { useLocation, Link } from "wouter";
import { getPageContext, type ContentType } from "@/lib/pageContext";

interface NextStepsBoxProps {
  /** Force a specific content type context */
  forceContentType?: ContentType;
  /** Optional related article links */
  relatedLinks?: { title: string; href: string }[];
}

/**
 * NextStepsBox: A contextual "What To Do Next" action box placed at the
 * end of every article/content page. Provides 2-3 clear next steps that
 * guide the user from reading to action.
 *
 * This replaces the pattern of just having a generic download CTA at the
 * bottom. Instead, it gives the user a clear path forward based on what
 * they just read about.
 */
export default function NextStepsBox({ forceContentType, relatedLinks }: NextStepsBoxProps) {
  const [location] = useLocation();
  const context = getPageContext(location);
  const contentType = forceContentType || context.contentType;

  const handlePrimaryClick = () => {
    trackEvent("mid_content_cta_click", {
      source: location,
      label: "next_steps_primary",
      content_type: contentType,
    });

    if (context.ctaAction !== "app-download") {
      return; // Internal link handled by Link
    }
    window.open(getAppStoreUrl("next_steps_box"), "_blank", "noopener");
  };

  const handleQuizClick = () => {
    trackEvent("mid_content_cta_click", {
      source: location,
      label: "next_steps_quiz",
      content_type: contentType,
    });
  };

  // Build contextual steps based on content type
  const steps = getSteps(contentType);

  return (
    <div className="my-12 rounded-2xl border border-stone-200 bg-stone-50 overflow-hidden">
      {/* Header */}
      <div className="bg-stone-900 px-6 py-4 flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-white">What To Do Next</h3>
      </div>

      <div className="p-6 md:p-8 space-y-4">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-primary">{idx + 1}</span>
            </div>
            <div>
              <p className="text-stone-800 font-medium text-sm leading-relaxed">
                {step.text}
              </p>
              {step.link && (
                <Link
                  href={step.link.href}
                  onClick={step.link.onClick}
                  className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-1 hover:underline cursor-pointer"
                >
                  {step.link.label}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        ))}

        {/* Primary CTA */}
        <div className="pt-4 mt-4 border-t border-stone-200">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 text-center sm:text-left">
              <p className="text-stone-600 text-sm">
                <CheckCircle2 className="w-4 h-4 inline-block text-primary mr-1.5 -mt-0.5" />
                <span className="font-medium text-stone-800">Free to start.</span> No insurance or credit card needed.
              </p>
            </div>
            {context.ctaAction === "symptom-quiz" || context.ctaAction === "instant-scan" ? (
              <Link
                href={context.ctaLink}
                onClick={handlePrimaryClick}
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-3 text-sm font-semibold cursor-pointer shadow-md shadow-primary/15 inline-flex items-center gap-1.5 transition-all hover:scale-[1.02] whitespace-nowrap"
              >
                {context.ctaButtonText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <button
                onClick={handlePrimaryClick}
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-3 text-sm font-semibold cursor-pointer shadow-md shadow-primary/15 inline-flex items-center gap-1.5 transition-all hover:scale-[1.02] whitespace-nowrap"
              >
                {context.ctaButtonText}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface Step {
  text: string;
  link?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
}

function getSteps(contentType: ContentType): Step[] {
  switch (contentType) {
    case "symptom":
      return [
        {
          text: "Take the free 60-second symptom quiz to understand what your symptoms could mean.",
          link: { label: "Start Symptom Quiz", href: "/symptom-quiz" },
        },
        {
          text: "Upload a photo of the affected area for a more detailed AI assessment.",
        },
        {
          text: "If symptoms are severe or worsening, see a dentist within 24-48 hours.",
        },
      ];
    case "emergency":
      return [
        {
          text: "If you are in severe pain or have uncontrolled bleeding, call your dentist or go to urgent care now.",
        },
        {
          text: "Upload a photo for an instant AI assessment to understand the severity.",
        },
        {
          text: "Follow the first-aid steps above while you wait for professional care.",
        },
      ];
    case "cost":
      return [
        {
          text: "Get a free AI scan to understand what you actually need before committing to expensive treatment.",
        },
        {
          text: "Compare costs in your area using our dental cost guides.",
          link: { label: "Browse Cost Guides", href: "/dental-costs" },
        },
        {
          text: "Ask your dentist for an itemized treatment plan and get a second opinion.",
        },
      ];
    case "treatment":
      return [
        {
          text: "Upload a photo of your teeth to get a free AI second opinion on whether this treatment is right for you.",
        },
        {
          text: "Compare this treatment with alternatives to find the best option for your situation.",
          link: { label: "View Comparisons", href: "/comparisons" },
        },
        {
          text: "Ask your dentist these questions before proceeding: What happens if I wait? Are there alternatives? What is the total cost?",
        },
      ];
    case "condition":
      return [
        {
          text: "Upload a photo of your teeth to check if you might have this condition.",
        },
        {
          text: "Take the symptom quiz to understand your risk level.",
          link: { label: "Start Symptom Quiz", href: "/symptom-quiz" },
        },
        {
          text: "Schedule a dentist visit for a professional diagnosis if you notice any warning signs.",
        },
      ];
    case "comparison":
      return [
        {
          text: "Get a personalized recommendation based on your specific dental health by uploading a photo.",
        },
        {
          text: "Review the cost differences between these options.",
          link: { label: "Cost Guides", href: "/dental-costs" },
        },
        {
          text: "Discuss both options with your dentist and ask which is better for your specific case.",
        },
      ];
    default:
      return [
        {
          text: "Get your free AI oral health score by uploading a photo of your teeth.",
        },
        {
          text: "Take the symptom quiz if you have any dental concerns.",
          link: { label: "Start Symptom Quiz", href: "/symptom-quiz" },
        },
        {
          text: "Browse our oral health guides for more information.",
          link: { label: "Oral Health Hub", href: "/oral-health-hub" },
        },
      ];
  }
}
