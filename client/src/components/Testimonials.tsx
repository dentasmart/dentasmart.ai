import { useState } from "react";

export default function Testimonials() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Marketing Manager",
      image: "👩‍💼",
      before: "Anxious about dental visits",
      after: "Walks in prepared and confident",
      quote:
        "I used to panic before every dentist appointment. DentaSmart gave me clarity about what was happening in my mouth. Now I actually understand my X-rays and can ask smart questions. It's changed everything.",
      videoThumbnail: "🎬",
      stats: { anxiety: "90% → 20%", understanding: "10% → 95%" },
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Small Business Owner",
      image: "👨‍💼",
      before: "Blindsided by surprise bills",
      after: "Knows costs upfront",
      quote:
        "I got hit with a $2,000 bill for a procedure I didn't expect. With DentaSmart, I caught a problem early and avoided the expensive emergency. It paid for itself in the first month.",
      videoThumbnail: "🎬",
      stats: { savings: "$2,000 saved", prevention: "1 emergency avoided" },
    },
    {
      id: 3,
      name: "Jennifer Martinez",
      role: "Busy Mom",
      image: "👩‍🦰",
      before: "Waiting for pain to act",
      after: "Catches problems early",
      quote:
        "I never had time to worry about my teeth. DentaSmart makes it so easy to monitor my family's oral health. I caught my son's cavity early and saved him from a root canal.",
      videoThumbnail: "🎬",
      stats: { timePerMonth: "5 min/month", familyMembers: "4 monitored" },
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Real people, real results
          </h2>
          <p className="text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            See how DentaSmart has transformed the way people understand and manage their oral health.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-secondary rounded-2xl overflow-hidden border border-border hover:border-primary hover:shadow-lg transition-all"
            >
              {/* Video Placeholder */}
              <button
                onClick={() => setSelectedVideo(testimonial.id)}
                className="relative w-full aspect-video bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center group cursor-pointer"
              >
                <div className="text-6xl group-hover:scale-110 transition-transform">
                  {testimonial.videoThumbnail}
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-2xl">▶</span>
                  </div>
                </div>
              </button>

              {/* Content */}
              <div className="p-6">
                {/* Profile */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl">{testimonial.image}</div>
                  <div>
                    <h3 className="font-display font-bold text-foreground">{testimonial.name}</h3>
                    <p className="text-sm text-foreground/60">{testimonial.role}</p>
                  </div>
                </div>

                {/* Before/After */}
                <div className="mb-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-lg">❌</span>
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold">Before</p>
                      <p className="text-foreground/70">{testimonial.before}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-lg">✓</span>
                    <div>
                      <p className="text-xs text-primary font-semibold">After</p>
                      <p className="text-foreground font-semibold">{testimonial.after}</p>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-foreground/70 italic mb-6 text-sm leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Stats */}
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  {Object.entries(testimonial.stats).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2">
                      <span className="text-xs text-foreground/60 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="font-display font-bold text-primary text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="aspect-video bg-black flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🎥</div>
                  <p className="text-white text-lg font-semibold">
                    Customer Story #{selectedVideo}
                  </p>
                  <p className="text-white/60 text-sm mt-2">
                    (Video placeholder - upload your customer testimonial videos here)
                  </p>
                </div>
              </div>
              <div className="p-6 bg-white">
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="w-full py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Trust Metrics */}
        <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
          <h3 className="text-2xl font-display font-bold text-foreground mb-8 text-center">
            Why people trust DentaSmart
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            {[
              { icon: "⭐", stat: "5.0/5", label: "App Store Rating" },
              { icon: "🏥", stat: "24/7", label: "Din Support" },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="text-4xl mb-2">{item.icon}</div>
                <p className="text-2xl font-display font-bold text-primary mb-1">{item.stat}</p>
                <p className="text-sm text-foreground/60">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
