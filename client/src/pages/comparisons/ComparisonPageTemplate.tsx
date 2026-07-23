import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ExternalSources from "@/components/ExternalSources";
import SEO from "@/components/SEO";
import MidContentCTA from "@/components/MidContentCTA";
import QuickAnswerBlock from "@/components/QuickAnswerBlock";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Scale, CheckCircle, XCircle, MinusCircle, Smartphone } from "lucide-react";
import { Link } from "wouter";

/* ─── Types ─────────────────────────────────────────────── */
export interface ComparisonRow {
  factor: string;
  optionA: string;
  optionB: string;
  winner?: "A" | "B" | "tie";
}

export interface ProConItem {
  text: string;
  type: "pro" | "con" | "neutral";
}

export interface WhoShouldChoose {
  title: string;
  description: string;
  bestFor: string[];
}

export interface FAQ {
  q: string;
  a: string;
}

export interface ComparisonPageData {
  slug: string;
  optionAName: string;
  optionBName: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  statsStrip: { value: string; label: string }[];
  introTitle: string;
  introHighlight: string;
  introDescription: string;
  introDescription2?: string;
  introNote?: React.ReactNode;
  comparisonTable: ComparisonRow[];
  optionAProsCons: ProConItem[];
  optionBProsCons: ProConItem[];
  whoShouldChooseA: WhoShouldChoose;
  whoShouldChooseB: WhoShouldChoose;
  bottomLine: string;
  faqs: FAQ[];
  relatedPages: { name: string; href: string; tagline: string }[];
}

