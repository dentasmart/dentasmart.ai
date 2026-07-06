import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check, X, Shield, Sparkles, Zap, ArrowRight, Users } from "lucide-react";
import { DownloadSection } from "@/components/DownloadSection";
import { motion } from "framer-motion";
import { WaitlistPopup } from "@/components/WaitlistPopup";
import { trackPixelInitiateCheckout } from "@/lib/fbpixel";
import QuickAnswerBlock from "@/components/QuickAnswerBlock";
import FAQSchema from "@/components/FAQSchema";
import { ProductServiceSchema, BreadcrumbSchema } from "@/components/StructuredData";

export default function Pricing() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [planType, setPlanType] = useState<"individual" | "family">("individual");

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-stone-200">
      <SEO
        title="Simple, Transparent Pricing"
        description="DentaSmart offers affordable dental care plans. Quick Check at $19.99, Second Opinion at $29.99, Complete Care at $74.99/year (individual) or $149.99/year (family up to 4 members)."
        canonical="https://dentasmart.ai/pricing"
      />
      <Navigation />
      <ProductServiceSchema />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Pricing", url: "/pricing" }
      ]} />
      <FAQSchema faqs={[
        { question: "How much does DentaSmart cost?", answer: "DentaSmart offers three plans: Quick Check at $19.99 (one-time fast scan), Second Opinion at $29.99 (one-time deep analysis), and Complete Care at $74.99/year for individuals or $149.99/year for families (up to 4 members). All subscriptions are managed through dentasmart.ai." },
        { question: "Can I try DentaSmart before paying?", answer: "Yes. Download the app and scan your teeth for free. You will see a preview of your results. When you are ready for the full analysis, choose the plan that fits your needs through dentasmart.ai." },
        { question: "What is the difference between Quick Check and Complete Care?", answer: "Quick Check is a one-time fast scan that gives you an instant overview of your oral health with key findings. Complete Care gives you year-round unlimited access to Quick Check, Second Opinion, and Complete Oral Health Checkup services, plus progress tracking, personalized recommendations, and ongoing AI guidance." },
        { question: "What does Second Opinion include?", answer: "Second Opinion is a one-time deep analysis where you upload your dentist's treatment plan and get an independent AI comparison with cost estimates, alternative options, and a printable report." },
        { question: "What does the Complete Care Family plan include?", answer: "The Complete Care Family plan ($149.99/year) includes up to 4 family members (including the main user). Each member gets unlimited access to all services with individual profiles, separate reports, and individual dental history management. Additional family members can be added for $19.99/year each." },
        { question: "Are the results reviewed by real dentists?", answer: "Yes. Every analysis is reviewed and approved by licensed dentists before it reaches you." },
        { question: "How do I manage my subscription?", answer: "All subscriptions are managed through dentasmart.ai, not through the app stores. This keeps things simple and gives you full control over your plan." }
      ]} />

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
              loading="lazy"
              width="1600" height="893"/>
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
                Peace of mind for less than <br />
                <span className="font-normal italic text-primary">a single filling</span>.
              </h1>
              <p className="text-lg md:text-xl text-stone-700 font-normal max-w-2xl mr-auto leading-relaxed mb-8">
                Stop worrying about surprise dental bills. Get year-round monitoring and expert guidance for a simple, transparent price.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <Button 
                  size="lg" 
                  className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg border-0 cursor-pointer"
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
                  onClick={() => window.location.href = '/#download-cta'}
                >
                  Try Free Analysis
                </Button>
              </div>
            </motion.div>

            <div className="hidden lg:block lg:col-span-5 xl:col-span-6"></div>
          </div>
        </div>
      </section>

      {/* Free Start Banner */}
      <section className="py-6 bg-gradient-to-r from-primary/5 to-teal-50 border-y border-primary/10">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Sparkles className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-stone-700 text-base">
              <span className="font-semibold text-black">Start free.</span> Download the app and scan your teeth at no cost. Every plan includes guided self-examination and two report formats (one for you, one for your dentist).
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section id="pricing-plans" className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-3">
              Choose the right plan for you
            </h2>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto mb-6">From a quick scan to year-round coverage. Pick what fits your needs.</p>
            
            {/* Individual / Family Toggle */}
            <div className="inline-flex items-center bg-stone-100 rounded-full p-1 border border-stone-200">
              <button
                onClick={() => setPlanType("individual")}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  planType === "individual"
                    ? "bg-primary text-white shadow-md"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Individual
              </button>
              <button
                onClick={() => setPlanType("family")}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  planType === "family"
                    ? "bg-primary text-white shadow-md"
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
            
            {/* Quick Check - $19.99 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <h3 className="text-xl font-medium text-black">Quick Check</h3>
                </div>
                <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">One-Time</p>
              </div>
              <div className="mb-5">
                <div className="flex items-baseline">
                  <span className="text-4xl font-light text-black">$19.99</span>
                  <span className="text-stone-500 ml-2 text-sm">one-time</span>
                </div>
                <p className="text-stone-600 mt-3 font-light leading-relaxed text-sm">
                  A fast AI scan of your teeth or X-rays. Get an instant overview with key findings in minutes.
                </p>
              </div>

              <div className="space-y-2.5 mb-6 flex-grow">
                {[
                  "One mouth scan or X-ray analysis",
                  "Guided self-examination included",
                  "Oral health score",
                  "Key areas of concern highlighted",
                  "Patient + dentist report versions",
                  "Basic care recommendations",
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
                  trackPixelInitiateCheckout({ content_name: "Quick Check", content_category: "pricing", value: 19.99, currency: "USD" });
                  window.location.href = 'https://subscription.dentasmart.ai/create-saas-account?plan=quick_check';
                }}
              >
                Get Quick Check
              </Button>
            </motion.div>

            {/* Second Opinion - $29.99 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <h3 className="text-xl font-medium text-black">Second Opinion</h3>
                </div>
                <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">One-Time</p>
              </div>
              <div className="mb-5">
                <div className="flex items-baseline">
                  <span className="text-4xl font-light text-black">$29.99</span>
                  <span className="text-stone-500 ml-2 text-sm">one-time</span>
                </div>
                <p className="text-stone-600 mt-3 font-light leading-relaxed text-sm">
                  Upload your dentist's treatment plan. Get an independent AI comparison so you can decide with confidence.
                </p>
              </div>

              <div className="space-y-2.5 mb-6 flex-grow">
                {[
                  "Full mouth scan and X-ray analysis",
                  "Guided self-examination included",
                  "Compare with your dentist's plan",
                  "Independent second opinion report",
                  "Treatment options with cost estimates",
                  "Patient + dentist report versions",
                  "Printable PDF report",
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
                  trackPixelInitiateCheckout({ content_name: "Second Opinion", content_category: "pricing", value: 29.99, currency: "USD" });
                  window.location.href = 'https://subscription.dentasmart.ai/create-saas-account?plan=second_review';
                }}
              >
                Get Second Opinion
              </Button>
            </motion.div>

            {/* Complete Care - Annual — MOST POPULAR */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-primary/5 rounded-3xl p-6 md:p-8 border-2 border-primary hover:shadow-2xl transition-all duration-500 flex flex-col relative ring-1 ring-primary/20"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                Most Popular
              </div>
              <div className="mb-5 mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-medium text-black">Complete Care</h3>
                </div>
                <p className="text-primary text-xs font-bold uppercase tracking-widest">Annual Plan</p>
              </div>
              <div className="mb-5">
                <div className="flex items-baseline">
                  <span className="text-4xl font-light text-black">
                    {planType === "individual" ? "$74.99" : "$149.99"}
                  </span>
                  <span className="text-stone-500 ml-2 text-sm">/year</span>
                </div>
                {planType === "individual" ? (
                  <p className="text-sm text-stone-500 mt-1">
                    Just ${(74.99 / 365).toFixed(2)}/day (less than a coffee)
                  </p>
                ) : (
                  <p className="text-sm text-stone-500 mt-1">
                    Up to 4 family members included (${(149.99 / 4).toFixed(0)}/person/year)
                  </p>
                )}
                <p className="text-stone-600 mt-3 font-light leading-relaxed text-sm">
                  {planType === "individual" 
                    ? "Year-round monitoring with unlimited access to all services. Track your oral health, catch problems early, and get personalized guidance."
                    : "Everything in Complete Care for your whole family. Each member gets individual profiles, separate reports, and personal dental history management."
                  }
                </p>
              </div>

              <div className="space-y-2.5 mb-6 flex-grow">
                {planType === "individual" ? (
                  <>
                    {[
                      { text: "Quick Check unlimited", bold: true },
                      { text: "Second Opinion unlimited", bold: true },
                      { text: "Complete Oral Health Checkup unlimited", bold: true },
                      { text: "Guided Self-Examination", bold: false },
                      { text: "Oral health score & progress tracking", bold: false },
                      { text: "Early risk insights & trend monitoring", bold: false },
                      { text: "Personalized recommendations", bold: false },
                      { text: "Treatment options with pros, cons & costs", bold: false },
                      { text: "Preventive & initial care guidance", bold: false },
                      { text: "Patient + dentist report versions", bold: false },
                      { text: "Secure Dental History storage", bold: false },
                      { text: "24/7 Dr. Din AI dentist included", bold: false },
                      { text: "Reviewed by licensed dentists", bold: false },
                      { text: "Full year access", bold: false },
                    ].map((f, i) => (
                      <div key={i} className="flex items-start text-stone-700 font-light text-sm">
                        <Check className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span className={f.bold ? "font-semibold text-black" : ""}>{f.text}</span>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {[
                      { text: "Quick Check unlimited", bold: true },
                      { text: "Second Opinion unlimited", bold: true },
                      { text: "Complete Oral Health Checkup unlimited", bold: true },
                      { text: "Up to 4 family members included", bold: false },
                      { text: "Individual profiles & tracking per member", bold: false },
                      { text: "Separate reports for each family member", bold: false },
                      { text: "Individual dental history per member", bold: false },
                      { text: "All individual plan features for each member", bold: false },
                      { text: "Additional members: $19.99/year each", bold: false },
                      { text: "24/7 Dr. Din AI dentist included", bold: false },
                      { text: "Reviewed by licensed dentists", bold: false },
                      { text: "Full year access", bold: false },
                    ].map((f, i) => (
                      <div key={i} className="flex items-start text-stone-700 font-light text-sm">
                        <Check className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span className={f.bold ? "font-semibold text-black" : ""}>{f.text}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>

              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-5 text-base font-medium transition-all duration-300 shadow-lg cursor-pointer"
                onClick={() => {
                  if (planType === "individual") {
                    trackPixelInitiateCheckout({ content_name: "Complete Care Annual Plan", content_category: "pricing", value: 74.99, currency: "USD" });
                    window.location.href = 'https://subscription.dentasmart.ai/create-saas-account?plan=insights_individual_yearly';
                  } else {
                    trackPixelInitiateCheckout({ content_name: "Complete Care Family Plan", content_category: "pricing", value: 149.99, currency: "USD" });
                    window.location.href = 'https://subscription.dentasmart.ai/create-saas-account?plan=insights_family_yearly';
                  }
                }}
              >
                {planType === "individual" ? "Start Free, Upgrade Anytime" : "Get Family Plan"}
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
                      <div>Quick Check</div>
                      <div className="text-xs font-normal text-stone-500 mt-0.5">$19.99</div>
                    </th>
                    <th className="text-center py-4 px-3 w-[22%] font-semibold text-stone-700 text-sm">
                      <div>Second Opinion</div>
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
                    { feature: "Mouth scans & X-ray analysis", quickCheck: "One-time", secondOpinion: "One-time", complete: "Unlimited" },
                    { feature: "Guided self-examination", quickCheck: true, secondOpinion: true, complete: true },
                    { feature: "Oral health score", quickCheck: true, secondOpinion: true, complete: true },
                    { feature: "Progress tracking over time", quickCheck: false, secondOpinion: false, complete: true },
                    { feature: "Early risk insights & trends", quickCheck: false, secondOpinion: false, complete: true },
                    { feature: "Compare with dentist's plan", quickCheck: false, secondOpinion: true, complete: true },
                    { feature: "Independent second opinion report", quickCheck: false, secondOpinion: true, complete: true },
                    { feature: "Personalized recommendations", quickCheck: "Basic", secondOpinion: true, complete: true },
                    { feature: "Treatment options with cost estimates", quickCheck: false, secondOpinion: true, complete: true },
                    { feature: "Preventive & initial care guidance", quickCheck: false, secondOpinion: false, complete: true },
                    { feature: "Patient + dentist report versions", quickCheck: true, secondOpinion: true, complete: true },
                    { feature: "Printable PDF report", quickCheck: true, secondOpinion: true, complete: true },
                    { feature: "Secure Dental History storage", quickCheck: false, secondOpinion: false, complete: true },
                    { feature: "24/7 Dr. Din AI dentist", quickCheck: false, secondOpinion: false, complete: true },
                    { feature: "Reviewed by licensed dentists", quickCheck: true, secondOpinion: true, complete: true },
                    ...(planType === "family" ? [
                      { feature: "Family members included", quickCheck: "1", secondOpinion: "1", complete: "Up to 4" },
                      { feature: "Individual profiles per member", quickCheck: false, secondOpinion: false, complete: true },
                      { feature: "Additional members ($19.99/yr each)", quickCheck: false, secondOpinion: false, complete: true },
                    ] : []),
                    { feature: "Access duration", quickCheck: "One-time", secondOpinion: "One-time", complete: "Full year" },
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

      {/* How Subscriptions Work */}
      <section className="py-6 bg-stone-50">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="text-center mb-5">
            <h2 className="text-3xl md:text-4xl font-light text-black mb-3">
              How it works
            </h2>
            <p className="text-stone-500 text-lg">Three simple steps to better oral health</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Download the app",
                desc: "Get DentaSmart free on iOS or Android. Scan your teeth and see a preview of your results at no cost.",
              },
              {
                step: "2",
                title: "Choose your plan",
                desc: "Pick Quick Check for a fast scan, Second Opinion for a deep analysis, or Complete Care for year-round unlimited access to all services.",
              },
              {
                step: "3",
                title: "Get your full results",
                desc: "Unlock your complete analysis, personalized recommendations, and dentist-ready reports. Share with your dentist anytime.",
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
            answer="DentaSmart offers three plans: Quick Check at $19.99 (one-time fast scan), Second Opinion at $29.99 (one-time deep analysis), and Complete Care at $74.99/year for individuals or $149.99/year for families (up to 4 members, additional members $19.99/year each). All subscriptions are managed through dentasmart.ai."
            sourceUrl="https://dentasmart.ai/pricing"
            sourceLabel="DentaSmart Pricing"
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
            {[
              {
                q: "Can I try DentaSmart before paying?",
                a: "Yes. Download the app and scan your teeth for free. You will see a preview of your results. When you are ready for the full analysis, choose the plan that fits your needs through dentasmart.ai.",
              },
              {
                q: "What is the difference between Quick Check and Complete Care?",
                a: "Quick Check is a one-time fast scan ($19.99) that gives you an instant overview with key findings. Complete Care ($74.99/year) gives you unlimited access to all three services — Quick Check, Second Opinion, and Complete Oral Health Checkup — plus progress tracking, personalized recommendations, and year-round monitoring.",
              },
              {
                q: "When should I choose Second Opinion?",
                a: "Choose Second Opinion ($29.99) when your dentist has given you a treatment plan and you want an independent AI analysis to compare findings, understand costs, and explore alternative options before committing.",
              },
              {
                q: "How do I manage my subscription?",
                a: "All subscriptions are managed through dentasmart.ai, not through the app stores. This keeps things simple and gives you full control over your plan.",
              },
              {
                q: "What does the Complete Care Family plan include?",
                a: "The Complete Care Family plan ($149.99/year) includes up to 4 family members (including the main user). Each member gets unlimited access to all services with individual profiles, separate reports, and personal dental history management. Additional members can be added for $19.99/year each.",
              },
              {
                q: "Are the results reviewed by real dentists?",
                a: "Yes. Every analysis is reviewed and approved by licensed dentists before it reaches you.",
              },
            ].map((item, idx) => (
              <details key={idx} className="group bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer text-black font-medium text-sm hover:bg-stone-100 transition-colors">
                  {item.q}
                  <ArrowRight className="w-4 h-4 text-stone-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-3" />
                </summary>
                <div className="px-5 pb-5 text-stone-600 text-sm font-light leading-relaxed">
                  {item.a}
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
