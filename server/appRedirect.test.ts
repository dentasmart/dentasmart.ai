import { describe, expect, it } from "vitest";
import { getAppDownloadRedirectTarget } from "./appRedirect";

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

  it("preserves only allowlisted campaign fields across the one-hop download redirect", () => {
    expect(
      getAppDownloadRedirectTarget(
        "/app/ios",
        "?utm_source=newsletter&utm_medium=email&utm_campaign=launch&utm_content=button&utm_term=oral+health&email=private%40example.com&token=secret",
      ),
    ).toBe("/download/?utm_source=newsletter&utm_medium=email&utm_campaign=launch&utm_content=button&utm_term=oral+health");
  });
});
