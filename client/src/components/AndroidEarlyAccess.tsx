import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { trackEvent } from "@/lib/analytics";
import { toast } from "sonner";
import { WaitlistSuccessModal } from "./WaitlistSuccessModal";

export function AndroidEarlyAccess() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const joinWaitlist = trpc.waitlist.joinAndroid.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    try {
      await joinWaitlist.mutateAsync({
        name: name.trim(),
        email: email.trim(),
      });

      setSubmittedName(name.trim());
      setSubmittedEmail(email.trim());
      setShowSuccess(true);
      trackEvent("android_waitlist_submit", { source: "homepage_section" });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error("Waitlist submission failed:", err);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setName("");
    setEmail("");
  };

  return (
    <>
      {/* Rich success modal */}
      <WaitlistSuccessModal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        name={submittedName}
        email={submittedEmail}
      />

      <section id="android-waitlist" className="py-24 bg-primary relative overflow-hidden">
        <div className="container px-4 mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-medium text-white mb-6 leading-tight">
              Sign up now to get early access of the android version of Dentasmart
            </h2>
            <p className="text-white/90 text-lg md:text-xl mb-10 font-light leading-relaxed">
              Join thousands of people who've stopped worrying about their teeth and started taking action. Get early access to Your Personal AI Dentist in Your Pocket.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-6 py-4 rounded-2xl bg-teal-50 text-teal-900 placeholder:text-teal-900/50 border-0 focus:ring-2 focus:ring-white/50 transition-all text-lg outline-none"
              />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-6 py-4 rounded-2xl bg-teal-50 text-teal-900 placeholder:text-teal-900/50 border-0 focus:ring-2 focus:ring-white/50 transition-all text-lg outline-none"
              />
              <button
                type="submit"
                disabled={joinWaitlist.isPending}
                className="w-full px-8 py-4 rounded-2xl bg-white text-primary font-medium text-lg hover:bg-teal-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {joinWaitlist.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Joining...
                  </>
                ) : (
                  "Get Early Access"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
