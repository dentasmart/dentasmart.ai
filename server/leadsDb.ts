import { eq, desc, sql, and, like, gte, lte, or, inArray } from "drizzle-orm";
import { getDb } from "./db";
import { quizSubmissions, androidWaitlist, benefitsWaitlist } from "../drizzle/schema";

export type LeadSource = "quiz" | "android-waitlist" | "benefits-waitlist";
export type LeadRiskLevel = "low" | "moderate" | "high" | null;

export interface UnifiedLead {
  id: number;
  source: LeadSource;
  name: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
  riskLevel: LeadRiskLevel;
  matchedConditions: string[];
  answers: Record<string, string> | null;
  createdAt: Date;
}

export interface LeadsFilter {
  source?: LeadSource;
  riskLevel?: "low" | "moderate" | "high";
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
  page: number;
  limit: number;
}

export interface LeadsStats {
  total: number;
  quizLeads: number;
  androidWaitlist: number;
  benefitsWaitlist: number;
  highRisk: number;
  withEmail: number;
}

/**
 * Helper to check if a source should be included given the filter.
 */
function shouldIncludeSource(filterSource: LeadSource | undefined, target: LeadSource, filterRiskLevel?: string): boolean {
  if (filterSource && filterSource !== target) return false;
  // Only quiz has risk levels; if filtering by risk, exclude non-quiz sources
  if (filterRiskLevel && target !== "quiz") return false;
  return true;
}

/**
 * Get unified leads from all sources with filtering and pagination.
 */
export async function getLeads(filter: LeadsFilter): Promise<{ leads: UnifiedLead[]; total: number }> {
  const db = await getDb();
  if (!db) return { leads: [], total: 0 };

  const includeQuiz = shouldIncludeSource(filter.source, "quiz", filter.riskLevel);
  const includeAndroid = shouldIncludeSource(filter.source, "android-waitlist", filter.riskLevel);
  const includeBenefits = shouldIncludeSource(filter.source, "benefits-waitlist", filter.riskLevel);

  const allLeads: UnifiedLead[] = [];
  let total = 0;

  // --- Quiz submissions ---
  if (includeQuiz) {
    const conditions: any[] = [];
    if (filter.search) {
      conditions.push(or(like(quizSubmissions.email, `%${filter.search}%`), like(quizSubmissions.name, `%${filter.search}%`)));
    }
    if (filter.riskLevel) conditions.push(eq(quizSubmissions.riskLevel, filter.riskLevel));
    if (filter.dateFrom) conditions.push(gte(quizSubmissions.createdAt, filter.dateFrom));
    if (filter.dateTo) conditions.push(lte(quizSubmissions.createdAt, filter.dateTo));
    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [rows, countResult] = await Promise.all([
      db.select().from(quizSubmissions).where(where).orderBy(desc(quizSubmissions.createdAt)),
      db.select({ count: sql<number>`count(*)` }).from(quizSubmissions).where(where),
    ]);
    total += Number(countResult[0]?.count || 0);
    allLeads.push(
      ...rows.map((r) => ({
        id: r.id,
        source: "quiz" as LeadSource,
        name: r.name,
        email: r.email,
        phone: null,
        message: null,
        riskLevel: r.riskLevel as LeadRiskLevel,
        matchedConditions: (r.matchedConditions as string[]) || [],
        answers: r.answers as Record<string, string> | null,
        createdAt: r.createdAt,
      }))
    );
  }

  // --- Android waitlist ---
  if (includeAndroid) {
    const conditions: any[] = [];
    if (filter.search) {
      conditions.push(or(like(androidWaitlist.email, `%${filter.search}%`), like(androidWaitlist.name, `%${filter.search}%`)));
    }
    if (filter.dateFrom) conditions.push(gte(androidWaitlist.createdAt, filter.dateFrom));
    if (filter.dateTo) conditions.push(lte(androidWaitlist.createdAt, filter.dateTo));
    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [rows, countResult] = await Promise.all([
      db.select().from(androidWaitlist).where(where).orderBy(desc(androidWaitlist.createdAt)),
      db.select({ count: sql<number>`count(*)` }).from(androidWaitlist).where(where),
    ]);
    total += Number(countResult[0]?.count || 0);
    allLeads.push(
      ...rows.map((r) => ({
        id: r.id,
        source: "android-waitlist" as LeadSource,
        name: r.name,
        email: r.email,
        phone: null,
        message: null,
        riskLevel: null as LeadRiskLevel,
        matchedConditions: [],
        answers: null,
        createdAt: r.createdAt,
      }))
    );
  }

  // --- Benefits waitlist ---
  if (includeBenefits) {
    const conditions: any[] = [];
    if (filter.search) {
      conditions.push(or(like(benefitsWaitlist.email, `%${filter.search}%`), like(benefitsWaitlist.name, `%${filter.search}%`)));
    }
    if (filter.dateFrom) conditions.push(gte(benefitsWaitlist.createdAt, filter.dateFrom));
    if (filter.dateTo) conditions.push(lte(benefitsWaitlist.createdAt, filter.dateTo));
    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [rows, countResult] = await Promise.all([
      db.select().from(benefitsWaitlist).where(where).orderBy(desc(benefitsWaitlist.createdAt)),
      db.select({ count: sql<number>`count(*)` }).from(benefitsWaitlist).where(where),
    ]);
    total += Number(countResult[0]?.count || 0);
    allLeads.push(
      ...rows.map((r) => ({
        id: r.id,
        source: "benefits-waitlist" as LeadSource,
        name: r.name,
        email: r.email,
        phone: r.phone,
        message: r.message,
        riskLevel: null as LeadRiskLevel,
        matchedConditions: [],
        answers: null,
        createdAt: r.createdAt,
      }))
    );
  }

  // Sort all leads by date descending and paginate
  allLeads.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  const offset = (filter.page - 1) * filter.limit;
  const leads = allLeads.slice(offset, offset + filter.limit);

  return { leads, total };
}

