import { useState } from "react";
import {
  GraduationCap, BookOpen, Hash, Calendar, ChevronRight, ArrowLeft,
} from "lucide-react";
import { BRANCHES, GRADUATION_YEARS } from "./constants";

const CGPA_MAX = 10;

export default function AcademicInfo({ data, onNext, onBack }) {
  const [form, setForm] = useState({
    branch: data.branch || "",
    cgpa: data.cgpa || "",
    currentYear: data.currentYear || "",
    graduationYear: data.graduationYear || "",
    rollNumber: data.rollNumber || "",
  });
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState("");

  const cgpaNum = parseFloat(form.cgpa);
  const cgpaValid = form.cgpa && !isNaN(cgpaNum) && cgpaNum >= 0 && cgpaNum <= CGPA_MAX;
  const cgpaPercent = cgpaValid ? (cgpaNum / CGPA_MAX) * 100 : 0;

  const cgpaColor =
    cgpaNum >= 8.5 ? "#34d399" :
    cgpaNum >= 7.0 ? "#6366f1" :
    cgpaNum >= 5.5 ? "#f59e0b" : "#f87171";

  const validate = () => {
    const e = {};
    if (!form.branch) e.branch = "Please select your branch";
    if (!form.currentYear) e.currentYear = "Please select current year";
    if (!form.graduationYear) e.graduationYear = "Please select graduation year";
    if (form.cgpa && !cgpaValid) e.cgpa = "Enter a valid CGPA between 0 and 10";
    return e;
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
    boxShadow: focused === field ? "0 0 0 3px rgba(99,102,241,0.1)" : "none",
    outline: "none",
    transition: "all 0.2s",
  });

  const selectStyle = (field) => ({
    ...inputStyle(field),
    color: form[field] ? "white" : "rgba(255,255,255,0.3)",
    appearance: "none",
    cursor: "pointer",
  });

  const Label = ({ icon: Icon, children, error }) => (
    <label
      className="flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase mb-1.5"
      style={{
        color: error ? "#f87171" : "rgba(255,255,255,0.4)",
        fontFamily: "var(--font-body)",
        letterSpacing: "0.07em",
      }}
    >
      <Icon size={11} />
      {children}
    </label>
  );

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onNext(form);
  };

  return (
    <div className="animate-fade-slide-in">
      {/* Header */}
      <div className="mb-7">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs mb-4 transition-opacity hover:opacity-80"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)", background: "none", border: "none", cursor: "pointer" }}
        >
          <ArrowLeft size={13} /> Back
        </button>
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-medium tracking-wider uppercase"
          style={{
            background: "rgba(99,102,241,0.12)",
            border: "1px solid rgba(99,102,241,0.25)",
            color: "#a5b4fc",
            fontFamily: "var(--font-body)",
          }}
        >
          <GraduationCap size={11} />
          Step 2 of 4
        </div>
        <h2 className="text-2xl font-bold text-white mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
          Academic details
        </h2>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>
          Help others know your academic context
        </p>
      </div>

      <div className="space-y-4">
        {/* Branch */}
        <div>
          <Label icon={BookOpen} error={errors.branch}>Branch / Department</Label>
          <select
            value={form.branch}
            onChange={(e) => { setForm((p) => ({ ...p, branch: e.target.value })); if (errors.branch) setErrors((p) => ({ ...p, branch: null })); }}
            onFocus={() => setFocused("branch")}
            onBlur={() => setFocused("")}
            className="w-full px-4 py-3 rounded-xl text-sm"
            style={selectStyle("branch")}
          >
            <option value="" disabled style={{ background: "#0f0f1a" }}>Select your branch</option>
            {BRANCHES.map((b) => (
              <option key={b} value={b} style={{ background: "#0f0f1a", color: "white" }}>{b}</option>
            ))}
          </select>
          {errors.branch && <p className="text-xs mt-1" style={{ color: "#f87171", fontFamily: "var(--font-body)" }}>{errors.branch}</p>}
        </div>

        {/* Current year + Graduation year row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label icon={Calendar} error={errors.currentYear}>Current year</Label>
            <select
              value={form.currentYear}
              onChange={(e) => { setForm((p) => ({ ...p, currentYear: e.target.value })); if (errors.currentYear) setErrors((p) => ({ ...p, currentYear: null })); }}
              onFocus={() => setFocused("currentYear")}
              onBlur={() => setFocused("")}
              className="w-full px-4 py-3 rounded-xl text-sm"
              style={selectStyle("currentYear")}
            >
              <option value="" disabled style={{ background: "#0f0f1a" }}>Select</option>
              {["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "PG 1st", "PG 2nd"].map((y) => (
                <option key={y} value={y} style={{ background: "#0f0f1a", color: "white" }}>{y}</option>
              ))}
            </select>
            {errors.currentYear && <p className="text-xs mt-1" style={{ color: "#f87171", fontFamily: "var(--font-body)" }}>{errors.currentYear}</p>}
          </div>
          <div>
            <Label icon={Calendar} error={errors.graduationYear}>Graduation year</Label>
            <select
              value={form.graduationYear}
              onChange={(e) => { setForm((p) => ({ ...p, graduationYear: e.target.value })); if (errors.graduationYear) setErrors((p) => ({ ...p, graduationYear: null })); }}
              onFocus={() => setFocused("graduationYear")}
              onBlur={() => setFocused("")}
              className="w-full px-4 py-3 rounded-xl text-sm"
              style={selectStyle("graduationYear")}
            >
              <option value="" disabled style={{ background: "#0f0f1a" }}>Select</option>
              {GRADUATION_YEARS.map((y) => (
                <option key={y.value} value={y.value} style={{ background: "#0f0f1a", color: "white" }}>{y.label}</option>
              ))}
            </select>
            {errors.graduationYear && <p className="text-xs mt-1" style={{ color: "#f87171", fontFamily: "var(--font-body)" }}>{errors.graduationYear}</p>}
          </div>
        </div>

        {/* CGPA */}
        <div>
          <Label icon={Hash} error={errors.cgpa}>CGPA / Percentage <span style={{ color: "rgba(255,255,255,0.25)", textTransform: "none", letterSpacing: 0 }}>(optional)</span></Label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="10"
            placeholder="e.g. 8.5"
            value={form.cgpa}
            onChange={(e) => { setForm((p) => ({ ...p, cgpa: e.target.value })); if (errors.cgpa) setErrors((p) => ({ ...p, cgpa: null })); }}
            onFocus={() => setFocused("cgpa")}
            onBlur={() => setFocused("")}
            className="w-full px-4 py-3 rounded-xl text-sm"
            style={inputStyle("cgpa")}
          />
          {/* CGPA visual bar */}
          {cgpaValid && (
            <div className="mt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>
                  {cgpaNum >= 9 ? "Exceptional 🔥" : cgpaNum >= 8 ? "Excellent" : cgpaNum >= 7 ? "Good" : cgpaNum >= 6 ? "Average" : "Below avg"}
                </span>
                <span className="text-xs font-bold" style={{ color: cgpaColor, fontFamily: "var(--font-display)" }}>
                  {cgpaNum.toFixed(2)} / 10
                </span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${cgpaPercent}%`, background: cgpaColor }}
                />
              </div>
            </div>
          )}
          {errors.cgpa && <p className="text-xs mt-1" style={{ color: "#f87171", fontFamily: "var(--font-body)" }}>{errors.cgpa}</p>}
        </div>

        {/* Roll number */}
        <div>
          <Label icon={Hash}>Roll / Enrollment number <span style={{ color: "rgba(255,255,255,0.25)", textTransform: "none", letterSpacing: 0 }}>(optional)</span></Label>
          <input
            type="text"
            placeholder="e.g. 2021CSE0042"
            value={form.rollNumber}
            onChange={(e) => setForm((p) => ({ ...p, rollNumber: e.target.value }))}
            onFocus={() => setFocused("rollNumber")}
            onBlur={() => setFocused("")}
            className="w-full px-4 py-3 rounded-xl text-sm"
            style={inputStyle("rollNumber")}
          />
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleSubmit}
        className="w-full mt-6 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: "white",
          fontFamily: "var(--font-display)",
          border: "1px solid rgba(99,102,241,0.4)",
          boxShadow: "0 8px 30px rgba(99,102,241,0.3)",
          letterSpacing: "0.02em",
          cursor: "pointer",
        }}
      >
        Continue
        <ChevronRight size={16} />
      </button>
    </div>
  );
}