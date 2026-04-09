import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Search, Loader2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DownloadSection } from "@/components/DownloadSection";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";

// Categories are now loaded from database only

const COLOR_MAP: Record<string, { bg: string; text: string; activeBg: string }> = {
  stone: { bg: "bg-stone-100", text: "text-stone-700", activeBg: "bg-stone-700" },
  blue: { bg: "bg-blue-100", text: "text-blue-700", activeBg: "bg-blue-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-700", activeBg: "bg-purple-600" },
  orange: { bg: "bg-orange-100", text: "text-orange-700", activeBg: "bg-orange-600" },
  green: { bg: "bg-green-100", text: "text-green-700", activeBg: "bg-green-600" },
  red: { bg: "bg-red-100", text: "text-red-700", activeBg: "bg-red-600" },
  amber: { bg: "bg-amber-100", text: "text-amber-700", activeBg: "bg-amber-600" },
  teal: { bg: "bg-teal-100", text: "text-teal-700", activeBg: "bg-teal-600" },
  pink: { bg: "bg-pink-100", text: "text-pink-700", activeBg: "bg-pink-600" },
  indigo: { bg: "bg-indigo-100", text: "text-indigo-700", activeBg: "bg-indigo-600" },
};

export default function OralHealthHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  // Fetch categories from database
  const { data: allCategories } = trpc.blog.listCategories.useQuery();

  const parentCategories = useMemo(() => allCategories?.filter((c) => !c.parentId) || [], [allCategories]);


  // Build category lookup
  const categoryMap = useMemo(() => {
    const map = new Map<number, { name: string; color: string; parentId: number | null }>();
    allCategories?.forEach((c) => map.set(c.id, { name: c.name, color: c.color || "stone", parentId: c.parentId }));
    return map;
  }, [allCategories]);

  // Build filter options with IDs for API
  const filterCategories = useMemo(() => {
    return [
      { label: "All", value: "All" },
      ...parentCategories.map((c) => ({ label: c.name, value: String(c.id) })),
    ];
  }, [parentCategories]);

  // Fetch published articles from database
  const { data, isLoading } = trpc.blog.list.useQuery({
    publishedOnly: true,
    limit: 100,
    category: selectedCategory !== "All" ? selectedCategory : undefined,
    search: searchQuery || undefined,
  });

  // Get the selected category label for display
  const selectedCategoryLabel = useMemo(() => {
    const found = filterCategories.find((c) => c.value === selectedCategory);
    return found?.label || "All";
  }, [filterCategories, selectedCategory]);

  // Filter by subcategory on the client side if selected
  const articles = useMemo(() => {
    const posts = data?.posts || [];
    if (!selectedSubcategory || !allCategories) return posts;
    const subCat = allCategories.find((c) => c.name === selectedSubcategory && c.parentId);
    if (!subCat) return posts;
    return posts.filter((p: any) => p.subcategoryId === subCat.id);
  }, [data, selectedSubcategory, allCategories]);

  // Build subcategories for the selected parent
  const subcategoriesForSelected = useMemo(() => {
    if (!allCategories || selectedCategory === "All") return [];
    const parentId = parseInt(selectedCategory);
    if (isNaN(parentId)) return [];
    return allCategories.filter((c) => c.parentId === parentId);
  }, [allCategories, selectedCategory]);

  // Get display info for an article's category/subcategory
  const getArticleCategoryDisplay = (article: any) => {
    const catId = article.categoryId;
    const subId = article.subcategoryId;
    const catInfo = catId ? categoryMap.get(catId) : null;
    const subInfo = subId ? categoryMap.get(subId) : null;

    if (catInfo) {
      const color = COLOR_MAP[catInfo.color] || COLOR_MAP.stone;
      return (
        <div className="flex items-center gap-1.5 flex-wrap">
          <Badge className={`${color.bg} ${color.text} hover:opacity-80 border-0 text-xs`}>
            {catInfo.name}
          </Badge>
          {subInfo && (
            <>
              <ChevronRight className="w-3 h-3 text-stone-300" />
              <Badge className={`${(COLOR_MAP[subInfo.color] || color).bg} ${(COLOR_MAP[subInfo.color] || color).text} hover:opacity-80 border-0 text-[10px]`}>
                {subInfo.name}
              </Badge>
            </>
          )}
        </div>
      );
    }

    // Legacy fallback
    return (
      <Badge variant="secondary" className="bg-stone-100 text-stone-600 hover:bg-stone-200">
        {article.category}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO 
        title="Oral Health Hub" 
        description="Clear answers to your dental questions. We break down the confusing world of dentistry and insurance into simple, honest guides."
        canonical="https://dentasmart.ai/oral-health-hub"
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Oral Health Hub", url: "/oral-health-hub" },
          ]),
          webPageSchema({
            name: "Oral Health Hub",
            description: "Clear answers to your dental questions. We break down the confusing world of dentistry and insurance into simple, honest guides.",
            url: "/oral-health-hub",
          }),
        ]}
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img loading="lazy" src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/QUJzfPwTjdiBdwFs.jpg" 
            alt="Dentist explaining treatment to patient" 
            className="w-full h-full object-cover object-[50%_20%] md:object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/60 md:hidden" />
        </div>
        
        <div className="container relative z-10 px-4 mx-auto max-w-7xl pt-40 md:pt-32 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 xl:col-span-6"
            >
            <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 px-4 py-1.5 text-sm rounded-full border-0 font-medium">
              Oral Health Hub
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-6 leading-[1.1]">
              Clear answers to your <br />
              <span className="font-normal italic text-primary">dental questions</span>.
            </h1>
            
            <p className="text-xl md:text-2xl text-stone-700 mb-12 font-normal leading-relaxed text-balance max-w-2xl mr-auto">
              Stop guessing about your teeth. We break down the confusing world of dentistry and insurance into simple, honest guides.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mr-auto mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-stone-400" />
              </div>
              <Input
                type="text"
                placeholder="Search for a topic (e.g., 'cavity', 'insurance', 'pain')..."
                className="pl-12 py-6 text-lg rounded-full bg-white border-stone-200 text-stone-900 placeholder:text-stone-400 focus:border-primary shadow-lg transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-start gap-3 mb-4">
              {filterCategories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? "default" : "outline"}
                  className={`rounded-full px-6 cursor-pointer ${
                    selectedCategory === cat.value 
                      ? "bg-primary text-white hover:bg-primary/90 border-primary shadow-md" 
                      : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50 hover:text-stone-900"
                  }`}
                  onClick={() => {
                    setSelectedCategory(cat.value);
                    setSelectedSubcategory(null);
                  }}
                >
                  {cat.label}
                </Button>
              ))}
            </div>

            {/* Subcategory Filters (shown when a parent category is selected and has subcategories) */}
            {subcategoriesForSelected.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap justify-start gap-2"
              >
                <Button
                  variant={!selectedSubcategory ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full px-4 text-sm cursor-pointer ${
                    !selectedSubcategory
                      ? "bg-stone-700 text-white hover:bg-stone-600 border-stone-700"
                      : "bg-white/80 text-stone-500 border-stone-200 hover:bg-stone-50"
                  }`}
                  onClick={() => setSelectedSubcategory(null)}
                >
                  All {selectedCategoryLabel}
                </Button>
                {subcategoriesForSelected.map((sub) => {
                  const isActive = selectedSubcategory === sub.name;
                  const color = COLOR_MAP[sub.color || "stone"] || COLOR_MAP.stone;
                  return (
                    <Button
                      key={sub.id}
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      className={`rounded-full px-4 text-sm cursor-pointer ${
                        isActive
                          ? `${color.activeBg} text-white border-transparent`
                          : `${color.bg} ${color.text} border-transparent hover:opacity-80`
                      }`}
                      onClick={() => setSelectedSubcategory(isActive ? null : sub.name)}
                    >
                      {sub.name}
                    </Button>
                  );
                })}
              </motion.div>
            )}
            </motion.div>

            <div className="hidden lg:block lg:col-span-5 xl:col-span-6"></div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-stone-50 min-h-[600px]">
        <div className="container px-4 mx-auto max-w-7xl">
          {/* Active filter breadcrumb */}
          {(selectedCategory !== "All" || selectedSubcategory) && (
            <div className="flex items-center gap-2 mb-8 text-sm text-stone-500">
              <span>Showing:</span>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                {selectedCategoryLabel}
              </Badge>
              {selectedSubcategory && (
                <>
                  <ChevronRight className="w-3 h-3" />
                  <Badge variant="secondary" className="bg-primary/5 text-primary border-0">
                    {selectedSubcategory}
                  </Badge>
                </>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="text-stone-400 hover:text-stone-600 ml-2 cursor-pointer"
                onClick={() => { setSelectedCategory("All"); setSelectedSubcategory(null); }}
              >
                Clear
              </Button>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-3 text-stone-600">Loading articles...</span>
            </div>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/oral-health-hub/${article.slug}`}>
                    <Card className="h-full hover:shadow-xl transition-all duration-300 border-stone-200 bg-white group cursor-pointer overflow-hidden flex flex-col">
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start mb-4">
                          {getArticleCategoryDisplay(article)}
                          <span className="text-xs font-medium text-stone-400 flex items-center flex-shrink-0 ml-2">
                            <BookOpen className="w-3 h-3 mr-1" />
                            {article.readTime}
                          </span>
                        </div>
                        <CardTitle className="text-xl font-bold text-stone-900 group-hover:text-primary transition-colors leading-tight">
                          {article.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <CardDescription className="text-base text-stone-600 line-clamp-3">
                          {article.problemContent || article.metaDescription}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="pt-4 border-t border-stone-100 mt-auto flex justify-between items-center">
                        <span className="text-xs text-stone-400">
                          {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
                        </span>
                        <span className="text-sm font-medium text-primary flex items-center group-hover:translate-x-1 transition-transform">
                          Read Article <ArrowRight className="w-4 h-4 ml-1" />
                        </span>
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-stone-900 mb-2">No articles found</h3>
              <p className="text-stone-600">Try adjusting your search or category filter.</p>
              <Button 
                variant="link" 
                className="mt-4 text-primary cursor-pointer"
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setSelectedSubcategory(null); }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <DownloadSection />
      <Footer />
    </div>
  );
}
