import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  asGovernedPublicSources,
  getDisplayableEvidenceSources,
  getPublicEvidence,
  getPublicEvidenceForRoute,
  isEvidenceFresh,
  publicClaimUseMap,
  publicEvidenceRegistry,
  resolvePublicEvidenceSources,
} from "../shared/evidenceRegistry";
import { parseGovernedAnswer, parseGovernedFaqs } from "./governedBlogEvidence";
import { buildRobotsTxt, publicRobotsAgents } from "./seo";

const fromRepo = (relativePath: string) => readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");

describe("Phase 4 public evidence registry", () => {
  it("keeps every public source display-safe, external, scoped, and fresh at its expected cadence", () => {
    for (const source of Object.values(publicEvidenceRegistry)) {
      expect(source.publicDisplayAllowed).toBe(true);
      expect(source.url).toMatch(/^https:\/\//);
      expect(source.sourceScope.trim().length).toBeGreaterThan(20);
      expect(source.claimKeys.length).toBeGreaterThan(0);
      expect(source.allowedRoutes.length).toBeGreaterThan(0);
      expect(isEvidenceFresh(source, new Date("2026-09-23T12:00:00Z"))).toBe(true);
    }
  });

  it("maps price, app availability, family capacity, and Treatment Plan Review claims to their owning public pages", () => {
    expect(publicClaimUseMap.DENTASMART_PRICE_FREE_QUICK_CHECK).toContain("/pricing/");
    expect(publicClaimUseMap.DENTASMART_APP_AVAILABILITY).toContain("/download/");
    expect(publicClaimUseMap.DENTASMART_FAMILY_CAPACITY).toContain("/pricing/");
    expect(publicClaimUseMap.DENTASMART_TREATMENT_PLAN_REVIEW_BOUNDARY).toContain("/product-facts/");
  });

  it("returns only route-authorized sources and preserves public source dates and scopes", () => {
    const pricing = getPublicEvidenceForRoute("/pricing/");
    expect(pricing.map((source) => source.id)).toContain("dentasmart-pricing");
    expect(getPublicEvidenceForRoute("/treatments/root-canal-procedure/").map((source) => source.id)).toEqual(
      expect.arrayContaining(["ada-root-canals", "aae-root-canal-safety"]),
    );
    expect(getPublicEvidenceForRoute("/dental-emergencies/severe-toothache/").map((source) => source.id)).toContain("ada-dental-emergencies");
    expect(getPublicEvidence("iosStore", "androidStore").every((source) => source.accessedOn && source.sourceScope)).toBe(true);
  });

  it("uses exact clinical route ownership instead of family-wide source defaults", () => {
    for (const source of Object.values(publicEvidenceRegistry)) {
      expect(source.allowedRoutes.every((route) => !route.includes("*"))).toBe(true);
    }

    expect(getPublicEvidenceForRoute("/conditions/cavities/").map((source) => source.id)).toContain("nidcr-oral-hygiene");
    expect(getPublicEvidenceForRoute("/symptoms/toothache/").map((source) => source.id)).not.toContain("nidcr-oral-hygiene");
    expect(getPublicEvidenceForRoute("/dental-costs/root-canal-cost/").map((source) => source.id)).not.toContain("who-oral-health");
    expect(getPublicEvidenceForRoute("/dental-emergencies/dental-emergency-guide/").map((source) => source.id)).toContain("ada-dental-emergencies");
    expect(getPublicEvidenceForRoute("/dental-emergencies/").map((source) => source.id)).not.toContain("ada-dental-emergencies");
  });

  it("fails closed when an explicit source set is empty or not public-display eligible", () => {
    expect(resolvePublicEvidenceSources({ governedSources: [], route: "/treatments/root-canal-procedure/" })).toEqual([]);
    expect(resolvePublicEvidenceSources({ sources: [], route: "/pricing/" })).toEqual([]);
    expect(resolvePublicEvidenceSources({ route: "/does-not-exist/" })).toEqual([]);
    expect(
      getDisplayableEvidenceSources([
        {
          id: "not-public",
          title: "Unapproved source",
          url: "https://example.org/not-public",
          sourceType: "other",
          verificationStatus: "pending_verification",
          publicDisplayAllowed: false,
        },
      ]),
    ).toEqual([]);
  });

  it("creates public governed source references without private registry fields", () => {
    const [pricingSource] = asGovernedPublicSources(getPublicEvidence("pricing"));
    expect(pricingSource).toMatchObject({
      id: "dentasmart-pricing",
      publicDisplayAllowed: true,
      verificationStatus: "verified",
    });
    expect(pricingSource).not.toHaveProperty("allowedRoutes");
    expect(pricingSource.appliesTo).toContain("DENTASMART_PRICE_FREE_QUICK_CHECK");
  });
});

describe("Phase 4 public display and reviewer fail-closed controls", () => {
  it("renders explicit text links, readable dates, scope, and no source-only icons", () => {
    const component = fromRepo("client/src/components/ExternalSources.tsx");
    expect(component).toContain('target="_blank"');
    expect(component).toContain('rel="noopener noreferrer"');
    expect(component).toContain("opens in a new tab");
    expect(component).toContain("Published ${sourceDate}");
    expect(component).toContain("Checked ${accessedOn}");
    expect(component).toContain("Applies to:");
    expect(component).toContain('if (visibleSources.length === 0) return null');
    expect(component).toContain("resolvePublicEvidenceSources({ sources, governedSources, route })");
    expect(component).toContain("getDisplayableEvidenceSources(resolvePublicEvidenceSources({ sources, governedSources, route }))");
    expect(component).not.toContain("routeFallback");
  });

  it("does not manufacture governed answers, FAQs, reviewer attribution, or provenance for legacy blog records", () => {
    expect(parseGovernedAnswer(null)).toBeUndefined();
    expect(parseGovernedAnswer("   ")).toBeUndefined();
    expect(parseGovernedAnswer("Approved answer")).toBe("Approved answer");
    expect(parseGovernedFaqs(null)).toEqual([]);
    expect(parseGovernedFaqs('{"question":"Not an array"}')).toEqual([]);
    expect(parseGovernedFaqs('[{"question":"Question?","answer":"Approved answer."}]')).toEqual([
      { question: "Question?", answer: "Approved answer." },
    ]);

    const resolver = fromRepo("server/governedBlogEvidence.ts");
    expect(resolver).toContain("if (!post.governanceCandidateId) return undefined");
    expect(resolver).toContain("if (currentVersionHash !== run.contentVersionHash) return undefined");
    expect(resolver).toContain("if (!approval?.publicDisplayAllowed");
    expect(resolver).toContain('verificationStatus: "not_applicable"');
  });

  it("preserves the reviewer and MedicalWebPage fail-closed model without an aggregate rating", () => {
    const reviewMetadata = fromRepo("server/reviewMetadata.ts");
    const schema = fromRepo("server/schemaMarkup.ts");
    expect(reviewMetadata).toContain("undefined");
    expect(schema).not.toMatch(/aggregateRating/i);
    expect(schema).toContain("getVerifiedReviewMetadata(cleanedPath)");
    expect(schema).toContain("if (reviewMetadata)");
    expect(schema).toContain("legacy CMS reviewer name is not verified public-author schema evidence");
  });
});

describe("Phase 4 machine-readable policy", () => {
  it("keeps named AI crawler groups aligned with universal admin and API protection", () => {
    const robots = buildRobotsTxt();
    for (const agent of publicRobotsAgents) {
      expect(robots).toContain(`User-agent: ${agent}`);
      const start = robots.indexOf(`User-agent: ${agent}`);
      const next = robots.indexOf("User-agent:", start + 1);
      const group = robots.slice(start, next === -1 ? undefined : next);
      expect(group).toContain("Allow: /");
      expect(group).toContain("Disallow: /admin/");
      expect(group).toContain("Disallow: /api/");
    }
  });

  it("uses dynamic LLM manifests only, so static copies cannot drift", () => {
    expect(() => readFileSync(new URL("../client/public/llms.txt", import.meta.url), "utf8")).toThrow();
    expect(() => readFileSync(new URL("../client/public/llms-full.txt", import.meta.url), "utf8")).toThrow();
    const seo = fromRepo("server/seo.ts");
    expect(seo).toContain('app.get("/llms.txt"');
    expect(seo).toContain('app.get("/llms-full.txt"');
  });
});

describe("Phase 4 template and SSR safety", () => {
  it("binds clinical and comparison templates to route-scoped evidence", () => {
    for (const relativePath of [
      "client/src/pages/conditions/ConditionPage.tsx",
      "client/src/pages/symptoms/SymptomPage.tsx",
      "client/src/pages/treatments/TreatmentPageTemplate.tsx",
      "client/src/pages/dental-emergencies/EmergencyPageTemplate.tsx",
      "client/src/pages/dental-costs/CostPageTemplate.tsx",
      "client/src/pages/guides/GuidePage.tsx",
      "client/src/pages/comparisons/ComparisonPageTemplate.tsx",
    ]) {
      expect(fromRepo(relativePath)).toContain("<ExternalSources");
    }
  });

  it("keeps emergency escalation before the conversion component and refuses generic unknown clinical SSR", () => {
    const emergency = fromRepo("client/src/pages/dental-emergencies/EmergencyPageTemplate.tsx");
    expect(emergency.indexOf("When to get emergency help")).toBeLessThan(emergency.indexOf("<MidContentCTA"));
    const ssr = fromRepo("server/ssrContent.ts");
    expect(ssr).toContain("if (!isSourceControlledSsrPath(cleanPath)) return null");
    expect(ssr).toContain("Do not synthesize health content for an unknown");
  });

  it("keeps Product Facts and core owners connected to a visible evidence block", () => {
    expect(fromRepo("client/src/pages/governance/GovernancePage.tsx")).toContain("How these facts are checked");
    for (const relativePath of [
      "client/src/pages/Pricing.tsx",
      "client/src/pages/FAQs.tsx",
      "client/src/pages/Download.tsx",
      "client/src/pages/FreeAiTeethScanner.tsx",
      "client/src/pages/DentaSmartVsChatGPT.tsx",
    ]) {
      expect(fromRepo(relativePath)).toContain("<ExternalSources");
    }
  });
});
