import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { conditionsList } from "@/data/conditions";

export default function ConditionsIndex() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black">
      <SEO
        title="Dental Conditions Explained | DentaSmart"
        description="Understand common dental conditions like toothaches, cavities, gum disease, and more. Clear, simple explanations to help you take control of your oral health."
        canonical="https://dentasmart.ai/conditions"
        keywords="dental conditions, toothache, cavities, gum disease, teeth whitening, wisdom teeth"
      />
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">
        <div className="container relative z-10 px-4 mx-auto max-w-5xl pt-40 pb-12 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4 leading-tight text-left">
              Dental Conditions
            </h1>
            <p className="text-xl text-stone-300 font-light leading-relaxed max-w-2xl text-left">
              Clear, simple explanations of common dental conditions. Understand what is happening in your mouth so you can make confident decisions about your care.
            </p>
            <div className="mt-6">
              <Link href="/instant-scan">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer">
                  Check Your Oral Health Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Conditions Grid */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {conditionsList.map((condition, idx) => (
              <Link key={condition.slug} href={`/conditions/${condition.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="bg-stone-50 rounded-2xl p-6 border border-stone-100 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer h-full"
                >
                  <h2 className="text-xl font-medium text-black mb-2">{condition.primaryKeyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</h2>
                  <p className="text-stone-600 font-light text-base leading-relaxed line-clamp-3 mb-4">
                    {condition.heroSubheading}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary text-base font-medium">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 bg-primary text-white">
        <div className="container px-4 mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-normal mb-3 text-white">Not sure what is going on?</h2>
          <p className="text-white/80 font-light mb-6">Upload a photo and let DentaSmart help you understand your oral health.</p>
          <Link href="/instant-scan">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer">
              Try Instant Scan
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
