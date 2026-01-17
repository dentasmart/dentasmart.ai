import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { UserChallengesCarousel } from "@/components/UserChallengesCarousel";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Smartphone, Activity } from "lucide-react";
import { DownloadCTA } from "@/components/DownloadCTA";
import { AndroidEarlyAccess } from "@/components/AndroidEarlyAccess";
import Navigation from "@/components/Navigation";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const [location] = useLocation();

  useEffect(() => {
    // Handle hash navigation manually to ensure scroll happens
    if (window.location.hash === "#android-waitlist") {
      const element = document.getElementById("android-waitlist");
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100); // Small delay to ensure rendering
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black selection:bg-primary/20">
      <Navigation />

      {/* Hero Section - Full Background Image with Overlay */}
      <section className="relative min-h-[500px] md:min-h-[700px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/backgrounds/home-hero-lady-smile.jpg" 
            alt="Woman with healthy smile" 
            className="w-full h-full object-cover object-center md:object-[80%_20%]"
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent md:via-white/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent md:hidden" />
        </div>

        <div className="container relative z-10 px-4 mx-auto max-w-7xl pt-10 md:pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-left max-w-2xl lg:col-span-7 xl:col-span-6"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-black mb-8 leading-[1.1]">
                Get instant clarity about <br />
                <span className="font-normal italic text-primary">your oral health</span>.
              </h1>
              
              <p className="text-xl md:text-2xl text-stone-700 mb-10 font-normal leading-relaxed text-balance">
                Upload a photo of your teeth (or your X-rays) and get an AI-powered Oral Health Score, a Risk Assessment, and a clear Next-Step Plan, plus reminders to stay on track.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-start items-center sm:items-start">
                <Button 
                  size="lg" 
                  className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 py-8 text-lg font-medium transition-all duration-300 hover:scale-105 shadow-xl border-0 w-full sm:w-auto"
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
                    className="bg-white/50 backdrop-blur-md border-primary/20 text-primary hover:bg-white/80 rounded-full px-10 py-8 text-lg font-medium transition-all duration-300 w-full sm:w-auto"
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
      <section className="py-12 bg-accent/5 border-b border-border">
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
                  src="/images/video-thumbnail.jpg" 
                  alt="DentaSmart Video Thumbnail" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1"></div>
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
                src="/images/challenges/dental_anxiety.jpg" 
                alt="Dental Anxiety" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-lg font-normal italic">"I used to dread the dentist. Now I know exactly what to expect."</p>
                <p className="text-sm mt-2 font-medium opacity-80">, Sarah, DentaSmart User</p>
              </div>
            </motion.div>
            
            <div className="space-y-8">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-normal leading-tight text-black"
              >
                The problem isn't just your teeth. <br />
                <span className="italic font-normal text-stone-700">It's the uncertainty.</span>
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
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-black mb-2">{item.title}</h3>
                      <p className="text-stone-700 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Challenges Carousel */}
      <UserChallengesCarousel />

      {/* Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* Lead Magnet Section */}
      <DownloadCTA />

      {/* Android Early Access Section */}
      <AndroidEarlyAccess />

      <Footer />
    </div>
  );
}
