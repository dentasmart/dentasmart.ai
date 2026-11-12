import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import HowItWorksHero from "@/components/HowItWorksHero";
import { DownloadSection } from "@/components/DownloadSection";
import ExternalSources from "@/components/ExternalSources";
import { BenefitsCarousel } from "@/components/BenefitsCarousel";
import { Camera, Brain, FileText, MessageSquare, Activity, ShieldCheck, ClipboardList, Calendar, Bell, TrendingUp, HeartPulse, CheckCircle2, Scan, Upload, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-foreground selection:bg-primary/20">
      <SEO
        title="How DentaSmart Works | AI Oral Health Guide in 4 Steps"
        description="See how DentaSmart analyzes mouth photos, X-rays, symptoms, and records, with licensed dentist review before reports are delivered."
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
            DentaSmart uses AI to analyze submitted mouth photos, supported dental X-rays, symptoms, and treatment records. Start with an unlimited Free Quick Check, or submit a broader assessment or a dentist-provided treatment plan for review.
          </p>
          <p className="text-lg text-stone-700 leading-relaxed mb-4">
            Reports explain findings in plain language and show an Oral Health Score based on assessable areas where included. Depending on the assessment and available information, they may also include treatment considerations, priorities, possible timelines, and risk summaries.
          </p>
          <p className="text-lg text-stone-700 leading-relaxed">
            Every generated report is reviewed and approved by licensed dentists before delivery. The app does not replace an in-person dental examination or hands-on treatment.
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
                Add the supported photos, X-rays, symptoms, or treatment documents needed for your chosen service.
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
                AI analyzes the submitted information, then licensed dentists review and approve the generated report before delivery.
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
                Read findings, score context, and any treatment considerations, priorities, and risk summaries included in your assessment.
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
                Discuss your report with your dentist, ask Dr. Din AI follow-up questions, and keep track of changes.
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
              <h3 className="text-2xl font-medium text-foreground">Add the Information for Your Service</h3>
            </div>
            <p className="text-stone-700 leading-relaxed mb-3 ml-[52px]">
              Free Quick Check accepts mouth photos, supported X-rays, or both, with no X-ray required. It is unlimited; free X-ray reports show limited eligible findings. Full Quick Check unlocks full eligible X-ray insights for one case. A broader assessment can use symptoms and history, while Treatment Plan Review uses a dentist-provided plan and supporting records.
            </p>
            <p className="text-stone-700 leading-relaxed ml-[52px]">
              When offered, optional guided self-examination helps you record observations that add context to your assessment. Follow the safe in-app instructions; these checks do not replace a clinical examination.
            </p>
          </div>

          {/* Step 2 Detail */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0">2</div>
              <h3 className="text-2xl font-medium text-foreground">DentaSmart Reviews the Submitted Information</h3>
            </div>
            <p className="text-stone-700 leading-relaxed mb-3 ml-[52px]">
              Follow the in-app instructions for supported photos or documents. If you have dental X-rays from a recent visit, you can add them when the selected service supports them.
            </p>
            <p className="text-stone-700 leading-relaxed ml-[52px]">
              DentaSmart analyzes the available evidence and links findings to the submitted image or view. Color-coded overlays and plain-language notes help explain each finding. Areas that cannot be assessed are not treated as healthy.
            </p>
          </div>

          {/* Step 3 Detail */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0">3</div>
              <h3 className="text-2xl font-medium text-foreground">Review Your Report</h3>
            </div>
            <p className="text-stone-700 leading-relaxed mb-3 ml-[52px]">
              Your report explains findings, what they mean, why they matter, and what to watch for. Broader assessments and treatment-plan reviews may include treatment considerations, priorities, possible timelines, cost context, and risk summaries based on available information.
            </p>
            <p className="text-stone-700 leading-relaxed ml-[52px]">
              When a downloadable PDF is included, you can save, print, or share it. Cost ranges are estimates, not provider quotes or insurance coverage decisions.
            </p>
          </div>

          {/* Step 4 Detail */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0">4</div>
              <h3 className="text-2xl font-medium text-foreground">Prepare Questions and Monitor Your Records</h3>
            </div>
            <p className="text-stone-700 leading-relaxed mb-3 ml-[52px]">
              Use the report to prepare questions, organize cost considerations, and keep your records in one place. If you have pain, swelling, bleeding, trauma, or another urgent concern, contact a dental professional rather than relying on the app.
            </p>
            <p className="text-stone-700 leading-relaxed ml-[52px]">
              Talk with Dr. Din, DentaSmart's AI oral-health companion, about report findings, your Oral Health Score, treatment explanations, dental history, and general oral-health questions. Dr. Din is AI and cannot examine you or provide hands-on care.
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
                desc: "A 0-100 summary of assessable areas, with coverage and score history where available."
              },
              { 
                icon: ShieldCheck, 
                title: "Findings and priorities",
                desc: "Review findings marked for attention or monitoring, based on the available assessment information."
              },
              { 
                icon: ClipboardList, 
                title: "Treatment considerations",
                desc: "Possible options and next steps, depending on the assessment and available records."
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
              Report contents and downloadable formats depend on the service you choose.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: Activity, 
                title: "Visual Findings", 
                desc: "See findings linked to the submitted image, with overlays where available."
              },
              { 
                icon: FileText, 
                title: "Plain English", 
                desc: "Read dental terms alongside explanations of the finding and affected area."
              },
              { 
                icon: ShieldCheck,
                title: "Action Plan", 
                desc: "Preventive-care and maintenance considerations where included in your assessment."
              },
              { 
                icon: ClipboardList, 
                title: "Discussion Plan",
                desc: "Review treatment considerations and priorities to discuss with your treating dentist."
              },
              { 
                icon: Calendar, 
                title: "Timelines", 
                desc: "Possible timing and follow-up considerations based on the assessment and available information."
              },
              { 
                icon: Bell, 
                title: "Reminders", 
                desc: "Manage available notification settings for report updates and reminders in the app."
              },
              { 
                icon: TrendingUp, 
                title: "Risk Context",
                desc: "Risk summaries and considerations if care is delayed, where supported by the assessment."
              },
              { 
                icon: HeartPulse, 
                title: "Oral Health Score", 
                desc: "A 0-100 summary based only on areas DentaSmart could assess from the available evidence."
              },
              { 
                icon: MessageSquare, 
                title: "Talking Points", 
                desc: "Specific questions to ask your dentist so you walk in prepared." 
              },
              { 
                icon: FileText, 
                title: "Dentist Report", 
                desc: "When included, a detailed version with tooth-by-tooth observations and discussion points."
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
                desc: "If you do not have dental insurance, DentaSmart can help you organize information and questions before a dental visit. It does not determine whether symptoms are urgent."
              },
              {
                title: "Parents Monitoring Family Dental Health",
                desc: "Complete Care Family covers up to four total members, including the primary user. Review current plan details before purchase."
              },
              {
                title: "People Reviewing a Treatment Plan",
                desc: "Use Treatment Plan Review to understand a dentist-provided plan, possible alternatives, priorities, and questions to discuss before you decide."
              },
              {
                title: "Anyone with Dental Anxiety",
                desc: "If dental visits make you anxious, DentaSmart can help you organize questions and information before you speak with a dental professional."
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
          <Link href="/faqs/">
            <Button variant="outline" size="lg" className="rounded-full px-8 border-stone-300 text-stone-600 hover:bg-stone-100 hover:text-black">
              Read all FAQs
            </Button>
          </Link>
        </div>
      </section>

      <section className="pb-8 bg-white">
        <div className="container px-4 mx-auto max-w-4xl">
          <ExternalSources route="/how-it-works/" heading="Product fact verification" />
        </div>
      </section>

      {/* Final CTA */}
      <DownloadSection />

      <Footer />
    </div>
  );
}
