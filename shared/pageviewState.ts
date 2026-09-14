export type PageviewChannel = "analytics" | "marketing";

/**
 * Keeps delivery scoped to a logical route view rather than to a pathname for
 * the entire browser session. This permits valid back/forward revisits while
 * avoiding duplicate category delivery from the route and consent layers.
 */
export function createPageviewDeliveryState() {
  let currentViewId = 0;
  const delivered = new Set<string>();

  const startRouteView = (): number => {
    currentViewId += 1;
    return currentViewId;
  };

  const currentOrStartRouteView = (): number => currentViewId || startRouteView();

  const claim = (viewId: number, channel: PageviewChannel): boolean => {
    const key = `${viewId}|${channel}`;
    if (delivered.has(key)) return false;
    delivered.add(key);
    return true;
  };

  const resetChannel = (channel: PageviewChannel): void => {
    for (const key of Array.from(delivered)) {
      if (key.endsWith(`|${channel}`)) delivered.delete(key);
    }
  };

  return { startRouteView, currentOrStartRouteView, claim, resetChannel };
}
