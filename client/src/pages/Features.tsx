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
      description: "Symptoms and observations can add useful context to an image.\n\nWhen available with a selected service, the guided self-examination walks you through simple checks before your photo upload, including a Bite Pressure Test, Cold Sensitivity Test, and Visual Inspection with a mirror. These checks help organize what you are experiencing alongside the images you provide.",
      points: [
        "Bite Pressure Test: Records tenderness and pain patterns you notice.",
        "Cold Sensitivity Test: Records where and when sensitivity occurs.",
        "Visual Inspection: Guides you to describe what you see accurately."
      ],
      image: "/manus-storage/self-examination_c897255b.png",
      isPhone: true
    },
    {
      title: "Reports for You and Your Dentist",
      description: "Read the findings in plain language, then switch to the dentist view when you want more technical detail.\n\nDentaSmart reports organize your Oral Health Score, findings, mouth images, X-ray insights when eligible, and next questions. Available report actions depend on the plan and report state shown in the app.",
      points: [
        "For You: Plain-language findings, score context, and discussion points.",
        "For Dentist: More technical report detail for a dental conversation.",
        "Report Sections: Move between score, findings, images, and next steps."
      ],
      image: "/manus-storage/dentasmart-app-ai-report-sections_5245a13a.webp",
      isPhone: true
    },
    {
      title: "Stop Wondering What Your X-Rays Mean",
      description: "You should not have to nod along when dental language feels confusing.\n\nDentaSmart highlights visible areas on supported X-rays and explains why they may be worth discussing. Use the visual context to prepare clearer questions for your dentist.",
      points: [
        "Visual Context: See color-coded overlays that make areas easier to discuss.",
        "Plain English: No more confusing medical terms. Just clear explanations.",
        "Confidence: Walk into your appointment knowing exactly what to ask."
      ],
      image: "/images/optimized/ZDzeChpbpgMeHJVN-800.webp"
    },
    {
      title: "Monitor Visible Changes Between Visits",
      description: "A photo history can help you notice when something looks different.\n\nWith DentaSmart's mouth image tools, you can add new photos over time and compare them with earlier records. If you notice pain, swelling, bleeding, or another urgent change, contact a dental professional.",
      points: [
        "Peace of Mind: Check your oral health whenever you feel uncertain.",
        "Change Tracking: Compare visible changes across your saved records.",
        "Easy Monitoring: Track your gum and tooth health from the comfort of home."
      ],
      image: "/manus-storage/dentasmart-app-history_155206e4.webp",
      isPhone: true
    },
    {
      title: "Guidance That Fits Your Routine",
      description: "Generic reminders are easy to ignore.\n\nDentaSmart organizes educational guidance around the images, symptoms, history, and service you choose. Use it to build a manageable routine and prepare questions for professional care.",
      points: [
        "Tailored for You: Advice based on your specific scan results.",
        "Simple Steps: Actionable tips that fit easily into your daily routine.",
        "Better Habits: Learn exactly what *your* mouth needs to stay healthy."
      ],
      image: "/images/optimized/ChlTSVZDNZEOfine-800.webp"
    },
    {
      title: "See Your Progress, Stay Motivated",
      description: "It can be easier to follow a record when you can compare it with earlier information.\n\nThe Interactive Health Timeline provides a visual record of available DentaSmart information over time. It is educational and does not confirm a clinical outcome.",
      points: [
        "Visual record: Compare available information over time.",
        "History view: Keep supported records together.",
        "Context for questions: Use the record to prepare for professional care."
      ],
      image: "/images/optimized/QmtzzNkXnZNbJvtj-800.webp"
    },
    {
      title: "Keep Risk Factors in View",
      description: "Your records can help you keep recurring concerns and habits in view.\n\nDentaSmart organizes educational risk context from the information you provide. It does not predict outcomes or replace a professional examination.",
      points: [
        "Risk Context: Review factors that may be worth discussing.",
        "Follow-Up Prompts: Keep track of areas you plan to revisit.",
        "Professional Boundary: Bring persistent or urgent concerns to a dentist."
      ],
      image: "/images/optimized/OmKqTEPOiEaBSwig-800.webp"
    },
    {
      title: "One Oral Health Score to Track Over Time",
      description: "A consistent reference point can make progress easier to follow.\n\nYour Oral Health Score is a 0-100 educational summary based on information in DentaSmart. It helps you compare your own records over time; it is not a diagnosis or clinical grade.",
      points: [
        "At-a-Glance Summary: Review one consistent educational measure.",
        "History View: Compare your score with your earlier records.",
        "Conversation Starter: Use changes to prepare questions for your dentist."
      ],
      image: "/manus-storage/dentasmart-app-oral-health-score_ef84a3c3.webp",
      isPhone: true
    },
    {
      title: "Ask Dr. Din About Your Report",
      description: "Questions often come up after you read a report.\n\nDr. Din can explain DentaSmart report language, findings, dental terms, and general oral-health information. It can also help you prepare questions for a dentist. It does not diagnose conditions or replace professional care.",
      points: [
        "Plain-Language Help: Review report language and common dental terms.",
        "Question Preparation: Organize what to discuss with a dentist.",
        "Educational Support: Get plain-language context for common dental topics."
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
      description: "Dental estimates can be hard to compare.\n\nDentaSmart provides educational cost ranges for common services and helps you organize treatment-plan questions. These ranges are not provider quotes and can vary by location, case, and dentist.",
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
        description="Explore DentaSmart's unlimited Free Quick Checks, Full Quick Check, Treatment Plan Review, Oral Health Score tracking, reports, records, and guidance from Dr. Din."
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
                Clarity first. Confidence next.
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
