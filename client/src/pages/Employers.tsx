import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { BarChart3, FileText, Users } from "lucide-react";
import { ValueComparisonTable } from "@/components/ValueComparisonTable";
import { motion } from "framer-motion";
import { useState } from "react";
import { DemoRequestModal } from "@/components/DemoRequestModal";
import { Link } from "wouter";
import { trackEvent } from "@/lib/analytics";

export default function Employers() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const openDemo = (source: "hero" | "final_cta") => {
    trackEvent("employer_demo_request", { source });
    setIsDemoModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-stone-200">
      <SEO
        title="DentaSmart for Employers | Oral Health Education and Decision Support"
        description="Explore DentaSmart as an educational oral health resource for employees. Employer pricing, eligibility, implementation, and success measures are confirmed during discovery."
        canonical="https://dentasmart.ai/employers"
      />
      <DemoRequestModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
      <Navigation />

      {/* Hero Section - Professional & Modern */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <picture>
                    <source
                      type="image/webp"
                      srcSet="/images/optimized/GXvgxLOgMTanohTM-400.webp 400w, /images/optimized/GXvgxLOgMTanohTM-800.webp 800w, /images/optimized/GXvgxLOgMTanohTM-1600.webp 1600w"
                      sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1600px"
                    />
                    <img
                      src="/images/optimized/GXvgxLOgMTanohTM-800.webp"
                      alt="Corporate Wellness" 
            className="w-full h-full object-cover object-top md:object-center"
                      loading="lazy"
                    
                      width="1600" height="893"/>
                  </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/60 md:hidden" />
        </div>

        <div className="container relative z-10 px-4 mx-auto max-w-7xl text-left pt-40 md:pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 xl:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-8 leading-[1.1]">
              Help employees navigate dental questions <br />
              <span className="font-normal italic text-primary">with clearer information</span>.
            </h1>
            <p className="text-xl md:text-2xl text-black font-normal max-w-3xl mr-auto mb-12 leading-relaxed">
              Explore an educational oral health service that can help employees organize information and prepare questions for professional care. DentaSmart is not dental insurance.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-start">
              <Button 
                size="lg" 
                className="bg-action text-action-foreground hover:bg-action-hover rounded-full px-10 py-8 text-xl font-medium transition-all duration-300 hover:scale-105 shadow-xl border-0 cursor-pointer"
                onClick={() => openDemo("hero")}
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
              Questions employers are trying to solve
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: FileText,
                title: "Confusing Information",
                desc: "Employees may need plain-language context before deciding what to ask a dental professional."
              },
              { 
                icon: Users, 
                title: "Different Employee Needs",
                desc: "A useful program should explain who is eligible, which services are included, and where professional care begins."
              },
              { 
                icon: BarChart3,
                title: "Unclear Success Measures",
                desc: "Employers need agreed pilot measures before making claims about engagement, utilization, or cost."
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
              A responsible path to an employer pilot
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Confirm the audience", desc: "Define eligibility, employee needs, and the DentaSmart services being considered." },
              { step: "02", title: "Agree on the pilot", desc: "Confirm pricing, timing, onboarding, support, privacy responsibilities, and professional-care boundaries." },
              { step: "03", title: "Measure what was agreed", desc: "Review only the engagement and program measures documented for the pilot." }
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

      <section className="bg-stone-50 py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-light text-stone-900 md:text-5xl">What employees can use</h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-stone-600">
              Final service access depends on the employer agreement. These consumer tools are available in DentaSmart today.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { title: "Plain-language reports", desc: "Educational explanations for supported photos, X-rays, and treatment documents." },
              { title: "Decision preparation", desc: "Cost context and questions to bring to a dentist before accepting a treatment plan." },
              { title: "Record organization", desc: "Oral Health Score history, reminders, and separate profiles when the selected service includes them." },
            ].map((item) => (
              <article key={item.title} className="rounded-3xl border border-stone-200 bg-white p-7">
                <h3 className="mb-3 text-xl font-medium text-stone-900">{item.title}</h3>
                <p className="leading-relaxed text-stone-600">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table - Clean & Modern */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-6">
              Compare the role of each option
            </h2>
            <p className="text-xl text-stone-600 font-light max-w-3xl mx-auto">
              DentaSmart is an educational service, not a replacement for dental insurance or professional care.
            </p>
          </div>

          <ValueComparisonTable />
          <p className="text-center text-sm text-stone-600 mt-8 font-light">
            DentaSmart prices shown are published consumer prices. Employer terms and third-party plan details require separate verification.
          </p>
        </div>
      </section>

      {/* Pilot measurement guardrails */}
      <section id="savings-calculator" className="py-12 bg-stone-50">
        <div className="container px-4 mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-light text-stone-900 md:text-5xl">Define success before launch</h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-stone-600">
              DentaSmart does not publish employer savings or health-outcome guarantees. A pilot should use measures agreed with each employer.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "Access", label: "Who can use each service" },
              { value: "Engagement", label: "Which agreed actions are completed" },
              { value: "Feedback", label: "What employees and program owners report" }
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
            Who informs DentaSmart
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-stone-50 rounded-2xl">
              <p className="text-lg text-stone-800 font-medium mb-2">Product and technology leadership</p>
              <p className="text-sm text-stone-500">Responsible for DentaSmart's product, technology, and business direction.</p>
            </div>
            <div className="p-8 bg-stone-50 rounded-2xl">
              <p className="text-lg text-stone-800 font-medium mb-2">Strategic and dental perspectives</p>
              <p className="text-sm text-stone-500">Advisor and reviewer roles are described on the Team page and do not guarantee employer outcomes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-900 py-16 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-normal text-white md:text-4xl">Start with a discovery call</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-stone-200">
            Confirm employer pricing, eligibility, implementation, privacy responsibilities, support, and pilot measures before making a program decision.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="min-h-12 rounded-full bg-action px-8 text-action-foreground hover:bg-action-hover"
              onClick={() => openDemo("final_cta")}
            >
              Book a Demo
            </Button>
            <Link href="/team/" className="inline-flex min-h-12 items-center px-4 font-medium text-white underline underline-offset-4">
              Meet the Team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
