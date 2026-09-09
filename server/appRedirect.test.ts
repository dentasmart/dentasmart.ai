import { describe, expect, it } from "vitest";
import { getAppDownloadRedirectTarget } from "./_core/index";

describe("legacy /app download redirects", () => {
  it.each([
    "/app",
    "/app/",
    "/app/ios",
    "/app/deep/link",
  ])("redirects %s to the canonical download page", path => {
    expect(getAppDownloadRedirectTarget(path)).toBe("/download/");
  });

  it.each([
    "/application",
    "/apps",
    "/download/",
    "/api/app",
  ])("does not match unrelated path %s", path => {
    expect(getAppDownloadRedirectTarget(path)).toBeNull();
  });
});
