import { useEffect, useMemo, useState, type ComponentType, type MouseEvent } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  BookOpen,
  CircleHelp,
  HeartPulse,
  Loader2,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  WalletCards,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { trpc } from "@/lib/trpc";
import { trackConversionEvent } from "@/lib/analytics";
import {
  oralHealthHubArticlesAnchorEvent,
  oralHealthHubArticlesHref,
  oralHealthHubResourceGroups,
  oralHealthHubSearchTopics,
} from "@shared/oralHealthHub";

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

const resourceGroupIcons: Record<(typeof oralHealthHubResourceGroups)[number]["id"], ComponentType<{ className?: string }>> = {
  understand: Stethoscope,
  treatment: WalletCards,
  healthy: HeartPulse,
  help: CircleHelp,
};

const resourceGroupStyles: Record<(typeof oralHealthHubResourceGroups)[number]["id"], { icon: string; accent: string }> = {
  understand: { icon: "bg-primary/10 text-primary", accent: "border-primary/15 hover:border-primary/35" },
  treatment: { icon: "bg-action/10 text-action", accent: "border-action/15 hover:border-action/35" },
  healthy: { icon: "bg-teal-100 text-teal-700", accent: "border-teal-200 hover:border-teal-400" },
  help: { icon: "bg-sky-100 text-sky-700", accent: "border-sky-200 hover:border-sky-400" },
};

const articlePageSize = 9;

