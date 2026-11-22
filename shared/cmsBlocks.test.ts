import { describe, expect, it } from "vitest";
import {
  cmsDocumentSchema,
  getCmsPublishedHeading,
  getCmsHeadingOrderWarnings,
  getCmsUrgentCarePositionWarning,
  insertCmsBlock,
  restoreCmsDeletedBlock,
  moveCmsBlock,
  resolveCmsSocialImage,
  validateCmsBlockOrder,
  type CmsBlock,
} from "./cmsBlocks";

const blocks: CmsBlock[] = [
  { id: "hero", type: "hero", heading: "Toothache", subheading: "When to seek care" },
  { id: "quick", type: "quick_answer", heading: "Quick Answer", answer: "Symptoms require evaluation." },
  { id: "urgent", type: "urgent_care", heading: "Urgent Care", items: ["Seek emergency care for trouble breathing."] },
  { id: "causes", type: "causes", heading: "Common Causes", items: [] },
  { id: "cta", type: "cta", heading: "Next Steps", description: "", buttonLabel: "Learn More", buttonUrl: "/how-it-works" },
];

describe("CMS block movement", () => {
  it("moves an ordinary section while preserving input", () => {
    const original = blocks.map((block) => block.id);
    const result = moveCmsBlock(blocks, 3, 1, "condition");
    expect(result.ok).toBe(true);
    expect(result.blocks.map((block) => block.id)).toEqual(["hero", "causes", "quick", "urgent", "cta"]);
    expect(blocks.map((block) => block.id)).toEqual(original);
  });

  it("allows placing Urgent Care below a CTA in a private draft but warns", () => {
    const result = moveCmsBlock(blocks, 2, 4, "condition");
    expect(result.ok).toBe(true);
    expect(result.blocks.at(-1)?.type).toBe("urgent_care");
    expect(getCmsUrgentCarePositionWarning(result.blocks, "condition")).toMatch(/place urgent care before/i);
    expect(getCmsUrgentCarePositionWarning(result.blocks, "guide")).toBeNull();
    expect(blocks[2].type).toBe("urgent_care");
  });

  it("allows Page Header to move in the editor without changing the page title H1", () => {
    const result = moveCmsBlock(blocks, 0, 2, "condition");
    expect(result.ok).toBe(true);
    expect(result.blocks[2].type).toBe("hero");
    expect(getCmsPublishedHeading({ title: "Independent H1" })).toBe("Independent H1");
  });

  it("allows an incomplete medical private draft without urgent care or Page Header", () => {
    const withoutUrgent = blocks.filter(block => block.type !== "urgent_care");
    const withoutHero = blocks.filter(block => block.type !== "hero");
    expect(validateCmsBlockOrder(withoutUrgent, "condition")).toBeNull();
    expect(validateCmsBlockOrder(withoutHero, "condition")).toBeNull();
    expect(validateCmsBlockOrder(withoutUrgent.filter(block => block.type !== "hero"), "condition")).toBeNull();
  });

  it("accepts different section orders in private drafts, including after a CTA", () => {
    const rearranged = [...blocks.filter(b => b.type !== "urgent_care"),
      blocks.find(b => b.type === "urgent_care")!];
    expect(validateCmsBlockOrder(rearranged, "condition")).toBeNull();
    expect(getCmsUrgentCarePositionWarning(rearranged, "condition")).toContain("Recommended");
    expect(getCmsUrgentCarePositionWarning(blocks, "condition")).toBeNull();
    expect(getCmsUrgentCarePositionWarning(blocks.filter(b => b.type !== "urgent_care"), "condition")).toMatch(/missing/i);
  });

  it("rejects duplicate section IDs", () => {
    expect(validateCmsBlockOrder([...blocks, blocks[1]], "blog")).toMatch(/unique ID/i);
  });

  it("rejects invalid indices", () => {
    expect(moveCmsBlock(blocks, 100, 0, "blog").ok).toBe(false);
  });

  it("allows section-level removal of all 12 block types from private drafts", () => {
    const examples: CmsBlock[] = [
      { id: "hero", type: "hero", heading: "Test", subheading: "" },
      { id: "quick", type: "quick_answer", heading: "Quick Answer", answer: "" },
      { id: "urgent", type: "urgent_care", heading: "Urgent Care", items: ["Emergency instructions"] },
      { id: "rich", type: "rich_text", heading: "Overview", html: "<p>Text</p>" },
      { id: "causes", type: "causes", heading: "Causes", items: [] },
      { id: "symptoms", type: "symptoms", heading: "Symptoms", items: [] },
      { id: "list", type: "list", heading: "List", items: [] },
      { id: "faq", type: "faq", heading: "FAQs", items: [] },
      { id: "links", type: "related_links", heading: "Related links", links: [] },
      { id: "image", type: "image", image: null },
      { id: "table", type: "table", heading: "Table", headers: ["Column A"], rows: [] },
      { id: "cta", type: "cta", heading: "Next", description: "", buttonLabel: "Read", buttonUrl: "/" },
    ];
    expect(examples).toHaveLength(12);
    expect(validateCmsBlockOrder(examples, "condition")).toBeNull();
    for (const removed of examples) {
      const updated = examples.filter(b => b.id !== removed.id);
      expect(validateCmsBlockOrder(updated, "condition"), "Could not remove " + removed.type).toBeNull();
    }
  });

  it("appends new sections for manual placement, without forcing Urgent Care above CTA", () => {
    for (const contentType of ["condition", "symptom"] as const) {
      const withoutUrgent = blocks.filter(b => b.type !== "urgent_care");
      const inserted = insertCmsBlock(withoutUrgent,
        { id: "urgent-added", type: "urgent_care", heading: "Urgent Care", items: ["Call a dentist"] },
        contentType);
      expect(inserted.ok).toBe(true);
      expect(inserted.blocks.at(-1)?.type).toBe("urgent_care");
      expect(getCmsUrgentCarePositionWarning(inserted.blocks, contentType)).not.toBeNull();
    }
  });

  it("appends a newly added Page Header but still rejects duplicates", () => {
    const noHero = blocks.filter(b => b.type !== "hero");
    const hero: CmsBlock = { id: "restored-hero", type: "hero", heading: "Toothache", subheading: "" };
    expect(insertCmsBlock(noHero, hero, "condition").blocks.at(-1)).toEqual(hero);
    expect(insertCmsBlock(blocks, hero, "condition").ok).toBe(false);
  });

  it("undo restores exact original content and position, without duplicates", () => {
    const removed = { block: blocks[2], index: 2 };
    const deleted = blocks.filter(block => block.id !== removed.block.id);
    expect(restoreCmsDeletedBlock(deleted, removed, "condition").blocks).toEqual(blocks);
    expect(restoreCmsDeletedBlock(blocks, removed, "condition").ok).toBe(false);
    const restoredAtEnd = restoreCmsDeletedBlock(deleted, { ...removed, index: 100 }, "condition");
    expect(restoredAtEnd.ok).toBe(true);
    expect(restoredAtEnd.blocks.at(-1)).toEqual(removed.block);
  });

  it("stores only H2–H4 levels, with H2 as the legacy default", () => {
    const base = { ...blocks[3], headingLevel: "h3" as const };
    const withLevels = cmsDocumentSchema.parse({
      contentType: "condition", slug: "test-headings", title: "Sample H1",
      templateKey: "condition-draft", templateVersion: 1,
      blocks: [...blocks.slice(0, 3), base, { ...blocks[4], headingLevel: "h4" }],
      images: {}, seo: { focusKeyword: "", secondaryKeywords: [] },
    });
    expect(withLevels.blocks[3].headingLevel).toBe("h3");
    expect(withLevels.blocks[4].headingLevel).toBe("h4");
    expect(withLevels.blocks[1].headingLevel).toBeUndefined();
    expect(getCmsHeadingOrderWarnings(withLevels.blocks)).toEqual([]);
    const skippedLevel = withLevels.blocks.map((block, i) => i === 3
      ? { ...block, headingLevel: "h4" as const } : block);
    expect(getCmsHeadingOrderWarnings(skippedLevel).length).toBeGreaterThan(0);
    expect(cmsDocumentSchema.safeParse({
      ...withLevels, blocks: withLevels.blocks.map((block, i) => i === 3 ? { ...block, headingLevel: "h1" } : block),
    }).success).toBe(false);
    expect(cmsDocumentSchema.safeParse({
      ...withLevels, blocks: [...withLevels.blocks, { id: "img-heading", type: "image",
        image: null, heading: "Before treatment", headingLevel: "h3" }],
    }).success).toBe(true);
  });
});

