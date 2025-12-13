import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  HeroSection,
  StepsSection,
  CTASection,
} from "@/components/Sections";
import { Button } from "@/components/ui/button";

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <HeroSection
        headline="Know what's going on—before it hurts."
        subheadline="Three steps to feel confident and prepared for every dental visit."
        primaryCTA={{
          label: "Download the App",
        }}
      >
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg h-96 flex items-center justify-center border border-primary/20">
          <div className="text-center">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-foreground/60">How It Works</p>
          </div>
        </div>
      </HeroSection>

      {/* Steps Section */}
      <StepsSection
        headline="Three simple steps"
        steps={[
          {
            number: 1,
            title: "Upload",
            description:
              "Take guided mouth photos. Upload X-rays if you have them.",
          },
          {
            number: 2,
            title: "Understand",
            description:
              "Get a simple report in plain language—what it might mean and what to ask.",
          },
          {
            number: 3,
            title: "Act",
            description:
              "Walk into the dentist prepared with your report and questions.",
          },
        ]}
      />

      {/* Use Cases Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Use DentaSmart when you need it most.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Between Visits",
                description: "Track changes monthly",
                icon: "📅",
              },
              {
                title: "Before an Appointment",
                description: "Know what to ask",
                icon: "🎯",
              },
              {
                title: "Before a Big Procedure",
                description: "Get a second opinion",
                icon: "💡",
              },
            ].map((useCase, idx) => (
              <div
                key={idx}
                className="bg-secondary rounded-lg p-8 border border-border hover:border-primary transition-colors text-center"
              >
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                  {useCase.title}
                </h3>
                <p className="text-foreground/80">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll See Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            What you'll see in your report.
          </h2>
          <div className="space-y-6">
            {[
              "What looks worth checking",
              "What it could mean (plain words)",
              "What to do next",
              "Questions to ask your dentist",
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold">
                  ✓
                </div>
                <p className="text-lg text-foreground/80 pt-1">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        headline="Ready for your first check?"
        primaryCTA={{
          label: "Download the App",
        }}
      />

      <Footer />
    </div>
  );
}
