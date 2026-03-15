import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Heart, MessageCircle, Bookmark, Send, MoreHorizontal } from "lucide-react";

const BASE = () => import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60)     return "just now";
  if (diff < 3600)   return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)  return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function parseTags(tags = []) {
  return tags.flatMap(t => t.split(",")).map(t => t.trim()).filter(Boolean)
    .map(t => t.startsWith("#") ? t : `#${t}`);
}

function ImageGrid({ images }) {
  const [lightbox, setLightbox] = useState(null);
  const urls = images.map(img => typeof img === "string" ? img : img.url).filter(Boolean);
  if (!urls.length) return null;

  const gridStyle = {
    1: { gridTemplateColumns: "1fr",       gridTemplateRows: "360px" },
    2: { gridTemplateColumns: "1fr 1fr",   gridTemplateRows: "300px" },
    3: { gridTemplateColumns: "1fr 1fr",   gridTemplateRows: "220px 220px" },
  };

  return (
    <>
      <div className="grid gap-2 rounded-2xl overflow-hidden mt-5" style={gridStyle[Math.min(urls.length, 3)]}>
        {urls.slice(0, 3).map((src, i) => (
          <div
            key={i}
            className="relative overflow-hidden cursor-pointer group"
            style={{
              gridColumn: urls.length === 3 && i === 0 ? "1 / 2" : "auto",
              gridRow:    urls.length === 3 && i === 0 ? "1 / 3" : "auto",
            }}
            onClick={() => setLightbox(src)}
          >
            <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            {i === 2 && urls.length > 3 && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.55)" }}>
                <span className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>+{urls.length - 3}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(8px)" }} onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="" className="max-w-full max-h-full rounded-2xl" style={{ maxHeight: "90vh", boxShadow: "0 32px 80px rgba(0,0,0,0.8)" }} />
          <button className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl font-bold"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer" }}
            onClick={() => setLightbox(null)}>×</button>
        </div>
      )}
    </>
  );
}

export default function PostDetail() {
  const { postId } = useParams();
  const navigate   = useNavigate();

  const [post, setPost]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);
  const [liked, setLiked]   = useState(false);
  const [saved, setSaved]   = useState(false);
  const [likes, setLikes]   = useState(0);

  useEffect(() => {
    axios.get(`${BASE()}/api/post/${postId}`, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          setPost(res.data.post);
          setLikes(res.data.post.score ?? 0);
        } else {
          setError("Post not found");
        }
      })
      .catch(() => setError("Could not load post"))
      .finally(() => setLoading(false));
  }, [postId]);

  const tags = parseTags(post?.tags || []);

  return (
    <div className="min-h-screen" style={{ background: "#070711" }}>

      {/* Top bar */}
      <div
        className="fixed top-0 left-0 right-0 z-40 flex items-center gap-4 px-4 md:px-8"
        style={{
          height: "60px",
          background: "rgba(7,7,17,0.9)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.7)",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
            fontSize: "13px",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <span className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
          Post
        </span>
      </div>

      {/* Content */}
      <div className="pt-[76px] pb-16 px-4 flex justify-center">
        <div className="w-full" style={{ maxWidth: "680px" }}>

          {/* Loading */}
          {loading && (
            <div className="rounded-2xl p-6 space-y-4 animate-pulse mt-4" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl" style={{ background: "rgba(255,255,255,0.08)" }} />
                <div className="space-y-2">
                  <div className="h-3 rounded-full w-32" style={{ background: "rgba(255,255,255,0.08)" }} />
                  <div className="h-2.5 rounded-full w-20" style={{ background: "rgba(255,255,255,0.05)" }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 rounded-full w-full" style={{ background: "rgba(255,255,255,0.05)" }} />
                <div className="h-3 rounded-full w-4/5" style={{ background: "rgba(255,255,255,0.05)" }} />
                <div className="h-3 rounded-full w-3/5" style={{ background: "rgba(255,255,255,0.05)" }} />
              </div>
              <div className="h-48 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }} />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>{error}</p>
              <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-xl text-sm"
                style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", color: "#a5b4fc", fontFamily: "var(--font-body)", cursor: "pointer" }}>
                Go back
              </button>
            </div>
          )}

          {/* Post */}
          {post && !loading && (
            <div className="mt-4 rounded-2xl overflow-hidden animate-fade-slide-up"
              style={{ background: "rgba(255,255,255,0.028)", border: "1px solid rgba(255,255,255,0.08)" }}>

              {/* Author row */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4">
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => navigate(`/profile/${post.createdBy?._id}`)}
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center text-sm font-bold"
                    style={{ background: "rgba(99,102,241,0.2)", color: "#a5b4fc", fontFamily: "var(--font-display)" }}>
                    {post.createdBy?.avatar
                      ? <img src={post.createdBy.avatar} alt={post.createdBy.name} className="w-full h-full object-cover" />
                      : post.createdBy?.name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
                    }
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white hover:text-indigo-300 transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                      {post.createdBy?.name}
                    </p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}>
                      {post.createdBy?.headline || post.createdBy?.branch} · {timeAgo(post.createdAt)}
                    </p>
                  </div>
                </div>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "none", border: "none", cursor: "pointer" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "none"; }}>
                  <MoreHorizontal size={16} style={{ color: "rgba(255,255,255,0.4)" }} />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 pb-2">
                {post.title && (
                  <h1 className="text-xl font-bold text-white mb-3 leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                    {post.title}
                  </h1>
                )}
                <p className="text-sm leading-7" style={{ color: "rgba(255,255,255,0.78)", fontFamily: "var(--font-body)", whiteSpace: "pre-wrap" }}>
                  {post.content}
                </p>
              </div>

              {/* Images */}
              <div className="px-6">
                <ImageGrid images={post.images || []} />
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 px-6 mt-4">
                  {tags.map(tag => (
                    <span key={tag} className="text-xs font-medium" style={{ color: "#818cf8", fontFamily: "var(--font-body)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action bar */}
              <div className="flex items-center px-6 py-4 gap-1 mt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <button
                  onClick={() => { setLiked(l => !l); setLikes(c => liked ? c - 1 : c + 1); }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200"
                  style={{
                    background: liked ? "rgba(248,113,113,0.1)" : "transparent",
                    border: "1px solid transparent",
                    cursor: "pointer",
                    color: liked ? "#f87171" : "rgba(255,255,255,0.35)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <Heart size={16} fill={liked ? "#f87171" : "none"} style={{ transition: "all 0.2s" }} />
                  <span>{likes}</span>
                </button>

                <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200"
                  style={{ background: "transparent", border: "1px solid transparent", cursor: "pointer", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}>
                  <MessageCircle size={16} />
                  <span>{post.comments ?? 0}</span>
                </button>

                <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200"
                  style={{ background: "transparent", border: "1px solid transparent", cursor: "pointer", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}>
                  <Send size={14} />
                </button>

                <button
                  onClick={() => setSaved(s => !s)}
                  className="ml-auto flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200"
                  style={{
                    background: saved ? "rgba(165,180,252,0.1)" : "transparent",
                    border: "1px solid transparent",
                    cursor: "pointer",
                    color: saved ? "#a5b4fc" : "rgba(255,255,255,0.28)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <Bookmark size={15} fill={saved ? "#a5b4fc" : "none"} style={{ transition: "all 0.2s" }} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}