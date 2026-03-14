import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, CheckCircle2, Send } from "lucide-react";

const TYPE_CONFIG = {
  post:     { label: "Post",     color: "#6366f1", bg: "rgba(99,102,241,0.12)",  border: "rgba(99,102,241,0.25)" },
  question: { label: "Question", color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.25)" },
  project:  { label: "Project",  color: "#34d399", bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.25)" },
};

function ImageGrid({ images }) {
  const [lightbox, setLightbox] = useState(null);
  if (!images?.length) return null;
  const count = images.length;

  const gridConfig = {
    1: { cols: "1fr", rows: "280px" },
    2: { cols: "1fr 1fr", rows: "220px" },
    3: { cols: "1fr 1fr", rows: "160px 160px" },
  };
  const cfg = gridConfig[Math.min(count, 3)];

  return (
    <>
      <div
        className="grid gap-1.5 rounded-2xl overflow-hidden mt-4"
        style={{ gridTemplateColumns: cfg.cols, gridTemplateRows: cfg.rows }}
      >
        {images.slice(0, 3).map((src, i) => (
          <div
            key={i}
            className="relative overflow-hidden cursor-zoom-in group"
            style={{
              gridColumn: count === 3 && i === 0 ? "1/2" : "auto",
              gridRow: count === 3 && i === 0 ? "1/3" : "auto",
            }}
            onClick={() => setLightbox(src)}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {i === 2 && count > 3 && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.6)" }}>
                <span className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>+{count - 3}</span>
              </div>
            )}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: "rgba(99,102,241,0.08)" }} />
          </div>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt=""
            className="max-w-full max-h-full rounded-2xl"
            style={{ maxHeight: "88vh", boxShadow: "0 40px 100px rgba(0,0,0,0.8)" }}
          />
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", fontSize: "18px", cursor: "pointer" }}
          >×</button>
        </div>
      )}
    </>
  );
}

function ActionBtn({ icon: Icon, count, active, activeColor, onClick, label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200"
      style={{
        background: active ? activeColor + "15" : hovered ? "rgba(255,255,255,0.06)" : "transparent",
        border: "1px solid transparent",
        color: active ? activeColor : hovered ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.38)",
        fontFamily: "var(--font-body)",
        cursor: "pointer",
      }}
    >
      <Icon size={15} fill={active ? activeColor : "none"} style={{ transition: "all 0.2s", flexShrink: 0 }} />
      {count !== undefined && <span>{count}</span>}
    </button>
  );
}

export default function FeedPost({ post, index }) {
  const [liked, setLiked] = useState(post.liked || false);
  const [saved, setSaved] = useState(post.saved || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const typeConfig = TYPE_CONFIG[post.type];

  const handleLike = () => {
    setLiked((l) => !l);
    setLikeCount((c) => liked ? c - 1 : c + 1);
  };

  const formatContent = (text) =>
    text.split("\n").map((line, i) => (
      <span key={i}>{line}{i < text.split("\n").length - 1 && <br />}</span>
    ));

  return (
    <article
      className="rounded-2xl overflow-hidden animate-fade-slide-up"
      style={{
        background: "rgba(255,255,255,0.028)",
        border: "1px solid rgba(255,255,255,0.08)",
        animationDelay: `${index * 80}ms`,
        animationFillMode: "both",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
    >
      <div className="p-5">
        {/* Author row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 cursor-pointer"
              style={{
                background: post.author.collegeColor + "22",
                border: `1.5px solid ${post.author.collegeColor}40`,
                color: post.author.collegeColor,
                fontFamily: "var(--font-display)",
              }}
            >
              {post.author.initials}
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span
                  className="text-sm font-semibold text-white cursor-pointer hover:text-indigo-300 transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {post.author.name}
                </span>
                {post.author.verified && (
                  <CheckCircle2 size={13} style={{ color: post.author.collegeColor, flexShrink: 0 }} />
                )}
                <span
                  className="hidden sm:inline text-[10px] px-2 py-0.5 rounded-full"
                  style={{
                    background: post.author.collegeColor + "15",
                    color: post.author.collegeColor,
                    border: `1px solid ${post.author.collegeColor}30`,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {post.author.college}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}
                >
                  {post.author.role}
                </span>
                <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "10px" }}>·</span>
                <span
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-body)" }}
                >
                  {post.time}
                </span>
              </div>
            </div>
          </div>

          {/* Right — type badge + menu */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span
              className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider hidden sm:block"
              style={{
                background: typeConfig.bg,
                color: typeConfig.color,
                border: `1px solid ${typeConfig.border}`,
                fontFamily: "var(--font-body)",
                letterSpacing: "0.08em",
              }}
            >
              {typeConfig.label}
            </span>
            <button
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150"
              style={{ background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
            >
              <MoreHorizontal size={16} style={{ color: "rgba(255,255,255,0.3)" }} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          className="text-sm leading-7 mb-1"
          style={{ color: "rgba(255,255,255,0.78)", fontFamily: "var(--font-body)", letterSpacing: "0.01em" }}
        >
          {formatContent(post.content)}
        </div>

        {/* Images */}
        <ImageGrid images={post.images} />

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium cursor-pointer transition-colors duration-150 hover:text-indigo-300"
                style={{ color: "#818cf8", fontFamily: "var(--font-body)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Engagement stats */}
      <div
        className="flex items-center justify-between px-5 py-2"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-body)" }}>
          {likeCount.toLocaleString()} likes
        </span>
        <span
          className="text-xs cursor-pointer hover:text-white transition-colors"
          style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-body)" }}
          onClick={() => setShowComment((s) => !s)}
        >
          {post.comments} comments · {post.shares} shares
        </span>
      </div>

      {/* Action bar */}
      <div
        className="flex items-center px-3 py-1"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <ActionBtn icon={Heart} count={likeCount} active={liked} activeColor="#f87171" onClick={handleLike} />
        <ActionBtn icon={MessageCircle} count={post.comments} onClick={() => setShowComment((s) => !s)} />
        <ActionBtn icon={Share2} count={post.shares} />
        <div className="ml-auto">
          <ActionBtn icon={Bookmark} active={saved} activeColor="#a5b4fc" onClick={() => setSaved((s) => !s)} />
        </div>
      </div>

      {/* Comment box */}
      {showComment && (
        <div
          className="flex items-center gap-2.5 px-5 py-3 animate-fade-slide-up"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ background: "rgba(99,102,241,0.2)", color: "#a5b4fc", fontFamily: "var(--font-display)" }}
          >
            AS
          </div>
          <div
            className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <input
              autoFocus
              type="text"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-body)", caretColor: "#6366f1" }}
            />
            {comment && (
              <button
                className="flex-shrink-0 transition-opacity hover:opacity-80"
                style={{ background: "none", border: "none", cursor: "pointer" }}
                onClick={() => setComment("")}
              >
                <Send size={14} style={{ color: "#6366f1" }} />
              </button>
            )}
          </div>
        </div>
      )}
    </article>
  );
}