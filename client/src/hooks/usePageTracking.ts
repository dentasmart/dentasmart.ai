import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { beginRouteView } from "@/lib/analytics";
import { isEmailUnsubscribePath } from "@shared/privacyRoutes";

/**
 * Hook that fires a GA4 page_view event on every route change.
 * Place once in App.tsx or a top-level layout.
 */
export function usePageTracking() {
  const [location] = useLocation();
  const lastLocation = useRef<string | null>(null);

  useEffect(() => {
    if (isEmailUnsubscribePath(location)) return;
    if (lastLocation.current === location) return;
    lastLocation.current = location;
    beginRouteView(location);
  }, [location]);
}
