import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { DownloadSection } from "@/components/DownloadSection";
import MidContentCTA from "@/components/MidContentCTA";
import NextStepsBox from "@/components/NextStepsBox";
import ExternalSources from "@/components/ExternalSources";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, ChevronDown, ChevronUp, ExternalLink, Lightbulb, ListChecks, XCircle, MessageCircleQuestion } from "lucide-react";
import { Link, useRoute } from "wouter";
import { useState } from "react";
import { guidesData } from "@/data/guides";
import { aeoGuides } from "@/data/aeoContent";
import { breadcrumbSchema, howToSchema, faqPageSchema } from "@/lib/schema";
import ContentGovernanceMeta from "@/components/ContentGovernanceMeta";
import QuickAnswerBlock from "@/components/QuickAnswerBlock";
import type { ContentGovernance } from "@shared/contentGovernance";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-${question.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
  return (
    <div className="border border-stone-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-stone-50 transition-colors cursor-pointer"
      >
        <span className="font-medium text-black pr-4">{question}</span>
        {open ? <ChevronUp className="w-5 h-5 text-stone-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-stone-400 flex-shrink-0" />}
      </button>
      {open && (
        <div id={panelId} className="px-5 pb-5 text-stone-600 font-light leading-relaxed">
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
  const hasSourceNotes = Boolean(guide?.sources?.length);
  const governance: ContentGovernance | undefined = guide ? {
    contentId: `guide:${guide.slug}`,
    contentVersion: guide.lastReviewed || "legacy",
    riskClass: "health",
    claimClasses: ["CLINICAL_EDUCATION"],
    directAnswer: {
      question: `What is the key point of ${guide.title}?`,
      answer: guide.introduction,
      intendedAudience: "People seeking general oral health education",
    },
    ctaPolicy: {
      placement: "after_educational_context",
      requiresProfessionalCareBoundary: true,
    },
    exceptions: [{
      code: "legacy_review_metadata",
      reason: "Existing guide review fields require governed provenance before public display.",
    }],
  } : undefined;

  if (!guide) {
    return (
      <div className="min-h-screen flex flex-col bg-background font-sans text-black">
        <Navigation />
        <div className="flex-1 flex items-center justify-center pt-32">
          <div className="text-center">
            <h1 className="text-3xl font-medium text-black mb-4">Guide Not Found</h1>
            <p className="text-stone-600 mb-6">The guide you are looking for does not exist.</p>
            <Link href="/guides/">
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
            citations: guide.sources?.map((source) => source.url),
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
            <Link href="/guides/">
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
            <div className="mt-6 text-white/60">
              <ContentGovernanceMeta governance={governance} />
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

      <section className="py-6 bg-primary/5 border-b border-primary/10">
        <div className="container px-4 mx-auto max-w-3xl">
          <QuickAnswerBlock
            question={governance?.directAnswer?.question || `What is the key point of ${guide.title}?`}
            answer={guide.introduction}
            governance={governance?.directAnswer}
          />
        </div>
      </section>

      {aeo && hasSourceNotes && (
        <section className="py-8 bg-white border-b border-stone-100">
          <div className="container px-4 mx-auto max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <ListChecks className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-medium text-black">What You Can Check Today</h2>
            </div>
            <ol className="space-y-4">
              {aeo.whatToDoToday.map((action, idx) => (
                <li key={action} className="flex items-start gap-4 text-stone-700 font-light leading-relaxed">
                  <span className="w-7 h-7 rounded-full bg-primary/10 text-primary font-medium flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    {idx + 1}
                  </span>
                  <span>{action}</span>
                </li>
              ))}
            </ol>
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
                    <div className="space-y-3">
                      {step.content.split('\n\n').map((para, pIdx) => (
                        <p key={pIdx} className="text-stone-600 font-light leading-relaxed">{para}</p>
                      ))}
                    </div>
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
            variant="interactive"
            trackingLabel="guide_page_mid_cta"
          />
          <NextStepsBox forceContentType="guide" />
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
          <ExternalSources route={`/guides/${guide.slug}/`} />
        </div>
      </section>

      {/* Related Content */}
      <section className="py-8 bg-stone-50">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-2xl font-medium text-black mb-6">Related Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guide.relatedConditions.length > 0 && (
              <div>
                <h3 className="text-sm uppercase tracking-wider text-stone-600 font-medium mb-3">Conditions</h3>
                <div className="space-y-2">
                  {guide.relatedConditions.map((item) => (
                    <Link key={item.slug} href={`/conditions/${item.slug}/`}>
                      <span className="block text-action hover:underline cursor-pointer font-light">{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {guide.relatedSymptoms.length > 0 && (
              <div>
                <h3 className="text-sm uppercase tracking-wider text-stone-600 font-medium mb-3">Symptoms</h3>
                <div className="space-y-2">
                  {guide.relatedSymptoms.map((item) => (
                    <Link key={item.slug} href={`/symptoms/${item.slug}/`}>
                      <span className="block text-action hover:underline cursor-pointer font-light">{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {guide.relatedGuides.length > 0 && (
              <div>
                <h3 className="text-sm uppercase tracking-wider text-stone-600 font-medium mb-3">Guides</h3>
                <div className="space-y-2">
                  {guide.relatedGuides.map((item) => (
                    <Link key={item.slug} href={`/guides/${item.slug}/`}>
                      <span className="block text-action hover:underline cursor-pointer font-light">{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {guide.relatedResources && guide.relatedResources.length > 0 && (
            <div className="mt-8 pt-6 border-t border-stone-200">
              <h3 className="text-sm uppercase tracking-wider text-stone-600 font-medium mb-4">More Cost Resources</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {guide.relatedResources.map((resource) => (
                  <Link key={resource.href} href={resource.href}>
                    <span className="block h-full rounded-xl border border-stone-200 bg-white p-4 hover:border-primary/40 hover:shadow-sm transition-all cursor-pointer">
                      <span className="block font-medium text-action mb-1">{resource.title}</span>
                      {resource.description && (
                        <span className="block text-sm text-stone-600 font-light leading-relaxed">{resource.description}</span>
                      )}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {guide.sources && guide.sources.length > 0 && (
        <section className="py-8 bg-white border-t border-stone-100">
          <div className="container px-4 mx-auto max-w-3xl">
            <h2 className="text-2xl font-medium text-black mb-3">Sources and Further Reading</h2>
            <p className="text-stone-600 font-light leading-relaxed mb-6">
              These references explain the billing, benefit, and financing terms used in this guide. Your dental plan documents and written agreements control your specific coverage and payment terms.
            </p>
            <ul className="space-y-4">
              {guide.sources.map((source) => (
                <li key={source.url} className="rounded-xl border border-stone-200 p-5">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-start gap-2 font-medium text-action hover:underline"
                  >
                    <span>{source.organization}: {source.title}</span>
                    <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0" aria-hidden="true" />
                  </a>
                  <p className="text-sm text-stone-600 font-light leading-relaxed mt-2">{source.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-8 bg-action text-action-foreground">
        <div className="container px-4 mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-normal mb-3 text-action-foreground">
            {hasSourceNotes ? guide.ctaHeading : "Ready to take control of your oral health?"}
          </h2>
          <p className="text-action-foreground font-light mb-6">
            {hasSourceNotes
              ? "DentaSmart can help you organize supported dental information and prepare questions for professional care."
              : "DentaSmart helps you monitor your teeth and gums between dental visits."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/instant-scan/">
              <Button size="lg" className="bg-white text-action hover:bg-white/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer">
                {hasSourceNotes ? "Review My Oral Health" : "Try Instant Scan"}
              </Button>
            </Link>
            <Link href="/download/">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-medium cursor-pointer">
                Download the App
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <DownloadSection />
      <Footer />



    </div>
  );
}
