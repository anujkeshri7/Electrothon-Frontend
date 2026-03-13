import { useState } from "react";
import { UserPlus, TrendingUp, Calendar, Flame, ChevronRight } from "lucide-react";
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

      {/* Trending tags */}
      <SectionCard title="Trending on campus" icon={TrendingUp}>
        <div className="space-y-2">
          {TRENDING_TAGS.map((t, i) => (
            <button
              key={t.tag}
              className="w-full flex items-center justify-between group"
              style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="text-xs w-4 text-center"
                  style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-display)", fontWeight: 700 }}
                >
                  {i + 1}
                </span>
                <div>
                  <div
                    className="text-xs font-semibold group-hover:text-indigo-400 transition-colors"
                    style={{ color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)" }}
                  >
                    {t.tag}
                    {t.hot && <Flame size={10} className="inline ml-1" style={{ color: "#f97316" }} />}
                  </div>
                  <div
                    className="text-[10px]"
                    style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}
                  >
                    {t.posts}
                  </div>
                </div>
              </div>
              <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#6366f1" }} />
            </button>
          ))}
        </div>
      </SectionCard>

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