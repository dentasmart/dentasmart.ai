import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { pricing } from "@shared/facts";
import { Button } from "@/components/ui/button";
import { trackConversionEvent } from "@/lib/analytics";
import { serializeJsonLd } from "@shared/jsonLd";
import { motion } from "framer-motion";
import { Search, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useMemo } from "react";

interface QA {
  q: string;
  a: string;
  category: string;
}

const qaData: QA[] = [
  // Symptoms & Pain
  { q: "Why does my tooth hurt when I bite down?", a: "Pain when biting can have several causes, including a crack, a loose or damaged filling, or inflammation around the tooth. A dentist can examine the tooth and any needed X-rays. DentaSmart can help you organize supported images and questions, but it does not diagnose the cause.", category: "Symptoms" },
  { q: "What causes sensitivity to cold water?", a: "Cold sensitivity can be related to enamel wear, exposed roots, whitening products, decay, or other causes. If it lingers, worsens, or affects one tooth repeatedly, arrange a dental examination.", category: "Symptoms" },
  { q: "Why are my gums bleeding when I brush?", a: "Bleeding gums can be related to plaque, gum inflammation, brushing technique, medication, or other factors. Gentle daily care may help, but persistent or worsening bleeding should be checked by a dentist.", category: "Symptoms" },
  { q: "What does a dental abscess look like?", a: "A dental abscess may appear as a tender or pimple-like swelling near a tooth, but appearance alone cannot confirm the cause. Seek urgent dental care for swelling, severe pain, fever, or a bad taste. Trouble breathing or swallowing needs emergency medical care.", category: "Symptoms" },
  { q: "Why do I have bad breath even after brushing?", a: "Persistent bad breath can have several causes, including tongue coating, dry mouth, gum problems, tooth decay, diet, or medical conditions. If brushing, flossing, and tongue cleaning do not help, ask a dentist or medical professional for an evaluation.", category: "Symptoms" },
  { q: "What causes a white spot on my tooth?", a: "White spots can have several causes, including changes in enamel mineral content, fluorosis, or marks related to orthodontic treatment. A dentist can examine the area and explain whether treatment or monitoring is appropriate.", category: "Symptoms" },
  { q: "Why does my jaw click when I open my mouth?", a: "Jaw clicking can occur with changes in the jaw joint, clenching, grinding, or other factors. Clicking without pain may not need treatment, but pain, locking, swelling, or limited movement should be assessed by a dentist or medical professional.", category: "Symptoms" },
  { q: "What does it mean if my tooth is turning gray?", a: "A gray tooth can follow trauma, changes inside the tooth, decay, or staining. The cause cannot be confirmed from color alone, so arrange a dental examination, especially if there is pain or swelling.", category: "Symptoms" },
  { q: "Why do my teeth hurt when I eat sweets?", a: "Sensitivity to sweets can be related to decay, enamel wear, exposed dentin, or a damaged restoration. A dentist can examine the area and determine the cause. DentaSmart does not diagnose cavities from symptoms alone.", category: "Symptoms" },
  { q: "What causes a bump on my gums?", a: "A gum bump can have several causes, including irritation, a cyst, or infection. Pain, pus, fever, facial swelling, or a bump that does not improve needs professional evaluation.", category: "Symptoms" },

  // Cavities & Decay
  { q: "How do I know if I have a cavity?", a: "Cavities may cause sensitivity, a visible spot or hole, or pain, but some have no obvious symptoms. Only a dentist can diagnose decay. DentaSmart may highlight visible areas in supported images for an educational discussion, but it does not confirm a cavity.", category: "Cavities" },
  { q: "Can a cavity heal on its own?", a: "Early enamel changes may sometimes be managed with professional guidance, fluoride, and daily care. Once tooth structure is lost, a dentist may recommend a restoration. A dental examination is needed to tell which situation applies.", category: "Cavities" },
  { q: "How much does it cost to fill a cavity?", a: "The price of a filling varies by location, tooth, material, treatment complexity, provider, and insurance. Ask the dental office for an itemized estimate and check your plan before treatment.", category: "Cavities" },
  { q: "What happens if I ignore a cavity?", a: "Untreated decay can grow and may lead to pain, infection, or more involved treatment. The pace varies, so do not wait for severe pain before arranging a dental examination.", category: "Cavities" },
  { q: "How long does a filling last?", a: "A filling's lifespan varies with its material, size, location, bite forces, and daily care. A dentist can check existing fillings for cracks, leakage, or wear during routine examinations.", category: "Cavities" },

  // Gums
  { q: "What is the difference between gingivitis and periodontitis?", a: "Gingivitis affects the gums and may cause redness, swelling, or bleeding. Periodontitis involves deeper supporting tissues and can include bone loss. A dentist can assess the stage and recommend appropriate care.", category: "Gums" },
  { q: "Can gum disease cause tooth loss?", a: "Advanced gum disease can damage the tissues and bone that support teeth, which may lead to loose teeth or tooth loss. Professional assessment and ongoing care can help manage the condition.", category: "Gums" },
  { q: "How do I reverse gum recession?", a: "Receded gum tissue does not usually grow back on its own. Gentle brushing and professional care can help protect the area, while some cases may need treatment. A dentist can identify the cause and discuss options.", category: "Gums" },
  { q: "Why are my gums swollen around one tooth?", a: "Swelling around one tooth can be related to trapped food, irritation, gum inflammation, or infection. Persistent swelling, pain, pus, fever, or facial swelling needs prompt dental care.", category: "Gums" },
  { q: "Does gum disease affect overall health?", a: "Gum health is part of overall health, and some health conditions can also affect the gums. Keep your dentist and medical professional informed about changes and follow their care advice.", category: "Gums" },

  // X-rays
  { q: "Can I understand my dental X-ray myself?", a: "Dental X-rays require professional interpretation alongside an examination and history. DentaSmart can organize educational observations from supported X-rays in plain language, but a dentist must diagnose conditions and recommend treatment.", category: "X-rays" },
  { q: "How often should I get dental X-rays?", a: "X-ray timing depends on age, symptoms, dental history, risk, and the type of image needed. Your dentist should recommend X-rays based on your individual situation rather than a fixed schedule.", category: "X-rays" },
  { q: "Are dental X-rays safe?", a: "Dental teams use X-rays when the expected information is useful and take steps to limit exposure. Tell your dentist about pregnancy or other concerns so they can decide which images are appropriate.", category: "X-rays" },
  { q: "What does bone loss look like on a dental X-ray?", a: "Changes in bone level can appear around tooth roots on an X-ray, but image quality, angle, and the full clinical picture matter. A dentist should interpret the image and compare it with an examination and prior records.", category: "X-rays" },
  { q: "Can an X-ray show a cracked tooth?", a: "Some cracks are not visible on standard dental X-rays. A dentist may use an examination, bite tests, lighting, magnification, or other imaging to investigate a suspected crack.", category: "X-rays" },

  // Treatments
  { q: "Do I really need a root canal?", a: "A dentist decides whether root canal treatment is appropriate after examining the tooth and reviewing any needed tests or X-rays. If you are unsure about a recommendation, ask for an explanation or seek another licensed dentist's opinion.", category: "Treatments" },
  { q: "How much does a root canal cost?", a: "Root canal pricing varies by tooth, location, provider, complexity, insurance, and whether another restoration is needed. Ask for an itemized treatment plan and confirm benefits with your insurer.", category: "Treatments" },
  { q: "What is the difference between a crown and a filling?", a: "A filling replaces a smaller area of damaged tooth structure. A crown covers more of the visible tooth and may be considered when additional support is needed. A dentist can explain which option fits the tooth and why.", category: "Treatments" },
  { q: "Is tooth extraction better than a root canal?", a: "The better option depends on whether the tooth can be restored, your health, expected outcome, cost, and personal priorities. Ask a dentist to explain the benefits, risks, alternatives, and likely follow-up for each choice.", category: "Treatments" },
  { q: "How long does a dental crown last?", a: "A crown's lifespan varies with its material, fit, bite forces, daily care, and the tooth underneath. Regular dental examinations can check the crown and surrounding tooth for changes.", category: "Treatments" },

  // Costs & Insurance
  { q: "Why is dental care so expensive?", a: "Dental fees can reflect the provider's training, equipment, materials, staff, location, and treatment complexity. Ask for an itemized plan so you can understand what is included and discuss alternatives with the dentist.", category: "Costs" },
  { q: "How can I save money on dental care?", a: "Ask for a written treatment plan, compare qualified providers, review insurance benefits, and ask about payment options or accredited dental-school clinics in your area. Do not delay urgent care solely because of cost without discussing options with a professional.", category: "Costs" },
  { q: "Is dental insurance worth it?", a: `It depends on the premiums, network, deductibles, waiting periods, exclusions, annual limits, and care you expect to use. Compare plan documents with your likely needs. DentaSmart Complete Care is a separate educational service that starts at ${pricing.completeCareIndividual.priceFormatted}/year and is not dental insurance.`, category: "Costs" },
  { q: "What dental work is most urgent?", a: "Severe pain, uncontrolled bleeding, facial swelling, fever, trauma, or trouble breathing or swallowing may need urgent dental or medical care. DentaSmart does not determine urgency, diagnose conditions, or replace professional triage.", category: "Costs" },
  { q: "Can I negotiate dental prices?", a: "You can ask whether a dental office offers payment plans, membership options, or different treatment choices. Request an itemized estimate and confirm any insurance benefits before agreeing to care.", category: "Costs" },

  // Prevention
  { q: "How often should I really floss?", a: "Clean between your teeth each day using floss or another method your dentist recommends. If bleeding is heavy, persistent, or getting worse, arrange a dental examination rather than assuming it will resolve.", category: "Prevention" },
  { q: "Does mouthwash replace flossing?", a: "No. Mouthwash kills bacteria and freshens breath but cannot physically remove plaque and food particles stuck between teeth. Think of it as a supplement to brushing and flossing, not a replacement.", category: "Prevention" },
  { q: "How often should I visit the dentist?", a: "Visit frequency depends on your oral health, age, symptoms, history, and risk factors. Your dentist can recommend an examination and cleaning schedule that fits your needs. DentaSmart does not replace those visits.", category: "Prevention" },
  { q: "Can diet affect my dental health?", a: "Absolutely. Sugar feeds cavity-causing bacteria. Acidic foods and drinks erode enamel. Calcium-rich foods strengthen teeth. Crunchy vegetables help clean teeth naturally. Water is the best drink for dental health.", category: "Prevention" },
  { q: "Is electric toothbrush better than manual?", a: "Both electric and manual toothbrushes can clean well when used with good technique. Choose one you can use consistently, brush gently with fluoride toothpaste, and ask your dentist for advice based on your needs.", category: "Prevention" },

  // DentaSmart Specific
  { q: "How accurate is DentaSmart's AI analysis?", a: "DentaSmart does not publish a universal accuracy rate. Results can vary with image quality, the area shown, and the selected service. Use the output as educational information and ask a dentist to diagnose conditions or recommend treatment.", category: "DentaSmart" },
  { q: "Is my dental data private with DentaSmart?", a: "We take the privacy and security of your information seriously. You can request account deletion at any time. See our Privacy Policy for details on how information is handled.", category: "DentaSmart" },
  { q: "Can DentaSmart replace my dentist?", a: "No. DentaSmart is an educational tool that can help you organize supported information and prepare questions. It does not diagnose conditions, provide hands-on care, or replace professional dental examinations and treatment decisions.", category: "DentaSmart" },
  { q: "What types of photos can I upload?", a: "You can upload photos of your teeth (front, sides), close-ups of specific concerns, and dental X-rays (bitewings, periapical, panoramic). Check our photo guide for tips on getting the clearest images.", category: "DentaSmart" },
  { q: "How is DentaSmart different from Googling symptoms?", a: "A general web search is not organized around your records. DentaSmart can use supported information you choose to provide for educational reports, an Oral Health Score when included, and questions to discuss with a dentist. It does not provide a diagnosis.", category: "DentaSmart" },

  // Children & Family
  { q: "When should my child first see a dentist?", a: "Pediatric dental guidance commonly recommends an early first visit, often around the first birthday or soon after the first tooth appears. Ask a pediatric dentist for guidance that fits your child's health and development.", category: "Family" },
  { q: "Are baby teeth important if they fall out anyway?", a: "Yes. Baby teeth hold space for permanent teeth, help with speech development, and allow proper chewing for nutrition. Infected baby teeth can damage the developing permanent teeth underneath.", category: "Family" },
  { q: "Is teeth grinding in children normal?", a: "Teeth grinding can occur in children and may change as they grow. Ask a dentist to check persistent grinding, tooth wear, jaw pain, sleep concerns, or other symptoms.", category: "Family" },
  { q: "Can pregnancy affect my dental health?", a: "Pregnancy-related changes can affect the gums, and vomiting can expose teeth to stomach acid. Tell your dentist that you are pregnant so the dental and medical teams can coordinate appropriate care.", category: "Family" },
  { q: "At what age do wisdom teeth come in?", a: "Wisdom teeth often develop in the teen or young-adult years, but timing and position vary. A dentist can examine the area and use X-rays when needed to discuss monitoring or treatment.", category: "Family" },
];

