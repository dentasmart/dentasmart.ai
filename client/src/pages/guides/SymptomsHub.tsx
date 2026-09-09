import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, AlertTriangle, Thermometer, Eye, Clock, Smartphone, Shield, Search, Activity } from "lucide-react";
import { Link } from "wouter";
import { symptomsList } from "@/data/symptoms";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

// Symptom categories with search-intent keywords
const symptomCategories = [
  {
    icon: Thermometer,
    title: "Tooth Pain & Aches",
    description: "Sharp, throbbing, or dull pain in a tooth. Pain when biting, chewing, or drinking something cold or hot.",
    keywords: ["why does my tooth hurt", "tooth pain when biting down", "throbbing tooth pain", "tooth hurts when drinking cold water"],
    symptoms: ["tooth-pain-when-biting", "tooth-sensitivity", "teeth-grinding", "enamel-erosion", "enamel-hypersensitivity"],
  },
  {
    icon: Activity,
    title: "Gum Problems",
    description: "Bleeding when you brush, red or swollen gums, gums pulling away from teeth, or tenderness around one tooth.",
    keywords: ["bleeding gums when brushing", "swollen gums around one tooth", "receding gums causes", "gum pain"],
    symptoms: ["bleeding-gums", "swollen-gums", "gum-bleeding-after-brushing", "gum-inflammation", "gum-itching", "gum-tenderness", "root-exposure"],
  },
  {
    icon: Eye,
    title: "Mouth Sores & Spots",
    description: "Sores that won't heal, white or red patches, bumps on your tongue, or painful ulcers inside your cheeks or lips.",
    keywords: ["mouth sores that won't heal", "white spot on gum", "canker sore vs cold sore", "bumps on tongue"],
    symptoms: ["mouth-sores", "mouth-ulcers", "canker-sores", "oral-thrush", "aphthous-ulcers", "leukoplakia", "oral-lichen-planus", "cheek-biting"],
  },
  {
    icon: AlertTriangle,
    title: "Bad Breath & Taste Changes",
    description: "Breath that stays bad no matter how much you brush, or a metallic or sour taste that won't go away.",
    keywords: ["bad breath causes", "metallic taste in mouth", "why does my breath smell", "persistent bad taste"],
    symptoms: ["bad-breath", "dry-mouth", "persistent-metallic-taste"],
  },
  {
    icon: Clock,
    title: "Jaw & Face Pain",
    description: "Pain on one side of your jaw, clicking or popping when you open your mouth, headaches from clenching, or facial swelling.",
    keywords: ["jaw pain one side", "TMJ symptoms", "jaw clicking when chewing", "teeth grinding at night"],
    symptoms: ["jaw-pain", "jaw-clicking", "tmj-disorder", "teeth-grinding", "facial-swelling", "swollen-lymph-nodes-dental"],
  },
  {
    icon: Search,
    title: "Tooth Changes & Movement",
    description: "Teeth that look darker or yellow, a tooth that feels loose, gaps that weren't there before, or a bite that feels off.",
    keywords: ["tooth turning dark", "loose tooth adult", "teeth shifting", "tooth discoloration causes"],
    symptoms: ["tooth-discoloration", "loose-tooth", "tooth-staining", "tooth-migration", "bite-changes", "mouth-numbness"],
  },
];

// Urgency guide data
const urgencyLevels = [
  {
    level: "Seek urgent professional care",
    color: "bg-red-500",
    textColor: "text-red-700",
    bgColor: "bg-red-50",
    signs: ["Severe, constant tooth pain that keeps you awake", "Facial swelling near your jaw or eye", "Bleeding that won't stop after 20 minutes", "A knocked-out or broken tooth from an injury"],
  },
  {
    level: "Arrange a dental appointment promptly",
    color: "bg-amber-500",
    textColor: "text-amber-700",
    bgColor: "bg-amber-50",
    signs: ["Pain when biting or chewing that's getting worse", "Gums bleeding every time you brush", "A sore in your mouth that's lasted more than 2 weeks", "A tooth that feels loose or wiggly"],
  },
  {
    level: "Plan a dental checkup",
    color: "bg-green-500",
    textColor: "text-green-700",
    bgColor: "bg-green-50",
    signs: ["Mild sensitivity to hot or cold drinks", "Gums that bleed once in a while", "Bad breath that doesn't go away with brushing", "Teeth that look more yellow than they used to"],
  },
];

