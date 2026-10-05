import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const footerSource = readFileSync(
  resolve(process.cwd(), "client/src/components/Footer.tsx"),
  "utf8"
);

describe("public footer SMS preferences link", () => {
  it("keeps SMS Preferences in Help & Legal between tracking preferences and Terms", () => {
    const privacyIndex = footerSource.indexOf('href="/privacy-policy/"');
    const trackingIndex = footerSource.indexOf("Tracking preferences");
    const smsIndex = footerSource.indexOf("SMS Preferences");
    const termsIndex = footerSource.indexOf('href="/terms-of-service/"');

    expect(privacyIndex).toBeGreaterThan(-1);
    expect(trackingIndex).toBeGreaterThan(privacyIndex);
    expect(smsIndex).toBeGreaterThan(trackingIndex);
    expect(termsIndex).toBeGreaterThan(smsIndex);
  });

  it("uses the public SMS consent route and never exposes the admin route", () => {
    expect(footerSource).toContain('href="/sms-consent/"');
    expect(footerSource).not.toContain("/admin/sms-consents");
  });
});
