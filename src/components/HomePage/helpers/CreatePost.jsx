import { useState, useRef } from "react";
import {
  Pencil, HelpCircle, Zap,
  Image, BarChart2, Smile, Link2,
  Send, X,
} from "lucide-react";
import { CURRENT_USER } from "./constants";

// ─── Config ──────────────────────────────────────────────────────────────────

const POST_TYPES = [
  { id: "post",     icon: Pencil,      label: "Post",     placeholder: "Share something with your campus..." },
  { id: "question", icon: HelpCircle,  label: "Question", placeholder: "Ask the campus something..."         },
  { id: "project",  icon: Zap,         label: "Project",  placeholder: "Share what you're building..."       },
];

const MOODS = ["🎉 Celebrating", "💡 Learning", "🤔 Seeking help", "🔥 Excited", "😓 Struggling"];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CreatePost() {
  const [active,   setActive]   = useState(false);
  const [type,     setType]     = useState("post");
  const [content,  setContent]  = useState("");
  const [image,    setImage]    = useState(null);
  const [pollOpen, setPollOpen] = useState(false);
  const [moodOpen, setMoodOpen] = useState(false);
  const [moods,    setMoods]    = useState([]);
  const [pollOpts, setPollOpts] = useState(["", ""]);
  const [toast,    setToast]    = useState(false);

  const fileRef = useRef(null);
  const current = POST_TYPES.find((t) => t.id === type);
  const canPost = content.trim() || image;

  // ── helpers ────────────────────────────────────────────────────────────────

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(false), 2500);
  };

  const reset = () => {
    setContent(""); setImage(null); setActive(false);
    setPollOpen(false); setMoodOpen(false);
    setMoods([]); setPollOpts(["", ""]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage({ file, preview: URL.createObjectURL(file) });
  };

  const toggleMood = (m) =>
    setMoods((prev) => prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]);

  const addPollOpt = () => {
    if (pollOpts.length >= 4) return;
    setPollOpts([...pollOpts, ""]);
  };

  const handleLink = () => {
    const url = prompt("Paste a link:");
    if (url?.trim()) {
      setContent((c) => c + (c ? " " : "") + url.trim());
      showToast("Link added!");
    }
  };

  const handlePost = () => {
    if (!canPost) return;
    const post = {
      id: Date.now(), type, content, image,
      moods, poll: pollOpen ? pollOpts.filter(Boolean) : null,
      author: CURRENT_USER, createdAt: new Date(),
    };
    console.log("POST CREATED:", post);
    showToast("Posted successfully! 🎉");
    setTimeout(reset, 600);
  };

  // ── render ─────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Card ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          fontFamily: "'Sora', sans-serif",
          background: "#16161e",
          border: active ? "1px solid #6366f1" : "1px solid #252530",
          borderRadius: 20,
          padding: 20,
          transition: "border-color 0.25s, box-shadow 0.25s",
          boxShadow: active
            ? "0 0 0 1px rgba(99,102,241,0.15), 0 8px 40px rgba(0,0,0,0.5)"
            : "none",
        }}
      >
        {/* ── Top row ────────────────────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Avatar */}
          <div style={{
            width: 40, height: 40, borderRadius: 12, flexShrink: 0,
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 600, color: "#fff", letterSpacing: "0.5px",
          }}>
            {CURRENT_USER.initials}
          </div>

          {/* Input shell */}
          <div
            onClick={() => setActive(true)}
            style={{
              flex: 1, background: "#1c1c28",
              border: "1px solid #252530", borderRadius: 14,
              padding: "12px 16px", cursor: "text",
            }}
          >
            {!active ? (
              <span style={{ fontSize: 14, color: "#4a4a62" }}>
                {current.placeholder}
              </span>
            ) : (
              <textarea
                autoFocus rows={3} value={content}
                onChange={(e) => {
                  if (e.target.value.length <= 500) setContent(e.target.value);
                }}
                placeholder={current.placeholder}
                style={{
                  width: "100%", background: "transparent", border: "none",
                  outline: "none", resize: "none", fontSize: 14,
                  color: "#e4e4f0", fontFamily: "'Sora', sans-serif", lineHeight: 1.6,
                }}
              />
            )}
          </div>
        </div>

        {/* ── Image preview ───────────────────────────────────────────────── */}
        {image && (
          <div style={{ marginTop: 14, borderRadius: 14, overflow: "hidden", position: "relative" }}>
            <img src={image.preview} alt="preview"
              style={{ width: "100%", maxHeight: 240, objectFit: "cover", display: "block" }} />
            <button onClick={() => setImage(null)} style={{
              position: "absolute", top: 10, right: 10,
              width: 28, height: 28, borderRadius: 8,
              background: "rgba(0,0,0,0.65)", border: "1px solid rgba(255,255,255,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#ccc",
            }}>
              <X size={12} />
            </button>
          </div>
        )}

        {/* ── Poll block ──────────────────────────────────────────────────── */}
        {pollOpen && (
          <div style={{
            marginTop: 14, background: "#121218",
            border: "1px solid #1e1e2a", borderRadius: 14, padding: 14,
          }}>
            <p style={{ fontSize: 11, color: "#555570", fontWeight: 500, marginBottom: 10,
              textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Poll options
            </p>
            {pollOpts.map((opt, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                background: "#1a1a26", border: "1px solid #252530",
                borderRadius: 10, padding: "10px 12px", marginBottom: 7,
              }}>
                <input
                  value={opt}
                  onChange={(e) => {
                    const next = [...pollOpts];
                    next[i] = e.target.value;
                    setPollOpts(next);
                  }}
                  placeholder={`Option ${i + 1}`}
                  style={{
                    flex: 1, background: "transparent", border: "none", outline: "none",
                    color: "#c0c0e0", fontFamily: "'Sora', sans-serif", fontSize: 13,
                  }}
                />
              </div>
            ))}
            {pollOpts.length < 4 && (
              <button onClick={addPollOpt}
                style={{ fontSize: 12, color: "#6366f1", background: "none",
                  border: "none", cursor: "pointer", fontFamily: "'Sora', sans-serif",
                  fontWeight: 500, padding: 0 }}>
                + Add option
              </button>
            )}
          </div>
        )}

        {/* ── Mood tags ───────────────────────────────────────────────────── */}
        {moodOpen && (
          <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
            {MOODS.map((m) => (
              <span key={m} onClick={() => toggleMood(m)} style={{
                padding: "5px 12px", borderRadius: 20, fontSize: 11, fontWeight: 500,
                border: moods.includes(m) ? "1px solid rgba(99,102,241,0.45)" : "1px solid #252530",
                background: moods.includes(m) ? "rgba(99,102,241,0.12)" : "#1a1a26",
                color: moods.includes(m) ? "#a5b4fc" : "#555570",
                cursor: "pointer",
              }}>
                {m}
              </span>
            ))}
          </div>
        )}

        {/* ── Expanded panel ──────────────────────────────────────────────── */}
        {active && (
          <div style={{ marginTop: 14 }}>
            {/* Type tabs */}
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              {POST_TYPES.map(({ id, icon: Icon, label }) => (
                <button key={id} onClick={() => setType(id)} style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "7px 14px", borderRadius: 10, fontSize: 12, fontWeight: 500,
                  border: type === id ? "1px solid rgba(99,102,241,0.5)" : "1px solid #252530",
                  background: type === id ? "rgba(99,102,241,0.12)" : "#1c1c28",
                  color: type === id ? "#a5b4fc" : "#555570",
                  cursor: "pointer",
                }}>
                  <Icon size={12} />
                  {label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div style={{ borderTop: "1px solid #1e1e2a", marginBottom: 14 }} />

            {/* Toolbar */}
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {/* Hidden file input */}
              <input type="file" accept="image/*" ref={fileRef}
                style={{ display: "none" }} onChange={handleImageChange} />

              {/* Image */}
              <ToolBtn title="Photo" onClick={() => fileRef.current.click()}>
                <Image size={16} />
              </ToolBtn>

              {/* Poll */}
              <ToolBtn title="Poll" active={pollOpen} onClick={() => setPollOpen((p) => !p)}>
                <BarChart2 size={16} />
              </ToolBtn>

              {/* Mood */}
              <ToolBtn title="Mood" active={moodOpen} onClick={() => setMoodOpen((m) => !m)}>
                <Smile size={16} />
              </ToolBtn>

              {/* Link */}
              <ToolBtn title="Link" onClick={handleLink}>
                <Link2 size={16} />
              </ToolBtn>

              {/* Char count */}
              <span style={{
                fontSize: 11, marginLeft: 4,
                color: content.length > 450 ? "#f87171" : "#444458",
              }}>
                {content.length}/500
              </span>

              {/* Actions */}
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={reset} style={{
                  padding: "8px 16px", borderRadius: 10, fontSize: 12, fontWeight: 500,
                  background: "#1a1a26", border: "1px solid #252530",
                  color: "#666688", cursor: "pointer",
                }}>
                  Cancel
                </button>
                <button onClick={handlePost} disabled={!canPost} style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 20px", borderRadius: 10, fontSize: 12, fontWeight: 600,
                  background: canPost
                    ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
                    : "#1e1e2e",
                  border: "none",
                  color: canPost ? "#fff" : "#444460",
                  cursor: canPost ? "pointer" : "not-allowed",
                  letterSpacing: "0.3px",
                }}>
                  <Send size={13} />
                  Post
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Quick actions (collapsed) ───────────────────────────────────── */}
        {!active && (
          <div style={{ display: "flex", gap: 6, marginTop: 14,
            paddingTop: 14, borderTop: "1px solid #1e1e2a" }}>
            {POST_TYPES.map(({ id, icon: Icon, label }) => (
              <button key={id}
                onClick={() => { setActive(true); setType(id); }}
                style={{
                  flex: 1, padding: 8, borderRadius: 10, fontSize: 11, fontWeight: 500,
                  background: "#121218", border: "1px solid #1e1e2a",
                  color: "#4a4a62", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                }}>
                <Icon size={12} />
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Toast ──────────────────────────────────────────────────────────── */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
          background: "#22223a", border: "1px solid #6366f1", borderRadius: 12,
          padding: "10px 20px", color: "#a5b4fc", fontSize: 13, fontWeight: 500,
          zIndex: 99, whiteSpace: "nowrap",
        }}>
          {toast}
        </div>
      )}
    </>
  );
}

// ── Reusable toolbar button ────────────────────────────────────────────────────
function ToolBtn({ children, onClick, title, active }) {
  return (
    <button onClick={onClick} title={title} style={{
      width: 34, height: 34, borderRadius: 10,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: active ? "rgba(99,102,241,0.15)" : "transparent",
      border: "none", cursor: "pointer",
      color: active ? "#818cf8" : "#555570",
    }}>
      {children}
    </button>
  );
}