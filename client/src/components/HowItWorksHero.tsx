import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HowItWorksHero() {
  return (
    <section className="relative bg-white overflow-hidden h-[80vh] md:h-[700px] pt-32 md:pt-0">
      {/* Full Background Image for All Screens */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/backgrounds/how-it-works-hero-new.png" 
          alt="Man holding phone with DentaSmart App" 
          className="w-full h-full object-cover md:object-contain object-[75%_center] md:object-right-bottom"
        />
        {/* Heavy White Overlay for Text Readability */}
        <div className="absolute inset-0 bg-white/90 md:bg-white/80" />
      </div>

      <div className="container px-4 mx-auto max-w-7xl relative z-10 h-full">
        <div className="flex flex-col justify-center h-full">
          
          {/* Text Content - Left Aligned */}
          <div className="w-full md:w-1/2 pt-0 md:pt-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left max-w-xl"
            >
              <h1 className="text-5xl md:text-7xl font-normal tracking-tight text-black mb-8 leading-[1.1]">
                See what your dentist sees <br />
                <span className="font-normal italic text-primary">in minutes</span>.
              </h1>
              <p className="text-xl md:text-2xl text-stone-700 font-normal leading-relaxed mb-10">
                No medical degree required. Just snap a photo, and let our AI translate the confusing details into a clear plan you can actually understand.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <Button 
                  size="lg" 
                  className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg border-0 cursor-pointer"
                  onClick={() => document.getElementById('download-cta')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start Your Scan
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white/80 text-stone-700 hover:bg-white hover:text-primary border-stone-200 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 cursor-pointer"
                  onClick={() => window.location.href = '/#video-section'}
                >
                  Watch the Video
                </Button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
