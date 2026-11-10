import { describe, expect, it } from "vitest";
import { shouldSaveMediaAltDefault } from "./mediaAltPolicy";

describe("Media Library alt-text persistence policy", () => {
  it("persists a newly written alt default for a catalogued CMS image", () => {
    expect(shouldSaveMediaAltDefault(12, "", "Dental X-ray with visible tooth roots")).toBe(true);
  });
  it("persists a cleared alt default rather than silently discarding it", () => {
    expect(shouldSaveMediaAltDefault(12, "Old image description", "")).toBe(true);
  });
  it("does not overwrite a library default merely by selecting a file", () => {
    expect(shouldSaveMediaAltDefault(12, "Same description", "Same description")).toBe(false);
  });
  it("does not write an unregistered URL image to the library", () => {
    expect(shouldSaveMediaAltDefault(undefined, "", "Local image description")).toBe(false);
  });
  it("does not erase library alt text when an article marks a placement decorative", () => {
    expect(shouldSaveMediaAltDefault(12, "Available description", "", true)).toBe(false);
  });
});
