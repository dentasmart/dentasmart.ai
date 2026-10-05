import { count, desc, eq, like, or } from "drizzle-orm";
import { smsConsentRecords } from "../drizzle/schema";
import { getDb } from "./db";

export interface SmsConsentListInput {
  search?: string;
  page: number;
  limit: number;
}

export type SmsConsentListItem = {
  id: number;
  fullName: string | null;
  email: string | null;
  phoneE164: string;
  consentGranted: boolean;
  consentAt: Date;
  consentSource: string;
  createdAt: Date;
};

export type SmsConsentDetail = typeof smsConsentRecords.$inferSelect;

function buildSearchCondition(search?: string) {
  if (!search) return undefined;

  const pattern = `%${search}%`;
  return or(
    like(smsConsentRecords.fullName, pattern),
    like(smsConsentRecords.email, pattern),
    like(smsConsentRecords.phoneE164, pattern)
  );
}

/**
 * Returns only summary fields required by the protected list view. Audit fields
 * remain unavailable until an administrator opens the separate detail record.
 */
export async function listSmsConsentRecords(input: SmsConsentListInput): Promise<{
  records: SmsConsentListItem[];
  total: number;
}> {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");

  const where = buildSearchCondition(input.search);
  const offset = (input.page - 1) * input.limit;

  const [records, totalResult] = await Promise.all([
    db
      .select({
        id: smsConsentRecords.id,
        fullName: smsConsentRecords.fullName,
        email: smsConsentRecords.email,
        phoneE164: smsConsentRecords.phoneE164,
        consentGranted: smsConsentRecords.consentGranted,
        consentAt: smsConsentRecords.consentAt,
        consentSource: smsConsentRecords.consentSource,
        createdAt: smsConsentRecords.createdAt,
      })
      .from(smsConsentRecords)
      .where(where)
      .orderBy(desc(smsConsentRecords.consentAt), desc(smsConsentRecords.id))
      .limit(input.limit)
      .offset(offset),
    db.select({ total: count() }).from(smsConsentRecords).where(where),
  ]);

  return {
    records,
    total: Number(totalResult[0]?.total ?? 0),
  };
}

/** Returns one complete immutable consent record for an authorized detail view. */
export async function getSmsConsentRecordById(id: number): Promise<SmsConsentDetail | null> {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");

  const records = await db
    .select()
    .from(smsConsentRecords)
    .where(eq(smsConsentRecords.id, id))
    .limit(1);

  return records[0] ?? null;
}
