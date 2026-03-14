import { useState } from "react";
import { Link, Github, Linkedin, Globe, Instagram, Twitter, ChevronRight, ArrowLeft } from "lucide-react";

const SOCIAL_FIELDS = [
  {
    id: "github",
    label: "GitHub",
    icon: Github,
    placeholder: "github.com/yourusername",
    prefix: "github.com/",
    color: "#e2e8f0",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
    placeholder: "linkedin.com/in/yourname",
    prefix: "linkedin.com/in/",
    color: "#0ea5e9",
  },
  {
    id: "portfolio",
    label: "Portfolio / Website",
    icon: Globe,
    placeholder: "yourportfolio.dev",
    prefix: "",
    color: "#a78bfa",
  },
  {
    id: "twitter",
    label: "Twitter / X",
    icon: Twitter,
    placeholder: "@yourhandle",
    prefix: "x.com/",
    color: "#38bdf8",
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: Instagram,
    placeholder: "@yourhandle",
    prefix: "instagram.com/",
    color: "#f472b6",
  },
];

function SocialInput({ field, value, onChange  }) {
  const [focused, setFocused] = useState(false);
  const Icon = field.icon;
  const hasValue = value && value.trim().length > 0;

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200"
      style={{
        background: focused
          ? "rgba(99,102,241,0.08)"
          : hasValue
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.025)",
        border: focused
          ? "1px solid rgba(99,102,241,0.5)"
          : hasValue
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid rgba(255,255,255,0.06)",
        boxShadow: focused ? "0 0 0 3px rgba(99,102,241,0.08)" : "none",
      }}
    >
      {/* Icon */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
        style={{
          background: hasValue || focused
            ? field.color + "18"
            : "rgba(255,255,255,0.05)",
          border: `1px solid ${hasValue || focused ? field.color + "35" : "rgba(255,255,255,0.08)"}`,
        }}
      >
        <Icon
          size={15}
          style={{ color: hasValue || focused ? field.color : "rgba(255,255,255,0.3)" }}
        />
      </div>

      {/* Input */}
      <div className="flex-1 min-w-0">
        <div
          className="text-[10px] font-medium mb-0.5 uppercase tracking-wider"
          style={{ color: hasValue || focused ? field.color : "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}
        >
          {field.label}
        </div>
        <input
          type="text"
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full text-sm bg-transparent outline-none"
          style={{
            color: "rgba(255,255,255,0.85)",
            fontFamily: "var(--font-body)",
            caretColor: "#6366f1",
          }}
        />
      </div>

      {/* Check indicator */}
      {hasValue && (
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.3)" }}
        >
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </div>
  );
}

export default function SocialLinks({ data, onNext, onBack, onSubmit }) {
  const [links, setLinks] = useState({
    github: data.github || "",
    linkedin: data.linkedin || "",
    portfolio: data.portfolio || "",
    twitter: data.twitter || "",
    instagram: data.instagram || "",
  });

  

  const filledCount = Object.values(links).filter((v) => v.trim()).length;

  return (
    <div className="animate-fade-slide-in">
      {/* Header */}
      <div className="mb-7">
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
          <Link size={11} />
          Step 4 of 4
        </div>
        <h2 className="text-2xl font-bold text-white mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
          Your links
        </h2>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>
          All optional — add what you're comfortable sharing
        </p>
      </div>

      {/* Progress indicator */}
      {filledCount > 0 && (
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg mb-4"
          style={{
            background: "rgba(52,211,153,0.07)",
            border: "1px solid rgba(52,211,153,0.15)",
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#34d399" }}
          />
          <span className="text-xs" style={{ color: "rgba(52,211,153,0.8)", fontFamily: "var(--font-body)" }}>
            {filledCount} link{filledCount > 1 ? "s" : ""} added
          </span>
        </div>
      )}

      {/* Social inputs */}
      <div className="space-y-2.5">
        {SOCIAL_FIELDS.map((field) => (
          <SocialInput
            key={field.id}
            field={field}
            value={links[field.id]}
            onChange={(val) => setLinks((p) => ({ ...p, [field.id]: val }))}
          />
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={async () => {
  try {
    await onSubmit();   // pehle submit
    onNext(links);      // success hua to next
  } catch (error) {
    console.log(error); // error aya to next nahi chalega
  }
}}
        className="w-full mt-6 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300"
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
        {filledCount > 0 ? "Save & Complete Profile" : "Skip & Complete Profile"}
        <ChevronRight size={16} />
      </button>
    </div>
  );
}