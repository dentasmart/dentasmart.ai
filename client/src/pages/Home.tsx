import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Smartphone, Activity, Users, Clock, DollarSign, Heart, MessageCircle, Camera, FileText, Search, CheckCircle } from "lucide-react";
import { trackAppDownload, trackEvent, getAppStoreUrl, getPlayStoreUrl } from "@/lib/analytics";
import { DownloadSection } from "@/components/DownloadSection";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import { useEffect } from "react";
import { useLocation } from "wouter";
import QuickAnswerBlock from "@/components/QuickAnswerBlock";
import FAQSchema from "@/components/FAQSchema";
import { HowToSchema } from "@/components/StructuredData";

const homeFaqs = [
  { question: "What is DentaSmart?", answer: "DentaSmart is Your Personal AI Dentist in Your Pocket. It provides Free Quick Check, Full Quick Check, Treatment Plan Review, Oral Health Score tracking, reports, records, and guidance from Dr. Din. DentaSmart does not diagnose conditions or replace professional care." },
  { question: "Who is DentaSmart for?", answer: "DentaSmart is for anyone who wants more clarity before making dental decisions. It is especially useful for people with tooth pain, gum bleeding, sensitivity, swelling, dental anxiety, no dental insurance, expensive treatment plans, or family oral health concerns. It is also helpful for parents, busy professionals, and anyone who wants to monitor their teeth and gums before problems become more serious." },
  { question: "How much does DentaSmart cost?", answer: "Free Quick Check is unlimited. Full Quick Check is $19.99 per case, Treatment Plan Review is $29.99 per case, and Complete Care is $74.99/year for individuals or $149.99/year for families of up to 4 members. Additional family members beyond 4 are $19.99/year each." },
  { question: "How is DentaSmart different from ChatGPT?", answer: "ChatGPT is a general AI assistant. DentaSmart is built for supported oral-health workflows, including Free Quick Check, Full Quick Check, Treatment Plan Review, Oral Health Score tracking, dental records, family profiles, cost context, and guidance from Dr. Din.", link: "/compare/dentasmart-vs-chatgpt-dental/", linkText: "Read the full DentaSmart vs ChatGPT comparison" },
  { question: "Is DentaSmart a replacement for a dentist?", answer: "No. DentaSmart provides educational oral health insights, monitoring tools, and questions you can take to a dental visit. It does not diagnose conditions, replace routine dental exams, or provide hands-on treatment." },
  { question: "Can DentaSmart review dental X-rays?", answer: "DentaSmart supports educational review of eligible mouth photos and dental X-rays. It can highlight visible areas to discuss, but it does not diagnose conditions or replace a dentist's interpretation." },
];

