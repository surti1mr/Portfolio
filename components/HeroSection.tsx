"use client";

import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import HeroChatPanel from "@/components/HeroChatPanel";

const roles = [
  "AI/ML Engineer",
  "RAG Systems Builder",
  "Full-Stack Developer",
  "2nd Place Comedian 🎤",
];

export default function HeroSection() {
  const reducedMotion = useReducedMotion();
  const { displayText } = useTypewriter({ strings: roles });

  const fadeUp = {
    initial: reducedMotion ? {} : { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Dot-grid background */}
      <div className="dot-grid absolute inset-0 opacity-60 pointer-events-none" />

      {/* Radial vignette over dots */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, #0A0E1A 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24 pb-16 flex flex-col lg:flex-row items-center gap-12">
        {/* Left content */}
        <div className="flex-[3] space-y-6">
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-mono text-[#8899AA] text-base tracking-widest uppercase"
          >
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display font-bold leading-none"
            style={{
              fontSize: "clamp(3rem, 8vw, 5rem)",
              background: "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            MAYANK SURTI
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex items-center gap-2 h-9"
          >
            <span className="font-mono text-lg text-[#00D4FF]">
              {displayText}
            </span>
            <span className="animate-pulse font-mono text-[#00D4FF] text-xl leading-none">
              |
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="text-[#8899AA] text-base leading-relaxed max-w-lg"
          >
            I build production AI systems that actually work — from agentic RAG
            pipelines to real-time dashboards. And apparently I&apos;m also funny.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <button
              onClick={() => {
                document
                  .querySelector("#projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-7 py-3 bg-accent text-bg font-semibold rounded-md hover:bg-[#00bde0] transition-colors duration-200 text-sm"
            >
              View My Work
            </button>
            <a
              href="/resume.pdf"
              download
              className="px-7 py-3 border border-[#7C3AED] text-[#7C3AED] font-semibold rounded-md hover:bg-[#7C3AED] hover:text-white transition-all duration-200 text-sm"
            >
              Download Resume
            </a>
          </motion.div>
        </div>

        {/* Right — AI Chat Panel */}
        <div className="flex-[2] w-full">
          <HeroChatPanel />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={reducedMotion ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-[#1E2D42] rounded-full flex justify-center pt-2">
          <div className="w-1 h-2.5 bg-accent rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
