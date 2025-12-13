import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white via-secondary/30 to-white">
        <div className="container max-w-3xl text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
            Frequently asked questions
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Everything you need to know about DentaSmart. Can't find your answer? Reach out to our support team.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-3xl">
          {faqCategories.map((category, catIdx) => (
            <div key={catIdx} className="mb-16">
              <h2 className="text-3xl font-display font-bold text-foreground mb-8">{category.title}</h2>
              <div className="space-y-4">
                {category.faqs.map((faq, idx) => {
                  const globalIdx = catIdx * 100 + idx;
                  const isOpen = openIndex === globalIdx;
                  return (
                    <div key={idx} className="border border-border rounded-lg overflow-hidden hover:border-primary transition-colors">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIdx)}
                        className="w-full flex items-center justify-between p-6 bg-secondary hover:bg-secondary/80 transition-colors text-left"
                      >
                        <h3 className="font-display font-bold text-foreground pr-4">{faq.q}</h3>
                        <span className={`text-primary text-2xl flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}>
                          ▼
                        </span>
                      </button>
                      {isOpen && (
                        <div className="p-6 bg-white border-t border-border">
                          <p className="text-foreground/70 leading-relaxed">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Didn't find your answer?
          </h2>
          <p className="text-lg text-foreground/70 mb-12">
            Our support team is here to help. Reach out anytime.
          </p>
          <div className="space-y-4 mb-8">
            <p className="text-foreground">
              <span className="font-semibold">Email:</span> support@dentasmart.ai
            </p>
            <p className="text-foreground">
              <span className="font-semibold">Chat:</span> Available in the app 24/7
            </p>
          </div>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg">
            Contact Support
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
