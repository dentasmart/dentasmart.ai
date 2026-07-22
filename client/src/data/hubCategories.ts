/**
 * Hub category data for /hub/:category pages.
 *
 * This is the single source of truth for which /hub/* paths exist and what
 * content they render. It is imported by:
 *   - client/src/pages/HubCategory.tsx  (renders the page)
 *   - shared/routes.ts                  (derives staticRoutes + sitemap entries)
 *
 * To add a new hub category: add a key here. The route and sitemap entry are
 * derived automatically — no changes needed in App.tsx or routes.ts.
 */

export interface HubCategoryEntry {
  title: string;
  description: string;
  heading: string;
  intro: string;
  dbCategory: string;
  faqItems: { q: string; a: string }[];
}

export const hubCategoryData: Record<string, HubCategoryEntry> = {
  symptoms: {
    title: "Dental Symptoms Explained - DentaSmart Oral Health Hub",
    description: "Understand what your dental symptoms mean. From tooth pain to sensitivity, get clear answers about common oral health issues.",
    heading: "Dental Symptoms Explained",
    intro: "Something feels off in your mouth and you want to know what it means. We break down the most common dental symptoms in plain language so you can understand what is happening and what to do next.",
    dbCategory: "Symptoms",
    faqItems: [
      { q: "Can I diagnose my own dental problem?", a: "You can learn what symptoms might mean, but only a licensed dentist can give a proper diagnosis. DentaSmart helps you understand your symptoms so you can have a better conversation with your dentist." },
    ],
  },
  gums: {
    title: "Gum Health Guide - DentaSmart Oral Health Hub",
    description: "Learn about gum health, bleeding gums, gum recession, and gum disease. Simple explanations and steps to protect your gums.",
    heading: "Gum Health",
    intro: "Your gums are the foundation of your smile. When they bleed, swell, or pull back, it is your body telling you something. Here you will find clear, simple guides to help you understand gum problems and take action early.",
    dbCategory: "Gums",
    faqItems: [
      { q: "Why do my gums bleed when I brush?", a: "Bleeding gums usually mean there is inflammation from plaque buildup. It is one of the earliest signs of gum disease. Better brushing and flossing often helps, but see a dentist if it continues." },
      { q: "Can gum recession be reversed?", a: "Early gum recession can sometimes be slowed or stopped with better oral care. But once gums have pulled back significantly, a dentist may need to treat it with grafting or other procedures." },
      { q: "What is the difference between gingivitis and periodontitis?", a: "Gingivitis is early gum disease that causes redness and bleeding. It is reversible. Periodontitis is advanced gum disease that can cause bone loss and tooth loss. Catching it early matters." },
    ],
  },
  cavities: {
    title: "Cavity & Tooth Decay Guide - DentaSmart Oral Health Hub",
    description: "Everything you need to know about cavities, tooth decay, and dental fillings. Spot the signs early and protect your teeth.",
    heading: "Cavities & Tooth Decay",
    intro: "Cavities are the most common dental problem in the world. The good news is they are preventable and treatable when caught early. Learn how to spot the signs, understand your options, and protect your teeth.",
    dbCategory: "Cavities",
    faqItems: [
      { q: "How do I know if I have a cavity?", a: "Early cavities often have no symptoms. As they grow, you may notice sensitivity to sweets, hot, or cold foods. Dark spots or holes on teeth are also signs. Regular checkups catch cavities before they hurt." },
      { q: "Can a cavity heal on its own?", a: "Very early cavities (before they break through enamel) can sometimes remineralize with fluoride. But once a cavity forms a hole, it needs a filling from a dentist." },
      { q: "How much does a filling cost?", a: "A basic filling typically costs $100 to $300 without insurance. The price depends on the size, location, and material used. DentaSmart can help you understand what to expect." },
    ],
  },
  xrays: {
    title: "Dental X-Ray Guide - DentaSmart Oral Health Hub",
    description: "Understand your dental X-rays. Learn what dentists look for, what findings mean, and how AI can help you read your own X-rays.",
    heading: "Understanding Dental X-Rays",
    intro: "Dental X-rays reveal what is happening below the surface. Cavities between teeth, bone loss, infections, and more. But reading them can feel confusing. We explain what common X-ray findings mean in simple terms.",
    dbCategory: "X-Rays",
    faqItems: [
      { q: "Are dental X-rays safe?", a: "Yes. Modern digital X-rays use very low radiation. A full set of dental X-rays exposes you to less radiation than a short airplane flight. Your dentist only takes them when needed." },
      { q: "Can DentaSmart read my X-rays?", a: "Yes. DentaSmart uses AI to analyze dental X-rays and highlight potential findings like cavities, bone loss, and infections. It gives you a starting point before your dentist visit." },
      { q: "How often should I get dental X-rays?", a: "Most adults need X-rays every 1 to 2 years. If you have active dental problems, your dentist may recommend them more often. It depends on your individual risk factors." },
    ],
  },
  costs: {
    title: "Dental Costs & Savings Guide - DentaSmart Oral Health Hub",
    description: "Understand dental treatment costs, insurance options, and ways to save money. Make informed decisions about your oral health spending.",
    heading: "Dental Costs & Savings",
    intro: "Dental care can be expensive, especially when problems are caught late. Understanding costs upfront helps you plan better and avoid surprises. We break down what common treatments cost and how to save.",
    dbCategory: "Costs",
    faqItems: [
      { q: "How much does a root canal cost?", a: "A root canal typically costs $700 to $1,500 depending on the tooth. Front teeth are less expensive than molars. With insurance, your out of pocket cost may be $200 to $500." },
      { q: "Is dental insurance worth it?", a: "It depends on your needs. If you only need cleanings, a discount plan may be cheaper. If you expect major work, insurance can save you thousands. DentaSmart helps you understand what you might need." },
      { q: "How can I save money on dental care?", a: "Catch problems early (that is the biggest saver), compare prices between dentists, ask about payment plans, look into dental schools for discounted care, and use DentaSmart to understand your treatment options before committing." },
    ],
  },
};
