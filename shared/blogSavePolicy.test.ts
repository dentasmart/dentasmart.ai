import { describe, expect, it } from "vitest";
import { getBlogSaveIntent, isUnsafeBlogStatusDemotion } from "./blogSavePolicy";

describe("Blog Editor save intent", () => {
  it("saves a new article as a private draft", () => {
    expect(getBlogSaveIntent("draft", true)).toEqual({
      label: "Save Draft", submittedStatus: "draft", changesLivePage: false,
    });
  });
  it("saves an existing draft without publishing", () => {
    expect(getBlogSaveIntent("draft", false).submittedStatus).toBe("draft");
  });
  it("saves published article edits without changing status and flags live impact", () => {
    expect(getBlogSaveIntent("published", false)).toEqual({
      label: "Save Changes", submittedStatus: undefined, changesLivePage: true,
    });
  });
  it("retains an unpublished article's unpublished status", () => {
    expect(getBlogSaveIntent("unpublished", false)).toEqual({
      label: "Save Changes", submittedStatus: undefined, changesLivePage: false,
    });
  });
});

describe("Blog update publication state safety", () => {
  it("rejects a published-to-draft change in the generic update API", () => {
    expect(isUnsafeBlogStatusDemotion("published", "draft")).toBe(true);
  });
  it("rejects a published-to-unpublished change in generic update API", () => {
    expect(isUnsafeBlogStatusDemotion("published", "unpublished")).toBe(true);
  });
  it("allows content updates without a publication status transition", () => {
    expect(isUnsafeBlogStatusDemotion("published", undefined)).toBe(false);
  });
  it("allows keeping the same status", () => {
    expect(isUnsafeBlogStatusDemotion("published", "published")).toBe(false);
    expect(isUnsafeBlogStatusDemotion("draft", "draft")).toBe(false);
    expect(isUnsafeBlogStatusDemotion("unpublished", "unpublished")).toBe(false);
  });
});
