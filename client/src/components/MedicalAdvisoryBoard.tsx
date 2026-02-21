import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const advisors = [
  {
    name: "Areeba Aslam",
    title: "General Dentist",
    credentials: "BDS",
    bio: "Areeba brings clinical expertise in general dentistry and a passion for making oral health information accessible to everyone. She reviews all DentaSmart content to ensure accuracy and safety.",
    role: "Lead Content Reviewer",
  },
  // More advisors can be added here as the team grows
];

export function MedicalAdvisoryBoard() {
  return (
    <section className="py-12 bg-stone-50">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-normal text-black">Medical Advisory Board</h2>
        </div>
        <p className="text-stone-600 font-light leading-relaxed mb-8 max-w-2xl">
          Every piece of health content on DentaSmart is reviewed by qualified dental professionals. Our advisory board ensures that the information you receive is accurate, safe, and up to date.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {advisors.map((advisor, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 border border-stone-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-medium text-lg">
                    {advisor.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-black text-lg">{advisor.name}, {advisor.credentials}</h3>
                  <p className="text-primary text-sm font-medium">{advisor.title}</p>
                  <p className="text-stone-500 text-xs mt-1">{advisor.role}</p>
                </div>
              </div>
              <p className="text-stone-600 font-light mt-4 leading-relaxed text-sm">
                {advisor.bio}
              </p>
            </motion.div>
          ))}
          {/* Placeholder for future advisors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-stone-100/50 rounded-2xl p-6 border border-dashed border-stone-300 flex items-center justify-center"
          >
            <div className="text-center">
              <p className="text-stone-400 font-light text-sm">More advisors joining soon</p>
              <p className="text-stone-300 text-xs mt-1">Our advisory board is growing</p>
            </div>
          </motion.div>
        </div>
        <p className="text-stone-400 text-xs mt-6 font-light">
          DentaSmart does not replace professional dental care. Our AI tools and content are designed to help you understand your oral health, not to diagnose or treat conditions. Always consult a qualified dentist for clinical decisions.
        </p>
      </div>
    </section>
  );
}
