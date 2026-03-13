import { useState } from "react";
import { Image, HelpCircle, Rocket, BarChart2, Send, X } from "lucide-react";
import { CURRENT_USER } from "./constants";

const POST_TYPES = [
  { id: "post",     icon: "✍️", label: "Post",     placeholder: "Share something with your campus..." },
  { id: "question", icon: "❓", label: "Question",  placeholder: "Ask the campus something..." },
  { id: "project",  icon: "🚀", label: "Project",   placeholder: "Share what you're building..." },
];

export default function CreatePost() {
  const [active, setActive] = useState(false);
  const [type, setType] = useState("post");
  const [content, setContent] = useState("");

  const current = POST_TYPES.find((t) => t.id === type);

  return (
    <div
      className="rounded-2xl p-4 transition-all duration-200"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: active ? "1px solid rgba(99,102,241,0.35)" : "1px solid rgba(255,255,255,0.08)",
        boxShadow: active ? "0 0 0 3px rgba(99,102,241,0.07)" : "none",
      }}
    >
      {/* Top row */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(139,92,246,0.3))",
            color: "#a5b4fc",
            fontFamily: "var(--font-display)",
          }}
        >
          {CURRENT_USER.initials}
        </div>

        {/* Input */}
        <div
          className="flex-1 px-4 py-2.5 rounded-xl cursor-text transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          onClick={() => setActive(true)}
        >
          {!active ? (
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px", fontFamily: "var(--font-body)" }}>
              {current.placeholder}
            </span>
          ) : (
            <textarea
              autoFocus
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={current.placeholder}
              className="w-full bg-transparent outline-none resize-none text-sm"
              style={{
                color: "rgba(255,255,255,0.85)",
                fontFamily: "var(--font-body)",
                lineHeight: "1.7",
                caretColor: "#6366f1",
              }}
            />
          )}
        </div>
      </div>

      {/* Expanded area */}
      {active && (
        <div className="mt-4 animate-fade-slide-up">
          {/* Post type selector */}
          <div className="flex gap-2 mb-4">
            {POST_TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => setType(t.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200"
                style={{
                  background: type === t.id ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)",
                  border: type === t.id ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.08)",
                  color: type === t.id ? "#a5b4fc" : "rgba(255,255,255,0.4)",
                  fontFamily: "var(--font-body)",
                  cursor: "pointer",
                }}
              >
                <span>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>

          {/* Bottom row */}
          <div
            className="flex items-center gap-2 pt-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            {/* Attachments */}
            <div className="flex items-center gap-1">
              {[
                { Icon: Image, tip: "Photo" },
                { Icon: BarChart2, tip: "Poll" },
              ].map(({ Icon, tip }) => (
                <button
                  key={tip}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
                  title={tip}
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
                >
                  <Icon size={15} style={{ color: "rgba(255,255,255,0.4)" }} />
                </button>
              ))}
            </div>

            {/* Char count */}
            <span
              className="text-xs ml-1"
              style={{
                color: content.length > 450 ? "#f87171" : "rgba(255,255,255,0.2)",
                fontFamily: "var(--font-body)",
              }}
            >
              {content.length}/500
            </span>

            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => { setActive(false); setContent(""); }}
                className="px-3 py-2 rounded-xl text-xs transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "var(--font-body)",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                disabled={!content.trim()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                style={{
                  background: content.trim()
                    ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                    : "rgba(255,255,255,0.06)",
                  color: content.trim() ? "white" : "rgba(255,255,255,0.2)",
                  fontFamily: "var(--font-display)",
                  border: "none",
                  boxShadow: content.trim() ? "0 4px 16px rgba(99,102,241,0.35)" : "none",
                  cursor: content.trim() ? "pointer" : "not-allowed",
                  letterSpacing: "0.02em",
                }}
              >
                <Send size={12} />
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick actions when collapsed */}
      {!active && (
        <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          {POST_TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => { setActive(true); setType(t.id); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 flex-1 justify-center"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.4)",
                fontFamily: "var(--font-body)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
            >
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}