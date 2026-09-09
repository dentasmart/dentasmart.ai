import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { app, brand, pricing, productTerminology } from "../shared/facts";

const projectFile = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

const phase5PublicSources = [
  "client/src/pages/Home.tsx",
  "client/src/pages/Pricing.tsx",
  "client/src/pages/Download.tsx",
  "client/src/pages/Features.tsx",
  "client/src/pages/HowItWorks.tsx",
  "client/src/pages/Team.tsx",
  "client/src/pages/Employers.tsx",
  "client/src/pages/FAQs.tsx",
  "client/src/pages/Stories.tsx",
  "client/src/pages/Answers.tsx",
  "client/src/pages/InstantScan.tsx",
  "client/src/pages/OralHealthHub.tsx",
  "client/src/pages/BestAiDentalApps.tsx",
  "client/src/pages/FreeAiTeethScanner.tsx",
  "client/src/pages/VsDentalCom.tsx",
  "client/src/pages/VsDentistryOne.tsx",
  "client/src/pages/conditions/ConditionsIndex.tsx",
  "client/src/pages/symptoms/SymptomsIndex.tsx",
  "client/src/pages/guides/ConditionsHub.tsx",
  "client/src/pages/guides/SymptomsHub.tsx",
  "client/src/pages/treatments/TreatmentsHub.tsx",
  "client/src/pages/dental-costs/DentalCostsHub.tsx",
  "client/src/pages/comparisons/ComparisonsHub.tsx",
  "client/src/pages/comparisons/ComparisonPageTemplate.tsx",
  "server/seo.ts",
].map(projectFile).join("\n");

describe("Phase 5 verified product truth", () => {
  it("keeps the stable product terminology and approved tagline in the central facts registry", () => {
    expect(brand.tagline).toBe("Your Personal AI Dentist in Your Pocket");
    expect(brand.aiPersonaName).toBe("Dr. Din");
    expect(productTerminology).toEqual({
      dentaSmart: "DentaSmart",
      quickCheck: "Free Quick Check",
      fullQuickCheck: "Full Quick Check",
      treatmentPlanReview: "Treatment Plan Review",
      secondOpinion: "Treatment Plan Review",
      completeCare: "Complete Care",
      oralHealthScore: "Oral Health Score",
      drDin: "Dr. Din",
      family: "Family",
    });
  });

  it("standardizes Dr. Din without adding a 24/7 dentist implication", () => {
    expect(phase5PublicSources).toContain("Dr. Din");
    expect(phase5PublicSources).not.toMatch(/\bDr Din\b/);
    expect(phase5PublicSources).not.toMatch(/24\/7 (Dr\.? Din|Personal AI Dentist)/i);
    expect(projectFile("server/seo.ts")).not.toMatch(/ChatGPT provides|Teledentistry requires|Traditional dental insurance costs/i);
  });

  it("keeps verified prices, family limits, availability, and store destinations unchanged", () => {
    expect(pricing.quickCheck.price).toBe(0);
    expect(pricing.fullQuickCheck.price).toBe(19.99);
    expect(pricing.treatmentPlanReview.price).toBe(29.99);
    expect(pricing.completeCareIndividual.price).toBe(74.99);
    expect(pricing.completeCareFamily.price).toBe(149.99);
    expect(pricing.completeCareFamily.maxMembers).toBe(4);
    expect(app.iosAvailability).toBe("live");
    expect(app.androidAvailability).toBe("live");
    expect(app.iosUrl).toContain("id6670311232");
    expect(app.androidUrl).toContain("com.dentaSmart.app.android");
  });

  it("states on Home that DentaSmart does not diagnose or replace a licensed dentist", () => {
    const home = projectFile("client/src/pages/Home.tsx");

    expect(home).toContain("does not diagnose conditions, replace routine dental exams");
    expect(home).not.toContain("Yes. DentaSmart can analyze your symptoms");
    expect(home).not.toContain("you do not need to visit a dentist");
  });

  it("does not promise universal licensed review or fixed human-review turnaround", () => {
    const pricingPage = projectFile("client/src/pages/Pricing.tsx");
    const faqPage = projectFile("client/src/pages/FAQs.tsx");

    expect(`${pricingPage}\n${faqPage}`).not.toMatch(/reviewed and approved by a licensed dentist/i);
    expect(`${pricingPage}\n${faqPage}`).not.toMatch(/licensed dentist review[^\n]*(24|48) hours/i);
  });
});

