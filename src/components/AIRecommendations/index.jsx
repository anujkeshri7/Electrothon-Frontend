import { useState } from "react";
import { Sparkles, ArrowLeft, RefreshCw, Trophy, Zap } from "lucide-react";
import { DUMMY_RESPONSE } from "./helpers/constants";
import StudentSummaryCard from "./helpers/StudentSummaryCard";
import OpportunityCard from "./helpers/OpportunityCard";
import FilterBar from "./helpers/FilterBar";
import Navbar from "../HomePage/helpers/Navbar";

export default function AIRecommendations() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  const { student_summary, recommended_opportunities } =
    DUMMY_RESPONSE.data.output;

  // Type normalization for filter matching
  const normalizeType = (type) => {
    if (type.toLowerCase().includes("hackathon")) return "Hackathon";
    if (type.toLowerCase().includes("open source")) return "Open Source Program";
    if (type.toLowerCase().includes("internship")) return "Internship";
    if (type.toLowerCase().includes("fellowship")) return "Fellowship";
    return type;
  };

  // Count per type for filter badges
  const counts = recommended_opportunities.reduce((acc, opp) => {
    const t = normalizeType(opp.type);
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, { All: recommended_opportunities.length });

  const filtered =
    activeFilter === "All"
      ? recommended_opportunities
      : recommended_opportunities.filter(
          (o) => normalizeType(o.type) === activeFilter
        );

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1800);
  };

  return (
    <div
      className="min-h-screen relative"
      style={{ background: "#070711" }}
    >

        <Navbar/>
      {/* ── Ambient blobs ── */}
      <div className="fixed pointer-events-none" style={{ top: "-10%", left: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 65%)", filter: "blur(80px)", zIndex: 0 }} />
      <div className="fixed pointer-events-none" style={{ bottom: "-15%", right: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 65%)", filter: "blur(80px)", zIndex: 0 }} />

      {/* Grid */}
      <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)`, backgroundSize: "60px 60px", zIndex: 0 }} />

      {/* ── Page content ── */}
      <div className="relative z-10 mx-auto px-4 py-8" style={{ maxWidth: "900px" }}>

        {/* Back button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-sm mb-6 transition-opacity hover:opacity-80"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)", background: "none", border: "none", cursor: "pointer" }}
        >
          <ArrowLeft size={15} />
          Back to home
        </button>

        {/* ── Page header ── */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3 text-xs font-medium"
                style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", color: "#a5b4fc", fontFamily: "var(--font-body)" }}
              >
                <Sparkles size={11} />
                AI-Powered · Personalized for you
              </div>
              <h1
                className="text-3xl font-bold text-white mb-2 leading-tight"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
              >
                Your Opportunities
              </h1>
              <p
                className="text-sm"
                style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}
              >
                {recommended_opportunities.length} curated matches based on your profile
              </p>
            </div>

            {/* Stats pills + Refresh */}
            <div className="flex items-center gap-3 flex-wrap">
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}
              >
                <Trophy size={14} style={{ color: "#34d399" }} />
                <span className="text-xs font-semibold" style={{ color: "#34d399", fontFamily: "var(--font-display)" }}>
                  {recommended_opportunities.length} Matches
                </span>
              </div>
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "var(--font-body)",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
                onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.background = "rgba(99,102,241,0.15)"; e.currentTarget.style.color = "#a5b4fc"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)"; } }}
                onMouseLeave={(e) => { if (!loading) { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; } }}
              >
                <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
                {loading ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          </div>
        </div>

        {/* ── AI Summary ── */}
        <div className="mb-6">
          <StudentSummaryCard summary={student_summary} />
        </div>

        {/* ── Filter bar ── */}
        <div className="mb-6">
          <FilterBar
            active={activeFilter}
            onChange={setActiveFilter}
            counts={counts}
          />
        </div>

        {/* ── Results header ── */}
        <div className="flex items-center gap-2 mb-4">
          <Zap size={14} style={{ color: "#a5b4fc" }} />
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)", letterSpacing: "0.1em" }}
          >
            {activeFilter === "All" ? "All Opportunities" : activeFilter}
          </span>
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
          <span
            className="text-xs"
            style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-body)" }}
          >
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* ── Cards grid ── */}
        {loading ? (
          // Skeleton loader
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl p-5 animate-pulse"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", height: "200px" }}
              />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((opp, i) => (
              <OpportunityCard key={opp.title} opp={opp} index={i} />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-16 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-body)", fontSize: "14px" }}
          >
            No opportunities found for this filter
          </div>
        )}

        {/* ── Bottom note ── */}
        <p
          className="text-center text-xs mt-8 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-body)" }}
        >
          Recommendations are generated by AI based on your profile · Deadlines may change — always verify on official websites
        </p>
      </div>
    </div>
  );
}