import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import HowItWorksHero from "@/components/HowItWorksHero";
import { DownloadSection } from "@/components/DownloadSection";
import { BenefitsCarousel } from "@/components/BenefitsCarousel";
import { Camera, Brain, FileText, MessageSquare, Activity, ShieldCheck, ClipboardList, Calendar, Bell, TrendingUp, HeartPulse, CheckCircle2, Scan, Upload, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-foreground selection:bg-primary/20">
      <SEO
        title="How DentaSmart Works - AI Dental Analysis in 4 Simple Steps"
        description="Learn how DentaSmart's AI-powered platform analyzes your dental photos to provide an oral health score, identify issues, and create a personalized care plan."
        canonical="https://dentasmart.ai/how-it-works"
      />
      <Navigation />

      {/* Hero Section (New StoryBrand) */}
      <HowItWorksHero />

      {/* Keyword-Rich Intro — Explains what DentaSmart does in crawlable prose */}
      <section className="py-8 bg-stone-50 border-b border-stone-100">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-6 text-center">
            How AI Dental Analysis Works
          </h2>
          <p className="text-lg text-stone-700 leading-relaxed mb-4">
            DentaSmart uses artificial intelligence to analyze photos of your teeth and dental X-rays. Whether you are dealing with tooth pain, bleeding gums, a chipped tooth, or just want to check on your oral health between dental visits, the app gives you a clear starting point in minutes — no appointment needed.
          </p>
          <p className="text-lg text-stone-700 leading-relaxed mb-4">
            Upload a mouth photo or an X-ray image, and the AI identifies potential issues like cavities, gum disease, plaque buildup, tooth decay, cracked teeth, and early signs of periodontitis. You receive an Oral Health Score from 0 to 100, a plain-English explanation of findings, and a personalized dental care plan you can follow at home or bring to your dentist.
          </p>
          <p className="text-lg text-stone-700 leading-relaxed">
            DentaSmart is not a replacement for a licensed dentist. It is an educational tool that helps you understand what is happening in your mouth, prepare better questions for your dental visit, and catch potential problems before they become expensive emergencies.
          </p>
        </div>
      </section>

      {/* 4-Step Visual Process (New StoryBrand) */}
      <section className="pt-6 pb-6 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px bg-border -z-10"></div>

            {/* Step 1: Capture */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 bg-white border border-border rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:border-primary group-hover:scale-105 transition-all duration-500 relative z-10">
                <Camera className="w-8 h-8 text-foreground" strokeWidth={1.5} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-medium text-sm">1</div>
              </div>
              <h3 className="text-2xl font-medium text-foreground mb-4">Capture</h3>
              <p className="text-muted-foreground font-normal leading-relaxed max-w-xs">
                Answer guided self-examination questions, take 2 mouth photos or upload X-rays.
              </p>
            </motion.div>

            {/* Step 2: Analyze */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 bg-white border border-border rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:border-primary group-hover:scale-105 transition-all duration-500 relative z-10">
                <Brain className="w-8 h-8 text-foreground" strokeWidth={1.5} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-medium text-sm">2</div>
              </div>
              <h3 className="text-2xl font-medium text-foreground mb-4">Analyze</h3>
              <p className="text-muted-foreground font-normal leading-relaxed max-w-xs">
                AI highlights what to watch and why it matters.
              </p>
            </motion.div>

            {/* Step 3: Understand */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 bg-white border border-border rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:border-primary group-hover:scale-105 transition-all duration-500 relative z-10">
                <FileText className="w-8 h-8 text-foreground" strokeWidth={1.5} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-medium text-sm">3</div>
              </div>
              <h3 className="text-2xl font-medium text-foreground mb-4">Understand</h3>
              <p className="text-muted-foreground font-normal leading-relaxed max-w-xs">
                Two reports: a plain-English version for you and a clinical version for your dentist. Both downloadable as PDF.
              </p>
            </motion.div>

            {/* Step 4: Act */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 bg-white border border-border rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:border-primary group-hover:scale-105 transition-all duration-500 relative z-10">
                <MessageSquare className="w-8 h-8 text-foreground" strokeWidth={1.5} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-medium text-sm">4</div>
              </div>
              <h3 className="text-2xl font-medium text-foreground mb-4">Act</h3>
              <p className="text-muted-foreground font-normal leading-relaxed max-w-xs">
                Follow a simple plan or bring the report to your dentist.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Step Breakdown — Keyword-rich long-form content */}
      <section className="py-8 bg-white border-t border-stone-100">
        <div className="container px-4 mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-10 text-center">
            Each Step Explained
          </h2>

          {/* Step 1 Detail */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0">1</div>
              <h3 className="text-2xl font-medium text-foreground">Complete a Guided Self-Examination</h3>
            </div>
            <p className="text-stone-700 leading-relaxed mb-3 ml-[52px]">
              Before you take any photos, DentaSmart walks you through a quick self-examination. You will answer simple questions about your symptoms — things like tooth sensitivity to hot or cold, bleeding when brushing, jaw pain, bad breath, or visible discoloration. This context helps the AI provide more accurate and relevant insights.
            </p>
            <p className="text-stone-700 leading-relaxed ml-[52px]">
              The self-exam includes a Bite Pressure Test, a Cold Sensitivity Test, and a Visual Inspection checklist. It takes about two minutes and gives the AI the clinical context it needs to go beyond what a photo alone can show.
            </p>
          </div>

          {/* Step 2 Detail */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0">2</div>
              <h3 className="text-2xl font-medium text-foreground">Upload Dental Photos or X-Rays for AI Analysis</h3>
            </div>
            <p className="text-stone-700 leading-relaxed mb-3 ml-[52px]">
              Take two photos of your teeth using your phone camera — one of your upper teeth and one of your lower teeth. If you have dental X-rays from a recent visit, you can upload those instead. DentaSmart accepts both intraoral photos and panoramic or bitewing X-ray images.
            </p>
            <p className="text-stone-700 leading-relaxed ml-[52px]">
              The AI scans your images for signs of common dental problems including cavities, tooth decay, gum recession, tartar buildup, cracked or chipped teeth, misalignment, and early-stage periodontal disease. Color-coded overlays highlight exactly where each finding is located, so you can see what the AI detected on your own image.
            </p>
          </div>

          {/* Step 3 Detail */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0">3</div>
              <h3 className="text-2xl font-medium text-foreground">Receive Your Oral Health Report in Plain English</h3>
            </div>
            <p className="text-stone-700 leading-relaxed mb-3 ml-[52px]">
              Within minutes, you receive two reports. The first is written in plain English for you — no dental jargon, no confusing terminology. It explains what the AI found, how serious each issue might be, and what you can do about it. The second is a clinical report formatted for your dentist, with tooth-by-tooth findings, differential diagnoses, and urgency levels.
            </p>
            <p className="text-stone-700 leading-relaxed ml-[52px]">
              Your report includes an Oral Health Score from 0 to 100 that reflects the overall condition of your teeth and gums. You also get estimated treatment costs, so you know what to expect before you walk into a dental office. Both reports are downloadable as PDF files you can save, print, or share.
            </p>
          </div>

          {/* Step 4 Detail */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0">4</div>
              <h3 className="text-2xl font-medium text-foreground">Follow Your Personalized Dental Care Plan</h3>
            </div>
            <p className="text-stone-700 leading-relaxed mb-3 ml-[52px]">
              Based on your results, DentaSmart creates a personalized care plan with clear next steps. This might include daily oral hygiene recommendations, product suggestions, reminders for follow-up scans, and guidance on which findings need professional dental attention and which ones you can monitor at home.
            </p>
            <p className="text-stone-700 leading-relaxed ml-[52px]">
              You can also ask Din, your 24/7 personal AI dentist, any dental question at any time. Din is trained specifically for dental health conversations and can help you understand treatment options, dental insurance questions, what to expect during procedures, and how to maintain better oral hygiene habits between dental visits.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Carousel (Standardized) */}
      <section className="py-6 bg-white overflow-hidden">
        <BenefitsCarousel />
      </section>

      {/* What you'll walk away with - 3 Tiles (New StoryBrand) */}
      <section className="py-6 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-normal text-foreground mb-6">
              What you'll walk away with
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Activity, 
                title: "Oral Health Score", 
                desc: "A clear 0-100 rating of your dental wellness." 
              },
              { 
                icon: ShieldCheck, 
                title: "Top findings with severity", 
                desc: "Know exactly what needs attention now vs later." 
              },
              { 
                icon: ClipboardList, 
                title: "Action plan and reminders", 
                desc: "Simple steps to improve your health daily." 
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white p-10 rounded-3xl shadow-sm border border-stone-100 hover:shadow-md transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto text-primary">
                  <feature.icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-medium text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground font-normal leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Report Features - Clean Grid (Restored) */}
      <section className="py-6 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-normal text-foreground mb-6">
              What you get in your reports
            </h2>
            <p className="text-xl text-muted-foreground font-normal">
              Two versions: a simple one for you and a detailed one for your dentist. Both downloadable as PDF.
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
              },
              { 
                icon: FileText, 
                title: "Dentist Report", 
                desc: "A clinical version with tooth-by-tooth findings, differentials, and urgency levels your dentist can act on." 
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-border hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-accent/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-foreground group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground font-normal leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who DentaSmart Is For — Keyword-rich audience section */}
      <section className="py-8 bg-stone-50 border-t border-stone-100">
        <div className="container px-4 mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-8 text-center">
            Who Uses DentaSmart
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "People Without Dental Insurance",
                desc: "If you do not have dental insurance, DentaSmart helps you understand your oral health before committing to an expensive dental visit. Get clarity on whether that toothache needs urgent care or can wait."
              },
              {
                title: "Parents Monitoring Family Dental Health",
                desc: "Track oral health for up to five family members under one account. Check your children's teeth for early signs of cavities, monitor braces progress, and stay on top of everyone's dental hygiene."
              },
              {
                title: "People Seeking a Dental Second Opinion",
                desc: "Upload your dentist's treatment plan and get an independent AI review. Compare recommended procedures, understand alternative options, and see estimated costs before you commit."
              },
              {
                title: "Anyone with Dental Anxiety",
                desc: "If dental visits make you anxious, DentaSmart gives you a way to understand your oral health from home. Know what to expect, prepare your questions, and walk into the dental office with confidence."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm"
              >
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <h3 className="text-xl font-medium text-foreground">{item.title}</h3>
                </div>
                <p className="text-stone-600 leading-relaxed ml-9">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Teaser (New StoryBrand) */}
      <section className="py-6 bg-white border-t border-stone-100">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-8">
            Common Questions
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-10 text-lg text-stone-600 font-light">
            <p>How accurate is it?</p>
            <span className="hidden md:block text-stone-300">•</span>
            <p>What photos work best?</p>
            <span className="hidden md:block text-stone-300">•</span>
            <p>Is it a dentist replacement?</p>
          </div>
          <Link href="/faqs">
            <Button variant="outline" size="lg" className="rounded-full px-8 border-stone-300 text-stone-600 hover:bg-stone-100 hover:text-black">
              Read all FAQs
            </Button>
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <DownloadSection />

      <Footer />
    </div>
  );
}
