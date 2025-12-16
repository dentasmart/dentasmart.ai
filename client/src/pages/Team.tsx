import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Team() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white via-secondary/30 to-white">
        <div className="container max-w-3xl text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
            The right team for the right problem
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Meet the passionate experts behind DentaSmart's mission to revolutionize oral healthcare through AI innovation. Our diverse team combines decades of experience in artificial intelligence, healthcare technology, and dental expertise.
          </p>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 text-center">
            Leadership Team
          </h2>
          <p className="text-lg text-foreground/60 text-center mb-12">
            Visionary leaders driving innovation in AI-powered dental care
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Qasim Mueen */}
            <div className="bg-secondary rounded-2xl p-8 border border-border hover:border-primary hover:shadow-lg transition-all">
              <div className="text-5xl mb-4">👨‍💼</div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">Qasim Mueen</h3>
              <p className="text-primary font-semibold mb-4">Founder & CEO</p>
              <p className="text-foreground/70 text-sm leading-relaxed mb-6">
                Co-Founder & CEO of Zigron (Multi-million-dollar IT Services company) and FraudLens and DentaLens (Medical and Dental FWA Solutions). Former Partner at Abode Systems (Smart Home Security sold to NICE S.P.A. for $50M). Co-Founder of TransparentHands.org.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                💼 LinkedIn Profile
              </a>
            </div>

            {/* Kashif Mueen */}
            <div className="bg-secondary rounded-2xl p-8 border border-border hover:border-primary hover:shadow-lg transition-all">
              <div className="text-5xl mb-4">👨‍💻</div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">Kashif Mueen</h3>
              <p className="text-primary font-semibold mb-4">Co-founder & CTO</p>
              <p className="text-foreground/70 text-sm leading-relaxed mb-6">
                Co-founder & CTO of Zigron and FraudLens with 25+ years experience in enterprise architecture, cloud, AI & ML and analytics. Former Partner and Tech Lead at Abode Systems. Co-Founder of FraudLens, WhereverTV (IPTV) and TransparentHands.org.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                💼 LinkedIn Profile
              </a>
            </div>

            {/* Dr. Saba Ahmed */}
            <div className="bg-secondary rounded-2xl p-8 border border-border hover:border-primary hover:shadow-lg transition-all">
              <div className="text-5xl mb-4">👩‍⚕️</div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">Dr. Saba Ahmed</h3>
              <p className="text-primary font-semibold mb-4">Product Lead</p>
              <p className="text-foreground/70 text-sm leading-relaxed mb-6">
                Dental Surgeon and Product Lead at DentaSmart with over 10 years of clinical experience as a General Dental Practitioner, General Dentist, and Dental Surgeon. Expertise in merging patient care and technology, driving healthcare innovation through AI and strategic product management.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                💼 LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 text-center">
            Advisory Board
          </h2>
          <p className="text-lg text-foreground/60 text-center mb-12">
            Industry experts guiding our strategic vision and growth
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Tyrette Hamilton */}
            <div className="bg-white rounded-2xl p-8 border border-border hover:border-primary hover:shadow-lg transition-all">
              <div className="text-5xl mb-4">👨‍🏫</div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">Tyrette Hamilton</h3>
              <p className="text-primary font-semibold mb-4">Strategic Advisor</p>
              <p className="text-foreground/70 text-sm leading-relaxed mb-6">
                Former COO of P&R Dental Strategies with over 25 years of experience in dental, vision, and specialized insurance programs. Expertise in dental benefit design, commercial dental plan product development, Medicaid/Medicare management, and regulatory compliance in managed care systems.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                💼 LinkedIn Profile
              </a>
            </div>

            {/* Peter Fuentes */}
            <div className="bg-white rounded-2xl p-8 border border-border hover:border-primary hover:shadow-lg transition-all">
              <div className="text-5xl mb-4">👨‍⚕️</div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">Peter Fuentes, DMD</h3>
              <p className="text-primary font-semibold mb-4">Strategic Advisor</p>
              <p className="text-foreground/70 text-sm leading-relaxed mb-6">
                Current Chief Dental Officer of MetLife (20M insured lives). Former Chief Dental Officer of Liberty Dental (7M lives insured). 20+ years of dental market experience and industry leadership.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                💼 LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Our Team Matters */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Why our team matters
          </h2>
          <p className="text-lg text-foreground/70 text-center mb-12">
            The perfect combination of expertise to solve complex healthcare challenges
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🧠",
                title: "AI & Technology Expertise",
                desc: "Our technical leaders have built AI systems that analyze millions of dental images, bringing cutting-edge machine learning to everyday healthcare.",
              },
              {
                icon: "🏥",
                title: "Healthcare Experience",
                desc: "With practicing healthcare professionals on our team, we understand the real challenges patients and providers face in dental care delivery.",
              },
              {
                icon: "🚀",
                title: "Startup Agility",
                desc: "Our entrepreneurial team moves fast, iterates quickly, and stays focused on solving real problems for real people in the dental care ecosystem.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-secondary rounded-2xl p-8 border border-border hover:border-primary hover:shadow-lg transition-all text-center">
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-4">{item.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
            Our mission
          </h2>

          <div className="bg-white rounded-2xl p-8 border-l-4 border-primary">
            <p className="text-lg text-foreground/70 leading-relaxed mb-6">
              To revolutionize oral healthcare by empowering people with AI-driven insights that help them understand their teeth, make confident decisions, and build stronger relationships with their dental providers.
            </p>
            <p className="text-lg text-foreground/70 leading-relaxed">
              We believe everyone deserves clarity about their oral health. By combining cutting-edge AI technology with clinical expertise, we're making dental care more transparent, accessible, and preventive.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-secondary">
        <div className="container max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Join our mission
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
            Help us revolutionize oral healthcare. Download DentaSmart today and experience the difference.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg">
            Download the App
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
