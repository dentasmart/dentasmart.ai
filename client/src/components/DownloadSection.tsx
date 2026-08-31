import { trackAppDownload, getAppStoreUrl, getPlayStoreUrl } from "@/lib/analytics";

export function DownloadSection({
  source = "download_section",
  showAnchorId = true,
}: {
  source?: string;
  showAnchorId?: boolean;
} = {}) {
  return (
    <section {...(showAnchorId ? { id: "download-cta" } : {})} className="py-24 bg-white">
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
              href={getAppStoreUrl(source)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
              onClick={() => trackAppDownload("ios", source)}
            >
              <button className="w-full bg-black text-white hover:bg-stone-800 rounded-full h-12 font-medium transition-colors">
                Download on App Store
              </button>
            </a>
            <div className="w-36 h-36 bg-white rounded-xl shadow-sm border border-stone-100 flex items-center justify-center overflow-hidden">
              <img
                loading="lazy"
                src="/images/ios-qr-d286ca7b.png"
                alt="Download on iOS QR Code"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Android Column */}
          <div className="flex flex-col items-center space-y-6 p-8 rounded-3xl bg-stone-50 border border-stone-100">
            <div className="w-16 h-16 bg-[#3DDC84] text-white rounded-full flex items-center justify-center mb-2">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.637.637 0 0 0-.83.22l-1.88 3.24a11.463 11.463 0 0 0-8.94 0L5.65 5.67a.643.643 0 0 0-.87-.2c-.28.18-.37.54-.22.83L6.4 9.48A10.78 10.78 0 0 0 1 18h22a10.78 10.78 0 0 0-5.4-8.52zM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z"/>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-black">Android</h3>
            <a
              href={getPlayStoreUrl(source)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
              onClick={() => trackAppDownload("android", source)}
            >
              <button className="w-full bg-action text-action-foreground hover:bg-action-hover rounded-full h-12 font-medium transition-colors">
                Get it on Google Play
              </button>
            </a>
            <div className="w-36 h-36 bg-white rounded-xl shadow-sm border border-stone-100 flex items-center justify-center overflow-hidden">
              <img
                loading="lazy"
                src="/images/android-qr-842538bb.png"
                alt="Scan to download DentaSmart on Android"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
