import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BenefitsCarousel } from "@/components/BenefitsCarousel";
import { useState } from "react";
import { Check } from "lucide-react";
import { ValueComparisonTable } from "@/components/ValueComparisonTable";
import { DownloadSection } from "@/components/DownloadSection";
import { motion } from "framer-motion";
import { WaitlistPopup } from "@/components/WaitlistPopup";

export default function Pricing() {
  const [planType, setPlanType] = useState<"individual" | "family">("individual");
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  // Helper to calculate daily price
  const getDailyPrice = (yearlyPrice: number) => {
    return (yearlyPrice / 365).toFixed(2);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-stone-200">
      <Navigation />

      {/* Hero Section - Calm & Balanced */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/uUGabAOXJTEInHmQ.jpg" 
            alt="Simple Pricing" 
            className="w-full h-full object-cover object-top md:object-center"
          />
          <div className="absolute inset-0 bg-white/95 md:bg-white/90" />
        </div>

        <div className="container relative z-10 px-4 mx-auto max-w-7xl text-left pt-32 md:pt-0">
          <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-black mb-8 leading-[1.1]">
              Peace of mind for less than <br />
              <span className="font-normal italic text-primary">a single filling</span>.
            </h1>
            <p className="text-xl md:text-2xl text-black font-normal max-w-2xl mr-auto leading-relaxed mb-10">
              Stop worrying about surprise dental bills. Get year-round monitoring and expert guidance for a simple, transparent price.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <Button 
                size="lg" 
                className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg border-0 cursor-pointer"
                onClick={() => window.location.href = '/#download-cta'}
              >
                Start Your Free Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/80 text-stone-700 hover:bg-white hover:text-primary border-stone-200 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 cursor-pointer"
                onClick={() => window.location.href = '/#download-cta'}
              >
                Get Second Review
              </Button>
            </div>
          </motion.div>
          </div>
        </div>
      </section>

      {/* Plan Toggle - Minimalist */}
      <section id="pricing-plans" className="py-6 bg-white">
        <div className="container flex justify-center">
          <div className="bg-accent/10 p-1 rounded-full inline-flex shadow-inner">
            <button
              onClick={() => setPlanType("individual")}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                planType === "individual"
                  ? "bg-white text-primary shadow-sm"
                  : "text-black hover:text-primary"
              }`}
            >
              Individual
            </button>
            <button
              onClick={() => setPlanType("family")}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                planType === "family"
                  ? "bg-white text-primary shadow-sm"
                  : "text-black hover:text-primary"
              }`}
            >
              Family
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards - Clean & Modern */}
      <section className="pb-12 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Insights Plan (formerly Clarity) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-blue-50/30 rounded-3xl p-10 border border-blue-100 hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-medium text-black mb-2">Insights</h3>
                <p className="text-primary text-xs font-bold uppercase tracking-widest">Monthly Monitoring</p>
              </div>
              <div className="mb-8">
                <div className="flex flex-col">
                  <div className="flex items-baseline">
                    <span className="text-lg font-medium text-stone-500 mr-2">ONLY</span>
                    <span className="text-5xl font-light text-black">${getDailyPrice(planType === "individual" ? 75 : 150)}</span>
                    <span className="text-black ml-2">/day</span>
                  </div>
                  <p className="text-sm text-stone-500 mt-2">
                    Billed as ${planType === "individual" ? "75" : "150"} yearly
                  </p>
                </div>
                <p className="text-black mt-4 font-light leading-relaxed">
                  {planType === "individual"
                    ? "Monthly monitoring to track your oral health and catch problems early."
                    : "Monthly monitoring for your entire family with shared insights."}
                </p>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Unlimited monthly scans",
                  "Wellness score tracking",
                  "Din 24/7 support",
                  "Secure Dental History",
                  "Share with dentist",
                  "Includes Second Review",
                  planType === "family" && "Up to 4 family members",
                ].filter(Boolean).map((feature, idx) => (
                  <li key={idx} className="flex items-center text-black font-light text-sm">
                    <Check className="w-4 h-4 text-primary mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-6 text-lg font-medium transition-all duration-300 shadow-lg"
                onClick={() => window.location.href = '/#download-cta'}
              >
                Start Free Trial
              </Button>
            </motion.div>

            {/* Second Review Plan (formerly Consult) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-white rounded-3xl p-10 border border-blue-100 hover:shadow-xl transition-all duration-500 flex flex-col relative overflow-hidden"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-medium text-black mb-2">Second Review</h3>
                <p className="text-black text-xs font-bold uppercase tracking-widest">One-Time</p>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-5xl font-light text-black">$30</span>
                  <span className="text-black ml-2">one-time</span>
                </div>
                <p className="text-sm text-stone-500 mt-2">
                  Less than a typical specialist co-pay
                </p>
                <p className="text-black mt-4 font-light leading-relaxed">
                  Upload your treatment plan or concern. Get an apples-to-apples comparison.
                </p>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Single scan analysis",
                  "Detailed report",
                  "Treatment recommendations",
                  "Din consultation",
                  "Printable report",
                  "Valid for 30 days",
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center text-black font-light text-sm">
                    <Check className="w-4 h-4 text-primary mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                variant="outline" 
                className="w-full border-primary/20 text-primary hover:bg-blue-50 rounded-full py-6 text-lg font-medium transition-all duration-300"
                onClick={() => window.location.href = '/#download-cta'}
              >
                Get Second Review
              </Button>
            </motion.div>

            {/* Benefits Plan (formerly Complete) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-gradient-to-br from-primary to-teal-700 rounded-3xl p-10 text-white hover:shadow-2xl transition-all duration-500 flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-white/10 px-4 py-2 rounded-bl-2xl text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                Coming Soon
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-medium text-white mb-2">Benefits</h3>
                <p className="text-white text-xs font-bold uppercase tracking-widest">Dental Benefits Membership (Not insurance)</p>
              </div>
              <div className="mb-8">
                <div className="flex flex-col">
                  <div className="flex items-baseline">
                    <span className="text-lg font-medium text-white/80 mr-2">ONLY</span>
                    <span className="text-5xl font-light text-white">${getDailyPrice(planType === "individual" ? 150 : 300)}</span>
                    <span className="text-white ml-2">/day</span>
                  </div>
                  <p className="text-sm text-white/70 mt-2">
                    Billed as ${planType === "individual" ? "150" : "300"} yearly
                  </p>
                </div>
                <p className="text-white mt-4 font-light leading-relaxed">
                  Member benefits that make care more affordable and predictable.
                </p>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Everything in Insights",
                  "Dental insurance alternative",
                  "75,000+ Dentists Network",
                  "20-60% savings on procedures",
                  "Buy Now, Pay Later available",
                  "Includes Second Review",
                  planType === "family" && "Up to 4 family members",
                ].filter(Boolean).map((feature, idx) => (
                  <li key={idx} className="flex items-center text-white font-light text-sm">
                    <Check className="w-4 h-4 text-white mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full bg-white text-primary hover:bg-blue-50 rounded-full py-6 text-lg font-medium transition-all duration-300 shadow-lg"
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
      <section className="py-12 bg-white overflow-hidden">
        <BenefitsCarousel />
      </section>

      {/* Comparison Table - Clean */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-6">
              Compare plans
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-blue-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-blue-200 bg-blue-100/50">
                    <th className="text-left py-5 px-6 w-1/4 font-semibold text-primary sticky left-0 bg-blue-50 backdrop-blur-sm z-10">Feature</th>
                    <th className="text-center py-5 px-4 w-1/4 font-semibold text-primary">Insights</th>
                    <th className="text-center py-5 px-4 w-1/4 font-semibold text-primary">Second Review</th>
                    <th className="text-center py-5 px-4 w-1/4 font-semibold text-white bg-primary">Benefits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-100">
                  {[
                    { feature: "AI Analysis", insights: true, secondOpinion: true, benefits: true },
                    { feature: "Monthly Monitoring", insights: true, secondOpinion: false, benefits: true },
                    { feature: "Wellness Score", insights: true, secondOpinion: false, benefits: true },
                    { feature: "Din 24/7", insights: true, secondOpinion: true, benefits: true },
                    { feature: "Secure Dental History", insights: true, secondOpinion: false, benefits: true },
                    { feature: "Share with Dentist", insights: true, secondOpinion: true, benefits: true },
                    { feature: "Progress Tracking", insights: true, secondOpinion: false, benefits: true },
                    { feature: "Treatment Review", insights: false, secondOpinion: true, benefits: true },
                    { feature: "Discount Network", insights: false, secondOpinion: false, benefits: true },
                    { feature: "Financing Options", insights: false, secondOpinion: false, benefits: true },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                      <td className="text-left py-4 px-6 font-medium text-stone-900 sticky left-0 bg-white z-10 border-r border-blue-100">{row.feature}</td>
                      <td className="text-center py-4 px-4">
                        {row.insights ? <Check className="w-5 h-5 text-primary mx-auto" /> : <span className="text-stone-300">-</span>}
                      </td>
                      <td className="text-center py-4 px-4">
                        {row.secondOpinion ? <Check className="w-5 h-5 text-primary mx-auto" /> : <span className="text-stone-300">-</span>}
                      </td>
                      <td className="text-center py-4 px-4 bg-blue-50/30">
                        {row.benefits ? <Check className="w-5 h-5 text-primary mx-auto" /> : <span className="text-stone-300">-</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <DownloadSection />

      <Footer />
    </div>
  );
}
