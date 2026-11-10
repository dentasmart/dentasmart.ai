import { describe, expect, it } from "vitest";
import { hasActiveCmsTestPublication } from "./cmsPublicationUiPolicy";

describe("CMS test-publication controls", () => {
  it("hides Unpublish for a new or saved private draft", () => {
    expect(hasActiveCmsTestPublication({ hubId: "conditions", slug: "test-draft-1", publishedRevision: null })).toBe(false);
    expect(hasActiveCmsTestPublication({ hubId: "conditions", slug: "toothache", publishedRevision: null })).toBe(false);
  });

  it("shows Unpublish only for the actively TEST-published Toothache overlay", () => {
    expect(hasActiveCmsTestPublication({ hubId: "conditions", slug: "toothache", publishedRevision: 11 })).toBe(true);
  });

  it("never confuses source pages or other hubs with a CMS test publication", () => {
    expect(hasActiveCmsTestPublication({ hubId: "conditions", slug: "gum-disease", publishedRevision: 11 })).toBe(false);
    expect(hasActiveCmsTestPublication({ hubId: "guides", slug: "toothache", publishedRevision: 11 })).toBe(false);
    expect(hasActiveCmsTestPublication({ hubId: "conditions", slug: "toothache", publishedRevision: undefined })).toBe(false);
  });
});
