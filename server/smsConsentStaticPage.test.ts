import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { staticRoutes } from "../shared/routes";
import {
  SMS_CONSENT_DISCLOSURE,
  SMS_CONSENT_DISCLOSURE_PREFIX,
  SMS_PRIVACY_POLICY_URL,
  SMS_TERMS_OF_SERVICE_URL,
} from "../shared/smsConsent";
import { resolveSSRContent } from "./ssrContent";

const root = resolve(import.meta.dirname, "..");
const readSource = (relativePath: string) =>
  readFileSync(resolve(root, relativePath), "utf8");

const PROVIDER_DISCLOSURE =
  "By clicking here you consent to receive sms customer care-related and one-on-one communication messages from DentaSmart. Message frequency may vary. Standard Message and Data Rates may apply. Reply STOP to opt out. Reply Help for help. https://dentasmart.ai/privacy-policy/ https://dentasmart.ai/terms-of-service/";

describe("static SMS consent disclosure", () => {
  it("keeps the exact standardized disclosure and legal destinations", () => {
    expect(SMS_CONSENT_DISCLOSURE).toBe(PROVIDER_DISCLOSURE);
    expect(SMS_CONSENT_DISCLOSURE_PREFIX).toBe(
      PROVIDER_DISCLOSURE.replace(
        " https://dentasmart.ai/privacy-policy/ https://dentasmart.ai/terms-of-service/",
        "",
      ),
    );
    expect(SMS_CONSENT_DISCLOSURE).toContain(SMS_PRIVACY_POLICY_URL);
    expect(SMS_CONSENT_DISCLOSURE).toContain(SMS_TERMS_OF_SERVICE_URL);
  });

  it("keeps the provider-required privacy-policy paragraphs literal", () => {
    const privacyPolicy = readSource("client/src/pages/PrivacyPolicy.tsx");

    expect(privacyPolicy).toContain(
      "We will not share your opt-in to an SMS campaign with any third party for purposes unrelated to providing you with the services of that campaign. We may share your Personal Data, including your SMS opt-in or consent status, with third parties that help us provide our messaging services, including but not limited to platform providers, phone companies, and any other vendors who assist us in the delivery of text messages.",
    );
    expect(privacyPolicy).toContain(
      "All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.",
    );
  });

  it("keeps the public route, metadata, server-rendered copy, and sitemap ownership", async () => {
    const app = readSource("client/src/App.tsx");
    const metaTags = readSource("server/metaTags.ts");
    const result = await resolveSSRContent("/sms-consent/");

    expect(app).toContain('path="/sms-consent" component={SMSConsent}');
    expect(staticRoutes.find((route) => route.path === "/sms-consent")?.inSitemap).not.toBe(false);
    expect(metaTags).toContain('"/sms-consent"');
    expect(result).not.toBeNull();
    const visibleText = result!.html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    expect(visibleText).toContain(PROVIDER_DISCLOSURE);
    expect(result!.html).toContain('<a href="/privacy-policy/">https://dentasmart.ai/privacy-policy/</a>');
    expect(result!.html).toContain('<a href="/terms-of-service/">https://dentasmart.ai/terms-of-service/</a>');
  });

  it("keeps an accessible, initially unchecked checkbox without a submission control", () => {
    const page = readSource("client/src/pages/SMSConsent.tsx");

    expect(page).toContain('id="sms-consent-checkbox"');
    expect(page).toContain("defaultChecked={false}");
    expect(page).toContain('href="/privacy-policy/"');
    expect(page).toContain('href="/terms-of-service/"');
    expect(page).toContain("SMS consent is optional. Reply STOP to opt out or HELP for help.");
    expect(page).not.toContain('id="sms-consent-phone"');
    expect(page).not.toContain("U.S. mobile phone number");
    expect(page).not.toContain("This disclosure page does not submit or store the number entered here.");
    expect(page).not.toContain("Your selection on this page is not submitted or saved.");
    expect(page).not.toContain("<form");
    expect(page).not.toContain("Confirm SMS Consent");
    expect(page).not.toContain("useMutation");
    expect(page).not.toContain("trpc.");
  });

  it("contains no SMS persistence, router, schema, or migration surface", () => {
    const page = readSource("client/src/pages/SMSConsent.tsx");
    const contract = readSource("shared/smsConsent.ts");
    const appRouter = readSource("server/routers.ts");
    const schema = readSource("drizzle/schema.ts");
    const journal = readSource("drizzle/meta/_journal.json");

    expect(existsSync(resolve(root, "server/smsConsentRouter.ts"))).toBe(false);
    expect(existsSync(resolve(root, "drizzle/0018_sms_consent_records.sql"))).toBe(false);
    expect(existsSync(resolve(root, "drizzle/meta/0018_snapshot.json"))).toBe(false);
    expect(page).not.toContain("idempotencyKey");
    expect(contract).not.toContain("WORDING_VERSION");
    expect(appRouter).not.toContain("smsConsent");
    expect(schema).not.toContain("smsConsentRecords");
    expect(journal).not.toContain("sms_consent_records");
  });
});
