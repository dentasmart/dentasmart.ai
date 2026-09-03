
import AgeSpecificTemplate, { AgeSpecificPageData } from "./AgeSpecificTemplate";

const data: AgeSpecificPageData = {
  slug: "senior-dental-care",
  ageGroup: "Seniors (60+)",
  heroTitle: "Your Guide to a Healthy Smile in Your",
  heroHighlight: "Golden Years",
  heroDescription: "Review dry mouth, root decay, gum health, dentures, implants, medicines, comfort, and access to professional care.",
  metaTitle: "Senior Dental Care Guide (60+) | DentaSmart",
  metaDescription: "Review dental health after 60, including dry mouth, root decay, gum disease, denture care, implants, medicines, and oral cancer screening.",
  keywords: "senior dental care, oral health for seniors, dry mouth, root decay, gum disease, dentures, dental implants, oral cancer screening",
  statsStrip: [
    { value: "Dry mouth", label: "can raise cavity risk and may be related to medicines" },
    { value: "Root surfaces", label: "are more vulnerable when gums recede" },
    { value: "Implants", label: "need daily cleaning and professional follow-up" },
  ],
  overviewTitle: "Maintaining Your Smile for a",
  overviewHighlight: "Comfort, Function, and Prevention",
  overviewDescription: "Age, medicines, medical conditions, dexterity, gum recession, tooth wear, and previous dental work can change oral-health needs. Care should focus on comfort, function, disease control, and realistic maintenance.",
  overviewDescription2: "Staying on top of your dental hygiene and getting regular checkups are the best ways to address these changes. We're here to help you understand what's happening and what you can do about it.",
  keyTips: [
    { title: "Combat Dry Mouth", description: "Sip water often and ask your dentist about saliva substitutes. Many medications cause dry mouth." },
    { title: "Protect Your Roots", description: "Receding gums expose tooth roots. Use a fluoride rinse to help prevent root decay." },
    { title: "Check Your Gums", description: "Gum disease can get worse with age. Look for bleeding or swelling and see your dentist right away." },
    { title: "Care for Dentures", description: "Clean your dentures daily. Give your gums a rest by taking them out for at least 6-8 hours a day." },
    { title: "Get Screened for Oral Cancer", description: "Your risk increases with age. Regular screenings are quick, painless, and can be life-saving." },
  ],
  milestones: [
    { age: "60s", title: "Increased Risk of Root Decay", description: "Gum recession is common, exposing the softer root surfaces of your teeth. This makes them more prone to decay." },
    { age: "60s", title: "Managing Medication Side Effects", description: "You may be taking more medications. Many of them can reduce saliva flow, leading to dry mouth and a higher risk of cavities." },
    { age: "65+", title: "Considering Tooth Replacement", description: "If you have missing teeth, this is a good time to explore options. Implants and modern dentures can restore your smile and function." },
    { age: "70s", title: "Denture Adjustments", description: "Your jawbone and gums can change over time. Your dentures may need to be relined or replaced for a comfortable fit." },
    { age: "70s", title: "Vigilant Gum Care", description: "The effects of gum disease can become more apparent. Careful home care and professional cleanings are critical." },
    { age: "80+", title: "Focus on Comfort and Function", description: "The main goal is to keep your mouth comfortable and functional. This allows you to eat well and maintain your quality of life." },
  ],
  milestonesNote: "These are general timelines. Your own dental health journey is unique.",
  commonConcerns: [
    { concern: "Dry Mouth (Xerostomia)", detail: "This is a very common side effect of medications for blood pressure, depression, and other conditions. It increases your risk for cavities and gum disease." },
    { concern: "Root Decay", detail: "When gums recede, the roots of your teeth are exposed. They don't have protective enamel, so they decay more easily." },
    { concern: "Gum Disease (Periodontitis)", detail: "Gum disease can progress silently for years. In seniors, it can lead to sore gums, bone loss, and even tooth loss." },
    { concern: "Denture Problems", detail: "Poorly fitting dentures can cause sores and make it hard to eat. Regular checkups ensure your dentures fit well." },
    { concern: "Oral Cancer", detail: "The risk of oral cancer increases significantly after age 60. Tobacco and alcohol use are major risk factors." },
  ],
  preventionTitle: "Proactive Steps for a Healthy Senior Smile",
  preventionDescription: "A few simple habits can make a huge difference in your long-term oral health. Here’s how you can stay ahead of potential problems.",
  preventionTips: [
    { title: "Brush Gently, Twice a Day", description: "Use a soft-bristled brush and fluoride toothpaste. Be gentle along the gumline to avoid causing more recession." },
    { title: "Floss or Clean Between Teeth Daily", description: "Use traditional floss, water flossers, or interdental brushes. This is key to preventing root and gum problems." },
    { title: "Use a Fluoride Mouth Rinse", description: "An extra dose of fluoride can help strengthen your enamel and exposed roots against decay." },
    { title: "Visit Your Dentist Regularly", description: "Don't wait for a problem. Regular checkups and cleanings are the best way to catch issues early." },
    { title: "Eat a Balanced Diet", description: "Limit sugary snacks and drinks. A healthy diet is good for your teeth and your whole body." },
  ],
  faqs: [
    { q: "How often should a senior see the dentist?", a: "You should see your dentist at least twice a year for checkups and cleanings. You might need more frequent visits if you have gum disease, a high risk of decay, or wear dentures." },
    { q: "Are dental implants a good option for seniors?", a: "Yes, for many seniors they are an excellent option. If you have enough healthy jawbone, implants can provide a stable, long-lasting solution for missing teeth that feels very natural." },
    { q: "What's the best way to clean my dentures?", a: "Brush them daily with a soft denture brush and a non-abrasive denture cleaner. Soak them overnight in a denture solution. Never use regular toothpaste, which is too abrasive." },
    { q: "My gums bleed when I brush. Should I be worried?", a: "Yes, bleeding gums are a sign of inflammation and often the first sign of gum disease. You should see your dentist to find out the cause and get it treated." },
    { q: "Can my old silver fillings be a problem?", a: "Amalgam fillings can last a long time, but they can also crack or leak over the years. Your dentist will check them at each visit to make sure they are still intact and not allowing decay to get underneath." },
  ],
  relatedLifeStagePages: [
    { name: "Children's Dental Health", slug: "childrens-dental-health", tagline: "Building a foundation for a lifetime of smiles." },
    { name: "Teen Braces Guide", slug: "teen-braces-guide", tagline: "Understanding orthodontics and oral hygiene." },
    { name: "Pregnancy Dental Care", slug: "pregnancy-dental-care", tagline: "Protecting your smile during pregnancy." },
  ],
  relatedCostPage: { name: "Dental Implant Cost", slug: "dental-implant-cost" },
  relatedTreatmentPage: { name: "Dentures Treatment", slug: "dentures-treatment" },
};

export default function SeniorDentalCare() {
  return <AgeSpecificTemplate data={data} />;
}
