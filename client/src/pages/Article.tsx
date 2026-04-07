import { useRoute } from "wouter";
import SEO from "@/components/SEO";
import NotFound from "@/pages/NotFound";
import { useEffect, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DownloadSection } from "@/components/DownloadSection";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";
import { BlogCTABanner } from "@/components/BlogCTABanner";
import MidContentCTA from "@/components/MidContentCTA";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";

export default function Article() {
  const [match, params] = useRoute("/oral-health-hub/:id");
  const slug = params?.id || "";

  // Fetch article from database by slug
  const { data: article, isLoading, error } = trpc.blog.getBySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  // Fetch categories for display
  const { data: allCategories } = trpc.blog.listCategories.useQuery();
  const categoryMap = useMemo(() => {
    const map = new Map<number, { name: string; color: string; parentId: number | null }>();
    allCategories?.forEach((c) => map.set(c.id, { name: c.name, color: c.color || "stone", parentId: c.parentId }));
    return map;
  }, [allCategories]);

  // Fetch related articles (same category using categoryId)
  const { data: relatedData } = trpc.blog.list.useQuery(
    {
      category: (article as any)?.categoryId ? String((article as any).categoryId) : undefined,
      publishedOnly: true,
      limit: 4,
    },
    { enabled: !!(article as any)?.categoryId }
  );

  const relatedArticles = (relatedData?.posts || []).filter(a => a.slug !== slug).slice(0, 3);

  useEffect(() => {
    if (article) {
      document.title = article.metaTitle || `${article.title} | DentaSmart Oral Health Hub`;
      window.scrollTo(0, 0);
    }
  }, [article]);

  if (!match) {
    return <NotFound />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 text-stone-600">Loading article...</span>
      </div>
    );
  }

  if (error || !article || article.status !== "published") {
    return <NotFound />;
  }

  // Check if article has WYSIWYG body content or structured sections
  const hasBodyHtml = article.bodyHtml && article.bodyHtml.trim().length > 0;
  const hasStructuredContent = article.problemContent || article.empathyContent || article.solutionContent;

  return (
    <>
      <SEO 
        title={article.metaTitle || article.title} 
        description={article.metaDescription || ""}
        canonical={`https://dentasmart.ai/oral-health-hub/${article.slug}`}
        ogType="article"
        article={{
          publishedTime: article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined,
          modifiedTime: article.updatedAt ? new Date(article.updatedAt).toISOString() : undefined,
          author: "DentaSmart",
          section: (() => {
            const catId = (article as any).categoryId;
            const catInfo = catId ? categoryMap.get(catId) : null;
            return catInfo?.name || article.category || undefined;
          })(),
        }}
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Oral Health Hub", url: "/oral-health-hub" },
            { name: article.title, url: `/oral-health-hub/${article.slug}` },
          ]),
          articleSchema({
            headline: article.title,
            description: article.metaDescription || "",
            url: `/oral-health-hub/${article.slug}`,
            datePublished: article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined,
            dateModified: article.updatedAt ? new Date(article.updatedAt).toISOString() : undefined,
            author: "DentaSmart",
            image: article.featuredImage || undefined,
          }),
        ]}
      />
      <div className="min-h-screen flex flex-col bg-background font-sans text-black selection:bg-primary/20">
        <Navigation />

        {/* Article Header */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-[#E6F4F6] border-b border-primary/10">
          <div className="container px-4 mx-auto max-w-3xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-start gap-3 mb-6 flex-wrap">
                {(() => {
                  const catId = (article as any).categoryId;
                  const subId = (article as any).subcategoryId;
                  const catInfo = catId ? categoryMap.get(catId) : null;
                  const subInfo = subId ? categoryMap.get(subId) : null;
                  if (catInfo) {
                    return (
                      <div className="flex items-center gap-1.5">
                        <Link href="/oral-health-hub">
                          <Badge variant="secondary" className="bg-white/80 border border-primary/10 text-stone-600 hover:bg-white cursor-pointer">
                            {catInfo.name}
                          </Badge>
                        </Link>
                        {subInfo && (
                          <>
                            <ChevronRight className="w-3 h-3 text-stone-400" />
                            <Badge variant="secondary" className="bg-white/80 border border-primary/10 text-stone-500 hover:bg-white text-xs">
                              {subInfo.name}
                            </Badge>
                          </>
                        )}
                      </div>
                    );
                  }
                  return (
                    <Badge variant="secondary" className="bg-white/80 border border-primary/10 text-stone-600 hover:bg-white">
                      {article.category}
                    </Badge>
                  );
                })()}
                <span className="text-sm font-medium text-stone-400">•</span>
                <span className="text-sm font-medium text-stone-500">{article.readTime}</span>
                {article.publishedAt && (
                  <>
                    <span className="text-sm font-medium text-stone-400">•</span>
                    <span className="text-sm font-medium text-stone-500">
                      {new Date(article.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                  </>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 mb-8 leading-tight tracking-tight">
                {article.title}
              </h1>
              <div className="flex items-center justify-start gap-4">
                <Link href="/oral-health-hub">
                  <Button variant="ghost" className="text-stone-500 hover:text-stone-900 hover:bg-white/50 rounded-full">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Oral Health Hub
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4 mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto"
            >
              {hasBodyHtml ? (
                /* Render WYSIWYG HTML content */
                <div 
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: article.bodyHtml! }}
                />
              ) : hasStructuredContent ? (
                /* Render structured StoryBrand content */
                <>
                  {/* The Problem */}
                  {article.problemContent && (
                    <div className="mb-16">
                      <h2 className="text-3xl font-bold text-stone-900 mb-6">{article.problemHeading}</h2>
                      <p className="text-xl text-stone-700 leading-relaxed">{article.problemContent}</p>
                    </div>
                  )}

                  {/* The Empathy */}
                  {article.empathyContent && (
                    <div className="mb-16 p-8 bg-stone-50 rounded-2xl border border-stone-100">
                      <h3 className="text-2xl font-semibold text-stone-900 mb-4">{article.empathyHeading}</h3>
                      <p className="text-lg text-stone-600 leading-relaxed">{article.empathyContent}</p>
                    </div>
                  )}

                  {/* The Simple Truth */}
                  {article.solutionContent && (
                    <div className="mb-16">
                      <h2 className="text-3xl font-bold text-stone-900 mb-6">{article.solutionHeading}</h2>
                      <p className="text-xl text-stone-700 leading-relaxed">{article.solutionContent}</p>
                    </div>
                  )}

                  {/* What Should Happen */}
                  {article.changeContent && (
                    <div className="mb-16">
                      <h3 className="text-2xl font-semibold text-stone-900 mb-6">{article.changeHeading}</h3>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                          <CheckCircle2 className="w-6 h-6 text-primary" />
                        </div>
                        <p className="text-xl text-stone-700 leading-relaxed">{article.changeContent}</p>
                      </div>
                    </div>
                  )}

                  {/* How DentaSmart Helps */}
                  {article.resultContent && (
                    <div className="mt-16 pt-16 border-t border-stone-100">
                      <h2 className="text-3xl font-bold text-stone-900 mb-6">{article.resultHeading}</h2>
                      <p className="text-xl text-stone-700 leading-relaxed mb-10">{article.resultContent}</p>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-lg text-stone-600">This article has no content yet.</p>
              )}
            </motion.div>
          </div>
        </section>

        {/* Mid-Content CTA */}
        <section className="py-4 bg-white">
          <div className="container px-4 mx-auto max-w-3xl">
            <MidContentCTA
              variant="card"
              headline="Want clarity about your own mouth?"
              description="Snap a photo of your teeth and get your free AI oral health score in 60 seconds. No insurance needed."
              trackingLabel="article_mid_cta"
            />
          </div>
        </section>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="py-20 bg-stone-50 border-t border-stone-200">
            <div className="container px-4 mx-auto max-w-7xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-stone-900 mb-4">Related Articles</h2>
                <p className="text-lg text-stone-600">More insights to help you understand your oral health.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.map((relatedArticle, index) => (
                  <motion.div
                    key={relatedArticle.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={`/oral-health-hub/${relatedArticle.slug}`}>
                      <Card className="h-full hover:shadow-xl transition-all duration-300 border-stone-200 bg-white group cursor-pointer overflow-hidden flex flex-col">
                        <CardHeader className="pb-4">
                          <div className="flex justify-between items-start mb-4">
                            {(() => {
                              const rCatId = (relatedArticle as any).categoryId;
                              const rSubId = (relatedArticle as any).subcategoryId;
                              const rCatInfo = rCatId ? categoryMap.get(rCatId) : null;
                              const rSubInfo = rSubId ? categoryMap.get(rSubId) : null;
                              if (rCatInfo) {
                                return (
                                  <div className="flex items-center gap-1">
                                    <Badge variant="secondary" className="bg-stone-100 text-stone-600 hover:bg-stone-200 text-xs">
                                      {rCatInfo.name}
                                    </Badge>
                                    {rSubInfo && (
                                      <Badge variant="secondary" className="bg-stone-50 text-stone-500 hover:bg-stone-100 text-[10px]">
                                        {rSubInfo.name}
                                      </Badge>
                                    )}
                                  </div>
                                );
                              }
                              return (
                                <Badge variant="secondary" className="bg-stone-100 text-stone-600 hover:bg-stone-200">
                                  {relatedArticle.category}
                                </Badge>
                              );
                            })()}
                            <span className="text-xs font-medium text-stone-400 flex items-center">
                              <BookOpen className="w-3 h-3 mr-1" />
                              {relatedArticle.readTime}
                            </span>
                          </div>
                          <CardTitle className="text-xl font-bold text-stone-900 group-hover:text-primary transition-colors leading-tight">
                            {relatedArticle.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <CardDescription className="text-base text-stone-600 line-clamp-3">
                            {relatedArticle.problemContent || relatedArticle.metaDescription}
                          </CardDescription>
                        </CardContent>
                        <CardFooter className="pt-4 border-t border-stone-100 mt-auto">
                          <span className="text-sm font-medium text-primary flex items-center group-hover:translate-x-1 transition-transform">
                            Read Article <ArrowRight className="w-4 h-4 ml-1" />
                          </span>
                        </CardFooter>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        <DownloadSection />
        <BlogCTABanner />
        <Footer />
      </div>
    </>
  );
}
