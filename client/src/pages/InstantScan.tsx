import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { motion } from "framer-motion";
import { Camera, ArrowRight, CheckCircle, Clock, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

// ─── Bug fix: use a safe animation variant that always ends at opacity:1 ─────
// The original code used whileInView which can silently fail if IntersectionObserver
// doesn't fire (e.g. above-the-fold, reduced-motion, or slow JS). We add a
// CSS fallback so elements are always visible even if the animation never runs.
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const scanTypes = [
  {
    title: "Teeth Photo Scan",
    desc: "Take a photo of your front teeth, top, and bottom. Our AI detects cavities, discoloration, gum recession, and more.",
    time: "~5 minutes",
  },
  {
    title: "X-Ray Analysis",
    desc: "Upload a dental X-ray (panoramic or periapical). Get detailed findings including bone loss, root issues, and hidden decay.",
    time: "~10 minutes",
  },
];

const howItWorksSteps = [
  {
    step: "01",
    title: "Upload a photo or X-ray",
    desc: "Snap a quick picture of your front teeth, top, and bottom, or upload a dental X-ray you already have. A guided self-examination walks you through each shot so nothing is missed.",
  },
  {
    step: "02",
    title: "Our AI analyzes it in minutes",
    desc: "DentaSmart reviews your images for signs of cavities, gum recession, discoloration, plaque, bone loss, and more, then translates the findings into plain English you can actually understand.",
  },
  {
    step: "03",
    title: "Get your score and care plan",
    desc: "You receive an Oral Health Score, tooth-by-tooth findings, estimated cost ranges, and a personalized prevention plan, plus a dentist-ready report you can bring to your next visit.",
  },
];

const aiLooksFor = [
  {
    title: "Cavities & early decay",
    desc: "Spots discoloration and surface changes that can signal a cavity forming, so you can act before it needs a bigger procedure.",
  },
  {
    title: "Gum recession & gum issues",
    desc: "Flags receding gums and signs of inflammation that often go unnoticed until they become painful or costly.",
  },
  {
    title: "Plaque & buildup",
    desc: "Highlights visible plaque and tartar buildup so you know which areas your daily routine is missing.",
  },
  {
    title: "Discoloration & staining",
    desc: "Identifies staining and color changes and explains whether they are cosmetic or worth asking your dentist about.",
  },
  {
    title: "Bone loss (from X-rays)",
    desc: "Reads panoramic and periapical X-rays for early signs of bone loss around the teeth that you cannot see in a mirror.",
  },
  {
    title: "Root issues & hidden decay",
    desc: "Surfaces root infections, impacted wisdom teeth, existing fillings, and decay hiding between teeth on your X-rays.",
  },
];

const whatYouGet = [
  "Oral Health Score (0-100)",
  "Tooth-by-tooth findings",
  "Condition severity ratings",
  "Recommended treatment types",
  "Estimated cost ranges",
  "Type of dentist to see",
  "Personalized care timeline",
  "Prevention recommendations",
];

const faqs = [
  {
    q: "Is the dental scan really free?",
    a: "Yes. Your first scan is free. Download the app, scan your teeth, and see a preview of your Oral Health Score and key findings at no cost. You only pay if you want the full report and personalized plan.",
  },
  {
    q: "How long does an instant scan take?",
    a: "A teeth photo scan takes about five minutes and an X-ray analysis takes about ten. There is no appointment and no waiting room, so you can do it from home whenever it is convenient.",
  },
  {
    q: "What photos do I need to take?",
    a: "A guided self-examination walks you through it. You take a clear photo of your front teeth and your top and bottom teeth. If you already have a dental X-ray, panoramic or periapical, you can upload that too.",
  },
  {
    q: "How accurate is the AI analysis?",
    a: "DentaSmart analyzes your images for common signs of cavities, gum issues, plaque, bone loss, and more, and every analysis is reviewed and approved by licensed dentists. It is designed to give you clarity and better questions for your dentist, not a final diagnosis.",
  },
  {
    q: "Does this replace going to the dentist?",
    a: "No. DentaSmart is your smart assistant before the visit. It helps you understand what is happening in your mouth, prepare for your appointment, and avoid surprise costs, but you should always see a licensed dentist for diagnosis and treatment.",
  },
  {
    q: "Is my data private?",
    a: "Your scan is private. Your images and results are yours, and DentaSmart is built so you stay in control of your dental history. You decide what to share with your dentist and when.",
  },
];

const internalLinks = [
  { label: "Toothache", href: "/conditions/toothache" },
  { label: "Bleeding Gums", href: "/symptoms/bleeding-gums" },
  { label: "Tooth Sensitivity", href: "/symptoms/tooth-sensitivity" },
  { label: "Gum Recession", href: "/oral-health-hub/gum-recession" },
  { label: "Pain When Biting", href: "/symptoms/tooth-pain-when-biting" },
  { label: "Bad Breath", href: "/symptoms/bad-breath" },
  { label: "Cracked Tooth", href: "/oral-health-hub/cracked-tooth-symptoms" },
  { label: "Swollen Gums", href: "/oral-health-hub/swollen-gums" },
  { label: "Wisdom Tooth Pain", href: "/conditions/wisdom-teeth-pain" },
  { label: "Cavity Symptoms", href: "/oral-health-hub/cavity-symptoms" },
  { label: "Jaw Pain", href: "/symptoms/jaw-pain" },
  { label: "Dental Abscess", href: "/oral-health-hub/tooth-abscess-symptoms" },
];

// FAQPage JSON-LD structured data
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function InstantScan() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    trackEvent("instant_scan_page_view");
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black">
      <SEO
        title="Free AI Dental Scan in 10 Minutes"
        description="Upload a photo of your teeth or dental X-ray and get AI-powered analysis. Detect cavities, gum disease, and more in under 10 minutes. Free first scan."
        canonical="https://dentasmart.ai/instant-scan"
        keywords="instant dental scan, AI dental analysis, teeth photo scan, dental X-ray analysis, oral health check online"
      />
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <picture>
            <source
              type="image/webp"
              srcSet="/images/optimized/dOrOUbRuSUXPRulY-400.webp 400w, /images/optimized/dOrOUbRuSUXPRulY-800.webp 800w, /images/optimized/dOrOUbRuSUXPRulY-1600.webp 1600w"
              sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1600px"
            />
            <img
              src="/images/optimized/dOrOUbRuSUXPRulY-800.webp"
              alt="Woman smiling with healthy teeth"
              className="w-full h-full object-cover object-center md:object-[70%_30%]"
              loading="lazy"
              width="1600"
              height="893"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/20 md:via-white/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent md:hidden" />
        </div>

        <div className="container relative z-10 px-4 mx-auto max-w-7xl pt-40 md:pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left max-w-2xl lg:col-span-7 xl:col-span-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-normal tracking-tight text-black mb-4 leading-tight">
                See what your dentist sees
                <br />
                <span className="italic text-primary">before your visit</span>.
              </h1>
              <p className="text-lg text-stone-600 mb-6 font-light leading-relaxed">
                Upload a photo of your teeth or X-rays. Our AI analyzes it in minutes and gives you a clear, jargon-free report so you know exactly what is going on.
              </p>

              <div className="space-y-3 mb-6">
                {[
                  "No appointment needed",
                  "Results in under 10 minutes",
                  "Plain-language explanations",
                  "Personalized care plan included",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-stone-700">{item}</span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 py-6 text-lg font-medium cursor-pointer shadow-xl"
                onClick={() => {
                  trackEvent("cta_get_score_click", { source: "instant_scan_page" });
                  window.location.href = "/#download-cta";
                }}
              >
                <Camera className="w-5 h-5 mr-2" />
                Start My Free Scan
              </Button>
              <div className="flex items-center gap-6 text-sm text-stone-500 mt-6">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-primary" /> Results in 10 minutes
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-primary" /> 100% private
                </span>
              </div>
            </motion.div>
            <div className="hidden lg:block lg:col-span-5 xl:col-span-6" />
          </div>
        </div>
      </section>

      {/* Two ways to scan — BUG FIX: use animate instead of whileInView so cards are
          always visible on first paint regardless of IntersectionObserver firing */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-normal text-black mb-8 text-center">Two ways to scan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {scanTypes.map((scan, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="bg-stone-50 rounded-2xl p-8 border border-stone-100"
              >
                <h3 className="text-xl font-medium text-black mb-3">{scan.title}</h3>
                <p className="text-stone-600 font-light mb-4">{scan.desc}</p>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-medium">
                  <Clock className="w-4 h-4" /> {scan.time}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How your instant scan works — 3 numbered steps */}
      <section className="py-10 bg-primary text-white">
        <div className="container px-4 mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-normal text-white mb-10 text-center">
            How your instant scan works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {howItWorksSteps.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-white/20 absolute -top-8 left-1/2 -translate-x-1/2 select-none">
                  {item.step}
                </div>
                <h3 className="text-xl font-medium mb-3 relative z-10 text-white">{item.title}</h3>
                <p className="text-white/80 font-light relative z-10 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What the AI looks for — 6 cards */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-normal text-black mb-4 text-center">What the AI looks for</h2>
          <p className="text-stone-500 text-center mb-10 max-w-2xl mx-auto font-light">
            DentaSmart reviews your images for the most common oral health concerns and explains each finding in plain language.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiLooksFor.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-stone-50 rounded-2xl p-6 border border-stone-100"
              >
                <h3 className="text-base font-semibold text-black mb-2">{item.title}</h3>
                <p className="text-stone-600 text-sm font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-stone-400 text-center mt-8 max-w-2xl mx-auto leading-relaxed">
            DentaSmart provides educational guidance to help you understand your oral health and have better conversations with a licensed dentist. It is not a diagnosis or a replacement for professional dental care.
          </p>
        </div>
      </section>

      {/* What you get in your report — BUG FIX: animate instead of whileInView */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-normal text-black mb-8 text-center">What you get in your report</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whatYouGet.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeLeft}
                initial="hidden"
                animate="visible"
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="flex items-center gap-3 bg-white rounded-xl p-4 border border-stone-100"
              >
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-stone-700">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common questions FAQ — crawlable, answers always visible in DOM */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-normal text-black mb-8 text-center">Common questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-stone-200 rounded-2xl overflow-hidden">
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 bg-white hover:bg-stone-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                >
                  <span className="font-medium text-black text-base">{faq.q}</span>
                  <span className="text-primary text-xl flex-shrink-0">{openFaq === idx ? "−" : "+"}</span>
                </button>
                {/* Answer is always in the DOM for crawlers; CSS controls visibility */}
                <div
                  className={`px-6 pb-5 text-stone-600 font-light leading-relaxed text-sm transition-all duration-200 ${
                    openFaq === idx ? "block" : "hidden"
                  }`}
                  aria-hidden={openFaq !== idx}
                >
                  {faq.a}
                </div>
                {/* Always-visible version for crawlers / no-JS */}
                <noscript>
                  <div className="px-6 pb-5 text-stone-600 font-light leading-relaxed text-sm">{faq.a}</div>
                </noscript>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links — Common concerns people check */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="text-2xl font-normal text-black mb-6 text-center">Common concerns people check</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {internalLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-700 font-medium text-center hover:border-primary hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-10 bg-primary text-white text-center">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-normal text-white mb-4">
            Stop wondering. Start knowing.
          </h2>
          <p className="text-xl text-white/80 font-light mb-8">
            Your first scan is free. Get your Oral Health Score in under a minute.
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 rounded-full px-10 py-7 text-lg font-medium cursor-pointer"
            onClick={() => {
              trackEvent("cta_get_score_click", { source: "instant_scan_bottom" });
              window.location.href = "/#download-cta";
            }}
          >
            Get My Oral Health Score
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
