import { motion } from "framer-motion";

export default function HowItWorksHero() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-white">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/backgrounds/how-it-works-hero-composite.jpg" 
          alt="Man holding phone with DentaSmart App" 
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
      </div>

      <div className="container px-4 mx-auto max-w-7xl relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
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
    </section>
  );
}
