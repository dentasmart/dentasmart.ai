import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import { app, brand, company, pricing } from "@shared/facts";
import { Link } from "wouter";

export type GovernancePageKind = "editorial" | "corrections" | "ai-use" | "product-facts";

type GovernanceSection = {
  title: string;
  paragraphs: string[];
};

const pageDetails: Record<Exclude<GovernancePageKind, "product-facts">, {
  title: string;
  description: string;
  heading: string;
  introduction: string;
  sections: GovernanceSection[];
}> = {
  editorial: {
    title: "Editorial Policy | DentaSmart",
    description: "Learn how DentaSmart writes and updates oral health education, uses sources, handles corrections, and uses AI drafting tools.",
    heading: "Editorial Policy",
    introduction: "DentaSmart shares plain-language oral health education. It can help you prepare for a dental visit. It does not replace diagnosis or treatment from a licensed professional.",
    sections: [
      {
        title: "Our purpose",
        paragraphs: [
          "We explain common mouth health topics, treatment questions, costs, symptoms, and prevention. We help readers understand a topic and prepare questions for a dental professional.",
          "Our website does not diagnose a condition or choose treatment for a person.",
        ],
      },
      {
        title: "Sources and transparency",
        paragraphs: [
          "When a page has sources, we name the source and publisher. Some older source lists stay online while we document their status. A source list is not clinical approval of a page.",
          "We do not present DentaSmart internal links as external medical evidence.",
        ],
      },
      {
        title: "Authors, reviewers, and updates",
        paragraphs: [
          "DentaSmart may be named as the organization author. We show a reviewer or review date only when page records support it.",
          "We may update content when important information changes. We do not publish a fixed review schedule.",
        ],
      },
      {
        title: "AI assistance and corrections",
        paragraphs: [
          "AI tools may help draft content. AI help is not clinical review. AI blog drafts need a person to publish them.",
          "To report a suspected content error, contact DentaSmart Support. See our Corrections Policy for more information.",
        ],
      },
    ],
  },
  corrections: {
    title: "Corrections Policy | DentaSmart",
    description: "Learn how to report a possible DentaSmart content error and how we handle material website corrections.",
    heading: "Corrections Policy",
    introduction: "Tell us if you see a possible factual or clarity issue. Website content is educational. It does not replace diagnosis or treatment from a licensed professional.",
    sections: [
      {
        title: "How to report a concern",
        paragraphs: [
          "Contact DentaSmart Support. Include the page URL, the information you question, and any helpful context. Use the support address below.",
        ],
      },
      {
        title: "How we handle reports",
        paragraphs: [
          "We may review the relevant content. We may update a material error when a correction is needed. We do not publish a fixed response time.",
          "A person must publish content. That step alone does not mean a page had clinical review.",
        ],
      },
      {
        title: "Dates and review labels",
        paragraphs: [
          "A modified date may change after a material update. A clinical review label does not carry over after a material clinical change.",
          "We show review labels and dates only when page records support them.",
        ],
      },
    ],
  },
  "ai-use": {
    title: "AI Use Disclosure | DentaSmart",
    description: "Learn how DentaSmart uses AI in its product and writing workflow, with clear education and professional-care boundaries.",
    heading: "AI Use Disclosure",
    introduction: "DentaSmart uses AI in parts of its product and writing workflow. AI help does not equal clinical review.",
    sections: [
      {
        title: "Product and editorial use",
        paragraphs: [
          "The DentaSmart product uses AI to organize supported information and give educational outputs. It does not replace diagnosis or treatment from a licensed professional.",
          "AI tools may help draft content. New blog content is saved as a draft. It is not published automatically.",
        ],
      },
      {
        title: "Review and transparency",
        paragraphs: [
          "AI use does not create a clinical review label. We show review information only when page records support it.",
          "We do not publish a reviewer profile until identity, credentials, role, and public permission are verified.",
        ],
      },
    ],
  },
};

function PolicyNavigation() {
  return (
    <nav aria-label="Governance resources" className="mt-10 border-t border-stone-200 pt-6">
      <p className="text-sm font-medium text-stone-700 mb-3">Related resources</p>
      <ul className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
        <li><Link className="text-action hover:underline" href="/editorial-policy">Editorial Policy</Link></li>
        <li><Link className="text-action hover:underline" href="/corrections-policy">Corrections Policy</Link></li>
        <li><Link className="text-action hover:underline" href="/ai-use-disclosure">AI Use Disclosure</Link></li>
        <li><Link className="text-action hover:underline" href="/product-facts">Product Facts</Link></li>
      </ul>
    </nav>
  );
}

