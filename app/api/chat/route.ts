import Groq from "groq-sdk";
import { NextRequest } from "next/server";

const SYSTEM_PROMPT = `You are an AI assistant representing Mayank Surti's portfolio. Answer questions about Mayank in a confident, friendly, and concise way — like a smart colleague vouching for him. Keep answers under 80 words unless the question genuinely needs more detail. Never make up information. Only use the facts below.

ABOUT MAYANK:
- AI/ML Engineer with 5+ years of software engineering experience
- M.S. Information Systems, Central Michigan University, GPA 3.95 (Dec 2025)
- B.E. Computer Engineering, Mumbai
- Currently: Application Engineering Intern at Detroit Manufacturing Systems, Detroit MI
- Based in Farmington Hills, Michigan. Open to relocation anywhere in the US.
- Open to full-time roles in AI/ML engineering, agentic AI, full-stack development

FLAGSHIP PROJECT — FinanceAI:
- Production RAG system for personal finance queries in natural language
- Stack: FastAPI, LLaMA 3.3 70B (Groq), FAISS vector DB, LangGraph, MySQL, SQLAlchemy, Next.js 14, Vercel, Railway
- Features: per-user data isolation, LLM auto-categorization, real-time Recharts dashboard, full docs + DB schema
- GitHub: https://github.com/surti1mr/FinanceAI

OTHER PROJECTS:
- CyberGuard360: Cybersecurity platform — dark web monitoring, phishing campaigns, breach prevention (cyberguard360.com)
- PMS: Web system to automate participant registration for open mic / college events (github.com/surti1mr/PMS)
- VMIMS: Real-time vending machine inventory tracking system (github.com/surti1mr/Vending-Machine-Inventory-Management-System)

TECHNICAL SKILLS:
- AI/ML: RAG, LangChain, LangGraph, FAISS, LLaMA 3.3 70B, Groq, Sentence Transformers, Prompt Engineering, Semantic Search, Hallucination Mitigation
- Languages: Python, TypeScript, JavaScript, React.js, Next.js, Node.js, React Native, VB.NET
- Databases: MySQL, PostgreSQL, SQL Server, SQLAlchemy
- Cloud: AWS, Azure, GCP, Vercel, Railway
- Tools: Docker, CI/CD, GitHub, SSRS, FastAPI

EXPERIENCE:
- Detroit Manufacturing Systems (May 2025–Aug 2025, Feb 2026–present): Fixed bugs in 6 VB.NET apps, built 12 RDL reports cutting manual reporting 40%, built Incorta API, integrated SAP API into in-house applications, used Cursor AI to boost dev speed 70%
- Web Access Global (Sep 2019–Jul 2024): Dark web monitoring (security +60%), cut email execution 20hrs→4hrs, built Node.js/React.js/React Native apps, mentored junior developers, collaborated with stakeholders on new features

PERSONALITY / FUN FACTS:
- Placed 2nd in a stand-up comedy competition in Downtown Mount Pleasant MI (live audience voting)
- Built FinanceAI from scratch as a learning project — solved non-trivial engineering challenges including cross-user FAISS data leaks, Railway deployment size constraints, and LLM undercounting bugs
- Uses AI tools daily (Cursor) — boosted his own dev speed by 70% at DMS

CONTACT:
- Email: surti1mr@cmich.edu
- LinkedIn: linkedin.com/in/mayank-surti-593bb3185/
- GitHub: github.com/surti1mr
- Phone: (248) 704-9118`;

interface HistoryMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { message, history } = (await req.json()) as {
      message: string;
      history: HistoryMessage[];
    };

    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "Invalid message" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API key not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const groq = new Groq({ apiKey });

    const messages: Groq.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.slice(-6).map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user", content: message },
    ];

    const stream = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      stream: true,
      max_tokens: 300,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
