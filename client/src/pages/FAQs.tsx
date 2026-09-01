import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { BenefitsCarousel } from "@/components/BenefitsCarousel";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DownloadSection } from "@/components/DownloadSection";
import FAQSchema from "@/components/FAQSchema";
import { BreadcrumbSchema } from "@/components/StructuredData";

// Map FAQ challenge IDs to their image paths
const faqChallengeImages: Record<number, string> = {
  1: '/images/optimized/ortFUKlUXMHBiXYm-800.webp',
  2: '/images/optimized/qOeGvQuJnUqtvRvT-800.webp',
  3: '/images/optimized/llLRbXoCzeyMeAfn-800.webp',
  4: '/images/optimized/eugbQZohrtgtbTJx-800.webp',
  5: '/images/optimized/FpadAgriSErcKtgI-800.webp',
  6: '/images/optimized/dXXgcWAdPttMxeda-800.webp',
  7: '/images/optimized/EOTithFPkyVmOBis-800.webp',
  8: '/images/optimized/jXdMmoTEdbWUcSpb-800.webp',
  9: '/images/optimized/gGapYAFZQmpdrPCF-800.webp',
  10: '/images/optimized/ZTdIbrjtUSmXULHA-800.webp',
  11: '/images/optimized/FQmXcgOOtzipJgcp-800.webp',
  12: '/images/optimized/MvlpeGIipAfhvGbU-800.webp',
  13: '/images/optimized/QCxaOOzMPDUukYbC-800.webp',
  14: '/images/optimized/PriyWZEyjWTnjbVz-800.webp',
  15: '/images/optimized/nlpGZGfIENeWYTMQ-800.webp',
};

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const faqCategories = [
    {
      title: "Getting Started",
      faqs: [
        { q: "How do I get started with DentaSmart?", a: "Download the app from the App Store or Google Play, create an account, and add the supported photos, X-rays, symptoms, or treatment documents needed for the service you choose. Report timing depends on the service and the information submitted." },
        { q: "Is DentaSmart free to download?", a: "Yes. The app is free to download. Quick Check and Second Opinion are paid one-time services, and Complete Care is an annual paid plan." },
        { q: "What phones does DentaSmart work on?", a: "DentaSmart works on iOS 14+ and Android 10+. Download from the App Store or Google Play." },
      ],
    },
    {
      title: "Photos and X-rays",
      faqs: [
        { q: "What if I don't have any X-rays?", a: "No problem. You can start with monthly mouth photos using your smartphone. Upload X-rays whenever you have them." },
        { q: "How long does analysis take?", a: "Processing time can vary by image quality and the selected service. If your symptoms are severe, worsening, or urgent, do not wait for a report; contact a dentist or emergency service." },
        { q: "What can DentaSmart show me?", a: "DentaSmart can highlight visible areas that may warrant attention, such as possible signs of cavities, gum inflammation, tooth wear, or alignment concerns. These are educational insights, not a diagnosis." },
      ],
    },
    {
      title: "Accuracy and Safety",
      faqs: [
        { q: "How should I use DentaSmart's AI results?", a: "Use DentaSmart's educational observations to organize questions and records for a dental visit. DentaSmart does not publish a universal accuracy rate, diagnose conditions, or replace a professional examination." },
        { q: "Is Dr Din a real dentist?", a: "No. Dr Din is an AI oral health guide that can explain report language and common dental terms. It does not provide a diagnosis or replace professional dental care." },
        { q: "Can Dr Din diagnose me?", a: "No. Dr Din can explain report language and common dental terms, but it cannot diagnose conditions or replace a dentist. Use it to prepare questions for professional care." },
      ],
    },
    {
      title: "Privacy",
      faqs: [
        { q: "Is my data secure?", a: "We use safeguards designed to protect your information. DentaSmart never sells your data." },
        { q: "Who has access to my information?", a: "You can choose when to share your DentaSmart reports with your dentist or others." },
        { q: "How do you protect my information?", a: "We take the privacy and security of your information seriously. Please review our Privacy Policy to understand how we collect, use, and handle information." },
        { q: "How long is my data stored?", a: "We retain information as described in our Privacy Policy. You can request account deletion at any time." },
      ],
    },
    {
      title: "Pricing",
      faqs: [
        { q: "What are DentaSmart's pricing options?", a: "Quick Check is $19.99 one-time. Second Opinion is $29.99 one-time. Complete Care is $74.99/year for individuals or $149.99/year for families of up to 4 members. Additional family members beyond 4 are $19.99/year each. The app is free to download; these services are paid." },
        { q: "Do you offer family plans?", a: "Yes. The Complete Care Family plan is $149.99/year and covers up to 4 family members (including the main user). Each member gets their own profile, reports, Oral Health Score tracking, and dental history. Additional members beyond 4 are $19.99/year each." },
        { q: "Can I cancel anytime?", a: "Yes. You can cancel your subscription anytime without penalties." },

      ],
    },
    {
      title: "Dentist Relationship",
      faqs: [
        { q: "Do I need to be a patient at a specific dental office?", a: "No. DentaSmart works with any dentist at any dental office. It's designed to complement your existing dental care." },
        { q: "Can I share my report with my dentist?", a: "Yes. You can easily share your DentaSmart report with your dentist via email or print it out to bring to your appointment." },
        { q: "Is it a dentist replacement?", a: "No. DentaSmart is a tool to help you monitor your oral health between visits and understand your dentist's recommendations better. It does not replace professional care." },
      ],
    },
    {
      title: "New Features",
      faqs: [
        { q: "What is Quick Check?", a: "Quick Check is a $19.99 one-time educational review of supported mouth photos and dental X-rays. When included, it provides visible observations, an Oral Health Score, a patient-friendly report, and Dr Din access for 30 days. It does not provide a diagnosis." },
        { q: "What are the Self-Examination tests?", a: "When included with Complete Care, guided self-examination can help you record observations from a Bite Pressure Test, Cold Sensitivity Test, and Visual Inspection checklist. These observations add context but do not replace a clinical examination." },
        { q: "What's the difference between the two report formats?", a: "When both formats are included with a selected service, the 'For You' report explains information in plain language and the 'For Dentist' report organizes details for a professional conversation. Available reports can be downloaded and shared." },
        { q: "Can I share the dentist report directly?", a: "Yes. Both report versions can be downloaded as PDF and shared via email or printed to bring to your dental appointment." },
        { q: "Is Quick Check different from a Complete Oral Health Checkup?", a: "Yes. Quick Check is a $19.99 one-time educational review of supported mouth photos and dental X-rays. Complete Care adds year-round monitoring, guided self-examination, reports, Oral Health Score tracking, record organization, and Dr Din access. Neither service provides a diagnosis or replaces professional dental care." },
      ],
    },
  ];

  // Flatten FAQs for search
  const allFaqs = faqCategories.flatMap(cat => 
    cat.faqs.map(faq => ({ ...faq, category: cat.title }))
  );
  const schemaFaqs = allFaqs.map(({ q, a }) => ({ question: q, answer: a }));

  // Filter logic
  const filteredFaqs = allFaqs.filter(faq => {
    const matchesSearch = faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group filtered FAQs back by category for display (if "All" is selected)
  // Or display as a single list if searching/filtering specific category
  const displayCategories = selectedCategory === "All" && !searchQuery 
    ? faqCategories 
    : [{ title: searchQuery ? "Search Results" : selectedCategory, faqs: filteredFaqs }];

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-stone-200">
      <SEO
        title="Frequently Asked Questions - DentaSmart"
        description="Find answers to common questions about DentaSmart. Learn about getting started, photos and X-rays, accuracy and safety, privacy, pricing, and your relationship with your dentist."
        canonical="https://dentasmart.ai/faqs"
      />
      <Navigation />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "FAQs", url: "/faqs" }
      ]} />
      <FAQSchema faqs={schemaFaqs} />

      {/* Hero Section - Calm & Clear with Image */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img loading="lazy" src="/images/optimized/GqjyClSdowSQrUkA-800.webp" 
            alt="Woman finding answers on her phone" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/60 md:hidden" />
        </div>

        <div className="container relative z-10 px-4 mx-auto text-left max-w-7xl pt-40 md:pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 xl:col-span-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-6 leading-[1.1]">
                Get answers, <br />
                <span className="font-normal italic text-primary">not confusion</span>.
              </h1>
              <p className="text-lg md:text-xl text-stone-700 font-normal max-w-2xl mr-auto leading-relaxed mb-8">
                You have questions about your dental health and our app. We have clear, simple answers. No jargon, just the facts.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl mr-auto mb-8">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-stone-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search for a question (e.g., 'price', 'privacy', 'accuracy')..."
                  className="pl-12 py-6 text-lg rounded-full bg-white border-stone-200 text-stone-900 placeholder:text-stone-400 focus:border-primary shadow-lg transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap justify-start gap-3">
                <Button
                  variant={selectedCategory === "All" ? "default" : "outline"}
                  className={`min-h-11 rounded-full px-6 ${
                    selectedCategory === "All"
                      ? "bg-action text-action-foreground hover:bg-action-hover border-action shadow-md"
                      : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50 hover:text-stone-900"
                  }`}
                  onClick={() => setSelectedCategory("All")}
                >
                  All
                </Button>
                {faqCategories.map((cat) => (
                  <Button
                    key={cat.title}
                    variant={selectedCategory === cat.title ? "default" : "outline"}
                    className={`min-h-11 rounded-full px-6 ${
                      selectedCategory === cat.title 
                        ? "bg-action text-action-foreground hover:bg-action-hover border-action shadow-md"
                        : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50 hover:text-stone-900"
                    }`}
                    onClick={() => setSelectedCategory(cat.title)}
                  >
                    {cat.title}
                  </Button>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Empty to let background image show through */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-6"></div>
          </div>
        </div>
      </section>

      {/* Benefits Carousel */}
      <section className="py-12 bg-stone-50 overflow-hidden">
        <BenefitsCarousel />
      </section>

      {/* FAQs */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto max-w-3xl">
          {displayCategories.map((category, catIdx) => (
            category.faqs.length > 0 ? (
              <div key={catIdx} className="mb-20 last:mb-0">
                <h2 className="text-3xl font-light tracking-tight text-stone-900 mb-8 pb-4 border-b border-stone-200">
                  {category.title}
                </h2>
                <div className="space-y-4">
                  {category.faqs.map((faq, idx) => {
                    // Create a unique ID based on the question text to avoid index collisions when filtering
                    const uniqueId = faq.q.replace(/\s+/g, '-').toLowerCase();
                    const isOpen = openIndex === (uniqueId as any); 
                    
                    return (
                      <div key={idx} className="group">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : uniqueId as any)}
                        className="w-full flex items-start justify-between py-6 text-left focus:outline-none"
                      >
                        <h3 className="text-xl font-medium text-stone-900 pr-8 group-hover:text-stone-600 transition-colors">
                          {faq.q}
                        </h3>
                        <span className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center transition-all duration-300 ${
                          isOpen ? "bg-stone-900 text-white border-stone-900 rotate-180" : "bg-transparent text-stone-400 group-hover:border-stone-400 group-hover:text-stone-600"
                        }`}>
                          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </span>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="text-lg text-stone-600 font-light leading-relaxed pb-8 pr-12">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
            ) : null
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <DownloadSection />

      <Footer />
    </div>
  );
}
