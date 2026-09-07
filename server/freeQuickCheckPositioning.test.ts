import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { pricing } from "../shared/facts";
import { resolveMetaTags } from "./metaTags";
import { resolveSchemaMarkup } from "./schemaMarkup";

const root = path.resolve(import.meta.dirname, "..");

function read(relativePath: string): string {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

const acquisitionSources = [
  "client/src/pages/Home.tsx",
  "client/src/pages/Pricing.tsx",
  "client/src/pages/Download.tsx",
  "client/src/pages/Features.tsx",
  "client/src/pages/FreeAiTeethScanner.tsx",
  "client/src/pages/BestAiDentalApps.tsx",
  "client/src/pages/DentaSmartVsChatGPT.tsx",
  "client/src/pages/VsDentalCom.tsx",
  "client/src/pages/VsDentistryOne.tsx",
  "client/src/components/Navigation.tsx",
  "client/src/components/DownloadCTA.tsx",
  "client/src/components/DownloadSection.tsx",
  "client/src/components/BlogCTABanner.tsx",
  "server/metaTags.ts",
  "server/ssrContent.ts",
  "server/seo.ts",
].map(read).join("\n");

describe("free Quick Check positioning", () => {
  it("keeps Free Quick Check unlimited and Full Quick Check separately paid per case", () => {
    expect(pricing.quickCheck).toMatchObject({
      name: "Free Quick Check",
      price: 0,
      priceFormatted: "Free",
      requiresXray: false,
      acceptsMouthPhotos: true,
      acceptsXrays: true,
    });
    expect(pricing.fullQuickCheck).toMatchObject({
      name: "Full Quick Check",
      price: 19.99,
      priceFormatted: "$19.99",
      billingLabel: "per case",
      includesFullEligibleXrayInsights: true,
    });
  });

  it("uses the standardized free-entry hook on major conversion surfaces", () => {
    expect(read("client/src/pages/Home.tsx")).toContain("Start with a Free Quick Check");
    expect(read("client/src/components/Navigation.tsx")).toContain("Free Quick Check");
    expect(read("client/src/components/DownloadCTA.tsx")).toContain("Start with a Free Quick Check");
    expect(read("client/src/components/BlogCTABanner.tsx")).toContain("Start with a Free Quick Check");
    expect(acquisitionSources).toContain("Use mouth photos from your phone. No X-ray required.");
  });

  it("keeps crawler metadata and commercial schema aligned with the visible boundary", async () => {
    const homepageMeta = await resolveMetaTags("/", undefined);
    expect(homepageMeta.description).toContain("unlimited Free Quick Check");
    expect(homepageMeta.ogImage).toContain("dentasmart-free-quick-check-social-1200x630_b33c85da.png");

    const pricingMeta = await resolveMetaTags("/pricing/", undefined);
    expect(pricingMeta.description).toContain("unlimited Free Quick Check");
    expect(pricingMeta.description).toContain("Full Quick Check for $19.99 per case");

    const schemas = await resolveSchemaMarkup("/pricing/", undefined, pricingMeta);
    const serialized = JSON.stringify(schemas);
    expect(serialized).toContain('"name":"Free Quick Check"');
    expect(serialized).toContain('"price":"0.00"');
    expect(serialized).toContain('"name":"Full Quick Check"');
    expect(serialized).toContain('"price":"19.99"');
    expect(serialized).toContain('"name":"Treatment Plan Review"');
    expect(serialized).toContain('"price":"29.99"');
  });

  it("removes stale paid-mouth-photo and limited-preview claims from active acquisition sources", () => {
    expect(acquisitionSources).not.toMatch(/(?<!Full )Quick Check (is|costs?) \$19\.99/i);
    expect(acquisitionSources).not.toMatch(/\$19\.99 one-time (Quick Check|educational review of supported mouth photos)/i);
    expect(acquisitionSources).not.toMatch(/limited (free )?(scan|preview)/i);
    expect(acquisitionSources).not.toContain("Try the Free Quick Check");
  });

  it("keeps paid per-case upgrades explicit and preserves the professional-care boundary", () => {
    expect(acquisitionSources).toMatch(/Full Quick Check.{0,120}(\$19\.99|paid|per case)/is);
    expect(acquisitionSources).toMatch(/Treatment Plan Review.{0,120}(\$29\.99|paid|per case)/is);
    expect(acquisitionSources).toMatch(/does not (provide a diagnosis|diagnose conditions)/i);
  });

  it("uses current product terminology and verified app screens on priority surfaces", () => {
    expect(acquisitionSources).toContain("Free Quick Check");
    expect(acquisitionSources).toContain("Full Quick Check");
    expect(acquisitionSources).toContain("Treatment Plan Review");
    expect(acquisitionSources).toContain("Dr. Din");
    expect(acquisitionSources).not.toMatch(/DentaSmart Second Opinion|X-ray Analysis|Dr Din/);

    const home = read("client/src/pages/Home.tsx");
    const features = read("client/src/pages/Features.tsx");
    const download = read("client/src/pages/Download.tsx");
    expect(home).toContain("dentasmart-app-free-quick-check_303190e3.webp");
    expect(home).toContain("dentasmart-app-oral-health-score_ef84a3c3.webp");
    expect(features).toContain("dentasmart-app-ai-report-sections_5245a13a.webp");
    expect(features).toContain("dentasmart-app-dr-din_f1bac3a2.webp");
    expect(download).toContain("dentasmart-app-free-quick-check_303190e3.webp");
  });
});
