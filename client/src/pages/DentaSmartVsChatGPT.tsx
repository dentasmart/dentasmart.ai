import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import FAQSchema from "@/components/FAQSchema";
import { Button } from "@/components/ui/button";
import { trackEvent, getAppStoreUrl, getPlayStoreUrl, trackAppDownload } from "@/lib/analytics";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, MinusCircle, Smartphone, Shield, Clock, TrendingUp, Heart, DollarSign, Users } from "lucide-react";
import { useEffect } from "react";
import { Link } from "wouter";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const comparisonRows = [
  { feature: "Built for oral health", dentasmart: "Yes. Designed around teeth, gums, X-rays, symptoms, treatment plans, reports, and dental history.", chatgpt: "General AI assistant that can answer dental questions among many other topics.", dentasmartWins: true },
  { feature: "Mouth photo analysis", dentasmart: "Yes. Part of the DentaSmart oral-health workflow with guided self-examination.", chatgpt: "Can accept images, but not built as a dental monitoring system.", dentasmartWins: true },
  { feature: "Dental X-ray workflow", dentasmart: "Yes. Supports dental X-rays as part of Quick Check, Complete Checkup, and Second Opinion.", chatgpt: "Can accept images, but not purpose-built for dental X-ray review or oral-health tracking.", dentasmartWins: true },
  { feature: "Oral Health Score", dentasmart: "Yes. Personalized 0-100 score with progress tracking over time.", chatgpt: "No dedicated oral-health scoring system.", dentasmartWins: true },
  { feature: "Monitoring over time", dentasmart: "Yes. Tracks reports, scores, symptoms, images, visits, and changes tooth by tooth.", chatgpt: "Memory can help personalization, but it is not a dental record or tooth-by-tooth timeline.", dentasmartWins: true },
  { feature: "Second opinion", dentasmart: "Yes. Compares treatment plans, X-rays, images, bills, and your questions.", chatgpt: "Can explain general dental terms, but no structured second-opinion report.", dentasmartWins: true },
  { feature: "Cost clarity", dentasmart: "Yes. Includes treatment cost context and helps reduce surprise dental expenses.", chatgpt: "General cost explanations only.", dentasmartWins: true },
  { feature: "Family oral-health tracking", dentasmart: "Yes. Separate family profiles and records for up to 4 members.", chatgpt: "Not designed for family dental profiles.", dentasmartWins: true },
  { feature: "Dentist visit history", dentasmart: "Yes. Stores visits, prescriptions, bills, notes, reports, images, and X-rays.", chatgpt: "Not built as a dental record system.", dentasmartWins: true },
  { feature: "Dr. Din", dentasmart: "Yes. Your 24/7 Personal AI Dentist connected to your DentaSmart history.", chatgpt: "General chatbot without dental-specific context.", dentasmartWins: true },
  { feature: "Best use", dentasmart: "Monitoring, prevention, second opinions, cost clarity, oral-health tracking, and family dental organization.", chatgpt: "General Q&A, definitions, and basic dental explanations.", dentasmartWins: false },
];

