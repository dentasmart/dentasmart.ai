import { describe, expect, it } from "vitest";
import { analyzeCmsSeo } from "./cmsSeoAnalysis";
import { blogDraftToCmsSeoDocument, type BlogSeoDraft } from "./blogSeoAdapter";
import { formatBlogSeoChecks } from "./blogSeoFeedback";

const base: BlogSeoDraft = {
  title: "Advanced SEO Testing", slug: "advanced-seo-testing",
  bodyHtml: "<p>Advanced SEO testing helps improve article structure.</p>",
  editorMode: "wysiwyg", storySections: [],
  primaryKeyword: "", secondaryKeywords: "",
  metaTitle: "", metaDescription: "", canonicalUrl: "",
  ogTitle: "", ogDescription: "", ogImage: "", featuredImage: "",
};
const feedback = (draft: BlogSeoDraft) => {
  const report = analyzeCmsSeo(blogDraftToCmsSeoDocument(draft));
  return { report, checks: formatBlogSeoChecks(report.checks, draft) };
};
const get = (checks: ReturnType<typeof feedback>["checks"], id: string) => {
  const check = checks.find(item => item.id === id);
  if (!check) throw new Error("Missing SEO check " + id);
  return check;
};

describe("Blog Editor conditional SEO feedback", () => {
  it("shows explicit missing-field prompts, not 0-character guidance", () => {
    const { checks } = feedback(base);
    expect(get(checks, "focus").detail).toContain("No primary keyphrase entered");
    expect(get(checks, "seo-title-length").detail).toContain("Please enter a meta title");
    expect(get(checks, "seo-title-length").detail).not.toContain("0 characters");
    expect(get(checks, "description-length").detail).toContain("Please enter a meta description");
    expect(get(checks, "description-length").detail).not.toContain("0 characters");
    expect(get(checks, "secondary").status).toBe("info");
    expect(get(checks, "secondary").detail).toContain("optional");
  });
  it("marks dependent keyphrase checks informational when no keyphrase exists", () => {
    const { report, checks } = feedback(base);
    for (const id of ["h1", "url", "intro", "subheading", "body", "density",
      "seo-title-phrase", "description-phrase"]) {
      expect(get(checks, id).status).toBe("info");
      expect(get(checks, id).points).toBe(0);
    }
    expect(checks.reduce((sum, item) => sum + item.points, 0))
      .toBe(report.checks.reduce((sum, item) => sum + item.points, 0));
  });
  it("displays actual length and keyphrase guidance as inputs are entered", () => {
    const filled = { ...base, primaryKeyword: "advanced seo testing",
      metaTitle: "Advanced SEO Testing: A Practical Guide for DentaSmart",
      metaDescription: "Advanced SEO testing can help editors organize content and describe it accurately for readers and search engines. Learn the basic checks involved." };
    const { checks } = feedback(filled);
    expect(get(checks, "seo-title-length").detail).toContain(filled.metaTitle.length + " characters");
    expect(get(checks, "description-length").detail).toContain(filled.metaDescription.length + " characters");
    expect(get(checks, "seo-title-phrase").status).toBe("good");
    expect(get(checks, "description-phrase").status).toBe("good");
    expect(get(checks, "focus").status).toBe("good");
  });
  it("distinguishes a filled keyphrase from missing meta fields", () => {
    const { checks } = feedback({ ...base, primaryKeyword:"advanced seo testing" });
    expect(get(checks, "seo-title-phrase").status).toBe("info");
    expect(get(checks, "seo-title-phrase").detail).toContain("Please enter a meta title");
    expect(get(checks, "description-phrase").status).toBe("info");
  });
  it("does not change the score or mutate stored draft data", () => {
    const draft = { ...base };
    const clone = JSON.stringify(draft);
    const { report, checks } = feedback(draft);
    expect(report.score).toBeGreaterThanOrEqual(0);
    expect(checks.reduce((sum, item) => sum + item.points, 0))
      .toBe(report.checks.reduce((sum, item) => sum + item.points, 0));
    expect(JSON.stringify(draft)).toBe(clone);
  });
});
