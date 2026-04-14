import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { DownloadSection } from "@/components/DownloadSection";
import { BlogCTABanner } from "@/components/BlogCTABanner";
import MidContentCTA from "@/components/MidContentCTA";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, ChevronDown, ChevronUp, Shield, Lightbulb, XCircle, MessageCircleQuestion } from "lucide-react";
import { Link, useRoute } from "wouter";
import { useState } from "react";
import { guidesData } from "@/data/guides";
import { aeoGuides } from "@/data/aeoContent";
import { breadcrumbSchema, howToSchema, faqPageSchema } from "@/lib/schema";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-stone-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-stone-50 transition-colors cursor-pointer"
      >
        <span className="font-medium text-black pr-4">{question}</span>
        {open ? <ChevronUp className="w-5 h-5 text-stone-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-stone-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5 text-stone-600 font-light leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function GuidePage() {
  const [, params] = useRoute("/guides/:slug");
  const slug = params?.slug || "";
  const guide = slug ? guidesData[slug] : null;
  const aeo = slug ? aeoGuides[slug] : null;

  if (!guide) {
    return (
      <div className="min-h-screen flex flex-col bg-background font-sans text-black">
        <Navigation />
        <div className="flex-1 flex items-center justify-center pt-32">
          <div className="text-center">
            <h1 className="text-3xl font-medium text-black mb-4">Guide Not Found</h1>
            <p className="text-stone-600 mb-6">The guide you are looking for does not exist.</p>
            <Link href="/guides">
              <Button variant="outline" className="rounded-full cursor-pointer">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Browse All Guides
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black">
      <SEO
        title={guide.metaTitle}
        description={guide.metaDescription}
        canonical={`https://dentasmart.ai/guides/${guide.slug}`}
        keywords={[guide.primaryKeyword, ...guide.secondaryKeywords].join(", ")}
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Guides", url: "/guides" },
            { name: guide.title, url: `/guides/${guide.slug}` },
          ]),
          howToSchema({
            name: guide.title,
            description: guide.metaDescription,
            steps: guide.steps.map(s => ({ title: s.title, description: s.content })),
          }),
          faqPageSchema(guide.faqs),
        ]}
      />
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-primary/80">
        <div className="container relative z-10 px-4 mx-auto max-w-5xl pt-36 pb-12 md:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/guides">
              <span className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
                All Guides
              </span>
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4 leading-tight text-left">
              {guide.heroHeading}
            </h1>
            <p className="text-xl text-white/80 font-light leading-relaxed max-w-2xl text-left">
              {guide.heroSubheading}
            </p>
            <div className="flex items-center gap-3 mt-6 text-white/60 text-sm">
              <Shield className="w-4 h-4" />
              <span>Reviewed by {guide.reviewedBy}, {guide.reviewedByCredentials}</span>
              <span className="mx-2">|</span>
              <span>Last reviewed: {new Date(guide.lastReviewed).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* In One Sentence - GEO citable micro-block */}
      {aeo && (
        <section className="py-4 bg-stone-50 border-b border-stone-200">
          <div className="container px-4 mx-auto max-w-3xl">
            <p className="text-stone-700 font-light leading-relaxed italic">
              <span className="font-medium text-stone-900 not-italic">In one sentence:</span>{" "}
              {aeo.inOneSentence}
            </p>
          </div>
        </section>
      )}

      {/* Introduction */}
      <section className="py-8 bg-white">
        <div className="container px-4 mx-auto max-w-3xl">
          <p className="text-lg text-stone-700 font-light leading-relaxed">{guide.introduction}</p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-8 bg-stone-50">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-2xl font-medium text-black mb-8">Step-by-Step Guide</h2>
          <div className="space-y-6">
            {guide.steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-6 border border-stone-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-medium text-primary">{idx + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-black mb-2">{step.title}</h3>
                    <p className="text-stone-600 font-light leading-relaxed">{step.content}</p>
                    {step.tip && (
                      <div className="mt-3 flex items-start gap-2 bg-primary/5 rounded-lg p-3">
                        <Lightbulb className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-stone-600 font-light">{step.tip}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-8 bg-white">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-2xl font-medium text-black mb-6">Common Mistakes to Avoid</h2>
          <div className="space-y-4">
            {guide.commonMistakes.map((item, idx) => (
              <div key={idx} className="bg-stone-50 rounded-xl p-5 border border-stone-100">
                <div className="flex items-start gap-3 mb-2">
                  <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="font-medium text-black">{item.mistake}</span>
                </div>
                <div className="flex items-start gap-3 ml-8">
                  <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-stone-600 font-light">{item.correction}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Questions to Ask Your Dentist */}
      {aeo && (
        <section className="py-8 bg-white">
          <div className="container px-4 mx-auto max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <MessageCircleQuestion className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-medium text-black">Questions to Ask Your Dentist</h2>
            </div>
            <div className="space-y-3">
              {aeo.dentistQuestions.map((q, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <p className="text-stone-700 font-light">{q}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mid-Content CTA */}
      <section className="py-4 bg-white">
        <div className="container px-4 mx-auto max-w-3xl">
          <MidContentCTA
            variant="card"
            headline="Ready to take the next step?"
            description="Get a free AI oral health assessment in 10 minutes. Just snap a photo of your teeth."
            trackingLabel="guide_page_mid_cta"
          />
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="py-8 bg-stone-50">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-2xl font-medium text-black mb-6">Key Takeaways</h2>
          <div className="space-y-3">
            {guide.keyTakeaways.map((takeaway, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-stone-700 font-light">{takeaway}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-8 bg-white">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-2xl font-medium text-black mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {guide.faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-8 bg-stone-50">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-2xl font-medium text-black mb-6">Related Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guide.relatedConditions.length > 0 && (
              <div>
                <h3 className="text-sm uppercase tracking-wider text-stone-400 font-medium mb-3">Conditions</h3>
                <div className="space-y-2">
                  {guide.relatedConditions.map((item) => (
                    <Link key={item.slug} href={`/conditions/${item.slug}`}>
                      <span className="block text-primary hover:underline cursor-pointer font-light">{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {guide.relatedSymptoms.length > 0 && (
              <div>
                <h3 className="text-sm uppercase tracking-wider text-stone-400 font-medium mb-3">Symptoms</h3>
                <div className="space-y-2">
                  {guide.relatedSymptoms.map((item) => (
                    <Link key={item.slug} href={`/symptoms/${item.slug}`}>
                      <span className="block text-primary hover:underline cursor-pointer font-light">{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {guide.relatedGuides.length > 0 && (
              <div>
                <h3 className="text-sm uppercase tracking-wider text-stone-400 font-medium mb-3">Guides</h3>
                <div className="space-y-2">
                  {guide.relatedGuides.map((item) => (
                    <Link key={item.slug} href={`/guides/${item.slug}`}>
                      <span className="block text-primary hover:underline cursor-pointer font-light">{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 bg-primary text-white">
        <div className="container px-4 mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-normal mb-3 text-white">Ready to take control of your oral health?</h2>
          <p className="text-white/80 font-light mb-6">DentaSmart helps you monitor your teeth and gums between dental visits.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/instant-scan">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer">
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

      <DownloadSection />
      <Footer />
      <BlogCTABanner />


    </div>
  );
}
