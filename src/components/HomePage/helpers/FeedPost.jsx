import { useState } from "react";
import {
  Heart, MessageCircle, Share2, Bookmark,
  MoreHorizontal, CheckCircle2, Send, X,
  ArrowUpRight,
} from "lucide-react";

/* ─── Type config ─────────────────────────────────────── */
const TYPE_CONFIG = {
  post:     { label: "Post",     color: "#818cf8", bg: "rgba(99,102,241,0.10)",  border: "rgba(99,102,241,0.22)", glow: "rgba(99,102,241,0.15)" },
  question: { label: "Question", color: "#fbbf24", bg: "rgba(251,191,36,0.10)", border: "rgba(251,191,36,0.22)", glow: "rgba(251,191,36,0.12)" },
  project:  { label: "Project",  color: "#34d399", bg: "rgba(52,211,153,0.10)", border: "rgba(52,211,153,0.22)", glow: "rgba(52,211,153,0.12)" },
};

/* ─── Image grid ──────────────────────────────────────── */
function ImageGrid({ images }) {
  const [lightbox, setLightbox] = useState(null);
  if (!images?.length) return null;
  const count = images.length;

  return (
    <>
      <div
        className="mt-4 overflow-hidden"
        style={{
          display: "grid",
          gap: "3px",
          borderRadius: "16px",
          gridTemplateColumns: count === 1 ? "1fr" : "1fr 1fr",
          gridTemplateRows: count === 1 ? "300px" : count === 2 ? "240px" : "160px 160px",
        }}
      >
        {images.slice(0, 3).map((src, i) => (
          <div
            key={i}
            onClick={() => setLightbox(src)}
            className="relative overflow-hidden cursor-zoom-in group"
            style={{
              gridColumn: count === 3 && i === 0 ? "1 / 2" : "auto",
              gridRow:    count === 3 && i === 0 ? "1 / 3" : "auto",
            }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              style={{ transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)" }}
            />
            {/* hover overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))",
                transition: "opacity 0.3s",
              }}
            />
            {/* +N badge */}
            {i === 2 && count > 3 && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: "rgba(7,7,17,0.72)", backdropFilter: "blur(4px)" }}
              >
                <span style={{ color: "#fff", fontSize: "22px", fontWeight: 700, fontFamily: "var(--font-display)" }}>
                  +{count - 3}
                </span>
              </div>
            )}
            {/* scale on hover */}
            <style>{`.group:hover img { transform: scale(1.04); }`}</style>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(20px)" }}
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt=""
            className="max-w-full rounded-2xl"
            style={{ maxHeight: "88vh", boxShadow: "0 40px 100px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.06)" }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.14)",
              cursor: "pointer",
            }}
          >
            <X size={15} color="rgba(255,255,255,0.8)" />
          </button>
        </div>
      )}
    </>
  );
}

/* ─── Action button ───────────────────────────────────── */
function ActionBtn({ icon: Icon, count, active, activeColor, onClick, label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-1.5 rounded-xl text-xs font-medium"
      style={{
        padding: "7px 11px",
        background: active
          ? activeColor + "18"
          : hovered
          ? "rgba(255,255,255,0.055)"
          : "transparent",
        border: "1px solid",
        borderColor: active
          ? activeColor + "30"
          : hovered
          ? "rgba(255,255,255,0.09)"
          : "transparent",
        color: active
          ? activeColor
          : hovered
          ? "rgba(255,255,255,0.7)"
          : "rgba(255,255,255,0.35)",
        fontFamily: "var(--font-body)",
        cursor: "pointer",
        transition: "all 0.18s ease",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
      }}
    >
      <Icon
        size={14}
        fill={active ? activeColor : "none"}
        strokeWidth={active ? 2.5 : 1.8}
        style={{ transition: "all 0.18s", flexShrink: 0 }}
      />
      {count !== undefined && <span style={{ letterSpacing: "0.01em" }}>{count}</span>}
    </button>
  );
}

