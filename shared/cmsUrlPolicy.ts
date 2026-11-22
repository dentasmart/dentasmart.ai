/**
 * CMS URL paths are editorial proposals until a route is owned by the CMS
 * publisher. Never create a 301 redirect to an unpublished/private draft.
 */
export const CMS_PATH_MAX_LENGTH = 500;
export function isValidCmsPublicPath(value: string): boolean {
  return value.length > 0 && value.length <= CMS_PATH_MAX_LENGTH &&
    /^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*\/)*[a-z0-9]+(?:-[a-z0-9]+)*\/?$/.test(value);
}
export function cmsUrlTransition(current: string, proposed: string | undefined, cmsOwnsPublicRoute: boolean) {
  if (!proposed || proposed === current) return { changed: false, ready: true, requiresRedirect: false };
  if (!isValidCmsPublicPath(proposed)) return { changed: true, ready: false, requiresRedirect: false };
  return {
    changed: true,
    ready: cmsOwnsPublicRoute,
    requiresRedirect: cmsOwnsPublicRoute,
  };
}
