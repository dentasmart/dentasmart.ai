import { describe, it, expect } from "vitest";

describe("GA4 Configuration", () => {
  it("allows an unset local GA4 ID but validates any configured ID", () => {
    // Local QA is deliberately allowed to run without analytics credentials.
    // Production deployment configuration is validated separately.
    const ga4Id = process.env.VITE_GA4_MEASUREMENT_ID;
    if (!ga4Id) {
      expect(ga4Id ?? "").toBe("");
      return;
    }
    expect(ga4Id).toMatch(/^G-[A-Z0-9]+$/);
  });

  it("fails closed rather than loading GA4 when no measurement ID is available", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const analyticsSource = fs.readFileSync(
      path.resolve(__dirname, "../client/src/lib/analytics.ts"),
      "utf-8"
    );
    expect(analyticsSource).toContain('const id = getGA4MeasurementId();');
    expect(analyticsSource).toContain('if (!id || typeof window === "undefined" || ga4Configured) return;');
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

  it("queues Google tag commands as native arguments for the external loader", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const analyticsSource = fs.readFileSync(
      path.resolve(__dirname, "../client/src/lib/analytics.ts"),
      "utf-8"
    );

    expect(analyticsSource).toContain("window.gtag = function gtag(..._args: unknown[]) {");
    expect(analyticsSource).toContain("window.dataLayer?.push(arguments);");
    expect(analyticsSource).not.toContain("window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);");
  });
});
