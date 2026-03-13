import { useState, useEffect, useRef } from "react";
import {
  Search,
  ChevronRight,
  Building2,
  MapPin,
  X,
  ChevronDown,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

// ─── API Config ──────────────────────────────────────────────
const API_URL = import.meta.env.VITE_BACKEND_URL + "/api/collages/get"; // 🔁 Replace with your actual endpoint

// ─── Helpers ─────────────────────────────────────────────────
const TYPE_COLORS = {
  IIT: "#f97316",
  NIT: "#6366f1",
  IIM: "#10b981",
  AIIMS: "#ec4899",
  Central: "#14b8a6",
  State: "#3b82f6",
  Deemed: "#8b5cf6",
  default: "#a78bfa",
};

function getTypeColor(type) {
  return TYPE_COLORS[type] || TYPE_COLORS.default;
}

function getAbbr(name) {
  const words = name.split(" ").filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 4).toUpperCase();
  if (words[0].length >= 3) return words[0].toUpperCase().slice(0, 4);
  return (words[0] + words.slice(1).map((w) => w[0]).join("")).toUpperCase().slice(0, 5);
}

function normalize(c) {
  return {
    id: c._id,
    name: c.name,
    abbr: getAbbr(c.name),
    domain: c.studentIdEmailDomain,
    type: c.type,
    state: c.state,
    color: getTypeColor(c.type),
  };
}

