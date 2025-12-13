import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Teams() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white via-secondary/30 to-white">
        <div className="container max-w-3xl text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
            Meet the team behind DentaSmart
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            A passionate group of dentists, engineers, and healthcare innovators working to transform oral health.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-8 text-center">
            Our mission
          </h2>
          <p className="text-lg text-foreground/70 leading-relaxed mb-8">
            We believe everyone deserves access to clear, understandable information about their oral health. Too many people are confused, anxious, or blindsided by dental care. DentaSmart changes that by putting AI-powered insights directly in your hands.
          </p>
          <p className="text-lg text-foreground/70 leading-relaxed">
            We're not replacing dentists—we're empowering patients to be better partners with their dentists. When you understand your mouth, you make better decisions. When you make better decisions, you get better outcomes.
          </p>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Leadership team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Dr. Sarah Chen",
                role: "Founder & CEO",
                bio: "Former pediatric dentist with 15 years of clinical experience. MIT graduate in biomedical engineering.",
                icon: "👩‍⚕️",
              },
              {
                name: "Marcus Johnson",
                role: "Co-Founder & CTO",
                bio: "AI researcher from Stanford. Previously led ML at a major health tech company. Passionate about making healthcare accessible.",
                icon: "👨‍💻",
              },
              {
                name: "Dr. James Wilson",
                role: "Chief Medical Officer",
                bio: "Board-certified prosthodontist with 20+ years of practice. Advisor to multiple dental organizations.",
                icon: "👨‍⚕️",
              },
              {
                name: "Elena Rodriguez",
                role: "VP of Product",
                bio: "Product leader from healthcare and fintech. Focused on user-centered design and accessibility.",
                icon: "👩‍💼",
              },
            ].map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-border hover:border-primary hover:shadow-lg transition-all">
                <div className="text-6xl mb-4">{member.icon}</div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary font-semibold mb-4">{member.role}</p>
                <p className="text-foreground/70 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinical Advisors */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Clinical advisors
          </h2>
          <p className="text-lg text-foreground/70 text-center mb-12 max-w-3xl mx-auto leading-relaxed">
            Our AI is trained and validated by leading dental professionals to ensure accuracy and clinical relevance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Dr. Robert Thompson", title: "Prosthodontics", org: "Harvard School of Dental Medicine" },
              { name: "Dr. Lisa Park", title: "Periodontics", org: "University of California, San Francisco" },
              { name: "Dr. Michael O'Brien", title: "Oral Surgery", org: "New York Presbyterian Hospital" },
              { name: "Dr. Priya Patel", title: "Restorative Dentistry", org: "Boston University" },
              { name: "Dr. James Murphy", title: "Orthodontics", org: "University of Pennsylvania" },
              { name: "Dr. Emma Watson", title: "Dental Public Health", org: "Johns Hopkins University" },
            ].map((advisor, idx) => (
              <div key={idx} className="bg-secondary rounded-xl p-6 text-center border border-border hover:border-primary transition-colors">
                <div className="text-4xl mb-3">👨‍⚕️</div>
                <h3 className="font-display font-bold text-foreground mb-1">{advisor.name}</h3>
                <p className="text-primary text-sm font-semibold mb-2">{advisor.title}</p>
                <p className="text-foreground/70 text-sm">{advisor.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Our values
          </h2>
          <div className="space-y-8">
            {[
              { icon: "🎯", title: "Patient First", desc: "Every decision is guided by what's best for the patient, not what's easiest for us." },
              { icon: "🔬", title: "Science-Backed", desc: "Our AI is trained by dental experts and validated against clinical outcomes." },
              { icon: "🤝", title: "Transparency", desc: "We're honest about what our AI can and can't do. We complement, not replace, dentists." },
              { icon: "♿", title: "Accessibility", desc: "Dental health shouldn't be a luxury. We're committed to making DentaSmart affordable." },
            ].map((value, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-border">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{value.icon}</div>
                  <div>
                    <h3 className="font-display font-bold text-foreground mb-2">{value.title}</h3>
                    <p className="text-foreground/70">{value.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Join our team
          </h2>
          <p className="text-lg text-foreground/70 mb-12 leading-relaxed">
            We're hiring talented engineers, designers, dentists, and healthcare professionals who are passionate about transforming oral health.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg">
            View Open Positions
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Get in touch
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
            Have questions? Want to partner with us? We'd love to hear from you.
          </p>
          <div className="space-y-4">
            <p className="text-foreground">
              <span className="font-semibold">Email:</span> hello@dentasmart.ai
            </p>
            <p className="text-foreground">
              <span className="font-semibold">Phone:</span> (555) 123-4567
            </p>
            <p className="text-foreground">
              <span className="font-semibold">Address:</span> San Francisco, CA
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
