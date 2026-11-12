import { readFileSync } from "node:fs";
import express from "express";
import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import { brand } from "../shared/facts";
import { governanceClaimSeeds } from "../shared/governanceSeeds";
import { formatPageTitle } from "../shared/pageTitle";

vi.mock("./blogDb", () => ({
  listBlogPosts: vi.fn().mockResolvedValue({ posts: [], total: 0 }),
}));
vi.mock("./redirectCache", () => ({
  resolveRedirect: vi.fn().mockResolvedValue({ entry: null, cacheIsLoaded: true }),
}));

import { registerSeoRoutes } from "./seo";
import { injectMetaTags } from "./metaTags";

const source = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const LEGACY_DEFINITION = "Your Personal AI Dentist in Your Pocket";

describe("approved website brand tagline", () => {
  it("keeps exact owner-approved spelling and punctuation", () => {
    expect(brand.tagline).toBe("Better Teeth. Lower Costs");
    expect(formatPageTitle("DentaSmart")).toBe("DentaSmart | Better Teeth. Lower Costs");
  });

  it.each([
    "client/src/components/Navigation.tsx",
    "client/src/components/Footer.tsx",
    "client/src/pages/OralHealthHub.tsx",
    "client/src/pages/DentaSmartVsChatGPT.tsx",
  ])("sources the standalone brand lockup in %s from the central facts registry", (path) => {
    const text = source(path);
    expect(text).toContain('import { brand } from "@shared/facts"');
    expect(text).toContain("{brand.tagline}");
    expect(text).not.toMatch(/>\s*Your Personal AI Dentist in Your Pocket\.?\s*<\/p>/i);
  });

  it("keeps existing public product-facts and governance-seed consumers connected without DB operations", () => {
    expect(source("client/src/pages/governance/GovernancePage.tsx")).toContain("<dd>{brand.tagline}</dd>");
    expect(governanceClaimSeeds.find((claim) => claim.claimKey === "brand-tagline")).toMatchObject({
      claimText: "Better Teeth. Lower Costs",
      approvedWording: "Better Teeth. Lower Costs",
      allowedParaphrase: false,
    });
  });

  it("uses the new tagline in the llms branding header and keeps analysis scope and care boundaries", async () => {
    const app = express();
    registerSeoRoutes(app);
    const res = await request(app).get("/llms.txt");
    expect(res.status).toBe(200);
    expect(res.text.split("\r\n")[0]).toBe("# DentaSmart - Better Teeth. Lower Costs");
    expect(res.text).toContain("AI-powered mouth-photo and dental X-ray analysis, reports, and oral-health tracking.");
    expect(res.text).toContain("Depending on the assessment and available information, reports can include an Oral Health Score, risk summaries, treatment considerations and possible timelines.");
    expect(res.text).toContain("Every generated report is reviewed and approved by licensed dentists before delivery.");
    expect(res.text).toContain("Ask Dr. Din, the AI oral-health companion, about your reports and oral health.");
    expect(res.text).toContain("The app does not replace an in-person dental examination or hands-on treatment.");
  });

  it("retains both full llms product-definition uses and their professional-care boundary", async () => {
    const app = express();
    registerSeoRoutes(app);
    const res = await request(app).get("/llms-full.txt");
    expect(res.status).toBe(200);
    expect(res.text).toContain(`an AI-powered oral health app (${LEGACY_DEFINITION}).`);
    expect(res.text).toContain(`DentaSmart is ${LEGACY_DEFINITION}. It analyzes submitted mouth photos, dental X-rays and supporting records.`);
    expect(res.text).toContain("Depending on the assessment and available information, reports can include an Oral Health Score from 0 to 100, risk summaries, treatment considerations, priorities and possible timelines.");
    expect(res.text).toContain("Every generated report is reviewed and approved by licensed dentists before delivery.");
    expect(res.text).toContain("Dr. Din: An AI oral-health companion");
    expect(res.text).toContain("The app does not replace an in-person dental examination or hands-on treatment.");
    expect(res.text).toContain("Estimates are not provider quotes or coverage decisions.");
    expect(res.text).toContain("it does not pay claims, replace coverage or replace professional dental care.");
    expect(res.text).toContain("Emergency symptoms should be handled by a licensed dentist, urgent care or emergency services.");
  });

  it("retains the homepage FAQ and structured-data product definitions with report and examination boundaries", () => {
    const home = source("client/src/pages/Home.tsx");
    const schemas = source("client/src/components/StructuredData.tsx");
    expect(home).toContain(`DentaSmart is ${LEGACY_DEFINITION}. It analyzes submitted mouth photos, supported dental X-rays`);
    expect(home).toContain("Free Quick Check");
    expect(home).toContain("It does not replace an in-person dental examination, routine dental care, or hands-on treatment.");
    expect(schemas).toContain(`${LEGACY_DEFINITION}. DentaSmart provides mouth-photo and supported X-ray analysis, plain-language reports, and oral health tracking.`);
    expect(schemas).toContain("Licensed dentists review and approve reports before delivery.");
    expect(schemas).toContain("The app does not replace an in-person dental examination.");
  });

  it("normalizes the new legacy suffix without changing a definitional description, canonical, or schema", () => {
    const template = '<title>__PAGE_TITLE__</title><meta name="description" content="__PAGE_DESCRIPTION__" /><link rel="canonical" href="__PAGE_CANONICAL__" /><script type="application/ld+json">{"@type":"WebPage","name":"Fixed schema title"}</script>';
    const description = `DentaSmart is ${LEGACY_DEFINITION}. It provides educational information.`;
    const canonical = "https://dentasmart.ai/features/";
    const result = injectMetaTags(template, {
      title: `Features | DentaSmart | ${brand.tagline}`,
      description,
      canonical,
    });
    expect(result).toContain("<title>Features | DentaSmart</title>");
    expect(result).toContain(`content="${description}"`);
    expect(result).toContain(`href="${canonical}"`);
    expect(result).toContain('{"@type":"WebPage","name":"Fixed schema title"}');
  });
});
