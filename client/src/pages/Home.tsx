import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BenefitsCarousel } from "@/components/BenefitsCarousel";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Smartphone, Activity } from "lucide-react";
import { DownloadCTA } from "@/components/DownloadCTA";
import { AndroidEarlyAccessModal } from "@/components/AndroidEarlyAccessModal";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const [location] = useLocation();
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState(false);

  useEffect(() => {
    // Handle hash navigation manually to ensure scroll happens
    const hash = window.location.hash;
    if (hash === "#android-waitlist" || hash === "#download-cta") {
      const id = hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 300); // Increased delay to ensure full page render
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black selection:bg-primary/20">
      <SEO 
        title="Your Personal AI Dental Guide" 
        description="Get instant clarity about your oral health. Upload a photo and get AI-powered insights, personalized plans, and reminders in minutes."
      />
      <Navigation />

      {/* Hero Section - Full Background Image with Overlay */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/dOrOUbRuSUXPRulY.jpg" 
            alt="Woman with healthy smile" 
            className="w-full h-full object-cover object-center md:object-[80%_20%]"
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent md:via-white/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent md:hidden" />
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
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-black mb-8 leading-[1.1]">
                Know what’s happening <br />
                <span className="font-normal italic text-primary">in your mouth</span>.
              </h1>
              
              <p className="text-xl md:text-2xl text-stone-700 mb-10 font-normal leading-relaxed text-balance">
                Upload a photo of your teeth or X-rays and get clear AI insights in minutes, with an easy plan to prevent expensive surprises.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-start items-center sm:items-start">
                <Button 
                  size="lg" 
                  className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 py-8 text-lg font-medium transition-all duration-300 hover:scale-105 shadow-xl border-0 w-full sm:w-auto cursor-pointer relative z-20"
                  onClick={() => {
                    const element = document.getElementById('download-cta');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Get My Oral Health Score
                </Button>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/50 backdrop-blur-md border-primary/20 text-primary hover:bg-white/80 rounded-full px-10 py-8 text-lg font-medium transition-all duration-300 w-full sm:w-auto cursor-pointer relative z-20"
                  >
                    See Pricing
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Empty to let image show through, or optional floating elements */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-6"></div>

          </div>
        </div>
      </section>

      {/* Video Section - StoryBrand Aligned */}
      <section id="video-section" className="py-12 bg-accent/5 border-b border-border">
        <div className="container px-4 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-normal text-black mb-6">
              See DentaSmart in Action
            </h2>
            <p className="text-xl text-stone-700 font-normal max-w-2xl mx-auto mb-6 leading-relaxed">
              Watch our explainer video to learn how DentaSmart empowers you with AI-driven insights into your oral health.
            </p>
            
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-foreground group">
              {/* Custom Thumbnail Overlay */}
              <div 
                className="absolute inset-0 z-10 cursor-pointer group-hover:scale-105 transition-transform duration-700"
                onClick={(e) => {
                  e.currentTarget.style.display = 'none';
                  // Auto-play video when thumbnail is clicked
                  const iframe = e.currentTarget.nextElementSibling as HTMLIFrameElement;
                  if (iframe) {
                    iframe.src += "?autoplay=1";
                  }
                }}
              >
                <img 
                  src="/images/narrator-thumbnail.png" 
                  alt="DentaSmart Video Thumbnail" 
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-10 items-start">
                  {/* Top Left: Headline Box */}
                  <div className="bg-primary/90 backdrop-blur-sm rounded-xl p-4 md:p-6 max-w-[70%] md:max-w-md shadow-lg">
                    <h3 className="text-white text-lg md:text-3xl font-bold leading-tight">
                      Stop guessing about your oral health.
                    </h3>
                    <p className="text-white/90 mt-1 md:mt-2 text-sm md:text-lg font-medium">
                      Get instant clarity today.
                    </p>
                  </div>

                  {/* Bottom Right: Logo - Removed for cleaner look */}

                  {/* Center: Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-20 h-20 group-hover:scale-110 transition-transform pointer-events-auto">
                      <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-lg">
                        <circle cx="50" cy="50" r="48" fill="#DC2626" stroke="white" strokeWidth="4" />
                        <path d="M42 32 L68 50 L42 68 Z" fill="white" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
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
              { value: "24/7", label: "Din Support" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="space-y-2 pt-8 md:pt-0"
              >
                <div className="text-5xl md:text-6xl font-normal text-black tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-stone-700 font-medium">
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
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/MVOEXBpESLROdzsK.jpg" 
                alt="Dental Anxiety" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:pl-12"
            >
              <h2 className="text-5xl md:text-6xl font-normal text-black mb-8 leading-tight">
                The problem isn't <br />
                your teeth. <br />
                <span className="italic text-primary">It's not knowing.</span>
              </h2>
              
              <div className="space-y-6">
                {[
                  "Dental jargon makes you feel powerless",
                  "Surprise costs show up after you say yes",
                  "By the time it hurts, it is expensive"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                    <p className="text-xl text-stone-700 font-light">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Guide - Empathy & Authority */}
      <section className="py-24 bg-stone-900 text-white">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-normal mb-8 text-white">
              We get it. Dental care can feel like a guessing game.
            </h2>
            <p className="text-xl md:text-2xl text-stone-200 font-light mb-12 leading-relaxed">
              Most people feel anxious and confused about their dental health. <br />
              <span className="text-white font-normal">DentaSmart gives you a clear starting point so you can make confident decisions.</span>
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 text-sm font-medium tracking-wide uppercase">
                50K+ Scans Analyzed
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 text-sm font-medium tracking-wide uppercase">
                Advised by Clinical Leaders
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Plan - 3 Step Strip */}
      <section className="py-16 bg-primary text-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { step: "01", title: "Upload a Photo", desc: "Take a quick picture of your teeth or upload X-rays." },
              { step: "02", title: "Get Instant Insights", desc: "Our AI analyzes your oral health in seconds." },
              { step: "03", title: "Take Control", desc: "Follow a clear, personalized plan to better health." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-white/30 absolute -top-8 left-1/2 -translate-x-1/2 select-none">
                  {item.step}
                </div>
                <h3 className="text-2xl font-medium mb-2 relative z-10 text-white">{item.title}</h3>
                <p className="text-white font-light relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section (Carousel) */}
      <BenefitsCarousel />

      {/* Real Stories, Real Savings */}
      <section className="py-24 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-normal text-black mb-6">
              Real Stories, <span className="text-primary italic">Real Savings</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                problem: "I was terrified of going to the dentist.",
                change: "DentaSmart explained everything before I went.",
                outcome: "I saved $500 and felt confident.",
                author: "Sarah J."
              },
              {
                problem: "I didn't understand my treatment plan.",
                change: "The AI broke down the jargon instantly.",
                outcome: "I avoided an unnecessary procedure.",
                author: "Michael T."
              },
              {
                problem: "I always worried about surprise bills.",
                change: "I knew the costs upfront.",
                outcome: "No more financial anxiety.",
                author: "Elena R."
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100"
              >
                <div className="space-y-6">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-stone-500 font-medium mb-1">The Problem</div>
                    <p className="text-stone-900 font-medium">"{item.problem}"</p>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-primary font-medium mb-1">What Changed</div>
                    <p className="text-stone-700">"{item.change}"</p>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-green-600 font-medium mb-1">The Outcome</div>
                    <p className="text-stone-900 font-medium">"{item.outcome}"</p>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-stone-100 text-stone-500 text-sm">
                  — {item.author}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/stories">
              <Button variant="outline" className="rounded-full px-8 border-stone-300 text-stone-600 hover:bg-stone-100 hover:text-black">
                Read more stories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Download Section - Device Aware */}
      <section id="download-cta" className="py-24 bg-white">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-normal text-black mb-4">
              Download DentaSmart
            </h2>
            <p className="text-xl text-stone-600 font-light">
              Start with a free scan today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* iOS Column */}
            <div className="flex flex-col items-center space-y-6 p-8 rounded-3xl bg-stone-50 border border-stone-100">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-2">
                <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.74-3.03 1.59-.67.79-1.25 2.05-1.09 3.2 1.17.09 2.35-.84 3.05-1.68" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-black">iOS</h3>
              <a href="https://apps.apple.com/us/app/dentasmart/id6670311232" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full bg-black text-white hover:bg-stone-800 rounded-full h-12">
                  Download on App Store
                </Button>
              </a>
              <div className="w-32 h-32 bg-white p-2 rounded-xl shadow-sm border border-stone-100">
                <img 
                  src="/images/qr-code.png" 
                  alt="Download on iOS QR Code" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Android Column */}
            <div className="flex flex-col items-center space-y-6 p-8 rounded-3xl bg-stone-50 border border-stone-100">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mb-2">
                <Smartphone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-black">Android</h3>
             <Button 
                className="w-full bg-primary text-white hover:bg-primary/90 rounded-full h-12"
                onClick={() => setIsAndroidModalOpen(true)}
              >
                Join Early Access
              </Button>
              <AndroidEarlyAccessModal 
                isOpen={isAndroidModalOpen} 
                onClose={() => setIsAndroidModalOpen(false)} 
              />
              <div className="text-center px-4">
                <p className="text-sm text-stone-600">
                  We're putting the finishing touches on our Android app. Join the waitlist to be notified first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
