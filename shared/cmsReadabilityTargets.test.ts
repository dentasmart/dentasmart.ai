import { describe, expect, it } from "vitest";
import { CMS_READABILITY_TARGETS, cmsSeoReadabilityTarget } from "./cmsReadabilityTargets";

describe("CMS readability recommended-target copy", () => {
  it("shows established editorial thresholds rather than inventing SEO requirements", () => {
    expect(CMS_READABILITY_TARGETS.longSentences).toMatch(/25%.*20 words/);
    expect(CMS_READABILITY_TARGETS.averageSentence).toMatch(/22 words/);
    expect(CMS_READABILITY_TARGETS.paragraphs).toMatch(/75 words/);
    expect(CMS_READABILITY_TARGETS.openings).toMatch(/1 adjacent/);
    expect(CMS_READABILITY_TARGETS.structure).toMatch(/no empty headings/);
  });

  it("labels non-scored estimates and clinical vocabulary as advisory", () => {
    expect(CMS_READABILITY_TARGETS.flesch).toMatch(/not a Google requirement/i);
    expect(CMS_READABILITY_TARGETS.technical).toMatch(/no fixed SEO percentage/i);
    expect(CMS_READABILITY_TARGETS.bodyWords).toMatch(/no fixed ideal/i);
  });

  it("limits extra SEO checklist guidance to applicable checks", () => {
    expect(cmsSeoReadabilityTarget("sentences")).toBe(CMS_READABILITY_TARGETS.seoSentences);
    expect(cmsSeoReadabilityTarget("paragraphs")).toBe(CMS_READABILITY_TARGETS.paragraphs);
    expect(cmsSeoReadabilityTarget("sections")).toBe(CMS_READABILITY_TARGETS.structure);
    expect(cmsSeoReadabilityTarget("meta-title")).toBeNull();
  });
});
