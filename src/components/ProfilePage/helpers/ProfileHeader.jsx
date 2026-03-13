import { useState } from "react";
import {
  Settings, UserPlus, MessageCircle, Share2,
  CheckCircle2, MapPin, Calendar, MoreHorizontal,
} from "lucide-react";

function StatBox({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="text-xl font-bold text-white"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
      </span>
      <span
        className="text-xs mt-0.5"
        style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function ProfileHeader({ user, onSettingsOpen, onEditProfile }) {
  const [following, setFollowing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(`https://campuslink.app/${user.name.toLowerCase().replace(" ", "")}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cgpaColor =
    user.cgpa >= 8.5 ? "#34d399" :
    user.cgpa >= 7.0 ? "#6366f1" :
    user.cgpa >= 5.5 ? "#f59e0b" : "#f87171";

  return (
    <div>
      {/* Cover gradient bar */}
      <div
        className="h-28 w-full rounded-2xl mb-0 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${user.college.color}22, rgba(99,102,241,0.2), rgba(139,92,246,0.15))`,
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Subtle pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, ${user.college.color}18 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(99,102,241,0.12) 0%, transparent 60%)`,
          }}
        />
        {/* Settings button - top right */}
        {user.isOwnProfile && (
          <button
            onClick={onSettingsOpen}
            className="absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.5)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.3)"; }}
          >
            <Settings size={16} className="text-white" />
          </button>
        )}
      </div>

      {/* Avatar + top info row */}
      <div className="flex items-end justify-between px-1 -mt-12 mb-4">
        {/* Avatar */}
        <div className="relative">
          <div
            className="w-24 h-24 rounded-2xl flex items-center justify-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.2))",
              border: "3px solid #070711",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
          >
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span
                className="text-3xl font-bold"
                style={{ color: "#a5b4fc", fontFamily: "var(--font-display)" }}
              >
                {user.name.split(" ").map((n) => n[0]).join("")}
              </span>
            )}
          </div>
          {/* Verified badge */}
          {user.isVerified && (
            <div
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                background: "#070711",
                border: `2px solid ${user.college.color}`,
              }}
            >
              <CheckCircle2 size={14} style={{ color: user.college.color }} />
            </div>
          )}
        </div>

        {/* Action buttons (top right of avatar row) */}
        <div className="flex items-center gap-2 pb-1">
          {user.isOwnProfile ? (
            <button
              onClick={onEditProfile}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: "rgba(99,102,241,0.15)",
                border: "1px solid rgba(99,102,241,0.35)",
                color: "#a5b4fc",
                fontFamily: "var(--font-body)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(99,102,241,0.25)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(99,102,241,0.15)"; }}
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={() => setFollowing((f) => !f)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  background: following
                    ? "rgba(255,255,255,0.06)"
                    : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  border: following ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(99,102,241,0.4)",
                  color: "white",
                  fontFamily: "var(--font-display)",
                  boxShadow: following ? "none" : "0 4px 16px rgba(99,102,241,0.3)",
                  cursor: "pointer",
                }}
              >
                {following ? "Following" : <><UserPlus size={14} /> Connect</>}
              </button>
              <button
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
              >
                <MessageCircle size={15} className="text-white" />
              </button>
            </>
          )}
          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{
              background: copied ? "rgba(52,211,153,0.12)" : "rgba(255,255,255,0.05)",
              border: copied ? "1px solid rgba(52,211,153,0.3)" : "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => { if (!copied) e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
            onMouseLeave={(e) => { if (!copied) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
          >
            {copied
              ? <CheckCircle2 size={15} style={{ color: "#34d399" }} />
              : <Share2 size={15} className="text-white" />
            }
          </button>
        </div>
      </div>

      {/* Name + verified */}
      <div className="mb-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h1
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {user.name}
          </h1>
          {user.isVerified && (
            <div
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{
                background: user.college.color + "18",
                border: `1px solid ${user.college.color}35`,
                color: user.college.color,
                fontFamily: "var(--font-body)",
              }}
            >
              <CheckCircle2 size={9} />
              Verified Student
            </div>
          )}
        </div>

        {/* Headline */}
        <p
          className="text-sm mt-1 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)" }}
        >
          {user.headline}
        </p>
      </div>

      {/* College + meta */}
      <div className="flex flex-wrap items-center gap-3 mt-2 mb-5">
        <div
          className="inline-flex items-center gap-1.5 text-xs"
          style={{ color: user.college.color, fontFamily: "var(--font-body)" }}
        >
          <div
            className="w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold"
            style={{ background: user.college.color + "22", border: `1px solid ${user.college.color}40` }}
          >
            {user.college.shortName.slice(0, 2)}
          </div>
          {user.college.name}
        </div>
        <div
          className="flex items-center gap-1 text-xs"
          style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}
        >
          <MapPin size={11} />
          {user.branch.split(" ")[0]} · {user.currentYear}
        </div>
        <div
          className="flex items-center gap-1 text-xs"
          style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}
        >
          <Calendar size={11} />
          Joined {user.joinedAt}
        </div>
        {user.cgpa && (
          <div
            className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: cgpaColor + "15",
              border: `1px solid ${cgpaColor}30`,
              color: cgpaColor,
              fontFamily: "var(--font-body)",
            }}
          >
            CGPA {user.cgpa}
          </div>
        )}
      </div>

      {/* Stats row */}
      <div
        className="flex items-center justify-around py-4 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <StatBox value={user.stats.connections} label="Connections" />
        <div className="h-8 w-px" style={{ background: "rgba(255,255,255,0.07)" }} />
        <StatBox value={user.stats.posts} label="Posts" />
        <div className="h-8 w-px" style={{ background: "rgba(255,255,255,0.07)" }} />
        <StatBox value={user.stats.projects} label="Projects" />
      </div>
    </div>
  );
}