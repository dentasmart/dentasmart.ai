import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BenefitsCarousel } from "@/components/BenefitsCarousel";
import faqChallenges from "@/data/faqChallenges.json";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DownloadSection } from "@/components/DownloadSection";

// Map FAQ challenge IDs to their image paths
const faqChallengeImages: Record<number, string> = {
  1: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/ortFUKlUXMHBiXYm.jpg',
  2: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/qOeGvQuJnUqtvRvT.jpg',
  3: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/llLRbXoCzeyMeAfn.jpg',
  4: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/eugbQZohrtgtbTJx.jpg',
  5: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/FpadAgriSErcKtgI.jpg',
  6: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/dXXgcWAdPttMxeda.jpg',
  7: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/EOTithFPkyVmOBis.jpg',
  8: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/jXdMmoTEdbWUcSpb.jpg',
  9: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/gGapYAFZQmpdrPCF.jpg',
  10: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/ZTdIbrjtUSmXULHA.jpg',
  11: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/FQmXcgOOtzipJgcp.jpg',
  12: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/MvlpeGIipAfhvGbU.jpg',
  13: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/QCxaOOzMPDUukYbC.jpg',
  14: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/PriyWZEyjWTnjbVz.jpg',
  15: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/nlpGZGfIENeWYTMQ.jpg',
};

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const faqCategories = [
    {
      title: "Getting Started",
      faqs: [
        { q: "How do I get started with DentaSmart?", a: "Download the app from the App Store (Android coming soon), create an account, and take your first mouth photos or upload X-rays. You'll get your first report within minutes." },
        { q: "Is there a free trial?", a: "Yes. Download the app and try DentaSmart free for 7 days. No credit card required." },
        { q: "What phones does DentaSmart work on?", a: "DentaSmart works on iOS 14+ and Android 10+. Download from the App Store (Android coming soon)." },
      ],
    },
    {
      title: "Photos and X-rays",
      faqs: [
        { q: "What if I don't have any X-rays?", a: "No problem. You can start with monthly mouth photos using your smartphone. Upload X-rays whenever you have them." },
        { q: "How long does analysis take?", a: "Analysis is typically completed within 1-2 minutes of uploading your images or X-rays." },
        { q: "What can DentaSmart detect?", a: "DentaSmart can identify potential cavities, gum disease, tooth wear, alignment issues, and other visible oral health concerns. It provides educational insights to help you understand what you're seeing." },
      ],
    },
    {
      title: "Accuracy and Safety",
      faqs: [
        { q: "How accurate is the AI analysis?", a: "Our AI has 100% detection accuracy for identifying potential areas of concern. It's trained by dental experts and validated against clinical outcomes. However, it's not a substitute for a professional dental exam." },
        { q: "Is Din a real dentist?", a: "No, Din is an advanced AI trained on vast dental knowledge. Din provides educational guidance, not medical advice. Always consult with your dentist for medical decisions." },
        { q: "Can Din diagnose me?", a: "Din can't diagnose conditions, but can help you understand your symptoms and prepare questions for your dentist." },
      ],
    },
    {
      title: "Privacy",
      faqs: [
        { q: "Is my data secure?", a: "Yes. All data is encrypted end-to-end and stored on secure, HIPAA-compliant servers. We never sell your data." },
        { q: "Who has access to my information?", a: "Only you and anyone you explicitly share your report with (like your dentist) have access to your information." },
        { q: "Is DentaSmart HIPAA compliant?", a: "Yes. DentaSmart is fully HIPAA compliant and meets all healthcare privacy and security standards." },
        { q: "How long is my data stored?", a: "Your data is stored for as long as your account is active. You can request deletion anytime." },
      ],
    },
    {
      title: "Pricing",
      faqs: [
        { q: "What's the difference between Insights and Second Review?", a: "Insights is $75/year for ongoing monthly monitoring and wellness tracking. Second Review is $30 one-time for a specific treatment plan comparison." },
        { q: "Can I cancel anytime?", a: "Yes. You can cancel your subscription anytime without penalties." },
        { q: "Do you offer family plans?", a: "Yes. All our plans offer family options to cover your loved ones. You can easily add family members during signup or from your account settings." },
        { q: "Is there a money-back guarantee?", a: "Yes. We offer a 30-day money-back guarantee on all plans." },
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
  ];

  // Flatten FAQs for search
  const allFaqs = faqCategories.flatMap(cat => 
    cat.faqs.map(faq => ({ ...faq, category: cat.title }))
  );

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
      <Navigation />

      {/* Hero Section - Calm & Clear */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/J78j9z38y0l207r7.jpg" 
            alt="DentaSmart FAQs" 
            className="w-full h-full object-cover object-top md:object-center"
          />
          <div className="absolute inset-0 bg-white/95 md:bg-white/90" />
        </div>

        <div className="container relative z-10 px-4 mx-auto text-left max-w-7xl pt-32 md:pt-0">
          <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Start Here Module */}
            <div className="mb-10 inline-block bg-white/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-medium text-stone-900 mb-2">Start here</h3>
              <p className="text-stone-600 mb-4">If you only do one thing today: get your Oral Health Score.</p>
              <Button 
                onClick={() => document.getElementById('download-cta')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2 text-sm font-medium shadow-md"
              >
                Get My Oral Health Score
              </Button>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-black mb-8 leading-[1.1]">
              Get answers, <br />
              <span className="font-normal italic text-primary">not confusion</span>.
            </h1>
            <p className="text-xl md:text-2xl text-black font-normal max-w-2xl mr-auto leading-relaxed mb-12">
              You have questions about your dental health and our app. We have clear, simple answers. No jargon, just the facts.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mr-auto mb-12">
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
                className={`rounded-full px-6 ${
                  selectedCategory === "All"
                    ? "bg-primary text-white hover:bg-primary/90 border-primary shadow-md" 
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
                  className={`rounded-full px-6 ${
                    selectedCategory === cat.title 
                      ? "bg-primary text-white hover:bg-primary/90 border-primary shadow-md" 
                      : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50 hover:text-stone-900"
                  }`}
                  onClick={() => setSelectedCategory(cat.title)}
                >
                  {cat.title}
                </Button>
              ))}
            </div>
          </motion.div>
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