/**
 * Get aggregate stats across all lead sources.
 */
export async function getLeadsStats(): Promise<LeadsStats> {
  const db = await getDb();
  if (!db) return { total: 0, quizLeads: 0, androidWaitlist: 0, benefitsWaitlist: 0, highRisk: 0, withEmail: 0 };

  const [quizTotal, androidTotal, benefitsTotal, highRisk, quizWithEmail] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(quizSubmissions),
    db.select({ count: sql<number>`count(*)` }).from(androidWaitlist),
    db.select({ count: sql<number>`count(*)` }).from(benefitsWaitlist),
    db.select({ count: sql<number>`count(*)` }).from(quizSubmissions).where(eq(quizSubmissions.riskLevel, "high")),
    db.select({ count: sql<number>`count(*)` }).from(quizSubmissions).where(
      sql`${quizSubmissions.email} IS NOT NULL AND ${quizSubmissions.email} != ''`
    ),
  ]);

  const quizCount = Number(quizTotal[0]?.count || 0);
  const androidCount = Number(androidTotal[0]?.count || 0);
  const benefitsCount = Number(benefitsTotal[0]?.count || 0);
  const highRiskCount = Number(highRisk[0]?.count || 0);
  const emailCount = Number(quizWithEmail[0]?.count || 0) + androidCount + benefitsCount;

  return {
    total: quizCount + androidCount + benefitsCount,
    quizLeads: quizCount,
    androidWaitlist: androidCount,
    benefitsWaitlist: benefitsCount,
    highRisk: highRiskCount,
    withEmail: emailCount,
  };
}

/**
 * Get all leads (no pagination) for export.
 */
