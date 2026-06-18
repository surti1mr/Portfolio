"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  isEducation?: boolean;
}

const experiences: Experience[] = [
  {
    company: "Detroit Manufacturing Systems / Voltava",
    role: "Application Engineering Intern",
    period: "May 2025 – Aug 2025  |  Feb 2026 – Present",
    location: "Detroit, MI",
    bullets: [
      "Fixed bugs across 6 in-house VB.NET applications integrated with SQL Server, improving stability and performance.",
      "Built and optimized 12 RDL reports using SSRS, OAS, and MQTT, cutting manual reporting effort by 40%.",
      "Developed Incorta API integrations for in-house apps to streamline reporting workflows.",
      "Integrated SAP API into in-house applications, connecting enterprise ERP data directly with internal tooling.",
      "Leveraged AI-assisted development (Cursor) to reduce development time by 70% across the internship.",
    ],
  },
  {
    company: "Web Access Global",
    role: "Senior Software Engineer",
    period: "Sep 2019 – Jul 2024",
    location: "Mumbai, India",
    bullets: [
      "Engineered dark web monitoring and phishing detection systems, improving organizational security posture by 60%.",
      "Optimized a bulk email execution pipeline, reducing processing time from 20 hours to 4 hours.",
      "Built scalable RESTful APIs with Node.js/TypeScript and interactive web apps with React.js.",
      "Deployed cross-platform mobile application on Android and iOS using React Native.",
      "Mentored junior developers by assigning tasks, conducting code reviews, and managing GitHub merge requests before production deployments.",
      "Collaborated with stakeholders to scope, design, and ship new features aimed at growing and retaining the user base.",
    ],
  },
  {
    company: "Central Michigan University",
    role: "M.S. in Information Systems (SAP)",
    period: "Aug 2024 – Dec 2025",
    location: "Mount Pleasant, MI",
    isEducation: true,
    bullets: [
      "Graduated with a 3.95 GPA, specializing in enterprise systems, AI/ML, and database management.",
      "Participated in ERP Sim Competition, applying SAP skills to simulated business environments.",
      "Completed coursework in machine learning, data analytics, cloud computing, and full-stack development.",
    ],
  },
];

export default function ExperienceSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label mb-3">{'// experience'}</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-[#E8F4FD] mb-16">
            Where I&apos;ve Been
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00D4FF] via-[#1E2D42] to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.company}
                initial={reducedMotion ? {} : { opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 md:gap-12`}
              >
                {/* Dot on line */}
                <div className="absolute left-6 md:left-1/2 top-6 w-3 h-3 -translate-x-1/2 rounded-full bg-[#00D4FF] border-2 border-[#0A0E1A] z-10 shadow-[0_0_8px_rgba(0,212,255,0.6)]" />

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />

                {/* Card */}
                <div className="flex-1 ml-12 md:ml-0">
                  <div className="glass-card rounded-xl p-6 hover:border-[rgba(0,212,255,0.15)] transition-colors duration-300">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-display font-semibold text-lg text-[#E8F4FD]">
                          {exp.company}
                        </h3>
                        <p className="text-[#00D4FF] text-sm font-medium mt-0.5">
                          {exp.role}
                        </p>
                      </div>
                      {exp.isEducation && (
                        <span className="px-2 py-0.5 bg-[rgba(124,58,237,0.15)] border border-[rgba(124,58,237,0.3)] rounded text-xs text-[#7C3AED] font-mono">
                          Education
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
                      <span className="font-mono text-xs text-[#8899AA]">
                        {exp.period}
                      </span>
                      <span className="font-mono text-xs text-[#8899AA]">
                        📍 {exp.location}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2 text-[#8899AA] text-sm leading-relaxed"
                        >
                          <span className="text-[#00D4FF] mt-1.5 text-xs flex-shrink-0">
                            ▹
                          </span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
