"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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

// ── PFC card ─────────────────────────────────────────────────────────────────

const PFC_ROLES = [
  {
    icon: "🩺",
    name: "Doctor",
    desc: "Views only their own patients and patient data. Sends personalized meal plans and nutrition plans directly to patients through the portal based on assessment results.",
    color: "#00D4FF",
    bg: "rgba(0,212,255,0.05)",
    border: "rgba(0,212,255,0.15)",
  },
  {
    icon: "🧑‍⚕️",
    name: "Patient",
    desc: "Views doctor availability and books consultations. Receives personalized nutrition and exercise plans from their assigned doctor inside the portal.",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.05)",
    border: "rgba(124,58,237,0.15)",
  },
];

const PFC_STEPS = [
  "Patient takes metabolic assessment",
  "Doctor reviews results & creates plan",
  "Patient receives nutrition + exercise plan via portal",
];

const PFC_PILLS = [
  "🧬 Metabolic Type Assessment",
  "📧 Mail Service Integration",
  "📄 Automated PDF Reports",
  "⚡ 50% Less Manual Effort",
  "🩺 Doctor-Patient Role System",
  "🔒 Data Isolation Per Doctor",
  "📊 In-Portal Plan Delivery",
];

const PFC_TECH = ["React.js", "Node.js", "MySQL", "PDF Generation", "Mail API"];

