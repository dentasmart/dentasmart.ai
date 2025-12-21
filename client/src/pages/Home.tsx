import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Hero Section - Tagline + Problem + Empathy */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-white via-secondary/20 to-white">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Headline & Copy */}
            <div>
              {/* Tagline */}
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-primary/20">
                ✓ Understand Your Mouth Before Your Dentist Explains It
              </div>

              {/* Main Headline - Problem + Empathy */}
              <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
                Stop worrying about your teeth
              </h1>

              {/* Subheadline - Outcome-Oriented */}
              <p className="text-xl text-foreground/70 leading-relaxed mb-8">
                DentaSmart helps you monitor your teeth and gums monthly with a quick photo check and clear guidance.
Prevent problems early and get a second opinion before costly dental work.
              </p>

              {/* Micro-proof */}
              <p className="text-sm text-primary font-semibold mb-8 flex items-center gap-2">
                <span className="text-lg">✓</span> Works with any dentist. Any dental plan.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg">
                  Download the App
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5 font-semibold"
                >
                  See Pricing
                </Button>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative h-[600px] w-full flex items-center justify-center">
              <img 
                src="/images/ai-dental-insights-app.png" 
                alt="DentaSmart App Interface showing AI Dental Insights" 
                className="h-full w-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Trust Metrics */}
      <section className="py-12 md:py-16 bg-secondary/30 border-y border-border">
        <div className="container">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-display font-bold text-primary mb-2">50K+</div>
              <p className="text-sm text-foreground/70">Scans Analyzed</p>
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-primary mb-2">100%</div>
              <p className="text-sm text-foreground/70">Detection Accuracy</p>
            </div>
            <div>
              <div className="text-4xl font-display font-bold text-primary mb-2">24/7</div>
              <p className="text-sm text-foreground/70">Dr. Din Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem - One Clear Issue */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            The problem: Dental anxiety and uncertainty
          </h2>

          <div className="space-y-6">
            {[
              {
                icon: "❓",
                problem: "You don't understand what your dentist sees",
                detail: "X-rays, charts, and technical jargon leave you confused and anxious",
              },
              {
                icon: "💰",
                problem: "You get blindsided by costs",
                detail: "Surprise bills and insurance denials derail your finances and stress you out",
              },
              {
                icon: "⏰",
                problem: "You wait for problems to hurt",
                detail: "By the time you feel pain, damage is already done and treatment is expensive",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-secondary rounded-xl p-6 border border-border">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="font-display font-bold text-foreground mb-2">{item.problem}</h3>
                    <p className="text-foreground/70">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Answer - Solution */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 text-center">
            The answer: Your Personal AI Dental Companion
          </h2>
          <p className="text-lg text-foreground/70 text-center mb-12 leading-relaxed">
            DentaSmart analyzes your mouth in seconds, explains what's happening in plain language, and helps you make informed decisions before you see your dentist.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🔍", title: "Upload & Analyze", desc: "Take photos or upload X-rays. Get instant AI analysis." },
              { icon: "📊", title: "Understand Results", desc: "Plain-language explanations. No jargon. No confusion." },
              { icon: "💬", title: "Ask Dr. Din", desc: "Chat 24/7 with your AI dental companion. Get answers anytime." },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-border text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-display font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-foreground/70 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Change - What Improves (Outcome-Oriented) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            What changes with DentaSmart
          </h2>

          <div className="space-y-6">
            {[
              {
                before: "You're confused by dental jargon",
                after: "You understand exactly what's happening and why it matters",
              },
              {
                before: "You fear surprise dental bills",
                after: "You know costs upfront and budget with confidence",
              },
              {
                before: "You wait for pain to act",
                after: "You catch problems early and prevent expensive emergencies",
              },
              {
                before: "You feel anxious at dental appointments",
                after: "You walk in prepared, informed, and in control of the conversation",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-secondary rounded-xl p-6 border border-border">
                <div className="mb-3">
                  <p className="text-sm text-muted-foreground mb-2">Before</p>
                  <p className="text-foreground/60">{item.before}</p>
                </div>
                <div className="flex items-center justify-center my-3">
                  <div className="w-8 h-0.5 bg-primary"></div>
                  <span className="text-primary text-lg mx-2">→</span>
                  <div className="w-8 h-0.5 bg-primary"></div>
                </div>
                <div>
                  <p className="text-sm text-primary font-semibold mb-2">After</p>
                  <p className="text-foreground font-semibold">{item.after}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The End Result - Ultimate Outcome */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-8">
            The end result: Complete peace of mind
          </h2>
          <p className="text-xl text-foreground/70 leading-relaxed mb-12">
            You take control of your oral health. You catch problems early. You avoid expensive emergencies. And you walk into every dental appointment confident, prepared, and in charge of your own health decisions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              "✓ Clarity about your mouth",
              "✓ Control over your costs",
              "✓ Confidence at the dentist",
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 border border-primary/20 font-semibold text-foreground">
                {item}
              </div>
            ))}
          </div>

          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg">
            Start Your Free Trial
          </Button>
        </div>
      </section>

      {/* How It Works - Simple 3-Step */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            How it works
          </h2>

          <div className="space-y-8">
            {[
              {
                num: "1",
                title: "Upload Your Mouth",
                desc: "Take a photo or upload an X-ray from your phone",
              },
              {
                num: "2",
                title: "Get Instant Insights",
                desc: "Our AI analyzes and explains what it finds in plain language",
              },
              {
                num: "3",
                title: "Take Action",
                desc: "Share with your dentist, ask Dr. Din questions, or plan your next steps",
              },
            ].map((step, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-display text-2xl font-bold shadow-lg">
                  {step.num}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-foreground/70">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            What you get
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { icon: "🤖", title: "AI-Powered Analysis", desc: "Trained by dental experts. 100% detection accuracy." },
              { icon: "📸", title: "Photo + X-ray Support", desc: "Works with phone photos and uploaded X-rays." },
              { icon: "💬", title: "Dr. Din 24/7", desc: "Chat with your AI dental companion anytime." },
              { icon: "📊", title: "Wellness Score", desc: "Track your oral health progress month to month." },
              { icon: "🎯", title: "Personalized Recommendations", desc: "Get specific guidance based on your mouth." },
              { icon: "🔒", title: "Secure & Private", desc: "HIPAA-compliant. Your data is yours alone." },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-border hover:border-primary hover:shadow-lg transition-all">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-display font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-foreground/70">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Pricing Snapshot */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Simple pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-secondary rounded-xl p-8 border-2 border-border text-center">
              <p className="text-foreground/70 mb-4 text-sm font-semibold">Monthly Monitoring</p>
              <p className="text-5xl font-display font-bold text-primary mb-2">$75</p>
              <p className="text-muted-foreground text-sm">/year</p>
              <p className="text-foreground/70 text-sm mt-4">Clarity Plan</p>
            </div>

            <div className="bg-secondary rounded-xl p-8 border-2 border-border text-center">
              <p className="text-foreground/70 mb-4 text-sm font-semibold">One-Time Second Opinion</p>
              <p className="text-5xl font-display font-bold text-primary mb-2">$30</p>
              <p className="text-muted-foreground text-sm">one-time</p>
              <p className="text-foreground/70 text-sm mt-4">Consult Plan</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-foreground/70 mb-6">7-day free trial. No credit card required.</p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg">
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-secondary">
        <div className="container max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Ready to stop worrying?
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
            Download DentaSmart today and get instant insights into your oral health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg">
              Download the App
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5 font-semibold"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
