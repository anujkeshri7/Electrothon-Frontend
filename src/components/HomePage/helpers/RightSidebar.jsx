import { useState } from "react";
import { UserPlus, Bot, ChevronRight } from "lucide-react";
import { SUGGESTED_PEOPLE } from "./constants";
import { useNavigate } from "react-router-dom";

function SectionCard({ title, icon: Icon, children, action }) {

  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}
        >
          <Icon size={11} />
          {title}
        </div>
        {action && (
          <button
            className="text-xs transition-opacity hover:opacity-80"
            style={{ color: "#6366f1", fontFamily: "var(--font-body)", background: "none", border: "none", cursor: "pointer" }}
          >
            {action}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

export default function RightSidebar() {
  const [connected, setConnected] = useState({});
  
  const navigate = useNavigate();

  return (
    <aside className="flex flex-col gap-3 sticky top-[72px]">

      {/* Suggested people */}
      <SectionCard title="People you may know" icon={UserPlus} action="See all">
        <div className="space-y-3">
          {SUGGESTED_PEOPLE.map((p) => (
            <div key={p.id} className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  background: p.color + "20",
                  border: `1px solid ${p.color}35`,
                  color: p.color,
                  fontFamily: "var(--font-display)",
                }}
              >
                {p.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold truncate" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-display)" }}>
                  {p.name}
                </div>
                <div className="text-[10px] truncate" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}>
                  {p.mutuals} mutual connections
                </div>
              </div>
              <button
                onClick={() => setConnected((prev) => ({ ...prev, [p.id]: !prev[p.id] }))}
                className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all duration-200"
                style={{
                  background: connected[p.id] ? "rgba(52,211,153,0.12)" : "rgba(99,102,241,0.15)",
                  border: connected[p.id] ? "1px solid rgba(52,211,153,0.3)" : "1px solid rgba(99,102,241,0.3)",
                  color: connected[p.id] ? "#34d399" : "#a5b4fc",
                  fontFamily: "var(--font-display)",
                  cursor: "pointer",
                }}
              >
                {connected[p.id] ? "✓" : <><UserPlus size={9} /> Add</>}
              </button>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* AI Opportunity Radar */}
      <button
        onClick={() => navigate("/ai-recommendations")}
        style={{
          width: "100%",
          padding: "18px 20px",
          borderRadius: "18px",
          background: "#16161e",
          border: "1px solid #2a2a3a",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          transition: "border-color .2s, transform .15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#6366f1";
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#2a2a3a";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* Glow */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 60% 80% at 20% 50%, rgba(99,102,241,0.07), transparent)" }} />

        {/* Icon orb */}
        <div style={{ width: 44, height: 44, borderRadius: "13px", flexShrink: 0, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Bot size={21} color="#fff" />
        </div>

        {/* Text */}
        <div style={{ flex: 1, textAlign: "left" }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "#e4e4f0", letterSpacing: ".2px", fontFamily: "var(--font-display)" }}>
            Your AI Opportunity Radar
          </div>
          <div style={{ fontSize: "11px", color: "#555578", marginTop: "3px", fontFamily: "var(--font-body)" }}>
            Hackathons · Internships · Events
          </div>
        </div>

        {/* AI badge */}
        <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: ".5px", background: "rgba(99,102,241,.15)", color: "#818cf8", border: "1px solid rgba(99,102,241,.25)", borderRadius: "6px", padding: "3px 8px", flexShrink: 0 }}>
          AI
        </span>

        <ChevronRight size={15} color="#3d3d5c" style={{ flexShrink: 0 }} />
      </button>

      {/* Footer */}
      <p className="text-center text-[10px] px-2 pb-2 leading-relaxed" style={{ color: "rgba(255,255,255,0.15)", fontFamily: "var(--font-body)" }}>
        CampusConnect · Made for verified students · v1.0
      </p>
    </aside>
  );
}