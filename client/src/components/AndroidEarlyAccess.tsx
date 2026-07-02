import { motion } from "framer-motion";
import { trackAppDownload, getPlayStoreUrl } from "@/lib/analytics";

/**
 * Android download section — shown on the homepage.
 * Android is now live on Google Play. This section mirrors the iOS CTA style.
 */
export function AndroidEarlyAccess() {
  return (
    <section id="android-download" className="py-24 bg-primary relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white" />
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-white" />
      </div>

      <div className="container px-4 mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
            Now Live on Android
          </div>

          <h2 className="text-4xl md:text-5xl font-normal text-white mb-6 leading-tight">
            DentaSmart is now on Google Play
          </h2>

          <p className="text-white/90 text-xl font-light mb-10 leading-relaxed">
            Android users can now get their personal AI dentist in their pocket. Download the app and start your first free scan today.
          </p>

          <a
            href={getPlayStoreUrl("homepage_android_section")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAppDownload("android", "homepage_android_section")}
            className="inline-block"
          >
            <div className="bg-white p-3 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <img
                src="/images/android-qr-842538bb.png"
                alt="Scan to download DentaSmart on Android"
                className="w-32 h-32 object-contain"
              />
            </div>
          </a>

          <p className="text-white/70 text-sm mt-6">
            Free to download. No credit card required to start.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
