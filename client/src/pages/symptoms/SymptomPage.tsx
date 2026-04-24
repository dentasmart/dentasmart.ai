import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { DownloadSection } from "@/components/DownloadSection";
import MidContentCTA from "@/components/MidContentCTA";
import NextStepsBox from "@/components/NextStepsBox";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, ChevronDown, ChevronUp, Shield, MessageCircleQuestion } from "lucide-react";
import { Link, useRoute } from "wouter";
import { useState } from "react";
import { symptomsData } from "@/data/symptoms";
import { aeoSymptoms } from "@/data/aeoContent";
import { breadcrumbSchema, medicalWebPageSchema, faqPageSchema } from "@/lib/schema";

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

export default function SymptomPage() {
  const [, params] = useRoute("/symptoms/:slug");
  const slug = params?.slug || "";
  const symptom = slug ? symptomsData[slug] : null;
  const aeo = slug ? aeoSymptoms[slug] : null;

  if (!symptom) {
    return (
      <div className="min-h-screen flex flex-col bg-background font-sans text-black">
        <Navigation />
        <div className="flex-1 flex items-center justify-center pt-32">
          <div className="text-center">
            <h1 className="text-3xl font-medium text-black mb-4">Symptom Not Found</h1>
            <p className="text-stone-600 mb-6">The symptom you are looking for does not exist.</p>
            <Link href="/symptoms">
              <Button variant="outline" className="rounded-full cursor-pointer">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Browse All Symptoms
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
        title={symptom.metaTitle}
        description={symptom.metaDescription}
        canonical={`https://dentasmart.ai/symptoms/${symptom.slug}`}
        keywords={[symptom.primaryKeyword, ...symptom.secondaryKeywords].join(", ")}
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Symptoms", url: "/symptoms" },
            { name: symptom.title, url: `/symptoms/${symptom.slug}` },
          ]),
          medicalWebPageSchema({
            name: symptom.title,
            description: symptom.metaDescription,
            url: `/symptoms/${symptom.slug}`,
            lastReviewed: symptom.lastReviewed,
            reviewedBy: symptom.reviewedBy,
            reviewedByCredentials: symptom.reviewedByCredentials,
          }),
          faqPageSchema(symptom.faqs),
        ]}
      />
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">
        <div className="container relative z-10 px-4 mx-auto max-w-5xl pt-36 pb-12 md:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/symptoms">
              <span className="inline-flex items-center gap-2 text-primary hover:underline mb-4 cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
                All Symptoms
              </span>
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4 leading-tight text-left">
              {symptom.heroHeading || symptom.title}
            </h1>
            <p className="text-xl text-stone-300 font-light leading-relaxed max-w-2xl text-left">
              {symptom.heroSubheading}
            </p>
            <div className="flex items-center gap-3 mt-6 text-stone-400 text-sm">
              <Shield className="w-4 h-4" />
              <span>Reviewed by {symptom.reviewedBy}, {symptom.reviewedByCredentials}</span>
              <span className="mx-2">|</span>
              <span>Last reviewed: {new Date(symptom.lastReviewed).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
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

      {/* Direct Answer Box */}
      <section className="py-8 bg-primary/5 border-b border-primary/10">
        <div className="container px-4 mx-auto max-w-3xl">
          <div className="bg-white rounded-2xl p-6 border border-primary/20 shadow-sm">
            <h2 className="text-lg font-medium text-primary mb-3">Quick Answer</h2>
            <p className="text-stone-700 font-light leading-relaxed">{symptom.directAnswer || symptom.detailedExplanation?.[0]?.substring(0, 300) + '...'}</p>
          </div>
        </div>
      </section>

      {/* Detailed Explanation */}
      <section className="py-8 bg-white">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-2xl font-medium text-black mb-6">What You Need to Know</h2>
          <div className="space-y-4">
            {symptom.detailedExplanation.map((para, idx) => (
              <p key={idx} className="text-stone-700 font-light leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Possible Causes */}
      <section className="py-8 bg-stone-50">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-2xl font-medium text-black mb-6">Possible Causes</h2>
          <div className="space-y-4">
            {symptom.possibleCauses.map((cause, idx) => (
              <div key={idx} className="bg-white rounded-xl p-5 border border-stone-200">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-black">{cause.title}</h3>
                  <span className={`text-xs uppercase tracking-wider font-medium px-2 py-1 rounded-full ${
                    cause.urgency === "low" ? "bg-green-50 text-green-600" :
                    cause.urgency === "medium" ? "bg-yellow-50 text-yellow-600" : "bg-red-50 text-red-600"
                  }`}>
                    {cause.urgency} urgency
                  </span>
                </div>
                <p className="text-stone-600 font-light">{cause.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Self-Care Steps */}
      <section className="py-8 bg-white">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-2xl font-medium text-black mb-6">What You Can Do at Home</h2>
          <div className="space-y-3">
            {symptom.selfCareSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">{idx + 1}</span>
                </div>
                <p className="text-stone-700 font-light">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to See a Dentist */}
      <section className="py-8 bg-red-50">
        <div className="container px-4 mx-auto max-w-3xl">
          <div className="bg-white rounded-2xl p-6 border border-red-200">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <h2 className="text-xl font-medium text-red-700">When to See a Dentist Urgently</h2>
            </div>
            <p className="text-stone-600 font-light mb-4">
              This information is for education only and does not replace professional dental care. See a dentist as soon as possible if:
            </p>
            <ul className="space-y-2">
              {symptom.whenToSeeDentist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                  <span className="text-stone-700 font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Mid-Content CTA */}
      <section className="py-4 bg-white">
        <div className="container px-4 mx-auto max-w-3xl">
          <MidContentCTA
            variant="interactive"
            trackingLabel="symptom_page_mid_cta"
          />
          <NextStepsBox forceContentType="symptom" />
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

      {/* Key Takeaways */}
      <section className="py-8 bg-stone-50">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-2xl font-medium text-black mb-6">Key Takeaways</h2>
          <div className="space-y-3">
            {symptom.keyTakeaways.map((takeaway, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-stone-700 font-light">{takeaway}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-8 bg-stone-50">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-2xl font-medium text-black mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {symptom.faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-8 bg-white">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-2xl font-medium text-black mb-6">Related Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {symptom.relatedConditions.length > 0 && (
              <div>
                <h3 className="text-sm uppercase tracking-wider text-stone-400 font-medium mb-3">Conditions</h3>
                <div className="space-y-2">
                  {symptom.relatedConditions.map((item) => (
                    <Link key={item.slug} href={`/conditions/${item.slug}`}>
                      <span className="block text-primary hover:underline cursor-pointer font-light">{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {symptom.relatedSymptoms.length > 0 && (
              <div>
                <h3 className="text-sm uppercase tracking-wider text-stone-400 font-medium mb-3">Symptoms</h3>
                <div className="space-y-2">
                  {symptom.relatedSymptoms.map((item) => (
                    <Link key={item.slug} href={`/symptoms/${item.slug}`}>
                      <span className="block text-primary hover:underline cursor-pointer font-light">{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {symptom.relatedGuides.length > 0 && (
              <div>
                <h3 className="text-sm uppercase tracking-wider text-stone-400 font-medium mb-3">Guides</h3>
                <div className="space-y-2">
                  {symptom.relatedGuides.map((item) => (
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
          <h2 className="text-3xl font-normal mb-3 text-white">{symptom.ctaHeading || "Worried about this symptom?"}</h2>
          <p className="text-white/80 font-light mb-6">Upload a photo and get instant AI insights to help you understand what is going on.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/download">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer">
                {symptom.ctaButton || "Get My Oral Health Score"}
              </Button>
            </Link>
            <Link href="/symptom-quiz">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-medium cursor-pointer">
                Try Free Symptom Check
              </Button>
            </Link>
          </div>
          <p className="text-white/60 text-sm mt-4">Trusted by 50,000+ users &middot; 4.8/5 rating</p>
        </div>
      </section>

      <DownloadSection />
      <Footer />



    </div>
  );
}
