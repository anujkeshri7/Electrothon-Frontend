import { useEffect, useState } from "react";
import { UserPlus, Bot, ChevronRight, CheckCircle2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function getColor(name = "") {
  const colors = ["#f97316","#6366f1","#ec4899","#10b981","#3b82f6","#8b5cf6","#14b8a6","#f59e0b"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

function getInitials(name = "") {
  return name.trim().split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
}

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

export default function RightSidebar({ userId }) {
  const [people, setPeople]       = useState([]);
  const [connected, setConnected] = useState({});
  const [loading, setLoading]     = useState(true);
  const navigate = useNavigate();

  console.log(people)
  useEffect(() => {
    if (!userId) return;
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/recommendations/`, {
        withCredentials: true,
      })
      .then(res => {
        if (res.data.success) setPeople(res.data.recommendations);
      })
      .catch(err => console.error("Recommendations error:", err))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <aside className="flex flex-col gap-3 sticky top-[72px]">

      {/* People you may know */}
      <SectionCard title="People you may know" icon={UserPlus} action="See all">

        {/* Scrollable list — 7-8 dikhenge, baad mein scroll */}
        <div
          className="space-y-3 overflow-y-auto pr-1"
          style={{
            maxHeight: "340px",
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(99,102,241,0.3) transparent",
          }}
        >
          {loading ? (
            // Skeleton
            [1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-2.5 animate-pulse">
                <div className="w-9 h-9 rounded-xl flex-shrink-0" style={{ background: "rgba(255,255,255,0.08)" }} />
                <div className="flex-1 space-y-1.5">
                  <div className="h-2.5 rounded-full w-24" style={{ background: "rgba(255,255,255,0.08)" }} />
                  <div className="h-2 rounded-full w-32" style={{ background: "rgba(255,255,255,0.05)" }} />
                </div>
              </div>
            ))
          ) : people.length === 0 ? (
            <p className="text-xs text-center py-3" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>
              No suggestions yet
            </p>
          ) : (
            people.map(p => {
              const color    = getColor(p.name);
              const initials = getInitials(p.name);
              const isConn   = connected[p._id];
              const reasonText = p.reasons?.join(" · ") || `${p.mutualConnections} mutual connections`;

              return (
                <div key={p._id} className="flex items-center gap-2.5">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    {p.avatar ? (
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="w-9 h-9 rounded-xl object-cover"
                        style={{ border: `1px solid ${color}35` }}
                      />
                    ) : (
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold"
                        style={{
                          background: color + "20",
                          border: `1px solid ${color}35`,
                          color,
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        {initials}
                      </div>
                    )}
                    {p.isVerified && (
                      <div
                        className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center"
                        style={{ background: "#070711" }}
                      >
                        <CheckCircle2 size={11} style={{ color }} />
                      </div>
                    )}
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
                      {reasonText}
                    </div>
                  </div>

                  {/* Connect button */}
                  <button
                    onClick={() => setConnected(prev => ({ ...prev, [p._id]: !prev[p._id] }))}
                    className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold transition-all duration-200"
                    style={{
                      background: isConn ? "rgba(52,211,153,0.12)" : "rgba(99,102,241,0.15)",
                      border: isConn ? "1px solid rgba(52,211,153,0.3)" : "1px solid rgba(99,102,241,0.3)",
                      color: isConn ? "#34d399" : "#a5b4fc",
                      fontFamily: "var(--font-display)",
                      cursor: "pointer",
                    }}
                  >
                    {isConn ? "✓" : <><UserPlus size={9} /> Add</>}
                  </button>
                </div>
              );
            })
          )}
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
        onMouseEnter={e => { e.currentTarget.style.borderColor = "#6366f1"; e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2a3a"; e.currentTarget.style.transform = "translateY(0)"; }}
      >
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 60% 80% at 20% 50%, rgba(99,102,241,0.07), transparent)" }} />
        <div style={{ width: 44, height: 44, borderRadius: "13px", flexShrink: 0, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Bot size={21} color="#fff" />
        </div>
        <div style={{ flex: 1, textAlign: "left" }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "#e4e4f0", letterSpacing: ".2px", fontFamily: "var(--font-display)" }}>
            Your AI Opportunity Radar
          </div>
          <div style={{ fontSize: "11px", color: "#555578", marginTop: "3px", fontFamily: "var(--font-body)" }}>
            Hackathons · Internships · Events
          </div>
        </div>
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