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
    { label: "Employers", href: "/employers" },
    { label: "Team", href: "/team" },
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
        {/* Logo with Official Image and Slogan */}
        <Link
          href="/"
          className="flex flex-col items-start gap-1 hover:opacity-80 transition-opacity"
        >
          <img
            src="/images/dentasmart-logo.png"
            alt="DentaSmart Logo"
            className="h-10 md:h-12 w-auto"
          />
          <p className="text-xs md:text-xs text-foreground/60 font-medium leading-tight">Your Personal AI Dental Companion</p>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              title={`Learn more about DentaSmart ${item.label}`}
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
          <a
            href="https://apps.apple.com/app/dentasmart/id6670000000"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white font-semibold"
            >
              Download the App
            </Button>
          </a>
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
              <a
                href="https://apps.apple.com/app/dentasmart/id6670000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                  Download the App
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
