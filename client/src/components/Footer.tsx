import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { trackAppDownload, getAppStoreUrl } from "@/lib/analytics";

export default function Footer() {
  return (
    <footer className="bg-[#E6F4F6] text-black py-12 border-t border-primary/10">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-8">

          {/* Brand Block — left, spans 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex flex-col items-center gap-4 w-fit">
              <img loading="lazy" src="/images/logo.png"
                alt="DentaSmart Logo"
                className="h-12 w-auto"
              />
              <p className="text-xl font-light tracking-wide text-black">
                Your Personal AI Dentist in Your Pocket
              </p>
            </div>

            <div className="space-y-4 max-w-sm">
              <p className="text-black font-light leading-relaxed text-sm">
                Most people feel anxious and confused about their dental health.
                DentaSmart provides educational oral health tools and plain-language explanations,
                so you can organize questions and make more informed decisions with a dental professional.
              </p>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-sm text-black font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                  <span>Understand your oral health</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-black font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                  <span>Avoid surprise costs</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-black font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                  <span>Feel confident at the dentist</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation — right, spans 8 columns
              6 cols on xl (1280px+), 3 cols on md–lg (768–1279px), 2 cols on mobile */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-x-3 gap-y-8">

            {/* Column 1: Product */}
            <div>
              <p className="font-semibold text-black mb-5 tracking-wide text-base">Product</p>
              <ul className="space-y-3">
                <li>
                  <Link href="/how-it-works" className="text-black hover:text-primary transition-colors font-light text-sm">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Pricing
                  </Link>
                </li>
                <li>
                  <a href={getAppStoreUrl("footer")} target="_blank" rel="noopener noreferrer" className="text-black hover:text-primary transition-colors font-light text-sm" onClick={() => trackAppDownload("ios", "footer")}>
                    Download App
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Company */}
            <div>
              <p className="font-semibold text-black mb-5 tracking-wide text-base">Company</p>
              <ul className="space-y-3">
                <li>
                  <Link href="/team" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="/employers" className="text-black hover:text-primary transition-colors font-light text-sm">
                    For Employers
                  </Link>
                </li>
                <li>
                  <Link href="/oral-health-hub" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Blogs
                  </Link>
                </li>
                <li>
                  <a href="mailto:support@dentasmart.ai" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Dental Costs */}
            <div>
              <p className="font-semibold text-black mb-5 tracking-wide text-base">Dental Costs</p>
              <ul className="space-y-3">
                <li>
                  <Link href="/dental-costs" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Cost Guide Hub
                  </Link>
                </li>
                <li>
                  <Link href="/dental-costs/root-canal-cost" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Root Canal Cost
                  </Link>
                </li>
                <li>
                  <Link href="/dental-costs/dental-implant-cost" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Dental Implant Cost
                  </Link>
                </li>
                <li>
                  <Link href="/dental-costs/braces-cost" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Braces Cost
                  </Link>
                </li>
                <li>
                  <Link href="/dental-costs/dental-crown-cost" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Dental Crown Cost
                  </Link>
                </li>
                <li>
                  <Link href="/dental-costs/dentures-cost" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Dentures Cost
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Comparisons — xl:ml-4 adds visual separation from the Cost group */}
            <div className="xl:ml-4">
              <p className="font-semibold text-black mb-5 tracking-wide text-base">Comparisons</p>
              <ul className="space-y-3">
                <li>
                  <Link href="/compare/dentasmart-vs-chatgpt-dental" className="text-black hover:text-primary transition-colors font-light text-sm">
                    DentaSmart vs ChatGPT
                  </Link>
                </li>
                <li>
                  <Link href="/compare/dentasmart-vs-teledentistry" className="text-black hover:text-primary transition-colors font-light text-sm">
                    DentaSmart vs Teledentistry
                  </Link>
                </li>
                <li>
                  <Link href="/compare/dentasmart-vs-dental-insurance" className="text-black hover:text-primary transition-colors font-light text-sm">
                    DentaSmart vs Insurance
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5: Guides — xl:ml-4 matches Comparisons visual rhythm */}
            <div className="xl:ml-4">
              <p className="font-semibold text-black mb-5 tracking-wide text-base">Guides</p>
              <ul className="space-y-3">
                <li>
                  <Link href="/oral-health-hub/conditions" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Conditions Guide
                  </Link>
                </li>
                <li>
                  <Link href="/oral-health-hub/symptoms" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Symptoms Guide
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Oral Health Guides
                  </Link>
                </li>
                <li>
                  <Link href="/treatments" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Treatment Guides
                  </Link>
                </li>
                <li>
                  <Link href="/comparisons" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Comparison Guides
                  </Link>
                </li>
                <li>
                  <Link href="/life-stages" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Life Stages
                  </Link>
                </li>
                <li>
                  <Link href="/dental-emergencies" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Dental Emergencies
                  </Link>
                </li>
                <li>
                  <Link href="/lifestyle" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Lifestyle &amp; Oral Health
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 6: Help & Legal — xl:ml-4 matches Comparisons visual rhythm */}
            <div className="xl:ml-4">
              <p className="font-semibold text-black mb-5 tracking-wide text-base">Help &amp; Legal</p>
              <ul className="space-y-3">
                <li>
                  <Link href="/faqs" className="text-black hover:text-primary transition-colors font-light text-sm">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/answers" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Dental Answers
                  </Link>
                </li>
                <li>
                  <Link href="/photo-guide" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Photo Guide
                  </Link>
                </li>
                <li>
                  <Link href="/find-a-dentist" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Find a Dentist
                  </Link>
                </li>
                <li>
                  <Link href="/account-deletion" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Delete Account
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/editorial-policy" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Editorial Policy
                  </Link>
                </li>
                <li>
                  <Link href="/corrections-policy" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Corrections Policy
                  </Link>
                </li>
                <li>
                  <Link href="/ai-use-disclosure" className="text-black hover:text-primary transition-colors font-light text-sm">
                    AI Use Disclosure
                  </Link>
                </li>
                <li>
                  <Link href="/product-facts" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Product Facts
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-black text-sm font-light">
              © 2026 DentaSmart. All rights reserved.
            </p>
            <p className="text-black/60 text-xs font-light mt-1">
              DentaSmart provides educational guidance, not medical advice. Always consult a licensed dentist. Learn more at <a href="https://www.ada.org/resources/research/science-and-research-institute/oral-health-topics" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">ADA.org</a>.
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="https://www.linkedin.com/company/dentasmart-ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/dentasmart.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.youtube.com/@DentaSmartAi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-primary transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/people/DentaSmart-AI/61578704828365/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
