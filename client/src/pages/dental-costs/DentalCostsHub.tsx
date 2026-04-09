import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, DollarSign, TrendingDown, Shield, Search, AlertTriangle, Smartphone } from "lucide-react";
import { Link } from "wouter";

/* ─── Cost Page Data ──────────────────────────────────────── */
const costPages = [
  { name: "Root Canal", slug: "root-canal-cost", range: "$700-$1,500", avg: "$1,000", icon: "🦷", searches: "90,500/mo" },
  { name: "Dental Implant", slug: "dental-implant-cost", range: "$3,000-$6,000", avg: "$4,500", icon: "🔩", searches: "74,000/mo" },
  { name: "Braces", slug: "braces-cost", range: "$2,500-$7,000", avg: "$5,000", icon: "😁", searches: "60,500/mo" },
  { name: "Veneers", slug: "veneers-cost", range: "$800-$2,500", avg: "$1,500", icon: "✨", searches: "49,500/mo" },
  { name: "Wisdom Teeth", slug: "wisdom-teeth-removal-cost", range: "$200-$1,100", avg: "$600", icon: "🦷", searches: "40,500/mo" },
  { name: "Teeth Whitening", slug: "teeth-whitening-cost", range: "$100-$1,000", avg: "$500", icon: "⚡", searches: "33,100/mo" },
  { name: "Dental Crown", slug: "dental-crown-cost", range: "$800-$2,500", avg: "$1,200", icon: "👑", searches: "27,100/mo" },
  { name: "Tooth Extraction", slug: "tooth-extraction-cost", range: "$50-$500", avg: "$200", icon: "🔧", searches: "22,200/mo" },
  { name: "Dental Cleaning", slug: "dental-cleaning-cost", range: "$75-$200", avg: "$130", icon: "🪥", searches: "18,100/mo" },
  { name: "Dentures", slug: "dentures-cost", range: "$600-$8,000", avg: "$1,800", icon: "😊", searches: "14,800/mo" },
];

const quickCostTable = [
  { procedure: "Routine Exam + Cleaning", withInsurance: "$0-$50", withoutInsurance: "$75-$350", avg: "$200" },
  { procedure: "Dental X-rays (Full Set)", withInsurance: "$0-$50", withoutInsurance: "$100-$250", avg: "$150" },
  { procedure: "Cavity Filling", withInsurance: "$50-$150", withoutInsurance: "$100-$1,050", avg: "$250" },
  { procedure: "Root Canal", withInsurance: "$200-$500", withoutInsurance: "$700-$1,500", avg: "$1,000" },
  { procedure: "Dental Crown", withInsurance: "$200-$500", withoutInsurance: "$800-$2,500", avg: "$1,200" },
  { procedure: "Tooth Extraction", withInsurance: "$25-$100", withoutInsurance: "$50-$500", avg: "$200" },
  { procedure: "Dental Implant", withInsurance: "$1,000-$2,000", withoutInsurance: "$3,000-$6,000", avg: "$4,500" },
  { procedure: "Braces (Full)", withInsurance: "$1,500-$3,000", withoutInsurance: "$2,500-$7,000", avg: "$5,000" },
  { procedure: "Teeth Whitening", withInsurance: "Not covered", withoutInsurance: "$100-$1,000", avg: "$500" },
  { procedure: "Dentures (Full Set)", withInsurance: "$500-$1,500", withoutInsurance: "$600-$8,000", avg: "$1,800" },
];