export async function getAllLeadsForExport(filter: Omit<LeadsFilter, "page" | "limit">): Promise<UnifiedLead[]> {
  const db = await getDb();
  if (!db) return [];

  const includeQuiz = shouldIncludeSource(filter.source, "quiz", filter.riskLevel);
  const includeAndroid = shouldIncludeSource(filter.source, "android-waitlist", filter.riskLevel);
  const includeBenefits = shouldIncludeSource(filter.source, "benefits-waitlist", filter.riskLevel);

  const allLeads: UnifiedLead[] = [];

  if (includeQuiz) {
    const conditions: any[] = [];
    if (filter.search) {
      conditions.push(or(like(quizSubmissions.email, `%${filter.search}%`), like(quizSubmissions.name, `%${filter.search}%`)));
    }
    if (filter.riskLevel) conditions.push(eq(quizSubmissions.riskLevel, filter.riskLevel));
    if (filter.dateFrom) conditions.push(gte(quizSubmissions.createdAt, filter.dateFrom));
    if (filter.dateTo) conditions.push(lte(quizSubmissions.createdAt, filter.dateTo));
    const where = conditions.length > 0 ? and(...conditions) : undefined;
    const rows = await db.select().from(quizSubmissions).where(where).orderBy(desc(quizSubmissions.createdAt));
    allLeads.push(
      ...rows.map((r) => ({
        id: r.id,
        source: "quiz" as LeadSource,
        name: r.name,
        email: r.email,
        phone: null,
        message: null,
        riskLevel: r.riskLevel as LeadRiskLevel,
        matchedConditions: (r.matchedConditions as string[]) || [],
        answers: r.answers as Record<string, string> | null,
        createdAt: r.createdAt,
      }))
    );
  }

  if (includeAndroid) {
    const conditions: any[] = [];
    if (filter.search) {
      conditions.push(or(like(androidWaitlist.email, `%${filter.search}%`), like(androidWaitlist.name, `%${filter.search}%`)));
    }
    if (filter.dateFrom) conditions.push(gte(androidWaitlist.createdAt, filter.dateFrom));
    if (filter.dateTo) conditions.push(lte(androidWaitlist.createdAt, filter.dateTo));
    const where = conditions.length > 0 ? and(...conditions) : undefined;
    const rows = await db.select().from(androidWaitlist).where(where).orderBy(desc(androidWaitlist.createdAt));
    allLeads.push(
      ...rows.map((r) => ({
        id: r.id,
        source: "android-waitlist" as LeadSource,
        name: r.name,
        email: r.email,
        phone: null,
        message: null,
        riskLevel: null as LeadRiskLevel,
        matchedConditions: [],
        answers: null,
        createdAt: r.createdAt,
      }))
    );
  }

  if (includeBenefits) {
    const conditions: any[] = [];
    if (filter.search) {
      conditions.push(or(like(benefitsWaitlist.email, `%${filter.search}%`), like(benefitsWaitlist.name, `%${filter.search}%`)));
    }
    if (filter.dateFrom) conditions.push(gte(benefitsWaitlist.createdAt, filter.dateFrom));
    if (filter.dateTo) conditions.push(lte(benefitsWaitlist.createdAt, filter.dateTo));
    const where = conditions.length > 0 ? and(...conditions) : undefined;
    const rows = await db.select().from(benefitsWaitlist).where(where).orderBy(desc(benefitsWaitlist.createdAt));
    allLeads.push(
      ...rows.map((r) => ({
        id: r.id,
        source: "benefits-waitlist" as LeadSource,
        name: r.name,
        email: r.email,
        phone: r.phone,
        message: r.message,
        riskLevel: null as LeadRiskLevel,
        matchedConditions: [],
        answers: null,
        createdAt: r.createdAt,
      }))
    );
  }

  allLeads.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return allLeads;
}

/**
 * Delete leads by source and IDs.
 * Each item specifies a source and id so we can delete from the correct table.
 */
export async function deleteLeads(items: { source: LeadSource; id: number }[]): Promise<number> {
  const db = await getDb();
  if (!db) return 0;

  const quizIds = items.filter((i) => i.source === "quiz").map((i) => i.id);
  const androidIds = items.filter((i) => i.source === "android-waitlist").map((i) => i.id);
  const benefitsIds = items.filter((i) => i.source === "benefits-waitlist").map((i) => i.id);

  let deleted = 0;

  if (quizIds.length > 0) {
    const result = await db.delete(quizSubmissions).where(inArray(quizSubmissions.id, quizIds));
    deleted += (result as any)[0]?.affectedRows || quizIds.length;
  }
  if (androidIds.length > 0) {
    const result = await db.delete(androidWaitlist).where(inArray(androidWaitlist.id, androidIds));
    deleted += (result as any)[0]?.affectedRows || androidIds.length;
  }
  if (benefitsIds.length > 0) {
    const result = await db.delete(benefitsWaitlist).where(inArray(benefitsWaitlist.id, benefitsIds));
    deleted += (result as any)[0]?.affectedRows || benefitsIds.length;
  }

  return deleted;
}
