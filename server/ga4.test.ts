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

  it("keeps GA4 out of the document bootstrap and loads it only through the consent-gated runtime", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const indexHtml = fs.readFileSync(
      path.resolve(__dirname, "../client/index.html"),
      "utf-8"
    );
    const analyticsSource = fs.readFileSync(
      path.resolve(__dirname, "../client/src/lib/analytics.ts"),
      "utf-8"
    );

    expect(indexHtml).not.toContain("googletagmanager.com/gtag/js");
    expect(indexHtml).not.toContain("%VITE_GA4_MEASUREMENT_ID%");
    expect(analyticsSource).toContain('addExternalScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`)');
    expect(analyticsSource).toContain("if (typeof window === \"undefined\" || !canTrackCurrentPath()) return;");
    expect(analyticsSource).toContain("if (consent.analytics) {");
    expect(indexHtml).not.toContain("G-G9VKVT0PDJ");
  });

  it("does not preconnect to optional GA4 hosts before analytics consent", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const indexHtml = fs.readFileSync(
      path.resolve(__dirname, "../client/index.html"),
      "utf-8"
    );
    expect(indexHtml).not.toContain('preconnect" href="https://www.googletagmanager.com"');
    expect(indexHtml).not.toContain('preconnect" href="https://www.google-analytics.com"');
  });

  it("disables automatic GA4 pageviews so the central route tracker owns pageview delivery", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const analyticsSource = fs.readFileSync(
      path.resolve(__dirname, "../client/src/lib/analytics.ts"),
      "utf-8"
    );
    expect(analyticsSource).toContain('window.gtag("config", id, { send_page_view: false })');
  });
});
