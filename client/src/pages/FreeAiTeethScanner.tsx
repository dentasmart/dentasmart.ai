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
  CheckCircle, Smartphone, Star, ArrowRight, AlertTriangle 
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useEffect } from "react";

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
    answer: "Yes. You can download the app and run your first scan at no cost. The free scan includes a guided self-examination, an oral health score, and a basic findings overview. Paid plans start at $19.99 for a one-time Quick Check with a full report."
  },
  {
    question: "How accurate is an AI teeth scanner?",
    answer: "DentaSmart uses computer vision trained on thousands of clinical dental images. It identifies common issues like cavities, gum inflammation, calculus buildup, and cracks. According to a 2023 study in the Journal of Dental Research, AI detection models achieved 85-95% sensitivity for common dental conditions. However, no app replaces a licensed dentist for diagnosis or treatment."
  },
  {
    question: "What can DentaSmart detect from a photo?",
    answer: "From a mouth photo, DentaSmart can flag visible signs of cavities, plaque and tartar buildup, gum recession, swelling or redness, cracks, and discoloration. From an X-ray, it can highlight bone loss, hidden decay between teeth, root issues, and impacted teeth."
  },
  {
    question: "Is my dental data private?",
    answer: "DentaSmart does not sell your data. Photos are processed securely and are not shared with third parties. The app is designed with privacy-first principles and complies with standard data protection practices."
  },
  {
    question: "Do I need to visit a dentist after using DentaSmart?",
    answer: "DentaSmart is an educational tool, not a replacement for professional dental care. If the app flags a concern, you should follow up with a licensed dentist. Think of it as a starting point that helps you understand what is happening before your appointment."
  },
  {
    question: "How is DentaSmart different from other AI dental apps?",
    answer: "DentaSmart analyzes both mouth photos and dental X-rays (most competitors only do one). It provides dual reports (patient-friendly and dentist-ready versions), a personalized oral health score with tracking over time, and a guided self-examination process. It is rated 5.0 on the App Store."
  }
];

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "DentaSmart",
  operatingSystem: "iOS, Android",
  applicationCategory: "HealthApplication",
  description: "Free AI teeth scanner app that analyzes mouth photos and dental X-rays to identify potential dental issues, provide an oral health score, and generate plain-language reports.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free first scan included"
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    ratingCount: "127",
    bestRating: "5",
    worstRating: "1"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(f => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://dentasmart.ai" },
    { "@type": "ListItem", position: 2, name: "Free AI Teeth Scanner", item: "https://dentasmart.ai/free-ai-teeth-scanner" },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Free AI Teeth Scanner - Scan Your Teeth from Home",
  description: "DentaSmart is a free AI teeth scanner that analyzes mouth photos and dental X-rays. Get an oral health score, spot potential issues, and understand your dental health in minutes.",
  url: "https://dentasmart.ai/free-ai-teeth-scanner",
  inLanguage: "en-US",
  isPartOf: { "@type": "WebSite", name: "DentaSmart", url: "https://dentasmart.ai" },
};

