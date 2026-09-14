import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  CONSENT_CHANGED_EVENT,
  type ConsentPreferences,
  getConsentPreferences,
  setConsentPreferences,
} from "@/lib/consent";
import { applyConsentState, trackPageView } from "@/lib/analytics";

const OPEN_CONSENT_EVENT = "dentasmart:open-consent";

export default function ConsentManager() {
  const [preferences, setPreferences] = useState<ConsentPreferences>(() => getConsentPreferences());
  const [isOpen, setIsOpen] = useState(() => !getConsentPreferences().decided_at);
  const [isManaging, setIsManaging] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const dialogRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const apply = (value: ConsentPreferences) => {
      setPreferences(value);
      setAnalytics(value.analytics);
      setMarketing(value.marketing);
      applyConsentState(value);
      trackPageView(window.location.pathname);
    };
    const listener = (event: Event) => apply((event as CustomEvent<ConsentPreferences>).detail ?? getConsentPreferences());
    const openListener = () => {
      const current = getConsentPreferences();
      setAnalytics(current.analytics);
      setMarketing(current.marketing);
      setIsManaging(true);
      setIsOpen(true);
    };
    window.addEventListener(CONSENT_CHANGED_EVENT, listener);
    window.addEventListener(OPEN_CONSENT_EVENT, openListener);
    applyConsentState(getConsentPreferences());
    return () => {
      window.removeEventListener(CONSENT_CHANGED_EVENT, listener);
      window.removeEventListener(OPEN_CONSENT_EVENT, openListener);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusableSelector = 'button:not([disabled]), input:not([disabled]), a[href]';
    const focusFirstControl = () => dialog.querySelector<HTMLElement>(focusableSelector)?.focus();
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector));
      if (!controls.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    focusFirstControl();
    window.addEventListener("keydown", trapFocus);
    return () => window.removeEventListener("keydown", trapFocus);
  }, [isOpen, isManaging]);

  const save = (next: Pick<ConsentPreferences, "analytics" | "marketing">) => {
    setConsentPreferences(next);
    setIsOpen(false);
    setIsManaging(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div aria-hidden="true" className="fixed inset-0 z-[99]" />
      <section
      ref={dialogRef}
      aria-label="Privacy and tracking preferences"
      aria-describedby="consent-dialog-description"
      className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-2xl rounded-2xl border border-border bg-background p-5 text-foreground shadow-2xl md:bottom-5 md:p-6"
      role="dialog"
      aria-modal="true"
    >
      <h2 className="text-lg font-semibold">Privacy and tracking preferences</h2>
      <p id="consent-dialog-description" className="mt-2 text-sm leading-6 text-muted-foreground">
        We use optional analytics to understand how our website is used and optional marketing technologies to measure campaigns. You can accept, reject, or choose your preferences.
      </p>
      {isManaging && (
        <fieldset className="mt-4 space-y-3 rounded-xl bg-muted/50 p-4">
          <legend className="px-1 text-sm font-medium">Choose optional categories</legend>
          <label className="flex items-start gap-3 text-sm">
            <input aria-label="Allow analytics" checked={analytics} onChange={event => setAnalytics(event.target.checked)} type="checkbox" className="mt-1 h-4 w-4" />
            <span><strong>Analytics</strong><br /><span className="text-muted-foreground">Helps us understand page views and website actions.</span></span>
          </label>
          <label className="flex items-start gap-3 text-sm">
            <input aria-label="Allow marketing" checked={marketing} onChange={event => setMarketing(event.target.checked)} type="checkbox" className="mt-1 h-4 w-4" />
            <span><strong>Marketing</strong><br /><span className="text-muted-foreground">Helps us measure advertising campaigns.</span></span>
          </label>
        </fieldset>
      )}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button type="button" onClick={() => save({ analytics: true, marketing: true })} className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          Accept all
        </button>
        <button type="button" onClick={() => save({ analytics: false, marketing: false })} className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          Reject non-essential
        </button>
        {isManaging ? (
          <button type="button" onClick={() => save({ analytics, marketing })} className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            Save preferences
          </button>
        ) : (
          <button type="button" onClick={() => setIsManaging(true)} className="rounded-lg px-4 py-2.5 text-sm font-semibold underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            Manage preferences
          </button>
        )}
        <Link href="/privacy-policy/" className="self-center text-sm underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Privacy Policy</Link>
      </div>
      {preferences.decided_at && !isManaging && <p className="sr-only">Your current optional tracking preferences are active.</p>}
      </section>
    </>
  );
}
