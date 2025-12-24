import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import userChallenges from '../data/userChallenges.json';

// Map challenge IDs to their image paths
const challengeImages: Record<number, string> = {
  1: '/images/challenges/prevention.jpg',
  2: '/images/challenges/second_opinion.jpg',
  3: '/images/challenges/affordability.jpg',
  4: '/images/challenges/ai_advantages.jpg',
  5: '/images/challenges/dental_anxiety.jpg',
  6: '/images/challenges/trust_clarity.jpg',
  7: '/images/challenges/care_consistency.jpg',
  8: '/images/challenges/emergency_avoidance.jpg',
  9: '/images/challenges/no_insurance.jpg',
  10: '/images/challenges/habit_building.jpg',
  11: '/images/challenges/empowerment.jpg',
  12: '/images/challenges/transparency.jpg',
  13: '/images/challenges/continuous_care.jpg',
  14: '/images/challenges/smart_savings.jpg',
  15: '/images/challenges/daily_tracking.jpg',
};

export function UserChallengesCarousel() {
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

  return (
    <section className="py-24 bg-stone-50 overflow-hidden">
      <div className="container px-4 mx-auto mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-stone-900 mb-4">
            Challenges we solve
          </h2>
          <p className="text-xl text-stone-600 max-w-2xl font-light">
            See how DentaSmart transforms common dental struggles into confident smiles.
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
        {userChallenges.map((challenge) => {
          const isExpanded = expandedId === challenge.id;
          
          return (
            <motion.div
              key={challenge.id}
              layout
              onClick={() => handleCardClick(challenge.id)}
              className={`relative flex-shrink-0 snap-center cursor-pointer overflow-hidden rounded-3xl transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isExpanded ? 'w-[85vw] md:w-[600px]' : 'w-[280px] md:w-[320px]'
              } h-[500px] group`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={challengeImages[challenge.id]} 
                  alt={challenge.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80 transition-opacity duration-500 ${
                  isExpanded ? 'opacity-90' : 'opacity-60 group-hover:opacity-70'
                }`} />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <motion.div layout="position" className="mb-auto pt-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium tracking-wider uppercase mb-4 border border-white/10">
                    {challenge.title}
                  </span>
                </motion.div>

                <motion.div layout="position" className="relative z-10">
                  <h3 className={`font-medium leading-tight mb-4 transition-all duration-500 ${
                    isExpanded ? 'text-3xl md:text-4xl' : 'text-2xl'
                  }`}>
                    {challenge.challenge}
                  </h3>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <p className="text-lg text-white/90 font-light leading-relaxed border-t border-white/20 pt-4 mt-4">
                          {challenge.solution}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Toggle Icon */}
                <div className={`absolute bottom-8 right-8 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10 transition-all duration-300 ${
                  isExpanded ? 'bg-white text-stone-900 rotate-180' : 'group-hover:bg-white/30'
                }`}>
                  {isExpanded ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
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
