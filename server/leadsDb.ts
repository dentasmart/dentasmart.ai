import { eq, desc, sql, and, like, gte, lte } from "drizzle-orm";
import { getDb } from "./db";
import { quizSubmissions, androidWaitlist } from "../drizzle/schema";

export type LeadSource = "quiz" | "android-waitlist";
export type LeadRiskLevel = "low" | "moderate" | "high" | null;

export interface UnifiedLead {
  id: number;
  source: LeadSource;
  email: string | null;
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
  highRisk: number;
  withEmail: number;
}

/**
 * Get unified leads from all sources with filtering and pagination.
 * Uses UNION ALL across quiz_submissions and android_waitlist.
 */
export async function getLeads(filter: LeadsFilter): Promise<{ leads: UnifiedLead[]; total: number }> {
  const db = await getDb();
  if (!db) return { leads: [], total: 0 };

  // Build conditions for quiz submissions
  const quizConditions: any[] = [];
  if (filter.search) {
    quizConditions.push(like(quizSubmissions.email, `%${filter.search}%`));
  }
  if (filter.riskLevel) {
    quizConditions.push(eq(quizSubmissions.riskLevel, filter.riskLevel));
  }
  if (filter.dateFrom) {
    quizConditions.push(gte(quizSubmissions.createdAt, filter.dateFrom));
  }
  if (filter.dateTo) {
    quizConditions.push(lte(quizSubmissions.createdAt, filter.dateTo));
  }

  // Build conditions for android waitlist
  const androidConditions: any[] = [];
  if (filter.search) {
    androidConditions.push(like(androidWaitlist.email, `%${filter.search}%`));
  }
  if (filter.dateFrom) {
    androidConditions.push(gte(androidWaitlist.createdAt, filter.dateFrom));
  }
  if (filter.dateTo) {
    androidConditions.push(lte(androidWaitlist.createdAt, filter.dateTo));
  }

  // If filtering by risk level, android waitlist has no risk level so exclude it
  const includeQuiz = !filter.source || filter.source === "quiz";
  const includeAndroid = (!filter.source || filter.source === "android-waitlist") && !filter.riskLevel;

  let leads: UnifiedLead[] = [];
  let total = 0;

  if (includeQuiz && includeAndroid) {
    // Fetch from both sources and merge
    const quizWhere = quizConditions.length > 0 ? and(...quizConditions) : undefined;
    const androidWhere = androidConditions.length > 0 ? and(...androidConditions) : undefined;

    const [quizRows, androidRows, quizCount, androidCount] = await Promise.all([
      db.select().from(quizSubmissions).where(quizWhere).orderBy(desc(quizSubmissions.createdAt)),
      db.select().from(androidWaitlist).where(androidWhere).orderBy(desc(androidWaitlist.createdAt)),
      db.select({ count: sql<number>`count(*)` }).from(quizSubmissions).where(quizWhere),
      db.select({ count: sql<number>`count(*)` }).from(androidWaitlist).where(androidWhere),
    ]);

    total = Number(quizCount[0]?.count || 0) + Number(androidCount[0]?.count || 0);

    // Merge and sort by date descending
    const allLeads: UnifiedLead[] = [
      ...quizRows.map((r) => ({
        id: r.id,
        source: "quiz" as LeadSource,
        email: r.email,
        riskLevel: r.riskLevel as LeadRiskLevel,
        matchedConditions: (r.matchedConditions as string[]) || [],
        answers: r.answers as Record<string, string> | null,
        createdAt: r.createdAt,
      })),
      ...androidRows.map((r) => ({
        id: r.id,
        source: "android-waitlist" as LeadSource,
        email: r.email,
        riskLevel: null as LeadRiskLevel,
        matchedConditions: [],
        answers: null,
        createdAt: r.createdAt,
      })),
    ];

    allLeads.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    // Paginate
    const offset = (filter.page - 1) * filter.limit;
    leads = allLeads.slice(offset, offset + filter.limit);
  } else if (includeQuiz) {
    const quizWhere = quizConditions.length > 0 ? and(...quizConditions) : undefined;
    const [quizRows, quizCount] = await Promise.all([
      db.select().from(quizSubmissions).where(quizWhere)
        .orderBy(desc(quizSubmissions.createdAt))
        .limit(filter.limit)
        .offset((filter.page - 1) * filter.limit),
      db.select({ count: sql<number>`count(*)` }).from(quizSubmissions).where(quizWhere),
    ]);

    total = Number(quizCount[0]?.count || 0);
    leads = quizRows.map((r) => ({
      id: r.id,
      source: "quiz" as LeadSource,
      email: r.email,
      riskLevel: r.riskLevel as LeadRiskLevel,
      matchedConditions: (r.matchedConditions as string[]) || [],
      answers: r.answers as Record<string, string> | null,
      createdAt: r.createdAt,
    }));
  } else if (includeAndroid) {
    const androidWhere = androidConditions.length > 0 ? and(...androidConditions) : undefined;
    const [androidRows, androidCount] = await Promise.all([
      db.select().from(androidWaitlist).where(androidWhere)
        .orderBy(desc(androidWaitlist.createdAt))
        .limit(filter.limit)
        .offset((filter.page - 1) * filter.limit),
      db.select({ count: sql<number>`count(*)` }).from(androidWaitlist).where(androidWhere),
    ]);

    total = Number(androidCount[0]?.count || 0);
    leads = androidRows.map((r) => ({
      id: r.id,
      source: "android-waitlist" as LeadSource,
      email: r.email,
      riskLevel: null as LeadRiskLevel,
      matchedConditions: [],
      answers: null,
      createdAt: r.createdAt,
    }));
  }

  return { leads, total };
}

