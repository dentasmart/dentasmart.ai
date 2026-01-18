
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DownloadCTA } from "@/components/DownloadCTA";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { motion } from "framer-motion";


interface ArticleProps {
  id: string;
  title: string;
  category: string;
  readTime: string;
  problem: {
    heading: string;
    content: string;
  };
  empathy: {
    heading: string;
    content: string;
  };
  solution: {
    heading: string;
    content: string;
  };
  change: {
    heading: string;
    content: string;
  };
  result: {
    heading: string;
    content: string;
  };
  metaDescription: string;
}

interface ArticlePageProps {
  article: ArticleProps;
  relatedArticles?: ArticleProps[];
}

export default function ArticlePage({ article, relatedArticles = [] }: ArticlePageProps) {
  return (
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
            <div className="flex items-center justify-start gap-3 mb-6">
              <Badge variant="secondary" className="bg-white/80 border border-primary/10 text-stone-600 hover:bg-white">
                {article.category}
              </Badge>
              <span className="text-sm font-medium text-stone-400">•</span>
              <span className="text-sm font-medium text-stone-500">{article.readTime}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 mb-8 leading-tight tracking-tight">
              {article.title}
            </h1>
            <div className="flex items-center justify-start gap-4">
              <Link href="/hub">
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
            className="prose prose-lg prose-stone mx-auto"
          >
            {/* The Problem */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-stone-900 mb-6">{article.problem.heading}</h2>
              <p className="text-xl text-stone-700 leading-relaxed">{article.problem.content}</p>
            </div>

            {/* The Empathy (Why it feels this way) */}
            <div className="mb-16 p-8 bg-stone-50 rounded-2xl border border-stone-100">
              <h3 className="text-2xl font-semibold text-stone-900 mb-4">{article.empathy.heading}</h3>
              <p className="text-lg text-stone-600 leading-relaxed">{article.empathy.content}</p>
            </div>

            {/* The Simple Truth (Solution) */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-stone-900 mb-6">{article.solution.heading}</h2>
              <p className="text-xl text-stone-700 leading-relaxed">{article.solution.content}</p>
            </div>

            {/* What Should Happen (The Change) */}
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-stone-900 mb-6">{article.change.heading}</h3>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xl text-stone-700 leading-relaxed">{article.change.content}</p>
              </div>
            </div>

            {/* How DentaSmart Helps (The Result) */}
            <div className="mt-16 pt-16 border-t border-stone-100">
              <h2 className="text-3xl font-bold text-stone-900 mb-6">{article.result.heading}</h2>
              <p className="text-xl text-stone-700 leading-relaxed mb-10">{article.result.content}</p>
            </div>
          </motion.div>
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
                  <Link href={`/hub/${relatedArticle.id}`}>
                    <Card className="h-full hover:shadow-xl transition-all duration-300 border-stone-200 bg-white group cursor-pointer overflow-hidden flex flex-col">
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start mb-4">
                          <Badge variant="secondary" className="bg-stone-100 text-stone-600 hover:bg-stone-200">
                            {relatedArticle.category}
                          </Badge>
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
                          {relatedArticle.problem.content}
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

      <DownloadCTA />
      <Footer />
    </div>
  );
}