export default function FreeAiTeethScanner() {
  useEffect(() => {
    trackEvent("free_ai_scanner_page_view");
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black selection:bg-primary/20">
      <SEO
        title="Free AI Teeth Scanner - Analyze Photos & X-Rays"
        description="DentaSmart is a free AI teeth scanner that analyzes mouth photos and dental X-rays. Get an oral health score, spot potential issues, and understand your dental health in minutes."
        canonical="https://dentasmart.ai/free-ai-teeth-scanner"
        keywords="free AI teeth scanner, AI dental scan, online teeth checkup, AI X-ray analysis, dental photo analysis, free dental scan app"
        jsonLd={[softwareAppSchema, faqSchema, breadcrumbSchema, webPageSchema]}
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
              <Camera className="w-4 h-4" /> Free AI Scanner
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-4 leading-[1.1] max-w-4xl">
              Free AI Teeth Scanner:{" "}
              <span className="italic text-primary">Understand Your Dental Health from Home</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-2xl mb-8">
              Take a photo of your teeth or upload a dental X-ray. DentaSmart analyzes it in minutes and tells you what it sees, in plain language you can actually understand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/download">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 shadow-lg w-full sm:w-auto">
                  Scan Your Teeth for Free
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
            question="What is a free AI teeth scanner?"
            answer="A free AI teeth scanner is a mobile app that uses computer vision to analyze photos of your mouth or dental X-rays. DentaSmart is one such tool: you take a photo, the AI identifies potential issues like cavities, gum disease, or calculus buildup, and you receive a plain-language report with an oral health score. Your first scan is free. According to a 2023 study published in the Journal of Dental Research, AI dental imaging models can detect common conditions with 85-95% sensitivity."
            sourceUrl="https://pubmed.ncbi.nlm.nih.gov/36825642/"
            sourceLabel="Journal of Dental Research, 2023"
          />
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-5 bg-stone-50 border-b border-stone-100">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm text-stone-600">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span>5.0 on the App Store</span>
            </div>
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-primary" />
              <span>50,000+ scans completed</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>Your data is never sold</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Results in under 10 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* What DentaSmart Scans */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="text-3xl font-medium text-black mb-8">What DentaSmart Can Detect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100">
              <h3 className="text-lg font-medium text-black mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                From a Mouth Photo
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Visible cavities and decay",
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
                  "Root infections or abscesses",
                  "Impacted teeth",
                  "Calculus below the gumline",
                  "Abnormal structures",
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
          <h2 className="text-3xl font-medium text-black mb-8">How the Free AI Scan Works</h2>
          <div className="space-y-6">
            {[
              { step: "1", title: "Download the app", desc: "DentaSmart is available on iOS and Android. Download free from the App Store or Google Play. No account required for your first scan." },
              { step: "2", title: "Take a photo or upload an X-ray", desc: "Use your phone camera to photograph your teeth, or upload a dental X-ray image from your dentist. The app guides you through getting a clear shot." },
              { step: "3", title: "Get your results", desc: "In under 10 minutes, you receive an oral health score, a color-coded findings map, and a plain-language explanation of what the AI detected." },
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

      {/* What You Get Free vs Paid */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="text-3xl font-medium text-black mb-8">What is Included Free vs. Paid</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-200">
                  <th className="py-3 px-4 text-stone-500 font-medium text-sm">Feature</th>
                  <th className="py-3 px-4 text-center text-stone-500 font-medium text-sm">Free Scan</th>
                  <th className="py-3 px-4 text-center text-stone-500 font-medium text-sm">Quick Check ($19.99)</th>
                  <th className="py-3 px-4 text-center text-stone-500 font-medium text-sm">Complete ($74.99/yr)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {[
                  { feature: "Guided self-examination", free: true, quick: true, complete: true },
                  { feature: "Oral health score", free: true, quick: true, complete: true },
                  { feature: "Basic findings overview", free: true, quick: true, complete: true },
                  { feature: "Color-coded issue map", free: false, quick: true, complete: true },
                  { feature: "Full detailed report", free: false, quick: true, complete: true },
                  { feature: "Patient + dentist versions", free: false, quick: true, complete: true },
                  { feature: "Personalized care plan", free: false, quick: true, complete: true },
                  { feature: "Unlimited scans", free: false, quick: false, complete: true },
                  { feature: "Progress tracking", free: false, quick: false, complete: true },
                  { feature: "24/7 Din AI guide", free: false, quick: false, complete: true },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-stone-50">
                    <td className="py-3 px-4 text-stone-700 font-light text-sm">{row.feature}</td>
                    <td className="py-3 px-4 text-center">
                      {row.free ? <CheckCircle className="w-4 h-4 text-primary mx-auto" /> : <span className="text-stone-300">-</span>}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.quick ? <CheckCircle className="w-4 h-4 text-primary mx-auto" /> : <span className="text-stone-300">-</span>}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.complete ? <CheckCircle className="w-4 h-4 text-primary mx-auto" /> : <span className="text-stone-300">-</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-stone-500 mt-4 font-light">
            All plans include dual reports (patient-friendly and dentist-ready versions). <Link href="/pricing"><span className="text-primary hover:underline cursor-pointer">See full pricing details</span></Link>.
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
            Scan your teeth for free and get a plain-language read in minutes. No appointment, no waiting room.
          </p>
          <Link href="/download">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 py-6 text-lg font-medium cursor-pointer shadow-lg">
              <Smartphone className="w-5 h-5 mr-2" />
              Get the Free App
            </Button>
          </Link>
        </div>
      </section>

      {/* How DentaSmart Compares */}
      <section className="py-10 bg-white">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="text-3xl font-medium text-black mb-8">How DentaSmart Compares to Other AI Dental Tools</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-200">
                  <th className="py-3 px-4 text-stone-500 font-medium text-sm">Feature</th>
                  <th className="py-3 px-4 text-center font-medium text-sm text-primary">DentaSmart</th>
                  <th className="py-3 px-4 text-center text-stone-500 font-medium text-sm">Dental.com SmartScan</th>
                  <th className="py-3 px-4 text-center text-stone-500 font-medium text-sm">Dentistry.one SmileScan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {[
                  { feature: "Mouth photo analysis", ds: true, dental: true, dentistry: true },
                  { feature: "X-ray analysis", ds: true, dental: false, dentistry: false },
                  { feature: "Free first scan", ds: true, dental: true, dentistry: true },
                  { feature: "Oral health score", ds: true, dental: false, dentistry: true },
                  { feature: "Dual reports (patient + dentist)", ds: true, dental: false, dentistry: false },
                  { feature: "Guided self-examination", ds: true, dental: false, dentistry: false },
                  { feature: "Progress tracking over time", ds: true, dental: false, dentistry: false },
                  { feature: "24/7 AI chat guide", ds: true, dental: false, dentistry: false },
                  { feature: "App Store rating", ds: "5.0", dental: "4.2", dentistry: "N/A" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-stone-50">
                    <td className="py-3 px-4 text-stone-700 font-light text-sm">{row.feature}</td>
                    <td className="py-3 px-4 text-center">
                      {typeof row.ds === "boolean" ? (row.ds ? <CheckCircle className="w-4 h-4 text-primary mx-auto" /> : <span className="text-stone-300">-</span>) : <span className="text-primary font-medium text-sm">{row.ds}</span>}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {typeof row.dental === "boolean" ? (row.dental ? <CheckCircle className="w-4 h-4 text-stone-400 mx-auto" /> : <span className="text-stone-300">-</span>) : <span className="text-stone-600 text-sm">{row.dental}</span>}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {typeof row.dentistry === "boolean" ? (row.dentistry ? <CheckCircle className="w-4 h-4 text-stone-400 mx-auto" /> : <span className="text-stone-300">-</span>) : <span className="text-stone-600 text-sm">{row.dentistry}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-stone-500 mt-4 font-light">
            Comparison based on publicly available information as of June 2026. Features may change. <Link href="/best-ai-dental-apps"><span className="text-primary hover:underline cursor-pointer">Read the full comparison</span></Link>.
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