/**
 * Get aggregate stats across all lead sources.
 */
export async function getLeadsStats(): Promise<LeadsStats> {
  const db = await getDb();
  if (!db) return { total: 0, quizLeads: 0, androidWaitlist: 0, highRisk: 0, withEmail: 0 };

  const [quizTotal, androidTotal, highRisk, quizWithEmail] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(quizSubmissions),
    db.select({ count: sql<number>`count(*)` }).from(androidWaitlist),
    db.select({ count: sql<number>`count(*)` }).from(quizSubmissions).where(eq(quizSubmissions.riskLevel, "high")),
    db.select({ count: sql<number>`count(*)` }).from(quizSubmissions).where(
      sql`${quizSubmissions.email} IS NOT NULL AND ${quizSubmissions.email} != ''`
    ),
  ]);

  const quizCount = Number(quizTotal[0]?.count || 0);
  const androidCount = Number(androidTotal[0]?.count || 0);
  const highRiskCount = Number(highRisk[0]?.count || 0);
  const emailCount = Number(quizWithEmail[0]?.count || 0) + androidCount; // all android entries have email

  return {
    total: quizCount + androidCount,
    quizLeads: quizCount,
    androidWaitlist: androidCount,
    highRisk: highRiskCount,
    withEmail: emailCount,
  };
}

/**
 * Get all leads (no pagination) for CSV export.
 */
export async function getAllLeadsForExport(filter: Omit<LeadsFilter, "page" | "limit">): Promise<UnifiedLead[]> {
  const db = await getDb();
  if (!db) return [];

  const quizConditions: any[] = [];
  const androidConditions: any[] = [];

  if (filter.search) {
    quizConditions.push(like(quizSubmissions.email, `%${filter.search}%`));
    androidConditions.push(like(androidWaitlist.email, `%${filter.search}%`));
  }
  if (filter.riskLevel) {
    quizConditions.push(eq(quizSubmissions.riskLevel, filter.riskLevel));
  }
  if (filter.dateFrom) {
    quizConditions.push(gte(quizSubmissions.createdAt, filter.dateFrom));
    androidConditions.push(gte(androidWaitlist.createdAt, filter.dateFrom));
  }
  if (filter.dateTo) {
    quizConditions.push(lte(quizSubmissions.createdAt, filter.dateTo));
    androidConditions.push(lte(androidWaitlist.createdAt, filter.dateTo));
  }

  const includeQuiz = !filter.source || filter.source === "quiz";
  const includeAndroid = (!filter.source || filter.source === "android-waitlist") && !filter.riskLevel;

  const allLeads: UnifiedLead[] = [];

  if (includeQuiz) {
    const quizWhere = quizConditions.length > 0 ? and(...quizConditions) : undefined;
    const quizRows = await db.select().from(quizSubmissions).where(quizWhere).orderBy(desc(quizSubmissions.createdAt));
    allLeads.push(
      ...quizRows.map((r) => ({
        id: r.id,
        source: "quiz" as LeadSource,
        email: r.email,
        riskLevel: r.riskLevel as LeadRiskLevel,
        matchedConditions: (r.matchedConditions as string[]) || [],
        answers: r.answers as Record<string, string> | null,
        createdAt: r.createdAt,
      }))
    );
  }

  if (includeAndroid) {
    const androidWhere = androidConditions.length > 0 ? and(...androidConditions) : undefined;
    const androidRows = await db.select().from(androidWaitlist).where(androidWhere).orderBy(desc(androidWaitlist.createdAt));
    allLeads.push(
      ...androidRows.map((r) => ({
        id: r.id,
        source: "android-waitlist" as LeadSource,
        email: r.email,
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
