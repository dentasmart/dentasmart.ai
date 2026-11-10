import { describe, expect, it } from "vitest";
import { blogDraftToCmsSeoDocument, blogSecondaryPhrases, blogSocialPreview, type BlogSeoDraft } from "./blogSeoAdapter";
import { analyzeCmsSeo } from "./cmsSeoAnalysis";
import { getCmsReadingInsights } from "./cmsReadingInsights";
import { getCmsReadabilityCheckStatus } from "./cmsReadabilityUiPolicy";

const example: BlogSeoDraft = {
  title: "Toothache and Tooth Pain", slug: "toothache-and-tooth-pain",
  bodyHtml: '<h2>Toothache information</h2><p>Toothache may require dental care. <a href="/conditions/dental-abscess/">Read more</a> <img src="/picture.webp" alt="Illustrated molar"/></p>',
  editorMode: "wysiwyg",
  storySections: [{ heading: "Toothache", content: "Old duplicated toothache toothache" }],
  primaryKeyword: "toothache", secondaryKeywords: "tooth pain, oral care",
  metaTitle: "Toothache and Tooth Pain: What to Know",
  metaDescription: "Learn about toothache, common causes, and when to contact a dentist.",
  canonicalUrl: "", ogTitle: "", ogDescription: "", ogImage: "",
  featuredImage: "https://example.test/featured.webp",
};

