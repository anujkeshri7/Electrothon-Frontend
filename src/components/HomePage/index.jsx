import { useState } from "react";
import Navbar from "./helpers/events)/Navbar";
import LeftSidebar from "./helpers/LeftSidebar";
import RightSidebar from "./helpers/RightSidebar";
import StoriesBar from "./helpers/StoriesBar";
import CreatePost from "./helpers/CreatePost";
import FeedPost from "./helpers/FeedPost";
import { FEED_POSTS } from "./helpers/constants";
import { PanelLeft, PanelLeftClose } from "lucide-react";

const FEED_TABS = ["For you", "College", "Following", "Projects", "Questions"];

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleProfileClick = () => alert("Redirecting to Profile...");

  return (
    <div className="min-h-screen relative" style={{ background: "#070711" }}>

      {/* ── Ambient blobs ── */}
      <div className="fixed pointer-events-none" style={{ top: "-20%", left: "-15%", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 65%)", filter: "blur(80px)", zIndex: 0 }} />
      <div className="fixed pointer-events-none" style={{ bottom: "-20%", right: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 65%)", filter: "blur(80px)", zIndex: 0 }} />
      <div className="fixed pointer-events-none" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "900px", height: "300px", background: "radial-gradient(ellipse, rgba(56,189,248,0.025) 0%, transparent 70%)", filter: "blur(60px)", zIndex: 0 }} />

      {/* Grid overlay */}
      <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)`, backgroundSize: "60px 60px", zIndex: 0 }} />

      {/* Navbar */}
      <Navbar onProfileClick={handleProfileClick} />

      {/* ── Left sidebar overlay (mobile/collapsed) ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Left sidebar panel ── */}
      <aside
        className="fixed top-[60px] left-0 h-[calc(100vh-60px)] z-40 flex flex-col transition-all duration-300 overflow-y-auto"
        style={{
          width: "272px",
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
          background: "rgba(7,7,17,0.97)",
          backdropFilter: "blur(24px)",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          boxShadow: sidebarOpen ? "8px 0 40px rgba(0,0,0,0.5)" : "none",
          scrollbarWidth: "none",
          padding: "20px 16px 32px",
        }}
      >
        <LeftSidebar onProfileClick={() => { setSidebarOpen(false); handleProfileClick(); }} />
      </aside>

      {/* ── Page body ── */}
      <div
        className="relative z-10 mx-auto pt-[60px] pb-12"
        style={{ maxWidth: "1400px", padding: "60px 24px 48px" }}
      >
        <div className="flex gap-6 items-start pt-6">

          {/* ── Main feed ── */}
          <main className="flex-1 min-w-0 space-y-5">

            {/* Toggle + Feed header row */}
            <div className="flex items-center gap-3">
              {/* Sidebar toggle button */}
              <button
                onClick={() => setSidebarOpen((o) => !o)}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all duration-200 flex-shrink-0"
                style={{
                  background: sidebarOpen ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.05)",
                  border: sidebarOpen ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.09)",
                  color: sidebarOpen ? "#a5b4fc" : "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  boxShadow: sidebarOpen ? "0 0 16px rgba(99,102,241,0.2)" : "none",
                }}
              >
                {sidebarOpen
                  ? <PanelLeftClose size={16} />
                  : <PanelLeft size={16} />
                }
                <span style={{ fontSize: "13px", fontFamily: "var(--font-body)", fontWeight: 500 }}>
                  Menu
                </span>
              </button>

              {/* Feed tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                {FEED_TABS.map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(i)}
                    className="px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 flex-shrink-0"
                    style={{
                      background: activeTab === i ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)",
                      border: activeTab === i ? "1px solid rgba(99,102,241,0.35)" : "1px solid rgba(255,255,255,0.07)",
                      color: activeTab === i ? "#a5b4fc" : "rgba(255,255,255,0.4)",
                      fontFamily: "var(--font-body)",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => { if (activeTab !== i) { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; } }}
                    onMouseLeave={(e) => { if (activeTab !== i) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; } }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Stories */}
            <StoriesBar />

            {/* Create post */}
            <CreatePost />

            {/* Posts */}
            <div className="space-y-5">
              {FEED_POSTS.map((post, i) => (
                <FeedPost key={post.id} post={post} index={i} />
              ))}
            </div>

            {/* Load more */}
            <button
              className="w-full py-4 rounded-2xl text-sm font-medium transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.35)",
                fontFamily: "var(--font-body)",
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
            >
              Load more posts
            </button>
          </main>

          {/* ── Right sidebar ── */}
          <div className="hidden xl:block flex-shrink-0" style={{ width: "308px" }}>
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}