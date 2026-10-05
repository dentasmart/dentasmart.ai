import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router } from "./_core/trpc";
import { adminProcedure } from "./adminAuth";
import { getSmsConsentRecordById, listSmsConsentRecords } from "./smsConsentAdminDb";

const listInput = z.object({
  search: z.string().trim().min(1).max(200).optional(),
  page: z.number().int().min(1).max(100000).default(1),
  limit: z.number().int().min(1).max(100).default(25),
});

function unavailableError() {
  return new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "SMS consent records are unavailable right now.",
  });
}

/**
 * Read-only admin access to immutable SMS consent audit records. This router
 * deliberately has no mutation procedures.
 */
export const smsConsentAdminRouter = router({
  list: adminProcedure.input(listInput).query(async ({ input }) => {
    try {
      return await listSmsConsentRecords(input);
    } catch {
      throw unavailableError();
    }
  }),

  get: adminProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .query(async ({ input }) => {
      try {
        return { record: await getSmsConsentRecordById(input.id) };
      } catch {
        throw unavailableError();
      }
    }),
});
