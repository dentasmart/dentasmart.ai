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
    description: "Traditional metal braces vs clear aligners. Which straightens teeth better, costs less, and fits your lifestyle?",
    searches: "110,000/mo",
    keyDifference: "Braces: $2,500-$7,000 | Invisalign: $3,000-$8,000",
  },
  {
    name: "Dental Implants vs Dentures",
    slug: "dental-implants-vs-dentures",
    description: "Permanent implants vs removable dentures. Compare cost, comfort, durability, and long-term value for missing teeth.",
    searches: "22,200/mo",
    keyDifference: "Implants: $3,000-$6,000/tooth | Dentures: $600-$8,000/set",
  },
  {
    name: "Crown vs Veneer",
    slug: "crown-vs-veneer",
    description: "Full coverage crown vs thin veneer shell. Which one protects your tooth better and when does each make sense?",
    searches: "14,800/mo",
    keyDifference: "Crown: $800-$2,500 | Veneer: $800-$2,500",
  },
  {
    name: "Electric vs Manual Toothbrush",
    slug: "electric-vs-manual-toothbrush",
    description: "Does an electric toothbrush actually clean better? Compare plaque removal, gum health, and real-world results.",
    searches: "12,100/mo",
    keyDifference: "Electric: $20-$300 | Manual: $1-$5",
  },
  {
    name: "Fluoride vs Fluoride-Free Toothpaste",
    slug: "fluoride-vs-fluoride-free-toothpaste",
    description: "Is fluoride toothpaste really necessary? What the research says about cavity prevention and safety concerns.",
    searches: "9,900/mo",
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
    a: "Not necessarily. The cheapest option upfront can sometimes cost more over time. For example, dentures cost less than implants initially, but implants can last a lifetime while dentures need replacement every 5-10 years. Consider the total cost of ownership, not just the sticker price.",
  },
  {
    q: "Can DentaSmart help me choose between treatments?",
    a: "DentaSmart can help you organize supported information, understand common terms, and prepare questions about a treatment plan. It does not recommend a treatment or replace a licensed dentist's diagnosis and clinical advice.",
  },
  {
    q: "Do dentists always recommend the most expensive option?",
    a: "Most dentists recommend what they believe is clinically best. But 'best' can mean different things. Sometimes a less expensive option works perfectly well for your situation. That is why understanding your options before your appointment helps you ask the right questions and make confident decisions.",
  },
  {
    q: "How often do dental recommendations change?",
    a: "Dental technology and research evolve constantly. Treatments that were standard 10 years ago may have better alternatives today. For example, clear aligners now handle cases that previously required traditional braces. Staying informed helps you get the most current care available.",
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
  description: "Compare dental treatments side by side. Braces vs Invisalign, implants vs dentures, crowns vs veneers, and more. Honest comparisons with real costs.",
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
        description="Compare dental treatments side by side. Braces vs Invisalign, implants vs dentures, crowns vs veneers, and more. Honest comparisons with real costs to help you decide."
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
              Dental decisions are stressful when you do not understand the tradeoffs. These side-by-side comparisons give you the facts so you can pick what is right for your mouth, your budget, and your life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#comparisons-grid"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-action px-8 py-3 text-base font-medium text-action-foreground shadow-lg transition-all hover:scale-105 hover:bg-action-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring w-full sm:w-auto"
              >
                Browse Comparisons <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <Link href="/features">
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
              You are sitting in the dental chair and the dentist gives you two options. One costs twice as much. The other sounds simpler but maybe it will not last. You nod along, but inside you are thinking: "I have no idea which one to pick."
            </p>
            <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed">
              That is exactly why we built these comparison guides. No jargon. No sales pitch. Just honest, side-by-side breakdowns of the most common dental decisions people face, so you can walk into your appointment with real knowledge.
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
              <Link key={page.slug} href={`/comparisons/${page.slug}`}>
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
                  <div className="text-xs text-stone-400 mb-3">{page.searches} searches</div>
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
            <Link href="/pricing">
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
            <Link href="/dental-costs">
              <span className="inline-flex items-center gap-2 bg-stone-50 px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Cost Guide <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/treatments">
              <span className="inline-flex items-center gap-2 bg-stone-50 px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Treatment Guides <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/oral-health-hub/affordability">
              <span className="inline-flex items-center gap-2 bg-stone-50 px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Affordability Guide <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/oral-health-hub/conditions">
              <span className="inline-flex items-center gap-2 bg-stone-50 px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Conditions Guide <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/guides">
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
              <Link href="/pricing">
                <Button size="lg" className="bg-action text-action-foreground hover:bg-action-hover rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 w-full sm:w-auto">
                  View Pricing
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
