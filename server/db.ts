import { eq, sql, and, gte, lte, desc, count } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, conversionEvents, type InsertConversionEvent, siteSettings } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ── Conversion Events ──────────────────────────────────────────────────────

export async function insertConversionEvent(event: InsertConversionEvent) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(conversionEvents).values(event);
  return result;
}

export async function getConversionStats(startDate: Date, endDate: Date) {
  const db = await getDb();
  if (!db) return [];
  
  const results = await db
    .select({
      eventName: conversionEvents.eventName,
      eventCategory: conversionEvents.eventCategory,
      count: count(),
    })
    .from(conversionEvents)
    .where(
      and(
        gte(conversionEvents.createdAt, startDate),
        lte(conversionEvents.createdAt, endDate)
      )
    )
    .groupBy(conversionEvents.eventName, conversionEvents.eventCategory);
  
  return results;
}

export async function getTopConversionPages(startDate: Date, endDate: Date, eventCategory?: string) {
  const db = await getDb();
  if (!db) return [];
  
  const conditions = [
    gte(conversionEvents.createdAt, startDate),
    lte(conversionEvents.createdAt, endDate),
  ];
  if (eventCategory) {
    conditions.push(eq(conversionEvents.eventCategory, eventCategory as any));
  }
  
  const results = await db
    .select({
      sourcePage: conversionEvents.sourcePage,
      eventName: conversionEvents.eventName,
      count: count(),
    })
    .from(conversionEvents)
    .where(and(...conditions))
    .groupBy(conversionEvents.sourcePage, conversionEvents.eventName)
    .orderBy(desc(count()))
    .limit(50);
  
  return results;
}

export async function getDailyConversionTrend(startDate: Date, endDate: Date, eventCategory?: string) {
  const db = await getDb();
  if (!db) return [];
  
  const conditions = [
    gte(conversionEvents.createdAt, startDate),
    lte(conversionEvents.createdAt, endDate),
  ];
  if (eventCategory) {
    conditions.push(eq(conversionEvents.eventCategory, eventCategory as any));
  }
  
  const results = await db
    .select({
      date: sql<string>`DATE(${conversionEvents.createdAt})`.as('date'),
      eventName: conversionEvents.eventName,
      count: count(),
    })
    .from(conversionEvents)
    .where(and(...conditions))
    .groupBy(sql`DATE(${conversionEvents.createdAt})`, conversionEvents.eventName)
    .orderBy(sql`DATE(${conversionEvents.createdAt})`);
  
  return results;
}

export async function getDeviceBreakdown(startDate: Date, endDate: Date) {
  const db = await getDb();
  if (!db) return [];
  
  const results = await db
    .select({
      deviceType: conversionEvents.deviceType,
      eventCategory: conversionEvents.eventCategory,
      count: count(),
    })
    .from(conversionEvents)
    .where(
      and(
        gte(conversionEvents.createdAt, startDate),
        lte(conversionEvents.createdAt, endDate)
      )
    )
    .groupBy(conversionEvents.deviceType, conversionEvents.eventCategory);
  
  return results;
}

export async function getRecentConversionEvents(limit: number = 50) {
  const db = await getDb();
  if (!db) return [];
  
  const results = await db
    .select()
    .from(conversionEvents)
    .orderBy(desc(conversionEvents.createdAt))
    .limit(limit);
  
  return results;
}

// ── Site Settings ──────────────────────────────────────────────────────

export async function getSetting(key: string): Promise<string | null> {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(siteSettings).where(eq(siteSettings.settingKey, key)).limit(1);
  return rows.length > 0 ? rows[0].settingValue : null;
}

export async function setSetting(key: string, value: string): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.insert(siteSettings).values({ settingKey: key, settingValue: value })
    .onDuplicateKeyUpdate({ set: { settingValue: value } });
}
