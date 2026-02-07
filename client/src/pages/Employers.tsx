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
              Stop overpaying for <br />
              <span className="font-normal italic text-primary">unused dental benefits</span>.
            </h1>
            <p className="text-xl md:text-2xl text-black font-normal max-w-3xl mr-auto mb-12 leading-relaxed">
              Traditional insurance is expensive and reactive. Switch to a proactive AI dental benefit that employees actually use, and save 75% on your costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-start">
              <Button 
                size="lg" 
                className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 py-8 text-xl font-medium transition-all duration-300 hover:scale-105 shadow-xl border-0 cursor-pointer"
                onClick={() => setIsDemoModalOpen(true)}
              >
                Schedule a Demo
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => {
                  const element = document.getElementById('savings-calculator');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white/50 backdrop-blur-md border-primary/20 text-primary hover:bg-white/80 rounded-full px-10 py-8 text-xl font-medium transition-all duration-300 cursor-pointer"
              >
                Calculate Savings
              </Button>
            </div>
          </motion.div>
          </div>
        </div>
      </section>

      {/* The Problem - Minimalist Grid */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-6">
              Traditional benefits are broken
            </h2>
            <p className="text-xl text-stone-600 font-light max-w-2xl mx-auto">
              Expensive premiums, low utilization, and reactive care don't solve the real problem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: TrendingDown, 
                title: "High Cost, Low Value", 
                desc: "About $1,200/year per employee with less than 50% utilization rates." 
              },
              { 
                icon: Users, 
                title: "Low Satisfaction", 
                desc: "Dental benefits consistently rank last in employee satisfaction surveys." 
              },
              { 
                icon: ShieldCheck, 
                title: "Reactive Care", 
                desc: "Employees wait for pain, leading to expensive emergency procedures and lost productivity." 
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

      {/* ROI - Big Numbers */}
      <section id="savings-calculator" className="py-12 bg-stone-50">
        <div className="container px-4 mx-auto max-w-5xl">

          <div className="mb-16">
            <SavingsCalculator />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "$900", label: "Annual Savings Per Employee" },
              { value: "4x", label: "Better Value Proposition" },
              { value: "0", label: "Administrative Headache" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="text-center p-8 rounded-2xl bg-stone-50"
              >
                <div className="text-5xl font-light text-stone-900 mb-2">{stat.value}</div>
                <div className="text-sm uppercase tracking-widest text-stone-500 font-medium">{stat.label}</div>
              </motion.div>
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
