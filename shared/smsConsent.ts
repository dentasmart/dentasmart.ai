export const SMS_CONSENT_SOURCE = "website" as const;
export const SMS_CONSENT_SOURCE_PATH = "/sms-consent/" as const;

/**
 * Versioned copy retained with each opt-in record. Update the version whenever
 * the public consent disclosure changes so records remain attributable.
 */
export const SMS_CONSENT_WORDING_VERSION = "2026-10-05-provider-v1" as const;
export const SMS_LEGAL_VERSION = "2026-10-05" as const;

export const SMS_PRIVACY_POLICY_URL = "https://dentasmart.ai/privacy-policy/" as const;
export const SMS_TERMS_OF_SERVICE_URL = "https://dentasmart.ai/terms-of-service/" as const;

export const SMS_CONSENT_DISCLOSURE_PREFIX =
  "By clicking here you consent to receive sms customer care-related and one-on-one communication messages from DentaSmart. Message frequency may vary. Standard Message and Data Rates may apply. Reply STOP to opt out. Reply Help for help.";

export const SMS_CONSENT_DISCLOSURE =
  `${SMS_CONSENT_DISCLOSURE_PREFIX} ${SMS_PRIVACY_POLICY_URL} ${SMS_TERMS_OF_SERVICE_URL}`;

export const SMS_CONSENT_SUCCESS_MESSAGE =
  "You're signed up to receive DentaSmart SMS updates. Reply STOP at any time to opt out or HELP for assistance.";

export const SMS_CONSENT_PERSISTENCE_ERROR =
  "We could not save your SMS preference. Please try again.";