describe("CMS independent images", () => {
  const featured = { url: "/featured.webp", altText: "Featured image" };
  const hero = { url: "/hero.webp", altText: "Hero image" };
  const og = { url: "/og.webp", altText: "Social image" };

  it("uses the custom OG image when provided", () => {
    expect(resolveCmsSocialImage({ featured, hero, og })).toEqual(og);
  });

  it("falls back to the featured image, never the hero", () => {
    expect(resolveCmsSocialImage({ featured, hero })).toEqual(featured);
    expect(resolveCmsSocialImage({ hero })).toBeNull();
  });
});

describe("CMS document validation", () => {
  it("accepts a medical page with verified structural ordering", () => {
    expect(cmsDocumentSchema.safeParse({
      contentType: "condition",
      slug: "toothache",
      title: "Toothache",
      templateKey: "condition-standard",
      templateVersion: 1,
      blocks,
      images: {},
      seo: { focusKeyword: "toothache", secondaryKeywords: ["tooth pain"] },
    }).success).toBe(true);
  });
});


describe("CMS visible page titles", () => {
  it("uses edited Page title as the visible H1 even with a legacy hero heading", () => {
    const document = {
      title: "Toothaches: How to Get Relief and When to Call a test",
      blocks: [{ id: "hero", type: "hero", heading: "Toothache", subheading: "" }],
      seo: { metaTitle: "Toothache Causes, Relief & Treatment | DentaSmart" },
    };
    expect(getCmsPublishedHeading(document)).toBe(document.title);
    expect(getCmsPublishedHeading(document)).not.toBe(document.blocks[0].heading);
    expect(getCmsPublishedHeading(document)).not.toBe(document.seo.metaTitle);
  });
});

