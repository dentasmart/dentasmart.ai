import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { DownloadSection } from "@/components/DownloadSection";
import { BenefitsCarousel } from "@/components/BenefitsCarousel";
import { Lock, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Features() {
  const features: { title: string; description: string; points: string[]; image: string; isPhone?: boolean }[] = [
    {
      title: "Stop Wondering What Your X-Rays Mean",
      description: "You shouldn't have to nod along pretending to understand complex dental jargon.\n\nOur AI X-ray Analysis acts as your personal translator, instantly highlighting areas of concern in simple, clear language. Finally, you can see exactly what your dentist sees and feel confident in your treatment plan.",
      points: [
        "Instant Clarity: See color-coded overlays that make issues obvious.",
        "Plain English: No more confusing medical terms—just clear explanations.",
        "Confidence: Walk into your appointment knowing exactly what to ask."
      ],
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/ZDzeChpbpgMeHJVN.png"
    },
    {
      title: "Catch Issues Before They Become Emergencies",
      description: "Waiting for your 6-month checkup can leave you vulnerable to silent problems.\n\nWith AI-Powered Mouth Image Insights, you can scan your smile anytime. Our technology spots subtle visual cues you might miss, giving you the peace of mind that comes from knowing you're catching potential issues early.",
      points: [
        "Peace of Mind: Check your oral health whenever you feel uncertain.",
        "Early Detection: Spot visual changes before they turn into painful problems.",
        "Easy Monitoring: Track your gum and tooth health from the comfort of home."
      ],
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/AfieCruvYKKqBoIa.png"
    },
    {
      title: "Personalized Care That Actually Fits Your Life",
      description: "Generic dental advice rarely leads to lasting results.\n\nGet Personalized Recommendations that adapt to your unique oral health profile. Instead of one-size-fits-all tips, you get actionable, tailored guidance that helps you improve your daily routine without feeling overwhelmed.",
      points: [
        "Tailored for You: Advice based on your specific scan results.",
        "Simple Steps: Actionable tips that fit easily into your daily routine.",
        "Better Habits: Learn exactly what *your* mouth needs to stay healthy."
      ],
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/ChlTSVZDNZEOfine.png"
    },
    {
      title: "See Your Progress, Stay Motivated",
      description: "It's hard to improve what you can't measure.\n\nOur Interactive Health Timeline turns your oral health journey into a clear visual story. Watch your improvements over time, celebrate your wins, and stay motivated to keep your smile healthy for life.",
      points: [
        "Visual Proof: See your health score improve as you build better habits.",
        "Complete History: Keep all your scans and insights in one secure place.",
        "Stay on Track: A clear view of your journey keeps you focused on the long term."
      ],
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/QmtzzNkXnZNbJvtj.png"
    },
    {
      title: "Know Your Risks Before They Become Reality",
      description: "Most dental problems are preventable if you know what to look for.\n\nProactive Risk Indicators work like a weather forecast for your mouth, alerting you to patterns that could lead to future trouble. Take control today so you don't have to deal with expensive repairs tomorrow.",
      points: [
        "Future-Proofing: Identify risk factors before they cause damage.",
        "Proactive Alerts: Get notified about patterns that need attention.",
        "Save Money: Prevention is always cheaper than a cure."
      ],
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/OmKqTEPOiEaBSwig.png"
    },
    {
      title: "A Simple Score for Total Clarity",
      description: "Dental health shouldn't be a guessing game.\n\nYour Dynamic Oral Wellness Score gives you a single, easy-to-understand number between 0-100. It’s the quickest way to know exactly where you stand, so you can stop worrying and start smiling.",
      points: [
        "Instant Status: Know your oral health standing at a glance.",
        "Real-Time Feedback: Watch your score rise as you take care of your teeth.",
        "Clear Goals: A simple target to aim for every day."
      ],
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/DawnQOxKtdjguhLp.jpeg",
      isPhone: true
    },
    {
      title: "Your 24/7 Personal AI Dental Guide",
      description: "Questions about your teeth don't always happen during office hours.\n\nMeet Din, your AI dental guide. Whether it's 2 AM or 2 PM, Din is ready to answer your questions, explain your results, and offer supportive advice in plain language. You're never alone on your journey to better health.",
      points: [
        "Always Available: Get answers the moment you need them.",
        "Friendly Support: A judgment-free zone for all your dental questions.",
        "Expert Knowledge: Instant access to reliable dental information."
      ],
      image: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/YSjOjqlpUabDbzAW.png"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-stone-200">
      <Navigation />

      {/* Hero Section - Full Background Image with Overlay */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/ZwswpLjHnfyByaVR.jpg" 
            alt="Woman smiling while checking dental health on phone" 
            className="w-full h-full object-cover object-top md:object-center"
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/80 md:hidden" />
        </div>

        <div className="container relative z-10 px-4 mx-auto max-w-7xl pt-32 md:pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-left max-w-2xl lg:col-span-7 xl:col-span-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-6 leading-[1.1]">
                Everything you need to understand <br />
                <span className="font-normal italic text-primary">your oral health</span>.
              </h1>
              
              <p className="text-lg md:text-xl text-stone-700 mb-8 font-normal leading-relaxed text-balance">
                Clarity first. Confidence next.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <Button 
                  size="lg" 
                  className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg border-0 cursor-pointer"
                  onClick={() => document.getElementById('download-cta')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get My Oral Health Score
                </Button>
                
              </div>
            </motion.div>

            {/* Right Column: Empty to let image show through */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-6"></div>

          </div>
        </div>
      </section>

      {/* Feature Deep Dives - Alternating Layout */}
      <section id="feature-deep-dives" className="pt-12 pb-12 bg-white">
        <div className="container px-4 mx-auto max-w-6xl space-y-12">
          
          {features.map((feature, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`order-2 ${idx % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}
              >
                <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-6">
                  {feature.title}
                </h2>
                <div className="text-xl text-stone-600 font-light leading-relaxed mb-8 whitespace-pre-line">
                  {feature.description}
                </div>
                <ul className="space-y-4">
                  {feature.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start text-black font-light">
                      <Check className="w-5 h-5 text-stone-900 mr-3 mt-1 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: idx % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`order-1 ${idx % 2 === 0 ? 'md:order-2' : 'md:order-1'} relative ${feature.isPhone ? 'flex items-center justify-center py-8' : 'aspect-[4/5] rounded-3xl overflow-hidden bg-stone-200 shadow-xl'}`}
              >
                {feature.isPhone ? (
                  <div className="relative w-[240px] sm:w-[280px] md:w-[300px]">
                    <div className="relative rounded-[2.5rem] sm:rounded-[3rem] border-[6px] sm:border-[8px] border-stone-900 bg-stone-900 shadow-2xl overflow-hidden">
                      {/* iPhone Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] sm:w-[100px] h-[22px] sm:h-[28px] bg-stone-900 rounded-b-2xl z-20" />
                      {/* Screen Content */}
                      <div className="relative aspect-[9/19.5] overflow-hidden bg-white">
                        <img 
                          src={feature.image} 
                          alt={feature.title} 
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="absolute inset-0 w-full h-full object-contain bg-white hover:scale-105 transition-transform duration-700"
                  />
                )}
              </motion.div>
            </div>
          ))}

        </div>
      </section>

      {/* Benefits Carousel */}
      <section className="py-12 bg-stone-50 overflow-hidden">
        <BenefitsCarousel />
      </section>

      {/* Security Section - Clean & Trustworthy */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <Lock className="w-8 h-8 text-stone-900" strokeWidth={1.5} />
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-8">
            Your Privacy is Our Priority
          </h2>
          <p className="text-xl text-stone-600 font-light leading-relaxed mb-12">
            You trust us with your health data, and we take that responsibility seriously. We use bank-level encryption to ensure your information stays private, secure, and completely under your control.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { title: "HIPAA Compliant", desc: "We meet the highest standards for health data protection." },
              { title: "Bank-Level Encryption", desc: "Your data is encrypted at rest and in transit." },
              { title: "You Own Your Data", desc: "Export or delete your information anytime, instantly." }
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
      <DownloadSection />

      <Footer />
    </div>
  );
}
