import { Toaster } from "@/components/ui/sonner";
import ScrollToTop from "@/components/ScrollToTop";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { usePageTracking } from "@/hooks/usePageTracking";
import { useEffect } from "react";
import { initAllAnalytics } from "@/lib/analytics";
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
import { lazy, Suspense } from "react";
import AdminRouter, { useIsAdminRoute } from "@/components/AdminRouter";
import StickyDownloadBanner from "@/components/StickyDownloadBanner";
import ExitIntentPopup from "@/components/ExitIntentPopup";

// Lazy-loaded new pages
const Download = lazy(() => import("./pages/Download"));
const InstantScan = lazy(() => import("./pages/InstantScan"));
const PhotoGuide = lazy(() => import("./pages/PhotoGuide"));
const Answers = lazy(() => import("./pages/Answers"));
const ComparePage = lazy(() => import("./pages/ComparePage"));
const FindADentist = lazy(() => import("./pages/FindADentist"));
const HubCategory = lazy(() => import("./pages/HubCategory"));
const SymptomQuiz = lazy(() => import("./pages/SymptomQuiz"));


// SEO content pages
const ConditionsIndex = lazy(() => import("./pages/conditions/ConditionsIndex"));
const ConditionPage = lazy(() => import("./pages/conditions/ConditionPage"));
const SymptomsIndex = lazy(() => import("./pages/symptoms/SymptomsIndex"));
const SymptomPage = lazy(() => import("./pages/symptoms/SymptomPage"));
const GuidesIndex = lazy(() => import("./pages/guides/GuidesIndex"));
const GuidePage = lazy(() => import("./pages/guides/GuidePage"));
const AffordabilityHub = lazy(() => import("./pages/guides/AffordabilityHub"));
const SecondOpinionHub = lazy(() => import("./pages/guides/SecondOpinionHub"));
const PreventionHub = lazy(() => import("./pages/guides/PreventionHub"));
const ConditionsHub = lazy(() => import("./pages/guides/ConditionsHub"));
const SymptomsHub = lazy(() => import("./pages/guides/SymptomsHub"));

// Dental Cost Pages
const DentalCostsHub = lazy(() => import("./pages/dental-costs/DentalCostsHub"));
const RootCanalCostPage = lazy(() => import("./pages/dental-costs/RootCanalCost"));
const DentalImplantCostPage = lazy(() => import("./pages/dental-costs/DentalImplantCost"));
const BracesCostPage = lazy(() => import("./pages/dental-costs/BracesCost"));
const VeneersCostPage = lazy(() => import("./pages/dental-costs/VeneersCost"));
const WisdomTeethCostPage = lazy(() => import("./pages/dental-costs/WisdomTeethCost"));
const TeethWhiteningCostPage = lazy(() => import("./pages/dental-costs/TeethWhiteningCost"));
const DentalCrownCostPage = lazy(() => import("./pages/dental-costs/DentalCrownCost"));
const ToothExtractionCostPage = lazy(() => import("./pages/dental-costs/ToothExtractionCost"));
const DentalCleaningCostPage = lazy(() => import("./pages/dental-costs/DentalCleaningCost"));
const DenturesCostPage = lazy(() => import("./pages/dental-costs/DenturesCost"));

