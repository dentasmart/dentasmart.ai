import { Link } from "wouter";

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
                Your Personal AI Dental Companion
              </p>
            </div>
            
            <div className="space-y-6 max-w-md">
              <p className="text-black font-light leading-relaxed">
                Most people feel anxious and confused about their dental health. 
                We provide an AI companion that analyzes your mouth instantly and explains everything in plain English, 
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
                  <Link href="/privacy" className="text-black hover:text-primary transition-colors font-light text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-black hover:text-primary transition-colors font-light text-sm">
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
            <a href="#" className="text-black hover:text-primary transition-colors" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7a10.6 10.6 0 01-3 1" />
              </svg>
            </a>
            <a href="#" className="text-black hover:text-black transition-colors" aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
