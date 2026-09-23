import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "wouter";
import { ArrowRight, Camera, FileSearch, History } from "lucide-react";

const pathways = [
  {
    icon: Camera,
    title: "Start with a Quick Check",
    description: "Use supported mouth photos or dental X-rays for a one-time educational review and Oral Health Score.",
    link: "/pricing/#quick-check",
    label: "Explore Quick Check",
  },
  {
    icon: FileSearch,
    title: "Organize a Treatment-Plan Review",
    description: "Use Treatment Plan Review to organize an already-provided recommendation in plain language and prepare questions for your dentist.",
    link: "/pricing/#treatment-plan-review",
    label: "Explore Treatment Plan Review",
  },
  {
    icon: History,
    title: "Keep Records Together",
    description: "Use Complete Care for ongoing reports, monitoring tools, reminders, and separate family profiles when needed.",
    link: "/pricing/#complete-care",
    label: "Explore Complete Care",
  },
];

export default function Stories() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black selection:bg-primary/20">
      <SEO
        title="Ways to Use DentaSmart"
        description="Explore practical DentaSmart pathways for a one-time Quick Check, a Treatment Plan Review, or Complete Care."
        canonical="https://dentasmart.ai/stories"
      />
      <Navigation />

      <main>
        <section className="bg-stone-50 pb-16 pt-32 md:pb-24 md:pt-48">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-action">Choose by situation</p>
            <h1 className="mb-6 text-4xl font-normal tracking-tight text-black md:text-6xl">
              Find the DentaSmart path that fits your question
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-700 md:text-xl">
              These are product-use examples, not customer testimonials. DentaSmart provides educational guidance and does not diagnose conditions or replace a dentist.
            </p>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 md:grid-cols-3">
            {pathways.map(({ icon: Icon, title, description, link, label }) => (
              <article key={title} className="flex flex-col rounded-3xl border border-stone-200 bg-stone-50 p-7">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h2 className="mb-3 text-2xl font-medium text-black">{title}</h2>
                <p className="mb-6 flex-1 leading-relaxed text-stone-600">{description}</p>
                <Link href={link} className="inline-flex min-h-11 items-center font-medium text-action hover:underline">
                  {label} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
