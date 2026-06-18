"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SecondaryProject {
  title: string;
  url: string;
  urlLabel: string;
  description: string;
  tech: string[];
  isExternal?: boolean;
}

const secondaryProjects: SecondaryProject[] = [
  {
    title: "CyberGuard360",
    url: "https://cyberguard360.com",
    urlLabel: "cyberguard360.com",
    isExternal: true,
    description:
      "Cybersecurity platform featuring dark web monitoring, simulated phishing campaigns, breach prevention, and automated reporting for MSP clients.",
    tech: ["Node.js", "React.js", "Security APIs"],
  },
  {
    title: "PMS – Event Management",
    url: "https://github.com/surti1mr/PMS",
    urlLabel: "github.com/surti1mr/PMS",
    description:
      "Web system automating participant registration and tracking for open mic and college events. (Partly built to manage his own stand-up comedy shows.)",
    tech: ["React.js", "Node.js", "MySQL"],
  },
  {
    title: "VMIMS – Vending Machine Inventory",
    url: "https://github.com/surti1mr/Vending-Machine-Inventory-Management-System",
    urlLabel: "github.com/surti1mr/VMIMS",
    description:
      "Real-time inventory tracking system with backend logic and database integration for stock updates and transaction management.",
    tech: ["Python", "MySQL"],
  },
];

const featuredHighlights = [
  { icon: "🔒", text: "Per-user data isolation" },
  { icon: "🤖", text: "LLM auto-categorization" },
  { icon: "📊", text: "Real-time Recharts dashboard" },
  { icon: "📄", text: "Full docs + DB schema" },
];

const featuredTech = [
  "FastAPI",
  "LLaMA 3.3 70B",
  "Groq",
  "FAISS",
  "LangGraph",
  "MySQL",
  "SQLAlchemy",
  "Next.js 14",
  "Vercel",
  "Railway",
];

function ExternalIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function ProjectsSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="projects" className="py-24 px-6 bg-[#0F1629]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label mb-3">{'// projects'}</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-[#E8F4FD] mb-12">
            Things I&apos;ve Built
          </h2>
        </motion.div>

        {/* Featured project */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="glass-card rounded-2xl p-8 md:p-10 grid md:grid-cols-2 gap-10 border border-[rgba(0,212,255,0.1)] hover:border-[rgba(0,212,255,0.2)] transition-colors duration-300">
            {/* Left */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-2.5 py-0.5 bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.3)] rounded text-xs font-mono text-[#00D4FF]">
                  Featured Project
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl text-[#E8F4FD]">
                FinanceAI — AI-Powered Finance Manager
              </h3>

              <p className="text-[#8899AA] text-sm leading-relaxed">
                Production RAG system that lets you query your personal finances
                in natural language. Built with FastAPI + LLaMA 3.3 70B (Groq),
                FAISS vector search, per-user data isolation, and a Next.js 14
                dashboard with real-time charts.
              </p>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-2">
                {featuredTech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full font-mono text-xs text-[#E8F4FD] border border-[#1E2D42] bg-[#0A0E1A]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2">
                {featuredHighlights.map((h) => (
                  <span
                    key={h.text}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.2)] rounded-full text-xs text-[#E8F4FD]"
                  >
                    <span>{h.icon}</span>
                    {h.text}
                  </span>
                ))}
              </div>

              <a
                href="https://github.com/surti1mr/FinanceAI"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00D4FF] text-bg font-semibold text-sm rounded-md hover:bg-[#00bde0] transition-colors duration-200"
              >
                <GitHubIcon />
                View on GitHub
              </a>
            </div>

            {/* Right — terminal mockup */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-sm rounded-xl overflow-hidden border border-[#1E2D42] bg-[#070B14]">
                {/* Window chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-[#0D1220] border-b border-[#1E2D42]">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28CA42]" />
                  <span className="ml-3 font-mono text-xs text-[#8899AA]">
                    finance_ai_pipeline.py
                  </span>
                </div>
                {/* Code lines */}
                <div className="p-5 font-mono text-xs space-y-2">
                  <div>
                    <span className="text-[#7C3AED]">from</span>
                    <span className="text-[#E8F4FD]"> langchain </span>
                    <span className="text-[#7C3AED]">import</span>
                    <span className="text-[#00D4FF]"> RAGPipeline</span>
                  </div>
                  <div className="text-[#8899AA]">
                    # Load per-user FAISS index
                  </div>
                  <div>
                    <span className="text-[#00FFB3]">vector_store</span>
                    <span className="text-[#E8F4FD]"> = FAISS.</span>
                    <span className="text-[#00D4FF]">load_local</span>
                    <span className="text-[#E8F4FD]">(</span>
                    <span className="text-[#FFB347]">&quot;user_index&quot;</span>
                    <span className="text-[#E8F4FD]">)</span>
                  </div>
                  <div>
                    <span className="text-[#00FFB3]">llm</span>
                    <span className="text-[#E8F4FD]"> = Groq(</span>
                    <span className="text-[#FFB347]">
                      &quot;llama-3.3-70b-versatile&quot;
                    </span>
                    <span className="text-[#E8F4FD]">)</span>
                  </div>
                  <div className="text-[#8899AA]">
                    # Natural language → SQL
                  </div>
                  <div>
                    <span className="text-[#00FFB3]">result</span>
                    <span className="text-[#E8F4FD]"> = pipeline.</span>
                    <span className="text-[#00D4FF]">query</span>
                    <span className="text-[#E8F4FD]">(</span>
                    <span className="text-[#FFB347]">
                      &quot;Show me last month&apos;s spending&quot;
                    </span>
                    <span className="text-[#E8F4FD]">)</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#1E2D42] text-[#00FFB3]">
                    ✓ Returned 14 transactions in 380ms
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Secondary projects grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {secondaryProjects.map((proj, idx) => (
            <motion.div
              key={proj.title}
              initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={reducedMotion ? {} : { y: -4 }}
              className="glass-card rounded-xl p-6 flex flex-col gap-4 border border-[#1E2D42] hover:border-[rgba(0,212,255,0.2)] transition-all duration-300 group cursor-default"
              style={{
                boxShadow: "none",
                transition: "box-shadow 0.3s, border-color 0.3s, transform 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 8px 32px rgba(0,212,255,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display font-semibold text-base text-[#E8F4FD]">
                  {proj.title}
                </h3>
                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8899AA] hover:text-[#00D4FF] transition-colors flex-shrink-0"
                >
                  {proj.isExternal ? <ExternalIcon /> : <GitHubIcon />}
                </a>
              </div>

              <p className="text-[#8899AA] text-sm leading-relaxed flex-1">
                {proj.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {proj.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs text-[#8899AA] border-b border-[#1E2D42] pb-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
