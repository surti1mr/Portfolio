"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Certification {
  title: string;
  issuer: string;
  date?: string;
  url: string;
}

const certifications: Certification[] = [
  {
    title: "Python Certification",
    issuer: "freeCodeCamp",
    url: "https://www.freecodecamp.org/certification/fcc-3a2595e8-bc87-4014-924f-0819e6800a3e/python-v9",
  },
  {
    title: "Claude 101",
    issuer: "Anthropic Education",
    date: "May 2026",
    url: "https://verify.skilljar.com/c/pacsjbjywgnu",
  },
  {
    title: "Introduction to Subagents",
    issuer: "Anthropic Education",
    date: "Jul 2026",
    url: "https://verify.skilljar.com/c/6wvzdxnztbhw",
  },
  {
    title: "Claude Code 101",
    issuer: "Anthropic Education",
    date: "Jul 2026",
    url: "https://verify.skilljar.com/c/nzjanrrx8d6s",
  },
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

export default function CertificationsSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="certifications" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label mb-3">{'// certifications'}</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-[#E8F4FD] mb-16">
            Certifications &amp; Recognition
          </h2>
        </motion.div>

        {/* Certificate cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {certifications.map((cert, idx) => (
            <motion.a
              key={cert.title}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-xl p-6 hover:border-[rgba(0,212,255,0.15)] transition-colors duration-300 flex flex-col group"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="font-display font-semibold text-lg text-[#E8F4FD]">
                  {cert.title}
                </h3>
                <span className="text-[#8899AA] group-hover:text-[#00D4FF] transition-colors duration-200 mt-1 flex-shrink-0">
                  <ExternalIcon />
                </span>
              </div>
              <p className="text-[#00D4FF] text-sm font-medium">{cert.issuer}</p>
              {cert.date && (
                <p className="font-mono text-xs text-[#8899AA] mt-1">
                  {cert.date}
                </p>
              )}
              <span className="mt-auto pt-4 font-mono text-xs text-[#8899AA] group-hover:text-[#00FFB3] transition-colors duration-200">
                Verify credential →
              </span>
            </motion.a>
          ))}
        </div>

        {/* Recognition card */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-xl p-6 md:p-8 hover:border-[rgba(0,212,255,0.15)] transition-colors duration-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="rounded-lg overflow-hidden border border-[#1E2D42]">
              <Image
                src="/recognition/voltava-recognition-card.png"
                alt="Voltava recognition card awarded to Mayank Surti, Detroit plant IT"
                width={1920}
                height={1080}
                className="w-full h-auto"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <h3 className="font-display font-semibold text-xl text-[#E8F4FD]">
                  Voltava Recognition Card
                </h3>
                <span className="px-2 py-0.5 bg-[rgba(124,58,237,0.15)] border border-[rgba(124,58,237,0.3)] rounded text-xs text-[#7C3AED] font-mono">
                  Recognition
                </span>
              </div>
              <p className="text-[#8899AA] text-sm leading-relaxed mb-4">
                Awarded during my internship at Voltava
                while building the Cycle Count Web Application for the Detroit
                plant.
              </p>
              <p className="font-mono text-xs text-[#8899AA]">
                From Bill Mcguire · Detroit Plant, IT · July 2026
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
