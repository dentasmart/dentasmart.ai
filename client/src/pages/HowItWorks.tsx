import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, Brain, MessageSquare, FileText, Activity, ShieldCheck, Calendar, Bell, HeartPulse, ClipboardList, TrendingUp } from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Hero Section - Simplified */}
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-white">
        <div className="container max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
            Know what's going on before it hurts
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Three simple steps to understand your mouth and take control of your oral health.
          </p>
        </div>
      </section>

      {/* 3-Step Visual Process - Connected Flow */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -z-10"></div>

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white border-4 border-secondary rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:border-primary group-hover:scale-110 transition-all duration-300 relative z-10">
                <Camera className="w-10 h-10 text-primary" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white">1</div>
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-3">Upload</h3>
              <p className="text-foreground/70 max-w-xs">
                Take a photo or upload an X-ray. Works on any phone in 30 seconds.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white border-4 border-secondary rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:border-primary group-hover:scale-110 transition-all duration-300 relative z-10">
                <Brain className="w-10 h-10 text-primary" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white">2</div>
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-3">Analyze</h3>
              <p className="text-foreground/70 max-w-xs">
                AI scans for issues instantly. Get results in plain English, not jargon.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white border-4 border-secondary rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:border-primary group-hover:scale-110 transition-all duration-300 relative z-10">
                <MessageSquare className="w-10 h-10 text-primary" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white">3</div>
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-3">Act</h3>
              <p className="text-foreground/70 max-w-xs">
                Chat with Dr. Din. Share reports with your dentist. Fix issues early.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Feature Grid - Less Text, More Iconography */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16">
            What you get in your report
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Visual Findings */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-all flex flex-col gap-4">
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center">
                <Activity className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Visual Findings</h3>
                <p className="text-foreground/70 text-sm">
                  We highlight exactly where the problem is on your image. No guessing.
                </p>
              </div>
            </div>

            {/* Card 2: Plain English */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-all flex flex-col gap-4">
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Plain English</h3>
                <p className="text-foreground/70 text-sm">
                  "Mesial caries on #14" becomes "Small cavity between your upper left molars."
                </p>
              </div>
            </div>

            {/* Card 3: Action Plan */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-all flex flex-col gap-4">
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Action Plan</h3>
                <p className="text-foreground/70 text-sm">
                  Clear next steps: Watch it, treat it, or get a second opinion.
                </p>
              </div>
            </div>

            {/* Card 4: Care Plan */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-all flex flex-col gap-4">
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center">
                <ClipboardList className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Care Plan</h3>
                <p className="text-foreground/70 text-sm">
                  A personalized roadmap for your treatments and daily hygiene routine.
                </p>
              </div>
            </div>

            {/* Card 5: Timelines */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-all flex flex-col gap-4">
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center">
                <Calendar className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Timelines</h3>
                <p className="text-foreground/70 text-sm">
                  Know exactly when to schedule appointments and follow-ups.
                </p>
              </div>
            </div>

            {/* Card 6: Reminders */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-all flex flex-col gap-4">
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center">
                <Bell className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Reminders</h3>
                <p className="text-foreground/70 text-sm">
                  Smart notifications so you never miss a check-up or daily habit.
                </p>
              </div>
            </div>

            {/* Card 7: Risk Assessment */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-all flex flex-col gap-4">
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Risk Assessment</h3>
                <p className="text-foreground/70 text-sm">
                  Understand your long-term risks for cavities, gum disease, and more.
                </p>
              </div>
            </div>

            {/* Card 8: Oral Health Score */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-all flex flex-col gap-4">
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center">
                <HeartPulse className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Oral Health Score</h3>
                <p className="text-foreground/70 text-sm">
                  A simple 0-100 score to track your overall dental wellness over time.
                </p>
              </div>
            </div>

            {/* Card 9: Talking Points */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-all flex flex-col gap-4">
              <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Talking Points</h3>
                <p className="text-foreground/70 text-sm">
                  Specific questions to ask your dentist so you walk in prepared.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases - Visual Cards */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            When to use DentaSmart
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-secondary/20 border border-border hover:border-primary transition-all">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                <div className="text-4xl mb-4 transform group-hover:-translate-y-2 transition-transform duration-300">📅</div>
                <h3 className="text-xl font-bold mb-2">Monthly Check-in</h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  Scan once a month to catch issues before they become painful.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-secondary/20 border border-border hover:border-primary transition-all">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                <div className="text-4xl mb-4 transform group-hover:-translate-y-2 transition-transform duration-300">🦷</div>
                <h3 className="text-xl font-bold mb-2">Pre-Appointment</h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  Scan before your visit so you know what to expect.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-secondary/20 border border-border hover:border-primary transition-all">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                <div className="text-4xl mb-4 transform group-hover:-translate-y-2 transition-transform duration-300">💡</div>
                <h3 className="text-xl font-bold mb-2">Second Opinion</h3>
                <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  Unsure about a treatment plan? Get an unbiased AI check.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Minimalist */}
      <section className="py-20 bg-primary/5">
        <div className="container text-center">
          <h2 className="text-4xl font-display font-bold text-foreground mb-6">
            Ready to see clearly?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg px-8 h-12 text-lg">
              Start Free Trial
            </Button>
            <p className="text-sm text-foreground/60 mt-4 sm:mt-0 sm:ml-4">
              No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
