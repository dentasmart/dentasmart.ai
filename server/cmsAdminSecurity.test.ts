import { describe, expect, it } from "vitest";
import { isCmsAdminSecretConfigured as allowed } from "./cmsAdminSecurity";

describe("Production CMS admin secret policy", () => {
  it("preserves development and QA behavior", () => {
    expect(allowed("development", undefined)).toBe(true);
    expect(allowed("test", undefined)).toBe(true);
  });

  it("rejects missing and weak production secrets", () => {
    expect(allowed("production", undefined)).toBe(false);
    expect(allowed("production", "")).toBe(false);
    expect(allowed("production", "short-secret")).toBe(false);
    expect(allowed("production", "a".repeat(31))).toBe(false);
    expect(allowed("production", "dentasmart-blog-admin-secret")).toBe(false);
  });

  it("accepts a configured production key of sufficient length", () => {
    expect(allowed("production", "a".repeat(32))).toBe(true);
  });
});
