import { useRoute } from "wouter";
import ArticlePage from "@/components/ArticlePage";
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

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | DentaSmart Oral Health Hub`;
      // Update meta description if possible, or just handle title
    }
  }, [article]);

  if (!match || !article) {
    return <NotFound />;
  }

  return <ArticlePage article={article} />;
}
