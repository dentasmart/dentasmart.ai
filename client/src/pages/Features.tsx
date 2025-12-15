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
            Everything you need to understand your teeth
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Powerful features designed to give you clarity, control, and confidence.
          </p>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            The three pillars of DentaSmart
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "📊", title: "Monitor", desc: "Track your oral health month to month and catch problems early" },
              { icon: "📋", title: "Understand", desc: "Get plain-language explanations so you know what's happening" },
              { icon: "🎯", title: "Decide", desc: "Make confident decisions about your dental care" },
            ].map((feature, idx) => (
              <div key={idx} className="bg-secondary rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-foreground/70">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI-Powered Analysis */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              AI-Powered Analysis
            </h2>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              Our AI is trained by dental experts and analyzes your mouth with 100% detection accuracy. It identifies potential cavities, gum disease, wear patterns, and other visible concerns in seconds.
            </p>
            <ul className="space-y-4">
              {["Trained by dental experts", "100% detection accuracy", "Analyzes in 1-2 minutes", "Works with photos and X-rays"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="text-primary text-2xl">✓</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-secondary rounded-3xl p-12 aspect-square flex items-center justify-center">
            <div className="text-7xl">🤖</div>
          </div>
        </div>
      </section>

      {/* Dr. Din Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="bg-gradient-to-br from-primary/10 to-secondary rounded-3xl p-12 aspect-square flex items-center justify-center">
              <div className="text-7xl">💬</div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Dr. Din: Your AI Dental Companion
            </h2>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              Have questions? Ask Dr. Din anytime. Your AI dental companion is available 24/7 to answer questions, provide guidance, and help you understand your oral health.
            </p>
            <ul className="space-y-4">
              {["Available 24/7", "Instant answers", "Personalized guidance", "No appointment needed"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="text-primary text-2xl">✓</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Dental Record Vault */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Your Dental Record Vault
            </h2>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              Keep your dental history in one secure place. Store all your images, reports, and notes so you never have to start over when you change dentists.
            </p>
            <ul className="space-y-4">
              {["Secure storage", "Portable records", "Share with dentists", "Never lose your history"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="text-primary text-2xl">✓</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-secondary rounded-3xl p-12 aspect-square flex items-center justify-center">
            <div className="text-7xl">🔒</div>
          </div>
        </div>
      </section>

      {/* Wellness Score & Progress Tracking */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="bg-gradient-to-br from-primary/10 to-secondary rounded-3xl p-12 aspect-square flex items-center justify-center">
              <div className="text-7xl">📊</div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Wellness Score & Progress Tracking
            </h2>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              Get an overall oral health rating and track your progress over time. See improvements month-to-month and catch problems early.
            </p>
            <ul className="space-y-4">
              {["Overall health rating", "Monthly progress tracking", "Trend analysis", "Early problem detection"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="text-primary text-2xl">✓</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits Summary */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            What these features mean for you
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: "🧠", title: "Clarity", desc: "Understand your mouth without confusion" },
              { icon: "💪", title: "Control", desc: "Make informed decisions about your health" },
              { icon: "😌", title: "Confidence", desc: "Walk into appointments prepared and in charge" },
              { icon: "💰", title: "Savings", desc: "Avoid expensive emergencies and surprises" },
              { icon: "⏰", title: "Convenience", desc: "Get answers 24/7 without appointments" },
              { icon: "🎯", title: "Prevention", desc: "Catch problems early before they get expensive" },
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-border">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="font-display font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-foreground/70 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Privacy */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Security & Privacy
          </h2>

          <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-8">
            <div className="space-y-4">
              {[
                { icon: "🔐", title: "HIPAA Compliant", desc: "Your health data is protected by law" },
                { icon: "🛡️", title: "Encrypted Storage", desc: "All data is encrypted at rest and in transit" },
                { icon: "👤", title: "Your Data, Your Control", desc: "You own your data and can delete it anytime" },
                { icon: "🚫", title: "Never Sold", desc: "We never sell or share your data with third parties" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="font-display font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-foreground/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-secondary">
        <div className="container max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Experience the difference
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
            Try all features free for 7 days. No credit card required.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg">
            Start Free Trial
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
