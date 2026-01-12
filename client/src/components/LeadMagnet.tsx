import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // Here you would typically send the email to your backend
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 to-white border-y border-teal-100">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-teal-100 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full -translate-y-1/2 translate-x-1/3 opacity-50" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-50 rounded-full translate-y-1/3 -translate-x-1/4 opacity-50" />

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4 leading-tight">
                  What's your <br />
                  <span className="text-primary font-medium italic">Dental Health Score?</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  Take our free 2-minute assessment to uncover hidden risks and get a personalized prevention plan.
                </p>
                
                <ul className="space-y-3 mb-8">
                  {[
                    "Instant risk analysis",
                    "Personalized care tips",
                    "No credit card required"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-stone-600 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div className="bg-stone-50 p-8 rounded-3xl border border-stone-100 shadow-inner">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-center mb-6">
                    <p className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-2">Free Assessment</p>
                    <h3 className="text-xl font-medium text-foreground">Get your score now</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Input 
                        type="email" 
                        placeholder="Enter your email address" 
                        className="h-14 rounded-xl border-stone-200 bg-white text-lg px-4 focus-visible:ring-primary"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-white text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      Start Assessment
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  <p className="text-xs text-center text-stone-400 mt-4">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-medium text-foreground mb-2">Check your inbox!</h3>
                  <p className="text-muted-foreground">
                    We've sent a link to start your assessment to <strong>{email}</strong>.
                  </p>
                  <Button 
                    variant="ghost" 
                    className="mt-6 text-primary hover:text-primary/80 hover:bg-primary/5"
                    onClick={() => setSubmitted(false)}
                  >
                    Use a different email
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
