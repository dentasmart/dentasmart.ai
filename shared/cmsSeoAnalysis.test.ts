import { describe, expect, it } from "vitest";
import { cmsDocumentSchema, type CmsDocument } from "./cmsBlocks";
import {
  analyzeCmsSeo, cmsSeoPlainText, extractCmsSeoContent, isCmsInternalLink, suggestCmsInternalLinks,
} from "./cmsSeoAnalysis";

function page(patch: Partial<CmsDocument> = {}): CmsDocument {
  const baseline: CmsDocument = {
    contentType: "condition", slug: "toothache", title: "Toothache: Causes and Relief",
    templateKey: "condition-standard", templateVersion: 1,
    blocks: [
      { type: "hero", id: "hero", heading: "Toothache", subheading: "Toothache can have different causes and needs evaluation." },
      { type: "quick_answer", id: "answer", heading: "Quick Answer", answer: "A toothache can indicate a dental problem; book an evaluation." },
      { type: "urgent_care", id: "urgent", heading: "When to Seek Care", items: ["Trouble breathing or swallowing requires emergency care."] },
      {
        type: "rich_text", id: "details", heading: "Toothache: Understanding Your Options",
        html: "<p>Toothache can cause discomfort. Talk to a dentist if pain persists.</p><p>See <a href=\"/conditions/dental-abscess\">dental abscess</a> and <a href=\"https://dentasmart.ai/conditions/gum-disease/\">gum disease</a>.</p>",
      },
      { type: "causes", id: "causes", heading: "Common Causes", items: [{ title: "Tooth decay", description: "Decay sometimes contributes to toothache." }] },
      { type: "related_links", id: "related", heading: "Related Conditions", links: [{ title: "Gum Disease", url: "/conditions/gum-disease/" }] },
    ],
    images: {},
    seo: {
      focusKeyword: "toothache", secondaryKeywords: ["tooth decay", "gum disease"],
      metaTitle: "Toothache Causes, Relief and Treatment | DentaSmart",
      metaDescription: "Learn about common toothache causes, short-term symptom relief, and when a dental professional should examine your teeth. Find helpful guidance here.",
    },
    tags: [],
  };
  return { ...baseline, ...patch };
}

