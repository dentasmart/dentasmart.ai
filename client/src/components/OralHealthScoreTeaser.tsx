import { useState, useEffect, useRef } from "react";
import { ArrowRight, Camera, Shield, CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useLocation } from "wouter";

/**
 * OralHealthScoreTeaser: An interactive visual score preview widget.
 * Shows an animated ring/gauge that fills to a "mystery" score,
 * then prompts the user to get their real score via the app.
 *
 * This acts as a "bridge" between informational content and
 * transactional action (app download).
 *
 * Placement: End of articles, condition pages, guide pages.
 */
export default function OralHealthScoreTeaser() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [location] = useLocation();

  // Intersection observer to trigger animation when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setIsVisible(true);
          trackEvent("mid_content_cta_click", {
            source: location,
            label: "score_teaser_viewed",
          });
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [location]);

  // Animate the score ring when visible
  useEffect(() => {
    if (!isVisible) return;

    let frame = 0;
    const targetScore = 72; // Animate to a "mystery" score
    const duration = 60; // frames

    const interval = setInterval(() => {
      frame++;
      const progress = Math.min(frame / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(targetScore * eased));

      if (frame >= duration) {
        clearInterval(interval);
        // Show the prompt after a brief pause
        setTimeout(() => setShowPrompt(true), 600);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [isVisible]);

  const handleGetScore = () => {
    trackEvent("mid_content_cta_click", {
      source: location,
      label: "score_teaser_cta",
    });
    window.location.href = "/download";
  };

  // SVG ring calculations
  const size = 160;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = animatedScore / 100;
  const strokeDashoffset = circumference * (1 - progress);

  // Color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "#22c55e"; // green
    if (score >= 60) return "#eab308"; // yellow
    return "#ef4444"; // red
  };

  return (
    <div ref={containerRef} className="my-12">
      <div className="rounded-2xl bg-gradient-to-br from-stone-50 to-white border border-stone-200 overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Score Ring */}
            <div className="relative flex-shrink-0">
              <svg width={size} height={size} className="transform -rotate-90">
                {/* Background ring */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth={strokeWidth}
                />
                {/* Progress ring */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={getScoreColor(animatedScore)}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-100"
                />
              </svg>
              {/* Score text in center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {showPrompt ? (
                  <>
                    <span className="text-3xl font-bold text-stone-900">??</span>
                    <span className="text-xs text-stone-500 mt-0.5">Your Score</span>
                  </>
                ) : (
                  <>
                    <span className="text-3xl font-bold text-stone-900">{animatedScore}</span>
                    <span className="text-xs text-stone-500 mt-0.5">Sample</span>
                  </>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-semibold text-stone-900 mb-2">
                What is your oral health score?
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                The average American scores 68 out of 100. Most people do not know their score until something goes wrong. Find yours in under 2 minutes with a simple photo.
              </p>

              {/* Trust signals */}
              <div className="flex flex-wrap gap-3 mb-5">
                {[
                  { icon: Camera, text: "Just snap a photo" },
                  { icon: Shield, text: "Private and secure" },
                  { icon: CheckCircle2, text: "Results in 2 min" },
                ].map(({ icon: Icon, text }, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs text-stone-500">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleGetScore}
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.02] cursor-pointer shadow-md shadow-primary/15 inline-flex items-center gap-2"
              >
                Get My Real Score
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
