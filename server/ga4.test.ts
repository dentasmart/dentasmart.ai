import { describe, it, expect } from "vitest";

describe("GA4 Configuration", () => {
  it("should have VITE_GA4_MEASUREMENT_ID environment variable set", () => {
    const ga4Id = process.env.VITE_GA4_MEASUREMENT_ID;
    expect(ga4Id).toBeDefined();
    expect(ga4Id).not.toBe("");
    expect(ga4Id).toMatch(/^G-[A-Z0-9]+$/);
  });

  it("should have a valid GA4 Measurement ID format", () => {
    const ga4Id = process.env.VITE_GA4_MEASUREMENT_ID!;
    // GA4 IDs start with G- followed by alphanumeric characters
    expect(ga4Id.startsWith("G-")).toBe(true);
    expect(ga4Id.length).toBeGreaterThan(3);
  });

  it("should not have the old hardcoded GA4 ID in index.html", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const indexHtml = fs.readFileSync(
      path.resolve(__dirname, "../client/index.html"),
      "utf-8"
    );
    // The old hardcoded ID should not appear in index.html
    expect(indexHtml).not.toContain("G-G9VKVT0PDJ");
    // There should be no hardcoded gtag script in index.html
    expect(indexHtml).not.toContain("googletagmanager.com/gtag/js?id=");
  });
});