function PFCCard({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileHover={reducedMotion ? {} : { y: -4 }}
      className="glass-card rounded-xl p-6 flex flex-col border border-[#1E2D42] hover:border-[rgba(0,212,255,0.2)] transition-all duration-300 cursor-default"
      style={{ boxShadow: "none", transition: "box-shadow 0.3s, border-color 0.3s, transform 0.3s" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 30px rgba(0,212,255,0.12)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display font-bold text-[#E8F4FD]" style={{ fontSize: 20 }}>Performance Fitness Concepts</h3>
          <p className="font-mono text-[#8899AA] mt-1" style={{ fontSize: 11 }}>Health & Wellness App</p>
        </div>
        <span className="font-mono text-[#8899AA] border border-[#1E2D42] rounded-full px-2 py-1 flex-shrink-0" style={{ fontSize: 10 }}>Web App</span>
      </div>

      {/* Description */}
      <p className="text-[#8899AA] text-sm mt-3" style={{ lineHeight: 1.7 }}>
        Web application that determines a user&apos;s metabolic type and generates fully personalized nutrition and exercise plans. Integrated mail services for plan delivery and built automated PDF report generation to reduce manual effort by 50%.
      </p>

      {/* Role cards */}
      <p className="font-mono text-[#8899AA] uppercase tracking-wider mt-4 mb-2" style={{ fontSize: 10 }}>User Roles</p>
      <div className="grid grid-cols-2 gap-2">
        {PFC_ROLES.map((r) => (
          <div key={r.name} className="rounded-lg p-2.5" style={{ background: r.bg, border: `1px solid ${r.border}` }}>
            <p className="font-mono font-semibold" style={{ fontSize: 12, color: r.color }}>{r.icon} {r.name}</p>
            <p className="text-[#8899AA] mt-1" style={{ fontSize: 12, lineHeight: 1.6 }}>{r.desc}</p>
          </div>
        ))}
      </div>

      {/* Workflow */}
      <p className="font-mono text-[#8899AA] uppercase tracking-wider mt-4 mb-2" style={{ fontSize: 10 }}>How It Works</p>
      <div className="flex flex-col sm:flex-row items-center gap-1.5">
        {PFC_STEPS.map((step, i) => (
          <div key={step} className="flex flex-col sm:flex-row items-center gap-1.5 flex-1 w-full">
            <div className="rounded-md px-2 py-2 text-center w-full" style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.1)", fontSize: 12, color: "#8899AA", lineHeight: 1.5 }}>
              {step}
            </div>
            {i < PFC_STEPS.length - 1 && (
              <span className="flex-shrink-0 font-bold" style={{ color: "#00D4FF", fontSize: 16 }}>
                <span className="hidden sm:inline">→</span>
                <span className="sm:hidden">↓</span>
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Pills */}
      <div className="flex flex-wrap gap-2 mt-4">
        {PFC_PILLS.map((p) => (
          <span key={p} className="rounded-full px-3 py-1 font-mono" style={{ fontSize: 11, background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)", color: "#00D4FF" }}>{p}</span>
        ))}
      </div>

      {/* Tech */}
      <div className="flex flex-wrap gap-2 mt-4">
        {PFC_TECH.map((t) => (
          <span key={t} className="font-mono text-xs text-[#8899AA] border-b border-[#1E2D42] pb-0.5">{t}</span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#1E2D42]">
        <span className="font-mono italic text-[#8899AA]" style={{ fontSize: 11 }}>No public link available</span>
      </div>
    </motion.div>
  );
}

// ── Medha STPC card ───────────────────────────────────────────────────────────

const MEDHA_HIERARCHY = [
  { icon: "🏛️", role: "Principal", sub: "Top-level admin — full system oversight", color: "#00D4FF", bg: "rgba(0,212,255,0.08)", border: "rgba(0,212,255,0.25)", minW: 200 },
  { icon: "🗺️", role: "Zone Admin", sub: "Manages multiple colleges within a zone", color: "#00D4FF", bg: "rgba(0,212,255,0.06)", border: "rgba(0,212,255,0.18)", minW: 240 },
  { icon: "🏫", role: "College Admin", sub: "Manages students within their institution", color: "#00D4FF", bg: "rgba(0,212,255,0.04)", border: "rgba(0,212,255,0.12)", minW: 280 },
  { icon: "🎓", role: "Student", sub: "Only admin-approved students can login", color: "#7C3AED", bg: "rgba(124,58,237,0.05)", border: "rgba(124,58,237,0.2)", minW: 320 },
];

const MEDHA_PILLS = [
  "👥 75,000+ Students Served",
  "🏛️ 4-Level Role Hierarchy",
  "🔐 Admin-Controlled Activation",
  "🗺️ Zone-Based Management",
  "🏫 Multi-College Support",
  "🎓 Graduate Employability Focus",
  "🔌 REST APIs Built",
  "🖥️ Frontend Modules",
];

const MEDHA_TECH = ["React.js", "Node.js", "REST APIs", "PostgreSQL"];

function MedhaCard({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={reducedMotion ? {} : { y: -4 }}
      className="glass-card rounded-xl p-6 flex flex-col border border-[#1E2D42] hover:border-[rgba(0,212,255,0.2)] transition-all duration-300 cursor-default"
      style={{ boxShadow: "none", transition: "box-shadow 0.3s, border-color 0.3s, transform 0.3s" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 30px rgba(0,212,255,0.12)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display font-bold text-[#E8F4FD]" style={{ fontSize: 20 }}>Medha STPC</h3>
          <p className="font-mono text-[#8899AA] mt-1" style={{ fontSize: 11 }}>EdTech Platform</p>
        </div>
        <span className="font-mono text-[#8899AA] border border-[#1E2D42] rounded-full px-2 py-1 flex-shrink-0" style={{ fontSize: 10 }}>EdTech</span>
      </div>

      {/* Description */}
      <p className="text-[#8899AA] text-sm mt-3" style={{ lineHeight: 1.7 }}>
        Tech-enabled polytechnic system designed to improve graduate employment and employability. Built frontend modules and REST APIs for the platform. Used by 75,000+ students across institutions.
      </p>

      {/* Role hierarchy */}
      <p className="font-mono text-[#8899AA] uppercase tracking-wider mt-4 mb-2" style={{ fontSize: 10 }}>Role Hierarchy</p>
      <div className="flex flex-col items-center">
        {MEDHA_HIERARCHY.map((level, i) => (
          <div key={level.role} className="flex flex-col items-center w-full">
            <div
              className="rounded-lg py-2 px-3 text-center w-full"
              style={{ background: level.bg, border: `1px solid ${level.border}`, maxWidth: level.minW }}
            >
              <p className="font-mono font-semibold" style={{ fontSize: 12, color: level.color }}>{level.icon} {level.role}</p>
              <p className="text-[#8899AA] mt-0.5" style={{ fontSize: 11 }}>{level.sub}</p>
            </div>
            {i < MEDHA_HIERARCHY.length - 1 && (
              <div style={{ width: 2, height: 10, background: "#1E2D42", margin: "0 auto" }} />
            )}
          </div>
        ))}
      </div>

      {/* Student activation callout */}
      <div className="flex items-start gap-2.5 mt-3 rounded-lg px-3.5 py-2.5" style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.2)" }}>
        <span style={{ fontSize: 20, flexShrink: 0 }}>🔐</span>
        <div>
          <p className="font-mono font-semibold" style={{ fontSize: 12, color: "#7C3AED" }}>Student Activation Flow</p>
          <p className="text-[#8899AA] mt-1" style={{ fontSize: 12, lineHeight: 1.6 }}>
            Students register → College Admin reviews → Admin activates account → Student gains login access. Inactive students cannot log in.
          </p>
        </div>
      </div>

      {/* Pills */}
      <div className="flex flex-wrap gap-2 mt-4">
        {MEDHA_PILLS.map((p) => (
          <span key={p} className="rounded-full px-3 py-1 font-mono" style={{ fontSize: 11, background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)", color: "#00D4FF" }}>{p}</span>
        ))}
      </div>

      {/* Tech */}
      <div className="flex flex-wrap gap-2 mt-4">
        {MEDHA_TECH.map((t) => (
          <span key={t} className="font-mono text-xs text-[#8899AA] border-b border-[#1E2D42] pb-0.5">{t}</span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#1E2D42]">
        <span className="font-mono italic text-[#8899AA]" style={{ fontSize: 11 }}>No public link available</span>
      </div>
    </motion.div>
  );
}

// ── CyberGuard360 card ───────────────────────────────────────────────────────

const CG_CONTRIBUTIONS = [
  {
    icon: "🎣",
    title: "Phishing Simulation",
    desc: "Built simulated phishing attack campaigns with realistic email scenarios. Supported customizable campaigns by user role and department, and automated scheduling. Results reported directly into client dashboards.",
  },
  {
    icon: "🌑",
    title: "Dark Web Monitoring",
    desc: "Worked on Deep Diver — the platform's dark web monitoring engine. Continuously scans for compromised credentials and PII. Triggers instant white-labeled alerts to MSP clients when breaches are detected.",
  },
  {
    icon: "📚",
    title: "Training & Compliance",
    desc: "Contributed to the security awareness training system — self-paced, web-based courses with weekly refreshers to keep client employees cyber aware. Included HIPAA module support.",
  },
  {
    icon: "📧",
    title: "Newsletter System",
    desc: "Built and optimized the platform newsletter system for MSP client communications — improving email delivery, performance, and reducing execution time significantly.",
  },
];

const CG_EXPANDED = [
  {
    icon: "🔍",
    label: "Technical Scans",
    desc: "Platform includes pen testing and vulnerability assessment using a patent-pending algorithm — evaluating networks for weaknesses against the current threat landscape. Elevates MSPs to MSSPs.",
  },
  {
    icon: "📋",
    label: "Policy & Risk Management",
    desc: "150+ CISO-vetted security policies. Enterprise-grade risk assessments (FTC, PCI, NIST-based) with automated Work Plan generation for compliance gap closure.",
  },
  {
    icon: "🏢",
    label: "Google Workspace & Microsoft Entra ID",
    desc: "Direct Email Delivery (DED) integration — phishing emails inserted directly into Gmail and Outlook inboxes bypassing traditional filters, for realistic simulation testing.",
  },
];

const CG_PILLS = [
  "🎣 Phishing Simulation Engine",
  "🌑 Dark Web Monitoring (Deep Diver)",
  "📧 Newsletter System",
  "📚 Security Awareness Training",
  "🔒 MSP Security Platform",
  "🌍 Production · Nationwide Clients",
];

const CG_TECH = [
  "React.js",
  "Node.js",
  "Dark Web APIs",
  "Email Systems",
  "MySQL",
  "REST APIs",
];

function CyberGuardCard({ reducedMotion }: { reducedMotion: boolean }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0 }}
      whileHover={reducedMotion ? {} : { y: -4 }}
      className="glass-card rounded-xl p-6 flex flex-col border border-[#1E2D42] hover:border-[rgba(0,255,179,0.25)] transition-all duration-300 cursor-default"
      style={{ boxShadow: "none", transition: "box-shadow 0.3s, border-color 0.3s, transform 0.3s" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 30px rgba(0,255,179,0.08)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display font-bold text-[#E8F4FD]" style={{ fontSize: 20 }}>CyberGuard360</h3>
          <p className="font-mono text-[#8899AA] mt-1" style={{ fontSize: 11 }}>Cybersecurity Platform for MSPs</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-mono rounded-full px-2 py-1" style={{ fontSize: 10, color: "#00FFB3", border: "1px solid rgba(0,255,179,0.3)" }}>Security Platform</span>
          <a href="https://cyberguard360.com/features/" target="_blank" rel="noopener noreferrer" className="text-[#8899AA] hover:text-[#00FFB3] transition-colors">
            <ExternalIcon />
          </a>
        </div>
      </div>

      {/* Tagline */}
      <p className="italic text-[#8899AA] mt-2 mb-3 pl-3" style={{ fontSize: 13, borderLeft: "3px solid #00FFB3", lineHeight: 1.6 }}>
        Contributed to a production cybersecurity platform serving MSPs nationwide — focusing on phishing simulation, dark web monitoring, training & compliance, and newsletter systems.
      </p>

      {/* Contributions grid */}
      <p className="font-mono uppercase tracking-wider mb-2" style={{ fontSize: 10, color: "#00FFB3" }}>My Contributions</p>
      <div className="grid grid-cols-2 gap-2">
        {CG_CONTRIBUTIONS.map((c) => (
          <div key={c.title} className="rounded-lg p-2.5" style={{ background: "rgba(0,255,179,0.05)", border: "1px solid rgba(0,255,179,0.15)" }}>
            <p className="font-mono font-semibold" style={{ fontSize: 12, color: "#00FFB3" }}>{c.icon} {c.title}</p>
            <p className="text-[#8899AA] mt-1" style={{ fontSize: 12, lineHeight: 1.6 }}>{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Accordion */}
      <button onClick={() => setExpanded((v) => !v)} className="mt-3 self-start font-mono hover:opacity-80 transition-opacity" style={{ fontSize: 11, color: "#00FFB3", background: "none", border: "none", padding: 0, cursor: "pointer" }}>
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={reducedMotion ? {} : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={reducedMotion ? {} : { opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="mt-2 space-y-2">
              {CG_EXPANDED.map((b) => (
                <div key={b.label} className="rounded-lg px-3 py-2.5" style={{ background: "rgba(0,255,179,0.04)", border: "1px solid rgba(0,255,179,0.12)" }}>
                  <p className="font-mono font-semibold" style={{ fontSize: 12, color: "#00FFB3" }}>{b.icon} {b.label}</p>
                  <p className="text-[#8899AA] mt-1" style={{ fontSize: 13, lineHeight: 1.6 }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pills — mint green */}
      <div className="flex flex-wrap gap-2 mt-4">
        {CG_PILLS.map((p) => (
          <span key={p} className="rounded-full px-3 py-1 font-mono" style={{ fontSize: 11, background: "rgba(0,255,179,0.08)", border: "1px solid rgba(0,255,179,0.2)", color: "#00FFB3" }}>{p}</span>
        ))}
      </div>

      {/* Tech */}
      <div className="flex flex-wrap gap-2 mt-4">
        {CG_TECH.map((t) => (
          <span key={t} className="font-mono text-xs text-[#8899AA] border-b border-[#1E2D42] pb-0.5">{t}</span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#1E2D42]">
        <a href="https://cyberguard360.com/features/" target="_blank" rel="noopener noreferrer" className="font-mono hover:opacity-75 transition-opacity" style={{ fontSize: 11, color: "#00FFB3" }}>cyberguard360.com</a>
        <span className="font-mono italic text-[#8899AA]" style={{ fontSize: 11 }}>Production Platform</span>
      </div>
    </motion.div>
  );
}

// ── PMS card ─────────────────────────────────────────────────────────────────

const PMS_ROLES = [
  {
    icon: "🛡️",
    name: "Admin",
    desc: "Manages all users, views system-wide stats, full platform access.",
    color: "#00D4FF",
    bg: "rgba(0,212,255,0.05)",
    border: "rgba(0,212,255,0.2)",
  },
  {
    icon: "📋",
    name: "Event Manager",
    desc: "Creates & manages events, handles registrations, tracks participants.",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.05)",
    border: "rgba(124,58,237,0.2)",
  },
  {
    icon: "🎟️",
    name: "Participant",
    desc: "Self-registers, browses events, registers and tracks their events.",
    color: "#00FFB3",
    bg: "rgba(0,255,179,0.05)",
    border: "rgba(0,255,179,0.2)",
  },
];

const PMS_EXPANDED = [
  {
    icon: "🔌",
    label: "API Endpoints",
    desc: "RESTful JSON API: auth (login/logout/profile), event listing, event registration, user registrations, and health check endpoint.",
    bg: "rgba(0,212,255,0.05)",
    border: "rgba(0,212,255,0.12)",
    color: "#00D4FF",
  },
  {
    icon: "🔒",
    label: "Security",
    desc: "Password hashing via Werkzeug, session-based auth, SQLAlchemy SQL injection protection, environment variable config, role-based access control.",
    bg: "rgba(124,58,237,0.05)",
    border: "rgba(124,58,237,0.12)",
    color: "#7C3AED",
  },
];

const PMS_PILLS = [
  "🎭 Built for Open Mic Events",
  "👥 3-Role Access System",
  "🔌 RESTful JSON API",
  "🔒 Session Auth + Password Hashing",
  "📊 Role-Specific Dashboards",
  "🗄️ MySQL + SQLAlchemy",
];

const PMS_TECH = [
  "Flask",
  "Python",
  "MySQL",
  "SQLAlchemy",
  "REST API",
  "Werkzeug",
  "HTML/CSS",
];

function PMSCard({ reducedMotion }: { reducedMotion: boolean }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileHover={reducedMotion ? {} : { y: -4 }}
      className="glass-card rounded-xl p-6 flex flex-col border border-[#1E2D42] hover:border-[rgba(0,212,255,0.2)] transition-all duration-300 cursor-default"
      style={{ boxShadow: "none", transition: "box-shadow 0.3s, border-color 0.3s, transform 0.3s" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 30px rgba(0,212,255,0.12)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display font-bold text-[#E8F4FD]" style={{ fontSize: 20 }}>PMS</h3>
          <p className="font-mono text-[#8899AA] mt-1" style={{ fontSize: 11 }}>Event Management System</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-mono text-[#8899AA] border border-[#1E2D42] rounded-full px-2 py-1" style={{ fontSize: 10 }}>Web App</span>
          <a href="https://github.com/surti1mr/PMS" target="_blank" rel="noopener noreferrer" className="text-[#8899AA] hover:text-[#00D4FF] transition-colors">
            <GitHubIcon />
          </a>
        </div>
      </div>
      {/* Tagline */}
      <p className="italic text-[#8899AA] mt-2 mb-3 pl-3" style={{ fontSize: 13, borderLeft: "3px solid #00D4FF", lineHeight: 1.6 }}>
        Flask-based event management platform with role-based access control and a RESTful API — originally built to manage open mic and stand-up comedy events.
      </p>
      {/* Role cards */}
      <p className="font-mono text-[#8899AA] uppercase tracking-wider mb-2" style={{ fontSize: 10 }}>User Roles</p>
      <div className="grid grid-cols-3 gap-2">
        {PMS_ROLES.map((r) => (
          <div key={r.name} className="rounded-lg p-2" style={{ background: r.bg, border: `1px solid ${r.border}` }}>
            <p className="font-mono font-semibold" style={{ fontSize: 11, color: r.color }}>{r.icon} {r.name}</p>
            <p className="text-[#8899AA] mt-1" style={{ fontSize: 11, lineHeight: 1.5 }}>{r.desc}</p>
          </div>
        ))}
      </div>
      {/* Accordion toggle */}
      <button onClick={() => setExpanded((v) => !v)} className="mt-3 self-start font-mono text-[#00D4FF] hover:opacity-80 transition-opacity" style={{ fontSize: 11, background: "none", border: "none", padding: 0, cursor: "pointer" }}>
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={reducedMotion ? {} : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={reducedMotion ? {} : { opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="mt-2 space-y-2">
              {PMS_EXPANDED.map((b) => (
                <div key={b.label} className="rounded-lg px-3 py-2.5" style={{ background: b.bg, border: `1px solid ${b.border}` }}>
                  <p className="font-mono font-semibold" style={{ fontSize: 12, color: b.color }}>{b.icon} {b.label}</p>
                  <p className="text-[#8899AA] mt-1" style={{ fontSize: 13, lineHeight: 1.6 }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Pills */}
      <div className="flex flex-wrap gap-2 mt-4">
        {PMS_PILLS.map((p) => (
          <span key={p} className="rounded-full px-3 py-1 font-mono" style={{ fontSize: 11, background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)", color: "#00D4FF" }}>{p}</span>
        ))}
      </div>
      {/* Tech */}
      <div className="flex flex-wrap gap-2 mt-4">
        {PMS_TECH.map((t) => (
          <span key={t} className="font-mono text-xs text-[#8899AA] border-b border-[#1E2D42] pb-0.5">{t}</span>
        ))}
      </div>
      {/* Footer */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#1E2D42]">
        <a href="https://github.com/surti1mr/PMS" target="_blank" rel="noopener noreferrer" className="font-mono hover:opacity-75 transition-opacity" style={{ fontSize: 11, color: "#00D4FF" }}>github.com/surti1mr/PMS</a>
      </div>
    </motion.div>
  );
}

// ── VMIMS card ────────────────────────────────────────────────────────────────

const VMIMS_MODULES = [
  { icon: "🏧", label: "Maintain Machine Data" },
  { icon: "📦", label: "Maintain Product Data" },
  { icon: "🎓", label: "Maintain Student Data" },
  { icon: "📊", label: "Update Stock Levels" },
  { icon: "📝", label: "Log Student Usage" },
  { icon: "📋", label: "Refill Report" },
  { icon: "🔍", label: "Stock Overview" },
];

const VMIMS_EXPANDED = [
  {
    icon: "🗄️",
    label: "Custom SAP Tables",
    desc: "Built on 5 custom SAP tables: Z129_STOCK (inventory), Z129_MACHINE (machine data), Z129_VEND_PROD (products), Z129_STUDENT (student records), Z129_USAGE_LOG (purchase logs).",
    bg: "rgba(124,58,237,0.05)",
    border: "rgba(124,58,237,0.15)",
    color: "#7C3AED",
  },
  {
    icon: "🏗️",
    label: "Program Architecture",
    desc: "Structured as a Module Pool with PBO/PAI modules across 8 screens (0100–0170). Includes global data declarations, form routines, and screen-level logic separation following SAP ABAP best practices.",
    bg: "rgba(0,212,255,0.05)",
    border: "rgba(0,212,255,0.12)",
    color: "#00D4FF",
  },
];

const VMIMS_PILLS = [
  "🏧 7 Core System Modules",
  "🗄️ 5 Custom SAP Tables",
  "📺 8 Screen Definitions",
  "⚙️ PBO/PAI Architecture",
  "📋 Refill & Stock Reports",
  "🎓 CMU BIS657S Course Project",
];

const VMIMS_TECH = [
  "SAP ABAP",
  "Module Pool",
  "MySQL",
  "SAP SE80",
  "SAP SE38",
  "PBO/PAI",
];

function VMIMSCard({ reducedMotion }: { reducedMotion: boolean }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={reducedMotion ? {} : { y: -4 }}
      className="glass-card rounded-xl p-6 flex flex-col border border-[#1E2D42] hover:border-[rgba(124,58,237,0.3)] transition-all duration-300 cursor-default"
      style={{ boxShadow: "none", transition: "box-shadow 0.3s, border-color 0.3s, transform 0.3s" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 30px rgba(124,58,237,0.1)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display font-bold text-[#E8F4FD]" style={{ fontSize: 20 }}>VMIMS</h3>
          <p className="font-mono text-[#8899AA] mt-1" style={{ fontSize: 11 }}>Vending Machine Inventory System</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-mono rounded-full px-2 py-1" style={{ fontSize: 10, color: "#7C3AED", border: "1px solid rgba(124,58,237,0.4)", background: "rgba(124,58,237,0.08)" }}>SAP ABAP</span>
          <a href="https://github.com/surti1mr/Vending-Machine-Inventory-Management-System" target="_blank" rel="noopener noreferrer" className="text-[#8899AA] hover:text-[#7C3AED] transition-colors">
            <GitHubIcon />
          </a>
        </div>
      </div>
      {/* Tagline */}
      <p className="italic text-[#8899AA] mt-2 mb-3 pl-3" style={{ fontSize: 13, borderLeft: "3px solid #7C3AED", lineHeight: 1.6 }}>
        ABAP Module Pool Program for managing vending machines, products, students, stock levels, and usage logging inside an SAP environment.
      </p>
      {/* SAP badge row */}
      <div className="flex flex-wrap gap-2 mb-3">
        {["SAP ABAP", "Module Pool", "T-Code: Z129_PROJECT_PROGRAM"].map((b) => (
          <span key={b} className="font-mono rounded-full px-3 py-1" style={{ fontSize: 11, color: "#7C3AED", border: "1px solid rgba(124,58,237,0.3)", background: "rgba(124,58,237,0.12)" }}>{b}</span>
        ))}
      </div>
      {/* Modules grid */}
      <p className="font-mono text-[#8899AA] uppercase tracking-wider mb-2" style={{ fontSize: 10 }}>System Modules</p>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1">
        {VMIMS_MODULES.map((m) => (
          <span key={m.label} className="flex items-center gap-2 text-[#8899AA]" style={{ fontSize: 12 }}>
            <span style={{ color: "#7C3AED" }}>{m.icon}</span>{m.label}
          </span>
        ))}
      </div>
      {/* Accordion */}
      <button onClick={() => setExpanded((v) => !v)} className="mt-3 self-start font-mono text-[#7C3AED] hover:opacity-80 transition-opacity" style={{ fontSize: 11, background: "none", border: "none", padding: 0, cursor: "pointer" }}>
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={reducedMotion ? {} : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={reducedMotion ? {} : { opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="mt-2 space-y-2">
              {VMIMS_EXPANDED.map((b) => (
                <div key={b.label} className="rounded-lg px-3 py-2.5" style={{ background: b.bg, border: `1px solid ${b.border}` }}>
                  <p className="font-mono font-semibold" style={{ fontSize: 12, color: b.color }}>{b.icon} {b.label}</p>
                  <p className="text-[#8899AA] mt-1" style={{ fontSize: 13, lineHeight: 1.6 }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Pills — violet */}
      <div className="flex flex-wrap gap-2 mt-4">
        {VMIMS_PILLS.map((p) => (
          <span key={p} className="rounded-full px-3 py-1 font-mono" style={{ fontSize: 11, background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", color: "#7C3AED" }}>{p}</span>
        ))}
      </div>
      {/* Tech */}
      <div className="flex flex-wrap gap-2 mt-4">
        {VMIMS_TECH.map((t) => (
          <span key={t} className="font-mono text-xs text-[#8899AA] border-b border-[#1E2D42] pb-0.5">{t}</span>
        ))}
      </div>
      {/* Footer */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#1E2D42]">
        <a href="https://github.com/surti1mr/Vending-Machine-Inventory-Management-System" target="_blank" rel="noopener noreferrer" className="font-mono hover:opacity-75 transition-opacity" style={{ fontSize: 11, color: "#7C3AED" }}>github.com/surti1mr/VMIMS</a>
        <span className="font-mono italic text-[#8899AA]" style={{ fontSize: 11 }}>CMU · Dec 2025</span>
      </div>
    </motion.div>
  );
}

// ── Dijori dedicated card with accordion ─────────────────────────────────────

const DIJORI_FEATURES = [
  {
    icon: "🔐",
    label: "Tijori Vault",
    desc: "Double-encrypted secure vault for all file types — documents, notes, voice, and image files. Files are only shared at a specific trigger event when you're incapable of sharing them yourself.",
  },
  {
    icon: "👥",
    label: "Trusted Contacts",
    desc: "Add trusted contacts via email. Each gets a personal username and private access to only the files you've designated for them. No one else can access their shared data.",
  },
  {
    icon: "📁",
    label: "My Drive",
    desc: "An unencrypted quick-access drive for everyday files. Share files or folders directly with contacts. Same creation tools as Tijori — notes, voice, images.",
  },
];

const DIJORI_KEY_FEATURES = [
  "Free, Safe & Secure",
  "SMS & Email Notifications",
  "Secure Online Backup",
  "Double-Encrypted Vault",
  "Per-contact Login Access",
  "Code Lock Protection",
  "Download All Data Types",
  "Web + Mobile Support",
];

const DIJORI_PILLS = [
  { icon: "📊", text: "User Analytics & Page Tracking" },
  { icon: "📥", text: "Download Count Tracking" },
  { icon: "📱", text: "Android & iOS Deployed" },
  { icon: "🔒", text: "Double-Encrypted Vault" },
  { icon: "👥", text: "Trusted Contact System" },
  { icon: "🔔", text: "SMS + Email Notifications" },
];

const DIJORI_TECH = [
  "React Native",
  "Node.js",
  "Firebase Analytics",
  "Double Encryption",
  "Android",
  "iOS",
  "Web",
];

function DijoriCard({ reducedMotion }: { reducedMotion: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0 }}
      whileHover={reducedMotion ? {} : { y: -4 }}
      className="glass-card rounded-xl p-6 flex flex-col border border-[#1E2D42] hover:border-[rgba(0,212,255,0.2)] transition-all duration-300 cursor-default"
      style={{
        boxShadow: "none",
        transition: "box-shadow 0.3s, border-color 0.3s, transform 0.3s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 8px 30px rgba(0,212,255,0.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3
            className="font-display font-bold text-[#E8F4FD]"
            style={{ fontSize: 20 }}
          >
            Dijori
          </h3>
          <p
            className="font-mono text-[#8899AA] mt-1"
            style={{ fontSize: 11 }}
          >
            Digital Tijori
          </p>
        </div>
        <span
          className="font-mono text-[#8899AA] border border-[#1E2D42] rounded-full px-2 py-1 flex-shrink-0"
          style={{ fontSize: 10 }}
        >
          Web + Mobile
        </span>
      </div>

      {/* Tagline */}
      <p
        className="italic text-[#8899AA] mt-2 mb-3 pl-3"
        style={{
          fontSize: 13,
          borderLeft: "3px solid #7C3AED",
          lineHeight: 1.6,
        }}
      >
        Manages and shares your data, after you, with your nominees.
      </p>

      {/* Default description */}
      <p className="text-[#8899AA] text-sm" style={{ lineHeight: 1.7 }}>
        A secure digital vault app for storing and sharing all your asset
        details, files, and documents with your trusted contacts or nominees,
        automatically triggered when you&apos;re unable to share them yourself.
      </p>

      {/* Accordion toggle */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="mt-2 self-start font-mono text-[#00D4FF] hover:opacity-80 transition-opacity"
        style={{ fontSize: 11, background: "none", border: "none", padding: 0, cursor: "pointer" }}
      >
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>

      {/* Expanded feature blocks */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reducedMotion ? {} : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-2 space-y-2">
              {DIJORI_FEATURES.map((f) => (
                <div
                  key={f.label}
                  className="rounded-lg px-3 py-2.5"
                  style={{
                    background: "rgba(124,58,237,0.06)",
                    border: "1px solid rgba(124,58,237,0.15)",
                  }}
                >
                  <p
                    className="font-mono font-semibold text-[#7C3AED]"
                    style={{ fontSize: 12 }}
                  >
                    {f.icon} {f.label}
                  </p>
                  <p
                    className="text-[#8899AA] mt-1"
                    style={{ fontSize: 13, lineHeight: 1.6 }}
                  >
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Key Features grid */}
      <div className="mt-4">
        <p
          className="font-mono text-[#8899AA] uppercase tracking-wider mb-2"
          style={{ fontSize: 10 }}
        >
          Key Features
        </p>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          {DIJORI_KEY_FEATURES.map((feat) => (
            <span
              key={feat}
              className="flex items-center gap-1 text-[#8899AA]"
              style={{ fontSize: 12 }}
            >
              <span style={{ color: "#00FFB3" }}>✓</span>
              {feat}
            </span>
          ))}
        </div>
      </div>

      {/* Highlight pills */}
      <div className="flex flex-wrap gap-2 mt-4">
        {DIJORI_PILLS.map((p) => (
          <span
            key={p.text}
            className="flex items-center gap-1.5 rounded-full px-3 py-1 font-mono"
            style={{
              fontSize: 11,
              background: "rgba(0,212,255,0.08)",
              border: "1px solid rgba(0,212,255,0.15)",
              color: "#00D4FF",
            }}
          >
            <span>{p.icon}</span>
            {p.text}
          </span>
        ))}
      </div>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        {DIJORI_TECH.map((t) => (
          <span
            key={t}
            className="font-mono text-xs text-[#8899AA] border-b border-[#1E2D42] pb-0.5"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#1E2D42]">
        <span
          className="font-mono italic text-[#8899AA]"
          style={{ fontSize: 11 }}
        >
          No public link available
        </span>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

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
          {/* CyberGuard360 — dedicated card with accordion */}
          <CyberGuardCard reducedMotion={reducedMotion} />


          {/* PMS — dedicated card with accordion */}
          <PMSCard reducedMotion={reducedMotion} />

          {/* VMIMS — dedicated card with accordion */}
          <VMIMSCard reducedMotion={reducedMotion} />

          {/* Dijori — dedicated card with accordion */}
          <DijoriCard reducedMotion={reducedMotion} />

          {/* PFC — dedicated card */}
          <PFCCard reducedMotion={reducedMotion} />

          {/* Medha STPC — dedicated card */}
          <MedhaCard reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  );
}