describe("Phase 5 conversion and trust contracts", () => {
  it("keeps free wording tied to the symptom quiz and unlimited Free Quick Check", () => {
    const pricingPage = projectFile("client/src/pages/Pricing.tsx");

    expect(pricingPage).toContain("Free Quick Check is unlimited");
    expect(pricingPage).toMatch(/Full Quick Check.{0,120}(paid|\$19\.99|per case)/is);
    expect(phase5PublicSources).not.toMatch(/completely free/i);
    expect(phase5PublicSources).toContain("free symptom quiz");
    expect(projectFile("server/seo.ts")).toContain("Free Quick Check is unlimited");
    expect(projectFile("server/seo.ts")).toContain("Full Quick Check is $19.99 per case");
  });

  it("keeps symptom escalation clear without fixed dental-appointment timing", () => {
    const symptomsHub = projectFile("client/src/pages/guides/SymptomsHub.tsx");

    expect(symptomsHub).toContain("Seek urgent professional care");
    expect(symptomsHub).toContain("Arrange a dental appointment promptly");
    expect(symptomsHub).not.toMatch(/(book|see a dentist) within a few days/i);
  });

  it("removes unverifiable testimonials, rating proof, and employer outcome claims from active conversion surfaces", () => {
    const trustSources = [
      "client/src/pages/Home.tsx",
      "client/src/pages/Download.tsx",
      "client/src/pages/Stories.tsx",
      "client/src/pages/Employers.tsx",
      "client/src/components/ExitIntentPopup.tsx",
      "client/src/components/StickyDownloadBanner.tsx",
      "client/src/components/ValueComparisonTable.tsx",
    ].map(projectFile).join("\n");

    expect(trustSources).not.toMatch(/50,?000\+|50K\+|4\.9\/5|12,000 employers|\$400 per employee/i);
    expect(trustSources).not.toContain("TestimonialsCarousel");
    expect(projectFile("client/src/pages/Stories.tsx")).toContain("product-use examples, not customer testimonials");
  });

  it("removes final false-free, diagnostic, timing, savings, and universal-review claims from active utility routes", () => {
    const instantScan = projectFile("client/src/pages/InstantScan.tsx");
    const answers = projectFile("client/src/pages/Answers.tsx");
    const navigation = projectFile("client/src/components/Navigation.tsx");
    const metadata = projectFile("server/metaTags.ts");
    const resourceHubs = `${projectFile("client/src/pages/guides/SymptomsHub.tsx")}\n${projectFile("client/src/pages/treatments/TreatmentsHub.tsx")}`;

    expect(instantScan).not.toMatch(/first scan is free|start my free scan|free first scan|every analysis is reviewed|under 10 minutes|detect cavities|100% private/i);
    expect(answers).not.toMatch(/detect early signs|reliable initial assessment|cost estimates specific|personalized assessment|helps you triage|provides cost estimates/i);
    expect(navigation).not.toMatch(/free AI dental assessment|free AI symptom checker/i);
    expect(resourceHubs).not.toMatch(/30-50% lower|save you 10-60%|figure out how urgent/i);
    expect(metadata).not.toMatch(/get instant answers|oral health in minutes|personalized insights about your oral health/i);
  });

  it("keeps high-fan-out templates free of fixed timing, false-free services, and savings guarantees", () => {
    const highFanoutSources = [
      "client/src/pages/HubCategory.tsx",
      "client/src/components/OralHealthScoreTeaser.tsx",
      "client/src/pages/dental-costs/CostPageTemplate.tsx",
      "client/src/pages/treatments/TreatmentPageTemplate.tsx",
      "client/src/pages/dental-emergencies/DentalEmergenciesHub.tsx",
      "client/src/pages/dental-emergencies/EmergencyPageTemplate.tsx",
      "client/src/pages/life-stages/AgeSpecificTemplate.tsx",
      "client/src/pages/life-stages/LifeStagesHub.tsx",
      "client/src/pages/lifestyle/LifestyleHub.tsx",
      "client/src/pages/lifestyle/LifestyleTemplate.tsx",
      "client/src/pages/guides/AffordabilityHub.tsx",
      "client/src/pages/guides/PreventionHub.tsx",
      "client/src/data/hubCategories.ts",
      "client/src/pages/ComparePage.tsx",
      "client/src/pages/DentaSmartVsChatGPT.tsx",
    ].map(projectFile).join("\n");

    expect(highFanoutSources).not.toMatch(/free AI assessment|free AI oral health score|first free scan|results in 2 min|under 2 minutes|clarity in minutes/i);
    expect(highFanoutSources).not.toMatch(/save you thousands|insurance can save you thousands|guaranteed savings|helps you save on .* costs/i);
    expect(highFanoutSources).not.toMatch(/24\/7 Personal AI Dentist/i);
  });

  it("keeps the free symptom quiz educational rather than diagnostic or triage-directed", () => {
    const symptomQuiz = projectFile("client/src/pages/SymptomQuiz.tsx");
    const quizData = projectFile("client/src/lib/quizData.ts");

    expect(symptomQuiz).toContain("Free Dental Symptom Checker");
    expect(symptomQuiz).toContain("does not diagnose or determine urgency");
    expect(symptomQuiz).not.toMatch(/personalized risk assessment|matched conditions & recommendations|takes less than 2 minutes/i);
    expect(quizData).toContain("This quiz cannot diagnose the cause or determine urgency");
    expect(quizData).not.toMatch(/AI-powered second opinion|within the next 1-2 weeks|No immediate concerns/i);
  });

  it("honors contextual Wouter destinations instead of forcing shared CTAs to Download", () => {
    const sharedCtas = [
      "client/src/components/StickyDownloadBanner.tsx",
      "client/src/components/ScrollProgressCTA.tsx",
      "client/src/components/MidContentCTA.tsx",
      "client/src/components/NextStepsBox.tsx",
    ].map(projectFile).join("\n");

    expect(sharedCtas).toContain("href={context.ctaLink}");
    expect(sharedCtas).toContain("href={resolvedContext.ctaLink}");
    expect(sharedCtas).not.toContain('window.location.href = "/download"');
  });

  it("keeps one low-cardinality event for each approved new conversion decision and preserves the employer lead form", () => {
    const analytics = projectFile("client/src/lib/analytics.ts");
    const demoModal = projectFile("client/src/components/DemoRequestModal.tsx");

    expect(analytics).toContain('| "home_intent_click"');
    expect(analytics).toContain('| "pricing_plan_select"');
    expect(analytics).toContain('| "employer_demo_request"');
    expect(demoModal).toContain('id="fullName"');
    expect(demoModal).toContain('id="email"');
    expect(demoModal).toContain('id="phone"');
    expect(demoModal).toContain('id="employeeCount"');
    expect(demoModal).toContain('id="notes"');
    expect(demoModal).toContain("handleSubmit");
    expect(demoModal).not.toContain("demoEmailHref");
  });

  it("submits employer demos through the established Benefits lead mutation and never shows simulated success", () => {
    const demoModal = projectFile("client/src/components/DemoRequestModal.tsx");
    const waitlistRouter = projectFile("server/waitlistRouter.ts");

    expect(demoModal).toContain("trpc.waitlist.joinBenefits.useMutation");
    expect(demoModal).toContain('trackEvent("employer_demo_request", { source: "employers_page" })');
    expect(demoModal).toContain("onSuccess: () => {");
    expect(demoModal).toContain("setIsSuccess(true)");
    expect(demoModal).toContain("onError: () => {");
    expect(demoModal).toContain("We could not send your demo request. Please try again.");
    expect(demoModal).toContain("Try Again");
    expect(demoModal).not.toMatch(/new Promise\(resolve\s*=>\s*setTimeout|Request Received!.*setTimeout/s);
    expect(demoModal).not.toMatch(/trackEvent\([^)]*(fullName|email|phone|employeeCount|notes)/s);
    expect(waitlistRouter).toContain('code: "SERVICE_UNAVAILABLE"');
    expect(waitlistRouter).toContain("The benefits request service is temporarily unavailable. Please try again.");
  });

  it("keeps audited mobile navigation, Home decisions, store links, and FAQ filters touch-sized", () => {
    const navigation = projectFile("client/src/components/Navigation.tsx");
    const home = projectFile("client/src/pages/Home.tsx");
    const faqs = projectFile("client/src/pages/FAQs.tsx");

    expect(navigation).toContain("lg:hidden min-h-11 min-w-11 p-2");
    expect(home).toContain("min-h-11 bg-action");
    expect(home.match(/inline-flex min-h-11 min-w-11 items-center justify-center/g)?.length).toBeGreaterThanOrEqual(2);
    expect(faqs.match(/className={`min-h-11 rounded-full px-6/g)).toHaveLength(2);
  });

  it("keeps the lower iOS Download CTA as one tracked anchor control", () => {
    const download = projectFile("client/src/pages/Download.tsx");

    expect(download).toMatch(/<Button\s+asChild\s+size="lg"[\s\S]*?<a\s+href=\{getAppStoreUrl\("download_page_bottom"\)\}[\s\S]*?target="_blank"[\s\S]*?rel="noopener noreferrer"[\s\S]*?trackAppDownload\("ios", "download_page_bottom"\)[\s\S]*?Download DentaSmart Free[\s\S]*?<\/a>[\s\S]*?<\/Button>/);
    expect(download).not.toMatch(/<a[\s\S]*?<Button[\s\S]*?Download DentaSmart Free[\s\S]*?<\/Button>[\s\S]*?<\/a>/);
  });
});

describe("Phase 5 visible, metadata, and schema parity", () => {
  it("keeps Home intent links mapped to the verified free-entry route and legacy-compatible Treatment Plan Review anchor", () => {
    const home = projectFile("client/src/pages/Home.tsx");
    const comparison = projectFile("client/src/pages/DentaSmartVsChatGPT.tsx");
    const pricingPage = projectFile("client/src/pages/Pricing.tsx");

    expect(home).toContain('intent === "quick_check" ? "/download/"');
    expect(home).toContain('"/pricing/#second-opinion"');
    expect(comparison).toContain('href="/download/"');
    expect(comparison).toContain('href="/pricing/#second-opinion"');
    expect(comparison).not.toContain("scrollToDownload");
    expect(pricingPage).toContain('id="quick-check"');
    expect(pricingPage).toContain('id="second-opinion"');
  });

  it("keeps the visible How It Works page, server HowTo schema, metadata, and crawler content at four steps", () => {
    const page = projectFile("client/src/pages/HowItWorks.tsx");
    const schema = projectFile("shared/schemaOwnership.ts");
    const metadata = projectFile("server/metaTags.ts");
    const crawler = projectFile("server/ssrContent.ts");
    const pricingPage = projectFile("client/src/pages/Pricing.tsx");

    expect(page).toContain("Step 1: Capture");
    expect(page).toContain("Step 2: Analyze");
    expect(page).toContain("Step 3: Understand");
    expect(page).toContain("Step 4: Act");
    expect(schema.match(/"@type": "HowToStep"/g)).toHaveLength(4);
    expect(metadata).toContain("in 4 Steps");
    expect(crawler).toContain("Step 4: Prepare Questions and Monitor Records");
    expect(pricingPage).toContain("Four steps to organize dental information");
    expect(pricingPage).toContain('title: "Add your information"');
    expect(pricingPage).toContain('title: "DentaSmart reviews"');
    expect(pricingPage).toContain('title: "Review your educational report"');
    expect(pricingPage).toContain('title: "Prepare questions and monitor"');
    expect(pricingPage).not.toContain("Three simple steps to better oral health");
  });

  it("keeps FAQ rendering and FAQ JSON-LD sourced from the same filtered item collection", () => {
    const faqPage = projectFile("client/src/pages/FAQs.tsx");

    expect(faqPage).toContain("const schemaFaqs = allFaqs.map");
    expect(faqPage).toContain("<FAQSchema faqs={schemaFaqs}");
    expect(faqPage).toContain("displayCategories.map");
  });

  it("keeps global structured data educational and preserves all verified offer prices", () => {
    const schemas = `${projectFile("client/src/components/SEO.tsx")}\n${projectFile("client/src/components/StructuredData.tsx")}\n${projectFile("server/schemaMarkup.ts")}`;

    expect(schemas).toContain("It does not diagnose conditions or replace professional dental care");
    expect(schemas).not.toMatch(/24\/7 AI dentist/i);
    expect(schemas).toContain(pricing.fullQuickCheck.price.toString());
    expect(schemas).toContain(pricing.treatmentPlanReview.price.toString());
    expect(schemas).toContain(pricing.completeCareIndividual.price.toString());
    expect(schemas).toContain(pricing.completeCareFamily.price.toString());
  });
});
