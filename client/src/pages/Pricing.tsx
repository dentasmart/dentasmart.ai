import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { HeroSection, CTASection } from "@/components/Sections";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <HeroSection
        headline="Simple, honest pricing."
        subheadline="No hidden fees. No surprises. Choose the plan that fits your situation."
        primaryCTA={{
          label: "Get Started",
        }}
      >
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg h-96 flex items-center justify-center border border-primary/20">
          <div className="text-center">
            <div className="text-6xl mb-4">💰</div>
            <p className="text-foreground/60">Pricing</p>
          </div>
        </div>
      </HeroSection>

      {/* Plan Chooser */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            What do you need most?
          </h2>
          <div className="space-y-4">
            {[
              { icon: "🛡️", text: "I want prevention", plan: "Clarity" },
              { icon: "💭", text: "I need a second opinion", plan: "Consult" },
              { icon: "🏥", text: "I want an insurance alternative", plan: "Complete (Waitlist)" },
            ].map((option, idx) => (
              <button
                key={idx}
                className="w-full flex items-center gap-4 p-4 bg-secondary rounded-lg border border-border hover:border-primary transition-colors text-left"
              >
                <span className="text-3xl">{option.icon}</span>
                <div>
                  <p className="text-foreground/80">{option.text}</p>
                  <p className="text-sm text-muted-foreground">→ {option.plan}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Plan Cards */}
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
                pricing: [
                  { amount: "$75", period: "/year individual" },
                  { amount: "$150", period: "/year family (2 adults + 3 kids)" },
                ],
                best: "staying ahead month to month",
                includes: [
                  "Monthly tracking + score",
                  "Photo + X-ray explanations",
                  "Dr. Din support",
                ],
                cta: "Get Started",
                highlighted: false,
              },
              {
                name: "Consult",
                subtitle: "Second opinion",
                pricing: [{ amount: "$30", period: "one-time" }],
                best: "expensive treatment plans",
                includes: [
                  "Plain-language summary",
                  "Comparison and questions",
                  "Risk of delaying",
                ],
                cta: "Get a Consult",
                highlighted: false,
              },
              {
                name: "Complete",
                subtitle: "Insurance alternative",
                pricing: [
                  { amount: "Coming soon", period: "" },
                  { amount: "$140", period: "/year individual" },
                  { amount: "$280", period: "/year family" },
                ],
                best: "lower-cost access to care",
                includes: [
                  "Discount dental network (10–50%)",
                  "Transparent estimates",
                  "BNPL options",
                ],
                cta: "Join Waitlist",
                highlighted: true,
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-lg p-8 border transition-colors ${
                  plan.highlighted
                    ? "bg-background border-primary shadow-lg"
                    : "bg-background border-border hover:border-primary"
                }`}
              >
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {plan.subtitle}
                </p>
                <div className="mb-6">
                  {plan.pricing.map((price, pidx) => (
                    <div key={pidx} className="mb-2">
                      <p className="text-3xl font-display font-bold text-primary">
                        {price.amount}
                      </p>
                      {price.period && (
                        <p className="text-sm text-muted-foreground">
                          {price.period}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-foreground/80 mb-6">
                  Best for: {plan.best}
                </p>
                <div className="mb-8">
                  <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase">
                    Includes
                  </p>
                  <ul className="space-y-2">
                    {plan.includes.map((item, iidx) => (
                      <li key={iidx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? "bg-primary hover:bg-primary/90 text-white"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why People Switch */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Why people switch.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-secondary rounded-lg p-8 border border-border">
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                Traditional Insurance
              </h3>
              <ul className="space-y-3">
                {[
                  "Expensive",
                  "Limited coverage",
                  "Confusing terms",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-xl">✗</span>
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-accent/10 rounded-lg p-8 border border-accent">
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                DentaSmart Complete
              </h3>
              <ul className="space-y-3">
                {[
                  "Simple pricing",
                  "Prevention focused",
                  "Transparent discounts (coming soon)",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-xl">✓</span>
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Quick answers.
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Is this dental insurance?",
                a: "No. Complete is an alternative model that will include a discount program (coming soon), not insurance.",
              },
              {
                q: "Can my family use one plan?",
                a: "Yes. The Family plan includes up to 2 adults and 3 children under 18 in one household.",
              },
              {
                q: "Do I need X-rays?",
                a: "No. You can start with monthly mouth photos. Upload X-rays when you have them.",
              },
              {
                q: "What's coming soon in Complete?",
                a: "Discount dental network (10–50%), transparent estimates, and BNPL options.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes. You can cancel your subscription anytime without penalties.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-background rounded-lg p-6 border border-border">
                <h4 className="font-display font-bold text-foreground mb-2">
                  {faq.q}
                </h4>
                <p className="text-foreground/80 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        headline="Ready to get started?"
        body="Choose your plan and start protecting your smile today."
        primaryCTA={{
          label: "Get Started",
        }}
      />

      <Footer />
    </div>
  );
}
