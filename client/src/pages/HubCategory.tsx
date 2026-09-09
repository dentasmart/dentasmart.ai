import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { hubCategoryData } from "@/data/hubCategories";

// categoryMeta is derived from the shared data file so routes.ts can import
// the same object and derive sitemap entries without duplication.
const categoryMeta = hubCategoryData;

export default function HubCategory() {
  const { category } = useParams<{ category: string }>();
  const meta = category ? categoryMeta[category] : null;

  useEffect(() => {
    trackEvent("hub_category_view", { category: category || "" });
  }, [category]);

  // Fetch published articles
  const { data, isLoading } = trpc.blog.list.useQuery({ publishedOnly: true, limit: 50 });

  // Filter articles by the hub category
  const filteredArticles = (data as any)?.posts?.filter((a: any) => {
    if (!meta) return false;
    return a.category === meta.dbCategory;
  }) || [];

  if (!meta) {
    return (
      <div className="min-h-screen flex flex-col bg-background font-sans text-black">
        <Navigation />
        <div className="flex-1 flex items-center justify-center pt-32">
          <div className="text-center">
            <h1 className="text-3xl font-medium text-black mb-4">Category Not Found</h1>
            <p className="text-stone-600 mb-6">The category you are looking for does not exist.</p>
            <Link href="/oral-health-hub/">
              <Button variant="outline" className="rounded-full cursor-pointer">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Oral Health Hub
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black">
      <SEO
        title={meta.title}
        description={meta.description}
        canonical={`https://dentasmart.ai/hub/${category}`}
        keywords={`${meta.heading}, dental health, oral health, DentaSmart`}
      />
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">
        <div className="container relative z-10 px-4 mx-auto max-w-5xl pt-40 pb-16 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/oral-health-hub/">
              <span className="inline-flex items-center gap-2 text-primary hover:underline mb-4 cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
                Back to Oral Health Hub
              </span>
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-6 leading-tight">
              {meta.heading}
            </h1>
            <p className="text-xl text-stone-300 font-light leading-relaxed max-w-2xl">
              {meta.intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto max-w-6xl">
          <h2 className="text-2xl font-medium text-black mb-8">Articles</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-stone-50 rounded-2xl p-6 animate-pulse h-48" />
              ))}
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article: any) => (
                <Link key={article.id} href={`/oral-health-hub/${article.slug}/`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-stone-50 rounded-2xl p-6 border border-stone-100 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer h-full"
                  >
                    {article.featuredImage && (
                      <img loading="lazy" src={article.featuredImage} alt={article.title} className="w-full h-40 object-cover rounded-xl mb-4" />
                    )}
                    <span className="text-xs uppercase tracking-wider text-primary font-medium">{article.category}</span>
                    <h3 className="text-lg font-medium text-black mb-2 mt-1">{article.title}</h3>
                    <p className="text-stone-600 font-light text-sm line-clamp-3">
                      {article.metaDescription || article.atAGlanceAnswer || ""}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-stone-400">{article.readTime}</span>
                      <span className="inline-flex items-center gap-1 text-primary text-sm font-medium">
                        Read more <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-stone-500 text-lg mb-6">No articles in this category yet. Check back soon!</p>
              <Link href="/oral-health-hub/">
              <Button variant="outline" className="rounded-full cursor-pointer">
                  Browse All Articles
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-stone-50">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-2xl font-medium text-black mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {meta.faqItems.map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-xl border border-stone-200 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-black hover:bg-stone-50 transition-colors">
                  {faq.q}
                  <ArrowRight className="w-4 h-4 text-stone-400 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-stone-600 font-light leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-medium text-black mb-4">Want to review DentaSmart options?</h2>
          <p className="text-stone-600 font-light mb-6">
            Free Quick Check is unlimited. Full Quick Check and other paid services include different inputs and educational outputs.
          </p>
          <p className="text-xs text-stone-400 mb-4">
            Educational insights to help you understand your oral health and have better conversations with a licensed dentist.
          </p>
          <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 py-7 text-lg font-medium cursor-pointer">
            <Link href="/pricing/" onClick={() => trackEvent("cta_get_score_click", { source: `hub_${category}` })}>
              Compare DentaSmart Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
