import * as React from "react";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { brand, app, pricing } from "../shared/facts";
import { getOrganizationSchema } from "../shared/schemaOwnership";

vi.mock("wouter", () => ({ Link: "a" }));
vi.mock("@/lib/analytics", () => ({
  trackAppDownload: vi.fn(),
  getAppStoreUrl: () => "https://dentasmart.ai/download/",
  openConsentPreferences: vi.fn(),
}));
import Footer from "../client/src/components/Footer";
Object.assign(globalThis, { React });
const source = (file: string) => readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
const corePages = ["Home", "Features", "HowItWorks", "Pricing", "FAQs", "InstantScan", "FreeAiTeethScanner", "Download", "Employers"];

// Static product strings and real Footer rendering; full app navigation/consent
// and desktop/mobile layouts are covered by the separate built-browser checks.
describe("approved product messaging and footer simplification", () => {
  it("removes the exact generic bottom disclaimer without removing legal or tracking controls", () => {
    const html = renderToStaticMarkup(React.createElement(Footer));
    expect(html).not.toContain("DentaSmart provides educational guidance, not medical advice.");
    expect(html).not.toContain("Learn more at");
    expect(html).not.toContain("educational");
    expect(html).toContain("All rights reserved.");
    for (const href of ["/privacy-policy/", "/terms-of-service/", "/sms-consent/", "/ai-use-disclosure/"]) {
      expect(html).toContain(`href="${href}"`);
    }
    expect(html).toContain("Tracking preferences");
    expect(html).toContain(brand.tagline);
  });

  it.each(corePages)("does not use educational or diagnosis to position DentaSmart on %s", (page) => {
    const text = source(`client/src/pages/${page}.tsx`);
    expect(text).not.toMatch(/\beducational\b/i);
    expect(text).not.toMatch(/\bdiagnosis\b/i);
  });

  it("describes supported report details and licensed-dentist review and approval before delivery", () => {
    const home = source("client/src/pages/Home.tsx");
    expect(home).toMatch(/reviewed and approved by licensed dentists before delivery/i);
    expect(home).toContain("Oral Health Score");
    expect(home).toContain("Dr. Din");
    const combined = corePages.map((p) => source(`client/src/pages/${p}.tsx`)).join("\n");
    expect(combined).toMatch(/treatment considerations/i);
    expect(combined).toMatch(/timelines/i);
    expect(combined).toMatch(/risk (summaries|assessments)/i);
    expect(combined).toMatch(/submitted|available information/i);
    expect(combined).toMatch(/in-person (dental )?exam/i);
    expect(combined).not.toMatch(/guaranteed (savings|results|outcomes)|diagnostic accuracy/i);
  });

  it("updates public product schema descriptions without adding outcome or reviewer claims", () => {
    const organization = getOrganizationSchema();
    expect(organization.description).toMatch(/analyzes submitted mouth photos/i);
    expect(organization.description).not.toMatch(/educational|diagnosis/i);
    expect(organization).not.toHaveProperty("review");
    expect(organization).not.toHaveProperty("aggregateRating");
    const schema = source("shared/schemaOwnership.ts");
    expect(schema).toContain("operatingSystem: \"iOS, Android\"");
    expect(schema).toContain("reviewed and approved by licensed dentists before delivery");
    expect(schema).toContain("in-person dental examination or hands-on treatment");
  });

  it("keeps the approved tagline, app availability and current free/paid offers unchanged", () => {
    expect(brand.tagline).toBe("Better Teeth. Lower Costs");
    expect(app.iosAvailability).toBe("live");
    expect(app.androidAvailability).toBe("live");
    expect(pricing.quickCheck.price).toBe(0);
    expect(pricing.fullQuickCheck.price).toBe(19.99);
    expect(pricing.treatmentPlanReview.price).toBe(29.99);
    expect(source("shared/schemaOwnership.ts")).toContain("Free X-ray submissions show a reduced subset of eligible finding data.");
  });

  it("retains essential legal and urgent-care guidance rather than treating it as generic marketing copy", () => {
    expect(source("client/src/pages/PrivacyPolicy.tsx")).toContain("SMS Communications");
    expect(source("client/src/pages/TermsOfService.tsx")).toContain("SMS Communications");
    expect(source("shared/smsConsent.ts")).toContain("Message frequency may vary");
    expect(source("client/src/pages/dental-emergencies/DentalEmergenciesHub.tsx")).toMatch(/breathing|swallowing/i);
    expect(source("client/src/pages/governance/GovernancePage.tsx")).toContain("does not replace diagnosis or treatment from a licensed professional");
  });
});
