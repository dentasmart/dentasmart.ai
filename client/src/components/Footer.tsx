import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#E6F4F6] text-black py-20 border-t border-primary/10">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand & StoryBrand Overview - Spans 5 columns */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex flex-col items-start gap-4">
              <img 
                src="/images/logo.png" 
                alt="DentaSmart Logo" 
                className="h-12 w-auto " 
              />
              <p className="text-xl font-light tracking-wide text-black">
                Your Personal AI Oral Health Guide
              </p>
            </div>
            
            <div className="space-y-6 max-w-md">
              <p className="text-black font-light leading-relaxed">
                Most people feel anxious and confused about their dental health. 
                We provide an AI guide that analyzes your mouth instantly and explains everything in plain English, 
                so you can stop worrying and start making confident decisions about your care.
              </p>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-sm text-black font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>Understand your oral health</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-black font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>Avoid surprise costs</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-black font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>Feel confident at the dentist</span>
                </div>
              </div>
            </div>
          </div>

          {/* Spacer - Spans 1 column */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Navigation Links - Spans 6 columns */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8">
            
            {/* Product */}
            <div>
              <h4 className="font-medium text-black mb-6 tracking-wide">Product</h4>
              <ul className="space-y-4">
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
                  <a href="https://apps.apple.com/us/app/dentasmart/id6670311232" target="_blank" rel="noopener noreferrer" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Download App
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-medium text-black mb-6 tracking-wide">Company</h4>
              <ul className="space-y-4">
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
                  <a href="mailto:support@dentasmart.ai" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-medium text-black mb-6 tracking-wide">Legal</h4>
              <ul className="space-y-4">
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
                  <Link href="/faqs" className="text-black hover:text-primary transition-colors font-light text-sm">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-black text-sm font-light">
            © 2026 DentaSmart. All rights reserved.
          </p>
          
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
