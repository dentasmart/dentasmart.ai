export const SMS_PRIVACY_POLICY_URL = "https://dentasmart.ai/privacy-policy/" as const;
export const SMS_TERMS_OF_SERVICE_URL = "https://dentasmart.ai/terms-of-service/" as const;

export const SMS_CONSENT_DISCLOSURE_PREFIX =
  "By clicking here you consent to receive sms customer care-related and one-on-one communication messages from DentaSmart. Message frequency may vary. Standard Message and Data Rates may apply. Reply STOP to opt out. Reply Help for help.";

export const SMS_CONSENT_DISCLOSURE =
  `${SMS_CONSENT_DISCLOSURE_PREFIX} ${SMS_PRIVACY_POLICY_URL} ${SMS_TERMS_OF_SERVICE_URL}`;
