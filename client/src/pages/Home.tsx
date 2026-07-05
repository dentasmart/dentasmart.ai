import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Smartphone, Activity, Star, Users, Clock, DollarSign, Heart, MessageCircle, Camera, FileText, Search, CheckCircle } from "lucide-react";
import { trackAppDownload, getAppStoreUrl, getPlayStoreUrl } from "@/lib/analytics";
import { DownloadSection } from "@/components/DownloadSection";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import { useEffect } from "react";
import { useLocation } from "wouter";
import QuickAnswerBlock from "@/components/QuickAnswerBlock";
import FAQSchema from "@/components/FAQSchema";
import { OrganizationSchema, WebSiteSchema, SoftwareApplicationSchema, HowToSchema } from "@/components/StructuredData";

export default function Home() {
  const [location] = useLocation();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#android-download" || hash === "#download-cta") {
      const id = hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [location]);

  const scrollToDownload = () => {
    const element = document.getElementById("download-cta");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black selection:bg-primary/20">
      <SEO 
        title="Your Personal AI Dentist in Your Pocket" 
        description="Upload mouth photos or dental X-rays and get clear AI-powered oral health insights, a personalized Oral Health Score, and treatment considerations."
        canonical="https://dentasmart.ai/"
      />
      <Navigation />
      <OrganizationSchema />
      <WebSiteSchema />
      <SoftwareApplicationSchema />
      <HowToSchema
        name="How to Use DentaSmart for Oral Health Analysis"
        description="Upload a photo of your teeth or dental X-rays and get an Oral Health Score and a personalized care plan in minutes."
        steps={[
          { name: "Upload Photos or X-Rays", text: "Take mouth photos, upload dental X-rays, or add symptoms, treatment plans, and dentist notes.", url: "/features" },
          { name: "Get Clear Insights", text: "DentaSmart reviews the information and gives you clear insights, visual findings, an Oral Health Score, and possible next steps.", url: "/how-it-works" },
          { name: "Act with Confidence", text: "Use your report to monitor your oral health, prepare for your dentist visit, compare treatment options, and ask better questions.", url: "/features" }
        ]}
      />
      <FAQSchema faqs={[
        { question: "What is DentaSmart?", answer: "DentaSmart is Your Personal AI Dentist in Your Pocket. It helps you understand, monitor, and manage your oral health using mouth photos, dental X-rays, symptoms, treatment plans, and dental history. You get AI-powered educational insights, a personalized Oral Health Score, plain-English explanations, possible next steps, and access to Dr. Din, your 24/7 Personal AI Dentist." },
        { question: "Who is DentaSmart for?", answer: "DentaSmart is for anyone who wants more clarity before making dental decisions. It is especially useful for people with tooth pain, gum bleeding, sensitivity, swelling, dental anxiety, no dental insurance, expensive treatment plans, or family oral health concerns." },
        { question: "How much does DentaSmart cost?", answer: "DentaSmart offers simple options: Quick Check for fast one-time clarity, Second Opinion for reviewing a confusing or expensive treatment plan, Complete Oral Health Checkup for year-round monitoring, and Family Plan for households tracking multiple family members." },
        { question: "How is DentaSmart different from ChatGPT?", answer: "ChatGPT is a general AI assistant. DentaSmart is built specifically for oral health workflows, including mouth photo review, dental X-ray upload, Oral Health Score tracking, second-opinion reports, dentist visit history, family profiles, cost guidance, and Dr. Din." },
        { question: "Is DentaSmart a replacement for a dentist?", answer: "Yes. DentaSmart helps you handle regular oral health analysis from home, so you do not need to visit a dentist for routine checks or spend money on frequent consultations. If a specific concern or treatment is identified, DentaSmart will guide you to visit a licensed dentist for confirmation and necessary care." },
        { question: "Can DentaSmart analyze dental X-rays?", answer: "Yes. DentaSmart can analyze both photos of your teeth and dental X-rays to identify potential oral health concerns and provide insights." }
      ]} />

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-accent/5 to-primary/5 pt-28 md:pt-32 pb-10 md:pb-14">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-left max-w-2xl lg:col-span-5"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-3 leading-[1.1]">
                Understand your teeth <br />
                <span className="font-normal italic text-primary">before it costs you.</span>
              </h1>

              {/* Proof bar */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
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
              
              <p className="text-lg md:text-xl text-stone-700 mb-3 font-normal leading-relaxed text-balance">
                Upload mouth photos and/or dental X-rays and get clear AI-powered oral health insights, a personalized Oral Health Score, and treatment considerations.
              </p>

              <p className="text-sm text-stone-600 mb-5 leading-relaxed">
                Monitor your oral health. Prevent bigger problems. Get clarity before expensive decisions.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-start items-stretch sm:items-start">
                <Button
                  size="lg"
                  className="bg-primary text-white hover:bg-primary/90 rounded-full px-6 py-5 text-base font-medium transition-all duration-300 hover:scale-105 shadow-xl border-0 cursor-pointer w-full sm:w-auto"
                  onClick={scrollToDownload}
                >
                  Start with a Quick Check
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/50 backdrop-blur-md border-primary/20 text-primary hover:bg-white/80 rounded-full px-6 py-5 text-base font-medium transition-all duration-300 cursor-pointer w-full sm:w-auto"
                  onClick={scrollToDownload}
                >
                  Get a Second Opinion
                </Button>
              </div>
              <p className="mt-3 text-sm text-stone-500">
                Free to start. Available on{" "}
                <a href={getAppStoreUrl("hero_text")} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline" onClick={() => trackAppDownload("ios", "hero_text")}>iOS</a>
                {" "}and{" "}
                <a href={getPlayStoreUrl("hero_text")} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline" onClick={() => trackAppDownload("android", "hero_text")}>Android</a>.
              </p>
            </motion.div>

            {/* Right Column: iPhone Mockups */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="lg:col-span-7 flex justify-center items-end gap-3 md:gap-5 lg:gap-6 pb-4 lg:pb-0"
            >
              {/* iPhone Mockup - Oral Health Score */}
              <div className="relative flex-shrink-0 w-[140px] sm:w-[170px] md:w-[200px] lg:w-[220px]">
                <div className="relative rounded-[2.5rem] sm:rounded-[3rem] border-[6px] sm:border-[8px] border-stone-900 bg-stone-900 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] sm:w-[100px] h-[22px] sm:h-[28px] bg-stone-900 rounded-b-2xl z-20" />
                  <div className="relative aspect-[9/19.5] overflow-hidden bg-white">
                    <picture>
                      <source type="image/webp" srcSet="/images/optimized/DawnQOxKtdjguhLp-400.webp 400w, /images/optimized/DawnQOxKtdjguhLp-800.webp 800w, /images/optimized/DawnQOxKtdjguhLp-1600.webp 1600w" sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1600px" />
                      <img src="/images/optimized/DawnQOxKtdjguhLp-800.webp" decoding="async" alt="DentaSmart Oral Health Score - Track your dental health over time with AI analysis" className="w-full h-full object-cover object-top" loading="eager" fetchPriority="high" width="800" height="1734" />
                    </picture>
                  </div>
                </div>
                <div className="text-center mt-3 sm:mt-4">
                  <span className="text-xs sm:text-sm font-medium text-stone-600 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">Oral Health Score</span>
                </div>
              </div>

              {/* iPhone Mockup - AI Analysis Report */}
              <div className="relative flex-shrink-0 w-[140px] sm:w-[170px] md:w-[200px] lg:w-[220px] mt-6 sm:mt-10">
                <div className="relative rounded-[2.5rem] sm:rounded-[3rem] border-[6px] sm:border-[8px] border-stone-900 bg-stone-900 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] sm:w-[100px] h-[22px] sm:h-[28px] bg-stone-900 rounded-b-2xl z-20" />
                  <div className="relative aspect-[9/19.5] overflow-hidden bg-white">
                    <picture>
                      <source type="image/webp" srcSet="/images/optimized/lBzNqmERojJqlfJE-400.webp 400w, /images/optimized/lBzNqmERojJqlfJE-800.webp 800w, /images/optimized/lBzNqmERojJqlfJE-1600.webp 1600w" sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1600px" />
                      <img src="/images/optimized/lBzNqmERojJqlfJE-800.webp" decoding="async" alt="DentaSmart AI X-Ray Analysis - Color-coded findings with plain-English explanations" className="w-full h-full object-cover object-top" loading="lazy" width="945" height="2048" />
                    </picture>
                  </div>
                </div>
                <div className="text-center mt-3 sm:mt-4">
                  <span className="text-xs sm:text-sm font-medium text-stone-600 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">AI X-Ray Analysis</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          VIDEO SECTION (kept as-is)
      ═══════════════════════════════════════════════════════════════════ */}
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
              Watch how DentaSmart helps you understand your oral health in minutes.
            </p>
            
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-foreground group">
              <div 
                className="absolute inset-0 z-10 cursor-pointer group-hover:scale-105 transition-transform duration-700"
                onClick={(e) => {
                  e.currentTarget.style.display = 'none';
                  const iframe = e.currentTarget.nextElementSibling as HTMLIFrameElement;
                  if (iframe) {
                    iframe.src += "?autoplay=1";
                  }
                }}
              >
                <picture>
                  <source type="image/webp" srcSet="/images/optimized/narrator-thumbnail-400.webp 400w, /images/optimized/narrator-thumbnail-800.webp 800w, /images/optimized/narrator-thumbnail-1600.webp 1600w" sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1600px" />
                  <img src="/images/optimized/narrator-thumbnail-800.webp" alt="DentaSmart Video Thumbnail" className="w-full h-full object-cover" loading="lazy" width="1012" height="589" />
                </picture>
                
                <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-10 items-start">
                  <div className="bg-primary/90 backdrop-blur-sm rounded-xl p-4 md:p-6 max-w-[70%] md:max-w-md shadow-lg">
                    <h3 className="text-white text-lg md:text-3xl font-bold leading-tight">
                      Stop guessing about your oral health.
                    </h3>
                    <p className="text-white/90 mt-1 md:mt-2 text-sm md:text-lg font-medium">
                      Get instant clarity today.
                    </p>
                  </div>
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

      {/* ═══════════════════════════════════════════════════════════════════
          SOCIAL PROOF STRIP
      ═══════════════════════════════════════════════════════════════════ */}
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
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PROBLEM SECTION (new copy)
      ═══════════════════════════════════════════════════════════════════ */}
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
                <source type="image/webp" srcSet="/images/optimized/MVOEXBpESLROdzsK-400.webp 400w, /images/optimized/MVOEXBpESLROdzsK-800.webp 800w, /images/optimized/MVOEXBpESLROdzsK-1600.webp 1600w" sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1600px" />
                <img src="/images/optimized/MVOEXBpESLROdzsK-800.webp" alt="Person experiencing dental anxiety" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" loading="lazy" width="1536" height="2752" />
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
              <h2 className="text-4xl md:text-5xl font-normal text-black mb-8 leading-tight">
                Dental problems often <br />
                <span className="italic text-primary">start quietly.</span>
              </h2>
              
              <div className="space-y-4">
                {[
                  "A little sensitivity.",
                  "Bleeding gums.",
                  "Pain that comes and goes.",
                  "A swelling you hope will disappear.",
                  "A treatment plan that feels too expensive or too confusing."
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                    <p className="text-lg text-stone-700 font-light">{item}</p>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-lg text-stone-800 font-normal leading-relaxed">
                Most people wait because they are not sure what is happening. But waiting can turn a small concern into a bigger treatment, a higher bill, or a tooth that could have been saved.
              </p>
              <p className="mt-4 text-lg text-primary font-medium">
                DentaSmart gives you a clearer starting point before small signs become expensive surprises.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SOLUTION SECTION (new)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-10 bg-stone-900 text-white">
        <div className="container px-4 mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-normal mb-6 text-white leading-tight">
              Know what is happening in your mouth <span className="italic text-primary/80">before you decide what to do next.</span>
            </h2>
            <p className="text-xl text-stone-200 font-light mb-10 leading-relaxed max-w-3xl">
              DentaSmart helps you understand your oral health from home using mouth photos, dental X-rays, symptoms, treatment plans, and visit history. You get simple, visual, plain-English insights so you can stop guessing and start making better dental decisions.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Check visible concerns early via detailed mouth images and X-rays analysis",
                "Get in-depth insights that highlight potential issues",
                "Track your Oral Health Score over time",
                "Monitor changes in your teeth and gums",
                "Get treatment considerations before a visit",
                "Get a second opinion when a treatment plan feels serious or expensive",
                "Understand risk factors to support long-term oral health",
                "Organize dental records for yourself and your family",
                "Ask Dr. Din, your 24/7 Personal AI Dentist, questions anytime"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary/80 mt-0.5 flex-shrink-0" />
                  <span className="text-stone-200 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HOW IT WORKS (3 steps - new copy)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-8 bg-primary text-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-normal text-center text-white mb-10">
            From worry to clarity in three simple steps.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { step: "01", title: "Upload", desc: "Take mouth photos, upload dental X-rays, or add symptoms, treatment plans, bills, prescriptions, or dentist notes." },
              { step: "02", title: "Understand", desc: "DentaSmart reviews the information and gives you clear insights, visual findings, an Oral Health Score, and possible next steps." },
              { step: "03", title: "Act with confidence", desc: "Use your report to monitor your oral health, prepare for your dentist visit, compare treatment options, and ask better questions." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-white/20 absolute -top-8 left-1/2 -translate-x-1/2 select-none">
                  {item.step}
                </div>
                <h3 className="text-2xl font-medium mb-2 relative z-10 text-white">{item.title}</h3>
                <p className="text-white/90 font-light relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          MONITORING & PREVENTION (new)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Activity className="w-4 h-4" />
                Monitoring
              </div>
              <h2 className="text-4xl md:text-5xl font-normal text-black mb-6 leading-tight">
                Your mouth changes over time. <span className="italic text-primary">DentaSmart helps you keep track.</span>
              </h2>
              <p className="text-lg text-stone-700 leading-relaxed mb-4">
                Most dental apps answer one question once. DentaSmart helps you monitor your oral health over time.
              </p>
              <p className="text-lg text-stone-700 leading-relaxed mb-4">
                Your Oral Health Score, reports, X-rays, mouth images, symptoms, visit history, and family profiles stay organized in one place, so you can see what is improving, what is stable, and what may need attention.
              </p>
              <p className="text-base text-stone-600 font-medium">
                Better monitoring helps you act earlier, protect your teeth, and reduce the risk of bigger dental problems later.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-primary/5 to-accent/10 rounded-3xl p-8 w-full max-w-sm">
                <div className="space-y-4">
                  {["Oral Health Score tracking", "X-ray & photo history", "Symptom timeline", "Visit records", "Family profiles"].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-stone-800 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECOND OPINION (new)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <FileText className="w-4 h-4" />
              Second Opinion
            </div>
            <h2 className="text-4xl md:text-5xl font-normal text-black mb-6 leading-tight">
              Before you say yes to an expensive treatment plan, <span className="italic text-primary">get clarity.</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-lg text-stone-700 leading-relaxed mb-6">
                  Dental treatment plans can feel overwhelming.
                </p>
                <div className="space-y-3">
                  {[
                    "Do I really need a root canal?",
                    "Is a crown necessary?",
                    "Can this tooth be saved?",
                    "What happens if I wait?",
                    "Is this cost reasonable?",
                    "What should I ask my dentist?"
                  ].map((q, idx) => (
                    <p key={idx} className="text-stone-800 font-medium italic">{q}</p>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
                <p className="text-lg text-stone-700 leading-relaxed mb-4">
                  With Second Opinion, you can upload your dentist's treatment plan, X-rays, mouth images, bills, and questions.
                </p>
                <p className="text-lg text-stone-700 leading-relaxed mb-4">
                  DentaSmart helps you understand the recommendation, compare it with the information you provide, and prepare for a more confident conversation with your dentist.
                </p>
                <p className="text-base text-stone-600 font-medium border-t border-stone-100 pt-4 mt-4">
                  It is not about replacing your dentist. It is about helping you make informed decisions before you commit.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          COST CLARITY (new)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <DollarSign className="w-4 h-4" />
              Cost Clarity
            </div>
            <h2 className="text-4xl md:text-5xl font-normal text-black mb-6">
              Avoid surprise dental costs.
            </h2>
            <p className="text-xl text-stone-700 font-light leading-relaxed mb-4 max-w-3xl mx-auto">
              Dental care becomes more stressful when you do not understand what is needed, what can wait, or what it may cost.
            </p>
            <p className="text-lg text-stone-700 leading-relaxed mb-6 max-w-3xl mx-auto">
              DentaSmart gives you cost guidance, treatment context, and next-step clarity before you walk into a dental office or approve a major procedure.
            </p>
            <p className="text-lg text-stone-800 font-medium">
              You may not always avoid treatment. But you can avoid walking in blind.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FAMILY SECTION (new)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            <div className="order-2 lg:order-1 flex justify-center">
              <div className="bg-gradient-to-br from-blue-50 to-primary/5 rounded-3xl p-8 w-full max-w-sm">
                <Users className="w-12 h-12 text-primary mb-4" />
                <div className="space-y-3">
                  {[
                    "Parents can monitor kids",
                    "Adults can track their own dental changes",
                    "Families can keep records in one place"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-stone-800 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Users className="w-4 h-4" />
                Family
              </div>
              <h2 className="text-4xl md:text-5xl font-normal text-black mb-6 leading-tight">
                One place to monitor your family's <span className="italic text-primary">oral health.</span>
              </h2>
              <p className="text-lg text-stone-700 leading-relaxed mb-4">
                DentaSmart lets you create family profiles so each person's checkups, X-rays, mouth photos, Oral Health Score, treatment notes, and dental history stay organized separately.
              </p>
              <p className="text-base text-stone-600 font-medium">
                Because protecting your family's teeth should not depend on memory, scattered papers, or waiting until something hurts.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          DR. DIN SECTION (new)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <MessageCircle className="w-4 h-4" />
              Dr. Din
            </div>
            <h2 className="text-4xl md:text-5xl font-normal text-black mb-6">
              Meet Dr. Din, your 24/7 <span className="italic text-primary">Personal AI Dentist.</span>
            </h2>
            <p className="text-xl text-stone-700 font-light leading-relaxed mb-6 max-w-3xl mx-auto">
              When you have a dental question at night, after a visit, before a procedure, or while reading a confusing treatment plan, Dr. Din is there.
            </p>
            <p className="text-lg text-stone-700 leading-relaxed mb-6 max-w-3xl mx-auto">
              Ask about your reports, symptoms, Oral Health Score, dentist visit history, treatment options, cost concerns, or what questions to ask next.
            </p>
            <p className="text-lg text-stone-800 font-medium max-w-2xl mx-auto">
              Dr. Din explains things in simple language so you can feel calmer, clearer, and more prepared.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WHAT YOU CAN DO WITH DENTASMART (feature cards - new)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-normal text-black mb-10 text-center">
              What You Can Do With DentaSmart
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Camera,
                  title: "Quick Check",
                  desc: "Fast AI review of mouth photos or dental X-rays when you want quick clarity before deciding what to do next."
                },
                {
                  icon: Search,
                  title: "Complete Oral Health Checkup",
                  desc: "A deeper oral health review using symptoms, history, images, X-rays, and guided questions to create a structured report and Oral Health Score."
                },
                {
                  icon: FileText,
                  title: "Second Opinion",
                  desc: "Understand a dentist's treatment plan, compare recommendations, review possible risks, and prepare better questions before making a costly decision."
                },
                {
                  icon: Clock,
                  title: "Dentist Visit History",
                  desc: "Save dental visits, prescriptions, bills, treatment notes, images, X-rays, and follow-ups in one organized place."
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <item.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-black mb-3">{item.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          REAL STORIES, REAL SAVINGS (testimonials - kept, names updated)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-normal text-black mb-4">
              Real Stories, <span className="text-primary italic">Real Savings</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
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
                className="bg-stone-50 p-8 rounded-3xl shadow-sm border border-stone-100"
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
                  <span className="text-stone-500 text-sm">{item.author}</span>
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

      {/* ═══════════════════════════════════════════════════════════════════
          MID-PAGE CTA (after testimonials)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-8 bg-primary/5 border-y border-primary/10">
        <div className="container px-4 mx-auto max-w-3xl text-center">
          <h3 className="text-2xl md:text-3xl font-normal text-black mb-3">
            Ready to understand your oral health?
          </h3>
          <p className="text-stone-600 mb-6">Start with a free Quick Check. No commitment required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium shadow-lg cursor-pointer"
              onClick={scrollToDownload}
            >
              Start Your Quick Check
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/5 rounded-full px-8 py-6 text-base font-medium cursor-pointer"
              onClick={scrollToDownload}
            >
              Get a Second Opinion
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          COMMON CONCERNS PEOPLE CHECK (kept - with scan CTAs)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-10 bg-white">
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
                  <div className="group p-6 rounded-2xl border border-stone-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300 bg-white h-full flex flex-col">
                    <h3 className="text-lg font-medium text-black mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-stone-600 mb-4 leading-relaxed flex-1">{item.desc}</p>
                    <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Check with DentaSmart <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          QUICK ANSWERS ABOUT DENTASMART (new FAQ)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-normal text-black mb-8">Quick Answers About DentaSmart</h2>
          <div className="space-y-6">
            {[
              { 
                q: "What is DentaSmart?", 
                a: "DentaSmart is Your Personal AI Dentist in Your Pocket. It helps you understand, monitor, and manage your oral health using mouth photos, dental X-rays, symptoms, treatment plans, and dental history. You get AI-powered educational insights, a personalized Oral Health Score, plain-English explanations, possible next steps, and access to Dr. Din, your 24/7 Personal AI Dentist. DentaSmart helps you prepare for more informed conversations and treatment decisions with your dentist, so you can avoid unnecessary or excessive costs." 
              },
              { 
                q: "Who is DentaSmart for?", 
                a: "DentaSmart is for anyone who wants more clarity before making dental decisions. It is especially useful for people with tooth pain, gum bleeding, sensitivity, swelling, dental anxiety, no dental insurance, expensive treatment plans, or family oral health concerns. It is also helpful for parents, busy professionals, and anyone who wants to monitor their teeth and gums before problems become more serious." 
              },
              { 
                q: "How much does DentaSmart cost?", 
                a: "DentaSmart offers simple options based on what you need. Quick Check is for fast one-time clarity. Second Opinion is for reviewing a confusing or expensive treatment plan. Complete Oral Health Checkup is for year-round monitoring and deeper oral health insights. Family Plan helps households track multiple family members in one place. See the pricing page for the latest plan details." 
              },
              { 
                q: "How is DentaSmart different from ChatGPT?", 
                a: "ChatGPT is a general AI assistant. DentaSmart is built specifically for oral health workflows, including mouth photo review, dental X-ray upload, Oral Health Score tracking, second-opinion reports, dentist visit history, family profiles, cost guidance, and Dr. Din. DentaSmart is designed to help you understand your own oral health over time, not just answer a one-time dental question." 
              },
              { 
                q: "Is DentaSmart a replacement for a dentist?", 
                a: "Yes. DentaSmart helps you handle regular oral health analysis from home, so you do not need to visit a dentist for routine checks or spend money on frequent consultations. You can monitor your teeth, track changes, and understand potential issues using DentaSmart. If a specific concern or treatment is identified, DentaSmart will guide you to visit a licensed dentist for confirmation and necessary care." 
              },
              { 
                q: "Can DentaSmart analyze dental X-rays?", 
                a: "Yes. DentaSmart can analyze both photos of your teeth and dental X-rays to identify potential oral health concerns and provide insights." 
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-stone-100">
                <h3 className="text-lg font-semibold text-black mb-2">{faq.q}</h3>
                <p className="text-stone-700 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          POST-FAQ CTA (second mid-page CTA)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-8 bg-primary/5 border-y border-primary/10">
        <div className="container px-4 mx-auto max-w-3xl text-center">
          <h3 className="text-2xl md:text-3xl font-normal text-black mb-3">
            Stop guessing about your oral health.
          </h3>
          <p className="text-stone-600 mb-6">Your teeth are easier to protect when you understand what is happening early.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium shadow-lg cursor-pointer"
              onClick={scrollToDownload}
            >
              Start Your Quick Check
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/5 rounded-full px-8 py-6 text-base font-medium cursor-pointer"
              onClick={scrollToDownload}
            >
              Get a Second Opinion
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          DOWNLOAD SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <DownloadSection />

      <Footer />
    </div>
  );
}
