import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();

  // Handle scroll effect for transparent-to-solid transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowStickyCta(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close resources dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const resourceItems = [
    { label: "Blogs", href: "/oral-health-hub", description: "Expert dental health articles" },
    { label: "Affordability Guide", href: "/oral-health-hub/affordability", description: "Save on dental care costs" },
    { label: "Second Opinion Hub", href: "/oral-health-hub/second-opinion", description: "Verify treatment recommendations" },
    { label: "Prevention Hub", href: "/oral-health-hub/prevention", description: "Protect your teeth daily" },
    { label: "Symptom Checker", href: "/symptom-quiz", description: "Free AI dental assessment" },
    { label: "Dental Guides", href: "/guides", description: "Step-by-step oral health guides" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  const isResourcesActive = resourceItems.some(item => isActive(item.href));

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || isOpen
            ? "bg-white/95 backdrop-blur-xl border-b border-stone-200/50 py-2 shadow-sm"
            : "bg-white/80 backdrop-blur-lg py-4 border-b border-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-center gap-1 group z-50 relative">
            <img
              src="/images/logo.png"
              alt="DentaSmart Logo"
              className="h-8 md:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <p className={`text-[10px] md:text-xs font-medium tracking-wide transition-colors duration-300 ${
              scrolled || isOpen ? "text-teal-700" : "text-teal-800"
            }`}>
              Your AI Oral Health Guide
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

            {/* Resources Dropdown */}
            <div ref={resourcesRef} className="relative">
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className={`flex items-center gap-1 text-base font-medium tracking-wide transition-all duration-300 relative group cursor-pointer ${
                  isResourcesActive
                    ? "text-teal-900"
                    : (scrolled ? "text-teal-600 hover:text-teal-800" : "text-teal-700 hover:text-teal-900")
                }`}
              >
                Resources
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`} />
                <span className={`absolute -bottom-1 left-0 w-full h-px bg-stone-900 origin-left transition-transform duration-300 ${
                  isResourcesActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                }`} />
              </button>

              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-3 right-0 w-72 bg-white rounded-xl shadow-xl border border-stone-200/60 overflow-hidden z-50"
                  >
                    <div className="py-2">
                      {resourceItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setResourcesOpen(false)}
                          className={`block px-4 py-2.5 hover:bg-primary/5 transition-colors ${
                            isActive(item.href) ? "bg-primary/5" : ""
                          }`}
                        >
                          <div className="text-sm font-medium text-black">{item.label}</div>
                          <div className="text-xs text-stone-500 mt-0.5">{item.description}</div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-5 text-sm font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              onClick={() => {
                if (location === '/') {
                  const element = document.getElementById('download-cta');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                } else {
                  window.location.href = '/#download-cta';
                }
              }}
            >
              Download App
            </Button>
          </div>

          {/* Sticky CTA - appears after scrolling */}
          <AnimatePresence>
            {showStickyCta && !isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="hidden lg:flex items-center gap-3 absolute right-4 top-full mt-2 bg-primary/95 backdrop-blur-sm text-white rounded-full px-5 py-2.5 shadow-lg"
              >
                <span className="text-sm font-medium">Get your free oral health score</span>
                <Button
                  size="sm"
                  className="bg-white text-primary hover:bg-white/90 rounded-full px-4 py-1.5 text-xs font-medium cursor-pointer h-auto"
                  onClick={() => {
                    trackEvent("sticky_cta_click", { page: location });
                    window.location.href = "/download";
                  }}
                >
                  Start Free
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

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
            <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
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

              {/* Mobile Resources Accordion */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + navItems.length * 0.05, duration: 0.4 }}
              >
                <button
                  onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                  className={`text-3xl font-light tracking-tight py-2 flex items-center gap-2 w-full text-left cursor-pointer ${
                    isResourcesActive ? "text-primary font-medium" : "text-muted-foreground"
                  }`}
                >
                  Resources
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileResourcesOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileResourcesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden pl-4"
                    >
                      {resourceItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block py-2 text-xl font-light ${
                            isActive(item.href) ? "text-primary" : "text-muted-foreground"
                          }`}
                          onClick={() => { setIsOpen(false); setMobileResourcesOpen(false); }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-auto pt-8 border-t border-stone-200"
            >
              <Button 
                className="w-full bg-primary text-white rounded-full py-6 text-lg font-medium hover:bg-primary/90 cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                  if (location === '/') {
                    const element = document.getElementById('download-cta');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  } else {
                    window.location.href = '/#download-cta';
                  }
                }}
              >
                Download the App
              </Button>
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
