import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import QuickAnswerBlock from "@/components/QuickAnswerBlock";
import { DownloadSection } from "@/components/DownloadSection";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useState } from "react";
import {
  Camera, Shield, Clock, FileText, ChevronDown, ChevronUp,
  CheckCircle, Smartphone, ArrowRight, AlertTriangle
} from "lucide-react";
import { pricing } from "@shared/facts";

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

const faqs = [
  {
    question: "Is DentaSmart really free?",
    answer: `Yes. DentaSmart Free Quick Check is unlimited and accepts supported mouth photos, supported X-rays, or both. Mouth photos do not require an X-ray. Full Quick Check costs ${pricing.fullQuickCheck.priceFormatted} per case, Treatment Plan Review costs ${pricing.treatmentPlanReview.priceFormatted} per case, and Complete Care starts at ${pricing.completeCareIndividual.priceFormatted} per year.`
  },
  {
    question: "How accurate is an AI teeth scanner?",
    answer: "An AI teeth scanner can help highlight areas that may deserve attention, but performance depends on the image, the area being reviewed, and the tool. DentaSmart does not diagnose conditions or replace a licensed dentist's examination."
  },
  {
    question: "What can DentaSmart detect from a photo?",
    answer: "From a mouth photo, DentaSmart can help highlight visible areas such as discoloration, buildup, gum changes, or damage. Its X-ray workflow can help organize areas to discuss with a dentist. These educational observations are not a diagnosis."
  },
  {
    question: "Is my dental data private?",
    answer: "DentaSmart does not sell your data. We take the privacy and security of your information seriously. See our Privacy Policy for details on how your information is handled."
  },
  {
    question: "Do I need to visit a dentist after using DentaSmart?",
    answer: "DentaSmart is an educational tool, not a replacement for professional dental care. If the app flags a concern, you should follow up with a licensed dentist. Think of it as a starting point that helps you understand what is happening before your appointment."
  },
  {
    question: "How is DentaSmart different from other AI dental apps?",
    answer: "DentaSmart supports mouth-photo and dental X-ray workflows, provides an Oral Health Score, and creates plain-language reports. Compare any app by supported inputs, report detail, price, privacy information, and whether it clearly states its professional-care limits."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function FreeAiTeethScanner() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black selection:bg-primary/20">
      <SEO
        title="Free AI Mouth Photo Analysis | DentaSmart Quick Check"
        description="Use supported mouth photos for a free DentaSmart Quick Check. No X-ray is required. See visible areas to discuss with a dentist without receiving a diagnosis."
        canonical="https://dentasmart.ai/free-ai-teeth-scanner"
        keywords="free AI teeth scanner, AI dental scan, online teeth checkup, AI X-ray analysis, dental photo analysis, free dental scan app"
        jsonLd={faqSchema}
      />
      <Navigation />

      {/* Hero */}
      <section className="relative flex items-center overflow-hidden bg-gradient-to-br from-white via-accent/5 to-primary/5">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 px-4 mx-auto max-w-6xl pt-40 pb-12 md:pt-36 md:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-6">
              <Camera className="w-4 h-4" /> Free mouth-photo analysis
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-4 leading-[1.1] max-w-4xl">
              Start with a Free AI Mouth Photo Check{" "}
              <span className="italic text-primary">No X-Ray Required</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-2xl mb-8">
              Use supported mouth photos, supported X-rays, or both for an unlimited Free Quick Check. Mouth photos do not require an X-ray.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/download/">
                <Button size="lg" className="bg-action text-action-foreground hover:bg-action-hover rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 shadow-lg w-full sm:w-auto">
                  Download DentaSmart
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/5 rounded-full px-8 py-6 text-base font-medium cursor-pointer w-full sm:w-auto">
                  See How It Works <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Direct Answer Block (AEO) */}
      <section className="py-6 bg-white border-b border-stone-100">
        <div className="container px-4 mx-auto max-w-4xl">
          <QuickAnswerBlock
            question="Can I analyze a mouth photo for free?"
            answer={`Yes. DentaSmart Free Quick Check is unlimited and accepts supported mouth photos, supported X-rays, or both. Mouth photos do not require an X-ray. Full Quick Check is ${pricing.fullQuickCheck.priceFormatted} per case and unlocks full eligible X-ray insights. DentaSmart provides educational observations, not a diagnosis.`}
          />
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-5 bg-stone-50 border-b border-stone-100">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm text-stone-600">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-primary" />
              <span>Available on iOS and Android</span>
            </div>
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-primary" />
              <span>Free mouth-photo Quick Check</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>Your data is never sold</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Processing time varies by image quality and service</span>
            </div>
          </div>
        </div>
      </section>

      {/* What DentaSmart Scans */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="text-3xl font-medium text-black mb-8">What DentaSmart Can Help Highlight</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100">
              <h3 className="text-lg font-medium text-black mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                From a Mouth Photo
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Visible areas that may look different from nearby teeth",
                  "Plaque and tartar buildup",
                  "Gum redness or swelling",
                  "Gum recession",
                  "Cracks or chips",
                  "Discoloration and staining",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-stone-700 font-light">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100">
              <h3 className="text-lg font-medium text-black mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                From a Dental X-Ray
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Hidden decay between teeth",
                  "Bone loss around roots",
                  "Areas near roots to discuss with a dentist",
                  "Impacted teeth",
                  "Calculus below the gumline",
                  "Structures that may need professional review",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-stone-700 font-light">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="text-3xl font-medium text-black mb-8">How DentaSmart Works</h2>
          <div className="space-y-6">
            {[
              { step: "1", title: "Download the app", desc: "DentaSmart is available on iOS and Android and is free to download." },
              { step: "2", title: "Take a photo or upload an X-ray", desc: "Use your phone camera to photograph your teeth, or upload a dental X-ray image from your dentist. The app guides you through getting a clear shot." },
              { step: "3", title: "Review the educational output", desc: "Processing time can vary by image quality and the selected service. The selected service explains supported observations in plain language and does not provide a diagnosis." },
              { step: "4", title: "Understand your next steps", desc: "The report includes a patient-friendly version you can read yourself and a dentist-ready version you can bring to your appointment." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-5 border border-stone-200">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-medium">{item.step}</span>
                </div>
                <div>
                  <h3 className="font-medium text-black mb-1">{item.title}</h3>
                  <p className="text-stone-600 font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download and paid-service boundary */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="text-3xl font-medium text-black mb-8">Free Download vs. Paid Services</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { title: "App download", price: "$0", detail: "Install DentaSmart from the App Store or Google Play." },
              { title: pricing.quickCheck.name, price: pricing.quickCheck.priceFormatted, detail: "Unlimited checks using supported mouth photos, supported X-rays, or both." },
              { title: pricing.fullQuickCheck.name, price: `${pricing.fullQuickCheck.priceFormatted} ${pricing.fullQuickCheck.billingLabel}`, detail: "Unlocks the paid Quick Check package and full eligible X-ray insights for one case." },
              { title: pricing.completeCareIndividual.name, price: `From ${pricing.completeCareIndividual.priceFormatted}${pricing.completeCareIndividual.billingLabel}`, detail: "An annual individual plan; family pricing is listed separately." },
            ].map((option) => (
              <article key={option.title} className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
                <h3 className="font-medium text-black">{option.title}</h3>
                <p className="my-2 text-2xl font-medium text-action">{option.price}</p>
                <p className="text-sm leading-relaxed text-stone-600">{option.detail}</p>
              </article>
            ))}
          </div>
          <p className="text-sm text-stone-500 mt-4 font-light">
            <Link href="/pricing/" className="text-action hover:underline cursor-pointer">See current prices and service details</Link> before choosing.
          </p>
        </div>
      </section>

      {/* Honest Limitations */}
      <section className="py-8 bg-amber-50/50">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl p-6 border border-amber-200">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              <h2 className="text-xl font-medium text-amber-800">What DentaSmart Cannot Do</h2>
            </div>
            <p className="text-stone-600 font-light mb-4">
              DentaSmart is an educational screening tool. It is not a substitute for professional dental care. Here is what it cannot do:
            </p>
            <ul className="space-y-2">
              {[
                "Diagnose dental conditions (only a licensed dentist can do that)",
                "Detect issues that require physical examination (bite problems, internal nerve damage)",
                "Replace regular dental checkups and cleanings",
                "Provide treatment or prescribe medication",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-stone-700 font-light">
                  <span className="text-amber-500 mt-1">&#8226;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-stone-600 font-light mt-4">
              If DentaSmart flags a concern, follow up with your dentist. Think of it as a starting point that helps you walk into your appointment informed, not a replacement for the appointment itself.
            </p>
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="py-8 bg-primary/5">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-medium text-black mb-3">Not sure what is going on with your teeth?</h2>
          <p className="text-stone-600 font-light mb-6 max-w-xl mx-auto">
            Download the app and start with an unlimited Free Quick Check. Choose Full Quick Check or another paid service only if you need it.
          </p>
          <Link href="/download/">
            <Button size="lg" className="bg-action text-action-foreground hover:bg-action-hover rounded-full px-10 py-6 text-lg font-medium cursor-pointer shadow-lg">
              <Smartphone className="w-5 h-5 mr-2" />
              Download DentaSmart
            </Button>
          </Link>
        </div>
      </section>

      {/* Choosing an AI teeth scanner */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="text-3xl font-medium text-black mb-8">What to Compare Before You Choose</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              { title: "Supported inputs", detail: "Check whether the service accepts mouth photos, X-rays, or both, and whether your image type is supported." },
              { title: "Output and limitations", detail: "Look for plain-language reports, clear uncertainty, and an explicit statement that the tool does not diagnose." },
              { title: "Full price", detail: "Confirm what is free and what is paid. DentaSmart mouth-photo Quick Check is free; X-ray analysis and other services are priced separately." },
              { title: "Privacy and follow-up", detail: "Review the privacy policy and understand when the service tells you to seek professional care." },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
                <h3 className="mb-2 font-medium text-black">{item.title}</h3>
                <p className="text-sm leading-relaxed text-stone-600">{item.detail}</p>
              </article>
            ))}
          </div>
          <p className="text-sm text-stone-500 mt-4 font-light">
            Comparison based on publicly available information as of June 2026. Features may change. <Link href="/best-ai-dental-apps/"><span className="text-action hover:underline cursor-pointer">Read the full comparison</span></Link>.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-10 bg-stone-50">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-3xl font-medium text-black mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <DownloadSection />
      <Footer />
    </div>
  );
}
