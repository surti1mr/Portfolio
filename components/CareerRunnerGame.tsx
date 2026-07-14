"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAchievements } from "@/components/AchievementsProvider";
import {
  ERAS,
  MILESTONES,
  drawObstacle,
  drawBackdrop,
  type EraObstacle,
  type EraConfig,
} from "@/components/game/eras";

// ─── Constants ────────────────────────────────────────────────────
const GROUND_Y_RATIO = 0.78;
const GRAVITY = 0.55;
const JUMP_FORCE = -13;
const DOUBLE_JUMP_FORCE = -11;
const INITIAL_SPEED = 5;
const SPEED_INCREMENT = 0.4;
const SPEED_INTERVAL_MS = 10000;
const PLAYER_W = 36;
const PLAYER_H = 40;
const HS_KEY = "career_runner_hs";
const SNOW_COUNT = 40;
const ERA_BLEND_FRAMES = 90;

// ─── Types ─────────────────────────────────────────────────────────
interface Player {
  x: number;
  y: number;
  vy: number;
  jumpsLeft: number;
  isOnGround: boolean;
}

interface Collectible {
  x: number;
  y: number;
  label: string;
  type: "cyan" | "violet";
  collected: boolean;
}

interface Snowflake {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface Banner {
  text: string;
  framesLeft: number;
  totalFrames: number;
}

interface GameState {
  player: Player;
  obstacles: EraObstacle[];
  collectibles: Collectible[];
  score: number;
  highScore: number;
  speed: number;
  frameCount: number;
  alive: boolean;
  started: boolean;
  obstacleTimer: number;
  collectibleTimer: number;
  speedTimer: number;
  eraIndex: number;
  eraBlendT: number;
  banner: Banner | null;
  shownMilestones: Set<number>;
  snow: Snowflake[];
  spawnPause: number;
  tokensCollected: number;
}

interface GameOverInfo {
  score: number;
  best: number;
  eraIndex: number;
  quip: string;
}

// ─── Drawing helpers ───────────────────────────────────────────────
function drawPlayer(ctx: CanvasRenderingContext2D, p: Player) {
  const { x, y } = p;
  ctx.fillStyle = "#E8F4FD";
  ctx.fillRect(x, y, PLAYER_W, PLAYER_H);
  ctx.fillStyle = "#00D4FF";
  ctx.font = "bold 14px 'JetBrains Mono', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("{ }", x + PLAYER_W / 2, y + PLAYER_H / 2);
}

function drawCollectible(ctx: CanvasRenderingContext2D, c: Collectible) {
  if (c.collected) return;
  const color = c.type === "cyan" ? "#00D4FF" : "#7C3AED";
  const borderColor =
    c.type === "cyan" ? "rgba(0,212,255,0.3)" : "rgba(124,58,237,0.3)";

  ctx.font = "bold 11px 'JetBrains Mono', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const textW = ctx.measureText(c.label).width;
  const pw = textW + 18;
  const ph = 22;
  const px = c.x - pw / 2;
  const py = c.y - ph / 2;
  const rad = ph / 2;

  ctx.fillStyle = "rgba(10,14,26,0.85)";
  ctx.beginPath();
  ctx.moveTo(px + rad, py);
  ctx.lineTo(px + pw - rad, py);
  ctx.arcTo(px + pw, py, px + pw, py + ph, rad);
  ctx.lineTo(px + pw, py + ph - rad);
  ctx.arcTo(px + pw, py + ph, px + pw - rad, py + ph, rad);
  ctx.lineTo(px + rad, py + ph);
  ctx.arcTo(px, py + ph, px, py + ph - rad, rad);
  ctx.lineTo(px, py + rad);
  ctx.arcTo(px, py, px + rad, py, rad);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.fillText(c.label, c.x, c.y);
}

function drawBanner(ctx: CanvasRenderingContext2D, b: Banner, W: number, H: number) {
  const fadeFrames = 20;
  const elapsed = b.totalFrames - b.framesLeft;
  let alpha = 1;
  if (elapsed < fadeFrames) alpha = elapsed / fadeFrames;
  else if (b.framesLeft < fadeFrames) alpha = b.framesLeft / fadeFrames;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = `bold ${Math.round(H * 0.06)}px 'JetBrains Mono', monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const textW = ctx.measureText(b.text).width;
  const pw = textW + 40;
  const ph = Math.round(H * 0.13);
  const px = W / 2 - pw / 2;
  const py = Math.round(H * 0.08);
  const rad = 8;

  ctx.fillStyle = "rgba(15,22,41,0.92)";
  ctx.beginPath();
  ctx.moveTo(px + rad, py);
  ctx.lineTo(px + pw - rad, py);
  ctx.arcTo(px + pw, py, px + pw, py + ph, rad);
  ctx.lineTo(px + pw, py + ph - rad);
  ctx.arcTo(px + pw, py + ph, px + pw - rad, py + ph, rad);
  ctx.lineTo(px + rad, py + ph);
  ctx.arcTo(px, py + ph, px, py + ph - rad, rad);
  ctx.lineTo(px, py + rad);
  ctx.arcTo(px, py, px + rad, py, rad);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(0,255,179,0.6)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = "#00FFB3";
  ctx.fillText(b.text, W / 2, py + ph / 2);
  ctx.restore();
}

function makeSnow(W: number, H: number): Snowflake[] {
  const flakes: Snowflake[] = [];
  for (let i = 0; i < SNOW_COUNT; i++) {
    flakes.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: -0.4 - Math.random() * 0.6,
      vy: 0.6 + Math.random() * 0.9,
      r: 1 + Math.random() * 1.6,
    });
  }
  return flakes;
}

function eraForScore(score: number): number {
  for (let i = ERAS.length - 1; i >= 0; i--) {
    if (score >= ERAS[i].startScore) return i;
  }
  return 0;
}

// ─── Main component ────────────────────────────────────────────────
export default function CareerRunnerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState | null>(null);
  const rafRef = useRef<number>(0);
  const askAiTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = useReducedMotion();
  const { unlock } = useAchievements();

  const [gameOver, setGameOver] = useState<GameOverInfo | null>(null);

  // Refs so the once-created rAF loop never reads stale values
  const rmRef = useRef(false);
  const unlockRef = useRef(unlock);
  const setGameOverRef = useRef(setGameOver);
  useEffect(() => {
    rmRef.current = reducedMotion;
  }, [reducedMotion]);
  useEffect(() => {
    unlockRef.current = unlock;
  }, [unlock]);

  const initState = useCallback((canvas: HTMLCanvasElement): GameState => {
    const groundY = canvas.height * GROUND_Y_RATIO;
    const highScore = Number(localStorage.getItem(HS_KEY) || 0);
    return {
      player: {
        x: 80,
        y: groundY - PLAYER_H,
        vy: 0,
        jumpsLeft: 2,
        isOnGround: true,
      },
      obstacles: [],
      collectibles: [],
      score: 0,
      highScore,
      speed: INITIAL_SPEED,
      frameCount: 0,
      alive: true,
      started: false,
      obstacleTimer: 80,
      collectibleTimer: 120,
      speedTimer: 0,
      eraIndex: 0,
      eraBlendT: 1,
      banner: null,
      shownMilestones: new Set(),
      snow: [],
      spawnPause: 0,
      tokensCollected: 0,
    };
  }, []);

  const jump = useCallback(() => {
    const state = stateRef.current;
    if (!state) return;

    if (!state.started) {
      state.started = true;
      unlockRef.current("player");
      return;
    }

    if (!state.alive) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      stateRef.current = initState(canvas);
      stateRef.current.started = true;
      setGameOverRef.current(null);
      return;
    }

    if (state.player.jumpsLeft > 0) {
      state.player.vy = state.player.isOnGround ? JUMP_FORCE : DOUBLE_JUMP_FORCE;
      state.player.jumpsLeft -= 1;
      state.player.isOnGround = false;
    }
  }, [initState]);

  const handleAskAi = useCallback(() => {
    const eraIndex = gameOver?.eraIndex ?? 0;
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    if (askAiTimeoutRef.current) clearTimeout(askAiTimeoutRef.current);
    askAiTimeoutRef.current = setTimeout(() => {
      // CustomEvent "portfolio:ask-ai", detail: { question: string; autoSend: boolean }
      // Listener lives in HeroChatPanel.tsx.
      window.dispatchEvent(
        new CustomEvent("portfolio:ask-ai", {
          detail: { question: ERAS[eraIndex].askAiQuestion, autoSend: true },
        })
      );
    }, 600);
  }, [gameOver]);

  useEffect(() => {
    return () => {
      if (askAiTimeoutRef.current) clearTimeout(askAiTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    stateRef.current = initState(canvas);

    // Resize handler
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const W = Math.min(parent.clientWidth, 800);
      canvas.width = W;
      canvas.height = Math.round(W * 0.375);
      if (stateRef.current) {
        const groundY = canvas.height * GROUND_Y_RATIO;
        stateRef.current.player.y = Math.min(
          stateRef.current.player.y,
          groundY - PLAYER_H
        );
        stateRef.current.snow = [];
      }
    };
    resize();
    window.addEventListener("resize", resize);

    // Input handlers. BUTTON is excluded so Space on the focused
    // game-over button doesn't both click it and jump.
    const handleKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "BUTTON") return;
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };
    const handleTouch = (e: TouchEvent) => {
      e.preventDefault();
      jump();
    };
    const handleClick = () => jump();

    window.addEventListener("keydown", handleKey);
    canvas.addEventListener("touchstart", handleTouch, { passive: false });
    canvas.addEventListener("click", handleClick);

    // Game loop
    const loop = () => {
      const state = stateRef.current;
      if (!state) return;

      const W = canvas.width;
      const H = canvas.height;
      const groundY = H * GROUND_Y_RATIO;
      const era = ERAS[state.eraIndex];
      const prevEra: EraConfig | null =
        state.eraIndex > 0 ? ERAS[state.eraIndex - 1] : null;

      ctx.clearRect(0, 0, W, H);

      // Backdrop: era sky + parallax skyline
      const scrollX = state.started && state.alive
        ? (state.frameCount * state.speed * 0.2) % (W * 2)
        : 0;
      drawBackdrop(ctx, era, prevEra, state.eraBlendT, W, H, groundY, scrollX);

      // Ground line (era-tinted)
      ctx.strokeStyle = era.groundColor;
      ctx.lineWidth = 2;
      ctx.shadowColor = era.groundColor;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.moveTo(0, groundY + 2);
      ctx.lineTo(W, groundY + 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      if (!state.started) {
        // Start screen
        ctx.fillStyle = "#E8F4FD";
        ctx.font = `bold ${Math.round(H * 0.1)}px 'Space Grotesk', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Career Runner", W / 2, H * 0.32);
        ctx.font = `${Math.round(H * 0.05)}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = "#8899AA";
        ctx.fillText("Mumbai → Mount Pleasant → Detroit", W / 2, H * 0.47);
        ctx.font = `${Math.round(H * 0.065)}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = "#00D4FF";
        ctx.fillText("Press SPACE or Tap to Start", W / 2, H * 0.62);
        drawPlayer(ctx, state.player);
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      if (!state.alive) {
        // Dead: HTML overlay shows the game-over UI; keep last frame dimmed
        ctx.fillStyle = "rgba(10,14,26,0.5)";
        ctx.fillRect(0, 0, W, H);
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      // ── Update ──────────────────────────────────────────────────

      state.frameCount++;
      state.speedTimer++;

      if (state.speedTimer >= SPEED_INTERVAL_MS / 16.67) {
        state.speed += SPEED_INCREMENT;
        state.speedTimer = 0;
      }

      // Score = distance + collectibles bonus (bonus tracked separately)
      state.score = Math.floor(state.frameCount / 6) + state.tokensCollected * 10;

      // Era switching
      const targetEra = eraForScore(state.score);
      if (targetEra > state.eraIndex) {
        state.eraIndex = targetEra;
        state.eraBlendT = rmRef.current ? 1 : 0;
        const newEra = ERAS[targetEra];
        if (newEra.transitionBanner) {
          state.banner = {
            text: newEra.transitionBanner,
            framesLeft: 160,
            totalFrames: 160,
          };
        }
        state.spawnPause = 70;
        state.obstacles = state.obstacles.filter((o) => o.x < W * 0.6);
        if (newEra.id === "cmu") unlockRef.current("era_cmu");
        if (newEra.id === "detroit") unlockRef.current("era_detroit");
      }
      if (state.eraBlendT < 1) {
        state.eraBlendT = Math.min(1, state.eraBlendT + 1 / ERA_BLEND_FRAMES);
      }

      if (state.score >= 350) unlockRef.current("high_scorer");

      // Milestone banners (shared slot with era banners; era wins)
      if (state.banner === null) {
        for (const m of MILESTONES) {
          if (m.score <= state.score && !state.shownMilestones.has(m.score)) {
            state.shownMilestones.add(m.score);
            state.banner = { text: m.text, framesLeft: 150, totalFrames: 150 };
            break;
          }
        }
      }

      // Player physics
      const p = state.player;
      p.vy += GRAVITY;
      p.y += p.vy;

      if (p.y >= groundY - PLAYER_H) {
        p.y = groundY - PLAYER_H;
        p.vy = 0;
        p.isOnGround = true;
        p.jumpsLeft = 2;
      } else {
        p.isOnGround = false;
      }

      // Spawn obstacles (paused briefly after era switch)
      if (state.spawnPause > 0) {
        state.spawnPause--;
      } else {
        state.obstacleTimer--;
        if (state.obstacleTimer <= 0) {
          const r = 14 + Math.random() * 8;
          const kinds = era.obstacleKinds;
          state.obstacles.push({
            x: W + r,
            y: groundY - r + 2,
            r,
            legPhase: 0,
            kind: kinds[Math.floor(Math.random() * kinds.length)],
          });
          state.obstacleTimer = 60 + Math.floor(Math.random() * 60);
        }
      }

      // Spawn collectibles (era-specific tech tokens)
      state.collectibleTimer--;
      if (state.collectibleTimer <= 0) {
        const labels = era.collectibles;
        state.collectibles.push({
          x: W + 30,
          y: groundY - PLAYER_H - 20 - Math.random() * (H * 0.3),
          label: labels[Math.floor(Math.random() * labels.length)],
          type: Math.random() > 0.5 ? "cyan" : "violet",
          collected: false,
        });
        state.collectibleTimer = 80 + Math.floor(Math.random() * 60);
      }

      // Move obstacles
      state.obstacles = state.obstacles.filter((o) => {
        o.x -= state.speed;
        o.legPhase += 0.2;
        return o.x + o.r > -30;
      });

      // Move collectibles
      state.collectibles = state.collectibles.filter((c) => {
        if (!c.collected) c.x -= state.speed;
        return c.x > -60 && !c.collected;
      });

      // Snow (CMU era, skipped under reduced motion)
      if (era.hasSnow && !rmRef.current) {
        if (state.snow.length === 0) state.snow = makeSnow(W, H);
        for (const f of state.snow) {
          f.x += f.vx - state.speed * 0.15;
          f.y += f.vy;
          if (f.y > groundY || f.x < -5) {
            f.x = Math.random() * (W + 40);
            f.y = -5;
          }
        }
      } else if (state.snow.length > 0) {
        state.snow = [];
      }

      // Collision — obstacles (AABB vs circle hitbox)
      for (const o of state.obstacles) {
        const closestX = Math.max(p.x, Math.min(o.x, p.x + PLAYER_W));
        const closestY = Math.max(p.y, Math.min(o.y, p.y + PLAYER_H));
        const dx = closestX - o.x;
        const dy = closestY - o.y;
        if (dx * dx + dy * dy < (o.r - 3) * (o.r - 3)) {
          state.alive = false;
          if (state.score > state.highScore) {
            state.highScore = state.score;
            localStorage.setItem(HS_KEY, String(state.score));
          }
          const quips = era.gameOverQuips;
          setGameOverRef.current({
            score: state.score,
            best: state.highScore,
            eraIndex: state.eraIndex,
            quip: quips[Math.floor(Math.random() * quips.length)],
          });
          rafRef.current = requestAnimationFrame(loop);
          return;
        }
      }

      // Collision — collectibles
      for (const c of state.collectibles) {
        if (
          !c.collected &&
          p.x < c.x + 20 &&
          p.x + PLAYER_W > c.x - 20 &&
          p.y < c.y + 12 &&
          p.y + PLAYER_H > c.y - 12
        ) {
          c.collected = true;
          state.tokensCollected++;
        }
      }

      // ── Draw ────────────────────────────────────────────────────
      if (state.snow.length > 0) {
        ctx.fillStyle = "rgba(232,244,253,0.7)";
        for (const f of state.snow) {
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (const o of state.obstacles) drawObstacle(ctx, o);
      for (const c of state.collectibles) drawCollectible(ctx, c);
      drawPlayer(ctx, p);

      // Banner (era transition / milestone)
      if (state.banner) {
        drawBanner(ctx, state.banner, W, H);
        state.banner.framesLeft--;
        if (state.banner.framesLeft <= 0) state.banner = null;
      }

      // Score
      ctx.fillStyle = "#E8F4FD";
      ctx.font = `${Math.round(H * 0.07)}px 'JetBrains Mono', monospace`;
      ctx.textAlign = "right";
      ctx.textBaseline = "top";
      ctx.fillText(`${state.score}`, W - 16, 12);

      ctx.fillStyle = "#8899AA";
      ctx.font = `${Math.round(H * 0.055)}px 'JetBrains Mono', monospace`;
      ctx.fillText(`best: ${state.highScore}`, W - 16, 12 + Math.round(H * 0.08));

      // Era + speed badge
      ctx.fillStyle = "rgba(0,212,255,0.12)";
      const eraLabel = `${era.name.split("·")[0].trim()} · ×${state.speed.toFixed(1)}`;
      ctx.font = `${Math.round(H * 0.05)}px 'JetBrains Mono', monospace`;
      ctx.textAlign = "left";
      const badgeW = ctx.measureText(eraLabel).width + 16;
      ctx.fillRect(12, 12, badgeW, 22);
      ctx.fillStyle = era.groundColor;
      ctx.fillText(eraLabel, 20, 17);

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", handleKey);
      canvas.removeEventListener("touchstart", handleTouch);
      canvas.removeEventListener("click", handleClick);
      cancelAnimationFrame(rafRef.current);
    };
  }, [initState, jump]);

  return (
    <section id="game" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label mb-3">{'// career_mode'}</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-[#E8F4FD] mb-3">
            Run My Career
          </h2>
          <p className="text-[#8899AA] text-base mb-10">
            Mumbai → Mount Pleasant → Detroit. Dodge the bugs that were
            actually real. Collect the tech I actually used.
          </p>
        </motion.div>

        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-xl overflow-hidden border border-[#1E2D42] bg-[#0A0E1A]"
          style={{ boxShadow: "0 0 40px rgba(0,212,255,0.05)" }}
        >
          <canvas
            ref={canvasRef}
            className="block w-full"
            style={{ touchAction: "none", cursor: "pointer" }}
          />

          {gameOver && (
            <div
              className="absolute inset-0 flex items-center justify-center p-4 cursor-pointer"
              onClick={() => jump()}
            >
              <div
                className="glass-card rounded-xl px-6 py-5 text-center max-w-md w-full cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="font-display font-bold text-2xl text-[#E8F4FD]">
                  Game Over
                </p>
                <p className="mt-2 font-mono text-sm">
                  <span className="text-[#00D4FF]">Score: {gameOver.score}</span>
                  <span className="text-[#8899AA]"> · </span>
                  <span className="text-[#7C3AED]">Best: {gameOver.best}</span>
                </p>
                <p className="mt-3 text-xs text-[#8899AA] font-mono leading-relaxed">
                  {gameOver.quip}
                </p>
                <button
                  onClick={handleAskAi}
                  className="mt-4 w-full rounded-lg px-4 py-2.5 font-mono text-sm text-[#0A0E1A] font-semibold transition-opacity hover:opacity-90"
                  style={{ background: "linear-gradient(90deg, #00D4FF, #7C3AED)" }}
                >
                  Ask my AI about this era →
                </button>
                <button
                  onClick={() => jump()}
                  className="mt-2 w-full rounded-lg px-4 py-2 font-mono text-xs text-[#8899AA] border border-[#1E2D42] transition-colors hover:text-[#E8F4FD] hover:border-[#00D4FF]"
                >
                  Restart · SPACE or Tap
                </button>
              </div>
            </div>
          )}
        </motion.div>

        <p className="mt-4 text-center font-mono text-xs text-[#8899AA]">
          <span className="text-[#E8F4FD]">[SPACE]</span> Jump ·{" "}
          <span className="text-[#E8F4FD]">[↑]</span> Jump ·{" "}
          <span className="text-[#E8F4FD]">Double tap</span> Double Jump ·{" "}
          <span className="text-[#E8F4FD]">Mobile:</span> Tap to Jump
        </p>
      </div>
    </section>
  );
}
