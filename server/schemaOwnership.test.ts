import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getBreadcrumbs, createBreadcrumbListSchema } from "../shared/breadcrumbs";
import { app, company, pricing } from "../shared/facts";
import {
  ORGANIZATION_ID,
  SOFTWARE_APPLICATION_ID,
  WEBSITE_ID,
  resolveStaticSchemaMarkup,
} from "../shared/schemaOwnership";
import { normalizeSchemaUrls } from "../shared/jsonLd";

function schemasFor(path: string, title = "Example page", description = "Example educational description.") {
  return resolveStaticSchemaMarkup(path, {
    title,
    description,
    canonical: `https://dentasmart.ai${path === "/" ? "/" : `${path}/`}`,
  });
}

function typeCount(schemas: Record<string, unknown>[], type: string): number {
  return schemas.filter((schema) => schema["@type"] === type).length;
}

describe("Phase 7 source-controlled schema ownership", () => {
  it("gives each server-owned global entity one stable conceptual ID", () => {
    const homepage = schemasFor("/");
    const organization = homepage.find((schema) => schema["@type"] === "Organization");
    const website = homepage.find((schema) => schema["@type"] === "WebSite");
    const application = homepage.find((schema) => schema["@type"] === "SoftwareApplication");

    expect(typeCount(homepage, "Organization")).toBe(1);
    expect(typeCount(homepage, "WebSite")).toBe(1);
    expect(typeCount(homepage, "SoftwareApplication")).toBe(1);
    expect(organization?.["@id"]).toBe(ORGANIZATION_ID);
    expect(website?.["@id"]).toBe(WEBSITE_ID);
    expect(website?.publisher).toEqual({ "@id": ORGANIZATION_ID });
    expect(application?.["@id"]).toBe(SOFTWARE_APPLICATION_ID);
    expect(application?.publisher).toEqual({ "@id": ORGANIZATION_ID });
  });

  it("keeps Product and Offer schema limited to the pricing page and central verified facts", () => {
    const pricingSchemas = schemasFor("/pricing", "Pricing", "Verified DentaSmart pricing.");
    const product = pricingSchemas.find((schema) => schema["@type"] === "Product");
    const offers = product?.offers as Array<Record<string, unknown>>;

    expect(typeCount(pricingSchemas, "Product")).toBe(1);
    expect(product?.isRelatedTo).toEqual({ "@id": SOFTWARE_APPLICATION_ID });
    expect(offers.map((offer) => offer.price)).toEqual([
      pricing.quickCheck.price.toFixed(2),
      pricing.fullQuickCheck.price.toFixed(2),
      pricing.treatmentPlanReview.price.toFixed(2),
      pricing.completeCareIndividual.price.toFixed(2),
      pricing.completeCareFamily.price.toFixed(2),
    ]);
    expect(offers.every((offer) => offer.priceCurrency === "USD")).toBe(true);
    expect(offers.every((offer) => !("priceValidUntil" in offer))).toBe(true);
    expect(JSON.stringify(pricingSchemas)).not.toContain("priceValidUntil");
    expect(typeCount(schemasFor("/dental-costs/root-canal-cost"), "Product")).toBe(0);
  });

  it("preserves verified application stores without presenting paid services as free", () => {
    const application = schemasFor("/").find((schema) => schema["@type"] === "SoftwareApplication");
    expect(application?.installUrl).toEqual([app.iosUrl, app.androidUrl]);
    expect(application?.publisher).toEqual({ "@id": ORGANIZATION_ID });
    expect(application?.name).toBe(company.name);
    expect(JSON.stringify(application)).not.toMatch(/price"\s*:\s*"0"/);
  });

  it("uses the exact shared breadcrumb model for visible navigation and BreadcrumbList JSON-LD", () => {
    const items = getBreadcrumbs("/treatments/root-canal-procedure");
    const breadcrumb = createBreadcrumbListSchema(items);
    const listItems = breadcrumb?.itemListElement as Array<Record<string, unknown>>;

    expect(items.map((item) => item.name)).toEqual(["Home", "Treatments", "Root Canal Procedure"]);
    expect(listItems.map((item) => item.name)).toEqual(items.map((item) => item.name));
    expect(listItems.map((item) => item.item)).toEqual([
      "https://dentasmart.ai/",
      "https://dentasmart.ai/treatments/",
      "https://dentasmart.ai/treatments/root-canal-procedure/",
    ]);
    expect(createBreadcrumbListSchema(getBreadcrumbs("/pricing"))).toBeNull();
    expect(getBreadcrumbs("/editorial-policy")).toEqual([]);
    expect(getBreadcrumbs("/conditions/cavities")).toHaveLength(3);
    expect(getBreadcrumbs("/symptoms/facial-swelling")).toHaveLength(3);
    expect(getBreadcrumbs("/dental-costs/root-canal-cost")).toHaveLength(3);
    expect(getBreadcrumbs("/guides/brushing-guide")).toHaveLength(3);
    expect(getBreadcrumbs("/dental-emergencies/dental-abscess")).toHaveLength(3);
    expect(getBreadcrumbs("/comparisons/braces-vs-invisalign")).toHaveLength(3);
  });

  it("normalizes nested client schema URLs without changing text values or external stores", () => {
    const schema = normalizeSchemaUrls({
      url: "/conditions/cavities",
      item: "https://www.dentasmart.ai/treatments/root-canal-procedure",
      installUrl: [app.iosUrl, app.androidUrl],
      description: "The path /conditions/cavities is content, not a URL field.",
    });

    expect(schema.url).toBe("https://dentasmart.ai/conditions/cavities/");
    expect(schema.item).toBe("https://dentasmart.ai/treatments/root-canal-procedure/");
    expect(schema.installUrl).toEqual([app.iosUrl, app.androidUrl]);
    expect(schema.description).toContain("/conditions/cavities");
  });

  it("keeps the SEO component free of default duplicate global schema and gives it explicit metadata parity duties", () => {
    const source = readFileSync(new URL("../client/src/components/SEO.tsx", import.meta.url), "utf8");
    expect(source).toContain("resolveStaticSchemaMarkup");
    expect(source).toContain("toSchemaUrl(canonical)");
    expect(source).toContain('<title>{pageTitle}</title>');
    expect(source).toContain('data-dentasmart-schema="client"');
    expect(source).not.toContain("const orgJsonLd");
    expect(source).not.toContain("const websiteJsonLd");
    expect(source).not.toContain("const appJsonLd");
  });

  it("renders the shared model as an accessible visible breadcrumb with a non-interactive current item", () => {
    const navigation = readFileSync(new URL("../client/src/components/Navigation.tsx", import.meta.url), "utf8");
    const primitive = readFileSync(new URL("../client/src/components/ui/breadcrumb.tsx", import.meta.url), "utf8");
    expect(navigation).toContain("getBreadcrumbs(location)");
    expect(navigation).toContain("<BreadcrumbList");
    expect(navigation).toContain("<BreadcrumbPage");
    expect(navigation).not.toContain("className=\"contents\"");
    expect(primitive).toContain('aria-label="Breadcrumb"');
    expect(primitive).not.toContain('role="link"');
  });

  it("uses the visible homepage and pricing FAQ arrays as their FAQPage schema sources", () => {
    const home = readFileSync(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8");
    const pricingPage = readFileSync(new URL("../client/src/pages/Pricing.tsx", import.meta.url), "utf8");
    expect(home).toContain("<FAQSchema faqs={homeFaqs}");
    expect(home).toContain("homeFaqs.map");
    expect(pricingPage).toContain("<FAQSchema faqs={pricingFaqs}");
    expect(pricingPage).toContain("pricingFaqs.map");
  });
});
