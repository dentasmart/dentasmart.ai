import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./db", () => ({ getDb: vi.fn() }));

import { getDb } from "./db";
import { getSmsConsentRecordById, listSmsConsentRecords } from "./smsConsentAdminDb";

const summaryRecord = {
  id: 2,
  fullName: null,
  email: "person@example.com",
  phoneE164: "+15551234567",
  consentGranted: true,
  consentAt: new Date("2026-10-05T13:00:00.000Z"),
  consentSource: "website",
  createdAt: new Date("2026-10-05T13:00:01.000Z"),
};

describe("SMS consent admin database reads", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("uses server-side newest-first pagination and applies a name/email/phone search condition", async () => {
    const listChain = {
      from: vi.fn(),
      where: vi.fn(),
      orderBy: vi.fn(),
      limit: vi.fn(),
      offset: vi.fn(),
    };
    listChain.from.mockReturnValue(listChain);
    listChain.where.mockReturnValue(listChain);
    listChain.orderBy.mockReturnValue(listChain);
    listChain.limit.mockReturnValue(listChain);
    listChain.offset.mockResolvedValue([summaryRecord]);

    const countChain = {
      from: vi.fn(),
      where: vi.fn(),
    };
    countChain.from.mockReturnValue(countChain);
    countChain.where.mockResolvedValue([{ total: 26 }]);

    const select = vi.fn().mockReturnValueOnce(listChain).mockReturnValueOnce(countChain);
    vi.mocked(getDb).mockResolvedValue({ select } as never);

    await expect(
      listSmsConsentRecords({ search: "+15551234567", page: 2, limit: 25 })
    ).resolves.toEqual({ records: [summaryRecord], total: 26 });

    expect(listChain.orderBy).toHaveBeenCalledOnce();
    expect(listChain.limit).toHaveBeenCalledWith(25);
    expect(listChain.offset).toHaveBeenCalledWith(25);
    expect(listChain.where).toHaveBeenCalledWith(expect.anything());
    expect(countChain.where).toHaveBeenCalledWith(expect.anything());
  });

  it("returns an immutable record detail by identifier without a mutation path", async () => {
    const detailRecord = {
      ...summaryRecord,
      sourcePath: "/sms-consent/",
      consentWordingVersion: "2026-10-05-provider-v1",
      consentWording: "Provider disclosure",
      privacyPolicyVersion: "2026-10-05",
      termsOfServiceVersion: "2026-10-05",
      sourceIp: "203.0.113.1",
      userAgent: "Test browser",
      idempotencyKey: "key-1",
    };
    const detailChain = {
      from: vi.fn(),
      where: vi.fn(),
      limit: vi.fn(),
    };
    detailChain.from.mockReturnValue(detailChain);
    detailChain.where.mockReturnValue(detailChain);
    detailChain.limit.mockResolvedValue([detailRecord]);
    vi.mocked(getDb).mockResolvedValue({ select: vi.fn().mockReturnValue(detailChain) } as never);

    await expect(getSmsConsentRecordById(2)).resolves.toEqual(detailRecord);
    expect(detailChain.limit).toHaveBeenCalledWith(1);
  });

  it("fails closed when database access is unavailable", async () => {
    vi.mocked(getDb).mockResolvedValue(null);

    await expect(listSmsConsentRecords({ page: 1, limit: 25 })).rejects.toThrow("Database unavailable");
    await expect(getSmsConsentRecordById(1)).rejects.toThrow("Database unavailable");
  });
});
