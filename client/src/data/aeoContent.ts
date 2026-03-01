/**
 * AEO (Answer Engine Optimization) supplemental content.
 * Keyed by slug. Used by condition, symptom, and guide templates
 * to render citable micro-blocks, "what to do today" steps,
 * and "questions to ask your dentist" bullets.
 */

export interface AEOBlock {
  /** One-sentence citable summary for AI answer engines */
  inOneSentence: string;
  /** 3 actionable steps the reader can take today */
  whatToDoToday: string[];
  /** 5 questions to bring to the next dental appointment */
  dentistQuestions: string[];
}

export const aeoConditions: Record<string, AEOBlock> = {
  toothache: {
    inOneSentence:
      "A toothache usually means the nerve inside the tooth is irritated by decay, a crack, or infection, and it needs professional attention if the pain lasts more than a day or two.",
    whatToDoToday: [
      "Rinse with warm salt water (half a teaspoon of salt in a glass of warm water) to reduce swelling.",
      "Take an over-the-counter pain reliever like ibuprofen to manage pain and inflammation.",
      "Avoid very hot, cold, or sugary foods until you can see a dentist."
    ],
    dentistQuestions: [
      "What is causing my toothache, and how serious is it?",
      "Do I need a filling, crown, or root canal?",
      "Are there any signs of infection that need immediate treatment?",
      "What can I do at home to manage the pain until my next visit?",
      "Could this be related to grinding my teeth at night?"
    ]
  },
  cavities: {
    inOneSentence:
      "A cavity is a small hole in the tooth caused by bacteria and acid wearing through the enamel, and it will keep growing until a dentist fills it.",
    whatToDoToday: [
      "Brush with fluoride toothpaste twice a day to slow further decay.",
      "Cut back on sugary snacks and acidic drinks that feed cavity-causing bacteria.",
      "Schedule a dental appointment to have the cavity evaluated and treated."
    ],
    dentistQuestions: [
      "How deep is the cavity, and has it reached the nerve?",
      "What type of filling do you recommend, and why?",
      "Are there other early cavities I should watch?",
      "Is a fluoride treatment or sealant a good idea for prevention?",
      "How often should I come back for checkups given my cavity risk?"
    ]
  },
  "gum-disease": {
    inOneSentence:
      "Gum disease (periodontal disease) is a bacterial infection of the gums that starts with inflammation and, if untreated, can lead to bone loss and tooth loss.",
    whatToDoToday: [
      "Brush gently along the gumline with a soft-bristle toothbrush twice a day.",
      "Start flossing daily to remove plaque your toothbrush cannot reach.",
      "Book a dental cleaning to remove tartar buildup that causes gum inflammation."
    ],
    dentistQuestions: [
      "What stage is my gum disease, gingivitis or periodontitis?",
      "Do I need a deep cleaning (scaling and root planing)?",
      "Has there been any bone loss around my teeth?",
      "What daily routine changes will help my gums heal?",
      "How often should I schedule cleanings going forward?"
    ]
  },
  "wisdom-teeth-pain": {
    inOneSentence:
      "Wisdom tooth pain usually happens when the tooth is impacted or partially erupted, trapping food and bacteria under the gum and causing swelling or infection.",
    whatToDoToday: [
      "Rinse the area gently with warm salt water several times a day.",
      "Use over-the-counter ibuprofen to reduce swelling and pain.",
      "Keep the area clean by brushing carefully around the wisdom tooth."
    ],
    dentistQuestions: [
      "Is my wisdom tooth impacted, and does it need to be removed?",
      "Is there an infection that needs antibiotics first?",
      "What are the risks of removing versus leaving the tooth?",
      "Will I need a referral to an oral surgeon?",
      "What is the typical recovery time after extraction?"
    ]
  },
  "teeth-whitening": {
    inOneSentence:
      "Teeth whitening uses peroxide-based agents to break down stains on enamel, and results vary depending on the type of staining and the method used.",
    whatToDoToday: [
      "Reduce intake of coffee, tea, and red wine that stain teeth over time.",
      "Brush with a whitening toothpaste approved by the ADA for surface stain removal.",
      "Talk to your dentist before using any over-the-counter whitening kit to avoid sensitivity."
    ],
    dentistQuestions: [
      "What type of staining do I have, and will whitening work for it?",
      "Is in-office whitening better than at-home trays for my situation?",
      "How long will the results last, and how do I maintain them?",
      "Will whitening damage my enamel or increase sensitivity?",
      "Are there alternatives like veneers if whitening is not effective?"
    ]
  },
  "sensitive-teeth": {
    inOneSentence:
      "Tooth sensitivity happens when the protective enamel wears thin or gums recede, exposing the inner layer (dentin) to hot, cold, or sweet triggers.",
    whatToDoToday: [
      "Switch to a desensitizing toothpaste and use it consistently for at least two weeks.",
      "Avoid acidic foods and drinks (citrus, soda, vinegar) that erode enamel.",
      "Use a soft-bristle toothbrush and brush gently to avoid further enamel wear."
    ],
    dentistQuestions: [
      "What is causing my sensitivity, enamel erosion or gum recession?",
      "Do I need a fluoride varnish or bonding agent to protect exposed areas?",
      "Could my sensitivity be a sign of a cavity or crack?",
      "Is my brushing technique contributing to the problem?",
      "Should I use a prescription-strength desensitizing product?"
    ]
  },
  "cracked-tooth": {
    inOneSentence:
      "A cracked tooth has a fracture line running through the enamel (and sometimes deeper), which can cause sharp pain when biting and may worsen without treatment.",
    whatToDoToday: [
      "Avoid chewing on the side with the cracked tooth to prevent the crack from spreading.",
      "Take ibuprofen if you are experiencing pain or swelling.",
      "See a dentist as soon as possible, cracks can worsen quickly."
    ],
    dentistQuestions: [
      "How deep is the crack, and has it reached the root?",
      "Do I need a crown, bonding, or a root canal?",
      "Is there a risk of losing this tooth?",
      "What caused the crack, and how can I prevent it from happening again?",
      "If the tooth cannot be saved, what are my replacement options?"
    ]
  },
  "dental-abscess": {
    inOneSentence:
      "A dental abscess is a pocket of pus caused by a bacterial infection, usually at the root of a tooth or in the gums, and it requires professional treatment to prevent the infection from spreading.",
    whatToDoToday: [
      "Rinse with warm salt water to help draw the infection toward the surface and ease discomfort.",
      "Take over-the-counter pain relief and avoid hot or cold foods on the affected side.",
      "See a dentist or visit urgent care today, abscesses do not heal on their own."
    ],
    dentistQuestions: [
      "Is this abscess from a tooth infection or a gum infection?",
      "Do I need antibiotics, drainage, or both?",
      "Can the tooth be saved, or does it need to be extracted?",
      "Has the infection spread to nearby tissue or bone?",
      "What follow-up care will I need after treatment?"
    ]
  },
  "root-canal": {
    inOneSentence:
      "A root canal removes infected or damaged tissue (pulp) from inside the tooth, saves the outer structure, and eliminates the source of pain and infection.",
    whatToDoToday: [
      "Manage pain with ibuprofen and avoid chewing on the affected tooth.",
      "Keep the area clean by brushing gently and rinsing with salt water.",
      "Call your dentist to discuss whether a root canal is the right treatment for your situation."
    ],
    dentistQuestions: [
      "Is a root canal the best option, or should the tooth be extracted?",
      "How many appointments will the procedure take?",
      "Will I need a crown after the root canal?",
      "What is the success rate for this particular tooth?",
      "What happens if I delay or skip the root canal?"
    ]
  },
  "dental-crown": {
    inOneSentence:
      "A dental crown is a cap placed over a damaged tooth to restore its shape, strength, and appearance, and it typically lasts 10 to 15 years with proper care.",
    whatToDoToday: [
      "Avoid sticky or very hard foods if you have a temporary crown in place.",
      "Continue brushing and flossing around the crown area gently.",
      "Write down any questions about crown materials (porcelain, metal, zirconia) for your next visit."
    ],
    dentistQuestions: [
      "What material do you recommend for my crown, and why?",
      "How long will the temporary crown need to stay on?",
      "Will the crown look and feel like my natural tooth?",
      "What is the expected lifespan of this crown?",
      "What should I do if the crown feels loose or uncomfortable?"
    ]
  },
  "teeth-grinding": {
    inOneSentence:
      "Teeth grinding (bruxism) is the involuntary clenching or grinding of teeth, often during sleep, which can wear down enamel, cause jaw pain, and crack teeth over time.",
    whatToDoToday: [
      "Notice if you clench your jaw during the day and consciously relax it (lips together, teeth apart).",
      "Reduce caffeine and alcohol intake, both can increase nighttime grinding.",
      "Ask your dentist about a custom night guard to protect your teeth while you sleep."
    ],
    dentistQuestions: [
      "Is there visible wear on my teeth from grinding?",
      "Would a custom night guard help, and how much does it cost?",
      "Could my grinding be related to stress, sleep apnea, or bite alignment?",
      "Have any of my teeth been damaged enough to need treatment?",
      "Should I see a specialist for my jaw pain?"
    ]
  },
  "dental-implants": {
    inOneSentence:
      "A dental implant is a titanium post surgically placed in the jawbone to replace a missing tooth root, topped with a crown that looks and functions like a natural tooth.",
    whatToDoToday: [
      "Research whether you are a candidate by considering your bone density and overall health.",
      "Write down your questions about cost, timeline, and alternatives (bridge, partial denture).",
      "Schedule a consultation with a dentist or oral surgeon who places implants."
    ],
    dentistQuestions: [
      "Am I a good candidate for an implant, or do I need bone grafting first?",
      "How long does the entire implant process take from start to finish?",
      "What is the total cost, and does my insurance cover any of it?",
      "What are the risks of implant failure, and how common is it?",
      "How do I care for an implant compared to a natural tooth?"
    ]
  },
  "dry-socket": {
    inOneSentence:
      "Dry socket happens when the blood clot at an extraction site dislodges or dissolves too early, exposing the bone and nerves to air, food, and bacteria, causing intense pain.",
    whatToDoToday: [
      "Avoid using straws, spitting, or smoking, all of which can dislodge the blood clot.",
      "Rinse very gently with warm salt water to keep the area clean.",
      "Contact your dentist if you have increasing pain 2 to 4 days after an extraction."
    ],
    dentistQuestions: [
      "Do I have dry socket, or is this normal post-extraction pain?",
      "What treatment will you use to pack and protect the socket?",
      "How long will it take for the socket to heal after treatment?",
      "What pain management do you recommend during healing?",
      "What can I do differently next time to prevent dry socket?"
    ]
  },
  "oral-thrush": {
    inOneSentence:
      "Oral thrush is a fungal infection (candidiasis) that causes creamy white patches on the tongue and inner cheeks, often triggered by antibiotics, dry mouth, or a weakened immune system.",
    whatToDoToday: [
      "Rinse your mouth with a baking soda solution (1 teaspoon in a glass of water) to help balance pH.",
      "Eat plain yogurt with live cultures to support healthy bacteria in your mouth.",
      "See a doctor or dentist for an antifungal prescription if patches do not clear in a few days."
    ],
    dentistQuestions: [
      "Is this oral thrush, or could it be something else?",
      "What is causing the thrush, medication, dry mouth, or another condition?",
      "Do I need a prescription antifungal, or will it clear on its own?",
      "Could this be a sign of an underlying health issue?",
      "How do I prevent thrush from coming back?"
    ]
  },
  "tmj-disorder": {
    inOneSentence:
      "TMJ disorder (temporomandibular joint dysfunction) causes pain, clicking, or locking in the jaw joint, often related to clenching, grinding, stress, or bite misalignment.",
    whatToDoToday: [
      "Apply a warm compress to the jaw for 15 minutes to relax the muscles.",
      "Eat soft foods and avoid wide jaw opening (yawning, large bites) to reduce strain.",
      "Practice jaw relaxation: rest your tongue on the roof of your mouth with teeth slightly apart."
    ],
    dentistQuestions: [
      "Is my jaw pain from TMJ disorder, or could it be something else?",
      "Would a night guard or splint help my symptoms?",
      "Do I need imaging (X-ray or MRI) to check the joint?",
      "Should I see a TMJ specialist or physical therapist?",
      "Are there exercises I can do at home to improve jaw mobility?"
    ]
  }
};

