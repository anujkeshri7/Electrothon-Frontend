import { useState } from "react";
import { Zap, Heart, Target, ChevronRight, ArrowLeft, X, Plus } from "lucide-react";
import { POPULAR_SKILLS, INTERESTS, OPEN_TO } from "./constants";

const MAX_SKILLS = 10;
const MAX_INTERESTS = 6;

function TagPill({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
      style={{
        background: selected ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)",
        border: selected ? "1px solid rgba(99,102,241,0.5)" : "1px solid rgba(255,255,255,0.08)",
        color: selected ? "#a5b4fc" : "rgba(255,255,255,0.45)",
        fontFamily: "var(--font-body)",
        cursor: "pointer",
        boxShadow: selected ? "0 0 12px rgba(99,102,241,0.15)" : "none",
      }}
    >
      {selected && <X size={10} />}
      {label}
    </button>
  );
}

function OpenToCard({ item, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 p-3 rounded-xl text-left w-full transition-all duration-200"
      style={{
        background: selected ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.03)",
        border: selected ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.07)",
        cursor: "pointer",
        boxShadow: selected ? "0 0 16px rgba(99,102,241,0.1)" : "none",
      }}
      onMouseEnter={(e) => { if (!selected) e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
      onMouseLeave={(e) => { if (!selected) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
    >
      <span className="text-lg">{item.icon}</span>
      <span
        className="text-sm font-medium"
        style={{ color: selected ? "#a5b4fc" : "rgba(255,255,255,0.65)", fontFamily: "var(--font-display)" }}
      >
        {item.label}
      </span>
      <div
        className="ml-auto w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
        style={{
          background: selected ? "rgba(99,102,241,0.8)" : "rgba(255,255,255,0.08)",
          border: selected ? "none" : "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {selected && (
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    </button>
  );
}

export default function SkillsInterests({ data, onNext, onBack }) {
  const [skills, setSkills] = useState(data.skills || []);
  const [interests, setInterests] = useState(data.interests || []);
  const [openTo, setOpenTo] = useState(data.openTo || []);
  const [customSkill, setCustomSkill] = useState("");
  const [skillFocused, setSkillFocused] = useState(false);

  const toggleSkill = (s) => {
    setSkills((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : prev.length < MAX_SKILLS ? [...prev, s] : prev
    );
  };

  const toggleInterest = (i) => {
    setInterests((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : prev.length < MAX_INTERESTS ? [...prev, i] : prev
    );
  };

  const toggleOpenTo = (id) => {
    setOpenTo((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const addCustomSkill = () => {
    const s = customSkill.trim();
    if (!s || skills.includes(s) || skills.length >= MAX_SKILLS) return;
    setSkills((prev) => [...prev, s]);
    setCustomSkill("");
  };

  const SectionLabel = ({ icon: Icon, children, count, max }) => (
    <div className="flex items-center justify-between mb-3">
      <div
        className="flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase"
        style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)", letterSpacing: "0.07em" }}
      >
        <Icon size={11} />
        {children}
      </div>
      {max && (
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-body)" }}>
          {count}/{max}
        </span>
      )}
    </div>
  );

  return (
    <div className="animate-fade-slide-in">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs mb-4 transition-opacity hover:opacity-80"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)", background: "none", border: "none", cursor: "pointer" }}
        >
          <ArrowLeft size={13} /> Back
        </button>
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-medium tracking-wider uppercase"
          style={{
            background: "rgba(99,102,241,0.12)",
            border: "1px solid rgba(99,102,241,0.25)",
            color: "#a5b4fc",
            fontFamily: "var(--font-body)",
          }}
        >
          <Zap size={11} />
          Step 3 of 4
        </div>
        <h2 className="text-2xl font-bold text-white mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
          What are you into?
        </h2>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>
          Skills and interests help others find you
        </p>
      </div>

      <div
        className="space-y-6 overflow-y-auto pr-1"
        style={{ maxHeight: "360px", scrollbarWidth: "thin", scrollbarColor: "rgba(99,102,241,0.3) transparent" }}
      >
        {/* Skills */}
        <div>
          <SectionLabel icon={Zap} count={skills.length} max={MAX_SKILLS}>
            Technical Skills
          </SectionLabel>

          {/* Custom skill input */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Add a custom skill..."
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCustomSkill()}
              onFocus={() => setSkillFocused(true)}
              onBlur={() => setSkillFocused(false)}
              className="flex-1 px-3 py-2 rounded-xl text-sm"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: skillFocused ? "1px solid rgba(99,102,241,0.6)" : "1px solid rgba(255,255,255,0.08)",
                color: "white",
                fontFamily: "var(--font-body)",
                outline: "none",
                boxShadow: skillFocused ? "0 0 0 3px rgba(99,102,241,0.1)" : "none",
                transition: "all 0.2s",
              }}
            />
            <button
              onClick={addCustomSkill}
              disabled={skills.length >= MAX_SKILLS || !customSkill.trim()}
              className="px-3 py-2 rounded-xl flex items-center gap-1 text-xs font-medium transition-all duration-200"
              style={{
                background: customSkill.trim() && skills.length < MAX_SKILLS ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)",
                border: "1px solid rgba(99,102,241,0.3)",
                color: customSkill.trim() && skills.length < MAX_SKILLS ? "#a5b4fc" : "rgba(255,255,255,0.2)",
                fontFamily: "var(--font-body)",
                cursor: "pointer",
              }}
            >
              <Plus size={14} /> Add
            </button>
          </div>

          {/* Selected skills */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3 p-3 rounded-xl" style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)" }}>
              {skills.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSkill(s)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-150"
                  style={{
                    background: "rgba(99,102,241,0.2)",
                    border: "1px solid rgba(99,102,241,0.4)",
                    color: "#a5b4fc",
                    fontFamily: "var(--font-body)",
                    cursor: "pointer",
                  }}
                >
                  {s} <X size={10} />
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5">
            {POPULAR_SKILLS.filter((s) => !skills.includes(s)).map((s) => (
              <TagPill key={s} label={s} selected={false} onClick={() => toggleSkill(s)} />
            ))}
          </div>
          {skills.length >= MAX_SKILLS && (
            <p className="text-xs mt-2" style={{ color: "#f59e0b", fontFamily: "var(--font-body)" }}>
              Max {MAX_SKILLS} skills reached
            </p>
          )}
        </div>

        {/* Interests */}
        <div>
          <SectionLabel icon={Heart} count={interests.length} max={MAX_INTERESTS}>
            Interests
          </SectionLabel>
          <div className="flex flex-wrap gap-1.5">
            {INTERESTS.map((i) => (
              <TagPill
                key={i}
                label={i}
                selected={interests.includes(i)}
                onClick={() => toggleInterest(i)}
              />
            ))}
          </div>
          {interests.length >= MAX_INTERESTS && (
            <p className="text-xs mt-2" style={{ color: "#f59e0b", fontFamily: "var(--font-body)" }}>
              Max {MAX_INTERESTS} interests reached
            </p>
          )}
        </div>

        {/* Open to */}
        <div>
          <SectionLabel icon={Target}>
            Open to
          </SectionLabel>
          <div className="grid grid-cols-2 gap-2">
            {OPEN_TO.map((item) => (
              <OpenToCard
                key={item.id}
                item={item}
                selected={openTo.includes(item.id)}
                onClick={() => toggleOpenTo(item.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => onNext({ skills, interests, openTo })}
        className="w-full mt-5 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: "white",
          fontFamily: "var(--font-display)",
          border: "1px solid rgba(99,102,241,0.4)",
          boxShadow: "0 8px 30px rgba(99,102,241,0.3)",
          letterSpacing: "0.02em",
          cursor: "pointer",
        }}
      >
        Continue
        <ChevronRight size={16} />
      </button>
    </div>
  );
}