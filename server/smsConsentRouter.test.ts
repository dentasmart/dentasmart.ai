import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const mocks = vi.hoisted(() => ({
  getDb: vi.fn(),
}));

vi.mock("./db", () => ({
  getDb: mocks.getDb,
}));

import { staticRoutes } from "../shared/routes";
import { getSafeSmsConsentErrorMessage } from "../client/src/pages/SMSConsent";
import { resolveSSRContent } from "./ssrContent";
import {
  getSmsConsentAuditIp,
  normalizeOptionalEmail,
  normalizeUsPhoneNumber,
  smsConsentRouter,
} from "./smsConsentRouter";

const PROVIDER_DISCLOSURE =
  "By clicking here you consent to receive sms customer care-related and one-on-one communication messages from DentaSmart. Message frequency may vary. Standard Message and Data Rates may apply. Reply STOP to opt out. Reply Help for help. https://dentasmart.ai/privacy-policy/ https://dentasmart.ai/terms-of-service/";
const GENERIC_PERSISTENCE_ERROR =
  "We could not save your SMS preference. Please try again.";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      headers: {},
      socket: { remoteAddress: "203.0.113.44" },
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

function validInput() {
  return {
    fullName: "  Taylor Patient  ",
    email: "  TAYLOR@example.com  ",
    phone: "(415) 555-2671",
    consent: true as const,
    idempotencyKey: "6cb70366-973b-45c7-80aa-a97a2bbc8d76",
  };
}

function databaseWithIdempotencyLookup(result: unknown[] | Error) {
  const limit = result instanceof Error
    ? vi.fn().mockRejectedValue(result)
    : vi.fn().mockResolvedValue(result);
  const where = vi.fn().mockReturnValue({ limit });
  const from = vi.fn().mockReturnValue({ where });
  return {
    select: vi.fn().mockReturnValue({ from }),
    insert: vi.fn(),
  };
}

