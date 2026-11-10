import { describe, expect, it } from "vitest";
import { getCmsDraftDeletePolicy } from "./cmsDraftDeletePolicy";

describe("isolated CMS draft delete policy", () => {
  it("allows deleting a user-created saved private draft", () => {
    const policy = getCmsDraftDeletePolicy({
      editable: true, revision: 3, publishedRevision: null, origin: "draft",
    });
    expect(policy.allowed).toBe(true);
    expect(policy.label).toBe("Delete draft");
    expect(policy.explanation).toContain("revision history");
  });

  it("allows discarding only the private overlay of a source-backed page", () => {
    const policy = getCmsDraftDeletePolicy({
      editable: true, revision: 11, publishedRevision: null, origin: "source",
    });
    expect(policy.allowed).toBe(true);
    expect(policy.label).toBe("Discard saved draft");
    expect(policy.explanation).toContain("original source-controlled public page stays unchanged");
  });

  it("protects any published test snapshot, even on a draft-created page", () => {
    for (const origin of ["source", "draft"] as const) {
      expect(getCmsDraftDeletePolicy({
        editable: true, revision: 12, publishedRevision: 11, origin,
      }).allowed).toBe(false);
    }
  });

  it("protects the immutable zero revision and every unsaved page", () => {
    for (const origin of ["source", "draft"] as const) {
      expect(getCmsDraftDeletePolicy({
        editable: true, revision: 0, publishedRevision: null, origin,
      }).allowed).toBe(false);
    }
  });

  it("never deletes a read-only original source page", () => {
    expect(getCmsDraftDeletePolicy({
      editable: false, revision: 4, publishedRevision: null, origin: "source",
    }).allowed).toBe(false);
  });
});