const categories = ["All", "Symptoms", "Cavities", "Gums", "X-rays", "Treatments", "Costs", "Prevention", "DentaSmart", "Family"];

export default function Answers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return qaData.filter((qa) => {
      const matchesCategory = activeCategory === "All" || qa.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        qa.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        qa.a.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  // Build FAQPage JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qaData.map((qa) => ({
      "@type": "Question",
      name: qa.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: qa.a,
      },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black">
      <SEO
        title="50 Common Dental Questions Answered"
        description="Get clear, simple answers to the most common dental health questions. From tooth pain to X-rays, cavities to costs. No jargon, just facts."
        canonical="https://dentasmart.ai/answers"
      />
      {/* Inject FAQPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-primary/10" />
        </div>
        <div className="container relative z-10 px-4 mx-auto max-w-5xl pt-40 md:pt-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-6 leading-tight">
              Your dental questions, <br />
              <span className="italic text-primary">answered simply</span>.
            </h1>
            <p className="text-xl text-stone-600 font-light leading-relaxed max-w-2xl mx-auto mb-8">
              50 common dental health questions explained in plain language. No jargon, no confusion. Just the facts you need.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                placeholder="Search questions (e.g., 'tooth pain', 'cavity cost')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border border-stone-200 bg-white text-black placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories + Q&A */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto max-w-4xl">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Q&A list */}
          <div className="space-y-3">
            {filtered.map((qa, idx) => {
              const isExpanded = expandedIdx === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border border-stone-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => {
                      setExpandedIdx(isExpanded ? null : idx);
                      if (!isExpanded) trackConversionEvent("content_engagement", {
                        cta_id: "answers_faq_expand",
                        surface: "mid_content",
                        intent: "content_engagement",
                      });
                    }}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    <h2 className="font-medium text-black pr-4 text-base">{qa.q}</h2>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-stone-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-stone-400 flex-shrink-0" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="px-5 pb-5 text-stone-600 font-light leading-relaxed border-t border-stone-100 pt-4">
                      {qa.a}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-stone-500">
              No questions match your search. Try different keywords.
            </div>
          )}

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-lg text-stone-600 mb-4">Still have questions about your own mouth?</p>
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 py-7 text-lg font-medium cursor-pointer"
              onClick={() => {
                trackConversionEvent("cta_click", {
                  cta_id: "answers_oral_health_score",
                  surface: "mid_content",
                  intent: "download",
                  destination_type: "internal_route",
                  destination_path: "/",
                });
                window.location.href = "/#download-cta";
              }}
            >
              Get My Oral Health Score
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
