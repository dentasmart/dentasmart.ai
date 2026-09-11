import TreatmentPageTemplate, { TreatmentPageData } from "./TreatmentPageTemplate";
import type { ContentGovernance, ContentSourceRef } from "@shared/contentGovernance";

const rootCanalSources: ContentSourceRef[] = [
  {
    id: "aae-root-canal-explained",
    title: "Root Canal Explained",
    publisher: "American Association of Endodontists",
    url: "https://www.aae.org/patients/root-canal-treatment/what-is-a-root-canal/root-canal-explained/",
    sourceType: "professional_dental_organization",
    verificationStatus: "verified",
    publicDisplayAllowed: true,
  },
  {
    id: "aae-post-treatment-care",
    title: "Post Treatment Care",
    publisher: "American Association of Endodontists",
    url: "https://www.aae.org/patients/your-office-visit/post-treatment-care/",
    sourceType: "professional_dental_organization",
    verificationStatus: "verified",
    publicDisplayAllowed: true,
  },
  {
    id: "ada-mouthhealthy-root-canals",
    title: "Root Canals",
    publisher: "American Dental Association, MouthHealthy",
    url: "https://www.mouthhealthy.org/all-topics-a-z/root-canals",
    sourceType: "professional_dental_organization",
    verificationStatus: "verified",
    publicDisplayAllowed: true,
  },
];

