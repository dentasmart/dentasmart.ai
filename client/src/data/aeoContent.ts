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
      "Mouth sores have several possible causes, and a sore that persists, recurs, changes, bleeds, or makes eating or swallowing difficult needs professional evaluation.",
    whatToDoToday: [
      "Use gentle oral care and avoid foods or products that clearly irritate the sore.",
      "Avoid spicy, acidic, or rough-textured foods that irritate the area.",
      "Use a nonprescription oral-care product only as labeled and ask a pharmacist or dentist if your medicines, age, or health conditions affect the choice."
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
  },
  "do-you-need-root-canal": {
  inOneSentence: "A root canal saves an infected tooth by cleaning out the damaged inner pulp, relieving pain and preventing the need for extraction.",
  whatToDoToday: [
    "If you have a severe toothache, schedule a dental appointment immediately.",
    "Write down your symptoms, including when the pain started and what makes it worse.",
    "Avoid chewing on the painful tooth and stay away from very hot or cold foods."
  ],
  dentistQuestions: [
    "Can you show me on the x-ray why a root canal is necessary?",
    "What are the alternatives in my specific case?",
    "What is the total cost, including the crown?",
    "What happens if I choose to wait and not do the procedure now?"
  ]
},
  "affordable-dental-care": {
  inOneSentence: "This guide will show you how to find affordable dental care so you can get the treatment you need without financial stress.",
  whatToDoToday: [
    "Search online for \"community dental clinics\" in your city.",
    "Call your local health department to ask about low-cost dental resources.",
    "Schedule a consultation with a dentist to discuss your needs and payment options."
  ],
  dentistQuestions: [
    "What are the most affordable treatment options for my situation?",
    "Do you offer any payment plans or in-house financing?",
    "Is there a discount for paying in cash?",
    "What preventive measures can I take to avoid future costs?",
    "Can you provide a written estimate for all recommended procedures?"
  ]
},
  "dental-insurance-alternatives": {
  inOneSentence: "There are many ways to get affordable dental care without traditional insurance, and this guide shows you how.",
  whatToDoToday: [
    "Check out dental discount plans in your area and compare their fees and dentist networks.",
    "Call a local dental school to see what services they offer to the public.",
    "Find a community health center near you and ask if they provide dental services on a sliding scale.",
    "Review your budget and see if a payment plan for needed dental work is a good option for you.",
    "Schedule a preventive care appointment for a cleaning and check-up."
  ],
  dentistQuestions: [
    "What are the pros and cons of a dental discount plan versus paying out of pocket for my treatment?",
    "Do you offer any in-house payment plans or financing options?",
    "Can you provide a detailed breakdown of the costs for my treatment plan?",
    "What preventive care steps can I take at home to reduce my risk of future problems?",
    "Is there a less expensive alternative to this recommended treatment?"
  ]
},
  "diy-dental-care": {
  inOneSentence: "Learn which DIY dental care practices are safe and effective for your teeth, and which popular 'hacks' can cause more harm than good.",
  whatToDoToday: [
    "Upgrade your brushing and flossing technique by using a soft-bristled brush in gentle circles for a full two minutes, and curve your floss in a 'C' shape around each tooth to clean just under the gumline."
  ],
  dentistQuestions: [
    "What is the safest and most effective whitening option for my specific teeth and budget?",
    "Based on my oral health, are there any specific tools or products you'd recommend I add to my home-care routine?",
    "Am I showing any early signs of enamel wear or gum damage that I should be aware of?",
    "How often do you recommend I get a professional cleaning to supplement my at-home care?",
    "Are there any 'natural' or DIY trends you've seen that I should definitely avoid?"
  ]
},
  "preventing-expensive-dental-problems": {
  inOneSentence: "Preventing expensive dental problems is all about being proactive with your daily habits, diet, and regular check-ups, which saves you money and keeps you smiling.",
  whatToDoToday: [
    "Schedule your next dental check-up and cleaning.",
    "Commit to brushing for two full minutes, twice a day.",
    "Swap one sugary drink for a glass of water.",
    "Read one of our related guides to continue your journey."
  ],
  dentistQuestions: [
    "What is my risk for cavities and gum disease?",
    "What specific preventive treatments do you recommend for me?",
    "Is there anything about my daily routine I should change?",
    "What are the signs of a dental problem I should watch out for at home?"
  ]
},
  "dental-emergencies-on-a-budget": {
  inOneSentence: "Handle a dental emergency on a tight budget by identifying the problem, managing pain temporarily, and finding affordable care at dental schools or community clinics.",
  whatToDoToday: [
    "Find a local community dental clinic or dental school, call to ask about their emergency services and payment options, and use a cold compress to manage any swelling."
  ],
  dentistQuestions: [
    "Based on my symptoms, how urgently do I need to be seen?",
    "What are your fees for an emergency exam and x-ray?",
    "Do you offer a payment plan or a sliding scale for fees?",
    "What are the most likely treatment options for my situation?",
    "Is there anything I can do at home to prevent the problem from getting worse before my appointment?"
  ]
},
  "when-to-get-dental-second-opinion": {
  inOneSentence: "Find out when it's time to get a second opinion on your dental work and how to go about it.",
  whatToDoToday: [
    "Review the signs that you might need a second opinion on your dental care.",
    "If you're unsure about a diagnosis, start researching other dentists in your area.",
    "Request a copy of your current dental records and X-rays.",
    "Schedule a consultation for a second opinion and go prepared with your questions."
  ],
  dentistQuestions: [
    "Can you explain why you're recommending this treatment over other options?",
    "What are the long-term benefits and risks of this procedure?",
    "What is your experience with this specific dental issue?",
    "If this were your tooth, what would you do?",
    "Can you show me on the X-ray what you're seeing?"
  ]
},

  "crowns-vs-fillings": {
  inOneSentence: "A filling patches a small cavity, while a crown covers and protects a tooth with extensive damage.",
  whatToDoToday: [
    "If your dentist recommended a treatment, schedule a free, no-obligation second opinion with DentaSmart to confirm it's the right choice for you."
  ],
  dentistQuestions: [
    "Can you show me on the x-ray why I need a crown instead of a filling?",
    "What material do you recommend for my crown/filling, and why?",
    "What would happen if I waited on this treatment?",
    "Is an onlay a possible alternative for this tooth?",
    "What is the total cost, and what will my insurance cover?"
  ]
},
  "implants-vs-bridges": {
  inOneSentence: "A dental implant is a permanent, standalone tooth replacement that fuses with your jawbone, while a bridge is a faster solution that relies on neighboring teeth for support and will likely need to be replaced.",
  whatToDoToday: [
    "Schedule a consultation with a dentist to get a professional evaluation of your specific situation.",
    "Ask for a 3D cone-beam CT (CBCT) scan to get a clear picture of your jawbone health.",
    "Request a detailed cost estimate for both an implant and a bridge, making sure to ask about the long-term replacement costs for the bridge.",
    "Review your dental insurance policy to understand what percentage of each option is covered."
  ],
  dentistQuestions: [
    "Based on my 3D scan, am I a good candidate for a dental implant right now, or would I need a bone graft first?",
    "Are the teeth next to my gap healthy and strong enough to support a bridge for the next 10-15 years?",
    "What is the total estimated lifetime cost for a bridge, assuming it needs to be replaced twice?",
    "Can you show me before-and-after photos of patients similar to me who have had each procedure?",
    "What is your personal experience and success rate with placing dental implants versus creating bridges?"
  ]
},
  "complete-oral-health-routine": {
  inOneSentence: "A complete oral health routine involves more than just brushing and flossing; it's a combination of daily habits and weekly extras that protect your teeth and gums for a lifetime of healthy smiles.",
  whatToDoToday: [
    "Start your complete oral health routine tonight by flossing before you brush, and don't forget to scrape your tongue!"
  ],
  dentistQuestions: [
    "What's the one thing I could add to my routine that would make the biggest difference?",
    "Are there any specific products you'd recommend for my teeth and gums?",
    "How can I tell if I'm brushing too hard?",
    "What are the early signs of gum disease I should look out for?"
  ]
},
  "how-to-prevent-cavities": {
  inOneSentence: "Prevent cavities by brushing and flossing daily, using fluoride, eating a tooth-friendly diet, and visiting your dentist regularly.",
  whatToDoToday: [
    "Brush your teeth for two minutes with fluoride toothpaste, floss between all your teeth.",
    "drink a glass of water instead of a sugary drink."
  ],
  dentistQuestions: [
    "What is my personal risk level for cavities?",
    "Is my brushing and flossing technique effective?",
    "Would dental sealants be a good option for me or my children?",
    "Can you recommend any specific products to help me prevent cavities?",
    "Are there any early signs of decay I should be watching for?"
  ]
},
  "gum-disease-prevention": {
  inOneSentence: "This guide provides a comprehensive overview of gum disease prevention, from daily oral hygiene practices to professional dental care.",
  whatToDoToday: [
    "Brush your teeth for two minutes, twice today, and don't forget to floss!"
  ],
  dentistQuestions: [
    "What is my risk for developing gum disease?",
    "Am I brushing and flossing correctly?",
    "How often should I get professional cleanings?"
  ]
},
  "natural-teeth-whitening": {
  inOneSentence: "You can safely whiten your teeth at home using natural methods like baking soda and oil pulling, but it's important to avoid damaging your enamel with acidic fruits or overuse of abrasive materials.",
  whatToDoToday: [
    "Try oil pulling with coconut oil for 15 minutes before brushing.",
    "Mix a paste of baking soda and water and brush gently for one minute.",
    "Rinse your mouth with water after drinking coffee, tea, or red wine."
  ],
  dentistQuestions: [
    "What is the current shade of my teeth, and what is a realistic whitening goal for me?",
    "Based on my oral health, what is the safest and most effective whitening method for me?",
    "Are there any underlying issues, like thin enamel or restorations, that I should be aware of before starting a whitening treatment?"
  ]
},
  "oral-health-life-stages": {
  inOneSentence: "Your dental needs evolve throughout life; this guide provides a roadmap for a healthy smile at every age, from childhood to your senior years.",
  whatToDoToday: [
    "If you have a child under one, gently wipe their gums with a damp cloth after feeding.",
    "If you're a teen, swap one sugary drink for a glass of water today.",
    "If you're pregnant, schedule a dental check-up this week.",
    "If you're a senior experiencing dry mouth, pick up some sugar-free gum.",
    "Book your next dental cleaning, no matter your age."
  ],
  dentistQuestions: [
    "Based on my age and current health, what is the single most important thing I should be doing for my oral health?",
    "Are there any specific preventive treatments you'd recommend for me at this stage of life (e.g., sealants, fluoride treatments)?",
    "I'm concerned about [a specific issue like dry mouth, sensitive gums, etc.]. What are my options for managing this?",
    "How do my current medications impact my oral health?",
    "Can you show me the most effective way to brush and floss for my specific needs (e.g., around my bridge, with my braces)?"
  ]
},
  "gum-bleeding-after-brushing": {
    inOneSentence: "Seeing blood after you brush your teeth usually means your gums are inflamed due to plaque buildup, which is the earliest sign of gum disease.",
    whatToDoToday: [
      "Brush your teeth gently for two minutes with a soft-bristled brush.",
      "Floss carefully to remove any plaque hiding between your teeth.",
      "Schedule a dental appointment if the bleeding doesn't stop within a week."
    ],
    dentistQuestions: [
      "Based on my exam, what do you think is causing my gums to bleed?",
      "Can you show me the right way to brush and floss to prevent this?",
      "Do I have gingivitis or a more advanced form of gum disease?",
      "What specific products (toothpaste, mouthwash) would you recommend for me?",
      "How often should I be coming in for professional cleanings?"
    ]
},
  "mouth-ulcers": {
    inOneSentence: "A mouth ulcer can result from irritation, infection, medicines, immune conditions, or other causes; persistent, recurrent, or changing ulcers need professional evaluation.",
    whatToDoToday: [
      "Rinse your mouth with warm salt water to clean the area and reduce pain.",
      "Avoid spicy, acidic, or hard foods that could irritate the ulcer.",
      "Try an over-the-counter oral gel or patch to numb the pain and protect the sore."
    ],
    dentistQuestions: [
      "What do you think is causing my mouth ulcers?",
      "Is there a specific mouthwash or treatment you recommend?",
      "How can I prevent these from coming back so often?",
      "Could my mouth ulcers be related to any other health issues?",
      "When should I be concerned and come back to see you about an ulcer?"
    ]
},
  "canker-sores": {
    inOneSentence: "A canker sore is a painful ulcer inside the mouth; recurrent, large, persistent, or unusually painful sores need professional evaluation.",
    whatToDoToday: [
      "Rinse your mouth with warm salt water to clean the sore.",
      "Avoid eating spicy or acidic foods that could make it hurt more.",
      "Get an over-the-counter canker sore gel or patch to numb the pain."
    ],
    dentistQuestions: [
      "Based on where my canker sore is, do you think it's from my braces or retainer?",
      "Could a vitamin deficiency be causing me to get these so often?",
      "Is this just a canker sore, or could it be something more serious?",
      "What rinse or treatment do you recommend for making this heal faster?",
      "How can I tell the difference between a canker sore and a cold sore?"
    ]
},
  "tongue-pain": {
    inOneSentence: "Tongue pain is usually a temporary discomfort caused by a minor injury, sore, or irritation, but it can sometimes signal an underlying infection or nutritional issue.",
    whatToDoToday: [
      "Rinse your mouth with warm salt water to soothe the area.",
      "Avoid spicy, acidic, or hard foods that could make the pain worse.",
      "Gently brush your tongue and teeth to keep your mouth clean."
    ],
    dentistQuestions: [
      "What do you think is causing my tongue pain?",
      "Is this something that will go away on its own?",
      "Are there any specific mouthwashes or gels you recommend?",
      "Could my diet or any of my habits be contributing to this?",
      "When should I be concerned enough to come back for a follow-up?"
    ]
},
  "cheek-biting": {
    inOneSentence: "Cheek biting is the often repetitive act of biting the inside of your cheek, which can be accidental or a habit related to stress or dental issues.",
    whatToDoToday: [
      "Rinse with warm salt water to clean the area and promote healing.",
      "Try to be mindful of when you bite your cheek to identify if it's a habit.",
      "Schedule an appointment with your dentist if it happens frequently or causes pain."
    ],
    dentistQuestions: [
      "Could my teeth or jaw alignment be causing me to bite my cheek?",
      "I think I bite my cheek from stress. Can you recommend a mouthguard?",
      "Is this white line on my cheek something to worry about?",
      "What can I do at home to help the sores from cheek biting heal faster?",
      "Do I need a referral to another specialist for this issue?"
    ]
},
  "teeth-grinding": {
    inOneSentence: "Teeth grinding, or bruxism, is when you unconsciously clench or grind your teeth, which can happen when you're awake or asleep and is often linked to stress or sleep issues.",
    whatToDoToday: [
      "Try to notice if you clench your jaw during the day and consciously relax it.",
      "Apply a warm compress to your jaw to help ease muscle soreness before bed.",
      "Avoid hard-to-chew foods to give your jaw a rest."
    ],
    dentistQuestions: [
      "Based on my teeth, can you tell if I'm grinding them at night?",
      "Would you recommend a custom night guard for me?",
      "Could my bite be causing me to grind my teeth?",
      "Are there any relaxation techniques you'd suggest for my jaw muscles?",
      "Should I be concerned about sleep apnea?"
    ]
},
  "jaw-clicking": {
    inOneSentence: "A clicking or popping sound in your jaw when you open or close your mouth, which is often harmless but can sometimes point to a jaw joint issue.",
    whatToDoToday: [
      "Pay attention to when the clicking happens and if it's paired with any pain.",
      "Avoid chewing gum or eating hard, chewy foods to give your jaw a rest.",
      "Try gently massaging the muscles around your jaw to help them relax."
    ],
    dentistQuestions: [
      "Why is my jaw clicking?",
      "Is the clicking a sign of a TMJ disorder?",
      "Do I need a night guard for teeth grinding?",
      "What can I do at home to reduce the clicking?",
      "Are there any specific jaw exercises you recommend?"
    ]
},
  "gum-itching": {
    inOneSentence: "Itchy gums are often a sign of irritation from plaque buildup, allergies, or the early stages of gum disease.",
    whatToDoToday: [
      "Improve your brushing and flossing technique immediately.",
      "Rinse your mouth with a warm saltwater solution to soothe the gums.",
      "Schedule a dental check-up if the itching doesn't improve in a few days."
    ],
    dentistQuestions: [
      "Based on my symptoms, do you think I have gingivitis?",
      "Could my new toothpaste be causing an allergic reaction?",
      "What type of professional cleaning do you recommend for me?",
      "How can I improve my at-home oral hygiene routine?",
      "Are there any specific products you recommend for sensitive gums?"
    ]
},
  "tooth-staining": {
    inOneSentence: "Tooth staining is when your teeth change color, usually due to foods, drinks, or smoking.",
    whatToDoToday: [
      "Brush and floss your teeth thoroughly.",
      "Avoid dark-colored foods and drinks like coffee, tea, and red wine.",
      "Schedule a dental cleaning to remove surface stains."
    ],
    dentistQuestions: [
      "What is causing my tooth staining?",
      "What are my options for teeth whitening?",
      "How can I prevent my teeth from staining in the future?",
      "Are there any side effects to teeth whitening?",
      "Will my dental insurance cover any of the costs?"
    ]
},
  "enamel-erosion": {
    "inOneSentence": "Enamel erosion is the wearing away of the hard, protective outer layer of your teeth due to acid, which can lead to sensitivity and discoloration.",
    "whatToDoToday": [
        "Reduce or avoid highly acidic foods and drinks like soda, citrus, and wine.",
        "Rinse your mouth with plain water right after eating or drinking anything acidic.",
        "Switch to a soft-bristled toothbrush and a fluoride toothpaste to avoid further wear."
    ],
    "dentistQuestions": [
        "Based on my teeth, do you think I have enamel erosion?",
        "What is the likely cause of my enamel erosion?",
        "What treatments do you recommend to stop it from getting worse?",
        "Can you recommend a specific toothpaste or mouthwash for my situation?",
        "How can we restore the appearance of my teeth if the erosion is significant?"
    ]
},
  "root-exposure": {
    inOneSentence: "An exposed tooth root means your gums have pulled back, which can cause sensitivity and increase your risk for cavities.",
    whatToDoToday: [
      "Start using a soft-bristled toothbrush and brush gently.",
      "Try a toothpaste designed for sensitive teeth to ease discomfort.",
      "Schedule an appointment with your dentist to find out what's causing it."
    ],
    dentistQuestions: [
      "What is causing my gum recession?",
      "Do I have gum disease?",
      "What are my treatment options to cover the exposed root?",
      "How can I prevent my gums from receding further?",
      "What kind of toothbrush and toothpaste should I be using?"
    ]
},
  "gum-inflammation": {
    inOneSentence: "Gum inflammation, usually a sign of early gum disease (gingivitis), means your gums are irritated by a buildup of plaque along your gumline.",
    whatToDoToday: [
      "Brush your teeth gently for two minutes, focusing on the area where your teeth and gums meet.",
      "Floss carefully to remove any plaque hiding between your teeth.",
      "Rinse your mouth with warm salt water to help soothe the irritation."
    ],
    dentistQuestions: [
      "Based on my gums, do you think I have gingivitis?",
      "Can you show me the right way to brush and floss to prevent this?",
      "Is there a specific mouthwash you recommend for my situation?",
      "Are there any other factors, like my diet or medications, that could be contributing to this?",
      "How often should I schedule cleanings to keep my gums healthy?"
    ]
},
  "persistent-metallic-taste": {
    inOneSentence: "A persistent metallic taste in your mouth is often a harmless side effect of medications or poor oral hygiene, but it can sometimes signal an underlying health issue.",
    whatToDoToday: [
      "Step up your oral hygiene: brush, floss, and use a tongue scraper.",
      "Drink plenty of water to stay hydrated and rinse out your mouth.",
      "Review any new medications or vitamins you've started recently."
    ],
    dentistQuestions: [
      "Could my oral health be causing this metallic taste?",
      "Do you see any signs of gum disease, infection, or cavities?",
      "Based on my oral exam, do you think I should see my doctor about this?",
      "What changes can I make to my daily routine to get rid of this taste?",
      "Is there a specific mouthwash you'd recommend for this?"
    ]
},
  "swollen-lymph-nodes-dental": {
    "inOneSentence": "Swollen lymph nodes in your neck often mean your body is fighting a dental infection, like a tooth abscess or severe gum disease.",
    "whatToDoToday": [
        "Schedule an appointment with a dentist immediately.",
        "Apply a warm compress to the swollen area to ease discomfort.",
        "Rinse your mouth with warm salt water to help keep the area clean."
    ],
    "dentistQuestions": [
        "Could my swollen lymph nodes be caused by a tooth infection?",
        "What kind of tests will I need to figure out the cause?",
        "What are my treatment options?",
        "How can I prevent this from happening again?",
        "Are there any warning signs I should watch for that mean the infection is spreading?"
    ]
},
  "facial-swelling": {
    inOneSentence: "Facial swelling is often a visible sign of an underlying dental infection, like a tooth abscess, that requires prompt attention from a dentist.",
    whatToDoToday: [
      "Call a dentist immediately to schedule an emergency appointment.",
      "Apply a cold compress to the outside of your cheek to help reduce swelling.",
      "Rinse your mouth with warm salt water to help soothe the area."
    ],
    dentistQuestions: [
      "What is causing my face to swell?",
      "Do I have a dental abscess?",
      "What treatment do you recommend?",
      "Will I need a root canal or an extraction?",
      "How can I prevent this from happening again?"
    ]
},
  "tooth-migration": {
    inOneSentence: "Tooth migration is when your teeth move or shift from their original position, which can be caused by gum disease, teeth grinding, or natural aging.",
    whatToDoToday: [
      "Schedule a dental appointment to determine the cause of the shifting.",
      "Pay close attention to your oral hygiene routine, especially flossing.",
      "If you grind your teeth, try stress-reducing activities before bed."
    ],
    dentistQuestions: [
      "What is the most likely reason my teeth are shifting?",
      "Do I have any signs of gum disease?",
      "Would a nightguard help me?",
      "What are my treatment options to stop my teeth from moving?",
      "Will I need braces or clear aligners?"
    ]
},
  "bite-changes": {
    inOneSentence: "A change in your bite means your teeth don't line up like they used to, which can be caused by anything from recent dental work to teeth grinding.",
    whatToDoToday: [
      "Pay attention to when your bite feels off and if it's causing pain.",
      "Stick to soft foods to avoid putting extra pressure on your jaw and teeth.",
      "Schedule an appointment with your dentist to get it checked out, especially if it's a sudden change."
    ],
    dentistQuestions: [
      "What do you think is causing my bite to feel different?",
      "Could my new crown/filling be the problem?",
      "Do you see any signs of teeth grinding?",
      "Will I need a night guard or some other treatment?",
      "What can I do at home to help with the discomfort?"
    ]
},
  "mouth-numbness": {
    inOneSentence: "Mouth numbness is a tingling or pins-and-needles sensation in the mouth, often caused by nerve irritation, allergies, or nutritional deficiencies.",
    whatToDoToday: [
      "Avoid very hot, spicy, or acidic foods to prevent further irritation.",
      "Note when the numbness occurs and what you were doing to identify potential triggers.",
      "Rinse with a warm saltwater solution to soothe your mouth."
    ],
    dentistQuestions: [
      "What could be causing this numbness in my mouth?",
      "Is it possible this is related to a recent dental procedure?",
      "Are there any specific vitamins or minerals I might be deficient in?",
      "Could my toothpaste or mouthwash be causing an allergic reaction?",
      "When should I be concerned enough to see a medical doctor about this?"
    ]
},
  "gum-tenderness": {
    inOneSentence: "Tender gums are a common sign of inflammation, often caused by plaque buildup, but are usually reversible with better oral hygiene.",
    whatToDoToday: [
      "Start rinsing with warm salt water twice a day to soothe the soreness.",
      "Switch to a soft-bristled toothbrush and be extra gentle when you brush tonight.",
      "Schedule a dental check-up if the tenderness has lasted for more than a week."
    ],
    dentistQuestions: [
      "Based on my symptoms, do you think I have gingivitis?",
      "Can you show me the right way to brush and floss to avoid irritating my gums?",
      "Is there a specific mouthwash or toothpaste you recommend for sensitive gums?",
      "Could any of my medications or health conditions be contributing to my gum tenderness?",
      "How can we prevent this from happening again in the future?"
    ]
},
  "tmj-disorder": {
    inOneSentence: "TMJ disorder is a condition causing pain and dysfunction in the jaw joint, often from teeth grinding, stress, or injury.",
    whatToDoToday: [
      "Switch to soft foods to give your jaw a break.",
      "Apply a cold pack to the painful area for 15 minutes to reduce inflammation.",
      "Avoid chewing gum, biting your nails, or making wide jaw movements."
    ],
    dentistQuestions: [
      "What do you think is causing my jaw pain?",
      "Could a night guard help with my symptoms?",
      "Are there any specific jaw exercises you recommend?",
      "How can I tell if I'm grinding my teeth in my sleep?",
      "What are my treatment options if the pain doesn't go away?"
    ]
},
  "periodontal-disease": {
    inOneSentence: "Periodontal disease is an infection of the gums that can lead to tooth loss if not treated, starting as mild gingivitis and progressing to serious periodontitis.",
    whatToDoToday: [
      "Schedule a dental check-up, especially if your gums are bleeding or swollen.",
      "Commit to brushing twice a day and flossing daily to remove plaque buildup.",
      "If you smoke, start looking into resources to help you quit, as it's a major risk factor."
    ],
    dentistQuestions: [
      "Based on my exam, do I have gingivitis or periodontitis?",
      "What are the pocket depths around my teeth, and what do they mean?",
      "What type of cleaning do you recommend for me?",
      "Are there any specific products (like a mouthwash or toothpaste) I should be using?",
      "How often should I be coming in for cleanings to manage this?"
    ]
},
  "gingivitis": {
    inOneSentence: "Gingivitis is the first sign of gum disease, showing up as red, swollen gums that bleed easily, but it's usually reversible with better home care.",
    whatToDoToday: [
      "Start brushing your teeth gently for two full minutes, twice a day.",
      "Floss carefully to clean between every tooth, even if it causes a little bleeding at first.",
      "Schedule a checkup and cleaning with your dentist to get a professional opinion and treatment."
    ],
    dentistQuestions: [
      "Based on my gums, do I definitely have gingivitis?",
      "Is it still in the early stages?",
      "Can you show me the right way to brush and floss to prevent this?",
      "Are there any specific products, like a mouthwash, you recommend for me?",
      "How soon should I expect to see my gums get better?"
    ]
},
  "dental-caries": {
    inOneSentence: "Dental caries is the clinical term for tooth decay, a process where acid produced by bacteria erodes your tooth enamel, potentially leading to cavities.",
    whatToDoToday: [
      "Schedule a dental appointment for a check-up, especially if you have any tooth pain or sensitivity.",
      "Reduce your intake of sugary and acidic foods and drinks to stop feeding the decay-causing bacteria.",
      "Step up your oral hygiene game by brushing thoroughly with fluoride toothpaste and flossing daily."
    ],
    dentistQuestions: [
      "Based on my exam, do you see any signs of early or advanced tooth decay?",
      "What could be causing the tooth decay I have?",
      "What treatment do you recommend for my cavities?",
      "What changes can I make to my daily routine to prevent more cavities in the future?",
      "Are there any specific products, like a special toothpaste or mouthwash, that you recommend for me?"
    ]
},
  "enamel-hypersensitivity": {
    inOneSentence: "Enamel hypersensitivity is that sharp, sudden tooth pain you get from hot or cold things, and it usually means your tooth's protective outer layer is getting thin.",
    whatToDoToday: [
      "Start using a toothpaste made for sensitive teeth right away.",
      "Brush gently with a soft-bristled toothbrush to avoid more enamel wear.",
      "Pay attention to what you eat and drink, and try to cut back on super acidic stuff like soda and citrus fruits."
    ],
    dentistQuestions: [
      "Based on my symptoms, what do you think is the main cause of my sensitivity?",
      "Are there any in-office treatments you'd recommend for me?",
      "Could my brushing technique be making things worse?",
      "Is there a specific mouthwash or fluoride treatment I should be using at home?",
      "Do you see any signs of teeth grinding or gum recession?"
    ]
},
  "oral-thrush": {
    inOneSentence: "Oral thrush is a common fungal infection in your mouth that causes white patches and is usually a sign of an imbalance in your body's natural germs.",
    whatToDoToday: [
      "Schedule an appointment with your dentist for a proper diagnosis.",
      "Start rinsing your mouth with a warm saltwater solution to soothe discomfort.",
      "Avoid sugary foods and drinks that can encourage the fungus to grow."
    ],
    dentistQuestions: [
      "What is the best treatment for my specific case of oral thrush?",
      "How can I prevent this from happening again in the future?",
      "Are there any underlying health issues that could be causing this?",
      "Should I change my oral hygiene routine while I have this infection?",
      "How long should it take for the treatment to work and for my mouth to feel normal again?"
    ]
},
  "aphthous-ulcers": {
    "inOneSentence": "Aphthous ulcers, or canker sores, are painful but non-contagious sores inside your mouth that usually heal on their own.",
    "whatToDoToday": [
      "Avoid spicy and acidic foods that can irritate the sore.",
      "Rinse your mouth with warm salt water a few times a day.",
      "Try an over-the-counter canker sore treatment to reduce pain."
    ],
    "dentistQuestions": [
      "What do you think is causing my canker sores?",
      "Is there a prescription mouthwash that could help?",
      "Could my canker sores be a sign of something more serious?",
      "What can I do to prevent them from coming back?",
      "Are there any changes I should make to my oral hygiene routine?"
    ]
},
  "leukoplakia": {
    inOneSentence: "Leukoplakia is a condition where thick, white patches form on your gums, the insides of your cheeks, the bottom of your mouth, and sometimes, your tongue, usually due to chronic irritation.",
    whatToDoToday: [
      "Schedule an appointment with your dentist to have the patch examined, especially if it's been there for over two weeks.",
      "Stop all tobacco use (smoking, chewing, vaping) immediately, as this is the leading cause.",
      "Take photos of the patch to monitor any changes in its size, shape, or color over time."
    ],
    dentistQuestions: [
      "Based on what you see, do you think this is leukoplakia?",
      "Do I need a biopsy to be sure?",
      "What do you think is causing this patch?",
      "What are my treatment options?",
      "How often should I come in for follow-up appointments to monitor this?"
    ]
},
  "oral-lichen-planus": {
    inOneSentence: "Oral lichen planus is a chronic inflammatory condition that causes white, lacy patches or red, swollen sores inside your mouth, likely due to an autoimmune reaction.",
    whatToDoToday: [
      "Avoid spicy, acidic, and crunchy foods to prevent irritation.",
      "Rinse your mouth with a gentle warm salt water solution to soothe any discomfort.",
      "Schedule an appointment with a dentist for an accurate diagnosis and to rule out other issues."
    ],
    dentistQuestions: [
      "Based on what you see, do you think this is oral lichen planus?",
      "Do I need a biopsy to confirm the diagnosis?",
      "What are my treatment options to manage these symptoms?",
      "Is there a specific mouthwash or toothpaste you recommend for this condition?",
      "How often should I come in for follow-up appointments to monitor this?"
    ]
},
  "periodontitis": {
  "inOneSentence": "Periodontitis is a serious gum infection that can lead to tooth loss if not treated.",
  "whatToDoToday": [
    "Schedule a dental checkup right away.",
    "Improve your brushing and flossing habits.",
    "If you smoke, make a plan to quit."
  ]
,
    dentistQuestions: [
      "What stage is my gum disease at right now?",
      "Do I need a deep cleaning or can regular cleaning help?",
      "How often should I come in for follow-up visits?",
      "Are there any prescription rinses that could help?",
      "Should I see a periodontist?"
    ]},
  "gingivitis-vs-periodontitis": {
  inOneSentence: "Gingivitis is mild, reversible gum irritation, while periodontitis is a serious infection that destroys the bone supporting your teeth.",
  whatToDoToday: ["Schedule a dental checkup immediately.", "Improve your brushing and flossing technique, no excuses.", "Use an antiseptic mouthwash to help reduce bacteria."]
,
    dentistQuestions: [
      "What stage is my gum disease at right now?",
      "Do I need a deep cleaning or can regular cleaning help?",
      "How often should I come in for follow-up visits?",
      "Are there any prescription rinses that could help?",
      "Should I see a periodontist?"
    ]},
};