describe("Advanced CMS SEO analysis", () => {
  it("uses 100 fixed editorial points and never predicts rankings", () => {
    const report = analyzeCmsSeo(page());
    expect(report.checks.reduce((sum, check) => sum + check.maxPoints, 0)).toBe(100);
    expect(report.score).toBeGreaterThanOrEqual(0);
    expect(report.score).toBeLessThanOrEqual(100);
    expect(report.checks.find((check) => check.id === "external")?.maxPoints).toBe(0);
  });

  it("scores a completely empty article as 0, with optional categories not evaluated", () => {
    const blank = page({
      title: "", slug: "",
      blocks: [],
      seo: { focusKeyword: "", secondaryKeywords: [], metaTitle: "", metaDescription: "" },
    });
    const report = analyzeCmsSeo(blank);
    expect(report.score).toBe(0);
    expect(report.metrics.wordCount).toBe(0);
    expect(report.checks.reduce((sum, check) => sum + check.points, 0)).toBe(0);
    expect(report.checks.reduce((sum, check) => sum + check.maxPoints, 0)).toBe(100);
    expect(report.checks.find(check => check.id === "secondary")).toMatchObject({
      points: 0, maxPoints: 4, status: "info",
    });
    expect(report.checks.find(check => check.id === "alt")).toMatchObject({
      points: 0, maxPoints: 4, status: "info",
    });
  });

  it("excludes missing optional keyphrases from applicable scoring, but evaluates them when entered", () => {
    const omitted = analyzeCmsSeo(page({
      seo: { ...page().seo, secondaryKeywords: [] },
    }));
    const secondaryOmitted = omitted.checks.find(check => check.id === "secondary");
    expect(secondaryOmitted?.points).toBe(0);
    expect(secondaryOmitted?.status).toBe("info");
    // No images (4 points) and no secondary phrases (4 points) are N/A;
    // earned points are normalized against the 92 applicable rubric points.
    const earned = omitted.checks.reduce((sum, check) => sum + check.points, 0);
    expect(omitted.metrics.imageCount).toBe(0);
    expect(omitted.score).toBe(Math.round(earned / 92 * 100));

    const configured = analyzeCmsSeo(page({
      seo: { ...page().seo, secondaryKeywords: ["toothache"] },
    }));
    expect(configured.checks.find(check => check.id === "secondary")).toMatchObject({
      points: 4, maxPoints: 4, status: "good",
    });
    expect(configured.score).toBe(Math.round(
      configured.checks.reduce((sum, check) => sum + check.points, 0) / 96 * 100,
    ));
  });

  it("preserves default no-image scoring for Hub pages", () => {
    const doc = page({ seo: {...page().seo, secondaryKeywords: []} });
    const normal = analyzeCmsSeo(doc);
    const withBlogPolicy = analyzeCmsSeo(doc, { requireOnPageImage: true });
    expect(normal.checks.find(c=>c.id === "alt")?.status).toBe("info");
    expect(withBlogPolicy.checks.find(c=>c.id === "alt")?.status).toBe("improve");
    expect(withBlogPolicy.score).toBeLessThan(normal.score);
  });

  it("can analyze blank or sparse content without NaN, Infinity or crashes", () => {
    const sparse = page({ blocks: [
      { type: "hero", id: "hero", heading: "", subheading: "" },
      { type: "urgent_care", id: "urgent", heading: "", items: [] },
    ], seo: { focusKeyword: "", secondaryKeywords: [], metaTitle: "", metaDescription: "" } });
    const result = analyzeCmsSeo(sparse);
    expect(Number.isFinite(result.score)).toBe(true);
    expect(Number.isFinite(result.metrics.averageSentenceWords)).toBe(true);
    expect(result.metrics.keywordDensity).toBe(0);
    expect(result.checks.find((c) => c.id === "focus")?.status).toBe("critical");
  });

  it("does not mark empty or whitespace-only body as readable", () => {
    for (const html of ["", "<p></p>", "<p>  <br />  </p>"]) {
      const doc = page({
        blocks: [{ type: "rich_text", id: "blank-body", html }],
      });
      const report = analyzeCmsSeo(doc);
      for (const id of ["sentences", "paragraphs"]) {
        const check = report.checks.find(item => item.id === id);
        expect(check?.status).toBe("info");
        expect(check?.points).toBe(0);
        expect(check?.maxPoints).toBe(4);
        expect(check?.detail).toContain("Please add article body text");
        expect(check?.detail).not.toContain("No paragraphs exceed");
      }
      expect(report.metrics.wordCount).toBe(0);
      expect(report.checks.reduce((sum, check) => sum + check.maxPoints, 0)).toBe(100);
    }
  });

  it("evaluates readability once meaningful content exists", () => {
    const short = page({
      blocks: [{ type: "rich_text", id: "short-body",
        html: "<p>Good oral health routines matter. Talk to a dental professional about unusual symptoms.</p>" }],
    });
    const report = analyzeCmsSeo(short);
    expect(report.checks.find(c => c.id === "sentences")?.status).toBe("good");
    expect(report.checks.find(c => c.id === "paragraphs")?.status).toBe("good");
    expect(report.checks.find(c => c.id === "paragraphs")?.points).toBe(4);

    const long = page({ blocks: [{ type: "rich_text", id: "long-body",
      html: "<p>" + Array(85).fill("oral").join(" ") + ".</p>" }] });
    expect(analyzeCmsSeo(long).checks.find(c => c.id === "paragraphs")?.status).toBe("improve");
  });

  it("matches whole words or consecutive keyphrase tokens, not substrings", () => {
    const doc = page({ seo: { ...page().seo, focusKeyword: "toothaches" } });
    const r = analyzeCmsSeo(doc);
    expect(r.metrics.keywordOccurrences).toBe(0);
    expect(r.checks.find((c) => c.id === "body")?.status).toBe("improve");
  });

  it("handles multi-word phrases and excludes script/style text", () => {
    const doc = page({ seo: { ...page().seo, focusKeyword: "gum disease" },
      blocks: [
        ...page().blocks,
        { type: "rich_text", id: "more", heading: "Health", html: '<script>gum disease gum disease</script><style>.gum { content: "gum disease" }</style><p>Gum disease can worsen.</p>' },
      ] });
    const baseline = analyzeCmsSeo(page({ seo: { ...page().seo, focusKeyword: "gum disease" } })).metrics.keywordOccurrences;
    const r = analyzeCmsSeo(doc);
    expect(r.metrics.keywordOccurrences).toBe(baseline + 1);
  });

  it("decodes common HTML entities and numeric text", () => {
    expect(cmsSeoPlainText("<p>Tooth &amp; gum &#x70;ain&nbsp;is &#112;ainful.</p>"))
      .toBe("Tooth & gum pain is painful.");
  });

  it("uses visible H1 title, not the old hero block heading", () => {
    const r = analyzeCmsSeo(page({ title: "Updated toothache headline",
      blocks: [{ type: "hero", id: "hero", heading: "Old title", subheading: "" },
        { type: "urgent_care", id: "u", heading: "Urgent", items: [] }] }));
    expect(r.checks.find((c) => c.id === "h1")?.status).toBe("good");
  });

  it("counts distinct internal relative or DentaSmart links", () => {
    const r = analyzeCmsSeo(page());
    expect(r.metrics.internalLinks).toBe(2); // absolute/relative URL variants count once
    expect(r.metrics.externalLinks).toBe(0);
  });

  it("does not treat hostile domains, protocol-relative, or Javascript URLs as internal", () => {
    expect(isCmsInternalLink("/conditions/toothache")).toBe(true);
    expect(isCmsInternalLink("https://dentasmart.ai/conditions/toothache")).toBe(true);
    expect(isCmsInternalLink("http://www.dentasmart.ai/")).toBe(true);
    expect(isCmsInternalLink("https://dentasmart.ai.evil.test/")).toBe(false);
    expect(isCmsInternalLink("//evil.test/")).toBe(false);
    expect(isCmsInternalLink("javascript:alert(1)")).toBe(false);
    expect(isCmsInternalLink("mailto:test@example.com")).toBe(false);
  });

  it("counts external HTTP links but not mailto", () => {
    const doc = page({ blocks: [
      ...page().blocks,
      { type: "related_links", id: "extra", heading: "Further reading",
        links: [{ title: "Study", url: "https://www.nhs.uk/conditions/toothache/" }, { title: "Email", url: "mailto:help@example.com" }] },
    ] });
    expect(analyzeCmsSeo(doc).metrics.externalLinks).toBe(1);
  });

  it("shows external reference review as needs-attention when none exist and passed after adding a link", () => {
    const initial = analyzeCmsSeo(page());
    const missing = initial.checks.find((check) => check.id === "external");
    expect(initial.metrics.externalLinks).toBe(0);
    expect(missing?.status).toBe("improve");
    expect(missing?.detail).toMatch(/no external source links/i);

    const withSource = page({ blocks: [
      ...page().blocks,
      { type: "related_links", id: "reference", heading: "Sources",
        links: [{ title: "NHS guidance", url: "https://www.nhs.uk/conditions/toothache/" }] },
    ] });
    const updated = analyzeCmsSeo(withSource);
    expect(updated.metrics.externalLinks).toBe(1);
    expect(updated.checks.find((check) => check.id === "external")?.status).toBe("good");
    expect(updated.score).toBe(initial.score); // Editorial source review has no SEO scoring weight.
  });

  it("recalculates inline rich-text image alt-text issues when an editor fixes them", () => {
    const bad = page({ blocks: [
      ...page().blocks,
      { type: "rich_text", id: "inline-img", heading: "Photo guide",
        html: '<p><img src="/photos/mouth.webp"></p><script><img src="/ignore.webp"></script>' },
    ] });
    const badReport = analyzeCmsSeo(bad);
    expect(badReport.metrics.imageCount).toBe(1);
    expect(badReport.metrics.imagesWithoutAlt).toBe(1);
    expect(badReport.checks.find((check) => check.id === "alt")?.status).toBe("improve");

    const corrected = page({ blocks: bad.blocks.map((block) =>
      block.id === "inline-img" && block.type === "rich_text"
        ? { ...block, html: '<p><img src="/photos/mouth.webp" alt="Open-mouth dental photo"></p>' }
        : block,
    ) });
    const updated = analyzeCmsSeo(corrected);
    expect(updated.metrics.imageCount).toBe(1);
    expect(updated.metrics.imagesWithoutAlt).toBe(0);
    expect(updated.checks.find((check) => check.id === "alt")?.status).toBe("good");
    expect(updated.score).toBe(badReport.score + 4);
  });

  it("counts on-page hero and content images, excluding featured and social metadata", () => {
    const doc = page({
      images: { featured: { url: "/f.webp", altText: "" }, hero: { url: "/h.webp", altText: "Dental image" },
        og: { url: "/s.webp", altText: "" } },
      blocks: [...page().blocks, { type: "image", id: "inline", image: { url: "/i.webp", altText: "" } }],
    });
    const report = analyzeCmsSeo(doc);
    expect(report.metrics.imageCount).toBe(2);
    expect(report.metrics.imagesWithAlt).toBe(1);
    expect(report.metrics.imagesWithoutAlt).toBe(1);
    expect(report.checks.find((check) => check.id === "alt")?.status).toBe("improve");

    const updated = analyzeCmsSeo(page({
      ...doc,
      blocks: doc.blocks.map((block) =>
        block.type === "image" && block.id === "inline"
          ? { ...block, image: { ...block.image, altText: "Close-up dental illustration" } }
          : block),
    }));
    expect(updated.metrics.imageCount).toBe(2);
    expect(updated.metrics.imagesWithAlt).toBe(2);
    expect(updated.metrics.imagesWithoutAlt).toBe(0);
    expect(updated.checks.find((check) => check.id === "alt")?.status).toBe("good");
  });

  it("marks missing images not applicable instead of a false green pass", () => {
    const r = analyzeCmsSeo(page());
    expect(r.metrics.imageCount).toBe(0);
    expect(r.checks.find((c) => c.id === "alt")?.status).toBe("info");
    expect(r.checks.find((c) => c.id === "alt")?.points).toBe(0);
    expect(Number.isFinite(r.score)).toBe(true);
  });

  it("recognizes a conservative singular/plural H1 variation without substring matching", () => {
    const r = analyzeCmsSeo(page({ title: "Toothaches: What to know" }));
    expect(r.checks.find((check) => check.id === "h1")?.status).toBe("good");
    const falseHit = analyzeCmsSeo(page({ title: "Toothacheproof toothpaste" }));
    expect(falseHit.checks.find((check) => check.id === "h1")?.status).toBe("improve");
  });

  it("reports secondary keyphrase occurrence and heading placement", () => {
    const r = analyzeCmsSeo(page());
    expect(r.secondary).toHaveLength(2);
    expect(r.secondary[0].matches).toBe(0);
    expect(r.secondary[0].inHeading).toBe(true);
    expect(r.secondary[1].matches).toBeGreaterThan(0);
  });

  it("flags unusually long paragraphs and sentences", () => {
    const many = Array(90).fill("excessivelylongword").join(" ");
    const doc = page({ blocks: [...page().blocks, { type: "rich_text", id: "long", heading: "A test", html: "<p>" + many + ".</p>" }] });
    const r = analyzeCmsSeo(doc);
    expect(r.metrics.longParagraphs).toBe(1);
    expect(r.checks.find((c) => c.id === "paragraphs")?.status).toBe("improve");
  });

  it("distinguishes canonical overrides from inherited defaults", () => {
    expect(analyzeCmsSeo(page()).checks.find((c) => c.id === "canonical")?.status).toBe("info");
    const bad = page({ seo: { ...page().seo, canonicalUrl: "https://dentasmart.ai.evil.test/page" } });
    expect(analyzeCmsSeo(bad).checks.find((c) => c.id === "canonical")?.status).toBe("critical");
    const good = page({ seo: { ...page().seo, canonicalUrl: "https://dentasmart.ai/conditions/toothache/" } });
    expect(analyzeCmsSeo(good).checks.find((c) => c.id === "canonical")?.status).toBe("info");
  });

  it("provides actionable metadata length feedback", () => {
    const doc = page({ seo: { ...page().seo, metaTitle: "Hi", metaDescription: "" } });
    const r = analyzeCmsSeo(doc);
    expect(r.checks.find((c) => c.id === "seo-title-length")?.points).toBe(0);
    expect(r.checks.find((c) => c.id === "description-length")?.status).toBe("critical");
  });

  it("does not mutate the draft when analyzing it", () => {
    const doc = page();
    const before = JSON.stringify(doc);
    analyzeCmsSeo(doc);
    expect(JSON.stringify(doc)).toBe(before);
  });

  it("validates existing CMS schema without migration", () => {
    const doc = page();
    expect(cmsDocumentSchema.safeParse(doc).success).toBe(true);
  });

  it("extracts headings, rich text and linked pages into the report", () => {
    const content = extractCmsSeoContent(page());
    expect(content.headings).toContain("Common Causes");
    expect(content.headings).toContain("Tooth decay");
    expect(content.links).toContain("/conditions/dental-abscess");
    expect(content.intro).toMatch(/Toothache can have different causes/i);
  });

  it("suggests existing relevant pages but excludes self and already linked pages", () => {
    const suggestions = suggestCmsInternalLinks(page(), [
      { slug: "toothache", title: "Toothache" },
      { slug: "gum-disease", title: "Gum Disease" },
      { slug: "dental-abscess", title: "Toothache dental abscess" },
      { slug: "toothache-relief", title: "Toothache Relief Options" },
      { slug: "braces", title: "Braces Guide" },
    ]);
    expect(suggestions.some((s) => s.slug === "toothache")).toBe(false);
    expect(suggestions.some((s) => s.slug === "gum-disease")).toBe(false);
    expect(suggestions.some((s) => s.slug === "dental-abscess")).toBe(false);
    expect(suggestions.some((s) => s.slug === "toothache-relief")).toBe(true);
    expect(suggestions.some((s) => s.slug === "braces")).toBe(false);
  });

  it("updates scores in response to draft edits", () => {
    const baseline = page();
    const before = analyzeCmsSeo(baseline).score;
    const edited = page({ seo: { ...baseline.seo, focusKeyword: "", metaTitle: "", metaDescription: "" } });
    expect(analyzeCmsSeo(edited).score).toBeLessThan(before);
  });
});
