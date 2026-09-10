import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { pricing } from "@shared/facts";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Link, useRoute } from "wouter";

interface CompareData {
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroHeading: string;
  heroSubheading: string;
  competitor: string;
  competitorDesc: string;
  dentasmartDesc: string;
  rows: { feature: string; dentasmart: string; competitor: string; dentasmartWins: boolean }[];
  verdict: string;
}

const compareData: Record<string, CompareData> = {
  "dentasmart-vs-chatgpt-dental": {
    title: "DentaSmart vs ChatGPT for Dental Questions",
    metaTitle: "DentaSmart vs ChatGPT for Dental Questions | Comparison Guide",
    metaDescription: "Compare a purpose-built DentaSmart educational workflow with a general AI chatbot, including records, pricing, and professional-care boundaries.",
    heroHeading: "DentaSmart vs ChatGPT",
    heroSubheading: "Compare a general AI chatbot with DentaSmart's educational oral health workflow.",
    competitor: "ChatGPT",
    competitorDesc: "General-purpose AI chatbot. Verify its current image, memory, privacy, and pricing features directly with the provider.",
    dentasmartDesc: "Purpose-built educational tools that organize supported mouth photos and X-rays into plain-language context. DentaSmart does not diagnose conditions.",
    rows: [
      { feature: "Analyzes your dental photos", dentasmart: "Yes, AI image analysis", competitor: "No image analysis", dentasmartWins: true },
      { feature: "Reads dental X-rays", dentasmart: "Yes, trained on dental X-rays", competitor: "Cannot process X-rays", dentasmartWins: true },
      { feature: "Personalized oral health score", dentasmart: "Yes, 0-100 score", competitor: "No scoring system", dentasmartWins: true },
      { feature: "Educational cost context", dentasmart: "Available for supported information; not a provider quote", competitor: "Verify current feature", dentasmartWins: true },
      { feature: "Tracks progress over time", dentasmart: "Yes, historical tracking", competitor: "No memory between chats", dentasmartWins: true },
      { feature: "General dental Q&A", dentasmart: "Yes, via Din AI assistant", competitor: "Yes, broad knowledge", dentasmartWins: false },
      { feature: "Professional-care boundary", dentasmart: "Does not diagnose or replace a dentist", competitor: "Verify current provider guidance", dentasmartWins: true },
    ],
    verdict: "Use a general chatbot for broad explanations. Use DentaSmart when you want a purpose-built educational workflow for supported oral health records. Neither replaces a dentist's diagnosis or treatment decision.",
  },
  "dentasmart-vs-teledentistry": {
    title: "DentaSmart vs Teledentistry",
    metaTitle: "DentaSmart vs Teledentistry | Educational Comparison Guide",
    metaDescription: "Compare DentaSmart's educational tools with remote professional care, including access, records, pricing, and clinical boundaries.",
    heroHeading: "DentaSmart vs Teledentistry",
    heroSubheading: "Compare educational tools with a remote appointment from a licensed dental professional.",
    competitor: "Teledentistry",
    competitorDesc: "Video call with a licensed dentist who can visually assess your concerns and provide recommendations, but requires scheduling and fees per visit.",
    dentasmartDesc: "Educational review of supported mouth photos and X-rays. DentaSmart does not provide a professional diagnosis or prescription.",
    rows: [
      { feature: "Access model", dentasmart: "Use the app according to the selected service", competitor: "Appointment or provider access varies", dentasmartWins: true },
      { feature: "No appointment needed", dentasmart: "Yes, upload anytime", competitor: "Requires scheduling", dentasmartWins: true },
      { feature: "Complete Care Individual", dentasmart: `${pricing.completeCareIndividual.priceFormatted}/year`, competitor: "Verify current provider price", dentasmartWins: true },
      { feature: "Processing or appointment timing", dentasmart: "Varies by image quality and selected service", competitor: "Varies by provider", dentasmartWins: true },
      { feature: "Image analysis", dentasmart: "AI-powered X-ray & photo analysis", competitor: "Visual assessment only", dentasmartWins: true },
      { feature: "Diagnosis and prescriptions", dentasmart: "No, DentaSmart is educational", competitor: "Ask the licensed provider what is available", dentasmartWins: false },
      { feature: "Progress tracking", dentasmart: "Yes, historical scores", competitor: "Varies by provider", dentasmartWins: true },
    ],
    verdict: "DentaSmart can organize educational information between visits. A licensed dental professional is required for diagnosis, prescriptions, and treatment recommendations.",
  },
  "dentasmart-vs-dental-insurance": {
    title: "DentaSmart vs Dental Insurance",
    metaTitle: "DentaSmart vs Dental Insurance - Do You Need Both?",
    metaDescription: "Compare DentaSmart's educational oral health tools with dental insurance. They serve different purposes and DentaSmart is not insurance.",
    heroHeading: "DentaSmart vs Dental Insurance",
    heroSubheading: "Dental insurance and DentaSmart serve different purposes. Review both before deciding what fits your needs.",
    competitor: "Dental Insurance",
    competitorDesc: "Traditional dental insurance that covers a portion of dental procedures after deductibles and waiting periods.",
    dentasmartDesc: "Educational oral health tools that help organize supported records and treatment questions. DentaSmart is not insurance and does not diagnose conditions.",
    rows: [
      { feature: "Cost", dentasmart: `${pricing.completeCareIndividual.priceFormatted}/year`, competitor: "Varies by plan and coverage.", dentasmartWins: true },
      { feature: "Waiting period", dentasmart: "Not an insurance benefit", competitor: "Verify current plan terms", dentasmartWins: true },
      { feature: "Covers dental procedures", dentasmart: "No, monitoring tool", competitor: "Yes, partial coverage", dentasmartWins: false },
      { feature: "Educational monitoring", dentasmart: "Organizes supported records over time", competitor: "Coverage does not replace examinations", dentasmartWins: true },
      { feature: "Cost context", dentasmart: "Educational ranges are not provider quotes", competitor: "Review current benefit schedules", dentasmartWins: true },
      { feature: "Available without employer", dentasmart: "Yes, direct to consumer", competitor: "May be available through employers, individual plans, or Marketplace options.", dentasmartWins: true },
      { feature: "Professional-care questions", dentasmart: "Helps organize questions; does not recommend treatment", competitor: "Network rules vary by plan", dentasmartWins: true },
    ],
    verdict: "DentaSmart is not dental insurance and does not replace professional care. Review current insurance terms separately and use DentaSmart for educational organization of supported information.",
  },
};

