import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

// Benefits data
const benefits = [
  {
    id: 1,
    tag: "Oral Health Score",
    title: "Oral Health Score and Priorities",
    desc: "See a score and priorities for the areas assessed.",
    detail: "Review your 0–100 Oral Health Score, based only on areas DentaSmart could assess from submitted photos and supported X-rays. Use the findings and priorities to plan questions for your dentist.",
    image: "/manus-storage/dentasmart-app-oral-health-score_ef84a3c3.webp"
  },
  {
    id: 2,
    tag: "Photo & X-Ray Analysis",
    title: "Plain-English Explanation of Photos and X-Rays",
    desc: "Review supported images in plain language.",
    detail: "Upload mouth photos or supported dental X-rays for analysis of the areas shown. Get a plain-language report of findings and priorities, reviewed and approved by licensed dentists before delivery.",
    image: "/manus-storage/dentasmart-app-ai-report-sections_5245a13a.webp"
  },
  {
    id: 3,
    tag: "Treatment Plan Review",
    title: "Treatment Plan Review Before You Say Yes",
    desc: "Understand a proposed plan before you commit.",
    detail: "Upload a dentist-provided treatment plan and supporting records to review treatment considerations, priorities, possible timelines, and questions to discuss with your dentist. Licensed dentists review and approve the report before delivery.",
    image: "/manus-storage/dentasmart-app-treatment-plan-review_e384bde5.webp"
  },
  {
    id: 4,
    tag: "Personalized Guidance",
    title: "Personalized Guidance Based on Your History",
    desc: "Organize records and questions over time.",
    detail: "Complete Care is an annual plan for assessments, report and Oral Health Score tracking, dental history, and help from Dr. Din, DentaSmart's AI oral health companion. Review the current plan details before purchase.",
    image: "/images/optimized/ChlTSVZDNZEOfine-800.webp"
  },
  {
    id: 5,
    tag: "Track Changes",
    title: "Track Changes Over Time",
    desc: "Keep a record of selected information over time.",
    detail: "Compare scores, reports, findings, and dentist-visit records over time. Each assessment reflects the evidence available; changes in a score or report do not confirm a treatment outcome.",
    image: "/images/optimized/QmtzzNkXnZNbJvtj-800.webp"
  },
  {
    id: 6,
    tag: "AI Oral Health Guide",
    title: "Ask Dr. Din About Your Reports",
    desc: "Ask questions about reports, findings, and dental terms.",
    detail: "Dr. Din is DentaSmart's AI oral health companion. Ask about reports, findings, dental terms, treatment explanations, or your saved history. Dr. Din is AI, not a licensed dentist; the app does not replace an in-person dental examination.",
    image: "/manus-storage/dentasmart-app-dr-din_f1bac3a2.webp"
  }
];

export function BenefitsCarousel() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const targetScroll = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const handleCardClick = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedId(null);
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container px-4 mx-auto mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-4xl md:text-5xl font-normal text-black mb-6">
            What you get
          </h2>
          <p className="text-xl text-stone-700 font-light max-w-2xl">
            Everything you need to take control of your dental health.
          </p>
        </div>
        
        <div className="hidden md:flex gap-4">
          <button 
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-4 rounded-full border border-stone-200 transition-all duration-300 ${
              !canScrollLeft ? 'opacity-30 cursor-not-allowed' : 'hover:bg-stone-200 hover:border-stone-300'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-stone-800" />
          </button>
          <button 
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-4 rounded-full border border-stone-200 transition-all duration-300 ${
              !canScrollRight ? 'opacity-30 cursor-not-allowed' : 'hover:bg-stone-200 hover:border-stone-300'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-stone-800" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-6 px-4 md:px-8 pb-12 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {benefits.map((item) => {
          const isExpanded = expandedId === item.id;
          
          return (
            <motion.div
              key={item.id}
              layout
              onClick={() => handleCardClick(item.id)}
              className={`relative flex-shrink-0 snap-center cursor-pointer overflow-hidden rounded-3xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isExpanded ? 'w-[85vw] md:w-[600px]' : 'w-[280px] md:w-[320px]'
              } h-[500px] group`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <img loading="lazy" src={item.image} 
 alt={item.title}
 className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
 isExpanded ? 'blur-sm scale-105' : ''
 }`}
 
 />
                <div className={`absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80 transition-opacity duration-500 ${
                  isExpanded ? 'opacity-90 bg-black/40' : 'opacity-60 group-hover:opacity-70'
                }`} />
              </div>

              {/* Close Button (Top Right) */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={handleCloseClick}
                    className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/30 transition-colors text-white"
                    aria-label="Close card"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <motion.div layout="position" className="mb-auto pt-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium tracking-wider uppercase mb-4 border border-white/10">
                    {item.tag}
                  </span>
                </motion.div>

                <motion.div layout="position" className="relative z-10">
                  <h3 className={`font-medium leading-tight mb-4 transition-all duration-500 text-[#D0F0F5] ${
                    isExpanded ? 'text-3xl md:text-4xl drop-shadow-lg' : 'text-2xl'
                  }`}>
                    {item.title}
                  </h3>
                  
                  <AnimatePresence>
                    {isExpanded ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <p className="text-lg text-[#D0F0F5] font-normal leading-relaxed border-t border-white/30 pt-4 mt-4 drop-shadow-md">
                          {item.detail}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-white/90 font-light leading-relaxed"
                      >
                        {item.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Toggle Icon (Bottom Right) - Only show Plus when collapsed */}
                {!isExpanded && (
                  <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10 transition-all duration-300 group-hover:bg-white/30">
                    <Plus className="w-5 h-5" />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
        
        {/* Spacer for end of scroll */}
        <div className="w-4 flex-shrink-0" />
      </div>
    </section>
  );
}
