import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Linkedin, Users, Target, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

export default function Team() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground selection:bg-primary/20">
      <Navigation />

      {/* Hero Section - Clean & Professional */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="container relative z-10 px-4 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-normal tracking-tight text-foreground mb-8 leading-[1.1]">
              The right team for <br />
              <span className="font-normal italic text-primary">the right problem</span>.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-normal leading-relaxed">
              Meet the passionate experts behind DentaSmart's mission to revolutionize oral healthcare through AI innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white border-b border-border/50">
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
                <h3 className="text-xl font-medium text-foreground">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team - Clean Cards */}
      <section className="py-24 bg-slate-50/50">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-normal text-foreground mb-6">
              Leadership Team
            </h2>
            <p className="text-xl text-muted-foreground font-normal">
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
              <div className="w-24 h-24 bg-blue-100 rounded-full mb-6 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                👨‍💼
              </div>
              <h3 className="text-2xl font-medium text-foreground mb-1">Qasim Mueen</h3>
              <p className="text-primary font-medium mb-4 text-sm uppercase tracking-wider">Founder & CEO</p>
              <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                Co-Founder & CEO of Zigron and FraudLens. Former Partner at Abode Systems (sold for $50M). Co-Founder of TransparentHands.org.
              </p>
              <a href="#" className="inline-flex items-center text-foreground hover:text-primary transition-colors">
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
              <div className="w-24 h-24 bg-teal-100 rounded-full mb-6 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                👨‍💻
              </div>
              <h3 className="text-2xl font-medium text-foreground mb-1">Kashif Mueen</h3>
              <p className="text-primary font-medium mb-4 text-sm uppercase tracking-wider">Co-founder & CTO</p>
              <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                25+ years in enterprise architecture, cloud, AI & ML. Former Partner at Abode Systems. Co-Founder of FraudLens and WhereverTV.
              </p>
              <a href="#" className="inline-flex items-center text-foreground hover:text-primary transition-colors">
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
              <div className="w-24 h-24 bg-purple-100 rounded-full mb-6 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                👩‍⚕️
              </div>
              <h3 className="text-2xl font-medium text-foreground mb-1">Dr. Saba Ahmed</h3>
              <p className="text-primary font-medium mb-4 text-sm uppercase tracking-wider">Product Lead</p>
              <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                Dental Surgeon with 10+ years clinical experience. Expert in merging patient care and technology to drive healthcare innovation.
              </p>
              <a href="#" className="inline-flex items-center text-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advisory Board - Clean List */}
      <section className="py-24 bg-white">
        <div className="container px-4 mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-normal text-foreground mb-6">
              Advisory Board
            </h2>
            <p className="text-xl text-muted-foreground font-normal">
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
              <h3 className="text-2xl font-medium text-foreground mb-2">Tyrette Hamilton</h3>
              <p className="text-muted-foreground font-medium mb-6 uppercase tracking-wider text-xs">Strategic Advisor</p>
              <p className="text-muted-foreground font-normal leading-relaxed mb-8">
                Former COO of P&R Dental Strategies. 25+ years in dental insurance, benefit design, and regulatory compliance.
              </p>
              <a href="#" className="inline-flex items-center text-foreground hover:text-primary transition-colors">
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
              <h3 className="text-2xl font-medium text-foreground mb-2">Peter Fuentes, DMD</h3>
              <p className="text-muted-foreground font-medium mb-6 uppercase tracking-wider text-xs">Strategic Advisor</p>
              <p className="text-muted-foreground font-normal leading-relaxed mb-8">
                Current Chief Dental Officer of MetLife (20M lives). Former CDO of Liberty Dental. 20+ years of industry leadership.
              </p>
              <a href="#" className="inline-flex items-center text-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">LinkedIn</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission - Editorial */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-normal mb-12">
            Our Mission
          </h2>
          <div className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed space-y-8">
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
      <section className="py-32 bg-primary/5 text-center">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-normal text-foreground mb-8">
            Join our mission
          </h2>
          <p className="text-xl text-muted-foreground font-normal mb-12 leading-relaxed">
            Help us revolutionize oral healthcare. Download DentaSmart today.
          </p>
          <Button 
            size="lg" 
            className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 py-8 text-xl font-medium transition-all duration-300 hover:scale-105 shadow-xl"
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
