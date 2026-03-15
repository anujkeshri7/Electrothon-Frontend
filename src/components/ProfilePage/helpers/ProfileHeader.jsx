import { useState } from "react";
import {
  Settings, UserPlus, MessageCircle, Share2,
  CheckCircle2, Calendar, GraduationCap,
} from "lucide-react";

// ── Helpers — untouched ───────────────────────────────────────
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
  if (!id || id.length < 8) return null;
  const ts = parseInt(id.substring(0, 8), 16) * 1000;
  return new Date(ts).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

// ── ProfileHeader ─────────────────────────────────────────────
export default function ProfileHeader({ user, onSettingsOpen, onEditProfile, postsCount }) {
  const [following, setFollowing] = useState(false);
  const [copied,    setCopied]    = useState(false);

  if (!user) return null;

  // ── Normalize API fields — untouched ─────────────────────────
  const name         = user.name || "Student";
  const initials     = getInitials(name);
  const headline     = user.headline || "";
  const avatar       = user.avatar || null;
  const branch       = user.branch || "";
  const currentYear  = user.currentYear || user.yearOfStudy || "";
  const cgpa         = user.cgpa || null;
  const rollNumber   = user.rollNumber || "";
  const joinedAt     = formatJoined(user._id);
  const isVerified   = user.isVerified || false;
  const isOwnProfile = user.isOwnProfile || false;

  const collage      = user.collage || {};
  const collegeName  = collage.name  || user.collegeName  || "College";
  const collegeShort = user.collegeShort || collegeName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 4);
  const collegeColor = user.collegeColor || "#6366f1";

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
  // ─────────────────────────────────────────────────────────────

  return (
    <div className="overflow-hidden rounded-2xl">

      {/* ── Banner ──────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ height: 156 }}>
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${collegeColor}22, rgba(99,102,241,0.2), rgba(139,92,246,0.15))` }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: `radial-gradient(ellipse at 20% 60%, ${collegeColor}20 0%, transparent 55%), radial-gradient(ellipse at 80% 40%, rgba(99,102,241,0.14) 0%, transparent 55%)` }}
        />
        {/* Subtle dot texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "20px 20px" }}
        />

        {isOwnProfile && (
          <button
            onClick={onSettingsOpen}
            className="absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-150 backdrop-blur-sm"
            style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.55)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.3)"; }}
          >
            <Settings size={15} className="text-white/80" />
          </button>
        )}
      </div>

      {/* ── Content below banner ────────────────────────────────── */}
      <div className="px-5 pb-5 bg-white/[0.02]">

        {/* Avatar + action row */}
        <div className="flex items-end justify-between -mt-10 mb-4">

          {/* Avatar with gradient ring */}
          <div className="relative flex-shrink-0">
            <div
              className="absolute -inset-[2px] rounded-[18px]"
              style={{ background: `linear-gradient(135deg, ${collegeColor}55, transparent 60%)`, zIndex: 0 }}
            />
            <div
              className="relative z-10 w-[78px] h-[78px] rounded-2xl overflow-hidden flex items-center justify-center"
              style={{
                background: avatar ? "transparent" : `linear-gradient(135deg, ${collegeColor}28, rgba(139,92,246,0.2))`,
                border: "3px solid #070711",
                boxShadow: "0 8px 24px rgba(0,0,0,0.55)",
              }}
            >
              {avatar
                ? <img src={avatar} alt={name} className="w-full h-full object-cover" />
                : <span className="text-2xl font-bold text-indigo-300" style={{ fontFamily: "var(--font-display)" }}>{initials}</span>
              }
            </div>
            {isVerified && (
              <div
                className="absolute -bottom-1 -right-1 z-20 w-[22px] h-[22px] rounded-full flex items-center justify-center"
                style={{ background: "#070711", border: `2px solid ${collegeColor}` }}
              >
                <CheckCircle2 size={12} style={{ color: collegeColor }} />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 pb-1">
            {isOwnProfile ? (
              <button
                onClick={onEditProfile}
                className="px-4 py-2 rounded-xl text-xs font-semibold transition-colors duration-150"
                style={{ background: "rgba(99,102,241,0.14)", border: "1px solid rgba(99,102,241,0.3)", color: "#a5b4fc", fontFamily: "var(--font-body)", cursor: "pointer" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(99,102,241,0.24)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(99,102,241,0.14)"; }}
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={() => setFollowing((f) => !f)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all duration-150"
                  style={{
                    background: following ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg,#6366f1,#8b5cf6)",
                    border: following ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(99,102,241,0.4)",
                    boxShadow: following ? "none" : "0 4px 14px rgba(99,102,241,0.28)",
                    fontFamily: "var(--font-body)", cursor: "pointer",
                  }}
                >
                  {following ? "Following" : <><UserPlus size={13} />Connect</>}
                </button>
                <button
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-150"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                >
                  <MessageCircle size={14} className="text-white/70" />
                </button>
              </>
            )}
            <button
              onClick={handleShare}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150"
              style={{
                background: copied ? "rgba(52,211,153,0.12)" : "rgba(255,255,255,0.05)",
                border: copied ? "1px solid rgba(52,211,153,0.28)" : "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => { if (!copied) e.currentTarget.style.background = "rgba(255,255,255,0.09)"; }}
              onMouseLeave={(e) => { if (!copied) e.currentTarget.style.background = copied ? "rgba(52,211,153,0.12)" : "rgba(255,255,255,0.05)"; }}
            >
              {copied
                ? <CheckCircle2 size={14} style={{ color: "#34d399" }} />
                : <Share2 size={14} className="text-white/60" />
              }
            </button>
          </div>
        </div>

        {/* ── Name + verified ──────────────────────────────────── */}
        <div className="mb-2.5">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h1 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.01em" }}>
              {name}
            </h1>
            {isVerified && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                style={{ background: collegeColor + "18", border: `1px solid ${collegeColor}32`, color: collegeColor, fontFamily: "var(--font-body)" }}
              >
                <CheckCircle2 size={9} /> Verified
              </span>
            )}
          </div>
          {headline && (
            <p className="text-sm text-white/55 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              {headline}
            </p>
          )}
        </div>

        {/* ── Meta row ─────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-4">

          {/* College chip */}
          <div
            className="flex items-center gap-1.5 text-xs font-medium"
            style={{ color: collegeColor, fontFamily: "var(--font-body)" }}
          >
            <div
              className="w-5 h-5 rounded flex items-center justify-center text-[8px] font-bold flex-shrink-0"
              style={{ background: collegeColor + "1e", border: `1px solid ${collegeColor}30` }}
            >
              {collegeShort.slice(0, 2)}
            </div>
            {collegeName}
          </div>

          {(branch || currentYear) && (
            <div className="flex items-center gap-1 text-xs text-white/35" style={{ fontFamily: "var(--font-body)" }}>
              <GraduationCap size={11} className="flex-shrink-0" />
              {branch && branch.split(" ")[0]}{branch && currentYear ? " · " : ""}{currentYear}
            </div>
          )}

          {joinedAt && (
            <div className="flex items-center gap-1 text-xs text-white/30" style={{ fontFamily: "var(--font-body)" }}>
              <Calendar size={11} className="flex-shrink-0" />
              {joinedAt}
            </div>
          )}

          {rollNumber && (
            <span className="text-[11px] text-white/22 font-mono tracking-wide" style={{ fontFamily: "var(--font-body)" }}>
              #{rollNumber.toUpperCase()}
            </span>
          )}

          {/* CGPA pill */}
          {cgpa && (
            <span
              className="inline-flex items-center text-[11px] font-bold px-2.5 py-0.5 rounded-full"
              style={{ background: cgpaColor + "15", border: `1px solid ${cgpaColor}28`, color: cgpaColor, fontFamily: "var(--font-body)" }}
            >
              CGPA {cgpa}
            </span>
          )}
        </div>

        {/* ── Stats strip ──────────────────────────────────────── */}
        <div className="grid grid-cols-3 divide-x divide-white/[0.06] rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.07]">
          {[
            { value: stats.connections, label: "Connections" },
            { value: postsCount,        label: "Posts"       },
            { value: stats.projects,    label: "Projects"    },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center py-3 gap-0.5 hover:bg-white/[0.03] transition-colors duration-150 cursor-default select-none"
            >
              <span className="text-base font-bold text-white/88" style={{ fontFamily: "var(--font-display)" }}>
                {(value ?? 0) >= 1000 ? `${((value ?? 0) / 1000).toFixed(1)}k` : (value ?? 0)}
              </span>
              <span className="text-[11px] text-white/30" style={{ fontFamily: "var(--font-body)" }}>
                {label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}