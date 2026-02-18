import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HowItWorksHero() {
  return (
    <section className="relative bg-gradient-to-br from-white via-accent/5 to-primary/5 overflow-hidden min-h-screen flex items-center pt-32 md:pt-0">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text Content - Left Aligned */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left max-w-xl lg:col-span-5"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-black mb-8 leading-[1.1]">
              From "I'm not sure" to <br />
              <span className="font-normal italic text-primary">"I've got a plan"</span> <br />
              in 4 steps.
            </h1>
            <p className="text-xl md:text-2xl text-stone-700 font-normal leading-relaxed mb-10">
              A quick scan gives you clarity, so you know what to do next.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <Button 
                size="lg" 
                className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg border-0 cursor-pointer"
                onClick={() => document.getElementById('download-cta')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get My Oral Health Score
              </Button>
            </div>
          </motion.div>

          {/* Right Column: iPhone Mockups */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="lg:col-span-7 flex justify-center items-end gap-4 md:gap-6 lg:gap-8 pb-8 lg:pb-0"
          >
            {/* iPhone Mockup - X-Ray Analysis */}
            <div className="relative flex-shrink-0 w-[180px] sm:w-[220px] md:w-[260px] lg:w-[280px]">
              <div className="relative rounded-[2.5rem] sm:rounded-[3rem] border-[6px] sm:border-[8px] border-stone-900 bg-stone-900 shadow-2xl overflow-hidden">
                {/* iPhone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] sm:w-[100px] h-[22px] sm:h-[28px] bg-stone-900 rounded-b-2xl z-20" />
                {/* Screen Content */}
                <div className="relative aspect-[9/19.5] overflow-hidden bg-white">
                  <img 
                    src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/lBzNqmERojJqlfJE.jpeg" 
                    alt="DentaSmart X-Ray Analysis - AI-powered dental X-ray findings with highlighted areas" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              {/* Label */}
              <div className="text-center mt-3 sm:mt-4">
                <span className="text-xs sm:text-sm font-medium text-stone-600 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">X-Ray Analysis</span>
              </div>
            </div>

            {/* iPhone Mockup - Initial Care */}
            <div className="relative flex-shrink-0 w-[180px] sm:w-[220px] md:w-[260px] lg:w-[280px] mt-12 sm:mt-16">
              <div className="relative rounded-[2.5rem] sm:rounded-[3rem] border-[6px] sm:border-[8px] border-stone-900 bg-stone-900 shadow-2xl overflow-hidden">
                {/* iPhone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] sm:w-[100px] h-[22px] sm:h-[28px] bg-stone-900 rounded-b-2xl z-20" />
                {/* Screen Content */}
                <div className="relative aspect-[9/19.5] overflow-hidden bg-white">
                  <img 
                    src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/XlgHEMbZpBAbEXnM.jpeg" 
                    alt="DentaSmart Initial Care Plan - Treatment recommendations with costs and timelines" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              {/* Label */}
              <div className="text-center mt-3 sm:mt-4">
                <span className="text-xs sm:text-sm font-medium text-stone-600 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">Initial Care Plan</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
