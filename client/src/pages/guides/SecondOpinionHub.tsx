import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Scale } from "lucide-react";
import { Link } from "wouter";
import { guidesList } from "@/data/guides";

const secondOpinionGuides = guidesList.filter(g => g.category === "second-opinion");

export default function SecondOpinionHub() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black">
      <SEO
        title="Dental Second Opinion Guide | Compare Treatment Options | DentaSmart"
        description="Not sure about your dentist's recommendation? Get clarity on root canals, crowns vs fillings, implants vs bridges, and when to seek a second opinion."
        canonical="https://dentasmart.ai/oral-health-hub/second-opinion"
        keywords="dental second opinion, do I need a root canal, crowns vs fillings, implants vs bridges"
      />
      <Navigation />

      {/* Hero */}
      <section className="relative flex items-center overflow-hidden bg-gradient-to-br from-white via-accent/5 to-primary/5">
        <div className="container relative z-10 px-4 mx-auto max-w-5xl pt-40 pb-12 md:pt-36 md:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-6">
              <Scale className="w-4 h-4" /> Second Opinion Hub
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-4 leading-[1.1] text-left max-w-4xl">
              Your Dentist Said You Need What?
            </h1>
            <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-2xl text-left">
              Before you commit to expensive dental work, get the full picture. These guides help you understand your options and ask the right questions.
            </p>
            <div className="mt-6">
              <Link href="/download">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 shadow-lg">
                  Upload Your X-Rays for a Second Look
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto max-w-5xl">
          <h2 className="text-2xl font-medium text-black mb-8">Treatment Comparison Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {secondOpinionGuides.map((guide, idx) => (
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
                  <h3 className="text-xl font-medium text-black mb-2">{guide.title}</h3>
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

      {/* Related Hubs */}
      <section className="py-8 bg-stone-50">
        <div className="container px-4 mx-auto max-w-5xl">
          <h2 className="text-xl font-medium text-black mb-4">Related Resource Hubs</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/oral-health-hub/affordability">
              <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-sm">
                Affordability Hub <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/oral-health-hub/prevention">
              <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-sm">
                Prevention Hub <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/oral-health-hub/conditions">
              <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-sm">
                Conditions Guide <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link href="/oral-health-hub/symptoms">
              <span className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 text-stone-700 hover:border-primary/30 transition-colors cursor-pointer text-sm">
                Symptoms Guide <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 bg-stone-900 text-white">
        <div className="container px-4 mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-normal mb-3 text-white">Get clarity before you commit</h2>
          <p className="text-stone-300 font-light mb-6">Upload your X-rays to DentaSmart and get an AI-powered second look at your treatment plan.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/download">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer">
                Download the App
              </Button>
            </Link>
            <Link href="/guides">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-medium cursor-pointer">
                Browse All Guides
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