/* ─── Main FeedPost ───────────────────────────────────── */
export default function FeedPost({ post, index }) {
  const [liked, setLiked]         = useState(post.liked || false);
  const [saved, setSaved]         = useState(post.saved || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment]     = useState("");
  const [menuOpen, setMenuOpen]   = useState(false);

  const typeConfig = TYPE_CONFIG[post.type] || TYPE_CONFIG.post;

  const handleLike = () => {
    setLiked((l) => !l);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  const formatContent = (text) =>
    text.split("\n").map((line, i, arr) => (
      <span key={i}>
        {line}
        {i < arr.length - 1 && <br />}
      </span>
    ));

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heartPop {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.35); }
          70%  { transform: scale(0.88); }
          100% { transform: scale(1); }
        }
        .post-card { animation: fadeSlideUp 0.4s cubic-bezier(0.22,1,0.36,1) both; }
        .like-pop  { animation: heartPop 0.35s cubic-bezier(0.22,1,0.36,1); }
      `}</style>

      <article
        className="post-card rounded-2xl overflow-visible relative"
        style={{
          animationDelay: `${index * 70}ms`,
          background: "rgba(255,255,255,0.026)",
          border: "1px solid rgba(255,255,255,0.075)",
          backdropFilter: "blur(12px)",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.11)";
          e.currentTarget.style.boxShadow   = "0 4px 32px rgba(0,0,0,0.28)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.075)";
          e.currentTarget.style.boxShadow   = "none";
        }}
      >

        {/* ── Subtle left accent line ── */}
        <div
          style={{
            position: "absolute", top: 20, left: 0, bottom: 20,
            width: "2px", borderRadius: "0 2px 2px 0",
            background: `linear-gradient(to bottom, transparent, ${typeConfig.color}60, transparent)`,
          }}
        />

        <div style={{ padding: "18px 20px 0" }}>

          {/* ── Author row ── */}
          <div className="flex items-start justify-between mb-3.5">

            {/* Left: avatar + meta */}
            <div className="flex items-center gap-3">

              {/* Avatar ring */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div
                  style={{
                    position: "absolute", inset: "-2px", borderRadius: "14px",
                    background: `linear-gradient(135deg, ${post.author.collegeColor}50, transparent 60%)`,
                    zIndex: 0,
                  }}
                />
                <div
                  className="w-10 h-10 rounded-[12px] flex items-center justify-center text-xs font-bold relative z-10 cursor-pointer"
                  style={{
                    background: post.author.collegeColor + "1a",
                    border: `1.5px solid ${post.author.collegeColor}35`,
                    color: post.author.collegeColor,
                    fontFamily: "var(--font-display)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {post.author.initials}
                </div>
              </div>

              {/* Name + meta */}
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span
                    className="text-sm font-semibold cursor-pointer hover:text-indigo-300 transition-colors"
                    style={{ color: "rgba(255,255,255,0.92)", fontFamily: "var(--font-display)", letterSpacing: "0.01em" }}
                  >
                    {post.author.name}
                  </span>
                  {post.author.verified && (
                    <CheckCircle2 size={12} strokeWidth={2.5} style={{ color: post.author.collegeColor, flexShrink: 0 }} />
                  )}
                  {/* College pill */}
                  <span
                    className="hidden sm:inline text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: post.author.collegeColor + "14",
                      color: post.author.collegeColor,
                      border: `1px solid ${post.author.collegeColor}28`,
                      fontFamily: "var(--font-body)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {post.author.college}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.32)", fontFamily: "var(--font-body)" }}>
                    {post.author.role}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.14)", fontSize: "8px" }}>●</span>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-body)" }}>
                    {post.time}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: type badge + menu */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span
                className="hidden sm:inline text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase"
                style={{
                  background: typeConfig.bg,
                  color: typeConfig.color,
                  border: `1px solid ${typeConfig.border}`,
                  fontFamily: "var(--font-body)",
                  letterSpacing: "0.09em",
                }}
              >
                {typeConfig.label}
              </span>

              {/* More menu */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150"
                  style={{
                    background: menuOpen ? "rgba(255,255,255,0.08)" : "none",
                    border: menuOpen ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => { if (!menuOpen) e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                  onMouseLeave={(e) => { if (!menuOpen) e.currentTarget.style.background = "none"; }}
                >
                  <MoreHorizontal size={15} color="rgba(255,255,255,0.35)" />
                </button>

                {menuOpen && (
                  <div
                    style={{
                      position: "absolute", top: "calc(100% + 6px)", right: 0,
                      width: "160px", zIndex: 20,
                      background: "rgba(18,18,32,0.96)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "14px",
                      backdropFilter: "blur(20px)",
                      boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                      overflow: "hidden",
                      animation: "fadeSlideUp 0.15s ease",
                    }}
                  >
                    {["Save post", "Follow author", "Hide post", "Report"].map((item) => (
                      <button
                        key={item}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          display: "block", width: "100%", textAlign: "left",
                          padding: "9px 14px", background: "none", border: "none",
                          fontSize: "12px", fontFamily: "var(--font-body)",
                          color: item === "Report" ? "#f87171" : "rgba(255,255,255,0.65)",
                          cursor: "pointer", transition: "background 0.15s, color 0.15s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Post content ── */}
          <p
            className="text-sm leading-7"
            style={{
              color: "rgba(255,255,255,0.75)",
              fontFamily: "var(--font-body)",
              letterSpacing: "0.012em",
              lineHeight: "1.75",
            }}
          >
            {formatContent(post.content)}
          </p>

          {/* ── Images ── */}
          <ImageGrid images={post.images} />

          {/* ── Tags ── */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium cursor-pointer transition-all duration-150 hover:text-indigo-300"
                  style={{
                    color: "#6366f1",
                    fontFamily: "var(--font-body)",
                    background: "rgba(99,102,241,0.08)",
                    border: "1px solid rgba(99,102,241,0.18)",
                    padding: "3px 10px",
                    borderRadius: "99px",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(99,102,241,0.16)";
                    e.currentTarget.style.borderColor = "rgba(99,102,241,0.32)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(99,102,241,0.08)";
                    e.currentTarget.style.borderColor = "rgba(99,102,241,0.18)";
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Engagement bar ── */}
        <div
          className="flex items-center justify-between px-5 mt-3"
          style={{ paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center gap-3">
            {/* Like avatars placeholder */}
            <div className="flex items-center gap-1.5">
              <div className="flex" style={{ marginRight: "4px" }}>
                {[typeConfig.color, "#f87171", "#fbbf24"].map((c, i) => (
                  <div
                    key={i}
                    style={{
                      width: 18, height: 18, borderRadius: "50%",
                      background: c + "30",
                      border: `1.5px solid ${c}50`,
                      marginLeft: i > 0 ? "-6px" : 0,
                      zIndex: 3 - i,
                      position: "relative",
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>
                {likeCount.toLocaleString()} likes
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowComment((s) => !s)}
            style={{
              fontSize: "11px", color: "rgba(255,255,255,0.28)", background: "none",
              border: "none", cursor: "pointer", fontFamily: "var(--font-body)",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.28)"; }}
          >
            {post.comments} comments · {post.shares} shares
          </button>
        </div>

        {/* ── Action bar ── */}
        <div
          className="flex items-center gap-0.5 px-3 py-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "4px" }}
        >
          <ActionBtn
            icon={Heart}
            count={likeCount}
            active={liked}
            activeColor="#f87171"
            onClick={handleLike}
          />
          <ActionBtn
            icon={MessageCircle}
            count={post.comments}
            onClick={() => setShowComment((s) => !s)}
          />
          <ActionBtn icon={Share2} count={post.shares} />
          <div className="flex-1" />
          <ActionBtn
            icon={Bookmark}
            active={saved}
            activeColor="#a5b4fc"
            onClick={() => setSaved((s) => !s)}
          />
        </div>

        {/* ── Comment input ── */}
        {showComment && (
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.05)",
              padding: "14px 16px",
              animation: "fadeSlideUp 0.2s cubic-bezier(0.22,1,0.36,1) both",
            }}
          >
            <div className="flex items-center gap-3">
              {/* Current user avatar */}
              <div
                className="w-8 h-8 rounded-[10px] flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                style={{
                  background: "rgba(99,102,241,0.18)",
                  border: "1.5px solid rgba(99,102,241,0.28)",
                  color: "#a5b4fc",
                  fontFamily: "var(--font-display)",
                }}
              >
                AS
              </div>

              {/* Input wrapper */}
              <div
                className="flex-1 flex items-center gap-2 rounded-2xl px-4 py-2.5"
                style={{
                  background: "rgba(255,255,255,0.038)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  transition: "border-color 0.2s",
                }}
                onFocusCapture={(e) => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.35)"; }}
                onBlurCapture={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; }}
              >
                <input
                  autoFocus
                  type="text"
                  placeholder="Share your thoughts…"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && comment.trim()) setComment(""); }}
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{
                    color: "rgba(255,255,255,0.82)",
                    fontFamily: "var(--font-body)",
                    caretColor: "#6366f1",
                    fontSize: "13px",
                  }}
                />
                {comment && (
                  <button
                    onClick={() => setComment("")}
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all"
                    style={{
                      background: "rgba(99,102,241,0.22)",
                      border: "1px solid rgba(99,102,241,0.35)",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(99,102,241,0.38)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(99,102,241,0.22)"; }}
                  >
                    <Send size={12} color="#818cf8" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

      </article>
    </>
  );
}