export default function Home() {
  const [location, setLocation] = useLocation();

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

  const goToPlan = (intent: "quick_check" | "second_opinion", source: "hero" | "mid_page" | "post_faq") => {
    trackEvent("home_intent_click", { intent, source });
    setLocation(intent === "quick_check" ? "/download/" : "/pricing/#second-opinion");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black selection:bg-primary/20">
      <SEO 
        title="DentaSmart | Your Personal AI Oral Health Guide"
        description="Start with unlimited Free Quick Checks using supported mouth photos, supported X-rays, or both. Full Quick Check unlocks full eligible X-ray insights for one case."
        canonical="https://dentasmart.ai/"
        ogImage="https://dentasmart.ai/manus-storage/dentasmart-free-quick-check-social-1200x630_b33c85da.png"
      />
      <Navigation />
      <HowToSchema
        name="How to Use DentaSmart for Oral Health Analysis"
        description="Start with a Free Quick Check using supported mouth photos, supported X-rays, or both. Upgrade one case to Full Quick Check for full eligible X-ray insights."
        steps={[
          { name: "Start with a Free Quick Check", text: "Use supported mouth photos, supported X-rays, or both. Mouth photos do not require an X-ray.", url: "/download" },
          { name: "Review the Educational Report", text: "DentaSmart organizes supported information into plain-language observations, an Oral Health Score when included, and discussion points.", url: "/how-it-works" },
          { name: "Act with Confidence", text: "Use your report to monitor your oral health, prepare for your dentist visit, compare treatment options, and ask better questions.", url: "/features" }
        ]}
      />
      <FAQSchema faqs={homeFaqs} />

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

              {/* Verified orientation bar */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                <span className="text-sm font-semibold text-stone-800">Available on iOS and Android</span>
                <span className="text-stone-300 hidden sm:inline">|</span>
                <span className="text-sm text-stone-600">Unlimited Free Quick Checks</span>
              </div>
              
              <p className="text-lg md:text-xl text-stone-700 mb-3 font-normal leading-relaxed text-balance">
                Use supported mouth photos, supported X-rays, or both. Free X-ray submissions show a reduced subset of eligible finding data; Full Quick Check unlocks the full eligible X-ray insights for one case.
              </p>

              <p className="text-sm text-stone-600 mb-5 leading-relaxed">
                Monitor your oral health. Prevent bigger problems. Get clarity before expensive decisions.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-start items-stretch sm:items-start">
                <Button
                  size="lg"
                  className="min-h-11 bg-action text-action-foreground hover:bg-action-hover rounded-full px-6 py-5 text-base font-medium transition-all duration-300 hover:scale-105 shadow-xl border-0 cursor-pointer w-full sm:w-auto"
                  onClick={() => goToPlan("quick_check", "hero")}
                >
                  Start with a Free Quick Check
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="min-h-11 bg-white/50 backdrop-blur-md border-primary/20 text-primary hover:bg-white/80 rounded-full px-6 py-5 text-base font-medium transition-all duration-300 cursor-pointer w-full sm:w-auto"
                  onClick={() => goToPlan("second_opinion", "hero")}
                >
                  Review a Treatment Plan
                </Button>
              </div>
              <p className="mt-3 text-sm text-stone-500">
                Free Quick Check is unlimited. Mouth photos do not require an X-ray. Full Quick Check and other paid services show their price before purchase on{" "}
                <a href={getAppStoreUrl("hero_text")} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 min-w-11 items-center justify-center px-1 -mx-1 text-primary hover:underline" onClick={() => trackAppDownload("ios", "hero_text")}>iOS</a>
                {" "}and{" "}
                <a href={getPlayStoreUrl("hero_text")} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 min-w-11 items-center justify-center px-1 -mx-1 text-primary hover:underline" onClick={() => trackAppDownload("android", "hero_text")}>Android</a>.
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
                      <source type="image/webp" srcSet="/manus-storage/dentasmart-app-oral-health-score_ef84a3c3.webp" />
                      <img src="/manus-storage/dentasmart-app-oral-health-score_ef84a3c3.webp" decoding="async" alt="DentaSmart Oral Health Score screen with a score summary and report details" className="w-full h-full object-cover object-top" loading="eager" fetchPriority="high" width="1080" height="2337" />
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
                      <source type="image/webp" srcSet="/manus-storage/dentasmart-app-free-quick-check_303190e3.webp" />
                      <img src="/manus-storage/dentasmart-app-free-quick-check_303190e3.webp" decoding="async" alt="DentaSmart Free Quick Check screen for guided mouth photos" className="w-full h-full object-cover object-top" loading="eager" width="828" height="1792" />
                    </picture>
                  </div>
                </div>
                <div className="text-center mt-3 sm:mt-4">
                  <span className="text-xs sm:text-sm font-medium text-stone-600 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">Free Quick Check</span>
                </div>
              </div>
            </motion.div>

            {/* Store download buttons — below phone mockups */}
            <div className="lg:col-span-7 lg:col-start-6 flex justify-center mt-2 lg:mt-0">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={getAppStoreUrl("hero")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center bg-black text-white hover:bg-stone-800 rounded-full px-6 font-medium text-sm transition-colors whitespace-nowrap"
                  onClick={() => trackAppDownload("ios", "hero")}
                >
                  Download on App Store
                </a>
                <a
                  href={getPlayStoreUrl("hero")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center bg-action text-action-foreground hover:bg-action-hover rounded-full px-6 font-medium text-sm transition-colors whitespace-nowrap"
                  onClick={() => trackAppDownload("android", "hero")}
                >
                  Get it on Google Play
                </a>
              </div>
            </div>

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
              Watch how DentaSmart turns supported information into an educational report you can discuss with a dental professional.
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
                <img
                  src="https://img.youtube.com/vi/O3wugign_Co/maxresdefault.jpg"
                  alt="DentaSmart Video Thumbnail"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 group-hover:scale-110 transition-transform pointer-events-auto">
                    <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-lg">
                      <circle cx="50" cy="50" r="48" fill="#DC2626" stroke="white" strokeWidth="4" />
                      <path d="M42 32 L68 50 L42 68 Z" fill="white" />
                    </svg>
                  </div>
                </div>
              </div>
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/O3wugign_Co" 
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
                { value: "Free", label: "Mouth-Photo Quick Check" },
                { value: "4", label: "Family Members Included" },
                { value: "iOS + Android", label: "Available Now" }
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
                "Ask Dr. Din to explain DentaSmart reports and common dental terms"
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
      <section className="py-8 bg-action text-action-foreground">
        <div className="container px-4 mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-normal text-center text-action-foreground mb-10">
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
                <h3 className="text-2xl font-medium mb-2 relative z-10 text-action-foreground">{item.title}</h3>
                <p className="text-action-foreground font-light relative z-10">{item.desc}</p>
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
              Treatment Plan Review
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
                  With Treatment Plan Review, you can upload a supported dentist treatment plan and related records for an educational plain-language review.
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
          DR DIN SECTION
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
              Meet Dr. Din, your <span className="italic text-primary">AI oral health guide.</span>
            </h2>
            <p className="text-xl text-stone-700 font-light leading-relaxed mb-6 max-w-3xl mx-auto">
              When report language or a dental term is confusing, Dr. Din can explain it in plain language and help you organize questions for a dentist.
            </p>
            <p className="text-lg text-stone-700 leading-relaxed mb-6 max-w-3xl mx-auto">
              Ask about DentaSmart reports, Oral Health Score history, common dental terms, or questions to prepare for a professional visit.
            </p>
            <p className="text-lg text-stone-800 font-medium max-w-2xl mx-auto">
              Dr. Din provides educational guidance. It does not diagnose conditions or replace professional care.
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
                  desc: "A free educational analysis of supported mouth photos when you want a clear starting point. No X-ray is required."
                },
                {
                  icon: Search,
                  title: "Complete Care",
                  desc: "Year-round educational monitoring, reports, Oral Health Score tracking, guided self-examination, and organized records."
                },
                {
                  icon: FileText,
                  title: "Treatment Plan Review",
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
          VERIFIED PRODUCT PROOF
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-normal text-black mb-4">
              Built for <span className="text-action italic">clearer dental decisions</span>
            </h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              DentaSmart turns the information you already have into organized, plain-English guidance you can use before and between dental visits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Understand what you see",
                description: "Review mouth photos and supported dental X-rays with plain-English educational insights."
              },
              {
                title: "Prepare better questions",
                description: "Use reports and treatment context to have a more informed conversation with your dentist."
              },
              {
                title: "Keep records together",
                description: "Track reports, images, Oral Health Score history, and family profiles in one place."
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
                <CheckCircle className="w-8 h-8 text-action mb-5" />
                <h3 className="text-xl font-medium text-stone-900 mb-3">{item.title}</h3>
                <p className="text-stone-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          MID-PAGE CTA (after benefits)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-8 bg-primary/5 border-y border-primary/10">
        <div className="container px-4 mx-auto max-w-3xl text-center">
          <h3 className="text-2xl md:text-3xl font-normal text-black mb-3">
            Ready to understand your oral health?
          </h3>
          <p className="text-stone-600 mb-6">Choose a one-time check or compare a treatment plan before you decide.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-action text-action-foreground hover:bg-action-hover rounded-full px-8 py-6 text-base font-medium shadow-lg cursor-pointer"
              onClick={() => goToPlan("quick_check", "mid_page")}
            >
              Start with a Free Quick Check
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-action/30 text-action hover:bg-action/5 rounded-full px-8 py-6 text-base font-medium cursor-pointer"
              onClick={() => goToPlan("second_opinion", "mid_page")}
            >
              Review a Treatment Plan
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
              Start with plain-language guides, then bring persistent or urgent concerns to a dental professional.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Toothache", desc: "Review common causes of tooth pain and signs that call for professional care.", href: "/conditions/toothache/" },
              { title: "Tooth Sensitivity", desc: "Learn why hot or cold triggers sharp pain and how to manage it.", href: "/conditions/sensitive-teeth/" },
              { title: "Gum Recession", desc: "Discover why gums pull back and what you can do to protect them.", href: "/conditions/gum-disease/" },
              { title: "Pain When Biting", desc: "Learn about possible reasons for pain when chewing and what to discuss with a dentist.", href: "/symptoms/tooth-pain-when-biting/" },
              { title: "Bad Breath", desc: "Review common reasons for persistent bad breath and when to seek dental advice.", href: "/symptoms/bad-breath/" },
              { title: "Cracked Tooth", desc: "A crack can worsen fast. Know the signs and your options.", href: "/conditions/cracked-tooth/" },
              { title: "Swollen Gums", desc: "Swelling around one tooth or many? Here is what to look for.", href: "/symptoms/swollen-gums/" },
              { title: "Wisdom Tooth Pain", desc: "Review warning signs and prepare questions about wisdom-tooth pain.", href: "/conditions/wisdom-teeth-pain/" },
              { title: "Cavity Symptoms", desc: "Learn about changes that may warrant a dental examination.", href: "/conditions/cavities/" },
              { title: "Jaw Pain", desc: "Review common reasons for jaw clicking, locking, or aching.", href: "/symptoms/jaw-pain/" },
              { title: "Dental Abscess", desc: "An abscess is serious. Know the warning signs and next steps.", href: "/conditions/dental-abscess/" }
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
                      Read the Guide <ArrowRight className="w-4 h-4" />
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
            {homeFaqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-stone-100">
                <h3 className="text-lg font-semibold text-black mb-2">{faq.question}</h3>
                <p className="text-stone-700 leading-relaxed">{faq.answer}</p>
                {faq.link && (
                  <Link href={faq.link}>
                    <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-3 hover:underline cursor-pointer">
                      {faq.linkText} <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                )}
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
              className="bg-action text-action-foreground hover:bg-action-hover rounded-full px-8 py-6 text-base font-medium shadow-lg cursor-pointer"
              onClick={() => goToPlan("quick_check", "post_faq")}
            >
              Start with a Free Quick Check
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-action/30 text-action hover:bg-action/5 rounded-full px-8 py-6 text-base font-medium cursor-pointer"
              onClick={() => goToPlan("second_opinion", "post_faq")}
            >
              Review a Treatment Plan
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
