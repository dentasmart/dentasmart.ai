/**
 * FAQSchema - Renders FAQPage JSON-LD structured data for Google Rich Results.
 * 
 * Usage:
 *   <FAQSchema faqs={[
 *     { question: "What is DentaSmart?", answer: "DentaSmart is..." },
 *     { question: "How much does it cost?", answer: "$75/year..." },
 *   ]} />
 */

import { Helmet } from "react-helmet-async";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export default function FAQSchema({ faqs }: FAQSchemaProps) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
