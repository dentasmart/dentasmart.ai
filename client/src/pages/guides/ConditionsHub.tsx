import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, AlertCircle, Search, Shield, Activity, Heart, Smartphone, Zap, Eye } from "lucide-react";
import { Link } from "wouter";
import { DownloadSection } from "@/components/DownloadSection";
import { conditionsList } from "@/data/conditions";

/* ─── Condition Categories ─────────────────────────────────── */
const conditionCategories = [
  {
    title: "Tooth Pain & Sensitivity",
    icon: Zap,
    description: "Sharp, throbbing, or lingering pain when you eat, drink, or bite down.",
    keywords: "toothache, cracked tooth, sensitive teeth, tooth sensitivity",
    conditions: ["toothache", "cracked-tooth", "sensitive-teeth"],
  },
  {
    title: "Gum Problems",
    icon: Heart,
    description: "Bleeding, swelling, redness, or gums pulling away from your teeth.",
    keywords: "gingivitis, gum disease, periodontitis, bleeding gums, gum recession",
    conditions: ["gum-disease", "periodontitis", "gingivitis-vs-periodontitis"],
  },
  {
    title: "Infections & Abscesses",
    icon: AlertCircle,
    description: "Swelling, pus, fever, or a bad taste that won't go away. These need fast attention.",
    keywords: "dental abscess, tooth infection, oral thrush, pericoronitis",
    conditions: ["dental-abscess", "oral-thrush"],
  },
  {
    title: "Jaw & Bite Issues",
    icon: Activity,
    description: "Clicking, locking, grinding, or pain in your jaw joint and muscles.",
    keywords: "TMJ disorder, bruxism, teeth grinding, jaw pain",
    conditions: ["tmj-disorder", "teeth-grinding"],
  },
  {
    title: "Tooth Damage & Loss",
    icon: Shield,
    description: "Chips, cracks, decay, or missing teeth that change how you eat and smile.",
    keywords: "cavities, tooth decay, root canal, dental crown, dental implants",
    conditions: ["root-canal", "dental-crown", "dental-implants"],
  },
  {
    title: "Wisdom Teeth & Surgery",
    icon: Eye,
    description: "Pain, swelling, or complications from wisdom teeth coming in or being removed.",
    keywords: "wisdom teeth pain, dry socket, tooth extraction",
    conditions: ["wisdom-teeth-pain", "dry-socket"],
  },
];

/* ─── Warning Signs Data ──────────────────────────────────── */
const warningSignsData = [
  { sign: "Pain that wakes you up at night", urgency: "Seek prompt dental advice", color: "bg-red-500" },
  { sign: "Swelling in your face or jaw", urgency: "Seek urgent or emergency dental care", color: "bg-red-500" },
  { sign: "Bleeding gums every time you brush", urgency: "Arrange a dental visit", color: "bg-orange-500" },
  { sign: "A tooth that feels loose", urgency: "Arrange a prompt dental visit", color: "bg-orange-500" },
  { sign: "Sensitivity to hot or cold that lingers", urgency: "Arrange a dental visit", color: "bg-yellow-500" },
  { sign: "A sore or spot that has not healed", urgency: "Seek professional evaluation", color: "bg-yellow-500" },
  { sign: "Bad breath that won't go away", urgency: "Discuss it at a dental visit", color: "bg-primary" },
  { sign: "Clicking or popping in your jaw", urgency: "Discuss it at a dental visit", color: "bg-primary" },
];

