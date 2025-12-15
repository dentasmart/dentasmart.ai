import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "For Employers", href: "/employers" },
    { label: "Teams", href: "/teams" },
    { label: "FAQs", href: "/faqs" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return location === "/";
    }
    return location.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo with Slogan */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center gap-1.5">
            {/* Tooth Icon */}
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
              🦷
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-lg font-bold text-primary">
                DentaSmart
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                Your AI Dental Companion
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-medium text-sm transition-colors ${
                isActive(item.href)
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-foreground hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-primary text-primary hover:bg-primary/5"
          >
            See Pricing
          </Button>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white font-semibold"
          >
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
        <div className="md:hidden border-t border-border bg-white">
          <div className="container py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium block py-2 transition-colors ${
                  isActive(item.href)
                    ? "text-primary border-l-2 border-primary pl-2"
                    : "text-foreground hover:text-primary"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/5"
              >
                See Pricing
              </Button>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                Download the App
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
