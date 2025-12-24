import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { UserChallengesCarousel } from "@/components/UserChallengesCarousel";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900">
      <Navigation />

      {/* Hero Section - Oura Style */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-stone-100">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/challenges/prevention.jpg" 
            alt="DentaSmart Lifestyle" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-100/80 via-stone-100/50 to-stone-100" />
        </div>

        <div className="container relative z-10 px-4 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-stone-900 mb-8 leading-[1.1]">
              Understand your mouth <br />
              <span className="font-normal italic">before</span> your dentist explains it.
            </h1>
            
            <p className="text-xl md:text-2xl text-stone-600 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              DentaSmart helps you monitor your teeth and gums monthly with a quick photo check and clear guidance.
              Prevent problems early and get a second opinion before costly dental work.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-stone-900 hover:bg-stone-800 text-white rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-105"
                onClick={() => window.open('https://apps.apple.com/us/app/dentasmart/id6670311232', '_blank')}
              >
                Download the App
              </Button>
              <Link href="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-stone-300 text-stone-700 hover:bg-stone-200 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300"
                >
                  See Pricing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* User Challenges Carousel */}
      <UserChallengesCarousel />

      {/* Social Proof - Minimalist */}
      <section className="py-24 bg-white border-y border-stone-100">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { value: "50K+", label: "Scans Analyzed" },
              { value: "100%", label: "Detection Accuracy" },
              { value: "24/7", label: "Dr. Din Support" }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-5xl md:text-6xl font-light text-stone-900 tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-sm uppercase tracking-widest text-stone-500 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem - Editorial Layout */}
      <section className="py-32 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <img 
                src="/images/challenges/dental_anxiety.jpg" 
                alt="Dental Anxiety" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-12">
              <h2 className="text-4xl md:text-5xl font-light leading-tight text-stone-900">
                The problem isn't just your teeth. <br />
                <span className="italic font-normal">It's the uncertainty.</span>
              </h2>
              
              <div className="space-y-8">
                {[
                  {
                    title: "Confusing Jargon",
                    desc: "X-rays and technical terms leave you feeling lost in translation."
                  },
                  {
                    title: "Surprise Costs",
                    desc: "Unexpected bills and insurance denials derail your budget."
                  },
                  {
                    title: "Waiting Too Long",
                    desc: "By the time you feel pain, the damage is done and expensive."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="border-l-2 border-stone-200 pl-6 py-2">
                    <h3 className="text-xl font-medium text-stone-900 mb-2">{item.title}</h3>
                    <p className="text-stone-600 font-light leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution - Feature Grid */}
      <section className="py-32 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-6">
              Your Personal AI Dental Companion
            </h2>
            <p className="text-xl text-stone-600 font-light leading-relaxed">
              DentaSmart analyzes your mouth in seconds, explains what's happening in plain language, and helps you make informed decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: "🔍", 
                title: "Upload & Analyze", 
                desc: "Take photos or upload X-rays. Get instant AI analysis.",
                image: "/images/challenges/ai_advantages.jpg"
              },
              { 
                icon: "📊", 
                title: "Understand Results", 
                desc: "Plain-language explanations. No jargon. No confusion.",
                image: "/images/challenges/trust_clarity.jpg"
              },
              { 
                icon: "💬", 
                title: "Ask Dr. Din", 
                desc: "Chat 24/7 with your AI dental companion. Get answers anytime.",
                image: "/images/challenges/daily_tracking.jpg"
              }
            ].map((feature, idx) => (
              <div key={idx} className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-stone-100">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-white/80 font-light leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Minimalist Cards */}
      <section className="py-32 bg-stone-50">
        <div className="container px-4 mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-16 text-center">
            Simple, transparent pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-stone-100 hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-medium text-stone-900">Clarity Plan</h3>
                  <p className="text-stone-500 mt-1">Unlimited Full Mouth Analysis</p>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-light text-stone-900">$75</span>
                  <span className="text-stone-500 block text-sm">/year</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center text-stone-600 font-light">
                  <span className="w-2 h-2 bg-stone-900 rounded-full mr-3" />
                  Unlimited AI scans
                </li>
                <li className="flex items-center text-stone-600 font-light">
                  <span className="w-2 h-2 bg-stone-900 rounded-full mr-3" />
                  Monthly monitoring
                </li>
                <li className="flex items-center text-stone-600 font-light">
                  <span className="w-2 h-2 bg-stone-900 rounded-full mr-3" />
                  Priority Dr. Din support
                </li>
              </ul>
              <Button className="w-full bg-stone-900 hover:bg-stone-800 text-white rounded-full py-6 text-lg">
                Start Free Trial
              </Button>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-sm border border-stone-100 hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-medium text-stone-900">Consult Plan</h3>
                  <p className="text-stone-500 mt-1">One-time Analysis (Second Opinion)</p>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-light text-stone-900">$30</span>
                  <span className="text-stone-500 block text-sm">one-time</span>
                </div>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center text-stone-600 font-light">
                  <span className="w-2 h-2 bg-stone-900 rounded-full mr-3" />
                  Single comprehensive scan
                </li>
                <li className="flex items-center text-stone-600 font-light">
                  <span className="w-2 h-2 bg-stone-900 rounded-full mr-3" />
                  Detailed report PDF
                </li>
                <li className="flex items-center text-stone-600 font-light">
                  <span className="w-2 h-2 bg-stone-900 rounded-full mr-3" />
                  Second opinion verification
                </li>
              </ul>
              <Button variant="outline" className="w-full border-stone-300 text-stone-900 hover:bg-stone-50 rounded-full py-6 text-lg">
                Get One-Time Scan
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Image Background */}
      <section className="relative py-40 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/challenges/empowerment.jpg" 
            alt="Empowerment" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        </div>
        
        <div className="container relative z-10 text-center px-4">
          <h2 className="text-5xl md:text-7xl font-light text-white mb-8 tracking-tight">
            Ready to stop worrying?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 font-light mb-12 max-w-2xl mx-auto">
            Download DentaSmart today and get instant insights into your oral health.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-stone-900 hover:bg-stone-100 rounded-full px-10 py-8 text-xl font-medium transition-all duration-300 hover:scale-105"
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
