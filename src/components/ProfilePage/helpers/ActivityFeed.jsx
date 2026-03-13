import { useState } from "react";
import { Heart, MessageCircle, Bookmark, MoreHorizontal, Send } from "lucide-react";
import { DUMMY_POSTS } from "./constants";

const TABS = ["All", "Posts", "Questions", "Projects"];

const TYPE_MAP = {
  post:     { label: "Post",     color: "#6366f1", bg: "rgba(99,102,241,0.12)",  border: "rgba(99,102,241,0.25)" },
  question: { label: "Question", color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.25)" },
  project:  { label: "Project",  color: "#34d399", bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.25)" },
};

// ── Image Grid ───────────────────────────────────────────────
function ImageGrid({ images }) {
  const [lightbox, setLightbox] = useState(null);
  const count = images.length;
  if (count === 0) return null;

  const gridStyle = {
    1: { gridTemplateColumns: "1fr", gridTemplateRows: "220px" },
    2: { gridTemplateColumns: "1fr 1fr", gridTemplateRows: "200px" },
    3: { gridTemplateColumns: "1fr 1fr", gridTemplateRows: "160px 160px" },
  };

  return (
    <>
      <div
        className="grid gap-1.5 rounded-xl overflow-hidden mt-4"
        style={gridStyle[Math.min(count, 3)] || gridStyle[3]}
      >
        {images.slice(0, 3).map((src, i) => (
          <div
            key={i}
            className="relative overflow-hidden cursor-pointer group"
            style={{
              gridColumn: count === 3 && i === 0 ? "1 / 2" : "auto",
              gridRow: count === 3 && i === 0 ? "1 / 3" : "auto",
            }}
            onClick={() => setLightbox(src)}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* +N overlay on last image if more than 3 */}
            {i === 2 && count > 3 && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.55)" }}
              >
                <span
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  +{count - 3}
                </span>
              </div>
            )}
            {/* Hover overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: "rgba(99,102,241,0.1)" }}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(8px)" }}
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt=""
            className="max-w-full max-h-full rounded-2xl"
            style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.8)", maxHeight: "90vh" }}
          />
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl font-bold"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}

// ── Post Card ─────────────────────────────────────────────────
function PostCard({ post, index }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const type = TYPE_MAP[post.type];

  return (
    <div
      className="rounded-2xl overflow-hidden animate-fade-slide-up"
      style={{
        background: "rgba(255,255,255,0.028)",
        border: "1px solid rgba(255,255,255,0.08)",
        animationDelay: `${index * 70}ms`,
        animationFillMode: "both",
      }}
    >
      {/* Card body */}
      <div className="p-5">
        {/* Top row — type badge + time + menu */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest"
            style={{
              background: type.bg,
              color: type.color,
              border: `1px solid ${type.border}`,
              fontFamily: "var(--font-body)",
              letterSpacing: "0.1em",
            }}
          >
            {type.label}
          </span>
          <div className="flex items-center gap-2">
            <span
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-body)" }}
            >
              {post.time}
            </span>
            <button
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150"
              style={{ background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
            >
              <MoreHorizontal size={15} style={{ color: "rgba(255,255,255,0.3)" }} />
            </button>
          </div>
        </div>

        {/* Content text */}
        <p
          className="text-sm leading-7 mb-1"
          style={{
            color: "rgba(255,255,255,0.78)",
            fontFamily: "var(--font-body)",
            letterSpacing: "0.01em",
          }}
        >
          {post.content}
        </p>

        {/* Images */}
        <ImageGrid images={post.images || []} />

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium cursor-pointer transition-colors duration-150"
                style={{ color: "#818cf8", fontFamily: "var(--font-body)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#a5b4fc"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#818cf8"; }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action bar — separated with subtle border */}
      <div
        className="flex items-center px-5 py-3 gap-1"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Like */}
        <button
          onClick={() => setLiked((l) => !l)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200"
          style={{
            background: liked ? "rgba(248,113,113,0.1)" : "transparent",
            border: "1px solid transparent",
            cursor: "pointer",
            color: liked ? "#f87171" : "rgba(255,255,255,0.35)",
            fontFamily: "var(--font-body)",
          }}
          onMouseEnter={(e) => {
            if (!liked) { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }
          }}
          onMouseLeave={(e) => {
            if (!liked) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }
          }}
        >
          <Heart size={15} fill={liked ? "#f87171" : "none"} style={{ transition: "all 0.2s" }} />
          <span>{post.likes + (liked ? 1 : 0)}</span>
        </button>

        {/* Comment */}
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            cursor: "pointer",
            color: "rgba(255,255,255,0.35)",
            fontFamily: "var(--font-body)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
        >
          <MessageCircle size={15} />
          <span>{post.comments}</span>
        </button>

        {/* Share */}
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            cursor: "pointer",
            color: "rgba(255,255,255,0.35)",
            fontFamily: "var(--font-body)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
        >
          <Send size={14} />
        </button>

        {/* Save — pushed to right */}
        <button
          onClick={() => setSaved((s) => !s)}
          className="ml-auto flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200"
          style={{
            background: saved ? "rgba(165,180,252,0.1)" : "transparent",
            border: "1px solid transparent",
            cursor: "pointer",
            color: saved ? "#a5b4fc" : "rgba(255,255,255,0.28)",
            fontFamily: "var(--font-body)",
          }}
        >
          <Bookmark size={14} fill={saved ? "#a5b4fc" : "none"} style={{ transition: "all 0.2s" }} />
        </button>
      </div>
    </div>
  );
}

// ── Main Feed ─────────────────────────────────────────────────
export default function ActivityFeed() {
  const [activeTab, setActiveTab] = useState("All");

  const tabFilter = {
    All: () => true,
    Posts: (p) => p.type === "post",
    Questions: (p) => p.type === "question",
    Projects: (p) => p.type === "project",
  };

  const filtered = DUMMY_POSTS.filter(tabFilter[activeTab]);

  return (
    <div>
      {/* Tab bar */}
      <div
        className="flex gap-1 p-1 rounded-2xl mb-5"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200"
            style={{
              background: activeTab === tab ? "rgba(99,102,241,0.2)" : "transparent",
              border: activeTab === tab ? "1px solid rgba(99,102,241,0.35)" : "1px solid transparent",
              color: activeTab === tab ? "#a5b4fc" : "rgba(255,255,255,0.32)",
              fontFamily: "var(--font-body)",
              cursor: "pointer",
              letterSpacing: "0.02em",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Posts list */}
      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))
        ) : (
          <div
            className="text-center py-14 rounded-2xl"
            style={{
              color: "rgba(255,255,255,0.22)",
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            No {activeTab.toLowerCase()} yet
          </div>
        )}
      </div>
    </div>
  );
}