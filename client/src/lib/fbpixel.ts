/**
 * Meta Pixel (Facebook) custom event helpers.
 * The base pixel is loaded globally via index.html and analytics.ts.
 * Window.fbq is declared in analytics.ts — do not redeclare here.
 * These helpers fire standard events from React components.
 */

/**
 * Fire a standard Meta Pixel event.
 * @see https://developers.facebook.com/docs/meta-pixel/reference
 */
export function trackPixelEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window !== "undefined" && window.fbq) {
    if (params) {
      window.fbq("track", eventName, params);
    } else {
      window.fbq("track", eventName);
    }
  }
}

/** Fire 'Lead' event — use on quiz submissions and waitlist signups */
export function trackPixelLead(params?: {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
}) {
  trackPixelEvent("Lead", params);
}

/** Fire 'InitiateCheckout' — use on pricing page CTA clicks */
export function trackPixelInitiateCheckout(params?: {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
  num_items?: number;
}) {
  trackPixelEvent("InitiateCheckout", params);
}
