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
            Know what's going on—before it hurts.
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Three simple steps to feel confident and prepared for every dental visit.
          </p>
        </div>
      </section>

      {/* Step 1: Upload */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-12 aspect-square flex items-center justify-center">
              <div className="text-7xl">📸</div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Step 1
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Upload
            </h2>
            <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
              Take guided photos of your mouth using your smartphone, or upload existing X-rays from your dentist. Our app guides you through the process to ensure clear, usable images.
            </p>
            <ul className="space-y-4">
              {["Guided photo capture", "X-ray upload support", "Multiple image formats", "Secure storage"].map((item, idx) => (
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
              Understand
            </h2>
            <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
              Get a simple report in plain language—what it might mean and what to ask. No medical jargon, just actionable insights.
            </p>
            <ul className="space-y-4">
              {["Real-time processing", "Color-coded analysis", "Plain language explanations", "Personalized recommendations"].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="text-primary text-2xl">✓</span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-12 aspect-square flex items-center justify-center">
              <div className="text-7xl">🤖</div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 3: Act */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-12 aspect-square flex items-center justify-center">
              <div className="text-7xl">💪</div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Step 3
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Act
            </h2>
            <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
              Walk into the dentist prepared with your report and questions. Have confident conversations about your oral health.
            </p>
            <ul className="space-y-4">
              {["Printable reports", "Share with your dentist", "Track changes over time", "Build your dental history"].map((item, idx) => (
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
              { icon: "📅", title: "Between Visits", desc: "Track changes monthly and catch issues early" },
              { icon: "🎯", title: "Before an Appointment", desc: "Know what to ask your dentist" },
              { icon: "💡", title: "Before a Big Procedure", desc: "Get a second opinion on recommendations" },
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
            What you'll see in your report
          </h2>
          <div className="space-y-6">
            {[
              { title: "What looks worth checking", desc: "Visual highlights of areas of concern" },
              { title: "What it could mean", desc: "Plain language explanations—no jargon" },
              { title: "What to do next", desc: "Personalized recommendations for you" },
              { title: "Questions to ask", desc: "Talking points for your dentist visit" },
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
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Ready for your first check?
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
            Download DentaSmart today and start understanding your oral health.
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
