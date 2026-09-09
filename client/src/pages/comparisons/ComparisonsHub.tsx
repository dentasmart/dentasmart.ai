import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Scale, Smartphone, Search, Shield, TrendingDown } from "lucide-react";
import { Link } from "wouter";

/* ─── Comparison Pages Data ──────────────────────────────── */
const comparisonPages = [
  {
    name: "Braces vs Invisalign",
    slug: "braces-vs-invisalign",
    description: "Compare fixed braces and removable clear aligners by clinical fit, daily care, treatment time, and cost.",
    focus: "Orthodontic treatment",
    keyDifference: "Braces: $2,500-$7,000 | Invisalign: $3,000-$8,000",
  },
  {
    name: "Dental Implants vs Dentures",
    slug: "dental-implants-vs-dentures",
    description: "Compare fixed dental implants and removable dentures by procedure, daily care, fit, and cost.",
    focus: "Tooth replacement",
    keyDifference: "Implants: $3,000-$6,000/tooth | Dentures: $600-$8,000/set",
  },
  {
    name: "Crown vs Veneer",
    slug: "crown-vs-veneer",
    description: "Compare a crown that covers a tooth with a veneer placed on its front surface.",
    focus: "Restorative and cosmetic care",
    keyDifference: "Crown: $800-$2,500 | Veneer: $800-$2,500",
  },
  {
    name: "Electric vs Manual Toothbrush",
    slug: "electric-vs-manual-toothbrush",
    description: "Compare powered and manual brushes by motion, technique, features, maintenance, and cost.",
    focus: "Daily oral care",
    keyDifference: "Electric: $20-$300 | Manual: $1-$5",
  },
  {
    name: "Fluoride vs Fluoride-Free Toothpaste",
    slug: "fluoride-vs-fluoride-free-toothpaste",
    description: "Compare active ingredients, cavity-prevention claims, age directions, and sensitivity options.",
    focus: "Toothpaste ingredients",
    keyDifference: "Fluoride: proven cavity prevention | Fluoride-free: natural ingredients",
  },
];

