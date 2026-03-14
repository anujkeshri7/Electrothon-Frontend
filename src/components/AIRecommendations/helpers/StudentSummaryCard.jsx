import { Sparkles, Brain } from "lucide-react";

export default function StudentSummaryCard({ summary }) {
  return (
    <div
      className="rounded-2xl p-5 relative overflow-hidden"
      style={{
        background: "rgba(99,102,241,0.08)",
        border: "1px solid rgba(99,102,241,0.2)",
        boxShadow: "0 0 40px rgba(99,102,241,0.08)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      <div className="relative flex items-start gap-4">
        {/* Brain icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.2))",
            border: "1px solid rgba(99,102,241,0.35)",
            boxShadow: "0 4px 20px rgba(99,102,241,0.2)",
          }}
        >
          <Brain size={22} style={{ color: "#a5b4fc" }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={13} style={{ color: "#a5b4fc" }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#a5b4fc", fontFamily: "var(--font-body)", letterSpacing: "0.1em" }}
            >
              AI Profile Summary
            </span>
          </div>
          <p
            className="text-sm leading-7"
            style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)" }}
          >
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
}