"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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
const COLLECTIBLE_LABELS = ["PY", "JS", "AI", "TS", "SQL", "GO", "RS"];
const GAME_OVER_MESSAGES = [
  "Bugs happen. Ship anyway.",
  "Segfault is just spicy undefined behavior.",
  "Have you tried turning it off and on again?",
  "git commit -m 'fix: dodge bugs better'",
  "404: Coordination not found.",
];

// ─── Types ─────────────────────────────────────────────────────────
interface Player {
  x: number;
  y: number;
  vy: number;
  jumpsLeft: number;
  isOnGround: boolean;
}

interface Obstacle {
  x: number;
  y: number;
  r: number;
  legPhase: number;
}

interface Collectible {
  x: number;
  y: number;
  label: string;
  type: "cyan" | "violet";
  collected: boolean;
}

interface GameState {
  player: Player;
  obstacles: Obstacle[];
  collectibles: Collectible[];
  score: number;
  highScore: number;
  speed: number;
  frameCount: number;
  alive: boolean;
  started: boolean;
  gameOverMsg: string;
  obstacleTimer: number;
  collectibleTimer: number;
  speedTimer: number;
  lastTime: number;
}

// ─── Drawing helpers ───────────────────────────────────────────────
function drawPlayer(ctx: CanvasRenderingContext2D, p: Player) {
  const { x, y } = p;
  ctx.fillStyle = "#E8F4FD";
  ctx.fillRect(x, y, PLAYER_W, PLAYER_H);

  // { } braces label
  ctx.fillStyle = "#00D4FF";
  ctx.font = "bold 14px 'JetBrains Mono', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("{ }", x + PLAYER_W / 2, y + PLAYER_H / 2);
}

function drawObstacle(ctx: CanvasRenderingContext2D, o: Obstacle) {
  const { x, y, r, legPhase } = o;
  // Body
  ctx.fillStyle = "#EF4444";
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();

  // Eyes
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(x - r * 0.35, y - r * 0.2, r * 0.18, 0, Math.PI * 2);
  ctx.arc(x + r * 0.35, y - r * 0.2, r * 0.18, 0, Math.PI * 2);
  ctx.fill();

  // Pupils
  ctx.fillStyle = "#0A0E1A";
  ctx.beginPath();
  ctx.arc(x - r * 0.32, y - r * 0.18, r * 0.09, 0, Math.PI * 2);
  ctx.arc(x + r * 0.32, y - r * 0.18, r * 0.09, 0, Math.PI * 2);
  ctx.fill();

  // Animated legs
  const legOff = Math.sin(legPhase) * 4;
  ctx.strokeStyle = "#EF4444";
  ctx.lineWidth = 2;
  for (let i = -1; i <= 1; i += 2) {
    ctx.beginPath();
    ctx.moveTo(x + i * r * 0.6, y + r * 0.6);
    ctx.lineTo(x + i * r * 0.6 + i * 4, y + r + legOff);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + i * r * 0.2, y + r * 0.7);
    ctx.lineTo(x + i * r * 0.2 + i * 3, y + r - legOff);
    ctx.stroke();
  }
}

