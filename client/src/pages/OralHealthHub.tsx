import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DownloadSection } from "@/components/DownloadSection";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";

const categories = ["All", "Dental Problems", "Dentist Problems", "Insurance Problems"];

export default function OralHealthHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch published articles from database
  const { data, isLoading } = trpc.blog.list.useQuery({
    publishedOnly: true,
    limit: 100,
    category: selectedCategory !== "All" ? selectedCategory : undefined,
    search: searchQuery || undefined,
  });

  const articles = useMemo(() => data?.posts || [], [data]);

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO 
        title="Oral Health Hub" 
        description="Clear answers to your dental questions. We break down the confusing world of dentistry and insurance into simple, honest guides."
      />
      <Navigation />
      
      {/* Hero Section - Light Background matching Home Page */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663137878519/QUJzfPwTjdiBdwFs.jpg" 
            alt="Dentist explaining treatment to patient" 
            className="w-full h-full object-cover object-top md:object-right"
          />
          {/* Gradient Overlay for Text Readability - Stronger on left for text */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/80 md:hidden" />
        </div>
        
        <div className="container relative z-10 px-4 mx-auto max-w-7xl pt-32 md:pt-0 text-left">
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
            <div className="relative max-w-xl mr-auto mb-12">
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
            <div className="flex flex-wrap justify-start gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`rounded-full px-6 ${
                    selectedCategory === category 
                      ? "bg-primary text-white hover:bg-primary/90 border-primary shadow-md" 
                      : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50 hover:text-stone-900"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            </motion.div>

            {/* Right Column: Empty to let background image show through */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-6"></div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-stone-50 min-h-[600px]">
        <div className="container px-4 mx-auto max-w-7xl">
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
                          <Badge variant="secondary" className="bg-stone-100 text-stone-600 hover:bg-stone-200">
                            {article.category}
                          </Badge>
                          <span className="text-xs font-medium text-stone-400 flex items-center">
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
                className="mt-4 text-primary"
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
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