// Treatment Explainer Pages
const TreatmentsHub = lazy(() => import("./pages/treatments/TreatmentsHub"));
const RootCanalProcedure = lazy(() => import("./pages/treatments/RootCanalProcedure"));
const DentalImplantProcedure = lazy(() => import("./pages/treatments/DentalImplantProcedure"));
const WisdomTeethRemoval = lazy(() => import("./pages/treatments/WisdomTeethRemoval"));
const DentalCrownProcedure = lazy(() => import("./pages/treatments/DentalCrownProcedure"));
const BracesTreatment = lazy(() => import("./pages/treatments/BracesTreatment"));
const TeethWhiteningProcedure = lazy(() => import("./pages/treatments/TeethWhiteningProcedure"));
const ToothExtractionProcedure = lazy(() => import("./pages/treatments/ToothExtractionProcedure"));
const DentalCleaningProcedure = lazy(() => import("./pages/treatments/DentalCleaningProcedure"));
const VeneersProcedure = lazy(() => import("./pages/treatments/VeneersProcedure"));
const DenturesTreatment = lazy(() => import("./pages/treatments/DenturesTreatment"));

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
        {/* ===== STATIC PAGES ===== */}
        <Route path="/" component={Home} />
        <Route path="/how-it-works" component={HowItWorks} />
        <Route path="/features" component={Features} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/employers" component={Employers} />
        <Route path="/team" component={Team} />
        <Route path="/oral-health-hub" component={OralHealthHub} />
        <Route path="/faqs" component={FAQs} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/stories" component={Stories} />
        <Route path="/download" component={Download} />
        <Route path="/instant-scan" component={InstantScan} />
        <Route path="/photo-guide" component={PhotoGuide} />
        <Route path="/hub" component={OralHealthHub} />
        <Route path="/conditions" component={ConditionsIndex} />
        <Route path="/symptoms" component={SymptomsIndex} />
        <Route path="/guides" component={GuidesIndex} />
        <Route path="/answers" component={Answers} />
        <Route path="/find-a-dentist" component={FindADentist} />
        <Route path="/symptom-quiz" component={SymptomQuiz} />

        {/* ===== EXPLICIT CONDITION PAGES (for sitemap detection) ===== */}
        <Route path="/conditions/toothache" component={ConditionPage} />
        <Route path="/conditions/cavities" component={ConditionPage} />
        <Route path="/conditions/gum-disease" component={ConditionPage} />
        <Route path="/conditions/wisdom-teeth-pain" component={ConditionPage} />
        <Route path="/conditions/teeth-whitening" component={ConditionPage} />
        <Route path="/conditions/sensitive-teeth" component={ConditionPage} />
        <Route path="/conditions/cracked-tooth" component={ConditionPage} />
        <Route path="/conditions/dental-abscess" component={ConditionPage} />
        <Route path="/conditions/root-canal" component={ConditionPage} />
        <Route path="/conditions/dental-crown" component={ConditionPage} />
        <Route path="/conditions/teeth-grinding" component={ConditionPage} />
        <Route path="/conditions/dental-implants" component={ConditionPage} />
        <Route path="/conditions/dry-socket" component={ConditionPage} />
        <Route path="/conditions/oral-thrush" component={ConditionPage} />
        <Route path="/conditions/periodontitis" component={ConditionPage} />
        <Route path="/conditions/gingivitis-vs-periodontitis" component={ConditionPage} />
        <Route path="/conditions/tmj-disorder" component={ConditionPage} />

        {/* ===== EXPLICIT SYMPTOM PAGES (for sitemap detection) ===== */}
        <Route path="/symptoms/tooth-pain-when-biting" component={SymptomPage} />
        <Route path="/symptoms/bleeding-gums" component={SymptomPage} />
        <Route path="/symptoms/tooth-sensitivity" component={SymptomPage} />
        <Route path="/symptoms/jaw-pain" component={SymptomPage} />
        <Route path="/symptoms/bad-breath" component={SymptomPage} />
        <Route path="/symptoms/swollen-gums" component={SymptomPage} />
        <Route path="/symptoms/loose-tooth" component={SymptomPage} />
        <Route path="/symptoms/dry-mouth" component={SymptomPage} />
        <Route path="/symptoms/tooth-discoloration" component={SymptomPage} />
        <Route path="/symptoms/mouth-sores" component={SymptomPage} />
        <Route path="/symptoms/gum-bleeding-after-brushing" component={SymptomPage} />
        <Route path="/symptoms/mouth-ulcers" component={SymptomPage} />
        <Route path="/symptoms/canker-sores" component={SymptomPage} />
        <Route path="/symptoms/tongue-pain" component={SymptomPage} />
        <Route path="/symptoms/cheek-biting" component={SymptomPage} />
        <Route path="/symptoms/teeth-grinding" component={SymptomPage} />
        <Route path="/symptoms/jaw-clicking" component={SymptomPage} />
        <Route path="/symptoms/gum-itching" component={SymptomPage} />
        <Route path="/symptoms/tooth-staining" component={SymptomPage} />
        <Route path="/symptoms/enamel-erosion" component={SymptomPage} />
        <Route path="/symptoms/root-exposure" component={SymptomPage} />
        <Route path="/symptoms/gum-inflammation" component={SymptomPage} />
        <Route path="/symptoms/persistent-metallic-taste" component={SymptomPage} />
        <Route path="/symptoms/swollen-lymph-nodes-dental" component={SymptomPage} />
        <Route path="/symptoms/facial-swelling" component={SymptomPage} />
        <Route path="/symptoms/tooth-migration" component={SymptomPage} />
        <Route path="/symptoms/bite-changes" component={SymptomPage} />
        <Route path="/symptoms/mouth-numbness" component={SymptomPage} />
        <Route path="/symptoms/gum-tenderness" component={SymptomPage} />
        <Route path="/symptoms/tmj-disorder" component={SymptomPage} />
        <Route path="/symptoms/periodontal-disease" component={SymptomPage} />
        <Route path="/symptoms/gingivitis" component={SymptomPage} />
        <Route path="/symptoms/dental-caries" component={SymptomPage} />
        <Route path="/symptoms/enamel-hypersensitivity" component={SymptomPage} />
        <Route path="/symptoms/oral-thrush" component={SymptomPage} />
        <Route path="/symptoms/aphthous-ulcers" component={SymptomPage} />
        <Route path="/symptoms/leukoplakia" component={SymptomPage} />
        <Route path="/symptoms/oral-lichen-planus" component={SymptomPage} />

        {/* ===== HUB LANDING PAGES ===== */}
        <Route path="/oral-health-hub/affordability" component={AffordabilityHub} />
        <Route path="/oral-health-hub/second-opinion" component={SecondOpinionHub} />
        <Route path="/oral-health-hub/prevention" component={PreventionHub} />
        <Route path="/oral-health-hub/conditions" component={ConditionsHub} />
        <Route path="/oral-health-hub/symptoms" component={SymptomsHub} />
        {/* Legacy redirects for old hub URLs */}
        <Route path="/hub/affordability">{() => { window.location.replace('/oral-health-hub/affordability'); return null; }}</Route>
        <Route path="/hub/second-opinion">{() => { window.location.replace('/oral-health-hub/second-opinion'); return null; }}</Route>
        <Route path="/hub/prevention">{() => { window.location.replace('/oral-health-hub/prevention'); return null; }}</Route>

        {/* ===== EXPLICIT GUIDE PAGES (for sitemap detection) ===== */}
        <Route path="/guides/brushing-guide" component={GuidePage} />
        <Route path="/guides/flossing-guide" component={GuidePage} />
        <Route path="/guides/dental-visit-guide" component={GuidePage} />
        <Route path="/guides/affordable-dental-care" component={GuidePage} />
        <Route path="/guides/dental-insurance-alternatives" component={GuidePage} />
        <Route path="/guides/diy-dental-care" component={GuidePage} />
        <Route path="/guides/preventing-expensive-dental-problems" component={GuidePage} />
        <Route path="/guides/dental-emergencies-on-a-budget" component={GuidePage} />
        <Route path="/guides/when-to-get-dental-second-opinion" component={GuidePage} />
        <Route path="/guides/do-you-need-root-canal" component={GuidePage} />
        <Route path="/guides/crowns-vs-fillings" component={GuidePage} />
        <Route path="/guides/implants-vs-bridges" component={GuidePage} />
        <Route path="/guides/complete-oral-health-routine" component={GuidePage} />
        <Route path="/guides/how-to-prevent-cavities" component={GuidePage} />
        <Route path="/guides/gum-disease-prevention" component={GuidePage} />
        <Route path="/guides/natural-teeth-whitening" component={GuidePage} />
        <Route path="/guides/oral-health-life-stages" component={GuidePage} />

        {/* ===== EXPLICIT COMPARE PAGES (for sitemap detection) ===== */}
        <Route path="/compare/dentasmart-vs-chatgpt-dental" component={ComparePage} />
        <Route path="/compare/dentasmart-vs-teledentistry" component={ComparePage} />
        <Route path="/compare/dentasmart-vs-dental-insurance" component={ComparePage} />

        {/* ===== EXPLICIT HUB CATEGORY PAGES (for sitemap detection) ===== */}
        <Route path="/hub/understanding-dental-conditions" component={HubCategory} />
        <Route path="/hub/treatment-guides" component={HubCategory} />
        <Route path="/hub/prevention-tips" component={HubCategory} />
        <Route path="/hub/dental-technology" component={HubCategory} />
        <Route path="/hub/cost-and-insurance" component={HubCategory} />

        {/* ===== EXPLICIT BLOG POST PAGES (for sitemap detection) ===== */}
        <Route path="/oral-health-hub/dental-emergency-what-to-do" component={Article} />
        <Route path="/oral-health-hub/pregnancy-dental-health" component={Article} />
        <Route path="/oral-health-hub/brushing-teeth-prevent-dementia" component={Article} />
        <Route path="/oral-health-hub/electric-vs-manual-toothbrush" component={Article} />
        <Route path="/oral-health-hub/at-what-age-should-my-child-first-see-a-dentist" component={Article} />
        <Route path="/oral-health-hub/how-do-i-know-its-time-for-dental-implants" component={Article} />
        <Route path="/oral-health-hub/gums-hurt-when-flossing" component={Article} />
        <Route path="/oral-health-hub/swollen-gums-around-one-tooth" component={Article} />
        <Route path="/oral-health-hub/black-line-on-tooth" component={Article} />
        <Route path="/oral-health-hub/gum-boil" component={Article} />
        <Route path="/oral-health-hub/mouth-ulcer-not-healing" component={Article} />
        <Route path="/oral-health-hub/loose-tooth-adults" component={Article} />
        <Route path="/oral-health-hub/filling-feels-high-pain-biting" component={Article} />
        <Route path="/oral-health-hub/tooth-hurts-cold-water" component={Article} />
        <Route path="/oral-health-hub/crown-pain-sensitivity" component={Article} />
        <Route path="/oral-health-hub/bone-loss-dental-xray" component={Article} />
        <Route path="/oral-health-hub/teeth-grinding-bruxism" component={Article} />
        <Route path="/oral-health-hub/jaw-pain-tmj" component={Article} />
        <Route path="/oral-health-hub/canker-sore-vs-cold-sore" component={Article} />
        <Route path="/oral-health-hub/white-spots-on-teeth" component={Article} />
        <Route path="/oral-health-hub/root-canal-symptoms" component={Article} />
        <Route path="/oral-health-hub/bad-breath-halitosis" component={Article} />
        <Route path="/oral-health-hub/wisdom-tooth-pain" component={Article} />
        <Route path="/oral-health-hub/tooth-abscess-infection" component={Article} />
        <Route path="/oral-health-hub/cracked-tooth-symptoms" component={Article} />
        <Route path="/oral-health-hub/cavity-symptoms-tooth-decay" component={Article} />
        <Route path="/oral-health-hub/gum-recession" component={Article} />
        <Route path="/oral-health-hub/bleeding-gums" component={Article} />
        <Route path="/oral-health-hub/tooth-sensitivity-cold-hot" component={Article} />
        <Route path="/oral-health-hub/pain-when-biting-or-chewing" component={Article} />
        <Route path="/oral-health-hub/tooth-pain-toothache" component={Article} />
        <Route path="/oral-health-hub/how-can-ai-detect-a-cavity-in-my-dental-xray" component={Article} />
        <Route path="/oral-health-hub/maximize-benefits" component={Article} />
        <Route path="/oral-health-hub/employer-dental-plans" component={Article} />
        <Route path="/oral-health-hub/no-insurance-options" component={Article} />
        <Route path="/oral-health-hub/cosmetic-vs-necessary" component={Article} />
        <Route path="/oral-health-hub/pre-authorization" component={Article} />
        <Route path="/oral-health-hub/waiting-periods" component={Article} />
        <Route path="/oral-health-hub/in-network-confusion" component={Article} />
        <Route path="/oral-health-hub/insurance-limitations" component={Article} />
        <Route path="/oral-health-hub/denied-claims" component={Article} />
        <Route path="/oral-health-hub/misleading-insurance" component={Article} />
        <Route path="/oral-health-hub/enamel-erosion" component={Article} />
        <Route path="/oral-health-hub/missing-teeth" component={Article} />
        <Route path="/oral-health-hub/cracked-tooth" component={Article} />
        <Route path="/oral-health-hub/bad-breath" component={Article} />
        <Route path="/oral-health-hub/stained-teeth" component={Article} />
        <Route path="/oral-health-hub/teeth-grinding" component={Article} />
        <Route path="/oral-health-hub/wisdom-teeth-confusion" component={Article} />
        <Route path="/oral-health-hub/tooth-sensitivity" component={Article} />
        <Route path="/oral-health-hub/silent-gum-disease" component={Article} />
        <Route path="/oral-health-hub/undetected-cavities" component={Article} />
        <Route path="/oral-health-hub/choosing-right-dentist" component={Article} />
        <Route path="/oral-health-hub/communication-gap" component={Article} />
        <Route path="/oral-health-hub/preventive-care-gap" component={Article} />
        <Route path="/oral-health-hub/overtreatment-concerns" component={Article} />
        <Route path="/oral-health-hub/fear-of-dentist" component={Article} />
        <Route path="/oral-health-hub/cost-transparency" component={Article} />
        <Route path="/oral-health-hub/second-opinions" component={Article} />
        <Route path="/oral-health-hub/questioning-recommendations" component={Article} />
        <Route path="/oral-health-hub/rushed-decisions" component={Article} />
        <Route path="/oral-health-hub/unclear-diagnoses" component={Article} />
        <Route path="/oral-health-hub/why-your-dentist-might-be-recommending-unnecessary-procedures" component={Article} />
        <Route path="/oral-health-hub/the-hidden-cost-of-ignoring-dental-problems" component={Article} />
        <Route path="/oral-health-hub/10-questions-to-ask-your-dentist-before-any-procedure" component={Article} />

        {/* ===== DENTAL COST PAGES ===== */}
        <Route path="/dental-costs" component={DentalCostsHub} />
        <Route path="/dental-costs/root-canal-cost" component={RootCanalCostPage} />
        <Route path="/dental-costs/dental-implant-cost" component={DentalImplantCostPage} />
        <Route path="/dental-costs/braces-cost" component={BracesCostPage} />
        <Route path="/dental-costs/veneers-cost" component={VeneersCostPage} />
        <Route path="/dental-costs/wisdom-teeth-removal-cost" component={WisdomTeethCostPage} />
        <Route path="/dental-costs/teeth-whitening-cost" component={TeethWhiteningCostPage} />
        <Route path="/dental-costs/dental-crown-cost" component={DentalCrownCostPage} />
        <Route path="/dental-costs/tooth-extraction-cost" component={ToothExtractionCostPage} />
        <Route path="/dental-costs/dental-cleaning-cost" component={DentalCleaningCostPage} />
        <Route path="/dental-costs/dentures-cost" component={DenturesCostPage} />

        {/* ===== TREATMENT EXPLAINER PAGES ===== */}
        <Route path="/treatments" component={TreatmentsHub} />
        <Route path="/treatments/root-canal-procedure" component={RootCanalProcedure} />
        <Route path="/treatments/dental-implant-procedure" component={DentalImplantProcedure} />
        <Route path="/treatments/wisdom-teeth-removal" component={WisdomTeethRemoval} />
        <Route path="/treatments/dental-crown-procedure" component={DentalCrownProcedure} />
        <Route path="/treatments/braces-treatment" component={BracesTreatment} />
        <Route path="/treatments/teeth-whitening-procedure" component={TeethWhiteningProcedure} />
        <Route path="/treatments/tooth-extraction-procedure" component={ToothExtractionProcedure} />
        <Route path="/treatments/dental-cleaning-procedure" component={DentalCleaningProcedure} />
        <Route path="/treatments/veneers-procedure" component={VeneersProcedure} />
        <Route path="/treatments/dentures-treatment" component={DenturesTreatment} />

        {/* ===== DYNAMIC CATCH-ALL ROUTES (for new content not yet in explicit list) ===== */}
        <Route path="/oral-health-hub/:id" component={Article} />
        <Route path="/conditions/:slug" component={ConditionPage} />
        <Route path="/symptoms/:slug" component={SymptomPage} />
        <Route path="/guides/:slug" component={GuidePage} />
        <Route path="/hub/:category" component={HubCategory} />
        <Route path="/compare/:slug" component={ComparePage} />

        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function AppContent() {
  const isAdmin = useIsAdminRoute();

  return (
    <>
      <Toaster />
      <ScrollToTop />
      {isAdmin ? <AdminRouter /> : (
        <>
          <Router />
          <StickyDownloadBanner />
          <ExitIntentPopup />
        </>
      )}
    </>
  );
}

function App() {
  useEffect(() => {
    // Initialize GA4 tracking (reads VITE_GA4_MEASUREMENT_ID from env)
    initAllAnalytics();
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <AppContent />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