const faqs = [
  {
    q: "How much does a dental visit cost without insurance?",
    a: "A basic dental visit with exam, cleaning, and X-rays costs between $200 and $600 without insurance. The exam alone runs $50-$200, cleaning adds $75-$200, and a full set of X-rays costs $100-$250. Many dentists offer new patient specials that bundle these for $99-$199.",
  },
  {
    q: "What is the most expensive dental procedure?",
    a: "Full mouth reconstruction is the most expensive dental procedure, costing $15,000 to $40,000 or more. Single dental implants run $3,000-$6,000 each. Full arch implant-supported dentures (All-on-4) cost $12,000-$25,000 per arch. Braces and orthodontic treatment range from $2,500 to $7,000.",
  },
  {
    q: "Does dental insurance cover everything?",
    a: "No. Most dental insurance plans cover 100% of preventive care (exams, cleanings, X-rays), 80% of basic procedures (fillings, extractions), and only 50% of major procedures (crowns, bridges, implants). Annual maximums are typically $1,000-$2,000, which means you pay out of pocket for anything beyond that limit.",
  },
  {
    q: "How can I save money on dental work?",
    a: "The best ways to save: get preventive care to avoid expensive problems, ask about payment plans, compare prices between providers, use dental discount plans ($80-$200/year for 10-60% off), visit dental schools for 30-50% lower costs, and use HSA/FSA pre-tax dollars. DentaSmart's free AI assessment helps you understand what you actually need before committing to treatment.",
  },
  {
    q: "Are dental costs different by state?",
    a: "Yes, significantly. Dental costs in New York City, San Francisco, and Los Angeles can be 50-100% higher than in rural areas or smaller cities. The same root canal might cost $700 in a small town and $1,500 in Manhattan. Cost of living, rent, and local competition all affect dental pricing.",
  },
  {
    q: "Is it cheaper to go to a dental school?",
    a: "Yes. Dental schools typically charge 30-50% less than private practices. The work is done by supervised students under licensed faculty. Appointments take longer, but the quality is closely monitored. Search for ADA-accredited dental schools near you for the biggest savings.",
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
    { "@type": "ListItem", position: 2, name: "Dental Costs", item: "https://dentasmart.ai/dental-costs" },
  ],
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "How Much Does Dental Work Cost in 2026? Complete Price Guide",
  description: "Complete 2026 dental cost guide with prices for every common procedure. Compare costs with and without insurance. Find ways to save on dental care.",
  url: "https://dentasmart.ai/dental-costs",
  inLanguage: "en-US",
  isPartOf: { "@type": "WebSite", name: "DentaSmart", url: "https://dentasmart.ai" },
  about: [{ "@type": "MedicalCondition", name: "Dental Care Costs" }],
  audience: { "@type": "MedicalAudience", name: "Patients" },
  lastReviewed: "2026-04-07",
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function DentalCostsHub() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black selection:bg-primary/20">
      <SEO
        title="Dental Costs in 2026: Price Guide | DentaSmart"
        description="See what every dental procedure actually costs in 2026, with and without insurance. Root canals, implants, braces, crowns, and more. Plus 7 ways to save. Free AI dental assessment included."
        canonical="https://dentasmart.ai/dental-costs"
        keywords="how much does dental work cost, dental procedure costs, dentist prices without insurance, dental costs 2026, root canal cost, dental implant cost, braces cost, dental crown cost, teeth whitening cost, dental cleaning cost"
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
              <DollarSign className="w-4 h-4" /> Dental Cost Guide
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-4 leading-[1.1] max-w-4xl">
              How much does dental work{" "}
              <span className="italic text-primary">actually cost?</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-2xl mb-8">
              Nobody should walk into a dentist's office without knowing what to expect. Here are real prices for every common dental procedure in 2026, with and without insurance, plus ways to save.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/download">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 shadow-lg w-full sm:w-auto">
                  Get Your Free AI Assessment
                </Button>
              </Link>
              <a href="#cost-table">
                <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 rounded-full px-8 py-6 text-base font-medium cursor-pointer w-full sm:w-auto">
                  See All Costs <ArrowRight className="w-4 h-4 ml-2" />
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
            {[
              { value: "68.5M", label: "Americans Without Dental Insurance" },
              { value: "$1,000+", label: "Average Root Canal Cost" },
              { value: "10×", label: "Emergency vs Preventive Cost" },
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
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/80 font-medium mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCEDURE COST CARDS ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              Cost guides by procedure
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl">
              Click any procedure for a detailed breakdown including cost factors, insurance coverage, payment options, and how to save.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {costPages.map((page, idx) => (
              <Link key={page.slug} href={`/dental-costs/${page.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06, duration: 0.5 }}
                  className="bg-stone-50 rounded-xl p-5 border border-stone-100 hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer h-full group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{page.icon}</span>
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">{page.searches}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-medium text-black mb-1 group-hover:text-primary transition-colors">
                    {page.name} Cost
                  </h3>
                  <div className="text-2xl font-normal text-primary mb-1">{page.range}</div>
                  <div className="text-xs text-stone-500 mb-3">Average: {page.avg}</div>
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    Full breakdown <ArrowRight className="w-3 h-3" />
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ QUICK COST TABLE ═══ */}
      <section id="cost-table" className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              2026 dental cost comparison table
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light mb-6 max-w-3xl">
              Side-by-side costs with and without insurance. These are national averages. Your area may be higher or lower.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="-mx-4 md:mx-0 overflow-x-auto"
          >
            <table className="w-full bg-white rounded-none md:rounded-2xl overflow-hidden border border-stone-200 min-w-[650px]">
              <thead>
                <tr className="bg-stone-900 text-white">
                  <th className="text-left py-3 px-3 md:px-4 font-medium text-xs md:text-sm">Procedure</th>
                  <th className="text-left py-3 px-3 md:px-4 font-medium text-xs md:text-sm">With Insurance</th>
                  <th className="text-left py-3 px-3 md:px-4 font-medium text-xs md:text-sm">Without Insurance</th>
                  <th className="text-left py-3 px-3 md:px-4 font-medium text-xs md:text-sm hidden md:table-cell">Average</th>
                </tr>
              </thead>
              <tbody>
                {quickCostTable.map((row, idx) => (
                  <tr key={idx} className={`border-t border-stone-100 ${idx % 2 === 0 ? "bg-white" : "bg-stone-50/50"}`}>
                    <td className="py-2.5 px-3 md:py-3 md:px-4 font-medium text-black text-xs md:text-sm">{row.procedure}</td>
                    <td className="py-2.5 px-3 md:py-3 md:px-4 text-primary text-xs md:text-sm font-medium">{row.withInsurance}</td>
                    <td className="py-2.5 px-3 md:py-3 md:px-4 text-stone-700 text-xs md:text-sm">{row.withoutInsurance}</td>
                    <td className="py-2.5 px-3 md:py-3 md:px-4 text-stone-700 text-xs md:text-sm hidden md:table-cell">{row.avg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          <p className="text-xs text-stone-500 mt-3 px-4 md:px-0">
            Sources: <a href="https://www.ada.org/resources/research/health-policy-institute" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ADA Health Policy Institute</a>, CareCredit, Fair Health Consumer (2025-2026 data). Costs vary by region and provider.
          </p>
        </div>
      </section>

      {/* ═══ THE REAL PROBLEM ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl md:text-4xl font-normal text-black mb-4 leading-tight">
                The biggest dental expense isn't the procedure. <br />
                <span className="italic text-primary">It's not knowing what you need.</span>
              </h2>
              <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed mb-4">
                Most people overpay for dental work because they walk in blind. They don't know what's wrong, what it should cost, or whether they even need the treatment being recommended.
              </p>
              <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed">
                DentaSmart changes that. Upload a photo of your teeth and get a free AI assessment in 60 seconds. You'll know what to expect before you spend a single dollar.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-stone-50 rounded-2xl p-5 md:p-6 border border-stone-100">
                <h3 className="text-lg font-medium text-black mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" /> What Waiting Costs You
                </h3>
                <div className="space-y-4">
                  {[
                    { stage: "Preventive cleaning", cost: "$130", time: "Every 6 months", color: "bg-primary" },
                    { stage: "Small cavity filling", cost: "$150-$250", time: "Caught early", color: "bg-primary" },
                    { stage: "Root canal + crown", cost: "$1,700-$4,000", time: "Delayed 1-2 years", color: "bg-orange-500" },
                    { stage: "Extraction + implant", cost: "$3,500-$6,500", time: "Delayed 2+ years", color: "bg-red-500" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 md:gap-4">
                      <div className={`w-3 h-3 rounded-full ${item.color} flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline gap-2">
                          <span className="font-medium text-black text-sm md:text-base truncate">{item.stage}</span>
                          <span className="text-sm font-medium text-stone-900 whitespace-nowrap">{item.cost}</span>
                        </div>
                        <span className="text-xs text-stone-500">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-stone-200 text-center">
                  <p className="text-sm text-stone-600 font-light">Early detection saves <span className="font-medium text-primary">$3,000+</span> per tooth</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ HOW DENTASMART HELPS ═══ */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              How DentaSmart helps you <span className="italic text-primary">spend smarter</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: Search,
                title: "Know Before You Go",
                desc: "Upload a photo of your teeth and get AI-powered insights in minutes. Understand what's happening before you walk into a dental office and get quoted.",
              },
              {
                icon: Shield,
                title: "Skip Unnecessary Treatment",
                desc: "Not every recommendation is essential. DentaSmart helps you understand what you actually need vs. what can wait. So you don't overspend on things that aren't urgent.",
              },
              {
                icon: TrendingDown,
                title: "Catch Problems Early",
                desc: "A $130 cleaning prevents a $1,000 root canal. DentaSmart's AI monitoring helps you stay ahead of expensive surprises by catching issues when they're still cheap to fix.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="bg-white rounded-2xl p-5 md:p-6 border border-stone-100"
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
            <Link href="/download">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 w-full sm:w-auto">
                Try Your Free AI Assessment <ArrowRight className="w-4 h-4 ml-2" />
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
              Frequently asked questions about dental costs
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

      {/* ═══ RELATED HUBS ═══ */}
      <section className="py-6 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <h2 className="text-lg font-medium text-black mb-3">Related Resource Hubs</h2>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <Link href="/oral-health-hub/affordability">
              <span className="inline-flex items-center gap-2 bg-white px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Affordability Guide <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/oral-health-hub/conditions">
              <span className="inline-flex items-center gap-2 bg-white px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Conditions Guide <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/oral-health-hub/second-opinion">
              <span className="inline-flex items-center gap-2 bg-white px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Second Opinion Hub <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/oral-health-hub/prevention">
              <span className="inline-flex items-center gap-2 bg-white px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Prevention Hub <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/oral-health-hub/symptoms">
              <span className="inline-flex items-center gap-2 bg-white px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Symptoms Guide <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/symptom-quiz">
              <span className="inline-flex items-center gap-2 bg-white px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
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
              Stop guessing about dental costs.
            </h2>
            <p className="text-base md:text-lg text-stone-300 font-light mb-6 max-w-2xl mx-auto">
              DentaSmart gives you a free AI assessment so you know what's going on in your mouth before you spend anything at the dentist. Know your options. Save your money.
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
