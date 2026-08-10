import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { app } from "@shared/facts";

const APP_STORE_URL = app.iosUrl;

export default function InviteSuccess() {
  const [, navigate] = useLocation();

  // Guard: if user navigated here directly without registering, redirect to /invite
  useEffect(() => {
    const state = (window.history.state as Record<string, unknown>) ?? {};
    if (!state?.registered) {
      navigate("/invite", { replace: true } as any);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 px-4 py-12 font-sans">
      <SEO
        title="Registration Successful — DentaSmart"
        description="Your DentaSmart account has been created. Download the app to get started."
        canonical="https://dentasmart.ai/invite/success"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[460px]"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <a href="/" aria-label="DentaSmart home">
            <img
              src="/images/logo.png"
              alt="DentaSmart"
              className="h-10 w-auto"
            />
          </a>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-8 text-center">
          {/* Animated checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.15,
            }}
            className="mx-auto mb-6 w-20 h-20 rounded-full bg-teal-50 border-2 border-primary flex items-center justify-center"
            aria-hidden="true"
          >
            <motion.svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-10 text-primary"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
            >
              <motion.path d="M5 13l4 4L19 7" />
            </motion.svg>
          </motion.div>

          <h1 className="text-2xl font-semibold text-stone-900 mb-3 tracking-tight">
            Thank you for registering!
          </h1>
          <p className="text-stone-500 text-sm leading-relaxed mb-8">
            Your account has been created successfully. Download the DentaSmart
            app to get started.
          </p>

          {/* Primary CTA */}
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3.5 rounded-full transition-colors text-sm min-h-[48px] mb-4"
          >
            Download the App
          </a>

          {/* Visible URL */}
          <p className="text-xs text-stone-400 break-all">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {APP_STORE_URL}
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
