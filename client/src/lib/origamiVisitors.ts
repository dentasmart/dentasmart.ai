import {
  canTrackCurrentPath,
  getConsentPreferences,
  type ConsentPreferences,
} from "@/lib/consent";

type OrigamiCommand = "consent" | "identify";

declare global {
  interface Window {
    origami?: (command: OrigamiCommand, value: "granted" | "denied" | string) => void;
  }
}

/**
 * Origami classifies company-level site visitors. It is governed by the
 * existing Marketing consent choice and never receives a path query string.
 */
export function applyOrigamiConsent(consent: ConsentPreferences = getConsentPreferences()): void {
  if (typeof window === "undefined" || !canTrackCurrentPath()) return;
  window.origami?.("consent", consent.marketing ? "granted" : "denied");
}

/**
 * Marks an authenticated browser as belonging to an existing DentaSmart user,
 * rather than a prospective lead. The ID is stable, non-email account data.
 */
export function identifyOrigamiUser(stableUserId: string | number): void {
  if (typeof window === "undefined" || !canTrackCurrentPath()) return;
  if (!getConsentPreferences().marketing) return;

  const normalizedId = String(stableUserId).trim();
  if (!normalizedId || normalizedId.length > 128) return;
  window.origami?.("identify", normalizedId);
}
