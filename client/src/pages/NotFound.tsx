import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { DownloadCTA } from "@/components/DownloadCTA";
import { Home, Search, BookOpen, Stethoscope, HelpCircle, ArrowRight } from "lucide-react";

const popularLinks = [
  { href: "/conditions/", label: "Dental Conditions", icon: Stethoscope, desc: "Toothaches, cavities, gum disease, and more" },
  { href: "/symptoms/", label: "Symptom Checker", icon: Search, desc: "Find out what your symptoms mean" },
  { href: "/guides/", label: "Oral Health Guides", icon: BookOpen, desc: "Brushing, flossing, and prevention tips" },
  { href: "/faqs/", label: "FAQs", icon: HelpCircle, desc: "Common questions answered" },
  { href: "/oral-health-hub/", label: "Oral Health Hub", icon: BookOpen, desc: "Articles and resources for better dental health" },
  { href: "/instant-scan/", label: "Instant Scan", icon: Search, desc: "Upload a photo for AI analysis" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black selection:bg-primary/20">
      <SEO
        title="Page Not Found | DentaSmart"
        description="The page you are looking for could not be found. Explore our dental health resources, condition guides, and symptom checker instead."
        noindex={true}
      />
      <Navigation />

      <section className="flex-1 pt-40 pb-16 bg-stone-50">
        <div className="container max-w-4xl mx-auto px-4">
          {/* 404 Header */}
          <div className="text-center mb-12">
            <div className="text-8xl font-bold text-primary/20 mb-4 select-none">
              404
            </div>
            <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-black mb-4 leading-tight text-left md:text-center">
              This page doesn't exist
            </h1>
            <p className="text-xl text-stone-600 font-light max-w-xl mx-auto leading-relaxed">
              The page may have been moved or removed. Here are some helpful places to explore instead.
            </p>
          </div>

          {/* Popular Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {popularLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-stone-200 hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <link.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-stone-900 group-hover:text-primary transition-colors flex items-center gap-1">
                      {link.label}
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm text-stone-500 mt-0.5">{link.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Back to Home */}
          <div className="text-center">
            <Link href="/">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-base font-medium cursor-pointer">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <DownloadCTA />
      <Footer />
    </div>
  );
}
