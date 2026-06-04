import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";

const API_BASE = "https://live-backend.dentasmart.ai";

export default function AccountDeletion() {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [emailError, setEmailError] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [serverError, setServerError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setReasonError("");
    setServerError("");

    let valid = true;
    if (!email.trim() || !validateEmail(email.trim())) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }
    if (!reason.trim()) {
      setReasonError("Please share a reason for leaving.");
      valid = false;
    }
    if (reason.length > 2000) {
      setReasonError("Reason must be 2000 characters or fewer.");
      valid = false;
    }
    if (!valid) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/v1/account-deletion/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), reason: reason.trim() }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else if (res.status === 400) {
        let msg = "Please check your input and try again.";
        try {
          const data = await res.json();
          if (data?.message) msg = data.message;
        } catch {
          // ignore parse error
        }
        setServerError(msg);
      } else {
        throw new Error("Server error");
      }
    } catch {
      setServerError(
        "Something went wrong. Please try again in a few minutes or contact support@dentasmart.ai if the issue persists."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-stone-200">
      <SEO
        title="Delete Your DentaSmart Account"
        description="Permanently delete your DentaSmart account and all associated personal data. Simple two-step deletion process."
        canonical="https://dentasmart.ai/account-deletion/"
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
                  "Family member data (for Family Insights subscribers)",
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
                For legal and regulatory compliance, anonymized billing records may be retained for
                tax purposes. These records do not contain personal health information and cannot be
                used to identify you after account deletion.
              </p>
            </section>

            <hr className="border-stone-100 mb-10" />

            {/* Section: How long deletion takes */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-stone-900 mb-5 tracking-tight">
                How long deletion takes
              </h2>
              <p className="text-stone-600 leading-relaxed">
                Once you confirm your request via the confirmation email, your account will be
                deactivated immediately. All associated data will be permanently deleted within 30
                days. This 30-day window allows for any necessary compliance verification before
                final deletion.
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
                  "Account deletion is permanent and cannot be undone after the 30-day window",
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

            {/* Section: Request account deletion */}
            <section>
              <h2 className="text-2xl font-semibold text-stone-900 mb-5 tracking-tight">
                Request account deletion
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl bg-teal-50 border border-teal-200 p-6"
                >
                  <p className="text-teal-800 leading-relaxed">
                    If an account exists for this email, you'll receive a confirmation link within a
                    few minutes. Click the link in the email to confirm deletion. The link will
                    expire in 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Email field */}
                  <div>
                    <label
                      htmlFor="acct-email"
                      className="block text-sm font-medium text-stone-700 mb-1.5"
                    >
                      Email address <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="acct-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={`w-full rounded-xl border px-4 py-3 text-stone-900 placeholder:text-stone-400 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm ${
                        emailError ? "border-red-300" : "border-stone-200"
                      }`}
                    />
                    {emailError && (
                      <p className="mt-1.5 text-sm text-red-500">{emailError}</p>
                    )}
                  </div>

                  {/* Reason textarea */}
                  <div>
                    <label
                      htmlFor="acct-reason"
                      className="block text-sm font-medium text-stone-700 mb-1.5"
                    >
                      Reason for leaving <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="acct-reason"
                      rows={4}
                      maxLength={2000}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Help us improve by sharing why you're leaving..."
                      className={`w-full rounded-xl border px-4 py-3 text-stone-900 placeholder:text-stone-400 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm resize-none ${
                        reasonError ? "border-red-300" : "border-stone-200"
                      }`}
                    />
                    <div className="flex justify-between items-start mt-1.5">
                      {reasonError ? (
                        <p className="text-sm text-red-500">{reasonError}</p>
                      ) : (
                        <span />
                      )}
                      <span
                        className={`text-xs ml-auto ${
                          reason.length > 1900 ? "text-amber-500" : "text-stone-400"
                        }`}
                      >
                        {reason.length}/2000
                      </span>
                    </div>
                  </div>

                  {/* Server error */}
                  {serverError && (
                    <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3">
                      <p className="text-sm text-red-700 leading-relaxed">{serverError}</p>
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium px-8 py-3.5 rounded-full transition-colors text-sm flex items-center gap-2"
                  >
                    {loading && (
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                    )}
                    {loading ? "Submitting…" : "Request Account Deletion"}
                  </button>

                  <p className="text-stone-500 text-sm leading-relaxed">
                    After submitting, you'll receive a confirmation email. Click the link in the
                    email to permanently delete your account. The link will expire in 24 hours.
                  </p>
                </form>
              )}
            </section>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
