import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { HeroSection, CTASection } from "@/components/Sections";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQs() {
  const faqCategories = [
    {
      title: "Getting Started",
      faqs: [
        {
          q: "Do I need X-rays to use DentaSmart?",
          a: "No. You can start with monthly mouth photos. Upload X-rays when you have them.",
        },
        {
          q: "What devices work with DentaSmart?",
          a: "iOS and Android. Your account syncs across devices.",
        },
      ],
    },
    {
      title: "What DentaSmart Is (and Isn't)",
      faqs: [
        {
          q: "Is DentaSmart a dentist?",
          a: "No. It helps you understand your oral health and prepares you for better dentist conversations.",
        },
        {
          q: "Is this dental insurance?",
          a: "No. Complete is an alternative model that will include a discount program (coming soon), not insurance.",
        },
      ],
    },
    {
      title: "Accuracy and Safety",
      faqs: [
        {
          q: "Does DentaSmart diagnose cavities?",
          a: "DentaSmart highlights areas to review and explains what they may mean. Your dentist makes the clinical diagnosis.",
        },
        {
          q: "What if I have pain or swelling?",
          a: "If you have severe pain, swelling, fever, or trauma, contact a dentist or urgent care immediately.",
        },
      ],
    },
    {
      title: "Pricing and Plans",
      faqs: [
        {
          q: "What's included in the Family plan?",
          a: "Up to 2 adults and 3 children under 18 in one household.",
        },
        {
          q: "What is Consult?",
          a: "A one-time second opinion for big treatment decisions.",
        },
        {
          q: "When is Complete available?",
          a: "It's coming soon. Join the waitlist to be notified.",
        },
      ],
    },
    {
      title: "Employers",
      faqs: [
        {
          q: "How much does it cost per employee?",
          a: "DentaSmart Complete is shown as $300 per employee per year on the employer page.",
        },
        {
          q: "How fast can we launch?",
          a: "Minutes, not weeks—create an account, upload employees, and send invites.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <HeroSection
        headline="Frequently Asked Questions"
        subheadline="Find answers to common questions about DentaSmart and how it works."
      >
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg h-96 flex items-center justify-center border border-primary/20">
          <div className="text-center">
            <div className="text-6xl mb-4">❓</div>
            <p className="text-foreground/60">FAQs</p>
          </div>
        </div>
      </HeroSection>

      {/* FAQs Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-3xl">
          {faqCategories.map((category, cidx) => (
            <div key={cidx} className="mb-16">
              <h2 className="text-3xl font-display font-bold text-foreground mb-8">
                {category.title}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.faqs.map((faq, fidx) => (
                  <AccordionItem
                    key={fidx}
                    value={`${cidx}-${fidx}`}
                    className="bg-secondary rounded-lg border border-border px-6 py-4 data-[state=open]:border-primary transition-colors"
                  >
                    <AccordionTrigger className="hover:text-primary transition-colors font-semibold text-foreground">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/80 pt-4">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Still have questions?
          </h2>
          <p className="text-lg text-foreground/80 mb-8">
            Send us your question and we'll respond quickly.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="your@email.com"
              className="px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary flex-1 sm:flex-initial"
            />
            <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-colors">
              Contact Support
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
