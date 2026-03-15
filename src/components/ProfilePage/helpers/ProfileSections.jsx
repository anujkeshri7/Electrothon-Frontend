import {
  Github, Globe, Twitter, Instagram, Linkedin,
  ExternalLink, BookOpen, Hash, GraduationCap,
} from "lucide-react";

// ── Open To config — untouched ────────────────────────────────
const OPEN_TO_CONFIG = {
  hackathon:  { label: "Hackathon teams", icon: "⚡" },
  internship: { label: "Internships",     icon: "💼" },
  project:    { label: "Side projects",   icon: "🚀" },
  mentorship: { label: "Mentorship",      icon: "🎓" },
  fulltime:   { label: "Full-time roles", icon: "🏢" },
  collab:     { label: "Research collab", icon: "🔬" },
};

// ── Social config — untouched ─────────────────────────────────
const SOCIAL_CONFIG = {
  github:    { icon: Github,    label: "GitHub",    color: "#e2e8f0" },
  linkedin:  { icon: Linkedin,  label: "LinkedIn",  color: "#0ea5e9" },
  portfolio: { icon: Globe,     label: "Portfolio", color: "#a78bfa" },
  twitter:   { icon: Twitter,   label: "Twitter",   color: "#38bdf8" },
  instagram: { icon: Instagram, label: "Instagram", color: "#f472b6" },
};

