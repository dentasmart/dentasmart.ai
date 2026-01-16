import { motion } from "framer-motion";
import { useLocation } from "wouter";

export function DownloadCTA() {
  const [location, setLocation] = useLocation();

  const handleAndroidClick = (e: React.MouseEvent) => {
    // If we are already on the home page, manually scroll
    if (location === "/") {
      e.preventDefault();
      const element = document.getElementById("android-waitlist");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        // Update hash without reloading
        window.history.pushState(null, "", "/#android-waitlist");
      }
    }
    // Otherwise, let the default anchor behavior handle navigation to /#android-waitlist
  };

  return (
    <section className="py-24 bg-gradient-to-br from-[#0097A7] to-[#006978] text-white text-center">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          <h2 className="text-3xl md:text-4xl font-medium mb-4 tracking-wide">
            Download DentaSmart Today
          </h2>
          <p className="text-white/90 text-lg font-light mb-8">
            Join thousands of users who have transformed their dental health with DentaSmart.
          </p>

          {/* App Store Buttons */}
          <div className="flex gap-4 mb-10">
            <a 
              href="https://apps.apple.com/us/app/dentasmart/id6670311232" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-90 transition-opacity"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                alt="Download on the App Store" 
                className="h-10 w-auto"
              />
            </a>
            <div className="relative group">
              <a 
                href="/#android-waitlist" 
                className="hover:opacity-90 transition-opacity block"
                onClick={handleAndroidClick}
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                  alt="Get it on Google Play" 
                  className="h-10 w-auto"
                />
              </a>
              <div className="absolute -top-3 -right-2 bg-white text-[#006978] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm border border-white/20 uppercase tracking-wider transform group-hover:scale-105 transition-transform">
                Coming Soon
              </div>
            </div>
          </div>

          <p className="text-white text-lg font-medium mb-6">
            Scan the QR code to download the Dentasmart app from the app store
          </p>

          {/* QR Code */}
          <div className="bg-white p-2 rounded-lg shadow-lg">
            <img 
              src="/images/qr-code.png" 
              alt="Scan to download DentaSmart App" 
              className="w-48 h-48 object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