describe("Blog Editor Advanced SEO reuse", () => {
  it("uses active rich-text mode and never doubles counts StoryBrand content", () => {
    const document = blogDraftToCmsSeoDocument(example);
    expect(document.blocks).toHaveLength(1);
    expect(analyzeCmsSeo(document).metrics.keywordOccurrences).toBe(2);
    expect(analyzeCmsSeo(document).metrics.internalLinks).toBe(1);
    expect(analyzeCmsSeo(document).metrics.imagesWithAlt).toBe(1);
    expect(analyzeCmsSeo(document).metrics.imageCount).toBe(1);
  });
  it("uses StoryBrand sections when editing structured mode, excluding older rich HTML", () => {
    const document = blogDraftToCmsSeoDocument({ ...example, editorMode: "structured" });
    expect(document.blocks).toHaveLength(1);
    expect(analyzeCmsSeo(document).metrics.keywordOccurrences).toBe(2);
    expect(analyzeCmsSeo(document).metrics.internalLinks).toBe(0);
    expect(analyzeCmsSeo(document).metrics.imageCount).toBe(0);
  });
  it("keeps CMS score bounded with no body, images or keywords", () => {
    const report = analyzeCmsSeo(blogDraftToCmsSeoDocument({
      ...example, bodyHtml: "", primaryKeyword: "", secondaryKeywords: "", metaTitle: "", title: "",
    }));
    expect(report.score).toBe(0);
    expect(report.checks.find(check => check.id === "secondary")).toMatchObject({
      points: 0, maxPoints: 4, status: "info",
    });
    expect(report.checks.find(check => check.id === "alt")?.status).toBe("info");
  });
  it("does not award SEO title credit from the visible article-title fallback", () => {
    const missing = { ...example, metaTitle: "", metaDescription: example.metaDescription };
    const missingDoc = blogDraftToCmsSeoDocument(missing);
    const missingReport = analyzeCmsSeo(missingDoc);
    expect(missingDoc.seo.metaTitle).toBe("");
    expect(missingReport.checks.find(check => check.id === "seo-title-length")?.points).toBe(0);
    expect(missingReport.checks.find(check => check.id === "seo-title-length")?.detail).toContain("0 characters");
    expect(missingReport.checks.find(check => check.id === "seo-title-phrase")?.points).toBe(0);
    // The search/social-card fallback stays available independently.
    expect(blogSocialPreview(missing).title).toBe(example.title);

    const validTitle = "Toothache and Tooth Pain: A Helpful DentaSmart Guide";
    expect(validTitle.length).toBeGreaterThanOrEqual(30);
    expect(validTitle.length).toBeLessThanOrEqual(60);
    const valid = analyzeCmsSeo(blogDraftToCmsSeoDocument({ ...missing, metaTitle: validTitle }));
    expect(valid.checks.find(check => check.id === "seo-title-length")?.points).toBe(8);
    expect(valid.checks.find(check => check.id === "seo-title-phrase")?.points).toBe(6);
    expect(valid.score).toBe(missingReport.score + 14);
    const removedAgain = analyzeCmsSeo(blogDraftToCmsSeoDocument({ ...missing, metaTitle: "   " }));
    expect(removedAgain.score).toBe(missingReport.score);
  });

  it("scores a missing on-page image in blog mode without affecting default Hub scoring", () => {
    const draft = { ...example, bodyHtml: "<p>Toothache may need dental care.</p>", secondaryKeywords: "" };
    const doc = blogDraftToCmsSeoDocument(draft);
    const normal = analyzeCmsSeo(doc);
    const policy = analyzeCmsSeo(doc, { requireOnPageImage: true });
    expect(normal.checks.find(c => c.id === "alt")).toMatchObject({ status: "info", points: 0 });
    expect(policy.checks.find(c => c.id === "alt")).toMatchObject({ status: "improve", points: 0, maxPoints: 4 });
    expect(policy.score).toBeLessThan(normal.score);
    const earned = policy.checks.reduce((sum,c) => sum + c.points, 0);
    expect(policy.score).toBe(Math.round(earned / 96 * 100));
    const withImage = blogDraftToCmsSeoDocument({ ...draft,
      bodyHtml: '<p>Toothache may need dental care. <img src="/photo.webp" alt="Dentist reviewing a dental X-ray"></p>' });
    expect(analyzeCmsSeo(withImage, { requireOnPageImage: true }).checks.find(c=>c.id === "alt"))
      .toMatchObject({ status: "good", points: 4 });
  });

  it("matches Readability's 25% long-sentence threshold in Blog SEO even when average exceeds 22", () => {
    const hugeSentence = Array.from({ length: 120 }, () => "important").join(" ") + ".";
    const html = "<h2>Overview</h2><p>Brush daily. Floss carefully. Ask questions. " + hugeSentence + "</p>";
    const doc = blogDraftToCmsSeoDocument({ ...example, bodyHtml: html });
    const reading = getCmsReadingInsights(doc);
    expect(reading.longSentencePercent).toBe(25);
    expect(reading.avgWordsPerSentence).toBeGreaterThan(22);
    expect(getCmsReadabilityCheckStatus(reading, "longSentences")).toBe("good");
    const adjusted = analyzeCmsSeo(doc, { matchReadabilityPanel: true });
    expect(adjusted.checks.find(c => c.id === "sentences")).toMatchObject({ status: "good", points: 4 });
    const legacy = analyzeCmsSeo(doc);
    expect(legacy.checks.find(c => c.id === "sentences")?.points).toBe(0);
    expect(adjusted.metrics.longSentencePercent).toBe(reading.longSentencePercent);
  });

  it("matches Readability's short-article heading rules without granting blank drafts credit", () => {
    for (const [html, status] of [
      ["<p>This brief article gives helpful tips.</p>", "good"],
      ["<p></p>", "info"],
      ["<p>" + Array.from({ length: 110 }, () => "guidance").join(" ") + "</p>", "good"],
    ] as const) {
      const doc = blogDraftToCmsSeoDocument({ ...example, bodyHtml: html });
      const reading = getCmsReadingInsights(doc);
      const panel = getCmsReadabilityCheckStatus(reading, "structure");
      const seo = analyzeCmsSeo(doc, { matchReadabilityPanel: true });
      const section = seo.checks.find(c => c.id === "sections");
      if (status === "info") {
        expect(panel).toBe("not_evaluated");
        expect(section?.points).toBe(0);
      } else {
        // Above 80 words without a heading should fail in both places.
        const same = panel === "good" ? "good" : "improve";
        expect(section?.status).toBe(same);
      }
    }
    const small = blogDraftToCmsSeoDocument({ ...example, bodyHtml: "<p>Short advice helps patients.</p>" });
    expect(analyzeCmsSeo(small).checks.find(c => c.id === "sections")?.status).toBe("improve");
    expect(analyzeCmsSeo(small, { matchReadabilityPanel: true }).checks.find(c => c.id === "sections")?.status).toBe("good");
  });

  it("uses heading-excluded text metrics for Blog SEO sentence counts", () => {
    const doc = blogDraftToCmsSeoDocument({ ...example,
      bodyHtml: "<h2>" + Array.from({ length: 28 }, () => "title").join(" ") + "</h2><p>Read this information. Ask your dentist.</p>" });
    const reading = getCmsReadingInsights(doc);
    const seo = analyzeCmsSeo(doc, { matchReadabilityPanel: true });
    expect(reading.longSentencePercent).toBe(0);
    expect(seo.metrics.longSentencePercent).toBe(reading.longSentencePercent);
    expect(seo.checks.find(c => c.id === "sentences")?.status).toBe("good");
  });

  it("parses secondary phrases without duplicates or mixing with blog tags", () => {
    expect(blogSecondaryPhrases("tooth pain, oral care, TOOTH PAIN, , brushing"))
      .toEqual(["tooth pain", "oral care", "brushing"]);
  });
  it("prefers explicit OG image, then featured image, never a hero or body image", () => {
    expect(blogSocialPreview(example).image).toBe(example.featuredImage);
    expect(blogSocialPreview({ ...example, ogImage: "/chosen.webp" }).image).toBe("/chosen.webp");
  });
  it("does not change the original blog route or schema settings", () => {
    const document = blogDraftToCmsSeoDocument(example);
    expect(document.slug).toBe(example.slug);
    expect(document.seo.canonicalUrl).toBeUndefined();
    expect(document.contentType).toBe("blog");
    expect(document.seo.focusKeyword).toBe("toothache");
  });
});
