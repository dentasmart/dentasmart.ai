/**
 * The isolated CMS test publication reuses the public Condition page's
 * layout and brand utilities instead of inventing a second visual theme.
 * Medical-review attribution stays suppressed and test content stays noindex.
 * Rich HTML is converted to safe Markdown; no raw HTML is rendered.
 */
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import QuickAnswerBlock from "@/components/QuickAnswerBlock";
import { Link } from "wouter";
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import TurndownService from "turndown";
import type { CmsBlock, CmsDocument, CmsHeadingAlignment } from "@shared/cmsBlocks";
import { getCmsPublishedHeading, resolveCmsSocialImage } from "@shared/cmsBlocks";

const turndown = new TurndownService({ headingStyle: "atx", bulletListMarker: "-" });
// Turndown ordinarily drops rel and target from HTML anchors. Preserve the
// exact nofollow/new-tab flags in an internal Markdown title marker, then
// consume that marker during safe ReactMarkdown rendering below.
turndown.addRule("cms-link-attributes", {
  filter: (node) => node.nodeName === "A",
  replacement: (content, node) => {
    const anchor = node as HTMLAnchorElement;
    const href = anchor.getAttribute("href") || "";
    if (!safeLink(href)) return content;
    const nofollow = (anchor.getAttribute("rel") || "").split(/\s+/).includes("nofollow");
    const blank = anchor.getAttribute("target") === "_blank";
    const safeHref = href.replace(/\s/g, "%20").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/"/g, "%22").replace(/\u0027/g, "%27");
    const marker = "CMS_LINK_" + (nofollow ? "NF" : "FOLLOW") + "_" + (blank ? "BLANK" : "SAME");
    return "[" + content + "](" + safeHref + ' "' + marker + '")';
  },
});

function safeMediaUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = new URL(url, "https://dentasmart.ai");
    if (url.startsWith("/") && !url.startsWith("//")) return url;
    return (parsed.protocol === "https:" || parsed.protocol === "http:") ? url : undefined;
  } catch { return undefined; }
}

