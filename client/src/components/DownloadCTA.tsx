import { motion } from "framer-motion";
import { trackAppDownload, getAppStoreUrl, getPlayStoreUrl } from "@/lib/analytics";

export function DownloadCTA() {
  return (
    <section id="download-cta" className="py-24 bg-gradient-to-br from-[#0097A7] to-[#006978] text-white text-center">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          <h2 className="text-3xl md:text-4xl font-medium mb-4 tracking-wide">
            Start with a Free Quick Check
          </h2>
          <p className="text-white/90 text-lg font-light mb-8">
            Use mouth photos from your phone, supported X-rays, or both. Mouth photos do not require an X-ray.
          </p>

          {/* App Store Buttons */}
          <div className="flex gap-4 mb-10">
            <a
              href={getAppStoreUrl("download_cta")}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-90 transition-opacity"
              onClick={() => trackAppDownload("ios", "download_cta")}
            >
              <img
                loading="lazy"
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                alt="Download on the App Store"
                className="h-10 w-auto"
              />
            </a>
            <a
              href={getPlayStoreUrl("download_cta")}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-90 transition-opacity"
              onClick={() => trackAppDownload("android", "download_cta")}
            >
              <img
                loading="lazy"
                src="/images/android-qr-842538bb.png"
                alt="Scan to download DentaSmart on Android"
                className="h-10 w-auto"
              />
            </a>
          </div>

          <p className="text-white text-lg font-medium mb-6">
            Scan the QR code to download the DentaSmart app from the app store
          </p>

          {/* QR Code */}
          <div className="bg-white rounded-lg shadow-lg flex items-center justify-center overflow-hidden">
            <img
              loading="lazy"
              src="/images/ios-qr-d286ca7b.png"
              alt="Scan to download DentaSmart App"
              className="w-48 h-48 object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
