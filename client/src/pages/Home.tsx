import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  HeroSection,
  ProblemSection,
  EmpathySection,
  BenefitsSection,
  StepsSection,
  CTASection,
} from "@/components/Sections";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <HeroSection
        headline="Stop worrying about your teeth."
        subheadline="DentaSmart is your Personal AI Dental Companion. Upload a quick mouth photo each month, understand your dental images, and know what to do next."
        primaryCTA={{
          label: "Download the App",
        }}
        secondaryCTA={{
          label: "See Pricing",
        }}
        microproof="Works with any dentist. Works with any dental plan."
      >
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg h-96 flex items-center justify-center border border-primary/20">
          <div className="text-center">
            <div className="text-6xl mb-4">📱</div>
            <p className="text-foreground/60">App Preview</p>
          </div>
        </div>
      </HeroSection>

      {/* Problem Section */}
      <ProblemSection
        headline="Dental surprises are expensive."
        body="Most problems don't hurt at first. By the time they do, they cost more."
        bullets={[
          "Small issues grow quietly",
          "Bills show up fast",
          "Insurance is confusing",
        ]}
      />

      {/* Empathy Section */}
      <EmpathySection
        headline="If dental care feels stressful, you're normal."
        body="Most people leave the dentist with unanswered questions. DentaSmart helps you feel confident and prepared."
      />

      {/* Solution Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            A simple monthly check for your mouth.
          </h2>
          <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
            Take a guided photo. Get a clear summary. Track changes over time.
          </p>
          <ul className="space-y-4">
            {[
              "Monthly mouth photo check",
              "Plain-language explanations",
              "A clear next step",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                <span className="text-foreground/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Benefits Section */}
      <BenefitsSection
        headline="Everything you need to stay ahead."
        cards={[
          {
            title: "Monitor",
            bullets: [
              "Monthly photo reminders",
              "Track changes over time",
              "Oral health score",
            ],
          },
          {
            title: "Understand",
            bullets: [
              "Explain X-rays simply",
              "Translate dental terms",
              "See what to ask",
            ],
          },
          {
            title: "Decide",
            bullets: [
              "Second opinion option",
              "Compare treatment choices",
              "Avoid unnecessary spend",
            ],
          },
        ]}
      />

      {/* Steps Section */}
      <StepsSection
        headline="Here's how it works."
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
        cta={{
          label: "Download the App",
        }}
      />

      {/* Sound Bites Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            You shouldn't have to guess.
          </h2>
          <div className="space-y-6">
            {[
              "You shouldn't have to wait for pain—and you won't with DentaSmart.",
              "You shouldn't have to feel confused—and you won't with DentaSmart.",
              "You shouldn't have to fear surprise bills—and you won't with DentaSmart.",
            ].map((soundbite, idx) => (
              <div
                key={idx}
                className="bg-secondary rounded-lg p-6 border border-border"
              >
                <p className="text-foreground/80">{soundbite}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Snapshot */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Choose your plan.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Clarity",
                subtitle: "Prevention",
                price: "$75/year",
                description: "individual",
                best: "people who want prevention and tracking",
                cta: "Get Started",
              },
              {
                name: "Consult",
                subtitle: "Second opinion",
                price: "$30",
                description: "one-time",
                best: "big treatment decisions",
                cta: "Get a Consult",
              },
              {
                name: "Complete",
                subtitle: "Insurance alternative",
                price: "Coming soon",
                description: "$140/year individual",
                best: "discounted care + transparent pricing",
                cta: "Join Waitlist",
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className="bg-background rounded-lg p-8 border border-border hover:border-primary transition-colors"
              >
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {plan.subtitle}
                </p>
                <div className="mb-6">
                  <p className="text-3xl font-display font-bold text-primary">
                    {plan.price}
                  </p>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <p className="text-sm text-foreground/80 mb-6">
                  Best for: {plan.best}
                </p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Quick answers.
          </h2>
          <div className="space-y-4 mb-8">
            {[
              "Is this dental insurance?",
              "Can I use it without X-rays?",
              "Does it replace my dentist?",
              "What if I'm uninsured?",
              "Can my family use one plan?",
              "Is Complete available?",
            ].map((faq, idx) => (
              <div key={idx} className="flex items-start gap-4 pb-4 border-b border-border last:border-b-0">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-foreground/80">{faq}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/faqs">
              <a className="text-primary hover:text-primary/80 font-semibold transition-colors">
                See all FAQs →
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        headline="Take care of your teeth—monthly."
        body="Download DentaSmart and get your first check today."
        primaryCTA={{
          label: "Download the App",
        }}
      />

      <Footer />
    </div>
  );
}
