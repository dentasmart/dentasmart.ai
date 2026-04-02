import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, BarChart3, Globe, FileText, CheckCircle2, AlertCircle, Smartphone, Target, Eye } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";
import { getGA4MeasurementId, getMetaPixelId, getGoogleAdsId, getGoogleAdsConversionLabel } from "@/lib/analytics";

export default function AdminSeoSetup() {
  const ga4Id = getGA4MeasurementId();
  const metaPixelId = getMetaPixelId();
  const googleAdsId = getGoogleAdsId();
  const googleAdsLabel = getGoogleAdsConversionLabel();

  return (
    <AdminLayout activeId="seo-analytics">
      <h1 className="text-2xl font-semibold text-stone-900 mb-2">SEO & Analytics Setup</h1>
      <p className="text-stone-600 mb-8">Tracking configuration, meta defaults, and search engine settings.</p>

      <div className="space-y-6">

        {/* Where to view your data */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              Where to View Your Data
            </CardTitle>
            <CardDescription>
              This page configures tracking. Your actual stats, graphs, and reports live in these dashboards:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="https://analytics.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 bg-white rounded-lg border border-stone-200 hover:border-primary/40 transition-colors"
              >
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-stone-800 text-sm">Google Analytics</p>
                  <p className="text-xs text-stone-500 mt-0.5">Page views, user behavior, traffic sources, conversions</p>
                </div>
                <ExternalLink className="w-3 h-3 text-stone-400 flex-shrink-0 mt-1" />
              </a>
              <a
                href="https://business.facebook.com/events_manager"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 bg-white rounded-lg border border-stone-200 hover:border-primary/40 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-stone-800 text-sm">Meta Events Manager</p>
                  <p className="text-xs text-stone-500 mt-0.5">Facebook/Instagram ad conversions, pixel events</p>
                </div>
                <ExternalLink className="w-3 h-3 text-stone-400 flex-shrink-0 mt-1" />
              </a>
              <a
                href="https://ads.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 bg-white rounded-lg border border-stone-200 hover:border-primary/40 transition-colors"
              >
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-stone-800 text-sm">Google Ads</p>
                  <p className="text-xs text-stone-500 mt-0.5">Ad campaign performance, conversion tracking</p>
                </div>
                <ExternalLink className="w-3 h-3 text-stone-400 flex-shrink-0 mt-1" />
              </a>
            </div>
            <div className="mt-4 p-3 bg-white rounded-lg border border-stone-200">
              <p className="text-xs text-stone-500">
                <strong className="text-stone-700">App download tracking:</strong> View iOS download attribution in{" "}
                <a href="https://appstoreconnect.apple.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  App Store Connect
                </a>
                {" "}under Analytics &gt; Sources. Campaign tokens (ct) are attached to every App Store link on this site, so you can see which pages drive the most downloads.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* GA4 Setup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Google Analytics 4
            </CardTitle>
            <CardDescription>
              Track page views, conversions, and user behavior.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
                    Settings &rarr; Secrets to enable tracking.
                  </p>
                </div>
              </div>
            )}

            <div className="bg-stone-50 rounded-lg p-4 text-sm text-stone-600">
              <p className="font-medium text-stone-800 mb-2">Events tracked automatically:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                {[
                  { code: "page_view", desc: "Every page navigation" },
                  { code: "cta_get_score_click", desc: "Main CTA clicks" },
                  { code: "download_ios_click", desc: "iOS download clicks" },
                  { code: "android_waitlist_submit", desc: "Android waitlist signups" },
                  { code: "pricing_plan_select", desc: "Pricing plan selections" },
                  { code: "faq_expand", desc: "FAQ question expansions" },
                  { code: "blog_read", desc: "Article reads" },
                  { code: "employer_demo_request", desc: "Employer demo requests" },
                  { code: "symptom_quiz_start", desc: "Symptom quiz starts" },
                  { code: "symptom_quiz_complete", desc: "Symptom quiz completions" },
                ].map((e) => (
                  <div key={e.code} className="flex items-center gap-2 py-0.5">
                    <code className="text-xs bg-stone-100 px-1 rounded flex-shrink-0">{e.code}</code>
                    <span className="text-xs text-stone-500">{e.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Meta Pixel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Meta Pixel (Facebook / Instagram Ads)
            </CardTitle>
            <CardDescription>
              Track conversions from Facebook and Instagram ad campaigns.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {metaPixelId ? (
              <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-800">Meta Pixel is active</p>
                  <p className="text-sm text-green-700 mt-0.5">
                    Pixel ID: <code className="bg-green-100 px-1.5 py-0.5 rounded text-xs font-mono">{metaPixelId}</code>
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-lg p-4">
                <AlertCircle className="w-5 h-5 text-stone-400 flex-shrink-0" />
                <div>
                  <p className="font-medium text-stone-700">Meta Pixel is not configured</p>
                  <p className="text-sm text-stone-500 mt-0.5">
                    Set <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">VITE_META_PIXEL_ID</code> in
                    Settings &rarr; Secrets. Find your Pixel ID in{" "}
                    <a href="https://business.facebook.com/events_manager" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Meta Events Manager
                    </a>.
                  </p>
                </div>
              </div>
            )}

            <div className="bg-stone-50 rounded-lg p-4 text-sm text-stone-600">
              <p className="font-medium text-stone-800 mb-2">Meta Pixel event mapping:</p>
              <p className="text-xs text-stone-500 mb-2">
                DentaSmart events are automatically mapped to Meta standard events for better ad optimization:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                {[
                  { from: "download_ios_click", to: "Lead" },
                  { from: "android_waitlist_submit", to: "Lead" },
                  { from: "cta_get_score_click", to: "InitiateCheckout" },
                  { from: "symptom_quiz_start", to: "ViewContent" },
                  { from: "symptom_quiz_complete", to: "CompleteRegistration" },
                  { from: "employer_demo_request", to: "Contact" },
                ].map((m) => (
                  <div key={m.from} className="flex items-center gap-1 py-0.5">
                    <code className="text-xs bg-stone-100 px-1 rounded">{m.from}</code>
                    <span className="text-xs text-stone-400">&rarr;</span>
                    <code className="text-xs bg-blue-50 text-blue-700 px-1 rounded">{m.to}</code>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Google Ads */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              Google Ads Conversion Tracking
            </CardTitle>
            <CardDescription>
              Track conversions from Google Search and Display ad campaigns.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {googleAdsId && googleAdsLabel ? (
              <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-800">Google Ads tracking is active</p>
                  <p className="text-sm text-green-700 mt-0.5">
                    Ads ID: <code className="bg-green-100 px-1.5 py-0.5 rounded text-xs font-mono">{googleAdsId}</code>
                    {" / "}
                    Label: <code className="bg-green-100 px-1.5 py-0.5 rounded text-xs font-mono">{googleAdsLabel}</code>
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-lg p-4">
                <AlertCircle className="w-5 h-5 text-stone-400 flex-shrink-0" />
                <div>
                  <p className="font-medium text-stone-700">Google Ads is not configured</p>
                  <p className="text-sm text-stone-500 mt-0.5">
                    Set both <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">VITE_GOOGLE_ADS_ID</code> (starts with AW-) and{" "}
                    <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs font-mono">VITE_GOOGLE_ADS_CONVERSION_LABEL</code> in
                    Settings &rarr; Secrets.
                  </p>
                </div>
              </div>
            )}

            <div className="bg-stone-50 rounded-lg p-4 text-sm text-stone-600">
              <p className="font-medium text-stone-800 mb-2">How to find your Google Ads conversion info:</p>
              <ol className="list-decimal list-inside space-y-1 text-stone-600 text-xs">
                <li>Go to <a href="https://ads.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Ads</a> &rarr; Goals &rarr; Conversions &rarr; Summary</li>
                <li>Create a new conversion action (Website, category: "Lead")</li>
                <li>Choose "Install tag manually" and copy the Conversion ID (AW-XXXXXXXXX) and Conversion Label</li>
                <li>Set them as secrets in this project's Settings</li>
              </ol>
              <p className="mt-2 text-xs text-stone-500">
                Conversions fire automatically on: iOS download clicks, Android waitlist signups, symptom quiz completions, and employer demo requests.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* App Download Tracking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-primary" />
              App Download Tracking
            </CardTitle>
            <CardDescription>
              Every App Store link on this site includes campaign tokens so you can see which pages drive downloads.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-800">App Store campaign tokens are active</p>
                <p className="text-sm text-green-700 mt-0.5">
                  All iOS App Store links include <code className="bg-green-100 px-1 rounded text-xs">ct</code> (campaign token) parameters for attribution.
                </p>
              </div>
            </div>

            <div className="bg-stone-50 rounded-lg p-4 text-sm text-stone-600">
              <p className="font-medium text-stone-800 mb-2">Campaign tokens by page:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                {[
                  { source: "download_section", page: "Home page download section" },
                  { source: "download_cta", page: "Bottom CTA section" },
                  { source: "download_page", page: "Download page (top)" },
                  { source: "download_page_bottom", page: "Download page (bottom)" },
                  { source: "symptom_quiz_results", page: "Symptom quiz results" },
                  { source: "footer", page: "Footer link" },
                  { source: "waitlist_success_modal", page: "Android waitlist success popup" },
                ].map((t) => (
                  <div key={t.source} className="flex items-center gap-2 py-0.5">
                    <code className="text-xs bg-stone-100 px-1 rounded flex-shrink-0">{t.source}</code>
                    <span className="text-xs text-stone-500">{t.page}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-stone-500">
                View these in{" "}
                <a href="https://appstoreconnect.apple.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  App Store Connect
                </a>
                {" "}&rarr; Analytics &rarr; Sources &rarr; Campaign.
              </p>
            </div>

            <div className="bg-stone-50 rounded-lg p-4 text-sm text-stone-600">
              <p className="font-medium text-stone-800 mb-2">For Android app tracking (when live):</p>
              <ol className="list-decimal list-inside space-y-1 text-stone-600 text-xs">
                <li>Create a Google Play Console listing</li>
                <li>Use UTM-tagged Play Store links (utm_source=dentasmart_website&utm_campaign=page_name)</li>
                <li>View attribution in Google Play Console &rarr; Statistics &rarr; Acquisition</li>
              </ol>
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

        {/* SEO Content Pages */}
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

        {/* Setup instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-stone-500" />
              Environment Variables Reference
            </CardTitle>
            <CardDescription>
              All tracking is configured via environment variables in Settings &rarr; Secrets.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { key: "VITE_GA4_MEASUREMENT_ID", desc: "Google Analytics 4 Measurement ID (starts with G-)", status: !!ga4Id },
                { key: "VITE_META_PIXEL_ID", desc: "Meta (Facebook) Pixel ID (numeric string)", status: !!metaPixelId },
                { key: "VITE_GOOGLE_ADS_ID", desc: "Google Ads Conversion ID (starts with AW-)", status: !!googleAdsId },
                { key: "VITE_GOOGLE_ADS_CONVERSION_LABEL", desc: "Google Ads Conversion Label", status: !!googleAdsLabel },
              ].map((v) => (
                <div key={v.key} className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0">
                  <div>
                    <code className="text-xs bg-stone-100 px-1.5 py-0.5 rounded font-mono">{v.key}</code>
                    <p className="text-xs text-stone-500 mt-0.5">{v.desc}</p>
                  </div>
                  {v.status ? (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Set</span>
                  ) : (
                    <span className="text-xs bg-stone-100 text-stone-500 px-2 py-1 rounded-full font-medium">Not set</span>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-stone-500">
              After updating any secret, republish the site for changes to take effect.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
