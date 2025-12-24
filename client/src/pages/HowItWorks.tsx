import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { UserChallengesCarousel } from "@/components/UserChallengesCarousel";
import { Camera, Brain, MessageSquare, Activity, FileText, ShieldCheck, ClipboardList, Calendar, Bell, TrendingUp, HeartPulse } from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900">
      <Navigation />

      {/* Hero Section - Minimalist */}
      <section className="py-32 bg-stone-100">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-stone-900 mb-8 leading-[1.1]">
            Know what's going on <br />
            <span className="font-normal italic">before</span> it hurts.
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
            Three simple steps to understand your mouth and take control of your oral health.
          </p>
        </div>
      </section>

      {/* 3-Step Visual Process - Editorial Style */}
      <section className="py-32 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-stone-200 -z-10"></div>

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white border border-stone-200 rounded-full flex items-center justify-center mb-8 shadow-sm group-hover:border-stone-900 group-hover:scale-105 transition-all duration-500 relative z-10">
                <Camera className="w-8 h-8 text-stone-900" strokeWidth={1.5} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-stone-900 text-white rounded-full flex items-center justify-center font-medium text-sm">1</div>
              </div>
              <h3 className="text-2xl font-medium text-stone-900 mb-4">Upload</h3>
              <p className="text-stone-600 font-light leading-relaxed max-w-xs">
                Take a photo or upload an X-ray. Works on any phone in 30 seconds.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white border border-stone-200 rounded-full flex items-center justify-center mb-8 shadow-sm group-hover:border-stone-900 group-hover:scale-105 transition-all duration-500 relative z-10">
                <Brain className="w-8 h-8 text-stone-900" strokeWidth={1.5} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-stone-900 text-white rounded-full flex items-center justify-center font-medium text-sm">2</div>
              </div>
              <h3 className="text-2xl font-medium text-stone-900 mb-4">Analyze</h3>
              <p className="text-stone-600 font-light leading-relaxed max-w-xs">
                AI scans for issues instantly. Get results in plain English, not jargon.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white border border-stone-200 rounded-full flex items-center justify-center mb-8 shadow-sm group-hover:border-stone-900 group-hover:scale-105 transition-all duration-500 relative z-10">
                <MessageSquare className="w-8 h-8 text-stone-900" strokeWidth={1.5} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-stone-900 text-white rounded-full flex items-center justify-center font-medium text-sm">3</div>
              </div>
              <h3 className="text-2xl font-medium text-stone-900 mb-4">Act</h3>
              <p className="text-stone-600 font-light leading-relaxed max-w-xs">
                Chat with Dr. Din. Share reports with your dentist. Fix issues early.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Challenges Carousel */}
      <UserChallengesCarousel />

      {/* Report Features - Clean Grid */}
      <section className="py-32 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-6">
              What you get in your report
            </h2>
            <p className="text-xl text-stone-600 font-light">
              Comprehensive insights, simplified for you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: Activity, 
                title: "Visual Findings", 
                desc: "We highlight exactly where the problem is on your image. No guessing." 
              },
              { 
                icon: FileText, 
                title: "Plain English", 
                desc: "\"Mesial caries on #14\" becomes \"Small cavity between your upper left molars.\"" 
              },
              { 
                icon: ShieldCheck, 
                title: "Action Plan", 
                desc: "Clear next steps: Watch it, treat it, or get a second opinion." 
              },
              { 
                icon: ClipboardList, 
                title: "Care Plan", 
                desc: "A personalized roadmap for your treatments and daily hygiene routine." 
              },
              { 
                icon: Calendar, 
                title: "Timelines", 
                desc: "Know exactly when to schedule appointments and follow-ups." 
              },
              { 
                icon: Bell, 
                title: "Reminders", 
                desc: "Smart notifications so you never miss a check-up or daily habit." 
              },
              { 
                icon: TrendingUp, 
                title: "Risk Assessment", 
                desc: "Understand your long-term risks for cavities, gum disease, and more." 
              },
              { 
                icon: HeartPulse, 
                title: "Oral Health Score", 
                desc: "A simple 0-100 score to track your overall dental wellness over time." 
              },
              { 
                icon: MessageSquare, 
                title: "Talking Points", 
                desc: "Specific questions to ask your dentist so you walk in prepared." 
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 hover:shadow-md transition-all duration-300 group">
                <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-stone-900 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-stone-900 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-stone-900 mb-3">{feature.title}</h3>
                <p className="text-stone-600 font-light leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white text-center">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-8">
            Ready to take control?
          </h2>
          <p className="text-xl text-stone-600 font-light mb-12 leading-relaxed">
            Join thousands of users who are already smarter about their dental health.
          </p>
          <Button 
            size="lg" 
            className="bg-stone-900 hover:bg-stone-800 text-white rounded-full px-10 py-8 text-xl font-medium transition-all duration-300 hover:scale-105"
            onClick={() => window.open('https://apps.apple.com/us/app/dentasmart/id6670311232', '_blank')}
          >
            Download the App
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
