import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  HeroSection,
  ProblemSection,
  BenefitsSection,
  StepsSection,
  CTASection,
} from "@/components/Sections";
import { Button } from "@/components/ui/button";

export default function Employers() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <HeroSection
        headline="A dental benefit employees actually use—at 75% less cost."
        subheadline="Give employees a Personal AI Dental Companion that helps prevent problems, reduce dental anxiety, and avoid expensive surprises."
        primaryCTA={{
          label: "Request a Demo",
        }}
        secondaryCTA={{
          label: "See the ROI",
        }}
      >
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg h-96 flex items-center justify-center border border-primary/20">
          <div className="text-center">
            <div className="text-6xl mb-4">🏢</div>
            <p className="text-foreground/60">For Employers</p>
          </div>
        </div>
      </HeroSection>

      {/* Problem Section */}
      <ProblemSection
        headline="Traditional dental benefits don't work."
        body="They're expensive, rarely used, and employees still pay a lot out of pocket."
        bullets={[
          "High cost per employee",
          "Low utilization",
          "Employees still pay a lot",
        ]}
      />

      {/* Solution Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            DentaSmart makes dental benefits simple.
          </h2>
          <div className="space-y-6">
            {[
              "Employees get monthly guidance",
              "HR gets easy rollout",
              "Costs drop significantly",
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

      {/* What Employees Love */}
      <BenefitsSection
        headline="What employees love."
        cards={[
          {
            title: "Catch Problems Early",
            bullets: [
              "Monthly check-ins",
              "Proactive risk indicators",
              "Prevent expensive emergencies",
            ],
          },
          {
            title: "24/7 Support",
            bullets: [
              "Chat with Dr. Din anytime",
              "Reduce dental anxiety",
              "Get answers instantly",
            ],
          },
          {
            title: "Real Savings",
            bullets: [
              "Discount network (coming soon)",
              "Transparent pricing",
              "BNPL options",
            ],
          },
        ]}
      />

      {/* ROI Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            The simplest math you'll do all year.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-secondary rounded-lg p-8 border border-border text-center">
              <p className="text-sm text-muted-foreground mb-2">Traditional Insurance</p>
              <p className="text-4xl font-display font-bold text-foreground">
                ~$1,200
              </p>
              <p className="text-sm text-muted-foreground">per employee/year</p>
            </div>
            <div className="bg-accent/10 rounded-lg p-8 border border-accent text-center">
              <p className="text-sm text-muted-foreground mb-2">DentaSmart Complete</p>
              <p className="text-4xl font-display font-bold text-primary">
                ~$300
              </p>
              <p className="text-sm text-muted-foreground">per employee/year</p>
            </div>
          </div>
          <p className="text-lg text-foreground/80 text-center">
            You can reduce dental benefit cost while giving employees something they actually use.
          </p>
        </div>
      </section>

      {/* Rollout Plan */}
      <StepsSection
        headline="Get started in minutes."
        steps={[
          {
            number: 1,
            title: "Create Account",
            description: "Set up your employer account.",
          },
          {
            number: 2,
            title: "Upload Roster",
            description: "Add your employee list.",
          },
          {
            number: 3,
            title: "Employees Download",
            description: "Send invites and they start.",
          },
        ]}
      />

      {/* What Employer Gets */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Everything you need to manage benefits.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Simple billing",
              "Usage reporting",
              "Engagement metrics",
              "Support and onboarding",
              "Quarterly reviews",
              "Dedicated success contact",
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-foreground/80">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Form Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 text-center">
            Get a 15-minute demo.
          </h2>
          <p className="text-lg text-foreground/80 mb-12 text-center">
            We'll show you pricing, rollout, and what employees see.
          </p>
          <form className="bg-secondary rounded-lg p-8 border border-border space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Your company"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Your title"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Employee Count
              </label>
              <input
                type="number"
                placeholder="Number of employees"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                What are you trying to improve?
              </label>
              <textarea
                placeholder="Tell us about your goals"
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
              Request Demo
            </Button>
          </form>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        headline="Ready to transform your dental benefits?"
        body="Request a demo and see how DentaSmart can help your employees."
        primaryCTA={{
          label: "Request a Demo",
        }}
      />

      <Footer />
    </div>
  );
}
