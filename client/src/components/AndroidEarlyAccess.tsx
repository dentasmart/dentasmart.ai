import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function AndroidEarlyAccess() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      // In a real app, this would send data to the backend
      console.log("Submitting early access request:", { name, email });
      setSubmitted(true);
    }
  };

  return (
    <section id="android-waitlist" className="py-24 bg-teal-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/backgrounds/noise.png')] opacity-20" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-400 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-800 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container px-4 mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-medium text-white mb-6">
            Sign up now to get early access of the android version of Dentasmart
          </h2>
          <p className="text-teal-50 text-lg md:text-xl mb-10 font-light leading-relaxed max-w-2xl mx-auto">
            Join thousands of people who've stopped worrying about their teeth and started taking action. Get early access to your Personal AI Dental Companion.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-md mx-auto"
            >
              <div className="w-16 h-16 bg-teal-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Check className="w-8 h-8 text-teal-900" strokeWidth={3} />
              </div>
              <h3 className="text-2xl font-medium text-white mb-2">You're on the list!</h3>
              <p className="text-teal-100">
                Thanks, {name}. We'll notify you at <span className="font-medium text-white">{email}</span> as soon as the Android version is ready.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 justify-center max-w-4xl mx-auto">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="flex-1 px-6 py-4 rounded-xl bg-teal-50 text-teal-900 placeholder:text-teal-900/50 border-2 border-transparent focus:border-white focus:outline-none focus:ring-0 transition-all text-lg"
              />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-6 py-4 rounded-xl bg-teal-50 text-teal-900 placeholder:text-teal-900/50 border-2 border-transparent focus:border-white focus:outline-none focus:ring-0 transition-all text-lg"
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-xl bg-white text-teal-700 font-medium text-lg hover:bg-teal-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 whitespace-nowrap"
              >
                Get Early Access
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