const faqs = [
  {
    q: "How do I decide between two dental treatments?",
    a: "Start by understanding what each treatment does, how long it lasts, and what it costs. Then consider your specific situation: budget, timeline, lifestyle, and how much of the tooth needs work. Our comparison guides break down each option so you can have an informed conversation with your dentist.",
  },
  {
    q: "Should I always choose the cheaper option?",
    a: "Not necessarily. Compare the initial treatment, maintenance, repairs, replacement, follow-up visits, and likely insurance coverage. The lower estimate may still be appropriate, but price alone does not show clinical fit or long-term cost.",
  },
  {
    q: "Can DentaSmart help me choose between treatments?",
    a: "DentaSmart can help you organize supported information, understand common terms, and prepare questions about a treatment plan. It does not recommend a treatment or replace a licensed dentist's diagnosis and clinical advice.",
  },
  {
    q: "Do dentists always recommend the most expensive option?",
    a: "A recommendation should be tied to the diagnosis, treatment goal, risks, alternatives, and expected result. Ask the dentist to explain that reasoning and to separate clinical need from optional cosmetic preferences.",
  },
  {
    q: "How often do dental recommendations change?",
    a: "Recommendations can change when symptoms, imaging, tooth structure, health history, or treatment goals change. A second professional opinion may also weigh the same evidence differently.",
  },
];

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
    { "@type": "ListItem", position: 2, name: "Comparisons", item: "https://dentasmart.ai/comparisons" },
  ],
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Dental Treatment Comparisons: Side-by-Side Guides | DentaSmart",
  description: "Compare dental treatments side by side, including clinical fit, daily care, cost factors, risks, and questions to discuss with a dentist.",
  url: "https://dentasmart.ai/comparisons",
  inLanguage: "en-US",
  isPartOf: { "@type": "WebSite", name: "DentaSmart", url: "https://dentasmart.ai" },
  audience: { "@type": "MedicalAudience", name: "Patients" },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ComparisonsHub() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black selection:bg-primary/20">
      <SEO
        title="Dental Treatment Comparisons | DentaSmart"
        description="Compare dental treatments by clinical fit, daily care, cost factors, risks, and questions to discuss with a dentist."
        canonical="https://dentasmart.ai/comparisons"
        keywords="braces vs invisalign, dental implants vs dentures, crown vs veneer, electric vs manual toothbrush, fluoride vs fluoride free, dental treatment comparison"
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
              <Scale className="w-4 h-4" /> Comparison Guides
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-4 leading-[1.1] max-w-4xl">
              Compare your options.{" "}
              <span className="italic text-primary">Choose with confidence.</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-2xl mb-8">
              These side-by-side guides explain practical differences and questions to discuss with a dentist. They do not choose a treatment for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#comparisons-grid"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-action px-8 py-3 text-base font-medium text-action-foreground shadow-lg transition-all hover:scale-105 hover:bg-action-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring w-full sm:w-auto"
              >
                Browse Comparisons <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <Link href="/features/">
                <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 rounded-full px-8 py-6 text-base font-medium cursor-pointer w-full sm:w-auto">
                  See How DentaSmart Works
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
              { value: "5", label: "Side-by-Side Comparison Guides" },
              { value: "Costs", label: "Typical Price and Tradeoff Context" },
              { value: "Questions", label: "Prompts to Discuss With a Dentist" },
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

      {/* ═══ THE PROBLEM ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-4 leading-tight">
              Your dentist says you need treatment. <br />
              <span className="italic text-primary">But which one?</span>
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed mb-4">
              A dentist may give you two reasonable options with different procedures, maintenance, risks, and costs. A short explanation can leave important questions unanswered.
            </p>
            <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed">
              These guides organize common tradeoffs in plain language so you can ask more specific questions before deciding with a licensed dentist.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ COMPARISONS GRID ═══ */}
      <section id="comparisons-grid" className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              All comparison guides
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl">
              Each guide includes a detailed comparison table, pros and cons, cost breakdown, and guidance on which option fits different situations.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {comparisonPages.map((page, idx) => (
              <Link key={page.slug} href={`/comparisons/${page.slug}/`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl p-5 md:p-6 border border-stone-100 hover:border-primary/20 hover:shadow-lg transition-all cursor-pointer h-full"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Scale className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg md:text-xl font-medium text-black mb-2">{page.name}</h3>
                  <p className="text-stone-600 font-light text-sm leading-relaxed mb-3">{page.description}</p>
                  <div className="text-xs text-stone-400 mb-3">{page.focus}</div>
                  <div className="bg-stone-50 rounded-lg px-3 py-2 text-xs text-stone-600 font-medium mb-4">
                    {page.keyDifference}
                  </div>
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-medium">
                    Compare now <ArrowRight className="w-3 h-3" />
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-100 bg-white py-10">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-6 max-w-3xl">
            <h2 className="mb-2 text-2xl font-medium text-black">Compare DentaSmart with other tools</h2>
            <p className="text-sm leading-relaxed text-stone-600">Use these decision guides to compare DentaSmart with other digital dental services before choosing. Verify third-party details directly with each provider.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link href="/vs/dental-com/">
              <div className="h-full rounded-2xl border border-stone-200 bg-stone-50 p-5 transition-all hover:border-primary/30 hover:shadow-md">
                <h3 className="mb-2 text-lg font-medium text-black">DentaSmart vs Dental.com SmartScan</h3>
                <p className="text-sm leading-relaxed text-stone-600">Compare supported inputs, report details, pricing information, and professional-care boundaries.</p>
              </div>
            </Link>
            <Link href="/vs/dentistry-one/">
              <div className="h-full rounded-2xl border border-stone-200 bg-stone-50 p-5 transition-all hover:border-primary/30 hover:shadow-md">
                <h3 className="mb-2 text-lg font-medium text-black">DentaSmart vs Dentistry.One SmileScan</h3>
                <p className="text-sm leading-relaxed text-stone-600">Compare supported inputs, report details, consultation options, and professional-care boundaries.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ HOW DENTASMART HELPS ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              Use DentaSmart after you <span className="italic text-primary">compare</span>
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl">
              These guides explain general tradeoffs. DentaSmart can help you organize supported information and questions before professional care.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: Search,
                title: "Organize Supported Information",
                desc: "Use an applicable paid check or plan to add mouth photos, dental X-rays, or treatment-plan information where supported.",
              },
              {
                icon: Shield,
                title: "Understand Common Terms",
                desc: "Review educational explanations so you can follow the options and ask clearer questions about your care.",
              },
              {
                icon: TrendingDown,
                title: "Prepare for a Dentist Conversation",
                desc: "Bring your questions to a licensed dentist, who must diagnose your condition and recommend treatment for your case.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="bg-stone-50 rounded-2xl p-5 md:p-6 border border-stone-100"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-medium text-black mb-2">{item.title}</h3>
                <p className="text-stone-600 font-light leading-relaxed text-sm md:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/pricing/">
              <Button size="lg" className="bg-action text-action-foreground hover:bg-action-hover rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 w-full sm:w-auto">
                Compare DentaSmart Options <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              Common questions about comparing dental treatments
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
            <Link href="/dental-costs/">
              <span className="inline-flex items-center gap-2 bg-stone-50 px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Cost Guide <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/treatments/">
              <span className="inline-flex items-center gap-2 bg-stone-50 px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Treatment Guides <ArrowRight className="w-3 h-3" />
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
            <Link href="/guides/">
              <span className="inline-flex items-center gap-2 bg-stone-50 px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                All Guides <ArrowRight className="w-3 h-3" />
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
              Compare first, then choose your next step
            </h2>
            <p className="text-base md:text-lg text-stone-300 font-light mb-6 max-w-2xl mx-auto">
              Use these guides for general decision support, then compare DentaSmart's paid options or discuss your questions with a licensed dentist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing/">
                <Button size="lg" className="bg-action text-action-foreground hover:bg-action-hover rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 w-full sm:w-auto">
                  View Pricing
                </Button>
              </Link>
              <Link href="/symptom-quiz/">
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
