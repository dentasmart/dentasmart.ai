import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, CheckCircle2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { trackEvent } from "@/lib/analytics";
import { toast } from "sonner";

export function AndroidEarlyAccess() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successName, setSuccessName] = useState("");
  const [successEmail, setSuccessEmail] = useState("");

  const joinWaitlist = trpc.waitlist.joinAndroid.useMutation();

  // Auto-close success screen after 5 seconds
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setEmail("");
        setName("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    try {
      await joinWaitlist.mutateAsync({
        name: name.trim(),
        email: email.trim(),
      });

      // Show success screen
      setSuccessName(name.trim());
      setSuccessEmail(email.trim());
      setShowSuccess(true);
      trackEvent("android_waitlist_submit", { source: "homepage_section" });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error("Waitlist submission failed:", err);
    }
  };

  return (
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
            Join thousands of people who've stopped worrying about their teeth and started taking action. Get early access to your Personal AI Oral Health Guide.
          </p>

          {showSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center gap-6 max-w-md mx-auto"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse" />
                <CheckCircle2 className="w-20 h-20 text-white relative z-10" strokeWidth={1.5} />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center space-y-3"
              >
                <h3 className="text-3xl font-bold text-white">You're In!</h3>
                <p className="text-white/90 text-lg">
                  Thanks {successName}! We'll notify you at{" "}
                  <span className="font-medium text-white">{successEmail}</span> as soon as the Android version is ready.
                </p>
                <p className="text-white/60 text-sm pt-2">Redirecting in 5 seconds...</p>
              </motion.div>
            </motion.div>
          ) : (
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
          )}
        </motion.div>
      </div>
    </section>
  );
}
