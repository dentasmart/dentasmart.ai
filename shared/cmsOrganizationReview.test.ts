import { describe, expect, it } from "vitest";
import { createCmsBlankDocument } from "./cmsHubRegistry";
import { cmsDocumentSchema } from "./cmsBlocks";
import { appendCmsLabels, assessCmsReviewerDraft, cmsUsesManualCategoriesAndTags } from "./cmsOrganizationReview";
import { cmsHubDefinitions } from "./cmsHubRegistry";

describe("CMS Phase 8 draft organization & reviewer metadata", () => {
  it("offers manual Categories and Tags only for Blogs & Articles", () => {
    for (const hub of cmsHubDefinitions) {
      expect(cmsUsesManualCategoriesAndTags(hub.id, hub.contentType)).toBe(hub.id === "articles");
    }
    expect(cmsUsesManualCategoriesAndTags(undefined, "blog")).toBe(false);
    expect(cmsUsesManualCategoriesAndTags("conditions", "blog")).toBe(false);
    expect(cmsUsesManualCategoriesAndTags("articles", "condition")).toBe(false);
  });

  it("keeps older non-blog draft metadata readable without enabling manual tags", () => {
    const doc = createCmsBlankDocument("conditions", "toothache-test", "Toothache");
    const parsed = cmsDocumentSchema.parse({
      ...doc, tags: ["Legacy Tooth Pain"], editorial: {
        categories: ["Legacy Dental Health"], cornerstone: true,
        schemaPageType: "MedicalWebPage", schemaArticleType: "none",
      },
    });
    expect(parsed.tags).toEqual(["Legacy Tooth Pain"]);
    expect(parsed.editorial?.categories).toEqual(["Legacy Dental Health"]);
    expect(cmsUsesManualCategoriesAndTags(parsed.hubId, parsed.contentType)).toBe(false);
  });

  it("appends categories and tags without case-insensitive duplicates", () => {
    const original = ["Dental Health"];
    const added = appendCmsLabels(original, " dental health,  Prevention, fluoride, PREVENTION ");
    expect(added).toEqual(["Dental Health", "Prevention", "fluoride"]);
    expect(original).toEqual(["Dental Health"]);
  });

  it("ignores blanks, normalizes spaces, limits counts and label length", () => {
    const existing = Array.from({ length: 29 }, (_, index) => "tag-" + index);
    expect(appendCmsLabels(existing, " ,  Oral    Health , another ")).toHaveLength(30);
    expect(appendCmsLabels([], "  ".repeat(20))).toEqual([]);
    expect(appendCmsLabels([], "x".repeat(150))[0]).toHaveLength(100);
  });

  it("retains existing category, tag, and cornerstone metadata in the same draft schema", () => {
    const doc = createCmsBlankDocument("conditions", "phase-8-test", "Phase 8");
    const parsed = cmsDocumentSchema.parse({
      ...doc,
      tags: appendCmsLabels([], "Enamel, Brushing"),
      editorial: {
        categories: appendCmsLabels([], "Prevention"), cornerstone: true,
        schemaPageType: "MedicalWebPage", schemaArticleType: "none",
      },
      reviewer: {
        name: "Example reviewer", credentials: "Example qualification",
        shortBio: "Example professional biography",
        profileUrl: "https://example.org/clinicians/profile",
        lastReviewed: "2026-10-01",
      },
    });
    expect(parsed.editorial?.categories).toEqual(["Prevention"]);
    expect(parsed.editorial?.cornerstone).toBe(true);
    expect(parsed.tags).toEqual(["Enamel", "Brushing"]);
    expect(parsed.reviewer?.credentials).toBe("Example qualification");
    expect(parsed.reviewer?.shortBio).toBe("Example professional biography");
  });

  it("reports incomplete or invalid editorial reviewer details without claiming approval", () => {
    expect(assessCmsReviewerDraft(undefined, "2026-10-22").fieldsComplete).toBe(false);
    expect(assessCmsReviewerDraft({
      name: "Reviewer", credentials: "Qualification", profileUrl: "http://example.com/profile",
      lastReviewed: "2026-10-23",
    }, "2026-10-22").issues).toHaveLength(2);
    expect(assessCmsReviewerDraft({
      name: "Reviewer", credentials: "Qualification", profileUrl: "https://user:pass@example.org/profile",
      lastReviewed: "2026-02-30",
    }, "2026-10-22").fieldsComplete).toBe(false);
  });

  it("labels fully filled metadata as ready for independent verification, not approved", () => {
    expect(assessCmsReviewerDraft({
      name: "Example Reviewer", credentials: "Example Credential",
      profileUrl: "https://example.org/clinical-profile",
      lastReviewed: "2026-10-20",
    }, "2026-10-22")).toEqual({ fieldsComplete: true, issues: [] });
  });
});
