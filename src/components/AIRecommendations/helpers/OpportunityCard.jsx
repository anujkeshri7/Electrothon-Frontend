import { useState } from "react";
import {
  ExternalLink, Clock, Users, ChevronDown, ChevronUp,
  Sparkles, Building2, CheckCircle2,
} from "lucide-react";
import { TYPE_CONFIG, DIFFICULTY_CONFIG } from "./constants";

export default function OpportunityCard({ opp, index }) {
  const [expanded, setExpanded] = useState(false);

  const typeConf = TYPE_CONFIG[opp.type] || TYPE_CONFIG.default;
  const diffConf = DIFFICULTY_CONFIG[opp.difficulty] || DIFFICULTY_CONFIG.default;

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300 animate-fade-slide-up"
      style={{
        background: "rgba(255,255,255,0.028)",
        border: `1px solid rgba(255,255,255,0.08)`,
        animationDelay: `${index * 80}ms`,
        animationFillMode: "both",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = typeConf.color + "35"; e.currentTarget.style.boxShadow = `0 8px 32px ${typeConf.color}10`; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div className="p-5">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          {/* Icon + title */}
          <div className="flex items-start gap-3 min-w-0">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: typeConf.bg, border: `1px solid ${typeConf.border}` }}
            >
              {typeConf.icon}
            </div>
            <div className="min-w-0">
              <h3
                className="text-base font-bold text-white leading-tight mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {opp.title}
              </h3>
              <div className="flex items-center gap-1.5 flex-wrap">
                <Building2 size={11} style={{ color: "rgba(255,255,255,0.35)", flexShrink: 0 }} />
                <span
                  className="text-xs truncate"
                  style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}
                >
                  {opp.organization}
                </span>
              </div>
            </div>
          </div>

          {/* Difficulty badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full flex-shrink-0 text-[10px] font-bold uppercase tracking-wider"
            style={{
              background: diffConf.bg,
              border: `1px solid ${diffConf.border}`,
              color: diffConf.color,
              fontFamily: "var(--font-body)",
              letterSpacing: "0.08em",
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: diffConf.dot }} />
            {opp.difficulty}
          </div>
        </div>

        {/* Type + Deadline row */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
            style={{ background: typeConf.bg, border: `1px solid ${typeConf.border}`, color: typeConf.color, fontFamily: "var(--font-body)" }}
          >
            {opp.type}
          </span>
          <span
            className="inline-flex items-center gap-1.5 text-xs"
            style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}
          >
            <Clock size={11} />
            {opp.deadline}
          </span>
        </div>

        {/* Why recommended */}
        <div
          className="rounded-xl p-3.5 mb-4"
          style={{ background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.15)" }}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles size={11} style={{ color: "#a5b4fc", flexShrink: 0 }} />
            <span
              className="text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: "#a5b4fc", fontFamily: "var(--font-body)" }}
            >
              Why this is for you
            </span>
          </div>
          <p
            className="text-xs leading-relaxed"
            style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}
          >
            {opp.why_recommended}
          </p>
        </div>

        {/* Expandable: Eligibility */}
        <button
          onClick={() => setExpanded((e) => !e)}
          className="flex items-center gap-2 w-full text-xs transition-opacity hover:opacity-80 mb-4"
          style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)", textAlign: "left" }}
        >
          <Users size={12} />
          <span className="flex-1">Eligibility</span>
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>

        {expanded && (
          <div
            className="mb-4 px-3.5 py-3 rounded-xl animate-fade-slide-up"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex items-start gap-2">
              <CheckCircle2 size={13} className="flex-shrink-0 mt-0.5" style={{ color: "#34d399" }} />
              <p
                className="text-xs leading-relaxed"
                style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}
              >
                {opp.eligibility}
              </p>
            </div>
          </div>
        )}

        {/* Apply button */}
        <a
          href={opp.apply_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 group"
          style={{
            background: `linear-gradient(135deg, ${typeConf.color}22, ${typeConf.color}12)`,
            border: `1px solid ${typeConf.color}40`,
            color: typeConf.color,
            fontFamily: "var(--font-display)",
            textDecoration: "none",
            letterSpacing: "0.02em",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = `linear-gradient(135deg, ${typeConf.color}35, ${typeConf.color}22)`; e.currentTarget.style.boxShadow = `0 4px 20px ${typeConf.color}25`; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = `linear-gradient(135deg, ${typeConf.color}22, ${typeConf.color}12)`; e.currentTarget.style.boxShadow = "none"; }}
        >
          Apply Now
          <ExternalLink size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
}