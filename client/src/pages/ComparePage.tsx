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

interface ComparisonRow {
  feature: string;
  dentasmart: string;
  competitor: string;
  dentasmartWins?: boolean;
}

interface CompareData {
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroHeading: string;
  heroSubheading: string;
  competitor: string;
  competitorDesc: string;
  dentasmartDesc: string;
  rows: ComparisonRow[];
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
    metaTitle: "DentaSmart vs Dental Insurance | Different Purposes",
    metaDescription: "Compare DentaSmart's educational oral health tools with dental insurance. Learn what each may do, what neither replaces, and questions to review.",
    heroHeading: "DentaSmart vs Dental Insurance",
    heroSubheading: "DentaSmart and dental insurance serve different purposes. A dental plan may help pay for eligible services under its own terms. DentaSmart provides educational oral-health tools and does not provide insurance benefits. Neither replaces professional dental care, and neither is a universal replacement for the other.",
    competitor: "Dental Insurance",
    competitorDesc: "Dental insurance may help pay for eligible dental services according to plan terms. Coverage features and cost-sharing can vary.",
    dentasmartDesc: "Educational oral health tools that help organize supported records and treatment questions. DentaSmart is not insurance and does not diagnose conditions.",
    rows: [
      { feature: "Purpose", dentasmart: "Educational oral-health tools for supported information and questions", competitor: "May help pay for eligible dental services under plan terms" },
      { feature: "Insurance coverage", dentasmart: "No. DentaSmart is not insurance.", competitor: "Benefits and covered services depend on the plan" },
      { feature: "Dental claims", dentasmart: "Does not pay dental claims", competitor: "Plan payment depends on eligible services and plan terms" },
                { feature: "Professional care", dentasmart: "Does not diagnose, prescribe treatment, or replace professional care", competitor: "Plan coverage does not replace professional diagnosis or treatment" },
      { feature: "Availability", dentasmart: "Services are available directly to consumers", competitor: "May be available through employers, individual plans, or Marketplace options." },
      { feature: "What to review", dentasmart: "Service scope, supported information, and what the service does not provide", competitor: "Premium, deductible, covered services, network rules, waiting periods, and out-of-pocket terms, if applicable" },
    ],
    verdict: "DentaSmart is not dental insurance and does not replace professional care. Review current insurance terms separately and use DentaSmart for educational organization of supported information.",
  },
};