function ProductFactsPage() {
  const title = "Product Facts | DentaSmart";
  const description = "Review verified DentaSmart availability, plans, prices, store links, free-preview details, and educational-use boundaries.";
  const canonical = "https://dentasmart.ai/product-facts";

  return (
    <div className="min-h-screen flex flex-col bg-background text-black">
      <SEO title={title} description={description} canonical={canonical} />
      <Navigation />
      <main className="flex-1 pt-32 pb-16">
        <article className="container max-w-4xl px-4 mx-auto">
          <p className="text-sm font-medium text-action uppercase tracking-wide mb-3">DentaSmart governance resource</p>
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-black mb-5">Product Facts</h1>
          <p className="text-lg text-stone-700 leading-relaxed max-w-3xl">This page lists verified DentaSmart product information. It does not list ratings, user counts, savings, accuracy, regulatory claims, or unverified review claims.</p>

          <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 md:p-8">
            <h2 className="text-2xl font-medium text-black mb-4">Product and availability</h2>
            <dl className="grid gap-4 sm:grid-cols-2 text-stone-700">
              <div><dt className="font-medium text-black">Product</dt><dd>{brand.productName}</dd></div>
              <div><dt className="font-medium text-black">Tagline</dt><dd>{brand.tagline}</dd></div>
              <div><dt className="font-medium text-black">iOS</dt><dd>Available on the App Store.</dd></div>
              <div><dt className="font-medium text-black">Android</dt><dd>Available on Google Play.</dd></div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-4 text-sm">
              <a className="text-action hover:underline" href={app.iosUrl} target="_blank" rel="noopener noreferrer">Download on the App Store</a>
              <a className="text-action hover:underline" href={app.androidUrl} target="_blank" rel="noopener noreferrer">Get it on Google Play</a>
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 md:p-8">
            <h2 className="text-2xl font-medium text-black mb-4">Plans and pricing</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead><tr className="border-b border-stone-200 text-stone-600"><th className="py-3 pr-4 font-medium">Service</th><th className="py-3 font-medium">Verified price</th></tr></thead>
                <tbody className="text-stone-700">
                  <tr className="border-b border-stone-100"><td className="py-3 pr-4">{pricing.quickCheck.name}</td><td className="py-3">{pricing.quickCheck.priceFormatted} {pricing.quickCheck.billingLabel}</td></tr>
                  <tr className="border-b border-stone-100"><td className="py-3 pr-4">{pricing.secondOpinion.name}</td><td className="py-3">{pricing.secondOpinion.priceFormatted} {pricing.secondOpinion.billingLabel}</td></tr>
                  <tr className="border-b border-stone-100"><td className="py-3 pr-4">Complete Care, individual</td><td className="py-3">{pricing.completeCareIndividual.priceFormatted}{pricing.completeCareIndividual.billingLabel}</td></tr>
                  <tr className="border-b border-stone-100"><td className="py-3 pr-4">Complete Care, family</td><td className="py-3">{pricing.completeCareFamily.priceFormatted}{pricing.completeCareFamily.billingLabel}, up to {pricing.completeCareFamily.maxMembers} family members</td></tr>
                  <tr><td className="py-3 pr-4">Additional family member</td><td className="py-3">{pricing.additionalFamilyMember.priceFormatted}{pricing.additionalFamilyMember.billingLabel}</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-stone-700 leading-relaxed">The app is free to download. A limited free scan preview is not a paid Quick Check, Second Opinion, or Complete Care service. Review plan details before purchase.</p>
            <Link className="inline-block mt-4 text-action hover:underline" href="/pricing">View plan details</Link>
          </section>

          <section className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 md:p-8">
            <h2 className="text-2xl font-medium text-black mb-3">Educational-use boundary</h2>
            <p className="text-stone-700 leading-relaxed">DentaSmart organizes supported information and gives educational outputs. It does not diagnose conditions. It does not replace care from a licensed dental professional.</p>
          </section>
          <PolicyNavigation />
        </article>
      </main>
      <Footer />
    </div>
  );
}

export default function GovernancePage({ kind }: { kind: GovernancePageKind }) {
  if (kind === "product-facts") return <ProductFactsPage />;

  const page = pageDetails[kind];
  const canonical = `https://dentasmart.ai/${kind === "ai-use" ? "ai-use-disclosure" : `${kind}-policy`}`;

  return (
    <div className="min-h-screen flex flex-col bg-background text-black">
      <SEO title={page.title} description={page.description} canonical={canonical} />
      <Navigation />
      <main className="flex-1 pt-32 pb-16">
        <article className="container max-w-4xl px-4 mx-auto">
          <p className="text-sm font-medium text-action uppercase tracking-wide mb-3">DentaSmart governance resource</p>
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-black mb-5">{page.heading}</h1>
          <p className="text-lg text-stone-700 leading-relaxed max-w-3xl">{page.introduction}</p>
          <div className="mt-10 space-y-8">
            {page.sections.map((section) => (
              <section key={section.title} className="rounded-2xl border border-stone-200 bg-white p-6 md:p-8">
                <h2 className="text-2xl font-medium text-black mb-3">{section.title}</h2>
                <div className="space-y-3 text-stone-700 leading-relaxed">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            ))}
          </div>
          {kind === "corrections" && (
            <p className="mt-8 rounded-xl bg-stone-100 px-5 py-4 text-stone-700">Contact <a className="text-action hover:underline" href={`mailto:${company.supportEmail}`}>{company.supportEmail}</a> to report a suspected content error.</p>
          )}
          <PolicyNavigation />
        </article>
      </main>
      <Footer />
    </div>
  );
}
