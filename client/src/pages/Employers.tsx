import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { UserChallengesCarousel } from "@/components/UserChallengesCarousel";
import { TrendingDown, Users, ShieldCheck, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function Employers() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-stone-200">
      <Navigation />

      {/* Hero Section - Professional & Modern */}
      <section className="relative py-40 md:py-52 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/backgrounds/employers-office.jpg" 
            alt="Corporate Wellness" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-[1px]" />
        </div>

        <div className="container relative z-10 px-4 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-8 leading-[1.1] drop-shadow-lg">
              A dental benefit employees <br />
              <span className="font-normal italic">actually use</span>.
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 font-light leading-relaxed drop-shadow-md">
              Give your team a Personal AI Dental Companion that prevents problems, reduces anxiety, and costs 75% less than traditional insurance.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-stone-900 hover:bg-stone-100 rounded-full px-10 py-8 text-xl font-medium transition-all duration-300 hover:scale-105 shadow-xl border-0">
                Schedule a Demo
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 rounded-full px-10 py-8 text-xl font-medium transition-all duration-300">
                Calculate Savings
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Problem - Minimalist Grid */}
      <section className="py-32 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-6">
              Traditional benefits are broken
            </h2>
            <p className="text-xl text-stone-600 font-light max-w-2xl mx-auto">
              Expensive premiums, low utilization, and reactive care don't solve the real problem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: TrendingDown, 
                title: "High Cost, Low Value", 
                desc: "~$1,200/year per employee with less than 50% utilization rates." 
              },
              { 
                icon: Users, 
                title: "Low Satisfaction", 
                desc: "Dental benefits consistently rank last in employee satisfaction surveys." 
              },
              { 
                icon: ShieldCheck, 
                title: "Reactive Care", 
                desc: "Employees wait for pain, leading to expensive emergency procedures and lost productivity." 
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-stone-900 transition-colors duration-500">
                  <item.icon className="w-8 h-8 text-stone-900 group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-medium text-stone-900 mb-4">{item.title}</h3>
                <p className="text-stone-600 font-light leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* User Challenges Carousel */}
      <section className="py-20 bg-stone-100">
        <UserChallengesCarousel />
      </section>

      {/* Comparison Table - Clean & Modern */}
      <section className="py-32 bg-stone-50">
        <div className="container px-4 mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-6">
              Compare the value
            </h2>
            <p className="text-xl text-stone-600 font-light max-w-3xl mx-auto">
              See how DentaSmart Complete stacks up against traditional carriers.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-stone-100">
                    <th className="text-left py-8 px-8 w-1/3">
                      <span className="text-lg font-medium text-stone-900">Feature</span>
                    </th>
                    <th className="text-center py-8 px-8 w-1/3 bg-stone-50/50">
                      <div className="text-lg font-medium text-stone-500 mb-1">Traditional Insurance</div>
                      <div className="text-sm text-stone-400 font-light">(Cigna, Aetna, Humana)</div>
                    </th>
                    <th className="text-center py-8 px-8 w-1/3 bg-stone-900 text-white relative">
                      <div className="text-lg font-medium mb-1">DentaSmart Complete</div>
                      <div className="text-sm text-white/70 font-light">All-in-one Solution</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {[
                    { feature: "Annual Cost (Family)", trad: "$1,000 - $1,500+", denta: "$300", highlight: true },
                    { feature: "Preventive Care", trad: "100% covered (usually)", denta: "Included (AI Monitoring)" },
                    { feature: "Major Procedures", trad: "50% coverage (waiting period)", denta: "20-60% savings immediately" },
                    { feature: "Cosmetic Procedures", trad: "Not covered", denta: "Included in savings" },
                    { feature: "Annual Caps", trad: "$1,000 - $1,500 limit", denta: "No annual caps" },
                    { feature: "Waiting Periods", trad: "6-12 months", denta: "No waiting periods" },
                    { feature: "Deductibles", trad: "$50 - $100 per person", denta: "No deductibles" },
                    { feature: "Payment Flexibility", trad: "Not available", denta: "Buy Now, Pay Later included" },
                  ].map((row, idx) => (
                    <tr key={idx} className="group hover:bg-stone-50/30 transition-colors">
                      <td className="py-6 px-8 font-medium text-stone-700">{row.feature}</td>
                      <td className="py-6 px-8 text-center text-stone-500 font-light bg-stone-50/30">{row.trad}</td>
                      <td className={`py-6 px-8 text-center font-medium ${row.highlight ? 'text-stone-900 bg-stone-100' : 'text-stone-900 bg-stone-50'}`}>
                        {row.denta}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-center text-sm text-stone-400 mt-8 font-light">
            *Comparison based on average PPO plans from major carriers. Actual costs vary by location.
          </p>
        </div>
      </section>

      {/* ROI - Big Numbers */}
      <section className="py-32 bg-white">
        <div className="container px-4 mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-24 text-center">
            The simplest math you'll do all year
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center p-12 rounded-3xl bg-stone-50 border border-stone-100"
            >
              <p className="text-stone-500 font-medium mb-4">Traditional Insurance</p>
              <div className="text-6xl md:text-7xl font-light text-stone-400 mb-2">~$1,200</div>
              <p className="text-stone-400 text-sm">per employee family/year</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center p-12 rounded-3xl bg-stone-900 text-white relative overflow-hidden shadow-xl transform md:scale-110"
            >
              <div className="absolute top-6 right-6 bg-white text-stone-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                75% Savings
              </div>
              <p className="text-white/70 font-medium mb-4">DentaSmart Complete</p>
              <div className="text-6xl md:text-7xl font-light text-white mb-2">~$300</div>
              <p className="text-white/50 text-sm">per employee family/year</p>
              <div className="mt-8 inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 border border-white/20">
                <span className="text-white font-medium">$25</span>
                <span className="text-white/70 text-sm ml-2">/ month</span>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "$900", label: "Annual Savings Per Employee" },
              { value: "4x", label: "Better Value Proposition" },
              { value: "0", label: "Administrative Headache" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="text-center p-8 rounded-2xl bg-stone-50"
              >
                <div className="text-5xl font-light text-stone-900 mb-2">{stat.value}</div>
                <div className="text-sm uppercase tracking-widest text-stone-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-40 flex items-center justify-center overflow-hidden bg-stone-900">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="/images/challenges/smart_savings.jpg" 
            alt="Smart Savings" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-light text-white mb-8 tracking-tight">
              Ready to upgrade your benefits?
            </h2>
            <p className="text-xl md:text-2xl text-white/80 font-light mb-12 max-w-2xl mx-auto">
              Join forward-thinking companies saving thousands while improving employee health.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-stone-900 hover:bg-stone-100 rounded-full px-10 py-8 text-xl font-medium transition-all duration-300 hover:scale-105 shadow-xl border-0"
              >
                Schedule a Demo
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 rounded-full px-10 py-8 text-xl font-medium transition-all duration-300"
              >
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
