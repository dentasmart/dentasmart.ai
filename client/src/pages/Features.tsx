import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  HeroSection,
  BenefitsSection,
  CTASection,
} from "@/components/Sections";
import { Button } from "@/components/ui/button";

export default function Features() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <HeroSection
        headline="Simple tools that keep you ahead."
        subheadline="DentaSmart helps you monitor, understand, and decide—without dental jargon."
        primaryCTA={{
          label: "Download the App",
        }}
      >
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg h-96 flex items-center justify-center border border-primary/20">
          <div className="text-center">
            <div className="text-6xl mb-4">⚙️</div>
            <p className="text-foreground/60">Features</p>
          </div>
        </div>
      </HeroSection>

      {/* Features Section */}
      <BenefitsSection
        headline="Everything you need"
        cards={[
          {
            title: "Monitor",
            bullets: [
              "Guided mouth photos",
              "Monthly reminders",
              "Track changes over time",
            ],
          },
          {
            title: "Understand",
            bullets: [
              "Plain-language explanations",
              "Highlight areas to ask about",
              "Better dentist conversations",
            ],
          },
          {
            title: "Decide",
            bullets: [
              "Side-by-side comparisons",
              "Risks of waiting",
              "Smart questions to ask",
            ],
          },
        ]}
      />

      {/* Dr. Din Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Meet Dr. Din.
          </h2>
          <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
            Dr. Din is your 24/7 dental companion. Ask questions anytime and get clear, calm answers.
          </p>
          <ul className="space-y-4">
            {[
              "Explains results simply",
              "Helps you prepare questions",
              "Supports you anytime",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                <span className="text-foreground/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Dental Record Vault Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Keep your dental history in one place.
          </h2>
          <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
            Store your images and notes so you don't start over when you change dentists or travel.
          </p>
          <ul className="space-y-4">
            {[
              "Keep X-rays organized",
              "Share with a new dentist",
              "Save time in emergencies",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                <span className="text-foreground/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        headline="Get clear answers today."
        primaryCTA={{
          label: "Download the App",
        }}
      />

      <Footer />
    </div>
  );
}
