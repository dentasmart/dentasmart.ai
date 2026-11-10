import { describe, expect, it } from "vitest";
import {
  BLOG_PRESERVED_FIELDS, compareBlogMetadataSnapshots,
  type BlogMetadataFingerprint,
} from "./blogMetadataPreservation";

function row(id: number, overrides: Partial<BlogMetadataFingerprint> = {}): BlogMetadataFingerprint {
  const fields = Object.fromEntries(BLOG_PRESERVED_FIELDS.map(field => [field, null])) as
    Record<(typeof BLOG_PRESERVED_FIELDS)[number], string | null>;
  return { id, ...fields, ...overrides };
}

describe("Mandatory blog metadata / reviewer preservation release gate", () => {
  it("accepts identical fingerprints even if layout and analysis components changed", () => {
    const baseline = [
      row(1, { slug: "reviewed-article", metaTitle: "hash_title1",
        metaDescription: "hash_description1", reviewedByName: "hash_name1",
        reviewerProfileUrl: "hash_profile1", reviewerJsonLd: "hash_schema1" }),
      row(2, { slug: "ordinary-article", metaTitle: "hash_title2", metaDescription: "hash_description2" }),
    ];
    expect(compareBlogMetadataSnapshots(baseline, structuredClone(baseline))).toEqual([]);
  });
  it("blocks any prior article metadata change while retaining reviewer-only-on-one-blog", () => {
    const before = [row(1, { reviewedByName: "present", metaDescription: "hash_before" }),
      row(2, { metaTitle: "unchanged", reviewedByName: null })];
    const after = [row(1, { reviewedByName: "present", metaDescription: "hash_modified" }),
      row(2, { metaTitle: "unchanged", reviewedByName: "unexpected_reviewer" })];
    expect(compareBlogMetadataSnapshots(before, after)).toEqual([
      { id: 1, field: "metaDescription", issue: "changed" },
      { id: 2, field: "reviewedByName", issue: "changed" },
    ]);
  });
  it("detects a reviewer disappearing, a lost article, or a modified slug", () => {
    const before = [row(1, { slug: "original", reviewedByCredentials: "credentials" }), row(2)];
    const after = [row(1, { slug: "renamed", reviewedByCredentials: null })];
    expect(compareBlogMetadataSnapshots(before, after)).toEqual([
      { id: 1, field: "slug", issue: "changed" },
      { id: 1, field: "reviewedByCredentials", issue: "changed" },
      { id: 2, field: "snapshot", issue: "missing_post" },
    ]);
  });
  it("rejects incomplete fingerprints and duplicated rows rather than giving a false pass", () => {
    const incomplete = { id: 1, metaTitle: "hash" } as BlogMetadataFingerprint;
    const issues = compareBlogMetadataSnapshots([incomplete, incomplete], [row(1)]);
    expect(issues.some(issue => issue.issue === "missing_field")).toBe(true);
    expect(issues.some(issue => issue.issue === "duplicate_id")).toBe(true);
  });
  it("does not treat newly written articles as changes to preexisting article metadata", () => {
    expect(compareBlogMetadataSnapshots([row(1)], [row(1), row(2)])).toEqual([]);
  });
});
