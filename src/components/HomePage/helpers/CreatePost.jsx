import { useState, useRef } from "react";
import { Image, Send, X, Plus, Tag, Type } from "lucide-react";
import { CURRENT_USER } from "./constants";

const MAX_IMAGES = 10;
const MAX_CHARS  = 500;

export const POST_STORE = [];

// ─── Image preview grid ───────────────────────────────────────────────────────
function ImagePreviewGrid({ images, onRemove }) {
  const count = images.length;
  if (!count) return null;

  // Single image: wide strip. 2+: fixed small thumbnails in a wrapping row.
  if (count === 1) {
    return (
      <div className="mt-3 rounded-xl overflow-hidden relative group" style={{ height: 180 }}>
        <img
          src={images[0].preview}
          alt=""
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <button
          onClick={() => onRemove(0)}
          className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full flex items-center justify-center border border-white/20 transition-colors duration-150"
          style={{ background: "rgba(0,0,0,0.65)" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.85)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.65)"; }}
        >
          <X size={10} color="#fff" />
        </button>
      </div>
    );
  }

  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {images.map((img, i) => {
        const isOverflow = i === 3 && count > 4;
        if (i > 3) return null;
        return (
          <div
            key={i}
            className="relative rounded-xl overflow-hidden group flex-shrink-0"
            style={{ width: 80, height: 80 }}
          >
            <img
              src={img.preview}
              alt=""
              className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.06]"
            />

            {/* +N overlay on 4th tile */}
            {isOverflow && (
              <div
                className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[2px]"
                style={{ background: "rgba(7,7,17,0.68)" }}
              >
                <span className="text-white text-base font-bold" style={{ fontFamily: "var(--font-display)" }}>
                  +{count - 3}
                </span>
              </div>
            )}

            {/* Remove — visible on hover */}
            {!isOverflow && (
              <button
                onClick={() => onRemove(i)}
                className="absolute top-1 right-1 z-20 w-5 h-5 rounded-full flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-150"
                style={{ background: "rgba(0,0,0,0.7)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.85)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.7)"; }}
              >
                <X size={9} color="#fff" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Toolbar button ───────────────────────────────────────────────────────────
function ToolBtn({ children, onClick, title, active }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center cursor-pointer transition-all duration-150"
      style={{
        background: active ? "rgba(99,102,241,0.15)" : "transparent",
        border: active ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent",
        color: active ? "#818cf8" : "rgba(255,255,255,0.28)",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = "rgba(255,255,255,0.05)";
          e.currentTarget.style.color = "rgba(255,255,255,0.6)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "rgba(255,255,255,0.28)";
        }
      }}
    >
      {children}
    </button>
  );
}

// ─── Tag input ────────────────────────────────────────────────────────────────
function TagInput({ tags, setTags }) {
  const [input, setInput] = useState("");

  const addTag = (raw) => {
    const val = raw.trim().replace(/^#+/, "");
    if (!val || tags.includes("#" + val) || tags.length >= 8) return;
    setTags((t) => [...t, "#" + val]);
    setInput("");
  };

  const onKeyDown = (e) => {
    if (["Enter", ",", " "].includes(e.key)) { e.preventDefault(); addTag(input); }
    if (e.key === "Backspace" && !input && tags.length > 0)
      setTags((t) => t.slice(0, -1));
  };

  return (
    <div
      className="flex flex-wrap items-center gap-1.5 px-3 py-2 rounded-xl mt-2.5 transition-colors duration-200"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
      onFocusCapture={(e) => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)"; }}
      onBlurCapture={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
    >
      <Tag size={13} color="rgba(255,255,255,0.22)" className="flex-shrink-0" />

      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium"
          style={{
            background: "rgba(99,102,241,0.14)",
            border: "1px solid rgba(99,102,241,0.28)",
            color: "#a5b4fc",
            fontFamily: "var(--font-body)",
          }}
        >
          {tag}
          <button
            onClick={() => setTags((t) => t.filter((x) => x !== tag))}
            className="bg-transparent border-none cursor-pointer p-0 leading-none"
          >
            <X size={10} color="#818cf8" />
          </button>
        </span>
      ))}

      {tags.length < 8 && (
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => addTag(input)}
          placeholder={tags.length === 0 ? "Add tags… (Enter to confirm)" : "+ tag"}
          className="flex-1 min-w-[80px] bg-transparent border-none outline-none text-xs"
          style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)", caretColor: "#6366f1" }}
        />
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function CreatePost() {
  const [active,  setActive]  = useState(false);
  const [title,   setTitle]   = useState("");
  const [content, setContent] = useState("");
  const [tags,    setTags]    = useState([]);
  const [images,  setImages]  = useState([]);
  const [toast,   setToast]   = useState(false);

  const fileRef = useRef(null);
  const canPost = content.trim() || images.length > 0;

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(false), 2500); };

  const reset = () => {
    setTitle(""); setContent(""); setTags([]); setImages([]);
    setActive(false);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const remaining = MAX_IMAGES - images.length;
    const added = files.slice(0, remaining).map((f) => ({
      file: f, preview: URL.createObjectURL(f),
      name: f.name, size: f.size, mimeType: f.type,
    }));
    setImages((p) => [...p, ...added]);
    e.target.value = "";
  };

  const removeImage = (i) => {
    setImages((prev) => {
      const next = [...prev];
      URL.revokeObjectURL(next[i].preview);
      next.splice(i, 1);
      return next;
    });
  };

  const handlePost = () => {
    if (!canPost) return;

    const post = {
      id:        Date.now(),
      title:     title.trim() || null,
      content:   content.trim(),
      tags,
      images:    images.map((img, i) => ({
        index:    i,
        name:     img.name,
        size:     img.size,
        mimeType: img.mimeType,
        preview:  img.preview,
      })),
      author:    { ...CURRENT_USER },
      meta:      { likes: 0, comments: 0, shares: 0, saved: false },
      createdAt: new Date().toISOString(),
    };

    POST_STORE.unshift(post);

    console.group(`📝 New Post  ·  ${new Date().toLocaleTimeString()}`);
    console.log("Post JSON:\n", JSON.stringify(post, null, 2));
    console.log(`POST_STORE (${POST_STORE.length} total):\n`, JSON.stringify(POST_STORE, null, 2));
    console.groupEnd();

    showToast("Posted successfully! 🎉");
    setTimeout(reset, 500);
  };

  return (
    <>
      <style>{`
        @keyframes expandIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cp-expanded { animation: expandIn 0.2s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      <div
        className="rounded-2xl p-[18px] transition-all duration-300 backdrop-blur-xl"
        style={{
          background: "rgba(255,255,255,0.026)",
          border: active ? "1px solid rgba(99,102,241,0.38)" : "1px solid rgba(255,255,255,0.075)",
          boxShadow: active ? "0 0 0 1px rgba(99,102,241,0.08), 0 8px 40px rgba(0,0,0,0.42)" : "none",
        }}
      >

        {/* ── Top row ──────────────────────────────────────────────────── */}
        <div className="flex items-start gap-3">

          {/* Avatar */}
          <div
            className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-[13px] font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              fontFamily: "var(--font-display)",
              letterSpacing: "0.04em",
            }}
          >
            {CURRENT_USER?.initials ?? "U"}
          </div>

          {/* Input area */}
          <div
            onClick={() => setActive(true)}
            className="flex-1 rounded-[14px] transition-colors duration-200 cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.035)",
              border: "1px solid rgba(255,255,255,0.07)",
              padding: active ? "10px 14px 8px" : "11px 16px",
              cursor: active ? "default" : "pointer",
            }}
          >
            {!active ? (
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-body)" }}>
                What's on your mind?
              </span>
            ) : (
              <div className="cp-expanded">
                <input
                  autoFocus
                  type="text"
                  placeholder="Post title  (optional)"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-[15px] font-semibold pb-2 mb-2.5"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    color: "rgba(255,255,255,0.92)",
                    fontFamily: "var(--font-display)",
                    caretColor: "#6366f1",
                    letterSpacing: "0.01em",
                  }}
                />
                <textarea
                  rows={3}
                  placeholder="Share something with your campus…"
                  value={content}
                  onChange={(e) => {
                    if (e.target.value.length <= MAX_CHARS) setContent(e.target.value);
                  }}
                  className="w-full bg-transparent border-none outline-none resize-none text-[13px] leading-7"
                  style={{
                    color: "rgba(255,255,255,0.78)",
                    fontFamily: "var(--font-body)",
                    caretColor: "#6366f1",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* ── Image preview ─────────────────────────────────────────────── */}
        {images.length > 0 && (
          <div>
            <ImagePreviewGrid images={images} onRemove={removeImage} />
            {images.length < MAX_IMAGES && (
              <button
                onClick={() => fileRef.current.click()}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-[10px] text-[11px] font-medium cursor-pointer transition-all duration-150"
                style={{
                  background: "rgba(99,102,241,0.1)",
                  border: "1px dashed rgba(99,102,241,0.3)",
                  color: "#818cf8",
                  fontFamily: "var(--font-body)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(99,102,241,0.18)";
                  e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(99,102,241,0.1)";
                  e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)";
                }}
              >
                <Plus size={12} />
                Add more · {images.length}/{MAX_IMAGES}
              </button>
            )}
          </div>
        )}

        {/* ── Expanded panel ────────────────────────────────────────────── */}
        {active && (
          <div className="mt-3">
            <TagInput tags={tags} setTags={setTags} />

            <div className="border-t my-3" style={{ borderColor: "rgba(255,255,255,0.06)" }} />

            {/* Toolbar */}
            <div className="flex items-center gap-0.5">
              <input
                type="file" accept="image/*" multiple
                ref={fileRef} className="hidden"
                onChange={handleImageChange}
              />

              <ToolBtn
                title={`Photos (${images.length}/${MAX_IMAGES})`}
                active={images.length > 0}
                onClick={() => fileRef.current.click()}
              >
                <Image size={16} />
              </ToolBtn>

              {/* Counters */}
              <div className="flex items-center gap-1.5 ml-1">
                {images.length > 0 && (
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: images.length >= MAX_IMAGES ? "#f87171" : "#818cf8",
                      background: images.length >= MAX_IMAGES ? "rgba(248,113,113,0.1)" : "rgba(99,102,241,0.12)",
                      border: `1px solid ${images.length >= MAX_IMAGES ? "rgba(248,113,113,0.25)" : "rgba(99,102,241,0.25)"}`,
                    }}
                  >
                    {images.length}/{MAX_IMAGES} photos
                  </span>
                )}
                <span
                  className="text-[11px]"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: content.length > 450 ? "#f87171" : "rgba(255,255,255,0.18)",
                  }}
                >
                  {content.length}/{MAX_CHARS}
                </span>
              </div>

              {/* Cancel + Post */}
              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={reset}
                  className="px-3.5 py-1.5 rounded-[10px] text-xs font-medium cursor-pointer transition-colors duration-150"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.38)",
                    fontFamily: "var(--font-body)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.38)"; }}
                >
                  Cancel
                </button>
                <button
                  onClick={handlePost}
                  disabled={!canPost}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-[10px] text-xs font-semibold transition-opacity duration-150"
                  style={{
                    background: canPost ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "rgba(255,255,255,0.05)",
                    border: "none",
                    color: canPost ? "#fff" : "rgba(255,255,255,0.2)",
                    cursor: canPost ? "pointer" : "not-allowed",
                    fontFamily: "var(--font-body)",
                    boxShadow: canPost ? "0 4px 16px rgba(99,102,241,0.28)" : "none",
                    letterSpacing: "0.3px",
                  }}
                  onMouseEnter={(e) => { if (canPost) e.currentTarget.style.opacity = "0.85"; }}
                  onMouseLeave={(e) => { if (canPost) e.currentTarget.style.opacity = "1"; }}
                >
                  <Send size={13} />
                  Post
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Collapsed quick row ───────────────────────────────────────── */}
        {!active && (
          <div className="flex gap-1.5 mt-3.5 pt-3.5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            {[
              { icon: Type,  label: "Write", action: () => setActive(true) },
              { icon: Image, label: "Photo", action: () => { setActive(true); setTimeout(() => fileRef.current?.click(), 80); } },
            ].map(({ icon: Icon, label, action }) => (
              <button
                key={label}
                onClick={action}
                className="flex-1 py-2 rounded-[10px] text-[11px] font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-150"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.3)",
                  fontFamily: "var(--font-body)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(99,102,241,0.08)";
                  e.currentTarget.style.color = "#818cf8";
                  e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.3)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                }}
              >
                <Icon size={12} />
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Toast ──────────────────────────────────────────────────────────── */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-xl text-[13px] font-medium z-[999] whitespace-nowrap backdrop-blur-xl"
          style={{
            background: "rgba(14,14,26,0.95)",
            border: "1px solid rgba(99,102,241,0.38)",
            color: "#a5b4fc",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            fontFamily: "var(--font-body)",
          }}
        >
          {toast}
        </div>
      )}
    </>
  );
}