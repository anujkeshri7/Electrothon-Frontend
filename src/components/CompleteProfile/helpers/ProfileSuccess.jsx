import { useEffect, useState } from "react";
import { Sparkles, ArrowRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileSuccess({ profileData }) {
  const [show, setShow] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const t1 = setTimeout(() => setShow(true), 300);
    const t2 = setTimeout(() => setShowActions(true), 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const skillsCount = profileData?.skills?.length || 0;
  const linksCount = Object.values(profileData?.links || {}).filter(Boolean).length;

  const stats = [
    { label: "Skills added", value: skillsCount, color: "#6366f1" },
    { label: "Links connected", value: linksCount, color: "#34d399" },
    { label: "Profile strength", value: `${Math.min(100, 40 + skillsCount * 5 + linksCount * 8)}%`, color: "#f59e0b" },
  ];

  return (
    <div className="text-center">
      {/* Animated checkmark */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: "rgba(99,102,241,0.15)", animationDuration: "1.5s" }}
          />
          <div
            className="absolute inset-[-8px] rounded-full"
            style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.12)" }}
          />
          <div
            className="relative w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.15))",
              border: "2px solid rgba(99,102,241,0.4)",
              boxShadow: "0 0 40px rgba(99,102,241,0.25), 0 0 80px rgba(99,102,241,0.1)",
            }}
          >
            <Sparkles size={32} style={{ color: "#a5b4fc" }} />
          </div>
        </div>
      </div>

      {/* Text */}
      <div
        className="transition-all duration-500"
        style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(12px)" }}
      >
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4"
          style={{
            background: "rgba(99,102,241,0.12)",
            border: "1px solid rgba(99,102,241,0.25)",
            color: "#a5b4fc",
            fontFamily: "var(--font-body)",
          }}
        >
          <Sparkles size={11} />
          Profile Complete!
        </div>

        <h2
          className="text-2xl font-bold text-white mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          You're all set 🚀
        </h2>
        <p
          className="text-sm"
          style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}
        >
          Your verified student profile is live
        </p>
      </div>

      {/* Stats row */}
      <div
        className="grid grid-cols-3 gap-3 my-6 transition-all duration-500"
        style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(12px)", transitionDelay: "150ms" }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center p-3 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span
              className="text-xl font-bold mb-1"
              style={{ color: stat.color, fontFamily: "var(--font-display)" }}
            >
              {stat.value}
            </span>
            <span
              className="text-[10px] text-center leading-tight"
              style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <div
        className="h-px w-full mb-6"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />

      {/* Actions */}
      <div
        className="space-y-3 transition-all duration-500"
        style={{
          opacity: showActions ? 1 : 0,
          transform: showActions ? "translateY(0)" : "translateY(12px)",
        }}
      >
        <button
          onClick={() => navigate('/')}
          className="w-full py-4 rounded-xl text-sm font-semibold flex items-center justify-between px-5 group transition-all duration-200"
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "white",
            fontFamily: "var(--font-display)",
            border: "1px solid rgba(99,102,241,0.4)",
            boxShadow: "0 8px 30px rgba(99,102,241,0.35)",
            cursor: "pointer",
            letterSpacing: "0.02em",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <Users size={15} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold">Explore your campus</div>
              <div className="text-xs opacity-70 font-normal mt-0.5">See who else is on the platform</div>
            </div>
          </div>
          <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
        </button>

        <button
          onClick={() => alert("Redirecting to your Profile...")}
          className="w-full py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.45)",
            fontFamily: "var(--font-body)",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
        >
          View my profile
        </button>
      </div>
    </div>
  );
}