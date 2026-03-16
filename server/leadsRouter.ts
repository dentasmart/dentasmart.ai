import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./_core/trpc";
import { getLeads, getLeadsStats, getAllLeadsForExport } from "./leadsDb";
import { getAdminById } from "./blogDb";
import { jwtVerify } from "jose";

const ADMIN_COOKIE_NAME = "blog_admin_session";
const JWT_SECRET_KEY = process.env.JWT_SECRET || "dentasmart-blog-admin-secret";

// Helper to verify JWT token
async function verifyAdminToken(token: string) {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET_KEY);
    const { payload } = await jwtVerify(token, secret);
    return payload as { adminId: number; username: string };
  } catch {
    return null;
  }
}

// Helper to get admin from context
async function getAdminFromContext(ctx: any) {
  const cookies = ctx.req?.headers?.cookie || "";
  const cookieMap = Object.fromEntries(
    cookies.split(";").map((c: string) => {
      const [key, ...val] = c.trim().split("=");
      return [key, val.join("=")];
    })
  );
  const token = cookieMap[ADMIN_COOKIE_NAME];
  if (!token) return null;

  const payload = await verifyAdminToken(token);
  if (!payload) return null;

  return await getAdminById(payload.adminId);
}

// Admin-only procedure for leads management
const adminLeadsProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const admin = await getAdminFromContext(ctx);
  if (!admin) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Admin authentication required" });
  }
  return next({ ctx: { ...ctx, admin } });
});

export const leadsRouter = router({
  /**
   * Get paginated leads with filtering.
   */
  list: adminLeadsProcedure
    .input(
      z.object({
        source: z.enum(["quiz", "android-waitlist"]).optional(),
        riskLevel: z.enum(["low", "moderate", "high"]).optional(),
        search: z.string().optional(),
        dateFrom: z.date().optional(),
        dateTo: z.date().optional(),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(20),
      })
    )
    .query(async ({ input }) => {
      return getLeads({
        source: input.source,
        riskLevel: input.riskLevel,
        search: input.search,
        dateFrom: input.dateFrom,
        dateTo: input.dateTo,
        page: input.page,
        limit: input.limit,
      });
    }),

  /**
   * Get aggregate lead stats.
   */
  stats: adminLeadsProcedure.query(async () => {
    return getLeadsStats();
  }),

  /**
   * Export all leads matching filter as CSV string.
   */
  exportCsv: adminLeadsProcedure
    .input(
      z.object({
        source: z.enum(["quiz", "android-waitlist"]).optional(),
        riskLevel: z.enum(["low", "moderate", "high"]).optional(),
        search: z.string().optional(),
        dateFrom: z.date().optional(),
        dateTo: z.date().optional(),
      })
    )
    .query(async ({ input }) => {
      const leads = await getAllLeadsForExport({
        source: input.source,
        riskLevel: input.riskLevel,
        search: input.search,
        dateFrom: input.dateFrom,
        dateTo: input.dateTo,
      });

      // Build CSV
      const headers = ["Name", "Email", "Source", "Risk Level", "Matched Conditions", "Date"];
      const rows = leads.map((lead) => [
        lead.name || "",
        lead.email || "",
        lead.source,
        lead.riskLevel || "N/A",
        lead.matchedConditions.join("; "),
        lead.createdAt.toISOString(),
      ]);

      const escapeCsv = (val: string) => {
        if (val.includes(",") || val.includes('"') || val.includes("\n")) {
          return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      };

      const csvLines = [
        headers.map(escapeCsv).join(","),
        ...rows.map((row) => row.map(escapeCsv).join(",")),
      ];

      return { csv: csvLines.join("\n"), count: leads.length };
    }),
});
