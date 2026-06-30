import { trackAppDownload, getAppStoreUrl, getPlayStoreUrl } from "@/lib/analytics";

export function DownloadSection() {
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
              <button className="w-full bg-black text-white hover:bg-stone-800 rounded-full h-12 font-medium transition-colors">
                Download on App Store
              </button>
            </a>
            <div className="w-32 h-32 bg-white p-2 rounded-xl shadow-sm border border-stone-100">
              <img
                loading="lazy"
                src="/images/qr-code.png"
                alt="Download on iOS QR Code"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Android Column */}
          <div className="flex flex-col items-center space-y-6 p-8 rounded-3xl bg-stone-50 border border-stone-100">
            <div className="w-16 h-16 bg-[#3DDC84] text-white rounded-full flex items-center justify-center mb-2">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                <path d="M17.523 15.341a.5.5 0 0 1-.5.5H6.977a.5.5 0 0 1-.5-.5V9.5h11.046v5.841zM7.5 18.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm9 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM3.184 7.857A.5.5 0 0 1 3.5 7h17a.5.5 0 0 1 .434.748l-1.5 2.75A.5.5 0 0 1 19 10.75H5a.5.5 0 0 1-.434-.252l-1.5-2.75a.5.5 0 0 1 .118-.891zM14.5 4.5l1.5-2.5M9.5 4.5 8 2" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-black">Android</h3>
            <a
              href={getPlayStoreUrl("download_section")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
              onClick={() => trackAppDownload("android", "download_section")}
            >
              <button className="w-full bg-primary text-white hover:bg-primary/90 rounded-full h-12 font-medium transition-colors">
                Get it on Google Play
              </button>
            </a>
            <div className="w-32 h-32 bg-white p-2 rounded-xl shadow-sm border border-stone-100 flex items-center justify-center">
              <img
                loading="lazy"
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
