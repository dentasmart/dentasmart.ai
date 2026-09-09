import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { app, brand, pricing } from "../shared/facts";
import {
  canDisplayVerifiedReview,
  governanceSourceRegistry,
  isExternalEvidenceUrl,
  publicReviewerProfiles,
  type ContentReviewRecord,
} from "../shared/contentGovernance";

const root = resolve(import.meta.dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");
const withoutNonRenderedComments = (source: string) =>
  source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");

describe("Phase 6 content governance", () => {
  it("keeps source identifiers unique, statuses known, and public evidence external", () => {
    const sources = Object.values(governanceSourceRegistry);
    expect(new Set(sources.map((source) => source.id)).size).toBe(sources.length);

    for (const source of sources) {
      expect(["verified", "legacy_existing", "pending_verification", "not_applicable"]).toContain(source.verificationStatus);
      expect(isExternalEvidenceUrl(source.url)).toBe(true);
      expect(source.publisher).toBeTruthy();
    }
  });

  it("does not promote legacy reviewer data or unknown dates into public review proof", () => {
    const legacy: ContentReviewRecord = {
      reviewer: {
        displayName: "Legacy Reviewer",
        credentials: "Unverified",
        verificationStatus: "legacy_unverified",
        publicDisplayAllowed: false,
      },
      reviewedOn: "2026-04-08",
      verificationStatus: "legacy_unverified",
    };
    expect(canDisplayVerifiedReview(legacy)).toBe(false);
    expect(canDisplayVerifiedReview({ verificationStatus: "verified" })).toBe(false);
    expect(publicReviewerProfiles).toHaveLength(0);
  });

  it("does not retain generic hardcoded review dates in representative schema templates", () => {
    for (const path of [
      "client/src/pages/treatments/TreatmentPageTemplate.tsx",
      "client/src/pages/dental-costs/CostPageTemplate.tsx",
      "client/src/pages/dental-emergencies/EmergencyPageTemplate.tsx",
      "client/src/pages/life-stages/AgeSpecificTemplate.tsx",
      "client/src/pages/lifestyle/LifestyleTemplate.tsx",
    ]) {
      expect(read(path)).not.toMatch(/lastReviewed:\s*["']2026-/);
    }
  });

  it("makes AI-generated posts draft-only regardless of a stored auto-publish setting", () => {
    const agent = read("server/blogAgent.ts");
    expect(agent).toContain("const shouldPublish = false");
    expect(agent).toContain('status: "draft"');
    expect(agent).toContain("publishedAt: null");
    expect(agent).not.toMatch(/status:\s*shouldPublish\s*\?\s*["']published/);
  });

  it("keeps the admin AI Blog Agent aligned with draft-only server behavior", () => {
    const adminAgent = read("client/src/pages/AdminAIBlogAgent.tsx");
    const blogEditor = read("client/src/pages/AdminBlogEditor.tsx");
    expect(adminAgent).toContain("Drafts require manual review");
    expect(adminAgent).toContain("Draft-only");
    expect(adminAgent).not.toContain("agentGetAutoPublish");
    expect(adminAgent).not.toContain("agentSetAutoPublish");
    expect(adminAgent).not.toContain("Auto-publish");
    expect(adminAgent).not.toContain("go live immediately after generation");
    expect(blogEditor).toMatch(/Publish|published/i);
  });

  it("keeps legacy reviewer strings out of representative client schemas until public provenance exists", () => {
    for (const path of [
      "client/src/pages/conditions/ConditionPage.tsx",
      "client/src/pages/symptoms/SymptomPage.tsx",
    ]) {
      const source = read(path);
      expect(source).not.toMatch(/lastReviewed:\s*(condition|symptom)\.lastReviewed/);
      expect(source).not.toMatch(/reviewedBy:\s*(condition|symptom)\.reviewedBy/);
    }
    expect(read("client/src/pages/guides/GuidePage.tsx")).not.toContain("medicalWebPageSchema(");
    expect(read("server/reviewMetadata.ts")).toContain("publicReviewerProfiles.find");
    expect(read("server/schemaMarkup.ts")).not.toMatch(/\/guides\/.*getVerifiedReviewMetadata/);
  });

  it("routes facial swelling to a truthful DentaSmart download CTA with one semantic control", () => {
    const symptomData = read("client/src/data/symptoms.ts");
    const symptomPage = read("client/src/pages/symptoms/SymptomPage.tsx");
    const facialRecord = symptomData.slice(symptomData.indexOf('"facial-swelling"'), symptomData.indexOf('"tooth-migration"'));
    expect(facialRecord).toContain('href: "/download/"');
    expect(facialRecord).toContain('label: "Download DentaSmart"');
    expect(facialRecord).not.toMatch(/find (a )?dentist|locator|provider/i);
    expect(symptomPage).toContain("<Button asChild size=\"lg\"");
    expect(symptomPage).toContain("<Link\n                  href={professionalCareCta.href}");
    expect(symptomPage).toContain("professionalCareCta.href");
    expect(symptomPage).not.toMatch(/<Link[\s\S]*?<Button size=\"lg\"[\s\S]*?professionalCareCta/);
  });

  it("sends only fixed non-health context for the professional-care CTA event", () => {
    const analytics = read("client/src/lib/analytics.ts");
    const symptomPage = read("client/src/pages/symptoms/SymptomPage.tsx");
    const helperStart = analytics.indexOf("export function trackSymptomProfessionalCareClick");
    const helperEnd = analytics.indexOf("export function shouldDisableAnalyticsForPath", helperStart);
    const helper = analytics.slice(helperStart, helperEnd);

    expect(helper).toContain('trackEvent("symptom_professional_care_click", context)');
    expect(helper).toContain('source: "symptom_page"');
    expect(helper).toContain('destination: "/download"');
    expect(helper).not.toMatch(/symptom\.|slug|title|condition|health|report|image|user|email|name/i);
    expect(symptomPage).toContain("onClick={trackSymptomProfessionalCareClick}");
    expect(symptomPage).not.toContain("symptom: symptom.slug");
  });

  it("keeps symptom urgent guidance before the first optional conversion surface", () => {
    const symptomPage = read("client/src/pages/symptoms/SymptomPage.tsx");
    const renderedCta = symptomPage.slice(symptomPage.indexOf("{/* CTA */}"));
    expect(symptomPage.indexOf("When to Seek Urgent Dental Care")).toBeGreaterThan(symptomPage.indexOf("<QuickAnswerBlock"));
    expect(symptomPage.indexOf("When to Seek Urgent Dental Care")).toBeLessThan(symptomPage.indexOf("<MidContentCTA"));
    expect(renderedCta).toContain("professionalCareCta");
    expect(symptomPage.indexOf("When to Seek Urgent Dental Care")).toBeLessThan(symptomPage.indexOf("{/* CTA */}"));
  });

  it("keeps emergency action first and omits the competing hero symptom-check conversion", () => {
    const emergencyTemplate = read("client/src/pages/dental-emergencies/EmergencyPageTemplate.tsx");
    const heroStart = emergencyTemplate.indexOf("{/* ═══ HERO ═══ */}");
    const heroEnd = emergencyTemplate.indexOf("{/* ═══ STATS STRIP ═══ */}");
    const hero = emergencyTemplate.slice(heroStart, heroEnd);
    expect(hero).toContain("See What To Do Now");
    expect(hero).not.toContain("Free Symptom Check");
  });

  it("registers only the four approved governance routes and no public clinical review or person profile routes", () => {
    const routes = read("shared/routes.ts");
    for (const path of ["/editorial-policy", "/corrections-policy", "/ai-use-disclosure", "/product-facts"]) {
      expect(routes).toContain(path);
    }
    expect(routes).not.toContain("/clinical-review-policy");
    expect(routes).not.toMatch(/\/authors?\//);
    expect(routes).not.toMatch(/\/reviewers?\//);
  });

  it("keeps public product facts connected to the central registry and preserves exact approved values", () => {
    const factsPage = read("client/src/pages/governance/GovernancePage.tsx");
    expect(factsPage).toMatch(/from ["']@shared\/facts["']/);
    expect(pricing.quickCheck.priceFormatted).toBe("Free");
    expect(pricing.quickCheck.billingLabel).toBe("unlimited checks");
    expect(pricing.fullQuickCheck.priceFormatted).toBe("$19.99");
    expect(pricing.fullQuickCheck.billingLabel).toBe("per case");
    expect(pricing.treatmentPlanReview.priceFormatted).toBe("$29.99");
    expect(pricing.treatmentPlanReview.billingLabel).toBe("per case");
    expect(pricing.completeCareIndividual.priceFormatted).toBe("$74.99");
    expect(pricing.completeCareFamily.priceFormatted).toBe("$149.99");
    expect(pricing.completeCareFamily.maxMembers).toBe(4);
    expect(pricing.additionalFamilyMember.priceFormatted).toBe("$19.99");
    expect(app.iosId).toBe("6670311232");
    expect(app.androidPackage).toBe("com.dentaSmart.app.android");
    expect(brand.tagline).toBe("Your Personal AI Dentist in Your Pocket");
  });

  it("keeps active public sources free of Unicode em dashes", () => {
    const files = [
      "client/src",
      "server/metaTags.ts",
      "server/ssrContent.ts",
      "server/seo.ts",
      "shared",
    ];
    const scan = files.flatMap((path) => {
      const target = resolve(root, path);
      const walk = (directory: string): string[] => {
        const { readdirSync, statSync } = require("node:fs") as typeof import("node:fs");
        return readdirSync(directory).flatMap((entry) => {
          const entryPath = resolve(directory, entry);
          if (statSync(entryPath).isDirectory()) return walk(entryPath);
          return /\.(ts|tsx|html)$/.test(entryPath) ? [entryPath] : [];
        });
      };
      return target.endsWith(".ts") ? [target] : walk(target);
    }).filter((path) =>
      !path.endsWith("/shared/routes.ts") &&
      !path.includes("/pages/Admin") &&
      !path.includes("/components/editor/")
    );
    for (const path of scan) {
      expect(withoutNonRenderedComments(readFileSync(path, "utf8"))).not.toContain("—");
    }
  });
});
