import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Employers() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white via-secondary/30 to-white">
        <div className="container max-w-3xl text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
            A dental benefit employees actually use—at 75% less cost
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Give employees a Personal AI Dental Companion that helps prevent problems, reduce anxiety, and avoid expensive surprises.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Traditional dental benefits don't work
          </h2>
          <p className="text-lg text-foreground/70 mb-12 text-center leading-relaxed">
            They're expensive, rarely used, and employees still pay a lot out of pocket.
          </p>
          <div className="space-y-6">
            {[
              { icon: "💰", title: "High cost per employee", desc: "~$1,200/year with low utilization" },
              { icon: "😕", title: "Low employee satisfaction", desc: "Dental benefits rank last in satisfaction surveys" },
              { icon: "📉", title: "Preventive care underutilized", desc: "Leads to expensive emergency procedures" },
            ].map((problem, idx) => (
              <div key={idx} className="bg-secondary rounded-xl p-6 border border-border">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{problem.icon}</div>
                  <div>
                    <h3 className="font-display font-bold text-foreground mb-2">{problem.title}</h3>
                    <p className="text-foreground/70">{problem.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            DentaSmart makes dental benefits simple
          </h2>
          <div className="space-y-6">
            {[
              { icon: "✓", title: "Employees get monthly guidance", desc: "AI-powered insights help them stay on top of their oral health" },
              { icon: "✓", title: "HR gets easy rollout", desc: "Simple setup, minimal administration, powerful results" },
              { icon: "✓", title: "Costs drop significantly", desc: "Reduce benefit costs by up to 75% while improving outcomes" },
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-border">
                <div className="flex items-start gap-4">
                  <div className="text-3xl text-primary">{benefit.icon}</div>
                  <div>
                    <h3 className="font-display font-bold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-foreground/70">{benefit.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Employees Love */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            What employees love
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🎯", title: "Catch Problems Early", bullets: ["Monthly check-ins", "Proactive risk indicators", "Prevent expensive emergencies"] },
              { icon: "💬", title: "24/7 Support", bullets: ["Chat with Dr. Din anytime", "Reduce dental anxiety", "Get answers instantly"] },
              { icon: "💰", title: "Real Savings", bullets: ["Discount network (coming soon)", "Transparent pricing", "BNPL options"] },
            ].map((benefit, idx) => (
              <div key={idx} className="bg-secondary rounded-2xl p-8">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-6">{benefit.title}</h3>
                <ul className="space-y-3">
                  {benefit.bullets.map((bullet, bidx) => (
                    <li key={bidx} className="flex items-start gap-3">
                      <span className="text-primary text-lg flex-shrink-0">✓</span>
                      <span className="text-foreground/80 text-sm">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            The simplest math you'll do all year
          </h2>
          
          {/* Cost Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 border-2 border-border">
              <p className="text-foreground/70 mb-4 text-sm font-semibold text-center">Traditional Insurance</p>
              <div className="text-center mb-6">
                <p className="text-5xl font-display font-bold text-foreground">~$1,200</p>
                <p className="text-muted-foreground text-sm mt-2">per employee/year</p>
              </div>
              <div className="bg-secondary rounded-lg p-4 text-center">
                <p className="text-muted-foreground text-xs mb-1">Monthly Cost</p>
                <p className="text-2xl font-display font-bold text-foreground">~$100</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-secondary rounded-2xl p-8 border-2 border-primary">
              <div className="inline-block bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold mb-4 w-full text-center">
                75% SAVINGS
              </div>
              <p className="text-foreground/70 mb-4 text-sm font-semibold text-center">DentaSmart Complete</p>
              <div className="text-center mb-6">
                <p className="text-5xl font-display font-bold text-primary">~$300</p>
                <p className="text-muted-foreground text-sm mt-2">per employee/year</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-primary/20">
                <p className="text-muted-foreground text-xs mb-1">Monthly Cost</p>
                <p className="text-2xl font-display font-bold text-primary">$20-50</p>
              </div>
            </div>
          </div>

          {/* Savings Breakdown */}
          <div className="bg-white rounded-2xl p-8 border border-primary/20 mb-8">
            <h3 className="font-display font-bold text-foreground mb-8 text-center text-2xl">Your Savings Per Employee</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-secondary rounded-xl">
                <p className="text-4xl font-display font-bold text-primary mb-2">$900</p>
                <p className="text-sm text-foreground/70">Annual Savings</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-secondary rounded-xl">
                <p className="text-4xl font-display font-bold text-primary mb-2">$75</p>
                <p className="text-sm text-foreground/70">Monthly Savings</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-secondary rounded-xl">
                <p className="text-4xl font-display font-bold text-primary mb-2">4x</p>
                <p className="text-sm text-foreground/70">Better Value</p>
              </div>
            </div>
          </div>

          <p className="text-center text-foreground/70 leading-relaxed">
            You can reduce dental benefit cost by up to 75% while giving employees something they actually use and love.
          </p>
        </div>
      </section>

      {/* Rollout Plan */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Get started in minutes
          </h2>
          <div className="space-y-8">
            {[
              { num: "1", title: "Create Account", desc: "Set up your employer account in minutes" },
              { num: "2", title: "Upload Roster", desc: "Add your employee list via CSV or manual entry" },
              { num: "3", title: "Employees Download", desc: "Send invites and they start using DentaSmart" },
              { num: "4", title: "Track Results", desc: "Monitor engagement and health improvements" },
            ].map((step, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-display text-2xl font-bold shadow-lg">
                  {step.num}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-foreground/70">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Employers Get */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Everything you need to manage benefits
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
              <div key={idx} className="flex items-center gap-3 bg-white rounded-lg p-4 border border-border">
                <span className="text-primary text-2xl">✓</span>
                <p className="text-foreground/80">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Form Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 text-center">
            Get a 15-minute demo
          </h2>
          <p className="text-lg text-foreground/70 mb-12 text-center">
            We'll show you pricing, rollout, and what employees see.
          </p>
          <form className="bg-secondary rounded-2xl p-8 border-2 border-border space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Company Name</label>
                <input type="text" placeholder="Your company" className="w-full px-4 py-2 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Your Name</label>
                <input type="text" placeholder="Your name" className="w-full px-4 py-2 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Title</label>
                <input type="text" placeholder="Your title" className="w-full px-4 py-2 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                <input type="email" placeholder="your@email.com" className="w-full px-4 py-2 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Employee Count</label>
              <input type="number" placeholder="Number of employees" className="w-full px-4 py-2 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">What are you trying to improve?</label>
              <textarea placeholder="Tell us about your goals" rows={4} className="w-full px-4 py-2 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">Request Demo</Button>
          </form>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Ready to transform your dental benefits?
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
            Request a demo and see how DentaSmart can help your employees.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg">
            Request a Demo
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
