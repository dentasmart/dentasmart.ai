import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useRoute } from "wouter";

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
    metaTitle: "DentaSmart vs ChatGPT for Dental Advice - Which Is Better?",
    metaDescription: "Compare DentaSmart's AI dental analysis with ChatGPT for dental questions. See why purpose-built dental AI outperforms general chatbots for oral health.",
    heroHeading: "DentaSmart vs ChatGPT",
    heroSubheading: "General AI gives general answers. DentaSmart gives you a personalized oral health report based on your actual teeth.",
    competitor: "ChatGPT",
    competitorDesc: "General-purpose AI chatbot that can answer dental questions based on training data, but cannot analyze images or provide personalized assessments.",
    dentasmartDesc: "Purpose-built dental AI that analyzes your photos and X-rays to give you a personalized oral health score and care plan.",
    rows: [
      { feature: "Analyzes your dental photos", dentasmart: "Yes, AI image analysis", competitor: "No image analysis", dentasmartWins: true },
      { feature: "Reads dental X-rays", dentasmart: "Yes, trained on dental X-rays", competitor: "Cannot process X-rays", dentasmartWins: true },
      { feature: "Personalized oral health score", dentasmart: "Yes, 0-100 score", competitor: "No scoring system", dentasmartWins: true },
      { feature: "Care plan with cost estimates", dentasmart: "Yes, treatment costs included", competitor: "Generic advice only", dentasmartWins: true },
      { feature: "Tracks progress over time", dentasmart: "Yes, historical tracking", competitor: "No memory between chats", dentasmartWins: true },
      { feature: "General dental Q&A", dentasmart: "Yes, via Din AI assistant", competitor: "Yes, broad knowledge", dentasmartWins: false },
      { feature: "Reviewed by dental professionals", dentasmart: "Yes, clinically advised", competitor: "No clinical review", dentasmartWins: true },
    ],
    verdict: "ChatGPT is great for general questions, but it cannot look at your teeth. DentaSmart analyzes your actual dental images and gives you a personalized report, something no general chatbot can do.",
  },
  "dentasmart-vs-teledentistry": {
    title: "DentaSmart vs Teledentistry",
    metaTitle: "DentaSmart vs Teledentistry - Compare AI Dental Analysis vs Video Calls",
    metaDescription: "Compare DentaSmart's instant AI dental analysis with traditional teledentistry video calls. See which option gives you faster, more affordable dental clarity.",
    heroHeading: "DentaSmart vs Teledentistry",
    heroSubheading: "Teledentistry means waiting for an appointment. DentaSmart gives you instant clarity, no scheduling, no waiting room.",
    competitor: "Teledentistry",
    competitorDesc: "Video call with a licensed dentist who can visually assess your concerns and provide recommendations, but requires scheduling and fees per visit.",
    dentasmartDesc: "Instant AI analysis of your dental photos and X-rays, available 24/7 with no appointment needed.",
    rows: [
      { feature: "Available 24/7", dentasmart: "Yes, instant access", competitor: "Limited hours", dentasmartWins: true },
      { feature: "No appointment needed", dentasmart: "Yes, upload anytime", competitor: "Requires scheduling", dentasmartWins: true },
      { feature: "Cost per consultation", dentasmart: "$4.99/month unlimited", competitor: "$50-150 per visit", dentasmartWins: true },
      { feature: "Results speed", dentasmart: "Under 10 minutes", competitor: "15-30 minute wait", dentasmartWins: true },
      { feature: "Image analysis", dentasmart: "AI-powered X-ray & photo analysis", competitor: "Visual assessment only", dentasmartWins: true },
      { feature: "Prescriptions", dentasmart: "No, not a replacement for dentist", competitor: "Yes, licensed provider", dentasmartWins: false },
      { feature: "Progress tracking", dentasmart: "Yes, historical scores", competitor: "Varies by provider", dentasmartWins: true },
    ],
    verdict: "Teledentistry is valuable when you need a prescription or professional diagnosis. But for everyday monitoring and quick clarity about your oral health, DentaSmart is faster, cheaper, and always available.",
  },
  "dentasmart-vs-dental-insurance": {
    title: "DentaSmart vs Dental Insurance",
    metaTitle: "DentaSmart vs Dental Insurance - Do You Need Both?",
    metaDescription: "Compare DentaSmart's AI oral health monitoring with traditional dental insurance. Learn how DentaSmart helps you save money and catch problems early.",
    heroHeading: "DentaSmart vs Dental Insurance",
    heroSubheading: "Insurance covers treatment after problems happen. DentaSmart helps you catch issues early. Before they become expensive.",
    competitor: "Dental Insurance",
    competitorDesc: "Traditional dental insurance that covers a portion of dental procedures after deductibles and waiting periods, typically costing $30-60/month.",
    dentasmartDesc: "AI-powered oral health monitoring that helps you catch dental issues early and understand your treatment options before visiting the dentist.",
    rows: [
      { feature: "Monthly cost", dentasmart: "$4.99/month", competitor: "$30-60/month", dentasmartWins: true },
      { feature: "Waiting period", dentasmart: "None. Instant access", competitor: "6-12 months for major work", dentasmartWins: true },
      { feature: "Covers dental procedures", dentasmart: "No, monitoring tool", competitor: "Yes, partial coverage", dentasmartWins: false },
      { feature: "Early problem detection", dentasmart: "Yes, AI monitoring", competitor: "Only at scheduled visits", dentasmartWins: true },
      { feature: "Cost transparency", dentasmart: "Yes, shows estimated costs", competitor: "Complex benefit schedules", dentasmartWins: true },
      { feature: "Available without employer", dentasmart: "Yes, direct to consumer", competitor: "Often employer-tied", dentasmartWins: true },
      { feature: "Helps choose right dentist type", dentasmart: "Yes, recommends specialist type", competitor: "Limited to network", dentasmartWins: true },
    ],
    verdict: "DentaSmart is not a replacement for dental insurance. It is a complement. Use DentaSmart to monitor your oral health daily and catch issues early. Use insurance when you need treatment. Together, they help you spend less and stay healthier.",
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
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 py-7 text-lg font-medium cursor-pointer"
              onClick={() => {
                trackEvent("cta_get_score_click", { source: `compare_${slug}` });
                window.location.href = "/#download-cta";
              }}
            >
              Try DentaSmart Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
