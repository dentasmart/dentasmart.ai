import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BenefitsCarousel } from "@/components/BenefitsCarousel";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Smartphone, Activity } from "lucide-react";
import { DownloadSection } from "@/components/DownloadSection";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const [location] = useLocation();


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

      {/* Hero Section - Split Visual with iPhone Mockups */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-accent/5 to-primary/5">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 px-4 mx-auto max-w-7xl pt-32 md:pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-left max-w-2xl lg:col-span-5"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-black mb-8 leading-[1.1]">
                Know what's happening <br />
                <span className="font-normal italic text-primary">in your mouth</span>.
              </h1>
              
              <p className="text-xl md:text-2xl text-stone-700 mb-10 font-normal leading-relaxed text-balance">
                Upload a photo of your teeth or X-rays and get clear AI insights in minutes, with an easy plan to prevent expensive surprises.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-start items-stretch sm:items-start">
                <Button 
                  size="lg" 
                  className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-7 text-lg font-medium transition-all duration-300 hover:scale-105 shadow-xl border-0 cursor-pointer relative z-20"
                  onClick={() => {
                    const element = document.getElementById('download-cta');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Get My Oral Health Score
                </Button>
                <Link href="/symptom-quiz">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/50 backdrop-blur-md border-primary/20 text-primary hover:bg-white/80 rounded-full px-8 py-7 text-lg font-medium transition-all duration-300 cursor-pointer relative z-20"
                  >
                    Try Free Symptom Check
                  </Button>
                </Link>
              </div>
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
                    <img 
                      src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/JQpBfeUURrCKTqFU.png" 
                      alt="DentaSmart Oral Health Score - Your personalized dental health rating" 
                      className="w-full h-full object-cover object-top"
                    />
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
                    <img 
                      src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/kQkbFcHfULXNLoOD.png" 
                      alt="DentaSmart AI Analysis - Detailed dental condition report" 
                      className="w-full h-full object-cover object-top"
                    />
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
      <section className="py-6 bg-white border-b border-border/50">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-border/50">
            {[
              { value: "50K+", label: "Scans Analyzed" },
              { value: "4.8/5", label: "Average User Rating" },
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
      <section className="py-8 bg-primary text-white">
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
                <div className="mt-8 pt-6 border-t border-stone-100 text-stone-500 text-sm">
                  - {item.author}
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

      {/* Download Section - Device Aware */}
      <DownloadSection />

      <Footer />
    </div>
  );
}
