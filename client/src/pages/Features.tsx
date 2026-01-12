import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { UserChallengesCarousel } from "@/components/UserChallengesCarousel";
import { Brain, MessageSquare, ShieldCheck, Activity, Lock, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-stone-200">
      <Navigation />

      {/* Hero Section - Abstract & Tech */}
      <section className="relative py-40 md:py-52 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/backgrounds/hero-smile-generic.jpg" 
            alt="AI Dental Analysis" 
            className="w-full h-full object-cover object-top md:object-center"
          />
          <div className="absolute inset-0 bg-white/60" />
        </div>

        <div className="container relative z-10 px-4 mx-auto max-w-4xl text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-light tracking-tight text-foreground mb-8 leading-[1.1]">
              Everything you need to <br />
              <span className="font-normal italic">understand your teeth</span>.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mr-auto font-light leading-relaxed">
              Powerful features designed to give you clarity, control, and confidence in your oral health journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Pillars - Minimalist Grid */}
      <section className="py-32 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-6">
              The three pillars of DentaSmart
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: Activity, 
                title: "Monitor", 
                desc: "Track your oral health month to month and catch problems early." 
              },
              { 
                icon: Brain, 
                title: "Understand", 
                desc: "Get plain-language explanations so you know exactly what's happening." 
              },
              { 
                icon: ShieldCheck, 
                title: "Decide", 
                desc: "Make confident decisions about your dental care with data-backed insights." 
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-stone-900 transition-colors duration-500">
                  <feature.icon className="w-8 h-8 text-stone-900 group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-medium text-stone-900 mb-4">{feature.title}</h3>
                <p className="text-stone-600 font-light leading-relaxed max-w-xs mx-auto">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Deep Dives - Alternating Layout */}
      <section className="py-32 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl space-y-32">
          
          {/* AI Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1"
            >
              <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-6">
                AI-Powered Analysis
              </h2>
              <p className="text-xl text-stone-600 font-light leading-relaxed mb-8">
                Our AI is trained by dental experts and analyzes your mouth with 100% detection accuracy. It identifies potential cavities, gum disease, wear patterns, and other visible concerns in seconds.
              </p>
              <ul className="space-y-4">
                {["Trained by dental experts", "100% detection accuracy", "Analyzes in 1-2 minutes", "Works with photos and X-rays"].map((item, idx) => (
                  <li key={idx} className="flex items-center text-stone-700 font-light">
                    <Check className="w-5 h-5 text-stone-900 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-2 relative aspect-square rounded-3xl overflow-hidden bg-stone-200 shadow-xl"
            >
              <img 
                src="/images/challenges/ai_advantages.jpg" 
                alt="AI Analysis" 
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>

          {/* Dr. Din */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-3xl overflow-hidden bg-stone-200 shadow-xl"
            >
              <img 
                src="/images/challenges/daily_tracking.jpg" 
                alt="Dr. Din Chat" 
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-6">
                Dr. Din: Your AI Dental Companion
              </h2>
              <p className="text-xl text-stone-600 font-light leading-relaxed mb-8">
                Have questions? Ask Dr. Din anytime. Your AI dental companion is available 24/7 to answer questions, provide guidance, and help you understand your oral health.
              </p>
              <ul className="space-y-4">
                {["Available 24/7", "Instant answers", "Personalized guidance", "No appointment needed"].map((item, idx) => (
                  <li key={idx} className="flex items-center text-stone-700 font-light">
                    <Check className="w-5 h-5 text-stone-900 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Dental Record Vault */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1"
            >
              <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-6">
                Your Dental Record Vault
              </h2>
              <p className="text-xl text-stone-600 font-light leading-relaxed mb-8">
                Keep your dental history in one secure place. Store all your images, reports, and notes so you never have to start over when you change dentists.
              </p>
              <ul className="space-y-4">
                {["Secure storage", "Portable records", "Share with dentists", "Never lose your history"].map((item, idx) => (
                  <li key={idx} className="flex items-center text-stone-700 font-light">
                    <Check className="w-5 h-5 text-stone-900 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-2 relative aspect-square rounded-3xl overflow-hidden bg-stone-200 shadow-xl"
            >
              <img 
                src="/images/challenges/transparency.jpg" 
                alt="Secure Vault" 
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>

        </div>
      </section>

      {/* User Challenges Carousel */}
      <section className="py-20 bg-stone-100">
        <UserChallengesCarousel />
      </section>

      {/* Security Section - Clean & Trustworthy */}
      <section className="py-32 bg-white">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Lock className="w-8 h-8 text-stone-900" strokeWidth={1.5} />
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-8">
            Security & Privacy First
          </h2>
          <p className="text-xl text-stone-600 font-light leading-relaxed mb-12">
            Your health data is protected by law. We use bank-level encryption and never sell your data to third parties. You own your data, always.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { title: "HIPAA Compliant", desc: "Full regulatory compliance for health data protection." },
              { title: "Encrypted Storage", desc: "AES-256 encryption for data at rest and in transit." },
              { title: "Your Data, Your Control", desc: "Export or delete your data anytime with one click." }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-stone-50 p-6 rounded-2xl border border-stone-100"
              >
                <h3 className="font-medium text-stone-900 mb-2">{item.title}</h3>
                <p className="text-stone-600 font-light text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-[#D0F0F5] text-center">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-8">
            Experience the difference
          </h2>
          <p className="text-xl text-muted-foreground font-light mb-12 leading-relaxed">
            Try all features free for 7 days. No credit card required.
          </p>
          <Button 
            size="lg" 
            className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 py-8 text-xl font-medium transition-all duration-300 hover:scale-105 shadow-xl"
            onClick={() => window.open('https://apps.apple.com/us/app/dentasmart/id6670311232', '_blank')}
          >
            Start Free Trial
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
