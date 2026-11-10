import { afterEach, describe, expect, it } from "vitest";
import { conditionsData } from "../client/src/data/conditions";
import { legacyConditionToCmsDocument } from "../shared/cmsConditionAdapter";
import { cmsDocumentSchema } from "../shared/cmsBlocks";
import { isCmsTestPublicationEnvironment, validateCmsTestPublication } from "./cmsTestPublication";

const previousUrl = process.env.DATABASE_URL;
afterEach(() => {
  if (previousUrl === undefined) delete process.env.DATABASE_URL;
  else process.env.DATABASE_URL = previousUrl;
});

describe("CMS publish environment isolation", () => {
  it("allows only the explicitly isolated Codespace test database", () => {
    process.env.DATABASE_URL = "mysql://test:placeholder@127.0.0.1:3307/dentasmart_test";
    expect(isCmsTestPublicationEnvironment()).toBe(true);
    process.env.DATABASE_URL = "mysql://test:placeholder@localhost:3307/dentasmart_test";
    expect(isCmsTestPublicationEnvironment()).toBe(true);
  });

  it("rejects production-like URLs even with NODE_ENV=production", () => {
    const rejected = [
      "mysql://test:placeholder@localhost:3306/dentasmart_test",
      "mysql://test:placeholder@localhost:3307/dentasmart_prod",
      "mysql://test:placeholder@db.example.org:3307/dentasmart_test",
      "mysql://test:placeholder@localhost:3307/djanjo-xray",
      "not a valid url",
    ];
    for (const url of rejected) {
      process.env.DATABASE_URL = url;
      expect(isCmsTestPublicationEnvironment(), url).toBe(false);
    }
  });
});

describe("CMS test-publication medical safety", () => {
  const document = legacyConditionToCmsDocument(conditionsData.toothache);

  it("accepts the untouched Toothache educational content for a test-only publication", () => {
    expect(validateCmsTestPublication(document)).toBeNull();
  });

  it("lets editors remove urgent care from private drafts but blocks medical test publishing", () => {
    const blocks = document.blocks.filter(block => block.type !== "urgent_care");
    expect(cmsDocumentSchema.safeParse({ ...document, blocks }).success).toBe(true);
    expect(validateCmsTestPublication({ ...document, blocks })).toMatch(/urgent dental-care instructions/i);
  });

  it("allows Toothache TEST publishing with CTA before Urgent Care when emergency guidance remains complete", () => {
    const urgent = document.blocks.find(block => block.type === "urgent_care")!;
    const withoutUrgent = document.blocks.filter(block => block.type !== "urgent_care");
    const moved = [...withoutUrgent,
      { id: "cta-for-test", type: "cta" as const,
        heading: "Download app", description: "Learn about the app", buttonLabel: "Learn more", buttonUrl: "/app" },
      urgent];
    expect(cmsDocumentSchema.safeParse({ ...document, blocks: moved }).success).toBe(true);
    expect(validateCmsTestPublication({ ...document, blocks: moved })).toBeNull();
    const corrected = [...withoutUrgent, urgent,
      { id: "cta-for-test", type: "cta" as const,
        heading: "Download app", description: "Learn about the app", buttonLabel: "Learn more", buttonUrl: "/app" }];
    expect(validateCmsTestPublication({ ...document, blocks: corrected })).toBeNull();
  });

  it("preserves the document title/H1 if the optional Page Header block is removed", () => {
    const blocks = document.blocks.filter(block => block.type !== "hero");
    expect(cmsDocumentSchema.safeParse({ ...document, blocks }).success).toBe(true);
    expect(document.title.trim().length).toBeGreaterThan(0);
  });

  it("rejects a deleted urgent-care warning", () => {
    const blocks = document.blocks.map((block) =>
      block.type === "urgent_care" ? { ...block, items: ["Consider seeing a dentist."] } : block,
    );
    expect(validateCmsTestPublication({ ...document, blocks })).toMatch(/emergency instructions/i);
  });

  it("rejects unapproved page families during the initial pilot", () => {
    expect(validateCmsTestPublication({ ...document, slug: "cavities" })).toMatch(/toothache pilot/i);
  });

  it("permits draft-only empty images but never TEST publishes them", () => {
    const withEmptyImage = {
      ...document,
      blocks: [...document.blocks, { id: "unselected-image", type: "image" as const, image: null }],
    };
    expect(cmsDocumentSchema.safeParse(withEmptyImage).success).toBe(true);
    expect(validateCmsTestPublication(withEmptyImage)).toMatch(/select an image/i);
  });
  it("rejects missing SEO metadata", () => {
    expect(validateCmsTestPublication({
      ...document,
      seo: { ...document.seo, metaTitle: "" },
    })).toMatch(/SEO title/i);
  });
});
