import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "For Employers", href: "/employers" },
    { label: "Teams", href: "/teams" },
    { label: "FAQs", href: "/faqs" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 font-display text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
              D
            </div>
            <span className="hidden sm:inline">DentaSmart</span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a className="text-foreground hover:text-primary transition-colors font-medium">
                {item.label}
              </a>
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex gap-3">
          <Button variant="outline" size="sm">
            See Pricing
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Download the App
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-secondary">
          <div className="container py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className="text-foreground hover:text-primary transition-colors font-medium block py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button variant="outline" className="w-full">
                See Pricing
              </Button>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Download the App
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
