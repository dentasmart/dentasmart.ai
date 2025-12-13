import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Features() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white via-secondary/30 to-white">
        <div className="container max-w-3xl text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
            Simple tools that keep you ahead
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            DentaSmart helps you monitor, understand, and decide—without dental jargon.
          </p>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Everything you need
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "📊", title: "Monitor", bullets: ["Guided mouth photos", "Monthly reminders", "Track changes over time"] },
              { icon: "📋", title: "Understand", bullets: ["Plain-language explanations", "Highlight areas to ask about", "Better dentist conversations"] },
              { icon: "🎯", title: "Decide", bullets: ["Side-by-side comparisons", "Risks of waiting", "Smart questions to ask"] },
            ].map((feature, idx) => (
              <div key={idx} className="bg-secondary rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-6">{feature.title}</h3>
                <ul className="space-y-3">
                  {feature.bullets.map((bullet, bidx) => (
                    <li key={bidx} className="flex items-start gap-3">
                      <span className="text-primary text-xl flex-shrink-0">✓</span>
                      <span className="text-foreground/80">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dr. Din Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Meet Dr. Din
            </h2>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              Dr. Din is your 24/7 dental companion. Ask questions anytime and get clear, calm answers about your oral health.
            </p>
            <ul className="space-y-4">
              {["Explains results simply", "Helps you prepare questions", "Supports you anytime", "Educational guidance"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="text-primary text-2xl">✓</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-12 aspect-square flex items-center justify-center">
            <div className="text-7xl">🤖</div>
          </div>
        </div>
      </section>

      {/* Dental Record Vault */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-12 aspect-square flex items-center justify-center">
              <div className="text-7xl">🏠</div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Your Dental Record Vault
            </h2>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              Keep your dental history in one place. Store your images and notes so you don't start over when you change dentists or travel.
            </p>
            <ul className="space-y-4">
              {["Keep X-rays organized", "Share with a new dentist", "Save time in emergencies", "Never lose records again"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="text-primary text-2xl">✓</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Why DentaSmart */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Why DentaSmart works
          </h2>
          <div className="space-y-6">
            {[
              { title: "AI-Powered", desc: "100% detection accuracy backed by advanced machine learning" },
              { title: "Plain Language", desc: "No medical jargon—just clear, actionable insights" },
              { title: "Always Available", desc: "24/7 access to Dr. Din and your dental records" },
              { title: "Works with Any Dentist", desc: "Compatible with any dental plan and practice" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-border hover:border-primary transition-colors">
                <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Get clear answers today
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
            Download DentaSmart and experience the difference AI-powered insights make.
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
