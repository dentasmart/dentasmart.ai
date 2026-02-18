import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, ExternalLink, BarChart3, Globe, FileText } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function AdminSeoSetup() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-black">
      <SEO title="SEO & Analytics Setup - Admin" description="Configure GA4 analytics and SEO settings for DentaSmart." />
      <Navigation />

      <div className="container px-4 mx-auto max-w-4xl pt-32 pb-16">
        <Link href="/admin">
          <span className="inline-flex items-center gap-2 text-primary hover:underline mb-6 cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            Back to Admin Dashboard
          </span>
        </Link>

        <h1 className="text-3xl font-medium text-black mb-2">SEO & Analytics Setup</h1>
        <p className="text-stone-600 mb-8">Configure tracking, meta defaults, and search engine settings.</p>

        <div className="space-y-6">
          {/* GA4 Setup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Google Analytics 4
              </CardTitle>
              <CardDescription>
                Connect your GA4 property to track page views, conversions, and user behavior.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="ga4-id">GA4 Measurement ID</Label>
                <Input
                  id="ga4-id"
                  placeholder="G-XXXXXXXXXX"
                  className="mt-1"
                />
                <p className="text-xs text-stone-500 mt-1">
                  Find this in Google Analytics → Admin → Data Streams → Web
                </p>
              </div>
              <div className="bg-stone-50 rounded-lg p-4 text-sm text-stone-600">
                <p className="font-medium text-black mb-2">Events being tracked automatically:</p>
                <ul className="space-y-1">
                  <li>• <code className="text-xs bg-stone-100 px-1 rounded">page_view</code> — Every page navigation</li>
                  <li>• <code className="text-xs bg-stone-100 px-1 rounded">cta_get_score_click</code> — Main CTA clicks</li>
                  <li>• <code className="text-xs bg-stone-100 px-1 rounded">download_ios_click</code> — iOS download clicks</li>
                  <li>• <code className="text-xs bg-stone-100 px-1 rounded">android_waitlist_submit</code> — Android waitlist signups</li>
                  <li>• <code className="text-xs bg-stone-100 px-1 rounded">pricing_plan_select</code> — Pricing plan selections</li>
                  <li>• <code className="text-xs bg-stone-100 px-1 rounded">faq_expand</code> — FAQ question expansions</li>
                  <li>• <code className="text-xs bg-stone-100 px-1 rounded">blog_read</code> — Article reads</li>
                  <li>• <code className="text-xs bg-stone-100 px-1 rounded">employer_demo_request</code> — Employer demo requests</li>
                </ul>
              </div>
              <Button
                onClick={() => toast.info("GA4 configuration is managed via environment variables. Set VITE_GA4_MEASUREMENT_ID in your project settings.")}
                className="cursor-pointer"
              >
                <Save className="w-4 h-4 mr-2" />
                Save GA4 Settings
              </Button>
            </CardContent>
          </Card>

          {/* Technical SEO Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Technical SEO Status
              </CardTitle>
              <CardDescription>
                Overview of SEO infrastructure and configuration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { label: "robots.txt", status: "Active", url: "/robots.txt" },
                  { label: "sitemap.xml", status: "Active", url: "/sitemap.xml" },
                  { label: "JSON-LD Structured Data", status: "Active", url: null },
                  { label: "Canonical URLs", status: "Active", url: null },
                  { label: "Open Graph Meta Tags", status: "Active", url: null },
                  { label: "FAQPage Schema (Answers)", status: "Active", url: "/answers" },
                  { label: "Article Schema (Blog)", status: "Active", url: "/oral-health-hub" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0">
                    <span className="text-stone-700">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                        {item.status}
                      </span>
                      {item.url && (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Content Pages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                SEO Content Pages
              </CardTitle>
              <CardDescription>
                Pages created for SEO and GEO optimization.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { label: "Download Page", url: "/download", desc: "App download conversion page" },
                  { label: "Instant Scan", url: "/instant-scan", desc: "Scan conversion landing page" },
                  { label: "Photo Guide", url: "/photo-guide", desc: "How to take dental photos" },
                  { label: "Answers (50 Q&A)", url: "/answers", desc: "GEO-optimized dental Q&A" },
                  { label: "Compare: vs ChatGPT", url: "/compare/dentasmart-vs-chatgpt-dental", desc: "Comparison page" },
                  { label: "Compare: vs Teledentistry", url: "/compare/dentasmart-vs-teledentistry", desc: "Comparison page" },
                  { label: "Compare: vs Insurance", url: "/compare/dentasmart-vs-dental-insurance", desc: "Comparison page" },
                  { label: "Find a Dentist", url: "/find-a-dentist", desc: "Dentist finder guide" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0">
                    <div>
                      <span className="text-stone-700 font-medium">{item.label}</span>
                      <p className="text-xs text-stone-500">{item.desc}</p>
                    </div>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                      View <ExternalLink className="w-3 h-3 inline ml-1" />
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
