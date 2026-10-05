import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { isIP } from "node:net";
import { z } from "zod";
import { smsConsentRecords } from "../drizzle/schema";
import {
  SMS_CONSENT_DISCLOSURE,
  SMS_CONSENT_PERSISTENCE_ERROR,
  SMS_CONSENT_SOURCE,
  SMS_CONSENT_SOURCE_PATH,
  SMS_CONSENT_WORDING_VERSION,
  SMS_LEGAL_VERSION,
} from "../shared/smsConsent";
import { getDb } from "./db";
import { publicProcedure, router } from "./_core/trpc";

const usPhoneInput = z.string().trim().min(7).max(32);
const optionalFullName = z.string().trim().max(200).optional();
const optionalEmail = z.string().trim().max(320).optional();

const submitSmsConsentInput = z.object({
  fullName: optionalFullName,
  email: optionalEmail,
  phone: usPhoneInput,
  consent: z.literal(true),
  idempotencyKey: z.string().uuid(),
});

/** Normalizes standard U.S. phone entry formats to the stored E.164 form. */
export function normalizeUsPhoneNumber(input: string): string | null {
  let compact = input.trim().replace(/[\s().-]/g, "");

  if (/^\d{10}$/.test(compact)) {
    compact = `+1${compact}`;
  } else if (/^1\d{10}$/.test(compact)) {
    compact = `+${compact}`;
  }

  return /^\+1[2-9]\d{2}[2-9]\d{6}$/.test(compact) ? compact : null;
}

function normalizeOptionalFullName(input: string | undefined): string | null {
  const value = input?.trim();
  return value || null;
}

export function normalizeOptionalEmail(input: string | undefined): string | null {
  const value = input?.trim().toLowerCase();
  if (!value) return null;
  return z.string().email().max(320).safeParse(value).success ? value : null;
}

/**
 * AWS ALB append mode adds the connecting client address to the end of
 * X-Forwarded-For. Use that most-recent valid address for the opt-in audit.
 * Fall back to the socket address during local or non-proxied requests.
 */
export function getSmsConsentAuditIp(
  forwardedFor: string | string[] | undefined,
  socketAddress: string | undefined,
): string | null {
  const header = Array.isArray(forwardedFor) ? forwardedFor.at(-1) : forwardedFor;
  const forwardedAddresses = header
    ?.split(",")
    .map((entry) => entry.trim())
    .reverse() ?? [];
  const forwardedIp = forwardedAddresses.find((entry) => isIP(entry) !== 0);

  if (forwardedIp) return forwardedIp;
  return socketAddress && isIP(socketAddress) !== 0 ? socketAddress : null;
}

function getBoundedUserAgent(value: string | string[] | undefined): string | null {
  const userAgent = Array.isArray(value) ? value.at(-1) : value;
  if (!userAgent) return null;
  return userAgent.slice(0, 512);
}

function getDatabaseErrorDetails(error: unknown): { code?: string; name?: string } {
  if (!error || typeof error !== "object") return {};
  const candidate = error as { code?: unknown; name?: unknown };
  return {
    code: typeof candidate.code === "string" ? candidate.code : undefined,
    name: typeof candidate.name === "string" ? candidate.name : undefined,
  };
}

export const smsConsentRouter = router({
  submit: publicProcedure
    .input(submitSmsConsentInput)
    .mutation(async ({ input, ctx }) => {
      const phoneE164 = normalizeUsPhoneNumber(input.phone);
      if (!phoneE164) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Enter a valid U.S. mobile phone number.",
        });
      }

      const fullName = normalizeOptionalFullName(input.fullName);
      const email = normalizeOptionalEmail(input.email);
      if (input.email?.trim() && !email) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Enter a valid email address or leave it blank.",
        });
      }

      let db;
      try {
        db = await getDb();
      } catch (error) {
        console.error("[SmsConsent] Database operation failed", getDatabaseErrorDetails(error));
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: SMS_CONSENT_PERSISTENCE_ERROR,
        });
      }

      if (!db) {
        throw new TRPCError({
          code: "SERVICE_UNAVAILABLE",
          message: "SMS preferences are temporarily unavailable. Please try again later.",
        });
      }

      try {
        const existing = await db
          .select({ id: smsConsentRecords.id })
          .from(smsConsentRecords)
          .where(eq(smsConsentRecords.idempotencyKey, input.idempotencyKey))
          .limit(1);

        if (existing.length > 0) {
          return { saved: true, duplicate: true };
        }

        const consentAt = new Date();
        await db.insert(smsConsentRecords).values({
          fullName,
          email,
          phoneE164,
          consentGranted: true,
          consentAt,
          consentSource: SMS_CONSENT_SOURCE,
          sourcePath: SMS_CONSENT_SOURCE_PATH,
          consentWordingVersion: SMS_CONSENT_WORDING_VERSION,
          consentWording: SMS_CONSENT_DISCLOSURE,
          privacyPolicyVersion: SMS_LEGAL_VERSION,
          termsOfServiceVersion: SMS_LEGAL_VERSION,
          sourceIp: getSmsConsentAuditIp(
            ctx.req.headers["x-forwarded-for"],
            ctx.req.socket.remoteAddress,
          ),
          userAgent: getBoundedUserAgent(ctx.req.headers["user-agent"]),
          idempotencyKey: input.idempotencyKey,
        });
      } catch (error: unknown) {
        // A duplicate key can occur if a client retries while the first request
        // is finishing. Treat it as an idempotent success without rewriting the record.
        if ((error as { code?: string })?.code === "ER_DUP_ENTRY") {
          return { saved: true, duplicate: true };
        }

        console.error("[SmsConsent] Database operation failed", getDatabaseErrorDetails(error));
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: SMS_CONSENT_PERSISTENCE_ERROR,
        });
      }

      return { saved: true, duplicate: false };
    }),
});
