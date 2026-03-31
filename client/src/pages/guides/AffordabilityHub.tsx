import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, DollarSign, Shield, TrendingDown, AlertTriangle, CheckCircle, Smartphone, Heart, Search, Clock } from "lucide-react";
import { Link } from "wouter";
import { DownloadSection } from "@/components/DownloadSection";
import { guidesList } from "@/data/guides";

const affordabilityGuides = guidesList.filter(g => g.category === "affordability");

/* ─── Cost Data ─────────────────────────────────────────────── */
const procedureCosts = [
  { procedure: "Routine Dental Exam", withoutInsurance: "$50–$350", avgCost: "$203", withDentaSmart: "Know before you go" },
  { procedure: "Teeth Cleaning", withoutInsurance: "$75–$200", avgCost: "$130", withDentaSmart: "Track when you're due" },
  { procedure: "Dental X-rays", withoutInsurance: "$25–$250", avgCost: "$150", withDentaSmart: "AI analysis included" },
  { procedure: "Cavity Filling", withoutInsurance: "$100–$1,050", avgCost: "$250", withDentaSmart: "Catch early, save more" },
  { procedure: "Tooth Extraction", withoutInsurance: "$50–$500", avgCost: "$200", withDentaSmart: "Second opinion first" },
  { procedure: "Root Canal", withoutInsurance: "$700–$1,500", avgCost: "$1,000", withDentaSmart: "Verify if needed" },
  { procedure: "Dental Crown", withoutInsurance: "$800–$2,500", avgCost: "$1,200", withDentaSmart: "Compare options" },
  { procedure: "Dental Implant", withoutInsurance: "$3,000–$6,000", avgCost: "$4,500", withDentaSmart: "Plan ahead" },
  { procedure: "Braces", withoutInsurance: "$2,500–$7,000", avgCost: "$5,000", withDentaSmart: "Explore alternatives" },
];

const savingsTips = [
  {
    icon: Search,
    title: "Get a Free AI Assessment First",
    description: "Before spending a dime, upload a photo of your teeth to DentaSmart. Our AI identifies potential issues so you know what to ask about — and what you might not need.",
    cta: "Try Free Scan",
    href: "/download",
  },
  {
    icon: Shield,
    title: "Consider Dental Discount Plans",
    description: "Not insurance — discount plans charge an annual fee ($80–$200) and give you 10–60% off dental procedures. No deductibles, no waiting periods, no claim forms.",
    cta: "Learn More",
    href: "/guides/dental-insurance-alternatives",
  },
  {
    icon: Heart,
    title: "Visit a Dental School",
    description: "Dental schools offer supervised care at 30–50% less than private practices. Students are closely monitored by licensed faculty. Search for accredited programs near you.",
    cta: null,
    href: null,
  },
  {
    icon: DollarSign,
    title: "Use Community Health Centers",
    description: "Over 1,400 Federally Qualified Health Centers (FQHCs) offer dental care on a sliding fee scale based on your income. Many serve patients regardless of insurance status.",
    cta: null,
    href: null,
  },
  {
    icon: TrendingDown,
    title: "Prioritize Prevention",
    description: "A $130 cleaning twice a year costs $260. A root canal costs $1,000+. Prevention is the single best financial strategy for dental health. DentaSmart helps you stay on track.",
    cta: "Prevention Guide",
    href: "/oral-health-hub/prevention",
  },
  {
    icon: Clock,
    title: "Use HSA or FSA Funds",
    description: "Health Savings Accounts and Flexible Spending Accounts can be used for dental care. These pre-tax dollars effectively give you a 20–30% discount on every procedure.",
    cta: null,
    href: null,
  },
  {
    icon: Smartphone,
    title: "Get a Second Opinion with AI",
    description: "Before agreeing to expensive treatment, get a DentaSmart second opinion. Upload your X-rays and our AI helps you understand what's really going on — so you can ask better questions.",
    cta: "Get Second Opinion",
    href: "/download",
  },
];