// FAQ data
const faqs = [
  {
    q: "Why does my tooth hurt when I bite down?",
    a: "Pain when biting can have several causes, including a cracked tooth, decay, a filling issue, or inflammation near the root. If the pain repeats or gets worse, arrange a dental examination promptly. Avoid chewing hard foods on the painful side until you receive professional guidance.",
  },
  {
    q: "What does it mean when my gums bleed while brushing?",
    a: "Occasional bleeding can happen after a change in brushing or flossing. Repeated bleeding may be associated with gum inflammation, including gingivitis, and should be discussed with a dental professional. Gentle brushing, daily flossing, and a professional cleaning may be part of the care plan.",
  },
  {
    q: "Should I go to the ER for a toothache?",
    a: "Seek emergency care for trouble breathing or swallowing, swelling that is spreading toward the eye or throat, or other severe symptoms. For tooth pain without those emergency signs, contact a dentist or urgent dental service for professional guidance.",
  },
  {
    q: "Why are my teeth suddenly sensitive to cold?",
    a: "Cold sensitivity can be related to enamel wear, gum recession, whitening products, acidic foods, grinding, decay, or other causes. A sensitivity toothpaste may help some people. If sensitivity persists, worsens, or affects one tooth repeatedly, arrange a dental examination.",
  },
  {
    q: "Can I treat a dental symptom at home?",
    a: "Some symptoms respond to home care. Saltwater rinses help with mild gum swelling. Sensitivity toothpaste can reduce cold sensitivity. Over-the-counter pain relievers work for mild toothaches. But home care is a bridge, not a fix. If any symptom lasts more than a week or gets worse, you need a dentist.",
  },
  {
    q: "How do I know if my symptom is serious?",
    a: "Pain that wakes you, facial or jaw swelling, uncontrolled bleeding, trouble breathing or swallowing, or symptoms that are getting worse need prompt professional attention. DentaSmart's free symptom quiz can help you record what you notice, but it does not determine urgency or provide a diagnosis.",
  },
];

// Build a map of symptom slugs to symptom data for quick lookup
const symptomsMap: Record<string, typeof symptomsList[0]> = {};
symptomsList.forEach(s => { symptomsMap[s.slug] = s; });

