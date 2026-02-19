import 'dotenv/config';
import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

const conn = await mysql.createConnection(DATABASE_URL);

const posts = [
  // ===== POST 1: Tooth Pain =====
  {
    title: "Tooth Pain (Toothache): What It Means and What to Do",
    slug: "tooth-pain-toothache",
    category: "Symptoms",
    readTime: "5 min read",
    primaryKeyword: "tooth pain",
    secondaryKeywords: "toothache, tooth hurts, dental pain, why does my tooth hurt",
    metaTitle: "Tooth Pain (Toothache): Causes, Relief, and When to See a Dentist",
    metaDescription: "Tooth pain can mean many things. Learn the common causes of toothaches, what you can do at home, and when to see a dentist right away.",
    atAGlanceAnswer: "Tooth pain is your body telling you something needs attention. It could be a cavity, a crack, gum disease, or an infection. Mild pain that comes and goes may not be urgent, but sharp or throbbing pain that lasts more than a day or two usually means you should see a dentist. In the meantime, over the counter pain relief and avoiding very hot or cold foods can help. DentaSmart can help you understand what might be going on before your visit.",
    keyTakeaways: JSON.stringify(["Tooth pain has many possible causes, from cavities to infections", "Pain lasting more than 2 days or waking you up at night needs a dentist visit", "DentaSmart can help you understand your symptoms before your appointment"]),
    whenUrgent: JSON.stringify(["Severe throbbing pain that does not respond to pain medication", "Swelling in your face, jaw, or neck", "Fever along with tooth pain", "Pain after a dental injury or trauma", "Pus or a bad taste coming from around the tooth"]),
    faqs: JSON.stringify([
      { question: "Why does my tooth hurt when I eat?", answer: "Pain when eating often means there is a cavity, a crack, or a filling that has come loose. The pressure from chewing puts stress on the damaged area. If it happens every time you eat, see a dentist soon." },
      { question: "Can a toothache go away on its own?", answer: "Sometimes mild tooth pain from sensitivity or minor irritation can settle down. But pain from a cavity or infection will not go away on its own. It usually gets worse over time." },
      { question: "What can I do for tooth pain at home?", answer: "Take over the counter pain relief like ibuprofen. Rinse with warm salt water. Avoid very hot, cold, or sweet foods. These are temporary measures. See a dentist if pain continues." },
      { question: "How do I know if my toothache is serious?", answer: "Serious signs include swelling, fever, pain that wakes you up at night, or pain that does not respond to medication. If you notice any of these, see a dentist as soon as possible." },
      { question: "Can DentaSmart help with tooth pain?", answer: "DentaSmart can analyze photos of your teeth and X-rays to help you understand what might be causing your pain. It gives you insights to have a better conversation with your dentist." }
    ]),
    relatedPosts: JSON.stringify(["pain-when-biting-or-chewing", "tooth-abscess-infection", "cavity-symptoms-tooth-decay"]),
    reviewedByName: "DentaSmart Clinical Advisory",
    reviewedByCredentials: "Content reviewed for accuracy by dental professionals",
    bodyHtml: `<h2>What Tooth Pain Might Mean</h2>
<p>A toothache is one of the most common reasons people visit a dentist. The pain can range from a dull ache to a sharp, throbbing sensation that makes it hard to focus on anything else. Understanding what your tooth pain might mean is the first step toward getting relief.</p>
<p>Tooth pain happens when the nerve inside your tooth (called the pulp) gets irritated. This can happen because of decay, a crack, gum disease, or infection. Sometimes the cause is obvious. Other times, it takes a dental exam and X-rays to figure out what is going on.</p>

<h2>Common Causes of Tooth Pain</h2>
<p><strong>Cavities (tooth decay):</strong> The most common cause. Bacteria eat through your enamel and reach the sensitive layers underneath. You might notice pain with sweets, hot, or cold foods.</p>
<p><strong>Cracked or chipped tooth:</strong> A crack can expose the nerve and cause sharp pain when you bite down. Cracks are not always visible to the eye.</p>
<p><strong>Gum disease:</strong> When gums pull away from teeth, the roots become exposed and sensitive. Advanced gum disease can cause deep, aching pain.</p>
<p><strong>Tooth infection (abscess):</strong> An infection at the root of a tooth causes throbbing pain, swelling, and sometimes fever. This needs prompt treatment.</p>
<p><strong>Grinding or clenching:</strong> Putting too much pressure on teeth, especially at night, can cause soreness and pain.</p>

<h2>What to Do Now</h2>
<ol>
<li><strong>Take note of your symptoms.</strong> Where is the pain? Is it constant or does it come and go? What makes it better or worse? This information helps your dentist.</li>
<li><strong>Manage the pain at home.</strong> Over the counter ibuprofen or acetaminophen can help. Rinse with warm salt water. Avoid extreme temperatures in food and drinks.</li>
<li><strong>Get clarity with DentaSmart.</strong> Upload a photo of your teeth or an X-ray to get AI powered insights about what might be happening. Then schedule a dentist visit with better information.</li>
</ol>`,
    status: "published",
  },

  // ===== POST 2: Pain When Biting =====
  {
    title: "Pain When Biting or Chewing: Causes and Next Steps",
    slug: "pain-when-biting-or-chewing",
    category: "Symptoms",
    readTime: "5 min read",
    primaryKeyword: "pain when biting",
    secondaryKeywords: "tooth hurts when chewing, pain when eating, bite pain tooth",
    metaTitle: "Pain When Biting or Chewing: What It Means and What to Do",
    metaDescription: "Does your tooth hurt when you bite down? Learn the most common causes of pain when chewing and when you should see a dentist.",
    atAGlanceAnswer: "Pain when biting or chewing usually means something is wrong with a specific tooth. It could be a crack, a cavity, a high filling, or an infection. The pressure from biting puts stress on the damaged area and triggers pain. If it happens once, it might not be serious. But if it happens every time you eat, especially on the same tooth, you should see a dentist. DentaSmart can help you identify the problem area before your visit.",
    keyTakeaways: JSON.stringify(["Pain when biting often points to a crack, cavity, or high filling", "Consistent pain on the same tooth needs a dental exam", "DentaSmart can help you understand what might be causing the pain"]),
    whenUrgent: JSON.stringify(["Sharp pain every time you bite on a specific tooth", "Swelling near the painful tooth", "Pain that gets worse over several days", "A piece of tooth broke off while eating"]),
    faqs: JSON.stringify([
      { question: "Why does my tooth hurt only when I bite down?", answer: "Biting puts pressure on your teeth. If a tooth has a crack, cavity, or loose filling, that pressure causes pain. The tooth might feel fine otherwise because nothing is pressing on the damaged area." },
      { question: "Can a high filling cause pain when biting?", answer: "Yes. If a filling is even slightly too high, it hits first when you bite. This causes pain and can even crack the tooth over time. Your dentist can adjust it in minutes." },
      { question: "Is pain when chewing always a cavity?", answer: "Not always. It could be a crack, a loose filling, gum disease, or even a sinus issue for upper teeth. A dental exam with X-rays is the best way to find the cause." },
      { question: "Should I stop eating on the side that hurts?", answer: "Yes, avoid chewing on the painful side until you see a dentist. This prevents further damage and reduces pain." },
      { question: "How can DentaSmart help?", answer: "Upload a photo or X-ray and DentaSmart will analyze it for potential issues like cavities, cracks, or other problems. It helps you understand what might be going on before your dentist visit." }
    ]),
    relatedPosts: JSON.stringify(["tooth-pain-toothache", "cracked-tooth-symptoms", "filling-feels-high-pain-biting"]),
    reviewedByName: "DentaSmart Clinical Advisory",
    reviewedByCredentials: "Content reviewed for accuracy by dental professionals",
    bodyHtml: `<h2>What Pain When Biting Might Mean</h2>
<p>When a tooth hurts only when you bite or chew, it is telling you that something specific is wrong. Unlike constant pain that might come from an infection, bite pain is usually triggered by pressure on a damaged area.</p>

<h2>Common Causes</h2>
<p><strong>Cracked tooth:</strong> One of the most common causes. The crack opens slightly when you bite, irritating the nerve. It closes when you release, which is why the pain comes and goes.</p>
<p><strong>Cavity reaching the inner layer:</strong> When decay gets deep enough, biting pressure pushes on the weakened tooth structure and causes pain.</p>
<p><strong>High filling or crown:</strong> If a recent filling or crown sits too high, it absorbs more force than it should. This causes soreness and can lead to bigger problems.</p>
<p><strong>Tooth infection:</strong> An infection at the root can make the tooth tender to pressure. You might also notice swelling or a bad taste.</p>
<p><strong>Gum disease:</strong> Advanced gum disease loosens teeth, making them painful when you bite.</p>

<h2>What to Do Now</h2>
<ol>
<li><strong>Avoid chewing on the painful side.</strong> Give the tooth a break while you figure out what is going on.</li>
<li><strong>Check for recent dental work.</strong> If you had a filling or crown recently, it might just need a small adjustment.</li>
<li><strong>Use DentaSmart for clarity.</strong> Upload a photo and get AI insights about what might be causing your pain. Then visit your dentist with better information.</li>
</ol>`,
    status: "published",
  },

  // ===== POST 3: Tooth Sensitivity =====
  {
    title: "Tooth Sensitivity to Cold or Hot: Why It Happens",
    slug: "tooth-sensitivity-cold-hot",
    category: "Symptoms",
    readTime: "5 min read",
    primaryKeyword: "tooth sensitivity",
    secondaryKeywords: "sensitive teeth, teeth hurt cold, tooth sensitive to hot, cold sensitivity",
    metaTitle: "Tooth Sensitivity to Cold or Hot: Causes and How to Get Relief",
    metaDescription: "Teeth sensitive to cold or hot drinks? Learn why tooth sensitivity happens, what causes it, and simple steps to get relief.",
    atAGlanceAnswer: "Tooth sensitivity to cold or hot happens when the protective layers of your teeth wear down and expose the inner layer (called dentin). This layer has tiny tubes that connect to the nerve, so temperature changes cause a quick, sharp pain. Common causes include gum recession, worn enamel, cavities, and teeth grinding. Sensitivity toothpaste can help mild cases. But if the pain lingers or gets worse, see a dentist to rule out a cavity or crack.",
    keyTakeaways: JSON.stringify(["Sensitivity happens when dentin is exposed through worn enamel or gum recession", "Sensitivity toothpaste can help mild cases within 2 to 4 weeks", "Lingering sensitivity that lasts more than a few seconds may signal a deeper problem"]),
    whenUrgent: JSON.stringify(["Sensitivity that lasts more than 30 seconds after the trigger is removed", "Pain that wakes you up at night", "Sensitivity that suddenly appears in a tooth that was fine before", "Visible dark spots or holes on the sensitive tooth"]),
    faqs: JSON.stringify([
      { question: "Why are my teeth suddenly sensitive?", answer: "Sudden sensitivity can happen from a new cavity, a cracked tooth, a recent dental procedure, or aggressive brushing that has worn away enamel. If it appeared out of nowhere, see a dentist." },
      { question: "Does sensitivity toothpaste really work?", answer: "Yes, for mild sensitivity. It contains ingredients that block the tiny tubes in dentin. Use it twice daily for 2 to 4 weeks before expecting results. It does not fix cavities or cracks." },
      { question: "Is tooth sensitivity a sign of a cavity?", answer: "It can be. Cavities expose the inner layers of your tooth, causing sensitivity. But not all sensitivity means a cavity. Gum recession and worn enamel are also common causes." },
      { question: "Can I prevent tooth sensitivity?", answer: "Use a soft bristle toothbrush, do not brush too hard, avoid acidic foods and drinks, and wear a night guard if you grind your teeth. These steps protect your enamel and gums." },
      { question: "When should I see a dentist for sensitivity?", answer: "See a dentist if sensitivity lasts more than a few seconds, affects one specific tooth, or does not improve with sensitivity toothpaste after a month." }
    ]),
    relatedPosts: JSON.stringify(["tooth-pain-toothache", "gum-recession", "cavity-symptoms-tooth-decay"]),
    reviewedByName: "DentaSmart Clinical Advisory",
    reviewedByCredentials: "Content reviewed for accuracy by dental professionals",
    bodyHtml: `<h2>What Tooth Sensitivity Means</h2>
<p>That sharp zing when you sip cold water or bite into ice cream is your tooth telling you that its protective layers have been compromised. Healthy teeth have enamel on top and gums covering the roots. When either wears away, the sensitive inner layer (dentin) gets exposed.</p>

<h2>Common Causes</h2>
<p><strong>Gum recession:</strong> When gums pull back, they expose the root surface which has no enamel protection. This is one of the most common causes of sensitivity.</p>
<p><strong>Worn enamel:</strong> Aggressive brushing, acidic foods, or teeth grinding can thin your enamel over time.</p>
<p><strong>Cavities:</strong> Decay creates holes that expose the inner tooth layers to temperature changes.</p>
<p><strong>Cracked teeth:</strong> Tiny cracks allow temperature to reach the nerve directly.</p>
<p><strong>Recent dental work:</strong> Teeth can be temporarily sensitive after fillings, crowns, or whitening. This usually settles within a few weeks.</p>

<h2>What to Do Now</h2>
<ol>
<li><strong>Switch to sensitivity toothpaste.</strong> Use it twice daily for at least 2 to 4 weeks. Brands with potassium nitrate or stannous fluoride work well.</li>
<li><strong>Use a soft bristle toothbrush.</strong> Brush gently in small circles. Hard brushing makes sensitivity worse.</li>
<li><strong>Get clarity with DentaSmart.</strong> Upload a photo to check for visible issues like cavities or gum recession. If the sensitivity is persistent, schedule a dental visit.</li>
</ol>`,
    status: "published",
  },

  // ===== POST 4: Bleeding Gums =====
  {
    title: "Bleeding Gums: Why They Bleed and How to Stop It",
    slug: "bleeding-gums",
    category: "Gums",
    readTime: "5 min read",
    primaryKeyword: "bleeding gums",
    secondaryKeywords: "gums bleed when brushing, why do my gums bleed, gum bleeding causes",
    metaTitle: "Bleeding Gums: Causes, Treatment, and When to Worry",
    metaDescription: "Bleeding gums when brushing or flossing? Learn why gums bleed, what it means for your health, and simple steps to stop the bleeding.",
    atAGlanceAnswer: "Bleeding gums are one of the earliest signs of gum disease (gingivitis). When plaque builds up along the gum line, it causes inflammation. Inflamed gums bleed easily when you brush or floss. The good news is that early gum disease is reversible with better oral hygiene. But if bleeding continues for more than 2 weeks despite good brushing and flossing, see a dentist. Untreated gum disease can progress to periodontitis, which causes bone loss and tooth loss.",
    keyTakeaways: JSON.stringify(["Bleeding gums usually mean inflammation from plaque buildup", "Early gum disease (gingivitis) is reversible with better brushing and flossing", "Bleeding that continues for more than 2 weeks needs a dental checkup"]),
    whenUrgent: JSON.stringify(["Gums bleed heavily or spontaneously without brushing", "Swelling, redness, or pus along the gum line", "Loose teeth or teeth that have shifted position", "Bad taste or persistent bad breath despite good hygiene", "Bleeding gums along with other health symptoms like fatigue"]),
    faqs: JSON.stringify([
      { question: "Should I stop brushing if my gums bleed?", answer: "No. Keep brushing gently with a soft bristle brush. Bleeding usually means you need to clean better, not less. The bleeding should improve within 1 to 2 weeks of consistent brushing and flossing." },
      { question: "Is it normal for gums to bleed when flossing?", answer: "If you have not flossed in a while, some bleeding is normal at first. But if you floss daily and gums still bleed after 2 weeks, see a dentist. Healthy gums should not bleed." },
      { question: "Can bleeding gums be a sign of something serious?", answer: "Usually it is gum disease, which is treatable. In rare cases, persistent bleeding can be related to blood disorders, medications, or other health conditions. See a dentist to be sure." },
      { question: "What toothpaste is best for bleeding gums?", answer: "Look for toothpaste with stannous fluoride, which helps reduce gum inflammation. Any fluoride toothpaste used with proper technique will help." },
      { question: "How long does it take to stop bleeding gums?", answer: "With consistent brushing twice daily and daily flossing, most people see improvement in 1 to 2 weeks. If bleeding continues beyond that, see a dentist." }
    ]),
    relatedPosts: JSON.stringify(["gum-recession", "gums-hurt-when-flossing", "swollen-gums-around-one-tooth"]),
    reviewedByName: "DentaSmart Clinical Advisory",
    reviewedByCredentials: "Content reviewed for accuracy by dental professionals",
    bodyHtml: `<h2>What Bleeding Gums Mean</h2>
<p>Seeing blood when you brush or floss can be alarming, but it is actually your gums sending you an important message. Healthy gums do not bleed. When they do, it almost always means there is inflammation caused by plaque bacteria.</p>

<h2>Common Causes</h2>
<p><strong>Gingivitis:</strong> The earliest stage of gum disease. Plaque along the gum line irritates the tissue, making it red, puffy, and prone to bleeding. This is reversible.</p>
<p><strong>Periodontitis:</strong> If gingivitis is not treated, it can progress to periodontitis. This affects the bone that supports your teeth and can lead to tooth loss.</p>
<p><strong>Brushing too hard:</strong> Using a hard bristle brush or pressing too firmly can damage gum tissue and cause bleeding.</p>
<p><strong>Medications:</strong> Blood thinners and some other medications can make gums bleed more easily.</p>
<p><strong>Hormonal changes:</strong> Pregnancy, puberty, and menopause can make gums more sensitive to plaque.</p>

<h2>What to Do Now</h2>
<ol>
<li><strong>Improve your brushing technique.</strong> Use a soft bristle brush. Angle it 45 degrees toward the gum line. Brush gently in small circles for 2 minutes, twice a day.</li>
<li><strong>Start flossing daily.</strong> Flossing removes plaque from between teeth where your brush cannot reach. Be gentle and curve the floss around each tooth.</li>
<li><strong>Check your gums with DentaSmart.</strong> Upload a photo and get insights about your gum health. If bleeding continues after 2 weeks of good hygiene, schedule a dental cleaning.</li>
</ol>`,
    status: "published",
  },

  // ===== POST 5: Gum Recession =====
  {
    title: "Gum Recession: Why Gums Pull Back and What to Do",
    slug: "gum-recession",
    category: "Gums",
    readTime: "5 min read",
    primaryKeyword: "gum recession",
    secondaryKeywords: "receding gums, gums pulling back, gum line receding, exposed tooth root",
    metaTitle: "Gum Recession: Causes, Signs, and Treatment Options",
    metaDescription: "Noticing your gums pulling back? Learn about gum recession causes, how to spot it early, and what treatment options are available.",
    atAGlanceAnswer: "Gum recession happens when your gum tissue pulls away from your teeth, exposing the root surface underneath. This makes teeth look longer and can cause sensitivity to cold and hot. Common causes include brushing too hard, gum disease, grinding your teeth, and genetics. Early recession can be slowed with better habits. Advanced recession may need treatment from a dentist, such as a gum graft. The key is catching it early before too much tissue is lost.",
    keyTakeaways: JSON.stringify(["Gum recession exposes tooth roots and causes sensitivity", "Brushing too hard is one of the most common causes", "Early detection and habit changes can slow or stop further recession"]),
    whenUrgent: JSON.stringify(["Teeth appear significantly longer than before", "Roots are visibly exposed and sensitive", "Teeth feel loose or wobbly", "Gums are pulling away from multiple teeth", "Pain or swelling at the gum line"]),
    faqs: JSON.stringify([
      { question: "Can receding gums grow back?", answer: "Unfortunately, gum tissue does not grow back on its own once it has receded. But you can stop it from getting worse with better brushing habits and dental treatment. In severe cases, a gum graft can restore coverage." },
      { question: "What causes gums to recede?", answer: "The most common causes are brushing too hard, gum disease, teeth grinding, genetics, and tobacco use. Sometimes it is a combination of factors." },
      { question: "How do I know if my gums are receding?", answer: "Look for teeth that appear longer than they used to. You might also notice a notch at the gum line, sensitivity to cold, or a yellowish color where the root is exposed." },
      { question: "Is gum recession serious?", answer: "It can be if left untreated. Exposed roots are more vulnerable to decay and sensitivity. Advanced recession can lead to tooth loss. Early treatment makes a big difference." },
      { question: "Can DentaSmart detect gum recession?", answer: "DentaSmart can analyze photos of your teeth and flag areas where gums appear to have receded. It helps you understand what is happening so you can discuss it with your dentist." }
    ]),
    relatedPosts: JSON.stringify(["bleeding-gums", "tooth-sensitivity-cold-hot", "gums-hurt-when-flossing"]),
    reviewedByName: "DentaSmart Clinical Advisory",
    reviewedByCredentials: "Content reviewed for accuracy by dental professionals",
    bodyHtml: `<h2>What Gum Recession Means</h2>
<p>Gum recession is when the gum tissue that surrounds your teeth wears away or pulls back, exposing more of the tooth or even the tooth root. It happens gradually, so many people do not notice it until it becomes significant.</p>

<h2>Common Causes</h2>
<p><strong>Aggressive brushing:</strong> Using a hard bristle brush or scrubbing back and forth wears away gum tissue over time. This is one of the most preventable causes.</p>
<p><strong>Gum disease (periodontal disease):</strong> Bacterial infection destroys gum tissue and the bone that supports teeth.</p>
<p><strong>Teeth grinding (bruxism):</strong> Excessive force on teeth can push gums away from the tooth surface.</p>
<p><strong>Genetics:</strong> Some people are more prone to thin gums that recede easily, regardless of their oral hygiene.</p>
<p><strong>Tobacco use:</strong> Smoking and chewing tobacco damage gum tissue and make recession worse.</p>

<h2>What to Do Now</h2>
<ol>
<li><strong>Switch to a soft bristle brush.</strong> Brush gently in small circles. Never scrub back and forth. This single change can prevent further recession.</li>
<li><strong>Address teeth grinding.</strong> If you grind at night, ask your dentist about a night guard. This protects both your teeth and gums.</li>
<li><strong>Monitor with DentaSmart.</strong> Upload photos regularly to track changes in your gum line. If you notice progression, see a dentist to discuss treatment options like gum grafting.</li>
</ol>`,
    status: "published",
  },

  // ===== POST 6: Cavity Symptoms =====
  {
    title: "Cavity Symptoms (Tooth Decay): How to Spot It Early",
    slug: "cavity-symptoms-tooth-decay",
    category: "Cavities",
    readTime: "5 min read",
    primaryKeyword: "cavity symptoms",
    secondaryKeywords: "tooth decay signs, how to tell if you have a cavity, cavity signs, early cavity",
    metaTitle: "Cavity Symptoms: How to Spot Tooth Decay Before It Gets Worse",
    metaDescription: "Think you might have a cavity? Learn the signs of tooth decay, what cavities look like, and why catching them early saves you money and pain.",
    atAGlanceAnswer: "Cavities start small and often have no symptoms at all. As they grow, you might notice sensitivity to sweets, hot, or cold foods. You might see a dark spot or feel a rough area on your tooth. Pain when biting is another sign. The tricky part is that by the time a cavity hurts, it is usually already significant. That is why regular checkups and tools like DentaSmart are so valuable. Catching a cavity early means a simple filling instead of a root canal.",
    keyTakeaways: JSON.stringify(["Early cavities often have no symptoms at all", "Sensitivity to sweets is one of the first signs of decay", "Catching cavities early saves money and prevents bigger problems"]),
    whenUrgent: JSON.stringify(["Constant pain in a tooth that does not go away", "Visible hole or dark spot on a tooth", "Swelling near a tooth", "Pain when biting on a specific tooth", "Bad taste or smell from a specific area"]),
    faqs: JSON.stringify([
      { question: "What does a cavity look like?", answer: "Early cavities may appear as white spots on the tooth surface. As they progress, they become brown or black spots. Advanced cavities create visible holes. But many cavities form between teeth where you cannot see them." },
      { question: "Can a cavity heal on its own?", answer: "Very early cavities (white spot stage) can sometimes remineralize with fluoride. But once a hole forms in the enamel, it cannot heal. It needs a filling from a dentist." },
      { question: "How much does it cost to fix a cavity?", answer: "A basic filling costs $100 to $300 without insurance. If the cavity is large, you might need a crown ($500 to $1,500) or root canal ($700 to $1,500). Early detection saves money." },
      { question: "How do dentists find cavities?", answer: "Dentists use visual exams, dental X-rays, and sometimes special tools that detect early decay. X-rays are especially important for finding cavities between teeth." },
      { question: "Can DentaSmart detect cavities?", answer: "DentaSmart can analyze photos and X-rays to flag areas that may have decay. It is not a replacement for a dental exam, but it gives you a helpful starting point." }
    ]),
    relatedPosts: JSON.stringify(["tooth-pain-toothache", "tooth-sensitivity-cold-hot", "black-line-on-tooth"]),
    reviewedByName: "DentaSmart Clinical Advisory",
    reviewedByCredentials: "Content reviewed for accuracy by dental professionals",
    bodyHtml: `<h2>What Cavity Symptoms Look Like</h2>
<p>Cavities are areas of permanent damage on your teeth caused by bacteria. They start on the surface and work their way inward. The earlier you catch them, the simpler and cheaper the fix.</p>

<h2>Common Signs of a Cavity</h2>
<p><strong>Sensitivity to sweets:</strong> One of the earliest signs. If a specific tooth stings when you eat candy or drink juice, decay might be the cause.</p>
<p><strong>Sensitivity to hot or cold:</strong> As decay gets deeper, temperature changes can trigger pain.</p>
<p><strong>Visible dark spots:</strong> Brown or black spots on the surface of a tooth may be decay. But not all dark spots are cavities, so a dental exam is important.</p>
<p><strong>Pain when biting:</strong> If decay has weakened the tooth structure, biting pressure can cause pain.</p>
<p><strong>Food getting stuck:</strong> Cavities create rough areas and holes where food gets trapped.</p>
<p><strong>No symptoms at all:</strong> Many cavities, especially between teeth, have no symptoms until they are large. This is why regular checkups matter.</p>

<h2>What to Do Now</h2>
<ol>
<li><strong>Look for visible signs.</strong> Check your teeth in good light for dark spots, rough areas, or holes. But remember, many cavities are hidden between teeth.</li>
<li><strong>Do not wait for pain.</strong> By the time a cavity hurts, it is usually deep. Schedule regular dental checkups every 6 months.</li>
<li><strong>Use DentaSmart for early detection.</strong> Upload a photo or X-ray and get AI powered analysis. Catching a cavity early means a $150 filling instead of a $1,000 root canal.</li>
</ol>`,
    status: "published",
  },

  // ===== POST 7: Cracked Tooth =====
  {
    title: "Cracked Tooth Symptoms: How to Tell If Your Tooth Is Cracked",
    slug: "cracked-tooth-symptoms",
    category: "Symptoms",
    readTime: "5 min read",
    primaryKeyword: "cracked tooth symptoms",
    secondaryKeywords: "cracked tooth, broken tooth, fractured tooth, tooth crack signs",
    metaTitle: "Cracked Tooth Symptoms: Signs, Causes, and What to Do Next",
    metaDescription: "Think you might have a cracked tooth? Learn the telltale signs, what causes teeth to crack, and why getting it checked early matters.",
    atAGlanceAnswer: "A cracked tooth can be tricky to diagnose because the crack is often invisible to the eye and may not even show up on X-rays. The most common sign is sharp pain when you bite down that goes away when you release. You might also notice sensitivity to cold or hot that lingers. Teeth can crack from grinding, biting on hard objects, large fillings, or sudden temperature changes. If you suspect a crack, see a dentist soon. Early treatment can save the tooth.",
    keyTakeaways: JSON.stringify(["Sharp pain when biting that disappears on release is the classic sign", "Cracks often do not show up on X-rays", "Early treatment can save the tooth from extraction"]),
    whenUrgent: JSON.stringify(["A piece of tooth has broken off", "Severe pain that does not respond to pain medication", "Swelling near the cracked tooth", "The crack extends below the gum line", "You can see a visible line running through the tooth"]),
    faqs: JSON.stringify([
      { question: "Can a cracked tooth heal on its own?", answer: "No. Unlike bones, teeth cannot heal themselves. A crack will not get better on its own and usually gets worse over time. See a dentist to discuss treatment options." },
      { question: "Why does my cracked tooth only hurt sometimes?", answer: "When you bite, the crack opens slightly and irritates the nerve. When you release, it closes. This is why the pain comes and goes. Cold and hot can also trigger pain by reaching the nerve through the crack." },
      { question: "How do dentists find cracks?", answer: "Dentists use visual exams, bite tests, special dyes, and sometimes a microscope. X-rays often miss cracks. Your description of symptoms is very helpful for diagnosis." },
      { question: "What happens if I ignore a cracked tooth?", answer: "The crack can grow deeper, eventually reaching the nerve or splitting the tooth. What starts as a fixable crack can become a root canal or extraction if left untreated." },
      { question: "How is a cracked tooth treated?", answer: "Treatment depends on the size and location. Small cracks may need a crown. Deeper cracks might need a root canal and crown. If the crack extends below the gum line, the tooth may need to be extracted." }
    ]),
    relatedPosts: JSON.stringify(["pain-when-biting-or-chewing", "tooth-pain-toothache", "crown-pain-sensitivity"]),
    reviewedByName: "DentaSmart Clinical Advisory",
    reviewedByCredentials: "Content reviewed for accuracy by dental professionals",
    bodyHtml: `<h2>What a Cracked Tooth Feels Like</h2>
<p>Cracked teeth are one of the trickiest dental problems to diagnose. The pain can be inconsistent, the crack may be invisible, and X-rays often miss it. But the symptoms follow a pattern that can help you identify it.</p>

<h2>Common Causes</h2>
<p><strong>Teeth grinding (bruxism):</strong> The constant pressure from grinding weakens teeth over time until they crack.</p>
<p><strong>Biting on hard objects:</strong> Ice, hard candy, popcorn kernels, and pens are common culprits.</p>
<p><strong>Large fillings:</strong> A tooth with a large filling has less natural structure and is more prone to cracking.</p>
<p><strong>Age:</strong> Teeth naturally become more brittle as we age, especially after 50.</p>
<p><strong>Temperature extremes:</strong> Eating something very hot followed by something very cold can stress the enamel.</p>

<h2>What to Do Now</h2>
<ol>
<li><strong>Avoid biting on that side.</strong> Do not test the tooth by biting hard on it. This can make the crack worse.</li>
<li><strong>Note your symptoms.</strong> When does it hurt? What triggers it? This information is valuable for your dentist.</li>
<li><strong>Get checked with DentaSmart.</strong> While cracks are hard to see, DentaSmart can help identify other issues and give you insights to share with your dentist. Schedule a visit soon.</li>
</ol>`,
    status: "published",
  },

  // ===== POST 8: Tooth Abscess =====
  {
    title: "Tooth Abscess (Infection): Signs, Risks, and What to Do",
    slug: "tooth-abscess-infection",
    category: "Symptoms",
    readTime: "6 min read",
    primaryKeyword: "tooth abscess",
    secondaryKeywords: "dental infection, tooth infection symptoms, abscess tooth, infected tooth",
    metaTitle: "Tooth Abscess: Signs of Dental Infection and When to Get Help",
    metaDescription: "A tooth abscess is a serious dental infection. Learn the warning signs, why it is urgent, and what to do if you think you have an infected tooth.",
    atAGlanceAnswer: "A tooth abscess is a pocket of pus caused by a bacterial infection. It usually forms at the tip of the tooth root or in the gums. The most common signs are severe throbbing pain, swelling in the face or jaw, fever, and a bad taste in your mouth. A tooth abscess will not go away on its own and can spread to other parts of your body if untreated. This is one dental problem that should not wait. See a dentist as soon as possible or go to an emergency room if you have facial swelling with fever.",
    keyTakeaways: JSON.stringify(["A tooth abscess is a bacterial infection that needs professional treatment", "It will not go away on its own and can spread to other parts of your body", "Facial swelling with fever is a dental emergency"]),
    whenUrgent: JSON.stringify(["Swelling in your face, jaw, or under your eye", "Fever above 101 F (38.3 C)", "Difficulty breathing or swallowing", "Severe pain that does not respond to pain medication", "Swelling that is spreading or getting worse quickly"]),
    faqs: JSON.stringify([
      { question: "Can a tooth abscess go away without treatment?", answer: "No. A tooth abscess needs professional treatment. The infection will not clear on its own. Antibiotics alone are not enough. The source of the infection (usually inside the tooth) needs to be treated." },
      { question: "How is a tooth abscess treated?", answer: "Treatment usually involves draining the abscess and either a root canal to save the tooth or extraction if the tooth cannot be saved. Antibiotics may be prescribed to help fight the infection." },
      { question: "Can a tooth infection spread to other parts of my body?", answer: "Yes. In rare but serious cases, a dental infection can spread to the jaw, head, neck, or even the bloodstream. This is why prompt treatment is important." },
      { question: "What does a tooth abscess look like?", answer: "You might see a swollen bump on the gum near the affected tooth (called a gum boil or fistula). The area may be red and tender. Sometimes you can see pus draining from it." },
      { question: "How much does it cost to treat a tooth abscess?", answer: "Emergency treatment to drain an abscess costs $100 to $300. A root canal to save the tooth costs $700 to $1,500. Extraction costs $150 to $400. Early treatment is always less expensive." }
    ]),
    relatedPosts: JSON.stringify(["tooth-pain-toothache", "gum-boil", "swollen-gums-around-one-tooth"]),
    reviewedByName: "DentaSmart Clinical Advisory",
    reviewedByCredentials: "Content reviewed for accuracy by dental professionals",
    bodyHtml: `<h2>What a Tooth Abscess Means</h2>
<p>A tooth abscess is your body fighting a bacterial infection inside or around a tooth. It is serious and it is urgent. Unlike many dental problems that can wait a few weeks, an abscess needs attention right away.</p>

<h2>Common Causes</h2>
<p><strong>Deep cavity:</strong> When decay reaches the inner pulp of the tooth, bacteria can infect the nerve and form an abscess at the root tip.</p>
<p><strong>Cracked or broken tooth:</strong> A crack gives bacteria a pathway to the inner tooth.</p>
<p><strong>Gum disease:</strong> Advanced gum disease can create pockets where bacteria collect and form abscesses.</p>
<p><strong>Failed dental work:</strong> Old fillings or crowns that leak can allow bacteria to re-enter the tooth.</p>

<h2>What to Do Now</h2>
<ol>
<li><strong>Do not ignore it.</strong> A tooth abscess is not something to wait on. If you have facial swelling with fever, go to an emergency room.</li>
<li><strong>Manage pain temporarily.</strong> Take ibuprofen for pain and inflammation. Rinse with warm salt water. Do not put aspirin directly on the gum.</li>
<li><strong>See a dentist immediately.</strong> Call your dentist for an emergency appointment. If you cannot get in, go to an urgent care or emergency room. Use DentaSmart to document your symptoms before your visit.</li>
</ol>`,
    status: "published",
  },

  // ===== POST 9: Wisdom Tooth Pain =====
  {
    title: "Wisdom Tooth Pain: What It Means and When to Act",
    slug: "wisdom-tooth-pain",
    category: "Symptoms",
    readTime: "5 min read",
    primaryKeyword: "wisdom tooth pain",
    secondaryKeywords: "wisdom teeth, wisdom tooth symptoms, impacted wisdom tooth, third molar pain",
    metaTitle: "Wisdom Tooth Pain: Causes, Symptoms, and When to Remove Them",
    metaDescription: "Wisdom tooth pain can mean they are coming in, impacted, or infected. Learn what to expect and when removal is necessary.",
    atAGlanceAnswer: "Wisdom teeth are the last molars to come in, usually between ages 17 and 25. Pain from wisdom teeth can mean they are erupting normally, growing in at an angle (impacted), or getting infected. Common symptoms include pain at the back of your mouth, swollen gums, jaw stiffness, and difficulty opening your mouth. Not all wisdom teeth need to be removed. But if they are causing pain, crowding other teeth, or getting infected, your dentist will likely recommend extraction.",
    keyTakeaways: JSON.stringify(["Wisdom tooth pain is common between ages 17 and 25", "Impacted wisdom teeth can cause infection and damage to nearby teeth", "Not all wisdom teeth need removal, but painful ones usually do"]),
    whenUrgent: JSON.stringify(["Severe pain and swelling at the back of your mouth", "Difficulty opening your mouth or swallowing", "Fever along with wisdom tooth pain", "Pus or bad taste coming from the area", "Swelling spreading to your cheek or neck"]),
    faqs: JSON.stringify([
      { question: "Do all wisdom teeth need to be removed?", answer: "No. If wisdom teeth come in straight, have enough room, and can be cleaned properly, they can stay. But most people do not have enough room, which causes problems." },
      { question: "What does an impacted wisdom tooth feel like?", answer: "You might feel pressure and pain at the back of your jaw, swollen gums, difficulty opening your mouth, and sometimes earache or headache on that side." },
      { question: "How much does wisdom tooth removal cost?", answer: "Simple extraction costs $75 to $200 per tooth. Surgical removal of impacted teeth costs $225 to $600 per tooth. Sedation adds $200 to $500." },
      { question: "How long is recovery after wisdom tooth removal?", answer: "Most people recover in 3 to 5 days. Swelling peaks around day 2 to 3 and then improves. Follow your dentist instructions for the smoothest recovery." },
      { question: "Can I wait to remove my wisdom teeth?", answer: "If they are not causing problems, your dentist may recommend monitoring them. But if there are signs of infection, decay, or damage to nearby teeth, sooner is better than later." }
    ]),
    relatedPosts: JSON.stringify(["tooth-pain-toothache", "tooth-abscess-infection", "jaw-pain-tmj"]),
    reviewedByName: "DentaSmart Clinical Advisory",
    reviewedByCredentials: "Content reviewed for accuracy by dental professionals",
    bodyHtml: `<h2>What Wisdom Tooth Pain Means</h2>
<p>Wisdom teeth are the third set of molars that usually appear in your late teens or early twenties. For some people, they come in without any issues. For many others, there simply is not enough room in the jaw, which leads to pain and complications.</p>

<h2>Common Causes of Wisdom Tooth Pain</h2>
<p><strong>Normal eruption:</strong> Even when wisdom teeth come in straight, the process of breaking through the gum can cause temporary pain and swelling.</p>
<p><strong>Impaction:</strong> When there is not enough room, wisdom teeth can grow sideways, only partially emerge, or stay trapped in the jawbone. This puts pressure on nearby teeth and nerves.</p>
<p><strong>Pericoronitis:</strong> When a wisdom tooth only partially breaks through the gum, the flap of gum tissue over it traps food and bacteria, causing infection and pain.</p>
<p><strong>Decay:</strong> Wisdom teeth are hard to clean because of their position. This makes them more prone to cavities.</p>

<h2>What to Do Now</h2>
<ol>
<li><strong>Rinse with warm salt water.</strong> This helps reduce inflammation and keeps the area clean. Do this several times a day.</li>
<li><strong>Take pain relief.</strong> Ibuprofen works well for wisdom tooth pain because it reduces both pain and swelling.</li>
<li><strong>See a dentist for evaluation.</strong> Your dentist will take an X-ray to see the position of your wisdom teeth and recommend whether removal is needed. Use DentaSmart to get initial insights before your visit.</li>
</ol>`,
    status: "published",
  },

  // ===== POST 10: Bad Breath =====
  {
    title: "Bad Breath (Halitosis): Causes and How to Fix It",
    slug: "bad-breath-halitosis",
    category: "Symptoms",
    readTime: "5 min read",
    primaryKeyword: "bad breath",
    secondaryKeywords: "halitosis, bad breath causes, chronic bad breath, mouth odor",
    metaTitle: "Bad Breath (Halitosis): Common Causes and Effective Solutions",
    metaDescription: "Struggling with bad breath? Learn what causes halitosis, why mouthwash alone does not fix it, and simple steps to freshen your breath for good.",
    atAGlanceAnswer: "Bad breath (halitosis) affects about 1 in 4 people. Most of the time, it starts in the mouth. Bacteria on your tongue, between your teeth, and along your gum line produce sulfur compounds that smell bad. Common causes include poor oral hygiene, gum disease, dry mouth, and certain foods. Mouthwash only masks the problem temporarily. The real fix is addressing the source: better brushing, flossing, tongue cleaning, and treating any underlying dental issues.",
    keyTakeaways: JSON.stringify(["Most bad breath comes from bacteria in the mouth, not the stomach", "Tongue cleaning is one of the most effective fixes", "Persistent bad breath despite good hygiene may signal gum disease or other issues"]),
    whenUrgent: JSON.stringify(["Bad breath that does not improve with good oral hygiene", "Bad taste that persists throughout the day", "Bleeding or swollen gums along with bad breath", "Dry mouth that does not improve with hydration", "Bad breath along with other symptoms like weight loss or fatigue"]),
    faqs: JSON.stringify([
      { question: "Why does my breath smell bad even after brushing?", answer: "You might be missing the tongue, which harbors most odor causing bacteria. Also check if you are flossing. Food trapped between teeth rots and smells. Gum disease is another hidden cause." },
      { question: "Does mouthwash fix bad breath?", answer: "Mouthwash temporarily masks odor but does not fix the cause. Alcohol based mouthwashes can actually make it worse by drying out your mouth. If you use mouthwash, choose an alcohol free one." },
      { question: "Can bad breath come from the stomach?", answer: "Rarely. About 90% of bad breath originates in the mouth. Stomach related bad breath is uncommon and usually comes with other digestive symptoms." },
      { question: "How do I know if I have bad breath?", answer: "Ask a trusted friend or family member. You can also lick the back of your hand, let it dry, and smell it. Or scrape the back of your tongue with a spoon and smell it." },
      { question: "Can DentaSmart help with bad breath?", answer: "DentaSmart can analyze photos of your teeth and gums to identify potential causes like gum disease, visible decay, or other issues that might be contributing to bad breath." }
    ]),
    relatedPosts: JSON.stringify(["bleeding-gums", "gum-recession", "cavity-symptoms-tooth-decay"]),
    reviewedByName: "DentaSmart Clinical Advisory",
    reviewedByCredentials: "Content reviewed for accuracy by dental professionals",
    bodyHtml: `<h2>What Causes Bad Breath</h2>
<p>Bad breath is embarrassing, but it is also very common and usually fixable. Understanding the cause is the first step to solving it for good.</p>

<h2>Common Causes</h2>
<p><strong>Bacteria on the tongue:</strong> The back of your tongue has a rough surface that traps bacteria. This is the number one cause of bad breath and the most overlooked.</p>
<p><strong>Food between teeth:</strong> Trapped food particles decompose and produce odor. Flossing removes what your brush misses.</p>
<p><strong>Gum disease:</strong> Infected gum pockets harbor bacteria that produce strong odors. If your breath smells bad despite good hygiene, gum disease might be the cause.</p>
<p><strong>Dry mouth:</strong> Saliva naturally cleans your mouth. When your mouth is dry (from medications, mouth breathing, or dehydration), bacteria thrive.</p>
<p><strong>Certain foods:</strong> Garlic, onions, and coffee cause temporary bad breath. This is normal and goes away on its own.</p>

<h2>What to Do Now</h2>
<ol>
<li><strong>Clean your tongue daily.</strong> Use a tongue scraper or the back of your toothbrush. Focus on the back third of your tongue where most bacteria live.</li>
<li><strong>Floss every day.</strong> Removing trapped food between teeth eliminates a major source of odor.</li>
<li><strong>Check for underlying issues with DentaSmart.</strong> Upload a photo to check for signs of gum disease or decay that might be causing persistent bad breath. If it continues despite good hygiene, see a dentist.</li>
</ol>`,
    status: "published",
  },
];