/* ─── FAQ Data ──────────────────────────────────────────────── */
const faqs = [
  {
    q: "How much does dental care cost without insurance?",
    a: "Without insurance, a routine exam and cleaning costs $130–$350. Fillings range from $100–$1,050, root canals from $700–$1,500, and crowns from $800–$2,500. Costs vary significantly by location and provider. Using DentaSmart's free AI assessment before your visit helps you understand what to expect and avoid unnecessary procedures.",
  },
  {
    q: "What are the best alternatives to dental insurance?",
    a: "Dental discount plans ($80–$200/year) offer 10–60% savings with no deductibles or waiting periods. Community health centers provide sliding-scale fees based on income. Dental schools offer care at 30–50% less. HSA/FSA accounts let you pay with pre-tax dollars. DentaSmart helps you prioritize which treatments you actually need.",
  },
  {
    q: "How can I find affordable dental care near me?",
    a: "Start with Federally Qualified Health Centers (FQHCs) — over 1,400 locations nationwide offer sliding-scale dental care. Search HRSA.gov for locations. Dental schools, nonprofit clinics like Dental Lifeline Network, and state Medicaid programs are also options. DentaSmart's AI can help you understand your needs before you visit.",
  },
  {
    q: "Is it worth going to the dentist without insurance?",
    a: "Yes — preventive care costs far less than emergency treatment. A $130 cleaning can prevent a $1,000+ root canal. Skipping dental visits often leads to problems that become 5–10x more expensive to fix. DentaSmart helps you monitor your oral health between visits so you catch issues early when they're cheapest to treat.",
  },
  {
    q: "How can I save money on dental work I already need?",
    a: "Ask your dentist about payment plans — many offer interest-free financing. Get a second opinion before major procedures (DentaSmart's AI can help). Compare prices between providers. Ask about alternative treatments that may cost less. Use dental discount plans for immediate savings of 10–60% on procedures.",
  },
  {
    q: "What dental procedures are most expensive without insurance?",
    a: "Dental implants ($3,000–$6,000 per tooth), braces ($2,500–$7,000), and full-mouth reconstruction ($15,000–$40,000+) are the most expensive. Root canals ($700–$1,500) and crowns ($800–$2,500) are common mid-range expenses. Prevention and early detection through tools like DentaSmart can help you avoid many of these costly procedures.",
  },
  {
    q: "Does DentaSmart replace going to the dentist?",
    a: "No — DentaSmart is your AI oral health guide, not a replacement for professional dental care. It helps you understand your oral health, catch potential issues early, get AI-powered second opinions, and make informed decisions about treatment. Think of it as a knowledgeable friend who helps you navigate dental care more confidently and affordably.",
  },
  {
    q: "How does DentaSmart help me save on dental care?",
    a: "DentaSmart saves you money in three ways: (1) Prevention — AI monitoring helps catch issues early when they're cheapest to fix. (2) Clarity — understand what you actually need before committing to expensive treatment. (3) Second opinions — upload X-rays and get AI insights so you can ask better questions and avoid unnecessary procedures.",
  },
];

