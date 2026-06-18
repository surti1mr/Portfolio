# Mayank Surti — Personal Portfolio

> AI/ML Engineer · Full-Stack Developer · 2nd Place Stand-Up Comedian 🎤

A production-ready personal portfolio website built with Next.js 14, Tailwind CSS, and Framer Motion. Features a live AI chat panel powered by Groq + LLaMA 3.3 70B, a playable canvas game, and fully detailed project showcases.

**Live:** [mayanksurti.dev](https://mayanksurti.dev) &nbsp;|&nbsp; **GitHub:** [github.com/surti1mr/Portfolio](https://github.com/surti1mr/Portfolio)

---

## Features

### AI Chat Panel (Hero Section)
- Powered by **Groq API** with `llama-3.3-70b-versatile`
- Answers questions about Mayank in real time using a custom system prompt
- Streams responses chunk by chunk — no waiting for the full answer
- Auto-demo on load: types a question and streams a live answer
- Suggested question chips, conversation history (last 6 messages), graceful error fallback
- API key stays server-side only via Next.js App Router API route

### Sections
| Section | Description |
|---|---|
| **Hero** | Full-viewport with typewriter cycling roles, live AI chat panel, 🇺🇸 US availability badge |
| **About** | Bio + 4 animated stat cards (5+ yrs exp, 3.95 GPA, 2nd comedy, 70% dev speed) |
| **Tech Stack** | Interactive badge cloud across 4 categories — AI/ML, Languages, Databases, Cloud |
| **Experience** | Alternating vertical timeline — Voltava, Web Access Global, CMU M.S. |
| **Projects** | FinanceAI featured card + 6 detailed secondary cards, each with accordions & role systems |
| **Stand-Up Comedy** | Spotlight-style section, blockquote, 2nd place competition result |
| **Stack Jump Game** | Playable Canvas endless runner — dodge bugs, collect tech badges, save high score |
| **Contact** | Contact info + mailto form |
| **Footer** | Social links + signature line |

### Projects Showcased
- **FinanceAI** — Production RAG system (FastAPI + LLaMA 3.3 70B + FAISS + Next.js 14)
- **CyberGuard360** — Cybersecurity platform for MSPs (phishing sim, dark web monitoring)
- **PMS** — Flask event management app with 3-role access system and RESTful API
- **VMIMS** — SAP ABAP Module Pool program with 5 custom tables and 7 system modules
- **Dijori** — Secure digital vault app (double-encrypted, trusted contacts, trigger-based sharing)
- **Performance Fitness Concepts** — Metabolic assessment + personalized health planning
- **Medha STPC** — EdTech platform with 4-level role hierarchy, 75,000+ students

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + CSS custom properties |
| Animations | Framer Motion |
| AI | Groq SDK · LLaMA 3.3 70B |
| Fonts | Space Grotesk · Inter · JetBrains Mono (Google Fonts via `next/font`) |
| Game | HTML5 Canvas (pure React — no libraries) |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites
- Node.js 18+
- A [Groq API key](https://console.groq.com) (free tier available)

### Installation

```bash
git clone https://github.com/surti1mr/Portfolio.git
cd Portfolio
npm install
```

### Environment Setup

Create a `.env.local` file in the root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

> The API key is used **server-side only** in `/app/api/chat/route.ts` — it never reaches the browser.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm start
```

---

## Project Structure

```
/app
  layout.tsx          ← Fonts, metadata, SEO
  page.tsx            ← Assembles all sections
  /api/chat
    route.ts          ← Groq streaming API route (server-side)
/components
  Navbar.tsx          ← Fixed navbar with blur + mobile hamburger
  HeroSection.tsx     ← Typewriter + AI chat panel + US availability badge
  HeroChatPanel.tsx   ← Live AI chat UI with streaming + demo + chips
  AboutSection.tsx    ← Bio + animated stat cards
  TechStackSection.tsx← Badge cloud with hover glows
  ExperienceSection.tsx← Alternating vertical timeline
  ProjectsSection.tsx ← FinanceAI featured + 6 detailed secondary cards
  ComedySection.tsx   ← Stand-up comedy section with spotlight effect
  StackJumpGame.tsx   ← Canvas endless runner game
  ContactSection.tsx  ← Contact info + mailto form
  Footer.tsx          ← Social links + signature
/hooks
  useTypewriter.ts    ← Cycles through role strings with type/delete animation
  useReducedMotion.ts ← Respects prefers-reduced-motion
```

---

## Customization

| What to change | Where |
|---|---|
| AI chatbot knowledge base | `app/api/chat/route.ts` → `SYSTEM_PROMPT` |
| Resume file | Replace `public/resume.pdf` |
| Contact info | `components/ContactSection.tsx` |
| Experience bullets | `components/ExperienceSection.tsx` |
| Project cards | `components/ProjectsSection.tsx` |
| Color palette | `app/globals.css` → CSS variables |

---

## Deployment

This site is optimized for **Vercel**:

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Add `GROQ_API_KEY` as an environment variable in Vercel project settings
4. Deploy

---

## License

MIT — feel free to use this as a template. If you do, a credit or star would be appreciated!

---

*Built by Mayank Surti · Next.js · Tailwind · Framer Motion · Groq*
