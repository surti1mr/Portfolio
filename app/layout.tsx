import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mayank Surti | AI Application Engineer",
  description:
    "Full-stack AI engineer specializing in agentic AI, RAG pipelines, and LLM-powered applications. Building production systems with LangGraph, FastAPI, and Next.js.",
  keywords: [
    "AI engineer",
    "agentic AI",
    "RAG",
    "LangGraph",
    "LangChain",
    "FAISS",
    "FastAPI",
    "Next.js",
    "LLM",
    "Groq",
    "full-stack AI developer",
  ],
  openGraph: {
    title: "Mayank Surti | AI Application Engineer",
    description:
      "Building production AI systems and occasionally doing stand-up comedy.",
    url: "https://mayanksurti.dev",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
