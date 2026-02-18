import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { motion } from "framer-motion";
import { Camera, ArrowRight, CheckCircle, Clock, Shield, Sparkles } from "lucide-react";
import { useEffect } from "react";

const scanTypes = [
  { title: "Teeth Photo Scan", desc: "Take a photo of your front teeth, top, and bottom. Our AI detects cavities, discoloration, gum recession, and more.", time: "~30 seconds" },
  { title: "X-Ray Analysis", desc: "Upload a dental X-ray (panoramic or periapical). Get detailed findings including bone loss, root issues, and hidden decay.", time: "~60 seconds" },
];

const whatYouGet = [
  "Oral Health Score (0-100)",
  "Tooth-by-tooth findings",
  "Condition severity ratings",
  "Recommended treatment types",
  "Estimated cost ranges",
  "Type of dentist to see",
  "Personalized care timeline",
  "Prevention recommendations",
];

export default function InstantScan() {
  useEffect(() => {
    trackEvent("instant_scan_page_view");
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black">
      <SEO
        title="Instant AI Dental Scan - Get Results in 60 Seconds"
        description="Upload a photo of your teeth or dental X-ray and get instant AI-powered analysis. Detect cavities, gum disease, and more in under 60 seconds. Free first scan."
        canonical="https://dentasmart.ai/instant-scan"
        keywords="instant dental scan, AI dental analysis, teeth photo scan, dental X-ray analysis, oral health check online"
      />
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-primary/10" />
        </div>
        <div className="container relative z-10 px-4 mx-auto max-w-7xl pt-32 md:pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                AI-Powered Analysis
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-6 leading-tight">
                See what your dentist sees — <span className="italic text-primary">before your visit</span>.
              </h1>
              <p className="text-xl text-stone-600 mb-8 font-light leading-relaxed">
                Upload a photo of your teeth or X-rays. Our AI analyzes it in seconds and gives you a clear, jargon-free report so you know exactly what is going on.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "No appointment needed",
                  "Results in under 60 seconds",
                  "Plain-language explanations",
                  "Personalized care plan included",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-stone-700">{item}</span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 py-7 text-lg font-medium cursor-pointer"
                onClick={() => {
                  trackEvent("cta_get_score_click", { source: "instant_scan_page" });
                  window.location.href = "/#download-cta";
                }}
              >
                <Camera className="w-5 h-5 mr-2" />
                Start My Free Scan
              </Button>
              <div className="flex items-center gap-6 text-sm text-stone-500 mt-6">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-primary" /> Results in 60 seconds</span>
                <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-primary" /> 100% private</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="bg-stone-50 rounded-3xl p-8 border border-stone-100">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-medium text-black">How It Works</h3>
                </div>
                <div className="space-y-6">
                  {[
                    { step: "1", title: "Take a Photo", desc: "Snap a picture of your teeth or upload an X-ray" },
                    { step: "2", title: "AI Analyzes", desc: "Our AI scans for cavities, gum issues, and more" },
                    { step: "3", title: "Get Your Report", desc: "Receive a clear report with your oral health score" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-medium text-black">{item.title}</h4>
                        <p className="text-sm text-stone-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scan Types */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-normal text-black mb-10 text-center">Two ways to scan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {scanTypes.map((scan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="bg-stone-50 rounded-2xl p-8 border border-stone-100"
              >
                <h3 className="text-xl font-medium text-black mb-3">{scan.title}</h3>
                <p className="text-stone-600 font-light mb-4">{scan.desc}</p>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-medium">
                  <Clock className="w-4 h-4" /> {scan.time}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 bg-stone-50">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-normal text-black mb-10 text-center">What you get in your report</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whatYouGet.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="flex items-center gap-3 bg-white rounded-xl p-4 border border-stone-100"
              >
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-stone-700">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-normal text-white mb-4">
            Stop wondering. Start knowing.
          </h2>
          <p className="text-xl text-white/80 font-light mb-8">
            Your first scan is free. Get your Oral Health Score in under a minute.
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 rounded-full px-10 py-7 text-lg font-medium cursor-pointer"
            onClick={() => {
              trackEvent("cta_get_score_click", { source: "instant_scan_bottom" });
              window.location.href = "/#download-cta";
            }}
          >
            Get My Oral Health Score
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
