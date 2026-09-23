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
      ctaDescription: "Take our free symptom quiz to organize what you notice and review possible next steps. It does not provide a diagnosis.",
      ctaButtonText: "Check My Symptoms",
      ctaAction: "symptom-quiz",
      ctaLink: "/symptom-quiz/",
    };
  }

  // Dental emergency pages: user needs urgent help
  if (p.startsWith("/dental-emergencies/")) {
    return {
      contentType: "emergency",
      ctaHeadline: "Need help right now?",
      ctaDescription: "Use DentaSmart to organize what you are experiencing and prepare for urgent dental care. It does not replace emergency treatment.",
      ctaButtonText: "Check What to Do Next",
      ctaAction: "instant-scan",
      ctaLink: "/instant-scan/",
    };
  }

  // Cost pages: user is worried about money
  if (p.startsWith("/dental-costs/")) {
    return {
      contentType: "cost",
      ctaHeadline: "Worried about the cost?",
      ctaDescription: "Explore a one-time check or treatment-plan comparison before making an expensive dental decision.",
      ctaButtonText: "Compare DentaSmart Plans",
      ctaAction: "app-download",
      ctaLink: "/pricing/",
    };
  }

  // Treatment pages: user is considering a procedure
  if (p.startsWith("/treatments/")) {
    return {
      contentType: "treatment",
      ctaHeadline: "Considering this treatment?",
      ctaDescription: "Use Treatment Plan Review to organize a supported dentist treatment plan and prepare questions for your dentist.",
      ctaButtonText: "Review a Treatment Plan",
      ctaAction: "app-download",
      ctaLink: "/pricing/#treatment-plan-review",
    };
  }

  // Condition pages: user is researching a condition
  if (p.startsWith("/conditions/")) {
    return {
      contentType: "condition",
      ctaHeadline: "Think you might have this?",
      ctaDescription: "Explore a Quick Check for educational insights you can use before your next dentist visit.",
      ctaButtonText: "Explore Quick Check",
      ctaAction: "app-download",
      ctaLink: "/pricing/#quick-check",
    };
  }

  // Comparison pages: user is evaluating options
  if (p.startsWith("/comparisons/") || p.startsWith("/compare/")) {
    return {
      contentType: "comparison",
      ctaHeadline: "Not sure which is right for you?",
      ctaDescription: "Compare the options, then see which DentaSmart service matches the decision you are making.",
      ctaButtonText: "See DentaSmart Plans",
      ctaAction: "app-download",
      ctaLink: "/pricing/",
    };
  }

  // Life stages pages
  if (p.startsWith("/life-stages/")) {
    return {
      contentType: "life-stage",
      ctaHeadline: "Stay on top of your family's dental health",
      ctaDescription: "Track oral health over time with separate profiles, reports, and history for up to four family members.",
      ctaButtonText: "Explore Complete Care",
      ctaAction: "app-download",
      ctaLink: "/pricing/#complete-care",
    };
  }

  // Lifestyle pages
  if (p.startsWith("/lifestyle/")) {
    return {
      contentType: "lifestyle",
      ctaHeadline: "See how your habits affect your teeth",
      ctaDescription: "Explore DentaSmart tools that help you monitor visible changes and organize your oral health history.",
      ctaButtonText: "Explore DentaSmart",
      ctaAction: "app-download",
      ctaLink: "/download/",
    };
  }

  // Guide pages
  if (p.startsWith("/guides/")) {
    return {
      contentType: "guide",
      ctaHeadline: "Put this knowledge into action",
      ctaDescription: "Explore DentaSmart services that can help you apply what you learned and prepare better questions.",
      ctaButtonText: "See DentaSmart Plans",
      ctaAction: "app-download",
      ctaLink: "/pricing/",
    };
  }

  // Blog/article pages (oral-health-hub)
  if (p.startsWith("/oral-health-hub/")) {
    return {
      contentType: "article",
      ctaHeadline: "Want to check your own oral health?",
      ctaDescription: "Explore a Quick Check for educational insights you can use in a more informed dental conversation.",
      ctaButtonText: "Explore Quick Check",
      ctaAction: "app-download",
      ctaLink: "/pricing/#quick-check",
    };
  }

  // Homepage
  if (p === "/" || p === "") {
    return {
      contentType: "homepage",
      ctaHeadline: "Know what is happening in your mouth",
      ctaDescription: "Upload a supported photo for an educational report and clearer questions for your next dental decision.",
      ctaButtonText: "Explore Quick Check",
      ctaAction: "app-download",
      ctaLink: "/pricing/#quick-check",
    };
  }

  // Default/general
  return {
    contentType: "general",
    ctaHeadline: "Your teeth deserve clarity",
    ctaDescription: "Explore DentaSmart's one-time checks and annual monitoring plans.",
    ctaButtonText: "See DentaSmart Plans",
    ctaAction: "app-download",
    ctaLink: "/pricing/",
  };
}
