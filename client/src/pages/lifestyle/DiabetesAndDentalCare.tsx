import LifestyleTemplate, { LifestylePageData } from "./LifestyleTemplate";

const data: LifestylePageData = {
  slug: "diabetes-and-dental-care",
  topic: "Diabetes and Dental Care",
  heroTitle: "The Surprising Link Between Diabetes and",
  heroHighlight: "Your Oral Health",
  heroDescription: "Managing your blood sugar is only half the battle. Understand how diabetes affects your mouth and what you can do to protect your smile and your health.",
  metaTitle: "Diabetes and Dental Health: A Guide to Protecting Your Smile",
  metaDescription: "Learn about the two-way street between diabetes and oral health. Discover how to prevent gum disease, dry mouth, and other dental problems related to diabetes.",
  keywords: "diabetes oral health, gum disease and diabetes, dental care for diabetics, high blood sugar mouth problems, periodontal disease diabetes",
  statsStrip: [
    { value: "3x Higher", label: "Risk of Gum Disease for People with Diabetes" },
    { value: "95%", label: "of US Adults with Diabetes Have Periodontitis" },
    { value: "34.2 Million", label: "Americans Have Diabetes" },
  ],
  overviewTitle: "It’s a Two-Way Street",
  overviewHighlight: "How Diabetes and Oral Health Connect",
  overviewDescription: "You know diabetes affects your body, but did you realize it has a serious relationship with your mouth? High blood sugar creates the perfect environment for harmful bacteria to grow, leading to gum disease. At the same time, severe gum disease can actually cause blood sugar to rise, making your diabetes harder to control.",
  overviewDescription2: "Think of it as a cycle. Poorly managed blood sugar weakens your mouth's defenses, and an unhealthy mouth can make your diabetes worse. Taking control of your oral health is a powerful step in managing your overall health.",
  impacts: [
    { area: "Gum Disease", detail: "High blood sugar feeds bacteria, leading to gingivitis and more severe periodontal disease. This can cause sore, bleeding gums and even tooth loss." },
    { area: "Dry Mouth", detail: "Diabetes can reduce saliva flow. A dry mouth is not just uncomfortable, it increases your risk for cavities because saliva helps wash away food and acid." },
    { area: "Thrush (Fungal Infection)", detail: "People with diabetes are more prone to this infection, which causes painful white patches in your mouth. High sugar in your saliva can fuel fungus growth." },
    { area: "Slow Healing", detail: "Diabetes can make it harder for your body to heal. After a dental procedure like a tooth extraction, healing might take longer and the risk of infection is higher." },
    { area: "Changes in Taste", detail: "Some people with diabetes experience a change in how they perceive sweet, sour, salty, and bitter tastes, which can affect your enjoyment of food." },
  ],
  doList: [
    { text: "Control your blood sugar. This is the most important step you can take to protect your oral health." },
    { text: "Brush your teeth twice a day with fluoride toothpaste and a soft-bristled brush." },
    { text: "Floss every day to remove plaque and food from between your teeth and under your gumline." },
    { text: "Visit your dentist for regular checkups and cleanings. Make sure they know you have diabetes." },
    { text: "Drink plenty of water throughout the day to combat dry mouth." },
    { text: "Inspect your mouth regularly for any signs of trouble, like red or swollen gums." },
  ],
  dontList: [
    { text: "Don't smoke or use tobacco products. Smoking makes gum disease much worse, especially for people with diabetes." },
    { text: "Don't ignore bleeding gums. This is an early sign of gum disease that needs attention." },
    { text: "Don't consume sugary drinks and snacks frequently, as they feed the bacteria that cause cavities." },
    { text: "Don't skip your dental appointments, even if your mouth feels fine." },
    { text: "Don't use mouthwashes that contain alcohol, as they can make a dry mouth even drier." },
  ],
  protectionTips: [
    { title: "Tell Your Dentist", description: "Always inform your dental team that you have diabetes and share your latest A1c results. This helps them provide the best care for you." },
    { title: "Time Your Appointments", description: "Schedule your dental visits in the morning after you have eaten a good breakfast to help keep your blood sugar stable during the appointment." },
    { title: "Stay Hydrated", description: "Sip water all day long. You can also try chewing sugar-free gum or using an artificial saliva substitute to help with dry mouth." },
    { title: "Choose Tooth-Friendly Foods", description: "Eat a balanced diet rich in vegetables, fruits, and whole grains. These foods are good for your blood sugar and great for your teeth too." },
    { title: "Use a Soft Brush", description: "Your gums might be sensitive. A soft-bristled toothbrush cleans effectively without causing irritation." },
  ],
  warningSignsTitle: "When to See a Dentist Right Away",
  warningSignsDescription: "Your mouth often sends signals when something is wrong. If you notice any of these signs, it’s time to check in with your dentist and your doctor to make sure your diabetes management plan is on track.",
  warningSigns: [
    "Gums that are red, swollen, tender, or bleed easily",
    "Gums that have pulled away from your teeth",
    "Persistent bad breath or a bad taste in your mouth",
    "Pus between your teeth and gums",
    "Teeth that are loose or separating",
    "Sores in your mouth that are slow to heal",
  ],
  faqs: [
    { q: "How often should I see the dentist if I have diabetes?", a: "It's best to see your dentist at least twice a year for checkups and cleanings. Depending on your oral health, your dentist might recommend more frequent visits to keep things in check." },
    { q: "Can my dentist tell if my diabetes is not under control?", a: "While a dentist can't diagnose diabetes, they can spot warning signs. Worsening gum disease, dry mouth, and slow healing can all be indicators that your blood sugar levels may be too high." },
    { q: "Is it safe to have dental work done if I have diabetes?", a: "Yes, it is generally safe. The key is to have your diabetes well-managed. Inform your dentist about your condition and any medications you take before any procedure, including a routine cleaning." },
    { q: "Will treating my gum disease help my diabetes?", a: "Research shows it can. Because severe gum disease is an infection, it can cause blood sugar levels to rise. Treating the infection can help improve blood sugar control." },
    { q: "What's the best way to deal with dry mouth from diabetes?", a: "Drinking lots of water is the first step. You can also try sugar-free gum or candies to stimulate saliva, and ask your dentist about saliva substitutes if the problem persists." },
  ],
  relatedLifestylePages: [
    { name: "Smoking and Oral Health", slug: "smoking-and-oral-health", tagline: "The impact of tobacco on your smile." },
    { name: "Diet and Your Teeth", slug: "diet-and-teeth", tagline: "How what you eat affects your oral health." },
    { name: "Sports Mouthguards", slug: "sports-mouthguards", tagline: "Protecting your teeth during physical activity." },
    { name: "Oral Piercing Risks", slug: "oral-piercing-risks", tagline: "What to know before getting a piercing." },
  ],
  relatedCostPage: { name: "Dental Cleaning Cost", slug: "dental-cleaning-cost" },
  relatedTreatmentPage: { name: "Dental Cleaning Procedure", slug: "dental-cleaning-procedure" },
};

export default function DiabetesAndDentalCare() {
  return <LifestyleTemplate data={data} />;
}
