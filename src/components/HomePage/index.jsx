import { useState, useEffect } from "react";
import Navbar from "./helpers/events)/Navbar";
import LeftSidebar from "./helpers/LeftSidebar";
import RightSidebar from "./helpers/RightSidebar";
import StoriesBar from "./helpers/StoriesBar";
import CreatePost from "./helpers/CreatePost";
import FeedPost from "./helpers/FeedPost";
import { FEED_POSTS } from "./helpers/constants";
import { PanelLeft, PanelLeftClose, Cpu, ChevronRight } from "lucide-react";
import { Navigate } from "react-router-dom";

const FEED_TABS = ["For you", "College", "Following", "Projects", "Questions"];

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Auto-close sidebar when resizing to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1280) setSidebarOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const handleProfileClick = () => Navigate("/profile");

  return (
    <div className="min-h-screen" style={{ background: "#070711" }}>

      {/* ── Ambient blobs (fixed, decorative) ── */}
      <div
        className="fixed pointer-events-none"
        style={{
          top: "-20%", left: "-15%",
          width: "700px", height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 65%)",
          filter: "blur(80px)", zIndex: 0,
        }}
      />
      <div
        className="fixed pointer-events-none"
        style={{
          bottom: "-20%", right: "-10%",
          width: "600px", height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 65%)",
          filter: "blur(80px)", zIndex: 0,
        }}
      />
      <div
        className="fixed pointer-events-none"
        style={{
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "900px", height: "300px",
          background: "radial-gradient(ellipse, rgba(56,189,248,0.025) 0%, transparent 70%)",
          filter: "blur(60px)", zIndex: 0,
        }}
      />

      {/* Grid overlay (fixed, decorative) */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          zIndex: 0,
        }}
      />

      {/* ── Navbar (fixed, always on top) ── */}
      <Navbar onProfileClick={handleProfileClick} />

      {/* ── Mobile / Tablet backdrop overlay ── */}
      <div
        className={`fixed inset-0 z-30 xl:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ── Left Sidebar ──
          Desktop (xl+): always visible, shifts content
          Mobile/Tablet:  overlay slide-in, controlled by sidebarOpen
      ── */}
      <aside
        className={`
          fixed top-[60px] left-0 z-40 overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          xl:translate-x-0
        `}
        style={{
          width: "272px",
          height: "calc(100vh - 60px)",
          background: "rgba(7,7,17,0.98)",
          backdropFilter: "blur(24px)",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "4px 0 32px rgba(0,0,0,0.4)",
          scrollbarWidth: "none",
          padding: "20px 16px 32px",
        }}
      >
        <LeftSidebar
          onProfileClick={() => {
            setSidebarOpen(false);
            handleProfileClick();
          }}
        />
      </aside>

      {/* ── Page body ──
          On desktop: offset left by sidebar width (xl:pl-[272px])
          Fills remaining space naturally
      ── */}
      <div
        className="relative z-10 xl:pl-[272px]"
        style={{ paddingTop: "60px", minHeight: "100vh" }}
      >
        {/* Inner flex container: feed + right sidebar */}
        <div
          className="flex items-start justify-center gap-6 w-full mx-auto"
          style={{ maxWidth: "1128px", padding: "24px 16px 48px" }}
        >

          {/* ── Main feed ── */}
          <main className="flex-1 min-w-0 w-full" style={{ maxWidth: "680px" }}>

            {/* ─ Tab bar row ─ */}
            <div className="flex items-center gap-2 mb-5">

              {/* Sidebar toggle — hidden on desktop xl+ */}
              <button
                onClick={() => setSidebarOpen((o) => !o)}
                className="xl:hidden flex-shrink-0 flex items-center justify-center rounded-xl transition-all duration-200"
                style={{
                  padding: "8px 10px",
                  background: sidebarOpen
                    ? "rgba(99,102,241,0.18)"
                    : "rgba(255,255,255,0.05)",
                  border: sidebarOpen
                    ? "1px solid rgba(99,102,241,0.4)"
                    : "1px solid rgba(255,255,255,0.09)",
                  color: sidebarOpen ? "#a5b4fc" : "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  boxShadow: sidebarOpen ? "0 0 16px rgba(99,102,241,0.2)" : "none",
                }}
                aria-label="Toggle menu"
              >
                {sidebarOpen
                  ? <PanelLeftClose size={17} />
                  : <PanelLeft size={17} />
                }
              </button>

              {/* Feed tabs — scrollable row */}
              <div
                className="flex items-center gap-1.5 overflow-x-auto flex-1"
                style={{ scrollbarWidth: "none" }}
              >
                {FEED_TABS.map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(i)}
                    className="flex-shrink-0 rounded-xl text-xs font-medium transition-all duration-200"
                    style={{
                      padding: "7px 14px",
                      background: activeTab === i
                        ? "rgba(99,102,241,0.2)"
                        : "rgba(255,255,255,0.04)",
                      border: activeTab === i
                        ? "1px solid rgba(99,102,241,0.35)"
                        : "1px solid rgba(255,255,255,0.07)",
                      color: activeTab === i ? "#a5b4fc" : "rgba(255,255,255,0.4)",
                      fontFamily: "var(--font-body)",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => {
                      if (activeTab !== i) {
                        e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                        e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== i) {
                        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                        e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                      }
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Create post */}
            <CreatePost />

            {/* Posts list */}
            <div className="space-y-4 mt-5">
              {FEED_POSTS.map((post, i) => (
                <FeedPost key={post.id} post={post} index={i} />
              ))}
            </div>

            {/* Load more */}
            <button
              className="w-full py-4 rounded-2xl text-sm font-medium transition-all duration-200 mt-5"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.35)",
                fontFamily: "var(--font-body)",
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                e.currentTarget.style.color = "rgba(255,255,255,0.65)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.color = "rgba(255,255,255,0.35)";
              }}
            >
              Load more posts
            </button>
          </main>

          {/* ── Right sidebar (desktop only, sticky) ── */}
          <aside
            className="hidden xl:block flex-shrink-0"
            style={{
              width: "308px",
              position: "sticky",
              top: "84px",           /* 60px navbar + 24px gap */
              maxHeight: "calc(100vh - 84px)",
              overflowY: "auto",
              scrollbarWidth: "none",
            }}
          >
            <RightSidebar />
          </aside>

        </div>
      </div>
    </div>
  );
}