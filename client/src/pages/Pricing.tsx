import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "wouter";
import { Check, X, Shield, Sparkles, Zap, ArrowRight, Users } from "lucide-react";
import { DownloadSection } from "@/components/DownloadSection";
import { motion } from "framer-motion";
import { WaitlistPopup } from "@/components/WaitlistPopup";
import { trackConversionEvent } from "@/lib/analytics";
import QuickAnswerBlock from "@/components/QuickAnswerBlock";
import FAQSchema from "@/components/FAQSchema";
import { pricing } from "@shared/facts";

const pricingFaqs = [
  { question: "Can I use DentaSmart before paying?", answer: "Yes. Free Quick Check is unlimited and accepts supported mouth photos, supported X-rays, or both. Mouth photos do not require an X-ray. If you add X-rays, the free report shows a reduced subset of eligible finding data." },
  { question: "What does Free Quick Check include?", answer: "Free Quick Check organizes supported inputs into an educational report. Mouth photos can show visible photo-based findings. Supported X-rays receive a reduced subset of eligible X-ray finding data. DentaSmart does not provide a diagnosis or replace a dental examination." },
  { question: "What is Full Quick Check?", answer: `Full Quick Check costs ${pricing.fullQuickCheck.priceFormatted} per case and unlocks the paid Quick Check package, including full eligible X-ray insights for that case.` },
  { question: "When should I choose Treatment Plan Review?", answer: `Choose Treatment Plan Review (${pricing.treatmentPlanReview.priceFormatted} per case) when you have a dentist's treatment plan and want an educational plain-language review before deciding what to ask next.` },
  { question: "How do I manage my subscription?", answer: "Review the current billing, renewal, and cancellation terms during checkout or in your account before you purchase a paid plan." },
  { question: "What does the Complete Care Family plan cover?", answer: `The Complete Care Family plan is ${pricing.completeCareFamily.priceFormatted}/year for up to ${pricing.completeCareFamily.maxMembers} total members, including the primary user. Additional members beyond the included ${pricing.additionalFamilyMember.appliesAfterIncludedMembers} are ${pricing.additionalFamilyMember.priceFormatted}${pricing.additionalFamilyMember.billingLabel}.` },
];

