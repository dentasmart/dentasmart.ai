import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ExternalSources from "@/components/ExternalSources";
import { Button } from "@/components/ui/button";
import { trackAppDownload, getAppStoreUrl, getPlayStoreUrl } from "@/lib/analytics";
import { motion } from "framer-motion";
import { Smartphone, Shield, Zap, Heart, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const steps = [
  { num: "1", title: "Download the App", desc: "Get DentaSmart on iOS or Android. The app is free to download." },
  { num: "2", title: "Start a Free Quick Check", desc: "Use supported mouth photos, supported X-rays, or both. Mouth photos do not require an X-ray." },
  { num: "3", title: "Upgrade When Needed", desc: "Choose Full Quick Check, Treatment Plan Review, or Complete Care when you need those services." },
  { num: "4", title: "Review Your Report", desc: "Read the educational insights and prepare questions for your dentist. DentaSmart does not provide a diagnosis." },
];

export default function Download() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black">
      <SEO
        title="Download DentaSmart | iOS & Android App"
        description="Download DentaSmart for unlimited Free Quick Checks using supported mouth photos, supported X-rays, or both. Upgrade to Full Quick Check when you need full eligible X-ray insights."
        canonical="https://dentasmart.ai/download"
        keywords="download dentasmart, dental app, AI dental analysis, oral health score, dental X-ray analysis app"
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
                <Smartphone className="w-4 h-4" />
                Available on iOS and Android
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-6 leading-tight">
                Download DentaSmart <br />
                <span className="italic text-primary">on your phone</span>.
              </h1>
              <p className="text-xl text-stone-600 mb-8 font-light leading-relaxed">
                Start with unlimited Free Quick Checks using supported mouth photos, supported X-rays, or both. Mouth photos do not require an X-ray.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href={getAppStoreUrl("download_page")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-black px-8 text-lg text-white transition-colors hover:bg-stone-800 sm:w-auto"
                  onClick={() => trackAppDownload("ios", "download_page")}
                >
                  <svg viewBox="0 0 24 24" className="mr-2 h-6 w-6 fill-current">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.74-3.03 1.59-.67.79-1.25 2.05-1.09 3.2 1.17.09 2.35-.84 3.05-1.68" />
                  </svg>
                  Download for iOS
                </a>
                <a
                  href={getPlayStoreUrl("download_page")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-action px-8 text-lg text-action-foreground transition-colors hover:bg-action-hover sm:w-auto"
                  onClick={() => trackAppDownload("android", "download_page")}
                >
                  <Smartphone className="mr-2 h-6 w-6" />
                  Download for Android
                </a>
              </div>

              <div className="flex items-center gap-6 text-sm text-stone-500">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> Unlimited Free Quick Checks</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> No card to download</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> Privacy &amp; Security</span>
              </div>
              <Link href="/pricing/" className="mt-5 inline-flex min-h-11 items-center text-sm font-medium text-action hover:underline">
                Compare Full Quick Check and plans <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex justify-center"
            >
              <div className="w-64 h-[520px] bg-black rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.2rem] overflow-hidden">
                  <img
                    src="/manus-storage/dentasmart-app-free-quick-check_303190e3.webp"
                    alt="DentaSmart Free Quick Check screen for guided mouth photos"
                    className="h-full w-full object-cover object-top"
                    width="828"
                    height="1792"
                  />
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
              { icon: Zap, title: "Clear Educational Insights", desc: "Upload supported information and receive a report that helps you prepare for a dental conversation." },
              { icon: Shield, title: "Privacy & Security", desc: "We take the privacy and security of your dental data seriously. See our Privacy Policy for details on how information is handled." },
              { icon: Heart, title: "Organized Next Steps", desc: "Review questions, cost context, and monitoring tools based on the service you choose." },
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

      {/* Bottom CTA */}
      <section className="py-16 bg-action text-action-foreground text-center">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-normal text-action-foreground mb-4">
            Start with a Free Quick Check
          </h2>
          <p className="text-xl text-action-foreground font-light mb-8">
            Use supported mouth photos, supported X-rays, or both. Upgrade one case only when you need the Full Quick Check package.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-white text-action hover:bg-white/90 rounded-full px-10 py-7 text-lg font-medium cursor-pointer"
            >
              <a
                href={getAppStoreUrl("download_page_bottom")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAppDownload("ios", "download_page_bottom")}
              >
                Download on iOS
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white bg-transparent text-white hover:bg-white/10 rounded-full px-10 py-7 text-lg font-medium cursor-pointer"
            >
              <a
                href={getPlayStoreUrl("download_page_bottom")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackAppDownload("android", "download_page_bottom")}
              >
                Download on Android
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="container px-4 mx-auto max-w-4xl">
          <ExternalSources route="/download/" heading="App availability" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
