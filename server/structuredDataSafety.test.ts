import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { normalizeSchemaUrls, serializeJsonLd, toSchemaUrl } from "../shared/jsonLd";
import { resolveMetaTags } from "./metaTags";
import { resolveSchemaMarkup } from "./schemaMarkup";

const projectRoot = new URL("..", import.meta.url);

function readSource(relativePath: string) {
  return readFileSync(new URL(relativePath, projectRoot), "utf8");
}

describe("Phase 7-A JSON-LD safety", () => {
  it("escapes inline-script terminators while preserving the original JSON value", () => {
    const value = {
      text: "</script><script>window.__unsafe = true</script>",
      separators: "<>&\u2028\u2029",
      quotes: "\"double\" and 'single' quotes remain data",
    };

    const serialized = serializeJsonLd(value);

    expect(serialized).not.toContain("</script>");
    expect(serialized).toContain("\\u003c/script\\u003e");
    expect(serialized).toContain("\\u003e");
    expect(serialized).toContain("\\u0026");
    expect(JSON.parse(serialized)).toEqual(value);
  });

  it("uses the shared serializer at every active JSON-LD script emitter", () => {
    const emitters = [
      "client/src/components/SEO.tsx",
      "client/src/components/StructuredData.tsx",
      "client/src/components/FAQSchema.tsx",
      "client/src/pages/Answers.tsx",
      "client/src/pages/InstantScan.tsx",
      "server/_core/vite.ts",
    ];

    for (const emitter of emitters) {
      const source = readSource(emitter);
      expect(source, emitter).toContain("serializeJsonLd");
      expect(source, emitter).not.toMatch(/application\/ld\+json[^\n]*JSON\.stringify/);
    }
  });
});

describe("Phase 7-A schema URL normalization", () => {
  it("normalizes only internal DentaSmart page URLs to the approved apex and trailing-slash form", () => {
    expect(toSchemaUrl("https://dentasmart.ai/")).toBe("https://dentasmart.ai/");
    expect(toSchemaUrl("/pricing")).toBe("https://dentasmart.ai/pricing/");
    expect(toSchemaUrl("/pricing/")).toBe("https://dentasmart.ai/pricing/");
    expect(toSchemaUrl("/conditions/cavities")).toBe("https://dentasmart.ai/conditions/cavities/");
    expect(toSchemaUrl("/conditions/cavities/")).toBe("https://dentasmart.ai/conditions/cavities/");
    expect(toSchemaUrl("/oral-health-hub/example")).toBe(
      "https://dentasmart.ai/oral-health-hub/example/",
    );
    expect(toSchemaUrl("https://dentasmart.ai/#organization")).toBe(
      "https://dentasmart.ai/#organization",
    );
    expect(toSchemaUrl("https://www.dentasmart.ai/symptoms/mouth-sores?ref=guide#faq")).toBe(
      "https://dentasmart.ai/symptoms/mouth-sores/?ref=guide#faq",
    );
    expect(toSchemaUrl("https://dentasmart.ai/pricing?source=guide")).toBe(
      "https://dentasmart.ai/pricing/?source=guide",
    );
    expect(toSchemaUrl("https://partner.example/article")).toBe("https://partner.example/article");
    expect(toSchemaUrl("https://apps.apple.com/us/app/dentasmart/id1234567890")).toBe(
      "https://apps.apple.com/us/app/dentasmart/id1234567890",
    );
    expect(toSchemaUrl("https://play.google.com/store/apps/details?id=com.dentasmart.app")).toBe(
      "https://play.google.com/store/apps/details?id=com.dentasmart.app",
    );
    expect(toSchemaUrl("https://dentasmart.ai/images/logo.png")).toBe(
      "https://dentasmart.ai/images/logo.png",
    );
    expect(toSchemaUrl("https://dentasmart.ai/files/dental-guide.pdf")).toBe(
      "https://dentasmart.ai/files/dental-guide.pdf",
    );
    expect(toSchemaUrl("not a URL")).toBe("not a URL");
  });

  it("normalizes nested schema URL fields while preserving hostile text values exactly", () => {
    const value = {
      url: "/conditions/cavities",
      acceptedAnswer: { text: "</script><script>alert(1)</script> <>&\"'\u2028\u2029" },
    };
    const normalized = normalizeSchemaUrls(value);
    const serialized = serializeJsonLd(normalized);

    expect(normalized.url).toBe("https://dentasmart.ai/conditions/cavities/");
    expect(JSON.parse(serialized)).toEqual(normalized);
    expect(serialized).not.toContain("</script>");
  });

  it("keeps homepage schema free of SearchAction and emits normalized internal URLs", async () => {
    const schemas = await resolveSchemaMarkup("/");
    const serialized = JSON.stringify(schemas);

    expect(serialized).not.toContain("SearchAction");
    expect(serialized).toContain("https://dentasmart.ai/");
    expect(serialized).toContain("https://dentasmart.ai/faqs/");
    expect(serialized).toContain("https://dentasmart.ai/download/");
  });
});

describe("Phase 7-A reviewer metadata truth", () => {
  it("removes the unsupported named reviewer claim from Team metadata", async () => {
    const metadata = await resolveMetaTags("/team/");
    const teamSource = readSource("client/src/pages/Team.tsx");

    expect(metadata).not.toBeNull();
    expect(metadata.description).not.toMatch(/named dental content reviewer/i);
    expect(teamSource).not.toMatch(/named dental content reviewer/i);
    expect(metadata.description).toContain("leadership team and strategic advisors");
  });
});
