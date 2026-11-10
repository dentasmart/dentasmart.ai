import { describe, expect, it } from "vitest";
import {
  shouldInventoryCmsMedia,
  blocksProductionCmsMediaDeletion
} from "./mediaAltSync";

describe("Production CMS media protection", () => {
  it("includes CMS references in production", () => {
    expect(shouldInventoryCmsMedia("production", false, false)).toBe(true);
    expect(shouldInventoryCmsMedia("development", true, false)).toBe(true);
    expect(shouldInventoryCmsMedia("development", false, true)).toBe(true);
    expect(shouldInventoryCmsMedia("development", false, false)).toBe(false);
  });

  it("blocks deletion of production CMS referenced images", () => {
    expect(blocksProductionCmsMediaDeletion("production", [
      { kind: "cms" }
    ])).toBe(true);

    expect(blocksProductionCmsMediaDeletion("production", [
      { kind: "blog" }, { kind: "cms" }
    ])).toBe(true);
  });

  it("preserves existing blog and local test deletion policy", () => {
    expect(blocksProductionCmsMediaDeletion("production", [
      { kind: "blog" }
    ])).toBe(false);

    expect(blocksProductionCmsMediaDeletion("development", [
      { kind: "cms" }
    ])).toBe(false);

    expect(blocksProductionCmsMediaDeletion("production", [])).toBe(false);
  });
});
