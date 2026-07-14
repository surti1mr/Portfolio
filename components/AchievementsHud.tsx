"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ACHIEVEMENTS, useAchievements } from "@/components/AchievementsProvider";

const SECTIONS_KEY = "portfolio_sections_seen";
const SECTION_IDS = [
  "about",
  "skills",
  "experience",
  "projects",
  "comedy",
  "game",
  "contact",
];

export default function AchievementsHud() {
  const { unlocked, unlock } = useAchievements();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion();
  const unlockRef = useRef(unlock);
  useEffect(() => {
    unlockRef.current = unlock;
  }, [unlock]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Section spy: unlocks "explorer" once every section has been seen.
  useEffect(() => {
    let seen: Set<string>;
    try {
      seen = new Set(JSON.parse(localStorage.getItem(SECTIONS_KEY) || "[]"));
    } catch {
      seen = new Set();
    }
    if (SECTION_IDS.every((id) => seen.has(id))) {
      unlockRef.current("explorer");
      return;
    }

    const targets = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let changed = false;
        for (const entry of entries) {
          if (entry.isIntersecting && !seen.has(entry.target.id)) {
            seen.add(entry.target.id);
            changed = true;
          }
        }
        if (!changed) return;
        try {
          localStorage.setItem(SECTIONS_KEY, JSON.stringify(Array.from(seen)));
        } catch {
          /* storage unavailable */
        }
        if (SECTION_IDS.every((id) => seen.has(id))) {
          unlockRef.current("explorer");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            className="glass-card rounded-xl p-4 mb-3 w-72"
          >
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#00D4FF] mb-3">
              {"// achievements"} · {unlocked.size}/{ACHIEVEMENTS.length}
            </p>
            <ul className="flex flex-col gap-2.5">
              {ACHIEVEMENTS.map((a) => {
                const got = unlocked.has(a.id);
                return (
                  <li
                    key={a.id}
                    className="flex items-center gap-3"
                    style={{ opacity: got ? 1 : 0.4 }}
                  >
                    <span className="text-lg w-6 text-center">
                      {got ? a.icon : "🔒"}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#E8F4FD] leading-tight">
                        {a.title}
                      </p>
                      <p className="text-[11px] text-[#8899AA] leading-tight">
                        {a.desc}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={`Achievements: ${unlocked.size} of ${ACHIEVEMENTS.length} unlocked`}
        className="glass-card rounded-full w-12 h-12 flex items-center justify-center relative transition-transform hover:scale-105"
        style={{ border: "1px solid #1E2D42" }}
      >
        <span className="text-xl">🏆</span>
        <span
          className="absolute -top-1.5 -right-1.5 rounded-full px-1.5 py-0.5 font-mono text-[9px] font-bold"
          style={{ background: "#00D4FF", color: "#0A0E1A", minWidth: 20 }}
        >
          {unlocked.size}/{ACHIEVEMENTS.length}
        </span>
      </button>
    </div>
  );
}
