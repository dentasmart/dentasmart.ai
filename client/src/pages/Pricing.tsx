import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Pricing() {
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
            No hidden fees. No surprises. Choose the plan that fits your situation.
          </p>
        </div>
      </section>

      {/* Plan Chooser */}
      <section className="py-16 md:py-24 bg-white">
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

      {/* Plan Cards */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Choose your plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Clarity */}
            <div className="rounded-2xl p-8 border-2 border-primary bg-gradient-to-br from-primary/5 to-secondary shadow-xl scale-105">
              <div className="inline-block bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">Most Popular</div>
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">Clarity</h3>
              <p className="text-muted-foreground mb-6">Prevention & tracking</p>
              <div className="mb-6">
                <span className="text-5xl font-display font-bold text-primary">$75</span>
                <span className="text-muted-foreground ml-2">/year</span>
              </div>
              <p className="text-foreground/70 mb-8 text-sm">Best for staying ahead month to month</p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold mb-6">Get Started</Button>
              <div className="space-y-3 border-t border-border pt-6">
                {["Monthly tracking + score", "Photo + X-ray explanations", "Dr. Din support", "Dental record vault", "Printable reports"].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-primary text-lg">✓</span>
                    <span className="text-foreground/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Consult */}
            <div className="rounded-2xl p-8 border-2 border-border bg-white hover:border-primary hover:shadow-lg transition-all">
              <div className="text-5xl mb-4">💭</div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">Consult</h3>
              <p className="text-muted-foreground mb-6">Second opinion</p>
              <div className="mb-6">
                <span className="text-5xl font-display font-bold text-primary">$30</span>
                <span className="text-muted-foreground ml-2">one-time</span>
              </div>
              <p className="text-foreground/70 mb-8 text-sm">Best for expensive treatment plans</p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold mb-6">Get a Consult</Button>
              <div className="space-y-3 border-t border-primary/20 pt-6">
                {["Plain-language summary", "Comparison and questions", "Risk of delaying", "Printable report", "Share with dentist"].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-primary text-lg">✓</span>
                    <span className="text-foreground/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Complete */}
            <div className="rounded-2xl p-8 border-2 border-border bg-white hover:border-primary hover:shadow-lg transition-all">
              <div className="text-5xl mb-4">🏥</div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">Complete</h3>
              <p className="text-muted-foreground mb-6">Insurance alternative</p>
              <div className="mb-6">
                <span className="text-4xl font-display font-bold text-primary">Coming</span>
                <span className="text-muted-foreground ml-2 block text-lg">Soon</span>
              </div>
              <p className="text-foreground/70 mb-8 text-sm">Best for lower-cost access to care</p>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5 font-semibold mb-6">Join Waitlist</Button>
              <div className="space-y-3 border-t border-border pt-6">
                {["Discount dental network", "Transparent estimates", "BNPL options", "Everything in Clarity", "Family plans"].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-primary text-lg">✓</span>
                    <span className="text-foreground/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            The ROI of prevention
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: "💰", title: "Average dental procedure", value: "$500–$2,000" },
              { icon: "🛡️", title: "Cost of early detection", value: "$75/year" },
              { icon: "✓", title: "Procedures prevented", value: "Up to 3 per year" },
              { icon: "📊", title: "Average savings", value: "$1,000+/year" },
            ].map((item, idx) => (
              <div key={idx} className="bg-secondary rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <p className="text-foreground/70 mb-2 text-sm">{item.title}</p>
                <p className="text-3xl font-display font-bold text-primary">{item.value}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-foreground/70 mt-12 leading-relaxed">
            Early detection through DentaSmart can help you avoid expensive procedures and maintain better oral health long-term.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
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
                  { feature: "AI Analysis", clarity: true, consult: true, complete: true },
                  { feature: "Monthly Check-ins", clarity: true, consult: false, complete: true },
                  { feature: "Wellness Score", clarity: true, consult: false, complete: true },
                  { feature: "Dr. Din Access", clarity: true, consult: false, complete: true },
                  { feature: "Dental Record Vault", clarity: true, consult: true, complete: true },
                  { feature: "Printable Reports", clarity: true, consult: true, complete: true },
                  { feature: "Dentist Sharing", clarity: true, consult: true, complete: true },
                  { feature: "Family Plans", clarity: false, consult: false, complete: true },
                  { feature: "Discount Network", clarity: false, consult: false, complete: true },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-white/50 transition-colors">
                    <td className="py-4 px-4 text-foreground font-medium">{row.feature}</td>
                    <td className="text-center py-4 px-4">{row.clarity ? <span className="text-primary text-2xl">✓</span> : <span className="text-muted-foreground">—</span>}</td>
                    <td className="text-center py-4 px-4">{row.consult ? <span className="text-primary text-2xl">✓</span> : <span className="text-muted-foreground">—</span>}</td>
                    <td className="text-center py-4 px-4">{row.complete ? <span className="text-primary text-2xl">✓</span> : <span className="text-muted-foreground">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Quick answers
          </h2>
          <div className="space-y-6">
            {[
              { q: "Is this dental insurance?", a: "No. Complete is an alternative model with a discount program (coming soon), not insurance." },
              { q: "Can my family use one plan?", a: "Yes. Family plans include up to 2 adults and 3 children under 18 in one household." },
              { q: "Do I need X-rays?", a: "No. You can start with monthly mouth photos. Upload X-rays when you have them." },
              { q: "Can I cancel anytime?", a: "Yes. You can cancel your subscription anytime without penalties." },
              { q: "What if I'm not satisfied?", a: "We offer a 30-day money-back guarantee on all plans." },
            ].map((faq, idx) => (
              <div key={idx} className="bg-secondary rounded-xl p-6 border border-border hover:border-primary transition-colors">
                <h4 className="font-display font-bold text-foreground mb-3">{faq.q}</h4>
                <p className="text-foreground/70">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
            Choose your plan and start protecting your smile today.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg">
            Download the App
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