// ── Section heading row ───────────────────────────────────────
function SectionHead({ icon: Icon, title, action }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        {Icon && (
          <div className="w-6 h-6 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
            <Icon size={12} className="text-indigo-400" />
          </div>
        )}
        <span
          className="text-xs font-semibold uppercase tracking-[0.07em] text-white/40"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {title}
        </span>
      </div>
      {action && (
        <button
          onClick={action.fn}
          className="text-[11px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-150 bg-transparent border-none cursor-pointer"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

// ── Sub-label inside sections ─────────────────────────────────
function SubLabel({ children }) {
  return (
    <p
      className="text-[10px] font-semibold uppercase tracking-[0.07em] text-white/25 mb-2"
      style={{ fontFamily: "var(--font-body)" }}
    >
      {children}
    </p>
  );
}

// ── About ─────────────────────────────────────────────────────
export function AboutSection({ user }) {
  // original logic — untouched
  if (!user?.bio) return null;

  return (
    <div>
      <SectionHead title="About" />
      <p
        className="text-sm leading-[1.75] text-white/60"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {user.bio}
      </p>
    </div>
  );
}

// ── Academic ──────────────────────────────────────────────────
export function AcademicSection({ user }) {
  // original data logic — untouched
  const cgpaNum = parseFloat(user?.cgpa);
  const hasCgpa = !isNaN(cgpaNum) && cgpaNum > 0;

  const cgpaColor =
    cgpaNum >= 8.5 ? "#34d399" :
    cgpaNum >= 7.0 ? "#6366f1" :
    cgpaNum >= 5.5 ? "#f59e0b" : "#f87171";

  const cgpaLabel =
    cgpaNum >= 9 ? "Exceptional" :
    cgpaNum >= 8 ? "Excellent"   :
    cgpaNum >= 7 ? "Good"        :
    cgpaNum >= 6 ? "Average"     : "Below avg";

  const fields = [
    { icon: BookOpen,      label: "Branch",      value: user?.branch },
    { icon: GraduationCap, label: "Year",        value: [user?.currentYear, user?.graduationYear ? `Graduating ${user.graduationYear}` : null].filter(Boolean).join(" · ") },
    { icon: Hash,          label: "Roll Number", value: user?.rollNumber },
  ].filter((f) => f.value);

  if (fields.length === 0 && !hasCgpa) return null;

  return (
    <div>
      <SectionHead icon={GraduationCap} title="Education" />

      {/* Fields */}
      <div className="space-y-3 mb-3">
        {fields.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/18 flex items-center justify-center flex-shrink-0">
              <Icon size={13} className="text-indigo-400" />
            </div>
            <div className="min-w-0">
              <p
                className="text-[10px] uppercase tracking-wider text-white/25 mb-0.5"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {label}
              </p>
              <p
                className="text-sm text-white/75 truncate"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CGPA — original logic untouched */}
      {hasCgpa && (
        <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          {/* Score circle */}
          <div
            className="w-12 h-12 rounded-2xl flex flex-col items-center justify-center flex-shrink-0"
            style={{ background: cgpaColor + "14", border: `1.5px solid ${cgpaColor}28` }}
          >
            <span
              className="text-base font-bold leading-none"
              style={{ color: cgpaColor, fontFamily: "var(--font-display)" }}
            >
              {cgpaNum.toFixed(1)}
            </span>
            <span className="text-[8px] text-white/25 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
              /10
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-white/40" style={{ fontFamily: "var(--font-body)" }}>
                CGPA
              </span>
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{
                  color: cgpaColor,
                  background: cgpaColor + "14",
                  border: `1px solid ${cgpaColor}25`,
                  fontFamily: "var(--font-body)",
                }}
              >
                {cgpaLabel}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(cgpaNum / 10) * 100}%`,
                  background: cgpaColor,
                  boxShadow: `0 0 8px ${cgpaColor}55`,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Skills & Interests ────────────────────────────────────────
export function SkillsSection({ user }) {
  // original data logic — untouched
  const skills    = user?.skills    || [];
  const interests = user?.interests || [];
  const openTo    = (user?.openTo   || []).map((id) => OPEN_TO_CONFIG[id]).filter(Boolean);

  if (skills.length === 0 && interests.length === 0 && openTo.length === 0) return null;

  return (
    <div className="space-y-5">
      <SectionHead title="Skills & Interests" />

      {/* Technical Skills */}
      {skills.length > 0 && (
        <div>
          <SubLabel>Technical Skills</SubLabel>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <span
                key={s}
                className="px-2.5 py-1 rounded-full text-xs font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/22 hover:bg-indigo-500/18 transition-colors duration-150 cursor-default"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Interests */}
      {interests.length > 0 && (
        <div>
          <SubLabel>Interests</SubLabel>
          <div className="flex flex-wrap gap-1.5">
            {interests.map((i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-full text-xs font-medium text-white/45 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] hover:text-white/65 transition-colors duration-150 cursor-default"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {i}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Open To */}
      {openTo.length > 0 && (
        <div>
          <SubLabel>Open to</SubLabel>
          <div className="flex flex-wrap gap-2">
            {openTo.map((item) => (
              <div
                key={item.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-emerald-300 bg-emerald-400/8 border border-emerald-400/18 cursor-default"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <span className="text-[12px]">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Social Links ──────────────────────────────────────────────
export function SocialSection({ user }) {
  // original data logic — untouched
  const links = Object.entries(SOCIAL_CONFIG)
    .map(([key, cfg]) => ({ key, cfg, value: user?.[key] }))
    .filter(({ value }) => value && value.trim().length > 0);

  if (links.length === 0) return null;

  return (
    <div>
      <SectionHead title="Links" />
      <div className="space-y-2">
        {links.map(({ key, cfg, value }) => {
          const Icon = cfg.icon;
          return (
            <a
              key={key}
              href={value.startsWith("http") ? value : `https://${value}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.07] group no-underline transition-all duration-150"
              onMouseEnter={(e) => {
                e.currentTarget.style.background   = "rgba(255,255,255,0.06)";
                e.currentTarget.style.borderColor  = cfg.color + "30";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background   = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor  = "rgba(255,255,255,0.07)";
              }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: cfg.color + "14", border: `1px solid ${cfg.color}28` }}
              >
                <Icon size={14} style={{ color: cfg.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-[10px] uppercase tracking-wider text-white/25 mb-0.5"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {cfg.label}
                </p>
                <p
                  className="text-xs text-white/60 truncate"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {value}
                </p>
              </div>
              <ExternalLink
                size={12}
                className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                style={{ color: cfg.color }}
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}