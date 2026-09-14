import { ANALYTICS_CONSENT_VERSION } from "@shared/analyticsContract";
import { isEmailUnsubscribePath } from "@shared/privacyRoutes";

export const CONSENT_STORAGE_KEY = "dentasmart_consent_v1";
export const CONSENT_CHANGED_EVENT = "dentasmart:consent-changed";

export interface ConsentPreferences {
  version: typeof ANALYTICS_CONSENT_VERSION;
  analytics: boolean;
  marketing: boolean;
  decided_at: string | null;
  updated_at: string | null;
}

const DEFAULT_CONSENT: ConsentPreferences = {
  version: ANALYTICS_CONSENT_VERSION,
  analytics: false,
  marketing: false,
  decided_at: null,
  updated_at: null,
};

export function getConsentPreferences(): ConsentPreferences {
  if (typeof window === "undefined") return DEFAULT_CONSENT;
  try {
    const stored = JSON.parse(window.localStorage.getItem(CONSENT_STORAGE_KEY) ?? "null") as Partial<ConsentPreferences> | null;
    if (!stored || stored.version !== ANALYTICS_CONSENT_VERSION) return DEFAULT_CONSENT;
    return {
      version: ANALYTICS_CONSENT_VERSION,
      analytics: stored.analytics === true,
      marketing: stored.marketing === true,
      decided_at: typeof stored.decided_at === "string" ? stored.decided_at : null,
      updated_at: typeof stored.updated_at === "string" ? stored.updated_at : null,
    };
  } catch {
    return DEFAULT_CONSENT;
  }
}

export function hasAnalyticsConsent(): boolean {
  return getConsentPreferences().analytics;
}

export function hasMarketingConsent(): boolean {
  return getConsentPreferences().marketing;
}

export function canTrackCurrentPath(): boolean {
  return typeof window !== "undefined" && !isEmailUnsubscribePath(window.location.pathname);
}

export function setConsentPreferences(next: Pick<ConsentPreferences, "analytics" | "marketing">): ConsentPreferences {
  if (typeof window === "undefined") return { ...DEFAULT_CONSENT, ...next };
  const current = getConsentPreferences();
  const timestamp = new Date().toISOString();
  const record: ConsentPreferences = {
    version: ANALYTICS_CONSENT_VERSION,
    analytics: next.analytics,
    marketing: next.marketing,
    decided_at: current.decided_at ?? timestamp,
    updated_at: timestamp,
  };
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  window.dispatchEvent(new CustomEvent<ConsentPreferences>(CONSENT_CHANGED_EVENT, { detail: record }));
  return record;
}
