"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const skills = ["Public Speaking", "Audience Awareness", "Creative Thinking"];

const comedyResults = [
  {
    country: "India",
    placement: "1st Place",
    event: "Comedy Ladder",
    city: "Mumbai, India",
    year: "2017",
  },
  {
    country: "USA",
    placement: "2nd Place",
    event: "Open Mic Comedy Competition",
    city: "Downtown Mount Pleasant, MI",
    year: "",
  },
];

export default function ComedySection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="comedy"
      className="py-24 px-6 relative overflow-hidden"
      style={{ backgroundColor: "#131929" }}
    >
      {/* Spotlight radial gradient — stage light effect */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,212,255,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label mb-3">{'// not_all_code'}</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-[#E8F4FD] mb-12">
            I Also Do Stand-Up
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — one card per country */}
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {comedyResults.map((result) => (
              <div
                key={result.country}
                className="glass-card rounded-2xl p-6 text-center border border-[rgba(0,255,179,0.1)] hover:border-[rgba(0,255,179,0.2)] transition-colors duration-300"
              >
                <div
                  className="text-5xl mb-4 select-none"
                  role="img"
                  aria-label="microphone"
                >
                  🎤
                </div>

                <div className="space-y-1.5">
                  <p
                    className="font-display font-bold text-3xl"
                    style={{ color: "#00FFB3" }}
                  >
                    {result.placement}
                  </p>
                  <p className="font-display font-semibold text-base text-[#E8F4FD]">
                    {result.event}
                  </p>
                  <p className="font-mono text-xs text-[#8899AA] tracking-wide">
                    {result.city}
                  </p>
                  {result.year && (
                    <p className="font-mono text-xs text-[#8899AA] tracking-wide">
                      {result.year}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right — blockquote + skills */}
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-8"
          >
            <blockquote className="border-l-2 border-[#00D4FF] pl-6 italic space-y-3">
              <p className="text-[#E8F4FD] text-lg leading-relaxed">
                Great engineers communicate.
                <br />
                Great AI engineers communicate
                <br />
                clearly to non-technical stakeholders.
              </p>
              <p className="text-[#E8F4FD] text-lg leading-relaxed">
                Stand-up comedy is just
                <br />
                public speaking with higher stakes.
              </p>
            </blockquote>

            <div className="flex flex-wrap gap-3">
              {skills.map((skill, idx) => (
                <motion.span
                  key={skill}
                  initial={reducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1, duration: 0.3 }}
                  className="px-4 py-2 rounded-full border border-[rgba(0,255,179,0.3)] text-[#00FFB3] text-sm font-medium bg-[rgba(0,255,179,0.05)]"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