/* ─── JSON-LD Schemas ───────────────────────────────────────── */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://dentasmart.ai" },
    { "@type": "ListItem", position: 2, name: "Oral Health Hub", item: "https://dentasmart.ai/oral-health-hub" },
    { "@type": "ListItem", position: 3, name: "Affordable Dental Care", item: "https://dentasmart.ai/oral-health-hub/affordability" },
  ],
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Affordable Dental Care Guide — How to Save on Dental Work",
  description: "Comprehensive guide to affordable dental care options for uninsured and cost-conscious patients. Includes procedure cost tables, savings tips, and free AI dental assessment.",
  url: "https://dentasmart.ai/oral-health-hub/affordability",
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "DentaSmart",
    url: "https://dentasmart.ai",
  },
  about: [
    { "@type": "MedicalCondition", name: "Dental Care Costs" },
    { "@type": "MedicalCondition", name: "Preventive Dental Care" },
  ],
  audience: { "@type": "MedicalAudience", name: "Patients" },
  lastReviewed: "2026-03-31",
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function AffordabilityHub() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black selection:bg-primary/20">
      <SEO
        title="Affordable Dental Care Guide — How to Save on Dental Work Without Insurance | DentaSmart"
        description="68.5 million Americans lack dental insurance. Find real options: procedure cost tables, 7 proven savings tips, discount plans, and a free AI dental assessment. Stop guessing about costs."
        canonical="https://dentasmart.ai/oral-health-hub/affordability"
        keywords="affordable dental care, dental care without insurance, how much does dental work cost, cheap dental care, dental savings plan, low cost dental care, dental care for uninsured, dental discount plans, free dental assessment, save money on dental care"
        jsonLd={[faqJsonLd, breadcrumbJsonLd, webPageJsonLd]}
      />
      <Navigation />

      {/* ═══ HERO — Brand-aligned light style ═══ */}
      <section className="relative flex items-center overflow-hidden bg-gradient-to-br from-white via-accent/5 to-primary/5">
        {/* Subtle background accents */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 px-4 mx-auto max-w-6xl pt-40 pb-12 md:pt-36 md:pb-14">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-6">
              <DollarSign className="w-4 h-4" /> Affordability Guide
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-4 leading-[1.1] max-w-4xl">
              Dental care doesn't have to <br className="hidden md:block" />
              <span className="italic text-primary">break the bank</span>.
            </h1>
            <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-2xl mb-8">
              68.5 million Americans have no dental insurance. If you're one of them — or if you're just tired of surprise bills — this guide gives you real options, real costs, and a free way to understand your oral health before spending a dime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/download">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 shadow-lg w-full sm:w-auto">
                  Get Your Free AI Assessment
                </Button>
              </Link>
              <a href="#cost-table">
                <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 rounded-full px-8 py-6 text-base font-medium cursor-pointer w-full sm:w-auto">
                  See Procedure Costs <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ THE PROBLEM: Statistics Strip ═══ */}
      <section className="py-6 bg-primary text-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            {[
              { value: "68.5M", label: "Americans Without Dental Insurance" },
              { value: "3×", label: "More Uninsured for Dental vs Medical" },
              { value: "10×", label: "Cost of Emergency vs Preventive Care" },
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

      {/* ═══ THE HIDDEN COST OF WAITING ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl md:text-4xl font-normal text-black mb-4 leading-tight">
                The real cost isn't the procedure. <br />
                <span className="italic text-primary">It's waiting too long.</span>
              </h2>
              <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed mb-4">
                Most people avoid the dentist because of cost. But dental problems don't wait — they compound. A $130 cleaning you skip today can become a $1,000 root canal next year. A small cavity you ignore becomes a crown. A crown you delay becomes an extraction and an implant.
              </p>
              <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed">
                The most affordable dental care is the kind that catches problems early. That's exactly what DentaSmart helps you do — for free.
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
                  <AlertTriangle className="w-5 h-5 text-amber-500" /> What Happens When You Wait
                </h3>
                <div className="space-y-4">
                  {[
                    { stage: "Early Cavity", cost: "$100–$250", time: "Caught in first 6 months", color: "bg-primary" },
                    { stage: "Deep Filling", cost: "$250–$500", time: "Caught in 6–12 months", color: "bg-yellow-500" },
                    { stage: "Root Canal + Crown", cost: "$1,700–$4,000", time: "After 1–2 years", color: "bg-orange-500" },
                    { stage: "Extraction + Implant", cost: "$3,500–$6,500", time: "After 2+ years", color: "bg-red-500" },
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
                  <p className="text-sm text-stone-600 font-light">Early detection can save you <span className="font-medium text-primary">$3,000+</span> per tooth</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ COST TABLE ═══ */}
      <section id="cost-table" className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              What dental procedures actually cost
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light mb-6 max-w-3xl">
              These are 2026 national averages for patients paying out of pocket. Costs vary by location, provider, and complexity.
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
                  <th className="text-left py-3 px-3 md:px-4 font-medium text-xs md:text-sm">Procedure</th>
                  <th className="text-left py-3 px-3 md:px-4 font-medium text-xs md:text-sm">Cost Range</th>
                  <th className="text-left py-3 px-3 md:px-4 font-medium text-xs md:text-sm hidden md:table-cell">Average</th>
                  <th className="text-left py-3 px-3 md:px-4 font-medium text-xs md:text-sm">DentaSmart Helps</th>
                </tr>
              </thead>
              <tbody>
                {procedureCosts.map((row, idx) => (
                  <tr key={idx} className={`border-t border-stone-100 ${idx % 2 === 0 ? "bg-white" : "bg-stone-50/50"}`}>
                    <td className="py-2.5 px-3 md:py-3 md:px-4 font-medium text-black text-xs md:text-sm">{row.procedure}</td>
                    <td className="py-2.5 px-3 md:py-3 md:px-4 text-stone-700 text-xs md:text-sm">{row.withoutInsurance}</td>
                    <td className="py-2.5 px-3 md:py-3 md:px-4 text-stone-700 text-xs md:text-sm hidden md:table-cell">{row.avgCost}</td>
                    <td className="py-2.5 px-3 md:py-3 md:px-4 text-primary text-xs md:text-sm font-medium">{row.withDentaSmart}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          <p className="text-xs text-stone-500 mt-3 px-4 md:px-0">
            Sources: ADA Health Policy Institute, CareCredit, Guardian Life, Aflac (2025–2026 data). Costs are national averages and may vary by region.
          </p>
        </div>
      </section>

      {/* ═══ HOW DENTASMART HELPS ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              How DentaSmart helps you spend <span className="italic text-primary">smarter</span>
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl">
              You don't need insurance to understand your oral health. DentaSmart gives you clarity before you commit to treatment — so every dollar you spend is informed.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: Search,
                title: "Know Before You Go",
                desc: "Upload a photo of your teeth and get AI-powered insights in minutes. Understand what's happening before you walk into a dental office.",
              },
              {
                icon: Shield,
                title: "Avoid Unnecessary Treatment",
                desc: "Not every recommendation is essential. DentaSmart helps you understand what you actually need vs. what can wait — so you don't overspend.",
              },
              {
                icon: TrendingDown,
                title: "Catch Problems Early",
                desc: "The earlier you catch a dental issue, the cheaper it is to fix. DentaSmart's AI monitoring helps you stay ahead of expensive surprises.",
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
            <Link href="/download">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 w-full sm:w-auto">
                Try Your Free AI Assessment <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 7 WAYS TO SAVE ═══ */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              7 proven ways to save on dental care
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl">
              Whether you're uninsured, underinsured, or just trying to be smarter about dental spending — these strategies work.
            </p>
          </motion.div>
          <div className="space-y-3 md:space-y-4">
            {savingsTips.map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="bg-white rounded-xl p-4 md:p-5 border border-stone-100 flex flex-col md:flex-row md:items-center gap-3 md:gap-4"
              >
                <div className="flex items-start md:items-center gap-3 md:gap-4 flex-1">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 md:mt-0">
                    <tip.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base md:text-lg font-medium text-black">
                      <span className="text-primary mr-2">{idx + 1}.</span>{tip.title}
                    </h3>
                    <p className="text-stone-600 font-light text-xs md:text-sm leading-relaxed mt-1">{tip.description}</p>
                  </div>
                </div>
                {tip.cta && tip.href && (
                  <Link href={tip.href}>
                    <Button variant="outline" size="sm" className="rounded-full border-primary/30 text-primary hover:bg-primary/5 cursor-pointer whitespace-nowrap w-full md:w-auto">
                      {tip.cta} <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ SECTION ═══ */}
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

      {/* ═══ AFFORDABILITY GUIDES ═══ */}
      {affordabilityGuides.length > 0 && (
        <section className="py-10 bg-stone-50">
          <div className="container px-4 mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="mb-6">
              <h2 className="text-2xl font-medium text-black">In-Depth Affordability Guides</h2>
              <p className="text-stone-600 font-light mt-1 text-sm md:text-base">Step-by-step guides to help you navigate dental costs.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {affordabilityGuides.map((guide, idx) => (
                <Link key={guide.slug} href={`/guides/${guide.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="bg-white rounded-xl p-5 border border-stone-100 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer h-full"
                  >
                    <div className="text-xs uppercase tracking-wider text-primary font-medium mb-2">
                      {guide.steps.length} Steps
                    </div>
                    <h3 className="text-base md:text-lg font-medium text-black mb-2">{guide.title}</h3>
                    <p className="text-stone-600 font-light text-xs md:text-sm leading-relaxed line-clamp-3 mb-3">
                      {guide.heroSubheading}
                    </p>
                    <span className="inline-flex items-center gap-2 text-primary text-sm font-medium">
                      Read guide <ArrowRight className="w-3 h-3" />
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ RELATED HUBS ═══ */}
      <section className="py-6 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <h2 className="text-lg font-medium text-black mb-3">Related Resource Hubs</h2>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <Link href="/oral-health-hub/second-opinion">
              <span className="inline-flex items-center gap-2 bg-stone-50 px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Second Opinion Hub <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/oral-health-hub/prevention">
              <span className="inline-flex items-center gap-2 bg-stone-50 px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Prevention Hub <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/symptom-quiz">
              <span className="inline-flex items-center gap-2 bg-stone-50 px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Free Symptom Checker <ArrowRight className="w-3 h-3" />
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
              Stop guessing. Start knowing.
            </h2>
            <p className="text-base md:text-lg text-stone-300 font-light mb-6 max-w-2xl mx-auto">
              68.5 million Americans don't have dental insurance. DentaSmart gives every one of them a free way to understand their oral health — before spending a single dollar at the dentist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/download">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 w-full sm:w-auto">
                  Download DentaSmart — It's Free
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
