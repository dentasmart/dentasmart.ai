import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getAppDownloadRedirectTarget } from "./appRedirect";
import { acceptsAnalyticsEnvelope, toConversionEventInsert } from "./analyticsValidation";
import { createPageviewDeliveryState } from "../shared/pageviewState";
import { isEmailUnsubscribePath } from "../shared/privacyRoutes";

const projectRoot = path.resolve(import.meta.dirname, "..");
const validPageView = {
  event_name: "page_view",
  event_version: 1,
  event_id: "event_test_123",
  timestamp: "2026-09-14T00:00:00.000Z",
  page_path: "/download/",
  route_family: "download",
  landing_path: "/",
  session_id: "session_test_123",
};

describe("Phase 10 privacy-conscious analytics foundation", () => {
  it("accepts a canonical, path-only event envelope", () => {
    expect(acceptsAnalyticsEnvelope(validPageView)).toBe(true);
  });

  it("rejects query-bearing paths and undeclared data", () => {
    expect(acceptsAnalyticsEnvelope({ ...validPageView, page_path: "/download/?email=private@example.com" })).toBe(false);
    expect(acceptsAnalyticsEnvelope({ ...validPageView, email: "private@example.com" })).toBe(false);
    expect(acceptsAnalyticsEnvelope({ ...validPageView, raw_referrer: "https://example.test/?token=secret" })).toBe(false);
  });

  it("rejects every protected identity, health, free-text, report, and token field", () => {
    const prohibitedFields = {
      phone: "+15551234567",
      name: "Private Visitor",
      symptom_text: "pain while biting",
      diagnosis: "unverified condition",
      report_text: "private report content",
      token: "private-token",
      image_url: "https://example.test/private-image.jpg",
      health_notes: "private health note",
    };
    for (const [key, value] of Object.entries(prohibitedFields)) {
      expect(acceptsAnalyticsEnvelope({ ...validPageView, [key]: value })).toBe(false);
    }
  });

  it("recognizes unsubscribe URLs as sensitive analytics exclusions", () => {
    expect(isEmailUnsubscribePath("/email/unsubscribe/private-token")).toBe(true);
    expect(isEmailUnsubscribePath("/pricing/")).toBe(false);
  });

  it("maps a canonical event without visitor-entered content or raw device metadata", () => {
    const insert = toConversionEventInsert(validPageView);
    expect(insert.eventName).toBe("page_view");
    expect(insert.sourcePage).toBe("/download/");
    expect(insert.referrer).toBeNull();
    expect(insert.userAgent).toBeNull();
    expect(insert.metadata).not.toHaveProperty("email");
    expect(insert.metadata).not.toHaveProperty("rawReferrer");
  });

  it("preserves only approved campaign fields through legacy app redirects", () => {
    expect(
      getAppDownloadRedirectTarget("/app/android", "?utm_source=search&utm_medium=cpc&utm_campaign=fall&token=private&email=private@example.com"),
    ).toBe("/download/?utm_source=search&utm_medium=cpc&utm_campaign=fall");
  });

  it("coalesces duplicate delivery within one route view while permitting later back or forward views", () => {
    const state = createPageviewDeliveryState();
    const initial = state.startRouteView();
    expect(state.claim(initial, "analytics")).toBe(true);
    expect(state.claim(initial, "analytics")).toBe(false);
    expect(state.claim(initial, "marketing")).toBe(true);

    const backToTheSamePath = state.startRouteView();
    expect(backToTheSamePath).not.toBe(initial);
    expect(state.claim(backToTheSamePath, "analytics")).toBe(true);
    expect(state.claim(backToTheSamePath, "marketing")).toBe(true);
  });

  it("keeps third-party trackers out of the document head until runtime consent", () => {
    const head = readFileSync(path.join(projectRoot, "client/index.html"), "utf8");
    const app = readFileSync(path.join(projectRoot, "client/src/App.tsx"), "utf8");
    const consent = readFileSync(path.join(projectRoot, "client/src/components/ConsentManager.tsx"), "utf8");
    const waitlist = readFileSync(path.join(projectRoot, "client/src/components/WaitlistPopup.tsx"), "utf8");
    const symptomQuiz = readFileSync(path.join(projectRoot, "client/src/pages/SymptomQuiz.tsx"), "utf8");

    expect(head).not.toMatch(/googletagmanager\.com\/gtag\/js/i);
    expect(head).not.toMatch(/connect\.facebook\.net\/en_US\/fbevents\.js/i);
    expect(head).not.toMatch(/manus-analytics\.com\/script\.js/i);
    expect(app).toContain("<ConsentManager />");
    expect(consent).toContain("Reject non-essential");
    expect(waitlist).not.toContain("fbpixel");
    expect(symptomQuiz).not.toContain("fbpixel");
  });

  it("uses explicit consent-gated Umami pageview ownership", () => {
    const analytics = readFileSync(path.join(projectRoot, "client/src/lib/analytics.ts"), "utf8");
    expect(analytics).toContain('"data-auto-track": "false"');
    expect(analytics).toContain('"data-auto-pageview": "false"');
    expect(analytics).toContain("trackUmamiPageview(payload.page_path)");
    expect(analytics).toContain("flushPendingUmamiPageviews");
  });

  it("keeps Meta structurally gated by Marketing consent with truthful standard events", () => {
    const analytics = readFileSync(path.join(projectRoot, "client/src/lib/analytics.ts"), "utf8");
    expect(analytics).toContain("if (consent.marketing) {");
    expect(analytics).toContain("initMetaPixel()");
    expect(analytics).toContain('window.fbq("track", "PageView")');
    expect(analytics).toContain('payload.event_name === "checkout_started"');
    expect(analytics).toContain('window.fbq("track", "InitiateCheckout"');
    expect(analytics).toContain('payload.event_name === "employer_demo_submitted"');
    expect(analytics).toContain('window.fbq("track", "Lead"');
    expect(analytics).not.toContain('window.fbq("track", "CompleteRegistration"');
    expect(analytics).not.toContain('window.fbq("track", "AddToCart"');
  });

  it("keeps migrated high-fan-out CTAs on canonical conversion events", () => {
    for (const relativePath of [
      "client/src/components/Navigation.tsx",
      "client/src/components/OralHealthScoreTeaser.tsx",
      "client/src/components/StickyDownloadBanner.tsx",
      "client/src/components/ScrollProgressCTA.tsx",
      "client/src/components/ExitIntentPopup.tsx",
      "client/src/components/NextStepsBox.tsx",
      "client/src/pages/Home.tsx",
      "client/src/pages/ComparePage.tsx",
      "client/src/pages/DentaSmartVsChatGPT.tsx",
      "client/src/pages/Pricing.tsx",
    ]) {
      const source = readFileSync(path.join(projectRoot, relativePath), "utf8");
      expect(source).toContain("trackConversionEvent");
      expect(source).not.toContain("trackEvent(");
    }

    const downloadSection = readFileSync(path.join(projectRoot, "client/src/components/DownloadSection.tsx"), "utf8");
    expect(downloadSection).toContain("trackAppDownload");
    expect(downloadSection).not.toContain("trackEvent(");

    expect(() => readFileSync(path.join(projectRoot, "client/src/lib/fbpixel.ts"), "utf8")).toThrow();
  });

  it("does not retain legacy click-to-outcome Meta mapping descriptions", () => {
    const adminSeoSetup = readFileSync(path.join(projectRoot, "client/src/pages/AdminSeoSetup.tsx"), "utf8");
    expect(adminSeoSetup).not.toContain('from: "cta_get_score_click", to: "InitiateCheckout"');
    expect(adminSeoSetup).not.toContain('from: "symptom_quiz_complete", to: "CompleteRegistration"');
    expect(adminSeoSetup).not.toContain('from: "download_ios_click", to: "Lead"');
  });
});
