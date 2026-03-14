import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Bot, Send, X, Maximize2, Minimize2 } from "lucide-react";
import ChatBubble from "./ChatBubble";

export default function ChatBot({ userId }) {
  const [open, setOpen]         = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hey! I'm CampusBot 👋 Ask me anything — learning paths, hackathon teams, career tips, or finding people with similar interests!" }
  ]);
  const [input, setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef             = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Lock body scroll when expanded
  useEffect(() => {
    if (expanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [expanded]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text }]);
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/chat`,
        { message: text, userId }
      );
      setMessages(prev => [...prev, { role: "bot", text: res.data.message }]);
    } catch {
      setMessages(prev => [...prev, { role: "bot", text: "Something went wrong, please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  // ── Floating button ──
  if (!open) return (
    <button
      onClick={() => setOpen(true)}
      className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-105"
      style={{
        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        boxShadow: "0 8px 32px rgba(99,102,241,0.45)",
      }}
    >
      <Bot size={24} className="text-white" />
    </button>
  );

  // ── Expanded (centered modal) styles ──
  const containerStyle = expanded ? {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 9999,
    width: "min(860px, 90vw)",
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    background: "#0f0f1e",
    border: "1px solid rgba(99,102,241,0.4)",
    borderRadius: "20px",
    boxShadow: "0 32px 80px rgba(0,0,0,0.8), 0 0 0 9999px rgba(0,0,0,0.55)",
    transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
  } : {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    zIndex: 9999,
    width: "380px",
    height: "520px",
    display: "flex",
    flexDirection: "column",
    background: "#0f0f1e",
    border: "1px solid rgba(99,102,241,0.3)",
    borderRadius: "20px",
    boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
    transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
  };

  return (
    <div style={containerStyle}>

      {/* ── Header ── */}
      <div
        className="flex items-center gap-3 px-5 py-3.5 flex-shrink-0"
        style={{
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          borderRadius: "20px 20px 0 0",
        }}
      >
        <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
          <Bot size={18} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
            CampusBot
          </div>
          <div className="text-xs text-white/70" style={{ fontFamily: "var(--font-body)" }}>
            AI · Powered by Gemini
          </div>
        </div>

        {/* Expand / Minimize toggle */}
        <button
          onClick={() => setExpanded(e => !e)}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-white/20 mr-1"
          title={expanded ? "Minimize" : "Expand"}
          style={{ border: "none", cursor: "pointer", background: "rgba(255,255,255,0.1)" }}
        >
          {expanded
            ? <Minimize2 size={16} className="text-white" />
            : <Maximize2 size={16} className="text-white" />
          }
        </button>

        {/* Close */}
        <button
          onClick={() => { setOpen(false); setExpanded(false); }}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-white/20"
          title="Close"
          style={{ border: "none", cursor: "pointer", background: "rgba(255,255,255,0.1)" }}
        >
          <X size={16} className="text-white" />
        </button>
      </div>

      {/* ── Messages ── */}
      <div
        className="flex-1 overflow-y-auto py-5 px-5 space-y-4"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(99,102,241,0.3) transparent",
          maxWidth: expanded ? "860px" : "none",
          width: "100%",
          marginLeft: expanded ? "auto" : "0",
          marginRight: expanded ? "auto" : "0",
        }}
      >
        {messages.filter(Boolean).map((msg, i) => (
          <ChatBubble key={i} message={msg} expanded={expanded} />
        ))}

        {/* Loading dots */}
        {loading && (
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(99,102,241,0.2)" }}
            >
              <Bot size={14} style={{ color: "#a5b4fc" }} />
            </div>
            <div
              className="flex gap-1.5 px-4 py-3 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full animate-bounce"
                  style={{ background: "#a5b4fc", animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── Input ── */}
      <div
        className="px-4 pb-4 pt-2 flex-shrink-0"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          maxWidth: expanded ? "860px" : "none",
          width: "100%",
          marginLeft: expanded ? "auto" : "0",
          marginRight: expanded ? "auto" : "0",
          paddingLeft: expanded ? "24px" : "16px",
          paddingRight: expanded ? "24px" : "16px",
        }}
      >
        <div
          className="flex items-end gap-2 px-4 py-3 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <textarea
            rows={1}
            placeholder="Ask anything..."
            value={input}
            onChange={e => {
              setInput(e.target.value);
              // Auto resize
              e.target.style.height = "auto";
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-sm resize-none"
            style={{
              color: "rgba(255,255,255,0.85)",
              fontFamily: "var(--font-body)",
              caretColor: "#6366f1",
              lineHeight: "1.5",
              maxHeight: "120px",
              overflowY: "auto",
              scrollbarWidth: "none",
            }}
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading}
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
            style={{
              background: input.trim() && !loading
                ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
                : "rgba(255,255,255,0.06)",
              cursor: input.trim() && !loading ? "pointer" : "not-allowed",
              border: "none",
              boxShadow: input.trim() ? "0 4px 12px rgba(99,102,241,0.35)" : "none",
            }}
          >
            <Send size={15} className="text-white" />
          </button>
        </div>
        <p
          className="text-center text-[10px] mt-2"
          style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-body)" }}
        >
          Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}