/* ─── Animation ─────────────────────────────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ComparisonPageTemplate({ data }: { data: ComparisonPageData }) {
  const canonicalUrl = `https://dentasmart.ai/comparisons/${data.slug}`;

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
      { "@type": "ListItem", position: 2, name: "Comparisons", item: "https://dentasmart.ai/comparisons" },
      { "@type": "ListItem", position: 3, name: `${data.optionAName} vs ${data.optionBName}`, item: canonicalUrl },
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
    audience: { "@type": "MedicalAudience", name: "Patients" },
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
              <Scale className="w-4 h-4" /> Comparison Guide
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
                  Get Your Free AI Assessment
                </Button>
              </Link>
              <a href="#comparison-table">
                <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 rounded-full px-8 py-6 text-base font-medium cursor-pointer w-full sm:w-auto">
                  See Side-by-Side Comparison <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ QUICK ANSWER (AEO) ═══ */}
      <section className="py-6 bg-white border-b border-stone-100">
        <div className="container px-4 mx-auto max-w-4xl">
          <QuickAnswerBlock
            question={`${data.optionAName} vs ${data.optionBName}: Which is better?`}
            answer={data.metaDescription}
            sourceUrl={`https://dentasmart.ai/comparisons/${data.slug}`}
            sourceLabel={`DentaSmart ${data.optionAName} vs ${data.optionBName} Guide`}
          />
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

      {/* ═══ INTRO / THE REAL QUESTION ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-4 leading-tight">
              {data.introTitle} <br />
              <span className="italic text-primary">{data.introHighlight}</span>
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed mb-4">
              {data.introDescription}
            </p>
            {data.introDescription2 && (
              <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed">
                {data.introDescription2}
              </p>
            )}
            {data.introNote && (
              <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed mt-4">
                {data.introNote}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* ═══ COMPARISON TABLE ═══ */}
      <section id="comparison-table" className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              {data.optionAName} vs {data.optionBName}: side by side
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl">
              Here is how they compare on the factors that matter most.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="-mx-4 md:mx-0 overflow-x-auto"
          >
            <table className="w-full bg-white rounded-none md:rounded-2xl overflow-hidden border border-stone-200 min-w-[600px]">
              <thead>
                <tr className="bg-stone-900 text-white">
                  <th className="text-left py-3 px-3 md:px-5 font-medium text-xs md:text-sm w-1/4">Factor</th>
                  <th className="text-left py-3 px-3 md:px-5 font-medium text-xs md:text-sm w-[37.5%]">{data.optionAName}</th>
                  <th className="text-left py-3 px-3 md:px-5 font-medium text-xs md:text-sm w-[37.5%]">{data.optionBName}</th>
                </tr>
              </thead>
              <tbody>
                {data.comparisonTable.map((row, idx) => (
                  <tr key={idx} className={`border-t border-stone-100 ${idx % 2 === 0 ? "bg-white" : "bg-stone-50/50"}`}>
                    <td className="py-3 px-3 md:px-5 font-medium text-black text-xs md:text-sm">{row.factor}</td>
                    <td className={`py-3 px-3 md:px-5 text-xs md:text-sm ${row.winner === "A" ? "text-primary font-medium" : "text-stone-700"}`}>
                      {row.optionA}
                    </td>
                    <td className={`py-3 px-3 md:px-5 text-xs md:text-sm ${row.winner === "B" ? "text-primary font-medium" : "text-stone-700"}`}>
                      {row.optionB}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ═══ PROS & CONS SIDE BY SIDE ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              Pros and cons at a glance
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Option A */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-stone-50 rounded-2xl p-5 md:p-6 border border-stone-100"
            >
              <h3 className="text-xl font-medium text-black mb-4">{data.optionAName}</h3>
              <div className="space-y-3">
                {data.optionAProsCons.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    {item.type === "pro" ? (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : item.type === "con" ? (
                      <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <MinusCircle className="w-5 h-5 text-stone-400 flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm md:text-base text-stone-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Option B */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-stone-50 rounded-2xl p-5 md:p-6 border border-stone-100"
            >
              <h3 className="text-xl font-medium text-black mb-4">{data.optionBName}</h3>
              <div className="space-y-3">
                {data.optionBProsCons.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    {item.type === "pro" ? (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : item.type === "con" ? (
                      <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <MinusCircle className="w-5 h-5 text-stone-400 flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm md:text-base text-stone-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ MID-CONTENT CTA ═══ */}
      <MidContentCTA />

      {/* ═══ WHO SHOULD CHOOSE WHAT ═══ */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              So which one is right for <span className="italic text-primary">you</span>?
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[data.whoShouldChooseA, data.whoShouldChooseB].map((option, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="bg-white rounded-2xl p-5 md:p-6 border border-stone-100"
              >
                <h3 className="text-xl font-medium text-black mb-2">{option.title}</h3>
                <p className="text-sm md:text-base text-stone-600 font-light leading-relaxed mb-4">{option.description}</p>
                <div className="space-y-2">
                  {option.bestFor.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-stone-700">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE BOTTOM LINE ═══ */}
      <section className="py-10 bg-stone-900 text-white">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-normal mb-4 text-white">
              The bottom line
            </h2>
            <p className="text-base md:text-lg text-stone-300 font-light leading-relaxed max-w-3xl mx-auto mb-6">
              {data.bottomLine}
            </p>
            <Link href="/download">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 w-full sm:w-auto">
                <Smartphone className="w-4 h-4 mr-2" /> Get Your Free AI Assessment
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              Common questions about {data.optionAName.toLowerCase()} vs {data.optionBName.toLowerCase()}
            </h2>
          </motion.div>
          <div className="space-y-3 md:space-y-4">
            {data.faqs.map((faq, idx) => (
              <motion.details
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="group bg-stone-50 rounded-xl border border-stone-100 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-4 md:p-5 cursor-pointer list-none">
                  <h3 className="text-sm md:text-base font-medium text-black pr-4">{faq.q}</h3>
                  <span className="text-primary text-xl flex-shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="px-4 pb-4 pt-0 md:px-5 md:pb-5">
                  <p className="text-stone-600 font-light leading-relaxed text-xs md:text-sm">{faq.a}</p>
                </div>
              </motion.details>
            ))}
          </div>
          <ExternalSources />
        </div>
      </section>

      {/* ═══ RELATED PAGES ═══ */}
      <section className="py-6 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <h2 className="text-lg font-medium text-black mb-3">Related Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {data.relatedPages.map((page, idx) => (
              <Link key={idx} href={page.href}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(idx * 0.05, 0.3), duration: 0.4 }}
                  className="bg-white rounded-xl p-4 border border-stone-100 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer h-full"
                >
                  <h3 className="text-base font-medium text-black mb-1">{page.name}</h3>
                  <p className="text-stone-500 font-light text-xs leading-relaxed line-clamp-2 mb-2">{page.tagline}</p>
                  <span className="inline-flex items-center gap-1 text-primary text-xs font-medium">
                    Read more <ArrowRight className="w-3 h-3" />
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-3">
              Still not sure? <span className="italic text-primary">Let AI help.</span>
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light mb-6 max-w-2xl mx-auto">
              Upload a photo of your teeth and get a personalized AI assessment. It takes about 2 minutes and it is completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/download">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 w-full sm:w-auto">
                  Download DentaSmart Free
                </Button>
              </Link>
              <Link href="/symptom-quiz">
                <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 rounded-full px-8 py-6 text-base font-medium cursor-pointer w-full sm:w-auto">
                  Try Free Symptom Check
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
