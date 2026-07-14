// Era data + canvas drawing helpers for the Career Journey Runner.
// Pure data/functions — no React. Edit era content here without touching game logic.

export type ObstacleKind =
  | "envelope" // Mumbai: phishing emails
  | "spider" // Mumbai: dark-web spiders
  | "exam" // CMU: exam papers
  | "coffee" // CMU: coffee-cup deadlines
  | "sqlerror" // Detroit: SQL error blocks
  | "vbbug"; // Detroit: legacy VB.NET bugs

export interface EraObstacle {
  x: number;
  y: number;
  r: number;
  legPhase: number;
  kind: ObstacleKind;
}

export interface EraConfig {
  id: "mumbai" | "cmu" | "detroit";
  name: string;
  years: string;
  startScore: number;
  transitionBanner: string | null;
  skyTop: string;
  skyBottom: string;
  groundColor: string;
  collectibles: string[];
  obstacleKinds: ObstacleKind[];
  hasSnow: boolean;
  gameOverQuips: string[];
  askAiQuestion: string;
}

export const ERAS: EraConfig[] = [
  {
    id: "mumbai",
    name: "Mumbai, India · Web Access Global",
    years: "2019–2024",
    startScore: 0,
    transitionBanner: null,
    skyTop: "#1A1024",
    skyBottom: "#2A1520",
    groundColor: "#00D4FF",
    collectibles: ["NODE", "REACT", "TS"],
    obstacleKinds: ["envelope", "spider"],
    hasSnow: false,
    gameOverQuips: [
      "Phishing email: 1. Mayank: 0. He usually wins these.",
      "The dark web claims another victim. Deep Diver would've seen it coming.",
      "That email took 20 hours to process. Mayank got it down to 4.",
      "Mumbai traffic is easier to dodge than that.",
    ],
    askAiQuestion: "What did Mayank build at Web Access Global in Mumbai?",
  },
  {
    id: "cmu",
    name: "Mount Pleasant, MI · Central Michigan University",
    years: "2024–2025",
    startScore: 120,
    transitionBanner: "2024: Moved to Michigan for grad school 🎓",
    skyTop: "#0B1626",
    skyBottom: "#14243D",
    groundColor: "#00FFB3",
    collectibles: ["SAP", "ABAP", "ML"],
    obstacleKinds: ["exam", "coffee"],
    hasSnow: true,
    gameOverQuips: [
      "Crashed harder than a Michigan winter. Still finished with a 3.95.",
      "That exam had other plans. So did the audience — they voted him 2nd place.",
      "Coffee overdose. A known grad school hazard.",
      "The ERP Sim Competition was less brutal than this.",
    ],
    askAiQuestion: "What did Mayank study at Central Michigan University?",
  },
  {
    id: "detroit",
    name: "Detroit, MI · Voltava (DMS)",
    years: "2025–Now",
    startScore: 280,
    transitionBanner: "2025: Detroit — Application Engineering at DMS/Voltava 🏭",
    skyTop: "#0E1420",
    skyBottom: "#1A2233",
    groundColor: "#7C3AED",
    collectibles: ["FASTAPI", "GROQ", "SSRS"],
    obstacleKinds: ["sqlerror", "vbbug"],
    hasSnow: false,
    gameOverQuips: [
      "A legacy VB.NET bug got you. Mayank fixed six apps full of those.",
      "SQL error 547: foreign key constraint. He's seen worse.",
      "The plant floor is unforgiving. So is production.",
      "Even with Cursor AI, some bugs still bite. Dev time's still down 70% though.",
    ],
    askAiQuestion: "What did Mayank build at Voltava in Detroit?",
  },
];

export interface Milestone {
  score: number;
  text: string;
}

export const MILESTONES: Milestone[] = [
  { score: 60, text: "Email pipeline: 20hrs → 4hrs ⚡" },
  { score: 90, text: "75,000+ students on Medha STPC 📚" },
  { score: 150, text: "3.95 GPA 🎓" },
  { score: 210, text: "2nd place, stand-up comedy 🎤" },
  { score: 330, text: "12 SSRS reports · reporting time -40% 📊" },
  { score: 400, text: "Dev time -70% with Cursor AI 🚀" },
];

