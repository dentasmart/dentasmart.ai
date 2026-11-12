import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { DownloadSection } from "@/components/DownloadSection";
import ExternalSources from "@/components/ExternalSources";
import { BenefitsCarousel } from "@/components/BenefitsCarousel";
import { Lock, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Features() {
  const features: { title: string; description: string; points: string[]; image: string; isPhone?: boolean }[] = [
    {
      title: "Start with a Free Quick Check",
      description: "Use supported mouth photos, supported X-rays, or both. Mouth photos do not require an X-ray.\n\nFree Quick Check is unlimited. If you add supported X-rays, the free report shows a reduced subset of eligible finding data. Upgrade one case to Full Quick Check when you want the full eligible X-ray insights.",
      points: [
        "Unlimited Free Checks: Start again whenever you have new information.",
        "Flexible Inputs: Use mouth photos, supported X-rays, or both.",
        "Clear Upgrade: Full Quick Check unlocks full eligible X-ray insights for one case."
      ],
      image: "/manus-storage/dentasmart-app-free-quick-check_303190e3.webp",
      isPhone: true
    },
    {
      title: "Guided Self-Examination for More Context",
      description: "Symptoms and observations can add useful context to an image.\n\nWhen offered in your assessment, optional guided self-examination helps you record what you notice alongside your images. Follow the safe in-app instructions; these observations do not replace an in-person examination.",
      points: [
        "Symptoms: Record tenderness and pain patterns you notice.",
        "Sensitivity: Describe where and when sensitivity occurs.",
        "Visual observations: Describe the area of concern with the available prompts."
      ],
      image: "/manus-storage/self-examination_c897255b.png",
      isPhone: true
    },
    {
      title: "Reports for You and Your Dentist",
      description: "Every generated report is reviewed and approved by licensed dentists before delivery.\n\nRead findings linked to your submitted photos and X-rays, with plain-language explanations and an Oral Health Score where included. Broader assessments may add treatment considerations, priorities, possible timelines, and risk summaries based on available information. Report formats and actions depend on the selected service.",
      points: [
        "For You: Understand findings, score context, and what to watch for.",
        "For Dentist: More technical detail when that report format is included.",
        "Report Sections: Move between score, findings, images, and next steps."
      ],
      image: "/manus-storage/dentasmart-app-ai-report-sections_5245a13a.webp",
      isPhone: true
    },
    {
      title: "Stop Wondering What Your X-Rays Mean",
      description: "You should not have to nod along when dental language feels confusing.\n\nDentaSmart analyzes supported dental X-rays and links findings to the submitted view. Overlays and explanations help you understand what the findings mean, why they matter, and what to watch for.",
      points: [
        "Visual Context: See color-coded overlays that make areas easier to discuss.",
        "Plain English: Read explanations alongside dental terms.",
        "Visit Preparation: Use findings to prepare questions for your dentist."
      ],
      image: "/images/optimized/ZDzeChpbpgMeHJVN-800.webp"
    },
    {
      title: "Monitor Visible Changes Between Visits",
      description: "A photo history can help you notice when something looks different.\n\nWith DentaSmart's mouth image tools, you can add new photos over time and compare them with earlier records. If you notice pain, swelling, bleeding, or another urgent change, contact a dental professional.",
      points: [
        "New Photos: Add mouth images when you have a change to record.",
        "Change Tracking: Compare visible changes across your saved records.",
        "Between Visits: Keep photo-based findings and records together."
      ],
      image: "/manus-storage/dentasmart-app-history_155206e4.webp",
      isPhone: true
    },
    {
      title: "Guidance That Fits Your Routine",
      description: "DentaSmart reports can include preventive care and maintenance guidance based on the images, symptoms, history, and assessment you submit. Use the available recommendations to plan your routine and discuss care with your dentist.",
      points: [
        "Assessment Context: Guidance based on the information you submit.",
        "Preventive Care: Review daily-care considerations where included.",
        "Maintenance: Keep follow-up and care guidance with your report."
      ],
      image: "/images/optimized/ChlTSVZDNZEOfine-800.webp"
    },
    {
      title: "See Your Progress, Stay Motivated",
      description: "Compare scores, reports, findings, and dental-visit history over time. Your history keeps earlier information available between visits so you can see what changed in the areas assessed.",
      points: [
        "Visual Record: Compare available scores and findings over time.",
        "History View: Keep reports and dental-visit records together.",
        "Visit Context: Refer to earlier findings in a dental conversation."
      ],
      image: "/images/optimized/QmtzzNkXnZNbJvtj-800.webp"
    },
    {
      title: "Keep Risk Factors in View",
      description: "Depending on your assessment and the information available, reports can summarize risk factors and considerations if care is delayed. Keep recurring findings and relevant habits in view, then discuss them with your dentist.",
      points: [
        "Risk Summary: Review factors supported by your assessment.",
        "Follow-Up Prompts: Keep track of areas you plan to revisit.",
        "Professional Boundary: Bring persistent or urgent concerns to a dentist."
      ],
      image: "/images/optimized/OmKqTEPOiEaBSwig-800.webp"
    },
    {
      title: "Your Oral Health Score Over Time",
      description: "Your Oral Health Score is a 0-100 summary of the areas DentaSmart could assess from available photos, X-rays, or other evidence. Areas that could not be assessed are not counted as healthy. Quick Check and Complete Oral Health Checkup have separate score histories.",
      points: [
        "At-a-Glance Summary: Review your score and its assessed coverage.",
        "History View: Compare your score with your earlier records.",
        "Conversation Starter: Use changes to prepare questions for your dentist."
      ],
      image: "/manus-storage/dentasmart-app-oral-health-score_ef84a3c3.webp",
      isPhone: true
    },
    {
      title: "Ask Dr. Din About Your Report",
      description: "Dr. Din is DentaSmart's AI oral-health companion. Ask about report findings, your Oral Health Score, treatment explanations, dental history, or everyday oral-health questions. Dr. Din can help you prepare for a dental visit but cannot examine you or provide hands-on care.",
      points: [
        "Plain-Language Help: Review report language and common dental terms.",
        "Question Preparation: Organize what to discuss with a dentist.",
        "Oral-Health Conversations: Ask follow-up questions about your reports and dental topics."
      ],
      image: "/manus-storage/dentasmart-app-dr-din_f1bac3a2.webp",
      isPhone: true
    },
    {
      title: "Reminders and Report Updates",
      description: "Use notifications to keep track of report readiness and oral-health reminders.\n\nDentaSmart can show in-app reminders and device notifications when a report is ready or when an oral-health task is due. The notification controls available depend on the app and device settings.",
      points: [
        "Report Ready: See when a completed report is available.",
        "Oral-Health Tasks: Keep scheduled reminders in view.",
        "Device Controls: Manage notification access through supported settings."
      ],
      image: "/manus-storage/dentasmart-app-notifications_8daaeb1e.webp",
      isPhone: true
    },
    {
      title: "Cost Context Before You Commit",
      description: "DentaSmart provides cost context for common services and helps you understand a submitted treatment plan. Estimated ranges are not provider quotes and can vary by location, case, and dentist.",
      points: [
        "Cost Ranges: Review typical price context for common services.",
        "Plan Questions: Identify what to clarify before accepting treatment.",
        "Budget Planning: Plan ahead instead of reacting to surprise bills."
      ],
      image: "/images/optimized/XlgHEMbZpBAbEXnM-800.webp",
      isPhone: true
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-stone-200">
      <SEO
        title="DentaSmart Features | Oral Health Reports and Tracking"
        description="Explore dentist-reviewed reports from mouth photos and X-rays, treatment considerations, Oral Health Score tracking, records, and conversations with Dr. Din AI."
        canonical="https://dentasmart.ai/features"
      />
      <Navigation />

      {/* Hero Section - Full Background Image with Overlay */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <picture>
                    <source
                      type="image/webp"
                      srcSet="/images/optimized/ZwswpLjHnfyByaVR-400.webp 400w, /images/optimized/ZwswpLjHnfyByaVR-800.webp 800w, /images/optimized/ZwswpLjHnfyByaVR-1600.webp 1600w"
                      sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1600px"
                    />
                    <img
                      src="/images/optimized/ZwswpLjHnfyByaVR-800.webp"
                      alt="Woman smiling while checking dental health on phone" 
            className="w-full h-full object-cover object-[50%_30%] md:object-center"
                      loading="eager"
                      fetchPriority="high"
                      width="1600"
                      height="893"
                    />
                  </picture>
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/60 md:hidden" />
        </div>

        <div className="container relative z-10 px-4 mx-auto max-w-7xl pt-40 md:pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-left max-w-2xl lg:col-span-7 xl:col-span-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-6 leading-[1.1]">
                Everything you need to understand <br />
                <span className="font-normal italic text-primary">your oral health</span>.
              </h1>
              
              <p className="text-lg md:text-xl text-stone-700 mb-8 font-normal leading-relaxed text-balance">
                Analyze mouth photos and X-rays, read dentist-reviewed findings, and talk with Dr. Din AI about your oral health.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <Link
                  href="/download/"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border-0 bg-action px-8 text-lg font-medium text-action-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:bg-action-hover"
                >
                  Start with a Free Quick Check
                </Link>
                
              </div>
            </motion.div>

            {/* Right Column: Empty to let image show through */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-6"></div>

          </div>
        </div>
      </section>

      {/* Feature Deep Dives - Alternating Layout */}
      <section id="feature-deep-dives" className="pt-12 pb-12 bg-white">
        <div className="container px-4 mx-auto max-w-6xl space-y-12">
          
          {features.map((feature, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`order-2 ${idx % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}
              >
                <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-6">
                  {feature.title}
                </h2>
                <div className="text-xl text-stone-600 font-light leading-relaxed mb-8 whitespace-pre-line">
                  {feature.description}
                </div>
                <ul className="space-y-4">
                  {feature.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start text-black font-light">
                      <Check className="w-5 h-5 text-stone-900 mr-3 mt-1 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: idx % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`order-1 ${idx % 2 === 0 ? 'md:order-2' : 'md:order-1'} relative ${feature.isPhone ? 'flex items-center justify-center py-8' : 'aspect-[4/5] rounded-3xl overflow-hidden bg-stone-200 shadow-xl'}`}
              >
                {feature.isPhone ? (
                  <div className="relative w-[240px] sm:w-[280px] md:w-[300px]">
                    <div className="relative rounded-[2.5rem] sm:rounded-[3rem] border-[6px] sm:border-[8px] border-stone-900 bg-stone-900 shadow-2xl overflow-hidden">
                      {/* iPhone Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] sm:w-[100px] h-[22px] sm:h-[28px] bg-stone-900 rounded-b-2xl z-20" />
                      {/* Screen Content */}
                      <div className="relative aspect-[9/19.5] overflow-hidden bg-white">
                        <img loading="lazy" src={feature.image} 
                          alt={feature.title} 
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img loading="lazy" src={feature.image} 
                    alt={feature.title} 
                    className="absolute inset-0 w-full h-full object-contain bg-white hover:scale-105 transition-transform duration-700"
                  />
                )}
              </motion.div>
            </div>
          ))}

        </div>
      </section>

      {/* Benefits Carousel */}
      <section className="py-12 bg-stone-50 overflow-hidden">
        <BenefitsCarousel />
      </section>


      {/* Security Section - Clean & Trustworthy */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <Lock className="w-8 h-8 text-stone-900" strokeWidth={1.5} />
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-8">
            Your Privacy is Our Priority
          </h2>
          <p className="text-xl text-stone-600 font-light leading-relaxed mb-12">
            You trust us with your health data, and we take that responsibility seriously. We take the privacy and security of your information seriously.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { title: "Privacy & Security", desc: "We take the privacy and security of your health information seriously." },
              { title: "Data Protection", desc: "We use safeguards designed to protect your information." },
              { title: "Your Data, Your Choices", desc: "Download your reports and request account deletion at any time." }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-stone-50 p-6 rounded-2xl border border-stone-100"
              >
                <h3 className="font-medium text-stone-900 mb-2">{item.title}</h3>
                <p className="text-stone-600 font-light text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-8 bg-white">
        <div className="container px-4 mx-auto max-w-4xl">
          <ExternalSources route="/features/" heading="Product fact verification" />
        </div>
      </section>

      {/* Final CTA */}
      <DownloadSection />

      <Footer />
    </div>
  );
}