const data: TreatmentPageData = {
  slug: "root-canal-procedure",
  procedureName: "Root Canal",
  heroTitle: "What Happens During a",
  heroHighlight: "Root Canal",
  heroDescription: "A dentist or endodontist may discuss a root canal after evaluating inflamed or infected tissue inside a tooth. The procedure cleans and seals the canals inside the tooth and may be followed by a restoration.",
  metaTitle: "Root Canal Procedure: Steps, Recovery, and Questions | DentaSmart",
  metaDescription: "Learn how dentists may clean and seal the inside of a tooth during a root canal, what restoration may follow, and when to contact the treating clinician.",
  keywords: "root canal, root canal procedure, endodontic treatment, tooth infection, dental pain",
  statsStrip: [
    { value: "Inside Tooth", label: "Area Treated" },
    { value: "Local Anesthesia", label: "Commonly Used" },
    { value: "Restoration Plan", label: "After Treatment" },
  ],
  whyNeededTitle: "Why a Dentist May Discuss a",
  whyNeededHighlight: "Root Canal",
  whyNeededDescription: "A dentist may discuss root canal treatment when the soft tissue inside a tooth, called the pulp, is inflamed or infected. Deep decay, repeated dental work, a crack or chip, or an injury can affect this tissue.",
  whyNeededDescription2: "Pain while chewing, lingering sensitivity, gum swelling, or a change in the tooth are reasons to arrange a dental evaluation. These symptoms do not confirm that a root canal is needed.",
  warningSignsTitle: "Changes to Discuss with a Dentist",
  warningSigns: [
    "Severe tooth pain when chewing or applying pressure",
    "Lingering sensitivity to hot or cold temperatures",
    "A small, pimple-like bump on the gums near the tooth",
    "Darkening or discoloration of the tooth",
    "Swollen or tender gums",
  ],
  timelineSteps: [
    {
      step: "1",
      title: "Evaluation and Anesthesia",
      description: "The treating dentist examines the tooth and may use X-rays to evaluate it and the surrounding area. Local anesthesia is commonly used to numb the area before treatment.",
    },
    {
      step: "2",
      title: "Keeping the Tooth Clean and Dry",
      description: "The dentist may place a protective sheet around the tooth to help keep the treatment area clean and dry.",
    },
    {
      step: "3",
      title: "Access Opening and Cleaning",
      description: "The dentist makes an opening in the tooth, then uses small instruments to remove inflamed or infected tissue and clean and shape the canals inside the tooth.",
    },
    {
      step: "4",
      title: "Filling and Sealing the Canals",
      description: "After the canals are cleaned and shaped, the dentist fills and seals them. A temporary filling may be used before the tooth receives its final restoration.",
    },
    {
      step: "5",
      title: "Planning the Final Restoration",
      description: "After root canal treatment, the dentist may recommend or discuss a permanent filling, crown, or other restoration based on the tooth and how much structure remains.",
    },
  ],
  timelineNote: "The number of visits, treatment steps, and restoration plan can vary by tooth and clinical situation. Your treating dentist or endodontist can explain your plan.",
  risks: [
    {
      risk: "Need for a Final Restoration",
      detail: "A tooth may need a permanent filling, crown, or other restoration after treatment. Your dentist can explain the plan for protecting that tooth.",
    },
    {
      risk: "Symptoms That Do Not Improve",
      detail: "Mild tenderness can occur for a few days. Contact the treating clinician for severe or persistent pain or pressure, or for symptoms that return.",
    },
    {
      risk: "Visible Swelling or an Uneven Bite",
      detail: "Contact the treating clinician if you develop visible swelling, your bite feels uneven, or a temporary filling or crown comes out.",
    },
    {
      risk: "Tooth-Specific Factors",
      detail: "The condition of the tooth, its roots, and the final restoration affect the treatment plan. Ask the treating clinician what applies to your tooth.",
    },
  ],
  recoveryTitle: "What to Expect After Your Root Canal",
  recoveryDescription: "Your tooth may feel sensitive for a few days, especially if there was pain or infection before the procedure. Follow the treating clinician's instructions for recovery and pain management.",
  recoveryTips: [
    {
      title: "Follow the Treating Clinician's Instructions",
      description: "Use the aftercare instructions from the dentist or endodontist who treated you. Contact that office if you have a concern about recovery.",
    },
    {
      title: "Avoid Heavy Chewing Until Advised",
      description: "Avoid heavy chewing on the treated tooth until your dentist says it is ready for normal use or has placed the recommended restoration.",
    },
    {
      title: "Keep the Restoration Appointment",
      description: "Return for the permanent filling, crown, or other restoration your dentist recommends to help protect the treated tooth.",
    },
  ],
  faqs: [
    {
      q: "Is a root canal painful?",
      a: "Local anesthesia is commonly used to numb the area before treatment. Some people have mild soreness afterward, and the treating clinician can explain how to manage it.",
    },
    {
      q: "How long does a root canal take?",
      a: "The appointment plan varies by tooth and clinical situation. A dentist or endodontist can explain the expected steps and number of visits for your treatment.",
    },
    {
      q: "Will I need a crown after a root canal?",
      a: "A crown or another permanent restoration may be recommended based on the tooth and how much structure remains. Your dentist can explain what is appropriate for that tooth.",
    },
    {
      q: "What symptoms should I report after treatment?",
      a: "Contact the treating clinician for severe pain or pressure lasting more than a few days, visible swelling, an uneven bite, a lost temporary restoration, medication reaction, or returning symptoms.",
    },
    {
      q: "Can DentaSmart tell me whether I need a root canal?",
      a: "No. DentaSmart can help organize an already-provided dentist treatment plan and questions. It does not determine whether you need a root canal or replace a dentist's diagnosis or recommendation.",
    },
  ],
  relatedTreatmentPages: [
    { name: "Dental Implant", slug: "dental-implant-procedure", tagline: "The modern way to replace a missing tooth." },
    { name: "Dental Crown", slug: "dental-crown-procedure", tagline: "Protect and restore a damaged tooth." },
    { name: "Tooth Extraction", slug: "tooth-extraction-procedure", tagline: "When a tooth can't be saved." },
    { name: "Dental Cleaning", slug: "dental-cleaning-procedure", tagline: "The foundation of a healthy smile." },
  ],
  relatedCostPage: { name: "Root Canal Cost", slug: "root-canal-cost", ctaLabel: "See Root Canal Cost" },
  midContentCta: {
    headline: "Already have a treatment recommendation?",
    description: "Treatment Plan Review can help you organize an already-provided dentist recommendation and prepare questions. It does not determine whether a root canal is needed.",
    buttonText: "Review Your Treatment Plan",
  },
  followUpSupport: {
    title: "Prepare for Follow-Up Care",
    description: "DentaSmart can help keep relevant dental information organized and help you keep track of follow-up care and reminders. It does not verify healing or treatment success.",
  },
  governance: {
    contentId: "treatment:root-canal-procedure",
    contentVersion: "2026-09-10",
    riskClass: "health",
    claimClasses: ["TREATMENT_INFORMATION", "CLINICAL_EDUCATION"],
    directAnswer: {
      question: "What is root canal treatment?",
      answer: "A root canal is a dental procedure that may remove inflamed or infected pulp and clean and seal the canal spaces inside a tooth after a dentist evaluates whether it is appropriate for the situation.",
      intendedAudience: "People seeking general treatment information",
      sourceRefIds: rootCanalSources.map((source) => source.id),
    },
    sourceRefs: rootCanalSources,
    ctaPolicy: {
      placement: "after_educational_context",
      requiresProfessionalCareBoundary: true,
    },
  } satisfies ContentGovernance,
};

export default function RootCanalProcedure() {
  return <TreatmentPageTemplate data={data} />;
}
