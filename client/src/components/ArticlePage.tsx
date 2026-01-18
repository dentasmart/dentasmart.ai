import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DownloadCTA } from "@/components/DownloadCTA";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

interface ArticleProps {
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

export default function ArticlePage({ article }: { article: ArticleProps }) {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black selection:bg-primary/20">
      <Navigation />

      {/* Article Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-stone-50 border-b border-stone-100">
        <div className="container px-4 mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Badge variant="secondary" className="bg-white border border-stone-200 text-stone-600 hover:bg-stone-50">
                {article.category}
              </Badge>
              <span className="text-sm font-medium text-stone-400">•</span>
              <span className="text-sm font-medium text-stone-500">{article.readTime}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 mb-8 leading-tight tracking-tight">
              {article.title}
            </h1>
            <div className="flex items-center justify-center gap-4">
              <Link href="/hub">
                <Button variant="ghost" className="text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Hub
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

      <DownloadCTA />
      <Footer />
    </div>
  );
}
