import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Stethoscope, DollarSign, ShieldCheck, HeartPulse, BookOpen, Scale, HelpCircle, Activity, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, type Transition } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

// Mega-menu category structure - scalable for future hubs
const megaMenuCategories = [
  {
    title: "Understand Your Mouth",
    icon: Stethoscope,
    color: "text-rose-500",
    bgColor: "bg-rose-50",
    items: [
      { label: "Conditions Guide", href: "/oral-health-hub/conditions", description: "Common dental problems explained" },
      { label: "Symptoms Guide", href: "/oral-health-hub/symptoms", description: "What your symptoms mean" },
      { label: "Life Stages", href: "/life-stages", description: "Dental care by age group" },
      { label: "Symptom Checker", href: "/symptom-quiz", description: "Free AI dental assessment" },
    ],
  },
  {
    title: "Treatment & Cost",
    icon: DollarSign,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    items: [
      { label: "Treatment Guides", href: "/treatments", description: "What to expect from procedures" },
      { label: "Dental Costs", href: "/dental-costs", description: "Know what procedures really cost" },
      { label: "Comparison Guides", href: "/comparisons", description: "Side-by-side decision guides" },
    ],
  },
  {
    title: "Stay Healthy",
    icon: ShieldCheck,
    color: "text-sky-500",
    bgColor: "bg-sky-50",
    items: [
      { label: "Prevention Hub", href: "/oral-health-hub/prevention", description: "Protect your teeth daily" },
      { label: "Lifestyle & Oral Health", href: "/lifestyle", description: "How daily habits affect your teeth" },
      { label: "Dental Guides", href: "/guides", description: "Step-by-step oral health guides" },
      { label: "Blog", href: "/oral-health-hub", description: "Expert dental health articles" },
    ],
  },
  {
    title: "Get Help",
    icon: HeartPulse,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    items: [
      { label: "Dental Emergencies", href: "/dental-emergencies", description: "What to do right now" },
      { label: "Affordability Guide", href: "/oral-health-hub/affordability", description: "Save on dental care costs" },
      { label: "Second Opinion Hub", href: "/oral-health-hub/second-opinion", description: "Verify treatment recommendations" },
      { label: "FAQs", href: "/faqs", description: "Common questions answered" },
    ],
  },
];

