import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  // Handle scroll effect for transparent-to-solid transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || isOpen
            ? "bg-white/90 backdrop-blur-md border-b border-stone-200/50 py-2"
            : "bg-white/30 backdrop-blur-md py-4"
        }`}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start gap-1 group z-50 relative">
            <img
              src="/images/logo.png"
              alt="DentaSmart Logo"
              className="h-8 md:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <p className={`text-[10px] md:text-xs font-medium tracking-wide transition-colors duration-300 ${
              scrolled || isOpen ? "text-teal-700" : "text-teal-800"
            }`}>
              Your Personal AI Dental Companion
            </p>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base font-medium tracking-wide transition-all duration-300 relative group ${
                  isActive(item.href)
                    ? (scrolled ? "text-teal-900" : "text-teal-900")
                    : (scrolled ? "text-teal-600 hover:text-teal-800" : "text-teal-700 hover:text-teal-900")
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-full h-px bg-stone-900 origin-left transition-transform duration-300 ${
                  isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50" + (scrolled ? " bg-teal-900" : " bg-teal-900")
                }`} />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://apps.apple.com/us/app/dentasmart/id6670311232"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-5 text-sm font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                Download App
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 z-50 relative transition-colors duration-300 ${scrolled || isOpen ? "text-teal-900" : "text-teal-900"}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
              <motion.span 
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
                className="w-6 h-0.5 bg-current block transition-transform"
              />
              <motion.span 
                animate={{ opacity: isOpen ? 0 : 1 }}
                className="w-6 h-0.5 bg-current block transition-opacity"
              />
              <motion.span 
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
                className="w-6 h-0.5 bg-current block transition-transform"
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-background flex flex-col pt-24 px-6 pb-8 lg:hidden"
          >
            <div className="flex flex-col gap-6 flex-1 overflow-y-auto">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    className={`text-3xl font-light tracking-tight block py-2 ${
                      isActive(item.href) ? "text-primary font-medium" : "text-muted-foreground"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-auto pt-8 border-t border-stone-200"
            >
              <a
                href="https://apps.apple.com/us/app/dentasmart/id6670311232"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button className="w-full bg-primary text-white rounded-full py-6 text-lg font-medium hover:bg-primary/90">
                  Download the App
                </Button>
              </a>
              <p className="text-center text-stone-400 text-sm mt-6 font-light">
                © 2025 DentaSmart. All rights reserved.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
