import AgeSpecificTemplate, { AgeSpecificPageData } from "./AgeSpecificTemplate";

const data: AgeSpecificPageData = {
  slug: "pregnancy-dental-care",
  ageGroup: "Pregnant Women",
  heroTitle: "A Healthy Smile for",
  heroHighlight: "Two",
  heroDescription: "Your oral health is more important than ever when you're expecting. We'll guide you through the unique dental needs of pregnancy, from morning sickness to your baby's development.",
  metaTitle: "Dental Care During Pregnancy | DentaSmart",
  metaDescription: "Pregnancy hormones increase your risk of gum disease and cavities. Learn which dental treatments are safe, what to avoid, and how to protect your oral health.",
  keywords: "pregnancy dental care, pregnancy gingivitis, dental x-rays pregnancy, morning sickness teeth",
  statsStrip: [
    { value: "Up to 75%", label: "Of pregnant women have gingivitis" },
    { value: "100% Safe", label: "Dental cleanings & exams during pregnancy" },
    { value: "6 Weeks", label: "Baby's teeth start developing in the womb" },
  ],
  overviewTitle: "Your Dental Health",
  overviewHighlight: "During Pregnancy",
  overviewDescription: "Pregnancy brings a wave of changes to your body, and your mouth is no exception. Hormonal shifts can make your gums more sensitive and prone to inflammation, a condition known as pregnancy gingivitis. It's common, but it needs your attention.",
  overviewDescription2: "Beyond your own health, your dental habits now can affect your baby. Good nutrition and care help your little one's teeth develop strong from the very start. This guide will help you maintain a healthy smile throughout your pregnancy journey.",
  keyTips: [
    { title: "Brush Gently & Thoroughly", description: "Use a soft-bristled toothbrush and fluoride toothpaste twice a day to keep plaque under control." },
    { title: "Floss Daily", description: "Flossing removes food particles and plaque between your teeth and along the gumline, where gingivitis often starts." },
    { title: "Rinse After Morning Sickness", description: "If you experience morning sickness, rinse your mouth with water or a fluoride mouthwash to neutralize stomach acid." },
    { title: "Eat a Balanced Diet", description: "Include plenty of calcium-rich foods like yogurt and cheese to support your baby's developing teeth and bones." },
    { title: "Stay Hydrated", description: "Drinking plenty of water helps rinse away food particles and keeps your mouth's defenses strong." },
    { title: "Don't Skip Dental Visits", description: "Routine checkups and cleanings are safe and highly recommended during pregnancy to catch any issues early." },
  ],
  milestones: [
    { age: "1st Trimester", title: "Hormonal Changes Begin", description: "Rising hormone levels can increase blood flow to your gums, making them tender and swollen. This is the start of pregnancy gingivitis for many." },
    { age: "6 Weeks", title: "Baby's Tooth Buds Form", description: "Your baby's primary teeth are already beginning to develop under their gums. Your nutrition matters a lot right now." },
    { age: "2nd Trimester", title: "Optimal Time for Dental Work", description: "This is the safest and most comfortable time for necessary dental procedures like fillings or crowns. Morning sickness has often subsided." },
    { age: "3rd Trimester", title: "Baby's Teeth Harden", description: "The enamel on your baby's teeth is now forming. Continue to focus on a diet rich in calcium, vitamin D, and phosphorus." },
    { age: "Postpartum", title: "Schedule a Checkup", description: "After your baby arrives, schedule a dental visit for yourself to ensure your gums have returned to a healthy state." },
  ],
  commonConcerns: [
    { concern: "Pregnancy Gingivitis", detail: "This is the most common oral health issue during pregnancy. Look for red, swollen, or bleeding gums and be extra diligent with your oral hygiene." },
    { concern: "Tooth Sensitivity", detail: "Hormonal changes can make your teeth feel more sensitive to hot and cold. Using a toothpaste for sensitive teeth can help." },
    { concern: "Morning Sickness & Enamel Erosion", detail: "Stomach acid from vomiting can weaken your tooth enamel. Wait at least 30 minutes after being sick before brushing to avoid damage." },
    { concern: "Pregnancy 'Tumors' on Gums", detail: "These are non-cancerous growths that can appear on the gums, usually during the second trimester. They typically disappear after delivery." },
    { concern: "Food Cravings", detail: "Frequent snacking on sugary foods can increase your risk of cavities. Try to opt for healthier snacks and rinse with water after eating." },
  ],
  preventionTitle: "Protecting Your Smile",
  preventionDescription: "A few simple habits can make a big difference in keeping your mouth healthy for both you and your baby.",
  preventionTips: [
    { title: "Professional Cleanings", description: "Schedule at least one dental cleaning during your pregnancy to remove plaque and tartar buildup." },
    { title: "Use a Fluoride Mouthwash", description: "An alcohol-free fluoride rinse can help strengthen your enamel and fight bacteria." },
    { title: "Chew Sugar-Free Gum", description: "Chewing gum with xylitol after meals can help neutralize acids and reduce your risk of cavities." },
    { title: "Communicate with Your Dentist", description: "Let your dentist know you are pregnant and how far along you are. They can tailor your care to your specific needs." },
    { title: "Avoid Tobacco Products", description: "Smoking or using tobacco increases your risk of gum disease and can have harmful effects on your baby's development." },
  ],
  faqs: [
    { q: "Are dental X-rays safe during pregnancy?", a: "Yes, they are considered safe. Your dentist will use a lead apron to shield your abdomen and thyroid, and modern digital X-rays use very low levels of radiation." },
    { q: "Can I get a cavity filled while pregnant?", a: "Yes, it's important to treat cavities to prevent infection. The second trimester is the ideal time for procedures like fillings. Local anesthetics are safe for you and the baby." },
    { q: "What medications are safe to take for dental pain?", a: "Acetaminophen (Tylenol) is generally considered safe. However, you should always consult with your obstetrician before taking any medication during pregnancy." },
    { q: "Do I need to take extra calcium for my baby's teeth?", a: "Your baby will get the calcium they need from your body. It's important to eat a calcium-rich diet to replenish your own stores and keep your bones and teeth strong." },
    { q: "Will my teeth be weaker after pregnancy?", a: "This is a common myth. If you maintain good oral hygiene and a healthy diet, your teeth should not be any weaker after pregnancy. The key is managing the increased risks during this time." },
  ],
  relatedLifeStagePages: [
    { name: "Baby Teething Guide", slug: "baby-teething-guide", tagline: "Soothing your baby's teething journey." },
    { name: "Children's Dental Health", slug: "childrens-dental-health", tagline: "Building a foundation for a lifetime of smiles." },
    { name: "Teen Braces Guide", slug: "teen-braces-guide", tagline: "Understanding the world of orthodontics." },
  ],
  relatedCostPage: { name: "Dental Cleaning Cost", slug: "dental-cleaning-cost" },
  relatedTreatmentPage: { name: "Dental Cleaning Procedure", slug: "dental-cleaning-procedure" },
};

export default function PregnancyDentalCare() {
  return <AgeSpecificTemplate data={data} />;
}
