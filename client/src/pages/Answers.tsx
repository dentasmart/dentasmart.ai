import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { pricing } from "@shared/facts";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { motion } from "framer-motion";
import { Search, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

interface QA {
  q: string;
  a: string;
  category: string;
}

const qaData: QA[] = [
  // Symptoms & Pain
  { q: "Why does my tooth hurt when I bite down?", a: "Pain when biting usually signals a cracked tooth, a failing filling, or an abscess forming at the root. DentaSmart can analyze an X-ray of the area and help you understand what might be happening before your dental visit.", category: "Symptoms" },
  { q: "What causes sensitivity to cold water?", a: "Cold sensitivity often comes from exposed dentin due to enamel wear, gum recession, or a small cavity. If it lasts more than a few seconds, it may indicate nerve involvement. Upload a photo to DentaSmart for a quick check.", category: "Symptoms" },
  { q: "Why are my gums bleeding when I brush?", a: "Bleeding gums are usually the first sign of gingivitis, caused by plaque buildup along the gumline. It can also indicate vitamin deficiencies or hormonal changes. Regular monitoring with DentaSmart helps you track gum health over time.", category: "Symptoms" },
  { q: "What does a dental abscess look like?", a: "A dental abscess often appears as a swollen, pus-filled bump on the gums near the affected tooth. You may also notice redness, pain, and a bad taste in your mouth. This is a dental emergency. See a dentist immediately.", category: "Symptoms" },
  { q: "Why do I have bad breath even after brushing?", a: "Persistent bad breath (halitosis) can be caused by gum disease, tongue bacteria, dry mouth, or cavities. If brushing and flossing do not help, there may be an underlying dental issue that needs attention.", category: "Symptoms" },
  { q: "What causes a white spot on my tooth?", a: "White spots on teeth are often early signs of enamel demineralization. The very first stage of a cavity. They can also result from fluorosis or orthodontic treatment. Early detection through DentaSmart can help you reverse the damage.", category: "Symptoms" },
  { q: "Why does my jaw click when I open my mouth?", a: "Jaw clicking is often related to TMJ (temporomandibular joint) disorder. It can be caused by teeth grinding, stress, or misalignment. If accompanied by pain or limited movement, consult a dentist.", category: "Symptoms" },
  { q: "What does it mean if my tooth is turning gray?", a: "A gray tooth usually indicates that the nerve inside has died, often from trauma or decay. This tooth may need a root canal to prevent infection. DentaSmart can help you assess the situation with an X-ray analysis.", category: "Symptoms" },
  { q: "Why do my teeth hurt when I eat sweets?", a: "Sensitivity to sweets typically means you have a cavity or worn enamel exposing the dentin layer. Sugar draws fluid through tiny tubes in the dentin, triggering nerve pain. Get a scan to check for early cavities.", category: "Symptoms" },
  { q: "What causes a bump on my gums?", a: "A bump on your gums could be a dental abscess, a mucocele, or a fibroma. If it is painful and filled with pus, it is likely an abscess and needs urgent dental care. Non-painful bumps should still be evaluated.", category: "Symptoms" },

  // Cavities & Decay
  { q: "How do I know if I have a cavity?", a: "Early cavities often have no symptoms. As they grow, you may notice sensitivity, visible holes or dark spots, and pain when eating. DentaSmart can detect early signs of decay in photos and X-rays before you feel anything.", category: "Cavities" },
  { q: "Can a cavity heal on its own?", a: "Very early-stage cavities (white spots) can sometimes remineralize with fluoride treatment and good hygiene. Once a cavity has broken through the enamel, it cannot heal and needs a filling. Early detection is key.", category: "Cavities" },
  { q: "How much does it cost to fill a cavity?", a: "A simple filling typically costs $150-300 without insurance. Larger fillings or those on molars can cost more. DentaSmart provides cost estimates based on your specific situation so there are no surprises.", category: "Cavities" },
  { q: "What happens if I ignore a cavity?", a: "An untreated cavity grows deeper into the tooth, eventually reaching the nerve. This leads to severe pain, infection (abscess), and may require a root canal ($700-1,500) or extraction instead of a simple filling.", category: "Cavities" },
  { q: "How long does a filling last?", a: "Composite (tooth-colored) fillings typically last 5-10 years. Amalgam (silver) fillings can last 10-15 years. Factors like grinding, diet, and oral hygiene affect longevity. DentaSmart can monitor your existing fillings for signs of wear.", category: "Cavities" },

  // Gums
  { q: "What is the difference between gingivitis and periodontitis?", a: "Gingivitis is early-stage gum disease with inflammation and bleeding. It is reversible. Periodontitis is advanced gum disease where bone loss occurs. It is manageable but not fully reversible. Early detection prevents progression.", category: "Gums" },
  { q: "Can gum disease cause tooth loss?", a: "Yes. Advanced periodontitis destroys the bone supporting your teeth, eventually causing them to loosen and fall out. It is the leading cause of tooth loss in adults. Regular monitoring helps catch it early.", category: "Gums" },
  { q: "How do I reverse gum recession?", a: "Mild gum recession can be managed with better brushing technique (soft brush, gentle pressure) and regular cleanings. Severe recession may need gum grafting surgery. DentaSmart helps you track gum levels over time.", category: "Gums" },
  { q: "Why are my gums swollen around one tooth?", a: "Localized gum swelling usually indicates an infection, a food particle trapped under the gumline, or a periodontal abscess. If it persists more than a few days, see a dentist. Upload a photo to DentaSmart for initial guidance.", category: "Gums" },
  { q: "Does gum disease affect overall health?", a: "Research links gum disease to heart disease, diabetes complications, respiratory infections, and pregnancy complications. Bacteria from infected gums can enter the bloodstream and affect other organs.", category: "Gums" },

  // X-rays
  { q: "Can I understand my dental X-ray myself?", a: "Dental X-rays can be confusing without training. DentaSmart uses AI to analyze your X-rays and explain findings in plain language, showing you exactly where issues are and what they mean.", category: "X-rays" },
  { q: "How often should I get dental X-rays?", a: "Most adults need bitewing X-rays every 1-2 years and a full-mouth series every 3-5 years. High-risk patients may need them more often. Your dentist will recommend based on your specific needs.", category: "X-rays" },
  { q: "Are dental X-rays safe?", a: "Yes. Modern digital X-rays use very low radiation, about the same as a short airplane flight. The diagnostic benefits far outweigh the minimal risk. Pregnant women should inform their dentist.", category: "X-rays" },
  { q: "What does bone loss look like on a dental X-ray?", a: "Bone loss appears as dark areas around tooth roots where bone should be white/opaque. Healthy bone comes up close to the crown of the tooth. DentaSmart can identify and highlight bone loss patterns in your X-rays.", category: "X-rays" },
  { q: "Can an X-ray show a cracked tooth?", a: "Not always. Hairline cracks often do not show on standard X-rays. However, X-rays can reveal related signs like bone loss, widened ligament spaces, or root fractures. A 3D CBCT scan is better for detecting cracks.", category: "X-rays" },

  // Treatments
  { q: "Do I really need a root canal?", a: "A root canal is needed when the nerve inside your tooth is infected or dying. Signs include severe pain, prolonged sensitivity, darkening of the tooth, or an abscess. DentaSmart can help you understand if your symptoms suggest one.", category: "Treatments" },
  { q: "How much does a root canal cost?", a: "Root canals typically cost $700-1,500 depending on the tooth (front teeth are cheaper than molars). A crown afterward adds $800-1,500. DentaSmart provides cost estimates specific to your situation.", category: "Treatments" },
  { q: "What is the difference between a crown and a filling?", a: "A filling repairs a small area of decay. A crown covers the entire visible portion of the tooth and is needed when too much tooth structure is lost for a filling to hold. Crowns are stronger but more expensive.", category: "Treatments" },
  { q: "Is tooth extraction better than a root canal?", a: "Saving your natural tooth with a root canal is almost always preferred. Extraction leads to bone loss and requires replacement (implant or bridge) which costs more long-term. Only extract if the tooth cannot be saved.", category: "Treatments" },
  { q: "How long does a dental crown last?", a: "Dental crowns typically last 10-15 years with good care. Some last 25+ years. Porcelain crowns may chip, while metal crowns are more durable. DentaSmart can monitor your crowns for signs of wear or decay at the margins.", category: "Treatments" },

  // Costs & Insurance
  { q: "Why is dental care so expensive?", a: "Dental care costs reflect specialized training, equipment, materials, and overhead. Many procedures require precision work on a tiny scale. DentaSmart helps you understand costs upfront and prioritize treatments to manage expenses.", category: "Costs" },
  { q: "How can I save money on dental care?", a: "Catch problems early (when a $200 filling prevents a $1,500 root canal), compare prices between dentists, ask about payment plans, and use DentaSmart to monitor your oral health between visits.", category: "Costs" },
  { q: "Is dental insurance worth it?", a: `It depends on your needs. Most dental insurance caps at $1,000-2,000/year with waiting periods for major work. If you only need cleanings, a discount plan may be cheaper. DentaSmart Complete Care costs ${pricing.completeCareIndividual.priceFormatted}/year for unlimited oral health monitoring.`, category: "Costs" },
  { q: "What dental work is most urgent?", a: "Infections (abscesses), uncontrolled bleeding, severe pain, and broken teeth with sharp edges are dental emergencies. DentaSmart helps you triage by understanding which issues need immediate attention versus routine care.", category: "Costs" },
  { q: "Can I negotiate dental prices?", a: "Yes. Many dentists offer cash-pay discounts (10-20%), payment plans, or will match competitor quotes. Ask before treatment. Knowing the typical cost range (which DentaSmart provides) gives you negotiating power.", category: "Costs" },

  // Prevention
  { q: "How often should I really floss?", a: "Once daily is the recommendation. Flossing removes plaque and food from between teeth where your brush cannot reach. If your gums bleed when you start, keep going. They will stop bleeding within 1-2 weeks of regular flossing.", category: "Prevention" },
  { q: "Does mouthwash replace flossing?", a: "No. Mouthwash kills bacteria and freshens breath but cannot physically remove plaque and food particles stuck between teeth. Think of it as a supplement to brushing and flossing, not a replacement.", category: "Prevention" },
  { q: "How often should I visit the dentist?", a: "Most people should visit every 6 months for a cleaning and checkup. High-risk patients (gum disease, smokers, diabetics) may need visits every 3-4 months. DentaSmart helps you monitor between visits.", category: "Prevention" },
  { q: "Can diet affect my dental health?", a: "Absolutely. Sugar feeds cavity-causing bacteria. Acidic foods and drinks erode enamel. Calcium-rich foods strengthen teeth. Crunchy vegetables help clean teeth naturally. Water is the best drink for dental health.", category: "Prevention" },
  { q: "Is electric toothbrush better than manual?", a: "Studies show electric toothbrushes remove slightly more plaque than manual brushes, especially for people who do not brush with proper technique. Either works well if you brush for 2 minutes twice daily with gentle pressure.", category: "Prevention" },

  // DentaSmart Specific
  { q: "How accurate is DentaSmart's AI analysis?", a: "DentaSmart's AI has been trained on thousands of dental images and is advised by clinical dental professionals. It provides a reliable initial assessment, but it is not a replacement for a professional dental examination.", category: "DentaSmart" },
  { q: "Is my dental data private with DentaSmart?", a: "We take the privacy and security of your information seriously. You can request account deletion at any time. See our Privacy Policy for details on how information is handled.", category: "DentaSmart" },
  { q: "Can DentaSmart replace my dentist?", a: "No. DentaSmart is a monitoring and education tool that helps you understand your oral health between dental visits. It helps you prepare for appointments and catch issues early, but it does not replace professional care.", category: "DentaSmart" },
  { q: "What types of photos can I upload?", a: "You can upload photos of your teeth (front, sides), close-ups of specific concerns, and dental X-rays (bitewings, periapical, panoramic). Check our photo guide for tips on getting the clearest images.", category: "DentaSmart" },
  { q: "How is DentaSmart different from Googling symptoms?", a: "Google gives you a list of possibilities that can cause anxiety. DentaSmart analyzes YOUR actual teeth and gives you a personalized assessment with a clear score and action plan, not generic information.", category: "DentaSmart" },

  // Children & Family
  { q: "When should my child first see a dentist?", a: "The American Academy of Pediatric Dentistry recommends a first visit by age 1 or within 6 months of the first tooth appearing. Early visits establish a dental home and catch issues before they become problems.", category: "Family" },
  { q: "Are baby teeth important if they fall out anyway?", a: "Yes. Baby teeth hold space for permanent teeth, help with speech development, and allow proper chewing for nutrition. Infected baby teeth can damage the developing permanent teeth underneath.", category: "Family" },
  { q: "Is teeth grinding in children normal?", a: "Mild teeth grinding (bruxism) is common in children and often resolves on its own. However, persistent grinding can wear down enamel and cause jaw pain. Consult a dentist if it continues past age 6.", category: "Family" },
  { q: "Can pregnancy affect my dental health?", a: "Yes. Hormonal changes during pregnancy increase the risk of gingivitis and gum disease. Morning sickness acid can erode enamel. Dental care during pregnancy is safe and important. Do not skip checkups.", category: "Family" },
  { q: "At what age do wisdom teeth come in?", a: "Wisdom teeth typically emerge between ages 17-25. Not everyone gets them, and not all need removal. They should be removed if they are impacted, causing pain, or pushing other teeth. X-rays help determine the best approach.", category: "Family" },
];

const categories = ["All", "Symptoms", "Cavities", "Gums", "X-rays", "Treatments", "Costs", "Prevention", "DentaSmart", "Family"];

export default function Answers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  useEffect(() => {
    trackEvent("answers_page_view");
  }, []);

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
                      if (!isExpanded) trackEvent("faq_expand", { question: qa.q.substring(0, 50) });
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
                trackEvent("cta_get_score_click", { source: "answers_page" });
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
