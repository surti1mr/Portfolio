"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
  isError?: boolean;
}

const DEMO_QUESTION = "What's Mayank's strongest project?";
const SUGGESTED_CHIPS = [
  "Is he open to relocation?",
  "Tell me something fun about him",
  "What's his tech stack?",
];

const TYPING_SPEED_DEMO = 40;

export default function HeroChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [demoComplete, setDemoComplete] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const scrollToBottom = useCallback(() => {
    const el = messagesContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Stream a real API response
  const streamResponse = useCallback(
    async (userMessage: string, history: Message[]) => {
      setIsStreaming(true);

      // Add empty assistant bubble
      setMessages((prev) => {
        const trimmed = prev.length >= 20 ? prev.slice(prev.length - 19) : prev;
        return [...trimmed, { role: "assistant", content: "", isStreaming: true }];
      });

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userMessage,
            history: history
              .filter((m) => !m.isError)
              .slice(-6)
              .map(({ role, content }) => ({ role, content })),
          }),
        });

        if (!res.ok || !res.body) {
          throw new Error("API error");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
          const { value, done: streamDone } = await reader.read();
          done = streamDone;
          if (value) {
            const chunk = decoder.decode(value, { stream: true });
            setMessages((prev) => {
              const updated = [...prev];
              const last = updated[updated.length - 1];
              if (last?.isStreaming) {
                updated[updated.length - 1] = {
                  ...last,
                  content: last.content + chunk,
                };
              }
              return updated;
            });
          }
        }
      } catch {
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last?.isStreaming) {
            updated[updated.length - 1] = {
              role: "assistant",
              content:
                "Sorry, I'm having trouble connecting right now. Check out Mayank's GitHub at github.com/surti1mr for more info!",
              isError: true,
            };
          }
          return updated;
        });
      } finally {
        // Mark streaming done
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last?.isStreaming) {
            updated[updated.length - 1] = { ...last, isStreaming: false };
          }
          return updated;
        });
        setIsStreaming(false);
      }
    },
    []
  );

  // Typewriter effect for demo user message
  const typeUserMessage = useCallback(
    (text: string, onDone: () => void) => {
      let i = 0;
      setMessages((prev) => [...prev, { role: "user", content: "" }]);

      const tick = () => {
        i++;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "user",
            content: text.slice(0, i),
          };
          return updated;
        });
        if (i < text.length) {
          const t = setTimeout(tick, TYPING_SPEED_DEMO);
          timeoutsRef.current.push(t);
        } else {
          onDone();
        }
      };

      const t = setTimeout(tick, TYPING_SPEED_DEMO);
      timeoutsRef.current.push(t);
    },
    []
  );

  // Auto-demo on mount
  useEffect(() => {
    const t1 = setTimeout(() => {
      typeUserMessage(DEMO_QUESTION, () => {
        const t2 = setTimeout(() => {
          streamResponse(DEMO_QUESTION, []).then(() => setDemoComplete(true));
        }, 400);
        timeoutsRef.current.push(t2);
      });
    }, 1200);
    timeoutsRef.current.push(t1);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [typeUserMessage, streamResponse]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming) return;

      setInputValue("");
      const newUserMsg: Message = { role: "user", content: trimmed };
      setMessages((prev) => {
        const trimmedPrev =
          prev.length >= 20 ? prev.slice(prev.length - 19) : prev;
        return [...trimmedPrev, newUserMsg];
      });

      await streamResponse(trimmed, [...messages, newUserMsg]);
    },
    [isStreaming, messages, streamResponse]
  );

  const handleSend = () => sendMessage(inputValue);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const handleChip = (chip: string) => {
    if (isStreaming) return;
    sendMessage(chip);
  };

  return (
    <div
      className="flex flex-col w-full"
      style={{
        background: "#0F1629",
        border: "1px solid #1E2D42",
        borderRadius: 16,
        overflow: "hidden",
        height: 420,
        maxHeight: 420,
      }}
    >
      {/* ── Header ── */}
      <div
        className="flex items-center justify-between px-4 flex-shrink-0"
        style={{
          background: "#0A0E1A",
          borderBottom: "1px solid #1E2D42",
          height: 44,
        }}
      >
        <div className="flex items-center gap-2.5">
          {/* Pulsing green dot */}
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span
              className="absolute inline-flex h-full w-full rounded-full"
              style={{
                background: "#00FFB3",
                opacity: 0.75,
                animation: "hero-ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
              }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{
                background: "#00FFB3",
                boxShadow: "0 0 6px #00FFB3",
              }}
            />
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: "#E8F4FD",
            }}
          >
            Ask My Portfolio
          </span>
        </div>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: "#8899AA",
          }}
        >
          llama-3.3-70b · groq
        </span>
      </div>

      {/* ── Messages ── */}
      <div
        ref={messagesContainerRef}
        className="flex-1 flex flex-col gap-3 overflow-y-auto px-4 py-4"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#00D4FF #1E2D42" }}
      >
        {messages.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "#8899AA",
                textAlign: "center",
                lineHeight: 1.6,
              }}
            >
              Ask me anything about Mayank.<br />
              his projects, skills, or availability.
            </p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className="flex flex-col"
            style={{ alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}
          >
            {msg.role === "assistant" && (
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: "#00D4FF",
                  marginBottom: 4,
                  paddingLeft: 2,
                }}
              >
                MS·AI
              </span>
            )}
            <div
              style={{
                maxWidth: msg.role === "user" ? "85%" : "100%",
                padding: "10px 14px",
                borderRadius:
                  msg.role === "assistant"
                    ? "4px 12px 12px 12px"
                    : "12px 4px 12px 12px",
                background:
                  msg.isError
                    ? "rgba(255,68,68,0.08)"
                    : msg.role === "assistant"
                    ? "rgba(0,212,255,0.08)"
                    : "rgba(124,58,237,0.15)",
                border:
                  msg.isError
                    ? "1px solid rgba(255,68,68,0.2)"
                    : msg.role === "assistant"
                    ? "1px solid rgba(0,212,255,0.15)"
                    : "1px solid rgba(124,58,237,0.25)",
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: "#E8F4FD",
                lineHeight: 1.55,
                wordBreak: "break-word",
              }}
            >
              {msg.content || (msg.isStreaming ? "" : "")}
              {msg.isStreaming && (
                <span
                  style={{
                    display: "inline-block",
                    width: "2px",
                    height: "14px",
                    background: "#00D4FF",
                    marginLeft: 2,
                    verticalAlign: "text-bottom",
                    animation: "blink-cursor 0.8s step-end infinite",
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── Suggested chips ── */}
      {demoComplete && !isStreaming && (
        <div
          className="flex gap-2 flex-wrap px-4 pb-2 flex-shrink-0"
          style={{ paddingTop: 4 }}
        >
          {SUGGESTED_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => handleChip(chip)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "#8899AA",
                border: "1px solid #1E2D42",
                borderRadius: 9999,
                padding: "3px 10px",
                background: "transparent",
                cursor: "pointer",
                transition: "border-color 150ms, color 150ms",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#00D4FF";
                (e.currentTarget as HTMLButtonElement).style.color = "#00D4FF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#1E2D42";
                (e.currentTarget as HTMLButtonElement).style.color = "#8899AA";
              }}
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* ── Input area ── */}
      <div
        className="flex items-center gap-2 flex-shrink-0 px-4 py-3"
        style={{ borderTop: "1px solid #1E2D42" }}
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isStreaming}
          placeholder="Ask anything about Mayank..."
          style={{
            flex: 1,
            background: "#0A0E1A",
            border: "1px solid #1E2D42",
            borderRadius: 8,
            padding: "8px 12px",
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            color: "#E8F4FD",
            outline: "none",
            opacity: isStreaming ? 0.6 : 1,
          }}
          onFocus={(e) =>
            ((e.target as HTMLInputElement).style.borderColor = "#00D4FF")
          }
          onBlur={(e) =>
            ((e.target as HTMLInputElement).style.borderColor = "#1E2D42")
          }
        />
        <button
          onClick={handleSend}
          disabled={isStreaming || !inputValue.trim()}
          style={{
            width: 36,
            height: 36,
            flexShrink: 0,
            background: "#00D4FF",
            border: "none",
            borderRadius: 8,
            cursor:
              isStreaming || !inputValue.trim() ? "not-allowed" : "pointer",
            opacity: isStreaming || !inputValue.trim() ? 0.4 : 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 150ms, opacity 150ms",
            fontSize: 18,
            fontWeight: "bold",
            color: "#0A0E1A",
          }}
          onMouseEnter={(e) => {
            if (!isStreaming && inputValue.trim())
              (e.currentTarget as HTMLButtonElement).style.background = "#00b8d9";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#00D4FF";
          }}
          aria-label="Send message"
        >
          →
        </button>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes hero-ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
