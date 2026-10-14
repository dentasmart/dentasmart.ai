import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const navigationSource = fs.readFileSync(
  path.resolve(import.meta.dirname, "../client/src/components/Navigation.tsx"),
  "utf8",
);

const expectedResources = [
  ["Conditions Guide", "/oral-health-hub/conditions/"],
  ["Symptoms Guide", "/oral-health-hub/symptoms/"],
  ["Life Stages", "/life-stages/"],
  ["Symptom Checker", "/symptom-quiz/"],
  ["Treatment Guides", "/treatments/"],
  ["Dental Costs", "/dental-costs/"],
  ["Comparison Guides", "/comparisons/"],
  ["Prevention Hub", "/oral-health-hub/prevention/"],
  ["Lifestyle & Oral Health", "/lifestyle/"],
  ["Dental Guides", "/guides/"],
  ["Blog", "/oral-health-hub/#articles"],
  ["Dental Emergencies", "/dental-emergencies/"],
  ["Affordability Guide", "/oral-health-hub/affordability/"],
  ["Second Opinion Hub", "/oral-health-hub/second-opinion/"],
  ["FAQs", "/faqs/"],
] as const;

describe("Oral Health main navigation", () => {
  it("uses a crawlable Oral Health Hub destination separate from disclosure controls", () => {
    expect(navigationSource).toContain('const ORAL_HEALTH_HUB_PATH = "/oral-health-hub/"');
    expect(navigationSource).toContain("href={ORAL_HEALTH_HUB_PATH}");
    expect((navigationSource.match(/Oral Health Hub/g) ?? []).length).toBe(2);
    expect(navigationSource).toContain('aria-label={megaMenuOpen ? "Hide Oral Health resources" : "Show Oral Health resources"}');
    expect(navigationSource).toContain('aria-label={mobileOralHealthOpen ? "Hide Oral Health resources" : "Show Oral Health resources"}');
    expect(navigationSource).not.toContain(">\n                Learn\n");
  });

  it("routes the Blog resource to the shared articles anchor and supports repeated same-page requests", () => {
    expect(navigationSource).toContain("href: oralHealthHubArticlesHref");
    expect(navigationSource).toContain("if (item.href === oralHealthHubArticlesHref) handleArticleAnchorNavigation(event);");
    expect(navigationSource).toContain('window.history.pushState(null, "", oralHealthHubArticlesHref);');
    expect(navigationSource).toContain("window.dispatchEvent(new Event(oralHealthHubArticlesAnchorEvent));");
  });

  it("preserves all four resource groups and their 15 existing destinations", () => {
    for (const [label, href] of expectedResources) {
      const expectedSource = label === "Blog"
        ? `{ label: "${label}", href: oralHealthHubArticlesHref`
        : `{ label: "${label}", href: "${href}"`;
      expect(navigationSource).toContain(expectedSource);
      expect((navigationSource.match(new RegExp(`label: "${label}"`, "g")) ?? []).length).toBe(1);
    }

    for (const group of ["Understand Your Mouth", "Treatment & Cost", "Stay Healthy", "Get Help"]) {
      expect(navigationSource).toContain(`title: "${group}"`);
    }
    expect(expectedResources).toHaveLength(15);
  });

  it("marks Oral Health active for the Hub and resource routes", () => {
    expect(navigationSource).toContain("const isOralHealthActive = location.startsWith(ORAL_HEALTH_HUB_PATH) || allResourceItems.some(item => isActive(item.href));");
    expect(navigationSource).toContain('aria-current={isOralHealthActive ? "page" : undefined}');
  });

  it("keeps accessible mobile touch targets and controlled resource accordion", () => {
    expect(navigationSource).toContain('const MOBILE_ORAL_HEALTH_MENU_ID = "mobile-oral-health-menu"');
    expect(navigationSource).toContain("aria-controls={MOBILE_ORAL_HEALTH_MENU_ID}");
    expect(navigationSource).toContain("id={MOBILE_ORAL_HEALTH_MENU_ID}");
    expect(navigationSource).toContain("min-h-11 min-w-11");
    expect(navigationSource).toContain("setMobileOralHealthOpen(false)");
  });

  it("keeps the full header to wide screens and prevents header-label wrapping", () => {
    expect(navigationSource).toContain('className="hidden xl:flex flex-none items-center gap-5"');
    expect(navigationSource).toContain('className="hidden xl:flex flex-none items-center gap-3"');
    expect(navigationSource).toContain('className={`whitespace-nowrap text-[15px]');
    expect(navigationSource).toContain('className={`whitespace-nowrap text-[10px] md:text-xs');
    expect(navigationSource).toContain('className={`xl:hidden min-h-11 min-w-11');
    expect(navigationSource).toContain('className="fixed inset-0 z-40 bg-background flex flex-col pt-24 px-6 pb-8 xl:hidden"');
  });
});
