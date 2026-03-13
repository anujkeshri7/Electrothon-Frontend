import { Github, Globe, Twitter, Instagram, Linkedin, ExternalLink, BookOpen, Hash, GraduationCap } from "lucide-react";

// ── Reusable section wrapper ─────────────────────────────────
function Section({ title, icon: Icon, children, action }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}
        >
          {Icon && <Icon size={12} />}
          {title}
        </div>
        {action && (
          <button
            className="text-xs transition-opacity hover:opacity-80"
            style={{ color: "#6366f1", fontFamily: "var(--font-body)", background: "none", border: "none", cursor: "pointer" }}
            onClick={action.fn}
          >
            {action.label}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

// ── About Section ────────────────────────────────────────────
export function AboutSection({ user }) {
  if (!user.bio) return null;
  return (
    <Section title="About">
      <p
        className="text-sm leading-relaxed"
        style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}
      >
        {user.bio}
      </p>
    </Section>
  );
}

// ── Academic Section ─────────────────────────────────────────
export function AcademicSection({ user }) {
  const cgpaColor =
    user.cgpa >= 8.5 ? "#34d399" :
    user.cgpa >= 7.0 ? "#6366f1" :
    user.cgpa >= 5.5 ? "#f59e0b" : "#f87171";

  const cgpaLabel =
    user.cgpa >= 9 ? "Exceptional" :
    user.cgpa >= 8 ? "Excellent" :
    user.cgpa >= 7 ? "Good" :
    user.cgpa >= 6 ? "Average" : "Below avg";

  const fields = [
    { icon: BookOpen, label: "Branch", value: user.branch },
    { icon: GraduationCap, label: "Year", value: `${user.currentYear} · Graduating ${user.graduationYear}` },
    { icon: Hash, label: "Roll Number", value: user.rollNumber },
  ].filter((f) => f.value);

  return (
    <Section title="Academic" icon={GraduationCap}>
      <div className="space-y-3">
        {fields.map((f) => (
          <div key={f.label} className="flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{
                background: "rgba(99,102,241,0.1)",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
            >
              <f.icon size={13} style={{ color: "#a5b4fc" }} />
            </div>
            <div>
              <div
                className="text-[10px] font-medium uppercase tracking-wider mb-0.5"
                style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}
              >
                {f.label}
              </div>
              <div
                className="text-sm"
                style={{ color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)" }}
              >
                {f.value}
              </div>
            </div>
          </div>
        ))}

        {/* CGPA bar */}
        {user.cgpa && (
          <div
            className="mt-1 p-3 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}
              >
                CGPA · {cgpaLabel}
              </span>
              <span
                className="text-sm font-bold"
                style={{ color: cgpaColor, fontFamily: "var(--font-display)" }}
              >
                {user.cgpa} / 10
              </span>
            </div>
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.07)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(user.cgpa / 10) * 100}%`,
                  background: cgpaColor,
                  boxShadow: `0 0 8px ${cgpaColor}60`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}

// ── Skills Section ───────────────────────────────────────────
export function SkillsSection({ user }) {
  return (
    <Section title="Skills & Interests">
      {/* Skills */}
      {user.skills?.length > 0 && (
        <div className="mb-4">
          <div
            className="text-[10px] font-medium uppercase tracking-wider mb-2"
            style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-body)" }}
          >
            Technical Skills
          </div>
          <div className="flex flex-wrap gap-1.5">
            {user.skills.map((s) => (
              <span
                key={s}
                className="px-2.5 py-1 rounded-full text-xs font-medium"
                style={{
                  background: "rgba(99,102,241,0.12)",
                  border: "1px solid rgba(99,102,241,0.25)",
                  color: "#a5b4fc",
                  fontFamily: "var(--font-body)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Interests */}
      {user.interests?.length > 0 && (
        <div className="mb-4">
          <div
            className="text-[10px] font-medium uppercase tracking-wider mb-2"
            style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-body)" }}
          >
            Interests
          </div>
          <div className="flex flex-wrap gap-1.5">
            {user.interests.map((i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-full text-xs font-medium"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.55)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {i}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Open To */}
      {user.openTo?.length > 0 && (
        <div>
          <div
            className="text-[10px] font-medium uppercase tracking-wider mb-2"
            style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-body)" }}
          >
            Open to
          </div>
          <div className="flex flex-wrap gap-2">
            {user.openTo.map((item) => (
              <div
                key={item.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: "rgba(52,211,153,0.08)",
                  border: "1px solid rgba(52,211,153,0.2)",
                  color: "#34d399",
                  fontFamily: "var(--font-body)",
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}

// ── Social Links Section ─────────────────────────────────────
const SOCIAL_CONFIG = {
  github:    { icon: Github,   label: "GitHub",    color: "#e2e8f0" },
  linkedin:  { icon: Linkedin, label: "LinkedIn",  color: "#0ea5e9" },
  portfolio: { icon: Globe,    label: "Portfolio", color: "#a78bfa" },
  twitter:   { icon: Twitter,  label: "Twitter",   color: "#38bdf8" },
  instagram: { icon: Instagram,label: "Instagram", color: "#f472b6" },
};

export function SocialSection({ user }) {
  const links = Object.entries(user.socials || {}).filter(([, v]) => v);
  if (links.length === 0) return null;

  return (
    <Section title="Links">
      <div className="space-y-2">
        {links.map(([key, value]) => {
          const cfg = SOCIAL_CONFIG[key];
          if (!cfg) return null;
          const Icon = cfg.icon;
          return (
            <a
              key={key}
              href={value.startsWith("http") ? value : `https://${value}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.borderColor = cfg.color + "30";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: cfg.color + "15",
                  border: `1px solid ${cfg.color}30`,
                }}
              >
                <Icon size={14} style={{ color: cfg.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-[10px] uppercase tracking-wider mb-0.5"
                  style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}
                >
                  {cfg.label}
                </div>
                <div
                  className="text-xs truncate"
                  style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}
                >
                  {value}
                </div>
              </div>
              <ExternalLink
                size={13}
                className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: cfg.color }}
              />
            </a>
          );
        })}
      </div>
    </Section>
  );
}