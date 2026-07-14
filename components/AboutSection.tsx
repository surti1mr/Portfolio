"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const stats = [
  { value: "5+", label: "Years Experience" },
  { value: "3.95", label: "GPA (M.S.)" },
  { value: "10", label: "Projects Shipped" },
  { value: "2nd", label: "Stand-Up Competition" },
];

export default function AboutSection() {
  const reducedMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reducedMotion ? 0 : 0.1 },
    },
  };

  const item = {
    hidden: reducedMotion ? {} : { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label mb-3">{'// about_me'}</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-[#E8F4FD] mb-12">
            Who I Am
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — narrative */}
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <p className="text-[#8899AA] text-base leading-relaxed">
              I&apos;m an AI Application Engineer who specializes in building
              production-grade LLM-powered systems that actually ship. My focus is on
              agentic AI, RAG pipelines, and full-stack AI products, turning LLM
              capabilities into reliable software organizations depend on. I graduated
              from{" "}
              <span className="text-[#E8F4FD]">
                Central Michigan University
              </span>{" "}
              with an M.S. in Information Systems (SAP) and a 3.95 GPA.
            </p>
            <p className="text-[#8899AA] text-base leading-relaxed">
              From dark web monitoring systems at a global cybersecurity firm to
              agentic RAG pipelines and real-time manufacturing dashboards at
              Detroit Manufacturing Systems / Voltava, I care deeply about code that
              solves real problems, and about communicating those solutions to
              the people who need them.
            </p>
            <p className="text-[#8899AA] text-base leading-relaxed">
              Outside of code, I competed in a stand-up comedy competition and
              placed 2nd based on live audience votes. It turns out clarity,
              timing, and knowing your audience applies everywhere.
            </p>
          </motion.div>

          {/* Right — stat cards */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={item}
                className="glass-card rounded-xl p-6 flex flex-col gap-2 hover:border-[rgba(0,212,255,0.2)] transition-colors duration-300"
              >
                <span
                  className="font-display font-bold text-4xl"
                  style={{ color: "#00D4FF" }}
                >
                  {stat.value}
                </span>
                <span className="text-[#8899AA] text-sm">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