/* ─── FAQ Data ──────────────────────────────────────────────── */
const faqs = [
  {
    q: "What are the most common dental conditions?",
    a: "Common topics include cavities, gum disease, tooth sensitivity, wisdom-tooth problems, and jaw-joint concerns. A dentist can determine which condition, if any, is present and recommend appropriate care.",
  },
  {
    q: "How do I know if my tooth pain is serious?",
    a: "Pain that keeps you awake, gets worse over days, or comes with swelling or fever needs prompt professional attention. Sharp pain when biting may signal a problem that needs a dentist's examination. You can use DentaSmart's free symptom quiz to organize what you notice, but it cannot determine urgency or provide a diagnosis.",
  },
  {
    q: "Can I treat dental problems at home?",
    a: "Some symptoms respond to home care temporarily. Saltwater rinses help with minor gum irritation. Over-the-counter pain relievers manage discomfort. Desensitizing toothpaste can ease mild sensitivity. But home care is a bridge, not a fix. If symptoms last more than a few days or get worse, you need a dentist.",
  },
  {
    q: "What happens if I ignore a dental condition?",
    a: "Some dental problems can progress when left untreated, but the course and cost vary by condition and person. A professional examination can clarify what is happening and whether treatment is needed.",
  },
  {
    q: "How does DentaSmart help me understand my dental condition?",
    a: "DentaSmart supports mouth photos and dental X-rays with applicable paid checks and plans. It can highlight areas that may deserve attention, explain supported observations in plain language, and help you prepare questions for a dentist. Its educational guidance is not a diagnosis or a substitute for professional care.",
  },
  {
    q: "Is DentaSmart a replacement for seeing a dentist?",
    a: "No. DentaSmart is your starting point, not your endpoint. Think of it like checking your symptoms before a doctor's visit. It helps you understand what's happening, prepare better questions, and make more confident decisions about your care. You still need a dentist for diagnosis and treatment.",
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
    { "@type": "ListItem", position: 3, name: "Dental Conditions", item: "https://dentasmart.ai/oral-health-hub/conditions" },
  ],
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Common Dental Conditions Explained in Plain Language",
  description: "Understand 16+ dental conditions from cavities to TMJ. Review clear explanations, warning signs, and when to seek professional dental care.",
  url: "https://dentasmart.ai/oral-health-hub/conditions",
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "DentaSmart",
    url: "https://dentasmart.ai",
  },
  about: [
    { "@type": "MedicalCondition", name: "Dental Conditions" },
    { "@type": "MedicalCondition", name: "Oral Health" },
  ],
  audience: { "@type": "MedicalAudience", name: "Patients" },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ConditionsHub() {
  // Build a lookup from slug to condition data
  const conditionsMap: Record<string, typeof conditionsList[0]> = {};
  for (const c of conditionsList) {
    conditionsMap[c.slug] = c;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black selection:bg-primary/20">
      <SEO
        title="Dental Conditions: Symptoms & Causes | DentaSmart"
        description="Understand 16+ dental conditions from toothaches to TMJ. Review symptoms, possible causes, warning signs, and when to seek professional dental care."
        canonical="https://dentasmart.ai/oral-health-hub/conditions"
        keywords="dental conditions, tooth pain causes, gum disease stages, toothache, cavities, gingivitis, TMJ, dental abscess, wisdom teeth, teeth grinding, sensitive teeth, oral thrush, root canal, dental crown, dental implants"
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
              <Activity className="w-4 h-4" /> Conditions Guide
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-4 leading-[1.1] max-w-4xl text-left">
              Something wrong with your teeth?{" "}
              <span className="italic text-primary">Learn what to watch for.</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-2xl mb-8 text-left">
              Over 3.5 billion people worldwide have some form of oral disease. If something feels off in your mouth, you're not alone. We explain 16+ common dental conditions in plain language so you know what's happening and what to do next.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/symptom-quiz">
                <Button size="lg" className="bg-action text-action-foreground hover:bg-action-hover rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 shadow-lg w-full sm:w-auto">
                  Check Your Symptoms
                </Button>
              </Link>
              <a href="#conditions-grid">
                <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 rounded-full px-8 py-6 text-base font-medium cursor-pointer w-full sm:w-auto">
                  Browse Conditions <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ THE PROBLEM: Statistics Strip ═══ */}
      <section className="py-6 bg-action text-action-foreground">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            {[
              { value: "3.5B", label: "People With Oral Disease Worldwide" },
              { value: "90%", label: "Of Adults Have Had a Cavity" },
              { value: "47%", label: "Of Adults Over 30 Have Gum Disease" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="py-3 md:py-0"
              >
                <div className="text-3xl md:text-5xl font-normal tracking-tighter text-action-foreground">{stat.value}</div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-action-foreground font-medium mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE REAL PROBLEM ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl md:text-4xl font-normal text-black mb-4 leading-tight text-left">
                The scariest part isn't the condition. <br />
                <span className="italic text-primary">It's not knowing what it is.</span>
              </h2>
              <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed mb-4 text-left">
                You notice something. A dull ache. Gums that bleed when you brush. A tooth that hurts when you drink cold water. You Google it and get 50 different answers, half of them terrifying.
              </p>
              <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed text-left">
                Most dental conditions are treatable, especially when you catch them early. The problem is that most people wait because they don't know what they're dealing with. This guide gives you clarity so you can take the right next step.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-stone-50 rounded-2xl p-5 md:p-6 border border-stone-100">
                <h3 className="text-lg font-medium text-black mb-4 flex items-center gap-2 text-left">
                  <AlertCircle className="w-5 h-5 text-amber-500" /> Warning Signs and When to Act
                </h3>
                <div className="space-y-3">
                  {warningSignsData.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${item.color} flex-shrink-0 mt-1.5`} />
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-black text-sm block">{item.sign}</span>
                        <span className="text-xs text-stone-500">{item.urgency}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-stone-200 text-center">
                  <p className="text-sm text-stone-600 font-light">Not sure how to describe it? <span className="font-medium text-primary">DentaSmart can help you organize what you notice.</span></p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ CONDITIONS GRID BY CATEGORY ═══ */}
      <section id="conditions-grid" className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2 text-left">
              Common dental conditions by category
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl text-left">
              We cover 16+ conditions with plain-language explanations, real symptoms, causes, and clear next steps. Pick a category or browse them all.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {conditionCategories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-5 md:p-6 border border-stone-100 hover:border-primary/20 transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <cat.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-medium text-black mb-2 text-left">{cat.title}</h3>
                <p className="text-stone-600 font-light text-sm leading-relaxed mb-3 text-left">{cat.description}</p>
                <div className="space-y-2">
                  {cat.conditions.map(slug => {
                    const condition = conditionsMap[slug];
                    if (!condition) return null;
                    return (
                      <Link key={slug} href={`/conditions/${slug}`}>
                        <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-stone-50 hover:bg-primary/5 transition-colors cursor-pointer group">
                          <span className="text-sm font-medium text-stone-700 group-hover:text-primary transition-colors">
                            {condition.primaryKeyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                          </span>
                          <ArrowRight className="w-3 h-3 text-stone-400 group-hover:text-primary transition-colors" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/conditions">
              <Button size="lg" variant="outline" className="border-primary/30 text-action hover:bg-primary/5 rounded-full px-8 py-6 text-base font-medium cursor-pointer">
                View All {conditionsList.length} Conditions <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ HOW DENTASMART HELPS ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2 text-left">
              Prepare better questions <span className="italic text-primary">before</span> your appointment
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl text-left">
              Clear language can help you explain what you notice and understand the questions to ask. A dentist is still needed for diagnosis and treatment decisions.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: Search,
                title: "Upload Supported Information",
                desc: "With an applicable paid check or plan, add mouth photos or dental X-rays. DentaSmart highlights supported observations in plain language.",
              },
              {
                icon: Shield,
                title: "Know What to Ask",
                desc: "Go to your dentist with real questions instead of nodding along. When you understand the condition, you make better decisions about treatment.",
              },
              {
                icon: Smartphone,
                title: "Track Changes Over Time",
                desc: "Keep supported records in one place and compare your own information over time. Ask a dentist about any concern or change.",
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
                <h3 className="text-lg md:text-xl font-medium text-black mb-2 text-left">{item.title}</h3>
                <p className="text-stone-600 font-light leading-relaxed text-sm md:text-base text-left">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/pricing">
              <Button size="lg" className="bg-action text-action-foreground hover:bg-action-hover rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 w-full sm:w-auto">
                Explore DentaSmart Options <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FULL CONDITIONS LIST ═══ */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-6">
            <h2 className="text-2xl md:text-3xl font-medium text-black text-left">All conditions we cover</h2>
            <p className="text-stone-600 font-light mt-1 text-sm md:text-base text-left">
              Each page includes symptoms, causes, home care tips, and when to see a dentist.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {conditionsList.map((condition, idx) => (
              <Link key={condition.slug} href={`/conditions/${condition.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(idx * 0.05, 0.4), duration: 0.4 }}
                  className="bg-white rounded-xl p-4 border border-stone-100 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer h-full"
                >
                  <h3 className="text-base font-medium text-black mb-1 text-left">
                    {condition.primaryKeyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </h3>
                  <p className="text-stone-500 font-light text-xs leading-relaxed line-clamp-2 mb-2 text-left">
                    {condition.heroSubheading}
                  </p>
                  <span className="inline-flex items-center gap-1 text-primary text-xs font-medium">
                    Read more <ArrowRight className="w-3 h-3" />
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ SECTION ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2 text-left">
              Common questions about dental conditions
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
                  <h3 className="text-sm md:text-base font-medium text-black pr-4 text-left">{faq.q}</h3>
                  <span className="text-primary text-xl flex-shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="px-4 pb-4 pt-0 md:px-5 md:pb-5">
                  <p className="text-stone-600 font-light leading-relaxed text-xs md:text-sm text-left">{faq.a}</p>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RELATED HUBS ═══ */}
      <section className="py-6 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <h2 className="text-lg font-medium text-black mb-3 text-left">Related Resource Hubs</h2>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <Link href="/oral-health-hub/affordability">
              <span className="inline-flex items-center gap-2 bg-white px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Affordability Guide <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/dental-costs">
              <span className="inline-flex items-center gap-2 bg-white px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Cost Guide <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/treatments">
              <span className="inline-flex items-center gap-2 bg-white px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Treatment Guide <ArrowRight className="w-3 h-3" />
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
            <Link href="/dental-costs">
              <span className="inline-flex items-center gap-2 bg-white px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Cost Guide <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/treatments">
              <span className="inline-flex items-center gap-2 bg-white px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Treatment Guides <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/symptom-quiz">
              <span className="inline-flex items-center gap-2 bg-white px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Free Symptom Checker <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/guides">
              <span className="inline-flex items-center gap-2 bg-white px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
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
              Choose a clear next step
            </h2>
            <p className="text-base md:text-lg text-stone-300 font-light mb-6 max-w-2xl mx-auto">
              Use the free symptom quiz to organize what you notice, or compare DentaSmart's paid checks and plans before you continue.
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
