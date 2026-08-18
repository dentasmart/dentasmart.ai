/**
 * Page context detection for contextual CTAs.
 * Determines the content type from the current URL path so CTAs
 * can show relevant copy and direct users to the most appropriate action.
 */

export type ContentType =
  | "symptom"
  | "condition"
  | "treatment"
  | "cost"
  | "comparison"
  | "emergency"
  | "lifestyle"
  | "life-stage"
  | "guide"
  | "article"
  | "homepage"
  | "general";

export interface PageContext {
  contentType: ContentType;
  /** Headline for the CTA based on content type */
  ctaHeadline: string;
  /** Description for the CTA */
  ctaDescription: string;
  /** Button text */
  ctaButtonText: string;
  /** Where the CTA should link (internal page or app store) */
  ctaAction: "symptom-quiz" | "app-download" | "instant-scan";
  /** Link path for internal actions */
  ctaLink: string;
}

/**
 * Detect the content type from the current URL path and return
 * contextual CTA copy that matches the reader's current mindset.
 */
export function getPageContext(path: string): PageContext {
  const p = path.toLowerCase();

  // Symptom pages: user is worried about a symptom
  if (p.startsWith("/symptoms/") || p.includes("symptom") || p.includes("pain") || p.includes("bleeding") || p.includes("swollen")) {
    return {
      contentType: "symptom",
      ctaHeadline: "Experiencing this symptom?",
      ctaDescription: "Take our free 60-second symptom quiz to find out what it could mean and what to do next.",
      ctaButtonText: "Check My Symptoms",
      ctaAction: "symptom-quiz",
      ctaLink: "/symptom-quiz",
    };
  }

  // Dental emergency pages: user needs urgent help
  if (p.startsWith("/dental-emergencies/")) {
    return {
      contentType: "emergency",
      ctaHeadline: "Need help right now?",
      ctaDescription: "Get an instant AI assessment of your dental emergency. Upload a photo for personalized guidance.",
      ctaButtonText: "Get Instant Help",
      ctaAction: "instant-scan",
      ctaLink: "/instant-scan",
    };
  }

  // Cost pages: user is worried about money
  if (p.startsWith("/dental-costs/")) {
    return {
      contentType: "cost",
      ctaHeadline: "Worried about the cost?",
      ctaDescription: "Get a free AI analysis of your dental health to understand what you actually need before spending money.",
      ctaButtonText: "Get My Free Analysis",
      ctaAction: "app-download",
      ctaLink: "/download",
    };
  }

  // Treatment pages: user is considering a procedure
  if (p.startsWith("/treatments/")) {
    return {
      contentType: "treatment",
      ctaHeadline: "Considering this treatment?",
      ctaDescription: "Get an AI second opinion to make sure it is the right choice for you. No insurance needed.",
      ctaButtonText: "Get a Second Opinion",
      ctaAction: "app-download",
      ctaLink: "/download",
    };
  }

  // Condition pages: user is researching a condition
  if (p.startsWith("/conditions/")) {
    return {
      contentType: "condition",
      ctaHeadline: "Think you might have this?",
      ctaDescription: "Upload a photo of your teeth and get a free AI assessment in minutes. Know what is happening before your next dentist visit.",
      ctaButtonText: "Check My Teeth Free",
      ctaAction: "app-download",
      ctaLink: "/download",
    };
  }

  // Comparison pages: user is evaluating options
  if (p.startsWith("/comparisons/") || p.startsWith("/compare/")) {
    return {
      contentType: "comparison",
      ctaHeadline: "Not sure which is right for you?",
      ctaDescription: "Get a personalized recommendation based on your specific dental health. Our AI analyzes your unique situation.",
      ctaButtonText: "Get My Recommendation",
      ctaAction: "app-download",
      ctaLink: "/download",
    };
  }

  // Life stages pages
  if (p.startsWith("/life-stages/")) {
    return {
      contentType: "life-stage",
      ctaHeadline: "Stay on top of your dental health",
      ctaDescription: "Track your oral health over time with personalized AI insights and reminders. Free to start.",
      ctaButtonText: "Start Tracking Free",
      ctaAction: "app-download",
      ctaLink: "/download",
    };
  }

  // Lifestyle pages
  if (p.startsWith("/lifestyle/")) {
    return {
      contentType: "lifestyle",
      ctaHeadline: "See how your habits affect your teeth",
      ctaDescription: "Get a free AI oral health score and personalized tips based on your lifestyle.",
      ctaButtonText: "Get My Health Score",
      ctaAction: "app-download",
      ctaLink: "/download",
    };
  }

  // Guide pages
  if (p.startsWith("/guides/")) {
    return {
      contentType: "guide",
      ctaHeadline: "Put this knowledge into action",
      ctaDescription: "Get personalized guidance for your specific situation with a free AI oral health assessment.",
      ctaButtonText: "Get Personalized Advice",
      ctaAction: "app-download",
      ctaLink: "/download",
    };
  }

  // Blog/article pages (oral-health-hub)
  if (p.startsWith("/oral-health-hub/")) {
    return {
      contentType: "article",
      ctaHeadline: "Want to check your own oral health?",
      ctaDescription: "Snap a photo of your teeth and get a free AI assessment in minutes. Find out what your dentist might not tell you.",
      ctaButtonText: "Get My Free Score",
      ctaAction: "app-download",
      ctaLink: "/download",
    };
  }

  // Homepage
  if (p === "/" || p === "") {
    return {
      contentType: "homepage",
      ctaHeadline: "Know what is happening in your mouth",
      ctaDescription: "Upload a photo and get AI-powered insights in minutes, with a clear plan to prevent expensive surprises.",
      ctaButtonText: "Get My Oral Health Score",
      ctaAction: "app-download",
      ctaLink: "/download",
    };
  }

  // Default/general
  return {
    contentType: "general",
    ctaHeadline: "Your teeth deserve clarity",
    ctaDescription: "Get a free AI oral health assessment. Upload a photo and know what is happening in minutes.",
    ctaButtonText: "Try It Free",
    ctaAction: "app-download",
    ctaLink: "/download",
  };
}
