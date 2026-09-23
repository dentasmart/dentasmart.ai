import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { trackConversionEvent } from "@/lib/analytics";
import { motion } from "framer-motion";
import { MapPin, Search, ArrowRight, Star, Phone, Clock } from "lucide-react";

const dentistTypes = [
  { type: "General Dentist", desc: "Routine checkups, cleanings, fillings, and basic dental care." },
  { type: "Periodontist", desc: "Specializes in gum disease treatment and dental implants." },
  { type: "Endodontist", desc: "Root canal specialists who save damaged teeth." },
  { type: "Orthodontist", desc: "Braces, aligners, and teeth straightening." },
  { type: "Oral Surgeon", desc: "Tooth extractions, jaw surgery, and dental implants." },
  { type: "Pediatric Dentist", desc: "Dental care specifically for children and teens." },
];

const tips = [
  { title: "Know What You Need", desc: "Use general guidance to understand the kinds of dental professionals you may encounter. A licensed dentist can assess your situation and recommend appropriate care." },
  { title: "Check Reviews", desc: "Look for details about communication, appointment access, and how the practice explains options. Review several sources before deciding." },
  { title: "Ask About Costs Upfront", desc: "Ask the office for current fees, what an appointment includes, and any questions you have about the estimate." },
  { title: "Verify Insurance Details", desc: "If you have insurance, confirm coverage and network details directly with your insurer and the dental office before booking." },
  { title: "Consider Location & Hours", desc: "Choose a dentist close to home or work with hours that fit your schedule. Evening and weekend availability can be valuable." },
  { title: "Bring Your DentaSmart Report", desc: "If sharing is available for your selected service, bring your report and questions to the appointment for discussion with your dentist." },
];

export default function FindADentist() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black">
      <SEO
        title="How to Find the Right Dentist - DentaSmart Guide"
        description="Learn how to compare common dentist roles and prepare questions for a dental office. A licensed dentist can assess your individual needs."
        canonical="https://dentasmart.ai/find-a-dentist"
      />
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-primary/10" />
        </div>
        <div className="container relative z-10 px-4 mx-auto max-w-7xl pt-40 md:pt-32">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium mb-6">
                <MapPin className="w-4 h-4" />
                Dentist Guide
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-6 leading-tight">
                Find the right dentist <br />
                <span className="italic text-primary">for your needs</span>.
              </h1>
              <p className="text-xl text-stone-600 mb-8 font-light leading-relaxed">
                Not sure what type of dentist to look for? Use this guide to understand common dental roles and prepare questions for a licensed dentist or dental office.
              </p>
              <Button
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 py-7 text-lg font-medium cursor-pointer"
                onClick={() => {
                  trackConversionEvent("cta_click", {
                  cta_id: "find_dentist_hero_free_quick_check",
                    surface: "hero",
                    intent: "download",
                    destination_type: "internal_route",
                    destination_path: "/download/",
                  });
                  window.location.href = "/download/";
                }}
              >
                Start with a Free Quick Check
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dentist Types */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-normal text-black mb-4 text-center">Types of Dental Professionals</h2>
          <p className="text-lg text-stone-600 font-light text-center mb-12 max-w-2xl mx-auto">
            Each type of dentist specializes in different aspects of oral health. Here is who does what.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dentistTypes.map((dt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-stone-50 rounded-2xl p-6 border border-stone-100"
              >
                <h3 className="text-lg font-medium text-black mb-2">{dt.type}</h3>
                <p className="text-stone-600 font-light text-sm">{dt.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 bg-stone-50">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-normal text-black mb-12 text-center">
            6 Tips for Choosing the Right Dentist
          </h2>
          <div className="space-y-8">
            {tips.map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-6"
              >
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-black mb-1">{tip.title}</h3>
                  <p className="text-stone-600 font-light">{tip.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-normal text-white mb-4">
            Prepare for your next dental visit
          </h2>
          <p className="text-xl text-white/80 font-light mb-8">
            Use supported information to organize your questions, then discuss your situation, care options, and costs with a dental professional.
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 rounded-full px-10 py-7 text-lg font-medium cursor-pointer"
            onClick={() => {
              trackConversionEvent("cta_click", {
                  cta_id: "find_dentist_final_free_quick_check",
                surface: "mid_content",
                intent: "download",
                destination_type: "internal_route",
                destination_path: "/download/",
              });
              window.location.href = "/download/";
            }}
          >
            Start with a Free Quick Check
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
