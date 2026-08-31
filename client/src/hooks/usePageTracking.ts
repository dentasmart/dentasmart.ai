import { useEffect } from "react";
import { useLocation } from "wouter";
import { trackPageView } from "@/lib/analytics";
import { isEmailUnsubscribePath } from "@shared/privacyRoutes";

/**
 * Hook that fires a GA4 page_view event on every route change.
 * Place once in App.tsx or a top-level layout.
 */
export function usePageTracking() {
  const [location] = useLocation();

  useEffect(() => {
    if (isEmailUnsubscribePath(location)) return;
    trackPageView(location);
  }, [location]);
}
