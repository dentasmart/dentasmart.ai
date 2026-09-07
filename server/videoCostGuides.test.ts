import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { aeoGuides } from "../client/src/data/aeoContent";
import { guidesData } from "../client/src/data/guides";
import { getStaticMetaSnapshot } from "./metaTags";
import { staticRoutes } from "../shared/routes";

const slugs = [
  "how-to-read-dental-treatment-plan",
  "dental-insurance-annual-maximum",
  "how-to-read-dental-eob",
  "dental-payment-plans-and-financing",
  "dental-bill-higher-than-expected",
] as const;

function collectGuideText(slug: (typeof slugs)[number]): string {
  const guide = guidesData[slug];
  return [
    guide.title,
    guide.metaTitle,
    guide.metaDescription,
    guide.heroHeading,
    guide.heroSubheading,
    guide.introduction,
    ...guide.steps.flatMap(step => [step.title, step.content, step.tip ?? ""]),
    ...guide.commonMistakes.flatMap(item => [item.mistake, item.correction]),
    ...guide.keyTakeaways,
    ...guide.faqs.flatMap(faq => [faq.question, faq.answer]),
    ...(guide.sources ?? []).flatMap(source => [source.organization, source.title, source.note]),
    aeoGuides[slug].inOneSentence,
    ...aeoGuides[slug].whatToDoToday,
    ...aeoGuides[slug].dentistQuestions,
  ].join("\n");
}

describe("video-based dental cost guides", () => {
  it("registers five substantial affordability guides with governed metadata", () => {
    const staticMeta = getStaticMetaSnapshot();

    for (const slug of slugs) {
      const guide = guidesData[slug];
      const route = `/guides/${slug}`;

      expect(guide).toBeDefined();
      expect(guide.category).toBe("affordability");
      expect(guide.steps.length).toBeGreaterThanOrEqual(8);
      expect(guide.faqs.length).toBeGreaterThanOrEqual(6);
      expect(guide.relatedGuides.length).toBeGreaterThanOrEqual(4);
      expect(guide.relatedResources?.length).toBeGreaterThanOrEqual(2);
      expect(guide.sources?.length).toBeGreaterThanOrEqual(2);
      expect(guide.reviewedBy).toBeUndefined();
      expect(guide.reviewedByCredentials).toBeUndefined();
      expect(guide.lastReviewed).toBeUndefined();

      expect(guide.metaTitle.length).toBeLessThanOrEqual(60);
      expect(guide.metaDescription.length).toBeLessThanOrEqual(160);
      expect(staticMeta[route]).toEqual({
        title: guide.metaTitle,
        description: guide.metaDescription,
      });
      expect(staticRoutes.some(entry => entry.path === route && entry.inSitemap !== false)).toBe(true);
    }
  });

  it("provides concise answer-engine blocks and visible source-ready data", () => {
    for (const slug of slugs) {
      const block = aeoGuides[slug];
      const guide = guidesData[slug];

      expect(block.inOneSentence.length).toBeGreaterThan(80);
      expect(block.whatToDoToday).toHaveLength(3);
      expect(block.dentistQuestions).toHaveLength(5);
      expect(guide.sources?.every(source => source.url.startsWith("https://"))).toBe(true);
      expect(guide.relatedGuides.every(link => Boolean(guidesData[link.slug]))).toBe(true);
    }
  });

  it("keeps the new public copy free of prohibited editorial and unsupported marketing patterns", () => {
    for (const slug of slugs) {
      const text = collectGuideText(slug);

      expect(text).not.toMatch(/—/);
      expect(text).not.toMatch(/\b(?:delve|leverage|utilize|empower|game changer|cutting-edge|transformative)\b/i);
      expect(text).not.toMatch(/\b(?:guaranteed savings|guaranteed coverage|diagnose|diagnosis from DentaSmart|HIPAA compliant)\b/i);
      expect(text).not.toMatch(/\b(?:reviewed by|board-certified|clinical reviewer)\b/i);
    }
  });

  it("renders the new AEO, internal-resource, source, and accessible FAQ sections from shared data", () => {
    const source = fs.readFileSync(
      path.resolve(process.cwd(), "client/src/pages/guides/GuidePage.tsx"),
      "utf8",
    );

    expect(source).toContain("What You Can Check Today");
    expect(source).toContain("aeo.whatToDoToday.map");
    expect(source).toContain("guide.relatedResources.map");
    expect(source).toContain("Sources and Further Reading");
    expect(source).toContain("guide.sources.map");
    expect(source).toContain("citations: guide.sources?.map");
    expect(source).toContain("aria-expanded={open}");
    expect(source).toContain("aria-controls={panelId}");
  });
});
