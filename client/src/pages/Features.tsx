import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { UserChallengesCarousel } from "@/components/UserChallengesCarousel";
import { Brain, MessageSquare, ShieldCheck, Activity, Lock, TrendingUp, Check } from "lucide-react";

export default function Features() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900">
      <Navigation />

      {/* Hero Section - Editorial Style */}
      <section className="relative py-32 md:py-48 bg-stone-100 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/challenges/ai_advantages.jpg" 
            alt="AI Dental Analysis" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-100/90 via-stone-100/60 to-stone-100" />
        </div>

        <div className="container relative z-10 px-4 mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-stone-900 mb-8 leading-[1.1]">
            Everything you need to <br />
            <span className="font-normal italic">understand your teeth</span>.
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
            Powerful features designed to give you clarity, control, and confidence in your oral health journey.
          </p>
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
              <div key={idx} className="text-center group">
                <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-stone-900 transition-colors duration-500">
                  <feature.icon className="w-8 h-8 text-stone-900 group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-medium text-stone-900 mb-4">{feature.title}</h3>
                <p className="text-stone-600 font-light leading-relaxed max-w-xs mx-auto">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Deep Dives - Alternating Layout */}
      <section className="py-32 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl space-y-32">
          
          {/* AI Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1">
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
            </div>
            <div className="order-1 md:order-2 relative aspect-square rounded-3xl overflow-hidden bg-stone-200">
              <img 
                src="/images/challenges/ai_advantages.jpg" 
                alt="AI Analysis" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Dr. Din */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-stone-200">
              <img 
                src="/images/challenges/daily_tracking.jpg" 
                alt="Dr. Din Chat" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div>
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
            </div>
          </div>

          {/* Dental Record Vault */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1">
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
            </div>
            <div className="order-1 md:order-2 relative aspect-square rounded-3xl overflow-hidden bg-stone-200">
              <img 
                src="/images/challenges/transparency.jpg" 
                alt="Secure Vault" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* User Challenges Carousel */}
      <UserChallengesCarousel />

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
              <div key={idx} className="bg-stone-50 p-6 rounded-2xl">
                <h3 className="font-medium text-stone-900 mb-2">{item.title}</h3>
                <p className="text-stone-600 font-light text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-stone-900 text-center">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
            Experience the difference
          </h2>
          <p className="text-xl text-white/80 font-light mb-12 leading-relaxed">
            Try all features free for 7 days. No credit card required.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-stone-900 hover:bg-stone-100 rounded-full px-10 py-8 text-xl font-medium transition-all duration-300 hover:scale-105"
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
