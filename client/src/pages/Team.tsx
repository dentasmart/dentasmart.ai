import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Linkedin, Users, Target, Lightbulb } from "lucide-react";
import { MedicalAdvisoryBoard } from "@/components/MedicalAdvisoryBoard";
import { DownloadSection } from "@/components/DownloadSection";
import { motion } from "framer-motion";

export default function Team() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black selection:bg-primary/20">
      <SEO
        title="Meet the DentaSmart Team - Experts in AI-Powered Dental Care"
        description="Our team of dentists, engineers, and innovators are dedicated to making dental care simple, transparent, and accessible. Learn more about the experts behind DentaSmart."
        canonical="https://dentasmart.ai/team"
      />
      <Navigation />

      {/* Hero Section - Clean & Professional */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/aCeHxvEyoAWpKkct.jpg" 
            alt="DentaSmart Team" 
            className="w-full h-full object-cover object-[50%_20%] md:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/60 md:hidden" />
        </div>
        <div className="container relative z-10 px-4 mx-auto max-w-7xl text-left pt-40 md:pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 xl:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-6 leading-[1.1]">
              Experts dedicated to <br />
              <span className="font-normal italic text-primary">your smile</span>.
            </h1>
            <p className="text-xl md:text-2xl text-stone-700 max-w-3xl mr-auto font-normal leading-relaxed mb-10">
              We're a team of dentists, engineers, and innovators united by one goal: to make dental care simple, transparent, and accessible for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <Button 
                size="lg" 
                className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg border-0 cursor-pointer"
                onClick={() => document.getElementById('download-cta')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Your Oral Health Score
              </Button>
              
            </div>
          </motion.div>
            </div>

            {/* Right Column: Empty to let background image show through */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-6"></div>
          </div>
        </div>
      </section>

      {/* Why Trust Us Section */}
      <section className="py-16 bg-white border-b border-border/50">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-black mb-8">Why trust us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-stone-50 rounded-2xl">
              <p className="text-xl text-stone-800 font-medium">Built by AI and healthcare leaders.</p>
            </div>
            <div className="p-6 bg-stone-50 rounded-2xl">
              <p className="text-xl text-stone-800 font-medium">Advised by leaders in dental benefits and clinical dentistry.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values-section" className="py-8 bg-white border-b border-border/50">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Users, title: "Patient First", desc: "We build for the patient, ensuring clarity and empowerment in every feature." },
              { icon: Target, title: "Clinical Accuracy", desc: "Our AI is grounded in rigorous dental science and validated by experts." },
              { icon: Lightbulb, title: "Innovation", desc: "We push the boundaries of what's possible in digital health." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-medium text-black">{item.title}</h3>
                <p className="text-stone-700 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team - Clean Cards */}
      <section className="py-12 bg-slate-50/50">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-normal text-black mb-6">
              Leadership Team
            </h2>
            <p className="text-xl text-stone-700 font-normal">
              Visionary leaders driving innovation in AI-powered dental care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Qasim Mueen */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-border/50 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-24 h-24 rounded-full mb-6 overflow-hidden group-hover:scale-110 transition-transform duration-300 border-2 border-primary/10">
                <img loading="lazy" src="/images/team/qasim_mueen.png" alt="Qasim Mueen" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-medium text-black mb-1">Qasim Mueen</h3>
              <p className="text-primary font-medium mb-4 text-sm uppercase tracking-wider">Founder & CEO</p>
              <p className="text-stone-700 leading-relaxed mb-6 text-sm">
                Co-Founder & CEO of Zigron and FraudLens. Former Partner at Abode Systems (sold for $50M). Co-Founder of TransparentHands.org.
              </p>
              <a href="https://www.linkedin.com/in/zigron/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-black hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </motion.div>

            {/* Kashif Mueen */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-border/50 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-24 h-24 rounded-full mb-6 overflow-hidden group-hover:scale-110 transition-transform duration-300 border-2 border-primary/10">
                <img loading="lazy" src="/images/team/kashif_mueen.png" alt="Kashif Mueen" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-medium text-black mb-1">Kashif Mueen</h3>
              <p className="text-primary font-medium mb-4 text-sm uppercase tracking-wider">Co-founder & CTO</p>
              <p className="text-stone-700 leading-relaxed mb-6 text-sm">
                25+ years in enterprise architecture, cloud, AI & ML. Former Partner at Abode Systems. Co-Founder of FraudLens and WhereverTV.
              </p>
              <a href="https://www.linkedin.com/in/kashif-mueen-2321361/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-black hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </motion.div>

            {/* Dr. Saba Ahmed */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-border/50 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-24 h-24 rounded-full mb-6 overflow-hidden group-hover:scale-110 transition-transform duration-300 border-2 border-primary/10">
                <img loading="lazy" src="/images/team/saba_ahmed.png" alt="Dr. Saba Ahmed" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-medium text-black mb-1">Dr. Saba Ahmed</h3>
              <p className="text-primary font-medium mb-4 text-sm uppercase tracking-wider">Product Lead</p>
              <p className="text-stone-700 leading-relaxed mb-6 text-sm">
                Dental Surgeon with 10+ years clinical experience. Expert in merging patient care and technology to drive healthcare innovation.
              </p>
              <a href="https://www.linkedin.com/in/dr-saba-ahmed-41293b227/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-black hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advisory Board - Clean List */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-normal text-black mb-6">
              Advisory Board
            </h2>
            <p className="text-xl text-stone-700 font-normal">
              Industry experts guiding our strategic vision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Tyrette Hamilton */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-50 p-10 rounded-3xl border border-border/50 hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/10 flex-shrink-0">
                  <img loading="lazy" src="/images/team/tyrette_hamilton.png" alt="Tyrette Hamilton" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-black mb-1">Tyrette Hamilton</h3>
                  <p className="text-stone-700 font-medium uppercase tracking-wider text-xs">Strategic Advisor</p>
                </div>
              </div>
              <p className="text-stone-700 font-normal leading-relaxed mb-8">
                Former COO of P&R Dental Strategies. 25+ years in dental insurance, benefit design, and regulatory compliance.
              </p>
              <a href="https://www.linkedin.com/in/tyhamilton/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-black hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </motion.div>

            {/* Peter Fuentes */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="bg-slate-50 p-10 rounded-3xl border border-border/50 hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/10 flex-shrink-0">
                  <img loading="lazy" src="/images/team/peter_fuentes.png" alt="Peter Fuentes, DMD" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-black mb-1">Peter Fuentes, DMD</h3>
                  <p className="text-stone-700 font-medium uppercase tracking-wider text-xs">Strategic Advisor</p>
                </div>
              </div>
              <p className="text-stone-700 font-normal leading-relaxed mb-8">
                Current Chief Dental Officer of MetLife (20M lives). Former CDO of Liberty Dental. 20+ years of industry leadership.
              </p>
              <a href="https://www.linkedin.com/in/peter-fuentes-dmd-42861613/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-black hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission - StoryBrand Aligned */}
      <section className="py-12 bg-[#D0F0F5] text-stone-900">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-normal mb-12 text-stone-900">
            Our Mission
          </h2>
          <div className="text-xl md:text-2xl text-stone-700 font-light leading-relaxed space-y-8">
            <p>
              <strong className="font-medium text-stone-900">Your oral health is the gateway to your overall well-being.</strong> Yet, for too long, dental care has felt confusing, reactive, and disconnected from the rest of your healthcare journey.
            </p>
            <p>
              We believe you shouldn't have to be a dentist to understand what's happening in your own mouth. That's why we built DentaSmart, to give you the clarity to catch issues early, the confidence to make informed decisions, and the peace of mind that comes from knowing you're in control of your health.
            </p>
          </div>
        </div>
      </section>

      {/* Medical Advisory Board */}
      <MedicalAdvisoryBoard />

      {/* Clinical Safety and Responsibility */}
      <section className="py-20 bg-stone-50 border-t border-stone-200">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-stone-100">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-6">Clinical safety and responsibility</h2>
            <p className="text-xl text-stone-700 mb-10 leading-relaxed">
              We help users understand oral health and prepare for licensed dental care.
            </p>
            <div className="flex justify-center gap-8 text-base font-medium text-primary">
              <a href="/privacy-policy" className="hover:underline hover:text-primary/80 transition-colors">Privacy Policy</a>
              <span className="text-stone-300">|</span>
              <a href="/terms-of-service" className="hover:underline hover:text-primary/80 transition-colors">Terms of Service</a>
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
