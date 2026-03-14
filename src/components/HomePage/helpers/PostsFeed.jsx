import { useState, useEffect } from "react";
import axios from "axios";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import FeedPost from "./FeedPost";

export default function PostsFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/post/fetch`, {withCredentials: true }
      );
      if (res.data.success) {
        setPosts(res.data.posts);
      } else {
        setError("Failed to load posts.");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Could not connect to server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  // ── Loading skeleton ──
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl p-5 space-y-3 animate-pulse"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {/* Author row skeleton */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl" style={{ background: "rgba(255,255,255,0.07)" }} />
              <div className="space-y-2 flex-1">
                <div className="h-3 rounded-full w-32" style={{ background: "rgba(255,255,255,0.07)" }} />
                <div className="h-2.5 rounded-full w-48" style={{ background: "rgba(255,255,255,0.05)" }} />
              </div>
            </div>
            {/* Content skeleton */}
            <div className="space-y-2 pt-1">
              <div className="h-3 rounded-full w-full" style={{ background: "rgba(255,255,255,0.05)" }} />
              <div className="h-3 rounded-full w-5/6" style={{ background: "rgba(255,255,255,0.05)" }} />
              <div className="h-3 rounded-full w-3/4" style={{ background: "rgba(255,255,255,0.05)" }} />
            </div>
            {/* Image skeleton */}
            <div className="h-40 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }} />
          </div>
        ))}
      </div>
    );
  }

  // ── Error state ──
  if (error) {
    return (
      <div
        className="flex flex-col items-center justify-center py-14 rounded-2xl gap-4"
        style={{ background: "rgba(248,113,113,0.05)", border: "1px solid rgba(248,113,113,0.15)" }}
      >
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)" }}
        >
          <AlertCircle size={22} style={{ color: "#f87171" }} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold mb-1" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-display)" }}>
            Failed to load posts
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>
            {error}
          </p>
        </div>
        <button
          onClick={fetchPosts}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200"
          style={{
            background: "rgba(99,102,241,0.15)",
            border: "1px solid rgba(99,102,241,0.3)",
            color: "#a5b4fc",
            fontFamily: "var(--font-body)",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(99,102,241,0.25)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(99,102,241,0.15)"; }}
        >
          <RefreshCw size={13} />
          Try again
        </button>
      </div>
    );
  }

  // ── Empty state ──
  if (posts.length === 0) {
    return (
      <div
        className="text-center py-14 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          color: "rgba(255,255,255,0.25)",
          fontFamily: "var(--font-body)",
          fontSize: "14px",
        }}
      >
        No posts yet. Be the first to post!
      </div>
    );
  }

  // ── Posts list ──
  return (
    <div className="space-y-5">
      {posts.map((post, i) => (
        <FeedPost key={post._id} post={post} index={i} />
      ))}
    </div>
  );
}