// ─── Color helpers ─────────────────────────────────────────────────
function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function lerpColor(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r},${g},${bl})`;
}

// ─── Obstacle sprites ──────────────────────────────────────────────
// Each sprite is drawn around the same circular hitbox (x, y, r) the
// collision code uses, so game feel is identical across kinds.

function drawEnvelope(ctx: CanvasRenderingContext2D, o: EraObstacle) {
  const { x, y, r } = o;
  const w = r * 2.1;
  const h = r * 1.5;
  const px = x - w / 2;
  const py = y - h / 2;
  ctx.fillStyle = "#EF4444";
  ctx.fillRect(px, py, w, h);
  // Flap
  ctx.strokeStyle = "#0A0E1A";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.lineTo(x, y + h * 0.1);
  ctx.lineTo(px + w, py);
  ctx.stroke();
  // Phishing hook glyph
  ctx.fillStyle = "#FDE8E8";
  ctx.font = `bold ${Math.round(r * 0.8)}px 'JetBrains Mono', monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("!", x, y + h * 0.22);
}

function drawSpider(ctx: CanvasRenderingContext2D, o: EraObstacle) {
  const { x, y, r, legPhase } = o;
  // Body
  ctx.fillStyle = "#EF4444";
  ctx.beginPath();
  ctx.arc(x, y, r * 0.85, 0, Math.PI * 2);
  ctx.fill();
  // Eyes
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(x - r * 0.3, y - r * 0.2, r * 0.16, 0, Math.PI * 2);
  ctx.arc(x + r * 0.3, y - r * 0.2, r * 0.16, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#0A0E1A";
  ctx.beginPath();
  ctx.arc(x - r * 0.27, y - r * 0.18, r * 0.08, 0, Math.PI * 2);
  ctx.arc(x + r * 0.27, y - r * 0.18, r * 0.08, 0, Math.PI * 2);
  ctx.fill();
  // 8 legs
  const legOff = Math.sin(legPhase) * 3;
  ctx.strokeStyle = "#EF4444";
  ctx.lineWidth = 2;
  for (let i = 0; i < 4; i++) {
    const spread = 0.25 + i * 0.22;
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(x + side * r * 0.5, y + r * (0.1 + i * 0.15));
      ctx.lineTo(x + side * r * (0.9 + spread * 0.4), y + r + (i % 2 === 0 ? legOff : -legOff));
      ctx.stroke();
    }
  }
  // Web thread above
  ctx.strokeStyle = "rgba(239,68,68,0.35)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, y - r * 0.85);
  ctx.lineTo(x, y - r * 2.2);
  ctx.stroke();
}

function drawExam(ctx: CanvasRenderingContext2D, o: EraObstacle) {
  const { x, y, r, legPhase } = o;
  const w = r * 1.7;
  const h = r * 2.1;
  const tilt = Math.sin(legPhase * 0.5) * 0.08;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(tilt);
  ctx.fillStyle = "#E8F4FD";
  ctx.fillRect(-w / 2, -h / 2, w, h);
  // Ruled lines
  ctx.strokeStyle = "#8899AA";
  ctx.lineWidth = 1;
  for (let i = 1; i <= 3; i++) {
    ctx.beginPath();
    ctx.moveTo(-w / 2 + 3, -h / 2 + (h / 4.5) * i);
    ctx.lineTo(w / 2 - 3, -h / 2 + (h / 4.5) * i);
    ctx.stroke();
  }
  // Red grade
  ctx.fillStyle = "#EF4444";
  ctx.font = `bold ${Math.round(r * 0.9)}px 'JetBrains Mono', monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("F", 0, h * 0.18);
  ctx.restore();
}

function drawCoffee(ctx: CanvasRenderingContext2D, o: EraObstacle) {
  const { x, y, r, legPhase } = o;
  const w = r * 1.5;
  const h = r * 1.7;
  // Cup
  ctx.fillStyle = "#EF4444";
  ctx.beginPath();
  ctx.moveTo(x - w / 2, y - h / 2);
  ctx.lineTo(x + w / 2, y - h / 2);
  ctx.lineTo(x + w * 0.36, y + h / 2);
  ctx.lineTo(x - w * 0.36, y + h / 2);
  ctx.closePath();
  ctx.fill();
  // Lid
  ctx.fillStyle = "#B91C1C";
  ctx.fillRect(x - w * 0.58, y - h * 0.62, w * 1.16, h * 0.16);
  // Steam (animated)
  ctx.strokeStyle = "rgba(232,244,253,0.5)";
  ctx.lineWidth = 1.5;
  for (const side of [-1, 0, 1]) {
    const sx = x + side * r * 0.4;
    ctx.beginPath();
    ctx.moveTo(sx, y - h * 0.7);
    ctx.quadraticCurveTo(
      sx + Math.sin(legPhase + side) * 4,
      y - h * 0.95,
      sx,
      y - h * 1.2
    );
    ctx.stroke();
  }
}

function drawSqlError(ctx: CanvasRenderingContext2D, o: EraObstacle) {
  const { x, y, r } = o;
  const w = r * 2.2;
  const h = r * 1.6;
  ctx.fillStyle = "#1A0E12";
  ctx.fillRect(x - w / 2, y - h / 2, w, h);
  ctx.strokeStyle = "#EF4444";
  ctx.lineWidth = 2;
  ctx.strokeRect(x - w / 2, y - h / 2, w, h);
  ctx.fillStyle = "#EF4444";
  ctx.font = `bold ${Math.round(r * 0.55)}px 'JetBrains Mono', monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("ERR", x, y - h * 0.16);
  ctx.fillText("547", x, y + h * 0.2);
}

