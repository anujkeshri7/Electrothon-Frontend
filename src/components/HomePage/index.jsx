import { useState, useEffect } from "react";
import Navbar from "./helpers/Navbar";
import LeftSidebar from "./helpers/LeftSidebar";
import RightSidebar from "./helpers/RightSidebar";
import CreatePost from "./helpers/CreatePost";
import PostsFeed from "./helpers/PostsFeed";
import { PanelLeft, PanelLeftClose } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChatBot from "../ChatBot";

const FEED_TABS = ["For you", "College", "Following", "Projects", "Questions"];

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const [studentData, setStudentData] = useState(null);

  const fetchStudentData = async () => {
    try {

      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/profile/me`, { withCredentials: true });
      if (res.data.success) {
        const studentData = res.data.student;
        console.log("Fetched student data:", studentData);  
        setStudentData(studentData);
      }else{
        console.log("Failed to fetch student data:", res.data.message);
      }
      
    } catch (error) {
      console.log("Error fetching student data:", error.response?.data?.message || error.message);
      
    }

  }

  useEffect(() => {fetchStudentData()}, []);

  const navigate = useNavigate();

  const handleProfileClick = () =>navigate("/profile/me");

  return (
    <div className="min-h-screen" style={{ background: "#070711" }}>

      {/* ── Ambient blobs ── */}
      <div className="fixed pointer-events-none" style={{ top: "-20%", left: "-15%", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 65%)", filter: "blur(80px)", zIndex: 0 }} />
      <div className="fixed pointer-events-none" style={{ bottom: "-20%", right: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 65%)", filter: "blur(80px)", zIndex: 0 }} />
      <div className="fixed pointer-events-none" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "900px", height: "300px", background: "radial-gradient(ellipse, rgba(56,189,248,0.025) 0%, transparent 70%)", filter: "blur(60px)", zIndex: 0 }} />
      <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)`, backgroundSize: "60px 60px", zIndex: 0 }} />

      {/* ── Navbar ── */}
      <Navbar 
      studentData={studentData}
      onProfileClick={handleProfileClick} />



      {/* ── Backdrop (all screen sizes) ── */}
      <div
        onClick={() => setSidebarOpen(false)}
        className="fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
          opacity: sidebarOpen ? 1 : 0,
          pointerEvents: sidebarOpen ? "auto" : "none",
        }}
      />

      {/* ── Left Sidebar — slide in/out on ALL screen sizes ── */}
      <aside
        style={{
          position: "fixed",
          top: "60px",
          left: 0,
          zIndex: 40,
          width: "272px",
          height: "calc(100vh - 60px)",
          background: "rgba(7,7,17,0.98)",
          backdropFilter: "blur(24px)",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          boxShadow: sidebarOpen ? "8px 0 40px rgba(0,0,0,0.6)" : "none",
          overflowY: "auto",
          scrollbarWidth: "none",
          padding: "20px 16px 32px",
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease",
        }}
      >
        <LeftSidebar
          onProfileClick={() => {
            setSidebarOpen(false);
            handleProfileClick();
          }}

          studentData={studentData}
        />
      </aside>

      {/* ── Page body — no left offset, sidebar is overlay only ── */}
      <div className="relative z-10" style={{ paddingTop: "60px", minHeight: "100vh" }}>
        <div
          className="flex items-start justify-center gap-10 w-full mx-auto"
          style={{ maxWidth: "1440px", padding: "28px 40px 56px" }}
        >

          {/* ── Main feed ── */}
          <main className="flex-1 min-w-0 w-full" style={{ maxWidth: "820px" }}>

            {/* Toggle button + Feed tabs — same row */}
            <div className="flex items-center gap-2 mb-5">
              <button
                onClick={() => setSidebarOpen((o) => !o)}
                className="flex-shrink-0 flex items-center gap-2 transition-all duration-200"
                style={{
                  padding: "7px 12px",
                  borderRadius: "12px",
                  background: sidebarOpen ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.05)",
                  border: sidebarOpen ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.09)",
                  color: sidebarOpen ? "#a5b4fc" : "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  boxShadow: sidebarOpen ? "0 0 16px rgba(99,102,241,0.2)" : "none",
                }}
              >
                {sidebarOpen ? <PanelLeftClose size={17} /> : <PanelLeft size={17} />}
                <span style={{ fontSize: "13px", fontFamily: "var(--font-body)", fontWeight: 500 }}>Menu</span>
              </button>

              <div className="flex items-center gap-1.5 overflow-x-auto flex-1" style={{ scrollbarWidth: "none" }}>
                {FEED_TABS.map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(i)}
                    className="flex-shrink-0 rounded-xl text-xs font-medium transition-all duration-200"
                    style={{
                      padding: "7px 14px",
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

            {/* Create post */}
            <CreatePost />

            {/* Posts */}
            <div className="mt-5">
              <PostsFeed />
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
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
            >
              Load more posts
            </button>
          </main>

          {/* ── Right sidebar ── */}
          <aside
            className="hidden xl:block flex-shrink-0"
            style={{
              width: "340px",
              position: "sticky",
              top: "84px",
              maxHeight: "calc(100vh - 84px)",
              overflowY: "auto",
              scrollbarWidth: "none",
            }}
          >
            <RightSidebar />
            <ChatBot userId={studentData?._id} />
          </aside>

        </div>
      </div>
    </div>
  );
}