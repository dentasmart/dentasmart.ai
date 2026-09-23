import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { pricing } from "../shared/facts";
import { resolveStaticSchemaMarkup } from "../shared/schemaOwnership";
import { resolveComparisonCanonicalUrl } from "../client/src/pages/comparisons/ComparisonPageTemplate";

const root = new URL("..", import.meta.url).pathname;
const source = (relativePath: string) => readFileSync(`${root}/${relativePath}`, "utf8");

describe("Phase 3 commercial owner integrity", () => {
  it("keeps the approved prices and family capacity centralized", () => {
    expect(pricing.quickCheck.price).toBe(0);
    expect(pricing.fullQuickCheck.price).toBe(19.99);
    expect(pricing.treatmentPlanReview.price).toBe(29.99);
    expect(pricing.completeCareIndividual.price).toBe(74.99);
    expect(pricing.completeCareFamily.price).toBe(149.99);
    expect(pricing.completeCareFamily.maxMembers).toBe(4);
    expect(pricing.additionalFamilyMember.price).toBe(19.99);
    expect(pricing.additionalFamilyMember.appliesAfterIncludedMembers).toBe(4);
  });

  it("represents the verified additional-family-member add-on in the existing commercial graph", () => {
    const graph = resolveStaticSchemaMarkup("/pricing");
    const product = graph.find((schema) => schema["@type"] === "Product");
    const offers = product?.offers as Array<Record<string, unknown>>;
    expect(offers).toContainEqual(expect.objectContaining({
      name: pricing.additionalFamilyMember.name,
      price: pricing.additionalFamilyMember.price.toFixed(2),
      priceCurrency: "USD",
    }));
  });

  it("keeps Free Quick Check and Full Quick Check X-ray scope distinct", () => {
    const freeQuickCheck = source("client/src/pages/FreeAiTeethScanner.tsx");
    const downloadSection = source("client/src/components/DownloadSection.tsx");
    const downloadCta = source("client/src/components/DownloadCTA.tsx");
    const blogCta = source("client/src/components/BlogCTABanner.tsx");
    expect(pricing.quickCheck.freeXrayFindingScope).toBe("Reduced subset of eligible X-ray finding data");
    expect(freeQuickCheck).toContain("Full Quick Check is ${pricing.fullQuickCheck.priceFormatted} per case and unlocks full eligible X-ray insights");
    expect(downloadSection).toContain("Free X-ray output is limited; Full Quick Check provides fuller eligible X-ray insights");
    expect(freeQuickCheck).not.toMatch(/X-rays? (are|is) exclusively paid/i);
    expect(`${downloadCta}\n${blogCta}`).not.toMatch(/paid X-ray analysis/i);
    expect(`${downloadCta}\n${blogCta}`).toContain("supported X-rays");
  });

  it("uses Treatment Plan Review as the visible paid offering and preserves only a legacy fragment target", () => {
    const home = source("client/src/pages/Home.tsx");
    const pricingPage = source("client/src/pages/Pricing.tsx");
    const stories = source("client/src/pages/Stories.tsx");
    const secondOpinionHub = source("client/src/pages/guides/SecondOpinionHub.tsx");
    expect(pricingPage).toContain('id="treatment-plan-review"');
    expect(pricingPage).toContain('id="second-opinion"');
    expect(stories).toContain("Treatment Plan Review");
    expect(stories).not.toContain("Explore Second Opinion");
    expect(secondOpinionHub).toContain("another licensed dentist");
    expect(secondOpinionHub).toContain("/pricing/#treatment-plan-review");
    expect(home).toContain("Use Treatment Plan Review to understand an already-provided recommendation");
    expect(home).not.toContain("Get a second opinion when a treatment plan feels serious or expensive");
  });

  it("removes unsupported annual-plan entitlement promises from the pricing owner", () => {
    const home = source("client/src/pages/Home.tsx");
    const pricingPage = source("client/src/pages/Pricing.tsx");
    expect(pricingPage).not.toMatch(/Includes unlimited access to/i);
    expect(pricingPage).not.toMatch(/unlimited per family member/i);
    expect(pricingPage).not.toMatch(/Treatment Plan Review \(included per family member\)/i);
    expect(home).toContain("Total Family Members Included");
    expect(home).not.toContain("Year-round educational monitoring, reports, Oral Health Score tracking, guided self-examination");
  });

  it("keeps Android live and routes app-acquisition CTAs to the download owner", () => {
    const download = source("client/src/pages/Download.tsx");
    const navigation = source("client/src/components/Navigation.tsx");
    const findADentist = source("client/src/pages/FindADentist.tsx");
    const chatgptComparison = source("client/src/pages/DentaSmartVsChatGPT.tsx");
    expect(download).toContain("Available on iOS and Android");
    expect(download).toContain("Download for Android");
    expect(navigation).toContain('window.location.href = "/download/"');
    expect(findADentist).toContain('window.location.href = "/download/"');
    expect(chatgptComparison).toContain("Available now on Google Play.");
    expect(chatgptComparison).not.toContain("Early access available.");
  });

  it("preserves established /vs/ canonical owners without creating an alternate comparison route", () => {
    expect(resolveComparisonCanonicalUrl({ slug: "vs-dental-com", canonicalPath: "/vs/dental-com" }))
      .toBe("https://dentasmart.ai/vs/dental-com");
    expect(resolveComparisonCanonicalUrl({ slug: "vs-dentistry-one", canonicalPath: "/vs/dentistry-one" }))
      .toBe("https://dentasmart.ai/vs/dentistry-one");
    expect(resolveComparisonCanonicalUrl({ slug: "braces-vs-invisalign" }))
      .toBe("https://dentasmart.ai/comparisons/braces-vs-invisalign");
  });

  it("keeps public comparison pages free of unsupported DentaSmart insurance, savings, and diagnostic claims", () => {
    const chatgpt = source("client/src/pages/DentaSmartVsChatGPT.tsx");
    const genericComparison = source("client/src/pages/ComparePage.tsx");
    expect(chatgpt).not.toMatch(/appear to support the recommendation/i);
    expect(chatgpt).not.toMatch(/reduce surprise dental costs/i);
    expect(genericComparison).toContain("DentaSmart is not insurance");
    expect(genericComparison).toContain("does not diagnose conditions");
  });

  it("keeps affordability guidance educational rather than a treatment, savings, or verification service", () => {
    const affordability = source("client/src/pages/guides/AffordabilityHub.tsx");
    expect(affordability).not.toMatch(/Catch early, save more|Second opinion first|Verify if needed|AI analysis included/);
    expect(affordability).toContain("Understand the recommendation");
  });

  it("keeps privacy copy factual without unsupported absolute data-handling claims", () => {
    const faqs = source("client/src/pages/FAQs.tsx");
    const freeQuickCheck = source("client/src/pages/FreeAiTeethScanner.tsx");
    expect(`${faqs}\n${freeQuickCheck}`).not.toMatch(/never sells|never sold|never shared/i);
    expect(faqs).toContain("Review the Privacy Policy");
  });

  it("keeps aggregate ratings out of the commercial schema source", () => {
    expect(source("shared/schemaOwnership.ts")).not.toContain("aggregateRating");
  });
});
