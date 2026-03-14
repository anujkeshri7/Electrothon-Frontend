import { useState } from "react";
import { NAV_ITEMS } from "./constants";
import { CheckCircle2, TrendingUp, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LeftSidebar({ studentData, onProfileClick }) {
  const [activeNav, setActiveNav] = useState("home");

  // ── Fallbacks agar studentData na aaye ──
  const name        = studentData?.name || "Student";
  const headline    = studentData?.headline || "";
  const avatar      = studentData?.avatar || null;
  const initials    = name.trim().split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  const collegeName = studentData?.collegeName || "Your College";
  const collegeShort= (studentData?.collegeName || "CC").slice(0, 2).toUpperCase();
  const collegeColor= "#f97316"; // default; swap with real color if you map collage id → color
  const connections = studentData?.connections || 0;
  const profileViews= studentData?.profileViews || 0;

  return (
    <aside className="flex flex-col gap-3 sticky top-[72px]">

      {/* User mini card */}
      <div
        className="rounded-2xl overflow-hidden cursor-pointer group border border-white/[.08] bg-white/[.025]"
        onClick={onProfileClick}
      >
        {/* Cover */}
        <div
          className="h-14 relative"
          style={{
            background: `linear-gradient(135deg, ${collegeColor}25, rgba(99,102,241,0.2))`,
          }}
        />

        <div className="px-4 pb-4 -mt-7">
          {/* Avatar */}
          <div
            className="w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center text-lg font-bold mb-2 relative border-[3px] border-[#070711]"
            style={{
              background: avatar ? "transparent" : "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(139,92,246,0.3))",
              fontFamily: "var(--font-display)",
              color: "#a5b4fc",
            }}
          >
            {avatar
              ? <img src={avatar} alt={name} className="w-full h-full object-cover" />
              : initials
            }
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center bg-[#070711]">
              <CheckCircle2 size={13} style={{ color: collegeColor }} />
            </div>
          </div>

          {/* Name + headline */}
          <div
            className="text-sm font-bold text-white leading-tight group-hover:text-indigo-300 transition-colors"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {name}
          </div>
          <div
            className="text-xs mt-0.5 text-white/40"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {headline}
          </div>

          <div className="h-px my-3 bg-white/[.07]" />

          {/* Stats */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-white/40" style={{ fontFamily: "var(--font-body)" }}>
                <TrendingUp size={11} />
                Connections
              </div>
              <span className="text-xs font-semibold text-[#a5b4fc]" style={{ fontFamily: "var(--font-display)" }}>
                {connections}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-white/40" style={{ fontFamily: "var(--font-body)" }}>
                <Eye size={11} />
                Profile views
              </div>
              <span className="text-xs font-semibold text-emerald-400" style={{ fontFamily: "var(--font-display)" }}>
                {profileViews}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="rounded-2xl p-2 bg-white/[.025] border border-white/[.08]">
        {NAV_ITEMS.map((item) => {
          const isActive = activeNav === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 relative mb-px"
              style={{
                background: isActive ? "rgba(99,102,241,0.15)" : "transparent",
                border: isActive ? "1px solid rgba(99,102,241,0.25)" : "1px solid transparent",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
            >
              <Icon size={17} className={`flex-shrink-0 ${isActive ? "text-indigo-400" : "text-white/40"}`} />
              <span
                className={`text-sm font-medium flex-1 ${isActive ? "text-[#a5b4fc]" : "text-white/60"}`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.label}
              </span>
              {item.badge && (
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white bg-gradient-to-br from-indigo-500 to-purple-500"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.badge}
                </span>
              )}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-gradient-to-b from-indigo-500 to-purple-500" />
              )}
            </button>
          );
        })}
      </nav>

      {/* College pill */}
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-2xl"
        style={{
          background: collegeColor + "12",
          border: `1px solid ${collegeColor}25`,
        }}
      >
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-bold flex-shrink-0"
          style={{ background: collegeColor + "25", color: collegeColor, fontFamily: "var(--font-display)" }}
        >
          {collegeShort}
        </div>
        <div>
          <div className="text-xs font-semibold" style={{ color: collegeColor, fontFamily: "var(--font-display)" }}>
            {collegeName}
          </div>
          <div className="text-[10px] text-white/30" style={{ fontFamily: "var(--font-body)" }}>
            {studentData?.isVerified ? "Verified student" : "Student"}
          </div>
        </div>
        <CheckCircle2 size={13} className="ml-auto flex-shrink-0" style={{ color: collegeColor }} />
      </div>

    </aside>
  );
}