export default function ComparePage() {
  const [, params] = useRoute("/compare/:slug");
  const slug = params?.slug || "";
  const data = slug ? compareData[slug] : null;

  useEffect(() => {
    trackEvent("compare_page_view", { slug: slug || "" });
  }, [slug]);

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col bg-background font-sans text-black">
        <Navigation />
        <div className="flex-1 flex items-center justify-center pt-32">
          <div className="text-center">
            <h1 className="text-3xl font-medium text-black mb-4">Comparison Not Found</h1>
            <p className="text-stone-600">The comparison page you are looking for does not exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black">
      <SEO
        title={data.metaTitle}
        description={data.metaDescription}
        canonical={`https://dentasmart.ai/compare/${slug}`}
      />
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-primary/10" />
        </div>
        <div className="container relative z-10 px-4 mx-auto max-w-5xl pt-40 md:pt-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-6 leading-tight">
              {data.heroHeading}
            </h1>
            <p className="text-xl text-stone-600 font-light leading-relaxed max-w-3xl mx-auto">
              {data.heroSubheading}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto max-w-5xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 border-b-2 border-stone-200 text-stone-500 font-medium">Feature</th>
                  <th className="text-left p-4 border-b-2 border-primary bg-primary/5 text-primary font-medium">DentaSmart</th>
                  <th className="text-left p-4 border-b-2 border-stone-200 text-stone-500 font-medium">{data.competitor}</th>
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row, idx) => (
                  <tr key={idx} className="border-b border-stone-100">
                    <td className="p-4 font-medium text-black">{row.feature}</td>
                    <td className="p-4 bg-primary/5">
                      <div className="flex items-center gap-2">
                        {row.dentasmartWins ? (
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <span className="w-5 h-5 flex-shrink-0" />
                        )}
                        <span className="text-stone-700">{row.dentasmart}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {!row.dentasmartWins ? (
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-stone-300 flex-shrink-0" />
                        )}
                        <span className="text-stone-700">{row.competitor}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Verdict */}
          <div className="mt-12 bg-stone-50 rounded-2xl p-8 border border-stone-100">
            <h2 className="text-2xl font-medium text-black mb-4">The Verdict</h2>
            <p className="text-lg text-stone-600 font-light leading-relaxed">{data.verdict}</p>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 py-7 text-lg font-medium cursor-pointer">
              <Link href="/pricing/" onClick={() => trackEvent("cta_get_score_click", { source: `compare_${slug}` })}>
                Compare DentaSmart Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
