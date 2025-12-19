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
            A dental benefit employees actually use at 75% less cost
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

      {/* Detailed Comparison Table */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 text-center">
            Compare the value
          </h2>
          <p className="text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto">
            See how DentaSmart Complete stacks up against traditional insurance carriers like Cigna, Aetna, and Humana.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-6 px-6 bg-secondary/30 rounded-tl-2xl border-b-2 border-border w-1/3">
                    <span className="font-display font-bold text-xl text-foreground">Feature</span>
                  </th>
                  <th className="text-center py-6 px-6 bg-secondary/30 border-b-2 border-border w-1/3">
                    <div className="font-display font-bold text-xl text-foreground mb-1">Traditional Insurance</div>
                    <div className="text-sm text-muted-foreground">(Cigna, Aetna, Humana)</div>
                  </th>
                  <th className="text-center py-6 px-6 bg-primary/5 rounded-tr-2xl border-b-2 border-primary w-1/3 relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                    <div className="font-display font-bold text-xl text-primary mb-1">DentaSmart Complete</div>
                    <div className="text-sm text-primary/80">All-in-one Solution</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Annual Cost (Individual)", trad: "$400 - $700+", denta: "$150", highlight: true },
                  { feature: "Annual Cost (Family)", trad: "$1,000 - $1,500+", denta: "$300", highlight: true },
                  { feature: "Preventive Care (Checkups, Cleanings, X-Rays)", trad: "100% covered (usually)", denta: "Included (AI Monitoring)" },
                  { feature: "Basic Procedures (Fillings, Extractions)", trad: "80% coverage after deductible", denta: "20-60% savings immediately" },
                  { feature: "Major Procedures (Root Canals, Crowns)", trad: "50% coverage after waiting", denta: "20-60% savings immediately" },
                  { feature: "Cosmetic Procedures (Implants, Whitening)", trad: "Not covered", denta: "Included in savings" },
                  { feature: "Dentist Network", trad: "Limited PPO Network", denta: "75,000+ Locations" },
                  { feature: "Annual Spending Caps", trad: "Capped at $1,000 - $1,500", denta: "No annual caps" },
                  { feature: "Waiting Periods", trad: "6-12 months for major work", denta: "No waiting periods" },
                  { feature: "Deductibles", trad: "$50 - $100 per person", denta: "No deductibles" },
                  { feature: "Pre-existing Conditions", trad: "Often excluded", denta: "No exclusions" },
                  { feature: "Payment Flexibility (BNPL)", trad: "Not available", denta: "Buy Now, Pay Later included", highlight: true },
                  { feature: "Switch Plans", trad: "Open enrollment only", denta: "Switch easily anytime" },
                ].map((row, idx) => (
                  <tr key={idx} className={`border-b border-border ${row.highlight ? "bg-secondary/10" : ""}`}>
                    <td className="py-4 px-6 font-semibold text-foreground">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-foreground/70">{row.trad}</td>
                    <td className="py-4 px-6 text-center font-bold text-primary bg-primary/5">{row.denta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              *Comparison based on average PPO plans from major carriers for 2024-2025. Actual insurance costs vary by location and employer contribution.
            </p>
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
            <div className="bg-white rounded-2xl p-8 border-2 border-border flex flex-col items-center justify-center">
              <p className="text-foreground/70 mb-4 text-sm font-semibold text-center">Traditional Insurance</p>
              <div className="text-center mb-6">
                <p className="text-6xl font-display font-bold text-foreground">~$1,200</p>
                <p className="text-muted-foreground text-sm mt-2">per employee family/year</p>
              </div>
              <div className="bg-secondary rounded-lg p-4 text-center w-full max-w-xs">
                <p className="text-muted-foreground text-xs mb-1">Monthly Cost</p>
                <p className="text-2xl font-display font-bold text-foreground">~$100</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-secondary rounded-2xl p-8 border-2 border-primary flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full bg-primary text-white text-center py-1 text-xs font-bold uppercase tracking-wider">
                75% SAVINGS
              </div>
              <p className="text-foreground/70 mb-4 text-sm font-semibold text-center mt-6">DentaSmart Complete</p>
              <div className="text-center mb-6">
                <p className="text-6xl font-display font-bold text-primary">~$300</p>
                <p className="text-muted-foreground text-sm mt-2">per employee family/year</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-primary/20 w-full max-w-xs shadow-sm">
                <p className="text-muted-foreground text-xs mb-1">Monthly Cost</p>
                <p className="text-2xl font-display font-bold text-primary">$25</p>
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
              { icon: "💳", title: "Flexible Payments", bullets: ["Buy Now, Pay Later options", "No surprise bills", "Transparent pricing"] },
            ].map((benefit, idx) => (
              <div key={idx} className="bg-secondary rounded-2xl p-8">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-6">{benefit.title}</h3>
                <ul className="space-y-3">
                  {benefit.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-primary font-bold">✓</span>
                      <span className="text-foreground/70">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Form */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container max-w-xl">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-border">
            <h2 className="text-3xl font-display font-bold text-foreground mb-6 text-center">
              See how much you can save
            </h2>
            <p className="text-foreground/70 text-center mb-8">
              Get a custom ROI analysis for your company in 24 hours.
            </p>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Company Name</label>
                <input type="text" className="w-full p-3 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="Acme Corp" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Number of Employees</label>
                <input type="number" className="w-full p-3 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Work Email</label>
                <input type="email" className="w-full p-3 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="you@company.com" />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg shadow-lg mt-4">
                Request Demo & ROI Report
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