const faqs = [
  { question: "Can ChatGPT analyze dental images?", answer: "ChatGPT can accept image inputs and provide general observations. However, it is not purpose-built for dental image analysis, does not provide an Oral Health Score, and cannot track changes to your teeth over time. DentaSmart is designed specifically for dental photo and X-ray workflows with structured reports and longitudinal tracking." },
  { question: "Does ChatGPT have memory for dental conversations?", answer: "ChatGPT has memory features that can help personalize conversations. However, it does not maintain a structured dental record, tooth-by-tooth timeline, or oral-health history. DentaSmart stores every scan, report, score, visit, and treatment plan as part of your ongoing oral-health profile." },
  { question: "Is DentaSmart a replacement for a dentist?", answer: "DentaSmart helps you handle regular oral health analysis from home so you can monitor your teeth, track changes, and understand potential issues. If a specific concern or treatment is identified, DentaSmart will guide you to visit a dentist for confirmation and necessary care. Dentists perform the actual hands-on treatment: cleanings, fillings, crowns, root canals, extractions, implants, and emergency procedures." },
  { question: "Can DentaSmart help me understand a treatment plan?", answer: "Yes. DentaSmart's Second Opinion feature lets you upload your treatment plan, X-rays, and images. It compares the recommendation against your oral-health data and provides context on cost, urgency, alternatives, and what questions to ask your dentist." },
  { question: "How much does DentaSmart cost compared to ChatGPT?", answer: "ChatGPT Plus costs $20/month for general AI access across all topics. DentaSmart offers purpose-built dental plans: Quick Check for one-time clarity, Second Opinion for treatment plan review, Complete Oral Health Checkup for year-round monitoring, and Family Plan for households. See the pricing page for current details." },
  { question: "Can I use both DentaSmart and ChatGPT?", answer: "Absolutely. Use ChatGPT when you want general explanations about dental topics. Use DentaSmart when the question is about your mouth, your teeth, your X-rays, your treatment plan, or your family's oral health. They serve different purposes." },
  { question: "Does DentaSmart track tooth longevity?", answer: "Yes. DentaSmart monitors each tooth over time, tracking changes in condition, treatments received, and risk factors. This helps you understand which teeth need attention and how to protect them before small issues become expensive treatments." },
  { question: "What about proactive reminders?", answer: "DentaSmart sends personalized reminders based on your oral-health history, upcoming dental needs, and recommended check intervals. ChatGPT does not provide proactive health reminders or follow up on your dental status." },
];

