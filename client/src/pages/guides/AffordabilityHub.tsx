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
  { procedure: "Routine Dental Exam", withoutInsurance: "$50-$350", avgCost: "$203", withDentaSmart: "Know before you go", costLink: null, treatmentLink: null },
  { procedure: "Teeth Cleaning", withoutInsurance: "$75-$200", avgCost: "$130", withDentaSmart: "Track when you're due", costLink: "/dental-costs/dental-cleaning-cost", treatmentLink: "/treatments/dental-cleaning-procedure" },
  { procedure: "Dental X-rays", withoutInsurance: "$25-$250", avgCost: "$150", withDentaSmart: "AI analysis included", costLink: null, treatmentLink: null },
  { procedure: "Cavity Filling", withoutInsurance: "$100-$1,050", avgCost: "$250", withDentaSmart: "Catch early, save more", costLink: null, treatmentLink: null },
  { procedure: "Tooth Extraction", withoutInsurance: "$50-$500", avgCost: "$200", withDentaSmart: "Second opinion first", costLink: "/dental-costs/tooth-extraction-cost", treatmentLink: "/treatments/tooth-extraction-procedure" },
  { procedure: "Root Canal", withoutInsurance: "$700-$1,500", avgCost: "$1,000", withDentaSmart: "Verify if needed", costLink: "/dental-costs/root-canal-cost", treatmentLink: "/treatments/root-canal-procedure" },
  { procedure: "Dental Crown", withoutInsurance: "$800-$2,500", avgCost: "$1,200", withDentaSmart: "Compare options", costLink: "/dental-costs/dental-crown-cost", treatmentLink: "/treatments/dental-crown-procedure" },
  { procedure: "Dental Implant", withoutInsurance: "$3,000-$6,000", avgCost: "$4,500", withDentaSmart: "Plan ahead", costLink: "/dental-costs/dental-implant-cost", treatmentLink: "/treatments/dental-implant-procedure" },
  { procedure: "Braces", withoutInsurance: "$2,500-$7,000", avgCost: "$5,000", withDentaSmart: "Explore alternatives", costLink: "/dental-costs/braces-cost", treatmentLink: "/treatments/braces-treatment" },
];

const savingsTips = [
  {
    icon: Search,
    title: "Review Your Questions First",
    description: "Organize supported records and treatment-plan questions before a dental visit. DentaSmart provides educational context, not a diagnosis or treatment decision.",
    cta: "Compare DentaSmart Services",
    href: "/pricing",
  },
  {
    icon: Shield,
    title: "Consider Dental Discount Plans",
    description: "Discount plans are not insurance. Fees, participating providers, exclusions, and discounts vary, so compare current plan documents before enrolling.",
    cta: "Learn More",
    href: "/guides/dental-insurance-alternatives",
  },
  {
    icon: Heart,
    title: "Visit a Dental School",
    description: "Accredited dental schools may offer supervised care. Services, eligibility, fees, and wait times vary, so contact the program directly for current details.",
    cta: null,
    href: null,
  },
  {
    icon: DollarSign,
    title: "Use Community Health Centers",
    description: "Some community health centers offer dental services or sliding-fee programs. Availability and eligibility vary by location, so confirm current options directly.",
    cta: null,
    href: null,
  },
  {
    icon: TrendingDown,
    title: "Prioritize Prevention",
    description: "Routine preventive care may reduce the chance that some problems become more complex. Ask a dentist which schedule and home-care steps fit your needs.",
    cta: "Prevention Guide",
    href: "/oral-health-hub/prevention",
  },
  {
    icon: Clock,
    title: "Use HSA or FSA Funds",
    description: "Some dental expenses may qualify for HSA or FSA funds. Check current plan rules or ask a qualified benefits or tax professional before relying on coverage.",
    cta: null,
    href: null,
  },
  {
    icon: Smartphone,
    title: "Review a Treatment Plan",
    description: "DentaSmart Treatment Plan Review can organize a supported dentist treatment plan, plain-language context, and questions. It does not provide a dentist's diagnosis or clinical recommendation.",
    cta: "View Treatment Plan Review",
    href: "/pricing#second-opinion",
  },
];

