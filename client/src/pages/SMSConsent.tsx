import { Link } from "wouter";
import { MessageSquareText } from "lucide-react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  SMS_CONSENT_DISCLOSURE_PREFIX,
  SMS_PRIVACY_POLICY_URL,
  SMS_TERMS_OF_SERVICE_URL,
} from "@shared/smsConsent";

export default function SMSConsent() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-primary/20">
      <SEO
        title="SMS Communication Preferences | DentaSmart"
        description="Review DentaSmart SMS customer care-related and one-on-one communication disclosure information."
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
                Review the SMS communication disclosure before opting in through an eligible DentaSmart interaction.
              </p>
            </div>

            <section className="mx-auto max-w-xl space-y-7 px-6 py-8 md:px-10 md:py-10" aria-labelledby="sms-consent-heading">
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="sms-consent-checkbox"
                    defaultChecked={false}
                    aria-describedby="sms-consent-copy"
                    className="mt-1 border-stone-500 data-[state=checked]:border-action data-[state=checked]:bg-action"
                  />
                  <div className="min-w-0">
                    <Label id="sms-consent-copy" htmlFor="sms-consent-checkbox" className="!block cursor-pointer text-sm !leading-6 text-stone-700">
                      {SMS_CONSENT_DISCLOSURE_PREFIX}{" "}
                      <Link href="/privacy-policy/" className="font-medium text-action underline underline-offset-2">
                        {SMS_PRIVACY_POLICY_URL}
                      </Link>{" "}
                      <Link href="/terms-of-service/" className="font-medium text-action underline underline-offset-2">
                        {SMS_TERMS_OF_SERVICE_URL}
                      </Link>
                    </Label>
                  </div>
                </div>
              </div>

              <p id="sms-consent-heading" className="text-sm leading-6 text-stone-600">
                SMS consent is optional. Reply STOP to opt out or HELP for help.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