describe("CMS image draft and independent heading alignment", () => {
  const base = {
    contentType: "condition" as const, slug: "toothache", title: "Toothache",
    templateKey: "condition-standard", templateVersion: 1, images: {},
    seo: { focusKeyword: "toothache", secondaryKeywords: [] },
  };
  it("accepts an unselected image block in a private draft", () => {
    expect(cmsDocumentSchema.safeParse({
      ...base, blocks: [...blocks, { id: "new-image", type: "image", image: null }],
    }).success).toBe(true);
  });
  it("preserves independent H1, subheading, section and cause title alignment", () => {
    const parsed = cmsDocumentSchema.parse({
      ...base,
      blocks: blocks.map(block => block.type === "hero"
        ? { ...block, headingAlign: "center", subheadingAlign: "right" }
        : block.type === "causes"
          ? { ...block, headingAlign: "right", items: [{ title: "Dental decay", titleAlign: "center", description: "Example" }] }
          : block),
    });
    const hero = parsed.blocks.find(block => block.type === "hero");
    const causes = parsed.blocks.find(block => block.type === "causes");
    expect(hero?.headingAlign).toBe("center");
    expect(hero?.type === "hero" && hero.subheadingAlign).toBe("right");
    expect(causes?.headingAlign).toBe("right");
    expect(causes?.type === "causes" && causes.items[0].titleAlign).toBe("center");
  });
  it("rejects unsupported alignment and empty URL in a selected image", () => {
    expect(cmsDocumentSchema.safeParse({
      ...base, blocks: [{ ...blocks[0], headingAlign: "justify" }, ...blocks.slice(1)],
    }).success).toBe(false);
    expect(cmsDocumentSchema.safeParse({
      ...base, blocks: [...blocks, { id: "bad-image", type: "image", image: { url: "", altText: "" } }],
    }).success).toBe(false);
  });
});
