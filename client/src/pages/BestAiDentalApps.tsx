import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import QuickAnswerBlock from "@/components/QuickAnswerBlock";
import { DownloadSection } from "@/components/DownloadSection";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle, ChevronDown, ChevronUp, ExternalLink, ShieldCheck } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { app, pricing } from "@shared/facts";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-stone-200">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-stone-50"
        aria-expanded={open}
      >
        <span className="pr-4 font-medium text-black">{question}</span>
        {open ? <ChevronUp className="h-5 w-5 flex-shrink-0 text-stone-400" /> : <ChevronDown className="h-5 w-5 flex-shrink-0 text-stone-400" />}
      </button>
      {open && <div className="px-5 pb-5 font-light leading-relaxed text-stone-600">{answer}</div>}
    </div>
  );
}

const products = [
  {
    name: "DentaSmart",
    type: "iOS and Android app",
    verified: `Unlimited Free Quick Checks, Full Quick Check from ${pricing.fullQuickCheck.priceFormatted} per case, and Oral Health Score features.`,
    verify: "Confirm that the selected service supports your image type and goal.",
    href: "/pricing",
    linkLabel: "See DentaSmart pricing",
  },
  {
    name: "Dental.com SmartScan",
    type: "Third-party dental scanning service",
    verified: "Third-party feature and pricing details are not controlled by DentaSmart.",
    verify: "Check the provider's current inputs, output, referral model, privacy terms, and full price.",
    href: "/vs/dental-com",
    linkLabel: "Read the decision guide",
  },
  {
    name: "Dentistry.One SmileScan",
    type: "Third-party dental scanning service",
    verified: "Third-party feature and pricing details are not controlled by DentaSmart.",
    verify: "Check the provider's current inputs, consultation options, privacy terms, and full price.",
    href: "/vs/dentistry-one",
    linkLabel: "Read the decision guide",
  },
];

const faqs = [
  {
    question: "Are AI dental apps accurate?",
    answer: "Performance varies by app, image quality, image type, and the area being reviewed. Use these tools to organize observations and questions, not for a definitive diagnosis. A licensed dentist is needed for examination, diagnosis, and treatment.",
  },
  {
    question: "Can an AI dental app diagnose dental problems?",
    answer: "No. DentaSmart is an educational tool and does not diagnose conditions, prescribe treatment, or replace a licensed dentist. Review each third-party provider's current limitations before using it.",
  },
  {
    question: "How should I compare AI dental apps?",
    answer: "Compare supported image types, the detail and limitations of the output, total price, privacy information, account requirements, and the next step when a concern needs professional care.",
  },
  {
    question: "Are AI dental apps free?",
    answer: `Some apps are free to download, but checks, reports, consultations, or subscriptions may cost extra. DentaSmart Free Quick Check is unlimited. Full Quick Check is ${pricing.fullQuickCheck.priceFormatted} per case, Treatment Plan Review is ${pricing.treatmentPlanReview.priceFormatted} per case, and Complete Care starts at ${pricing.completeCareIndividual.priceFormatted} per year.`,
  },
  {
    question: "Should I use an AI dental app instead of going to a dentist?",
    answer: "No. Use an app to organize information, monitor what you notice, or prepare questions. See a dentist for professional examination, diagnosis, treatment, and urgent symptoms.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "AI dental app decision guide",
  numberOfItems: products.length,
  itemListElement: products.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: product.name,
    description: product.type,
  })),
};

export default function BestAiDentalApps() {
  useEffect(() => {
    trackEvent("best_ai_dental_apps_page_view");
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-black">
      <SEO
        title="Best AI Dental Apps (2026): How to Compare Safely"
        description="Compare AI dental apps by supported images, report detail, pricing, privacy, and professional-care boundaries. Verify third-party details before choosing."
        keywords="best ai dental apps, ai teeth scanner comparison, dental ai app review, dentasmart alternatives"
        jsonLd={[faqSchema, itemListSchema]}
      />
      <Navigation />

      <section className="bg-gradient-to-b from-stone-50 to-white pb-16 pt-32">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="mb-6 text-4xl font-normal leading-tight text-black md:text-5xl">
              Best AI Dental Apps in 2026:<br />
              <span className="italic text-primary">How to Compare Without Guessing</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl font-light leading-relaxed text-stone-600">
              Start with your goal, then verify supported images, output limits, total price, privacy information, and when professional care is still required.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto max-w-4xl px-4">
          <QuickAnswerBlock
            question="What is the best AI dental app in 2026?"
            answer="There is no single best choice for every person. Choose based on whether you need a mouth-photo check, treatment-plan comparison, X-ray workflow, ongoing tracking, or a direct path to professional care. Verify current third-party features and prices with each provider."
          />
        </div>
      </section>

      <section className="bg-stone-50 py-14">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-normal text-black">A transparent starting comparison</h2>
            <p className="mx-auto max-w-3xl leading-relaxed text-stone-600">
              DentaSmart controls only its own product information. Third-party features and prices can change, so those details should be checked directly before deciding.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {products.map((product, index) => (
              <article key={product.name} className={`rounded-2xl border p-6 ${index === 0 ? "border-primary/30 bg-white" : "border-stone-200 bg-white"}`}>
                <p className="mb-2 text-sm font-medium uppercase tracking-wide text-stone-500">{product.type}</p>
                <h3 className="mb-4 text-xl font-medium text-black">{product.name}</h3>
                <div className="mb-4">
                  <p className="mb-1 text-sm font-medium text-stone-800">What this page can state</p>
                  <p className="text-sm leading-relaxed text-stone-600">{product.verified}</p>
                </div>
                <div className="mb-6">
                  <p className="mb-1 text-sm font-medium text-stone-800">What to verify</p>
                  <p className="text-sm leading-relaxed text-stone-600">{product.verify}</p>
                </div>
                <Link href={product.href}>
                  <Button variant="outline" className="min-h-11 w-full border-action/30 text-action hover:bg-action/5">
                    {product.linkLabel}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-10 text-center text-3xl font-normal text-black">Five questions to ask before uploading an image</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              "Does the service support the image type I have?",
              "What does the result explain, and what does it leave uncertain?",
              "What is free, and what requires a one-time or recurring payment?",
              "How does the provider describe privacy and data handling?",
              "What does the service tell me to do when I need a dentist?",
            ].map((question) => (
              <div key={question} className="flex items-start gap-3 rounded-2xl border border-stone-200 p-5">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-action" aria-hidden="true" />
                <p className="leading-relaxed text-stone-700">{question}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-start gap-3 rounded-2xl bg-amber-50 p-5 text-amber-900">
            <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <p className="leading-relaxed">
              AI dental apps do not replace professional examination, diagnosis, or treatment. Seek urgent care for severe pain, swelling, uncontrolled bleeding, facial trauma, or a knocked-out tooth.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-center text-3xl font-normal text-black">Common questions</h2>
          <div className="space-y-3">
            {faqs.map((faq) => <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />)}
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white py-12">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-medium text-black">Ready to review DentaSmart itself?</h2>
          <p className="mb-6 leading-relaxed text-stone-600">
            DentaSmart is available on the App Store and Google Play. Review current prices before choosing a check or plan.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/pricing">
              <Button className="min-h-12 rounded-full bg-action px-7 text-action-foreground hover:bg-action-hover">View DentaSmart Pricing</Button>
            </Link>
            <a href={app.iosUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-300 px-7 font-medium text-stone-700 hover:bg-stone-50">
              View on the App Store <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <DownloadSection />
      <Footer />
    </div>
  );
}
