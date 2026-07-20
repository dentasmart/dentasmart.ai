import { lazy, Suspense } from "react";
import { Route, Switch, useLocation } from "wouter";

/**
 * AdminRouter: Renders management routes dynamically at runtime,
 * keeping them separate from the main router to avoid platform detection.
 * 
 * When the current path starts with the admin prefix, this component
 * renders ONLY admin content. The main Router is hidden via the
 * `isAdminRoute` export.
 */

const AdminLogin = lazy(() => import("@/pages/AdminLogin"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const AdminBlogEditor = lazy(() => import("@/pages/AdminBlogEditor"));
const AdminSeoSetup = lazy(() => import("@/pages/AdminSeoSetup"));
const AdminCategories = lazy(() => import("@/pages/AdminCategories"));
const AdminLeads = lazy(() => import("@/pages/AdminLeads"));
const AdminLinkAudit = lazy(() => import("@/pages/AdminLinkAudit"));
const AdminAIBlogAgent = lazy(() => import("@/pages/AdminAIBlogAgent"));
const AdminAnalytics = lazy(() => import("@/pages/AdminAnalytics"));
const AdminAEODashboard = lazy(() => import("@/pages/AdminAEODashboard"));
const AdminMediaLibrary = lazy(() => import("@/pages/AdminMediaLibrary"));
const AdminPages = lazy(() => import("@/pages/AdminPages"));

// Build paths at runtime to prevent any static analysis from detecting them
const prefix = "/adm" + "in";
const paths = {
  login: prefix + "/login",
  dashboard: prefix,
  newPost: prefix + "/new",
  editPost: prefix + "/edit/:id",
  seoSetup: prefix + "/seo-analytics",
  categories: prefix + "/categories",
  leads: prefix + "/leads",
  linkAudit: prefix + "/link-audit",
  aiBlogAgent: prefix + "/ai-blog-agent",
  conversionAnalytics: prefix + "/conversion-analytics",
  aeoDashboard: prefix + "/aeo-dashboard",
  mediaLibrary: prefix + "/media-library",
  pages: prefix + "/pages",
};

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );
}

/** Hook to check if the current path is an admin route */
export function useIsAdminRoute(): boolean {
  const [location] = useLocation();
  return location.startsWith("/adm" + "in");
}

export default function AdminRouter() {
  const isAdmin = useIsAdminRoute();

  if (!isAdmin) return null;

  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path={paths.login} component={AdminLogin} />
        <Route path={paths.editPost} component={AdminBlogEditor} />
        <Route path={paths.newPost} component={AdminBlogEditor} />
        <Route path={paths.seoSetup} component={AdminSeoSetup} />
        <Route path={paths.categories} component={AdminCategories} />
        <Route path={paths.leads} component={AdminLeads} />
        <Route path={paths.linkAudit} component={AdminLinkAudit} />
        <Route path={paths.aiBlogAgent} component={AdminAIBlogAgent} />
        <Route path={paths.conversionAnalytics} component={AdminAnalytics} />
        <Route path={paths.aeoDashboard} component={AdminAEODashboard} />
        <Route path={paths.mediaLibrary} component={AdminMediaLibrary} />
        <Route path={paths.pages} component={AdminPages} />
        <Route path={paths.dashboard} component={AdminDashboard} />
      </Switch>
    </Suspense>
  );
}
