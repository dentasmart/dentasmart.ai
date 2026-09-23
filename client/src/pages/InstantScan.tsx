import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ExternalSources from "@/components/ExternalSources";
import { Button } from "@/components/ui/button";
import { trackConversionEvent } from "@/lib/analytics";
import { motion } from "framer-motion";
import { Camera, ArrowRight, CheckCircle, Clock, Shield } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { serializeJsonLd } from "@shared/jsonLd";

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
    title: "Mouth Photos",
    desc: "Use supported mouth photos for an educational review of visible areas. DentaSmart does not diagnose conditions from a photo.",
    time: "Timing varies by image quality and service",
  },
  {
    title: "Dental X-rays",
    desc: "Upload a supported dental X-ray for plain-language educational observations you can discuss with a dentist.",
    time: "Professional interpretation is still required",
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
    title: "DentaSmart reviews the information",
    desc: "The selected service organizes supported observations and explains them in plain language. Processing time can vary by image quality and service.",
  },
  {
    step: "03",
    title: "Review your educational report",
    desc: "Available outputs depend on the selected service and may include an Oral Health Score, plain-language report, and information you can share with a dental professional.",
  },
];

const aiLooksFor = [
  {
    title: "Visible tooth surfaces",
    desc: "Highlights visible areas in supported photos that you may want to discuss with a dentist.",
  },
  {
    title: "Gum appearance",
    desc: "Organizes visible gum observations without diagnosing the cause of redness, swelling, or recession.",
  },
  {
    title: "Visible buildup",
    desc: "Points out visible areas that may need closer daily care or professional evaluation.",
  },
  {
    title: "Color changes",
    desc: "Describes visible color differences in plain language so you can prepare questions for a dentist.",
  },
  {
    title: "Supported X-ray context",
    desc: "Provides educational observations from supported X-rays. A dentist must interpret images for diagnosis and treatment.",
  },
  {
    title: "Questions for professional care",
    desc: "Helps you organize what to ask about supported images without recommending a treatment.",
  },
];

const whatYouGet = [
  "Oral Health Score when included",
  "Educational visible observations",
  "Plain-language report",
  "Dentist-ready report when included",
  "Cost context for supported information",
  "Organized records for a dental visit",
  "Dr. Din access according to the selected service",
  "Questions to discuss with a dentist",
];

const faqs = [
  {
    q: "Is the dental scan really free?",
    a: "DentaSmart Free Quick Check is unlimited and accepts supported mouth photos, supported X-rays, or both. Full Quick Check and Treatment Plan Review are paid per case, while Complete Care is an annual paid plan. Review the current price and included features before purchase.",
  },
  {
    q: "How long does an instant scan take?",
    a: "Processing time can vary by image quality and the selected service. Do not wait for a report when symptoms are severe, worsening, or urgent; contact a dental or medical professional.",
  },
  {
    q: "What photos do I need to take?",
    a: "A guided self-examination walks you through it. You take a clear photo of your front teeth and your top and bottom teeth. If you already have a dental X-ray, panoramic or periapical, you can upload that too.",
  },
  {
    q: "How accurate is the AI analysis?",
    a: "DentaSmart does not publish a universal accuracy rate. Results can vary with image quality, the area shown, and the selected service. Use the output as educational information and ask a dentist to diagnose conditions or recommend treatment.",
  },
  {
    q: "Does this replace going to the dentist?",
    a: "No. DentaSmart helps you organize supported information and prepare questions for a dental visit. It does not diagnose conditions, provide hands-on care, or replace a licensed dentist's examination and treatment decisions.",
  },
  {
    q: "Is my data private?",
    a: "Your scan is private. Your images and results are yours, and DentaSmart is built so you stay in control of your dental history. You decide what to share with your dentist and when.",
  },
];

