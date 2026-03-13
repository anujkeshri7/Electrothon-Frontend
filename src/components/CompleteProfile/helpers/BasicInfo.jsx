import { useState, useRef } from "react";
import { Camera, User, FileText, ChevronRight, ArrowLeft, Sparkles } from "lucide-react";

const InputField = ({ icon: Icon, label, error, children, hint }) => (
  <div className="space-y-1.5">
    <label
      className="flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase"
      style={{
        color: error ? "#f87171" : "rgba(255,255,255,0.4)",
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
        className="text-xs"
        style={{
          color: error ? "#f87171" : "rgba(255,255,255,0.28)",
          fontFamily: "var(--font-body)",
        }}
      >
        {error || hint}
      </p>
    )}
  </div>
);

export default function BasicInfo({ data, onNext, onSkip }) {
  const [form, setForm] = useState({
    avatar: data.avatar || null,
    avatarPreview: data.avatarPreview || null,
    headline: data.headline || "",
    bio: data.bio || "",
  });
  const [errors, setErrors] = useState({});
  const [nameFocused, setNameFocused] = useState(false);
  const [bioFocused, setBioFocused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef();

  const validate = () => {
    const e = {};
    if (!form.headline.trim() || form.headline.trim().length < 5)
      e.headline = "Headline must be at least 5 characters";
    return e;
  };

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) =>
      setForm((p) => ({ ...p, avatar: file, avatarPreview: e.target.result }));
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onNext(form);
  };

  const inputStyle = (focused, field) => ({
    background: "rgba(255,255,255,0.04)",
    border: errors[field]
      ? "1px solid rgba(248,113,113,0.6)"
      : focused
      ? "1px solid rgba(99,102,241,0.6)"
      : "1px solid rgba(255,255,255,0.08)",
    color: "white",
    fontFamily: "var(--font-body)",
    boxShadow: focused ? "0 0 0 3px rgba(99,102,241,0.1)" : "none",
    outline: "none",
    transition: "all 0.2s",
  });

  return (
    <div className="animate-fade-slide-up">
      {/* Header */}
      <div className="mb-7">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-medium tracking-wider uppercase"
          style={{
            background: "rgba(99,102,241,0.12)",
            border: "1px solid rgba(99,102,241,0.25)",
            color: "#a5b4fc",
            fontFamily: "var(--font-body)",
          }}
        >
          <Sparkles size={11} />
          Step 1 of 4
        </div>
        <h2
          className="text-2xl font-bold text-white mb-1.5"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Show your face 👋
        </h2>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>
          First impressions matter — make yours count
        </p>
      </div>

      <div className="space-y-5">
        {/* Avatar upload */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="relative cursor-pointer group"
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            {/* Avatar circle */}
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center overflow-hidden transition-all duration-300"
              style={{
                background: form.avatarPreview
                  ? "transparent"
                  : "rgba(99,102,241,0.1)",
                border: isDragging
                  ? "2px dashed rgba(99,102,241,0.8)"
                  : form.avatarPreview
                  ? "2px solid rgba(99,102,241,0.4)"
                  : "2px dashed rgba(255,255,255,0.15)",
                boxShadow: form.avatarPreview
                  ? "0 0 30px rgba(99,102,241,0.2)"
                  : "none",
              }}
            >
              {form.avatarPreview ? (
                <img
                  src={form.avatarPreview}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={32} style={{ color: "rgba(255,255,255,0.2)" }} />
              )}
            </div>

            {/* Camera overlay */}
            <div
              className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: "rgba(0,0,0,0.55)" }}
            >
              <Camera size={20} className="text-white" />
            </div>

            {/* Edit badge */}
            {form.avatarPreview && (
              <div
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  border: "2px solid #070711",
                }}
              >
                <Camera size={12} className="text-white" />
              </div>
            )}
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />

          <p
            className="text-xs text-center"
            style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}
          >
            {form.avatarPreview ? "Click to change photo" : "Click or drag to upload"}
          </p>
        </div>

        {/* Headline */}
        <InputField
          icon={User}
          label="Headline"
          error={errors.headline}
          hint="e.g. 3rd yr CSE @ IIT Delhi · ML enthusiast · Open to internships"
        >
          <input
            type="text"
            placeholder="Your one-line intro..."
            value={form.headline}
            maxLength={100}
            onChange={(e) => {
              setForm((p) => ({ ...p, headline: e.target.value }));
              if (errors.headline) setErrors((p) => ({ ...p, headline: null }));
            }}
            onFocus={() => setNameFocused(true)}
            onBlur={() => setNameFocused(false)}
            className="w-full px-4 py-3 rounded-xl text-sm"
            style={inputStyle(nameFocused, "headline")}
          />
          <div
            className="text-right text-xs mt-1"
            style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-body)" }}
          >
            {form.headline.length}/100
          </div>
        </InputField>

        {/* Bio */}
        <InputField
          icon={FileText}
          label="Bio"
          hint="Optional · Tell people what you're working on or passionate about"
        >
          <textarea
            placeholder="I'm a 3rd year CSE student who loves building..."
            value={form.bio}
            maxLength={300}
            rows={3}
            onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
            onFocus={() => setBioFocused(true)}
            onBlur={() => setBioFocused(false)}
            className="w-full px-4 py-3 rounded-xl text-sm resize-none"
            style={inputStyle(bioFocused, "bio")}
          />
          <div
            className="text-right text-xs mt-1"
            style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-body)" }}
          >
            {form.bio.length}/300
          </div>
        </InputField>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={onSkip}
          className="py-3.5 px-5 rounded-xl text-sm transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.35)",
            fontFamily: "var(--font-body)",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
        >
          Skip all
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300"
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
    </div>
  );
}