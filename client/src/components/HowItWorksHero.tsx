import { motion } from "framer-motion";

export default function HowItWorksHero() {
  return (
    <section className="relative bg-white overflow-hidden h-[80vh] md:h-[700px] pt-24 md:pt-0">
      {/* Mobile Layout: Full Background Image */}
      <div className="md:hidden absolute inset-0 z-0">
        <img 
          src="/images/backgrounds/hero-how-it-works-composite.jpg" 
          alt="Man holding phone with DentaSmart App" 
          className="w-full h-full object-cover object-[center_top]"
        />
        {/* Mobile Gradient: Top-down fade for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/50 to-transparent" />
      </div>

      {/* Desktop Layout: Split Screen (Image on Right) */}
      <div className="hidden md:block absolute top-24 bottom-0 right-0 w-1/2 z-0">
        <img 
          src="/images/backgrounds/hero-how-it-works-composite.jpg" 
          alt="Man holding phone with DentaSmart App" 
          className="w-full h-full object-cover object-[center_top]"
        />
        {/* Desktop Gradient: Left-to-right fade to blend image into white background */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent" />
      </div>

      <div className="container px-4 mx-auto max-w-7xl relative z-10 h-full">
        <div className="flex flex-col justify-center h-full">
          
          {/* Text Content - Left Aligned */}
          <div className="w-full md:w-1/2 pt-20 md:pt-0">
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
              <p className="text-xl md:text-2xl text-stone-700 font-normal leading-relaxed mb-8">
                No medical degree required. Just snap a photo, and let our AI translate the confusing details into a clear plan you can actually understand.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
