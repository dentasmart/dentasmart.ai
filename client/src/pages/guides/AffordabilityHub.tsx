import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, DollarSign } from "lucide-react";
import { Link } from "wouter";
import { guidesList } from "@/data/guides";

const affordabilityGuides = guidesList.filter(g => g.category === "affordability");

export default function AffordabilityHub() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black">
      <SEO
        title="Affordable Dental Care Guide | Save Money on Dental Work | DentaSmart"
        description="Find affordable dental care options, insurance alternatives, and smart ways to prevent expensive dental problems. Practical guides for every budget."
        canonical="https://dentasmart.ai/hub/affordability"
        keywords="affordable dental care, cheap dental care, dental insurance alternatives, save money on dental work"
      />
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600">
        <div className="container relative z-10 px-4 mx-auto max-w-5xl pt-32 pb-12 md:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm font-medium mb-6">
              <DollarSign className="w-4 h-4" /> Affordability Hub
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4 leading-tight text-left">
              Dental Care Doesn't Have to Break the Bank
            </h1>
            <p className="text-xl text-white/80 font-light leading-relaxed max-w-2xl text-left">
              Real options for real budgets. Whether you're uninsured, underinsured, or just trying to spend smarter, these guides show you how.
            </p>
            <div className="mt-6">
              <Link href="/download">
                <Button size="lg" className="bg-white text-emerald-700 hover:bg-white/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer">
                  Get Your Free Oral Health Score
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto max-w-5xl">
          <h2 className="text-2xl font-medium text-black mb-8">Affordability Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {affordabilityGuides.map((guide, idx) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="bg-stone-50 rounded-2xl p-6 border border-stone-100 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer h-full"
                >
                  <div className="text-xs uppercase tracking-wider text-emerald-600 font-medium mb-3">
                    {guide.steps.length} Steps
                  </div>
                  <h3 className="text-xl font-medium text-black mb-2">{guide.title}</h3>
                  <p className="text-stone-600 font-light text-base leading-relaxed line-clamp-3 mb-4">
                    {guide.heroSubheading}
                  </p>
                  <span className="inline-flex items-center gap-2 text-emerald-600 text-base font-medium">
                    Read guide <ArrowRight className="w-3 h-3" />
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Hubs */}
      <section className="py-8 bg-stone-50">
        <div className="container px-4 mx-auto max-w-5xl">
          <h2 className="text-xl font-medium text-black mb-4">Related Resource Hubs</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/hub/second-opinion">
              <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-sm">
                Second Opinion Hub <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/hub/prevention">
              <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-sm">
                Prevention Hub <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/guides">
              <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-sm">
                All Guides <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 bg-stone-900 text-white">
        <div className="container px-4 mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-normal mb-3 text-white">Stop guessing about costs</h2>
          <p className="text-stone-300 font-light mb-6">DentaSmart helps you understand what's going on in your mouth so you can make smarter spending decisions.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/download">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer">
                Download the App
              </Button>
            </Link>
            <Link href="/conditions">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-medium cursor-pointer">
                Browse Conditions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
