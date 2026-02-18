import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BenefitsCarousel } from "@/components/BenefitsCarousel";
import { TrendingDown, Users, ShieldCheck } from "lucide-react";
import { ValueComparisonTable } from "@/components/ValueComparisonTable";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { DownloadSection } from "@/components/DownloadSection";
import { motion } from "framer-motion";
import { useState } from "react";
import { DemoRequestModal } from "@/components/DemoRequestModal";

export default function Employers() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-stone-200">
      <DemoRequestModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
      <Navigation />

      {/* Hero Section - Professional & Modern */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/GXvgxLOgMTanohTM.jpg" 
            alt="Corporate Wellness" 
            className="w-full h-full object-cover object-top md:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/60 md:hidden" />
        </div>

        <div className="container relative z-10 px-4 mx-auto max-w-7xl text-left pt-32 md:pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 xl:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-8 leading-[1.1]">
              Give employees dental clarity <br />
              <span className="font-normal italic text-primary">without the insurance headache</span>.
            </h1>
            <p className="text-xl md:text-2xl text-black font-normal max-w-3xl mr-auto mb-12 leading-relaxed">
              A modern dental benefit that helps employees catch issues early and reduce unnecessary spend.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-start">
              <Button 
                size="lg" 
                className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 py-8 text-xl font-medium transition-all duration-300 hover:scale-105 shadow-xl border-0 cursor-pointer"
                onClick={() => setIsDemoModalOpen(true)}
              >
                Book a Demo
              </Button>
            </div>
          </motion.div>
            </div>

            {/* Right Column: Empty to let background image show through */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-6"></div>
          </div>
        </div>
      </section>

      {/* The Problem - Minimalist Grid */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-6">
              The problem with traditional dental benefits
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: TrendingDown, 
                title: "Delayed Care", 
                desc: "Employees delay care until it becomes expensive." 
              },
              { 
                icon: Users, 
                title: "Confusing Benefits", 
                desc: "Benefits feel confusing and underused." 
              },
              { 
                icon: ShieldCheck, 
                title: "Surprise Bills", 
                desc: "HR gets complaints about surprise bills." 
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-stone-900 transition-colors duration-500">
                  <item.icon className="w-8 h-8 text-stone-900 group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-medium text-stone-900 mb-4">{item.title}</h3>
                <p className="text-stone-600 font-light leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Plan - 3 Steps */}
      <section className="py-16 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-6">
              A simple plan for better oral health
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Launch in days", desc: "Seamless onboarding for your entire team." },
              { step: "02", title: "Employees scan monthly", desc: "Proactive monitoring catches issues early." },
              { step: "03", title: "Reports drive decisions", desc: "Data-driven insights for smarter care choices." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 relative overflow-hidden">
                <div className="text-8xl font-bold text-primary/10 absolute -top-4 -right-4 select-none">{item.step}</div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-medium text-stone-900 mb-3">{item.title}</h3>
                  <p className="text-stone-600 font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Carousel */}
      <section className="py-12 bg-stone-50 overflow-hidden">
        <BenefitsCarousel />
      </section>

      {/* Comparison Table - Clean & Modern */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-6">
              Compare the value
            </h2>
            <p className="text-xl text-stone-600 font-light max-w-3xl mx-auto">
              See how DentaSmart Benefits stacks up against traditional carriers.
            </p>
          </div>

          <ValueComparisonTable />
          <p className="text-center text-sm text-stone-400 mt-8 font-light">
            *Comparison based on average PPO plans from major carriers. Actual costs vary by location.
          </p>
        </div>
      </section>

      {/* Outcomes - Big Numbers */}
      <section id="savings-calculator" className="py-12 bg-stone-50">
        <div className="container px-4 mx-auto max-w-5xl">

          <div className="mb-16">
            <SavingsCalculator />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "High", label: "Utilization vs Traditional" },
              { value: "Better", label: "Employee Confidence" },
              { value: "Fewer", label: "Surprise Escalations" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="text-center p-8 rounded-2xl bg-white shadow-sm border border-stone-100"
              >
                <div className="text-4xl font-light text-stone-900 mb-2">{stat.value}</div>
                <div className="text-sm uppercase tracking-widest text-stone-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof - Advisor Credibility */}
      <section className="py-16 bg-white border-t border-stone-100">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-light text-stone-900 mb-8">
            Trusted by industry leaders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-stone-50 rounded-2xl">
              <p className="text-lg text-stone-800 font-medium mb-2">"Built by AI and healthcare leaders."</p>
              <p className="text-sm text-stone-500">Ensuring enterprise-grade reliability.</p>
            </div>
            <div className="p-8 bg-stone-50 rounded-2xl">
              <p className="text-lg text-stone-800 font-medium mb-2">"Advised by dental benefit experts."</p>
              <p className="text-sm text-stone-500">Designed for real-world clinical impact.</p>
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
