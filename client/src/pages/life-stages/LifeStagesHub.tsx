import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Baby, Heart, Smartphone, BookOpen } from "lucide-react";
import { Link } from "wouter";

const lifeStagePages = [
  { name: "Baby Teething Guide", slug: "baby-teething-guide", ageRange: "0-3 years", icon: "👶", tagline: "What to expect when those first teeth come in" },
  { name: "Children's Dental Health", slug: "childrens-dental-health", ageRange: "3-12 years", icon: "🧒", tagline: "Building healthy habits from the start" },
  { name: "Teen Braces Guide", slug: "teen-braces-guide", ageRange: "12-18 years", icon: "😁", tagline: "Everything teens and parents need to know about braces" },
  { name: "Pregnancy Dental Care", slug: "pregnancy-dental-care", ageRange: "Expecting mothers", icon: "🤰", tagline: "Why dental care matters more during pregnancy" },
  { name: "Senior Dental Care", slug: "senior-dental-care", ageRange: "60+ years", icon: "👴", tagline: "Keeping your smile strong as you age" },
];

const faqs = [
  {
    q: "When should my child first see a dentist?",
    a: "The American Academy of Pediatric Dentistry recommends a first dental visit by age 1 or within 6 months of the first tooth appearing. Early visits help catch problems before they become painful or expensive, and they help your child get comfortable with dental visits.",
  },
  {
    q: "Is dental care safe during pregnancy?",
    a: "Yes, dental care during pregnancy is not only safe but recommended. Hormonal changes during pregnancy increase the risk of gum disease, which has been linked to preterm birth and low birth weight. Routine cleanings, fillings, and even some X-rays (with proper shielding) are considered safe during pregnancy.",
  },
  {
    q: "Do seniors need to see the dentist more often?",
    a: "Many dentists recommend seniors visit every 3-4 months instead of every 6 months. Aging brings increased risk of dry mouth, gum disease, root decay, and oral cancer. More frequent visits help catch these issues early when they are easier and less expensive to treat.",
  },
  {
    q: "What age do kids usually get braces?",
    a: "Most children get braces between ages 10 and 14, when most permanent teeth have come in but the jaw is still growing. However, the American Association of Orthodontists recommends an initial evaluation by age 7 to catch issues early. Some children benefit from early (Phase 1) treatment starting around age 7-8.",
  },
  {
    q: "How can I help my teething baby?",
    a: "Gently rub your baby's gums with a clean finger or cool, damp washcloth. Chilled (not frozen) teething rings can help. Avoid teething tablets and gels with benzocaine for children under 2. If your baby seems very uncomfortable, ask your pediatrician about infant acetaminophen or ibuprofen for babies over 6 months.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function LifeStagesHub() {
  const canonicalUrl = "https://dentasmart.ai/life-stages";

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
      { "@type": "ListItem", position: 2, name: "Life Stages", item: canonicalUrl },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black selection:bg-primary/20">
      <SEO
        title="Dental Care by Age: Life Stages Guide | DentaSmart"
        description="Age-specific dental care guides for babies, children, teens, pregnant women, and seniors. Know what to expect and how to protect your smile at every stage of life."
        canonical={canonicalUrl}
        keywords="dental care by age, children dental health, teen braces, pregnancy dental care, senior dental care, baby teething"
        jsonLd={[faqJsonLd, breadcrumbJsonLd]}
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
              <Baby className="w-4 h-4" /> Life Stages
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-4 leading-[1.1] max-w-4xl">
              Dental care for{" "}
              <span className="italic text-primary">every age.</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-2xl mb-8">
              Your mouth changes at every stage of life. From baby teeth to dentures, here is what to watch for and how to stay ahead of problems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/download/">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 shadow-lg w-full sm:w-auto">
                  Download the App
                </Button>
              </Link>
              <Link href="/symptom-quiz/">
                <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 rounded-full px-8 py-6 text-base font-medium cursor-pointer w-full sm:w-auto">
                  Try Free Symptom Check <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-6 bg-primary text-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            {[
              { value: "42%", label: "of children have cavities by age 11" },
              { value: "60-75%", label: "of pregnant women have gingivitis" },
              { value: "68%", label: "of adults 65+ have gum disease" },
            ].map((stat, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15 }} className="py-3 md:py-0">
                <div className="text-3xl md:text-5xl font-normal tracking-tighter text-white">{stat.value}</div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/80 font-medium mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LIFE STAGE CARDS ═══ */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">Choose your life stage</h2>
            <p className="text-base md:text-lg text-stone-600 font-light">Each guide is tailored to the dental needs and concerns of that age group.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lifeStagePages.map((page, idx) => (
              <Link key={idx} href={`/life-stages/${page.slug}/`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="bg-stone-50 rounded-2xl p-6 border border-stone-100 hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer group h-full"
                >
                  <div className="text-4xl mb-4">{page.icon}</div>
                  <div className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full mb-3">{page.ageRange}</div>
                  <h3 className="text-xl font-medium text-black mb-2 group-hover:text-primary transition-colors">{page.name}</h3>
                  <p className="text-sm text-stone-600 font-light mb-4">{page.tagline}</p>
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-medium">
                    Read guide <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">Frequently asked questions</h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-xl border border-stone-100 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <span className="text-base font-medium text-black pr-4">{faq.q}</span>
                  <ArrowRight className="w-4 h-4 text-stone-400 transition-transform group-open:rotate-90 flex-shrink-0" />
                </summary>
                <div className="px-5 pb-5 pt-0 text-sm md:text-base text-stone-600 font-light leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RELATED HUBS ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-6">
            <h2 className="text-2xl md:text-3xl font-normal text-black">Related resource hubs</h2>
          </motion.div>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "Treatment Guides", href: "/treatments/" },
              { name: "Dental Costs", href: "/dental-costs/" },
              { name: "Conditions Guide", href: "/oral-health-hub/conditions/" },
              { name: "Prevention Hub", href: "/oral-health-hub/prevention/" },
              { name: "Comparison Guides", href: "/comparisons/" },
            ].map((hub, idx) => (
              <Link key={idx} href={hub.href}>
                <span className="inline-flex items-center gap-2 bg-stone-50 px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-sm">
                  {hub.name} <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-10 bg-stone-900 text-white">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-normal mb-3 text-white">Every age deserves a healthy smile.</h2>
            <p className="text-base md:text-lg text-stone-300 font-light mb-6 max-w-2xl mx-auto">
              The app is free to download. Use DentaSmart for educational guidance and to prepare questions for professional care at each life stage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/download/">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 w-full sm:w-auto">
                  Download the App
                </Button>
              </Link>
              <Link href="/symptom-quiz/">
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
