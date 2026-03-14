import { useState, useRef, useEffect } from "react";
import { ShieldCheck, ArrowLeft, RefreshCw, Mail, Eye, EyeOff, Lock, CheckCircle2 } from "lucide-react";
import axios from "axios";

// ── Set Password UI (renders in same step after OTP success) ──
function SetPassword({ email, studentId, onDone }) {
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [show, setShow] = useState({ password: false, confirm: false });
  const [focused, setFocused] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const rules = [
    { label: "At least 8 characters", pass: form.password.length >= 8 },
    { label: "One uppercase letter",  pass: /[A-Z]/.test(form.password) },
    { label: "One number",            pass: /[0-9]/.test(form.password) },
  ];
  const strength = rules.filter((r) => r.pass).length;
  const strengthColor = strength === 3 ? "#34d399" : strength === 2 ? "#f59e0b" : "#f87171";
  const strengthLabel = ["Weak", "Medium", "Medium", "Strong"][strength];

  const validate = () => {
    const e = {};
    if (form.password.length < 8) e.password = "Password must be at least 8 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    setApiError(null);
    
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/set-password`,
        { studentId, password: form.password }
      );

      if(res.data.success){
        onDone(); 
      }
    
     else {
      setApiError(res.data.message || "Failed to set password. Please try again.");
     }
    } catch (err){
      setApiError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field) => ({
    background: "rgba(255,255,255,0.04)",
    border: errors[field]
      ? "1px solid rgba(248,113,113,0.6)"
      : focused === field
      ? "1px solid rgba(99,102,241,0.6)"
      : "1px solid rgba(255,255,255,0.08)",
    color: "white",
    fontFamily: "var(--font-body)",
    outline: "none",
    transition: "all 0.2s",
    boxShadow: focused === field ? "0 0 0 3px rgba(99,102,241,0.1)" : "none",
  });

  return (
    <div className="animate-fade-slide-in">
      {/* Header */}
      <div className="mb-7">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))",
            border: "1px solid rgba(99,102,241,0.3)",
            boxShadow: "0 8px 32px rgba(99,102,241,0.2)",
          }}
        >
          <Lock size={26} style={{ color: "#a5b4fc" }} />
        </div>

        <h2 className="text-2xl font-bold text-white mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
          Set your password
        </h2>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>
          Create a strong password for your account
        </p>

        {/* Verified email pill */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs mt-3"
          style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)", fontFamily: "var(--font-body)" }}
        >
          <CheckCircle2 size={12} style={{ color: "#34d399" }} />
          <span style={{ color: "#34d399" }}>{email} — verified</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Password field */}
        <div className="space-y-1.5">
          <label
            className="flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)", letterSpacing: "0.07em" }}
          >
            <Lock size={11} /> Password
          </label>
          <div className="relative">
            <input
              type={show.password ? "text" : "password"}
              placeholder="Create a strong password"
              value={form.password}
              onChange={(e) => { setForm((p) => ({ ...p, password: e.target.value })); if (errors.password) setErrors((p) => ({ ...p, password: null })); }}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused("")}
              className="w-full px-4 py-3 pr-11 rounded-xl text-sm"
              style={inputStyle("password")}
            />
            <button
              type="button"
              onClick={() => setShow((s) => ({ ...s, password: !s.password }))}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              {show.password ? <EyeOff size={15} style={{ color: "rgba(255,255,255,0.7)" }} /> : <Eye size={15} style={{ color: "rgba(255,255,255,0.7)" }} />}
            </button>
          </div>

          {/* Strength bar + rules */}
          {form.password.length > 0 && (
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex gap-1 flex-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-1 flex-1 rounded-full transition-all duration-300"
                      style={{ background: i < strength ? strengthColor : "rgba(255,255,255,0.08)" }}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-semibold flex-shrink-0" style={{ color: strengthColor, fontFamily: "var(--font-body)" }}>
                  {strengthLabel}
                </span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {rules.map((r) => (
                  <div key={r.label} className="flex items-center gap-1.5">
                    <div
                      className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200"
                      style={{ background: r.pass ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.06)" }}
                    >
                      {r.pass && (
                        <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                          <path d="M1 3.5L3 5.5L6 1.5" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-[10px]" style={{ color: r.pass ? "#34d399" : "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>
                      {r.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {errors.password && <p className="text-xs" style={{ color: "#f87171", fontFamily: "var(--font-body)" }}>{errors.password}</p>}
        </div>

        {/* Confirm password */}
        <div className="space-y-1.5">
          <label
            className="flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)", letterSpacing: "0.07em" }}
          >
            <Lock size={11} /> Confirm Password
          </label>
          <div className="relative">
            <input
              type={show.confirm ? "text" : "password"}
              placeholder="Repeat your password"
              value={form.confirm}
              onChange={(e) => { setForm((p) => ({ ...p, confirm: e.target.value })); if (errors.confirm) setErrors((p) => ({ ...p, confirm: null })); }}
              onFocus={() => setFocused("confirm")}
              onBlur={() => setFocused("")}
              className="w-full px-4 py-3 pr-11 rounded-xl text-sm"
              style={inputStyle("confirm")}
            />
            <div className="absolute right-10 top-1/2 -translate-y-1/2">
              {form.confirm.length > 0 && (
                form.password === form.confirm
                  ? <CheckCircle2 size={15} style={{ color: "#34d399" }} />
                  : <div className="w-3 h-3 rounded-full" style={{ background: "rgba(248,113,113,0.5)" }} />
              )}
            </div>
            <button
              type="button"
              onClick={() => setShow((s) => ({ ...s, confirm: !s.confirm }))}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              {show.confirm ? <EyeOff size={15} style={{ color: "rgba(255,255,255,0.7)" }} /> : <Eye size={15} style={{ color: "rgba(255,255,255,0.7)" }} />}
            </button>
          </div>
          {errors.confirm && <p className="text-xs" style={{ color: "#f87171", fontFamily: "var(--font-body)" }}>{errors.confirm}</p>}
        </div>
      </div>

      {/* API error */}
      {apiError && (
        <div
          className="flex items-start gap-2.5 mt-4 px-4 py-3 rounded-xl animate-fade-slide-up"
          style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)" }}
        >
          <p className="flex-1 text-xs leading-relaxed" style={{ color: "rgba(248,113,113,0.85)", fontFamily: "var(--font-body)" }}>{apiError}</p>
          <button onClick={() => setApiError(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#f87171", fontSize: "16px", lineHeight: 1 }}>×</button>
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading || strength < 2}
        className="w-full mt-6 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300"
        style={{
          background: !loading && strength >= 2 ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "rgba(255,255,255,0.05)",
          color: !loading && strength >= 2 ? "white" : "rgba(255,255,255,0.2)",
          fontFamily: "var(--font-display)",
          border: !loading && strength >= 2 ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.06)",
          boxShadow: !loading && strength >= 2 ? "0 8px 30px rgba(99,102,241,0.35)" : "none",
          cursor: !loading && strength >= 2 ? "pointer" : "not-allowed",
          letterSpacing: "0.02em",
        }}
      >
        {loading
          ? <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Setting password...</>
          : <><Lock size={15} /> Set Password & Continue</>
        }
      </button>
    </div>
  );
}

// ── OTP Verify (your original code — untouched) ───────────────
export default function OtpVerify({ email, onVerified, onBack, setStudentId }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [shaking, setShaking] = useState(false);
  const inputRefs = useRef([]);

  // ↓ only addition — swap OTP UI → SetPassword UI on success
  const [otpVerified, setOtpVerified] = useState(false);
  const [verifiedStudentId, setVerifiedStudentId] = useState(null);

  useEffect(() => {
    if (countdown <= 0) { setCanResend(true); return; }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (idx, val) => {
    const cleaned = val.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[idx] = cleaned;
    setOtp(newOtp);
    setError("");
    if (cleaned && idx < 5) inputRefs.current[idx + 1]?.focus();
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
    const otpStr = otpArr.join("");
    if (otpStr.length < 6) { setError("Please enter all 6 digits"); return; }
    setIsVerifying(true);
    setError("");
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "")}/api/auth/verify-otp/${email}`;
      const res = await axios.post(url, { otp: otpStr });
      if (res.data.success) {
        const sid = res.data.student._id;
        setStudentId(sid);
        setVerifiedStudentId(sid);
        setOtpVerified(true); // ← swap to SetPassword
      } else {
        setError(res.data.message || "Invalid OTP. Please try again.");
        setShaking(true);
        setOtp(["", "", "", "", "", ""]);
        setTimeout(() => { setShaking(false); inputRefs.current[0]?.focus(); }, 500);
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setError(err?.response?.data?.message || "Verification failed. Please try again.");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    } finally {
      setIsVerifying(false);
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

  // ── OTP done → show SetPassword in same card ──
  if (otpVerified) {
    return (
      <SetPassword
        email={email}
        studentId={verifiedStudentId}
        onDone={onVerified}
      />
    );
  }

  // ── Original OTP UI (your code — untouched below) ──
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
          <span className="font-semibold" style={{ color: "#a5b4fc" }}>{email}</span>
        </div>
      </div>

      {/* OTP Boxes */}
      <div className={`flex gap-2 justify-center mb-3 ${shaking ? "animate-shake" : ""}`}>
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
              background: digit ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.04)",
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

      {/* Verify button */}
      <button
        onClick={() => handleVerify()}
        disabled={isVerifying || filled < 6}
        className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
        style={{
          background: filled === 6 && !isVerifying ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "rgba(255,255,255,0.05)",
          color: filled === 6 ? "white" : "rgba(255,255,255,0.2)",
          fontFamily: "var(--font-display)",
          border: filled === 6 ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.06)",
          boxShadow: filled === 6 && !isVerifying ? "0 8px 30px rgba(99,102,241,0.35)" : "none",
          cursor: filled === 6 && !isVerifying ? "pointer" : "not-allowed",
          letterSpacing: "0.02em",
        }}
      >
        {isVerifying ? (
          <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Verifying...</>
        ) : (
          <><ShieldCheck size={16} />Verify OTP</>
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
            style={{ color: "#a5b4fc", background: "none", border: "none", cursor: "pointer" }}
          >
            {isResending ? (<><RefreshCw size={11} className="animate-spin" />Sending...</>) : "Resend OTP"}
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