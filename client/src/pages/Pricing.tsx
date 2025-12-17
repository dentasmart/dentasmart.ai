import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Pricing() {
  const [planType, setPlanType] = useState<"individual" | "family">("individual");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white via-secondary/30 to-white">
        <div className="container max-w-3xl text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
            Simple, honest pricing
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            No hidden fees. No surprises. Choose the plan that works for you.
          </p>
        </div>
      </section>

      {/* Plan Chooser */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            What's your situation?
          </h2>
          <div className="space-y-4">
            {[
              { icon: "🛡️", text: "I want to monitor my oral health", plan: "Clarity" },
              { icon: "💭", text: "I need a second opinion on treatment", plan: "Consult" },
              { icon: "🏥", text: "I want comprehensive dental coverage", plan: "Complete (Waitlist)" },
            ].map((option, idx) => (
              <button
                key={idx}
                className="w-full flex items-center gap-4 p-6 bg-secondary rounded-xl border-2 border-border hover:border-primary transition-all text-left hover:shadow-lg"
              >
                <span className="text-4xl">{option.icon}</span>
                <div>
                  <p className="text-lg font-display font-bold text-foreground">{option.text}</p>
                  <p className="text-sm text-muted-foreground">→ {option.plan}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Individual vs Family Toggle */}
      <section className="py-8 md:py-12 bg-secondary/30">
        <div className="container max-w-3xl">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setPlanType("individual")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                planType === "individual"
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white text-foreground border-2 border-border hover:border-primary"
              }`}
            >
              Individual
            </button>
            <button
              onClick={() => setPlanType("family")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                planType === "family"
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white text-foreground border-2 border-border hover:border-primary"
              }`}
            >
              Family
            </button>
          </div>
        </div>
      </section>

      {/* Plan Cards */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Clarity Plan */}
            <div className="bg-white rounded-2xl p-8 border-2 border-border hover:border-primary hover:shadow-lg transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">Clarity</h3>
                <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                  Most Popular
                </div>
              </div>
              <div className="mb-6">
                <p className="text-5xl font-display font-bold text-primary mb-2">
                  ${planType === "individual" ? "75" : "150"}
                </p>
                <p className="text-muted-foreground">/year</p>
              </div>
              <p className="text-foreground/70 mb-8">
                {planType === "individual"
                  ? "Monthly monitoring to track your oral health and catch problems early."
                  : "Monthly monitoring for your entire family with shared insights and progress tracking."}
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited monthly scans",
                  "Wellness score tracking",
                  "Dr. Din 24/7 support",
                  "Dental record vault",
                  "Share with dentist",
                  "Progress reports",
                  planType === "family" && "Up to 4 family members",
                ].filter(Boolean).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="text-primary text-lg">✓</span>
                    <span className="text-foreground/70">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                Start Free Trial
              </Button>
            </div>

            {/* Consult Plan */}
            <div className="bg-white rounded-2xl p-8 border-2 border-border hover:border-primary hover:shadow-lg transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">Consult</h3>
                <div className="text-xs font-semibold text-muted-foreground">One-time purchase</div>
              </div>
              <div className="mb-6">
                <p className="text-5xl font-display font-bold text-primary mb-2">$30</p>
                <p className="text-muted-foreground">one-time</p>
              </div>
              <p className="text-foreground/70 mb-8">
                Get a second opinion on a specific treatment plan or concern.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Single scan analysis",
                  "Detailed report",
                  "Treatment recommendations",
                  "Dr. Din consultation",
                  "Printable report",
                  "Valid for 30 days",
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="text-primary text-lg">✓</span>
                    <span className="text-foreground/70">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/5 font-semibold"
              >
                Get Second Opinion
              </Button>
            </div>

            {/* Complete Plan */}
            <div className="bg-white rounded-2xl p-8 border-2 border-border hover:border-primary hover:shadow-lg transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">Complete</h3>
                <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                  Coming Soon
                </div>
              </div>
              <div className="mb-6">
                <p className="text-5xl font-display font-bold text-primary mb-2">
                  ${planType === "individual" ? "150" : "300"}
                </p>
                <p className="text-muted-foreground">/year</p>
              </div>
              <p className="text-foreground/70 mb-8">
                {planType === "individual"
                  ? "Comprehensive dental coverage with AI-powered care coordination."
                  : "Comprehensive dental coverage for your entire family with AI-powered care coordination."}
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Everything in Clarity",
                  "Dental insurance alternative",
                  "Preventive care coverage",
                  "Treatment coordination",
                  "75,000+ Dentists Network",
                  "Direct billing",
                  "Buy Now, Pay Later available",
                  planType === "family" && "Up to 4 family members",
                ].filter(Boolean).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="text-primary text-lg">✓</span>
                    <span className="text-foreground/70">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button disabled className="w-full">
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Compare plans
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-4 px-4 font-display font-bold text-foreground">Feature</th>
                  <th className="text-center py-4 px-4 font-display font-bold text-foreground">Clarity</th>
                  <th className="text-center py-4 px-4 font-display font-bold text-foreground">Consult</th>
                  <th className="text-center py-4 px-4 font-display font-bold text-foreground">Complete</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "AI Analysis", clarity: "✓", consult: "✓", complete: "✓" },
                  { feature: "Monthly Monitoring", clarity: "✓", consult: "✗", complete: "✓" },
                  { feature: "Wellness Score", clarity: "✓", consult: "✗", complete: "✓" },
                  { feature: "Dr. Din 24/7", clarity: "✓", consult: "✓", complete: "✓" },
                  { feature: "Dental Record Vault", clarity: "✓", consult: "✗", complete: "✓" },
                  { feature: "Share with Dentist", clarity: "✓", consult: "✓", complete: "✓" },
                  { feature: "Progress Tracking", clarity: "✓", consult: "✗", complete: "✓" },
                  { feature: "75,000+ Dentists Network", clarity: "✗", consult: "✗", complete: "✓" },
                  { feature: "Preventive Care Savings", clarity: "✗", consult: "✗", complete: "20-60% off" },
                  { feature: "Basic Procedures Savings", clarity: "✗", consult: "✗", complete: "20-60% off" },
                  { feature: "Major Procedures Savings", clarity: "✗", consult: "✗", complete: "20-60% off" },
                  { feature: "Cosmetic Procedures", clarity: "✗", consult: "✗", complete: "Included" },
                  { feature: "Buy Now, Pay Later", clarity: "✗", consult: "✗", complete: "Available" },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-border">
                    <td className="py-4 px-4 font-semibold text-foreground">{row.feature}</td>
                    <td className="py-4 px-4 text-center text-primary">{row.clarity}</td>
                    <td className="py-4 px-4 text-center text-primary">{row.consult}</td>
                    <td className="py-4 px-4 text-center text-primary">{row.complete}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Common questions
          </h2>
          <div className="space-y-6">
            {[
              { q: "Can I switch plans later?", a: "Yes, you can upgrade or downgrade your plan at any time from your account settings." },
              { q: "Is there a waiting period?", a: "No. Unlike traditional insurance, DentaSmart benefits start immediately." },
              { q: "Does it cover pre-existing conditions?", a: "Yes. We don't exclude pre-existing conditions. You get full benefits from day one." },
              { q: "How does the family plan work?", a: "The family plan covers up to 4 members. You can add more members for a small additional fee." },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-2">{faq.q}</h3>
                <p className="text-foreground/70">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
