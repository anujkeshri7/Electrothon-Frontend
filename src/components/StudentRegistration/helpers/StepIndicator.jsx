import { Check } from "lucide-react";
import { STEP_META } from "./constants";

export default function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center justify-center mb-8">
      {STEP_META.map((meta, idx) => {
        const isCompleted = currentStep > meta.step;
        const isActive = currentStep === meta.step;

        return (
          <div key={meta.step} className="flex items-center">
            {/* Step circle */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="relative flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold transition-all duration-500"
                style={{
                  background: isCompleted
                    ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                    : isActive
                    ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                    : "rgba(255,255,255,0.05)",
                  border: isActive
                    ? "2px solid transparent"
                    : isCompleted
                    ? "2px solid transparent"
                    : "2px solid rgba(255,255,255,0.12)",
                  boxShadow: isActive
                    ? "0 0 20px rgba(99,102,241,0.5), 0 0 40px rgba(99,102,241,0.2)"
                    : "none",
                  fontFamily: "var(--font-body)",
                }}
              >
                {isCompleted ? (
                  <Check size={14} className="text-white" strokeWidth={2.5} />
                ) : (
                  <span
                    className="text-xs font-bold"
                    style={{
                      color: isActive ? "white" : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {meta.step}
                  </span>
                )}
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-full animate-ping opacity-30"
                    style={{ background: "rgba(99,102,241,0.6)" }}
                  />
                )}
              </div>
              <span
                className="text-[10px] font-medium tracking-wide uppercase"
                style={{
                  color: isActive
                    ? "#a5b4fc"
                    : isCompleted
                    ? "#6366f1"
                    : "rgba(255,255,255,0.25)",
                  fontFamily: "var(--font-body)",
                  letterSpacing: "0.08em",
                }}
              >
                {meta.label}
              </span>
            </div>

            {/* Connector line */}
            {idx < STEP_META.length - 1 && (
              <div
                className="h-px w-12 mx-1 mb-5 transition-all duration-700"
                style={{
                  background:
                    currentStep > meta.step
                      ? "linear-gradient(90deg, #6366f1, #8b5cf6)"
                      : "rgba(255,255,255,0.08)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}