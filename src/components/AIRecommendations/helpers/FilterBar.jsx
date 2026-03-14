import { TYPE_CONFIG } from "./constants";

const ALL_TYPES = ["All", "Internship", "Open Source Program", "Hackathon", "Fellowship"];

export default function FilterBar({ active, onChange, counts }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
      {ALL_TYPES.map((type) => {
        const isActive = active === type;
        const conf = TYPE_CONFIG[type] || null;
        const count = counts?.[type];

        return (
          <button
            key={type}
            onClick={() => onChange(type)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium flex-shrink-0 transition-all duration-200"
            style={{
              background: isActive
                ? conf ? conf.bg : "rgba(99,102,241,0.2)"
                : "rgba(255,255,255,0.04)",
              border: isActive
                ? `1px solid ${conf ? conf.border : "rgba(99,102,241,0.4)"}`
                : "1px solid rgba(255,255,255,0.07)",
              color: isActive
                ? conf ? conf.color : "#a5b4fc"
                : "rgba(255,255,255,0.4)",
              fontFamily: "var(--font-body)",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; } }}
            onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; } }}
          >
            {conf && <span>{conf.icon}</span>}
            {type}
            {count !== undefined && (
              <span
                className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                style={{
                  background: isActive ? (conf ? conf.color + "25" : "rgba(99,102,241,0.2)") : "rgba(255,255,255,0.08)",
                  color: isActive ? (conf ? conf.color : "#a5b4fc") : "rgba(255,255,255,0.3)",
                  fontFamily: "var(--font-display)",
                }}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}