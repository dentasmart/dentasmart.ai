import { describe, it, expect } from "vitest";
import { resolveMetaTags, injectMetaTags } from "./metaTags";
import { resolveSSRContent } from "./ssrContent";
import { resolveSchemaMarkup } from "./schemaMarkup";

describe("SEO Architecture", () => {
  describe("Canonical Tags (resolveMetaTags)", () => {
    it("returns canonical for homepage", async () => {
      const meta = await resolveMetaTags("/");
      expect(meta).not.toBeNull();
      expect(meta!.canonical).toBe("https://dentasmart.ai/");
    });

    it("returns canonical for condition page", async () => {
      const meta = await resolveMetaTags("/conditions/toothache");
      expect(meta).not.toBeNull();
      expect(meta!.canonical).toBe("https://dentasmart.ai/conditions/toothache/");
    });

    it("returns canonical for symptom page", async () => {
      const meta = await resolveMetaTags("/symptoms/bad-breath");
      expect(meta).not.toBeNull();
      expect(meta!.canonical).toBe("https://dentasmart.ai/symptoms/bad-breath/");
    });

    it("returns canonical for cost page", async () => {
      const meta = await resolveMetaTags("/dental-costs/dental-crown-cost");
      expect(meta).not.toBeNull();
      expect(meta!.canonical).toBe("https://dentasmart.ai/dental-costs/dental-crown-cost/");
    });

    it("returns unique title per page", async () => {
      const home = await resolveMetaTags("/");
      const pricing = await resolveMetaTags("/pricing");
      const condition = await resolveMetaTags("/conditions/toothache");
      expect(home!.title).not.toBe(pricing!.title);
      expect(home!.title).not.toBe(condition!.title);
      expect(pricing!.title).not.toBe(condition!.title);
    });

    it("returns unique description per page", async () => {
      const home = await resolveMetaTags("/");
      const pricing = await resolveMetaTags("/pricing");
      expect(home!.description).not.toBe(pricing!.description);
    });

    it("injectMetaTags replaces all __PAGE_*__ placeholders", () => {
      const template = `<html><head>
    <title>__PAGE_TITLE__</title>
    <meta name="description" content="__PAGE_DESCRIPTION__" />
    <meta property="og:title" content="__PAGE_TITLE__" />
    <meta property="og:description" content="__PAGE_DESCRIPTION__" />
    <meta property="og:url" content="__PAGE_CANONICAL__" />
    <meta name="twitter:title" content="__PAGE_TITLE__" />
    <meta name="twitter:description" content="__PAGE_DESCRIPTION__" />
    <link rel="canonical" href="__PAGE_CANONICAL__" />
  </head><body></body></html>`;

      const result = injectMetaTags(template, {
        title: "Test Page",
        description: "Test description",
        canonical: "https://dentasmart.ai/test-page",
      });

      // No placeholders should remain
      expect(result).not.toContain('__PAGE_TITLE__');
      expect(result).not.toContain('__PAGE_DESCRIPTION__');
      expect(result).not.toContain('__PAGE_CANONICAL__');

      // Exactly one canonical
      const canonicalMatches = result.match(/rel="canonical"/g);
      expect(canonicalMatches).toHaveLength(1);
      expect(result).toContain('href="https://dentasmart.ai/test-page"');

      // Title replaced in all 3 locations (title, og:title, twitter:title)
      const titleMatches = result.match(/Test Page/g);
      expect(titleMatches).toHaveLength(3);

      // Description replaced in all 3 locations
      const descMatches = result.match(/Test description/g);
      expect(descMatches).toHaveLength(3);
    });
  });

  describe("SSR Content Injection (resolveSSRContent)", () => {
    it("returns SSR content for homepage", async () => {
      const content = await resolveSSRContent("/");
      expect(content).not.toBeNull();
      expect(content!.html).toContain("<h1>");
      expect(content!.html).toContain("DentaSmart");
    });

    it("returns SSR content for condition page", async () => {
      const content = await resolveSSRContent("/conditions/toothache");
      expect(content).not.toBeNull();
      expect(content!.html).toContain("<h1>");
      expect(content!.html).toContain("Toothache");
      expect(content!.html).toContain("breadcrumb");
    });

    it("returns SSR content for symptom page", async () => {
      const content = await resolveSSRContent("/symptoms/bad-breath");
      expect(content).not.toBeNull();
      expect(content!.html).toContain("<h1>");
      expect(content!.html).toContain("Bad Breath");
    });

    it("returns SSR content for cost page", async () => {
      const content = await resolveSSRContent("/dental-costs/dental-crown-cost");
      expect(content).not.toBeNull();
      expect(content!.html).toContain("<h1>");
      expect(content!.html).toContain("Dental Crown Cost");
    });

    it("returns SSR content for treatment page", async () => {
      const content = await resolveSSRContent("/treatments/root-canal-procedure");
      expect(content).not.toBeNull();
      expect(content!.html).toContain("<h1>");
      expect(content!.html).toContain("Root Canal");
    });

    it("returns SSR content for comparison page", async () => {
      const content = await resolveSSRContent("/comparisons/braces-vs-invisalign");
      expect(content).not.toBeNull();
      expect(content!.html).toContain("<h1>");
    });

    it("returns SSR content for guide page", async () => {
      const content = await resolveSSRContent("/guides/brushing-guide");
      expect(content).not.toBeNull();
      expect(content!.html).toContain("<h1>");
    });

    it("returns SSR content for life-stage page", async () => {
      const content = await resolveSSRContent("/life-stages/baby-teething-guide");
      expect(content).not.toBeNull();
      expect(content!.html).toContain("<h1>");
    });

    it("returns SSR content for emergency page", async () => {
      const content = await resolveSSRContent("/dental-emergencies/knocked-out-tooth");
      expect(content).not.toBeNull();
      expect(content!.html).toContain("<h1>");
    });

    it("returns SSR content for lifestyle page", async () => {
      const content = await resolveSSRContent("/lifestyle/smoking-and-oral-health");
      expect(content).not.toBeNull();
      expect(content!.html).toContain("<h1>");
    });

    it("SSR content includes internal links for crawlability", async () => {
      const content = await resolveSSRContent("/");
      expect(content).not.toBeNull();
      expect(content!.html).toContain('href="/');
    });

    it("returns null for unknown/admin paths", async () => {
      const content = await resolveSSRContent("/admin/dashboard");
      expect(content).toBeNull();
    });
  });

  describe("Schema Markup (resolveSchemaMarkup)", () => {
    it("returns Organization schema on every page", async () => {
      const schemas = await resolveSchemaMarkup("/");
      const types = schemas.map((s: any) => s["@type"]);
      expect(types).toContain("Organization");
    });

    it("returns WebSite + SoftwareApplication on homepage", async () => {
      const schemas = await resolveSchemaMarkup("/");
      const types = schemas.map((s: any) => s["@type"]);
      expect(types).toContain("WebSite");
      expect(types).toContain("SoftwareApplication");
    });

    it("returns MedicalWebPage for condition pages", async () => {
      const schemas = await resolveSchemaMarkup("/conditions/toothache");
      const types = schemas.map((s: any) => s["@type"]);
      expect(types).toContain("MedicalWebPage");
      expect(types).toContain("BreadcrumbList");
    });

    it("returns MedicalWebPage for symptom pages", async () => {
      const schemas = await resolveSchemaMarkup("/symptoms/bad-breath");
      const types = schemas.map((s: any) => s["@type"]);
      expect(types).toContain("MedicalWebPage");
      expect(types).toContain("BreadcrumbList");
    });

    it("returns Product schema for pricing page", async () => {
      const schemas = await resolveSchemaMarkup("/pricing");
      const types = schemas.map((s: any) => s["@type"]);
      expect(types).toContain("Product");
      expect(types).not.toContain("BreadcrumbList");
    });

    it("returns HowTo schema for how-it-works page", async () => {
      const schemas = await resolveSchemaMarkup("/how-it-works");
      const types = schemas.map((s: any) => s["@type"]);
      expect(types).toContain("HowTo");
    });

    it("returns BreadcrumbList for nested pages", async () => {
      const schemas = await resolveSchemaMarkup("/dental-costs/dental-crown-cost");
      const types = schemas.map((s: any) => s["@type"]);
      expect(types).toContain("BreadcrumbList");
    });

    it("returns MedicalWebPage for emergency pages", async () => {
      const schemas = await resolveSchemaMarkup("/dental-emergencies/knocked-out-tooth");
      const types = schemas.map((s: any) => s["@type"]);
      expect(types).toContain("MedicalWebPage");
    });

    it("BreadcrumbList has correct structure", async () => {
      const schemas = await resolveSchemaMarkup("/conditions/toothache");
      const breadcrumb = schemas.find((s: any) => s["@type"] === "BreadcrumbList") as any;
      expect(breadcrumb).toBeDefined();
      expect(breadcrumb.itemListElement).toHaveLength(3);
      expect(breadcrumb.itemListElement[0].name).toBe("Home");
      expect(breadcrumb.itemListElement[1].name).toBe("Conditions");
      expect(breadcrumb.itemListElement[2].name).toBe("Toothache");
    });
  });
});
