import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { UserChallengesCarousel } from "@/components/UserChallengesCarousel";
import { useState } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export default function Pricing() {
  const [planType, setPlanType] = useState<"individual" | "family">("individual");

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-stone-200">
      <Navigation />

      {/* Hero Section - Calm & Balanced */}
      <section className="relative py-40 md:py-52 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/backgrounds/pricing-calm.jpg" 
            alt="Simple Pricing" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/20 backdrop-blur-[1px]" />
        </div>

        <div className="container relative z-10 px-4 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-8 leading-[1.1] drop-shadow-lg">
              Simple, honest <br />
              <span className="font-normal italic">pricing</span>.
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
              No hidden fees. No surprises. Choose the plan that works for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Plan Toggle - Minimalist */}
      <section className="py-8 bg-white">
        <div className="container flex justify-center">
          <div className="bg-accent/10 p-1 rounded-full inline-flex shadow-inner">
            <button
              onClick={() => setPlanType("individual")}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                planType === "individual"
                  ? "bg-white text-primary shadow-sm"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Individual
            </button>
            <button
              onClick={() => setPlanType("family")}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                planType === "family"
                  ? "bg-white text-primary shadow-sm"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Family
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards - Clean & Modern */}
      <section className="py-8 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Clarity Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-blue-50/30 rounded-3xl p-10 border border-blue-100 hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-medium text-foreground mb-2">Clarity</h3>
                <p className="text-primary text-xs font-bold uppercase tracking-widest">Most Popular</p>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-5xl font-light text-foreground">${planType === "individual" ? "75" : "150"}</span>
                  <span className="text-muted-foreground ml-2">/year</span>
                </div>
                <p className="text-muted-foreground mt-4 font-light leading-relaxed">
                  {planType === "individual"
                    ? "Monthly monitoring to track your oral health and catch problems early."
                    : "Monthly monitoring for your entire family with shared insights."}
                </p>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Unlimited monthly scans",
                  "Wellness score tracking",
                  "Dr. Din 24/7 support",
                  "Dental record vault",
                  "Share with dentist",
                  planType === "family" && "Up to 4 family members",
                ].filter(Boolean).map((feature, idx) => (
                  <li key={idx} className="flex items-center text-muted-foreground font-light text-sm">
                    <Check className="w-4 h-4 text-primary mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-6 text-lg font-medium transition-all duration-300 shadow-lg">
                Start Free Trial
              </Button>
            </motion.div>

            {/* Consult Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-white rounded-3xl p-10 border border-blue-100 hover:shadow-xl transition-all duration-500 flex flex-col relative overflow-hidden"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-medium text-foreground mb-2">Consult</h3>
                <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">One-time</p>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-5xl font-light text-foreground">$30</span>
                  <span className="text-muted-foreground ml-2">one-time</span>
                </div>
                <p className="text-muted-foreground mt-4 font-light leading-relaxed">
                  Get a second opinion on a specific treatment plan or concern.
                </p>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Single scan analysis",
                  "Detailed report",
                  "Treatment recommendations",
                  "Dr. Din consultation",
                  "Printable report",
                  "Valid for 30 days",
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center text-muted-foreground font-light text-sm">
                    <Check className="w-4 h-4 text-primary mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-blue-50 rounded-full py-6 text-lg font-medium transition-all duration-300">
                Get Second Opinion
              </Button>
            </motion.div>

            {/* Complete Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-gradient-to-br from-primary to-teal-700 rounded-3xl p-10 text-white hover:shadow-2xl transition-all duration-500 flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-white/10 px-4 py-2 rounded-bl-2xl text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                Waitlist
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-medium text-white mb-2">Complete</h3>
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest">Coming Soon</p>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-5xl font-light text-white">${planType === "individual" ? "150" : "300"}</span>
                  <span className="text-white/50 ml-2">/year</span>
                </div>
                <p className="text-white/70 mt-4 font-light leading-relaxed">
                  Comprehensive dental coverage with AI-powered care coordination.
                </p>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Everything in Clarity",
                  "Dental insurance alternative",
                  "Preventive care coverage",
                  "75,000+ Dentists Network",
                  "20-60% savings on procedures",
                  "Buy Now, Pay Later available",
                  planType === "family" && "Up to 4 family members",
                ].filter(Boolean).map((feature, idx) => (
                  <li key={idx} className="flex items-center text-white/80 font-light text-sm">
                    <Check className="w-4 h-4 text-white mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-white text-primary hover:bg-blue-50 rounded-full py-6 text-lg font-medium transition-all duration-300 shadow-lg">
                Join Waitlist
              </Button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* User Challenges Carousel */}
      <section className="py-12 bg-accent/5">
        <UserChallengesCarousel />
      </section>

      {/* Comparison Table - Clean */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6">
              Compare plans
            </h2>
          </div>

<div className="bg-white rounded-3xl shadow-lg border border-blue-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-blue-200 bg-blue-100/50">
                    <th className="text-left py-5 px-6 w-1/4 font-semibold text-primary sticky left-0 bg-blue-50 backdrop-blur-sm z-10">Feature</th>
                    <th className="text-center py-5 px-4 w-1/4 font-semibold text-primary">Clarity</th>
                    <th className="text-center py-5 px-4 w-1/4 font-semibold text-primary">Consult</th>
                    <th className="text-center py-5 px-4 w-1/4 font-semibold text-white bg-primary">Complete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-100">
                  {[
                    { feature: "AI Analysis", clarity: true, consult: true, complete: true },
                    { feature: "Monthly Monitoring", clarity: true, consult: false, complete: true },
                    { feature: "Wellness Score", clarity: true, consult: false, complete: true },
                    { feature: "Dr. Din 24/7", clarity: true, consult: true, complete: true },
                    { feature: "Dental Record Vault", clarity: true, consult: false, complete: true },
                    { feature: "Share with Dentist", clarity: true, consult: true, complete: true },
                    { feature: "Progress Tracking", clarity: true, consult: false, complete: true },
                    { feature: "75,000+ Dentists Network", clarity: false, consult: false, complete: true },
                    { feature: "Procedure Savings (20-60%)", clarity: false, consult: false, complete: true },
                    { feature: "Buy Now, Pay Later", clarity: false, consult: false, complete: true },
                  ].map((row, idx) => (
                    <tr key={idx} className={`${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50/60'} hover:bg-blue-100/50 transition-colors`}>
                      <td className={`py-5 px-6 text-teal-900 font-medium text-sm md:text-base sticky left-0 z-10 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>{row.feature}</td>
                      <td className="py-5 px-4 text-center">
                        {row.clarity ? <Check className="w-6 h-6 text-primary mx-auto" /> : <span className="text-blue-200">—</span>}
                      </td>
                      <td className="py-5 px-4 text-center">
                        {row.consult ? <Check className="w-6 h-6 text-primary mx-auto" /> : <span className="text-blue-200">—</span>}
                      </td>
                      <td className="py-5 px-4 text-center bg-blue-50/50 border-l border-blue-100">
                        {row.complete ? <Check className="w-6 h-6 text-primary mx-auto" /> : <span className="text-blue-200">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Minimalist Accordion Style */}
      <section className="py-32 bg-white">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-16 text-center">
            Common questions
          </h2>
          <div className="space-y-8">
            {[
              { q: "Can I switch plans later?", a: "Yes, you can upgrade or downgrade your plan at any time from your account settings." },
              { q: "Is there a waiting period?", a: "No. Unlike traditional insurance, DentaSmart benefits start immediately." },
              { q: "Does it cover pre-existing conditions?", a: "Yes. We don't exclude pre-existing conditions. You get full benefits from day one." },
              { q: "How does the family plan work?", a: "The family plan covers up to 4 members. You can add more members for a small additional fee." },
            ].map((faq, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="border-b border-stone-100 pb-8"
              >
                <h3 className="text-xl font-medium text-stone-900 mb-3">{faq.q}</h3>
                <p className="text-stone-600 font-light leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
