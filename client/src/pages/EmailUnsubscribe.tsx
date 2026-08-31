import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "wouter";
import { AlertCircle, CheckCircle2, LoaderCircle, RefreshCcw } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  decodeEmailUnsubscribeRouteToken,
  shouldAutomaticallySubmit,
  submitEmailUnsubscribe,
  type EmailUnsubscribeResult,
} from "@/lib/emailUnsubscribe";

type PageState = "loading" | EmailUnsubscribeResult;

export default function EmailUnsubscribe() {
  const { token: routeToken = "" } = useParams<{ token: string }>();
  const token = decodeEmailUnsubscribeRouteToken(routeToken);
  const [state, setState] = useState<PageState>("loading");
  const lastAutomaticallySubmittedToken = useRef<string | null>(null);
  const requestInFlight = useRef(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const submitRequest = useCallback(async () => {
    if (!token || requestInFlight.current) return;

    requestInFlight.current = true;
    setState("loading");
    const result = await submitEmailUnsubscribe(token);
    requestInFlight.current = false;

    if (isMounted.current) {
      setState(result);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }

    if (!shouldAutomaticallySubmit(lastAutomaticallySubmittedToken.current, token)) {
      return;
    }

    lastAutomaticallySubmittedToken.current = token;
    void submitRequest();
  }, [submitRequest, token]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-stone-200">
      <Navigation />

      <main className="flex-grow flex items-center pt-28 pb-20">
        <div className="container max-w-3xl">
          <section
            aria-live="polite"
            aria-busy={state === "loading"}
            className="rounded-3xl border border-stone-100 bg-white px-6 py-12 text-center shadow-sm sm:px-10 md:py-16"
          >
            {state === "loading" && <LoadingState />}
            {state === "success" && <SuccessState />}
            {state === "invalid" && <InvalidState />}
            {state === "error" && <ErrorState onRetry={() => void submitRequest()} />}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function LoadingState() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 py-4">
      <LoaderCircle aria-hidden="true" className="h-12 w-12 animate-spin text-action" />
      <h1 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
        Unsubscribing you from DentaSmart emails...
      </h1>
    </div>
  );
}

function SuccessState() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 py-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
        <CheckCircle2 aria-hidden="true" className="h-9 w-9 text-teal-700" />
      </div>
      <div>
        <h1 className="mb-4 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
          You have been unsubscribed.
        </h1>
        <p className="text-base leading-relaxed text-stone-600 sm:text-lg">
          You will no longer receive DentaSmart marketing, lifecycle, reminder, and promotional emails for this account.
        </p>
      </div>
    </div>
  );
}

function InvalidState() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 py-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
        <AlertCircle aria-hidden="true" className="h-9 w-9 text-amber-700" />
      </div>
      <div>
        <h1 className="mb-4 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
          This unsubscribe link is invalid or expired.
        </h1>
        <p className="text-base leading-relaxed text-stone-600 sm:text-lg">
          If you still need help, please contact{" "}
          <a
            className="font-medium text-action underline decoration-1 underline-offset-4 hover:text-action-hover"
            href="mailto:support@dentasmart.ai"
          >
            support@dentasmart.ai
          </a>
          .
        </p>
      </div>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 py-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
        <AlertCircle aria-hidden="true" className="h-9 w-9 text-red-600" />
      </div>
      <div>
        <h1 className="mb-4 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
          We could not update your email preference right now.
        </h1>
        <p className="mb-8 text-base leading-relaxed text-stone-600 sm:text-lg">
          Please try again in a moment.
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-action px-8 py-3 text-base font-medium text-action-foreground transition-colors hover:bg-action-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action"
        >
          <RefreshCcw aria-hidden="true" className="h-5 w-5" />
          Retry
        </button>
      </div>
    </div>
  );
}
