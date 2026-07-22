import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router } from "./_core/trpc";
import { adminProcedure } from "./adminAuth";
import { getLeads, getLeadsStats, getAllLeadsForExport, deleteLeads } from "./leadsDb";

const leadSourceEnum = z.enum(["quiz", "android-waitlist", "benefits-waitlist"]);

export const leadsRouter = router({
  /**
   * Get paginated leads with filtering.
   */
  list: adminProcedure
    .input(
      z.object({
        source: leadSourceEnum.optional(),
        riskLevel: z.enum(["low", "moderate", "high"]).optional(),
        search: z.string().optional(),
        dateFrom: z.date().optional(),
        dateTo: z.date().optional(),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(50),
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
  stats: adminProcedure.query(async () => {
    return getLeadsStats();
  }),

  /**
   * Export all leads matching filter as CSV string.
   */
  exportCsv: adminProcedure
    .input(
      z.object({
        source: leadSourceEnum.optional(),
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
      const headers = ["Name", "Email", "Phone", "Source", "Risk Level", "Matched Conditions", "Message", "Date"];
      const rows = leads.map((lead) => [
        lead.name || "",
        lead.email || "",
        lead.phone || "",
        lead.source,
        lead.riskLevel || "N/A",
        lead.matchedConditions.join("; "),
        lead.message || "",
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

  /**
   * Export leads as Excel-compatible CSV (with BOM for Excel auto-detect).
   * Respects the same filters as the list view.
   */
  exportExcel: adminProcedure
    .input(
      z.object({
        source: leadSourceEnum.optional(),
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

      const headers = ["Name", "Email", "Phone", "Source", "Risk Level", "Matched Conditions", "Message", "Date"];
      const rows = leads.map((lead) => [
        lead.name || "",
        lead.email || "",
        lead.phone || "",
        lead.source === "quiz" ? "Symptom Quiz" : lead.source === "android-waitlist" ? "Android Waitlist" : "Benefits Waitlist",
        lead.riskLevel || "N/A",
        lead.matchedConditions.join("; "),
        lead.message || "",
        new Date(lead.createdAt).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
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

      // BOM + CSV for Excel
      const bom = "\uFEFF";
      return { data: bom + csvLines.join("\n"), count: leads.length };
    }),

  /**
   * Delete leads by source and IDs (bulk delete).
   */
  delete: adminProcedure
    .input(
      z.object({
        items: z.array(
          z.object({
            source: leadSourceEnum,
            id: z.number(),
          })
        ).min(1, "At least one item required"),
      })
    )
    .mutation(async ({ input }) => {
      const deleted = await deleteLeads(input.items);
      return { deleted };
    }),
});
