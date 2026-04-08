import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import MidContentCTA from "@/components/MidContentCTA";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, AlertTriangle, Clock, CheckCircle, Phone, ShieldAlert, Smartphone, Zap } from "lucide-react";
import { Link } from "wouter";

/* ─── Types ─────────────────────────────────────────────── */
export interface ImmediateStep {
  step: string;
  title: string;
  description: string;
  timing?: string;
}

export interface WarningSign {
  sign: string;
  detail: string;
  severity: "urgent" | "moderate" | "watch";
}

export interface DosDonts {
  dos: string[];
  donts: string[];
}

export interface FAQ {
  q: string;
  a: string;
}

export interface EmergencyPageData {
  slug: string;
  emergencyName: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  urgencyBanner: string;
  statsStrip: { value: string; label: string }[];
  whatHappenedTitle: string;
  whatHappenedHighlight: string;
  whatHappenedDescription: string;
  whatHappenedDescription2?: string;
  immediateSteps: ImmediateStep[];
  immediateStepsNote?: string;
  warningSignsTitle: string;
  warningSigns: WarningSign[];
  dosDonts: DosDonts;
  whenToSeeTitle: string;
  whenToSeeDescription: string;
  whenToSeeItems: string[];
  faqs: FAQ[];
  relatedEmergencyPages: { name: string; slug: string; tagline: string }[];
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

export default function EmergencyPageTemplate({ data }: { data: EmergencyPageData }) {
  const canonicalUrl = `https://dentasmart.ai/dental-emergencies/${data.slug}`;

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
      { "@type": "ListItem", position: 2, name: "Dental Emergencies", item: "https://dentasmart.ai/dental-emergencies" },
      { "@type": "ListItem", position: 3, name: data.emergencyName, item: canonicalUrl },
    ],
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `What to Do: ${data.emergencyName}`,
    description: data.metaDescription,
    step: data.immediateSteps.map((s, i) => ({
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
    audience: { "@type": "MedicalAudience", name: "Patients" },
    lastReviewed: "2026-04-08",
  };

  const severityColor = (sev: string) => {
    if (sev === "urgent") return "bg-red-50 border-red-200 text-red-700";
    if (sev === "moderate") return "bg-amber-50 border-amber-200 text-amber-700";
    return "bg-stone-50 border-stone-200 text-stone-700";
  };

  const severityIcon = (sev: string) => {
    if (sev === "urgent") return <ShieldAlert className="w-5 h-5 text-red-500" />;
    if (sev === "moderate") return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    return <Clock className="w-5 h-5 text-stone-400" />;
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

      {/* ═══ URGENCY BANNER ═══ */}
      <div className="bg-red-600 text-white py-2 mt-16 md:mt-20">
        <div className="container px-4 mx-auto max-w-6xl flex items-center justify-center gap-2 text-sm font-medium">
          <Phone className="w-4 h-4" />
          <span>{data.urgencyBanner}</span>
        </div>
      </div>

      {/* ═══ HERO ═══ */}
      <section className="relative flex items-center overflow-hidden bg-gradient-to-br from-red-50 via-white to-primary/5">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-20 right-20 w-96 h-96 bg-red-100/50 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 px-4 mx-auto max-w-6xl pt-12 pb-12 md:pt-14 md:pb-14">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full text-red-700 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" /> Emergency Guide
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-4 leading-[1.1] max-w-4xl">
              {data.heroTitle}{" "}
              <span className="italic text-red-600">{data.heroHighlight}</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-2xl mb-8">
              {data.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#immediate-steps">
                <Button size="lg" className="bg-red-600 text-white hover:bg-red-700 rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 shadow-lg w-full sm:w-auto">
                  See What To Do Now
                </Button>
              </a>
              <Link href="/symptom-quiz">
                <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 rounded-full px-8 py-6 text-base font-medium cursor-pointer w-full sm:w-auto">
                  Free Symptom Check <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS STRIP ═══ */}
      <section className="py-6 bg-stone-900 text-white">
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

      {/* ═══ WHAT HAPPENED ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl md:text-4xl font-normal text-black mb-4 leading-tight">
                {data.whatHappenedTitle} <br />
                <span className="italic text-primary">{data.whatHappenedHighlight}</span>
              </h2>
              <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed mb-4">
                {data.whatHappenedDescription}
              </p>
              {data.whatHappenedDescription2 && (
                <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed">
                  {data.whatHappenedDescription2}
                </p>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-red-50 rounded-2xl p-5 md:p-6 border border-red-100">
                <h3 className="text-lg font-medium text-black mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" /> {data.warningSignsTitle}
                </h3>
                <div className="space-y-3">
                  {data.warningSigns.map((ws, idx) => (
                    <div key={idx} className={`flex items-start gap-3 p-3 rounded-lg border ${severityColor(ws.severity)}`}>
                      {severityIcon(ws.severity)}
                      <div>
                        <p className="text-sm font-medium">{ws.sign}</p>
                        <p className="text-sm opacity-80">{ws.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ IMMEDIATE STEPS ═══ */}
      <section id="immediate-steps" className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              What to do right now
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl">
              Follow these steps immediately. Time matters.
            </p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-red-200 hidden md:block" />
            <div className="space-y-6">
              {data.immediateSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="relative flex gap-4 md:gap-6"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-medium text-sm relative z-10">
                    {step.step}
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-5 border border-stone-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base md:text-lg font-medium text-black">{step.title}</h3>
                      {step.timing && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">{step.timing}</span>
                      )}
                    </div>
                    <p className="text-sm md:text-base text-stone-600 font-light">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            {data.immediateStepsNote && (
              <p className="text-sm text-stone-500 mt-4 italic ml-16">{data.immediateStepsNote}</p>
            )}
          </div>
        </div>
      </section>

      {/* ═══ DOS AND DON'TS ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              Dos and don'ts
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <h3 className="text-lg font-medium text-green-800 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Do
              </h3>
              <div className="space-y-3">
                {data.dosDonts.dos.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-green-800">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
              <h3 className="text-lg font-medium text-red-800 mb-4 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" /> Don't
              </h3>
              <div className="space-y-3">
                {data.dosDonts.donts.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-800">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MID-CONTENT CTA ═══ */}
      <MidContentCTA />

      {/* ═══ WHEN TO SEE A DENTIST ═══ */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div {...fadeUp} className="mb-6">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              {data.whenToSeeTitle}
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl">
              {data.whenToSeeDescription}
            </p>
          </motion.div>
          <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
            <div className="space-y-3">
              {data.whenToSeeItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm md:text-base text-stone-700">{item}</p>
                </div>
              ))}
            </div>
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
        </div>
      </section>

      {/* ═══ RELATED PAGES ═══ */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-6">
            <h2 className="text-2xl md:text-3xl font-normal text-black">More emergency guides</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.relatedEmergencyPages.map((page, idx) => (
              <Link key={idx} href={`/dental-emergencies/${page.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="bg-white rounded-xl p-5 border border-stone-100 shadow-sm hover:border-red-200 hover:shadow-md transition-all cursor-pointer group"
                >
                  <h3 className="text-base font-medium text-black mb-1 group-hover:text-red-600 transition-colors">{page.name}</h3>
                  <p className="text-sm text-stone-600 font-light">{page.tagline}</p>
                  <span className="inline-flex items-center gap-1 text-red-600 text-sm font-medium mt-3">
                    Read guide <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
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
            <Link href="/dental-emergencies">
              <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-sm">
                All Emergencies <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/symptom-quiz">
              <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-sm">
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
              Don't wait when it hurts.
            </h2>
            <p className="text-base md:text-lg text-stone-300 font-light mb-6 max-w-2xl mx-auto">
              DentaSmart gives you a free AI assessment so you can understand what is happening and what to do next. Get clarity in minutes, not days.
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
