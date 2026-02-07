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
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-foreground selection:bg-primary/20">
      <SEO 
        title="DentaSmart - Your AI Oral Health Guide" 
        description="Get instant dental insights with AI. Upload a photo, get a personalized oral health score, and take control of your dental care."
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-32 relative overflow-hidden">
        <div className="container px-4 mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              <h1 className="text-5xl md:text-7xl font-normal tracking-tight text-black leading-[1.1] mb-6">
                Know what’s <br />
                happening <br />
                <span className="text-primary italic font-light">in your mouth</span>.
              </h1>
              <p className="text-xl text-stone-600 font-light leading-relaxed mb-8 max-w-lg">
                Upload a photo of your teeth or X-rays and get clear AI insights in minutes, with an easy plan to prevent expensive surprises.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#download-cta">
                  <Button size="lg" className="rounded-full px-8 h-14 text-lg bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all hover:scale-105">
                    Get My Oral Health Score
                  </Button>
                </a>
                <Link href="/pricing">
                  <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-black transition-all">
                    See Pricing
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[500px] md:h-[600px] w-full rounded-[3rem] overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop" 
                alt="Confident smile" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Guide Section - Black Background */}
      <section className="py-24 bg-black text-white">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-normal leading-tight mb-8 text-white">
              <span className="bg-stone-800 px-2 py-1 rounded-lg text-white">We get it. Dental care can feel like a guessing game.</span>
            </h2>
            <p className="text-xl text-stone-300 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
              Most people feel anxious and confused about their dental health. <br/>
              <span className="text-white font-medium">DentaSmart gives you a clear starting point so you can make confident decisions.</span>
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 border border-stone-800">
                <Activity className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium tracking-wide text-white">50K+ SCANS ANALYZED</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 border border-stone-800">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium tracking-wide text-white">ADVISED BY CLINICAL LEADERS</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Plan Section - Blue Background */}
      <section className="py-24 bg-primary text-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
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
                className="relative group"
              >
                <div className="text-8xl font-bold text-white/10 absolute -top-10 left-1/2 -translate-x-1/2 select-none group-hover:text-white/20 transition-colors duration-500">
                  {item.step}
                </div>
                <h3 className="text-2xl font-medium mb-4 relative z-10 text-white">{item.title}</h3>
                <p className="text-white/90 font-light leading-relaxed relative z-10 max-w-xs mx-auto">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Carousel Section */}
      <section className="py-24 bg-stone-50 overflow-hidden">
        <BenefitsCarousel />
      </section>

      {/* Video Section */}
      <section className="py-24 bg-white">
        <div className="container px-4 mx-auto max-w-5xl">
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative aspect-video group cursor-pointer">
            <img 
              src="/images/video-thumbnail.jpg" 
              alt="How DentaSmart Works" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-primary border-b-[12px] border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <p className="text-2xl font-light text-stone-800 max-w-3xl mx-auto leading-relaxed">
              "I finally understand what my dentist was talking about. DentaSmart gave me the confidence to ask the right questions."
            </p>
            <p className="mt-4 text-stone-500 font-medium tracking-wide uppercase text-sm">
              — Sarah J., DentaSmart User
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-normal text-black mb-6">
              Stories from <span className="text-primary italic">Healthier Smiles</span>
            </h2>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* Download Section - Device Aware */}
      <DownloadSection />

      <Footer />
    </div>
  );
}
