import ReactMarkdown from "react-markdown";
import { Bot } from "lucide-react";

export default function ChatBubble({ message, expanded }) {
  if (!message) return null;
  const isBot = message.role === "bot";

  return (
    <div className={`flex items-end gap-2.5 ${isBot ? "" : "flex-row-reverse"}`}>
      {isBot && (
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mb-0.5"
          style={{ background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.25)" }}
        >
          <Bot size={15} style={{ color: "#a5b4fc" }} />
        </div>
      )}

      <div
        className="rounded-2xl px-4 py-3 text-sm"
        style={{
          maxWidth: expanded ? "75%" : "85%",
          background: isBot
            ? "rgba(255,255,255,0.07)"
            : "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: "rgba(255,255,255,0.9)",
          fontFamily: "var(--font-body)",
          borderBottomLeftRadius:  isBot ? "4px"  : "16px",
          borderBottomRightRadius: isBot ? "16px" : "4px",
          lineHeight: "1.75",
          border: isBot ? "1px solid rgba(255,255,255,0.07)" : "none",
        }}
      >
        {isBot ? (
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p style={{ margin: "0 0 8px 0" }}>{children}</p>
              ),
              strong: ({ children }) => (
                <strong style={{ color: "white", fontWeight: 600 }}>{children}</strong>
              ),
              h1: ({ children }) => (
                <h1 style={{ fontSize: "16px", fontWeight: 700, color: "white", margin: "12px 0 6px 0" }}>{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 style={{ fontSize: "15px", fontWeight: 700, color: "white", margin: "10px 0 6px 0" }}>{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#a5b4fc", margin: "8px 0 4px 0" }}>{children}</h3>
              ),
              ol: ({ children }) => (
                <ol style={{ paddingLeft: "20px", margin: "6px 0" }}>{children}</ol>
              ),
              ul: ({ children }) => (
                <ul style={{ paddingLeft: "20px", margin: "6px 0" }}>{children}</ul>
              ),
              li: ({ children }) => (
                <li style={{ margin: "4px 0", lineHeight: "1.65" }}>{children}</li>
              ),
              code: ({ children }) => (
                <code style={{
                  background: "rgba(99,102,241,0.25)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontFamily: "monospace",
                  color: "#c4b5fd",
                }}>
                  {children}
                </code>
              ),
              hr: () => (
                <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.12)", margin: "12px 0" }} />
              ),
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer"
                  style={{ color: "#a5b4fc", textDecoration: "underline" }}>
                  {children}
                </a>
              ),
              blockquote: ({ children }) => (
                <blockquote style={{
                  borderLeft: "3px solid rgba(99,102,241,0.5)",
                  paddingLeft: "12px",
                  margin: "8px 0",
                  color: "rgba(255,255,255,0.6)",
                }}>
                  {children}
                </blockquote>
              ),
            }}
          >
            {message.text}
          </ReactMarkdown>
        ) : (
          <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{message.text}</p>
        )}
      </div>
    </div>
  );
}