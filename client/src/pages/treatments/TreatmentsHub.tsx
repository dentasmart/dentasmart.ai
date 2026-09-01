import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Stethoscope, Search, Shield, Clock, Smartphone } from "lucide-react";
import { Link } from "wouter";

/* ─── Treatment Page Data ──────────────────────────────────── */
const treatmentPages = [
  { name: "Root Canal", slug: "root-canal-procedure", tagline: "Save your natural tooth", duration: "60-90 min", icon: "🦷" },
  { name: "Dental Implant", slug: "dental-implant-procedure", tagline: "Permanent tooth replacement", duration: "3-6 months", icon: "🔩" },
  { name: "Wisdom Teeth Removal", slug: "wisdom-teeth-removal", tagline: "Prevent crowding and pain", duration: "45-60 min", icon: "🦷" },
  { name: "Dental Crown", slug: "dental-crown-procedure", tagline: "Restore a damaged tooth", duration: "2 visits", icon: "👑" },
  { name: "Braces", slug: "braces-treatment", tagline: "Straighten your smile", duration: "12-24 months", icon: "😁" },
  { name: "Teeth Whitening", slug: "teeth-whitening-procedure", tagline: "Brighten your smile safely", duration: "60-90 min", icon: "⚡" },
  { name: "Tooth Extraction", slug: "tooth-extraction-procedure", tagline: "When a tooth needs to go", duration: "20-40 min", icon: "🔧" },
  { name: "Dental Cleaning", slug: "dental-cleaning-procedure", tagline: "Professional preventive care", duration: "30-60 min", icon: "🪥" },
  { name: "Veneers", slug: "veneers-procedure", tagline: "Transform your smile", duration: "2-3 visits", icon: "✨" },
  { name: "Dentures", slug: "dentures-treatment", tagline: "Restore your full smile", duration: "3-6 weeks", icon: "😊" },
];

const faqs = [
  {
    q: "How do I know which treatment I need?",
    a: "A licensed dentist must examine you, diagnose the condition, and recommend treatment for your case. These guides can help you understand common options and prepare questions before that conversation.",
  },
  {
    q: "Are dental procedures painful?",
    a: "Modern dentistry has come a long way. Most procedures are done under local anesthesia, so you should not feel pain during the treatment. You might feel some pressure or vibration. After the procedure, mild soreness is normal and usually manageable with over-the-counter pain relievers. Talk to your dentist about sedation options if you have dental anxiety.",
  },
  {
    q: "How long is recovery after dental treatment?",
    a: "Recovery time varies widely depending on the procedure. A dental cleaning requires no recovery at all. A simple filling might leave you numb for a few hours. Tooth extractions typically need 1-2 weeks. Dental implants can take 3-6 months for the full healing process. Each of our treatment guides includes specific recovery timelines and tips.",
  },
  {
    q: "What if I cannot afford the treatment I need?",
    a: "Ask for a written treatment plan, compare qualified providers, review insurance benefits, and ask whether payment plans, membership options, or accredited dental-school clinics are available. Fees and eligibility vary, so confirm current terms directly with each provider or program.",
  },
  {
    q: "Should I get a second opinion before treatment?",
    a: "You can ask another licensed dentist to review a treatment recommendation, especially when the plan is complex or costly. DentaSmart's paid Second Opinion service can help organize supported treatment-plan information and questions, but it does not provide a dentist's diagnosis or clinical recommendation.",
  },
  {
    q: "How can I prepare for a dental procedure?",
    a: "Good preparation starts with understanding what to expect. Read our step-by-step guide for your specific procedure. Ask your dentist about any medications you should stop taking beforehand. Arrange for someone to drive you home if you will be sedated. Follow any fasting instructions if required. And most importantly, do not hesitate to ask your dentist any questions you have.",
  },
];

/* ─── JSON-LD ─────────────────────────────────────────────── */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({
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
  ],
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Dental Treatment Guides",
  description: "Step-by-step guides for common dental procedures. Learn what to expect, how to prepare, and how to recover.",
  url: "https://dentasmart.ai/treatments",
  isPartOf: { "@type": "WebSite", name: "DentaSmart", url: "https://dentasmart.ai" },
  hasPart: treatmentPages.map(p => ({
    "@type": "MedicalWebPage",
    name: `${p.name} Procedure Guide`,
    url: `https://dentasmart.ai/treatments/${p.slug}`,
  })),
};

