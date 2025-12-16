import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white via-secondary/30 to-white">
        <div className="container max-w-3xl text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
            Know what's going on—before it hurts
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Three simple steps to understand your mouth and take control of your oral health.
          </p>
        </div>
      </section>

      {/* Step 1: Upload */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="bg-gradient-to-br from-primary/10 to-secondary rounded-3xl p-12 aspect-square flex items-center justify-center">
              <div className="text-7xl">📸</div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Step 1
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Upload your mouth
            </h2>
            <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
              Take a photo of your teeth using your smartphone, or upload an X-ray from your dentist. It takes 30 seconds and works on any phone.
            </p>
            <ul className="space-y-4">
              {["Phone photos or X-rays", "Works on any device", "Secure and private", "Takes just 30 seconds"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="text-primary text-2xl">✓</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Step 2: Analyze */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Step 2
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Get instant insights
            </h2>
            <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
              Our AI analyzes your mouth in seconds and explains what it finds—in plain language. No jargon. No confusion. Just clear, actionable information.
            </p>
            <ul className="space-y-4">
              {["Instant results (1-2 min)", "100% detection accuracy", "Plain language explanations", "Trained by dental experts"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="text-primary text-2xl">✓</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary rounded-3xl p-12 aspect-square flex items-center justify-center">
              <div className="text-7xl">🤖</div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 3: Act */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="bg-gradient-to-br from-primary/10 to-secondary rounded-3xl p-12 aspect-square flex items-center justify-center">
              <div className="text-7xl">✓</div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Step 3
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Take action
            </h2>
            <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
              Share your report with your dentist. Ask Dr. Din questions. Plan your next steps. You're now informed and in control.
            </p>
            <ul className="space-y-4">
              {["Share with your dentist", "Ask Dr. Din 24/7", "Printable reports", "Track progress over time"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="text-primary text-2xl">✓</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Use DentaSmart when you need it most
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "📅", title: "Monthly Check-Ins", desc: "Track your oral health progress and catch issues early" },
              { icon: "🎯", title: "Before Appointments", desc: "Walk in prepared with questions and understanding" },
              { icon: "💡", title: "Before Big Decisions", desc: "Get a second opinion on expensive treatment plans" },
            ].map((useCase, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-border hover:border-primary hover:shadow-lg transition-all">
                <div className="text-5xl mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3">{useCase.title}</h3>
                <p className="text-foreground/70">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll See */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            What you'll get in your report
          </h2>
          <div className="space-y-6">
            {[
              { title: "What the AI found", desc: "Specific areas of concern highlighted and explained" },
              { title: "What it could mean", desc: "Plain language explanations—no dental jargon" },
              { title: "What to do next", desc: "Personalized recommendations based on your mouth" },
              { title: "Questions to ask", desc: "Talking points to bring to your dentist" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-secondary rounded-xl p-6">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-foreground/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-secondary">
        <div className="container max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Ready to understand your teeth?
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
            Try DentaSmart free for 7 days. No credit card required.
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
