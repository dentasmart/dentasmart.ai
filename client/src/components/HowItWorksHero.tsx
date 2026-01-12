import { motion } from "framer-motion";

export default function HowItWorksHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-b from-white via-accent/5 to-white">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left relative z-10"
          >
            <h1 className="text-5xl md:text-7xl font-normal tracking-tight text-foreground mb-8 leading-[1.1]">
              Know what's going on <br />
              <span className="font-normal italic text-primary">before</span> it hurts.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl font-normal leading-relaxed mb-8">
              Three simple steps to understand your mouth and take control of your oral health.
            </p>
          </motion.div>

          {/* Right Column: App Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[320px] md:max-w-[380px]">
              {/* Decorative Elements */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-3xl opacity-60 animate-pulse" />
              
              {/* Phone Container */}
              <div className="relative z-10 drop-shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                <img 
                  src="/images/Adam.png" 
                  alt="DentaSmart App Interface showing Health Score" 
                  className="w-full h-auto object-contain rounded-[2.5rem] border-[8px] border-white shadow-xl"
                />
                
                {/* Floating UI Card 1 - Step 1 */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="absolute -left-8 top-20 bg-white p-4 rounded-2xl shadow-lg border border-border/50 hidden md:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Step 1</p>
                      <p className="text-sm font-semibold text-foreground">Upload Photo</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating UI Card 2 - Step 2 */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute -right-8 bottom-32 bg-white p-4 rounded-2xl shadow-lg border border-border/50 hidden md:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Step 2</p>
                      <p className="text-sm font-semibold text-foreground">AI Analysis</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
