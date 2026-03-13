import { useState } from "react";
import {
  Mail,
  User,
  GraduationCap,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  ServerCrash,
} from "lucide-react";
import { YEAR_OPTIONS } from "./constants";
import axios from "axios";

const InputField = ({ icon: Icon, label, error, success, children, hint }) => (
  <div className="space-y-1.5">
    <label
      className="flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase"
      style={{
        color: error ? "#f87171" : success ? "#34d399" : "rgba(255,255,255,0.45)",
        fontFamily: "var(--font-body)",
        letterSpacing: "0.07em",
      }}
    >
      <Icon size={11} />
      {label}
    </label>
    {children}
    {(error || hint) && (
      <p
        className="text-xs flex items-center gap-1"
        style={{ color: error ? "#f87171" : "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}
      >
        {error && <AlertCircle size={11} />}
        {error || hint}
      </p>
    )}
  </div>
);

export default function EmailVerify({ college, onNext, onBack }) {
  const [form, setForm] = useState({ fullName: "", email: "", yearOfStudy: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);

  const emailValid =
    form.email.endsWith(`@${college.domain}`) &&
    form.email.length > college.domain.length + 2;

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 3)
      newErrors.fullName = "Enter your full name (min. 3 characters)";
    if (!form.email) newErrors.email = "Email is required";
    else if (!emailValid) newErrors.email = `Must end with @${college.domain}`;
    if (!form.yearOfStudy) newErrors.yearOfStudy = "Please select your year";
    return newErrors;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setIsLoading(true);
    setApiError(null);

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/auth/register",
        {
          name: form.fullName,
          email: form.email,
          yearOfStudy: form.yearOfStudy,
          studentIdEmailDomain: college.domain,
        }
      );
      console.log("OTP sent successfully:", response.data);
      setIsLoading(false);
      onNext({ ...form });
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Something went wrong. Please try again.";
      setApiError(msg);
      setIsLoading(false);
    }
  };

  const inputStyle = (field, extraFocused) => ({
    background: "rgba(255,255,255,0.04)",
    border: errors[field]
      ? "1px solid rgba(248,113,113,0.6)"
      : field === "email" && emailValid
      ? "1px solid rgba(52,211,153,0.5)"
      : extraFocused
      ? "1px solid rgba(99,102,241,0.6)"
      : "1px solid rgba(255,255,255,0.08)",
    color: "white",
    fontFamily: "var(--font-body)",
    boxShadow: extraFocused
      ? "0 0 0 3px rgba(99,102,241,0.1)"
      : errors[field]
      ? "0 0 0 3px rgba(248,113,113,0.08)"
      : field === "email" && emailValid
      ? "0 0 0 3px rgba(52,211,153,0.08)"
      : "none",
  });

  return (
    <div className="animate-fade-slide-in">
      {/* Header */}
      <div className="mb-7">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs mb-4 transition-opacity hover:opacity-80"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}
        >
          <ArrowLeft size={13} />
          Back
        </button>

        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-medium"
          style={{
            background: college.color + "18",
            border: `1px solid ${college.color}35`,
            color: college.color,
            fontFamily: "var(--font-body)",
          }}
        >
          <div className="w-2 h-2 rounded-full" style={{ background: college.color }} />
          {college.name}
        </div>

        <h2 className="text-2xl font-bold text-white mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
          Your details
        </h2>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}>
          Use your official college email to verify
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <InputField icon={User} label="Full Name" error={errors.fullName}>
          <input
            type="text"
            placeholder="e.g. Arjun Sharma"
            value={form.fullName}
            onChange={(e) => { setForm((p) => ({ ...p, fullName: e.target.value })); if (errors.fullName) setErrors((p) => ({ ...p, fullName: null })); }}
            onFocus={() => setNameFocused(true)}
            onBlur={() => setNameFocused(false)}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
            style={inputStyle("fullName", nameFocused)}
          />
        </InputField>

        {/* Email */}
        <InputField
          icon={Mail}
          label="College Email"
          error={errors.email}
          hint={!errors.email && !emailValid && form.email ? `Must end with @${college.domain}` : null}
        >
          <div className="relative">
            <input
              type="email"
              placeholder={`yourname@${college.domain}`}
              value={form.email}
              onChange={(e) => { setForm((p) => ({ ...p, email: e.target.value })); if (errors.email) setErrors((p) => ({ ...p, email: null })); }}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              className="w-full px-4 py-3 pr-10 rounded-xl text-sm outline-none transition-all duration-200"
              style={inputStyle("email", emailFocused)}
            />
            {form.email && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {emailValid
                  ? <CheckCircle2 size={16} className="text-emerald-400" />
                  : <AlertCircle size={16} style={{ color: "rgba(248,113,113,0.7)" }} />}
              </div>
            )}
          </div>
          <div
            className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg mt-1"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: college.color }} />
            {college.name} email domains end with{" "}
            <span style={{ color: college.color }}>@{college.domain}</span>
          </div>
        </InputField>

        {/* Year of Study */}
        <InputField icon={GraduationCap} label="Year of Study" error={errors.yearOfStudy}>
          <select
            value={form.yearOfStudy}
            onChange={(e) => { setForm((p) => ({ ...p, yearOfStudy: e.target.value })); if (errors.yearOfStudy) setErrors((p) => ({ ...p, yearOfStudy: null })); }}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 appearance-none cursor-pointer"
            style={{ ...inputStyle("yearOfStudy", false), color: form.yearOfStudy ? "white" : "rgba(255,255,255,0.35)" }}
          >
            <option value="" disabled style={{ background: "#0f0f1a" }}>Select your year</option>
            {YEAR_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} style={{ background: "#0f0f1a", color: "white" }}>
                {opt.label}
              </option>
            ))}
          </select>
        </InputField>
      </div>

      {/* ── API Error Banner ── */}
      {apiError && (
        <div
          className="flex items-start gap-3 mt-5 px-4 py-3 rounded-xl animate-fade-slide-up"
          style={{
            background: "rgba(248,113,113,0.08)",
            border: "1px solid rgba(248,113,113,0.25)",
          }}
        >
          <ServerCrash size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#f87171" }} />
          <div>
            <p className="text-xs font-semibold mb-0.5" style={{ color: "#f87171", fontFamily: "var(--font-display)" }}>
              Request Failed
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(248,113,113,0.75)", fontFamily: "var(--font-body)" }}>
              {apiError}
            </p>
          </div>
          <button
            onClick={() => setApiError(null)}
            className="ml-auto flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity"
          >
            <AlertCircle size={13} style={{ color: "#f87171" }} />
          </button>
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full mt-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
        style={{
          background: isLoading ? "rgba(99,102,241,0.4)" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: "white",
          fontFamily: "var(--font-display)",
          border: "1px solid rgba(99,102,241,0.4)",
          boxShadow: isLoading ? "none" : "0 8px 30px rgba(99,102,241,0.35)",
          letterSpacing: "0.02em",
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Sending OTP...
          </>
        ) : (
          <>
            Send OTP to Email
            <ChevronRight size={16} />
          </>
        )}
      </button>
    </div>
  );
}