function ArticleThumbnail({ article }: { article: { heroImageUrl?: string | null; heroImageAlt?: string | null; title: string } }) {
  const [hasImageError, setHasImageError] = useState(false);

  if (!article.heroImageUrl || hasImageError) {
    return (
      <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-primary/10 via-teal-50 to-white text-primary">
        <BookOpen className="h-9 w-9" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={article.heroImageUrl}
      alt={article.heroImageAlt || article.title}
      className="aspect-[16/9] w-full object-cover"
      loading="lazy"
      onError={() => setHasImageError(true)}
    />
  );
}

export default function OralHealthHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [showAllArticles, setShowAllArticles] = useState(false);

  const { data: allCategories } = trpc.blog.listCategories.useQuery();
  const parentCategories = useMemo(() => allCategories?.filter((category) => !category.parentId) || [], [allCategories]);

  const categoryMap = useMemo(() => {
    const map = new Map<number, { name: string; color: string; parentId: number | null }>();
    allCategories?.forEach((category) => {
      map.set(category.id, {
        name: category.name,
        color: category.color || "stone",
        parentId: category.parentId,
      });
    });
    return map;
  }, [allCategories]);

  const filterCategories = useMemo(
    () => [{ label: "All", value: "All" }, ...parentCategories.map((category) => ({ label: category.name, value: String(category.id) }))],
    [parentCategories],
  );

  const { data, isLoading } = trpc.blog.list.useQuery({
    publishedOnly: true,
    limit: 200,
    category: selectedCategory !== "All" ? selectedCategory : undefined,
    search: searchQuery || undefined,
    cardView: true,
  });

  const selectedCategoryLabel = useMemo(() => {
    const found = filterCategories.find((category) => category.value === selectedCategory);
    return found?.label || "All";
  }, [filterCategories, selectedCategory]);

  const articles = useMemo(() => {
    const posts = data?.posts || [];
    if (!selectedSubcategory || !allCategories) return posts;
    const subcategory = allCategories.find((category) => category.name === selectedSubcategory && category.parentId);
    return subcategory ? posts.filter((post: any) => post.subcategoryId === subcategory.id) : posts;
  }, [allCategories, data, selectedSubcategory]);

  const subcategoriesForSelected = useMemo(() => {
    if (!allCategories || selectedCategory === "All") return [];
    const parentId = Number.parseInt(selectedCategory, 10);
    return Number.isNaN(parentId) ? [] : allCategories.filter((category) => category.parentId === parentId);
  }, [allCategories, selectedCategory]);

  const visibleArticles = showAllArticles ? articles : articles.slice(0, articlePageSize);
  const hasActiveFilters = selectedCategory !== "All" || selectedSubcategory || searchQuery;

  useEffect(() => {
    setShowAllArticles(false);
  }, [searchQuery, selectedCategory, selectedSubcategory]);

  useEffect(() => {
    let firstFrame = 0;
    let secondFrame = 0;

    const scrollToArticleAnchor = () => {
      if (window.location.hash !== "#articles") return;
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          document.getElementById("articles")?.scrollIntoView({ block: "start" });
        });
      });
    };

    window.addEventListener("hashchange", scrollToArticleAnchor);
    window.addEventListener("popstate", scrollToArticleAnchor);
    window.addEventListener(oralHealthHubArticlesAnchorEvent, scrollToArticleAnchor);
    scrollToArticleAnchor();

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.removeEventListener("hashchange", scrollToArticleAnchor);
      window.removeEventListener("popstate", scrollToArticleAnchor);
      window.removeEventListener(oralHealthHubArticlesAnchorEvent, scrollToArticleAnchor);
    };
  }, []);

  const scrollToArticles = () => {
    document.getElementById("articles")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleArticleAnchorNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    if (window.location.hash !== "#articles") {
      window.history.pushState(null, "", oralHealthHubArticlesHref);
    }
    window.dispatchEvent(new Event(oralHealthHubArticlesAnchorEvent));
  };

  const applyTopicSearch = (topic: string) => {
    setSearchQuery(topic);
    setSelectedCategory("All");
    setSelectedSubcategory(null);
    window.setTimeout(scrollToArticles, 0);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedSubcategory(null);
  };

  const getArticleCategoryDisplay = (article: any) => {
    const category = article.categoryId ? categoryMap.get(article.categoryId) : null;
    const subcategory = article.subcategoryId ? categoryMap.get(article.subcategoryId) : null;
    if (!category) {
      return <Badge variant="secondary" className="border-0 bg-stone-100 text-stone-600">{article.category || "Oral health"}</Badge>;
    }
    const categoryColor = COLOR_MAP[category.color] || COLOR_MAP.stone;
    const subcategoryColor = subcategory ? COLOR_MAP[subcategory.color] || categoryColor : null;
    return (
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge className={`${categoryColor.bg} ${categoryColor.text} border-0 text-xs hover:opacity-80`}>{category.name}</Badge>
        {subcategory && subcategoryColor && (
          <Badge className={`${subcategoryColor.bg} ${subcategoryColor.text} border-0 text-[10px] hover:opacity-80`}>{subcategory.name}</Badge>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white font-sans text-stone-950">
      <SEO
        title="Oral Health Hub: Conditions, Symptoms & Guides"
        description="Explore dental conditions, symptoms, treatments, costs, emergencies, and prevention guides. Find clear oral health information in one place."
        canonical="https://dentasmart.ai/oral-health-hub"
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Oral Health Hub", url: "/oral-health-hub" },
          ]),
          webPageSchema({
            name: "Oral Health Hub: Conditions, Symptoms & Guides",
            description: "Explore dental conditions, symptoms, treatments, costs, emergencies, and prevention guides. Find clear oral health information in one place.",
            url: "/oral-health-hub",
          }),
        ]}
      />
      <Navigation />

      <main>
        <section className="relative overflow-hidden border-b border-primary/10 bg-gradient-to-br from-white via-primary/[0.04] to-teal-50/60 pt-28 pb-14 md:pt-36 md:pb-20">
          <div className="pointer-events-none absolute -top-32 right-[-5rem] h-80 w-80 rounded-full bg-action/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-[-6rem] h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="container relative mx-auto max-w-7xl px-4">
            <div className="grid items-center gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
              <div className="max-w-3xl">
                <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm ring-1 ring-primary/10">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  DentaSmart Oral Health Hub
                </p>
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-stone-950 md:text-5xl lg:text-6xl">
                  Clear Answers for Your Oral Health
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700 md:text-xl">
                  Explore easy-to-understand guides on dental conditions, symptoms, treatments, costs, and prevention. Find useful information, understand your options, and prepare better questions for your dentist.
                </p>

                <form
                  className="mt-8 max-w-2xl"
                  onSubmit={(event) => {
                    event.preventDefault();
                    scrollToArticles();
                  }}
                >
                  <label htmlFor="hub-topic-search" className="sr-only">Search the Oral Health Hub</label>
                  <div className="flex flex-col gap-3 rounded-2xl bg-white p-2 shadow-xl shadow-primary/10 ring-1 ring-stone-200 sm:flex-row">
                    <div className="relative min-w-0 flex-1">
                      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" aria-hidden="true" />
                      <Input
                        id="hub-topic-search"
                        type="search"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Search dental topics, symptoms, or treatments..."
                        className="h-13 border-0 bg-transparent pl-12 text-base shadow-none focus-visible:ring-2 focus-visible:ring-primary"
                      />
                    </div>
                    <Button type="submit" className="h-12 rounded-xl bg-action px-6 text-action-foreground hover:bg-action-hover">
                      Search
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </form>

                <div className="mt-5 flex flex-wrap items-center gap-2" aria-label="Popular search topics">
                  <span className="mr-1 text-sm font-medium text-stone-600">Popular:</span>
                  {oralHealthHubSearchTopics.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      className="min-h-10 rounded-full border border-primary/15 bg-white px-3 text-sm font-medium text-stone-700 transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      onClick={() => applyTopicSearch(topic)}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                <div className="absolute -inset-4 rounded-[2rem] bg-primary/10 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-2xl shadow-primary/15 ring-1 ring-white/80">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet="/images/optimized/QUJzfPwTjdiBdwFs-400.webp 400w, /images/optimized/QUJzfPwTjdiBdwFs-800.webp 800w, /images/optimized/QUJzfPwTjdiBdwFs-1600.webp 1600w"
                      sizes="(max-width: 1023px) 92vw, 42vw"
                    />
                    <img
                      src="/images/optimized/QUJzfPwTjdiBdwFs-800.webp"
                      alt="Dental professional discussing oral health information with a patient"
                      className="aspect-[4/3] w-full rounded-[1.45rem] object-cover object-right"
                      width="1600"
                      height="893"
                    />
                  </picture>
                  <div className="absolute bottom-7 left-7 right-7 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur-sm">
                    <p className="text-sm font-semibold text-stone-950">Your Personal AI Dentist in Your Pocket</p>
                    <p className="mt-1 text-sm leading-5 text-stone-600">Educational information to help you prepare for professional care.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20" aria-labelledby="resource-directory-heading">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Resource directory</p>
              <h2 id="resource-directory-heading" className="mt-3 text-3xl font-semibold tracking-tight text-stone-950 md:text-4xl">Explore Oral Health Resources</h2>
              <p className="mt-4 text-lg leading-8 text-stone-600">Find the information you need, from understanding a dental concern to comparing treatment options.</p>
            </div>

            <div className="oral-health-resource-grid mt-10 grid items-start gap-4 md:grid-cols-2">
              {oralHealthHubResourceGroups.map((group) => {
                const Icon = resourceGroupIcons[group.id];
                const style = resourceGroupStyles[group.id];
                return (
                  <section key={group.id} className={`rounded-3xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-lg ${style.accent}`} aria-labelledby={`${group.id}-resources-heading`}>
                    <div className="flex items-start gap-3">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${style.icon}`}>
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 id={`${group.id}-resources-heading`} className="text-xl font-semibold text-stone-950">{group.title}</h3>
                        <p className="mt-1 leading-6 text-stone-600">{group.description}</p>
                      </div>
                    </div>
                    <ul className="mt-5 space-y-1" aria-label={`${group.title} links`}>
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={link.href === oralHealthHubArticlesHref ? handleArticleAnchorNavigation : undefined}
                            className="group flex min-h-14 items-center justify-between gap-4 rounded-xl px-3 py-2 transition-colors hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          >
                            <span>
                              <span className="block font-medium text-stone-900 group-hover:text-primary">{link.title}</span>
                              <span className="mt-0.5 block text-sm leading-5 text-stone-600">{link.description}</span>
                            </span>
                            <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          </div>
        </section>

        <section id="articles" className="scroll-mt-24 py-16 md:py-20" aria-labelledby="articles-heading">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Article library</p>
              <h2 id="articles-heading" className="mt-3 text-3xl font-semibold tracking-tight text-stone-950 md:text-4xl">Latest Oral Health Articles</h2>
              <p className="mt-4 text-lg leading-8 text-stone-600">Explore practical dental education articles covering symptoms, treatments, prevention, and more.</p>
            </div>

            <div className="mt-8 rounded-2xl border border-stone-200 bg-stone-50 p-4 md:p-5">
              <div className="flex flex-wrap gap-2" aria-label="Filter articles by category">
                {filterCategories.map((category) => (
                  <Button
                    key={category.value}
                    type="button"
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    className={`min-h-10 rounded-full px-4 ${
                      selectedCategory === category.value
                        ? "border-action bg-action text-action-foreground hover:bg-action-hover"
                        : "border-stone-200 bg-white text-stone-700 hover:bg-primary/5 hover:text-primary"
                    }`}
                    onClick={() => {
                      setSelectedCategory(category.value);
                      setSelectedSubcategory(null);
                    }}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>

              {subcategoriesForSelected.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 border-t border-stone-200 pt-3" aria-label="Filter articles by subcategory">
                  <Button
                    type="button"
                    variant={!selectedSubcategory ? "default" : "outline"}
                    size="sm"
                    className={`rounded-full ${!selectedSubcategory ? "border-stone-700 bg-stone-700 text-white hover:bg-stone-600" : "border-stone-200 bg-white text-stone-600"}`}
                    onClick={() => setSelectedSubcategory(null)}
                  >
                    All {selectedCategoryLabel}
                  </Button>
                  {subcategoriesForSelected.map((subcategory) => {
                    const isActive = selectedSubcategory === subcategory.name;
                    const color = COLOR_MAP[subcategory.color || "stone"] || COLOR_MAP.stone;
                    return (
                      <Button
                        key={subcategory.id}
                        type="button"
                        variant={isActive ? "default" : "outline"}
                        size="sm"
                        className={`rounded-full ${isActive ? `${color.activeBg} border-transparent text-white` : `${color.bg} ${color.text} border-transparent hover:opacity-80`}`}
                        onClick={() => setSelectedSubcategory(isActive ? null : subcategory.name)}
                      >
                        {subcategory.name}
                      </Button>
                    );
                  })}
                </div>
              )}

              {hasActiveFilters && (
                <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-stone-600">
                  <span>Showing:</span>
                  {searchQuery && <Badge className="border-0 bg-primary/10 text-primary">Search: {searchQuery}</Badge>}
                  {selectedCategory !== "All" && <Badge className="border-0 bg-primary/10 text-primary">{selectedCategoryLabel}</Badge>}
                  {selectedSubcategory && <Badge className="border-0 bg-primary/5 text-primary">{selectedSubcategory}</Badge>}
                  <button type="button" onClick={clearFilters} className="min-h-10 px-2 font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Clear filters</button>
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20 text-stone-600" role="status">
                <Loader2 className="h-7 w-7 animate-spin text-primary" aria-hidden="true" />
                <span className="ml-3">Loading articles...</span>
              </div>
            ) : articles.length > 0 ? (
              <>
                <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {visibleArticles.map((article: any) => (
                    <Link key={article.id} href={`/oral-health-hub/${article.slug}/`} className="group flex min-h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                      <ArticleThumbnail article={article} />
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-start justify-between gap-3">
                          {getArticleCategoryDisplay(article)}
                          {article.readTime && <span className="shrink-0 text-xs font-medium text-stone-400">{article.readTime}</span>}
                        </div>
                        <h3 className="mt-4 text-xl font-semibold leading-7 text-stone-900 group-hover:text-primary">{article.title}</h3>
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-600">{article.problemContent || article.metaDescription}</p>
                        <div className="mt-5 flex items-center justify-between gap-3 border-t border-stone-100 pt-4">
                          <span className="text-xs text-stone-400">
                            {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
                          </span>
                          <span className="inline-flex items-center text-sm font-semibold text-primary">Read article <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                {articles.length > articlePageSize && (
                  <div className="mt-10 flex justify-center">
                    <Button type="button" variant="outline" className="min-h-12 rounded-full border-primary/20 bg-white px-6 text-primary hover:bg-primary/5" onClick={() => setShowAllArticles((current) => !current)}>
                      {showAllArticles ? "Show fewer articles" : `View all ${articles.length} articles`}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-8 rounded-2xl border border-stone-200 bg-stone-50 px-6 py-16 text-center">
                <h3 className="text-xl font-semibold text-stone-900">No articles found</h3>
                <p className="mt-2 text-stone-600">Try another search or browse a different category.</p>
                <Button type="button" variant="outline" className="mt-5" onClick={clearFilters}>Clear all filters</Button>
              </div>
            )}
          </div>
        </section>

        <section className="border-y border-stone-100 bg-primary/[0.035] py-16 md:py-20" aria-labelledby="start-heading">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Find your starting point</p>
              <h2 id="start-heading" className="mt-3 text-3xl font-semibold tracking-tight text-stone-950 md:text-4xl">Not Sure Where to Start?</h2>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "Have a dental symptom?",
                  description: "Explore the Symptoms Guide to learn what different symptoms may indicate and when professional evaluation is important.",
                  cta: "Explore Symptoms",
                  href: "/oral-health-hub/symptoms/",
                  icon: Stethoscope,
                },
                {
                  title: "Want to understand a dental condition?",
                  description: "Browse condition guides covering causes, symptoms, treatment information, and questions for your dentist.",
                  cta: "Explore Conditions",
                  href: "/oral-health-hub/conditions/",
                  icon: ShieldCheck,
                },
                {
                  title: "Considering dental treatment?",
                  description: "Explore treatment guides, cost information, and comparisons before discussing your options with a dentist.",
                  cta: "Explore Treatments",
                  href: "/treatments/",
                  icon: BookOpen,
                },
              ].map((card) => {
                const Icon = card.icon;
                return (
                  <article key={card.href} className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                    <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
                    <h3 className="mt-5 text-xl font-semibold text-stone-950">{card.title}</h3>
                    <p className="mt-3 flex-1 leading-6 text-stone-600">{card.description}</p>
                    <Link href={card.href} className="mt-6 inline-flex min-h-11 items-center font-semibold text-primary hover:text-action focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                      {card.cta}
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-stone-950 py-16 text-white md:py-20" aria-labelledby="dentasmart-cta-heading">
          <div className="container mx-auto max-w-5xl px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">DentaSmart</p>
            <h2 id="dentasmart-cta-heading" className="mx-auto mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-4xl">Take the Next Step Toward Understanding Your Oral Health</h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-stone-300">DentaSmart helps you explore educational insights from supported dental photos and X-rays, understand dental information, and prepare questions for professional care.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/download/"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-action px-6 font-semibold text-action-foreground shadow-lg transition-colors hover:bg-action-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                onClick={() => trackConversionEvent("download_hub_open", {
                  cta_id: "oral_health_hub_free_quick_check",
                  surface: "mid_content",
                  intent: "quick_check",
                  destination_type: "internal_route",
                  destination_path: "/download/",
                })}
              >
                Start Free Quick Check
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/how-it-works/" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                Explore How It Works
              </Link>
            </div>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-stone-400">DentaSmart provides educational information and does not diagnose conditions or replace professional care.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
