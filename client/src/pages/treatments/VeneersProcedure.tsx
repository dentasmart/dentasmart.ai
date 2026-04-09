import TreatmentPageTemplate, { TreatmentPageData } from "./TreatmentPageTemplate";

const data: TreatmentPageData = {
  slug: "veneers-procedure",
  procedureName: "Veneers",
  heroTitle: "What to Expect with",
  heroHighlight: "Dental Veneers",
  heroDescription: "Veneers are thin, custom-made shells that cover the front of your teeth to improve their appearance. Think of them like a new face for your teeth to fix chips, gaps, or discoloration.",
  metaTitle: "Veneers Procedure: What to Expect, Risks, and Recovery",
  metaDescription: "Getting dental veneers? Learn the full procedure from consultation to bonding, types of veneers, recovery expectations, and how to make them last longer.",
  keywords: "dental veneers, veneers procedure, cosmetic dentistry, smile makeover, porcelain veneers",
  statsStrip: [
    { value: "95%", label: "Success Rate at 10 Years" },
    { value: "8%", label: "of Americans Have Veneers" },
    { value: "78%", label: "Patient Satisfaction Rate" },
  ],
  whyNeededTitle: "Why You Might Consider",
  whyNeededHighlight: "Dental Veneers",
  whyNeededDescription: "If you have teeth that are chipped, stained, or not aligned, veneers can be a great option. They are a cosmetic solution to give you a more uniform, brighter smile. People often get them to fix cosmetic issues that they feel self-conscious about.",
  whyNeededDescription2: "Veneers can also be used to close small gaps between teeth or to fix minor misalignments, saving you from needing braces in some cases.",
  warningSignsTitle: "Signs You Might Be a Good Candidate for Veneers",
  warningSigns: [
    "You have chipped or cracked teeth.",
    "Your teeth are permanently stained and don't respond to whitening.",
    "You have small gaps between your teeth.",
    "Your teeth are slightly crooked or misshapen.",
  ],
  timelineSteps: [
    { step: "1", title: "Consultation", description: "You'll talk to your dentist about what you want to change. They will examine your teeth and make sure veneers are a good option for you.", duration: "30-60 minutes" },
    { step: "2", title: "Tooth Preparation", description: "Your dentist will remove a very thin layer of enamel from your teeth to make space for the veneers. Then, they'll take an impression of your teeth to send to the lab.", duration: "1-2 hours" },
    { step: "3", title: "Temporary Veneers", description: "You'll get temporary veneers to wear while the lab makes your permanent ones. This protects your teeth and lets you get used to the feel.", duration: "2-3 weeks" },
    { step: "4", title: "Bonding", description: "Your dentist will remove the temporary veneers and place the permanent ones on your teeth to check the fit and color. After any adjustments, they will be permanently bonded to your teeth.", duration: "1-2 hours" },
  ],
  risks: [
    { risk: "Tooth Sensitivity", detail: "You might feel some sensitivity to hot and cold for a few days after the procedure. This is because a small amount of enamel is removed." },
    { risk: "Veneer Damage", detail: "Veneers are strong, but they can still chip or crack if you bite down on hard things like ice or your fingernails. It's best to avoid these habits." },
    { risk: "Color Mismatch", detail: "The color of your veneers can't be changed after they are in place. It's a good idea to whiten your other teeth beforehand if you want a brighter smile." },
    { risk: "Gum Irritation", detail: "Your gums might be a little sore for a few days as they get used to the new veneers. Rinsing with salt water can help." },
  ],
  recoveryTitle: "What to Expect After",
  recoveryDescription: "Recovery from a veneers procedure is usually very quick. Most people get back to their normal routine the same day.",
  recoveryTimeline: "1-2 weeks",
  recoveryTips: [
    { title: "Stick to Soft Foods Initially", description: "For the first few days, it's a good idea to eat softer foods to avoid putting too much pressure on your new veneers." },
    { title: "Practice Good Oral Hygiene", description: "Brush and floss just like you normally would. Keeping your gums healthy is important for the long-term success of your veneers." },
    { title: "Avoid Staining Foods and Drinks", description: "Just like natural teeth, veneers can stain. Try to limit coffee, tea, and red wine to keep your smile bright." },
  ],
  faqs: [
    { q: "How long do veneers last?", a: "With proper care, porcelain veneers can last for 10-15 years, and sometimes even longer. It really depends on your oral hygiene habits." },
    { q: "Do veneers ruin your real teeth?", a: "No, they don't. A very small amount of enamel is removed to make them fit, but this doesn't harm the tooth." },
    { q: "Can you get cavities with veneers?", a: "You can still get cavities on the parts of the tooth that aren't covered by the veneer. That's why it's so important to keep up with brushing and flossing." },
    { q: "Are veneers painful to get?", a: "Most people report little to no pain during the procedure. Your dentist will use a local anesthetic to numb the area." },
    { q: "How much do veneers cost?", a: "The cost can vary a lot depending on where you live and how many veneers you get. They can range from $925 to $2,500 per tooth." },
  ],
  relatedTreatmentPages: [
    { name: "Teeth Whitening", slug: "teeth-whitening-procedure", tagline: "Brighten your smile" },
    { name: "Dental Crowns", slug: "dental-crown-procedure", tagline: "Protect a damaged tooth" },
    { name: "Braces", slug: "braces-treatment", tagline: "Straighten your teeth" },
    { name: "Dental Implants", slug: "dental-implant-procedure", tagline: "Replace a missing tooth" },
  ],
  relatedCostPage: { name: "Veneers Cost", slug: "veneers-cost" },
};

export default function VeneersProcedure() {
  return <TreatmentPageTemplate data={data} />;
}