// Insert all posts
let inserted = 0;
for (const post of posts) {
  try {
    // Check if slug already exists
    const [existing] = await conn.query('SELECT id FROM blog_posts WHERE slug = ?', [post.slug]);
    if (existing.length > 0) {
      console.log(`Skipping "${post.slug}" - already exists`);
      continue;
    }

    await conn.query(
      `INSERT INTO blog_posts (title, slug, category, readTime, primaryKeyword, secondaryKeywords, 
       metaTitle, metaDescription, atAGlanceAnswer, keyTakeaways, whenUrgent, faqs, relatedPosts,
       reviewedByName, reviewedByCredentials, bodyHtml, status, publishedAt) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [post.title, post.slug, post.category, post.readTime, post.primaryKeyword, post.secondaryKeywords,
       post.metaTitle, post.metaDescription, post.atAGlanceAnswer, post.keyTakeaways, post.whenUrgent,
       post.faqs, post.relatedPosts, post.reviewedByName, post.reviewedByCredentials, post.bodyHtml, post.status]
    );
    inserted++;
    console.log(`Inserted: ${post.slug}`);
  } catch (err) {
    console.error(`Error inserting ${post.slug}:`, err.message);
  }
}

console.log(`\nDone. Inserted ${inserted} of ${posts.length} posts.`);
await conn.end();
