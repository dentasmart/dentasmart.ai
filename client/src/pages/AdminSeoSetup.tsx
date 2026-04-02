import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, BarChart3, Globe, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { getGA4MeasurementId } from "@/lib/analytics";

export default function AdminSeoSetup() {
  const ga4Id = getGA4MeasurementId();

  return (
    <AdminLayout activeId="seo-analytics">
      <h1 className="text-2xl font-semibold text-stone-900 mb-2">SEO & Analytics Setup</h1>
      <p className="text-stone-600 mb-8">Tracking configuration, meta defaults, and search engine settings.</p>

      <div className="space-y-6">
        {/* GA4 Setup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Google Analytics 4
            </CardTitle>
            <CardDescription>
              Track page views, conversions, and user behavior with your GA4 property.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Status indicator */}
            {ga4Id ? (
              <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-800">GA4 is active</p>
                  <p className="text-sm text-green-700 mt-0.5">
                    Measurement ID: <code className="bg-green-100 px-1.5 py-0.5 rounded text-xs font-mono">{ga4Id}</code>
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-amber-800">GA4 is not configured</p>
                  <p className="text-sm text-amber-700 mt-0.5">
                    Set <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs font-mono">VITE_GA4_MEASUREMENT_ID</code> in
                    your project Settings &rarr; Secrets to enable tracking.
                  </p>
                </div>
              </div>
            )}

            {/* How to update */}
            <div className="bg-stone-50 rounded-lg p-4 text-sm text-stone-600">
              <p className="font-medium text-stone-800 mb-2">How to change your GA4 ID:</p>
              <ol className="list-decimal list-inside space-y-1 text-stone-600">
                <li>Go to your project <strong>Settings &rarr; Secrets</strong></li>
                <li>Find <code className="text-xs bg-stone-100 px-1 rounded">VITE_GA4_MEASUREMENT_ID</code> and update the value</li>
                <li>Republish the site for changes to take effect</li>
              </ol>
              <p className="mt-3 text-xs text-stone-500">
                Find your Measurement ID in Google Analytics &rarr; Admin &rarr; Data Streams &rarr; Web
              </p>
            </div>

            {/* Tracked events */}
            <div className="bg-stone-50 rounded-lg p-4 text-sm text-stone-600">
              <p className="font-medium text-stone-800 mb-2">Events tracked automatically:</p>
              <ul className="space-y-1">
                <li>&#8226; <code className="text-xs bg-stone-100 px-1 rounded">page_view</code> - Every page navigation</li>
                <li>&#8226; <code className="text-xs bg-stone-100 px-1 rounded">cta_get_score_click</code> - Main CTA clicks</li>
                <li>&#8226; <code className="text-xs bg-stone-100 px-1 rounded">download_ios_click</code> - iOS download clicks</li>
                <li>&#8226; <code className="text-xs bg-stone-100 px-1 rounded">android_waitlist_submit</code> - Android waitlist signups</li>
                <li>&#8226; <code className="text-xs bg-stone-100 px-1 rounded">pricing_plan_select</code> - Pricing plan selections</li>
                <li>&#8226; <code className="text-xs bg-stone-100 px-1 rounded">faq_expand</code> - FAQ question expansions</li>
                <li>&#8226; <code className="text-xs bg-stone-100 px-1 rounded">blog_read</code> - Article reads</li>
                <li>&#8226; <code className="text-xs bg-stone-100 px-1 rounded">employer_demo_request</code> - Employer demo requests</li>
                <li>&#8226; <code className="text-xs bg-stone-100 px-1 rounded">symptom_quiz_start</code> - Symptom quiz starts</li>
                <li>&#8226; <code className="text-xs bg-stone-100 px-1 rounded">symptom_quiz_complete</code> - Symptom quiz completions</li>
              </ul>
            </div>
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
                { label: "Conditions Hub", url: "/oral-health-hub/conditions", desc: "Dental conditions landing page" },
                { label: "Affordability Hub", url: "/oral-health-hub/affordability", desc: "Dental cost and savings guide" },
                { label: "Prevention Hub", url: "/oral-health-hub/prevention", desc: "Preventive care landing page" },
                { label: "Second Opinion Hub", url: "/oral-health-hub/second-opinion", desc: "Second opinion guide" },
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
    </AdminLayout>
  );
}