export const aeoSymptoms: Record<string, AEOBlock> = {
  "tooth-pain-when-biting": {
    inOneSentence:
      "Pain when biting down usually means a tooth is cracked, has a deep cavity, or the nerve inside is inflamed (pulpitis), and it should be checked by a dentist.",
    whatToDoToday: [
      "Avoid chewing on the painful side to prevent further damage.",
      "Take ibuprofen to reduce inflammation and manage pain.",
      "Schedule a dental exam to identify the exact cause before it worsens."
    ],
    dentistQuestions: [
      "Is the pain from a crack, cavity, or nerve inflammation?",
      "Do I need an X-ray to see what is happening below the surface?",
      "Could this be related to a recent filling or dental work?",
      "What treatment options do I have, and which do you recommend?",
      "Is there a risk of losing this tooth if I wait?"
    ]
  },
  "bleeding-gums": {
    inOneSentence:
      "Bleeding gums are usually the first sign of gum disease (gingivitis) caused by plaque buildup, and they can often be reversed with better brushing and flossing habits.",
    whatToDoToday: [
      "Brush gently twice a day with a soft-bristle toothbrush, focusing on the gumline.",
      "Start flossing daily, even if it causes slight bleeding at first (this usually improves in a week).",
      "Rinse with an antiseptic mouthwash to reduce bacteria."
    ],
    dentistQuestions: [
      "Is my bleeding from gingivitis, or has it progressed to periodontitis?",
      "Do I need a professional cleaning or deep cleaning?",
      "Could medication or a health condition be contributing to the bleeding?",
      "Am I brushing and flossing correctly?",
      "How soon should I expect improvement with better oral care?"
    ]
  },
  "tooth-sensitivity": {
    inOneSentence:
      "Tooth sensitivity to hot, cold, or sweet is usually caused by exposed dentin from enamel erosion or gum recession, and desensitizing toothpaste can help within two weeks.",
    whatToDoToday: [
      "Switch to a desensitizing toothpaste (look for potassium nitrate as the active ingredient).",
      "Avoid very hot, cold, or acidic foods and drinks for now.",
      "Use a soft-bristle toothbrush and brush gently to avoid further enamel wear."
    ],
    dentistQuestions: [
      "Is my sensitivity from enamel erosion, gum recession, or a cavity?",
      "Would a fluoride varnish or bonding treatment help?",
      "Am I brushing too hard, and is that contributing to the problem?",
      "Should I avoid any specific foods or drinks long-term?",
      "Could this sensitivity be a sign of a more serious issue?"
    ]
  },
  "jaw-pain": {
    inOneSentence:
      "Jaw pain is commonly caused by teeth grinding (bruxism), TMJ disorder, or muscle tension from stress, and it can usually be managed with self-care and a night guard.",
    whatToDoToday: [
      "Apply a warm compress to the jaw area for 15 to 20 minutes to relax tight muscles.",
      "Eat soft foods and avoid chewing gum or hard snacks.",
      "Practice conscious jaw relaxation throughout the day: lips together, teeth apart, tongue on the roof of your mouth."
    ],
    dentistQuestions: [
      "Is my jaw pain from TMJ disorder, grinding, or something else?",
      "Would a custom night guard help prevent further damage?",
      "Do I need imaging to check the jaw joint?",
      "Should I see a TMJ specialist or physical therapist?",
      "Are there jaw exercises I can do at home to reduce pain?"
    ]
  },
  "bad-breath": {
    inOneSentence:
      "Persistent bad breath (halitosis) is usually caused by bacteria on the tongue, gum disease, or dry mouth, and it often improves with better oral hygiene and tongue cleaning.",
    whatToDoToday: [
      "Clean your tongue with a tongue scraper or the back of your toothbrush after brushing.",
      "Drink more water throughout the day to keep your mouth moist and wash away bacteria.",
      "Floss daily to remove food particles trapped between teeth."
    ],
    dentistQuestions: [
      "Is my bad breath from gum disease, dry mouth, or another cause?",
      "Do I have any cavities or infections that could be contributing?",
      "Should I use a specific mouthwash or oral rinse?",
      "Could a medical condition (acid reflux, sinus issues) be involved?",
      "How often should I schedule cleanings to help manage this?"
    ]
  },
  "swollen-gums": {
    inOneSentence:
      "Swollen gums are usually a sign of inflammation from plaque buildup (gingivitis), an abscess, or irritation from food trapped between teeth.",
    whatToDoToday: [
      "Rinse with warm salt water 2 to 3 times a day to reduce swelling.",
      "Brush gently around the swollen area and floss carefully to remove trapped debris.",
      "See a dentist if the swelling does not improve in a few days or is accompanied by pain or pus."
    ],
    dentistQuestions: [
      "Is the swelling from gum disease, an abscess, or something else?",
      "Do I need antibiotics or professional drainage?",
      "Could a food trap or ill-fitting restoration be causing the irritation?",
      "Is there bone loss underneath the swollen area?",
      "What can I do at home to prevent this from recurring?"
    ]
  },
  "loose-tooth": {
    inOneSentence:
      "A loose tooth in an adult usually means advanced gum disease has damaged the bone supporting the tooth, or the tooth has been injured by trauma.",
    whatToDoToday: [
      "Avoid wiggling or pushing on the loose tooth with your tongue or fingers.",
      "Eat soft foods and chew on the opposite side to avoid putting pressure on it.",
      "See a dentist as soon as possible, early treatment can sometimes save the tooth."
    ],
    dentistQuestions: [
      "What is causing my tooth to be loose, gum disease, injury, or something else?",
      "Can this tooth be saved, or does it need to be extracted?",
      "Do I need a splint to stabilize the tooth while it heals?",
      "Has there been significant bone loss around this tooth?",
      "What are my replacement options if the tooth cannot be saved?"
    ]
  },
  "dry-mouth": {
    inOneSentence:
      "Dry mouth (xerostomia) happens when salivary glands do not produce enough saliva, often as a side effect of medication, and it increases the risk of cavities and gum disease.",
    whatToDoToday: [
      "Sip water frequently throughout the day and keep a water bottle nearby.",
      "Chew sugar-free gum or suck on sugar-free lozenges to stimulate saliva production.",
      "Avoid caffeine, alcohol, and tobacco, which all make dry mouth worse."
    ],
    dentistQuestions: [
      "Could my dry mouth be caused by a medication I am taking?",
      "Should I use a saliva substitute or prescription rinse?",
      "Am I at higher risk for cavities because of dry mouth?",
      "Do I need more frequent dental cleanings or fluoride treatments?",
      "Should I see my doctor to rule out an underlying condition like Sjogren syndrome?"
    ]
  },
  "tooth-discoloration": {
    inOneSentence:
      "Tooth discoloration can be extrinsic (surface stains from food, coffee, or tobacco) or intrinsic (internal changes from medication, trauma, or aging), and the treatment depends on the type.",
    whatToDoToday: [
      "Brush with a whitening toothpaste to help remove surface stains.",
      "Reduce intake of staining foods and drinks (coffee, tea, red wine, berries).",
      "Schedule a dental visit to determine if the discoloration is surface-level or deeper."
    ],
    dentistQuestions: [
      "Is my discoloration from surface stains or an internal issue?",
      "Will professional whitening work for my type of staining?",
      "Could the discoloration be a sign of decay or a dead nerve?",
      "Are veneers or bonding a better option for my situation?",
      "How can I prevent further staining after treatment?"
    ]
  },
  "mouth-sores": {
    inOneSentence:
      "Mouth sores (canker sores, cold sores, or irritation ulcers) are usually harmless and heal within 1 to 2 weeks, but persistent sores lasting longer than 3 weeks should be checked by a dentist.",
    whatToDoToday: [
      "Rinse with warm salt water or a baking soda rinse to soothe the sore.",
      "Avoid spicy, acidic, or rough-textured foods that irritate the area.",
      "Apply an over-the-counter oral gel (like benzocaine) to numb the pain."
    ],
    dentistQuestions: [
      "Is this a canker sore, cold sore, or something I should be concerned about?",
      "Should I be worried if it has not healed in two weeks?",
      "Could a sharp tooth edge or dental appliance be causing the sore?",
      "Do I need a biopsy or further testing?",
      "What can I do to prevent mouth sores from recurring?"
    ]
  }
};