function drawVbBug(ctx: CanvasRenderingContext2D, o: EraObstacle) {
  const { x, y, r, legPhase } = o;
  // Violet legacy bug body
  ctx.fillStyle = "#7C3AED";
  ctx.beginPath();
  ctx.arc(x, y, r * 0.9, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#EF4444";
  ctx.lineWidth = 2;
  ctx.stroke();
  // Antennae
  const wig = Math.sin(legPhase) * 3;
  ctx.strokeStyle = "#7C3AED";
  ctx.beginPath();
  ctx.moveTo(x - r * 0.3, y - r * 0.8);
  ctx.lineTo(x - r * 0.55, y - r * 1.35 + wig);
  ctx.moveTo(x + r * 0.3, y - r * 0.8);
  ctx.lineTo(x + r * 0.55, y - r * 1.35 - wig);
  ctx.stroke();
  // Legs
  for (const side of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(x + side * r * 0.6, y + r * 0.5);
    ctx.lineTo(x + side * r * 0.6 + side * 4, y + r + wig * side);
    ctx.stroke();
  }
  ctx.fillStyle = "#E8F4FD";
  ctx.font = `bold ${Math.round(r * 0.55)}px 'JetBrains Mono', monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("VB6", x, y);
}

export function drawObstacle(ctx: CanvasRenderingContext2D, o: EraObstacle) {
  switch (o.kind) {
    case "envelope":
      return drawEnvelope(ctx, o);
    case "spider":
      return drawSpider(ctx, o);
    case "exam":
      return drawExam(ctx, o);
    case "coffee":
      return drawCoffee(ctx, o);
    case "sqlerror":
      return drawSqlError(ctx, o);
    case "vbbug":
      return drawVbBug(ctx, o);
  }
}

// ─── Backdrops ─────────────────────────────────────────────────────
// Skyline silhouettes: normalized [x, heightRatio] building strips plus a
// per-era landmark, drawn twice for seamless wrap-around scrolling.

const SILHOUETTE = "rgba(19,27,48,0.9)";
const SILHOUETTE_FAR = "rgba(15,22,41,0.7)";

function drawBuildingStrip(
  ctx: CanvasRenderingContext2D,
  buildings: number[][],
  offsetX: number,
  W: number,
  groundY: number,
  color: string
) {
  ctx.fillStyle = color;
  for (const [bx, bw, bh] of buildings) {
    // Wrap the strip across 2×W so buildings scroll seamlessly
    let px = ((bx * W - offsetX) % (W * 2)) - W * 0.2;
    if (px < -W * 0.4) px += W * 2;
    ctx.fillRect(px, groundY - bh * groundY, bw * W, bh * groundY);
  }
}

// [xRatio, widthRatio, heightRatio]
const MUMBAI_FAR = [
  [0.05, 0.08, 0.28], [0.2, 0.06, 0.38], [0.34, 0.09, 0.3], [0.5, 0.05, 0.42],
  [0.62, 0.08, 0.33], [0.78, 0.07, 0.4], [0.92, 0.09, 0.29], [1.1, 0.06, 0.36],
  [1.25, 0.08, 0.31], [1.45, 0.07, 0.39], [1.6, 0.09, 0.27], [1.8, 0.06, 0.35],
];
const CMU_FAR = [
  [0.05, 0.12, 0.18], [0.25, 0.1, 0.22], [0.45, 0.14, 0.16], [0.68, 0.11, 0.2],
  [0.88, 0.13, 0.17], [1.1, 0.12, 0.21], [1.35, 0.1, 0.15], [1.6, 0.13, 0.19],
  [1.82, 0.11, 0.17],
];
const DETROIT_FAR = [
  [0.04, 0.07, 0.45], [0.16, 0.05, 0.55], [0.28, 0.08, 0.4], [0.42, 0.06, 0.6],
  [0.55, 0.07, 0.48], [0.7, 0.05, 0.52], [0.82, 0.08, 0.38], [0.95, 0.06, 0.57],
  [1.12, 0.07, 0.44], [1.3, 0.06, 0.5], [1.48, 0.08, 0.42], [1.68, 0.05, 0.58],
  [1.85, 0.07, 0.46],
];

function drawMumbaiLandmark(
  ctx: CanvasRenderingContext2D,
  x: number,
  groundY: number,
  scale: number
) {
  // Gateway of India: arch with side towers
  const h = groundY * 0.5 * scale;
  const w = h * 0.9;
  ctx.fillStyle = SILHOUETTE;
  // Side towers
  ctx.fillRect(x - w / 2, groundY - h, w * 0.2, h);
  ctx.fillRect(x + w * 0.3, groundY - h, w * 0.2, h);
  // Center block
  ctx.fillRect(x - w * 0.3, groundY - h * 0.85, w * 0.6, h * 0.85);
  // Arch opening (carved out with bg — draw as darker void)
  ctx.fillStyle = "rgba(10,14,26,0.9)";
  ctx.beginPath();
  ctx.moveTo(x - w * 0.16, groundY);
  ctx.lineTo(x - w * 0.16, groundY - h * 0.45);
  ctx.arc(x, groundY - h * 0.45, w * 0.16, Math.PI, 0);
  ctx.lineTo(x + w * 0.16, groundY);
  ctx.closePath();
  ctx.fill();
  // Domes on towers
  ctx.fillStyle = SILHOUETTE;
  ctx.beginPath();
  ctx.arc(x - w * 0.4, groundY - h, w * 0.11, Math.PI, 0);
  ctx.arc(x + w * 0.4, groundY - h, w * 0.11, Math.PI, 0);
  ctx.fill();
  // Palm tree beside
  const palmX = x + w * 0.85;
  ctx.strokeStyle = SILHOUETTE;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(palmX, groundY);
  ctx.quadraticCurveTo(palmX + 4, groundY - h * 0.5, palmX + 10, groundY - h * 0.72);
  ctx.stroke();
  ctx.lineWidth = 2;
  for (let a = 0; a < 5; a++) {
    const ang = Math.PI + (a / 4) * Math.PI;
    ctx.beginPath();
    ctx.moveTo(palmX + 10, groundY - h * 0.72);
    ctx.quadraticCurveTo(
      palmX + 10 + Math.cos(ang) * 14,
      groundY - h * 0.72 + Math.sin(ang) * 6 - 4,
      palmX + 10 + Math.cos(ang) * 22,
      groundY - h * 0.72 + Math.sin(ang) * 10 + 2
    );
    ctx.stroke();
  }
}

function drawCmuLandmark(
  ctx: CanvasRenderingContext2D,
  x: number,
  groundY: number,
  scale: number
) {
  // Campus clock tower
  const h = groundY * 0.55 * scale;
  const w = h * 0.22;
  ctx.fillStyle = SILHOUETTE;
  ctx.fillRect(x - w / 2, groundY - h, w, h);
  // Pointed roof
  ctx.beginPath();
  ctx.moveTo(x - w * 0.7, groundY - h);
  ctx.lineTo(x, groundY - h * 1.22);
  ctx.lineTo(x + w * 0.7, groundY - h);
  ctx.closePath();
  ctx.fill();
  // Clock face
  ctx.fillStyle = "rgba(0,255,179,0.35)";
  ctx.beginPath();
  ctx.arc(x, groundY - h * 0.82, w * 0.3, 0, Math.PI * 2);
  ctx.fill();
  // Low campus hall beside
  ctx.fillStyle = SILHOUETTE;
  ctx.fillRect(x + w, groundY - h * 0.35, w * 3.2, h * 0.35);
  ctx.beginPath();
  ctx.moveTo(x + w, groundY - h * 0.35);
  ctx.lineTo(x + w * 2.6, groundY - h * 0.5);
  ctx.lineTo(x + w * 4.2, groundY - h * 0.35);
  ctx.closePath();
  ctx.fill();
}

function drawDetroitLandmark(
  ctx: CanvasRenderingContext2D,
  x: number,
  groundY: number,
  scale: number
) {
  // Factory with smokestacks
  const h = groundY * 0.32 * scale;
  const w = h * 2.4;
  ctx.fillStyle = SILHOUETTE;
  // Sawtooth factory roof
  ctx.beginPath();
  ctx.moveTo(x - w / 2, groundY);
  ctx.lineTo(x - w / 2, groundY - h * 0.6);
  for (let i = 0; i < 4; i++) {
    const sx = x - w / 2 + (w / 4) * i;
    ctx.lineTo(sx + w / 8, groundY - h);
    ctx.lineTo(sx + w / 4, groundY - h * 0.6);
  }
  ctx.lineTo(x + w / 2, groundY);
  ctx.closePath();
  ctx.fill();
  // Smokestacks
  ctx.fillRect(x - w * 0.38, groundY - h * 1.6, w * 0.06, h * 1.6);
  ctx.fillRect(x - w * 0.22, groundY - h * 1.45, w * 0.06, h * 1.45);
  // Smoke puffs
  ctx.fillStyle = "rgba(136,153,170,0.15)";
  ctx.beginPath();
  ctx.arc(x - w * 0.35, groundY - h * 1.75, w * 0.06, 0, Math.PI * 2);
  ctx.arc(x - w * 0.31, groundY - h * 1.9, w * 0.08, 0, Math.PI * 2);
  ctx.arc(x - w * 0.19, groundY - h * 1.6, w * 0.05, 0, Math.PI * 2);
  ctx.fill();
}

function drawEraScene(
  ctx: CanvasRenderingContext2D,
  eraId: EraConfig["id"],
  W: number,
  groundY: number,
  scrollX: number,
  alpha: number
) {
  ctx.save();
  ctx.globalAlpha = alpha;
  const far = eraId === "mumbai" ? MUMBAI_FAR : eraId === "cmu" ? CMU_FAR : DETROIT_FAR;
  drawBuildingStrip(ctx, far, scrollX * 0.5, W, groundY, SILHOUETTE_FAR);
  // Landmark scrolls slightly faster (nearer layer), wraps across 2×W
  let lx = ((W * 0.7 - scrollX) % (W * 2));
  if (lx < -W * 0.5) lx += W * 2;
  if (lx > W * 1.5) lx -= W * 2;
  if (eraId === "mumbai") drawMumbaiLandmark(ctx, lx, groundY, 1);
  else if (eraId === "cmu") drawCmuLandmark(ctx, lx, groundY, 1);
  else drawDetroitLandmark(ctx, lx, groundY, 1);
  ctx.restore();
}

/**
 * Draws sky gradient + parallax skyline for the active era, cross-fading
 * from the previous era while blendT < 1.
 */
export function drawBackdrop(
  ctx: CanvasRenderingContext2D,
  era: EraConfig,
  prevEra: EraConfig | null,
  blendT: number,
  W: number,
  H: number,
  groundY: number,
  scrollX: number
) {
  // Sky gradient (colors lerped between eras during transition)
  const from = prevEra && blendT < 1 ? prevEra : era;
  const top = lerpColor(from.skyTop, era.skyTop, Math.min(blendT, 1));
  const bottom = lerpColor(from.skyBottom, era.skyBottom, Math.min(blendT, 1));
  const grad = ctx.createLinearGradient(0, 0, 0, groundY);
  grad.addColorStop(0, top);
  grad.addColorStop(1, bottom);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Skylines cross-fade
  if (prevEra && blendT < 1) {
    drawEraScene(ctx, prevEra.id, W, groundY, scrollX, 1 - blendT);
    drawEraScene(ctx, era.id, W, groundY, scrollX, blendT);
  } else {
    drawEraScene(ctx, era.id, W, groundY, scrollX, 1);
  }
}