export default function SymptomsHub() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black selection:bg-primary/20">
      <SEO
        title="Dental Symptoms: What Your Mouth Says | DentaSmart"
        description="Learn about common dental symptoms, warning signs for professional care, and ways to record what you notice. Includes a free educational symptom quiz."
        canonical="https://dentasmart.ai/oral-health-hub/symptoms"
        keywords="dental symptoms, why does my tooth hurt, bleeding gums causes, tooth pain when biting, sensitive teeth, jaw pain, bad breath causes, swollen gums, mouth sores, TMJ symptoms"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "name": "Dental Symptoms Guide: What Your Mouth Is Telling You",
          "description": "A plain-language guide to common dental symptoms, what they mean, when to see a dentist, and how DentaSmart can help you understand your oral health.",
          "url": "https://dentasmart.ai/oral-health-hub/symptoms",
          "publisher": {
            "@type": "Organization",
            "name": "DentaSmart",
            "url": "https://dentasmart.ai"
          },
          "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dentasmart.ai" },
              { "@type": "ListItem", "position": 2, "name": "Oral Health Hub", "item": "https://dentasmart.ai/oral-health-hub" },
              { "@type": "ListItem", "position": 3, "name": "Symptoms Guide", "item": "https://dentasmart.ai/oral-health-hub/symptoms" }
            ]
          }
        }}
      />
      <Navigation />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden bg-white">
        <div className="container relative z-10 px-4 mx-auto max-w-6xl pt-40 pb-10 md:pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 bg-action/10 text-action text-xs font-medium px-3 py-1.5 rounded-full mb-4">
                <Thermometer className="w-3.5 h-3.5" /> Symptom Guide
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-4 leading-tight text-left">
                What is your mouth <br />
                <span className="italic text-action">trying to tell you?</span>
              </h1>
              <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-xl text-left mb-6">
                Tooth pain, bleeding gums, or a sore that will not heal can be hard to describe. This guide helps you organize what you notice, recognize warning signs, and prepare for the next conversation with a dentist.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/symptom-quiz/"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-action px-8 py-3 text-base font-medium text-action-foreground transition-all hover:scale-105 hover:bg-action-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring w-full sm:w-auto"
                >
                  Check Your Symptoms Free <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <a
                  href="#symptom-categories"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-action/30 px-8 py-3 text-base font-medium text-action transition-colors hover:bg-action/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring w-full sm:w-auto"
                >
                  Browse by Symptom
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="bg-stone-50 rounded-2xl p-5 border border-stone-100">
                <p className="text-base font-medium text-black mb-3 flex items-center gap-2 text-left">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Quick: How urgent is it?
                </p>
                {urgencyLevels.map((level, idx) => (
                  <div key={idx} className={`${level.bgColor} rounded-xl p-3 mb-2 last:mb-0`}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className={`w-2.5 h-2.5 rounded-full ${level.color}`} />
                      <span className={`text-sm font-medium ${level.textColor}`}>{level.level}</span>
                    </div>
                    <ul className="space-y-1 ml-5">
                      {level.signs.slice(0, 2).map((sign, i) => (
                        <li key={i} className="text-xs text-stone-600 font-light">{sign}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="mt-3 pt-3 border-t border-stone-200 text-center">
                  <p className="text-xs text-stone-500 font-light">Not sure? <span className="font-medium text-primary">Take the free symptom quiz.</span></p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ STATS STRIP ═══ */}
      <section className="py-6 bg-action text-action-foreground">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            {[
              { value: "Pain", label: "Track Where and When It Happens" },
              { value: "Gums", label: "Notice Bleeding, Swelling, or Color Changes" },
              { value: "Jaw", label: "Record Clicking, Stiffness, or Limited Motion" },
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl md:text-4xl font-normal text-black mb-4 leading-tight text-left">
                You Google your symptoms. <br />
                <span className="italic text-primary">You get 50 different answers.</span>
              </h2>
              <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed mb-4 text-left">
                Your tooth hurts. You search "why does my tooth hurt" and find everything from "it's nothing" to "you need a root canal." Some articles say wait it out. Others say go to the ER. None of them know your situation.
              </p>
              <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed text-left">
                Search results cannot examine you or account for your full history. You deserve a clearer way to describe your symptoms and recognize when professional or urgent care may be needed.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* Full urgency guide card for desktop, visible on mobile too */}
              <div className="bg-stone-50 rounded-2xl p-5 md:p-6 border border-stone-100">
                <h3 className="text-lg font-medium text-black mb-4 flex items-center gap-2 text-left">
                  <Clock className="w-5 h-5 text-primary" /> When should you see a dentist?
                </h3>
                <div className="space-y-3">
                  {urgencyLevels.map((level, idx) => (
                    <div key={idx} className={`${level.bgColor} rounded-xl p-4`}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${level.color}`} />
                        <span className={`text-sm font-semibold ${level.textColor}`}>{level.level}</span>
                      </div>
                      <ul className="space-y-1.5 ml-5">
                        {level.signs.map((sign, i) => (
                          <li key={i} className="text-sm text-stone-600 font-light list-disc">{sign}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ SYMPTOM CATEGORIES ═══ */}
      <section id="symptom-categories" className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2 text-left">
              Find your symptom
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl text-left">
              Pick the category that matches what you're feeling. Each symptom page explains what it could mean, what to try at home, and when it's time to call a dentist.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {symptomCategories.map((cat, idx) => (
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
                <p className="text-stone-600 font-light text-sm leading-relaxed mb-2 text-left">{cat.description}</p>
                <div className="mb-3">
                  <p className="text-xs text-stone-500 font-medium mb-1.5">People also search:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.keywords.slice(0, 3).map((kw, i) => (
                      <span key={i} className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">"{kw}"</span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  {cat.symptoms.slice(0, 4).map(slug => {
                    const symptom = symptomsMap[slug];
                    if (!symptom) return null;
                    return (
                      <Link key={slug} href={`/symptoms/${slug}/`}>
                        <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-stone-50 hover:bg-primary/5 transition-colors cursor-pointer group">
                          <span className="text-sm font-medium text-stone-700 group-hover:text-primary transition-colors">
                            {symptom.primaryKeyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                          </span>
                          <ArrowRight className="w-3 h-3 text-stone-400 group-hover:text-primary transition-colors" />
                        </div>
                      </Link>
                    );
                  })}
                  {cat.symptoms.length > 4 && (
                    <p className="text-xs text-stone-400 text-center pt-1">+{cat.symptoms.length - 4} more symptoms</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW DENTASMART HELPS ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2 text-left">
              Stop guessing. <span className="italic text-primary">Organize what you notice.</span>
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl text-left">
              DentaSmart can help you describe symptoms and prepare questions. It does not diagnose conditions or replace a dentist.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: Smartphone,
                title: "Describe or photograph it",
                desc: "Use the free symptom quiz to record where it hurts, when it started, and what makes it better or worse.",
              },
              {
                icon: Search,
                title: "Review common patterns",
                desc: "See plain-language educational context and warning signs that can help you prepare for professional care.",
              },
              {
                icon: Shield,
                title: "Prepare your next step",
                desc: "Use the result to organize questions. A licensed dentist is needed for diagnosis and treatment decisions.",
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
            <Link href="/symptom-quiz/">
              <Button size="lg" className="bg-action text-action-foreground hover:bg-action-hover rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 w-full sm:w-auto">
                Start Free Symptom Quiz <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ ALL SYMPTOMS LIST ═══ */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-6">
            <h2 className="text-2xl md:text-3xl font-medium text-black text-left">All symptoms we cover</h2>
            <p className="text-stone-600 font-light mt-1 text-sm md:text-base text-left">
              Each page explains what the symptom means, common causes, home care tips, and when to see a dentist.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {symptomsList.map((symptom, idx) => (
              <Link key={symptom.slug} href={`/symptoms/${symptom.slug}/`}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(idx * 0.05, 0.4), duration: 0.4 }}
                  className="bg-white rounded-xl p-4 border border-stone-100 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer h-full"
                >
                  <h3 className="text-base font-medium text-black mb-1 text-left">
                    {symptom.primaryKeyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </h3>
                  <p className="text-stone-500 font-light text-xs leading-relaxed line-clamp-2 mb-2 text-left">
                    {symptom.heroSubheading}
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
              Common questions about dental symptoms
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
            <Link href="/oral-health-hub/conditions/">
              <span className="inline-flex items-center gap-2 bg-white px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Conditions Guide <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/dental-costs/">
              <span className="inline-flex items-center gap-2 bg-white px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Cost Guide <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/treatments/">
              <span className="inline-flex items-center gap-2 bg-white px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Treatment Guide <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/oral-health-hub/affordability/">
              <span className="inline-flex items-center gap-2 bg-white px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Affordability Guide <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/oral-health-hub/second-opinion/">
              <span className="inline-flex items-center gap-2 bg-white px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Second Opinion Hub <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/oral-health-hub/prevention/">
              <span className="inline-flex items-center gap-2 bg-white px-3 md:px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-xs md:text-sm">
                Prevention Hub <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/symptom-quiz/">
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
              Describe your symptoms clearly
            </h2>
            <p className="text-base md:text-lg text-stone-300 font-light mb-6 max-w-2xl mx-auto">
              Start with the free symptom quiz, or explore DentaSmart's paid checks and plans when you need help organizing supported information.
            </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/symptom-quiz/">
                <Button size="lg" className="bg-action text-action-foreground hover:bg-action-hover rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 w-full sm:w-auto">
                  Start Free Symptom Quiz
                </Button>
              </Link>
              <Link href="/pricing/">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-medium cursor-pointer w-full sm:w-auto">
                  View DentaSmart Options
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
