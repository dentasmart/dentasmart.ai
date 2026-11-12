import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Smartphone, Activity, Users, Clock, DollarSign, Heart, MessageCircle, Camera, FileText, Search, CheckCircle } from "lucide-react";
import { trackAppDownload, trackConversionEvent, getAppStoreUrl, getPlayStoreUrl } from "@/lib/analytics";
import { DownloadSection } from "@/components/DownloadSection";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import { useEffect } from "react";
import { useLocation } from "wouter";
import QuickAnswerBlock from "@/components/QuickAnswerBlock";
import FAQSchema from "@/components/FAQSchema";
import { HowToSchema } from "@/components/StructuredData";

const homeFaqs = [
  { question: "What is DentaSmart?", answer: "DentaSmart is Your Personal AI Dentist in Your Pocket. It analyzes submitted mouth photos, supported dental X-rays, and other information for reports with findings, treatment considerations, and priorities, depending on the assessment. Track your Oral Health Score and records, and ask Dr. Din, the AI companion, about your reports and oral health." },
  { question: "Who is DentaSmart for?", answer: "DentaSmart is for people who want to understand their mouth photos, X-rays, or treatment plans and keep track of oral health between dental visits. It can help individuals and families organize records and questions, including when dental anxiety, a confusing estimate, or a lack of insurance makes planning care harder. Persistent or urgent symptoms need professional care." },
  { question: "How much does DentaSmart cost?", answer: "Free Quick Check is unlimited. Full Quick Check is $19.99 per case, Treatment Plan Review is $29.99 per case, and Complete Care is $74.99/year for individuals or $149.99/year for families of up to 4 members. Additional family members beyond 4 are $19.99/year each." },
  { question: "How is DentaSmart different from ChatGPT?", answer: "ChatGPT is a general AI assistant. DentaSmart is built for supported oral-health workflows, including Free Quick Check, Full Quick Check, Treatment Plan Review, Oral Health Score tracking, dental records, family profiles, cost context, and guidance from Dr. Din.", link: "/compare/dentasmart-vs-chatgpt-dental/", linkText: "Read the full DentaSmart vs ChatGPT comparison" },
  { question: "Is DentaSmart a replacement for a dentist?", answer: "No. DentaSmart helps you understand findings and treatment considerations and track your oral health between visits. It does not replace an in-person dental examination, routine dental care, or hands-on treatment." },
  { question: "Can DentaSmart review dental X-rays?", answer: "Yes. DentaSmart analyzes supported dental X-rays and mouth photos and explains findings in plain language. Free Quick Check shows limited eligible X-ray findings; Full Quick Check unlocks full eligible X-ray insights for one case. Findings reflect the information available, not a complete examination of your mouth." },
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
    const surface = source === "hero" ? "hero" : "mid_content";
    if (intent === "quick_check") {
      trackConversionEvent("download_hub_open", {
        cta_id: `${source}_free_quick_check`,
        surface,
        intent: "quick_check",
        destination_type: "internal_route",
        destination_path: "/download/",
      });
      setLocation("/download/");
      return;
    }
    trackConversionEvent("cta_click", {
      cta_id: `${source}_treatment_plan_review`,
      surface,
      intent: "treatment_plan_review",
      destination_type: "internal_route",
      destination_path: "/pricing/",
    });
      setLocation("/pricing/#treatment-plan-review");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black selection:bg-primary/20">
      <SEO 
        title="DentaSmart | Your Personal AI Dentist in Your Pocket"
        description="Analyze mouth photos and supported X-rays, read dentist-reviewed reports, and track your Oral Health Score. Free Quick Check is unlimited. Better Teeth. Lower Costs"
        canonical="https://dentasmart.ai/"
        ogImage="https://dentasmart.ai/manus-storage/dentasmart-free-quick-check-social-1200x630_b33c85da.png"
      />
      <Navigation />
      <HowToSchema
        name="How to Use DentaSmart for Oral Health Analysis"
        description="Upload mouth photos, supported X-rays, or both for a Free Quick Check. Read your dentist-approved report, then use the findings to track changes and discuss care."
        steps={[
          { name: "Upload", text: "Take mouth photos or upload supported dental X-rays for a Quick Check. Other assessments can use symptoms, treatment plans, bills, prescriptions, or dentist notes.", url: "/download" },
          { name: "Understand", text: "Read your dentist-approved report with findings and an Oral Health Score based on assessable areas. Broader assessments may include treatment considerations, priorities, possible timelines, and risk summaries.", url: "/how-it-works" },
          { name: "Prepare", text: "Discuss findings and treatment considerations with your dentist, ask Dr. Din about your report, and keep your records together.", url: "/features" }
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
                Better Teeth. <br />
                <span className="font-normal italic text-primary">Lower Costs</span>
              </h1>

              {/* Verified orientation bar */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                <span className="text-sm font-semibold text-stone-800">Available on iOS and Android</span>
                <span className="text-stone-300 hidden sm:inline">|</span>
                <span className="text-sm text-stone-600">Unlimited Free Quick Checks</span>
              </div>
              
              <p className="text-lg md:text-xl text-stone-700 mb-3 font-normal leading-relaxed text-balance">
                Your Personal AI Dentist in Your Pocket. Upload mouth photos, supported dental X-rays, or both for plain-language findings. Free X-ray reports show limited findings; Full Quick Check unlocks full eligible X-ray insights for one case.
              </p>

              <p className="text-sm text-stone-600 mb-5 leading-relaxed">
                Every generated report is reviewed and approved by licensed dentists before delivery.
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
              Watch how DentaSmart analyzes mouth photos and X-rays, explains findings, and keeps your oral health records together.
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
                { value: "4", label: "Total Family Members Included" },
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
                A new symptom or an unclear treatment plan can leave you unsure what to ask next. Keep track of the concern and bring persistent or urgent symptoms to a dental professional.
              </p>
              <p className="mt-4 text-lg text-primary font-medium">
                DentaSmart helps you understand the information you have before your next dental conversation.
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
              DentaSmart analyzes submitted mouth photos, supported dental X-rays, symptoms, and records. Reports explain findings and, depending on the assessment and available information, treatment considerations, priorities, possible timelines, and risk summaries.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Analyze submitted mouth photos and supported X-rays",
                "Read findings with plain-language explanations",
                "Track your Oral Health Score over time",
                "Monitor changes in your teeth and gums",
                "Prepare questions before a dental visit",
                "Review a dentist-provided treatment plan and possible alternatives",
                "Review risk summaries based on available assessment information",
                "Organize dental records for yourself and your family",
                "Ask Dr. Din, the AI companion, about your reports and oral health"
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
            From photos and records to a report
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { step: "01", title: "Upload", desc: "Take mouth photos or upload supported dental X-rays for a Quick Check. Other assessments can use symptoms, treatment plans, bills, prescriptions, or dentist notes." },
              { step: "02", title: "Understand", desc: "Read your dentist-approved report with findings and an Oral Health Score based on assessable areas. Broader assessments may include treatment considerations, priorities, possible timelines, and risk summaries." },
              { step: "03", title: "Prepare", desc: "Discuss findings and treatment considerations with your dentist, ask Dr. Din about your report, and keep your records together." }
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
                Compare your Oral Health Score and findings with earlier assessments to follow changes in the areas DentaSmart could assess.
              </p>
              <p className="text-lg text-stone-700 leading-relaxed mb-4">
                Oral Health Score records, reports, X-rays, mouth images, symptoms, visit history, and family profiles can stay organized in one place for your own reference and dental conversations.
              </p>
              <p className="text-base text-stone-600 font-medium">
                Use your record to prepare questions for a dentist when something changes or concerns you.
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
          TREATMENT PLAN REVIEW
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
              Before your next treatment-plan conversation, <span className="italic text-primary">prepare your questions.</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-lg text-stone-700 leading-relaxed mb-6">
                  Dental treatment plans can feel overwhelming.
                </p>
                <div className="space-y-3">
                  {[
                    "What does this recommendation mean?",
                    "What questions should I ask about the options?",
                    "What records should I bring to the conversation?",
                    "What should I ask about timing and follow-up?",
                    "What should I ask about the estimate?",
                    "What should I ask my dentist?"
                  ].map((q, idx) => (
                    <p key={idx} className="text-stone-800 font-medium italic">{q}</p>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
                <p className="text-lg text-stone-700 leading-relaxed mb-4">
                  With Treatment Plan Review, upload a dentist-provided treatment plan, your questions, and supporting records such as X-rays or bills.
                </p>
                <p className="text-lg text-stone-700 leading-relaxed mb-4">
                  Your report can explain the proposed care, possible alternatives, priorities, and timing considerations based on the information available.
                </p>
                <p className="text-base text-stone-600 font-medium border-t border-stone-100 pt-4 mt-4">
                  An in-person dental examination is still needed to confirm your care needs. Discuss the report with your treating dentist.
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
              Understand the estimate before you commit.
            </h2>
            <p className="text-xl text-stone-700 font-light leading-relaxed mb-4 max-w-3xl mx-auto">
              Dental care can feel more stressful when the recommendation, estimate, or next step is unclear.
            </p>
            <p className="text-lg text-stone-700 leading-relaxed mb-6 max-w-3xl mx-auto">
              Treatment Plan Review puts proposed treatments, possible options, and available cost context in plain language so you can ask about the estimate.
            </p>
            <p className="text-lg text-stone-800 font-medium">
              Cost ranges are estimates, not a quote from your dentist or an insurance coverage decision.
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
                Complete Care Family includes up to 4 total members, including the primary account holder.
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
              Talk with Dr. Din about your report findings, treatment explanations, dental history, or everyday oral-health questions.
            </p>
            <p className="text-lg text-stone-700 leading-relaxed mb-6 max-w-3xl mx-auto">
              Dr. Din can explain your Oral Health Score and common dental terms and help you prepare questions before or after a dental visit.
            </p>
            <p className="text-lg text-stone-800 font-medium max-w-2xl mx-auto">
              Dr. Din is AI, not the licensed dentist who reviews your report, and cannot examine you or provide hands-on care.
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
                  desc: "An unlimited Free Quick Check using mouth photos, supported X-rays, or both. No X-ray is required; free X-ray findings are limited."
                },
                {
                  icon: Search,
                  title: "Complete Care",
                  desc: "Annual individual and family plans for keeping oral health records over time. See Pricing for current included services and limits."
                },
                {
                  icon: FileText,
                  title: "Treatment Plan Review",
                  desc: "Review a dentist-provided treatment plan with explanations, possible alternatives, and priorities based on available records."
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
                description: "See findings linked to your submitted mouth photos and supported dental X-rays, with plain-English explanations."
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
          <p className="text-stone-600 mb-6">Start with an unlimited Free Quick Check or review a dentist-provided treatment plan.</p>
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
          <p className="text-stone-600 mb-6">Upload mouth photos for a Free Quick Check, or bring a treatment plan and your questions for review.</p>
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
