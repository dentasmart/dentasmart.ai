import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  oralHealthHubArticlesAnchorEvent,
  oralHealthHubArticlesHref,
  oralHealthHubResourceGroups,
} from "../shared/oralHealthHub";
import { resolveMetaTags } from "./metaTags";
import { resolveSSRContent } from "./ssrContent";

const pageSource = readFileSync(resolve(process.cwd(), "client/src/pages/OralHealthHub.tsx"), "utf8");
const blogDbSource = readFileSync(resolve(process.cwd(), "server/blogDb.ts"), "utf8");
const stylesheet = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");

describe("Oral Health Hub resource directory", () => {
  it("keeps exactly four resource groups and all 15 unique verified Learn destinations", () => {
    expect(oralHealthHubResourceGroups).toHaveLength(4);
    expect(oralHealthHubResourceGroups.map((group) => group.title)).toEqual([
      "Understand Your Mouth",
      "Treatment & Cost",
      "Stay Healthy",
      "Get Help",
    ]);

    const links = oralHealthHubResourceGroups.flatMap((group) => group.links);
    expect(links).toHaveLength(15);
    expect(new Set(links.map((link) => link.title)).size).toBe(15);
    expect(new Set(links.map((link) => link.href)).size).toBe(15);
    expect(links.map((link) => [link.title, link.href])).toEqual([
      ["Conditions Guide", "/oral-health-hub/conditions/"],
      ["Symptoms Guide", "/oral-health-hub/symptoms/"],
      ["Life Stages", "/life-stages/"],
      ["Symptom Checker", "/symptom-quiz/"],
      ["Treatment Guides", "/treatments/"],
      ["Dental Costs", "/dental-costs/"],
      ["Comparison Guides", "/comparisons/"],
      ["Prevention Hub", "/oral-health-hub/prevention/"],
      ["Lifestyle & Oral Health", "/lifestyle/"],
      ["Dental Guides", "/guides/"],
      ["Blog", "/oral-health-hub/#articles"],
      ["Dental Emergencies", "/dental-emergencies/"],
      ["Affordability Guide", "/oral-health-hub/affordability/"],
      ["Second Opinion Hub", "/oral-health-hub/second-opinion/"],
      ["FAQs", "/faqs/"],
    ]);
  });

  it("uses compact responsive resource columns without hiding link details", () => {
    expect(pageSource).toContain('oral-health-resource-grid mt-10 grid gap-4 md:grid-cols-2');
    expect(pageSource).not.toContain('oral-health-resource-grid mt-10 grid items-start gap-4 md:grid-cols-2');
    expect(stylesheet).toContain('@media (min-width: 1440px)');
    expect(stylesheet).toContain('.oral-health-resource-grid {\n    grid-template-columns: repeat(4, minmax(0, 1fr));');
    expect(pageSource).toContain('rounded-3xl border bg-white p-5');
    expect(pageSource).toContain('className="mt-5 space-y-1" aria-label={`${group.title} links`}');
    expect(pageSource).toContain('link.description');
    expect(pageSource).toContain('<ArrowRight className="h-4 w-4 shrink-0');
  });

  it("keeps the dynamic published-article browser, search, filters, and view-all discoverability", () => {
    expect(pageSource).toContain("trpc.blog.listCategories.useQuery");
    expect(pageSource).toContain("trpc.blog.list.useQuery");
    expect(pageSource).toContain("publishedOnly: true");
    expect(pageSource).toContain("limit: 200");
    expect(pageSource).toContain("cardView: true");
    expect(pageSource).toContain("search: searchQuery || undefined");
    expect(pageSource).toContain("selectedCategory");
    expect(pageSource).toContain("selectedSubcategory");
    expect(pageSource).toContain("View all ${articles.length} articles");
    expect(pageSource).toContain("Search dental topics, symptoms, or treatments...");
  });

  it("uses a declared hero or only a genuine top-of-article image for Hub cards", () => {
    expect(pageSource).toContain("article.heroImageUrl");
    expect(pageSource).toContain("article.heroImageAlt || article.title");
    expect(pageSource).toContain("onError={() => setHasImageError(true)}");
    expect(pageSource).toContain("loading=\"lazy\"");
    const cardSelection = blogDbSource.slice(blogDbSource.indexOf("if (cardView)"), blogDbSource.indexOf("if (await hasReviewerMetadataColumns"));
    expect(cardSelection).toContain("featuredImage: blogPosts.featuredImage");
    expect(cardSelection).toContain("case when nullif(trim(${blogPosts.featuredImage}), '') is null then left(${blogPosts.bodyHtml}, 2048) else null end");
    expect(cardSelection).toContain("selectBlogCardHero(post)");
    expect(cardSelection).not.toContain(".select()");
    expect(cardSelection).not.toContain("thumbnailUrl");
  });

  it("keeps the stable articles anchor while removing the duplicate popular-topics grid", () => {
    expect(oralHealthHubArticlesHref).toBe("/oral-health-hub/#articles");
    expect(pageSource).toContain('id="articles"');
    expect(pageSource).toContain("scroll-mt-24");
    expect(pageSource).toContain('window.addEventListener("hashchange", scrollToArticleAnchor)');
    expect(pageSource).toContain('window.addEventListener("popstate", scrollToArticleAnchor)');
    expect(pageSource).toContain("window.addEventListener(oralHealthHubArticlesAnchorEvent, scrollToArticleAnchor)");
    expect(pageSource).toContain("window.dispatchEvent(new Event(oralHealthHubArticlesAnchorEvent));");
    expect(pageSource).not.toContain("Explore Popular Dental Topics");
    expect(pageSource).not.toContain("popular-topics-heading");
    expect(pageSource).not.toContain("oralHealthHubPopularTopics");
    expect(oralHealthHubArticlesAnchorEvent).toBe("dentasmart:oral-health-hub-articles");
  });

  it("keeps the requested DentaSmart action paths", () => {
    expect(pageSource).toContain('href="/download/"');
    expect(pageSource).toContain('href="/how-it-works/"');
    expect(pageSource).toContain("Start Free Quick Check");
    expect(pageSource).toContain("Explore How It Works");
  });

  it("keeps the final dark-surface CTA heading explicitly white", () => {
    expect(pageSource).toMatch(/id="dentasmart-cta-heading" className="[^"]*\btext-white\b/);
  });

  it("keeps server-visible Hub links and aligned indexable metadata", async () => {
    const content = await resolveSSRContent("/oral-health-hub/");
    expect(content?.html).toContain("<h1>Clear Answers for Your Oral Health</h1>");
    expect(content?.html).not.toContain("Explore Popular Dental Topics");
    for (const link of oralHealthHubResourceGroups.flatMap((group) => group.links)) {
      expect(content?.html).toContain(`href="${link.href}"`);
      expect(content?.html).toContain(`>${link.title.replace(/&/g, "&amp;")}</a>`);
    }

    const meta = await resolveMetaTags("/oral-health-hub/");
    expect(meta).toMatchObject({
      title: "Oral Health Hub: Conditions, Symptoms & Guides",
      description: "Explore dental conditions, symptoms, treatments, costs, emergencies, and prevention guides. Find clear oral health information in one place.",
      canonical: "https://dentasmart.ai/oral-health-hub/",
    });
  });
});
