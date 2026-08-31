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
        description="DentaSmart offers three plans: Quick Check ($19.99 one-time), Second Opinion ($29.99 one-time), and Complete Care ($74.99/year individual or $149.99/year family). Start free, no commitment."
        canonical="https://dentasmart.ai/pricing"
      />
      <Navigation />
      <ProductServiceSchema />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Pricing", url: "/pricing" }
      ]} />
      <FAQSchema faqs={[
        { question: "How much does DentaSmart cost?", answer: "DentaSmart offers three plans: Quick Check at $19.99 (one-time AI review of your mouth photos and X-rays), Second Opinion at $29.99 (one-time comparison of your dentist's treatment plan), and Complete Care at $74.99/year for individuals or $149.99/year for families (up to 4 members). All subscriptions are managed through dentasmart.ai." },
        { question: "Can I try DentaSmart before paying?", answer: "Yes. Download the app and scan your teeth for free. You will see a preview of your results. When you are ready for the full analysis, choose the plan that fits your needs through dentasmart.ai." },
        { question: "What does Quick Check include?", answer: "Quick Check ($19.99 one-time) gives you an AI review of your mouth photos and X-rays. You get visible concerns highlighted, key insights, and your Oral Health Score. You can save or share a patient-friendly report. Dr. Din is available for 30 days after your check." },
        { question: "What is the difference between Quick Check and Complete Care?", answer: "Quick Check is a one-time AI review of your images that shows visible concerns, key insights, and your Oral Health Score. Complete Care gives you year-round unlimited access to all three services, including guided self-examination, complete detailed reports, progress tracking over time, personalized guidance, treatment options with cost estimates, and 24/7 Dr. Din support." },
        { question: "When should I choose Second Opinion?", answer: "Choose Second Opinion ($29.99) when your dentist has given you a treatment plan, bill, or recommendation and you want a plain-English comparison before you decide. You upload the documents along with your mouth photos and X-rays, and DentaSmart shows you what aligns, what differs, and what questions to ask your dentist." },
        { question: "What does the Complete Care Family plan include?", answer: "The Complete Care Family plan ($149.99/year) covers up to 4 family members. Each person gets their own profile, reports, Oral Health Score tracking, and dental history. Dr. Din is available for family dental questions. Additional members can be added for $19.99/year each." },
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
                Start with a quick one-time check or stay monitored all year. Simple, transparent pricing with no surprises.
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
                  onClick={() => window.location.href = '/#download-cta'}
                >
                  Try Free First
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
              <span className="font-semibold text-black">Start free.</span> Download the app and scan your teeth at no cost. See a preview before you choose a plan.
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
            <p className="text-stone-500 text-lg max-w-2xl mx-auto mb-6">Start with a one-time check or keep your smile monitored all year.</p>

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
                  Fast AI review of your mouth photos and X-rays. Best when you want a quick first look before deciding what to do next.
                </p>
              </div>

              <div className="space-y-2.5 mb-6 flex-grow">
                {[
                  planType === "family" ? "One-time image review per family member" : "One-time image review for one person",
                  "Upload mouth photos and supported dental X-rays",
                  "Visible concerns and key insights",
                  "Oral Health Score",
                  "Save or share a patient-friendly report",
                  "Dr. Din support for 30 days",
                  "Secure history storage",
                  "Reviewed by licensed dentists",
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
                  Upload a treatment plan or bill and get a plain-English comparison before you decide.
                </p>
              </div>

              <div className="space-y-2.5 mb-6 flex-grow">
                {[
                  planType === "family" ? "One-time second opinion per family member" : "One-time second opinion for one person or case",
                  "Upload treatment plans, bills, reports, X-rays, and mouth photos",
                  "Compare dentist findings with DentaSmart insights",
                  "See what aligns, what differs, and what to ask next",
                  "Comprehensive second opinion report",
                  "Plain-English explanations",
                  "Treatment option context with estimated cost ranges",
                  "Questions to bring back to your dentist",
                  "Shareable report",
                  "Dr. Din support for 30 days",
                  "Secure storage in your dental history",
                  "Reviewed by licensed dentists",
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
                  <p className="text-sm text-stone-500 mt-1">
                    About $0.21/day — less than a coffee
                  </p>
                ) : (
                  <p className="text-sm text-stone-500 mt-1">
                    About $0.41/day for up to 4 family members
                  </p>
                )}
                <p className="text-stone-600 mt-3 font-light leading-relaxed text-sm">
                  {planType === "individual"
                    ? "Year-round monitoring, complete reports, Oral Health Score tracking, and Dr. Din support for one person."
                    : "Protect up to 4 family members with separate profiles, reports, scores, and history."
                  }
                </p>
              </div>

              <div className="space-y-2.5 mb-6 flex-grow">
                {planType === "individual" ? (
                  <>
                    {/* Included services */}
                    <div className="mb-3">
                      <p className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Includes unlimited access to</p>
                      {[
                        { text: "Quick Check", bold: true },
                        { text: "Second Opinion", bold: true },
                        { text: "Complete Oral Health Checkup", bold: true },
                      ].map((f, i) => (
                        <div key={i} className="flex items-start text-stone-700 text-sm mb-1.5">
                          <Check className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span className="font-semibold text-black">{f.text}</span>
                        </div>
                      ))}
                    </div>
                    {/* Complete Oral Health Checkup features */}
                    <div className="border-t border-stone-100 pt-3">
                      <p className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">What's in Complete Oral Health Checkup</p>
                      {[
                        { text: "Guided self-examination", bold: false },
                        { text: "Oral Health Score tracking over time", bold: false },
                        { text: "Early risk insights and trend monitoring", bold: false },
                        { text: "Personalized guidance based on your scans, symptoms, history, and previous reports", bold: false },
                        { text: "Treatment options with cost estimates and risks of delay", bold: false },
                        { text: "Preventive, initial, and maintenance care guidance", bold: false },
                        { text: "Recommended dentist type when relevant", bold: false },
                        { text: "Patient-friendly and dentist-ready report versions", bold: false },
                        { text: "Secure dental history storage", bold: false },
                        { text: "Dr. Din available 24/7", bold: false },
                        { text: "Reviewed by licensed dentists", bold: false },
                        { text: "Full year access", bold: false },
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
                      <p className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Each family member gets</p>
                      {[
                        { text: "Quick Check (unlimited per family member)", bold: true },
                        { text: "Second Opinion (unlimited per family member)", bold: true },
                        { text: "Complete Oral Health Checkup (unlimited per family member)", bold: true },
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
                        { text: "Up to 4 separate family profiles", bold: false },
                        { text: "One account holder manages all members", bold: false },
                        { text: "Separate Oral Health Score, reports, and dental history per family member", bold: false },
                        { text: "Dr. Din supports each family member's dental questions separately", bold: false },
                        { text: "Share any family member's report with a dentist", bold: false },
                        { text: "Reviewed by licensed dentists", bold: false },
                        { text: "Additional family members: $19.99/year each", bold: false },
                        { text: "Full year access", bold: false },
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
                    { feature: "Mouth photo and X-ray review", quickCheck: "One-time", secondOpinion: "One-time", complete: "Unlimited" },
                    { feature: "Visible concerns and key insights", quickCheck: true, secondOpinion: true, complete: true },
                    { feature: "Oral Health Score", quickCheck: true, secondOpinion: true, complete: true },
                    { feature: "Patient-friendly report", quickCheck: true, secondOpinion: true, complete: true },
                    { feature: "Guided self-examination", quickCheck: false, secondOpinion: false, complete: true },
                    { feature: "Oral Health Score tracking over time", quickCheck: false, secondOpinion: false, complete: true },
                    { feature: "Early risk insights and trends", quickCheck: false, secondOpinion: false, complete: true },
                    { feature: "Compare with dentist's plan", quickCheck: false, secondOpinion: true, complete: true },
                    { feature: "Second opinion report with plain-English explanations", quickCheck: false, secondOpinion: true, complete: true },
                    { feature: "Personalized guidance (scans, symptoms, history)", quickCheck: false, secondOpinion: false, complete: true },
                    { feature: "Treatment options with cost estimates", quickCheck: false, secondOpinion: true, complete: true },
                    { feature: "Risks of delay", quickCheck: false, secondOpinion: false, complete: true },
                    { feature: "Preventive, initial, and maintenance guidance", quickCheck: false, secondOpinion: false, complete: true },
                    { feature: "Recommended dentist type", quickCheck: false, secondOpinion: false, complete: true },
                    { feature: "Dentist-ready report version", quickCheck: false, secondOpinion: false, complete: true },
                    { feature: "Secure dental history storage", quickCheck: true, secondOpinion: true, complete: true },
                    { feature: "Dr. Din support", quickCheck: "30 days", secondOpinion: "30 days", complete: "24/7" },
                    { feature: "Reviewed by licensed dentists", quickCheck: true, secondOpinion: true, complete: true },
                    ...(planType === "family" ? [
                      { feature: "Family members included", quickCheck: "1", secondOpinion: "1", complete: "Up to 4" },
                      { feature: "Separate profiles and history per member", quickCheck: false, secondOpinion: false, complete: true },
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

      {/* How It Works */}
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
                desc: "Pick Quick Check for a fast first look, Second Opinion to compare your dentist's plan, or Complete Care for year-round monitoring.",
              },
              {
                step: "3",
                title: "Get your full results",
                desc: "Unlock your complete analysis, save or share your report, and get guidance on what to do next. Share with your dentist anytime.",
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
            answer="DentaSmart offers three plans: Quick Check at $19.99 (one-time AI review of your mouth photos and X-rays), Second Opinion at $29.99 (one-time comparison of your dentist's treatment plan), and Complete Care at $74.99/year for individuals or $149.99/year for families (up to 4 members, additional members $19.99/year each). All subscriptions are managed through dentasmart.ai."
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
                q: "What does Quick Check include?",
                a: "Quick Check ($19.99 one-time) gives you an AI review of your mouth photos and X-rays. You see visible concerns, key insights, and your Oral Health Score. You can save or share a patient-friendly report. Dr. Din is available for 30 days after your check.",
              },
              {
                q: "What is the difference between Quick Check and Complete Care?",
                a: "Quick Check is a one-time AI review that shows visible concerns, key insights, and your Oral Health Score. Complete Care gives you year-round unlimited access to all services, including guided self-examination, complete detailed reports, progress tracking over time, personalized guidance, treatment options with cost estimates, and 24/7 Dr. Din support.",
              },
              {
                q: "When should I choose Second Opinion?",
                a: "Choose Second Opinion ($29.99) when your dentist has given you a treatment plan, bill, or recommendation and you want a plain-English comparison before you decide. You upload the documents along with your mouth photos and X-rays, and DentaSmart shows you what aligns, what differs, and what questions to ask your dentist.",
              },
              {
                q: "How do I manage my subscription?",
                a: "All subscriptions are managed through dentasmart.ai, not through the app stores. This keeps things simple and gives you full control over your plan.",
              },
              {
                q: "What does the Complete Care Family plan include?",
                a: "The Complete Care Family plan ($149.99/year) covers up to 4 family members. Each person gets their own profile, reports, Oral Health Score tracking, and dental history. Dr. Din is available for family dental questions. Additional members can be added for $19.99/year each.",
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
