import { beforeEach, describe, expect, it, vi } from "vitest";
import { SignJWT } from "jose";

vi.mock("./smsConsentAdminDb", () => ({
  getSmsConsentRecordById: vi.fn(),
  listSmsConsentRecords: vi.fn(),
}));

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { JWT_SECRET } from "./adminAuth";
import { getSmsConsentRecordById, listSmsConsentRecords } from "./smsConsentAdminDb";

const sampleRecord = {
  id: 42,
  fullName: null,
  email: null,
  phoneE164: "+15551234567",
  consentGranted: true,
  consentAt: new Date("2026-10-05T12:00:00.000Z"),
  consentSource: "website",
  sourcePath: "/sms-consent/",
  consentWordingVersion: "2026-10-05-provider-v1",
  consentWording: "Provider disclosure text",
  privacyPolicyVersion: "2026-10-05",
  termsOfServiceVersion: "2026-10-05",
  sourceIp: "203.0.113.25",
  userAgent: "Test browser",
  idempotencyKey: "4fe3a1f8-1dc4-470a-8000-000000000001",
  createdAt: new Date("2026-10-05T12:00:01.000Z"),
};

function createContext(cookie = ""): TrpcContext {
  return {
    user: null,
    req: { headers: { cookie } } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

async function createAdminCookie(): Promise<string> {
  const token = await new SignJWT({ adminId: 1, username: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(JWT_SECRET);
  return `blog_admin_session=${token}`;
}

describe("smsConsents admin router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects unauthenticated consent-record reads", async () => {
    const caller = appRouter.createCaller(createContext());

    await expect(caller.smsConsents.list({ page: 1, limit: 25 })).rejects.toThrow(
      "Admin authentication required"
    );
    await expect(caller.smsConsents.get({ id: 42 })).rejects.toThrow(
      "Admin authentication required"
    );
  });

  it("returns newest-first paginated records for an authenticated admin", async () => {
    vi.mocked(listSmsConsentRecords).mockResolvedValue({
      records: [sampleRecord],
      total: 26,
    });
    const caller = appRouter.createCaller(createContext(await createAdminCookie()));

    await expect(caller.smsConsents.list({ page: 2, limit: 25 })).resolves.toEqual({
      records: [sampleRecord],
      total: 26,
    });
    expect(listSmsConsentRecords).toHaveBeenCalledWith({ page: 2, limit: 25 });
  });

  it("passes validated name, email, and phone search terms to the read-only query", async () => {
    vi.mocked(listSmsConsentRecords).mockResolvedValue({ records: [], total: 0 });
    const caller = appRouter.createCaller(createContext(await createAdminCookie()));

    for (const search of ["Ada", "ada@example.com", "+15551234567"]) {
      await caller.smsConsents.list({ search, page: 1, limit: 25 });
      expect(listSmsConsentRecords).toHaveBeenLastCalledWith({ search, page: 1, limit: 25 });
    }
  });

  it("returns full audit and legal evidence only from the separate record-detail query", async () => {
    vi.mocked(getSmsConsentRecordById).mockResolvedValue(sampleRecord);
    const caller = appRouter.createCaller(createContext(await createAdminCookie()));

    await expect(caller.smsConsents.get({ id: 42 })).resolves.toEqual({ record: sampleRecord });
    expect(getSmsConsentRecordById).toHaveBeenCalledWith(42);
  });

  it("rejects unsafe pagination and record identifiers before database access", async () => {
    const caller = appRouter.createCaller(createContext(await createAdminCookie()));

    await expect(caller.smsConsents.list({ page: 0, limit: 25 })).rejects.toThrow();
    await expect(caller.smsConsents.list({ page: 1, limit: 101 })).rejects.toThrow();
    await expect(caller.smsConsents.get({ id: 0 })).rejects.toThrow();
    expect(listSmsConsentRecords).not.toHaveBeenCalled();
    expect(getSmsConsentRecordById).not.toHaveBeenCalled();
  });

  it("redacts database failures from authorized admin responses", async () => {
    vi.mocked(listSmsConsentRecords).mockRejectedValue(new Error("ER_TABLEACCESS_DENIED_ERROR"));
    const caller = appRouter.createCaller(createContext(await createAdminCookie()));

    await expect(caller.smsConsents.list({ page: 1, limit: 25 })).rejects.toThrow(
      "SMS consent records are unavailable right now."
    );
  });
});
