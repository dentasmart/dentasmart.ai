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

const categoryMeta: Record<string, { title: string; description: string; heading: string }> = {
  "understanding-dental-conditions": {
    title: "Understanding Dental Conditions - DentaSmart Oral Health Hub",
    description: "Learn about common dental conditions including cavities, gum disease, tooth sensitivity, and more. Clear explanations to help you understand your oral health.",
    heading: "Understanding Dental Conditions",
  },
  "treatment-guides": {
    title: "Dental Treatment Guides - DentaSmart Oral Health Hub",
    description: "Comprehensive guides to dental treatments including fillings, root canals, crowns, and implants. Know what to expect and how much it costs.",
    heading: "Treatment Guides",
  },
  "prevention-tips": {
    title: "Dental Prevention Tips - DentaSmart Oral Health Hub",
    description: "Expert tips for preventing dental problems. Learn about brushing, flossing, diet, and habits that keep your teeth and gums healthy.",
    heading: "Prevention Tips",
  },
  "dental-technology": {
    title: "Dental Technology Explained - DentaSmart Oral Health Hub",
    description: "How AI and modern technology are transforming dental care. Learn about digital X-rays, AI analysis, and the future of oral health monitoring.",
    heading: "Dental Technology",
  },
  "cost-and-insurance": {
    title: "Dental Costs & Insurance Guide - DentaSmart Oral Health Hub",
    description: "Understand dental costs, insurance options, and ways to save money on dental care. Make informed financial decisions about your oral health.",
    heading: "Cost & Insurance",
  },
};

export default function HubCategory() {
  const { category } = useParams<{ category: string }>();
  const meta = category ? categoryMeta[category] : null;

  useEffect(() => {
    trackEvent("hub_category_view", { category: category || "" });
  }, [category]);

  // Fetch articles for this category
  const { data: articles, isLoading } = trpc.blog.list.useQuery();

  // Filter articles by category tag (matching slug pattern)
  const filteredArticles = (articles as any)?.posts?.filter((a: any) => {
    const tags = a.tags || [];
    const categoryName = category?.replace(/-/g, " ") || "";
    return tags.some((t: string) => t.toLowerCase().includes(categoryName.toLowerCase().split(" ")[0]));
  }) || [];

  if (!meta) {
    return (
      <div className="min-h-screen flex flex-col bg-background font-sans text-black">
        <Navigation />
        <div className="flex-1 flex items-center justify-center pt-32">
          <div className="text-center">
            <h1 className="text-3xl font-medium text-black mb-4">Category Not Found</h1>
            <p className="text-stone-600 mb-6">The category you are looking for does not exist.</p>
            <Link href="/oral-health-hub">
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
      />
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-primary/10" />
        </div>
        <div className="container relative z-10 px-4 mx-auto max-w-5xl pt-32 md:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/oral-health-hub">
              <span className="inline-flex items-center gap-2 text-primary hover:underline mb-4 cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
                Back to Oral Health Hub
              </span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-black mb-4 leading-tight">
              {meta.heading}
            </h1>
            <p className="text-xl text-stone-600 font-light leading-relaxed max-w-2xl">
              {meta.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto max-w-5xl">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-stone-50 rounded-2xl p-6 animate-pulse h-48" />
              ))}
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article: any) => (
                <Link key={article.id} href={`/oral-health-hub/${article.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-stone-50 rounded-2xl p-6 border border-stone-100 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer h-full"
                  >
                    <h3 className="text-lg font-medium text-black mb-2">{article.title}</h3>
                    <p className="text-stone-600 font-light text-sm line-clamp-3">{article.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4">
                      Read more <ArrowRight className="w-3 h-3" />
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-stone-500 text-lg mb-6">No articles in this category yet. Check back soon!</p>
              <Link href="/oral-health-hub">
                <Button variant="outline" className="rounded-full cursor-pointer">
                  Browse All Articles
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-stone-50">
        <div className="container px-4 mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-medium text-black mb-4">Want personalized insights?</h2>
          <p className="text-stone-600 font-light mb-6">
            Reading is great, but nothing beats seeing your own oral health data. Upload a photo and get your personalized report.
          </p>
          <Button
            size="lg"
            className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 py-7 text-lg font-medium cursor-pointer"
            onClick={() => {
              trackEvent("cta_get_score_click", { source: `hub_${category}` });
              window.location.href = "/#download-cta";
            }}
          >
            Get My Oral Health Score
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
