import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";

export default function DeleteAccount() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-stone-200">
      <SEO
        title="Delete Your DentaSmart Account"
        description="Permanently delete your DentaSmart account and all associated personal data. Simple two-step deletion process."
        canonical="https://dentasmart.ai/delete-account/"
      />
      <Navigation />

      <main className="flex-grow pt-32 pb-24">
        <div className="container px-4 mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-100"
          >
            {/* Page heading */}
            <h1 className="text-4xl md:text-5xl font-semibold text-primary mb-6 tracking-tight">
              Delete Your Account
            </h1>

            <p className="text-stone-600 leading-relaxed mb-12 text-lg">
              We're sorry to see you go. This page allows you to permanently delete your DentaSmart
              account and all associated personal data. Please read the information below carefully
              before submitting your request.
            </p>

            {/* Section: What gets deleted */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-stone-900 mb-5 tracking-tight">
                What gets deleted
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                When you delete your account, the following data is permanently removed:
              </p>
              <ul className="space-y-2.5">
                {[
                  "Name",
                  "Age",
                  "Email address",
                  "Phone number (if provided)",
                  "X-ray images you've uploaded",
                  "Mouth and teeth photos you've uploaded",
                  "AI analysis history",
                  "Oral Health Score history",
                  "Personalized care plan recommendations",
                  "Chat history with the AI assistant",
                  "Family member data (for Family Plan subscribers)",
                  "Reminder and notification preferences",
                  "Account credentials (login, password)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-stone-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <hr className="border-stone-100 mb-10" />

            {/* Section: What we retain */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-stone-900 mb-5 tracking-tight">
                What we retain
              </h2>
              <p className="text-stone-600 leading-relaxed">
                For legal and regulatory compliance, we retain anonymized billing records for 7 years.
                These records do not contain personal health information and cannot be used to identify
                you after account deletion.
              </p>
            </section>

            <hr className="border-stone-100 mb-10" />

            {/* Section: How long deletion takes */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-stone-900 mb-5 tracking-tight">
                How long deletion takes
              </h2>
              <p className="text-stone-600 leading-relaxed">
                Once you confirm your request via the confirmation email, your account and all
                associated data will be permanently deleted within 24 hours.
              </p>
            </section>

            <hr className="border-stone-100 mb-10" />

            {/* Section: Important to know */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-stone-900 mb-5 tracking-tight">
                Important to know
              </h2>
              <ul className="space-y-2.5">
                {[
                  "Account deletion is permanent and cannot be undone",
                  "You can create a new DentaSmart account at any time after deletion",
                  "Active subscriptions will be cancelled (no refund for partial billing periods)",
                  "Deleted data cannot be recovered, including X-rays and analysis history",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-stone-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <hr className="border-stone-100 mb-10" />

            {/* Section: Request account deletion (form — visual only) */}
            <section>
              <h2 className="text-2xl font-semibold text-stone-900 mb-5 tracking-tight">
                Request account deletion
              </h2>

              <div className="space-y-6">
                {/* Email field */}
                <div>
                  <label
                    htmlFor="delete-email"
                    className="block text-sm font-medium text-stone-700 mb-1.5"
                  >
                    Email address
                  </label>
                  <input
                    id="delete-email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm"
                  />
                </div>

                {/* Reason textarea */}
                <div>
                  <label
                    htmlFor="delete-reason"
                    className="block text-sm font-medium text-stone-700 mb-1.5"
                  >
                    Reason for leaving{" "}
                    <span className="text-stone-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="delete-reason"
                    rows={4}
                    maxLength={500}
                    placeholder="Help us improve by sharing why you're leaving..."
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="button"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3.5 rounded-full transition-colors text-sm"
                >
                  Request Account Deletion
                </button>

                {/* Helper text */}
                <p className="text-stone-500 text-sm leading-relaxed">
                  After submitting, you'll receive a confirmation email. Click the link in the email
                  to permanently delete your account. The link will expire in 24 hours.
                </p>
              </div>
            </section>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