// Flatten all resource items for active state checking
const allResourceItems = megaMenuCategories.flatMap(cat => cat.items);
const DESKTOP_LEARN_MENU_ID = "desktop-learn-menu";
const MOBILE_NAV_MENU_ID = "mobile-navigation-menu";
const MOBILE_LEARN_MENU_ID = "mobile-learn-menu";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileLearnOpen, setMobileLearnOpen] = useState(false);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState<string | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const megaMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const desktopLearnButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [location] = useLocation();

  const navTransition: Transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: [0.16, 1, 0.3, 1] };
  const disclosureTransition: Transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.2, ease: "easeOut" };
  const mobileMenuTransition: Transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.5, ease: [0.22, 1, 0.36, 1] };
  const mobileItemTransition: Transition = shouldReduceMotion ? { duration: 0 } : { duration: 0.4 };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowStickyCta(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setMegaMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setMegaMenuOpen(false);
    setMobileLearnOpen(false);
    setMobileExpandedCategory(null);
  }, [location]);

  useEffect(() => {
    if (!megaMenuOpen && !isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (megaMenuOpen) {
        event.preventDefault();
        setMegaMenuOpen(false);
        desktopLearnButtonRef.current?.focus();
        return;
      }

      event.preventDefault();
      setIsOpen(false);
      setMobileLearnOpen(false);
      setMobileExpandedCategory(null);
      mobileMenuButtonRef.current?.focus();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, megaMenuOpen]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Employers", href: "/employers" },
    { label: "Team", href: "/team" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  const isLearnActive = allResourceItems.some(item => isActive(item.href));

  const handleMegaMenuEnter = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
      megaMenuTimeoutRef.current = null;
    }
    setMegaMenuOpen(true);
  };

  const handleMegaMenuLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 200);
  };

  return (
    <>
      <motion.nav
        initial={shouldReduceMotion ? undefined : { y: -100 }}
        animate={{ y: 0 }}
        transition={navTransition}
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
              Your Personal AI Dentist in Your Pocket
            </p>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[15px] font-medium tracking-wide transition-all duration-300 relative group ${
                  isActive(item.href)
                    ? "text-teal-900"
                    : (scrolled ? "text-teal-600 hover:text-teal-800" : "text-teal-700 hover:text-teal-900")
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-full h-px bg-teal-900 origin-left transition-transform duration-300 ${
                  isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                }`} />
              </Link>
            ))}

            {/* Learn Mega-Menu Trigger */}
            <div
              ref={megaMenuRef}
              className="relative"
              onMouseEnter={handleMegaMenuEnter}
              onMouseLeave={handleMegaMenuLeave}
            >
              <button
                ref={desktopLearnButtonRef}
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                aria-expanded={megaMenuOpen}
                aria-controls={DESKTOP_LEARN_MENU_ID}
                className={`flex items-center gap-1 text-[15px] font-medium tracking-wide transition-all duration-300 relative group cursor-pointer ${
                  isLearnActive
                    ? "text-teal-900"
                    : (scrolled ? "text-teal-600 hover:text-teal-800" : "text-teal-700 hover:text-teal-900")
                }`}
              >
                Learn
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaMenuOpen ? "rotate-180" : ""}`} />
                <span className={`absolute -bottom-1 left-0 w-full h-px bg-teal-900 origin-left transition-transform duration-300 ${
                  isLearnActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                }`} />
              </button>

              {/* Mega Menu Panel */}
              <AnimatePresence>
                {megaMenuOpen && (
                  <motion.div
                    id={DESKTOP_LEARN_MENU_ID}
                    initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
                    transition={disclosureTransition}
                    className="absolute top-full mt-3 right-0 w-[680px] bg-white rounded-2xl shadow-2xl border border-stone-200/60 overflow-hidden z-50"
                  >
                    {/* Header */}
                    <div className="px-6 pt-5 pb-3 border-b border-stone-100">
                      <h3 className="text-sm font-semibold text-stone-400 uppercase tracking-wider">Oral Health Resources</h3>
                    </div>

                    {/* Categories Grid */}
                    <div className="grid grid-cols-2 gap-0 p-4">
                      {megaMenuCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <div key={category.title} className="p-3">
                            {/* Category Header */}
                            <div className="flex items-center gap-2.5 mb-3">
                              <div className={`w-8 h-8 rounded-lg ${category.bgColor} flex items-center justify-center`}>
                                <Icon className={`w-4 h-4 ${category.color}`} />
                              </div>
                              <span className="text-sm font-semibold text-stone-800">{category.title}</span>
                            </div>

                            {/* Category Items */}
                            <div className="space-y-0.5 ml-[42px]">
                              {category.items.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => setMegaMenuOpen(false)}
                                  className={`block px-3 py-2 rounded-lg transition-all duration-150 group/item ${
                                    isActive(item.href)
                                      ? "bg-primary/8"
                                      : "hover:bg-stone-50"
                                  }`}
                                >
                                  <div className={`text-sm font-medium transition-colors ${
                                    isActive(item.href) ? "text-primary" : "text-stone-700 group-hover/item:text-stone-900"
                                  }`}>
                                    {item.label}
                                  </div>
                                  <div className="text-xs text-stone-400 mt-0.5 leading-snug">{item.description}</div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Footer CTA */}
                    <div className="px-6 py-4 bg-gradient-to-r from-primary/5 to-teal-50 border-t border-stone-100 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-stone-700">Not sure where to start?</p>
                        <p className="text-xs text-stone-500">Try our free AI symptom checker</p>
                      </div>
                      <Link href="/symptom-quiz" onClick={() => setMegaMenuOpen(false)}>
                        <Button
                          size="sm"
                          className="bg-action hover:bg-action-hover text-action-foreground rounded-full px-5 text-xs font-medium cursor-pointer"
                        >
                          Check Symptoms
                          <ChevronRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              size="sm"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5 rounded-full px-6 py-5 text-sm font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              onClick={() => {
                window.location.href = 'https://subscription.dentasmart.ai/login';
              }}
            >
              Login
            </Button>
            <Button
              size="sm"
              className="bg-action hover:bg-action-hover text-action-foreground rounded-full px-6 py-5 text-sm font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
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
            ref={mobileMenuButtonRef}
            className={`lg:hidden p-2 z-50 relative transition-colors duration-300 ${scrolled || isOpen ? "text-teal-900" : "text-teal-900"}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls={MOBILE_NAV_MENU_ID}
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
            id={MOBILE_NAV_MENU_ID}
            initial={shouldReduceMotion ? undefined : { opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={mobileMenuTransition}
            className="fixed inset-0 z-40 bg-background flex flex-col pt-24 px-6 pb-8 lg:hidden"
          >
            <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={shouldReduceMotion ? undefined : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={shouldReduceMotion ? mobileItemTransition : { delay: 0.1 + idx * 0.05, ...mobileItemTransition }}
                >
                  <Link
                    href={item.href}
                    className={`text-2xl font-light tracking-tight block py-2 ${
                      isActive(item.href) ? "text-primary font-medium" : "text-muted-foreground"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Learn Section - Grouped Accordion */}
              <motion.div
                initial={shouldReduceMotion ? undefined : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={shouldReduceMotion ? mobileItemTransition : { delay: 0.1 + navItems.length * 0.05, ...mobileItemTransition }}
                className="border-t border-stone-200 pt-3 mt-1"
              >
                <button
                  onClick={() => setMobileLearnOpen(!mobileLearnOpen)}
                  aria-expanded={mobileLearnOpen}
                  aria-controls={MOBILE_LEARN_MENU_ID}
                  className={`text-2xl font-light tracking-tight py-2 flex items-center gap-2 w-full text-left cursor-pointer ${
                    isLearnActive ? "text-primary font-medium" : "text-muted-foreground"
                  }`}
                >
                  Learn
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileLearnOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {mobileLearnOpen && (
                    <motion.div
                      id={MOBILE_LEARN_MENU_ID}
                      initial={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-2 space-y-1 pb-2">
                        {megaMenuCategories.map((category) => {
                          const Icon = category.icon;
                          const isCategoryOpen = mobileExpandedCategory === category.title;
                          const hasCategoryActive = category.items.some(item => isActive(item.href));

                          return (
                            <div key={category.title}>
                              <button
                                onClick={() => setMobileExpandedCategory(isCategoryOpen ? null : category.title)}
                                aria-expanded={isCategoryOpen}
                                aria-controls={`mobile-learn-category-${category.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                                className={`flex items-center gap-3 w-full text-left py-2.5 px-3 rounded-xl transition-colors cursor-pointer ${
                                  isCategoryOpen || hasCategoryActive ? "bg-stone-50" : ""
                                }`}
                              >
                                <div className={`w-7 h-7 rounded-lg ${category.bgColor} flex items-center justify-center flex-shrink-0`}>
                                  <Icon className={`w-3.5 h-3.5 ${category.color}`} />
                                </div>
                                <span className={`text-base font-medium flex-1 ${
                                  hasCategoryActive ? "text-primary" : "text-stone-700"
                                }`}>
                                  {category.title}
                                </span>
                                <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${
                                  isCategoryOpen ? "rotate-180" : ""
                                }`} />
                              </button>

                              <AnimatePresence>
                                {isCategoryOpen && (
                                  <motion.div
                                    id={`mobile-learn-category-${category.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                                    initial={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                                    transition={disclosureTransition}
                                    className="overflow-hidden"
                                  >
                                    <div className="pl-12 space-y-0.5 pb-2">
                                      {category.items.map((item) => (
                                        <Link
                                          key={item.href}
                                          href={item.href}
                                          className={`block py-2 text-base font-light ${
                                            isActive(item.href) ? "text-primary font-medium" : "text-stone-600"
                                          }`}
                                          onClick={() => {
                                            setIsOpen(false);
                                            setMobileLearnOpen(false);
                                            setMobileExpandedCategory(null);
                                          }}
                                        >
                                          {item.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            <motion.div
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? mobileItemTransition : { delay: 0.5, ...mobileItemTransition }}
              className="mt-auto pt-6 border-t border-stone-200 space-y-3"
            >
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/5 rounded-full py-6 text-lg font-medium cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                  window.location.href = 'https://subscription.dentasmart.ai/login';
                }}
              >
                Login
              </Button>
              <Button
                className="w-full bg-action text-action-foreground rounded-full py-6 text-lg font-medium hover:bg-action-hover cursor-pointer"
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
                Download App
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
