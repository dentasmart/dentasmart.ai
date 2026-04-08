import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Cigarette, Heart, Apple, Shield, Sparkles } from "lucide-react";
import { Link } from "wouter";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const lifestylePages = [
  {
    title: "Smoking & Oral Health",
    description: "Smoking doubles your risk of gum disease and slows healing after dental work. Learn how tobacco affects your mouth and what you can do about it.",
    slug: "smoking-and-oral-health",
    icon: Cigarette,
    tag: "High Impact",
    tagColor: "bg-red-100 text-red-700",
  },
  {
    title: "Diabetes & Dental Care",
    description: "Diabetes and gum disease feed off each other. Managing one helps control the other. Here is what every diabetic patient should know about oral health.",
    slug: "diabetes-and-dental-care",
    icon: Heart,
    tag: "Medical Link",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    title: "Diet & Your Teeth",
    description: "What you eat matters as much as how you brush. Some foods strengthen enamel while others wear it down. Get the facts on diet and dental health.",
    slug: "diet-and-teeth",
    icon: Apple,
    tag: "Daily Habits",
    tagColor: "bg-green-100 text-green-700",
  },
  {
    title: "Sports Mouthguards",
    description: "Over 5 million teeth are knocked out each year in sports. A custom mouthguard costs less than a single dental implant. Learn your options.",
    slug: "sports-mouthguards",
    icon: Shield,
    tag: "Prevention",
    tagColor: "bg-amber-100 text-amber-700",
  },
  {
    title: "Oral Piercing Risks",
    description: "Tongue and lip piercings can chip teeth, cause gum recession, and lead to infections. Know the risks before you commit and how to minimize damage.",
    slug: "oral-piercing-risks",
    icon: Sparkles,
    tag: "Awareness",
    tagColor: "bg-purple-100 text-purple-700",
  },
];

const faqs = [
  {
    q: "Which lifestyle factor has the biggest impact on oral health?",
    a: "Smoking is the single biggest lifestyle risk factor for gum disease and oral cancer. It reduces blood flow to the gums, slows healing, and weakens your immune response. Quitting smoking is the most impactful change you can make for your oral health.",
  },
  {
    q: "Can my diet really affect my teeth?",
    a: "Absolutely. Sugary and acidic foods feed the bacteria that cause cavities and erode enamel. On the other hand, foods rich in calcium, phosphorus, and vitamin D strengthen teeth. What you eat, how often you snack, and even the order you eat foods all matter.",
  },
  {
    q: "Do I need a mouthguard if I only play recreational sports?",
    a: "Yes. Most dental injuries from sports happen during informal games, not organized competitions. A boil-and-bite mouthguard from a drugstore costs around $15 to $25 and provides basic protection. Custom-fitted guards from your dentist offer the best fit and protection.",
  },
  {
    q: "How does diabetes affect my teeth and gums?",
    a: "High blood sugar creates an environment where harmful bacteria thrive. People with diabetes are 2 to 3 times more likely to develop gum disease. The relationship goes both ways: severe gum disease can make it harder to control blood sugar levels.",
  },
  {
    q: "Are oral piercings really that risky for my teeth?",
    a: "Yes. Studies show that about 47% of people with tongue piercings have chipped or cracked teeth. Metal jewelry constantly clicking against enamel causes damage over time. Gum recession is also common, especially with lip piercings that rub against the gum line.",
  },
];

