import { motion } from "framer-motion";

export default function HowItWorksHero() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Mobile Layout: Full Background */}
      <div className="md:hidden absolute inset-0 z-0">
        <img 
          src="/images/backgrounds/how-it-works-hero-final.png" 
          alt="Man holding phone with DentaSmart App" 
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/60 to-transparent" />
      </div>

      {/* Desktop Layout: Right-Aligned Image with Gradient Blend */}
      <div className="hidden md:block absolute inset-y-0 right-0 w-[55%] z-0">
        <img 
          src="/images/backgrounds/how-it-works-hero-final.png" 
          alt="Man holding phone with DentaSmart App" 
          className="w-full h-full object-cover object-[center_top]"
        />
        {/* Gradient Mask to Blend into White Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent w-1/2" />
      </div>

      <div className="container px-4 mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row items-center min-h-[80vh] md:min-h-[650px]">
          
          {/* Text Content - Left Side */}
          <div className="w-full md:w-1/2 pt-32 pb-12 md:py-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left max-w-xl"
            >
              <h1 className="text-5xl md:text-7xl font-normal tracking-tight text-foreground mb-8 leading-[1.1]">
                Know what's going on <br />
                <span className="font-normal italic text-primary">before</span> it hurts.
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-normal leading-relaxed mb-8">
                Three simple steps to understand your mouth and take control of your oral health.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
