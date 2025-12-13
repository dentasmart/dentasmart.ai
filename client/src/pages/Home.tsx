import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-white via-secondary/30 to-white overflow-hidden">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground leading-tight">
                Your Personal AI Dental Companion
              </h1>
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
                DentaSmart empowers you with AI-driven insights into your oral health, helping you understand your dental images and prepare for confident conversations with your dentist.
              </p>
              <p className="text-base text-muted-foreground font-medium">
                ✓ Works with any dental plan
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Download the App
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/5 font-semibold"
              >
                See Pricing
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-8 pt-4">
              <div className="flex flex-col">
                <span className="text-2xl font-display font-bold text-primary">50K+</span>
                <span className="text-sm text-muted-foreground">Scans Analyzed</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-display font-bold text-primary">100%</span>
                <span className="text-sm text-muted-foreground">Detection Accuracy</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-display font-bold text-primary">24/7</span>
                <span className="text-sm text-muted-foreground">Dr. Din Support</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 md:h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-3xl" />
            <div className="relative bg-gradient-to-br from-secondary to-white rounded-3xl p-8 shadow-2xl border border-primary/20">
              <div className="text-center">
                <div className="text-7xl mb-4">🦷</div>
                <p className="text-foreground/60 font-medium">AI-Powered Analysis</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-8 text-center">
            Dental surprises are expensive.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "⏰", title: "Small issues grow quietly", desc: "Problems don't hurt at first" },
              { icon: "💰", title: "Bills show up fast", desc: "Costs escalate quickly" },
              { icon: "❓", title: "Insurance is confusing", desc: "Coverage unclear" },
            ].map((item, idx) => (
              <div key={idx} className="bg-secondary rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-secondary/50 to-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Unlock the Power of Your Personal AI Dental Companion
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { emoji: "📊", title: "AI X-ray Analysis", desc: "Advanced AI reviews your dental X-rays with color-coded overlays, highlighting potential areas of concern." },
              { emoji: "📸", title: "Mouth Image Insights", desc: "Take photos with your smartphone and our AI analyzes them to identify visual cues related to your oral health." },
              { emoji: "💡", title: "Personalized Recommendations", desc: "Get AI-generated suggestions based on your input and images – educational guidance tailored to you." },
              { emoji: "📈", title: "Wellness Score", desc: "Your personalized 0-100 wellness score gives you an easy-to-understand metric of your overall dental health." },
              { emoji: "⚠️", title: "Risk Indicators", desc: "Our AI continuously monitors your data for subtle patterns that might indicate increased risk." },
              { emoji: "🤖", title: "Dr. Din 24/7", desc: "Chat with our AI dental companion Dr. Din anytime for answers to your dental questions." },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 border border-border hover:border-primary hover:shadow-xl transition-all duration-300 group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{feature.emoji}</div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Here's how it works.
          </h2>
          <div className="space-y-8">
            {[
              { num: "1", title: "Upload", desc: "Take guided mouth photos. Upload X-rays if you have them." },
              { num: "2", title: "Understand", desc: "Get a simple report in plain language—what it might mean and what to ask." },
              { num: "3", title: "Act", desc: "Walk into the dentist prepared with your report and questions." },
            ].map((step, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-display text-2xl font-bold shadow-lg">
                  {step.num}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-foreground/70 text-lg">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold">
              Download the App
            </Button>
          </div>
        </div>
      </section>

      {/* Soundbites Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            You shouldn't have to guess.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "You shouldn't have to wait for pain—and you won't with DentaSmart.",
              "You shouldn't have to feel confused—and you won't with DentaSmart.",
              "You shouldn't have to fear surprise bills—and you won't with DentaSmart.",
              "You shouldn't have to choose between your wallet and your smile—and you won't with DentaSmart.",
            ].map((soundbite, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border-l-4 border-primary shadow-sm hover:shadow-md transition-shadow">
                <p className="text-foreground/80 leading-relaxed">{soundbite}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Simple, honest pricing.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: "🛡️", name: "Clarity", price: "$75", period: "/year", desc: "Prevention & tracking" },
              { icon: "💭", name: "Consult", price: "$30", period: "one-time", desc: "Second opinion" },
              { icon: "🏥", name: "Complete", price: "Coming Soon", period: "", desc: "Insurance alternative" },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-8 border-2 transition-all duration-300 ${
                  idx === 1
                    ? "border-primary bg-gradient-to-br from-primary/5 to-secondary shadow-xl scale-105"
                    : "border-border bg-white hover:border-primary"
                }`}
              >
                <div className="text-4xl mb-4">{plan.icon}</div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-display font-bold text-primary">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground ml-2">{plan.period}</span>}
                </div>
                <p className="text-foreground/70 mb-6">{plan.desc}</p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                  {idx === 2 ? "Join Waitlist" : "Get Started"}
                </Button>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/pricing">
              <a className="text-primary hover:text-primary/80 font-semibold text-lg">
                See all plans →
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Take care of your teeth—monthly.
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
            Download DentaSmart and get your first check today.
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