export default function DentaSmartVsChatGPT() {
  useEffect(() => {
    trackEvent("compare_page_view", { slug: "dentasmart-vs-chatgpt-dental" });
  }, []);

  const scrollToDownload = () => {
    const el = document.getElementById("download-cta");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black selection:bg-primary/20">
      <SEO
        title="DentaSmart vs ChatGPT: Which AI Should You Trust With Your Teeth?"
        description="ChatGPT answers dental questions. DentaSmart helps you monitor, prevent, compare, track, and reduce the cost of oral-health decisions using your actual teeth, X-rays, and dental history."
        canonical="https://dentasmart.ai/compare/dentasmart-vs-chatgpt-dental"
        keywords="dentasmart vs chatgpt, chatgpt dental advice, ai dental app, chatgpt for teeth, dentasmart comparison, ai oral health"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            name: "DentaSmart vs ChatGPT: Which AI Should You Trust With Your Teeth?",
            description: "A comprehensive comparison of DentaSmart and ChatGPT for dental and oral health use cases.",
            url: "https://dentasmart.ai/compare/dentasmart-vs-chatgpt-dental",
            inLanguage: "en-US",
            isPartOf: { "@type": "WebSite", name: "DentaSmart", url: "https://dentasmart.ai" },
            audience: { "@type": "MedicalAudience", name: "Patients" },
            lastReviewed: "2026-07-06",
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://dentasmart.ai" },
              { "@type": "ListItem", position: 2, name: "Compare", item: "https://dentasmart.ai/compare/dentasmart-vs-chatgpt-dental" },
            ],
          },
        ]}
      />
      <FAQSchema faqs={faqs} />
      <Navigation />

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative flex items-center overflow-hidden bg-gradient-to-br from-white via-accent/5 to-primary/5">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 px-4 mx-auto max-w-6xl pt-40 pb-12 md:pt-36 md:pb-16">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-6">
              <Shield className="w-4 h-4" /> Product Comparison
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-4 leading-[1.1] max-w-5xl">
              DentaSmart vs ChatGPT:{" "}
              <span className="italic text-primary">Which AI Should You Trust With Your Teeth?</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-3xl mb-4">
              ChatGPT can answer dental questions. DentaSmart helps you monitor, prevent, compare, track, and reduce the cost of oral-health decisions using your actual teeth, X-rays, symptoms, reports, and treatment history.
            </p>
            <p className="text-sm text-stone-500 mb-8 font-medium">
              Your Personal AI Dentist in Your Pocket.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 shadow-lg w-full sm:w-auto"
                onClick={scrollToDownload}
              >
                Start with a Quick Check
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/5 rounded-full px-8 py-6 text-base font-medium cursor-pointer w-full sm:w-auto"
                onClick={scrollToDownload}
              >
                Get a Second Opinion
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          THE SIMPLE ANSWER
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-white border-b border-stone-100">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-6">
              The simple answer
            </h2>
            <div className="bg-stone-50 rounded-2xl p-6 md:p-8 border border-stone-100 mb-6">
              <p className="text-lg md:text-xl text-stone-800 font-medium leading-relaxed mb-4">
                Use ChatGPT when you want a general explanation.
              </p>
              <p className="text-lg md:text-xl text-primary font-medium leading-relaxed">
                Use DentaSmart when the question is about <span className="italic">your</span> mouth.
              </p>
            </div>
            <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed mb-4">
              ChatGPT can explain dental terms, procedures, and general oral-health concepts. It is a powerful general-purpose AI that works well for broad questions.
            </p>
            <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed">
              DentaSmart lets you upload mouth photos, dental X-rays, symptoms, treatment plans, bills, and visit notes, then turns them into a structured oral-health report, Oral Health Score, second opinion, cost context, and ongoing monitoring history. It is purpose-built for your teeth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          COMPARISON TABLE
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="comparison-table" className="py-12 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              DentaSmart vs ChatGPT: side by side
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light max-w-3xl">
              Here is how they compare on the factors that matter for your oral health.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="-mx-4 md:mx-0 overflow-x-auto"
          >
            <table className="w-full bg-white rounded-none md:rounded-2xl overflow-hidden border border-stone-200 min-w-[650px]">
              <thead>
                <tr className="bg-stone-900 text-white">
                  <th className="text-left py-3 px-3 md:px-5 font-medium text-xs md:text-sm w-[22%]">Feature</th>
                  <th className="text-left py-3 px-3 md:px-5 font-medium text-xs md:text-sm w-[42%]">
                    <span className="text-primary">DentaSmart</span>
                  </th>
                  <th className="text-left py-3 px-3 md:px-5 font-medium text-xs md:text-sm w-[36%]">ChatGPT</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className={`border-t border-stone-100 ${idx % 2 === 0 ? "bg-white" : "bg-stone-50/50"}`}>
                    <td className="py-3 px-3 md:px-5 font-medium text-black text-xs md:text-sm">{row.feature}</td>
                    <td className="py-3 px-3 md:px-5 text-xs md:text-sm">
                      <div className="flex items-start gap-2">
                        {row.dentasmartWins ? (
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        ) : (
                          <MinusCircle className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={row.dentasmartWins ? "text-stone-800 font-medium" : "text-stone-700"}>{row.dentasmart}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 md:px-5 text-xs md:text-sm">
                      <div className="flex items-start gap-2">
                        {!row.dentasmartWins ? (
                          <CheckCircle className="w-4 h-4 text-stone-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <MinusCircle className="w-4 h-4 text-stone-300 flex-shrink-0 mt-0.5" />
                        )}
                        <span className="text-stone-600">{row.chatgpt}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* CTA after table */}
          <div className="text-center mt-10">
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 shadow-lg"
              onClick={scrollToDownload}
            >
              Start with a Quick Check <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          STORY SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-6 leading-tight">
              Dental problems become expensive when people wait too long.
            </h2>
            <div className="space-y-3 mb-8">
              {[
                "A little sensitivity.",
                "Bleeding gums.",
                "A toothache that comes and goes.",
                "A treatment plan that feels too expensive.",
                "A dentist recommending a crown, root canal, implant, or extraction.",
              ].map((line, idx) => (
                <p key={idx} className="text-lg text-stone-700 font-light">{line}</p>
              ))}
            </div>
            <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed mb-6">
              Most people do not know what to do next, so they either delay care or say yes without fully understanding the problem.
            </p>
            <div className="bg-primary/5 rounded-2xl p-6 md:p-8 border border-primary/10 mb-6">
              <p className="text-lg md:text-xl text-black font-medium mb-4">
                That is where DentaSmart is different.
              </p>
              <p className="text-base text-stone-700 leading-relaxed">
                DentaSmart helps you see what may be happening, monitor changes, understand possible risks, compare treatment recommendations, and reduce surprise dental costs before the problem gets worse.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <p className="text-stone-500 text-sm">ChatGPT can explain dental topics.</p>
              <p className="text-primary text-sm font-medium">DentaSmart helps you manage your oral health.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WHEN TO USE EACH
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              When to use each
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ChatGPT Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 md:p-8 border border-stone-200"
            >
              <h3 className="text-xl font-medium text-stone-800 mb-4">Use ChatGPT for:</h3>
              <div className="space-y-3">
                {[
                  "General dental questions",
                  "Definitions of dental terms",
                  "Basic explanations of procedures",
                  "Preparing a list of questions for your dentist",
                  "Understanding broad oral-health concepts",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <MinusCircle className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm md:text-base text-stone-600">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* DentaSmart Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 md:p-8 border border-primary/20 shadow-sm"
            >
              <h3 className="text-xl font-medium text-primary mb-4">Use DentaSmart for:</h3>
              <div className="space-y-3">
                {[
                  "Checking your own teeth and gums",
                  "Reviewing mouth photos or dental X-rays",
                  "Getting your Oral Health Score",
                  "Monitoring changes over time",
                  "Understanding a treatment plan",
                  "Getting a second opinion before expensive dental work",
                  "Saving dental visit history",
                  "Tracking family oral health",
                  "Asking Dr. Din about your reports, symptoms, score, and next steps",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm md:text-base text-stone-800">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PRODUCT DIFFERENTIATION: REMEMBERS YOUR MOUTH
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-stone-900 text-white">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-normal text-white mb-6 leading-tight">
              DentaSmart does what a chatbot cannot: it remembers your mouth.
            </h2>
            <p className="text-base md:text-lg text-stone-300 font-light leading-relaxed mb-6">
              Every Quick Check, Complete Oral Health Checkup, Second Opinion, X-ray, mouth image, Oral Health Score, dentist visit, prescription, bill, and note can become part of your oral-health history.
            </p>
            <p className="text-base md:text-lg text-stone-300 font-light leading-relaxed mb-8">
              That means DentaSmart is not just answering a question today. It is helping you track your teeth and gums over time.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <TrendingUp className="w-5 h-5" />, text: "See what is improving" },
                { icon: <Shield className="w-5 h-5" />, text: "Spot what may be getting worse" },
                { icon: <Heart className="w-5 h-5" />, text: "Understand what needs attention" },
                { icon: <Clock className="w-5 h-5" />, text: "Protect your teeth before small issues become expensive treatments" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-primary flex-shrink-0 mt-0.5">{item.icon}</div>
                  <p className="text-sm md:text-base text-stone-200">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          LIFETIME COMPANION + PROACTIVE TIPS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-3 leading-tight">
              A lifetime companion for your oral health
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed max-w-3xl">
              DentaSmart is not a one-time tool. It grows with you, tracking every tooth, every visit, and every change over the years.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <TrendingUp className="w-6 h-6 text-primary" />,
                title: "Tooth Longevity Tracking",
                desc: "Monitor each tooth over time. Know which teeth are at risk and what you can do to protect them before problems escalate.",
              },
              {
                icon: <Clock className="w-6 h-6 text-primary" />,
                title: "Proactive Tips and Reminders",
                desc: "Get personalized reminders based on your oral-health history, upcoming needs, and recommended check intervals.",
              },
              {
                icon: <Shield className="w-6 h-6 text-primary" />,
                title: "Risk Assessment",
                desc: "Understand your risk factors for gum disease, decay, and tooth loss. Take action early instead of reacting to emergencies.",
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-stone-50 rounded-2xl p-6 border border-stone-100"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="text-lg font-medium text-black mb-2">{card.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          COST CLARITY SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-stone-50">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div {...fadeUp}>
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-6 h-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-normal text-black leading-tight">
                The most expensive dental decision is the one you make without clarity.
              </h2>
            </div>
            <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed mb-6">
              Dental costs become stressful when you do not know:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                "Do I really need this treatment?",
                "Can this tooth be saved?",
                "Is the cost reasonable?",
                "What happens if I wait?",
                "Is there another option?",
                "Which treatment should happen first?",
              ].map((q, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-stone-100">
                  <span className="text-primary font-medium text-sm">?</span>
                  <p className="text-sm text-stone-700">{q}</p>
                </div>
              ))}
            </div>
            <p className="text-base text-stone-700 leading-relaxed mb-4">
              DentaSmart helps you understand the recommendation before you commit, especially when the treatment plan feels serious, expensive, or overwhelming.
            </p>
            <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
              <p className="text-sm text-stone-500 mb-1">ChatGPT can explain what a root canal is.</p>
              <p className="text-sm text-primary font-medium">DentaSmart helps you understand whether your uploaded case, images, X-rays, and treatment plan appear to support the recommendation.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TREATMENT CONSIDERATIONS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-3 leading-tight">
              Treatment considerations that ChatGPT cannot provide
            </h2>
            <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed max-w-3xl">
              When you upload your dental data to DentaSmart, you get context that goes beyond a general explanation.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: <Smartphone className="w-5 h-5 text-primary" />, title: "Based on your actual images", desc: "DentaSmart analyzes your specific photos and X-rays, not generic examples." },
              { icon: <Users className="w-5 h-5 text-primary" />, title: "Connected to your history", desc: "Previous scans, scores, and visits inform every new analysis." },
              { icon: <TrendingUp className="w-5 h-5 text-primary" />, title: "Progress-aware recommendations", desc: "DentaSmart knows what changed since your last check and adjusts accordingly." },
              { icon: <DollarSign className="w-5 h-5 text-primary" />, title: "Cost-informed decisions", desc: "Understand the financial implications before committing to a treatment plan." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flex items-start gap-4 bg-stone-50 rounded-xl p-5 border border-stone-100"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-base font-medium text-black mb-1">{item.title}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FAQ SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-stone-50">
        <div className="container px-4 mx-auto max-w-4xl">
          <motion.div {...fadeUp} className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-2">
              Common questions about DentaSmart vs ChatGPT
            </h2>
          </motion.div>
          <div className="space-y-3 md:space-y-4">
            {faqs.map((faq, idx) => (
              <motion.details
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="group bg-white rounded-xl border border-stone-100 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-4 md:p-5 cursor-pointer list-none">
                  <h3 className="text-sm md:text-base font-medium text-black pr-4">{faq.question}</h3>
                  <span className="text-primary text-xl flex-shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="px-4 pb-4 pt-0 md:px-5 md:pb-5">
                  <p className="text-stone-600 font-light leading-relaxed text-xs md:text-sm">{faq.answer}</p>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-14 bg-primary text-white">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-normal text-white mb-4 leading-tight">
              Stop asking general questions about dental problems. Start understanding your own mouth.
            </h2>
            <p className="text-base md:text-lg text-white/80 font-light leading-relaxed max-w-2xl mx-auto mb-4">
              ChatGPT can answer a dental question. DentaSmart helps you monitor, prevent, compare, track, and reduce the cost of oral-health decisions.
            </p>
            <p className="text-white/90 font-medium mb-8">Start with a Quick Check today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-base font-medium cursor-pointer transition-all hover:scale-105 shadow-lg w-full sm:w-auto"
                onClick={scrollToDownload}
              >
                <Smartphone className="w-4 h-4 mr-2" /> Start with a Quick Check
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-medium cursor-pointer w-full sm:w-auto"
                onClick={scrollToDownload}
              >
                Get a Second Opinion
              </Button>
            </div>
            <p className="mt-6 text-sm text-white/60">
              Available on{" "}
              <a href={getAppStoreUrl("vs_chatgpt_cta")} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white underline" onClick={() => trackAppDownload("ios", "vs_chatgpt_cta")}>iOS</a>
              {" "}and{" "}
              <a href={getPlayStoreUrl("vs_chatgpt_cta")} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white underline" onClick={() => trackAppDownload("android", "vs_chatgpt_cta")}>Android</a>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          RELATED PAGES
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-8 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <h2 className="text-lg font-medium text-black mb-4">Related Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "How DentaSmart Works", href: "/how-it-works", tagline: "See the full process in 3 steps." },
              { name: "DentaSmart vs Teledentistry", href: "/compare/dentasmart-vs-teledentistry", tagline: "AI analysis vs video calls." },
              { name: "DentaSmart Pricing", href: "/pricing", tagline: "Plans for every need." },
              { name: "Free AI Teeth Scanner", href: "/free-ai-teeth-scanner", tagline: "Learn how AI scanning works." },
            ].map((page, idx) => (
              <Link key={idx} href={page.href}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(idx * 0.05, 0.3), duration: 0.4 }}
                  className="bg-stone-50 rounded-xl p-4 border border-stone-100 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer h-full"
                >
                  <h3 className="text-base font-medium text-black mb-1">{page.name}</h3>
                  <p className="text-stone-500 font-light text-xs leading-relaxed line-clamp-2 mb-2">{page.tagline}</p>
                  <span className="inline-flex items-center gap-1 text-primary text-xs font-medium">
                    Read more <ArrowRight className="w-3 h-3" />
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          DOWNLOAD SECTION (for scroll target)
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="download-cta" className="py-12 bg-stone-50 border-t border-stone-100">
        <div className="container px-4 mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-black mb-3">
              Download DentaSmart
            </h2>
            <p className="text-lg text-stone-600 font-light">
              Start with a free scan today.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* iOS */}
            <div className="flex flex-col items-center space-y-4 p-6 rounded-2xl bg-white border border-stone-100">
              <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.74-3.03 1.59-.67.79-1.25 2.05-1.09 3.2 1.17.09 2.35-.84 3.05-1.68" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-black">iOS</h3>
              <a
                href={getAppStoreUrl("vs_chatgpt_download")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
                onClick={() => trackAppDownload("ios", "vs_chatgpt_download")}
              >
                <Button className="w-full bg-black text-white hover:bg-stone-800 rounded-full py-5 text-base font-medium cursor-pointer">
                  Download on App Store
                </Button>
              </a>
              <p className="text-xs text-stone-500">Live now. Rated 5.0.</p>
            </div>
            {/* Android */}
            <div className="flex flex-col items-center space-y-4 p-6 rounded-2xl bg-white border border-stone-100">
              <div className="w-14 h-14 bg-[#3DDC84] text-white rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                  <path d="M17.523 15.341a1 1 0 0 0 1-1V8.524a1 1 0 1 0-2 0v5.817a1 1 0 0 0 1 1m-11.046 0a1 1 0 0 0 1-1V8.524a1 1 0 1 0-2 0v5.817a1 1 0 0 0 1 1M14.7 3.2l1.1-1.7a.3.3 0 0 0-.5-.3l-1.1 1.8A5.9 5.9 0 0 0 12 2.5a5.9 5.9 0 0 0-2.2.5L8.7 1.2a.3.3 0 0 0-.5.3l1.1 1.7A4.5 4.5 0 0 0 7 7.5h10a4.5 4.5 0 0 0-2.3-4.3M10 5.5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m4 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1M7 8.5v7a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-black">Android</h3>
              <a
                href={getPlayStoreUrl("vs_chatgpt_download")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
                onClick={() => trackAppDownload("android", "vs_chatgpt_download")}
              >
                <Button className="w-full bg-[#3DDC84] text-black hover:bg-[#3DDC84]/90 rounded-full py-5 text-base font-medium cursor-pointer">
                  Get on Google Play
                </Button>
              </a>
              <p className="text-xs text-stone-500">Early access available.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
