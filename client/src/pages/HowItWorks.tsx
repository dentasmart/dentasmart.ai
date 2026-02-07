import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import HowItWorksHero from "@/components/HowItWorksHero";
import { DownloadCTA } from "@/components/DownloadCTA";
import { UserChallengesCarousel } from "@/components/UserChallengesCarousel";
import { Camera, Brain, FileText, MessageSquare, Activity, ShieldCheck, ClipboardList, Calendar, Bell, TrendingUp, HeartPulse } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-foreground selection:bg-primary/20">
      <Navigation />

      {/* Hero Section (New StoryBrand) */}
      <HowItWorksHero />

      {/* 4-Step Visual Process (New StoryBrand) */}
      <section className="pt-12 pb-24 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px bg-border -z-10"></div>

            {/* Step 1: Capture */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 bg-white border border-border rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:border-primary group-hover:scale-105 transition-all duration-500 relative z-10">
                <Camera className="w-8 h-8 text-foreground" strokeWidth={1.5} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-medium text-sm">1</div>
              </div>
              <h3 className="text-2xl font-medium text-foreground mb-4">Capture</h3>
              <p className="text-muted-foreground font-normal leading-relaxed max-w-xs">
                Take 2 mouth photos or upload X-rays.
              </p>
            </motion.div>

            {/* Step 2: Analyze */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 bg-white border border-border rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:border-primary group-hover:scale-105 transition-all duration-500 relative z-10">
                <Brain className="w-8 h-8 text-foreground" strokeWidth={1.5} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-medium text-sm">2</div>
              </div>
              <h3 className="text-2xl font-medium text-foreground mb-4">Analyze</h3>
              <p className="text-muted-foreground font-normal leading-relaxed max-w-xs">
                AI highlights what to watch and why it matters.
              </p>
            </motion.div>

            {/* Step 3: Understand */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 bg-white border border-border rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:border-primary group-hover:scale-105 transition-all duration-500 relative z-10">
                <FileText className="w-8 h-8 text-foreground" strokeWidth={1.5} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-medium text-sm">3</div>
              </div>
              <h3 className="text-2xl font-medium text-foreground mb-4">Understand</h3>
              <p className="text-muted-foreground font-normal leading-relaxed max-w-xs">
                Plain-English report with an Oral Health Score.
              </p>
            </motion.div>

            {/* Step 4: Act */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 bg-white border border-border rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:border-primary group-hover:scale-105 transition-all duration-500 relative z-10">
                <MessageSquare className="w-8 h-8 text-foreground" strokeWidth={1.5} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-medium text-sm">4</div>
              </div>
              <h3 className="text-2xl font-medium text-foreground mb-4">Act</h3>
              <p className="text-muted-foreground font-normal leading-relaxed max-w-xs">
                Follow a simple plan or bring the report to your dentist.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* User Challenges Carousel (Restored) */}
      <section className="py-24 bg-stone-100">
        <UserChallengesCarousel />
      </section>

      {/* What you'll walk away with - 3 Tiles (New StoryBrand) */}
      <section className="py-24 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-normal text-foreground mb-6">
              What you'll walk away with
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Activity, 
                title: "Oral Health Score", 
                desc: "A clear 0-100 rating of your dental wellness." 
              },
              { 
                icon: ShieldCheck, 
                title: "Top findings with severity", 
                desc: "Know exactly what needs attention now vs later." 
              },
              { 
                icon: ClipboardList, 
                title: "Action plan and reminders", 
                desc: "Simple steps to improve your health daily." 
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white p-10 rounded-3xl shadow-sm border border-stone-100 hover:shadow-md transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto text-primary">
                  <feature.icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-medium text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground font-normal leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Report Features - Clean Grid (Restored) */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-normal text-foreground mb-6">
              What you get in your report
            </h2>
            <p className="text-xl text-muted-foreground font-normal">
              Comprehensive insights, simplified for you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: Activity, 
                title: "Visual Findings", 
                desc: "We highlight exactly where the problem is on your image. No guessing." 
              },
              { 
                icon: FileText, 
                title: "Plain English", 
                desc: "\"Mesial caries on #14\" becomes \"Small cavity between your upper left molars.\"" 
              },
              { 
                icon: ShieldCheck, 
                title: "Action Plan", 
                desc: "Clear next steps: Watch it, treat it, or get a second opinion." 
              },
              { 
                icon: ClipboardList, 
                title: "Care Plan", 
                desc: "A personalized roadmap for your treatments and daily hygiene routine." 
              },
              { 
                icon: Calendar, 
                title: "Timelines", 
                desc: "Know exactly when to schedule appointments and follow-ups." 
              },
              { 
                icon: Bell, 
                title: "Reminders", 
                desc: "Smart notifications so you never miss a check-up or daily habit." 
              },
              { 
                icon: TrendingUp, 
                title: "Risk Assessment", 
                desc: "Understand your long-term risks for cavities, gum disease, and more." 
              },
              { 
                icon: HeartPulse, 
                title: "Oral Health Score", 
                desc: "A simple 0-100 score to track your overall dental wellness over time." 
              },
              { 
                icon: MessageSquare, 
                title: "Talking Points", 
                desc: "Specific questions to ask your dentist so you walk in prepared." 
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-border hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-accent/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-foreground group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground font-normal leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Teaser (New StoryBrand) */}
      <section className="py-24 bg-white border-t border-stone-100">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-8">
            Common Questions
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-10 text-lg text-stone-600 font-light">
            <p>How accurate is it?</p>
            <span className="hidden md:block text-stone-300">•</span>
            <p>What photos work best?</p>
            <span className="hidden md:block text-stone-300">•</span>
            <p>Is it a dentist replacement?</p>
          </div>
          <Link href="/faqs">
            <Button variant="outline" size="lg" className="rounded-full px-8 border-stone-300 text-stone-600 hover:bg-stone-100 hover:text-black">
              Read all FAQs
            </Button>
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <DownloadCTA />

      <Footer />
    </div>
  );
}
