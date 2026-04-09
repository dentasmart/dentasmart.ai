import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";
import { AndroidEarlyAccessModal } from "@/components/AndroidEarlyAccessModal";
import { trackAppDownload, getAppStoreUrl } from "@/lib/analytics";

export function DownloadSection() {
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState(false);

  return (
    <section id="download-cta" className="py-24 bg-white">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-normal text-black mb-4">
            Download DentaSmart
          </h2>
          <p className="text-xl text-stone-600 font-light">
            Start with a free scan today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* iOS Column */}
          <div className="flex flex-col items-center space-y-6 p-8 rounded-3xl bg-stone-50 border border-stone-100">
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-2">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.74-3.03 1.59-.67.79-1.25 2.05-1.09 3.2 1.17.09 2.35-.84 3.05-1.68" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-black">iOS</h3>
            <a 
              href={getAppStoreUrl("download_section")} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full"
              onClick={() => trackAppDownload("ios", "download_section")}
            >
              <Button className="w-full bg-black text-white hover:bg-stone-800 rounded-full h-12">
                Download on App Store
              </Button>
            </a>
            <div className="w-32 h-32 bg-white p-2 rounded-xl shadow-sm border border-stone-100">
              <img loading="lazy" src="/images/qr-code.png" 
 alt="Download on iOS QR Code" 
 className="w-full h-full object-contain"
 
 />
            </div>
          </div>

          {/* Android Column */}
          <div className="flex flex-col items-center space-y-6 p-8 rounded-3xl bg-stone-50 border border-stone-100">
            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mb-2">
              <Smartphone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-medium text-black">Android</h3>
            <Button 
              className="w-full bg-primary text-white hover:bg-primary/90 rounded-full h-12"
              onClick={() => {
                trackAppDownload("android", "download_section");
                setIsAndroidModalOpen(true);
              }}
            >
              Join Early Access
            </Button>
            <AndroidEarlyAccessModal 
              isOpen={isAndroidModalOpen} 
              onClose={() => setIsAndroidModalOpen(false)} 
            />
            <div className="text-center px-4">
              <p className="text-sm text-stone-600">
                We're putting the finishing touches on our Android app. Join the waitlist to be notified first.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