/* ─── Animation ─────────────────────────────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function TreatmentsHub() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black selection:bg-primary/20">
      <SEO
        title="Dental Treatment Guides: What to Expect | DentaSmart"
        description="Step-by-step guides for 10 common dental procedures. Learn what happens during root canals, implants, braces, extractions, and more. Prepare with confidence."
        canonical="https://dentasmart.ai/treatments"
        keywords="dental procedures, what to expect dental treatment, root canal procedure, dental implant procedure, wisdom teeth removal, dental treatment guide"
        jsonLd={[faqJsonLd, breadcrumbJsonLd, collectionJsonLd]}
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
              <Stethoscope className="w-4 h-4" /> Treatment Guides
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-4 leading-[1.1] max-w-4xl">
              Know what to expect{" "}
              <span className="italic text-primary">before you sit in the chair.</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-2xl mb-8">
              Step-by-step guides for the most common dental procedures. No jargon. No surprises. Just clear answers so you can walk in prepared and walk out confident.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#treatments"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-action px-8 py-3 text-base font-medium text-action-foreground shadow-lg transition-all hover:scale-105 hover:bg-action-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring w-full sm:w-auto"
              >
                Browse Treatments <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <Link href="/comparisons">
                <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 rounded-full px-8 py-6 text-base font-medium cursor-pointer w-full sm:w-auto">
                  Compare Treatment Options
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS STRIP ═══ */}
      <section className="py-6 bg-action text-action-foreground">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            {[
              { value: "10", label: "Treatment Guides" },
              { value: "Steps", label: "Preparation and Recovery Context" },
              { value: "Free", label: "Guides Available Without an Account" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="py-3 md:py-0"
              >
                <div className="text-3xl md:text-5xl font-normal tracking-tighter text-white">{stat.value}</div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-action-foreground font-medium mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY UNDERSTANDING MATTERS ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { icon: <Search className="w-6 h-6 text-primary" />, title: "Know What's Coming", desc: "Understanding each step of your procedure removes the fear of the unknown. When you know what to expect, you can relax." },
              { icon: <Shield className="w-6 h-6 text-primary" />, title: "Ask Better Questions", desc: "When you understand the basics, you can have a real conversation with your dentist. You will know what to ask and what to look out for." },
              { icon: <Clock className="w-6 h-6 text-primary" />, title: "Plan Recovery Questions", desc: "Review common preparation and recovery topics, then follow the instructions from your treating dental professional." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="bg-stone-50 rounded-2xl p-6 border border-stone-100"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h2 className="text-xl font-medium text-black mb-2">{item.title}</h2>
                <p className="text-stone-600 font-light leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TREATMENT CARDS ═══ */}
      <section id="treatments" className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              Choose a treatment to learn more
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl">
              Each guide walks you through the procedure step by step, covers recovery, and answers the most common questions.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {treatmentPages.map((page, idx) => (
              <Link key={page.slug} href={`/treatments/${page.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  className="bg-white rounded-2xl p-5 md:p-6 border border-stone-100 hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{page.icon}</span>
                        <h3 className="text-lg md:text-xl font-medium text-black group-hover:text-primary transition-colors">{page.name}</h3>
                      </div>
                      <p className="text-sm text-stone-600 font-light mb-3">{page.tagline}</p>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-xs text-stone-500 bg-stone-50 px-2 py-1 rounded-full">
                          <Clock className="w-3 h-3" /> {page.duration}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-stone-400 group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <motion.div {...fadeUp}>
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Smartphone className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-3">
              Comparing treatment options?
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light mb-6 max-w-2xl mx-auto">
              Review side-by-side guides for common tradeoffs, then bring your questions to a licensed dentist who can diagnose your condition and recommend care.
            </p>
            <Link href="/comparisons">
              <Button size="lg" className="bg-action text-action-foreground hover:bg-action-hover rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 shadow-lg">
                Compare Treatment Guides <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              Common questions about dental treatments
            </h2>
          </motion.div>
          <div className="space-y-3 md:space-y-4">
            {faqs.map((faq, idx) => (
              <motion.details
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="group bg-white rounded-xl border border-stone-100 overflow-hidden"
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

      {/* ═══ RELATED HUBS ═══ */}
      <section className="py-6 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <h2 className="text-lg font-medium text-black mb-3">Related Resource Hubs</h2>
          <div className="flex flex-wrap gap-2 md:gap-3">
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
            <Link href="/oral-health-hub/affordability">
              <span className="inline-flex items-center gap-2 bg-stone-50 px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Affordability Guide <ArrowRight className="w-3 h-3" />
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
              Prepare for a more informed conversation
            </h2>
            <p className="text-base md:text-lg text-stone-300 font-light mb-6 max-w-2xl mx-auto">
              Use these guides to understand common treatment steps, then compare DentaSmart's paid options or discuss your questions with a licensed dentist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing">
                <Button size="lg" className="bg-action text-action-foreground hover:bg-action-hover rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 w-full sm:w-auto">
                  View DentaSmart Options
                </Button>
              </Link>
              <Link href="/symptom-quiz">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-medium cursor-pointer w-full sm:w-auto">
                  Start Free Symptom Quiz
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