describe("SMS consent input safeguards", () => {
  beforeEach(() => {
    mocks.getDb.mockReset();
  });

  it("normalizes supported U.S. number formats to E.164", () => {
    expect(normalizeUsPhoneNumber("(415) 555-2671")).toBe("+14155552671");
    expect(normalizeUsPhoneNumber("1-415-555-2671")).toBe("+14155552671");
    expect(normalizeUsPhoneNumber("+1 415 555 2671")).toBe("+14155552671");
  });

  it("fails closed for malformed, non-U.S., and invalid North American numbers", () => {
    expect(normalizeUsPhoneNumber("555-2671")).toBeNull();
    expect(normalizeUsPhoneNumber("+44 20 7946 0958")).toBeNull();
    expect(normalizeUsPhoneNumber("+11235552671")).toBeNull();
    expect(normalizeUsPhoneNumber("+14150552671")).toBeNull();
  });

  it("normalizes optional email without making it a consent requirement", () => {
    expect(normalizeOptionalEmail(" Taylor@Example.com ")).toBe("taylor@example.com");
    expect(normalizeOptionalEmail(undefined)).toBeNull();
    expect(normalizeOptionalEmail("not-an-email")).toBeNull();
  });

  it("uses the most recent valid forwarded address for the request audit record", () => {
    expect(getSmsConsentAuditIp("198.51.100.10, 203.0.113.44", "10.0.0.5")).toBe("203.0.113.44");
    expect(getSmsConsentAuditIp(undefined, "2001:db8::1")).toBe("2001:db8::1");
    expect(getSmsConsentAuditIp("not-an-ip", undefined)).toBeNull();
  });

  it("keeps the provider disclosure literal and customer-care specific", async () => {
    const disclosure = await import("../shared/smsConsent");
    expect(disclosure.SMS_CONSENT_DISCLOSURE).toBe(PROVIDER_DISCLOSURE);
    expect(disclosure.SMS_CONSENT_DISCLOSURE_PREFIX).toBe(
      PROVIDER_DISCLOSURE.replace(" https://dentasmart.ai/privacy-policy/ https://dentasmart.ai/terms-of-service/", ""),
    );
  });

  it("keeps the provider privacy-policy paragraphs literal", () => {
    const privacyPolicy = readFileSync(resolve(process.cwd(), "client/src/pages/PrivacyPolicy.tsx"), "utf8");
    expect(privacyPolicy).toContain(
      "We will not share your opt-in to an SMS campaign with any third party for purposes unrelated to providing you with the services of that campaign. We may share your Personal Data, including your SMS opt-in or consent status, with third parties that help us provide our messaging services, including but not limited to platform providers, phone companies, and any other vendors who assist us in the delivery of text messages.",
    );
    expect(privacyPolicy).toContain(
      "All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.",
    );
  });

  it("stores the consent wording version internally without rendering it in the public page", () => {
    const smsPage = readFileSync(resolve(process.cwd(), "client/src/pages/SMSConsent.tsx"), "utf8");
    const smsRouter = readFileSync(resolve(process.cwd(), "server/smsConsentRouter.ts"), "utf8");
    expect(smsPage).not.toContain("Consent wording version");
    expect(smsRouter).toContain("consentWordingVersion: SMS_CONSENT_WORDING_VERSION");
  });

  it("keeps server-rendered SMS disclosure text and absolute-link labels aligned", async () => {
    const result = await resolveSSRContent("/sms-consent/");
    expect(result).not.toBeNull();
    const visibleText = result!.html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

    expect(visibleText).toContain(PROVIDER_DISCLOSURE);
    expect(result!.html).toContain('<a href="/privacy-policy/">https://dentasmart.ai/privacy-policy/</a>');
    expect(result!.html).toContain('<a href="/terms-of-service/">https://dentasmart.ai/terms-of-service/</a>');
  });

  it("updates only the legal route sitemap lastmod values", () => {
    expect(staticRoutes.find((route) => route.path === "/privacy-policy")?.lastmod).toBe("2026-10-05");
    expect(staticRoutes.find((route) => route.path === "/terms-of-service")?.lastmod).toBe("2026-10-05");
  });

  it("preserves BAD_REQUEST behavior before database access", async () => {
    const caller = smsConsentRouter.createCaller(createPublicContext());

    await expect(caller.submit({ ...validInput(), phone: "not a number" })).rejects.toMatchObject({
      code: "BAD_REQUEST",
      message: "Enter a valid U.S. mobile phone number.",
    });
    expect(mocks.getDb).not.toHaveBeenCalled();
  });

  it("rejects a nonblank invalid email before database access", async () => {
    const caller = smsConsentRouter.createCaller(createPublicContext());

    await expect(caller.submit({ ...validInput(), email: "not-an-email" })).rejects.toMatchObject({
      code: "BAD_REQUEST",
      message: "Enter a valid email address or leave it blank.",
    });
    expect(mocks.getDb).not.toHaveBeenCalled();
  });

  it("preserves SERVICE_UNAVAILABLE behavior when no database is configured", async () => {
    mocks.getDb.mockResolvedValue(null);
    const caller = smsConsentRouter.createCaller(createPublicContext());

    await expect(caller.submit(validInput())).rejects.toMatchObject({
      code: "SERVICE_UNAVAILABLE",
      message: "SMS preferences are temporarily unavailable. Please try again later.",
    });
  });

  it("returns idempotent success when the consent key already exists", async () => {
    const db = databaseWithIdempotencyLookup([{ id: 7 }]);
    mocks.getDb.mockResolvedValue(db);
    const caller = smsConsentRouter.createCaller(createPublicContext());

    await expect(caller.submit(validInput())).resolves.toEqual({ saved: true, duplicate: true });
    expect(db.insert).not.toHaveBeenCalled();
  });

  it("writes normalized optional identity fields with the immutable consent record", async () => {
    const db = databaseWithIdempotencyLookup([]);
    const values = vi.fn().mockResolvedValue(undefined);
    db.insert.mockReturnValue({ values });
    mocks.getDb.mockResolvedValue(db);
    const caller = smsConsentRouter.createCaller(createPublicContext());

    await expect(caller.submit(validInput())).resolves.toEqual({ saved: true, duplicate: false });
    expect(values).toHaveBeenCalledWith(expect.objectContaining({
      fullName: "Taylor Patient",
      email: "taylor@example.com",
      phoneE164: "+14155552671",
      consentGranted: true,
      sourcePath: "/sms-consent/",
    }));
  });

  it("stores absent optional identity fields as null", async () => {
    const db = databaseWithIdempotencyLookup([]);
    const values = vi.fn().mockResolvedValue(undefined);
    db.insert.mockReturnValue({ values });
    mocks.getDb.mockResolvedValue(db);
    const caller = smsConsentRouter.createCaller(createPublicContext());

    await expect(caller.submit({ ...validInput(), fullName: undefined, email: undefined })).resolves.toEqual({ saved: true, duplicate: false });
    expect(values).toHaveBeenCalledWith(expect.objectContaining({ fullName: null, email: null }));
  });

  it("maps an idempotency lookup failure to a generic public error without logging phone data", async () => {
    const databaseError = Object.assign(
      new Error("ER_NO_SUCH_TABLE: sms_consent_records for +14155552671"),
      { code: "ER_NO_SUCH_TABLE" },
    );
    const db = databaseWithIdempotencyLookup(databaseError);
    mocks.getDb.mockResolvedValue(db);
    const log = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const caller = smsConsentRouter.createCaller(createPublicContext());

    await expect(caller.submit(validInput())).rejects.toMatchObject({
      code: "INTERNAL_SERVER_ERROR",
      message: GENERIC_PERSISTENCE_ERROR,
    });
    expect(log).toHaveBeenCalledWith("[SmsConsent] Database operation failed", {
      code: "ER_NO_SUCH_TABLE",
      name: "Error",
    });
    expect(JSON.stringify(log.mock.calls)).not.toContain("+14155552671");
    log.mockRestore();
  });

  it("preserves duplicate-key idempotent success and maps other insert failures to the generic public error", async () => {
    const db = databaseWithIdempotencyLookup([]);
    const values = vi.fn().mockRejectedValueOnce({ code: "ER_DUP_ENTRY" });
    db.insert.mockReturnValue({ values });
    mocks.getDb.mockResolvedValue(db);
    const caller = smsConsentRouter.createCaller(createPublicContext());

    await expect(caller.submit(validInput())).resolves.toEqual({ saved: true, duplicate: true });

    const otherDb = databaseWithIdempotencyLookup([]);
    const rawInsertError = Object.assign(new Error("Raw query error for +14155552671"), { code: "ER_BAD_TABLE_ERROR" });
    otherDb.insert.mockReturnValue({ values: vi.fn().mockRejectedValue(rawInsertError) });
    mocks.getDb.mockResolvedValue(otherDb);
    const log = vi.spyOn(console, "error").mockImplementation(() => undefined);

    await expect(caller.submit(validInput())).rejects.toMatchObject({
      code: "INTERNAL_SERVER_ERROR",
      message: GENERIC_PERSISTENCE_ERROR,
    });
    expect(JSON.stringify(log.mock.calls)).not.toContain("+14155552671");
    log.mockRestore();
  });

  it("never exposes SQL-shaped or internal persistence errors in the public form", () => {
    expect(getSafeSmsConsentErrorMessage({
      message: "ER_NO_SUCH_TABLE: sms_consent_records",
    })).toBe(GENERIC_PERSISTENCE_ERROR);
    expect(getSafeSmsConsentErrorMessage({
      message: "Raw internal error",
      data: { code: "INTERNAL_SERVER_ERROR" },
    })).toBe(GENERIC_PERSISTENCE_ERROR);
  });
});
