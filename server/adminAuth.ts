/**
 * Shared admin authentication for the DentaSmart admin panel.
 *
 * All admin routers import `adminProcedure` from here instead of duplicating
 * the JWT cookie verification logic.
 *
 * Authentication: blog_admin_session JWT cookie (set by blogRouter.adminLogin).
 * This is NOT Manus OAuth — it is a separate admin session that predates the
 * Manus OAuth integration.
 *
 * Fallback secret: "dentasmart-blog-admin-secret" — matches blogRouter's
 * original fallback so that existing sessions remain valid if JWT_SECRET is
 * not set in the deployment environment.
 */

import { TRPCError } from "@trpc/server";
import { jwtVerify } from "jose";
import { publicProcedure } from "./_core/trpc";

export const ADMIN_COOKIE_NAME = "blog_admin_session";

// Use the same fallback as blogRouter so tokens signed in any environment
// continue to verify correctly after consolidation.
const JWT_SECRET_RAW = process.env.JWT_SECRET || "dentasmart-blog-admin-secret";
export const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_RAW);

export interface AdminTokenPayload {
  adminId: number;
  username: string;
}

export async function verifyAdminToken(token: string): Promise<AdminTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as AdminTokenPayload;
  } catch {
    return null;
  }
}

export function parseCookies(cookieHeader: string): Record<string, string> {
  return Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const [key, ...val] = c.trim().split("=");
      return [key.trim(), val.join("=")];
    })
  );
}

/**
 * tRPC middleware that enforces admin authentication via the blog_admin_session
 * cookie. Use this as the base for all admin-only procedures.
 */
export const adminProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const cookieHeader = (ctx as any).req?.headers?.cookie ?? "";
  const cookies = parseCookies(cookieHeader);
  const token = cookies[ADMIN_COOKIE_NAME];
  if (!token) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Admin authentication required" });
  }
  const admin = await verifyAdminToken(token);
  if (!admin) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid admin session" });
  }
  return next({ ctx: { ...(ctx as any), admin } });
});
