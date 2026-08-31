import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";
import {
  EMAIL_UNSUBSCRIBE_REASON,
  buildEmailUnsubscribeUrl,
  decodeEmailUnsubscribeRouteToken,
  shouldAutomaticallySubmit,
  submitEmailUnsubscribe,
} from "../client/src/lib/emailUnsubscribe";
import { shouldDisableAnalyticsForPath } from "../client/src/lib/analytics";
import { isEmailUnsubscribePath } from "../shared/privacyRoutes";
import { isKnownRouteSync } from "./knownRoutes";
import { resolveMetaTags } from "./metaTags";
import { renderHtmlForRequest } from "./_core/vite";

const pageSource = readFileSync(
  resolve(process.cwd(), "client/src/pages/EmailUnsubscribe.tsx"),
  "utf8",
);
const appSource = readFileSync(resolve(process.cwd(), "client/src/App.tsx"), "utf8");
const pageTrackingSource = readFileSync(
  resolve(process.cwd(), "client/src/hooks/usePageTracking.ts"),
  "utf8",
);
const indexHtml = readFileSync(resolve(process.cwd(), "client/index.html"), "utf8");

describe("public email unsubscribe page", () => {
  it("builds the required encoded backend URL and form request without parsing HTML", async () => {
    const fetchMock = vi.fn(async () => new Response(null, { status: 204 }));

    await expect(submitEmailUnsubscribe("token/with+symbols", fetchMock)).resolves.toBe("success");
    expect(buildEmailUnsubscribeUrl("token/with+symbols")).toBe(
      "https://live-backend.dentasmart.ai/email/unsubscribe/token%2Fwith%2Bsymbols/",
    );
    expect(decodeEmailUnsubscribeRouteToken("token%2Fwith%2Bsymbols")).toBe(
      "token/with+symbols",
    );
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://live-backend.dentasmart.ai/email/unsubscribe/token%2Fwith%2Bsymbols/",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ reason: EMAIL_UNSUBSCRIBE_REASON }).toString(),
      },
    );
  });

  it("maps 2xx, 404, other server failures, and network failures to the required states", async () => {
    await expect(submitEmailUnsubscribe("ok", async () => new Response(null, { status: 200 }))).resolves.toBe("success");
    await expect(submitEmailUnsubscribe("missing", async () => new Response(null, { status: 404 }))).resolves.toBe("invalid");
    await expect(submitEmailUnsubscribe("down", async () => new Response(null, { status: 503 }))).resolves.toBe("error");
    await expect(submitEmailUnsubscribe("offline", async () => { throw new Error("offline"); })).resolves.toBe("error");
  });

  it("prevents duplicate automatic submission for the same token while allowing a deliberate retry", () => {
    expect(shouldAutomaticallySubmit(null, "token")).toBe(true);
    expect(shouldAutomaticallySubmit("token", "token")).toBe(false);
    expect(shouldAutomaticallySubmit("token", "different-token")).toBe(true);
    expect(pageSource).toContain("requestInFlight.current");
    expect(pageSource).toContain("onRetry={() => void submitRequest()}");
  });

  it("contains the exact required user-facing state messages", () => {
    expect(pageSource).toContain("Unsubscribing you from DentaSmart emails...");
    expect(pageSource).toContain("You have been unsubscribed.");
    expect(pageSource).toContain("You will no longer receive DentaSmart marketing, lifecycle, reminder, and promotional emails for this account.");
    expect(pageSource).toContain("This unsubscribe link is invalid or expired.");
    expect(pageSource).toContain("If you still need help, please contact");
    expect(pageSource).toContain("We could not update your email preference right now.");
    expect(pageSource).toContain("Please try again in a moment.");
    expect(pageSource).not.toMatch(/console\.(log|error|warn)/);
  });

  it("recognizes the public token route and emits server-visible noindex metadata", async () => {
    expect(isEmailUnsubscribePath("/email/unsubscribe/example-token")).toBe(true);
    expect(isEmailUnsubscribePath("/email/unsubscribe/example-token/")).toBe(true);
    expect(isKnownRouteSync("/email/unsubscribe/example-token")).toBe(true);
    await expect(resolveMetaTags("/email/unsubscribe/example-token")).resolves.toMatchObject({
      canonical: null,
      robots: "noindex, nofollow",
    });
  });

  it("removes tracking bootstraps and adds a no-referrer policy before serving the token route", async () => {
    const rendered = await renderHtmlForRequest(
      indexHtml,
      "/email/unsubscribe/private-token",
      false,
    );

    expect(rendered).toContain('<meta name="robots" content="noindex, nofollow"');
    expect(rendered).toContain('<meta name="referrer" content="no-referrer" />');
    expect(rendered).not.toContain("data-dentasmart-tracking");
    expect(rendered).not.toContain("googletagmanager.com");
    expect(rendered).not.toContain("google-analytics.com");
    expect(rendered).not.toContain("connect.facebook.net");
    expect(rendered).not.toContain("facebook.com/tr");
    expect(rendered).not.toContain("/umami");
    expect(rendered).not.toContain("private-token");
  });

  it("blocks client analytics for tokenized unsubscribe paths only", () => {
    expect(shouldDisableAnalyticsForPath("/email/unsubscribe/private-token")).toBe(true);
    expect(shouldDisableAnalyticsForPath("/email/unsubscribe/private-token/")).toBe(true);
    expect(shouldDisableAnalyticsForPath("/download")).toBe(false);
  });

  it("registers the public route while suppressing page tracking and conversion overlays", () => {
    expect(appSource).toContain('<Route path="/email/unsubscribe/:token" component={EmailUnsubscribe} />');
    expect(appSource).toContain("!isPrivateEmailRoute");
    expect(pageTrackingSource).toContain("if (isEmailUnsubscribePath(location)) return;");
  });
});
