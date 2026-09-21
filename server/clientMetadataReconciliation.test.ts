import { describe, expect, it } from "vitest";
import { reconcileCanonicalAndOpenGraphUrl } from "../client/src/components/SEO";

type FakeElement = {
  attributes: Map<string, string>;
  parent: FakeDocument | null;
  hasAttribute(name: string): boolean;
  setAttribute(name: string, value: string): void;
  getAttribute(name: string): string | null;
  remove(): void;
};

class FakeDocument {
  elements: FakeElement[] = [];

  head = {
    appendChild: (element: FakeElement) => {
      element.parent = this;
      this.elements.push(element);
      return element;
    },
  };

  createElement(): FakeElement {
    const element: FakeElement = {
      attributes: new Map(),
      parent: null,
      hasAttribute(name) {
        return this.attributes.has(name);
      },
      setAttribute(name, value) {
        this.attributes.set(name, value);
      },
      getAttribute(name) {
        return this.attributes.get(name) ?? null;
      },
      remove() {
        if (!this.parent) return;
        this.parent.elements = this.parent.elements.filter((candidate) => candidate !== this);
        this.parent = null;
      },
    };
    return element;
  }

  add(tag: "link" | "meta", attributes: Record<string, string>): FakeElement {
    const element = this.createElement();
    element.setAttribute("tag", tag);
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
    this.head.appendChild(element);
    return element;
  }

  querySelectorAll<T extends FakeElement>(selector: string): NodeListOf<T> {
    const matches = this.elements.filter((element) => {
      const tag = element.getAttribute("tag");
      if (selector === 'link[rel="canonical"]') return tag === "link" && element.getAttribute("rel") === "canonical";
      if (selector === 'meta[property="og:url"]') return tag === "meta" && element.getAttribute("property") === "og:url";
      return false;
    });
    return matches as unknown as NodeListOf<T>;
  }
}

const articleCanonical = "https://dentasmart.ai/oral-health-hub/example-post/";

describe("client canonical reconciliation", () => {
  it("replaces retained Hub metadata with one current article canonical and og:url", () => {
    const documentRef = new FakeDocument();
    documentRef.add("link", { rel: "canonical", href: "https://dentasmart.ai/oral-health-hub/" });
    documentRef.add("meta", { property: "og:url", content: "https://dentasmart.ai/oral-health-hub/" });
    documentRef.add("link", { rel: "canonical", href: articleCanonical, "data-loc": "client/src/components/SEO.tsx:88" });

    reconcileCanonicalAndOpenGraphUrl(documentRef as unknown as Document, articleCanonical);

    const canonicals = Array.from(documentRef.querySelectorAll<FakeElement>('link[rel="canonical"]'));
    const ogUrls = Array.from(documentRef.querySelectorAll<FakeElement>('meta[property="og:url"]'));
    expect(canonicals).toHaveLength(1);
    expect(ogUrls).toHaveLength(1);
    expect(canonicals[0].getAttribute("href")).toBe(articleCanonical);
    expect(ogUrls[0].getAttribute("content")).toBe(articleCanonical);
  });

  it("removes canonical and og:url metadata for noindex routes", () => {
    const documentRef = new FakeDocument();
    documentRef.add("link", { rel: "canonical", href: articleCanonical });
    documentRef.add("meta", { property: "og:url", content: articleCanonical });

    reconcileCanonicalAndOpenGraphUrl(documentRef as unknown as Document, undefined, true);

    expect(documentRef.querySelectorAll<FakeElement>('link[rel="canonical"]')).toHaveLength(0);
    expect(documentRef.querySelectorAll<FakeElement>('meta[property="og:url"]')).toHaveLength(0);
  });
});
