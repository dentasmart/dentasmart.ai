import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { HeroSection, CTASection } from "@/components/Sections";
import { Button } from "@/components/ui/button";

export default function Teams() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <HeroSection
        headline="Built by people who've shipped real AI."
        subheadline="We're here to make oral health simpler, calmer, and more affordable."
      >
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg h-96 flex items-center justify-center border border-primary/20">
          <div className="text-center">
            <div className="text-6xl mb-4">👥</div>
            <p className="text-foreground/60">Our Team</p>
          </div>
        </div>
      </HeroSection>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Our mission
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Help people prevent dental problems and avoid surprise costs—using simple tools that fit in their pocket.
          </p>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                name: "Alex Johnson",
                role: "Founder & CEO",
                bio: "Built and scaled healthcare AI products at leading health tech companies.",
                expertise: [
                  "AI + healthcare experience",
                  "Product strategy & execution",
                  "Mission-driven leadership",
                ],
              },
              {
                name: "Sarah Chen",
                role: "Chief Product Officer",
                bio: "Designed user experiences for millions of healthcare consumers.",
                expertise: [
                  "Product design & research",
                  "User experience optimization",
                  "Healthcare compliance",
                ],
              },
              {
                name: "Michael Rodriguez",
                role: "Chief Technology Officer",
                bio: "Led AI/ML infrastructure at scale for enterprise healthcare.",
                expertise: [
                  "AI + machine learning",
                  "Security & privacy",
                  "System architecture",
                ],
              },
              {
                name: "Dr. Emily Watson",
                role: "Chief Medical Officer",
                bio: "Board-certified dentist with 15+ years of clinical experience.",
                expertise: [
                  "Clinical validation",
                  "Dental expertise",
                  "Patient safety",
                ],
              },
            ].map((member, idx) => (
              <div
                key={idx}
                className="bg-secondary rounded-lg p-8 border border-border hover:border-primary transition-colors"
              >
                <div className="w-16 h-16 bg-primary rounded-full mb-6 flex items-center justify-center text-white font-display font-bold text-2xl">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-sm text-primary font-semibold mb-4">
                  {member.role}
                </p>
                <p className="text-foreground/80 mb-6 leading-relaxed">
                  {member.bio}
                </p>
                <ul className="space-y-2">
                  {member.expertise.map((item, eidx) => (
                    <li key={eidx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinical Advisors Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Guided by dental professionals.
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed">
            We collaborate with experienced dentists and specialists to ensure our language is clear, responsible, and helpful for patients.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-8">
            Want to work with us?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold">
              Contact Us
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              Request a Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