export const aeoGuides: Record<string, AEOBlock> = {
  "brushing-guide": {
    inOneSentence:
      "Proper brushing means using a soft-bristle brush at a 45-degree angle to the gumline, brushing for two full minutes twice a day, and replacing your brush every 3 months.",
    whatToDoToday: [
      "Set a two-minute timer on your phone and brush all four quadrants of your mouth evenly.",
      "Angle your toothbrush bristles toward the gumline at 45 degrees and use short, gentle strokes.",
      "Check your toothbrush: if the bristles are frayed, replace it today."
    ],
    dentistQuestions: [
      "Am I brushing with the right technique and pressure?",
      "Should I switch to an electric toothbrush?",
      "Are there areas in my mouth I am consistently missing?",
      "What type of toothpaste do you recommend for my needs?",
      "How soon after eating should I brush?"
    ]
  },
  "flossing-guide": {
    inOneSentence:
      "Flossing removes plaque and food from between teeth where a toothbrush cannot reach, and doing it once a day significantly reduces the risk of cavities and gum disease.",
    whatToDoToday: [
      "Use about 18 inches of floss, wrap it around your fingers, and gently slide it between each tooth.",
      "Curve the floss into a C-shape around each tooth and move it up and down below the gumline.",
      "If string floss is difficult, try floss picks or a water flosser as an alternative."
    ],
    dentistQuestions: [
      "Am I flossing correctly, or could my technique be improved?",
      "Is a water flosser as effective as traditional floss for my situation?",
      "Are there specific areas where I need to pay more attention?",
      "How do I floss around crowns, bridges, or braces?",
      "My gums bleed when I floss. Is that normal, and when should it stop?"
    ]
  },
  "mouthwash-guide": {
    inOneSentence:
      "Mouthwash can help reduce bacteria, freshen breath, and strengthen enamel, but it works best as a supplement to brushing and flossing, not a replacement.",
    whatToDoToday: [
      "Choose a mouthwash with the ADA Seal of Acceptance for proven effectiveness.",
      "Rinse for 30 to 60 seconds after brushing and flossing, then spit (do not swallow).",
      "Wait at least 30 minutes after rinsing before eating or drinking for full benefit."
    ],
    dentistQuestions: [
      "Which type of mouthwash is best for my needs (fluoride, antiseptic, or prescription)?",
      "Should I use mouthwash before or after brushing?",
      "Is alcohol-free mouthwash better for me?",
      "Can mouthwash help with my gum disease or dry mouth?",
      "How often should I use mouthwash each day?"
    ]
  },
  "dental-visit-prep": {
    inOneSentence:
      "Preparing for a dental visit means bringing your insurance information, a list of medications, and writing down any symptoms or questions so you can make the most of your appointment.",
    whatToDoToday: [
      "Write down any symptoms, pain, or concerns you want to discuss with your dentist.",
      "Gather your insurance card, ID, and a list of current medications (including supplements).",
      "Brush and floss before your appointment so the dentist can see your normal oral health state."
    ],
    dentistQuestions: [
      "What does my overall oral health look like compared to my last visit?",
      "Are there any early signs of problems I should watch?",
      "What preventive steps do you recommend for me specifically?",
      "How often should I schedule checkups based on my risk level?",
      "Is there anything about my medical history that affects my dental care?"
    ]
  },
  "choosing-toothbrush": {
    inOneSentence:
      "The best toothbrush for most people is a soft-bristle brush (manual or electric) that fits comfortably in your mouth and is replaced every 3 to 4 months.",
    whatToDoToday: [
      "Check your current toothbrush: if the bristles are splayed or it is older than 3 months, replace it.",
      "Choose a soft-bristle brush with a head small enough to reach your back teeth comfortably.",
      "Consider trying an electric toothbrush if you find it hard to brush for a full two minutes."
    ],
    dentistQuestions: [
      "Should I use a manual or electric toothbrush?",
      "What brush head size and bristle type do you recommend for me?",
      "Is my current brushing technique causing any enamel or gum damage?",
      "How often should I really replace my toothbrush?",
      "Are there specific toothbrush features that would help with my dental issues?"
    ]
  }
};
