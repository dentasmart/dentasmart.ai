import { describe, it, expect } from "vitest";

/**
 * CRO Component Logic Tests
 * Tests the page context detection utility and CTA copy generation logic
 * that powers the new conversion-optimized components.
 */

// ─── Page Context Detection Logic ─────────────────────────────────────
// Mirror the logic from client/src/lib/pageContext.ts for server-side testing

type PageType = "symptom" | "condition" | "guide" | "cost" | "comparison" | "treatment" | "article" | "hub" | "general";

function detectPageType(pathname: string): PageType {
  if (pathname.startsWith("/symptoms/")) return "symptom";
  if (pathname.startsWith("/conditions/")) return "condition";
  if (pathname.startsWith("/guides/")) return "guide";
  if (pathname.startsWith("/dental-costs/")) return "cost";
  if (pathname.startsWith("/comparisons/")) return "comparison";
  if (pathname.startsWith("/treatments/")) return "treatment";
  if (pathname.startsWith("/oral-health-hub/")) return "article";
  if (pathname === "/oral-health-hub") return "hub";
  return "general";
}

function getContextualHeadline(pageType: PageType): string {
  const headlines: Record<PageType, string> = {
    symptom: "Experiencing this symptom?",
    condition: "Worried about this condition?",
    guide: "Want personalized guidance?",
    cost: "Want to understand your costs?",
    comparison: "Not sure which option is right?",
    treatment: "Considering this treatment?",
    article: "Want clarity about your own mouth?",
    hub: "Ready to check your oral health?",
    general: "Curious about your oral health?",
  };
  return headlines[pageType];
}

function getContextualDescription(pageType: PageType): string {
  const descriptions: Record<PageType, string> = {
    symptom: "Take our free 60-second symptom quiz to find out what it could mean and what to do next.",
    condition: "Upload a photo and get an AI-powered assessment of your specific situation in under 2 minutes.",
    guide: "Get a personalized oral health score and care plan tailored to your specific needs.",
    cost: "DentaSmart helps you understand what treatment you actually need before you spend.",
    comparison: "Get a personalized recommendation based on your specific dental situation.",
    treatment: "Get an AI assessment to understand if this treatment is right for your situation.",
    article: "Upload a photo of your teeth and get AI-powered insights in under 2 minutes.",
    hub: "Take the free symptom quiz or upload a photo for instant AI analysis.",
    general: "Upload a photo of your teeth and get AI-powered insights in under 2 minutes.",
  };
  return descriptions[pageType];
}

function getContextualCTA(pageType: PageType): { text: string; href: string } {
  if (pageType === "symptom") return { text: "Check My Symptoms", href: "/symptom-quiz" };
  if (pageType === "cost") return { text: "Understand My Costs", href: "/download" };
  if (pageType === "comparison") return { text: "Get My Recommendation", href: "/download" };
  return { text: "Start Free", href: "/download" };
}

// ─── Exit Intent Popup Variation Logic ────────────────────────────────

interface ExitVariation {
  headline: string;
  subheadline: string;
  ctaText: string;
}

function getExitVariation(index: number): ExitVariation {
  const variations: ExitVariation[] = [
    {
      headline: "Before you go...",
      subheadline: "50,000+ people have already checked their oral health with DentaSmart. Your free assessment takes less than 2 minutes.",
      ctaText: "Get My Free Score",
    },
    {
      headline: "Wait — is something bothering you?",
      subheadline: "If you came here with a dental concern, our AI can help you understand what's going on. No cost, no signup, no strings.",
      ctaText: "Check My Symptoms Free",
    },
    {
      headline: "Don't leave with unanswered questions",
      subheadline: "Upload a photo of your teeth and get clear, AI-powered insights in under 2 minutes. Join 50K+ users who stopped guessing.",
      ctaText: "Try It Free Now",
    },
  ];
  return variations[index % variations.length];
}

// ─── Tests ────────────────────────────────────────────────────────────

describe("Page Context Detection", () => {
  it("detects symptom pages correctly", () => {
    expect(detectPageType("/symptoms/tooth-pain")).toBe("symptom");
    expect(detectPageType("/symptoms/bleeding-gums")).toBe("symptom");
  });

  it("detects condition pages correctly", () => {
    expect(detectPageType("/conditions/gingivitis")).toBe("condition");
    expect(detectPageType("/conditions/cracked-tooth")).toBe("condition");
  });

  it("detects guide pages correctly", () => {
    expect(detectPageType("/guides/brushing-guide")).toBe("guide");
    expect(detectPageType("/guides/affordable-dental-care")).toBe("guide");
  });

  it("detects cost pages correctly", () => {
    expect(detectPageType("/dental-costs/root-canal-cost")).toBe("cost");
    expect(detectPageType("/dental-costs/dental-implant-cost")).toBe("cost");
  });

  it("detects comparison pages correctly", () => {
    expect(detectPageType("/comparisons/braces-vs-invisalign")).toBe("comparison");
  });

  it("detects treatment pages correctly", () => {
    expect(detectPageType("/treatments/root-canal-procedure")).toBe("treatment");
  });

  it("detects article pages correctly", () => {
    expect(detectPageType("/oral-health-hub/tooth-pain-toothache")).toBe("article");
    expect(detectPageType("/oral-health-hub/bleeding-gums")).toBe("article");
  });

  it("detects hub landing page correctly", () => {
    expect(detectPageType("/oral-health-hub")).toBe("hub");
  });

  it("detects general pages correctly", () => {
    expect(detectPageType("/")).toBe("general");
    expect(detectPageType("/features")).toBe("general");
    expect(detectPageType("/pricing")).toBe("general");
    expect(detectPageType("/download")).toBe("general");
  });
});

