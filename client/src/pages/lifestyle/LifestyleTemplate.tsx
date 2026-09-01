import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ExternalSources from "@/components/ExternalSources";
import SEO from "@/components/SEO";
import MidContentCTA from "@/components/MidContentCTA";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, AlertTriangle, CheckCircle, XCircle, Smartphone } from "lucide-react";
import { Link } from "wouter";

/* ─── Types ─────────────────────────────────────────────── */
export interface LifestyleImpact {
  area: string;
  detail: string;
}

export interface LifestyleTip {
  title: string;
  description: string;
}

export interface DoItem {
  text: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface LifestylePageData {
  slug: string;
  topic: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  statsStrip: { value: string; label: string }[];
  overviewTitle: string;
  overviewHighlight: string;
  overviewDescription: string;
  overviewDescription2?: string;
  impacts: LifestyleImpact[];
  doList: DoItem[];
  dontList: DoItem[];
  protectionTips: LifestyleTip[];
  warningSignsTitle: string;
  warningSignsDescription: string;
  warningSigns: string[];
  faqs: FAQ[];
  relatedLifestylePages: { name: string; slug: string; tagline: string }[];
  relatedCostPage?: { name: string; slug: string };
  relatedTreatmentPage?: { name: string; slug: string };
}

/* ─── Animation ─────────────────────────────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function LifestyleTemplate({ data }: { data: LifestylePageData }) {
  const canonicalUrl = `https://dentasmart.ai/lifestyle/${data.slug}`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://dentasmart.ai" },
      { "@type": "ListItem", position: 2, name: "Lifestyle & Oral Health", item: "https://dentasmart.ai/lifestyle" },
      { "@type": "ListItem", position: 3, name: data.topic, item: canonicalUrl },
    ],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: data.metaTitle,
    description: data.metaDescription,
    url: canonicalUrl,
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", name: "DentaSmart", url: "https://dentasmart.ai" },
    lastReviewed: "2026-04-08",
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black selection:bg-primary/20">
      <SEO
        title={data.metaTitle}
        description={data.metaDescription}
        canonical={canonicalUrl}
        keywords={data.keywords}
        jsonLd={[faqJsonLd, breadcrumbJsonLd, webPageJsonLd]}
      />
      <Navigation />

      {/* ═══ HERO ═══ */}
      <section className="relative flex items-center overflow-hidden bg-gradient-to-br from-white via-accent/5 to-primary/5">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 px-4 mx-auto max-w-6xl pt-40 pb-12 md:pt-36 md:pb-14">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-6">
              <Leaf className="w-4 h-4" /> Lifestyle & Oral Health
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-4 leading-[1.1] max-w-4xl">
              {data.heroTitle}{" "}
              <span className="italic text-primary">{data.heroHighlight}</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-2xl mb-8">
              {data.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/download">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 shadow-lg w-full sm:w-auto">
                  Download the App
                </Button>
              </Link>
              <a href="#impacts">
                <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 rounded-full px-8 py-6 text-base font-medium cursor-pointer w-full sm:w-auto">
                  See the Impact <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS STRIP ═══ */}
      <section className="py-6 bg-primary text-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            {data.statsStrip.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="py-3 md:py-0"
              >
                <div className="text-3xl md:text-5xl font-normal tracking-tighter text-white">{stat.value}</div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/80 font-medium mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OVERVIEW + IMPACTS ═══ */}
      <section id="impacts" className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl md:text-4xl font-normal text-black mb-4 leading-tight">
                {data.overviewTitle} <br />
                <span className="italic text-primary">{data.overviewHighlight}</span>
              </h2>
              <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed mb-4">
                {data.overviewDescription}
              </p>
              {data.overviewDescription2 && (
                <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed">
                  {data.overviewDescription2}
                </p>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-stone-50 rounded-2xl p-5 md:p-6 border border-stone-100">
                <h3 className="text-lg font-medium text-black mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" /> How It Affects Your Mouth
                </h3>
                <div className="space-y-3">
                  {data.impacts.map((impact, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-black">{impact.area}</p>
                        <p className="text-sm text-stone-600">{impact.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ DO / DON'T ═══ */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              What to do and what to avoid
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl">
              Simple changes that protect your teeth and gums.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 border border-green-100"
            >
              <h3 className="text-lg font-medium text-green-700 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Do
              </h3>
              <div className="space-y-3">
                {data.doList.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-stone-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 border border-red-100"
            >
              <h3 className="text-lg font-medium text-red-700 mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> Don't
              </h3>
              <div className="space-y-3">
                {data.dontList.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-stone-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ MID-CONTENT CTA ═══ */}
      <MidContentCTA />

      {/* ═══ PROTECTION TIPS ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              How to protect your smile
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl">
              Practical steps you can start today.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.protectionTips.map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-stone-50 rounded-xl p-5 border border-stone-100"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <CheckCircle className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-base font-medium text-black mb-2">{tip.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WARNING SIGNS ═══ */}
      <section className="py-10 bg-stone-900 text-white">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div {...fadeUp} className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-white mb-2">
              {data.warningSignsTitle}
            </h2>
            <p className="text-base md:text-lg text-stone-300 font-light max-w-2xl mx-auto">
              {data.warningSignsDescription}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.warningSigns.map((sign, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="flex items-center gap-3 bg-white/5 rounded-xl px-5 py-3 border border-white/10"
              >
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <p className="text-sm text-stone-200">{sign}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-3xl">
          <motion.div {...fadeUp} className="mb-6">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              Frequently asked questions
            </h2>
          </motion.div>
          <div className="space-y-3">
            {data.faqs.map((faq, idx) => (
              <motion.details
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="group bg-stone-50 rounded-xl border border-stone-100 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none text-base font-medium text-black hover:bg-stone-100 transition-colors">
                  {faq.q}
                  <ArrowRight className="w-4 h-4 text-stone-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
                </summary>
                <div className="px-5 pb-5 text-sm text-stone-600 leading-relaxed">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>
          <ExternalSources />
        </div>
      </section>

      {/* ═══ RELATED PAGES ═══ */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-6">
            <h2 className="text-2xl md:text-3xl font-normal text-black mb-1">
              More lifestyle guides
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.relatedLifestylePages.map((page, idx) => (
              <Link key={idx} href={`/lifestyle/${page.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="bg-white rounded-xl p-5 border border-stone-100 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group"
                >
                  <h3 className="text-base font-medium text-black mb-1 group-hover:text-primary transition-colors">{page.name}</h3>
                  <p className="text-sm text-stone-500 mb-3">{page.tagline}</p>
                  <span className="text-sm text-primary font-medium inline-flex items-center gap-1">
                    Read guide <ArrowRight className="w-3 h-3" />
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Related cost/treatment links */}
          {(data.relatedCostPage || data.relatedTreatmentPage) && (
            <div className="flex flex-wrap gap-3 mt-6">
              {data.relatedCostPage && (
                <Link href={`/dental-costs/${data.relatedCostPage.slug}`}>
                  <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 text-sm text-stone-700 hover:border-primary/30 hover:text-primary transition-all cursor-pointer">
                    💰 {data.relatedCostPage.name}
                  </span>
                </Link>
              )}
              {data.relatedTreatmentPage && (
                <Link href={`/treatments/${data.relatedTreatmentPage.slug}`}>
                  <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 text-sm text-stone-700 hover:border-primary/30 hover:text-primary transition-all cursor-pointer">
                    🏥 {data.relatedTreatmentPage.name}
                  </span>
                </Link>
              )}
              <Link href="/lifestyle">
                <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 text-sm text-stone-700 hover:border-primary/30 hover:text-primary transition-all cursor-pointer">
                  📚 All Lifestyle Guides
                </span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="py-10 bg-primary text-white">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <motion.div {...fadeUp}>
            <Smartphone className="w-10 h-10 mx-auto mb-4 text-white/80" />
            <h2 className="text-3xl md:text-4xl font-normal text-white mb-3">
              Take control of your oral health
            </h2>
            <p className="text-base md:text-lg text-white/80 font-light max-w-xl mx-auto mb-6">
              The app is free to download. Use DentaSmart for educational guidance and to prepare questions for professional dental care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/download">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 w-full sm:w-auto">
                  Download the App
                </Button>
              </Link>
              <Link href="/symptom-quiz">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-medium cursor-pointer w-full sm:w-auto">
                  Try Free Symptom Check <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
