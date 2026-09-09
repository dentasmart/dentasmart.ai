import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Zap, AlertTriangle, Clock, Smartphone } from "lucide-react";
import { Link } from "wouter";

const emergencyPages = [
  { name: "Knocked Out Tooth", slug: "knocked-out-tooth", icon: "🦷", urgency: "Act within 30 min", tagline: "What to do when a tooth gets knocked out completely" },
  { name: "Dental Emergency Guide", slug: "dental-emergency-guide", icon: "🚨", urgency: "Varies", tagline: "How to tell if your dental problem is a real emergency" },
  { name: "Broken Tooth", slug: "broken-tooth", icon: "💥", urgency: "See dentist same day", tagline: "First aid steps for a cracked, chipped, or broken tooth" },
  { name: "Severe Toothache", slug: "severe-toothache", icon: "😣", urgency: "See dentist within 24h", tagline: "When tooth pain means something serious is happening" },
  { name: "Dental Abscess", slug: "dental-abscess", icon: "⚠️", urgency: "Seek care immediately", tagline: "Why a dental abscess can become a medical emergency" },
];

const faqs = [
  {
    q: "What counts as a dental emergency?",
    a: "A dental emergency is any situation involving uncontrolled bleeding, severe pain that does not respond to over-the-counter painkillers, a knocked-out permanent tooth, a broken jaw, or swelling that is spreading to your eye, neck, or floor of your mouth. If you are unsure, call your dentist or go to an emergency room.",
  },
  {
    q: "Should I go to the ER or a dentist for a dental emergency?",
    a: "Go to the ER if you have uncontrolled bleeding, facial swelling that affects breathing or swallowing, a broken jaw, or signs of a spreading infection (fever, difficulty opening your mouth). For most other dental emergencies like a knocked-out tooth, broken tooth, or severe toothache, an emergency dentist is a better choice because ERs typically cannot perform dental procedures.",
  },
  {
    q: "How much does emergency dental care cost?",
    a: "Emergency dental visits typically cost $100-$300 for the exam and initial treatment. The total cost depends on what is needed: a simple extraction runs $150-$500, root canal $700-$1,500, and a crown $800-$2,500. Many emergency dentists offer payment plans. If you go to an ER, expect $200-$1,000 just for the visit, plus they usually only prescribe antibiotics and painkillers without fixing the actual problem.",
  },
  {
    q: "Can I save a knocked-out tooth?",
    a: "Yes, if you act within 30 minutes. Pick up the tooth by the crown (the white part), never the root. If it is dirty, gently rinse with milk or saline. Try to place it back in the socket and hold it there. If you cannot replant it, keep it in a glass of milk or between your cheek and gum. Get to a dentist immediately. The chances of saving the tooth drop significantly after 60 minutes.",
  },
  {
    q: "What should I do for a toothache at night?",
    a: "Take ibuprofen (Advil) for pain and inflammation. Rinse with warm salt water. Apply a cold compress to the outside of your cheek for 15 minutes on, 15 minutes off. Keep your head elevated when lying down. Avoid hot, cold, or sweet foods. If the pain is severe and not responding to medication, or if you have swelling or fever, go to an emergency room.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function DentalEmergenciesHub() {
  const canonicalUrl = "https://dentasmart.ai/dental-emergencies";

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
      { "@type": "ListItem", position: 2, name: "Dental Emergencies", item: canonicalUrl },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black selection:bg-primary/20">
      <SEO
        title="Dental Emergency Guide: What to Do Right Now | DentaSmart"
        description="Step-by-step guides for dental emergencies: knocked out tooth, broken tooth, severe toothache, dental abscess. Know what to do before you get to the dentist."
        canonical={canonicalUrl}
        keywords="dental emergency, knocked out tooth, broken tooth, severe toothache, dental abscess, emergency dentist"
        jsonLd={[faqJsonLd, breadcrumbJsonLd]}
      />
      <Navigation />

      {/* ═══ URGENCY BANNER ═══ */}
      <div className="bg-red-600 text-white py-2 mt-16 md:mt-20">
        <div className="container px-4 mx-auto max-w-6xl flex items-center justify-center gap-2 text-sm font-medium">
          <Phone className="w-4 h-4" />
          <span>If you are having trouble breathing or swallowing, call 911 immediately.</span>
        </div>
      </div>

      {/* ═══ HERO ═══ */}
      <section className="relative flex items-center overflow-hidden bg-gradient-to-br from-red-50 via-white to-primary/5">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-20 right-20 w-96 h-96 bg-red-100/50 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 px-4 mx-auto max-w-6xl pt-12 pb-12 md:pt-14 md:pb-14">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full text-red-700 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" /> Emergency Guides
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-4 leading-[1.1] max-w-4xl">
              Dental emergency?{" "}
              <span className="italic text-red-600">Here is what to do.</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-2xl mb-8">
              When something goes wrong with your teeth, every minute counts. These guides walk you through exactly what to do right now, step by step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#emergencies">
                <Button size="lg" className="bg-red-600 text-white hover:bg-red-700 rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 shadow-lg w-full sm:w-auto">
                  Find Your Emergency
                </Button>
              </a>
              <Link href="/symptom-quiz/">
                <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 rounded-full px-8 py-6 text-base font-medium cursor-pointer w-full sm:w-auto">
                  Free Symptom Check <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-6 bg-stone-900 text-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            {[
              { value: "2M+", label: "dental ER visits per year in the US" },
              { value: "30 min", label: "window to save a knocked-out tooth" },
              { value: "$100-$300", label: "typical emergency dental visit cost" },
            ].map((stat, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15 }} className="py-3 md:py-0">
                <div className="text-3xl md:text-5xl font-normal tracking-tighter text-white">{stat.value}</div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/80 font-medium mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EMERGENCY CARDS ═══ */}
      <section id="emergencies" className="py-12 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">What happened?</h2>
            <p className="text-base md:text-lg text-stone-600 font-light">Select your emergency for step-by-step instructions.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyPages.map((page, idx) => (
              <Link key={idx} href={`/dental-emergencies/${page.slug}/`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="bg-stone-50 rounded-2xl p-6 border border-stone-100 hover:border-red-200 hover:shadow-lg transition-all cursor-pointer group h-full"
                >
                  <div className="text-4xl mb-4">{page.icon}</div>
                  <div className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-medium px-3 py-1 rounded-full mb-3">
                    <Clock className="w-3 h-3" /> {page.urgency}
                  </div>
                  <h3 className="text-xl font-medium text-black mb-2 group-hover:text-red-600 transition-colors">{page.name}</h3>
                  <p className="text-sm text-stone-600 font-light mb-4">{page.tagline}</p>
                  <span className="inline-flex items-center gap-1 text-red-600 text-sm font-medium">
                    See what to do <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ QUICK TRIAGE ═══ */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div {...fadeUp} className="mb-6">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">Quick triage: ER or dentist?</h2>
            <p className="text-base md:text-lg text-stone-600 font-light">Not sure where to go? Use this quick guide.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
              <h3 className="text-lg font-medium text-red-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Go to the ER
              </h3>
              <div className="space-y-3">
                {[
                  "Uncontrolled bleeding that will not stop",
                  "Facial swelling affecting breathing or swallowing",
                  "Broken or dislocated jaw",
                  "High fever with facial swelling",
                  "Swelling spreading to eye or neck",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-red-800">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
              <h3 className="text-lg font-medium text-primary mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5" /> Call an emergency dentist
              </h3>
              <div className="space-y-3">
                {[
                  "Knocked-out tooth (within 30 minutes)",
                  "Broken or cracked tooth",
                  "Severe toothache not relieved by medication",
                  "Lost filling or crown",
                  "Dental abscess (swelling near tooth)",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-stone-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">Frequently asked questions</h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-stone-50 rounded-xl border border-stone-100 overflow-hidden">
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
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-6">
            <h2 className="text-2xl md:text-3xl font-normal text-black">Related resource hubs</h2>
          </motion.div>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "Symptoms Guide", href: "/oral-health-hub/symptoms/" },
              { name: "Treatment Guides", href: "/treatments/" },
              { name: "Dental Costs", href: "/dental-costs/" },
              { name: "Conditions Guide", href: "/oral-health-hub/conditions/" },
              { name: "Symptom Checker", href: "/symptom-quiz/" },
            ].map((hub, idx) => (
              <Link key={idx} href={hub.href}>
                <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-sm">
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
            <h2 className="text-3xl md:text-4xl font-normal mb-3 text-white">Don't wait when it hurts.</h2>
            <p className="text-base md:text-lg text-stone-300 font-light mb-6 max-w-2xl mx-auto">
              Seek professional care for severe pain, swelling, uncontrolled bleeding, trauma, fever, or trouble breathing or swallowing. DentaSmart provides education, not emergency diagnosis or triage.
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
