import { useState } from "react";
import { UserPlus, Bot, Send, TrendingUp, Calendar, Flame, ChevronRight, Cpu } from "lucide-react";
import { SUGGESTED_PEOPLE, TRENDING_TAGS, UPCOMING_EVENTS } from "./constants";

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

  return (
    <aside className="flex flex-col gap-3 sticky top-[72px]">

      {/* Suggested people */}
      <SectionCard title="People you may know" icon={UserPlus} action="See all">
        <div className="space-y-3">
          {SUGGESTED_PEOPLE.map((p) => (
            <div key={p.id} className="flex items-center gap-2.5">
              {/* Avatar */}
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
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div
                  className="text-xs font-semibold truncate"
                  style={{ color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-display)" }}
                >
                  {p.name}
                </div>
                <div
                  className="text-[10px] truncate"
                  style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}
                >
                  {p.mutuals} mutual connections
                </div>
              </div>
              {/* Connect button */}
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

{/* AI Campus Assistant */}
    <button
      onClick={() => navigate("/recommendations")}
      style={{
        width: "100%",
        padding: "18px 24px",
        borderRadius: 18,
        background: "#16161e",
        border: "1px solid #2a2a3a",
        display: "flex",
        alignItems: "center",
        gap: 16,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "border-color .2s, transform .15s",
        fontFamily: "'Sora', sans-serif",
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
      {/* Subtle glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 80% at 20% 50%, rgba(99,102,241,0.07), transparent)",
      }} />
 
      {/* Orb */}
      <div style={{
        width: 46, height: 46, borderRadius: 14, flexShrink: 0,
        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Bot size={22} color="#fff" />
      </div>
 
      {/* Text */}
      <div style={{ flex: 1, textAlign: "left" }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#e4e4f0", letterSpacing: ".2px" }}>
          Your AI Opportunity Radar
        </div>
        <div style={{ fontSize: 12, color: "#555578", marginTop: 3 }}>
          Hackathons · Internships · Events — curated just for you
        </div>
      </div>
 
      {/* AI Badge */}
      <span style={{
        fontSize: 10, fontWeight: 600, letterSpacing: ".5px",
        background: "rgba(99,102,241,.15)", color: "#818cf8",
        border: "1px solid rgba(99,102,241,.25)",
        borderRadius: 6, padding: "3px 8px",
      }}>
        AI
      </span>
 
      <ChevronRight size={16} color="#3d3d5c" />
    </button>

      {/* Upcoming events */}
      <SectionCard title="Upcoming events" icon={Calendar} action="See all">
        <div className="space-y-2.5">
          {UPCOMING_EVENTS.map((e) => (
            <button
              key={e.id}
              className="w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all duration-200 group"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                cursor: "pointer",
              }}
              onMouseEnter={(ev) => { ev.currentTarget.style.background = "rgba(255,255,255,0.07)"; ev.currentTarget.style.borderColor = e.color + "30"; }}
              onMouseLeave={(ev) => { ev.currentTarget.style.background = "rgba(255,255,255,0.03)"; ev.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
            >
              {/* Date badge */}
              <div
                className="w-10 h-10 rounded-lg flex flex-col items-center justify-center flex-shrink-0"
                style={{ background: e.color + "18", border: `1px solid ${e.color}30` }}
              >
                <span className="text-[9px] font-bold uppercase" style={{ color: e.color, fontFamily: "var(--font-display)", lineHeight: 1 }}>
                  {e.date.split(" ")[0]}
                </span>
                <span className="text-[11px] font-bold" style={{ color: e.color, fontFamily: "var(--font-display)" }}>
                  {e.date.split(" ")[1]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-xs font-semibold truncate"
                  style={{ color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-display)" }}
                >
                  {e.name}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full"
                    style={{ background: e.color + "15", color: e.color, fontFamily: "var(--font-body)", fontSize: "9px" }}
                  >
                    {e.type}
                  </span>
                  <span
                    className="text-[10px]"
                    style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}
                  >
                    {e.going} going
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </SectionCard>

      {/* Footer */}
      <p
        className="text-center text-[10px] px-2 pb-2 leading-relaxed"
        style={{ color: "rgba(255,255,255,0.15)", fontFamily: "var(--font-body)" }}
      >
        CampusConnect · Made for verified students · v1.0
      </p>
    </aside>
  );
}