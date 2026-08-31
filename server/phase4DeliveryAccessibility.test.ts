import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectFile = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("Phase 4-B first-viewport image delivery", () => {
  it("keeps the visible Home phone images eager and sizes them to their rendered layout", () => {
    const source = projectFile("client/src/pages/Home.tsx");

    expect(source).toContain('sizes="(max-width: 640px) 140px, (max-width: 1024px) 200px, 220px"');
    expect(source).toContain('loading="eager" fetchPriority="high" width="800" height="1734"');
    expect(source).toContain('loading="eager" width="945" height="2048"');
    expect(source).not.toContain('alt="DentaSmart AI X-Ray Analysis - Color-coded findings with plain-English explanations" className="w-full h-full object-cover object-top" loading="lazy"');
  });

  it("marks the Pricing and Features first-viewport images eager, high priority, and intrinsically sized", () => {
    const pricing = projectFile("client/src/pages/Pricing.tsx");
    const features = projectFile("client/src/pages/Features.tsx");

    expect(pricing).toContain('loading="eager"');
    expect(pricing).toContain('fetchPriority="high"');
    expect(features).toContain('loading="eager"');
    expect(features).toContain('fetchPriority="high"');
    expect(features).toContain('width="1600"');
    expect(features).toContain('height="893"');
  });
});

describe("Phase 4-C accessible action and semantics foundations", () => {
  it("introduces a dedicated accessible action token without replacing the DentaSmart brand primary", () => {
    const styles = projectFile("client/src/index.css");

    expect(styles).toContain("--primary: #21B9C6;");
    expect(styles).toContain("--action: #007784;");
    expect(styles).toContain("--action-hover: #006B76;");
    expect(styles).toContain("--color-action: var(--action);");
  });

  it("uses the accessible action token for shared white-text conversion controls", () => {
    const button = projectFile("client/src/components/ui/button.tsx");
    const home = projectFile("client/src/pages/Home.tsx");
    const pricing = projectFile("client/src/pages/Pricing.tsx");
    const features = projectFile("client/src/pages/Features.tsx");
    const midContent = projectFile("client/src/components/MidContentCTA.tsx");
    const sticky = projectFile("client/src/components/StickyDownloadBanner.tsx");
    const progress = projectFile("client/src/components/ScrollProgressCTA.tsx");

    expect(button).toContain('default: "bg-primary text-primary-foreground hover:bg-primary/90"');
    expect(home).toContain("bg-action");
    expect(pricing).toContain("bg-action");
    expect(features).toContain("bg-action");
    expect(midContent).toContain("bg-action");
    expect(sticky).toContain("bg-action");
    expect(progress).toContain("bg-action");
  });

  it("uses the accessible action token for the additional representative-template failures found in the corrective audit", () => {
    const nextSteps = projectFile("client/src/components/NextStepsBox.tsx");
    const condition = projectFile("client/src/pages/conditions/ConditionPage.tsx");
    const cost = projectFile("client/src/pages/dental-costs/CostPageTemplate.tsx");
    const dentalCostsHub = projectFile("client/src/pages/dental-costs/DentalCostsHub.tsx");
    const conditionsHub = projectFile("client/src/pages/guides/ConditionsHub.tsx");
    const guide = projectFile("client/src/pages/guides/GuidePage.tsx");
    const scanner = projectFile("client/src/pages/FreeAiTeethScanner.tsx");

    expect(nextSteps).toContain("bg-action");
    expect(condition).toContain("bg-action text-action-foreground");
    expect(condition).toContain("text-stone-600 font-medium mb-3");
    expect(cost).toContain("bg-action text-action-foreground");
    expect(dentalCostsHub).toContain("bg-action text-action-foreground");
    expect(dentalCostsHub).toContain("text-action underline underline-offset-2");
    expect(conditionsHub).toContain("bg-action text-action-foreground");
    expect(guide).toContain("bg-action text-action-foreground");
    expect(guide).toContain("text-stone-600 font-medium mb-3");
    expect(guide).toContain("text-action hover:underline");
    expect(guide).toContain("bg-white text-action hover:bg-white/90");
    expect(scanner).toContain("bg-action text-action-foreground");
    expect(scanner).toContain("text-action hover:underline");
    expect(nextSteps).toContain("text-action text-sm font-medium");
    expect(condition).toContain('symptom.severity === "mild" ? "text-yellow-800"');
    expect(condition).toContain('symptom.severity === "moderate" ? "text-orange-800"');
  });

  it("removes repeated level-four headings from footer and floating CTA shells", () => {
    const footer = projectFile("client/src/components/Footer.tsx");
    const midContent = projectFile("client/src/components/MidContentCTA.tsx");
    const sticky = projectFile("client/src/components/StickyDownloadBanner.tsx");
    const progress = projectFile("client/src/components/ScrollProgressCTA.tsx");

    expect(footer).not.toContain("<h4");
    expect(midContent).not.toContain("<h4");
    expect(sticky).not.toContain("<h4");
    expect(progress).not.toContain("<h4");
  });

  it("provides 44px minimum dimensions for the repaired shared CTA and dismiss targets", () => {
    const midContent = projectFile("client/src/components/MidContentCTA.tsx");
    const sticky = projectFile("client/src/components/StickyDownloadBanner.tsx");
    const progress = projectFile("client/src/components/ScrollProgressCTA.tsx");

    expect(midContent).toContain("min-h-11");
    expect(sticky).toContain("min-h-11 min-w-11");
    expect(progress).toContain("min-h-11 min-w-11");
  });
});
