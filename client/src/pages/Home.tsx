import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BenefitsCarousel } from "@/components/BenefitsCarousel";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Smartphone, Activity, Star } from "lucide-react";
import { AndroidEarlyAccessModal } from "@/components/AndroidEarlyAccessModal";
import { trackAppDownload, getAppStoreUrl } from "@/lib/analytics";
import { DownloadSection } from "@/components/DownloadSection";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import { useEffect } from "react";
import { useLocation } from "wouter";
import QuickAnswerBlock from "@/components/QuickAnswerBlock";
import FAQSchema from "@/components/FAQSchema";
import { OrganizationSchema, WebSiteSchema, SoftwareApplicationSchema, HowToSchema } from "@/components/StructuredData";

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
        canonical="https://dentasmart.ai/"
      />
      <Navigation />
      <OrganizationSchema />
      <WebSiteSchema />
      <SoftwareApplicationSchema />
      <HowToSchema
        name="How to Use DentaSmart for AI Oral Health Analysis"
        description="Upload a photo of your teeth or dental X-rays and get AI-powered insights, an Oral Health Score, and a personalized care plan in minutes."
        steps={[
          { name: "Complete Self-Examination", text: "Answer guided questions including Bite Pressure Test, Cold Sensitivity Test, and Visual Inspection to help the AI understand your symptoms.", url: "/features" },
          { name: "Upload Photos or X-Rays", text: "Take a photo of your teeth or upload dental X-rays. Or use Quick Check for instant analysis.", url: "/download" },
          { name: "Get AI Analysis", text: "The AI analyzes your images with color-coded overlays and identifies potential oral health concerns in minutes.", url: "/how-it-works" },
          { name: "Review Dual Reports", text: "Receive two reports: a plain-English version for you with your Oral Health Score, and a clinical version for your dentist. Both downloadable as PDF.", url: "/features" }
        ]}
      />
      <FAQSchema faqs={[
        { question: "What is DentaSmart?", answer: "DentaSmart is an AI-powered oral health app that analyzes photos of your teeth or dental X-rays. It provides an Oral Health Score from 0 to 100, plain-English explanations of findings, treatment cost estimates, and a personalized care plan. It also includes Din, a 24/7 AI oral health guide." },
        { question: "How much does DentaSmart cost?", answer: "DentaSmart Individual Insights costs $75 per year ($0.21/day) for unlimited scans. Family Insights costs $150 per year for up to 5 family members. A one-time Second Opinion report costs $30." },
        { question: "Is DentaSmart a replacement for a dentist?", answer: "No. DentaSmart provides AI-powered educational insights to help you understand your oral health and prepare for better conversations with a licensed dentist. It does not diagnose or treat dental conditions." },
        { question: "How does DentaSmart work?", answer: "Upload a photo of your teeth or dental X-rays. The AI analyzes the image, identifies potential concerns, and provides an Oral Health Score, plain-English explanations, and a personalized care plan within minutes." },
        { question: "Is DentaSmart available on Android?", answer: "DentaSmart is live on iOS. Android is in Early Access. You can join the Android waitlist at dentasmart.ai/download." },
        { question: "What is the DentaSmart Oral Health Score?", answer: "The Oral Health Score is a number from 0 to 100 that reflects the overall health of your teeth and gums based on AI analysis of your dental photos or X-rays. It tracks changes over time." },
        { question: "Who is DentaSmart for?", answer: "DentaSmart is for anyone who wants to understand their oral health better, including people without dental insurance, those seeking a second opinion on a treatment plan, parents monitoring family dental health, and people with dental anxiety." },
        { question: "Can DentaSmart analyze dental X-rays?", answer: "Yes. DentaSmart can analyze both photos of your teeth and dental X-rays to identify potential oral health concerns and provide insights." }
      ]} />

      {/* Hero Section - Split Visual with iPhone Mockups */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-accent/5 to-primary/5">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 px-4 mx-auto max-w-7xl pt-40 md:pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-left max-w-2xl lg:col-span-5"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-black mb-4 leading-[1.1]">
                Understand your teeth <br />
                <span className="font-normal italic text-primary">before it costs you.</span>
              </h1>

              {/* Proof bar — directly under headline */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-sm font-semibold text-stone-800 ml-1">5.0 on the App Store</span>
                </div>
                <span className="text-stone-300 hidden sm:inline">|</span>
                <span className="text-sm text-stone-600">50K+ scans analyzed</span>
                <span className="text-stone-300 hidden sm:inline">|</span>
                <span className="text-sm text-stone-600">Free to start</span>
              </div>
              
              <p className="text-xl md:text-2xl text-stone-700 mb-8 font-normal leading-relaxed text-balance">
                Know what's happening in your mouth. Upload a photo of your teeth or X-rays and get clear AI insights in minutes, with an easy plan to prevent expensive surprises.
              </p>

              {/* Primary: iOS download. Secondary: Android early access. */}
              <div className="flex flex-col sm:flex-row gap-4 justify-start items-stretch sm:items-start">
                <a
                  href={getAppStoreUrl("hero_cta")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAppDownload("ios", "hero_cta")}
                  className="relative z-20"
                >
                  <Button
                    size="lg"
                    className="bg-black text-white hover:bg-stone-800 rounded-full px-8 py-7 text-lg font-medium transition-all duration-300 hover:scale-105 shadow-xl border-0 cursor-pointer w-full"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current mr-2 flex-shrink-0">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.74-3.03 1.59-.67.79-1.25 2.05-1.09 3.2 1.17.09 2.35-.84 3.05-1.68" />
                    </svg>
                    Scan your teeth — free
                  </Button>
                </a>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/50 backdrop-blur-md border-primary/20 text-primary hover:bg-white/80 rounded-full px-8 py-7 text-lg font-medium transition-all duration-300 cursor-pointer relative z-20"
                  onClick={() => {
                    trackAppDownload("android", "hero_cta");
                    setIsAndroidModalOpen(true);
                  }}
                >
                  <Smartphone className="w-5 h-5 mr-2 flex-shrink-0" />
                  Android Early Access
                </Button>
              </div>
              <div className="mt-3">
                <Link href="/pricing" className="text-sm text-stone-500 hover:text-primary underline underline-offset-2 transition-colors">
                  See pricing
                </Link>
              </div>
              <AndroidEarlyAccessModal
                isOpen={isAndroidModalOpen}
                onClose={() => setIsAndroidModalOpen(false)}
              />
            </motion.div>

            {/* Right Column: iPhone Mockups */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="lg:col-span-7 flex justify-center items-end gap-4 md:gap-6 lg:gap-8 pb-8 lg:pb-0"
            >
              {/* iPhone Mockup - Oral Health Score */}
              <div className="relative flex-shrink-0 w-[180px] sm:w-[220px] md:w-[260px] lg:w-[280px]">
                <div className="relative rounded-[2.5rem] sm:rounded-[3rem] border-[6px] sm:border-[8px] border-stone-900 bg-stone-900 shadow-2xl overflow-hidden">
                  {/* iPhone Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] sm:w-[100px] h-[22px] sm:h-[28px] bg-stone-900 rounded-b-2xl z-20" />
                  {/* Screen Content */}
                  <div className="relative aspect-[9/19.5] overflow-hidden bg-white">
                    <picture>
                    <source
                      type="image/webp"
                      srcSet="/images/optimized/JQpBfeUURrCKTqFU-400.webp 400w, /images/optimized/JQpBfeUURrCKTqFU-800.webp 800w, /images/optimized/JQpBfeUURrCKTqFU-1600.webp 1600w"
                      sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1600px"
                    />
                    <img
                      src="/images/optimized/JQpBfeUURrCKTqFU-800.webp"
                      decoding="async" 
                      alt="DentaSmart Oral Health Score - Your personalized dental health rating" 
                      className="w-full h-full object-cover object-top"
                      loading="eager"
                      fetchPriority="high"
                    
                      width="738" height="1600"/>
                  </picture>
                  </div>
                </div>
                {/* Label */}
                <div className="text-center mt-3 sm:mt-4">
                  <span className="text-xs sm:text-sm font-medium text-stone-600 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">Oral Health Score</span>
                </div>
              </div>

              {/* iPhone Mockup - AI Analysis Report */}
              <div className="relative flex-shrink-0 w-[180px] sm:w-[220px] md:w-[260px] lg:w-[280px] mt-12 sm:mt-16">
                <div className="relative rounded-[2.5rem] sm:rounded-[3rem] border-[6px] sm:border-[8px] border-stone-900 bg-stone-900 shadow-2xl overflow-hidden">
                  {/* iPhone Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] sm:w-[100px] h-[22px] sm:h-[28px] bg-stone-900 rounded-b-2xl z-20" />
                  {/* Screen Content */}
                  <div className="relative aspect-[9/19.5] overflow-hidden bg-white">
                    <picture>
                    <source
                      type="image/webp"
                      srcSet="/images/optimized/kQkbFcHfULXNLoOD-400.webp 400w, /images/optimized/kQkbFcHfULXNLoOD-800.webp 800w, /images/optimized/kQkbFcHfULXNLoOD-1600.webp 1600w"
                      sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1600px"
                    />
                    <img
                      src="/images/optimized/kQkbFcHfULXNLoOD-800.webp"
                      decoding="async" 
                      alt="DentaSmart AI Analysis - Detailed dental condition report" 
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    
                      width="738" height="1600"/>
                  </picture>
                  </div>
                </div>
                {/* Label */}
                <div className="text-center mt-3 sm:mt-4">
                  <span className="text-xs sm:text-sm font-medium text-stone-600 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">AI Analysis Report</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Video Section - StoryBrand Aligned */}
      <section id="video-section" className="py-6 bg-accent/5 border-b border-border">
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
                <picture>
                    <source
                      type="image/webp"
                      srcSet="/images/optimized/narrator-thumbnail-400.webp 400w, /images/optimized/narrator-thumbnail-800.webp 800w, /images/optimized/narrator-thumbnail-1600.webp 1600w"
                      sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1600px"
                    />
                    <img
                      src="/images/optimized/narrator-thumbnail-800.webp"
                      alt="DentaSmart Video Thumbnail" 
 className="w-full h-full object-cover"
                      loading="lazy"
                    
                      width="1012" height="589"/>
                  </picture>
                
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
      <section className="py-6 bg-white border-b border-border/50">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-border/50">
            {[
              { value: "50K+", label: "Scans Analyzed" },
              { value: "5.0 ★", label: "App Store Rating" },
              { value: "24/7", label: "AI Support" }
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
          <p className="text-center text-sm text-stone-500 mt-6 max-w-2xl mx-auto">
            Educational guidance to help you understand your oral health and have better conversations with a licensed dentist.
          </p>
        </div>
      </section>

      {/* The Problem - Editorial Layout with Large Typography */}
      <section className="py-8 md:py-12 bg-gradient-to-b from-white to-accent/10 overflow-hidden">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
            >
              <picture>
                    <source
                      type="image/webp"
                      srcSet="/images/optimized/MVOEXBpESLROdzsK-400.webp 400w, /images/optimized/MVOEXBpESLROdzsK-800.webp 800w, /images/optimized/MVOEXBpESLROdzsK-1600.webp 1600w"
                      sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1600px"
                    />
                    <img
                      src="/images/optimized/MVOEXBpESLROdzsK-800.webp"
                      alt="Person experiencing dental anxiety - DentaSmart helps you understand your oral health" 
 className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                      loading="lazy"
                    
                      width="1536" height="2752"/>
                  </picture>
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
      <section className="py-12 bg-stone-900 text-white">
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
            
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              <div className="bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/20 text-sm font-medium tracking-wide">
                50K+ Scans Analyzed
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/20 text-sm font-medium tracking-wide">
                Clinical Advisory Board
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/20 text-sm font-medium tracking-wide">
                🔒 Your data is never sold
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/20 text-sm font-medium tracking-wide">
                Not a replacement for your dentist
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Plan - 3 Step Strip */}
      <section className="py-8 bg-primary text-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { step: "01", title: "Quick Check or Full Checkup", desc: "Answer guided self-examination questions, then upload photos or X-rays." },
              { step: "02", title: "Get Instant Insights", desc: "AI analyzes your images with color-coded findings in minutes." },
              { step: "03", title: "Two Reports, Full Clarity", desc: "Get a plain-English report for you and a clinical version for your dentist." }
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
      <section className="py-12 bg-stone-50">
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
                <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-stone-500 text-sm">— {item.author}</span>
                  <span className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    App Store verified
                  </span>
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

      {/* Common Concerns People Check */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-normal text-black mb-4">
              Common concerns people check
            </h2>
            <p className="text-xl text-stone-700 font-light mb-10 max-w-2xl">
              Millions of people search for these topics every month. Get clear, honest answers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Toothache", desc: "Understand what is causing your tooth pain and when to see a dentist.", href: "/conditions/toothache" },
              { title: "Bleeding Gums", desc: "Find out why your gums bleed and what it could mean for your health.", href: "/symptoms/bleeding-gums" },
              { title: "Tooth Sensitivity", desc: "Learn why hot or cold triggers sharp pain and how to manage it.", href: "/conditions/sensitive-teeth" },
              { title: "Gum Recession", desc: "Discover why gums pull back and what you can do to protect them.", href: "/conditions/gum-disease" },
              { title: "Pain When Biting", desc: "Sharp pain when you chew? Here is what it usually means.", href: "/symptoms/tooth-pain-when-biting" },
              { title: "Bad Breath", desc: "Persistent bad breath often has a treatable cause. Learn more.", href: "/symptoms/bad-breath" },
              { title: "Cracked Tooth", desc: "A crack can worsen fast. Know the signs and your options.", href: "/conditions/cracked-tooth" },
              { title: "Swollen Gums", desc: "Swelling around one tooth or many? Here is what to look for.", href: "/symptoms/swollen-gums" },
              { title: "Wisdom Tooth Pain", desc: "Find out if your wisdom teeth need attention or can wait.", href: "/conditions/wisdom-teeth-pain" },
              { title: "Cavity Symptoms", desc: "Cavities can hide for months. Learn how to spot them early.", href: "/conditions/cavities" },
              { title: "Jaw Pain", desc: "Jaw clicking, locking, or aching? Understand the common causes.", href: "/symptoms/jaw-pain" },
              { title: "Dental Abscess", desc: "An abscess is serious. Know the warning signs and next steps.", href: "/conditions/dental-abscess" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
              >
                <Link href={item.href}>
                  <div className="group p-6 rounded-2xl border border-stone-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300 bg-white h-full">
                    <h3 className="text-lg font-medium text-black mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-stone-600 mb-4 leading-relaxed">{item.desc}</p>
                    <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Get your Oral Health Score <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What is DentaSmart - AEO Quick Answer Section */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto max-w-4xl">
          <QuickAnswerBlock
            question="What is DentaSmart?"
            answer="DentaSmart is an AI-powered oral health app that analyzes photos of your teeth or dental X-rays. It provides a personalized Oral Health Score from 0 to 100, plain-English explanations of findings, treatment cost estimates, and a personalized care plan. DentaSmart also includes Din, a 24/7 AI oral health guide that answers dental questions anytime."
          />

          <div className="mt-10 space-y-8">
            <div>
              <h2 className="text-3xl font-normal text-black mb-4">Who Is DentaSmart For?</h2>
              <p className="text-lg text-stone-700 leading-relaxed">
                DentaSmart is designed for people without dental insurance who need affordable oral health guidance, anyone confused by a dental treatment plan who wants a second opinion, parents who want to monitor their family's oral health at home, and people with dental anxiety who want to understand their situation before visiting a dentist.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-normal text-black mb-4">How Much Does DentaSmart Cost?</h2>
              <p className="text-lg text-stone-700 leading-relaxed">
                DentaSmart Individual Insights costs $75 per year ($0.21/day) and includes unlimited AI scans, an Oral Health Score, personalized care plans, and 24/7 AI guide access. Family Insights costs $150 per year ($0.41/day) and covers you plus up to 4 family members. A one-time Second Opinion report costs $30.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-normal text-black mb-4">DentaSmart vs ChatGPT for Dental Questions</h2>
              <p className="text-lg text-stone-700 leading-relaxed">
                DentaSmart is purpose-built for oral health. Unlike ChatGPT, DentaSmart can analyze dental photos and X-rays, provide an Oral Health Score, offer treatment cost estimates, and maintain a history of your oral health over time. ChatGPT provides general text responses but cannot analyze dental images or create personalized care plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Homepage FAQ Section */}
      <section className="py-12 bg-stone-50">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-normal text-black mb-8">Frequently Asked Questions About DentaSmart</h2>
          <div className="space-y-6">
            {[
              { q: "Is DentaSmart a replacement for a dentist?", a: "No. DentaSmart provides AI-powered educational insights to help you understand your oral health and prepare for better conversations with a licensed dentist. It does not diagnose or treat dental conditions. Always consult a licensed dentist for diagnosis and treatment." },
              { q: "How does DentaSmart work?", a: "Upload a photo of your teeth or dental X-rays using the DentaSmart app. The AI analyzes the image, identifies potential concerns, and provides an Oral Health Score, plain-English explanations, and a personalized care plan within minutes." },
              { q: "Is DentaSmart available on Android?", a: "DentaSmart is live on iOS. Android is in Early Access. You can join the Android waitlist at dentasmart.ai/download." },
              { q: "What is the DentaSmart Oral Health Score?", a: "The Oral Health Score is a number from 0 to 100 that reflects the overall health of your teeth and gums based on AI analysis of your dental photos or X-rays. It tracks changes over time so you can see improvement." },
              { q: "Can DentaSmart analyze dental X-rays?", a: "Yes. DentaSmart can analyze both photos of your teeth and dental X-rays to identify potential oral health concerns and provide insights." },
              { q: "Who is DentaSmart for?", a: "DentaSmart is for anyone who wants to understand their oral health better, including people without dental insurance, those seeking a second opinion on a treatment plan, parents monitoring family dental health, and people with dental anxiety." }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-stone-100">
                <h3 className="text-lg font-semibold text-black mb-2">{faq.q}</h3>
                <p className="text-stone-700 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section - Device Aware */}
      <DownloadSection />

      <Footer />
    </div>
  );
}