const canonicalUrl = "https://dentasmart.ai/lifestyle";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function LifestyleHub() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black selection:bg-primary/20">
      <SEO
        title="Lifestyle & Oral Health | How Daily Habits Affect Your Teeth"
        description="Learn how smoking, diabetes, diet, sports, and piercings affect your oral health. Practical tips to protect your teeth based on your lifestyle."
        canonical={canonicalUrl}
        keywords="lifestyle oral health, smoking teeth, diabetes gum disease, diet dental health, sports mouthguard, oral piercing risks"
        jsonLd={[faqJsonLd]}
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
              <Leaf className="w-4 h-4" /> Lifestyle & Oral Health
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-4 leading-[1.1] max-w-4xl">
              Your habits shape{" "}
              <span className="italic text-primary">your smile</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-2xl mb-8">
              Smoking, diet, medical conditions, sports, and even piercings all affect your teeth and gums. Learn how your daily choices impact your oral health and what you can do to protect your smile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/download">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 shadow-lg w-full sm:w-auto">
                  Get Your Free AI Assessment
                </Button>
              </Link>
              <a href="#guides">
                <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 rounded-full px-8 py-6 text-base font-medium cursor-pointer w-full sm:w-auto">
                  Browse Guides <ArrowRight className="w-4 h-4 ml-2" />
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
              { value: "50%", label: "of smokers have gum disease" },
              { value: "5M+", label: "teeth knocked out in sports yearly" },
              { value: "2-3x", label: "diabetes increases gum disease risk" },
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

      {/* ═══ LIFESTYLE GUIDE CARDS ═══ */}
      <section id="guides" className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              Choose your lifestyle guide
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl">
              Each guide covers how a specific habit or condition affects your teeth, what to watch for, and practical steps to protect your smile.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {lifestylePages.map((page, idx) => {
              const Icon = page.icon;
              return (
                <Link key={idx} href={`/lifestyle/${page.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="bg-white rounded-2xl p-6 border border-stone-100 hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer group h-full flex flex-col"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${page.tagColor}`}>
                        {page.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-black mb-2 group-hover:text-primary transition-colors">
                      {page.title}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed mb-4 flex-1">
                      {page.description}
                    </p>
                    <span className="text-sm text-primary font-medium inline-flex items-center gap-1">
                      Read full guide <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ KEY INSIGHT ═══ */}
      <section className="py-10 bg-stone-900 text-white">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-normal text-white mb-4">
              Your mouth is a window into your overall health
            </h2>
            <p className="text-base md:text-lg text-stone-300 font-light max-w-2xl mx-auto mb-6 leading-relaxed">
              Dentists can often spot signs of diabetes, heart disease, and nutritional deficiencies just by looking at your gums and teeth. Taking care of your oral health is not just about avoiding cavities. It is about protecting your whole body.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/20 text-sm font-medium">
                90% of systemic diseases show oral signs
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/20 text-sm font-medium">
                Prevention costs 10x less than treatment
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-3xl">
          <motion.div {...fadeUp} className="mb-6">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              Frequently asked questions
            </h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <motion.details
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="group bg-stone-50 rounded-xl border border-stone-100 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none text-base font-medium text-black hover:bg-stone-100 transition-colors">
                  {faq.q}
                  <ArrowRight className="w-4 h-4 text-stone-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
                </summary>
                <div className="px-5 pb-5 text-sm text-stone-600 leading-relaxed">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RELATED HUBS ═══ */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-6">
            <h2 className="text-2xl md:text-3xl font-normal text-black mb-1">
              Explore more resource hubs
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Prevention Hub", slug: "/prevention", tagline: "Daily habits that protect your teeth" },
              { name: "Conditions Guide", slug: "/conditions", tagline: "Understand common dental problems" },
              { name: "Treatment Guides", slug: "/treatments", tagline: "What to expect from procedures" },
            ].map((hub, idx) => (
              <Link key={idx} href={hub.slug}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="bg-white rounded-xl p-5 border border-stone-100 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group"
                >
                  <h3 className="text-base font-medium text-black mb-1 group-hover:text-primary transition-colors">{hub.name}</h3>
                  <p className="text-sm text-stone-500 mb-3">{hub.tagline}</p>
                  <span className="text-sm text-primary font-medium inline-flex items-center gap-1">
                    Visit hub <ArrowRight className="w-3 h-3" />
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
