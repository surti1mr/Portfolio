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
  title: "Mayank Surti — AI/ML Engineer",
  description:
    "AI engineer specializing in RAG systems, agentic AI, and full-stack development. M.S. Information Systems, 3.95 GPA. Based in Michigan.",
  keywords: [
    "AI engineer",
    "RAG",
    "LangChain",
    "LangGraph",
    "FAISS",
    "FastAPI",
    "Next.js",
    "full-stack",
  ],
  openGraph: {
    title: "Mayank Surti — AI/ML Engineer",
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
