import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { motion } from "framer-motion";
import { Camera, Sun, Smartphone, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function PhotoGuide() {
  useEffect(() => {
    trackEvent("photo_guide_view");
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black">
      <SEO
        title="How to Take a Dental Photo for AI Scan"
        description="Learn how to take clear dental photos for accurate AI analysis. Follow our simple guide for the best results with DentaSmart's oral health scanner."
        canonical="https://dentasmart.ai/photo-guide"
        keywords="dental photo guide, how to photograph teeth, dental X-ray photo tips, best dental photo for AI, DentaSmart photo tips"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to Take the Best Dental Photo for AI Analysis",
          description: "A step-by-step guide to taking clear dental photos for accurate AI analysis with DentaSmart.",
          step: [
            { "@type": "HowToStep", name: "Find Good Lighting", text: "Stand near a window or use your bathroom light. Natural light works best." },
            { "@type": "HowToStep", name: "Position Your Phone", text: "Hold your phone about 6 inches from your mouth. Open wide and pull back your lips." },
            { "@type": "HowToStep", name: "Take Multiple Angles", text: "Capture front, left side, and right side views. For X-rays, lay flat on white surface." },
          ],
        }}
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
                <Camera className="w-4 h-4" />
                Photo Guide
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-6 leading-tight">
                Get the clearest scan <br />
                <span className="italic text-primary">in 3 easy steps</span>.
              </h1>
              <p className="text-xl text-stone-600 mb-8 font-light leading-relaxed">
                A good photo means better AI insights. Follow these simple tips to get the most accurate analysis of your oral health.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto max-w-5xl">
          <div className="space-y-16">
            {[
              {
                step: "1",
                icon: Sun,
                title: "Find Good Lighting",
                desc: "Stand near a window or use your bathroom light. Natural light works best. Avoid shadows on your teeth.",
                dos: ["Face a window or bright light", "Use the flash on your phone if needed"],
                donts: ["Take photos in dim rooms", "Stand with the light behind you"],
              },
              {
                step: "2",
                icon: Smartphone,
                title: "Position Your Phone",
                desc: "Hold your phone about 6 inches from your mouth. Open wide and pull back your lips so your teeth and gums are visible.",
                dos: ["Hold phone steady and close", "Show both upper and lower teeth", "Pull lips back gently"],
                donts: ["Take photos from far away", "Cover teeth with your lips", "Use blurry or shaky shots"],
              },
              {
                step: "3",
                icon: Camera,
                title: "Take Multiple Angles",
                desc: "Take photos of the front, left side, and right side of your teeth. For X-rays, lay them flat on a white surface and photograph from directly above.",
                dos: ["Capture front, left, and right views", "Lay X-rays flat on white background", "Check photos are clear before uploading"],
                donts: ["Only take one angle", "Photograph X-rays at an angle", "Upload blurry images"],
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold">
                      {item.step}
                    </div>
                    <h2 className="text-2xl font-medium text-black">{item.title}</h2>
                  </div>
                  <p className="text-lg text-stone-600 font-light">{item.desc}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
                    <h3 className="font-medium text-green-800 mb-3 flex items-center gap-2 text-base">
                      <CheckCircle className="w-4 h-4" /> Do
                    </h3>
                    <ul className="space-y-2">
                      {item.dos.map((d, i) => (
                        <li key={i} className="text-sm text-green-700">{d}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
                    <h3 className="font-medium text-red-800 mb-3 flex items-center gap-2 text-base">
                      <XCircle className="w-4 h-4" /> Don't
                    </h3>
                    <ul className="space-y-2">
                      {item.donts.map((d, i) => (
                        <li key={i} className="text-sm text-red-700">{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 py-7 text-lg font-medium cursor-pointer"
              onClick={() => {
                trackEvent("cta_get_score_click", { source: "photo_guide" });
                window.location.href = "/#download-cta";
              }}
            >
              Ready? Get My Oral Health Score
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
