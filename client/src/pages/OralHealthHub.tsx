import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, BookOpen, ShieldCheck, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const articles = [
  // Dentist Problems
  {
    id: "unclear-diagnoses",
    title: "Why Don't Dentists Clearly Explain Diagnoses?",
    description: "Many patients are told they need a procedure, but they are not shown or explained why. Learn how to get clarity.",
    category: "Dentist Problems",
    icon: Stethoscope,
    readTime: "3 min read"
  },
  {
    id: "rushed-decisions",
    title: "Why Do Dentists Ask Patients to Decide So Fast?",
    description: "Appointments are short, and time pressure pushes decisions forward. Here's how to slow down and choose wisely.",
    category: "Dentist Problems",
    icon: Stethoscope,
    readTime: "3 min read"
  },
  {
    id: "questioning-recommendations",
    title: "Why Do Patients Question Dental Recommendations?",
    description: "Some patients quietly wonder if all procedures are truly necessary. Discover the truth about dental transparency.",
    category: "Dentist Problems",
    icon: Stethoscope,
    readTime: "3 min read"
  },
  {
    id: "surprise-costs",
    title: "Why Are Dental Costs a Surprise?",
    description: "Unexpected costs feel unfair and hard to challenge. Learn how to avoid cost shock before treatment begins.",
    category: "Dentist Problems",
    icon: Stethoscope,
    readTime: "3 min read"
  },
  {
    id: "monitoring-confusion",
    title: "What Does 'Let's Monitor It' Really Mean?",
    description: "Patients hear phrases like 'watch it' or 'monitor it' without context. Find out what this really means for your health.",
    category: "Dentist Problems",
    icon: Stethoscope,
    readTime: "3 min read"
  },
  {
    id: "insurance-influence",
    title: "Why Does Insurance Influence Dental Treatment?",
    description: "Care is often shaped by what insurance covers, not just what you need. Learn to separate health from coverage.",
    category: "Dentist Problems",
    icon: Stethoscope,
    readTime: "3 min read"
  },
  {
    id: "reactive-dentistry",
    title: "Why Isn't Dentistry More Preventive?",
    description: "Most dental care reacts to problems instead of preventing them. Discover a better way to stay ahead of issues.",
    category: "Dentist Problems",
    icon: Stethoscope,
    readTime: "3 min read"
  },
  {
    id: "second-opinion-difficulty",
    title: "Why Is Getting a Second Opinion So Hard?",
    description: "Second opinions feel awkward, slow, or expensive. See how to get clarity without the confrontation.",
    category: "Dentist Problems",
    icon: Stethoscope,
    readTime: "3 min read"
  },
  {
    id: "feeling-taken-advantage-of",
    title: "Why Do Patients Feel Taken Advantage Of?",
    description: "High costs and low clarity create fear. Learn how to regain control and confidence in your care.",
    category: "Dentist Problems",
    icon: Stethoscope,
    readTime: "3 min read"
  },
  {
    id: "loss-of-control",
    title: "Why Do Patients Feel Out of Control?",
    description: "Patients often feel like passengers in their care. It's time to become the informed driver of your dental health.",
    category: "Dentist Problems",
    icon: Stethoscope,
    readTime: "3 min read"
  },
  // Insurance Problems
  {
    id: "misleading-insurance",
    title: "Why Does Dental Insurance Feel Misleading?",
    description: "People think they are covered until they are not. Uncover the simple truth about dental coverage limits.",
    category: "Insurance Problems",
    icon: ShieldCheck,
    readTime: "3 min read"
  },
  {
    id: "annual-maximums",
    title: "Why Do Annual Maximums Run Out So Fast?",
    description: "Coverage caps are low and serious care quickly exceeds limits. Learn how to plan smarter.",
    category: "Insurance Problems",
    icon: ShieldCheck,
    readTime: "3 min read"
  },
  {
    id: "risky-waiting-periods",
    title: "Why Are Waiting Periods Risky?",
    description: "Patients must delay care while problems worsen. Don't let policy dates dictate your health.",
    category: "Insurance Problems",
    icon: ShieldCheck,
    readTime: "3 min read"
  },
  {
    id: "denied-claims",
    title: "Why Are Claims Denied After Treatment?",
    description: "Coverage is rejected after care is done, leaving you with the bill. Learn how to verify necessity upfront.",
    category: "Insurance Problems",
    icon: ShieldCheck,
    readTime: "3 min read"
  },
  {
    id: "treatment-timing",
    title: "Why Does Insurance Control Treatment Timing?",
    description: "Care is split or delayed based on rules, not health. Discover why health-based timelines matter more.",
    category: "Insurance Problems",
    icon: ShieldCheck,
    readTime: "3 min read"
  },
  {
    id: "confusing-policies",
    title: "Why Is Dental Insurance So Hard to Understand?",
    description: "Policies are confusing and full of jargon. We simplify the complex so you can make clear choices.",
    category: "Insurance Problems",
    icon: ShieldCheck,
    readTime: "3 min read"
  },
  {
    id: "not-medically-necessary",
    title: "What Does 'Not Medically Necessary' Mean?",
    description: "Needed care is labeled optional, making patients feel dismissed. Learn the difference between labels and risk.",
    category: "Insurance Problems",
    icon: ShieldCheck,
    readTime: "3 min read"
  },
  {
    id: "network-restrictions",
    title: "Why Do Network Rules Limit Choice?",
    description: "Patients choose dentists based on coverage, often sacrificing trust. See why clarity should come first.",
    category: "Insurance Problems",
    icon: ShieldCheck,
    readTime: "3 min read"
  },
  {
    id: "prevention-gaps",
    title: "Why Doesn't Insurance Prevent Problems?",
    description: "Insurance focuses on cleanings, not early issues. Learn why true prevention requires year-round insight.",
    category: "Insurance Problems",
    icon: ShieldCheck,
    readTime: "3 min read"
  },
  {
    id: "delayed-costs",
    title: "Why Are Costs Only Clear After Insurance Adjustments?",
    description: "True costs appear late, causing stress. Get financial confidence by understanding costs early.",
    category: "Insurance Problems",
    icon: ShieldCheck,
    readTime: "3 min read"
  }
];

