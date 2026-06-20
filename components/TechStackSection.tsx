"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface BadgeCategory {
  label: string;
  skills: string[];
  type: "ai" | "default";
}

const categories: BadgeCategory[] = [
  {
    label: "AI & LLM Stack",
    type: "ai",
    skills: [
      "LangChain",
      "LangGraph",
      "Agentic AI",
      "RAG",
      "FAISS",
      "Vector Search",
      "Tool Calling",
      "LLaMA 3.3 70B",
      "Groq",
      "OpenAI API",
      "HuggingFace",
      "Sentence Transformers",
      "Prompt Engineering",
      "Semantic Search",
    ],
  },
  {
    label: "Languages & Frameworks",
    type: "default",
    skills: [
      "Python",
      "FastAPI",
      "TypeScript",
      "JavaScript",
      "React.js",
      "Next.js",
      "Node.js",
      "React Native",
      "VB.NET",
    ],
  },
  {
    label: "Databases & Infra",
    type: "default",
    skills: [
      "MySQL",
      "PostgreSQL",
      "SQL Server",
      "SQLAlchemy",
      "Docker",
      "CI/CD",
      "GitHub",
      "SSRS",
    ],
  },
  {
    label: "Cloud & Platforms",
    type: "default",
    skills: ["AWS", "Azure", "GCP", "Vercel", "Railway", "Firebase"],
  },
];

function Badge({
  skill,
  type,
  delay,
  reducedMotion,
}: {
  skill: string;
  type: "ai" | "default";
  delay: number;
  reducedMotion: boolean;
}) {
  return (
    <motion.span
      initial={reducedMotion ? {} : { opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className={`inline-block px-3 py-1.5 rounded-full font-mono text-xs text-[#E8F4FD] border border-[#1E2D42] bg-[#0F1629] cursor-default transition-all duration-200 select-none ${
        type === "ai" ? "badge-ai" : "badge-default"
      }`}
    >
      {skill}
    </motion.span>
  );
}

export default function TechStackSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="skills" className="py-24 px-6 bg-[#0F1629]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label mb-3">{'// tech_stack'}</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-[#E8F4FD] mb-12">
            What I Build With
          </h2>
        </motion.div>

        <div className="space-y-10">
          {categories.map((cat, catIdx) => (
            <div key={cat.label}>
              <motion.p
                initial={reducedMotion ? {} : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: catIdx * 0.05 }}
                className="font-mono text-xs text-[#8899AA] mb-4 uppercase tracking-widest"
              >
                {cat.label}
              </motion.p>
              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill, skillIdx) => (
                  <Badge
                    key={skill}
                    skill={skill}
                    type={cat.type}
                    delay={reducedMotion ? 0 : catIdx * 0.04 + skillIdx * 0.03}
                    reducedMotion={reducedMotion}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