function safeLink(url: string): string | undefined {
  if (/^#[A-Za-z][\w:.-]*$/.test(url)) return url;
  if (url.startsWith("/") && !url.startsWith("//") && !url.includes("\\")) return url;
  try {
    const parsed = new URL(url);
    return (parsed.protocol === "https:" || parsed.protocol === "http:") ? url : undefined;
  } catch { return undefined; }
}

function headingAlignClass(value?: CmsHeadingAlignment): string {
  return value === "center" ? "text-center" : value === "right" ? "text-right" : "text-left";
}
function headingPositionClass(value?: CmsHeadingAlignment): string {
  return value === "center" ? "justify-center" : value === "right" ? "justify-end" : "justify-start";
}

function CmsViewBlock({ block, index, pageTitle }: { block: CmsBlock; index: number; pageTitle: string }) {
  if (block.type === "hero") return null;
  const HeadingTag = block.headingLevel ?? "h2";
  const sectionHeadingClass =
    block.headingLevel === "h4" ? "text-lg" :
    block.headingLevel === "h3" ? "text-xl" : "text-2xl";

  if (block.type === "quick_answer") {
    return <section className="py-8 bg-primary/5 border-b border-primary/10">
      <div className={"container px-4 mx-auto max-w-3xl " + (block.headingAlign === "center" ? "[&_h2]:text-center [&_h3]:text-center [&_h4]:text-center" : block.headingAlign === "right" ? "[&_h2]:text-right [&_h3]:text-right [&_h4]:text-right" : "[&_h2]:text-left [&_h3]:text-left [&_h4]:text-left")}>
        <QuickAnswerBlock
          question={block.heading?.trim() && block.heading !== "Quick Answer" ? block.heading : "What should I know about " + pageTitle + "?"}
          headingLevel={block.headingLevel}
          answer={block.answer}
          governance={{ intendedAudience: "People seeking general oral health education" }}
        />
      </div>
    </section>;
  }

  const bg = block.type === "urgent_care"
    ? "bg-red-50"
    : index % 2 === 0 ? "bg-stone-50" : "bg-white";
  const heading = "heading" in block ? block.heading : undefined;
  const title = heading ? <HeadingTag className={sectionHeadingClass + " font-medium text-black mb-6 " + headingAlignClass(block.headingAlign)}>{heading}</HeadingTag> : null;

  const content = (() => {
    switch (block.type) {
      case "urgent_care":
        return <div className="bg-white rounded-2xl p-6 border border-red-200">
          <div className={"flex items-center gap-3 mb-4 " + headingPositionClass(block.headingAlign)}>
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <HeadingTag className="text-xl font-medium text-red-700">{block.heading}</HeadingTag>
          </div>
          <p className="text-stone-600 font-light mb-4">
            This information does not replace professional dental care. Seek urgent help if:
          </p>
          <ul className="space-y-2">
            {block.items.map((item, i) => <li key={i} className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
              <span className="text-stone-700 font-light">{item}</span>
            </li>)}
          </ul>
        </div>;
      case "rich_text":
        return <div className="space-y-4 text-stone-700 font-light leading-relaxed [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-action [&_a]:underline">
          <ReactMarkdown skipHtml components={{
            a: ({ href, title, children }) => {
              const destination = safeLink(href || "");
              if (!destination) return <>{children}</>;
              const nofollow = title === "CMS_LINK_NF_BLANK" || title === "CMS_LINK_NF_SAME";
              const newTab = title === "CMS_LINK_NF_BLANK" || title === "CMS_LINK_FOLLOW_BLANK";
              return <a href={destination}
                target={newTab ? "_blank" : undefined}
                rel={[...(newTab ? ["noopener","noreferrer"] : []), ...(nofollow ? ["nofollow"] : [])].join(" ") || undefined}>{children}</a>;
            },
          }}>{turndown.turndown(block.html)}</ReactMarkdown>
        </div>;
      case "causes":
        return <div className="space-y-4">{block.items.map((cause, i) =>
          <div key={i} className="bg-white rounded-xl p-5 border border-stone-200">
            <h3 className={"font-medium text-black mb-1 " + headingAlignClass(cause.titleAlign)}>{cause.title}</h3>
            <p className="text-stone-600 font-light">{cause.description}</p>
          </div>)}</div>;
      case "symptoms":
        return <div className="space-y-3">{block.items.map((symptom, i) =>
          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-stone-50">
            <span className={"w-2 h-2 rounded-full mt-2 flex-shrink-0 " +
              (symptom.severity === "mild" ? "bg-yellow-400" :
                symptom.severity === "moderate" ? "bg-orange-400" : "bg-red-500")} />
            <div className="flex-1">
              <span className="text-stone-700 font-light">{symptom.text}</span>
              <span className={"ml-2 text-xs uppercase tracking-wider font-medium " +
                (symptom.severity === "mild" ? "text-yellow-800" :
                  symptom.severity === "moderate" ? "text-orange-800" : "text-red-600")}>
                {symptom.severity}
              </span>
            </div>
          </div>)}</div>;
      case "list":
        return block.heading.toLowerCase().includes("takeaway")
          ? <div className="space-y-3">{block.items.map((item, i) =>
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-action mt-0.5 flex-shrink-0" />
                <p className="text-stone-700 font-light">{item}</p>
              </div>)}</div>
          : <ul className="list-disc pl-6 space-y-2 text-stone-700 font-light">
              {block.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>;
      case "faq":
        return <div className="space-y-3">{block.items.map((faq, i) =>
          <details key={i} className="rounded-xl border border-stone-200 overflow-hidden bg-white group">
            <summary className="cursor-pointer p-5 font-medium text-black">{faq.question}</summary>
            <div className="px-5 pb-5 text-stone-600 font-light leading-relaxed">{faq.answer}</div>
          </details>)}</div>;
      case "related_links":
        return <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {block.links.map((link, i) => {
            const href = safeLink(link.url);
            return href ? <a key={i} href={href}
              className="bg-white border border-stone-200 rounded-xl p-4 text-action hover:underline font-medium">
              {link.title} <ArrowRight className="w-4 h-4 inline" />
            </a> : null;
          })}
        </div>;
      case "image": {
        const src = safeMediaUrl(block.image?.url);
        return src ? <figure>
          <img src={src} alt={block.image?.altText || ""} className="rounded-xl w-full h-auto" />
          {block.image?.caption && <figcaption className="text-sm text-stone-500 mt-2">{block.image.caption}</figcaption>}
        </figure> : null;
      }
      case "table":
        return <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-stone-700">
            <thead><tr>{block.headers.map((h, i) => <th key={i} className="p-3 border border-stone-200 bg-stone-50">{h}</th>)}</tr></thead>
            <tbody>{block.rows.map((row, i) => <tr key={i}>{row.map((value, j) =>
              <td key={j} className="p-3 border border-stone-200">{value}</td>)}</tr>)}</tbody>
          </table>
        </div>;
      case "cta": {
        const href = safeLink(block.buttonUrl);
        return <div className="rounded-2xl border border-stone-200 bg-primary/5 p-6 text-center space-y-4">
          <p className="text-stone-700 font-light">{block.description}</p>
          {href && <a href={href} className="inline-flex rounded-full bg-action hover:bg-action-hover px-6 py-3 text-action-foreground font-medium">
            {block.buttonLabel}
          </a>}
        </div>;
      }
    }
  })();

  return <section className={"py-8 " + bg}>
    <div className="container px-4 mx-auto max-w-3xl">
      {block.type !== "urgent_care" && title}
      {content}
    </div>
  </section>;
}

export default function CmsPublishedCondition({ document, mode = "test-publication" }: {
  document: CmsDocument;
  mode?: "test-publication" | "private-preview";
}) {
  const hero = document.blocks.find((block): block is Extract<CmsBlock, { type: "hero" }> => block.type === "hero");
  const heroImage = safeMediaUrl(document.images.hero?.url);
  const socialImage = safeMediaUrl(resolveCmsSocialImage(document.images)?.url);

  return <div className="min-h-screen flex flex-col bg-background font-sans text-black">
    <SEO title={document.seo.metaTitle || document.title}
      description={document.seo.metaDescription}
      ogTitle={document.seo.ogTitle} ogDescription={document.seo.ogDescription}
      twitterTitle={document.seo.twitterTitle} twitterDescription={document.seo.twitterDescription}
      ogImage={socialImage} noindex />
    <Navigation />
    <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">
      <div className="container relative z-10 px-4 mx-auto max-w-5xl pt-36 pb-12 md:pt-36">
        <Link href={mode === "private-preview"
          ? "/admin/content-workspace?hub=" + encodeURIComponent(document.hubId || "conditions")
          : "/conditions/"}>
          <span className="inline-flex items-center gap-2 text-action hover:underline mb-4 cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-1" /> {mode === "private-preview" ? "Back to CMS" : "All Conditions"}
          </span>
        </Link>
        <h1 className={"text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight !text-white mb-4 leading-tight " + headingAlignClass(hero?.headingAlign)}>
          {getCmsPublishedHeading(document)}
        </h1>
        {hero?.subheading && <p className={"text-xl text-stone-300 font-light leading-relaxed max-w-2xl " + headingAlignClass(hero.subheadingAlign) + (hero.subheadingAlign === "center" ? " mx-auto" : hero.subheadingAlign === "right" ? " ml-auto" : "")}>
          {hero.subheading}
        </p>}
        {heroImage && <img className="mt-8 w-full rounded-xl max-h-96 object-cover" src={heroImage} alt={document.images.hero?.altText || ""} />}
      </div>
    </section>
    <div className="border-b border-amber-300 bg-amber-50 text-center px-3 py-3 text-xs text-amber-900">
      {mode === "private-preview"
        ? "PRIVATE DRAFT PREVIEW: Admin-only saved revision. This is not a live publication and has not been clinically approved."
        : "TEST CMS PUBLICATION: Not clinically approved for patient use. Visible only in the isolated testing website."}
    </div>
    <main className="flex-1">
      {document.blocks.map((block, index) =>
        <CmsViewBlock key={block.id} block={block} index={index} pageTitle={document.title} />)}
      <div className="container px-4 mx-auto max-w-3xl py-6 text-sm text-stone-600">
        Educational content only; this is not a diagnosis or a replacement for professional dental care.
      </div>
    </main>
    <Footer />
  </div>;
}
