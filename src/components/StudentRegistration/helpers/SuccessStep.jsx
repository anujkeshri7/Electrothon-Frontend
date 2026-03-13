import { useEffect, useState } from "react";
import { CheckCircle2, Sparkles, ArrowRight, Home, User } from "lucide-react";

export default function SuccessStep({ name, college }) {
  const [showContent, setShowContent] = useState(false);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowContent(true), 400);
    const t2 = setTimeout(() => setShowActions(true), 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleCompleteProfile = () => {
    // Redirect to profile completion page
    alert("Redirecting to Complete Profile page...");
    // In real app: navigate('/complete-profile')
  };

  const handleSkip = () => {
    // Redirect to home
    alert("Redirecting to Home page...");
    // In real app: navigate('/home')
  };

  return (
    <div className="text-center">
      {/* Animated checkmark */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          {/* Glow rings */}
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              background: "rgba(52,211,153,0.15)",
              animationDuration: "1.5s",
            }}
          />
          <div
            className="absolute inset-[-8px] rounded-full"
            style={{
              background: "rgba(52,211,153,0.08)",
              border: "1px solid rgba(52,211,153,0.15)",
            }}
          />
          <div
            className="relative w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(52,211,153,0.2), rgba(16,185,129,0.15))",
              border: "2px solid rgba(52,211,153,0.4)",
              boxShadow: "0 0 40px rgba(52,211,153,0.25), 0 0 80px rgba(52,211,153,0.1)",
            }}
          >
            <CheckCircle2
              size={36}
              style={{ color: "#34d399" }}
              strokeWidth={1.5}
            />
          </div>
        </div>
      </div>

      {/* Text content */}
      <div
        className="transition-all duration-500"
        style={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? "translateY(0)" : "translateY(12px)",
        }}
      >
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4"
          style={{
            background: "rgba(52,211,153,0.1)",
            border: "1px solid rgba(52,211,153,0.25)",
            color: "#34d399",
            fontFamily: "var(--font-body)",
          }}
        >
          <Sparkles size={11} />
          Email Verified Successfully
        </div>

        <h2
          className="text-2xl font-bold text-white mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Welcome aboard{name ? `, ${name.split(" ")[0]}` : ""}! 🎉
        </h2>
        <p
          className="text-sm mb-1"
          style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}
        >
          Your student account has been created
        </p>
        {college && (
          <p
            className="text-xs"
            style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}
          >
            Verified as a student at{" "}
            <span style={{ color: college.color }}>{college.shortName}</span>
          </p>
        )}
      </div>

      {/* Divider */}
      <div
        className="my-7 h-px w-full"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />

      {/* Action buttons */}
      <div
        className="space-y-3 transition-all duration-500"
        style={{
          opacity: showActions ? 1 : 0,
          transform: showActions ? "translateY(0)" : "translateY(12px)",
        }}
      >
        <p
          className="text-xs mb-4"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}
        >
          What would you like to do next?
        </p>

        {/* Complete Profile */}
        <button
          onClick={handleCompleteProfile}
          className="w-full py-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-between px-5 group"
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "white",
            fontFamily: "var(--font-display)",
            border: "1px solid rgba(99,102,241,0.4)",
            boxShadow: "0 8px 30px rgba(99,102,241,0.35)",
            letterSpacing: "0.02em",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <User size={15} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold">Complete Your Profile</div>
              <div className="text-xs opacity-70 font-normal mt-0.5">
                Add skills, interests & more
              </div>
            </div>
          </div>
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </button>

        {/* Skip */}
        <button
          onClick={handleSkip}
          className="w-full py-3.5 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 group"
          style={{
            background: "rgba(255,255,255,0.03)",
            color: "rgba(255,255,255,0.4)",
            fontFamily: "var(--font-body)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            e.currentTarget.style.color = "rgba(255,255,255,0.65)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.03)";
            e.currentTarget.style.color = "rgba(255,255,255,0.4)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
          }}
        >
          <Home size={14} />
          Skip for now, go to Home
        </button>
      </div>
    </div>
  );
}