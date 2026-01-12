import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function Team() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-stone-200">
      <Navigation />

      {/* Hero Section - Human & Warm */}
      <section className="relative py-40 md:py-52 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/backgrounds/hero-team-creative.jpg" 
            alt="DentaSmart Team" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/60" />
        </div>

        <div className="container relative z-10 px-4 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-foreground mb-8 leading-[1.1]">
              The right team for <br />
              <span className="font-normal italic">the right problem</span>.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
              Meet the passionate experts behind DentaSmart's mission to revolutionize oral healthcare through AI innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership Team - Clean Cards */}
      <section className="py-32 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-6">
              Leadership Team
            </h2>
            <p className="text-xl text-stone-600 font-light">
              Visionary leaders driving innovation in AI-powered dental care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Qasim Mueen */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group"
            >
              <div className="aspect-square bg-stone-100 rounded-3xl mb-8 overflow-hidden relative shadow-sm group-hover:shadow-md transition-all duration-500">
                <div className="absolute inset-0 flex items-center justify-center text-6xl grayscale group-hover:grayscale-0 transition-all duration-500">
                  👨‍💼
                </div>
              </div>
              <h3 className="text-2xl font-medium text-stone-900 mb-2">Qasim Mueen</h3>
              <p className="text-stone-500 font-medium mb-4 uppercase tracking-wider text-xs">Founder & CEO</p>
              <p className="text-stone-600 font-light leading-relaxed mb-6 text-sm">
                Co-Founder & CEO of Zigron and FraudLens. Former Partner at Abode Systems (sold for $50M). Co-Founder of TransparentHands.org.
              </p>
              <a href="#" className="inline-flex items-center text-stone-900 hover:text-stone-600 transition-colors">
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
              className="group"
            >
              <div className="aspect-square bg-stone-100 rounded-3xl mb-8 overflow-hidden relative shadow-sm group-hover:shadow-md transition-all duration-500">
                <div className="absolute inset-0 flex items-center justify-center text-6xl grayscale group-hover:grayscale-0 transition-all duration-500">
                  👨‍💻
                </div>
              </div>
              <h3 className="text-2xl font-medium text-stone-900 mb-2">Kashif Mueen</h3>
              <p className="text-stone-500 font-medium mb-4 uppercase tracking-wider text-xs">Co-founder & CTO</p>
              <p className="text-stone-600 font-light leading-relaxed mb-6 text-sm">
                25+ years in enterprise architecture, cloud, AI & ML. Former Partner at Abode Systems. Co-Founder of FraudLens and WhereverTV.
              </p>
              <a href="#" className="inline-flex items-center text-stone-900 hover:text-stone-600 transition-colors">
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
              className="group"
            >
              <div className="aspect-square bg-stone-100 rounded-3xl mb-8 overflow-hidden relative shadow-sm group-hover:shadow-md transition-all duration-500">
                <div className="absolute inset-0 flex items-center justify-center text-6xl grayscale group-hover:grayscale-0 transition-all duration-500">
                  👩‍⚕️
                </div>
              </div>
              <h3 className="text-2xl font-medium text-stone-900 mb-2">Dr. Saba Ahmed</h3>
              <p className="text-stone-500 font-medium mb-4 uppercase tracking-wider text-xs">Product Lead</p>
              <p className="text-stone-600 font-light leading-relaxed mb-6 text-sm">
                Dental Surgeon with 10+ years clinical experience. Expert in merging patient care and technology to drive healthcare innovation.
              </p>
              <a href="#" className="inline-flex items-center text-stone-900 hover:text-stone-600 transition-colors">
                <Linkedin className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advisory Board - Clean List */}
      <section className="py-32 bg-stone-50">
        <div className="container px-4 mx-auto max-w-5xl">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-6">
              Advisory Board
            </h2>
            <p className="text-xl text-stone-600 font-light">
              Industry experts guiding our strategic vision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Tyrette Hamilton */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-stone-100 hover:shadow-md transition-all duration-300"
            >
              <h3 className="text-2xl font-medium text-stone-900 mb-2">Tyrette Hamilton</h3>
              <p className="text-stone-500 font-medium mb-6 uppercase tracking-wider text-xs">Strategic Advisor</p>
              <p className="text-stone-600 font-light leading-relaxed mb-8">
                Former COO of P&R Dental Strategies. 25+ years in dental insurance, benefit design, and regulatory compliance.
              </p>
              <a href="#" className="inline-flex items-center text-stone-900 hover:text-stone-600 transition-colors">
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
              className="bg-white p-10 rounded-3xl shadow-sm border border-stone-100 hover:shadow-md transition-all duration-300"
            >
              <h3 className="text-2xl font-medium text-stone-900 mb-2">Peter Fuentes, DMD</h3>
              <p className="text-stone-500 font-medium mb-6 uppercase tracking-wider text-xs">Strategic Advisor</p>
              <p className="text-stone-600 font-light leading-relaxed mb-8">
                Current Chief Dental Officer of MetLife (20M lives). Former CDO of Liberty Dental. 20+ years of industry leadership.
              </p>
              <a href="#" className="inline-flex items-center text-stone-900 hover:text-stone-600 transition-colors">
                <Linkedin className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission - Editorial */}
      <section className="py-32 bg-white">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-12">
            Our Mission
          </h2>
          <div className="text-xl md:text-2xl text-stone-600 font-light leading-relaxed space-y-8">
            <p>
              To revolutionize oral healthcare by empowering people with AI-driven insights that help them understand their teeth, make confident decisions, and build stronger relationships with their dental providers.
            </p>
            <p>
              We believe everyone deserves clarity about their oral health. By combining cutting-edge AI technology with clinical expertise, we're making dental care more transparent, accessible, and preventive.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-primary text-center">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
            Join our mission
          </h2>
          <p className="text-xl text-white/80 font-light mb-12 leading-relaxed">
            Help us revolutionize oral healthcare. Download DentaSmart today.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-blue-50 rounded-full px-10 py-8 text-xl font-medium transition-all duration-300 hover:scale-105 shadow-xl"
            onClick={() => window.open('https://apps.apple.com/us/app/dentasmart/id6670311232', '_blank')}
          >
            Download the App
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
