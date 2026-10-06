import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, MessageSquareText } from "lucide-react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import {
  SMS_CONSENT_PERSISTENCE_ERROR,
  SMS_CONSENT_SUCCESS_MESSAGE,
  SMS_CONSENT_DISCLOSURE_PREFIX,
  SMS_PRIVACY_POLICY_URL,
  SMS_TERMS_OF_SERVICE_URL,
} from "@shared/smsConsent";

function createIdempotencyKey(): string {
  return crypto.randomUUID();
}

function isValidUsPhoneNumber(value: string): boolean {
  let compact = value.trim().replace(/[\s().-]/g, "");
  if (/^\d{10}$/.test(compact)) compact = `+1${compact}`;
  if (/^1\d{10}$/.test(compact)) compact = `+${compact}`;
  return /^\+1[2-9]\d{2}[2-9]\d{6}$/.test(compact);
}

function isValidOptionalEmail(value: string): boolean {
  const email = value.trim();
  return !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function getSafeSmsConsentErrorMessage(error: {
  message?: string;
  data?: { code?: string } | null;
}): string {
  const message = error.message?.trim() ?? "";
  if (
    error.data?.code === "INTERNAL_SERVER_ERROR" ||
    /\b(mysql|mariadb|sql|query|er_[a-z_]+)\b/i.test(message)
  ) {
    return SMS_CONSENT_PERSISTENCE_ERROR;
  }
  return message || SMS_CONSENT_PERSISTENCE_ERROR;
}

export default function SMSConsent() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hasConsented, setHasConsented] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [consentError, setConsentError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [idempotencyKey] = useState(createIdempotencyKey);

  const submitConsent = trpc.smsConsent.submit.useMutation({
    onSuccess: () => {
      setIsSaved(true);
      setSubmitError(null);
    },
    onError: (error) => {
      setSubmitError(getSafeSmsConsentErrorMessage(error));
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validPhone = isValidUsPhoneNumber(phone);
    const validEmail = isValidOptionalEmail(email);
    setPhoneError(validPhone ? null : "Enter a valid U.S. mobile phone number.");
    setEmailError(validEmail ? null : "Enter a valid email address or leave it blank.");
    setConsentError(hasConsented ? null : "Please confirm your SMS consent to continue.");
    setSubmitError(null);

    if (!validPhone || !validEmail || !hasConsented) return;

    submitConsent.mutate({
      fullName: fullName.trim() || undefined,
      email: email.trim() || undefined,
      phone: phone.trim(),
      consent: true,
      idempotencyKey,
    });
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-primary/20">
      <SEO
        title="SMS Communication Preferences | DentaSmart"
        description="Manage your consent to receive DentaSmart customer care-related or one-on-one communication messages."
        canonical="https://dentasmart.ai/sms-consent"
      />
      <Navigation />

      <main className="pt-32 pb-20 md:pb-28">
        <div className="container mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
            <div className="border-b border-teal-100 bg-accent/50 px-6 py-8 md:px-10 md:py-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-sm">
                <MessageSquareText aria-hidden="true" className="h-6 w-6" />
              </div>
              <h1 className="text-3xl md:text-5xl">SMS Communication Preferences</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-stone-700 md:text-lg">
                Use your preferred number for DentaSmart customer care-related or one-on-one communication.
              </p>
            </div>

            <div className="px-6 py-8 md:px-10 md:py-10">
              {isSaved ? (
                <section aria-live="polite" className="mx-auto max-w-xl py-4 text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-action">
                    <CheckCircle2 aria-hidden="true" className="h-9 w-9" />
                  </div>
                  <h2 className="text-2xl md:text-3xl">SMS preferences saved</h2>
                  <p className="mt-4 text-base leading-7 text-stone-700">
                    {SMS_CONSENT_SUCCESS_MESSAGE}
                  </p>
                </section>
              ) : (
                <form noValidate onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-7">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="sms-consent-name" className="text-base font-medium text-stone-900">
                        Full name <span className="font-normal text-stone-500">(optional)</span>
                      </Label>
                      <Input
                        id="sms-consent-name"
                        type="text"
                        autoComplete="name"
                        maxLength={200}
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        className="h-12 border-stone-300 bg-white text-base focus:border-primary focus:ring-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sms-consent-email" className="text-base font-medium text-stone-900">
                        Email address <span className="font-normal text-stone-500">(optional)</span>
                      </Label>
                      <Input
                        id="sms-consent-email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        maxLength={320}
                        aria-describedby="sms-consent-email-error"
                        aria-invalid={Boolean(emailError)}
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          if (emailError) setEmailError(null);
                        }}
                        className="h-12 border-stone-300 bg-white text-base focus:border-primary focus:ring-primary/20"
                      />
                      {emailError && <p id="sms-consent-email-error" role="alert" className="text-sm font-medium text-red-700">{emailError}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sms-consent-phone" className="text-base font-medium text-stone-900">
                      U.S. mobile phone number
                    </Label>
                    <Input
                      id="sms-consent-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      aria-describedby="sms-consent-phone-hint sms-consent-phone-error"
                      aria-invalid={Boolean(phoneError)}
                      placeholder="(555) 123-4567"
                      value={phone}
                      onChange={(event) => {
                        setPhone(event.target.value);
                        if (phoneError) setPhoneError(null);
                      }}
                      className="h-12 border-stone-300 bg-white text-base focus:border-primary focus:ring-primary/20"
                    />
                    <p id="sms-consent-phone-hint" className="text-sm leading-6 text-stone-600">
                      Enter a U.S. mobile number. We use it only to document this SMS preference and provide the messages you choose to receive.
                    </p>
                    {phoneError && <p id="sms-consent-phone-error" role="alert" className="text-sm font-medium text-red-700">{phoneError}</p>}
                  </div>

                  <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="sms-consent-checkbox"
                        checked={hasConsented}
                        onCheckedChange={(checked) => {
                          setHasConsented(checked === true);
                          if (checked === true) setConsentError(null);
                        }}
                        aria-describedby="sms-consent-copy sms-consent-error"
                        aria-invalid={Boolean(consentError)}
                        className="mt-1 border-stone-500 data-[state=checked]:border-action data-[state=checked]:bg-action"
                      />
                      <div className="min-w-0">
                        <Label id="sms-consent-copy" htmlFor="sms-consent-checkbox" className="!block cursor-pointer text-sm !leading-6 text-stone-700">
                          {SMS_CONSENT_DISCLOSURE_PREFIX}{" "}
                          <a href={SMS_PRIVACY_POLICY_URL} className="font-medium text-action underline underline-offset-2">{SMS_PRIVACY_POLICY_URL}</a>{" "}
                          <a href={SMS_TERMS_OF_SERVICE_URL} className="font-medium text-action underline underline-offset-2">{SMS_TERMS_OF_SERVICE_URL}</a>.
                        </Label>
                      </div>
                    </div>
                    {consentError && <p id="sms-consent-error" role="alert" className="mt-3 text-sm font-medium text-red-700">{consentError}</p>}
                  </div>

                  {submitError && (
                    <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                      {submitError}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={submitConsent.isPending}
                    className="h-12 w-full rounded-full bg-action text-base font-medium text-action-foreground hover:bg-action-hover"
                  >
                    {submitConsent.isPending ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Saving preference…</> : "Confirm SMS Consent"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
