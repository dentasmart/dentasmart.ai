import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import QuickAnswerBlock from "@/components/QuickAnswerBlock";
import { DownloadSection } from "@/components/DownloadSection";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import {
  ChevronDown, ChevronUp, CheckCircle, XCircle, MinusCircle,
  Star, ArrowRight, Smartphone, Globe, Camera, FileText
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

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

interface AppEntry {
  name: string;
  tagline: string;
  platform: string;
  xraySupport: boolean;
  healthScore: boolean;
  progressTracking: boolean;
  carePlan: boolean;
  freeOption: string;
  paidPrice: string;
  bestFor: string;
  limitation: string;
  link?: string;
}

const apps: AppEntry[] = [
  {
    name: "DentaSmart",
    tagline: "Full oral health monitoring with X-ray analysis and care plans",
    platform: "iOS & Android",
    xraySupport: true,
    healthScore: true,
    progressTracking: true,
    carePlan: true,
    freeOption: "First scan free",
    paidPrice: "From $19.99 (one-time) or $74.99/year unlimited",
    bestFor: "People who want thorough ongoing monitoring with X-ray analysis and cost estimates",
    limitation: "iOS only for now; does not replace a dentist",
    link: "/free-ai-teeth-scanner",
  },
  {
    name: "Dental.com SmartScan",
    tagline: "Quick photo check with dentist booking",
    platform: "Web (any browser)",
    xraySupport: false,
    healthScore: false,
    progressTracking: false,
    carePlan: false,
    freeOption: "Basic scan free",
    paidPrice: "Paid consultations vary",
    bestFor: "People who want a fast visible check and immediate dentist referral",
    limitation: "No X-ray support, no tracking, limited free report detail",
    link: "/vs/dental-com",
  },
  {
    name: "Dentistry.One SmileScan",
    tagline: "Photo scan with optional video dentist consultation",
    platform: "Web (any browser)",
    xraySupport: false,
    healthScore: false,
    progressTracking: false,
    carePlan: false,
    freeOption: "Basic scan free",
    paidPrice: "Video consultation from ~$20-40",
    bestFor: "People who want a quick check and the option to talk to a dentist on video",
    limitation: "No X-ray analysis, no progress tracking, limited without paid consultation",
    link: "/vs/dentistry-one",
  },
  {
    name: "eDentist.ai",
    tagline: "AI chatbot for dental questions",
    platform: "Web",
    xraySupport: false,
    healthScore: false,
    progressTracking: false,
    carePlan: false,
    freeOption: "Free chat",
    paidPrice: "Varies",
    bestFor: "People who want to ask general dental questions in a chat format",
    limitation: "No image analysis, no personalized assessment based on your teeth",
  },
  {
    name: "Galaxy.ai Dental",
    tagline: "AI dental screening tool",
    platform: "Web",
    xraySupport: false,
    healthScore: false,
    progressTracking: false,
    carePlan: false,
    freeOption: "Free trial",
    paidPrice: "Subscription varies",
    bestFor: "Basic AI screening for visible dental issues",
    limitation: "Limited public information on accuracy; no X-ray support",
  },
];

const faqs = [
  {
    question: "Are AI dental apps accurate?",
    answer: "AI dental scanners typically achieve 85-95% sensitivity for common conditions like cavities, gum inflammation, and calculus buildup, according to a 2023 study in the Journal of Dental Research. However, accuracy varies by app and condition. No AI app should be used as a substitute for professional dental examination."
  },
  {
    question: "Can any of these apps diagnose dental problems?",
    answer: "No. None of these apps provide medical diagnoses. They are screening and monitoring tools that help you identify potential issues and understand your oral health. Always consult a licensed dentist for diagnosis and treatment."
  },
  {
    question: "Which app is best for reading dental X-rays?",
    answer: "As of 2026, DentaSmart is the only consumer app on this list that analyzes dental X-rays (panoramic and bitewing). The others work with visible photos only."
  },
  {
    question: "Are these apps free?",
    answer: "Most offer a free first scan or basic check. For detailed reports, ongoing monitoring, or professional consultations, all of them have paid tiers. DentaSmart offers a free first scan, then one-time reports from $19.99 or unlimited scanning from $74.99/year."
  },
  {
    question: "Should I use an AI dental app instead of going to the dentist?",
    answer: "No. These apps are best used between dental visits to monitor changes, prepare questions for your dentist, or get a second perspective on a treatment plan. They complement professional care but do not replace it."
  },
];

export default function BestAiDentalApps() {
  useEffect(() => {
    trackEvent("best_ai_dental_apps_page_view");
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-black">
      <SEO
        title="Best AI Dental Apps (2026): Honest Comparison"
        description="We compared the top AI teeth scanning apps side by side. See which ones actually analyze X-rays, track your health over time, and give you useful reports."
        keywords="best ai dental apps, ai teeth scanner comparison, dental ai app review, dentasmart alternatives"
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map(f => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Best AI Dental Apps 2026",
            numberOfItems: apps.length,
            itemListElement: apps.map((app, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: app.name,
              description: app.tagline,
            })),
          }),
        }}
      />

      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-stone-50 to-white">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-normal text-black mb-6 leading-tight">
              Best AI Dental Apps in 2026:<br />
              <span className="italic text-primary">An Honest Comparison</span>
            </h1>
            <p className="text-xl text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
              We tested the top AI teeth scanning tools and compared them on what actually matters: can they read X-rays, do they track your health over time, and do they give you useful information?
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="pb-12">
        <div className="container px-4 mx-auto max-w-4xl">
          <QuickAnswerBlock
            question="What is the best AI dental app in 2026?"
            answer="DentaSmart is the most comprehensive option for consumers who want ongoing oral health monitoring. It is the only app that analyzes both photos and dental X-rays, provides a trackable health score, and generates care plans with cost estimates. For a quick one-time photo check, Dental.com SmartScan and Dentistry.One SmileScan are simpler alternatives."
            sourceLabel="Based on feature comparison as of June 2026"
          />
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 bg-stone-50">
        <div className="container px-4 mx-auto max-w-5xl">
          <h2 className="text-3xl font-normal text-black mb-8 text-center">
            Feature Comparison at a Glance
          </h2>
          <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-100 border-b border-stone-200">
                  <th className="text-left p-4 font-medium text-stone-700">Feature</th>
                  {apps.map(app => (
                    <th key={app.name} className="text-center p-4 font-medium text-stone-700 min-w-[120px]">
                      {app.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-stone-100">
                  <td className="p-4 font-medium">X-ray analysis</td>
                  {apps.map(app => (
                    <td key={app.name} className="p-4 text-center">
                      {app.xraySupport ? <CheckCircle className="w-5 h-5 text-green-600 mx-auto" /> : <XCircle className="w-5 h-5 text-stone-300 mx-auto" />}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-stone-100 bg-stone-50/50">
                  <td className="p-4 font-medium">Health score</td>
                  {apps.map(app => (
                    <td key={app.name} className="p-4 text-center">
                      {app.healthScore ? <CheckCircle className="w-5 h-5 text-green-600 mx-auto" /> : <XCircle className="w-5 h-5 text-stone-300 mx-auto" />}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-stone-100">
                  <td className="p-4 font-medium">Progress tracking</td>
                  {apps.map(app => (
                    <td key={app.name} className="p-4 text-center">
                      {app.progressTracking ? <CheckCircle className="w-5 h-5 text-green-600 mx-auto" /> : <XCircle className="w-5 h-5 text-stone-300 mx-auto" />}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-stone-100 bg-stone-50/50">
                  <td className="p-4 font-medium">Care plan with costs</td>
                  {apps.map(app => (
                    <td key={app.name} className="p-4 text-center">
                      {app.carePlan ? <CheckCircle className="w-5 h-5 text-green-600 mx-auto" /> : <XCircle className="w-5 h-5 text-stone-300 mx-auto" />}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-stone-100">
                  <td className="p-4 font-medium">Platform</td>
                  {apps.map(app => (
                    <td key={app.name} className="p-4 text-center text-xs text-stone-600">{app.platform}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-medium">Free option</td>
                  {apps.map(app => (
                    <td key={app.name} className="p-4 text-center text-xs text-stone-600">{app.freeOption}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Individual App Reviews */}
      <section className="py-16">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="text-3xl font-normal text-black mb-10 text-center">
            Each App in Detail
          </h2>
          <div className="space-y-8">
            {apps.map((app, idx) => (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`p-6 rounded-xl border ${idx === 0 ? "border-primary/30 bg-primary/5" : "border-stone-200 bg-white"}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-medium text-black flex items-center gap-2">
                      {idx === 0 && <Star className="w-5 h-5 text-primary fill-primary" />}
                      {idx + 1}. {app.name}
                    </h3>
                    <p className="text-stone-600 font-light mt-1">{app.tagline}</p>
                  </div>
                  <span className="text-xs bg-stone-100 px-3 py-1 rounded-full text-stone-600 flex-shrink-0">
                    {app.platform}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                  <div>
                    <span className="font-medium text-stone-700">Best for:</span>
                    <p className="text-stone-600 font-light mt-1">{app.bestFor}</p>
                  </div>
                  <div>
                    <span className="font-medium text-stone-700">Main limitation:</span>
                    <p className="text-stone-600 font-light mt-1">{app.limitation}</p>
                  </div>
                  <div>
                    <span className="font-medium text-stone-700">Free option:</span>
                    <p className="text-stone-600 font-light mt-1">{app.freeOption}</p>
                  </div>
                  <div>
                    <span className="font-medium text-stone-700">Paid pricing:</span>
                    <p className="text-stone-600 font-light mt-1">{app.paidPrice}</p>
                  </div>
                </div>

                {app.link && (
                  <div className="mt-4">
                    <Link href={app.link}>
                      <Button variant="outline" size="sm" className="text-primary border-primary/30 hover:bg-primary/5 cursor-pointer">
                        {idx === 0 ? "Try DentaSmart free" : `See full comparison`}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* When to see a dentist */}
      <section className="py-12 bg-amber-50 border-y border-amber-200">
        <div className="container px-4 mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-medium text-amber-900 mb-4">
            When to see a dentist instead
          </h2>
          <p className="text-amber-800 font-light leading-relaxed">
            AI dental apps are screening tools, not replacements for professional care. See a dentist if you have severe pain, swelling, bleeding that does not stop, a knocked-out tooth, or any symptom that is getting worse. These apps are best used between visits to monitor changes and prepare questions for your dentist.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-3xl font-normal text-black mb-8 text-center">
            Common Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <DownloadSection />
      <Footer />
    </div>
  );
}
