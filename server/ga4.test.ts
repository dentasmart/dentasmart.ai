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

  it("should have gtag.js script in index.html using env var placeholder", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const indexHtml = fs.readFileSync(
      path.resolve(__dirname, "../client/index.html"),
      "utf-8"
    );
    // gtag.js should be loaded directly in index.html for reliable data collection
    expect(indexHtml).toContain("googletagmanager.com/gtag/js?id=%VITE_GA4_MEASUREMENT_ID%");
    // The inline config script should use the env var placeholder (not a hardcoded ID)
    expect(indexHtml).toContain("gtag('config', '%VITE_GA4_MEASUREMENT_ID%')");
    // Should NOT have the old hardcoded ID
    expect(indexHtml).not.toContain("G-G9VKVT0PDJ");
  });

  it("should have preconnect hints for Google Analytics domains", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const indexHtml = fs.readFileSync(
      path.resolve(__dirname, "../client/index.html"),
      "utf-8"
    );
    expect(indexHtml).toContain('preconnect" href="https://www.googletagmanager.com"');
    expect(indexHtml).toContain('preconnect" href="https://www.google-analytics.com"');
  });

  it("should have send_page_view enabled (default) in index.html config", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const indexHtml = fs.readFileSync(
      path.resolve(__dirname, "../client/index.html"),
      "utf-8"
    );
    // The config call should NOT have send_page_view: false
    expect(indexHtml).not.toContain("send_page_view");
  });
});
