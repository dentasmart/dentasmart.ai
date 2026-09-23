import { describe, expect, it } from "vitest";
import { resolveSSRContent } from "./ssrContent";

const routeHeadings = {
  "/": "Understand your teeth before it costs you.",
  "/pricing/": "Know what's happening before it costs you.",
  "/download/": "Download DentaSmart on your phone.",
  "/best-ai-dental-apps/": "Best AI Dental Apps in 2026: How to Compare Without Guessing",
  "/free-ai-teeth-scanner/": "Start with a Free AI Mouth Photo Check No X-Ray Required",
  "/instant-scan/": "See what your dentist sees before your visit.",
  "/features/": "Everything you need to understand your oral health.",
  "/how-it-works/": "From \"I'm not sure\" to \"I've got a plan\" in 4 steps.",
  "/employers/": "Help employees navigate dental questions with clearer information.",
  "/compare/dentasmart-vs-chatgpt-dental/": "DentaSmart vs ChatGPT: How Purpose-Built and General AI Tools Differ",
  "/oral-health-hub/conditions/": "Something wrong with your teeth? Learn what to watch for.",
  "/oral-health-hub/symptoms/": "What is your mouth trying to tell you?",
  "/privacy-policy/": "Privacy Policy",
  "/terms-of-service/": "Terms and Conditions",
  "/vs/dental-com/": "DentaSmart vs Dental.com: How Should You Compare Them?",
  "/vs/dentistry-one/": "DentaSmart vs Dentistry.One: How Should You Compare Them?",
} as const;

describe("Phase 11 server-visible H1 fallbacks", () => {
  it.each(Object.entries(routeHeadings))("resolves one page-matched H1 for %s", async (route, heading) => {
    const content = await resolveSSRContent(route);

    expect(content?.html).toContain(`<h1>${heading}</h1>`);
    expect(content?.html.match(/<h1\b[^>]*>/g)).toHaveLength(1);
  });
});
