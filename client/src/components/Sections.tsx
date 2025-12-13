import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  headline: string;
  subheadline?: string;
  primaryCTA?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryCTA?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  microproof?: string;
  children?: ReactNode;
  backgroundImage?: string;
}

export function HeroSection({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  microproof,
  children,
  backgroundImage,
}: HeroProps) {
  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }
          : { backgroundColor: "#FFF8F3" }
      }
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground leading-tight">
              {headline}
            </h1>
            {subheadline && (
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-lg">
                {subheadline}
              </p>
            )}
            {(primaryCTA || secondaryCTA) && (
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {primaryCTA && (
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white font-semibold"
                    onClick={primaryCTA.onClick}
                  >
                    {primaryCTA.label}
                  </Button>
                )}
                {secondaryCTA && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10"
                    onClick={secondaryCTA.onClick}
                  >
                    {secondaryCTA.label}
                  </Button>
                )}
              </div>
            )}
            {microproof && (
              <p className="text-sm text-muted-foreground pt-2">{microproof}</p>
            )}
          </div>

          {/* Right: Visual Content */}
          {children && <div className="hidden md:block">{children}</div>}
        </div>

        {/* Mobile visual content */}
        {children && <div className="md:hidden mt-12">{children}</div>}
      </div>
    </section>
  );
}

interface ProblemSectionProps {
  headline: string;
  body: string;
  bullets: string[];
}

export function ProblemSection({
  headline,
  body,
  bullets,
}: ProblemSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
          {headline}
        </h2>
        <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
          {body}
        </p>
        <ul className="space-y-4">
          {bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-4">
              <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
              <span className="text-foreground/80">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

interface EmpathySectionProps {
  headline: string;
  body: string;
}

export function EmpathySection({ headline, body }: EmpathySectionProps) {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
          {headline}
        </h2>
        <p className="text-lg text-foreground/80 leading-relaxed">{body}</p>
      </div>
    </section>
  );
}

interface BenefitCard {
  title: string;
  bullets: string[];
}

interface BenefitsSectionProps {
  headline: string;
  cards: BenefitCard[];
}

export function BenefitsSection({ headline, cards }: BenefitsSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
          {headline}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-secondary rounded-lg p-8 border border-border hover:border-primary transition-colors"
            >
              <h3 className="text-2xl font-display font-bold text-foreground mb-6">
                {card.title}
              </h3>
              <ul className="space-y-3">
                {card.bullets.map((bullet, bidx) => (
                  <li key={bidx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-foreground/80 text-sm">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface StepItem {
  number: number;
  title: string;
  description: string;
}

interface StepsSectionProps {
  headline: string;
  steps: StepItem[];
  cta?: {
    label: string;
    onClick?: () => void;
  };
}

export function StepsSection({ headline, steps, cta }: StepsSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-12 text-center">
          {headline}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-display font-bold mx-auto mb-6">
                {step.number}
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                {step.title}
              </h3>
              <p className="text-foreground/80 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        {cta && (
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-semibold"
              onClick={cta.onClick}
            >
              {cta.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

interface CTASectionProps {
  headline: string;
  body?: string;
  primaryCTA: {
    label: string;
    onClick?: () => void;
  };
}

export function CTASection({ headline, body, primaryCTA }: CTASectionProps) {
  return (
    <section className="py-16 md:py-24 bg-primary text-white">
      <div className="container max-w-3xl text-center">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
          {headline}
        </h2>
        {body && <p className="text-lg mb-8 opacity-90">{body}</p>}
        <Button
          size="lg"
          className="bg-white text-primary hover:bg-white/90 font-semibold"
          onClick={primaryCTA.onClick}
        >
          {primaryCTA.label}
        </Button>
      </div>
    </section>
  );
}
