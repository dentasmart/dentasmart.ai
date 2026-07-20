/**
 * redirectsRouter — Admin Redirect Management tool.
 *
 * Procedures:
 *  - listRedirects   : returns all redirect rows ordered by createdAt desc
 *  - upsertRedirect  : admin saves a redirect (clears cache synchronously)
 *                      returns a chainWarning if target is itself a redirect source
 *  - deleteRedirect  : admin deletes a redirect (clears cache synchronously)
 *
 * Protected by the same blog admin cookie used throughout the admin panel.
 */

import { TRPCError } from "@trpc/server";
import { jwtVerify } from "jose";
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { getAllRedirects, upsertRedirect, deleteRedirect } from "./redirectDb";
import { clearRedirectCache } from "./redirectCache";

// ─── Admin auth (mirrors pagesRouter / blogRouter) ───────────────────────────
const ADMIN_COOKIE_NAME = "blog_admin_session";
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dentasmart-admin-secret-key-2024"
);

async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { adminId: number; username: string };
  } catch {
    return null;
  }
}

function parseCookies(cookieHeader: string): Record<string, string> {
  return Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const [key, ...val] = c.trim().split("=");
      return [key, val.join("=")];
    })
  );
}

const adminRedirectsProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const cookieHeader = (ctx as any).req?.headers?.cookie ?? "";
  const cookies = parseCookies(cookieHeader);
  const token = cookies[ADMIN_COOKIE_NAME];
  if (!token) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Admin authentication required" });
  }
  const payload = await verifyAdminToken(token);
  if (!payload) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid or expired admin session" });
  }
  return next({ ctx });
});

// ─── Router ──────────────────────────────────────────────────────────────────
export const redirectsRouter = router({
  listRedirects: adminRedirectsProcedure.query(async () => {
    const rows = await getAllRedirects();
    // Return newest first for the admin table
    return [...rows].reverse();
  }),

  upsertRedirect: adminRedirectsProcedure
    .input(
      z.object({
        id: z.number().optional(),
        sourcePath: z.string().min(1).startsWith("/"),
        targetPath: z.string().min(1),
        statusCode: z.number().int().refine((n) => [301, 302, 307, 308].includes(n), {
          message: "Status code must be 301, 302, 307, or 308",
        }),
        isEnabled: z.boolean(),
        note: z.string().nullable().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Self-redirect guard
      if (input.sourcePath === input.targetPath) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Source and target paths cannot be the same",
        });
      }

      await upsertRedirect({
        sourcePath: input.sourcePath,
        targetPath: input.targetPath,
        statusCode: input.statusCode,
        isEnabled: input.isEnabled,
        note: input.note ?? null,
      });

      // Clear cache synchronously before returning so the next request sees the change
      clearRedirectCache();

      // Chain detection: warn if target is itself a redirect source
      const allRows = await getAllRedirects();
      const chainTarget = allRows.find(
        (r) => r.sourcePath === input.targetPath && r.id !== input.id
      );
      const chainWarning = chainTarget
        ? `Target "${input.targetPath}" is itself redirected to "${chainTarget.targetPath}" — check for redirect chains`
        : null;

      return { success: true, chainWarning };
    }),

  deleteRedirect: adminRedirectsProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ input }) => {
      await deleteRedirect(input.id);
      // Clear cache synchronously before returning
      clearRedirectCache();
      return { success: true };
    }),
});
