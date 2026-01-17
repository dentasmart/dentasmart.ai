import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { DownloadCTA } from "@/components/DownloadCTA";
import { UserChallengesCarousel } from "@/components/UserChallengesCarousel";
import { Lock, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      title: "AI X-ray Analysis",
      description: "Gain deeper understanding of your dental health with AI-powered analysis of your X-rays.\n\nOur advanced AI reviews your dental X-rays, highlighting potential areas of concern and providing educational insights. This helps you understand what your dentist sees and empowers you to ask informed questions about your oral health.",
      points: [
        "Visual Insights: See color-coded overlays on your X-rays indicating areas for attention.",
        "Detailed Explanations: Get clear, simple explanations of complex dental terms and findings.",
        "Preparation for Visits: Walk into your dental appointments with a better understanding of your X-rays."
      ],
      image: "/images/features/ai_xray_analysis.png"
    },
    {
      title: "AI-Powered Mouth Image Insights",
      description: "Understand visual indicators in your mouth images before they become bigger concerns.\n\nSimply take photos of your mouth with your smartphone, and our AI will analyze them to identify visual cues related to your oral health. This feature helps you monitor changes and proactively address potential issues.",
      points: [
        "Self-Monitoring: Easily track the appearance of your teeth and gums over time.",
        "Early Visual Cues: Our AI can highlight subtle changes that might warrant attention.",
        "Guided Photography: In-app guidance helps you capture the best possible images for analysis."
      ],
      image: "/images/features/mouth_image_insights.png"
    },
    {
      title: "Personalized Recommendations",
      description: "Get AI-generated suggestions based on your input and images – educational, not clinical.\n\nDentaSmart provides tailored advice and tips to help you improve your oral hygiene and maintain a healthy smile. These recommendations are designed to educate and empower you, offering actionable steps you can take in your daily routine.",
      points: [
        "Customized Advice: Suggestions are unique to your oral health profile.",
        "Actionable Steps: Clear, easy-to-follow guidance for daily care.",
        "Educational Focus: Learn how to proactively manage your oral health."
      ],
      image: "/images/features/personalized_recommendations.png"
    },
    {
      title: "Interactive Health Timeline",
      description: "Track your oral wellness journey visually and intuitively.\n\nSee your progress over time with an interactive timeline that charts your oral health score, uploaded images, and key insights. This visual history helps you stay motivated and understand the long-term impact of your oral care habits.",
      points: [
        "Visual Progress: Watch your oral health score evolve over months and years.",
        "Historical Insights: Review past analyses and compare them with your current status.",
        "Motivation & Engagement: Stay on track with a clear overview of your journey."
      ],
      image: "/images/features/interactive_timeline.png"
    },
    {
      title: "Proactive Risk Indicators",
      description: "Get notified when patterns suggest areas to watch, helping you stay ahead of potential issues.\n\nOur AI continuously monitors your data for subtle patterns that might indicate an increased risk for certain dental conditions. Receive timely alerts and educational information, allowing you to take preventive action or discuss concerns with your dentist before problems escalate.",
      points: [
        "Early Warnings: Be alerted to potential risks before they become serious.",
        "Preventive Action: Empower yourself to address issues proactively.",
        "Informed Discussions: Have specific points to discuss with your dental professional."
      ],
      image: "/images/features/proactive_risk_indicators.png"
    },
    {
      title: "Dynamic Oral Wellness Score",
      description: "Monitor changes in your dental health score over time, providing a clear snapshot of your oral well-being.\n\nYour personalized oral wellness score, ranging from 0-100, gives you an easy-to-understand metric of your overall dental health. This score dynamically updates as you use DentaSmart, reflecting the impact of your oral care habits and helping you set goals for improvement.",
      points: [
        "Simple Metric: One clear number to understand your oral health status.",
        "Real-time Updates: Score adjusts as you upload new data and follow recommendations.",
        "Goal Setting: Work towards improving your score with personalized guidance."
      ],
      image: "/images/features/oral_wellness_score.png"
    },
    {
      title: "Your AI Dental Guide 24/7: Din",
      description: "Your helpful, always-available AI bot, Din, is here to guide your dental questions and explain your results.\n\nDin is your personal AI oral health guide, ready to chat whenever you have questions about your oral health, DentaSmart insights, or general dental topics. Din provides clear, personalized answers in plain language (not just English), acting as a knowledgeable and supportive friend on your oral health journey.",
      points: [
        "Instant Answers: Get immediate responses to your dental questions, any time of day.",
        "Result Explanations: Din can help you understand your X-ray and image analysis reports.",
        "Supportive Guidance: Receive helpful tips and information to empower your dental decisions."
      ],
      image: "/images/features/dr_din_chat.png"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-stone-200">
      <Navigation />

      {/* Hero Section - Abstract & Tech */}
      <section className="relative py-24 md:py-52 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/backgrounds/hero-smile-generic.jpg" 
            alt="AI Dental Analysis" 
            className="w-full h-full object-cover object-top md:object-center"
          />
          <div className="absolute inset-0 bg-white/95 md:bg-white/90" />
        </div>

        <div className="container relative z-10 px-4 mx-auto max-w-4xl text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-light tracking-tight text-black mb-8 leading-[1.1]">
              The tools you need to <br />
              <span className="font-normal italic text-primary">take control</span>.
            </h1>
            <p className="text-xl md:text-2xl text-black font-normal max-w-2xl mr-auto leading-relaxed">
              From instant X-ray analysis to 24/7 answers from Din, we give you the power to make confident decisions about your dental care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature Deep Dives - Alternating Layout */}
      <section className="pt-32 pb-0 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl space-y-32">
          
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
                className={`order-1 ${idx % 2 === 0 ? 'md:order-2' : 'md:order-1'} relative aspect-square rounded-3xl overflow-hidden bg-stone-200 shadow-xl`}
              >
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="absolute inset-0 w-full h-full object-contain bg-white hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </div>
          ))}

        </div>
      </section>

      {/* User Challenges Carousel */}
      <section className="pt-0 pb-10 bg-stone-100 relative">
        {/* Section Separator */}
        <div className="container px-4 mx-auto">
          <div className="w-full h-px bg-stone-200 mb-16" />
        </div>
        <UserChallengesCarousel />
      </section>

      {/* Security Section - Clean & Trustworthy */}
      <section className="py-32 bg-white">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Lock className="w-8 h-8 text-stone-900" strokeWidth={1.5} />
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-8">
            Security & Privacy First
          </h2>
          <p className="text-xl text-stone-600 font-light leading-relaxed mb-12">
            Your health data is protected by law. We use bank-level encryption and never sell your data to third parties. You own your data, always.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { title: "HIPAA Compliant", desc: "Full regulatory compliance for health data protection." },
              { title: "Encrypted Storage", desc: "AES-256 encryption for data at rest and in transit." },
              { title: "Your Data, Your Control", desc: "Export or delete your data anytime with one click." }
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

      {/* Final CTA */}
      <DownloadCTA />

      <Footer />
    </div>
  );
}
