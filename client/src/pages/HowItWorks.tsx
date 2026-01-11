import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { UserChallengesCarousel } from "@/components/UserChallengesCarousel";
import { Camera, Brain, MessageSquare, Activity, FileText, ShieldCheck, ClipboardList, Calendar, Bell, TrendingUp, HeartPulse } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-stone-200">
      <Navigation />

      {/* Hero Section - Minimalist & Zen */}
      <section className="relative py-40 md:py-52 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/backgrounds/how-it-works.jpg" 
            alt="DentaSmart App Interface" 
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
              Know what's going on <br />
              <span className="font-normal italic">before</span> it hurts.
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
              Three simple steps to understand your mouth and take control of your oral health.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3-Step Visual Process - Editorial Style */}
      <section className="py-32 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-stone-200 -z-10"></div>

            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 bg-white border border-stone-200 rounded-full flex items-center justify-center mb-8 shadow-sm group-hover:border-stone-900 group-hover:scale-105 transition-all duration-500 relative z-10">
                <Camera className="w-8 h-8 text-stone-900" strokeWidth={1.5} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-stone-900 text-white rounded-full flex items-center justify-center font-medium text-sm">1</div>
              </div>
              <h3 className="text-2xl font-medium text-stone-900 mb-4">Upload</h3>
              <p className="text-stone-600 font-light leading-relaxed max-w-xs">
                Take a photo or upload an X-ray. Works on any phone in 30 seconds.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 bg-white border border-stone-200 rounded-full flex items-center justify-center mb-8 shadow-sm group-hover:border-stone-900 group-hover:scale-105 transition-all duration-500 relative z-10">
                <Brain className="w-8 h-8 text-stone-900" strokeWidth={1.5} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-stone-900 text-white rounded-full flex items-center justify-center font-medium text-sm">2</div>
              </div>
              <h3 className="text-2xl font-medium text-stone-900 mb-4">Analyze</h3>
              <p className="text-stone-600 font-light leading-relaxed max-w-xs">
                AI scans for issues instantly. Get results in plain English, not jargon.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 bg-white border border-stone-200 rounded-full flex items-center justify-center mb-8 shadow-sm group-hover:border-stone-900 group-hover:scale-105 transition-all duration-500 relative z-10">
                <MessageSquare className="w-8 h-8 text-stone-900" strokeWidth={1.5} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-stone-900 text-white rounded-full flex items-center justify-center font-medium text-sm">3</div>
              </div>
              <h3 className="text-2xl font-medium text-stone-900 mb-4">Act</h3>
              <p className="text-stone-600 font-light leading-relaxed max-w-xs">
                Chat with Dr. Din. Share reports with your dentist. Fix issues early.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* User Challenges Carousel */}
      <section className="py-20 bg-stone-100">
        <UserChallengesCarousel />
      </section>

      {/* Report Features - Clean Grid */}
      <section className="py-32 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-6">
              What you get in your report
            </h2>
            <p className="text-xl text-stone-600 font-light">
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
                className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-stone-900 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-stone-900 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-stone-900 mb-3">{feature.title}</h3>
                <p className="text-stone-600 font-light leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white text-center">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-8">
            Ready to take control?
          </h2>
          <p className="text-xl text-stone-600 font-light mb-12 leading-relaxed">
            Join thousands of users who are already smarter about their dental health.
          </p>
          <Button 
            size="lg" 
            className="bg-stone-900 hover:bg-stone-800 text-white rounded-full px-10 py-8 text-xl font-medium transition-all duration-300 hover:scale-105 shadow-xl"
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