export default function ComparePage() {
  const [, params] = useRoute("/compare/:slug");
  const slug = params?.slug || "";
  const data = slug ? compareData[slug] : null;
  const isInsuranceComparison = slug === "dentasmart-vs-dental-insurance";

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
      <section className={`relative flex items-center overflow-hidden ${isInsuranceComparison ? "min-h-[52vh]" : "min-h-[70vh]"}`}>
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-primary/10" />
        </div>
        <div className={`container relative z-10 px-4 mx-auto max-w-5xl text-center ${isInsuranceComparison ? "py-20 md:py-24" : "pt-40 md:pt-32"}`}>
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

      {isInsuranceComparison && (
        <>
          <section className="py-16 bg-white">
            <div className="container px-4 mx-auto max-w-5xl">
              <div className="grid gap-10 md:grid-cols-2">
                <div>
                  <h2 className="text-3xl font-medium text-black mb-4">What dental insurance may do</h2>
                  <p className="text-lg text-stone-600 font-light leading-relaxed">
                    Depending on the plan, dental insurance may help pay for eligible services. When you compare a plan, look at its premium, deductible, copayments or coinsurance, covered services, provider-network rules, waiting periods, annual maximum, and out-of-pocket terms, if they apply.
                  </p>
                </div>
                <div>
                  <h2 className="text-3xl font-medium text-black mb-4">What DentaSmart does</h2>
                  <p className="text-lg text-stone-600 font-light leading-relaxed">
                    DentaSmart offers Free Quick Check, Full Quick Check, Treatment Plan Review, and Complete Care. Treatment Plan Review helps you understand a dentist&apos;s recommendation. Complete Care Individual is {pricing.completeCareIndividual.priceFormatted}/year. DentaSmart is not insurance, does not pay dental claims, diagnose conditions, prescribe treatment, or replace professional care.
                  </p>
                  <Link href="/product-facts/" className="inline-flex mt-4 text-primary font-medium hover:underline">
                    See DentaSmart product facts
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-stone-50">
            <div className="container px-4 mx-auto max-w-5xl">
              <h2 className="text-3xl font-medium text-black mb-8">Key differences</h2>
              <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white" tabIndex={0} aria-label="Comparison table: DentaSmart and dental insurance">
                <table className="w-full min-w-[760px] border-collapse">
                  <thead>
                    <tr>
                      <th scope="col" className="text-left p-4 border-b-2 border-stone-200 text-stone-600 font-medium">Comparison point</th>
                      <th scope="col" className="text-left p-4 border-b-2 border-primary bg-primary/5 text-primary font-medium">DentaSmart</th>
                      <th scope="col" className="text-left p-4 border-b-2 border-stone-200 text-stone-600 font-medium">Dental insurance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.rows.map((row, idx) => (
                      <tr key={idx} className="border-b border-stone-100 last:border-b-0">
                        <th scope="row" className="p-4 text-left align-top font-medium text-black">{row.feature}</th>
                        <td className="p-4 align-top bg-primary/5 text-stone-700">{row.dentasmart}</td>
                        <td className="p-4 align-top text-stone-700">{row.competitor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="py-16 bg-white">
            <div className="container px-4 mx-auto max-w-5xl">
              <div className="grid gap-10 md:grid-cols-2">
                <div>
                  <h2 className="text-3xl font-medium text-black mb-4">What neither replaces</h2>
                  <p className="text-lg text-stone-600 font-light leading-relaxed">
                    Dental insurance may help with eligible costs, but insurance itself does not replace diagnosis or treatment from a dental professional. DentaSmart also does not replace professional dental care.
                  </p>
                </div>
                <div>
                  <h2 className="text-3xl font-medium text-black mb-4">Can someone use both?</h2>
                  <p className="text-lg text-stone-600 font-light leading-relaxed">
                    Some people may use DentaSmart and dental coverage for different needs. Whether coverage is useful depends on your plan, expected needs, budget, and circumstances. DentaSmart does not substitute for coverage or professional care.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-stone-50">
            <div className="container px-4 mx-auto max-w-5xl">
              <h2 className="text-3xl font-medium text-black mb-6">Questions to compare in your dental plan</h2>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="rounded-2xl bg-white p-7 border border-stone-200">
                  <h3 className="text-xl font-medium text-black mb-4">Questions about a dental plan</h3>
                  <ul className="space-y-3 text-stone-700 leading-relaxed list-disc pl-5">
                    <li>What is the premium and deductible?</li>
                    <li>Which services are covered, and what may you pay out of pocket?</li>
                    <li>Are there provider-network rules, an annual maximum, or waiting periods?</li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-white p-7 border border-stone-200">
                  <h3 className="text-xl font-medium text-black mb-4">Questions about DentaSmart</h3>
                  <ul className="space-y-3 text-stone-700 leading-relaxed list-disc pl-5">
                    <li>Which DentaSmart service fits the information you want to understand?</li>
                    <li>What information, images, or records does that service use?</li>
                    <li>What does the service not provide?</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="py-14 bg-white">
            <div className="container px-4 mx-auto max-w-5xl">
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-8">
                <h2 className="text-2xl font-medium text-black mb-3">Sources for dental plan information</h2>
                <p className="text-stone-600 font-light leading-relaxed">
                  Dental plan terms can vary. Review current plan documents before enrolling or using a plan. This page uses consumer guidance from{" "}
                  <a className="text-primary font-medium hover:underline" href="https://www.healthcare.gov/coverage/dental-coverage/">HealthCare.gov: Dental coverage in the Marketplace</a>{" "}
                  and the{" "}
                  <a className="text-primary font-medium hover:underline" href="https://www.ada.org/resources/practice/dental-insurance/typical-dental-plan-benefits-and-limitations">American Dental Association: Typical Dental Plan Benefits and Limitations</a>, plus{" "}
                  <a className="text-primary font-medium hover:underline" href="https://www.bls.gov/news.release/ebs2.nr0.htm">U.S. Bureau of Labor Statistics: Employee Benefits in the United States</a>{" "}
                  for employer dental-benefit availability.
                </p>
              </div>
              <div className="text-center mt-10">
                <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 py-7 text-lg font-medium cursor-pointer">
                  <Link href="/pricing/" onClick={() => trackEvent("cta_get_score_click", { source: `compare_${slug}` })}>
                    View DentaSmart services and pricing
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Comparison Table */}
      {!isInsuranceComparison && (
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
      )}

      <Footer />
    </div>
  );
}