export default function OralHealthHub() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Hero Section - Matching Home Page Style */}
      <section className="relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/backgrounds/home-hero-lady-smile.jpg" 
            alt="Woman with healthy smile" 
            className="w-full h-full object-cover object-center md:object-[80%_20%]"
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/40 md:via-white/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent md:hidden" />
        </div>

        <div className="container relative z-10 px-4 mx-auto max-w-7xl pt-20 md:pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-left max-w-3xl lg:col-span-8"
            >
              <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 px-4 py-1.5 text-sm rounded-full border-0 font-medium">
                Oral Health Hub
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-black mb-8 leading-[1.1]">
                Clear answers to your <br />
                <span className="font-normal italic text-primary">dental questions</span>.
              </h1>
              
              <p className="text-xl md:text-2xl text-stone-700 mb-10 font-normal leading-relaxed text-balance max-w-2xl">
                Stop guessing about your teeth. We break down the confusing world of dentistry and insurance into simple, honest guides you can actually understand.
              </p>
            </motion.div>

            {/* Right Column: Empty to let image show through */}
            <div className="hidden lg:block lg:col-span-4"></div>

          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-stone-50">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/hub/${article.id}`}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-stone-200 bg-white group cursor-pointer overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-4">
                        <Badge variant="secondary" className="bg-stone-100 text-stone-600 hover:bg-stone-200">
                          {article.category}
                        </Badge>
                        <span className="text-xs font-medium text-stone-400 flex items-center">
                          <BookOpen className="w-3 h-3 mr-1" />
                          {article.readTime}
                        </span>
                      </div>
                      <CardTitle className="text-xl font-bold text-stone-900 group-hover:text-primary transition-colors leading-tight">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-stone-600 line-clamp-3">
                        {article.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="pt-4 border-t border-stone-100 mt-auto">
                      <span className="text-sm font-medium text-primary flex items-center group-hover:translate-x-1 transition-transform">
                        Read Article <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-stone-900 mb-6">
            Stop wondering. Start knowing.
          </h2>
          <p className="text-xl text-stone-600 mb-10 max-w-2xl mx-auto">
            You shouldn't have to rely on confusing jargon or insurance codes to understand your health. DentaSmart gives you the clarity you deserve.
          </p>
          <Link href="/#download-cta">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 py-8 text-xl shadow-lg hover:shadow-xl transition-all">
              Get Clarity Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