export default function CollegeSelect({ onNext }) {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All");
  const [selected, setSelected] = useState(null);
  const [focused, setFocused] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
  const stateRef = useRef(null);

  const fetchColleges = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      if (!data.success) throw new Error("API returned success: false");
      setColleges(data.collages.map(normalize));
    } catch (err) {
      setError(err.message || "Failed to load colleges");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (stateRef.current && !stateRef.current.contains(e.target))
        setStateOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const allStates = ["All", ...Array.from(new Set(colleges.map((c) => c.state))).sort()];

  const filtered = colleges.filter((c) => {
    const q = query.toLowerCase();
    const matchQuery =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.abbr.toLowerCase().includes(q) ||
      c.state.toLowerCase().includes(q) ||
      c.domain.toLowerCase().includes(q) ||
      c.type.toLowerCase().includes(q);
    const matchState = selectedState === "All" || c.state === selectedState;
    return matchQuery && matchState;
  });

  const grouped = filtered.reduce((acc, c) => {
    if (!acc[c.type]) acc[c.type] = [];
    acc[c.type].push(c);
    return acc;
  }, {});
  const groupEntries = Object.entries(grouped);

  return (
    <div className="animate-fade-slide-up">
      {/* Header */}
      <div className="mb-6">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-medium tracking-wider uppercase"
          style={{
            background: "rgba(99,102,241,0.12)",
            border: "1px solid rgba(99,102,241,0.25)",
            color: "#a5b4fc",
            fontFamily: "var(--font-body)",
          }}
        >
          <Building2 size={11} />
          Step 1 of 4
        </div>
        <h2 className="text-2xl font-bold text-white mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
          Find your college
        </h2>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}>
          Search by name, state, or institution type
        </p>
      </div>

      {/* Search + State row */}
      <div className="flex gap-2 mb-2">
        <div className="relative flex-1">
          <div
            className="absolute left-3.5 top-1/2 -translate-y-1/2"
            style={{ color: focused ? "#6366f1" : "rgba(255,255,255,0.3)" }}
          >
            <Search size={15} />
          </div>
          <input
            type="text"
            placeholder="Search name, state, domain..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full pl-9 pr-8 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: focused ? "1px solid rgba(99,102,241,0.6)" : "1px solid rgba(255,255,255,0.08)",
              color: "white",
              fontFamily: "var(--font-body)",
              boxShadow: focused ? "0 0 0 3px rgba(99,102,241,0.1)" : "none",
            }}
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100">
              <X size={13} className="text-white" />
            </button>
          )}
        </div>

        {/* State dropdown */}
        <div className="relative flex-shrink-0" ref={stateRef}>
          <button
            onClick={() => setStateOpen((p) => !p)}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200"
            style={{
              background: selectedState !== "All" ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.04)",
              border: selectedState !== "All" ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.08)",
              color: selectedState !== "All" ? "#a5b4fc" : "rgba(255,255,255,0.5)",
              fontFamily: "var(--font-body)",
              whiteSpace: "nowrap",
              minWidth: "110px",
            }}
          >
            <MapPin size={13} />
            <span className="truncate max-w-[72px]">{selectedState === "All" ? "All States" : selectedState}</span>
            <ChevronDown
              size={13}
              className="flex-shrink-0 transition-transform duration-200"
              style={{ transform: stateOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>

          {stateOpen && (
            <div
              className="absolute right-0 top-full mt-1.5 rounded-xl overflow-hidden z-50"
              style={{
                background: "#0f0f1e",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                width: "185px",
                maxHeight: "220px",
                overflowY: "auto",
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(99,102,241,0.3) transparent",
              }}
            >
              {allStates.map((state) => (
                <button
                  key={state}
                  onClick={() => { setSelectedState(state); setStateOpen(false); }}
                  className="w-full text-left px-3.5 py-2 text-xs transition-colors duration-150"
                  style={{
                    background: selectedState === state ? "rgba(99,102,241,0.15)" : "transparent",
                    color: selectedState === state ? "#a5b4fc" : "rgba(255,255,255,0.55)",
                    fontFamily: "var(--font-body)",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                  onMouseEnter={(e) => { if (selectedState !== state) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={(e) => { if (selectedState !== state) e.currentTarget.style.background = "transparent"; }}
                >
                  {state}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Active filter chips */}
      {(selectedState !== "All" || query) && !loading && (
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
          {selectedState !== "All" && (
            <button
              onClick={() => setSelectedState("All")}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
              style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", color: "#a5b4fc", fontFamily: "var(--font-body)" }}
            >
              {selectedState} <X size={10} />
            </button>
          )}
        </div>
      )}

      {/* List */}
      <div
        className="overflow-y-auto pr-0.5"
        style={{ maxHeight: "280px", scrollbarWidth: "thin", scrollbarColor: "rgba(99,102,241,0.3) transparent" }}
      >
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Loader2 size={24} className="animate-spin" style={{ color: "#6366f1" }} />
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>Fetching colleges...</p>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}>
              <AlertCircle size={18} style={{ color: "#f87171" }} />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-display)" }}>Couldn't load colleges</p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-body)" }}>{error}</p>
            </div>
            <button
              onClick={fetchColleges}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium"
              style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", color: "#a5b4fc", fontFamily: "var(--font-body)" }}
            >
              <RefreshCw size={12} /> Retry
            </button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-10 text-sm" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>
            No colleges found
            {selectedState !== "All" && (
              <button onClick={() => setSelectedState("All")} className="block mx-auto mt-2 text-xs underline" style={{ color: "#6366f1" }}>
                Clear state filter
              </button>
            )}
          </div>
        )}

        {!loading && !error && groupEntries.map(([type, list]) => (
          <div key={type} className="mb-3">
            <div className="flex items-center gap-2 px-1 mb-1.5">
              <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
              <span className="text-[10px] font-semibold tracking-widest uppercase px-2" style={{ color: getTypeColor(type) + "cc", fontFamily: "var(--font-body)" }}>
                {type}s
              </span>
              <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.05)" }} />
            </div>
            <div className="space-y-1.5">
              {list.map((college) => {
                const isSelected = selected?.id === college.id;
                return (
                  <button
                    key={college.id}
                    onClick={() => setSelected(college)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200"
                    style={{
                      background: isSelected ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.03)",
                      border: isSelected ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.06)",
                      boxShadow: isSelected ? "0 0 20px rgba(99,102,241,0.1)" : "none",
                    }}
                    onMouseEnter={(e) => { if (!isSelected) { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; } }}
                    onMouseLeave={(e) => { if (!isSelected) { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; } }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: isSelected ? college.color + "25" : "rgba(255,255,255,0.05)",
                        border: `1px solid ${isSelected ? college.color + "50" : "rgba(255,255,255,0.08)"}`,
                        color: isSelected ? college.color : "rgba(255,255,255,0.4)",
                        fontFamily: "var(--font-display)",
                        fontSize: "9px",
                        fontWeight: 700,
                      }}
                    >
                      {college.abbr.slice(0, 4)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate" style={{ color: isSelected ? "white" : "rgba(255,255,255,0.8)", fontFamily: "var(--font-display)" }}>
                        {college.name}
                      </div>
                      <div className="flex items-center gap-1 mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                        <MapPin size={10} />
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "11px" }}>{college.state}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full hidden sm:block"
                        style={{
                          background: isSelected ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.04)",
                          color: isSelected ? "#a5b4fc" : "rgba(255,255,255,0.25)",
                          fontFamily: "var(--font-body)",
                          border: `1px solid ${isSelected ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.07)"}`,
                        }}
                      >
                        @{college.domain}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(99,102,241,0.8)" }}>
                          <ChevronRight size={11} className="text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={() => selected && onNext(selected)}
        disabled={!selected || loading}
        className="w-full mt-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
        style={{
          background: selected ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "rgba(255,255,255,0.04)",
          color: selected ? "white" : "rgba(255,255,255,0.2)",
          fontFamily: "var(--font-display)",
          border: selected ? "1px solid rgba(99,102,241,0.5)" : "1px solid rgba(255,255,255,0.06)",
          boxShadow: selected ? "0 8px 30px rgba(99,102,241,0.35)" : "none",
          cursor: selected ? "pointer" : "not-allowed",
          letterSpacing: "0.02em",
        }}
      >
        {selected ? (
          <> Continue with {selected.name} <ChevronRight size={16} /> </>
        ) : (
          "Select a college to continue"
        )}
      </button>
    </div>
  );
}