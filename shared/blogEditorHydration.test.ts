import { describe, expect, it } from "vitest";
import { shouldHydrateBlogEditor } from "./blogEditorHydration";

describe("Blog editor persistence while idle", () => {
  it("hydrates an existing record once on initial load", () => {
    expect(shouldHydrateBlogEditor(12, 12, null)).toBe(true);
    expect(shouldHydrateBlogEditor(12, 12, 12)).toBe(false);
  });
  it("never rehydrates the same record after a cache update or refetch", () => {
    expect(shouldHydrateBlogEditor(12, 12, 12)).toBe(false);
  });
  it("cannot hydrate stale data belonging to a different article", () => {
    expect(shouldHydrateBlogEditor(12, 13, null)).toBe(false);
    expect(shouldHydrateBlogEditor(13, 12, null)).toBe(false);
    expect(shouldHydrateBlogEditor(null, 12, null)).toBe(false);
  });
  it("allows a new article ID to hydrate after navigation resets its guard", () => {
    expect(shouldHydrateBlogEditor(13, 13, null)).toBe(true);
  });
});
