import { useRoute } from "wouter";
import ArticlePage from "@/components/ArticlePage";
import SEO from "@/components/SEO";
import { dentistArticles } from "@/data/dentistArticles";
import { insuranceArticles } from "@/data/insuranceArticles";
import { clinicalArticles } from "@/data/clinicalArticles";
import NotFound from "@/pages/NotFound";
import { useEffect } from "react";

export default function Article() {
  const [match, params] = useRoute("/hub/:id");
  
  // Combine all article sources
  const allArticles = [...dentistArticles, ...insuranceArticles, ...clinicalArticles];
  
  const article = allArticles.find(a => a.id === params?.id);

  // Get related articles (same category, excluding current article)
  const relatedArticles = article 
    ? allArticles
        .filter(a => a.category === article.category && a.id !== article.id)
        .slice(0, 3) // Limit to 3 related articles
    : [];

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | DentaSmart Oral Health Hub`;
      // Update meta description if possible, or just handle title
      window.scrollTo(0, 0); // Scroll to top when article changes
    }
  }, [article]);

  if (!match || !article) {
    return <NotFound />;
  }

  return (
    <>
      <SEO 
        title={article.title} 
        description={article.metaDescription}
      />
      <ArticlePage article={article} relatedArticles={relatedArticles} />
    </>
  );
}
