import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ExternalSources from "@/components/ExternalSources";
import SEO from "@/components/SEO";
import MidContentCTA from "@/components/MidContentCTA";
import QuickAnswerBlock from "@/components/QuickAnswerBlock";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, DollarSign, AlertTriangle, CheckCircle, Clock, TrendingDown, Smartphone } from "lucide-react";
import { Link } from "wouter";
import type { ContentGovernance } from "@shared/contentGovernance";

/* ─── Types ─────────────────────────────────────────────── */
export interface CostRange {
  type: string;
  range: string;
  average: string;
  notes: string;
}

export interface CostFactor {
  factor: string;
  impact: string;
  tip: string;
}

export interface InsuranceTip {
  title: string;
  description: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface CostPageData {
  slug: string;
  procedureName: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  statsStrip: { value: string; label: string }[];
  problemTitle: string;
  problemHighlight: string;
  problemDescription: string;
  problemDescription2?: string;
  problemNote?: React.ReactNode;
  costBreakdown: CostRange[];
  costFactors: CostFactor[];
  insuranceTips: InsuranceTip[];
  savingsWithDentaSmart: { title: string; description: string }[];
  faqs: FAQ[];
  relatedCostPages: { name: string; slug: string; price: string }[];
  relatedTreatmentPage?: { name: string; slug: string };
  governance?: ContentGovernance;
}

/* ─── Animation ─────────────────────────────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function CostPageTemplate({ data }: { data: CostPageData }) {
  const canonicalUrl = `https://dentasmart.ai/dental-costs/${data.slug}`;

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
      { "@type": "ListItem", position: 2, name: "Dental Costs", item: "https://dentasmart.ai/dental-costs" },
      { "@type": "ListItem", position: 3, name: `${data.procedureName} Cost`, item: canonicalUrl },
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
    about: [{ "@type": "MedicalCondition", name: data.procedureName }],
    audience: { "@type": "MedicalAudience", name: "Patients" },
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
              <DollarSign className="w-4 h-4" /> Cost Guide
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-4 leading-[1.1] max-w-4xl">
              {data.heroTitle}{" "}
              <span className="italic text-primary">{data.heroHighlight}</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-2xl mb-8">
              {data.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/download/">
                <Button size="lg" className="bg-action text-action-foreground hover:bg-action-hover rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 shadow-lg w-full sm:w-auto">
                  Download the App
                </Button>
              </Link>
              <a href="#cost-breakdown">
                <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 rounded-full px-8 py-6 text-base font-medium cursor-pointer w-full sm:w-auto">
                  See Cost Breakdown <ArrowRight className="w-4 h-4 ml-2" />
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
            question={`How much does a ${data.procedureName.toLowerCase()} cost?`}
            answer={data.metaDescription}
            governance={data.governance?.directAnswer}
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

      {/* ═══ THE PROBLEM ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl md:text-4xl font-normal text-black mb-4 leading-tight">
                {data.problemTitle} <br />
                <span className="italic text-primary">{data.problemHighlight}</span>
              </h2>
              <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed mb-4">
                {data.problemDescription}
              </p>
              {data.problemDescription2 && (
                <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed">
                  {data.problemDescription2}
                </p>
              )}
              {data.problemNote && (
                <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed mt-4">
                  {data.problemNote}
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
                  <AlertTriangle className="w-5 h-5 text-amber-500" /> What Affects Your Final Bill
                </h3>
                <div className="space-y-4">
                  {data.costFactors.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 md:gap-4">
                      <div className="w-3 h-3 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-black text-sm md:text-base">{item.factor}</span>
                        <span className="text-stone-500 text-sm"> &middot; {item.impact}</span>
                        <p className="text-xs text-stone-500 mt-0.5">{item.tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ COST BREAKDOWN TABLE ═══ */}
      <section id="cost-breakdown" className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              {data.procedureName} cost breakdown
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light mb-6 max-w-3xl">
              Costs can vary by location, provider, treatment needs, and insurance coverage. Ask a dental office for an estimate for your situation.
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
                  <th className="text-left py-3 px-3 md:px-4 font-medium text-xs md:text-sm">Type</th>
                  <th className="text-left py-3 px-3 md:px-4 font-medium text-xs md:text-sm">Cost Range</th>
                  <th className="text-left py-3 px-3 md:px-4 font-medium text-xs md:text-sm hidden md:table-cell">Average</th>
                  <th className="text-left py-3 px-3 md:px-4 font-medium text-xs md:text-sm">Notes</th>
                </tr>
              </thead>
              <tbody>
                {data.costBreakdown.map((row, idx) => (
                  <tr key={idx} className={`border-t border-stone-100 ${idx % 2 === 0 ? "bg-white" : "bg-stone-50/50"}`}>
                    <td className="py-2.5 px-3 md:py-3 md:px-4 font-medium text-black text-xs md:text-sm">{row.type}</td>
                    <td className="py-2.5 px-3 md:py-3 md:px-4 text-stone-700 text-xs md:text-sm">{row.range}</td>
                    <td className="py-2.5 px-3 md:py-3 md:px-4 text-stone-700 text-xs md:text-sm hidden md:table-cell">{row.average}</td>
                    <td className="py-2.5 px-3 md:py-3 md:px-4 text-primary text-xs md:text-sm font-medium">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          <ExternalSources governedSources={data.governance?.sourceRefs} />
        </div>
      </section>

      {/* ═══ MID-CONTENT CTA ═══ */}
      <MidContentCTA 
        headline={`Want more context before a ${data.procedureName.toLowerCase()}?`}
        description="Review educational cost context, organize treatment-plan questions, and ask a licensed dentist what applies to your case."
        trackingLabel={`cost_page_${data.slug}`}
        variant="card"
      />

      {/* ═══ INSURANCE & PAYMENT ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              How to pay for a {data.procedureName.toLowerCase()}
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl">
              You have more options than you think. Here are the most common ways people cover this cost.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {data.insuranceTips.map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-stone-50 rounded-xl p-5 border border-stone-100"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-base md:text-lg font-medium text-black mb-1">{tip.title}</h3>
                    <p className="text-stone-600 font-light text-xs md:text-sm leading-relaxed">{tip.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW DENTASMART HELPS ═══ */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              How DentaSmart helps you review {data.procedureName.toLowerCase()} cost questions
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {data.savingsWithDentaSmart.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="bg-white rounded-2xl p-5 md:p-6 border border-stone-100"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  {idx === 0 && <Smartphone className="w-6 h-6 text-primary" />}
                  {idx === 1 && <TrendingDown className="w-6 h-6 text-primary" />}
                  {idx === 2 && <Clock className="w-6 h-6 text-primary" />}
                </div>
                <h3 className="text-lg md:text-xl font-medium text-black mb-2">{item.title}</h3>
                <p className="text-stone-600 font-light leading-relaxed text-sm md:text-base">{item.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/pricing/">
              <Button size="lg" className="bg-action text-action-foreground hover:bg-action-hover rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 w-full sm:w-auto">
                Explore DentaSmart Options <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              Frequently asked questions about {data.procedureName.toLowerCase()} costs
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
        </div>
      </section>

      {/* ═══ RELATED COST PAGES ═══ */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-6">
            <h2 className="text-2xl font-medium text-black">Other Dental Cost Guides</h2>
            <p className="text-stone-600 font-light mt-1 text-sm md:text-base">Compare costs across common dental procedures.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {data.relatedCostPages.map((page, idx) => (
              <Link key={page.slug} href={`/dental-costs/${page.slug}/`}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  className="bg-white rounded-xl p-4 border border-stone-100 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer text-center"
                >
                  <div className="text-lg md:text-xl font-medium text-primary mb-1">{page.price}</div>
                  <div className="text-xs md:text-sm text-stone-700 font-medium">{page.name}</div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RELATED HUBS ═══ */}
      <section className="py-6 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <h2 className="text-lg font-medium text-black mb-3">Related Resource Hubs</h2>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {data.relatedTreatmentPage && (
              <Link href={`/treatments/${data.relatedTreatmentPage.slug}/`}>
                <span className="inline-flex items-center gap-2 bg-primary/5 px-3 md:px-4 py-2 rounded-full border border-primary/20 text-action font-medium hover:bg-primary/10 transition-colors cursor-pointer text-xs md:text-sm">
                  {data.relatedTreatmentPage.name} Guide <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            )}
            <Link href="/dental-costs/">
              <span className="inline-flex items-center gap-2 bg-stone-50 px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                All Dental Costs <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/oral-health-hub/affordability/">
              <span className="inline-flex items-center gap-2 bg-stone-50 px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Affordability Guide <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/oral-health-hub/conditions/">
              <span className="inline-flex items-center gap-2 bg-stone-50 px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Conditions Guide <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/oral-health-hub/second-opinion/">
              <span className="inline-flex items-center gap-2 bg-stone-50 px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Second Opinion Hub <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/symptom-quiz/">
              <span className="inline-flex items-center gap-2 bg-stone-50 px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Free Symptom Checker <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-10 bg-stone-900 text-white">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-normal mb-3 text-white">
              Review your options before treatment.
            </h2>
            <p className="text-base md:text-lg text-stone-300 font-light mb-6 max-w-2xl mx-auto">
              Use DentaSmart to organize supported information, review educational cost context, and prepare questions for a licensed dentist. DentaSmart does not diagnose conditions or decide which treatment you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/download/">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 w-full sm:w-auto">
                  Download the App
                </Button>
              </Link>
              <Link href="/symptom-quiz/">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-medium cursor-pointer w-full sm:w-auto">
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
