import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ExternalSources from "@/components/ExternalSources";
import SEO from "@/components/SEO";
import MidContentCTA from "@/components/MidContentCTA";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Baby, Heart, AlertTriangle, CheckCircle, Smartphone, BookOpen } from "lucide-react";
import { Link } from "wouter";

/* ─── Types ─────────────────────────────────────────────── */
export interface AgeGroupTip {
  title: string;
  description: string;
}

export interface MilestoneItem {
  age: string;
  title: string;
  description: string;
}

export interface ConcernItem {
  concern: string;
  detail: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface AgeSpecificPageData {
  slug: string;
  ageGroup: string;
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
  overviewNote?: React.ReactNode;
  keyTips: AgeGroupTip[];
  milestones: MilestoneItem[];
  milestonesNote?: string;
  commonConcerns: ConcernItem[];
  preventionTitle: string;
  preventionDescription: string;
  preventionTips: AgeGroupTip[];
  faqs: FAQ[];
  relatedLifeStagePages: { name: string; slug: string; tagline: string }[];
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

export default function AgeSpecificTemplate({ data }: { data: AgeSpecificPageData }) {
  const canonicalUrl = `https://dentasmart.ai/life-stages/${data.slug}`;

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
      { "@type": "ListItem", position: 2, name: "Life Stages", item: "https://dentasmart.ai/life-stages" },
      { "@type": "ListItem", position: 3, name: data.ageGroup, item: canonicalUrl },
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
    audience: { "@type": "PeopleAudience", name: data.ageGroup },
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
              <Baby className="w-4 h-4" /> Life Stages Guide
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
              <a href="#milestones">
                <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 rounded-full px-8 py-6 text-base font-medium cursor-pointer w-full sm:w-auto">
                  See Key Milestones <ArrowRight className="w-4 h-4 ml-2" />
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

      {/* ═══ OVERVIEW ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
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
              {data.overviewNote && (
                <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed mt-4">
                  {data.overviewNote}
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
                  <Heart className="w-5 h-5 text-primary" /> Key Tips for {data.ageGroup}
                </h3>
                <div className="space-y-3">
                  {data.keyTips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-black">{tip.title}</p>
                        <p className="text-sm text-stone-600">{tip.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ DENTAL MILESTONES ═══ */}
      <section id="milestones" className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              Dental milestones for {data.ageGroup.toLowerCase()}
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl">
              Here is what to watch for at each stage.
            </p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />
            <div className="space-y-6">
              {data.milestones.map((milestone, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="relative flex gap-4 md:gap-6"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-medium text-xs relative z-10 text-center leading-tight px-1">
                    {milestone.age}
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-5 border border-stone-100 shadow-sm">
                    <h3 className="text-base md:text-lg font-medium text-black mb-1">{milestone.title}</h3>
                    <p className="text-sm md:text-base text-stone-600 font-light">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            {data.milestonesNote && (
              <p className="text-sm text-stone-500 mt-4 italic ml-16">{data.milestonesNote}</p>
            )}
          </div>
        </div>
      </section>

      {/* ═══ MID-CONTENT CTA ═══ */}
      <MidContentCTA />

      {/* ═══ COMMON CONCERNS ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              Common concerns for {data.ageGroup.toLowerCase()}
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl">
              These are the issues parents and caregivers ask about most.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.commonConcerns.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="bg-stone-50 rounded-xl p-5 border border-stone-100"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-base font-medium text-black mb-1">{item.concern}</h3>
                    <p className="text-sm text-stone-600 font-light">{item.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PREVENTION TIPS ═══ */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              {data.preventionTitle}
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl">
              {data.preventionDescription}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.preventionTips.map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="bg-white rounded-xl p-5 border border-stone-100 shadow-sm"
              >
                <CheckCircle className="w-5 h-5 text-primary mb-2" />
                <h3 className="text-base font-medium text-black mb-1">{tip.title}</h3>
                <p className="text-sm text-stone-600 font-light">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ACCORDION ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              Frequently asked questions
            </h2>
          </motion.div>
          <div className="space-y-3">
            {data.faqs.map((faq, idx) => (
              <details key={idx} className="group bg-stone-50 rounded-xl border border-stone-100 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <span className="text-base font-medium text-black pr-4">{faq.q}</span>
                  <ArrowRight className="w-4 h-4 text-stone-400 transition-transform group-open:rotate-90 flex-shrink-0" />
                </summary>
                <div className="px-5 pb-5 pt-0 text-sm md:text-base text-stone-600 font-light leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
          <ExternalSources category="life-stage" />
        </div>
      </section>

      {/* ═══ RELATED PAGES ═══ */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-6">
            <h2 className="text-2xl md:text-3xl font-normal text-black">More life stage guides</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.relatedLifeStagePages.map((page, idx) => (
              <Link key={idx} href={`/life-stages/${page.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="bg-white rounded-xl p-5 border border-stone-100 shadow-sm hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group"
                >
                  <h3 className="text-base font-medium text-black mb-1 group-hover:text-primary transition-colors">{page.name}</h3>
                  <p className="text-sm text-stone-600 font-light">{page.tagline}</p>
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-3">
                    Read guide <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
          {/* Cross-links */}
          <div className="flex flex-wrap gap-3 mt-6">
            {data.relatedCostPage && (
              <Link href={`/dental-costs/${data.relatedCostPage.slug}`}>
                <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-sm">
                  {data.relatedCostPage.name} <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            )}
            {data.relatedTreatmentPage && (
              <Link href={`/treatments/${data.relatedTreatmentPage.slug}`}>
                <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-sm">
                  {data.relatedTreatmentPage.name} <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            )}
            <Link href="/life-stages">
              <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-sm">
                All Life Stages <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/treatments">
              <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-sm">
                Treatment Guides <ArrowRight className="w-3 h-3" />
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
              Every age deserves a healthy smile.
            </h2>
            <p className="text-base md:text-lg text-stone-300 font-light mb-6 max-w-2xl mx-auto">
              DentaSmart gives you a free AI assessment so you can stay ahead of dental issues at every stage of life. Upload a photo and get clarity in minutes.
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