function drawCollectible(ctx: CanvasRenderingContext2D, c: Collectible) {
  if (c.collected) return;
  const color = c.type === "cyan" ? "#00D4FF" : "#7C3AED";
  const borderColor = c.type === "cyan" ? "rgba(0,212,255,0.3)" : "rgba(124,58,237,0.3)";

  // Pill background
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

// ─── Main component ────────────────────────────────────────────────
export default function StackJumpGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState | null>(null);
  const rafRef = useRef<number>(0);
  const reducedMotion = useReducedMotion();

  const initState = useCallback((canvas: HTMLCanvasElement): GameState => {
    const groundY = canvas.height * GROUND_Y_RATIO;
    const highScore = Number(localStorage.getItem("stackjump_hs") || 0);
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
      gameOverMsg: "",
      obstacleTimer: 80,
      collectibleTimer: 120,
      speedTimer: 0,
      lastTime: 0,
    };
  }, []);

  const jump = useCallback(() => {
    const state = stateRef.current;
    if (!state) return;

    if (!state.started) {
      state.started = true;
      return;
    }

    if (!state.alive) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      stateRef.current = initState(canvas);
      stateRef.current.started = true;
      return;
    }

    if (state.player.jumpsLeft > 0) {
      state.player.vy = state.player.isOnGround ? JUMP_FORCE : DOUBLE_JUMP_FORCE;
      state.player.jumpsLeft -= 1;
      state.player.isOnGround = false;
    }
  }, [initState]);

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
        stateRef.current.player.y = groundY - PLAYER_H;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    // Input handlers
    const handleKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
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

      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = "#0A0E1A";
      ctx.fillRect(0, 0, W, H);

      // Ground line
      ctx.strokeStyle = "#00D4FF";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#00D4FF";
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
        ctx.fillText("Stack Jump", W / 2, H * 0.38);
        ctx.font = `${Math.round(H * 0.065)}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = "#00D4FF";
        ctx.fillText("Press SPACE or Tap to Start", W / 2, H * 0.58);
        drawPlayer(ctx, state.player);
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      if (!state.alive) {
        // Game over screen
        ctx.fillStyle = "#E8F4FD";
        ctx.font = `bold ${Math.round(H * 0.1)}px 'Space Grotesk', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Game Over", W / 2, H * 0.3);

        ctx.fillStyle = "#00D4FF";
        ctx.font = `${Math.round(H * 0.07)}px 'JetBrains Mono', monospace`;
        ctx.fillText(`Score: ${state.score}`, W / 2, H * 0.48);

        ctx.fillStyle = "#7C3AED";
        ctx.fillText(`Best: ${state.highScore}`, W / 2, H * 0.6);

        ctx.fillStyle = "#8899AA";
        ctx.font = `${Math.round(H * 0.055)}px 'JetBrains Mono', monospace`;
        ctx.fillText(state.gameOverMsg, W / 2, H * 0.73);

        ctx.fillStyle = "#00D4FF";
        ctx.font = `${Math.round(H * 0.055)}px 'JetBrains Mono', monospace`;
        ctx.fillText("Press SPACE to Restart", W / 2, H * 0.87);

        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      // ── Update ──────────────────────────────────────────────────

      state.frameCount++;
      state.speedTimer++;

      // Speed up
      if (state.speedTimer >= SPEED_INTERVAL_MS / 16.67) {
        state.speed += SPEED_INCREMENT;
        state.speedTimer = 0;
      }

      // Score
      state.score = Math.floor(state.frameCount / 6);

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

      // Spawn obstacles
      state.obstacleTimer--;
      if (state.obstacleTimer <= 0) {
        const r = 14 + Math.random() * 8;
        state.obstacles.push({
          x: W + r,
          y: groundY - r + 2,
          r,
          legPhase: 0,
        });
        state.obstacleTimer = 60 + Math.floor(Math.random() * 60);
      }

      // Spawn collectibles
      state.collectibleTimer--;
      if (state.collectibleTimer <= 0) {
        state.collectibles.push({
          x: W + 20,
          y: groundY - PLAYER_H - 20 - Math.random() * (H * 0.3),
          label: COLLECTIBLE_LABELS[Math.floor(Math.random() * COLLECTIBLE_LABELS.length)],
          type: Math.random() > 0.5 ? "cyan" : "violet",
          collected: false,
        });
        state.collectibleTimer = 80 + Math.floor(Math.random() * 60);
      }

      // Move + draw obstacles
      state.obstacles = state.obstacles.filter((o) => {
        o.x -= state.speed;
        o.legPhase += 0.2;
        return o.x + o.r > -10;
      });

      // Move + draw collectibles
      state.collectibles = state.collectibles.filter((c) => {
        if (!c.collected) c.x -= state.speed;
        return c.x > -40 && !c.collected;
      });

      // Collision — obstacles (AABB vs circle)
      for (const o of state.obstacles) {
        const closestX = Math.max(p.x, Math.min(o.x, p.x + PLAYER_W));
        const closestY = Math.max(p.y, Math.min(o.y, p.y + PLAYER_H));
        const dx = closestX - o.x;
        const dy = closestY - o.y;
        if (dx * dx + dy * dy < (o.r - 3) * (o.r - 3)) {
          state.alive = false;
          if (state.score > state.highScore) {
            state.highScore = state.score;
            localStorage.setItem("stackjump_hs", String(state.score));
          }
          state.gameOverMsg =
            GAME_OVER_MESSAGES[
              Math.floor(Math.random() * GAME_OVER_MESSAGES.length)
            ];
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
          state.score += 10;
        }
      }

      // ── Draw ────────────────────────────────────────────────────
      for (const o of state.obstacles) drawObstacle(ctx, o);
      for (const c of state.collectibles) drawCollectible(ctx, c);
      drawPlayer(ctx, p);

      // Score
      ctx.fillStyle = "#E8F4FD";
      ctx.font = `${Math.round(H * 0.07)}px 'JetBrains Mono', monospace`;
      ctx.textAlign = "right";
      ctx.textBaseline = "top";
      ctx.fillText(`${state.score}`, W - 16, 12);

      ctx.fillStyle = "#8899AA";
      ctx.font = `${Math.round(H * 0.055)}px 'JetBrains Mono', monospace`;
      ctx.fillText(`best: ${state.highScore}`, W - 16, 12 + Math.round(H * 0.08));

      // Speed badge
      ctx.fillStyle = "rgba(0,212,255,0.15)";
      ctx.fillRect(12, 12, 72, 22);
      ctx.fillStyle = "#00D4FF";
      ctx.font = `${Math.round(H * 0.055)}px 'JetBrains Mono', monospace`;
      ctx.textAlign = "left";
      ctx.fillText(`×${state.speed.toFixed(1)}`, 18, 14);

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
          <p className="section-label mb-3">{'// take_a_break'}</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-[#E8F4FD] mb-3">
            Play a Game
          </h2>
          <p className="text-[#8899AA] text-base mb-10">
            Jump over the bugs. Collect the tech. Don&apos;t crash.
          </p>
        </motion.div>

        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-xl overflow-hidden border border-[#1E2D42] bg-[#0A0E1A]"
          style={{ boxShadow: "0 0 40px rgba(0,212,255,0.05)" }}
        >
          <canvas
            ref={canvasRef}
            className="block w-full"
            style={{ touchAction: "none", cursor: "pointer" }}
          />
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
