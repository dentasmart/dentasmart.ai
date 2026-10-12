import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  oralHealthHubPopularTopics,
  oralHealthHubResourceGroups,
} from "../shared/oralHealthHub";
import { resolveMetaTags } from "./metaTags";
import { resolveSSRContent } from "./ssrContent";

const pageSource = readFileSync(resolve(process.cwd(), "client/src/pages/OralHealthHub.tsx"), "utf8");

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

  it("keeps the dynamic published-article browser, search, filters, and view-all discoverability", () => {
    expect(pageSource).toContain("trpc.blog.listCategories.useQuery");
    expect(pageSource).toContain("trpc.blog.list.useQuery");
    expect(pageSource).toContain("publishedOnly: true");
    expect(pageSource).toContain("limit: 200");
    expect(pageSource).toContain("search: searchQuery || undefined");
    expect(pageSource).toContain("selectedCategory");
    expect(pageSource).toContain("selectedSubcategory");
    expect(pageSource).toContain("View all ${articles.length} articles");
    expect(pageSource).toContain("Search dental topics, symptoms, or treatments...");
  });

  it("keeps unique popular-topic routes and the requested DentaSmart action paths", () => {
    expect(new Set(oralHealthHubPopularTopics.map((topic) => topic.href)).size).toBe(oralHealthHubPopularTopics.length);
    expect(oralHealthHubPopularTopics.map((topic) => topic.href)).toContain("/oral-health-hub/buck-teeth/");
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
