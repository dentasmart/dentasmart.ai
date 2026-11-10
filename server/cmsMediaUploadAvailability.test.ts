import { describe, expect, it } from "vitest";
import { cmsMediaUploadAvailability } from "./cmsMediaUploadAvailability";

describe("CMS image upload availability", () => {
  it("keeps isolated local test uploads available", () => {
    expect(cmsMediaUploadAvailability(true, false).enabled).toBe(true);
  });

  it("keeps isolated QA uploads available", () => {
    expect(cmsMediaUploadAvailability(false, true).enabled).toBe(true);
  });

  it("exposes private upload only when the backend has been explicitly verified", () => {
    expect(cmsMediaUploadAvailability(false, false, true)).toEqual({
      enabled: true,
      mode: "private-storage",
    });
    expect(cmsMediaUploadAvailability(true, false, true).mode).toBe("isolated-test");
  });

  it("blocks uploads outside approved isolated environments", () => {
    const result = cmsMediaUploadAvailability(false, false);
    expect(result.enabled).toBe(false);
    expect(result.mode).toBe("storage-not-verified");
  });
});
