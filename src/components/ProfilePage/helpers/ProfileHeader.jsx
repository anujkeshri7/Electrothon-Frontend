import { useState } from "react";
import {
  Settings, UserPlus, MessageCircle, Share2,
  CheckCircle2, MapPin, Calendar, GraduationCap,
} from "lucide-react";

function StatBox({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
        {value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value ?? 0}
      </span>
      <span className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}>
        {label}
      </span>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────
function getInitials(name = "") {
  return name.trim().split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

function cgpaToColor(cgpa) {
  const n = parseFloat(cgpa);
  if (n >= 8.5) return "#34d399";
  if (n >= 7.0) return "#6366f1";
  if (n >= 5.5) return "#f59e0b";
  return "#f87171";
}

function formatJoined(id = "") {
  // MongoDB ObjectId first 4 bytes = timestamp
  if (!id || id.length < 8) return null;
  const ts = parseInt(id.substring(0, 8), 16) * 1000;
  return new Date(ts).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

// ── Component ─────────────────────────────────────────────────
export default function ProfileHeader({ user, onSettingsOpen, onEditProfile ,postsCount }) {
  const [following, setFollowing] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!user) return null;

  // ── Normalize API fields ──
  const name        = user.name || "Student";
  const initials    = getInitials(name);
  const headline    = user.headline || "";
  const avatar      = user.avatar || null;
  const bio         = user.bio || "";
  const branch      = user.branch || "";
  const currentYear = user.currentYear || user.yearOfStudy || "";
  const cgpa        = user.cgpa || null;
  const rollNumber  = user.rollNumber || "";
  const joinedAt    = formatJoined(user._id);
  const isVerified  = user.isVerified || false;
  const isOwnProfile= user.isOwnProfile || false;

  // College — API now sends populated object in user.collage
  const collage      = user.collage || {};
  const collegeName  = collage.name  || user.collegeName  || "College";
  const collegeType  = collage.type  || "";
  const collegeShort = user.collegeShort || collegeName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 4);
  const collegeColor = user.collegeColor || "#6366f1";

  // Stats — API may or may not include these
  const stats = {
    connections: user.stats?.connections ?? user.connections ?? 0,
    posts:       user.stats?.posts       ?? user.posts       ?? 0,
    projects:    user.stats?.projects    ?? user.projects    ?? 0,
  };

  const cgpaColor = cgpaToColor(cgpa);

  const handleShare = () => {
    navigator.clipboard?.writeText(`https://campusconnect.app/${name.toLowerCase().replace(/\s+/g, "")}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      {/* Cover */}
      <div
        className="h-28 w-full rounded-2xl relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${collegeColor}22, rgba(99,102,241,0.2), rgba(139,92,246,0.15))`,
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, ${collegeColor}18 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(99,102,241,0.12) 0%, transparent 60%)`,
          }}
        />
        {isOwnProfile && (
          <button
            onClick={onSettingsOpen}
            className="absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.5)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.3)"; }}
          >
            <Settings size={16} className="text-white" />
          </button>
        )}
      </div>

      {/* Avatar row */}
      <div className="flex items-end justify-between px-1 -mt-12 mb-4">
        <div className="relative">
          <div
            className="w-24 h-24 rounded-2xl overflow-hidden flex items-center justify-center"
            style={{
              background: avatar ? "transparent" : "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.2))",
              border: "3px solid #070711",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
          >
            {avatar
              ? <img src={avatar} alt={name} className="w-full h-full object-cover" />
              : <span className="text-3xl font-bold" style={{ color: "#a5b4fc", fontFamily: "var(--font-display)" }}>{initials}</span>
            }
          </div>
          {isVerified && (
            <div
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: "#070711", border: `2px solid ${collegeColor}` }}
            >
              <CheckCircle2 size={14} style={{ color: collegeColor }} />
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 pb-1">
          {isOwnProfile ? (
            <button
              onClick={onEditProfile}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.35)", color: "#a5b4fc", fontFamily: "var(--font-body)", cursor: "pointer" }}
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
                  background: following ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
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
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}
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

      {/* Name + verified badge */}
      <div className="mb-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            {name}
          </h1>
          {isVerified && (
            <div
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{ background: collegeColor + "18", border: `1px solid ${collegeColor}35`, color: collegeColor, fontFamily: "var(--font-body)" }}
            >
              <CheckCircle2 size={9} />
              Verified Student
            </div>
          )}
        </div>
        {headline && (
          <p className="text-sm mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)" }}>
            {headline}
          </p>
        )}
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-3 mt-2 mb-5">
        {/* College */}
        <div className="inline-flex items-center gap-1.5 text-xs" style={{ color: collegeColor, fontFamily: "var(--font-body)" }}>
          <div
            className="w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold"
            style={{ background: collegeColor + "22", border: `1px solid ${collegeColor}40` }}
          >
            {collegeShort}
          </div>
          {collegeName}
        </div>

        {/* Branch + Year */}
        {(branch || currentYear) && (
          <div className="flex items-center gap-1 text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>
            <MapPin size={11} />
            {branch && branch.split(" ")[0]}{branch && currentYear ? " · " : ""}{currentYear}
          </div>
        )}

        {/* Joined */}
        {joinedAt && (
          <div className="flex items-center gap-1 text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>
            <Calendar size={11} />
            Joined {joinedAt}
          </div>
        )}

        {/* CGPA */}
        {cgpa && (
          <div
            className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: cgpaColor + "15", border: `1px solid ${cgpaColor}30`, color: cgpaColor, fontFamily: "var(--font-body)" }}
          >
            CGPA {cgpa}
          </div>
        )}

        {/* Roll number */}
        {rollNumber && (
          <div className="flex items-center gap-1 text-xs" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-body)" }}>
            <GraduationCap size={11} />
            {rollNumber}
          </div>
        )}
      </div>

      {/* Stats */}
      <div
        className="flex items-center justify-around py-4 rounded-2xl"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <StatBox value={stats.connections} label="Connections" />
        <div className="h-8 w-px" style={{ background: "rgba(255,255,255,0.07)" }} />
        <StatBox value={postsCount} label="Posts" />
        <div className="h-8 w-px" style={{ background: "rgba(255,255,255,0.07)" }} />
        <StatBox value={stats.projects} label="Projects" />
      </div>
    </div>
  );
}