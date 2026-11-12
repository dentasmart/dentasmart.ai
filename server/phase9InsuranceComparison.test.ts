import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = path.resolve(import.meta.dirname, "..");
const comparisonSource = readFileSync(
  path.join(projectRoot, "client/src/pages/ComparePage.tsx"),
  "utf8",
);
const metaSource = readFileSync(path.join(projectRoot, "server/metaTags.ts"), "utf8");
const llmsSource = readFileSync(path.join(projectRoot, "server/seo.ts"), "utf8");
const adminAeoSource = readFileSync(
  path.join(projectRoot, "client/src/pages/AdminAEODashboard.tsx"),
  "utf8",
);

describe("Phase 9 insurance comparison factual safety", () => {
  it("does not present the unsafe price, annual-maximum, or employer-only claims", () => {
    expect(comparisonSource).not.toMatch(/\$30[–-]60\/month/);
    expect(comparisonSource).not.toMatch(/30[–-]60\/month/);
    expect(comparisonSource).not.toMatch(/\$0[–-]\$4\.99/);
    expect(comparisonSource).not.toMatch(/\$1,000[–-]\$2,000/);
    expect(comparisonSource).not.toContain("Often employer-tied");
    expect(comparisonSource).toContain(
      "May be available through employers, individual plans, or Marketplace options.",
    );
  });

  it("uses a neutral comparison model instead of winner-loser iconography", () => {
    expect(comparisonSource).toContain('feature: "Purpose"');
    expect(comparisonSource).toContain('feature: "Dental claims"');
    expect(comparisonSource).toContain("Comparison point");
    expect(comparisonSource).toContain("aria-label=\"Comparison table: DentaSmart and dental insurance\"");
    expect(comparisonSource).not.toContain("Varies by plan and coverage.");
  });

  it("retains the DentaSmart insurance, claims, examination, prescription, and professional-care boundaries", () => {
    expect(comparisonSource).toContain(
      "DentaSmart is not insurance, does not pay dental claims, and does not provide an in-person examination, prescriptions, or hands-on treatment.",
    );
    expect(comparisonSource).toContain("does not pay dental claims");
    expect(comparisonSource).toContain("Licensed dentists review and approve reports before delivery.");
    expect(comparisonSource).toContain(
      "DentaSmart is not dental insurance and does not replace professional care.",
    );
    expect(comparisonSource).toContain("DentaSmart does not substitute for coverage or professional care.");
  });

  it("uses the current registry price only as a DentaSmart service fact", () => {
    expect(comparisonSource).toContain("pricing.completeCareIndividual.priceFormatted");
    expect(comparisonSource).not.toContain("$74.99/year");
    expect(comparisonSource).not.toContain("$300-$600/year");
  });

  it("keeps the primary canonical and aligned neutral server metadata", () => {
    expect(metaSource).toContain('"/compare/dentasmart-vs-dental-insurance": {');
    expect(metaSource).toContain(
      'title: "DentaSmart vs Dental Insurance | Different Purposes"',
    );
    expect(metaSource).toContain(
      "Compare DentaSmart's dental analysis, reports, and records with dental insurance's coverage role. DentaSmart is not dental insurance.",
    );
    expect(comparisonSource).toContain("https://dentasmart.ai/compare/${slug}");
  });

  it("uses the primary comparison page for source-controlled AEO ownership", () => {
    expect(llmsSource).toContain(
      "DentaSmart vs Dental Insurance (https://dentasmart.ai/compare/dentasmart-vs-dental-insurance/)",
    );
    expect(llmsSource).not.toContain(
      "DentaSmart vs Dental Insurance (https://dentasmart.ai/oral-health-hub/dentasmart-vs-dental-insurance)",
    );
    expect(adminAeoSource).toContain(
      'prompt: "DentaSmart vs dental insurance", targetPage: "/compare/dentasmart-vs-dental-insurance/"',
    );
    expect(adminAeoSource).not.toContain("Dental insurance ($300-$600/year)");
  });

  it("links directly to the authoritative sources that support the visible insurance claims", () => {
    expect(comparisonSource).toContain("https://www.healthcare.gov/coverage/dental-coverage/");
    expect(comparisonSource).toContain(
      "https://www.ada.org/resources/practice/dental-insurance/typical-dental-plan-benefits-and-limitations",
    );
    expect(comparisonSource).toContain("https://www.bls.gov/news.release/ebs2.nr0.htm");
  });

  it("keeps the duplicate article outside the source-controlled rewrite", () => {
    expect(comparisonSource).not.toContain(
      "/oral-health-hub/dentasmart-vs-dental-insurance/",
    );
  });
});
