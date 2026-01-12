import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { UserChallengesCarousel } from "@/components/UserChallengesCarousel";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Check, Shield, Smartphone, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground selection:bg-primary/20">
      <Navigation />

      {/* Hero Section - Cinematic & Editorial */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/backgrounds/home-hero.jpg" 
            alt="DentaSmart Lifestyle" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        </div>

        <div className="container relative z-10 px-4 text-center max-w-5xl mx-auto pt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white mb-8 leading-[1.1] drop-shadow-lg">
              Understand your mouth <br />
              <span className="font-normal italic">before</span> your dentist explains it.
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-6 font-normal leading-relaxed drop-shadow-md text-balance">
              Monthly monitoring, instant insights, and peace of mind. 
              Your personal AI dental companion is here.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 rounded-full px-10 py-8 text-lg font-medium transition-all duration-300 hover:scale-105 shadow-xl border-0"
                onClick={() => window.open('https://apps.apple.com/us/app/dentasmart/id6670311232', '_blank')}
              >
                Download the App
              </Button>
              <Link href="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 rounded-full px-10 py-8 text-lg font-medium transition-all duration-300"
                >
                  See Pricing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* Video Section - StoryBrand Aligned */}
      <section className="py-12 bg-accent/5 border-b border-border">
        <div className="container px-4 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-normal text-foreground mb-6">
              See DentaSmart in Action
            </h2>
            <p className="text-xl text-muted-foreground font-normal max-w-2xl mx-auto mb-6 leading-relaxed">
              Watch our explainer video to learn how DentaSmart empowers you with AI-driven insights into your oral health.
            </p>
            
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-foreground">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/Y1aoiv81rZo" 
                title="DentaSmart Explainer Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof - Minimalist & Clean */}
      <section className="py-12 bg-white border-b border-border/50">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-border/50">
            {[
              { value: "50K+", label: "Scans Analyzed" },
              { value: "100%", label: "Detection Accuracy" },
              { value: "24/7", label: "Dr. Din Support" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="space-y-2 pt-8 md:pt-0"
              >
                <div className="text-5xl md:text-6xl font-normal text-foreground tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem - Editorial Layout with Large Typography */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-accent/10 overflow-hidden">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img 
                src="/images/challenges/dental_anxiety.jpg" 
                alt="Dental Anxiety" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-lg font-normal italic">"I used to dread the dentist. Now I know exactly what to expect."</p>
                <p className="text-sm mt-2 font-medium opacity-80">— Sarah, DentaSmart User</p>
              </div>
            </motion.div>
            
            <div className="space-y-8">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-normal leading-tight text-foreground"
              >
                The problem isn't just your teeth. <br />
                <span className="italic font-normal text-muted-foreground">It's the uncertainty.</span>
              </motion.h2>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Confusing Jargon",
                    desc: "X-rays and technical terms leave you feeling lost in translation. We translate 'doctor speak' into plain English."
                  },
                  {
                    title: "Surprise Costs",
                    desc: "Unexpected bills and insurance denials derail your budget. Know the costs before you sit in the chair."
                  },
                  {
                    title: "Waiting Too Long",
                    desc: "By the time you feel pain, the damage is done. Catch issues months before they become emergencies."
                  }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2, duration: 0.6 }}
                    className="group"
                  >
                    <h3 className="text-2xl font-normal text-foreground mb-3 group-hover:text-primary transition-colors duration-300 flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-muted group-hover:bg-primary transition-colors" />
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground font-normal leading-relaxed pl-5 border-l border-border group-hover:border-primary/30 transition-colors duration-300">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Challenges Carousel - Seamless Integration */}
      <section className="py-20 bg-accent/5">
        <div className="container px-4 mx-auto mb-6 text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-foreground">Real Scenarios. Real Clarity.</h2>
        </div>
        <UserChallengesCarousel />
      </section>

      {/* The Solution - Minimalist Feature Grid */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-normal text-foreground mb-6">
              Your Personal AI Dental Companion
            </h2>
            <p className="text-xl text-muted-foreground font-normal leading-relaxed">
              DentaSmart analyzes your mouth in seconds, explains what's happening in plain language, and helps you make informed decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Smartphone, 
                title: "Upload & Analyze", 
                desc: "Take photos or upload X-rays. Get instant AI analysis.",
                image: "/images/challenges/ai_advantages.jpg"
              },
              { 
                icon: Activity, 
                title: "Understand Results", 
                desc: "Plain-language explanations. No jargon. No confusion.",
                image: "/images/challenges/trust_clarity.jpg"
              },
              { 
                icon: Shield, 
                title: "Ask Dr. Din", 
                desc: "Chat 24/7 with your AI dental companion. Get answers anytime.",
                image: "/images/challenges/daily_tracking.jpg"
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-accent/5 shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute bottom-0 left-0 p-8 text-white w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <feature.icon className="w-10 h-10 mb-6 text-white/90" strokeWidth={1.5} />
                  <h3 className="text-2xl font-medium mb-3">{feature.title}</h3>
                  <p className="text-white/80 font-normal leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {feature.desc}
                  </p>
                  <div className="mt-6 pt-6 border-t border-white/20 flex items-center text-sm font-medium tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Elegant Cards */}
      <section className="py-16 bg-gradient-to-b from-white to-accent/10">
        <div className="container px-4 mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-normal text-foreground mb-16 text-center">
            Simple, transparent pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Clarity Plan */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl p-10 shadow-sm border border-border/50 hover:shadow-xl transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-foreground text-white text-xs font-bold px-4 py-2 rounded-bl-xl uppercase tracking-wider">
                Most Popular
              </div>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-normal text-foreground">Clarity</h3>
                  <p className="text-muted-foreground mt-2 font-normal">Unlimited Full Mouth Analysis</p>
                </div>
                <div className="text-right">
                  <span className="text-5xl font-normal text-foreground">$75</span>
                  <span className="text-stone-400 block text-sm mt-1">/year</span>
                </div>
              </div>
              <ul className="space-y-5 mb-6">
                {[
                  "Unlimited AI scans",
                  "Monthly monitoring",
                  "Priority Dr. Din support",
                  "Dental record vault"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-muted-foreground font-normal">
                    <Check className="w-5 h-5 text-primary mr-4" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-foreground hover:bg-stone-800 text-white rounded-full py-7 text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                Start Free Trial
              </Button>
            </motion.div>

            {/* Consult Plan */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-accent/5/50 rounded-3xl p-10 border border-border hover:shadow-lg transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-normal text-foreground">Consult</h3>
                  <p className="text-muted-foreground mt-2 font-normal">One-time Analysis</p>
                </div>
                <div className="text-right">
                  <span className="text-5xl font-normal text-foreground">$30</span>
                  <span className="text-stone-400 block text-sm mt-1">one-time</span>
                </div>
              </div>
              <ul className="space-y-5 mb-6">
                {[
                  "Single comprehensive scan",
                  "Detailed report PDF",
                  "Second opinion verification",
                  "Valid for 30 days"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-muted-foreground font-normal">
                    <Check className="w-5 h-5 text-stone-400 mr-4" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full bg-transparent border-stone-300 text-foreground hover:bg-white rounded-full py-7 text-lg transition-all duration-300">
                Get One-Time Scan
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA - Cinematic */}
      <section className="relative py-40 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/challenges/empowerment.jpg" 
            alt="Empowerment" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]" />
        </div>
        
        <div className="container relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-normal text-white mb-8 tracking-tight drop-shadow-lg">
              Ready to stop worrying?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 font-normal mb-6 max-w-2xl mx-auto drop-shadow-md">
              Download DentaSmart today and get instant insights into your oral health.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 rounded-full px-12 py-8 text-xl font-medium transition-all duration-300 hover:scale-105 shadow-2xl border-0"
              onClick={() => window.open('https://apps.apple.com/us/app/dentasmart/id6670311232', '_blank')}
            >
              Download the App
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
