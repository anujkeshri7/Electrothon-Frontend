import { useState, useRef, useEffect } from "react";
import { ShieldCheck, ArrowLeft, RefreshCw, Mail } from "lucide-react";

export default function OtpVerify({ email, onVerified, onBack }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [shaking, setShaking] = useState(false);
  const inputRefs = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (idx, val) => {
    const cleaned = val.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[idx] = cleaned;
    setOtp(newOtp);
    setError("");

    // Auto advance
    if (cleaned && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
    // Auto verify when all filled
    if (cleaned && idx === 5) {
      const full = [...newOtp.slice(0, 5), cleaned].join("");
      if (full.length === 6) setTimeout(() => handleVerify([...newOtp.slice(0, 5), cleaned]), 100);
    }
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === "Backspace") {
      if (!otp[idx] && idx > 0) {
        const newOtp = [...otp];
        newOtp[idx - 1] = "";
        setOtp(newOtp);
        inputRefs.current[idx - 1]?.focus();
      }
    }
    if (e.key === "ArrowLeft" && idx > 0) inputRefs.current[idx - 1]?.focus();
    if (e.key === "ArrowRight" && idx < 5) inputRefs.current[idx + 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = ["", "", "", "", "", ""];
    pasted.split("").forEach((char, i) => (newOtp[i] = char));
    setOtp(newOtp);
    if (pasted.length === 6) {
      inputRefs.current[5]?.focus();
      setTimeout(() => handleVerify(newOtp), 100);
    } else {
      inputRefs.current[pasted.length]?.focus();
    }
  };

  const handleVerify = async (otpArr = otp) => {
    const code = otpArr.join("");
    if (code.length < 6) {
      setError("Please enter all 6 digits");
      return;
    }
    setIsVerifying(true);
    await new Promise((r) => setTimeout(r, 1500));
    // Simulate: 123456 is valid, anything else fails
    if (code === "123456") {
      onVerified();
    } else {
      setIsVerifying(false);
      setError("Invalid OTP. Use 123456 for demo.");
      setShaking(true);
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => {
        setShaking(false);
        inputRefs.current[0]?.focus();
      }, 500);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setIsResending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsResending(false);
    setCanResend(false);
    setCountdown(30);
    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();
  };

  const filled = otp.filter(Boolean).length;

  return (
    <div className="animate-fade-slide-in">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs mb-4 transition-opacity hover:opacity-80"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}
        >
          <ArrowLeft size={13} />
          Back
        </button>

        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))",
            border: "1px solid rgba(99,102,241,0.3)",
            boxShadow: "0 8px 32px rgba(99,102,241,0.2)",
          }}
        >
          <ShieldCheck size={26} style={{ color: "#a5b4fc" }} />
        </div>

        <h2
          className="text-2xl font-bold text-white mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Verify your email
        </h2>

        {/* Email display */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            fontFamily: "var(--font-body)",
          }}
        >
          <Mail size={12} style={{ color: "rgba(255,255,255,0.4)" }} />
          <span style={{ color: "rgba(255,255,255,0.5)" }}>OTP sent to </span>
          <span
            className="font-semibold"
            style={{ color: "#a5b4fc" }}
          >
            {email}
          </span>
        </div>
      </div>

      {/* OTP Boxes */}
      <div
        className={`flex gap-2 justify-center mb-3 ${shaking ? "animate-shake" : ""}`}
      >
        {otp.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => (inputRefs.current[idx] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            onPaste={handlePaste}
            autoFocus={idx === 0}
            className="text-center text-xl font-bold outline-none transition-all duration-200 rounded-xl"
            style={{
              width: "46px",
              height: "54px",
              background: digit
                ? "rgba(99,102,241,0.15)"
                : "rgba(255,255,255,0.04)",
              border: error
                ? "1.5px solid rgba(248,113,113,0.6)"
                : digit
                ? "1.5px solid rgba(99,102,241,0.5)"
                : document.activeElement === inputRefs.current[idx]
                ? "1.5px solid rgba(99,102,241,0.6)"
                : "1.5px solid rgba(255,255,255,0.08)",
              color: digit ? "white" : "rgba(255,255,255,0.2)",
              fontFamily: "var(--font-display)",
              boxShadow: digit ? "0 4px 16px rgba(99,102,241,0.15)" : "none",
              caretColor: "#6366f1",
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div
        className="h-0.5 rounded-full mb-4 transition-all duration-300 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${(filled / 6) * 100}%`,
            background: error
              ? "linear-gradient(90deg, #f87171, #ef4444)"
              : "linear-gradient(90deg, #6366f1, #8b5cf6)",
          }}
        />
      </div>

      {/* Error */}
      {error && (
        <p
          className="text-center text-xs mb-4 animate-fade-slide-up"
          style={{ color: "#f87171", fontFamily: "var(--font-body)" }}
        >
          {error}
        </p>
      )}

      {/* Demo hint */}
      <div
        className="text-center text-xs mb-5 py-2 px-3 rounded-lg"
        style={{
          background: "rgba(251,191,36,0.06)",
          border: "1px solid rgba(251,191,36,0.15)",
          color: "rgba(251,191,36,0.6)",
          fontFamily: "var(--font-body)",
        }}
      >
        Demo: Use <span className="font-bold text-amber-400">123456</span> as the OTP
      </div>

      {/* Verify button */}
      <button
        onClick={() => handleVerify()}
        disabled={isVerifying || filled < 6}
        className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
        style={{
          background:
            filled === 6 && !isVerifying
              ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
              : "rgba(255,255,255,0.05)",
          color: filled === 6 ? "white" : "rgba(255,255,255,0.2)",
          fontFamily: "var(--font-display)",
          border:
            filled === 6
              ? "1px solid rgba(99,102,241,0.4)"
              : "1px solid rgba(255,255,255,0.06)",
          boxShadow:
            filled === 6 && !isVerifying
              ? "0 8px 30px rgba(99,102,241,0.35)"
              : "none",
          cursor: filled === 6 && !isVerifying ? "pointer" : "not-allowed",
          letterSpacing: "0.02em",
        }}
      >
        {isVerifying ? (
          <>
            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Verifying...
          </>
        ) : (
          <>
            <ShieldCheck size={16} />
            Verify OTP
          </>
        )}
      </button>

      {/* Resend */}
      <div
        className="text-center mt-4 text-xs"
        style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.3)" }}
      >
        Didn't receive it?{" "}
        {canResend ? (
          <button
            onClick={handleResend}
            disabled={isResending}
            className="font-semibold transition-opacity hover:opacity-80 inline-flex items-center gap-1"
            style={{ color: "#a5b4fc" }}
          >
            {isResending ? (
              <>
                <RefreshCw size={11} className="animate-spin" />
                Sending...
              </>
            ) : (
              "Resend OTP"
            )}
          </button>
        ) : (
          <span>
            Resend in{" "}
            <span style={{ color: "#a5b4fc", fontVariantNumeric: "tabular-nums" }}>
              0:{String(countdown).padStart(2, "0")}
            </span>
          </span>
        )}
      </div>
    </div>
  );
}