/* ─── FAQ Data ──────────────────────────────────────────────── */
const faqs = [
  {
    q: "How much does dental care cost without insurance?",
    a: "Dental fees vary by location, provider, procedure, materials, and treatment complexity. Ask for an itemized estimate and compare qualified providers. DentaSmart can help you organize cost questions, but it does not diagnose conditions or decide which treatment you need.",
  },
  {
    q: "What are the best alternatives to dental insurance?",
    a: "Options may include discount plans, community health centers, accredited dental-school clinics, payment plans, and eligible HSA or FSA funds. Terms and availability vary. Compare current details and ask a dentist to explain which treatment is clinically appropriate.",
  },
  {
    q: "How can I find affordable dental care near me?",
    a: "Check community health centers, accredited dental schools, nonprofit clinics, public-benefit programs, and local dental societies. Confirm services, eligibility, fees, and appointment availability directly with each provider.",
  },
  {
    q: "Is it worth going to the dentist without insurance?",
    a: "Routine dental care can identify concerns and support prevention, but the right schedule depends on your needs. If cost is a barrier, ask about lower-cost clinics, payment options, and which care should not be delayed.",
  },
  {
    q: "How can I save money on dental work I already need?",
    a: "Ask for an itemized treatment plan, discuss alternatives, compare qualified providers, review insurance benefits, and ask about payment or membership options. For a complex recommendation, another licensed dentist can provide a clinical second opinion.",
  },
  {
    q: "What dental procedures are most expensive without insurance?",
    a: "Complex restorative, surgical, and orthodontic care can be costly, but fees vary widely by case and provider. Request an itemized estimate, ask what is urgent, and discuss alternatives and financing before treatment.",
  },
  {
    q: "Does DentaSmart replace going to the dentist?",
    a: "No. DentaSmart provides educational information and tools that can help you organize supported records and prepare questions. It does not diagnose conditions, provide hands-on care, or replace a licensed dentist's examination and treatment decisions.",
  },
  {
    q: "How does DentaSmart help me save on dental care?",
    a: "DentaSmart can help you organize supported records, review educational cost context, and prepare questions about a treatment plan. It does not guarantee savings or determine whether a procedure is necessary.",
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
  name: "Affordable Dental Care Guide. How to Save on Dental Work",
  description: "Educational guide to lower-cost dental care options, questions to ask about fees, and ways to compare treatment estimates.",
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
        title="Affordable Dental Care Without Insurance | DentaSmart"
        description="Review educational cost context, lower-cost care options, and questions to ask about dental fees when you do not have insurance."
        canonical="https://dentasmart.ai/oral-health-hub/affordability"
        keywords="affordable dental care, dental care without insurance, how much does dental work cost, cheap dental care, dental savings plan, low cost dental care, dental care for uninsured, dental discount plans, free dental assessment, save money on dental care"
        jsonLd={[faqJsonLd, breadcrumbJsonLd, webPageJsonLd]}
      />
      <Navigation />

      {/* ═══ HERO. Brand-aligned light style ═══ */}
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
              If you do not have dental insurance or feel unsure about a treatment estimate, this guide explains lower-cost care options and questions to ask before you agree to treatment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/download">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 shadow-lg w-full sm:w-auto">
                  Download the App
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
              { value: "Compare", label: "Itemized Treatment Estimates" },
              { value: "Ask", label: "About Lower-Cost Care Options" },
              { value: "Confirm", label: "Benefits and Current Fees" },
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
                Delaying care can allow some problems to become more complex, but the timing and treatment path vary. Ask a dental professional which symptoms or findings need prompt attention.
              </p>
              <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed">
                If cost is a barrier, ask about itemized estimates, treatment alternatives, lower-cost clinics, and payment options. DentaSmart can help organize questions, not replace professional care.
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
                    { stage: "Request an itemized estimate", cost: "Compare", time: "Review each service and fee", color: "bg-primary" },
                    { stage: "Ask what is urgent", cost: "Clarify", time: "Discuss timing with a dentist", color: "bg-yellow-500" },
                    { stage: "Review alternatives", cost: "Explore", time: "Compare benefits and trade-offs", color: "bg-orange-500" },
                    { stage: "Confirm payment options", cost: "Plan", time: "Check current terms directly", color: "bg-red-500" },
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
                  <p className="text-sm text-stone-600 font-light">Fees and treatment needs vary by person and provider.</p>
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
                    <td className="py-2.5 px-3 md:py-3 md:px-4 font-medium text-xs md:text-sm">
                      {row.costLink ? (
                        <Link href={row.costLink}>
                          <span className="text-primary hover:underline cursor-pointer">{row.procedure}</span>
                        </Link>
                      ) : (
                        <span className="text-black">{row.procedure}</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 md:py-3 md:px-4 text-stone-700 text-xs md:text-sm">{row.withoutInsurance}</td>
                    <td className="py-2.5 px-3 md:py-3 md:px-4 text-stone-700 text-xs md:text-sm hidden md:table-cell">{row.avgCost}</td>
                    <td className="py-2.5 px-3 md:py-3 md:px-4 text-xs md:text-sm">
                      {row.treatmentLink ? (
                        <Link href={row.treatmentLink}>
                          <span className="text-primary hover:underline cursor-pointer font-medium">{row.withDentaSmart}</span>
                        </Link>
                      ) : (
                        <span className="text-primary font-medium">{row.withDentaSmart}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          <p className="text-xs text-stone-500 mt-3 px-4 md:px-0">
            Sources: ADA Health Policy Institute, CareCredit, Guardian Life, Aflac (2025-2026 data). Costs are national averages and may vary by region.
          </p>
        </div>
      </section>

      {/* ═══ HOW DENTASMART HELPS ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              How DentaSmart helps you prepare <span className="italic text-primary">cost questions</span>
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl">
              DentaSmart can organize supported records and educational cost context before a dental visit. A licensed dentist must diagnose conditions and recommend treatment.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: Search,
                title: "Organize Before You Go",
                desc: "Review supported records and prepare questions before you walk into a dental office.",
              },
              {
                icon: Shield,
                title: "Review the Treatment Plan",
                desc: "Ask what each item addresses, what alternatives exist, and what can safely wait. A dentist must make the clinical recommendation.",
              },
              {
                icon: TrendingDown,
                title: "Keep Cost Context Together",
                desc: "Store supported information and questions in one place so you can compare estimates and follow-up plans.",
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
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 w-full sm:w-auto">
                Compare DentaSmart Services <ArrowRight className="w-4 h-4 ml-2" />
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
              7 ways to review lower-cost care options
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl">
              Availability, eligibility, and savings vary. Confirm current terms directly with each provider or program.
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
              <p className="text-stone-600 font-light mt-1 text-sm md:text-base">Step-by-step guides to help you understand and manage dental costs.</p>
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
            <Link href="/dental-costs">
              <span className="inline-flex items-center gap-2 bg-stone-50 px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Cost Guide <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/treatments">
              <span className="inline-flex items-center gap-2 bg-stone-50 px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Treatment Guide <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
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
            <Link href="/oral-health-hub/conditions">
              <span className="inline-flex items-center gap-2 bg-stone-50 px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Conditions Guide <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/oral-health-hub/symptoms">
              <span className="inline-flex items-center gap-2 bg-stone-50 px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Symptoms Guide <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
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
              Prepare clearer cost questions.
            </h2>
            <p className="text-base md:text-lg text-stone-300 font-light mb-6 max-w-2xl mx-auto">
              Free Quick Check is unlimited. Full Quick Check, Treatment Plan Review, and Complete Care are paid services with current prices shown before purchase.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/download">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 w-full sm:w-auto">
                  Download the App
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
