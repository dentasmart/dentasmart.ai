import TreatmentPageTemplate, { TreatmentPageData } from "./TreatmentPageTemplate";
import { governanceSourceRegistry, type ContentGovernance } from "@shared/contentGovernance";

const data: TreatmentPageData = {
  slug: "root-canal-procedure",
  procedureName: "Root Canal",
  heroTitle: "What to Expect During a",
  heroHighlight: "Root Canal",
  heroDescription: "A root canal isn't the scary procedure it's made out to be. It's a treatment to save a tooth that's badly infected or decayed, relieving your pain and getting your smile back to normal.",
  metaTitle: "Root Canal Procedure: A Step-by-Step Guide | DentaSmart",
  metaDescription: "Getting a root canal? Learn the step-by-step procedure, what to expect during and after treatment, recovery tips, and why it saves your natural tooth.",
  keywords: "root canal, root canal procedure, endodontic treatment, tooth infection, dental pain",
  statsStrip: [
    { value: ">95%", label: "Success Rate" },
    { value: "1-2", label: "Visits Typically Needed" },
    { value: "25M+", label: "Root Canals Performed Annually" },
  ],
  whyNeededTitle: "Why You Might Need a",
  whyNeededHighlight: "Root Canal",
  whyNeededDescription: "A root canal is needed when the soft tissue inside your tooth, called the pulp, becomes inflamed or infected. This can happen because of deep decay, repeated dental procedures on the tooth, or a crack or chip in the tooth. The pulp contains nerves and blood vessels, and when it's damaged, bacteria can multiply inside the tooth. This can lead to a serious infection or an abscess, which is a pus-filled pocket at the end of the tooth's roots.",
  whyNeededDescription2: "If left untreated, the infection can spread to other parts of your body and can even be life-threatening. A root canal cleans out the infection and saves the natural tooth, which is always better than having to replace it with an artificial one.",
  warningSignsTitle: "Signs You Might Need a Root Canal",
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
      title: "X-ray and Anesthesia",
      description: "First, your dentist will examine the tooth and take X-rays to see the shape of the root canals and determine if there are any signs of infection in the surrounding bone. Then, they'll use local anesthesia to numb the area near the tooth. You'll be awake during the procedure, but you won't feel any pain.",
      duration: "10-15 minutes",
    },
    {
      step: "2",
      title: "Placing the Dental Dam",
      description: "A small sheet of rubber, called a dental dam, is placed around the tooth to keep it clean and dry from saliva during the treatment.",
      duration: "5 minutes",
    },
    {
      step: "3",
      title: "Access Opening and Cleaning",
      description: "Your dentist will drill a small opening in the top of the tooth to access the pulp. They'll then use small instruments to remove the infected or inflamed pulp, and clean and shape the inside of the root canals.",
      duration: "30-60 minutes",
    },
    {
      step: "4",
      title: "Filling the Canals",
      description: "After the canals are cleaned and shaped, they are filled with a rubber-like material called gutta-percha. A temporary filling is placed to close the opening in your tooth.",
      duration: "15-20 minutes",
    },
    {
      step: "5",
      title: "Placing the Crown",
      description: "Most of the time, a tooth that needs a root canal also needs a crown to protect it from breaking in the future. Your dentist will prepare the tooth for a crown, take impressions, and place a temporary crown. You'll come back in a couple of weeks for the permanent crown.",
      duration: "30-45 minutes",
    },
  ],
  timelineNote: "The entire process can sometimes be completed in one visit, but often takes two. It depends on the complexity of the tooth and the extent of the infection.",
  risks: [
    {
      risk: "Re-infection",
      detail: "New decay can expose the root canal filling material to bacteria, causing a new infection. A good crown and proper oral hygiene can prevent this.",
    },
    {
      risk: "Missed Canals",
      detail: "If a tooth has more canals than expected and one is missed during cleaning, the infection can persist. This might require another procedure to fix.",
    },
    {
      risk: "Cracked Tooth",
      detail: "The procedure can sometimes cause a tiny, unseen crack in the root of the tooth. If this happens, the tooth may need to be extracted.",
    },
    {
      risk: "Instrument Breakage",
      detail: "Rarely, a dental instrument may break inside a canal. Often it can be left without harm, but sometimes it needs to be removed which can be complex.",
    },
  ],
  recoveryTitle: "What to Expect After Your Root Canal",
  recoveryDescription: "Recovery is usually straightforward. Your tooth might feel sensitive for the first few days, especially if there was pain or infection before the procedure. This is normal and can be managed with over-the-counter pain medication.",
  recoveryTimeline: "1-2 weeks",
  recoveryTips: [
    {
      title: "Don't Chew on the Tooth",
      description: "Avoid chewing or biting down on the treated tooth until it's fully restored with a permanent filling or crown. It can be fragile and might break.",
    },
    {
      title: "Practice Good Oral Hygiene",
      description: "Brush and floss as you normally would to keep the area clean and prevent other problems. A clean mouth heals faster.",
    },
    {
      title: "Follow Up with Your Dentist",
      description: "It's important to return for your crown or permanent filling. This final step is what protects your tooth and ensures the long-term success of the root canal.",
    },
  ],
  faqs: [
    {
      q: "Is a root canal painful?",
      a: "No, a root canal doesn't cause pain, it relieves it. With modern anesthesia, the procedure itself is painless. You might have some mild soreness afterward, but it's manageable.",
    },
    {
      q: "How long does a root canal take?",
      a: "A root canal procedure can take anywhere from 90 minutes to 3 hours. It can be done in one or two appointments, depending on your specific situation.",
    },
    {
      q: "What is the success rate of a root canal?",
      a: "Root canals have a very high success rate, over 95%. Many root canal-treated teeth last a lifetime with proper care.",
    },
    {
      q: "Can I go back to work after a root canal?",
      a: "Yes, most people can return to work or their normal activities the next day. You might want to take it easy for the rest of the day after your procedure.",
    },
    {
      q: "What happens if I don't get a root canal?",
      a: "If you don't get a root canal, the infection will spread. This can lead to a dental abscess, bone loss around the root, and you will likely lose the tooth.",
    },
  ],
  relatedTreatmentPages: [
    { name: "Dental Implant", slug: "dental-implant-procedure", tagline: "The modern way to replace a missing tooth." },
    { name: "Dental Crown", slug: "dental-crown-procedure", tagline: "Protect and restore a damaged tooth." },
    { name: "Tooth Extraction", slug: "tooth-extraction-procedure", tagline: "When a tooth can't be saved." },
    { name: "Dental Cleaning", slug: "dental-cleaning-procedure", tagline: "The foundation of a healthy smile." },
  ],
  relatedCostPage: { name: "Root Canal Cost", slug: "root-canal-cost" },
  governance: {
    contentId: "treatment:root-canal-procedure",
    contentVersion: "legacy",
    riskClass: "health",
    claimClasses: ["TREATMENT_INFORMATION", "CLINICAL_EDUCATION"],
    directAnswer: {
      question: "What is root canal treatment?",
      answer: "A root canal is a dental procedure that treats tissue inside a tooth. A dentist can explain whether it is appropriate for your situation.",
      intendedAudience: "People seeking general treatment information",
      sourceRefIds: [governanceSourceRegistry["ada-oral-health"].id],
    },
    sourceRefs: [governanceSourceRegistry["ada-oral-health"]],
    ctaPolicy: {
      placement: "after_educational_context",
      requiresProfessionalCareBoundary: true,
    },
    exceptions: [{
      code: "legacy_source_mapping",
      reason: "Existing category source is mapped as legacy-existing and is not a clinical approval.",
    }],
  } satisfies ContentGovernance,
};

export default function RootCanalProcedure() {
  return <TreatmentPageTemplate data={data} />;
}
