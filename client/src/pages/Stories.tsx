import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Stories() {
  const stories = [
    {
      problem: "I was terrified of going to the dentist.",
      change: "DentaSmart explained everything before I went.",
      outcome: "I saved $500 and felt confident.",
      author: "Sarah J.",
      role: "DentaSmart User"
    },
    {
      problem: "I didn't understand my treatment plan.",
      change: "The AI broke down the jargon instantly.",
      outcome: "I avoided an unnecessary procedure.",
      author: "Michael T.",
      role: "DentaSmart User"
    },
    {
      problem: "I always worried about surprise bills.",
      change: "I knew the costs upfront.",
      outcome: "No more financial anxiety.",
      author: "Elena R.",
      role: "DentaSmart User"
    },
    {
      problem: "I thought I needed a root canal.",
      change: "DentaSmart suggested a second opinion.",
      outcome: "It was just a deep cavity, saved my tooth.",
      author: "David K.",
      role: "DentaSmart User"
    },
    {
      problem: "My insurance was confusing.",
      change: "The app clarified my benefits.",
      outcome: "I maximized my annual coverage.",
      author: "Jennifer L.",
      role: "DentaSmart User"
    },
    {
      problem: "I ignored my gum bleeding.",
      change: "The AI flagged it as early gum disease.",
      outcome: "Reversed it with better hygiene.",
      author: "Robert M.",
      role: "DentaSmart User"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black selection:bg-primary/20">
      <SEO 
        title="Real Stories, Real Savings - DentaSmart" 
        description="Read how DentaSmart has helped thousands of people save money and gain confidence in their dental care."
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-normal tracking-tight text-black mb-8"
          >
            Real Stories, <br />
            <span className="font-normal italic text-primary">Real Savings</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-2xl text-stone-700 font-light max-w-2xl mx-auto leading-relaxed"
          >
            See how DentaSmart is changing the way people experience dental care, one smile at a time.
          </motion.p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-24 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-stone-50 p-8 rounded-3xl hover:shadow-lg transition-shadow duration-300 border border-stone-100"
              >
                <div className="space-y-6">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-stone-500 font-medium mb-1">The Problem</div>
                    <p className="text-stone-900 font-medium">"{item.problem}"</p>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-primary font-medium mb-1">What Changed</div>
                    <p className="text-stone-700">"{item.change}"</p>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-green-600 font-medium mb-1">The Outcome</div>
                    <p className="text-stone-900 font-medium">"{item.outcome}"</p>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-stone-200 text-stone-500 text-sm flex justify-between items-center">
                  <span>— {item.author}</span>
                  <span className="text-xs bg-white px-2 py-1 rounded-full border border-stone-200">{item.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-normal mb-8">
            Ready to write your own success story?
          </h2>
          <p className="text-xl text-white/90 font-light mb-12 max-w-2xl mx-auto">
            Join thousands of users who are taking control of their dental health today.
          </p>
          <Link href="/#download-cta">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-10 py-8 text-lg font-medium shadow-xl border-0">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