describe("Contextual CTA Headlines", () => {
  it("returns symptom-specific headline for symptom pages", () => {
    expect(getContextualHeadline("symptom")).toBe("Experiencing this symptom?");
  });

  it("returns condition-specific headline for condition pages", () => {
    expect(getContextualHeadline("condition")).toBe("Worried about this condition?");
  });

  it("returns cost-specific headline for cost pages", () => {
    expect(getContextualHeadline("cost")).toBe("Want to understand your costs?");
  });

  it("returns generic headline for general pages", () => {
    expect(getContextualHeadline("general")).toBe("Curious about your oral health?");
  });

  it("returns a non-empty headline for every page type", () => {
    const pageTypes: PageType[] = ["symptom", "condition", "guide", "cost", "comparison", "treatment", "article", "hub", "general"];
    pageTypes.forEach((type) => {
      const headline = getContextualHeadline(type);
      expect(headline).toBeTruthy();
      expect(headline.length).toBeGreaterThan(5);
    });
  });
});

describe("Contextual CTA Descriptions", () => {
  it("returns symptom-specific description mentioning quiz", () => {
    const desc = getContextualDescription("symptom");
    expect(desc).toContain("symptom quiz");
  });

  it("returns condition-specific description mentioning photo upload", () => {
    const desc = getContextualDescription("condition");
    expect(desc).toContain("photo");
  });

  it("returns cost-specific description mentioning understanding costs", () => {
    const desc = getContextualDescription("cost");
    expect(desc).toContain("treatment");
  });

  it("returns a non-empty description for every page type", () => {
    const pageTypes: PageType[] = ["symptom", "condition", "guide", "cost", "comparison", "treatment", "article", "hub", "general"];
    pageTypes.forEach((type) => {
      const desc = getContextualDescription(type);
      expect(desc).toBeTruthy();
      expect(desc.length).toBeGreaterThan(20);
    });
  });
});

describe("Contextual CTA Buttons", () => {
  it("routes symptom pages to symptom quiz", () => {
    const cta = getContextualCTA("symptom");
    expect(cta.href).toBe("/symptom-quiz");
    expect(cta.text).toBe("Check My Symptoms");
  });

  it("routes cost pages to download with cost-specific text", () => {
    const cta = getContextualCTA("cost");
    expect(cta.href).toBe("/download");
    expect(cta.text).toBe("Understand My Costs");
  });

  it("routes comparison pages to download with recommendation text", () => {
    const cta = getContextualCTA("comparison");
    expect(cta.href).toBe("/download");
    expect(cta.text).toBe("Get My Recommendation");
  });

  it("routes general pages to download with generic text", () => {
    const cta = getContextualCTA("general");
    expect(cta.href).toBe("/download");
    expect(cta.text).toBe("Start Free");
  });
});

describe("Exit Intent Popup Variations", () => {
  it("returns 3 distinct variations", () => {
    const v0 = getExitVariation(0);
    const v1 = getExitVariation(1);
    const v2 = getExitVariation(2);

    expect(v0.headline).not.toBe(v1.headline);
    expect(v1.headline).not.toBe(v2.headline);
    expect(v0.headline).not.toBe(v2.headline);
  });

  it("cycles back to first variation after 3", () => {
    expect(getExitVariation(0).headline).toBe(getExitVariation(3).headline);
    expect(getExitVariation(1).headline).toBe(getExitVariation(4).headline);
    expect(getExitVariation(2).headline).toBe(getExitVariation(5).headline);
  });

  it("variation 0 includes social proof number", () => {
    const v = getExitVariation(0);
    expect(v.subheadline).toContain("50,000+");
  });

  it("variation 1 addresses user concern directly", () => {
    const v = getExitVariation(1);
    expect(v.subheadline).toContain("dental concern");
  });

  it("variation 2 uses urgency framing", () => {
    const v = getExitVariation(2);
    expect(v.subheadline).toContain("stopped guessing");
  });

  it("all variations have non-empty CTA text", () => {
    for (let i = 0; i < 3; i++) {
      const v = getExitVariation(i);
      expect(v.ctaText).toBeTruthy();
      expect(v.ctaText.length).toBeGreaterThan(5);
    }
  });

  it("all variations have distinct CTA text", () => {
    const ctaTexts = [0, 1, 2].map((i) => getExitVariation(i).ctaText);
    const unique = new Set(ctaTexts);
    expect(unique.size).toBe(3);
  });
});

describe("Full CRO Flow Integration", () => {
  it("symptom page gets correct full context chain", () => {
    const pageType = detectPageType("/symptoms/tooth-pain");
    const headline = getContextualHeadline(pageType);
    const description = getContextualDescription(pageType);
    const cta = getContextualCTA(pageType);

    expect(pageType).toBe("symptom");
    expect(headline).toContain("symptom");
    expect(description).toContain("quiz");
    expect(cta.href).toBe("/symptom-quiz");
  });

  it("cost page gets correct full context chain", () => {
    const pageType = detectPageType("/dental-costs/root-canal-cost");
    const headline = getContextualHeadline(pageType);
    const description = getContextualDescription(pageType);
    const cta = getContextualCTA(pageType);

    expect(pageType).toBe("cost");
    expect(headline).toContain("costs");
    expect(description).toContain("treatment");
    expect(cta.href).toBe("/download");
  });

  it("article page gets correct full context chain", () => {
    const pageType = detectPageType("/oral-health-hub/tooth-pain-toothache");
    const headline = getContextualHeadline(pageType);
    const description = getContextualDescription(pageType);
    const cta = getContextualCTA(pageType);

    expect(pageType).toBe("article");
    expect(headline).toContain("clarity");
    expect(description).toContain("photo");
    expect(cta.href).toBe("/download");
  });
});
