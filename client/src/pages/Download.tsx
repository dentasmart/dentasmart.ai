import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { trackEvent, trackAppDownload, getAppStoreUrl, getPlayStoreUrl } from "@/lib/analytics";
import { motion } from "framer-motion";
import { Smartphone, Shield, Zap, Heart, Star, CheckCircle2, ArrowRight } from "lucide-react";
import { useEffect } from "react";

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "DentaSmart",
  operatingSystem: "iOS, Android",
  applicationCategory: "HealthApplication",
  description: "AI-powered dental health analysis. Upload a photo and get instant insights with a personalized care plan.",
  url: "https://dentasmart.ai/download",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    ratingCount: "1200",
    bestRating: "5",
  },
};

const steps = [
  { num: "1", title: "Download the App", desc: "Get DentaSmart free on the App Store. Takes less than a minute." },
  { num: "2", title: "Take a Photo", desc: "Snap a picture of your teeth or upload an existing X-ray." },
  { num: "3", title: "Get Your Score", desc: "AI analyzes your oral health and gives you a clear score out of 100." },
  { num: "4", title: "Follow Your Plan", desc: "Receive a personalized care plan with costs, timelines, and next steps." },
];

const reviews = [
  { name: "Sarah M.", text: "Finally understand what my dentist has been telling me. The X-ray analysis is incredible.", rating: 5 },
  { name: "James K.", text: "Saved me hundreds by knowing exactly what I needed before my appointment.", rating: 5 },
  { name: "Maria L.", text: "The oral health score motivates me to take better care of my teeth every day.", rating: 5 },
];

export default function Download() {
  useEffect(() => {
    trackEvent("download_page_view");
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black">
      <SEO
        title="Download DentaSmart - Free AI Dental Health App"
        description="Download DentaSmart on iOS or Android. Get instant AI-powered dental insights, oral health scores, and personalized care plans. Free to start."
        canonical="https://dentasmart.ai/download"
        keywords="download dentasmart, dental app, AI dental analysis, oral health score, dental X-ray analysis app"
        jsonLd={appJsonLd}
      />
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-primary/10" />
        </div>
        <div className="container relative z-10 px-4 mx-auto max-w-7xl pt-40 md:pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium mb-6">
                <Star className="w-4 h-4 fill-current" />
                5 Stars on the App Store
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-6 leading-tight">
                Take control of your <br />
                <span className="italic text-primary">oral health</span> today.
              </h1>
              <p className="text-xl text-stone-600 mb-8 font-light leading-relaxed">
                Download DentaSmart and get instant clarity about what is happening in your mouth. No more guessing, no more surprise bills.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href={getAppStoreUrl("download_page")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                  onClick={() => trackAppDownload("ios", "download_page")}
                >
                  <Button size="lg" className="bg-black text-white hover:bg-stone-800 rounded-full px-8 py-7 text-lg w-full sm:w-auto cursor-pointer">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current mr-2">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.74-3.03 1.59-.67.79-1.25 2.05-1.09 3.2 1.17.09 2.35-.84 3.05-1.68" />
                    </svg>
                    Download for iOS
                  </Button>
                </a>
                <a
                  href={getPlayStoreUrl("download_page")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                  onClick={() => trackAppDownload("android", "download_page")}
                >
                  <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-7 text-lg w-full sm:w-auto cursor-pointer">
                    <Smartphone className="w-6 h-6 mr-2" />
                    Download for Android
                  </Button>
                </a>
              </div>

              <div className="flex items-center gap-6 text-sm text-stone-500">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> Free to start</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> No credit card</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> HIPAA compliant</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex justify-center"
            >
              <div className="w-64 h-[520px] bg-black rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.2rem] overflow-hidden flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-2xl font-bold text-primary">83<span className="text-base">/100</span></p>
                    <p className="text-sm text-stone-500 mt-2">Your Oral Health Score</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Strip */}
      <section className="py-16 bg-stone-50">
        <div className="container px-4 mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-normal text-black mb-12 text-center">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {step.num}
                </div>
                <h3 className="text-lg font-medium text-black mb-2">{step.title}</h3>
                <p className="text-stone-600 font-light text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Instant AI Analysis", desc: "Upload a photo and get insights in under 10 minutes. No waiting for appointments." },
              { icon: Shield, title: "Private & Secure", desc: "Your dental data stays encrypted and is never shared with third parties." },
              { icon: Heart, title: "Personalized Plans", desc: "Get a clear care plan tailored to your specific needs with cost estimates." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="text-center"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-black mb-2">{item.title}</h3>
                <p className="text-stone-600 font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-stone-50">
        <div className="container px-4 mx-auto max-w-4xl">
          <h2 className="text-3xl font-normal text-black mb-10 text-center">What users are saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="bg-white rounded-2xl p-6 border border-stone-100"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-stone-700 font-light mb-4 text-sm">&ldquo;{review.text}&rdquo;</p>
                <p className="text-stone-500 text-sm font-medium">{review.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-normal text-white mb-4">
            Ready to see what is really going on?
          </h2>
          <p className="text-xl text-white/80 font-light mb-8">
            Join thousands of people who stopped guessing and started knowing.
          </p>
          <a
            href={getAppStoreUrl("download_page_bottom")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAppDownload("ios", "download_page_bottom")}
          >
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-10 py-7 text-lg font-medium cursor-pointer">
              Download DentaSmart Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
