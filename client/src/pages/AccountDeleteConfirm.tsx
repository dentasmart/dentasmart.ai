import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";

const API_BASE = "https://live-backend.dentasmart.ai";

type State =
  | { status: "loading" }
  | { status: "success"; deletionDate: string }
  | { status: "invalid" }
  | { status: "expired" }
  | { status: "error" };

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function AccountDeleteConfirm() {
  const params = useParams<{ token: string }>();
  const token = params.token ?? "";
  const hasSubmitted = useRef(false);
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    if (!token) return;
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;

    const decodedToken = decodeURIComponent(token);
    confirmDeletion(decodedToken);
  }, [token]);

  async function confirmDeletion(decodedToken: string) {
    try {
      const res = await fetch(`${API_BASE}/v1/account-deletion/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: decodedToken }),
      });

      if (res.ok) {
        let deletionDate = "";
        try {
          const data = await res.json();
          if (data?.data_deletion_scheduled_for) {
            deletionDate = formatDate(data.data_deletion_scheduled_for);
          }
        } catch {
          // ignore parse error — still treat as success
        }
        setState({ status: "success", deletionDate });
      } else if (res.status === 400) {
        let msg = "";
        try {
          const data = await res.json();
          msg = (data?.message ?? "").toLowerCase();
        } catch {
          // ignore
        }
        if (msg.includes("expired")) {
          setState({ status: "expired" });
        } else {
          setState({ status: "invalid" });
        }
      } else {
        setState({ status: "error" });
      }
    } catch {
      setState({ status: "error" });
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-stone-200">
      <SEO
        title="Confirm Account Deletion - DentaSmart"
        description="Confirm your DentaSmart account deletion request."
        noindex
      />
      <Navigation />

      <main className="flex-grow pt-32 pb-24">
        <div className="container px-4 mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-100 text-center"
          >
            {state.status === "loading" && <LoadingState />}
            {state.status === "success" && <SuccessState deletionDate={state.deletionDate} />}
            {state.status === "invalid" && <InvalidState />}
            {state.status === "expired" && <ExpiredState />}
            {state.status === "error" && <ErrorState />}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ── Sub-state components ─────────────────────────────────────────── */

function LoadingState() {
  return (
    <div className="py-8 flex flex-col items-center gap-6">
      <svg
        className="animate-spin h-12 w-12 text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      <div>
        <h1 className="text-3xl font-semibold text-stone-900 mb-3 tracking-tight">
          Confirming Account Deletion
        </h1>
        <p className="text-stone-500">Please wait while we process your request…</p>
      </div>
    </div>
  );
}

function SuccessState({ deletionDate }: { deletionDate: string }) {
  return (
    <div className="py-8 flex flex-col items-center gap-6">
      {/* Checkmark icon */}
      <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center">
        <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div className="max-w-md">
        <h1 className="text-3xl font-semibold text-stone-900 mb-4 tracking-tight">
          Account Successfully Deleted
        </h1>
        <p className="text-stone-600 leading-relaxed mb-3">
          Your DentaSmart account has been deactivated.
          {deletionDate
            ? ` All associated data will be permanently deleted on ${deletionDate}.`
            : " All associated data will be permanently deleted within 30 days."}
        </p>
        <p className="text-stone-500 text-sm leading-relaxed mb-8">
          Thank you for using DentaSmart. You can create a new account at any time at{" "}
          <a href="https://dentasmart.ai" className="text-primary hover:underline">
            dentasmart.ai
          </a>
          .
        </p>
        <Link href="/">
          <button className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3.5 rounded-full transition-colors text-sm">
            Return to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

function InvalidState() {
  return (
    <div className="py-8 flex flex-col items-center gap-6">
      {/* Error icon */}
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
        <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <div className="max-w-md">
        <h1 className="text-3xl font-semibold text-stone-900 mb-4 tracking-tight">
          Invalid Deletion Link
        </h1>
        <p className="text-stone-600 leading-relaxed mb-8">
          This deletion link is invalid or has already been used.
        </p>
        <Link href="/account-deletion/">
          <button className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3.5 rounded-full transition-colors text-sm">
            Request New Deletion
          </button>
        </Link>
      </div>
    </div>
  );
}

function ExpiredState() {
  return (
    <div className="py-8 flex flex-col items-center gap-6">
      {/* Error icon */}
      <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center">
        <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="max-w-md">
        <h1 className="text-3xl font-semibold text-stone-900 mb-4 tracking-tight">
          Link Expired
        </h1>
        <p className="text-stone-600 leading-relaxed mb-8">
          This deletion link has expired. Please submit a new request to delete your account.
        </p>
        <Link href="/account-deletion/">
          <button className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3.5 rounded-full transition-colors text-sm">
            Request New Deletion
          </button>
        </Link>
      </div>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="py-8 flex flex-col items-center gap-6">
      {/* Error icon */}
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
        <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="max-w-md">
        <h1 className="text-3xl font-semibold text-stone-900 mb-4 tracking-tight">
          Something Went Wrong
        </h1>
        <p className="text-stone-600 leading-relaxed mb-8">
          We couldn't process your request right now. Please try again in a few minutes or contact{" "}
          <a href="mailto:support@dentasmart.ai" className="text-primary hover:underline">
            support@dentasmart.ai
          </a>
          .
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3.5 rounded-full transition-colors text-sm"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
