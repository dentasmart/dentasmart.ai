import { TRPCError } from "@trpc/server";
import { adminProcedure } from "./adminAuth";
import { getAdminById } from "./blogDb";

export function isCmsAdminSecretConfigured(
  nodeEnv: string | undefined,
  secret: string | undefined
): boolean {
  if (nodeEnv !== "production") return true;

  return !!secret &&
    secret.length >= 32 &&
    secret !== "dentasmart-blog-admin-secret";
}

/**
 * Production CMS authentication safeguards.
 * Existing Blog Admin login remains unchanged.
 */
export const cmsAdminProcedure = adminProcedure.use(
  async ({ ctx, next }) => {
    if (process.env.NODE_ENV === "production") {
      if (!isCmsAdminSecretConfigured(
        process.env.NODE_ENV,
        process.env.JWT_SECRET
      )) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Production CMS authentication is not configured.",
        });
      }

      const identity = (ctx as any).admin;

      if (
        !Number.isSafeInteger(identity?.adminId) ||
        identity.adminId <= 0
      ) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid administrator identity.",
        });
      }

      const account = await getAdminById(identity.adminId);

      if (!account || account.username !== identity.username) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Administrator account is no longer valid.",
        });
      }
    }

    return next();
  }
);
