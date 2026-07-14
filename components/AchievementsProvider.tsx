"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface AchievementDef {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: "first_contact", title: "First Contact", desc: "Asked the AI a question", icon: "💬" },
  { id: "explorer", title: "Explorer", desc: "Visited every section", icon: "🗺️" },
  { id: "player", title: "Insert Coin", desc: "Started the career runner", icon: "🕹️" },
  { id: "era_cmu", title: "Go Maroon & Gold", desc: "Reached Mount Pleasant (2024)", icon: "🎓" },
  { id: "era_detroit", title: "Motor City", desc: "Reached Detroit (2025)", icon: "🏭" },
  { id: "high_scorer", title: "10x Runner", desc: "Scored 350+ in the runner", icon: "🏆" },
  { id: "deep_dive", title: "Deep Dive", desc: "Opened a project's details", icon: "🔍" },
  { id: "recruiter_mode", title: "Recruiter Mode", desc: "Reached out via Contact", icon: "📬" },
];

const STORAGE_KEY = "portfolio_achievements";
const VALID_IDS = new Set(ACHIEVEMENTS.map((a) => a.id));

interface AchievementsCtx {
  unlocked: Set<string>;
  unlock: (id: string) => void;
}

const Ctx = createContext<AchievementsCtx>({
  unlocked: new Set(),
  unlock: () => {},
});

export function useAchievements(): AchievementsCtx {
  return useContext(Ctx);
}

interface Toast {
  key: number;
  def: AchievementDef;
}

export default function AchievementsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastKey = useRef(0);
  // Synchronous mirror of `unlocked` so unlock() can dedupe outside the
  // state updater (avoids double toasts under StrictMode).
  const unlockedRef = useRef<Set<string>>(new Set());
  const reducedMotion = useReducedMotion();

  // Hydrate from localStorage after mount (SSR-safe)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) {
        const set = new Set<string>(saved.filter((id: string) => VALID_IDS.has(id)));
        unlockedRef.current = set;
        setUnlocked(set);
      }
    } catch {
      /* corrupted storage — start fresh */
    }
  }, []);

  const unlock = useCallback((id: string) => {
    if (!VALID_IDS.has(id) || unlockedRef.current.has(id)) return;
    const next = new Set(unlockedRef.current);
    next.add(id);
    unlockedRef.current = next;
    setUnlocked(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
    } catch {
      /* storage unavailable */
    }
    const def = ACHIEVEMENTS.find((a) => a.id === id)!;
    const key = ++toastKey.current;
    setToasts((t) => [...t, { key, def }]);
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.key !== key));
    }, 4000);
  }, []);

  return (
    <Ctx.Provider value={{ unlocked, unlock }}>
      {children}
      {/* Toast stack */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-2 items-end pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.key}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-lg px-4 py-3 flex items-center gap-3"
              style={{ borderLeft: "3px solid #00FFB3", maxWidth: 320 }}
            >
              <span className="text-xl">{t.def.icon}</span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#00FFB3]">
                  Achievement unlocked
                </p>
                <p className="text-sm font-semibold text-[#E8F4FD]">
                  {t.def.title}
                </p>
                <p className="text-xs text-[#8899AA]">{t.def.desc}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  );
}