const internalLinks = [
  { label: "Toothache", href: "/conditions/toothache/" },
  { label: "Bleeding Gums", href: "/symptoms/bleeding-gums/" },
  { label: "Tooth Sensitivity", href: "/symptoms/tooth-sensitivity/" },
  { label: "Gum Recession", href: "/oral-health-hub/gum-recession/" },
  { label: "Pain When Biting", href: "/symptoms/tooth-pain-when-biting/" },
  { label: "Bad Breath", href: "/symptoms/bad-breath/" },
  { label: "Cracked Tooth", href: "/oral-health-hub/cracked-tooth-symptoms/" },
  { label: "Swollen Gums", href: "/oral-health-hub/swollen-gums/" },
  { label: "Wisdom Tooth Pain", href: "/conditions/wisdom-teeth-pain/" },
  { label: "Cavity Symptoms", href: "/oral-health-hub/cavity-symptoms/" },
  { label: "Jaw Pain", href: "/symptoms/jaw-pain/" },
  { label: "Dental Abscess", href: "/oral-health-hub/tooth-abscess-symptoms/" },
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

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black">
      <SEO
        title="Dental Photo Review | DentaSmart Educational Guide"
        description="Learn how DentaSmart uses supported mouth photos and dental X-rays for educational observations that do not replace professional diagnosis or care."
        canonical="https://dentasmart.ai/instant-scan"
        keywords="instant dental scan, AI dental analysis, teeth photo scan, dental X-ray analysis, oral health check online"
      />
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }}
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
                Upload supported mouth photos or dental X-rays for an educational review through the service you choose. DentaSmart organizes plain-language observations and questions for professional care.
              </p>

              <div className="space-y-3 mb-6">
                {[
                  "Free Quick Check accepts supported photos or X-rays",
                  "Full Quick Check provides fuller eligible X-ray insights",
                  "Plain-language explanations",
                  "Educational, not diagnostic",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-stone-700">{item}</span>
                  </div>
                ))}
              </div>

              <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 py-6 text-lg font-medium cursor-pointer shadow-xl">
                <Link href="/pricing/" onClick={() => trackConversionEvent("cta_click", {
                  cta_id: "instant_scan_hero_pricing",
                  surface: "hero",
                  intent: "pricing",
                  destination_type: "internal_route",
                  destination_path: "/pricing/",
                })}>
                  <Camera className="w-5 h-5 mr-2" />
                  Compare DentaSmart Services
                </Link>
              </Button>
              <div className="flex items-center gap-6 text-sm text-stone-500 mt-6">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-primary" /> Timing varies by service
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-primary" /> Professional care still matters
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
          <h2 className="text-3xl md:text-4xl font-normal text-black mb-8 text-center">Two supported image types</h2>
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

      {/* How the educational review works: 3 numbered steps */}
      <section className="py-10 bg-primary text-white">
        <div className="container px-4 mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-normal text-white mb-10 text-center">
            How a DentaSmart review works
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

      {/* What DentaSmart can help highlight: 6 cards */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-normal text-black mb-4 text-center">What DentaSmart can help highlight</h2>
          <p className="text-stone-500 text-center mb-10 max-w-2xl mx-auto font-light">
            DentaSmart organizes supported image observations in plain language to help you prepare questions for a dentist.
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

      {/* What a selected service may include */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-normal text-black mb-8 text-center">What a selected service may include</h2>
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
            Start with clear service options
          </h2>
          <p className="text-xl text-white/80 font-light mb-8">
            Free Quick Check is unlimited. Full Quick Check, Treatment Plan Review, and Complete Care are paid services with prices shown before purchase.
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-10 py-7 text-lg font-medium cursor-pointer">
            <Link href="/pricing/" onClick={() => trackConversionEvent("cta_click", {
              cta_id: "instant_scan_final_pricing",
              surface: "mid_content",
              intent: "pricing",
              destination_type: "internal_route",
              destination_path: "/pricing/",
            })}>
              Compare Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="container px-4 mx-auto max-w-4xl">
          <ExternalSources route="/instant-scan/" heading="Service scope verification" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
