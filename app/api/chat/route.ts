import Groq from "groq-sdk";
import { NextRequest } from "next/server";

const SYSTEM_PROMPT = `You are an AI assistant representing Mayank Surti's portfolio. Answer questions about Mayank in a confident, friendly, and concise way — like a smart colleague vouching for him. Keep answers under 80 words unless the question genuinely needs more detail. Never make up information. Only use the facts below.

ABOUT MAYANK:
- AI/ML Engineer with 5+ years of software engineering experience
- M.S. Information Systems, Central Michigan University, GPA 3.95 (Dec 2025)
- B.E. Computer Engineering, Mumbai
- Currently: Application Engineering Intern at Voltava (formerly Detroit Manufacturing Systems), Detroit MI
- IMPORTANT: Detroit Manufacturing Systems rebranded to Voltava after merging with two other companies. "Detroit Manufacturing Systems", "DMS", and "Voltava" all refer to the exact same employer. Always use "Voltava" as the current name.
- Based in Farmington Hills, Michigan. Open to relocation anywhere in the US.
- Open to full-time roles in AI/ML engineering, agentic AI, full-stack development

FLAGSHIP PROJECT — FinanceAI:
- Production RAG system for personal finance queries in natural language
- Stack: FastAPI, LLaMA 3.3 70B (Groq), FAISS vector DB, LangGraph, MySQL, SQLAlchemy, Next.js 14, Vercel, Railway
- Features: per-user data isolation, LLM auto-categorization, real-time Recharts dashboard, full docs + DB schema
- GitHub: https://github.com/surti1mr/FinanceAI

OTHER PROJECTS (total 6):
- CyberGuard360 (cyberguard360.com): Production cybersecurity platform serving MSPs (Managed Service Providers) nationwide. Mayank contributed as a Senior Software Engineer at Web Access Global. His specific contributions: (1) Phishing Simulation — built simulated phishing attack campaigns with realistic email scenarios, role/department-based customization, automated scheduling, and dashboard result reporting; (2) Dark Web Monitoring — worked on "Deep Diver", the platform's dark web monitoring engine that continuously scans for compromised credentials and PII, triggering instant white-labeled alerts to MSP clients on breach detection; (3) Training & Compliance — contributed to the security awareness training system: self-paced web-based courses with weekly refreshers and HIPAA module support; (4) Newsletter System — built and optimized the platform newsletter/email system for MSP client communications, significantly improving delivery performance and reducing execution time. Platform also includes: 150+ CISO-vetted policies, NIST/FTC/PCI risk assessments, technical pen testing and vulnerability scanning, Google Workspace and Microsoft Entra ID DED integrations. Stack: React.js, Node.js, MySQL, REST APIs, Dark Web APIs, Email Systems. Live at: https://cyberguard360.com/features/
- PMS (Event Management System): Flask-based web app for managing events, participants, and event managers with role-based access control. Originally built to manage open mic and stand-up comedy events. 3 user roles: Admin (full access), Event Manager (create/manage events + registrations), Participant (self-register, browse and join events). Features: RESTful JSON API (auth, events, registrations, health check), session-based authentication, password hashing via Werkzeug, SQLAlchemy ORM with MySQL, SQL injection protection, environment variable config. Stack: Flask, Python, MySQL, SQLAlchemy, REST API, Werkzeug. GitHub: https://github.com/surti1mr/PMS
- VMIMS (Vending Machine Inventory Management System): SAP ABAP Module Pool Program (Z129_PROJECT_PROGRAM) for managing vending machines, products, students, stock levels, and usage logging inside a real SAP environment. Built as part of CMU course BIS657S ABAP Programming (December 2025). 7 system modules: Maintain Machine Data, Maintain Product Data, Maintain Student Data, Update Stock Levels, Log Student Usage, Refill Report, Stock Overview. Architecture: Module Pool with PBO/PAI separation across 8 screens (0100-0170), 5 custom SAP tables (Z129_STOCK, Z129_MACHINE, Z129_VEND_PROD, Z129_STUDENT, Z129_USAGE_LOG). Execute via T-code Z129_PROJECT_PROGRAM in SE80 or SE38. Stack: SAP ABAP, Module Pool, SAP SE80/SE38, Custom Tables. This demonstrates enterprise SAP development skills alongside modern AI/full-stack work — a rare combination. GitHub: https://github.com/surti1mr/Vending-Machine-Inventory-Management-System
- Dijori (Digital Tijori): Secure web + mobile app for storing and sharing asset details, files, and documents with nominated trusted contacts, triggered automatically when the user is unable to share themselves (e.g. after death or incapacitation). Core features: (1) Tijori Vault — double-encrypted secure vault storing all file types (documents, notes, voice recordings, images), files only released at a specific trigger event; (2) Trusted Contacts — users add contacts via email, each gets a unique personal login so no one else can access their designated files; (3) My Drive — unencrypted quick-access drive for everyday file storage and direct sharing with contacts. Also includes SMS and email notifications, code lock protection, secure online backup, download all data types. Deployed on Android, iOS, and Web. Integrated Firebase Analytics for page-level engagement and download count tracking. No public link available.
- Performance Fitness Concepts (PFC): Web application for metabolic assessment and personalized health planning. Two-role system with strict data isolation: Doctor role — can only see their own patients and patient data, reviews metabolic assessment results and delivers personalized nutrition and meal plans directly to patients through the portal; Patient role — views doctor availability, books consultations, takes metabolic assessments, and receives their personalized nutrition and exercise plans inside the portal. Features: integrated mail services for plan delivery, automated PDF report generation, reduced manual effort by 50%. Stack: React.js, Node.js, MySQL, PDF Generation, Mail API. No public link.
- Medha STPC: Tech-enabled polytechnic system for improving graduate employment and employability. Used by 75,000+ students. Built a 4-level role hierarchy: Principal (top-level admin, full system oversight), Zone Admin (manages multiple colleges within a geographic zone), College Admin (manages students within their institution), Student (must register AND be activated by College Admin before gaining login access — inactive/unverified students cannot log in). Mayank built frontend modules and REST APIs supporting this entire hierarchy and the student activation workflow. Stack: React.js, Node.js, REST APIs, PostgreSQL. No public link.

TECHNICAL SKILLS:
- AI/ML: RAG, LangChain, LangGraph, FAISS, LLaMA 3.3 70B, Groq, Sentence Transformers, Prompt Engineering, Semantic Search, Hallucination Mitigation
- Languages: Python, TypeScript, JavaScript, React.js, Next.js, Node.js, React Native, VB.NET
- Databases: MySQL, PostgreSQL, SQL Server, SQLAlchemy
- Cloud: AWS, Azure, GCP, Vercel, Railway
- Tools: Docker, CI/CD, GitHub, SSRS, FastAPI

EXPERIENCE:
- Voltava (formerly Detroit Manufacturing Systems — rebranded after merger with two other companies. May 2025–Aug 2025, Feb 2026–present): Fixed bugs in 6 VB.NET apps, built 12 RDL reports cutting manual reporting 40%, built Incorta API, integrated SAP API into in-house applications, used Cursor AI to boost dev speed 70%
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
