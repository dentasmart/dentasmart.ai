import 'dotenv/config';
import mysql from 'mysql2/promise';

// All 30 articles from the existing static data files

const dentistArticles = [
  {
    id: "unclear-diagnoses",
    title: "Why Don't Dentists Clearly Explain Diagnoses?",
    category: "Dentist Problems",
    readTime: "3 min read",
    metaDescription: "Confused by your dentist's diagnosis? Learn why dental explanations are often unclear and how to get the answers you deserve.",
    problem: { heading: "The Problem: You're Told What, But Not Why", content: "You're sitting in the dental chair, and the dentist says you need a filling, a crown, or a root canal. They might point to an X-ray or rattle off some numbers, but you leave the appointment feeling unsure. You know *what* they want to do, but you don't really understand *why* it's necessary right now." },
    empathy: { heading: "Why This Feels Frustrating", content: "It's incredibly unsettling to agree to a medical procedure when you don't fully grasp the problem. You might feel like you're just nodding along because they're the expert, but deep down, you're worried. Is it really that bad? Could it wait? When you don't understand the 'why,' it's hard to feel confident saying 'yes' to the treatment." },
    solution: { heading: "The Simple Truth: X-Rays Are for Dentists, Not Patients", content: "Here's the reality: Dental X-rays and clinical charts are designed for professionals, not for you. To a dentist, that grey smudge on the screen is a clear sign of decay. To you, it just looks like a smudge. The gap isn't your intelligence; it's the translation. Most dentists are great at fixing teeth but not always great at translating clinical data into plain English." },
    change: { heading: "What Should Happen Instead", content: "You shouldn't have to get a medical degree to understand your own mouth. You deserve to see the problem clearly, have it explained in simple, everyday language, and understand exactly what happens if you wait versus if you treat it now. True informed consent means you actually understand what you're consenting to." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart bridges the gap between the X-ray and your understanding. By analyzing your dental images with AI, we translate those confusing grey smudges into clear, visual insights. We explain exactly what's going on in plain language, so you can walk into your next appointment feeling confident, informed, and ready to make the best decision for your health." }
  },
  {
    id: "rushed-decisions",
    title: "Why Do Dentists Ask Patients to Decide So Fast?",
    category: "Dentist Problems",
    readTime: "3 min read",
    metaDescription: "Feeling pressured to make a dental decision in the chair? Discover why rushed decisions happen and how to take back control of your timeline.",
    problem: { heading: "The Problem: The 'Chairside' Pressure Cooker", content: "The hygienist finishes cleaning your teeth, the dentist pops in for five minutes, spots an issue, and suddenly the front desk is presenting you with a treatment plan and asking, 'Do you want to schedule that for next Tuesday?' You're still reclining in the chair, bib on, and you're being asked to make a significant financial and health decision on the spot." },
    empathy: { heading: "Why This Feels Overwhelming", content: "Dental care is expensive, and procedures can be invasive. Being asked to commit to hundreds or thousands of dollars in work with only a few minutes to process the information feels risky and stressful. You feel cornered, worried that if you say 'no' you're neglecting your health, but if you say 'yes' you might be rushing into something you haven't thought through." },
    solution: { heading: "The Simple Truth: The Schedule Runs the Show", content: "Dental offices run on tight schedules. Efficiency is key to their business model. The push for a quick decision isn't necessarily malicious; it's often just the workflow of a busy practice. They want to get you on the books to keep the schedule full. But your health decisions shouldn't be dictated by their calendar gaps." },
    change: { heading: "What Should Happen Instead", content: "You should have the space to breathe. Unless it's a true emergency (like an infection or severe pain), you should be able to take the information home, review it calmly, check your budget, and ask follow-up questions. A good decision is a thoughtful decision, not a rushed one." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart gives you the power of the 'pause.' You can upload your photos or X-rays and review our AI analysis in the comfort of your own home, on your own time. We help you prepare questions for your dentist so you can go back and have a productive conversation, not a pressured negotiation. With DentaSmart, you decide on your timeline, not theirs." }
  },
  {
    id: "questioning-recommendations",
    title: "Why Do Patients Question Dental Recommendations?",
    category: "Dentist Problems",
    readTime: "3 min read",
    metaDescription: "Wondering if you really need that dental procedure? You're not alone. Learn why trust is an issue and how to verify your dental needs.",
    problem: { heading: "The Problem: The Silent Doubt", content: "Your dentist recommends a crown or a deep cleaning. You nod and agree, but in the back of your mind, a little voice asks, 'Do I really need this? Or do they just need to pay for that new machine in the lobby?' It's a common, uncomfortable thought that many patients have but rarely voice." },
    empathy: { heading: "Why This Creates Distrust", content: "When healthcare comes with a high price tag and a lack of clear explanation, suspicion is a natural reaction. You're not a dentist, so you can't verify their claims yourself. This power imbalance, combined with the financial incentive for the dentist to treat, creates a breeding ground for doubt and anxiety." },
    solution: { heading: "The Simple Truth: Transparency Builds Trust", content: "Most dentists are ethical and want the best for you. However, the lack of transparency in the industry has eroded patient trust over time. When you can't see what they see, and you don't understand the severity of the issue, it's hard to separate a genuine medical need from an upsell." },
    change: { heading: "What Should Happen Instead", content: "You should know exactly where your oral health stands. You should be able to distinguish between what is urgent, what is preventative, and what is purely cosmetic. True trust is built when a dentist is willing to show you the evidence and explain the 'why' without making you feel guilty for asking." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart acts as your unbiased second set of eyes. We don't perform treatments, so we have no financial incentive to recommend them. Our AI analyzes your images objectively, highlighting areas of concern so you can validate your dentist's findings. We help you separate the 'must-dos' from the 'nice-to-dos,' restoring your confidence in your care plan." }
  },
  {
    id: "second-opinions",
    title: "Why Is Getting a Second Opinion So Hard?",
    category: "Dentist Problems",
    readTime: "3 min read",
    metaDescription: "Want a second opinion on dental work? Learn why it's so difficult and how to get one without the hassle.",
    problem: { heading: "The Problem: The Second-Opinion Gauntlet", content: "Your dentist says you need a root canal. You're not sure, so you want a second opinion. But that means finding another dentist, getting your records transferred, sitting through another exam, and paying for another consultation. It's a time-consuming, expensive, and emotionally draining process." },
    empathy: { heading: "Why This Feels Like a Betrayal", content: "Seeking a second opinion can feel like you're 'cheating' on your dentist. You worry they'll find out and be offended, or that the new dentist will just tell you the same thing, making you feel like you wasted your time and money. The social awkwardness alone is enough to make many people just go along with the first recommendation." },
    solution: { heading: "The Simple Truth: Second Opinions Are Normal", content: "In medicine, seeking a second opinion is standard practice, especially for major procedures. Dentistry should be no different. The fact that it's so logistically difficult to get one in dentistry is a systemic problem, not a personal failing on your part." },
    change: { heading: "What Should Happen Instead", content: "Getting a second perspective on your dental health should be as easy as uploading a photo. You shouldn't have to navigate a maze of appointments and paperwork just to feel confident about your care." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart is the easiest second opinion you'll ever get. Upload your dental images and receive an AI-powered analysis in minutes, not weeks. While we're not a replacement for a clinical exam, we provide an objective, data-driven perspective that helps you ask the right questions and feel more confident about your treatment decisions." }
  },
  {
    id: "cost-transparency",
    title: "Why Is Dental Pricing So Confusing?",
    category: "Dentist Problems",
    readTime: "3 min read",
    metaDescription: "Shocked by a dental bill? Learn why dental pricing is so opaque and how to understand what you're really paying for.",
    problem: { heading: "The Problem: The Mystery Bill", content: "You go in for a 'routine cleaning,' and the bill is $350. Or you agree to a filling, and the final cost is $200 more than you expected. Dental pricing feels like a black box. You rarely know the cost upfront, and the final bill often includes charges you didn't anticipate." },
    empathy: { heading: "Why This Feels Unfair", content: "In almost every other industry, you know the price before you buy. You wouldn't buy a car without knowing the sticker price. But in dentistry, you're often asked to commit to a procedure before you know the full cost. This lack of transparency feels disrespectful and creates financial anxiety." },
    solution: { heading: "The Simple Truth: Dental Codes Are a Foreign Language", content: "Dental procedures are billed using a complex system of CDT codes. What you call a 'filling' could be one of several different codes, each with a different price. Add in the variables of insurance coverage, deductibles, and in-network vs. out-of-network rates, and it's nearly impossible for a patient to predict the cost." },
    change: { heading: "What Should Happen Instead", content: "You should have a clear, itemized estimate before any work begins. You should understand what each charge is for, what your insurance will cover, and what your out-of-pocket cost will be. Financial surprises have no place in healthcare." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart helps you understand the landscape of your oral health before you walk into the office. By knowing the potential issues in advance, you can research typical costs and have a more informed conversation with your dentist's billing department. Knowledge is your best defense against surprise bills." }
  },
  {
    id: "fear-of-dentist",
    title: "Why Are So Many People Afraid of the Dentist?",
    category: "Dentist Problems",
    readTime: "3 min read",
    metaDescription: "Dental anxiety is real. Discover the root causes of dental fear and practical steps to overcome it.",
    problem: { heading: "The Problem: The Anxiety Spiral", content: "For millions of people, the thought of going to the dentist triggers genuine anxiety or even panic. It's not just about the drill. It's the vulnerability of lying back with your mouth open, the fear of pain, the judgment about your habits, and the dread of bad news. This fear leads to avoidance, which leads to worse problems, which leads to more fear." },
    empathy: { heading: "Why This Fear Is Valid", content: "Dental anxiety is not a weakness. It's often rooted in a past negative experience, a feeling of loss of control, or a fear of the unknown. The clinical environment, the sounds, and the smells can all be powerful triggers. Dismissing this fear with 'it's not that bad' is unhelpful and invalidating." },
    solution: { heading: "The Simple Truth: Knowledge Reduces Fear", content: "A huge component of dental anxiety is the fear of the unknown. What will they find? How much will it cost? Will it hurt? When you remove the unknowns, the anxiety often decreases significantly. The more you know about your own oral health, the less scary the dentist's chair becomes." },
    change: { heading: "What Should Happen Instead", content: "You should be able to walk into the dentist's office already knowing the general state of your oral health. No surprises. No ambushes. Just a calm, informed conversation about a plan you already understand." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart takes the 'unknown' out of the equation. By checking your oral health at home first, you arrive at the dentist with a baseline understanding. You know what to expect, which dramatically reduces the anxiety of the visit. We help you turn a dreaded appointment into a manageable one." }
  },
  {
    id: "overtreatment-concerns",
    title: "How Can You Tell If You're Being Overtreated?",
    category: "Dentist Problems",
    readTime: "3 min read",
    metaDescription: "Worried about unnecessary dental procedures? Learn the signs of overtreatment and how to protect yourself.",
    problem: { heading: "The Problem: The Nagging 'What If?'", content: "You visit a new dentist, and they find six problems that your old dentist never mentioned. Or your dentist recommends replacing old fillings that seem perfectly fine. You can't help but wonder: is this genuinely necessary, or is this overtreatment?" },
    empathy: { heading: "Why This Erodes Confidence", content: "The fear of overtreatment is paralyzing. If you can't trust your dentist's recommendations, who can you trust? It makes you second-guess every suggestion, delay necessary care, and feel cynical about the entire profession. It's an exhausting mental burden." },
    solution: { heading: "The Simple Truth: Dentistry Has Subjective Gray Areas", content: "Unlike a broken bone on an X-ray, many dental conditions have a spectrum. One dentist might 'watch' a small area of concern, while another might recommend treating it immediately. Both approaches can be valid. The problem is that you, the patient, have no way to know where on that spectrum your issue falls." },
    change: { heading: "What Should Happen Instead", content: "You should have access to objective data about your own teeth. You should be able to see the evidence and understand the severity, so you can have a meaningful discussion with your dentist about the best course of action, whether that's treating now or monitoring." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart provides an objective, AI-driven analysis of your dental images. We don't have a drill, so we have no incentive to recommend one. Our analysis helps you understand the severity of any findings, giving you the information you need to have a balanced conversation with your dentist about what truly needs treatment now." }
  },
  {
    id: "preventive-care-gap",
    title: "Why Doesn't My Dentist Focus More on Prevention?",
    category: "Dentist Problems",
    readTime: "3 min read",
    metaDescription: "Wish your dentist focused more on preventing problems? Learn why the system is reactive and how to take a proactive approach.",
    problem: { heading: "The Problem: The Fix-It Model", content: "You go to the dentist, they find a problem, they fix it. Rinse and repeat. It feels like the entire system is designed to react to problems after they occur, rather than preventing them in the first place. Where's the coaching? Where's the personalized prevention plan?" },
    empathy: { heading: "Why This Feels Backward", content: "You know that prevention is better than cure. It's cheaper, less painful, and better for your long-term health. So it's frustrating when the dental industry seems to profit more from fixing problems than from helping you avoid them. It feels like the incentives are misaligned." },
    solution: { heading: "The Simple Truth: The Business Model Favors Treatment", content: "The traditional dental business model is built on procedures. A dentist's revenue comes from fillings, crowns, and root canals, not from telling you your teeth are fine. While many dentists genuinely care about prevention, the economic structure of the industry doesn't always reward it." },
    change: { heading: "What Should Happen Instead", content: "You should have a proactive partner in your oral health, one that monitors changes over time, alerts you to early warning signs, and gives you actionable steps to prevent problems before they start." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart is built on prevention. Our AI tracks changes in your oral health over time, alerting you to early signs of decay, gum disease, or other issues when they're still easy and inexpensive to address. We give you a personalized prevention plan, turning you from a passive patient into an active participant in your own health." }
  },
  {
    id: "communication-gap",
    title: "Why Is There a Communication Gap Between Dentists and Patients?",
    category: "Dentist Problems",
    readTime: "3 min read",
    metaDescription: "Feel like your dentist speaks a different language? Explore the communication gap and how to bridge it for better care.",
    problem: { heading: "The Problem: Lost in Translation", content: "The dentist says 'distal caries on number 14' and you hear... nothing useful. They show you an X-ray and point to a shadow, but you can't tell a cavity from a filling. The entire conversation feels like it's happening in a language you don't speak." },
    empathy: { heading: "Why This Matters More Than You Think", content: "Poor communication isn't just annoying; it's dangerous. If you don't understand your diagnosis, you can't make informed decisions about your treatment. You might agree to something you don't need, or worse, decline something you do need because you didn't understand the severity." },
    solution: { heading: "The Simple Truth: Dentists Aren't Trained to Communicate", content: "Dental school focuses on clinical skills, not patient communication. Dentists learn to talk to other dentists, not to you. The jargon is efficient for professionals but alienating for patients. It's a training gap, not a character flaw." },
    change: { heading: "What Should Happen Instead", content: "Every patient should leave the dental office understanding exactly what was found, what it means, and what the options are. Information should be presented visually and in plain language, not in clinical codes and jargon." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart is your personal translator. We take the clinical complexity of your oral health and present it in clear, simple visuals and language. Before or after your appointment, you can use DentaSmart to understand what your dentist found, so you're never lost in translation again." }
  },
  {
    id: "choosing-right-dentist",
    title: "How Do You Choose the Right Dentist?",
    category: "Dentist Problems",
    readTime: "3 min read",
    metaDescription: "Struggling to find a trustworthy dentist? Learn what to look for and how to evaluate your dental care provider.",
    problem: { heading: "The Problem: The Yelp Gamble", content: "You need a new dentist. You search online, read a few reviews, and pick one that seems okay. But reviews are unreliable. A five-star review might mean the office has a nice waiting room, not that the dentist is clinically excellent. You're essentially gambling with your health based on strangers' opinions." },
    empathy: { heading: "Why This Choice Feels So High-Stakes", content: "Choosing a dentist is a deeply personal decision. This person will be looking inside your mouth, making recommendations that affect your health and your wallet, and you need to trust them. The stakes feel high because they are high, and there's no easy way to evaluate clinical competence from the outside." },
    solution: { heading: "The Simple Truth: You Can't Judge Clinical Skill from a Lobby", content: "A modern office, a friendly staff, and a painless injection don't necessarily mean the dentist is providing the best clinical care. The things that matter most, diagnostic accuracy, conservative treatment philosophy, long-term outcomes, are invisible to the average patient." },
    change: { heading: "What Should Happen Instead", content: "You should be able to evaluate your dental care based on objective data, not just subjective feelings. You should know if your dentist's findings align with an independent analysis, giving you a way to assess the quality of your care over time." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart gives you a benchmark. By analyzing your dental images independently, you can compare our findings with your dentist's recommendations. If they align, great, you've found a trustworthy provider. If they don't, you have the information you need to ask deeper questions or seek another opinion." }
  }
];

const clinicalArticles = [
  {
    id: "undetected-cavities",
    title: "Why Do Cavities Go Undetected Too Long?",
    category: "Dental Problems",
    readTime: "3 min read",
    metaDescription: "Think you'd feel a cavity? Think again. Learn why decay is often silent until it's serious and how to catch it early.",
    problem: { heading: "The Problem: The Silent Destroyer", content: "You brush, you floss, and your teeth feel fine. Then, at your checkup, the dentist says you have three cavities. You're shocked. 'But nothing hurts!' you say. It feels like they're making it up." },
    empathy: { heading: "Why This Is Frustrating", content: "It feels unfair to have a problem you can't feel or see. You rely on pain as your alarm system, but with teeth, pain is a late-stage symptom. By the time it hurts, the damage is deep, and the treatment is expensive." },
    solution: { heading: "The Simple Truth: Pain Means It's Late", content: "Enamel, the outer layer of your tooth, has no nerves. Decay can eat through it silently. Pain only starts when the decay hits the sensitive inner layers. Waiting for pain means waiting for the damage to be severe." },
    change: { heading: "What Should Happen Instead", content: "You should catch decay when it's a 'spot,' not a hole. Early decay can often be stopped or even reversed with better hygiene and fluoride. You need a way to see these early warning signs before they become drill-worthy problems." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart acts as your early warning system. Our AI analyzes your photos to spot subtle changes in color and texture that indicate early decay. We alert you when a problem is small and manageable, helping you avoid the drill and keep your natural tooth structure." }
  },
  {
    id: "silent-gum-disease",
    title: "Is Gum Disease Really That Serious?",
    category: "Dental Problems",
    readTime: "3 min read",
    metaDescription: "Bleeding gums might seem minor, but gum disease is a leading cause of tooth loss. Learn why it matters and what to do.",
    problem: { heading: "The Problem: The Ignored Warning Sign", content: "Your gums bleed when you brush. You figure it's normal, or maybe you're brushing too hard. You ignore it. But that bleeding is your body's alarm bell, and ignoring it can lead to a condition that causes more tooth loss in adults than cavities." },
    empathy: { heading: "Why People Dismiss It", content: "Gum disease doesn't hurt in its early stages. There's no sharp pain to force you to act. And because it progresses slowly, it's easy to normalize. 'My gums have always bled a little' is a common, and dangerous, rationalization." },
    solution: { heading: "The Simple Truth: Gum Disease Is an Infection", content: "Gingivitis and periodontitis are bacterial infections. They destroy the bone and tissue that hold your teeth in place. Left untreated, teeth become loose and eventually fall out. It's also linked to heart disease, diabetes, and other systemic health issues." },
    change: { heading: "What Should Happen Instead", content: "You should take bleeding gums as seriously as you'd take a wound that won't heal. Early intervention with better hygiene and professional cleanings can reverse gingivitis. But you need to catch it early." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart helps you monitor the health of your gums. Our AI can identify signs of inflammation, recession, and other early indicators of gum disease from your photos. We give you a clear picture of your gum health so you can act before the damage is irreversible." }
  },
  {
    id: "tooth-sensitivity",
    title: "Why Are My Teeth So Sensitive?",
    category: "Dental Problems",
    readTime: "3 min read",
    metaDescription: "Can't enjoy ice cream without wincing? Understand the causes of tooth sensitivity and find real solutions.",
    problem: { heading: "The Problem: The Wince Factor", content: "A sip of cold water, a bite of ice cream, or even a breath of cold air sends a sharp, shooting pain through your tooth. It's not a constant ache; it's a sudden jolt that makes you wince and avoid the things you enjoy." },
    empathy: { heading: "Why This Is More Than Just Annoying", content: "Sensitivity affects your quality of life. You start avoiding certain foods and drinks, you sip your coffee lukewarm, and you dread winter air. It's a constant, low-level anxiety about when the next jolt of pain will hit." },
    solution: { heading: "The Simple Truth: Your Tooth's Armor Has a Crack", content: "Sensitivity usually means the protective enamel on your tooth has worn down, or your gums have receded, exposing the sensitive root surface. This can be caused by aggressive brushing, grinding, acidic foods, or gum disease." },
    change: { heading: "What Should Happen Instead", content: "You should understand *why* your teeth are sensitive, not just mask the symptom with special toothpaste. Identifying the root cause, whether it's enamel erosion, gum recession, or a cracked tooth, is the key to finding a lasting solution." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart helps you identify potential causes of your sensitivity. By analyzing your photos, our AI can spot signs of enamel wear, gum recession, or visible cracks that might be contributing to your discomfort. This gives you specific information to discuss with your dentist for a targeted solution." }
  },
  {
    id: "wisdom-teeth-confusion",
    title: "Do My Wisdom Teeth Really Need to Come Out?",
    category: "Dental Problems",
    readTime: "3 min read",
    metaDescription: "Not sure if you need your wisdom teeth removed? Cut through the confusion and learn when extraction is truly necessary.",
    problem: { heading: "The Problem: The 'Everyone Gets Them Out' Myth", content: "You're told your wisdom teeth need to come out. But they don't hurt. Your friend kept theirs and they're fine. Is this a necessary surgery or an unnecessary rite of passage? The conflicting advice is confusing." },
    empathy: { heading: "Why This Decision Is Stressful", content: "Wisdom tooth extraction is surgery. It involves anesthesia, recovery time, and cost. Agreeing to it when you're not in pain feels counterintuitive. You want to make the right call, but you don't have enough information to feel confident." },
    solution: { heading: "The Simple Truth: It Depends on Your Mouth", content: "Not all wisdom teeth need to come out. If they're fully erupted, properly aligned, and easy to clean, they can stay. But if they're impacted, partially erupted, or crowding other teeth, they can cause infections, cysts, and damage to neighboring teeth." },
    change: { heading: "What Should Happen Instead", content: "The decision should be based on your specific anatomy, not a blanket policy. You should see clear evidence of why removal is recommended in your case, and understand the risks of both removing and keeping them." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart can help you visualize the position and condition of your wisdom teeth. Our AI analysis provides a clear picture of whether they're impacted or causing issues, giving you the information you need to have an informed discussion with your oral surgeon." }
  },
  {
    id: "teeth-grinding",
    title: "Am I Grinding My Teeth Without Knowing It?",
    category: "Dental Problems",
    readTime: "3 min read",
    metaDescription: "Waking up with jaw pain or headaches? You might be grinding your teeth at night. Learn the signs and how to stop the damage.",
    problem: { heading: "The Problem: The Nighttime Destroyer", content: "You wake up with a sore jaw, a headache, or a dull ache in your teeth. Your partner says you make grinding noises at night. Or maybe you have no symptoms at all, but your dentist says your teeth are showing signs of wear. Bruxism, or teeth grinding, is a silent habit that can cause serious damage." },
    empathy: { heading: "Why This Is Hard to Address", content: "You can't control what you do in your sleep. It's frustrating to be told you're damaging your teeth with a habit you're not even aware of. And the solutions, like wearing a night guard, feel clunky and uncomfortable." },
    solution: { heading: "The Simple Truth: Stress Is Usually the Trigger", content: "Most teeth grinding is linked to stress, anxiety, or sleep disorders. It's your body's way of processing tension. While a night guard protects your teeth from the damage, addressing the underlying stress is the key to reducing the grinding itself." },
    change: { heading: "What Should Happen Instead", content: "You should be able to see the evidence of grinding on your own teeth, so you understand the urgency. And you should have a plan that addresses both the symptom (protecting your teeth) and the cause (managing stress)." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart can identify the telltale signs of bruxism in your photos, such as flattened tooth surfaces, chips, and cracks. By showing you the visible evidence of grinding, we help you understand the importance of intervention and give you the motivation to talk to your dentist about a night guard or other solutions." }
  },
  {
    id: "stained-teeth",
    title: "Why Are My Teeth Staining and What Can I Do?",
    category: "Dental Problems",
    readTime: "3 min read",
    metaDescription: "Embarrassed by tooth stains? Learn the real causes of discoloration and which whitening methods actually work.",
    problem: { heading: "The Problem: The Fading Smile", content: "You look in the mirror and your teeth aren't as white as they used to be. They're yellowing, or you have dark spots from coffee, tea, or wine. You've tried whitening toothpaste, but it doesn't seem to make a difference. Your smile, once your best feature, is becoming a source of self-consciousness." },
    empathy: { heading: "Why This Affects Your Confidence", content: "Your smile is one of the first things people notice. When you're unhappy with the color of your teeth, you smile less, cover your mouth when you laugh, and feel less confident in social and professional situations. It's a small thing that has a big impact on your daily life." },
    solution: { heading: "The Simple Truth: Not All Stains Are the Same", content: "There are two types of stains: extrinsic (surface stains from food, drinks, and tobacco) and intrinsic (deeper discoloration from medications, trauma, or aging). Whitening toothpaste can help with surface stains, but it won't touch intrinsic discoloration. Understanding the type of stain is key to choosing the right treatment." },
    change: { heading: "What Should Happen Instead", content: "You should understand what type of staining you have before spending money on products that won't work. You should know which over-the-counter options are effective and when professional treatment is worth the investment." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart can help you assess the type and severity of your tooth discoloration. Our AI analyzes your photos to identify whether your staining is surface-level or deeper, and provides guidance on the most effective approach for your specific situation." }
  },
  {
    id: "bad-breath",
    title: "Why Does My Breath Smell Bad Even After Brushing?",
    category: "Dental Problems",
    readTime: "3 min read",
    metaDescription: "Brushing isn't fixing your bad breath? Discover the hidden dental causes of halitosis and how to actually solve it.",
    problem: { heading: "The Problem: The Persistent Embarrassment", content: "You brush twice a day, use mouthwash, and chew gum constantly, but you still worry about your breath. Maybe someone has made a comment, or you've noticed people stepping back when you talk. Bad breath, or halitosis, is a deeply embarrassing problem that affects your social confidence." },
    empathy: { heading: "Why This Is So Isolating", content: "Bad breath carries a social stigma. People assume it's a hygiene issue, but it's often a health issue. The embarrassment can make you withdraw from close conversations, avoid intimacy, and constantly worry about how you're perceived." },
    solution: { heading: "The Simple Truth: The Cause Is Usually in Your Mouth", content: "About 90% of bad breath originates in the mouth, not the stomach. The most common causes are bacteria on the tongue, gum disease, and untreated cavities. Mouthwash only masks the smell temporarily; it doesn't address the source." },
    change: { heading: "What Should Happen Instead", content: "You should identify the root cause of your bad breath, not just cover it up. Is it your tongue? Your gums? A hidden cavity? Once you know the source, you can target it effectively." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart can help identify potential oral causes of bad breath. Our AI analyzes your photos for signs of gum disease, visible decay, or other conditions that are common culprits. By pinpointing the likely source, we help you take targeted action instead of just masking the symptom." }
  },
  {
    id: "cracked-tooth",
    title: "What Happens If I Ignore a Cracked Tooth?",
    category: "Dental Problems",
    readTime: "3 min read",
    metaDescription: "Noticed a crack in your tooth? Learn why ignoring it is risky and what your treatment options are.",
    problem: { heading: "The Problem: The Hairline Fracture You're Ignoring", content: "You notice a faint line on your tooth, or you feel a sharp pain when you bite down on something hard. It goes away quickly, so you ignore it. But that crack is a ticking time bomb. It might be small now, but it can grow, and when it does, the consequences are severe." },
    empathy: { heading: "Why People Wait Too Long", content: "If it doesn't hurt consistently, it's easy to push it to the bottom of your to-do list. Dental visits are inconvenient and expensive, and a 'tiny crack' doesn't feel like an emergency. But by the time it becomes an emergency, the treatment options are far more limited and costly." },
    solution: { heading: "The Simple Truth: Cracks Only Get Worse", content: "Teeth don't heal like bones. A crack will never repair itself. Every time you chew, the crack flexes and grows. Eventually, it can reach the nerve, causing severe pain and requiring a root canal, or the tooth can split entirely, requiring extraction." },
    change: { heading: "What Should Happen Instead", content: "You should be able to monitor cracks and understand their severity. A small crack caught early might only need a crown. A crack that's ignored until it reaches the nerve will need a root canal and a crown, or worse, an extraction and an implant." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart helps you keep an eye on visible cracks and chips. Our AI can detect and track changes in your tooth structure over time, alerting you when a crack appears to be progressing. This early awareness empowers you to seek treatment when it's simpler and less expensive." }
  },
  {
    id: "missing-teeth",
    title: "What Happens When You Don't Replace a Missing Tooth?",
    category: "Dental Problems",
    readTime: "3 min read",
    metaDescription: "Lost a tooth and thinking of leaving the gap? Learn why missing teeth cause a chain reaction of dental problems.",
    problem: { heading: "The Problem: The Domino Effect", content: "You lost a tooth, maybe it was extracted or knocked out. It's in the back, so no one can see it. You figure you can live without it. But what you don't realize is that a missing tooth sets off a chain reaction that affects your entire mouth." },
    empathy: { heading: "Why People Skip Replacement", content: "Replacing a tooth is expensive. Implants can cost thousands. Bridges require altering healthy teeth. And if the gap isn't visible, the urgency just isn't there. It's easy to rationalize: 'I have plenty of other teeth.'" },
    solution: { heading: "The Simple Truth: Your Teeth Are a Team", content: "When one tooth is missing, the neighboring teeth start to shift into the gap. The opposing tooth can over-erupt. Your bite changes, putting uneven stress on other teeth. Bone loss occurs where the root used to be. One missing tooth can lead to a cascade of problems over the following years." },
    change: { heading: "What Should Happen Instead", content: "You should understand the long-term consequences of leaving a gap, so you can make an informed decision about replacement options and timing, even if you can't afford it right now." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart helps you monitor the effects of a missing tooth over time. Our AI can track shifting teeth, changes in your bite, and other signs that the gap is causing problems. This ongoing awareness helps you plan for replacement before the secondary damage becomes severe." }
  },
  {
    id: "enamel-erosion",
    title: "Is Your Diet Destroying Your Tooth Enamel?",
    category: "Dental Problems",
    readTime: "3 min read",
    metaDescription: "Love citrus and soda? Your diet might be eroding your enamel. Learn how to protect your teeth without giving up your favorites.",
    problem: { heading: "The Problem: The Invisible Acid Attack", content: "You eat healthy, lots of fruits, salads with vinaigrette, sparkling water. But your dentist says your enamel is eroding. How can healthy foods be bad for your teeth? It feels contradictory and confusing." },
    empathy: { heading: "Why This Is Confusing", content: "We're told to eat more fruits and vegetables, drink more water. But citrus fruits, tomatoes, vinegar, and even sparkling water are acidic, and acid is enamel's worst enemy. It feels like you can't win." },
    solution: { heading: "The Simple Truth: Acid Softens Enamel", content: "Every time you consume something acidic, the pH in your mouth drops, and your enamel softens temporarily. If you brush immediately after (as many health-conscious people do), you're scrubbing away the softened enamel. Over time, this leads to thinner enamel, increased sensitivity, and a higher risk of decay." },
    change: { heading: "What Should Happen Instead", content: "You should know which of your dietary habits are putting your enamel at risk, and learn simple strategies to minimize the damage, like rinsing with water after acidic foods and waiting 30 minutes before brushing." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart can help you spot the early signs of enamel erosion, such as transparency at the edges of teeth, yellowing (as the dentin shows through), and increased sensitivity. By catching erosion early, you can adjust your habits before the damage becomes irreversible." }
  }
];

const insuranceArticles = [
  {
    id: "misleading-insurance",
    title: "Why Does Dental Insurance Feel Misleading?",
    category: "Insurance Problems",
    readTime: "3 min read",
    metaDescription: "Think you're fully covered? Think again. Learn why dental insurance is often misleading and how to avoid coverage surprises.",
    problem: { heading: "The Problem: The Illusion of Coverage", content: "You pay your premiums every month, so you assume you're covered. Then you go to the dentist, get a treatment plan, and find out your insurance pays... almost nothing. Or worse, you get a bill weeks later for a procedure you thought was '100% covered.' It feels like a bait-and-switch." },
    empathy: { heading: "Why This Feels Like a Scam", content: "You're paying for a service that promises to protect you from high dental costs. When it fails to deliver, it feels like you've been deceived. The fine print is dense, the terminology is confusing, and the 'covered' procedures seem to exclude everything you actually need." },
    solution: { heading: "The Simple Truth: Dental Insurance Isn't Really Insurance", content: "Unlike medical insurance, which is designed to protect you from catastrophic costs, dental insurance is more like a discount plan with a low annual cap (usually $1,000-$2,000). It was designed decades ago and hasn't kept up with the rising cost of dental care. It's not meant to cover everything; it's meant to offset some of the cost." },
    change: { heading: "What Should Happen Instead", content: "You should understand your plan's limitations before you need care, not after. You should know your annual maximum, your deductible, the percentage covered for each type of procedure, and whether your dentist is in-network." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart helps you understand your oral health needs before you file a claim. By knowing what issues you might be facing, you can proactively check your coverage, compare costs, and avoid the shock of an unexpected bill. Knowledge is the best insurance against insurance surprises." }
  },
  {
    id: "denied-claims",
    title: "Why Do Insurance Companies Deny Dental Claims?",
    category: "Insurance Problems",
    readTime: "3 min read",
    metaDescription: "Had a dental claim denied? Understand the common reasons and learn how to fight back effectively.",
    problem: { heading: "The Problem: The Denial Letter", content: "You had a procedure, your dentist submitted the claim, and weeks later you get a letter: 'Claim Denied.' The reason is written in insurance jargon that makes no sense. Now you're stuck with a bill you thought was covered, and you have no idea what to do next." },
    empathy: { heading: "Why This Feels Helpless", content: "You followed the rules. You went to an in-network dentist. You got the treatment your dentist said you needed. And now the insurance company, which has never looked inside your mouth, is overruling your dentist's professional judgment. It feels like the system is rigged against you." },
    solution: { heading: "The Simple Truth: Denials Are Often a Business Decision", content: "Insurance companies deny claims for many reasons: the procedure was deemed 'not medically necessary,' it's considered 'cosmetic,' a waiting period hasn't been met, or the annual maximum has been reached. Some denials are legitimate; others are cost-saving measures that can be appealed." },
    change: { heading: "What Should Happen Instead", content: "You should understand why a claim was denied and know your right to appeal. Many denied claims are overturned on appeal, but most patients don't know they can fight back." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart helps you build a stronger case for your dental needs. Our AI analysis provides objective evidence of your oral health conditions, which can support your dentist's clinical findings when appealing a denied claim. We help you document the medical necessity of your treatment." }
  },
  {
    id: "insurance-limitations",
    title: "Why Does Dental Insurance Have Such Low Annual Limits?",
    category: "Insurance Problems",
    readTime: "3 min read",
    metaDescription: "Frustrated by your $1,500 annual dental cap? Learn why limits are so low and how to maximize your benefits.",
    problem: { heading: "The Problem: The $1,500 Cap", content: "Your dental insurance has an annual maximum of $1,500. That sounds reasonable until you need a crown ($1,200) and a filling ($300). Congratulations, you've maxed out your benefits for the year, and it's only March. Any additional work comes entirely out of your pocket." },
    empathy: { heading: "Why This Feels Absurd", content: "The average annual maximum for dental insurance hasn't changed significantly since the 1960s. But the cost of dental care has skyrocketed. A cap that might have covered a year's worth of treatment decades ago now barely covers a single major procedure. It feels like the industry is stuck in a time warp." },
    solution: { heading: "The Simple Truth: The Cap Is a Relic", content: "Dental insurance annual maximums were set decades ago and have barely been adjusted for inflation. If they had kept pace, the average cap would be closer to $8,000-$10,000 today. The low cap is a legacy of an outdated system that hasn't evolved with the cost of care." },
    change: { heading: "What Should Happen Instead", content: "You should be able to plan your dental care strategically around your benefits. If you know you'll need multiple procedures, you should be able to time them across benefit years to maximize your coverage." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart helps you prioritize your dental needs. By giving you a clear picture of all the issues in your mouth, we help you work with your dentist to create a treatment plan that strategically uses your annual benefits. We help you decide what to treat this year and what can safely wait until your benefits reset." }
  },
  {
    id: "in-network-confusion",
    title: "What Does 'In-Network' Actually Mean for Dental Care?",
    category: "Insurance Problems",
    readTime: "3 min read",
    metaDescription: "Confused by in-network vs. out-of-network dental care? Learn what it really means for your wallet and your options.",
    problem: { heading: "The Problem: The Network Maze", content: "Your insurance says to use an 'in-network' dentist for the best rates. But your trusted dentist of 10 years isn't in-network. Do you switch to a stranger to save money, or stay with the dentist you trust and pay more? It's a frustrating choice between your wallet and your comfort." },
    empathy: { heading: "Why This Choice Feels Unfair", content: "You chose your dentist for a reason: trust, quality, convenience. Being told you have to switch to a dentist you've never met just because of an insurance contract feels like the insurance company is choosing your doctor for you. And the cost difference can be significant." },
    solution: { heading: "The Simple Truth: Networks Are About Negotiated Rates", content: "In-network dentists have agreed to accept lower fees from the insurance company in exchange for a steady stream of patients. Out-of-network dentists charge their full fees. The 'savings' of going in-network come from these negotiated discounts, not from better care." },
    change: { heading: "What Should Happen Instead", content: "You should be able to make an informed choice. You should know exactly how much more you'll pay out-of-network, so you can decide if the extra cost is worth staying with your preferred dentist." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart helps you understand your dental needs before you choose a provider. By knowing what issues you're facing, you can compare costs between in-network and out-of-network dentists for those specific procedures, making a truly informed decision about where to get your care." }
  },
  {
    id: "waiting-periods",
    title: "Why Do Dental Insurance Plans Have Waiting Periods?",
    category: "Insurance Problems",
    readTime: "3 min read",
    metaDescription: "Just got dental insurance but can't use it yet? Understand waiting periods and how to plan around them.",
    problem: { heading: "The Problem: The Coverage You Can't Use", content: "You just signed up for dental insurance because you know you need work done. But when you try to schedule your crown, you're told there's a 12-month waiting period for major procedures. You're paying premiums for coverage you can't use. It feels like a trap." },
    empathy: { heading: "Why This Feels Predatory", content: "You bought insurance specifically because you need dental care. Being told you have to wait a year before you can use it for anything beyond a cleaning feels like the insurance company is taking your money while providing minimal value. It's especially frustrating when you're in pain or facing a worsening condition." },
    solution: { heading: "The Simple Truth: Waiting Periods Prevent 'Buy and Cancel'", content: "Insurance companies impose waiting periods to prevent people from buying a plan only when they need expensive work, getting the treatment, and then canceling. It's an anti-fraud measure designed to keep premiums lower for everyone. But it punishes people who genuinely need care now." },
    change: { heading: "What Should Happen Instead", content: "You should understand waiting periods before you enroll, so you can plan accordingly. If you need immediate care, you should know your options, including dental discount plans, payment plans, or dental schools that offer reduced-cost treatment." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart helps you assess the urgency of your dental needs. If you're in a waiting period, our AI analysis can help you understand which issues are urgent (and might need to be addressed out-of-pocket) and which can safely wait until your coverage kicks in. We help you make smart decisions during the gap." }
  },
  {
    id: "pre-authorization",
    title: "What Is Dental Pre-Authorization and Why Does It Matter?",
    category: "Insurance Problems",
    readTime: "3 min read",
    metaDescription: "Your dentist mentioned pre-authorization? Learn what it is, why it's required, and how it affects your treatment timeline.",
    problem: { heading: "The Problem: The Approval Bottleneck", content: "Your dentist says you need a crown. Before they can schedule it, they need to submit a 'pre-authorization' to your insurance company. This can take days or even weeks. Meanwhile, you're sitting with a damaged tooth, waiting for a bureaucrat to approve what your dentist has already determined is necessary." },
    empathy: { heading: "Why This Delay Is Maddening", content: "You've already been examined by a trained professional who has determined you need treatment. Now you have to wait for someone at an insurance company, who has never seen your mouth, to agree. It feels like an unnecessary layer of red tape that prioritizes cost control over patient care." },
    solution: { heading: "The Simple Truth: Pre-Auth Is a Cost Control Tool", content: "Pre-authorization allows the insurance company to review the proposed treatment and determine if it meets their criteria for 'medical necessity.' It's essentially a gatekeeper function. While it can prevent unnecessary procedures, it also delays necessary ones and adds administrative burden." },
    change: { heading: "What Should Happen Instead", content: "You should understand the pre-authorization process and timeline before treatment is proposed. You should also know that a pre-authorization is not a guarantee of payment; it's an estimate of what the insurance company expects to cover." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart helps you understand your dental conditions in advance, so you can anticipate the need for pre-authorization. By knowing what issues you're facing before your dental visit, you can ask your dentist to submit pre-authorizations proactively, reducing wait times and getting you into the chair faster." }
  },
  {
    id: "cosmetic-vs-necessary",
    title: "When Does Insurance Consider Dental Work 'Cosmetic'?",
    category: "Insurance Problems",
    readTime: "3 min read",
    metaDescription: "Insurance denied your claim as 'cosmetic'? Learn where the line is drawn and how to challenge unfair classifications.",
    problem: { heading: "The Problem: The 'Cosmetic' Label", content: "You need a front tooth repaired after it chipped. Your dentist recommends a porcelain crown for a natural look. Your insurance says it's 'cosmetic' and only covers a metal crown, or nothing at all. But this isn't about vanity; it's about having a functional, normal-looking tooth." },
    empathy: { heading: "Why This Classification Hurts", content: "The word 'cosmetic' implies you're being vain. But wanting a front tooth that looks natural isn't vanity; it's a basic expectation. The insurance company's narrow definition of 'necessary' doesn't account for the psychological and social impact of a visibly damaged smile." },
    solution: { heading: "The Simple Truth: The Line Is Arbitrary", content: "Insurance companies draw a line between 'medically necessary' and 'cosmetic' based on function, not appearance. If a tooth can chew, it's 'functional,' regardless of how it looks. This means tooth-colored fillings, porcelain crowns on front teeth, and orthodontics for mild misalignment are often classified as cosmetic." },
    change: { heading: "What Should Happen Instead", content: "The definition of 'necessary' should include the psychological and social impact of dental appearance. You should also know upfront which materials and procedures your insurance considers cosmetic, so you can plan and budget accordingly." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart helps you document the functional aspects of your dental issues. Our AI analysis can highlight how a damaged tooth affects your bite, your ability to chew, or your risk of further damage, providing evidence that supports the medical necessity of your treatment beyond just appearance." }
  },
  {
    id: "no-insurance-options",
    title: "What Are Your Options If You Don't Have Dental Insurance?",
    category: "Insurance Problems",
    readTime: "3 min read",
    metaDescription: "No dental insurance? You still have options. Discover affordable ways to get the dental care you need.",
    problem: { heading: "The Problem: The Uninsured Dilemma", content: "You don't have dental insurance. Maybe your employer doesn't offer it, maybe you're self-employed, or maybe you just can't afford the premiums. Whatever the reason, the thought of paying full price for dental care is daunting, so you avoid going altogether." },
    empathy: { heading: "Why This Leads to Avoidance", content: "Without insurance, a routine cleaning can cost $200-$300, and a single crown can be $1,000+. These costs are prohibitive for many people. The result is a cycle of avoidance: you skip checkups, small problems become big problems, and the eventual cost is even higher." },
    solution: { heading: "The Simple Truth: There Are Alternatives", content: "Dental insurance isn't the only way to afford dental care. Dental discount plans, dental schools, community health centers, and payment plans through providers like CareCredit offer alternatives. Many dentists also offer in-house membership plans with discounted rates for uninsured patients." },
    change: { heading: "What Should Happen Instead", content: "You should know all your options, not just insurance. And you should be able to prioritize your dental needs so you can address the most urgent issues first, even on a tight budget." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart is your affordable first step. For a fraction of the cost of a dental visit, our AI analysis gives you a clear picture of your oral health. We help you identify what's urgent, what can wait, and what you can manage at home, so you can allocate your limited budget to the care that matters most." }
  },
  {
    id: "employer-dental-plans",
    title: "Is Your Employer's Dental Plan Actually Good?",
    category: "Insurance Problems",
    readTime: "3 min read",
    metaDescription: "Think your employer dental plan has you covered? Learn how to evaluate if it's actually meeting your needs.",
    problem: { heading: "The Problem: The Default Choice", content: "During open enrollment, you check the box for dental coverage without much thought. It's offered by your employer, so it must be decent, right? But when you actually need to use it, you discover the coverage is thin, the network is small, and your out-of-pocket costs are still high." },
    empathy: { heading: "Why People Don't Evaluate Their Plans", content: "Insurance documents are dense and confusing. Most people don't have the time or expertise to compare plans, understand fee schedules, or calculate their potential out-of-pocket costs. They trust that their employer has chosen a reasonable option, and they don't think about it until they need care." },
    solution: { heading: "The Simple Truth: Employer Plans Are a Compromise", content: "Employers choose dental plans based on cost, not comprehensiveness. They're balancing the benefit to employees against the cost to the company. The result is often a plan that covers preventive care well but leaves significant gaps for major procedures." },
    change: { heading: "What Should Happen Instead", content: "You should evaluate your dental plan based on your actual dental needs, not just the premium cost. If you know you need major work, a plan with a higher premium but better coverage for crowns and root canals might save you money overall." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart helps you understand your dental needs so you can evaluate your insurance plan intelligently. By knowing what issues you're facing, you can compare your plan's coverage for those specific procedures and make a more informed choice during open enrollment." }
  },
  {
    id: "maximize-benefits",
    title: "How to Maximize Your Dental Insurance Benefits",
    category: "Insurance Problems",
    readTime: "3 min read",
    metaDescription: "Leaving dental benefits on the table? Learn smart strategies to get the most out of your dental insurance plan.",
    problem: { heading: "The Problem: Use It or Lose It", content: "It's November, and you realize you've barely used your dental benefits this year. Your annual maximum resets on January 1st, and any unused benefits disappear. You've been paying premiums all year for coverage you haven't used. It feels like throwing money away." },
    empathy: { heading: "Why This Happens Every Year", content: "Life gets busy. Dental appointments get pushed to 'next month,' and suddenly the year is almost over. The 'use it or lose it' nature of dental benefits means procrastination has a real financial cost, but the urgency never feels real until it's too late." },
    solution: { heading: "The Simple Truth: Strategic Planning Saves Money", content: "The key to maximizing your dental benefits is planning. Schedule your two covered cleanings early in the year. If you need major work, time it strategically: start a multi-step procedure in December and finish it in January to spread the cost across two benefit years." },
    change: { heading: "What Should Happen Instead", content: "You should have a clear picture of your dental needs at the beginning of the year, so you can create a treatment plan that maximizes your benefits and minimizes your out-of-pocket costs." },
    result: { heading: "How DentaSmart Helps", content: "DentaSmart gives you a comprehensive view of your oral health at any time. Use our AI analysis at the start of the year to identify all potential issues, then work with your dentist to create a treatment plan that strategically uses your annual benefits. We help you turn 'use it or lose it' into 'use it wisely.'" }
  }
];

const allArticles = [...dentistArticles, ...clinicalArticles, ...insuranceArticles];

async function seedBlogs() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("DATABASE_URL not set");
    process.exit(1);
  }

  const connection = await mysql.createConnection(dbUrl);

  console.log(`Seeding ${allArticles.length} blog articles...`);

  for (const article of allArticles) {
    const slug = article.id;
    const now = new Date();

    // Check if already exists
    const [existing] = await connection.execute(
      'SELECT id FROM blog_posts WHERE slug = ?',
      [slug]
    );

    if (Array.isArray(existing) && existing.length > 0) {
      console.log(`  Skipping "${article.title}" (already exists)`);
      continue;
    }

    await connection.execute(
      `INSERT INTO blog_posts (
        title, slug, category, readTime, status,
        problemHeading, problemContent,
        empathyHeading, empathyContent,
        solutionHeading, solutionContent,
        changeHeading, changeContent,
        resultHeading, resultContent,
        metaTitle, metaDescription, metaKeywords,
        ogTitle, ogDescription,
        publishedAt, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, 'published', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        article.title,
        slug,
        article.category,
        article.readTime,
        article.problem.heading,
        article.problem.content,
        article.empathy.heading,
        article.empathy.content,
        article.solution.heading,
        article.solution.content,
        article.change.heading,
        article.change.content,
        article.result.heading,
        article.result.content,
        article.title + " | DentaSmart",
        article.metaDescription,
        article.category.toLowerCase().replace(' ', ', ') + ", dental health, oral care, dentasmart",
        article.title,
        article.metaDescription,
        now,
        now,
        now,
      ]
    );

    console.log(`  ✓ Seeded "${article.title}"`);
  }

  await connection.end();
  console.log("Done! All articles seeded.");
}

seedBlogs().catch(console.error);
