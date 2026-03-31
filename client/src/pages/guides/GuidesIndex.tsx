import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { guidesList } from "@/data/guides";

export default function GuidesIndex() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black">
      <SEO
        title="Oral Health Guides | DentaSmart"
        description="Step-by-step guides to better oral health. Learn how to brush, floss, and prepare for dental visits with simple, expert-reviewed instructions."
        canonical="https://dentasmart.ai/guides"
        keywords="oral health guides, how to brush teeth, how to floss, dental visit guide"
      />
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-primary/80">
        <div className="container relative z-10 px-4 mx-auto max-w-5xl pt-40 pb-12 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4 leading-tight text-left">
              Oral Health Guides
            </h1>
            <p className="text-xl text-white/80 font-light leading-relaxed max-w-2xl text-left">
              Simple, step-by-step guides to help you take better care of your teeth and gums. Expert-reviewed and easy to follow.
            </p>
            <div className="mt-6">
              <Link href="/instant-scan">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer">
                  Check Your Oral Health Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guidesList.map((guide, idx) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="bg-stone-50 rounded-2xl p-6 border border-stone-100 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer h-full"
                >
                  <div className="text-xs uppercase tracking-wider text-primary font-medium mb-3">
                    {guide.steps.length} Steps
                  </div>
                  <h2 className="text-xl font-medium text-black mb-2">{guide.primaryKeyword.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</h2>
                  <p className="text-stone-600 font-light text-base leading-relaxed line-clamp-3 mb-4">
                    {guide.heroSubheading}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary text-base font-medium">
                    Read guide <ArrowRight className="w-3 h-3" />
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 bg-stone-900 text-white">
        <div className="container px-4 mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-normal mb-3 text-white">Want personalized guidance?</h2>
          <p className="text-stone-300 font-light mb-6">DentaSmart analyzes your teeth and gums and gives you a clear plan to follow.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/instant-scan">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer">
                Try Instant Scan
              </Button>
            </Link>
            <Link href="/download">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-medium cursor-pointer">
                Download the App
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
