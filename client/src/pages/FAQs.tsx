import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UserChallengesCarousel } from "@/components/UserChallengesCarousel";
import faqChallenges from "@/data/faqChallenges.json";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

// Map FAQ challenge IDs to their image paths
const faqChallengeImages: Record<number, string> = {
  1: '/images/faq/privacy_security.jpg',
  2: '/images/faq/ai_accuracy.jpg',
  3: '/images/faq/dentist_relationship.jpg',
  4: '/images/faq/no_insurance_cost.jpg',
  5: '/images/faq/kids_family.jpg',
  6: '/images/faq/phone_only.jpg',
  7: '/images/faq/fast_results.jpg',
  8: '/images/faq/second_opinion_crown.jpg',
  9: '/images/faq/emergency_help.jpg',
  10: '/images/faq/braces_ortho.jpg',
  11: '/images/faq/cancel_anytime.jpg',
  12: '/images/faq/share_doctor.jpg',
  13: '/images/faq/invisible_pain.jpg',
  14: '/images/faq/prevention_tips.jpg',
  15: '/images/faq/easy_tech.jpg',
};

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqCategories = [
    {
      title: "Getting Started",
      faqs: [
        { q: "How do I get started with DentaSmart?", a: "Download the app from the App Store or Google Play, create an account, and take your first mouth photos or upload X-rays. You'll get your first report within minutes." },
        { q: "Do I need to be a patient at a specific dental office?", a: "No. DentaSmart works with any dentist at any dental office. It's designed to complement your existing dental care." },
        { q: "Is there a free trial?", a: "Yes. Download the app and try DentaSmart free for 7 days. No credit card required." },
        { q: "What if I don't have any X-rays?", a: "No problem. You can start with monthly mouth photos using your smartphone. Upload X-rays whenever you have them." },
      ],
    },
    {
      title: "How It Works",
      faqs: [
        { q: "How accurate is the AI analysis?", a: "Our AI has 100% detection accuracy for identifying potential areas of concern. It's trained by dental experts and validated against clinical outcomes. However, it's not a substitute for a professional dental exam." },
        { q: "What can DentaSmart detect?", a: "DentaSmart can identify potential cavities, gum disease, tooth wear, alignment issues, and other visible oral health concerns. It provides educational insights to help you understand what you're seeing." },
        { q: "How long does analysis take?", a: "Analysis is typically completed within 1-2 minutes of uploading your images or X-rays." },
        { q: "Can I share my report with my dentist?", a: "Yes. You can easily share your DentaSmart report with your dentist via email or print it out to bring to your appointment." },
      ],
    },
    {
      title: "Privacy & Security",
      faqs: [
        { q: "Is my data secure?", a: "Yes. All data is encrypted end-to-end and stored on secure, HIPAA-compliant servers. We never sell your data." },
        { q: "Who has access to my information?", a: "Only you and anyone you explicitly share your report with (like your dentist) have access to your information." },
        { q: "How long is my data stored?", a: "Your data is stored for as long as your account is active. You can request deletion anytime." },
        { q: "Is DentaSmart HIPAA compliant?", a: "Yes. DentaSmart is fully HIPAA compliant and meets all healthcare privacy and security standards." },
      ],
    },
    {
      title: "Pricing & Plans",
      faqs: [
        { q: "What's the difference between Clarity and Consult?", a: "Clarity is $75/year for ongoing monthly monitoring and wellness tracking. Consult is $30 one-time for a second opinion on a specific treatment plan." },
        { q: "Can I cancel anytime?", a: "Yes. You can cancel your subscription anytime without penalties." },
        { q: "Do you offer family plans?", a: "Family plans are coming soon with the Complete plan. Sign up for the waitlist to be notified." },
        { q: "Is there a money-back guarantee?", a: "Yes. We offer a 30-day money-back guarantee on all plans." },
      ],
    },
    {
      title: "Dr. Din",
      faqs: [
        { q: "What is Dr. Din?", a: "Dr. Din is your 24/7 AI dental companion. You can chat with Dr. Din anytime to ask questions about your oral health, get explanations, or prepare for dental appointments." },
        { q: "Is Dr. Din a real dentist?", a: "No, Dr. Din is an AI trained by real dentists. Dr. Din provides educational guidance, not medical advice. Always consult with your dentist for medical decisions." },
        { q: "Can Dr. Din diagnose me?", a: "Dr. Din can't diagnose conditions, but can help you understand your symptoms and prepare questions for your dentist." },
        { q: "Is Dr. Din available 24/7?", a: "Yes. Dr. Din is available anytime, anywhere. Responses are typically instant." },
      ],
    },
    {
      title: "Technical",
      faqs: [
        { q: "What phones does DentaSmart work on?", a: "DentaSmart works on iOS 14+ and Android 10+. Download from the App Store or Google Play." },
        { q: "Do I need an internet connection?", a: "Yes, you need internet to upload images and get analysis. Some features work offline." },
        { q: "Can I use DentaSmart on my computer?", a: "Currently, DentaSmart is mobile-only. We're working on a web version." },
        { q: "What if I have technical issues?", a: "Contact our support team at support@dentasmart.ai or through the app. We typically respond within 24 hours." },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-stone-200">
      <Navigation />

      {/* Hero Section - Calm & Clear */}
      <section className="relative py-24 md:py-52 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/backgrounds/hero-faqs-book.jpg" 
            alt="DentaSmart FAQs" 
            className="w-full h-full object-cover object-top md:object-center"
          />
          <div className="absolute inset-0 bg-white/85 md:bg-white/60" />
        </div>

        <div className="container relative z-10 px-4 mx-auto text-left max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-light tracking-tight text-foreground mb-8 leading-[1.1]">
              Common questions
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mr-auto font-light leading-relaxed">
              Everything you need to know about DentaSmart. Can't find your answer? Reach out to our support team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* User Challenges Carousel */}
      <section className="py-20 bg-stone-100">
        <UserChallengesCarousel 
          challenges={faqChallenges} 
          images={faqChallengeImages}
          title="Your questions, answered"
          subtitle="Explore real-world scenarios and find clarity on how DentaSmart fits into your life."
        />
      </section>

      {/* FAQs */}
      <section className="py-24 bg-white">
        <div className="container px-4 mx-auto max-w-3xl">
          {faqCategories.map((category, catIdx) => (
            <div key={catIdx} className="mb-20 last:mb-0">
              <h2 className="text-3xl font-light tracking-tight text-stone-900 mb-8 pb-4 border-b border-stone-200">
                {category.title}
              </h2>
              <div className="space-y-4">
                {category.faqs.map((faq, idx) => {
                  const globalIdx = catIdx * 100 + idx;
                  const isOpen = openIndex === globalIdx;
                  return (
                    <div key={idx} className="group">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIdx)}
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
          ))}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-32 bg-[#D0F0F5] text-center">
        <div className="container px-4 mx-auto text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-6">
            Still have questions?
          </h2>
          <p className="text-xl text-muted-foreground font-light mb-12">
            Our support team is here to help. Reach out anytime.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12 text-left max-w-lg mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
              <h3 className="text-lg font-medium text-foreground mb-2">Email Support</h3>
              <p className="text-muted-foreground font-light mb-4">Get a response within 24 hours.</p>
              <a href="mailto:support@dentasmart.ai" className="text-primary font-medium hover:underline">
                support@dentasmart.ai
              </a>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
              <h3 className="text-lg font-medium text-foreground mb-2">In-App Chat</h3>
              <p className="text-muted-foreground font-light mb-4">Available 24/7 for instant help.</p>
              <span className="text-primary font-medium">
                Open the DentaSmart App
              </span>
            </div>
          </div>

          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg h-auto transition-all duration-300 hover:scale-105 shadow-lg">
            Contact Support
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