export default function Pricing() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [planType, setPlanType] = useState<"individual" | "family">("individual");

  const beginCheckout = (planId: string, destination: string) => {
    trackConversionEvent("pricing_plan_selected", {
      cta_id: `pricing_${planId}_selected`,
      surface: "pricing_card",
      intent: "pricing",
      destination_type: "external_checkout",
    });
    trackConversionEvent("checkout_started", {
      cta_id: `pricing_${planId}_checkout_started`,
      surface: "pricing_card",
      intent: "checkout",
      destination_type: "external_checkout",
    });
    window.location.href = destination;
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-stone-200">
      <SEO
        title="DentaSmart Pricing | Free Quick Check, Full Quick Check & Complete Care"
        description="Compare unlimited Free Quick Check, Full Quick Check for $19.99 per case, Treatment Plan Review for $29.99 per case, and annual Complete Care plans."
        canonical="https://dentasmart.ai/pricing"
      />
      <Navigation />
      <FAQSchema faqs={pricingFaqs} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <picture>
            <source
              type="image/webp"
              srcSet="/images/optimized/oaONyntFCCtQKvAL-400.webp 400w, /images/optimized/oaONyntFCCtQKvAL-800.webp 800w, /images/optimized/oaONyntFCCtQKvAL-1600.webp 1600w"
              sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1600px"
            />
            <img
              src="/images/optimized/oaONyntFCCtQKvAL-800.webp"
              alt="Happy family smiling with healthy teeth"
              className="w-full h-full object-cover object-center"
              loading="eager"
              fetchPriority="high"
              width="1600" height="893" />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/60 md:hidden" />
        </div>

        <div className="container relative z-10 px-4 mx-auto max-w-7xl text-left pt-40 md:pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 xl:col-span-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-6 leading-[1.1]">
                Know what's happening <br />
                <span className="font-normal italic text-primary">before it costs you</span>.
              </h1>
              <p className="text-lg md:text-xl text-stone-700 font-normal max-w-2xl mr-auto leading-relaxed mb-8">
                Start with unlimited Free Quick Checks. Upgrade one case to Full Quick Check, review a treatment plan, or add year-round monitoring when you need it.
              </p>
              <p className="mb-5 text-sm leading-relaxed text-stone-600">
                Not sure which option fits your goal? <Link href="/stories/" className="font-medium text-action hover:underline">See examples of ways to use DentaSmart</Link>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <Button
                  size="lg"
                  className="bg-action text-action-foreground hover:bg-action-hover rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg border-0 cursor-pointer"
                  onClick={() => {
                    const el = document.getElementById('pricing-plans');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  See Plans
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/80 text-stone-700 hover:bg-white hover:text-primary border-stone-200 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    trackConversionEvent("download_hub_open", {
                      cta_id: "pricing_hero_download_app",
                      surface: "hero",
                      intent: "download",
                      destination_type: "internal_route",
                      destination_path: "/download/",
                    });
                    window.location.href = "/download/";
                  }}
                >
                  Download the App
                </Button>
              </div>
            </motion.div>

            <div className="hidden lg:block lg:col-span-5 xl:col-span-6"></div>
          </div>
        </div>
      </section>

      {/* Download and payment boundary */}
      <section className="py-6 bg-gradient-to-r from-primary/5 to-teal-50 border-y border-primary/10">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Sparkles className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-stone-700 text-base">
              <span className="font-semibold text-black">Free Quick Check is unlimited.</span> Use supported mouth photos, supported X-rays, or both. Full Quick Check unlocks full eligible X-ray insights for one case.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section id="pricing-plans" className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-3">
              Choose the right level of clarity
            </h2>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto mb-6">Start free, unlock one case when you need more detail, or monitor your records throughout the year.</p>

            {/* Individual / Family Toggle */}
            <div className="inline-flex items-center bg-stone-100 rounded-full p-1 border border-stone-200">
              <button
                onClick={() => setPlanType("individual")}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  planType === "individual"
                    ? "bg-action text-action-foreground shadow-md"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Individual
              </button>
              <button
                onClick={() => setPlanType("family")}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  planType === "family"
                    ? "bg-action text-action-foreground shadow-md"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  Family
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

            {/* Full Quick Check - $19.99 per case */}
            <motion.div
              id="quick-check"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="scroll-mt-32 bg-white rounded-3xl p-6 md:p-8 border border-stone-200 hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <h3 className="text-xl font-medium text-black">{pricing.fullQuickCheck.name}</h3>
                </div>
                <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">One-Time</p>
              </div>
              <div className="mb-5">
                <div className="flex items-baseline">
                  <span className="text-4xl font-light text-black">{pricing.fullQuickCheck.priceFormatted}</span>
                  <span className="text-stone-500 ml-2 text-sm">per case</span>
                </div>
                <p className="text-stone-600 mt-3 font-light leading-relaxed text-sm">
                  Unlock the paid Quick Check package and full eligible X-ray insights for one supported case.
                </p>
              </div>

              <div className="space-y-2.5 mb-6 flex-grow">
                {[
                  planType === "family" ? "One Full Quick Check for one family member's case" : "One Full Quick Check for one case",
                  "Use supported mouth photos, X-rays, or both",
                  "Visible concerns and key insights",
                  "Oral Health Score",
                  "Save or share a patient-friendly report",
                  "Dr. Din access for 30 days",
                  "Secure history storage",
                ].map((f, i) => (
                  <div key={i} className="flex items-start text-stone-700 font-light text-sm">
                    <Check className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full border-stone-300 text-stone-700 hover:bg-stone-50 hover:border-primary hover:text-primary rounded-full py-5 text-base font-medium transition-all duration-300 cursor-pointer"
                onClick={() => {
                  beginCheckout("full_quick_check", "https://subscription.dentasmart.ai/create-saas-account?plan=quick_check");
                }}
              >
                Get Full Quick Check
              </Button>
            </motion.div>

            {/* Treatment Plan Review - $29.99 per case */}
            <motion.div
              id="treatment-plan-review"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="scroll-mt-32 bg-white rounded-3xl p-6 md:p-8 border border-stone-200 hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              <span id="second-opinion" className="absolute -top-32" aria-hidden="true" />
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <h3 className="text-xl font-medium text-black">{pricing.treatmentPlanReview.name}</h3>
                </div>
                <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">Per Case</p>
              </div>
              <div className="mb-5">
                <div className="flex items-baseline">
                  <span className="text-4xl font-light text-black">{pricing.treatmentPlanReview.priceFormatted}</span>
                  <span className="text-stone-500 ml-2 text-sm">per case</span>
                </div>
                <p className="text-stone-600 mt-3 font-light leading-relaxed text-sm">
                  Upload a supported treatment plan and get an educational plain-language review before deciding what to ask next.
                </p>
              </div>

              <div className="space-y-2.5 mb-6 flex-grow">
                {[
                  planType === "family" ? "One Treatment Plan Review for one family member's case" : "One Treatment Plan Review for one case",
                  "Upload a supported dentist treatment plan",
                  "Review the plan in plain language",
                  "See questions and context to discuss next",
                  "Treatment Plan Review report",
                  "Plain-English explanations",
                  "Treatment option context with estimated cost ranges",
                  "Questions to bring back to your dentist",
                  "Shareable report",
                  "Secure storage in your dental history",
                ].map((f, i) => (
                  <div key={i} className="flex items-start text-stone-700 font-light text-sm">
                    <Check className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full border-stone-300 text-stone-700 hover:bg-stone-50 hover:border-primary hover:text-primary rounded-full py-5 text-base font-medium transition-all duration-300 cursor-pointer"
                onClick={() => {
                  beginCheckout("treatment_plan_review", "https://subscription.dentasmart.ai/create-saas-account?plan=second_review");
                }}
              >
                Get Treatment Plan Review
              </Button>
            </motion.div>

            {/* Complete Care - Annual — MOST POPULAR */}
            <motion.div
              id="complete-care"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="scroll-mt-32 bg-primary/5 rounded-3xl p-6 md:p-8 border-2 border-primary hover:shadow-2xl transition-all duration-500 flex flex-col relative ring-1 ring-primary/20"
            >
              <div className="mb-5 mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-medium text-black">Complete Care</h3>
                </div>
                <p className="text-primary text-xs font-bold uppercase tracking-widest">
                  {planType === "individual" ? "Year-Round" : "Family"}
                </p>
              </div>
              <div className="mb-5">
                <div className="flex items-baseline">
                  <span className="text-4xl font-light text-black">
                    {planType === "individual" ? "$74.99" : "$149.99"}
                  </span>
                  <span className="text-stone-500 ml-2 text-sm">/year</span>
                </div>
                {planType === "individual" ? (
                  <p className="text-sm text-stone-500 mt-1">Annual individual plan</p>
                ) : (
                  <p className="text-sm text-stone-500 mt-1">Up to 4 total members, including the primary user</p>
                )}
                <p className="text-stone-600 mt-3 font-light leading-relaxed text-sm">
                  {planType === "individual"
                    ? "Complete Care is an annual individual plan. Review current plan details before purchase."
                    : "Complete Care Family is an annual plan for up to 4 total members, including the primary user."
                  }
                </p>
              </div>

              <div className="space-y-2.5 mb-6 flex-grow">
                {planType === "individual" ? (
                  <>
                    {/* Included services */}
                    <div className="mb-3">
                      <p className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Plan details</p>
                      {[
                        { text: "Annual individual plan", bold: true },
                        { text: "Review current included features before purchase", bold: true },
                        { text: "DentaSmart provides educational information, not diagnosis or treatment", bold: true },
                      ].map((f, i) => (
                        <div key={i} className="flex items-start text-stone-700 text-sm mb-1.5">
                          <Check className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span className="font-semibold text-black">{f.text}</span>
                        </div>
                      ))}
                    </div>
                    {/* Annual-plan information */}
                    <div className="border-t border-stone-100 pt-3">
                      <p className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Before purchase</p>
                      {[
                        { text: "Review the price, current terms, and included features", bold: false },
                      ].map((f, i) => (
                        <div key={i} className="flex items-start text-stone-700 font-light text-sm mb-1.5">
                          <Check className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>{f.text}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Included services per member */}
                    <div className="mb-3">
                      <p className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Plan details</p>
                      {[
                        { text: "Annual family plan", bold: true },
                        { text: "Review current included features before purchase", bold: true },
                      ].map((f, i) => (
                        <div key={i} className="flex items-start text-stone-700 text-sm mb-1.5">
                          <Check className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span className="font-semibold text-black">{f.text}</span>
                        </div>
                      ))}
                    </div>
                    {/* Family management and other features */}
                    <div className="border-t border-stone-100 pt-3">
                      <p className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Family management</p>
                      {[
                        { text: "Up to 4 total members, including the primary user", bold: false },
                        { text: "Review the plan details and included features before purchase", bold: false },
                        { text: `Additional family members: ${pricing.additionalFamilyMember.priceFormatted}${pricing.additionalFamilyMember.billingLabel} after the included ${pricing.additionalFamilyMember.appliesAfterIncludedMembers}`, bold: false },
                        { text: "Annual plan", bold: false },
                      ].map((f, i) => (
                        <div key={i} className="flex items-start text-stone-700 font-light text-sm mb-1.5">
                          <Check className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>{f.text}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <Button
                className="w-full bg-action hover:bg-action-hover text-action-foreground rounded-full py-5 text-base font-medium transition-all duration-300 shadow-lg cursor-pointer"
                onClick={() => {
                  if (planType === "individual") {
                    beginCheckout("complete_care_individual", "https://subscription.dentasmart.ai/create-saas-account?plan=insights_individual_yearly");
                  } else {
                    beginCheckout("complete_care_family", "https://subscription.dentasmart.ai/create-saas-account?plan=insights_family_yearly");
                  }
                }}
              >
                {planType === "individual" ? "Choose Individual Plan" : "Choose Family Plan"}
              </Button>
              <p className="text-xs text-stone-400 text-center mt-2">Subscriptions managed through dentasmart.ai</p>
            </motion.div>

          </div>
        </div>
      </section>

      <WaitlistPopup isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />

      {/* Compare Plans */}
      <section className="py-6 bg-white">
        <div className="container px-4 mx-auto max-w-5xl">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-3">
              Compare plans
            </h2>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">See exactly what each plan includes so you can pick the right fit.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-stone-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px]">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50">
                    <th className="text-left py-4 px-4 w-[30%] font-semibold text-stone-700 sticky left-0 bg-stone-50 z-10 text-sm">Feature</th>
                    <th className="text-center py-4 px-3 w-[20%] font-semibold text-stone-700 text-sm">
                      <div>Full Quick Check</div>
                      <div className="text-xs font-normal text-stone-500 mt-0.5">$19.99</div>
                    </th>
                    <th className="text-center py-4 px-3 w-[22%] font-semibold text-stone-700 text-sm">
                      <div>Treatment Plan Review</div>
                      <div className="text-xs font-normal text-stone-500 mt-0.5">$29.99</div>
                    </th>
                    <th className="text-center py-4 px-3 w-[28%] font-semibold text-white bg-primary text-sm rounded-t-lg">
                      <div>Complete Care</div>
                      <div className="text-xs font-normal text-white/70 mt-0.5">
                        {planType === "individual" ? "$74.99/yr" : "$149.99/yr (family)"}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {[
                    { feature: "Price", quickCheck: `${pricing.fullQuickCheck.priceFormatted} per case`, secondOpinion: `${pricing.treatmentPlanReview.priceFormatted} per case`, complete: planType === "individual" ? `${pricing.completeCareIndividual.priceFormatted}/year` : `${pricing.completeCareFamily.priceFormatted}/year` },
                    { feature: "Purpose", quickCheck: "Full eligible X-ray insights for one supported case", secondOpinion: "Educational plain-language review of a supported dentist treatment plan", complete: "Annual plan. Review current details before purchase." },
                    ...(planType === "family" ? [{ feature: "Family capacity", quickCheck: "One case", secondOpinion: "One case", complete: `Up to ${pricing.completeCareFamily.maxMembers} total members; ${pricing.additionalFamilyMember.priceFormatted}/year each after included ${pricing.additionalFamilyMember.appliesAfterIncludedMembers}` }] : []),
                    { feature: "Professional-care boundary", quickCheck: "Does not diagnose", secondOpinion: "Does not determine treatment need", complete: "Does not diagnose or replace professional care" },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/50 transition-colors">
                      <td className="text-left py-3 px-4 font-medium text-stone-700 text-sm sticky left-0 bg-white z-10 border-r border-stone-100">{row.feature}</td>
                      <td className="text-center py-3 px-3">
                        {typeof row.quickCheck === 'boolean' ? (
                          row.quickCheck ? <Check className="w-5 h-5 text-primary mx-auto" /> : <X className="w-5 h-5 text-stone-300 mx-auto" />
                        ) : (
                          <span className="text-sm text-stone-600">{row.quickCheck}</span>
                        )}
                      </td>
                      <td className="text-center py-3 px-3">
                        {typeof row.secondOpinion === 'boolean' ? (
                          row.secondOpinion ? <Check className="w-5 h-5 text-primary mx-auto" /> : <X className="w-5 h-5 text-stone-300 mx-auto" />
                        ) : (
                          <span className="text-sm text-stone-600">{row.secondOpinion}</span>
                        )}
                      </td>
                      <td className="text-center py-3 px-3 bg-primary/5">
                        {typeof row.complete === 'boolean' ? (
                          row.complete ? <Check className="w-5 h-5 text-primary mx-auto" /> : <X className="w-5 h-5 text-stone-300 mx-auto" />
                        ) : (
                          <span className="text-sm text-stone-700 font-medium">{row.complete}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-6 bg-stone-50">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="text-center mb-5">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-3">
              How a DentaSmart service works
            </h2>
            <p className="text-stone-500 text-lg">Four steps to organize dental information and prepare for professional care</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Add your information",
                desc: "Download DentaSmart, create your account, and take supported mouth photos for a free Quick Check. No X-ray is required.",
              },
              {
                step: "2",
                title: "DentaSmart reviews",
                desc: "Choose Full Quick Check, Treatment Plan Review, or Complete Care only when you need those services. Prices and included features are shown before purchase.",
              },
              {
                step: "3",
                title: "Review your educational report",
                desc: "Review the plain-language report and educational observations included with your selected service. DentaSmart does not provide a diagnosis.",
              },
              {
                step: "4",
                title: "Prepare questions and monitor",
                desc: "Use the report to prepare questions for a dentist and organize your oral health records over time when your selected service includes monitoring.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="bg-white rounded-2xl p-6 border border-stone-200 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mx-auto mb-4 text-lg">
                  {item.step}
                </div>
                <h3 className="text-lg font-medium text-black mb-2">{item.title}</h3>
                <p className="text-stone-600 text-sm font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Answer Block for AEO */}
      <section className="py-6 bg-white">
        <div className="container px-4 mx-auto max-w-3xl">
          <QuickAnswerBlock
            question="How much does DentaSmart cost?"
            answer={`Free Quick Check is unlimited. Full Quick Check is ${pricing.fullQuickCheck.priceFormatted} per case, Treatment Plan Review is ${pricing.treatmentPlanReview.priceFormatted} per case, and Complete Care is ${pricing.completeCareIndividual.priceFormatted}/year for individuals or ${pricing.completeCareFamily.priceFormatted}/year for up to ${pricing.completeCareFamily.maxMembers} total family members. Additional members are ${pricing.additionalFamilyMember.priceFormatted}${pricing.additionalFamilyMember.billingLabel} after the included ${pricing.additionalFamilyMember.appliesAfterIncludedMembers}.`}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-6 bg-white">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-light text-black mb-6 text-center">
            Common questions
          </h2>
          <div className="space-y-4">
            {pricingFaqs.map((item, idx) => (
              <details key={idx} className="group bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer text-black font-medium text-sm hover:bg-stone-100 transition-colors">
                  {item.question}
                  <ArrowRight className="w-4 h-4 text-stone-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-3" />
                </summary>
                <div className="px-5 pb-5 text-stone-600 text-sm font-light leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <DownloadSection />

      <Footer />
    </div>
  );
}
