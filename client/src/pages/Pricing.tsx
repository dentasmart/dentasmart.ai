import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { BenefitsCarousel } from "@/components/BenefitsCarousel";
import { useState } from "react";
import { Check, X, Shield, Sparkles, Users, Clock, ArrowRight } from "lucide-react";
import { ValueComparisonTable } from "@/components/ValueComparisonTable";
import { DownloadSection } from "@/components/DownloadSection";
import { motion } from "framer-motion";
import { WaitlistPopup } from "@/components/WaitlistPopup";

export default function Pricing() {
  const [planType, setPlanType] = useState<"individual" | "family">("individual");
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const insightsPrice = planType === "individual" ? 75 : 150;
  const insightsDaily = (insightsPrice / 365).toFixed(2);
  const secondOpinionPrice = 30;

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-stone-200">
      <SEO
        title="Simple, Transparent Pricing"
        description="DentaSmart offers affordable dental care plans starting at $0.21/day. Get year-round oral health monitoring or a one-time second opinion for just $30."
        canonical="https://dentasmart.ai/pricing"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/oaONyntFCCtQKvAL.jpg" 
            alt="Happy family smiling with healthy teeth" 
            className="w-full h-full object-cover object-center"
          />
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
              <span className="font-semibold text-black">Start free.</span> Download the app, scan your teeth, and see a preview of your results. Upgrade anytime to unlock your full analysis.
            </p>
          </div>
        </div>
      </section>

      {/* Plan Toggle */}
      <section id="pricing-plans" className="pt-10 pb-4 bg-white">
        <div className="container flex flex-col items-center gap-4">
          <div className="bg-accent/10 p-1 rounded-full inline-flex shadow-inner">
            <button
              onClick={() => setPlanType("individual")}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                planType === "individual"
                  ? "bg-white text-primary shadow-sm"
                  : "text-black hover:text-primary"
              }`}
            >
              Individual
            </button>
            <button
              onClick={() => setPlanType("family")}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                planType === "family"
                  ? "bg-white text-primary shadow-sm"
                  : "text-black hover:text-primary"
              }`}
            >
              Family
            </button>
          </div>
          {planType === "family" && (
            <motion.p 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-stone-500"
            >
              Family plans cover you + up to 4 family members
            </motion.p>
          )}
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-6 pt-4 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Individual Insights / Monthly Monitoring */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-blue-50/30 rounded-3xl p-8 md:p-10 border border-blue-100 hover:shadow-xl transition-all duration-500 flex flex-col relative"
            >
              <div className="absolute top-0 right-0 bg-primary/10 px-4 py-2 rounded-bl-2xl text-xs font-bold uppercase tracking-wider text-primary">
                Most Popular
              </div>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <h3 className="text-2xl font-medium text-black">Individual Insights</h3>
                </div>
                <p className="text-primary text-xs font-bold uppercase tracking-widest">Monthly Monitoring</p>
              </div>
              <div className="mb-6">
                <div className="flex flex-col">
                  <div className="flex items-baseline">
                    <span className="text-lg font-medium text-stone-500 mr-2">ONLY</span>
                    <span className="text-5xl font-light text-black">${insightsDaily}</span>
                    <span className="text-black ml-2">/day</span>
                  </div>
                  <p className="text-sm text-stone-500 mt-2">
                    Billed as ${insightsPrice} yearly
                    {planType === "family" && <span className="block text-xs mt-1">+ $10/year per additional family member</span>}
                  </p>
                </div>
                <p className="text-black mt-4 font-light leading-relaxed text-sm">
                  {planType === "individual"
                    ? "Year-round monitoring to track your oral health and catch problems before they get expensive."
                    : "Year-round monitoring for your whole family. Catch problems early and keep everyone on track."}
                </p>
              </div>

              {/* Feature Groups */}
              <div className="space-y-5 mb-8 flex-grow">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">Scanning & Analysis</p>
                  <ul className="space-y-2.5">
                    {[
                      "Unlimited yearly mouth scans and X-ray analysis",
                      "Includes Quick Check, Detailed Checkup and Second Opinion",
                      "X-ray and mouth image analysis",
                    ].map((f, i) => (
                      <li key={i} className="flex items-start text-black font-light text-sm">
                        <Check className="w-4 h-4 text-primary mr-2.5 mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">Reports & Insights</p>
                  <ul className="space-y-2.5">
                    {[
                      "Oral health score and progress tracking",
                      "Early risk insights and trend monitoring",
                      "Comprehensive report with clear findings and next steps",
                      "Patient-friendly and dentist-ready report versions",
                    ].map((f, i) => (
                      <li key={i} className="flex items-start text-black font-light text-sm">
                        <Check className="w-4 h-4 text-primary mr-2.5 mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">Guidance & Recommendations</p>
                  <ul className="space-y-2.5">
                    {[
                      "Personalized recommendations based on your scans and history",
                      "Preventive and initial care guidance",
                      "Treatment options with pros, cons and cost estimates",
                      "Recommended dentist type for your needs",
                      "Oral rehabilitation recommendations (where needed)",
                      "Maintenance and follow-up guidance",
                      "Risks of delayed treatment explained clearly",
                    ].map((f, i) => (
                      <li key={i} className="flex items-start text-black font-light text-sm">
                        <Check className="w-4 h-4 text-primary mr-2.5 mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">Support & Sharing</p>
                  <ul className="space-y-2.5">
                    {[
                      "24/7 AI Dentist - Din support",
                      "Secure Dental History storage",
                      "Share results with your dentist",
                      "Each analysis reviewed and approved by licensed dentists",
                      ...(planType === "family" ? ["Add up to 4 family members"] : []),
                    ].map((f, i) => (
                      <li key={i} className="flex items-start text-black font-light text-sm">
                        <Check className="w-4 h-4 text-primary mr-2.5 mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-6 text-lg font-medium transition-all duration-300 shadow-lg cursor-pointer"
                onClick={() => window.location.href = '/#download-cta'}
              >
                Start Free, Upgrade Anytime
              </Button>
              <p className="text-xs text-stone-400 text-center mt-3">Subscriptions managed through dentasmart.ai</p>
            </motion.div>

            {/* Second Opinion - One-Time */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-10 border border-blue-100 hover:shadow-xl transition-all duration-500 flex flex-col relative overflow-hidden"
            >
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="text-2xl font-medium text-black">Second Opinion</h3>
                </div>
                <p className="text-black text-xs font-bold uppercase tracking-widest">One-Time</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-5xl font-light text-black">${secondOpinionPrice}</span>
                  <span className="text-black ml-2">one-time</span>
                </div>
                <p className="text-sm text-stone-500 mt-2">
                  Less than a typical specialist co-pay
                  {planType === "family" && <span className="block text-xs mt-1">${secondOpinionPrice} per family member</span>}
                </p>
                <p className="text-black mt-4 font-light leading-relaxed text-sm">
                  Upload your dentist's treatment plan. Get an apples-to-apples comparison so you can decide with confidence.
                </p>
              </div>

              <div className="space-y-5 mb-8 flex-grow">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">What You Get</p>
                  <ul className="space-y-2.5">
                    {[
                      "One-time mouth scan and X-ray analysis",
                      "Comprehensive second opinion report",
                      "Comparison of DentaSmart findings with your dentist's treatment plan",
                      "X-ray and mouth image review",
                      "Oral health score with key insights",
                    ].map((f, i) => (
                      <li key={i} className="flex items-start text-black font-light text-sm">
                        <Check className="w-4 h-4 text-primary mr-2.5 mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">Guidance & Reports</p>
                  <ul className="space-y-2.5">
                    {[
                      "Personalized recommendations for your dental concern",
                      "Patient-friendly and dentist-ready report versions",
                      "Treatment options with pros, cons and cost estimates",
                      "Printable report",
                    ].map((f, i) => (
                      <li key={i} className="flex items-start text-black font-light text-sm">
                        <Check className="w-4 h-4 text-primary mr-2.5 mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">Support</p>
                  <ul className="space-y-2.5">
                    {[
                      "Share results with your dentist",
                      "24/7 AI Dentist - Din support",
                      "Access valid for 30 days",
                      "Each analysis reviewed and approved by licensed dentists",
                    ].map((f, i) => (
                      <li key={i} className="flex items-start text-black font-light text-sm">
                        <Check className="w-4 h-4 text-primary mr-2.5 mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full border-primary/20 text-primary hover:bg-blue-50 rounded-full py-6 text-lg font-medium transition-all duration-300 cursor-pointer"
                onClick={() => window.location.href = '/#download-cta'}
              >
                Get Second Opinion
              </Button>
              <p className="text-xs text-stone-400 text-center mt-3">Subscriptions managed through dentasmart.ai</p>
            </motion.div>

            {/* Benefits Plan - Coming Soon */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-gradient-to-br from-primary to-teal-700 rounded-3xl p-8 md:p-10 text-white hover:shadow-2xl transition-all duration-500 flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-white/10 px-4 py-2 rounded-bl-2xl text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                Coming Soon
              </div>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-white" />
                  <h3 className="text-2xl font-medium text-white">Benefits</h3>
                </div>
                <p className="text-white text-xs font-bold uppercase tracking-widest">Dental Benefits Membership</p>
              </div>
              <div className="mb-6">
                <div className="flex flex-col">
                  <div className="flex items-baseline">
                    <span className="text-lg font-medium text-white/80 mr-2">ONLY</span>
                    <span className="text-5xl font-light text-white">${(planType === "individual" ? 150 / 365 : 300 / 365).toFixed(2)}</span>
                    <span className="text-white ml-2">/day</span>
                  </div>
                  <p className="text-sm text-white/70 mt-2">
                    Billed as ${planType === "individual" ? "150" : "300"} yearly
                  </p>
                </div>
                <p className="text-white mt-4 font-light leading-relaxed text-sm">
                  Everything in Individual Insights, plus real savings on dental care through our provider network.
                </p>
              </div>

              <div className="space-y-5 mb-8 flex-grow">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">Everything in Insights, Plus</p>
                  <ul className="space-y-2.5">
                    {[
                      "Dental insurance alternative",
                      "75,000+ dentist network",
                      "20-60% savings on procedures",
                      "Buy Now, Pay Later available",
                      "Includes Second Opinion",
                      ...(planType === "family" ? ["Up to 4 family members"] : []),
                    ].map((f, i) => (
                      <li key={i} className="flex items-start text-white font-light text-sm">
                        <Check className="w-4 h-4 text-white mr-2.5 mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button 
                className="w-full bg-white text-primary hover:bg-blue-50 rounded-full py-6 text-lg font-medium transition-all duration-300 shadow-lg cursor-pointer"
                onClick={() => setIsWaitlistOpen(true)}
              >
                Join Waitlist
              </Button>
            </motion.div>

          </div>
        </div>
      </section>

      <WaitlistPopup isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />

      {/* Benefits Carousel */}
      <section className="py-4 bg-white overflow-hidden">
        <BenefitsCarousel />
      </section>

      {/* Compare Plans */}
      <section className="py-6 bg-white">
        <div className="container px-4 mx-auto max-w-5xl">
          <div className="text-center mb-6">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-4">
              Compare plans
            </h2>
            <p className="text-stone-500 text-lg max-w-2xl mx-auto">See exactly what each plan includes so you can pick the right fit.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-blue-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-blue-200 bg-blue-100/50">
                    <th className="text-left py-5 px-5 w-[30%] font-semibold text-primary sticky left-0 bg-blue-50 backdrop-blur-sm z-10 text-sm">Feature</th>
                    <th className="text-center py-5 px-3 w-[25%] font-semibold text-primary text-sm">
                      <div>Individual Insights</div>
                      <div className="text-xs font-normal text-stone-500 mt-0.5">${insightsPrice}/yr</div>
                    </th>
                    <th className="text-center py-5 px-3 w-[20%] font-semibold text-primary text-sm">
                      <div>Second Opinion</div>
                      <div className="text-xs font-normal text-stone-500 mt-0.5">$30 one-time</div>
                    </th>
                    <th className="text-center py-5 px-3 w-[25%] font-semibold text-white bg-primary text-sm">
                      <div>Benefits</div>
                      <div className="text-xs font-normal text-white/70 mt-0.5">Coming Soon</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-100">
                  {[
                    { feature: "Mouth scans & X-ray analysis", insights: "Unlimited yearly", secondOpinion: "One-time", benefits: "Unlimited yearly" },
                    { feature: "Quick Check, Detailed Checkup & Second Opinion", insights: true, secondOpinion: "Second Opinion only", benefits: true },
                    { feature: "Oral health score & progress tracking", insights: true, secondOpinion: "Score only", benefits: true },
                    { feature: "Early risk insights & trend monitoring", insights: true, secondOpinion: false, benefits: true },
                    { feature: "Comprehensive report with findings & next steps", insights: true, secondOpinion: true, benefits: true },
                    { feature: "Patient-friendly & dentist-ready reports", insights: true, secondOpinion: true, benefits: true },
                    { feature: "Personalized recommendations", insights: true, secondOpinion: true, benefits: true },
                    { feature: "Treatment options with pros, cons & costs", insights: true, secondOpinion: true, benefits: true },
                    { feature: "Compare with your dentist's treatment plan", insights: true, secondOpinion: true, benefits: true },
                    { feature: "Preventive & initial care guidance", insights: true, secondOpinion: false, benefits: true },
                    { feature: "Recommended dentist type", insights: true, secondOpinion: false, benefits: true },
                    { feature: "Oral rehabilitation recommendations", insights: true, secondOpinion: false, benefits: true },
                    { feature: "Maintenance & follow-up guidance", insights: true, secondOpinion: false, benefits: true },
                    { feature: "Risks of delayed treatment explained", insights: true, secondOpinion: false, benefits: true },
                    { feature: "24/7 AI Dentist - Din support", insights: true, secondOpinion: true, benefits: true },
                    { feature: "Secure Dental History storage", insights: true, secondOpinion: false, benefits: true },
                    { feature: "Share results with your dentist", insights: true, secondOpinion: true, benefits: true },
                    { feature: "Printable report", insights: true, secondOpinion: true, benefits: true },
                    { feature: "Reviewed by licensed dentists", insights: true, secondOpinion: true, benefits: true },
                    { feature: "Access duration", insights: "Full year", secondOpinion: "30 days", benefits: "Full year" },
                    { feature: "75,000+ dentist network", insights: false, secondOpinion: false, benefits: true },
                    { feature: "20-60% savings on procedures", insights: false, secondOpinion: false, benefits: true },
                    { feature: "Buy Now, Pay Later", insights: false, secondOpinion: false, benefits: true },
                    { feature: "Family members", insights: planType === "family" ? "Up to 4" : "Individual", secondOpinion: planType === "family" ? "$30 each" : "Individual", benefits: planType === "family" ? "Up to 4" : "Individual" },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                      <td className="text-left py-3.5 px-5 font-medium text-stone-700 text-sm sticky left-0 bg-white z-10 border-r border-blue-100">{row.feature}</td>
                      <td className="text-center py-3.5 px-3">
                        {typeof row.insights === 'boolean' ? (
                          row.insights ? <Check className="w-5 h-5 text-primary mx-auto" /> : <X className="w-5 h-5 text-stone-300 mx-auto" />
                        ) : (
                          <span className="text-sm text-stone-700">{row.insights}</span>
                        )}
                      </td>
                      <td className="text-center py-3.5 px-3">
                        {typeof row.secondOpinion === 'boolean' ? (
                          row.secondOpinion ? <Check className="w-5 h-5 text-primary mx-auto" /> : <X className="w-5 h-5 text-stone-300 mx-auto" />
                        ) : (
                          <span className="text-sm text-stone-700">{row.secondOpinion}</span>
                        )}
                      </td>
                      <td className="text-center py-3.5 px-3 bg-blue-50/30">
                        {typeof row.benefits === 'boolean' ? (
                          row.benefits ? <Check className="w-5 h-5 text-primary mx-auto" /> : <X className="w-5 h-5 text-stone-300 mx-auto" />
                        ) : (
                          <span className="text-sm text-stone-700">{row.benefits}</span>
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
                desc: "Pick Individual Insights for ongoing monitoring or Second Opinion for a one-time deep analysis. Purchase through dentasmart.ai.",
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
                className="bg-white rounded-2xl p-6 border border-blue-100 text-center"
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
                a: "Yes. Download the app and scan your teeth for free. You will see a preview of your results. When you are ready for the full analysis, upgrade through dentasmart.ai.",
              },
              {
                q: "What is the difference between Individual Insights and Second Opinion?",
                a: "Individual Insights gives you year-round monitoring with unlimited scans, progress tracking, and ongoing guidance. Second Opinion is a one-time deep analysis where you upload your dentist's treatment plan and get an independent comparison.",
              },
              {
                q: "How do I manage my subscription?",
                a: "All subscriptions are managed through dentasmart.ai, not through the app stores. This keeps things simple and gives you full control over your plan.",
              },
              {
                q: "Can I add family members?",
                a: "Yes. The Family plan is $150/year and includes you plus up to 4 family members. Additional members are $10/year each. For Second Opinion, each family member is $30.",
              },
              {
                q: "Are the results reviewed by real dentists?",
                a: "Yes. Every analysis is reviewed and approved by licensed dentists before it reaches you.",
              },
              {
                q: "How long do I have access to my Second Opinion report?",
                a: "Your Second Opinion report is accessible for 30 days. You can download and print it anytime during that window.",
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
