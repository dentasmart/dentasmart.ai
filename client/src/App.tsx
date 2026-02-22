import { Toaster } from "@/components/ui/sonner";
import ScrollToTop from "@/components/ScrollToTop";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { usePageTracking } from "@/hooks/usePageTracking";
import { useEffect } from "react";
import { initGA4 } from "@/lib/analytics";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Employers from "./pages/Employers";
import Team from "@/pages/Team";
import OralHealthHub from "@/pages/OralHealthHub";
import Article from "@/pages/Article";
import FAQs from "@/pages/FAQs";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import Stories from "@/pages/Stories";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminBlogEditor from "@/pages/AdminBlogEditor";
import { lazy, Suspense } from "react";

// Lazy-loaded new pages
const Download = lazy(() => import("./pages/Download"));
const InstantScan = lazy(() => import("./pages/InstantScan"));
const PhotoGuide = lazy(() => import("./pages/PhotoGuide"));
const Answers = lazy(() => import("./pages/Answers"));
const ComparePage = lazy(() => import("./pages/ComparePage"));
const FindADentist = lazy(() => import("./pages/FindADentist"));
const HubCategory = lazy(() => import("./pages/HubCategory"));
const AdminSeoSetup = lazy(() => import("./pages/AdminSeoSetup"));
const AdminCategories = lazy(() => import("./pages/AdminCategories"));

// SEO content pages
const ConditionsIndex = lazy(() => import("./pages/conditions/ConditionsIndex"));
const ConditionPage = lazy(() => import("./pages/conditions/ConditionPage"));
const SymptomsIndex = lazy(() => import("./pages/symptoms/SymptomsIndex"));
const SymptomPage = lazy(() => import("./pages/symptoms/SymptomPage"));
const GuidesIndex = lazy(() => import("./pages/guides/GuidesIndex"));
const GuidePage = lazy(() => import("./pages/guides/GuidePage"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  );
}

function Router() {
  usePageTracking();

  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/how-it-works"} component={HowItWorks} />
        <Route path={"/features"} component={Features} />
        <Route path={"/pricing"} component={Pricing} />
        <Route path={"/employers"} component={Employers} />
        <Route path="/team" component={Team} />
        <Route path="/oral-health-hub" component={OralHealthHub} />
        <Route path="/oral-health-hub/:id" component={Article} />
        <Route path="/faqs" component={FAQs} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/stories" component={Stories} />

        {/* Conversion pages */}
        <Route path="/download" component={Download} />
        <Route path="/instant-scan" component={InstantScan} />
        <Route path="/photo-guide" component={PhotoGuide} />

        {/* Hub category pages */}
        <Route path="/hub" component={OralHealthHub} />
        <Route path="/hub/:category" component={HubCategory} />

        {/* Conditions, Symptoms, Guides (SEO content pages) */}
        <Route path="/conditions" component={ConditionsIndex} />
        <Route path="/conditions/:slug" component={ConditionPage} />
        <Route path="/symptoms" component={SymptomsIndex} />
        <Route path="/symptoms/:slug" component={SymptomPage} />
        <Route path="/guides" component={GuidesIndex} />
        <Route path="/guides/:slug" component={GuidePage} />

        {/* GEO pages */}
        <Route path="/answers" component={Answers} />
        <Route path="/compare/:slug" component={ComparePage} />
        <Route path="/find-a-dentist" component={FindADentist} />

        {/* Admin */}
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/new" component={AdminBlogEditor} />
        <Route path="/admin/edit/:id" component={AdminBlogEditor} />
        <Route path="/admin/seo-analytics-setup" component={AdminSeoSetup} />
        <Route path="/admin/categories" component={AdminCategories} />

        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  useEffect(() => {
    // Initialize GA4 if measurement ID is configured
    const ga4Id = (import.meta as any).env?.VITE_GA4_MEASUREMENT_ID;
    if (ga4Id) {
      initGA4(ga4Id);
    }
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
