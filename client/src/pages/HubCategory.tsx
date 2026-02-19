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

const categoryMeta: Record<string, {
  title: string;
  description: string;
  heading: string;
  intro: string;
  dbCategory: string;
  faqItems: { q: string; a: string }[];
}> = {
  symptoms: {
    title: "Dental Symptoms Explained - DentaSmart Oral Health Hub",
    description: "Understand what your dental symptoms mean. From tooth pain to sensitivity, get clear answers about common oral health issues.",
    heading: "Dental Symptoms",
    intro: "Something feels off in your mouth and you want to know what it means. We break down the most common dental symptoms in plain language so you can understand what is happening and what to do next.",
    dbCategory: "Symptoms",
    faqItems: [
      { q: "When should I see a dentist for tooth pain?", a: "If tooth pain lasts more than 2 days, wakes you up at night, or comes with swelling or fever, see a dentist right away. These could be signs of infection." },
      { q: "Is tooth sensitivity normal?", a: "Some sensitivity to hot or cold is common. But if it lingers for more than a few seconds or happens every time you eat, it may signal a cavity or gum recession." },
      { q: "Can I diagnose my own dental problem?", a: "You can learn what symptoms might mean, but only a licensed dentist can give a proper diagnosis. DentaSmart helps you understand your symptoms so you can have a better conversation with your dentist." },
    ],
  },
  gums: {
    title: "Gum Health Guide - DentaSmart Oral Health Hub",
    description: "Learn about gum health, bleeding gums, gum recession, and gum disease. Simple explanations and steps to protect your gums.",
    heading: "Gum Health",
    intro: "Your gums are the foundation of your smile. When they bleed, swell, or pull back, it is your body telling you something. Here you will find clear, simple guides to help you understand gum problems and take action early.",
    dbCategory: "Gums",
    faqItems: [
      { q: "Why do my gums bleed when I brush?", a: "Bleeding gums usually mean there is inflammation from plaque buildup. It is one of the earliest signs of gum disease. Better brushing and flossing often helps, but see a dentist if it continues." },
      { q: "Can gum recession be reversed?", a: "Early gum recession can sometimes be slowed or stopped with better oral care. But once gums have pulled back significantly, a dentist may need to treat it with grafting or other procedures." },
      { q: "What is the difference between gingivitis and periodontitis?", a: "Gingivitis is early gum disease that causes redness and bleeding. It is reversible. Periodontitis is advanced gum disease that can cause bone loss and tooth loss. Catching it early matters." },
    ],
  },
  cavities: {
    title: "Cavity & Tooth Decay Guide - DentaSmart Oral Health Hub",
    description: "Everything you need to know about cavities, tooth decay, and dental fillings. Spot the signs early and protect your teeth.",
    heading: "Cavities & Tooth Decay",
    intro: "Cavities are the most common dental problem in the world. The good news is they are preventable and treatable when caught early. Learn how to spot the signs, understand your options, and protect your teeth.",
    dbCategory: "Cavities",
    faqItems: [
      { q: "How do I know if I have a cavity?", a: "Early cavities often have no symptoms. As they grow, you may notice sensitivity to sweets, hot, or cold foods. Dark spots or holes on teeth are also signs. Regular checkups catch cavities before they hurt." },
      { q: "Can a cavity heal on its own?", a: "Very early cavities (before they break through enamel) can sometimes remineralize with fluoride. But once a cavity forms a hole, it needs a filling from a dentist." },
      { q: "How much does a filling cost?", a: "A basic filling typically costs $100 to $300 without insurance. The price depends on the size, location, and material used. DentaSmart can help you understand what to expect." },
    ],
  },
  xrays: {
    title: "Dental X-Ray Guide - DentaSmart Oral Health Hub",
    description: "Understand your dental X-rays. Learn what dentists look for, what findings mean, and how AI can help you read your own X-rays.",
    heading: "Understanding Dental X-Rays",
    intro: "Dental X-rays reveal what is happening below the surface. Cavities between teeth, bone loss, infections, and more. But reading them can feel confusing. We explain what common X-ray findings mean in simple terms.",
    dbCategory: "X-Rays",
    faqItems: [
      { q: "Are dental X-rays safe?", a: "Yes. Modern digital X-rays use very low radiation. A full set of dental X-rays exposes you to less radiation than a short airplane flight. Your dentist only takes them when needed." },
      { q: "Can DentaSmart read my X-rays?", a: "Yes. DentaSmart uses AI to analyze dental X-rays and highlight potential findings like cavities, bone loss, and infections. It gives you a starting point before your dentist visit." },
      { q: "How often should I get dental X-rays?", a: "Most adults need X-rays every 1 to 2 years. If you have active dental problems, your dentist may recommend them more often. It depends on your individual risk factors." },
    ],
  },
  costs: {
    title: "Dental Costs & Savings Guide - DentaSmart Oral Health Hub",
    description: "Understand dental treatment costs, insurance options, and ways to save money. Make informed decisions about your oral health spending.",
    heading: "Dental Costs & Savings",
    intro: "Dental care can be expensive, especially when problems are caught late. Understanding costs upfront helps you plan better and avoid surprises. We break down what common treatments cost and how to save.",
    dbCategory: "Costs",
    faqItems: [
      { q: "How much does a root canal cost?", a: "A root canal typically costs $700 to $1,500 depending on the tooth. Front teeth are less expensive than molars. With insurance, your out of pocket cost may be $200 to $500." },
      { q: "Is dental insurance worth it?", a: "It depends on your needs. If you only need cleanings, a discount plan may be cheaper. If you expect major work, insurance can save you thousands. DentaSmart helps you understand what you might need." },
      { q: "How can I save money on dental care?", a: "Catch problems early (that is the biggest saver), compare prices between dentists, ask about payment plans, look into dental schools for discounted care, and use DentaSmart to understand your treatment options before committing." },
    ],
  },
};

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
        keywords={`${meta.heading}, dental health, oral health, DentaSmart`}
      />
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">
        <div className="container relative z-10 px-4 mx-auto max-w-5xl pt-32 pb-16 md:pt-24">
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
                <Link key={article.id} href={`/oral-health-hub/${article.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-stone-50 rounded-2xl p-6 border border-stone-100 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer h-full"
                  >
                    {article.featuredImage && (
                      <img src={article.featuredImage} alt={article.title} className="w-full h-40 object-cover rounded-xl mb-4" />
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
              <Link href="/oral-health-hub">
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
          <h2 className="text-2xl font-medium text-black mb-4">Want personalized insights?</h2>
          <p className="text-stone-600 font-light mb-6">
            Reading is great, but nothing beats seeing your own oral health data. Upload a photo and get your personalized report in minutes.
          </p>
          <p className="text-xs text-stone-400 mb-4">
            Educational insights to help you understand your oral health and have better conversations with a licensed dentist.
          </p>
          <Button
            size="lg"
            className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 py-7 text-lg font-medium cursor-pointer"
            onClick={() => {
              trackEvent("cta_get_score_click", { source: `hub_${category}` });
              window.location.href = "/download";
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
