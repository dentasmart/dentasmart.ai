import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ExternalSources from "@/components/ExternalSources";
import SEO from "@/components/SEO";
import MidContentCTA from "@/components/MidContentCTA";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Stethoscope, Clock, CheckCircle, AlertTriangle, ShieldCheck, Smartphone, TrendingDown } from "lucide-react";
import { Link } from "wouter";

/* ─── Types ─────────────────────────────────────────────── */
export interface TimelineStep {
  step: string;
  title: string;
  description: string;
  duration?: string;
}

export interface RiskItem {
  risk: string;
  detail: string;
}

export interface RecoveryTip {
  title: string;
  description: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface TreatmentPageData {
  slug: string;
  procedureName: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  statsStrip: { value: string; label: string }[];
  whyNeededTitle: string;
  whyNeededHighlight: string;
  whyNeededDescription: string;
  whyNeededDescription2?: string;
  warningSignsTitle?: string;
  warningSigns?: string[];
  timelineSteps: TimelineStep[];
  timelineNote?: string;
  risks: RiskItem[];
  recoveryTitle: string;
  recoveryDescription: string;
  recoveryTips: RecoveryTip[];
  recoveryTimeline?: string;
  faqs: FAQ[];
  relatedTreatmentPages: { name: string; slug: string; tagline: string }[];
  relatedCostPage?: { name: string; slug: string };
}

/* ─── Animation ─────────────────────────────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function TreatmentPageTemplate({ data }: { data: TreatmentPageData }) {
  const canonicalUrl = `https://dentasmart.ai/treatments/${data.slug}`;

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
      { "@type": "ListItem", position: 2, name: "Treatments", item: "https://dentasmart.ai/treatments" },
      { "@type": "ListItem", position: 3, name: data.procedureName, item: canonicalUrl },
    ],
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `${data.procedureName}: What to Expect`,
    description: data.metaDescription,
    step: data.timelineSteps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.description,
    })),
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: data.metaTitle,
    description: data.metaDescription,
    url: canonicalUrl,
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", name: "DentaSmart", url: "https://dentasmart.ai" },
    about: [{ "@type": "MedicalProcedure", name: data.procedureName }],
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
        jsonLd={[faqJsonLd, breadcrumbJsonLd, howToJsonLd, webPageJsonLd]}
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
              <Stethoscope className="w-4 h-4" /> Treatment Guide
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
              <a href="#step-by-step">
                <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 rounded-full px-8 py-6 text-base font-medium cursor-pointer w-full sm:w-auto">
                  See Step-by-Step Guide <ArrowRight className="w-4 h-4 ml-2" />
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

      {/* ═══ WHY YOU MIGHT NEED THIS ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl md:text-4xl font-normal text-black mb-4 leading-tight">
                {data.whyNeededTitle} <br />
                <span className="italic text-primary">{data.whyNeededHighlight}</span>
              </h2>
              <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed mb-4">
                {data.whyNeededDescription}
              </p>
              {data.whyNeededDescription2 && (
                <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed">
                  {data.whyNeededDescription2}
                </p>
              )}
            </motion.div>
            {data.warningSigns && data.warningSigns.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="bg-stone-50 rounded-2xl p-5 md:p-6 border border-stone-100">
                  <h3 className="text-lg font-medium text-black mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" /> {data.warningSignsTitle || "Signs You Might Need This"}
                  </h3>
                  <div className="space-y-3">
                    {data.warningSigns.map((sign, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-3 h-3 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <p className="text-sm md:text-base text-stone-700">{sign}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ STEP-BY-STEP TIMELINE ═══ */}
      <section id="step-by-step" className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              What happens during a {data.procedureName.toLowerCase()}
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl">
              Here is exactly what to expect, step by step. No surprises.
            </p>
          </motion.div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />
            <div className="space-y-6">
              {data.timelineSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="relative flex gap-4 md:gap-6"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-medium text-sm relative z-10">
                    {step.step}
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-5 border border-stone-100 shadow-sm">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-base md:text-lg font-medium text-black">{step.title}</h3>
                      {step.duration && (
                        <span className="inline-flex items-center gap-1 text-xs text-stone-500 bg-stone-50 px-2 py-1 rounded-full flex-shrink-0">
                          <Clock className="w-3 h-3" /> {step.duration}
                        </span>
                      )}
                    </div>
                    <p className="text-sm md:text-base text-stone-600 font-light leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            {data.timelineNote && (
              <p className="text-xs text-stone-500 mt-4 ml-16 md:ml-18">{data.timelineNote}</p>
            )}
          </div>
        </div>
      </section>

      {/* ═══ MID-CONTENT CTA ═══ */}
      <MidContentCTA
        headline={`Nervous about getting a ${data.procedureName.toLowerCase()}?`}
        description="Upload a photo of your teeth and get a free AI assessment in 60 seconds. Understand your situation before you sit in the chair."
        trackingLabel={`treatment_page_${data.slug}`}
        variant="card"
      />

      {/* ═══ RISKS & WHAT TO WATCH FOR ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              Risks and what to watch for
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl">
              Every procedure has some risks. Knowing them ahead of time helps you have a better conversation with your dentist.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {data.risks.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-stone-50 rounded-xl p-5 border border-stone-100"
              >
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-base md:text-lg font-medium text-black mb-1">{item.risk}</h3>
                    <p className="text-stone-600 font-light text-xs md:text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RECOVERY ═══ */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              {data.recoveryTitle}
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl">
              {data.recoveryDescription}
            </p>
            {data.recoveryTimeline && (
              <div className="inline-flex items-center gap-2 mt-3 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Clock className="w-4 h-4" /> {data.recoveryTimeline}
              </div>
            )}
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {data.recoveryTips.map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="bg-white rounded-2xl p-5 md:p-6 border border-stone-100"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  {idx === 0 && <CheckCircle className="w-6 h-6 text-primary" />}
                  {idx === 1 && <ShieldCheck className="w-6 h-6 text-primary" />}
                  {idx === 2 && <Clock className="w-6 h-6 text-primary" />}
                  {idx > 2 && <CheckCircle className="w-6 h-6 text-primary" />}
                </div>
                <h3 className="text-lg md:text-xl font-medium text-black mb-2">{tip.title}</h3>
                <p className="text-stone-600 font-light leading-relaxed text-sm md:text-base">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW DENTASMART HELPS ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              How DentaSmart helps you prepare
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0, duration: 0.5 }}
              className="bg-stone-50 rounded-2xl p-5 md:p-6 border border-stone-100"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-medium text-black mb-2">Understand Before You Go</h3>
              <p className="text-stone-600 font-light leading-relaxed text-sm md:text-base">Upload a photo of your teeth and get a clear picture of what is going on. Walk into your appointment informed, not anxious.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="bg-stone-50 rounded-2xl p-5 md:p-6 border border-stone-100"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <TrendingDown className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-medium text-black mb-2">Get a Second Opinion</h3>
              <p className="text-stone-600 font-light leading-relaxed text-sm md:text-base">Not sure if you really need this procedure? Our AI can help you understand your options so you can have a better conversation with your dentist.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-stone-50 rounded-2xl p-5 md:p-6 border border-stone-100"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-medium text-black mb-2">Track Your Recovery</h3>
              <p className="text-stone-600 font-light leading-relaxed text-sm md:text-base">After your procedure, use DentaSmart to monitor your healing progress and get reminders for follow-up care.</p>
            </motion.div>
          </div>
          <div className="mt-6 text-center">
            <Link href="/download">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 w-full sm:w-auto">
                Try DentaSmart Free <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ COST LINK ═══ */}
      {data.relatedCostPage && (
        <section className="py-6 bg-primary/5">
          <div className="container px-4 mx-auto max-w-4xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl p-5 md:p-6 border border-primary/15 shadow-sm">
              <div>
                <h3 className="text-lg font-medium text-black mb-1">How much does a {data.procedureName.toLowerCase()} cost?</h3>
                <p className="text-sm text-stone-600 font-light">See our full cost breakdown with insurance and payment options.</p>
              </div>
              <Link href={`/dental-costs/${data.relatedCostPage.slug}`}>
                <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 rounded-full px-6 py-5 text-sm font-medium cursor-pointer whitespace-nowrap">
                  See {data.relatedCostPage.name} Costs <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══ FAQ ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              Frequently asked questions about {data.procedureName.toLowerCase()}
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

      {/* ═══ RELATED TREATMENTS ═══ */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-6">
            <h2 className="text-2xl font-medium text-black">Other Treatment Guides</h2>
            <p className="text-stone-600 font-light mt-1 text-sm md:text-base">Learn what to expect from other common dental procedures.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {data.relatedTreatmentPages.map((page, idx) => (
              <Link key={page.slug} href={`/treatments/${page.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  className="bg-white rounded-xl p-4 border border-stone-100 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer text-center"
                >
                  <div className="text-sm md:text-base font-medium text-primary mb-1">{page.name}</div>
                  <div className="text-xs text-stone-500">{page.tagline}</div>
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
            <Link href="/treatments">
              <span className="inline-flex items-center gap-2 bg-stone-50 px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                All Treatments <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/dental-costs">
              <span className="inline-flex items-center gap-2 bg-stone-50 px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Cost Guide <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/oral-health-hub/conditions">
              <span className="inline-flex items-center gap-2 bg-stone-50 px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Conditions Guide <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/oral-health-hub/second-opinion">
              <span className="inline-flex items-center gap-2 bg-stone-50 px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Second Opinion Hub <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/symptom-quiz">
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
              Knowledge is the best preparation.
            </h2>
            <p className="text-base md:text-lg text-stone-300 font-light mb-6 max-w-2xl mx-auto">
              DentaSmart gives you a free AI assessment so you understand what is going on in your mouth before you commit to any treatment. Walk in informed. Walk out confident.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/download">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 w-full sm:w-auto">
                  Download DentaSmart Free
                </Button>
              </Link>
              <Link href="/symptom-quiz">
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
