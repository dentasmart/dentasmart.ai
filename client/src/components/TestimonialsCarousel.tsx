import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import testimonialsData from "@/data/testimonials.json";
import { Quote, Star } from "lucide-react";

export default function TestimonialsCarousel() {
  const [width, setWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controls = useAnimation();

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  // Duplicate data to create seamless loop effect
  const duplicatedTestimonials = [...testimonialsData, ...testimonialsData];

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="container px-4 mx-auto mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-normal text-black mb-6">
            Real Stories, <span className="text-primary italic">Real Savings</span>
          </h2>
          <p className="text-xl text-stone-700 max-w-2xl mx-auto font-light">
            Join thousands of people who have taken control of their oral health with DentaSmart.
          </p>
        </motion.div>
      </div>

      <div className="relative w-full">
        {/* Gradient Masks for smooth fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <motion.div
          ref={carouselRef}
          className="flex gap-6 px-4 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          whileTap={{ cursor: "grabbing" }}
          animate={{
            x: [0, -width / 2],
            transition: {
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 50, // Adjust speed here (higher = slower)
                ease: "linear",
              },
            },
          }}
          style={{ x }}
          onHoverStart={() => {
            // Optional: Pause on hover logic could go here if using manual controls
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.id}-${index}`}
              className="min-w-[300px] md:min-w-[400px] bg-white p-8 rounded-3xl shadow-sm border border-border/50 flex flex-col relative group hover:shadow-md transition-all duration-300"
            >
              <div className="absolute top-6 right-8 text-primary/10 group-hover:text-primary/20 transition-colors">
                <Quote size={48} fill="currentColor" />
              </div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-stone-700 text-lg leading-relaxed mb-6 flex-grow font-light italic">
                "{testimonial.quote}"
              </p>

              <div className="mt-auto border-t border-border/50 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-black">{testimonial.name}</h4>
                    <p className="text-sm text-stone-500">{testimonial.age} • {testimonial.role}</p>
                  </div>
                  <span className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                    {testimonial.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
