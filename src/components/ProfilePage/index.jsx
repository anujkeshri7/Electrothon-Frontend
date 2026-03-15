import { useState } from "react";
import { useEffect } from "react";
import ProfileHeader from "./helpers/ProfileHeader";
import {
  AboutSection,
  AcademicSection,
  SkillsSection,
  SocialSection,
} from "./helpers/ProfileSections";
import ActivityFeed from "./helpers/ActivityFeed";
import SettingsPanel from "./helpers/SettingsPanel";
import { DUMMY_USER } from "./helpers/constants";
import axios from "axios";
import Navbar from "../HomePage/helpers/Navbar";

// ─── Card wrapper used throughout ────────────────────────────────────────────
function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl ${className}`}
      style={{
        background: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.04) inset, 0 8px 40px rgba(0,0,0,0.35)",
      }}
    >
      {children}
    </div>
  );
}

export default function ProfilePage() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [isOwnProfile,setIsOwnProfile] = useState(false)

  const [postsCount, setPostsCount] = useState(0);


  
 
 

  const handleEditProfile = () => {
    alert("Redirecting to Edit Profile...");
  };

   const [user, setuser] = useState(null);
 

   

  const fetchStudentData = async () => {
    try {

      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/profile/me`, { withCredentials: true });
      if (res.data.success) {
        const studentData = res.data.student;
        console.log("Fetched student data:", studentData);  
        setuser(studentData);

        const resposne = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/check-auth`, { withCredentials: true });
        if (resposne.data.success) {
           if(resposne.data.student.email === studentData.email){
            setIsOwnProfile(true);
            setuser((prev)=> ({ ...prev, isOwnProfile: true }));
           }

        }
       
      }else{
        console.log("Failed to fetch student data:", res.data.message);
      }
      
    } catch (error) {
      console.log("Error fetching student data:", error.response?.data?.message || error.message);
      
    }

  }

  useEffect(() => {fetchStudentData()}, []);

  
 const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "")}/api/post/fetch-my-posts`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setPosts(res.data.posts);
      } else {
        setError("Failed to load posts.");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Could not load posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  return (
    /*
     * SCROLL RULES
     * ─────────────────────────────────────────────────────────
     * • Entire page scrolls naturally (no overflow tricks)
     * • Navbar (rendered outside this component) is fixed
     * • Right sidebar: position sticky, top = navbar height + gap
     *   → stays in view while left column scrolls past it
     * • Left column (profile cards + activity): scrolls with page
     * • Decorative blobs + grid: fixed, never scroll
     */
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: "#070711" }}x
    >

      <Navbar 
        studentData={user}
      onProfileClick={()=>{}}
      />
      {/* ── Ambient blobs (fixed, never scroll) ───────────────── */}
      <div
        className="fixed pointer-events-none"
        style={{
          top: "-10%", left: "-10%",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
          filter: "blur(60px)", zIndex: 0,
        }}
      />
      <div
        className="fixed pointer-events-none"
        style={{
          bottom: "-15%", right: "-10%",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
          filter: "blur(60px)", zIndex: 0,
        }}
      />

      {/* ── Grid overlay (fixed, never scroll) ────────────────── */}
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

      {/* ── Page body (scrolls with page) ─────────────────────── */}
      <div
        className="relative z-10 mx-auto w-full"
        style={{
          maxWidth: "1080px",
          padding: "80px 16px 64px",   /* top = navbar height + breathing room */
        }}
      >

        {/* ── Profile header card — full width ──────────────────── */}
        <Card className="mb-4 overflow-hidden">
          <ProfileHeader
            user={user}
            onSettingsOpen={() => setSettingsOpen(true)}
            onEditProfile={handleEditProfile}
            postsCount={postsCount}

          />
        </Card>

        {/* ── Two-column body ───────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-4 items-start">

          {/* ── LEFT: main profile content (scrolls with page) ──── */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* About */}
            <Card className="p-5">
              <AboutSection user={user} />
            </Card>

            {/* Academic */}
            <Card className="p-5">
              <AcademicSection user={user} />
            </Card>

            {/* Skills */}
            <Card className="p-5">
              <SkillsSection user={user} />
            </Card>

            {/* Activity feed */}
            <Card className="p-5">
              <ActivityFeed 
              setPostsCount={setPostsCount}
              />
            </Card>

          </div>

          {/* ── RIGHT: sticky sidebar (does NOT scroll away) ─────── */}
          <aside
            className="w-full lg:w-72 xl:w-80 flex-shrink-0 space-y-4"
            style={{
              position: "sticky",
              top: "80px",                        /* matches navbar height */
              maxHeight: "calc(100vh - 96px)",    /* cap so it never overflows viewport */
              overflowY: "auto",
              scrollbarWidth: "none",             /* hide scrollbar on Firefox */
            }}
          >
            {/* Socials */}
            <Card className="p-5">
              <SocialSection user={user} />
            </Card>

            {/* Quick stats / profile completeness — placeholder card */}
            <Card className="p-5">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}
              >
                Profile strength
              </p>
              {[
                { label: "Photo",    done: true  },
                { label: "Bio",      done: !!user?.bio },
                { label: "Skills",   done: true  },
                { label: "Academic", done: true  },
                { label: "Social",   done: false },
              ].map(({ label, done }) => (
                <div key={label} className="flex items-center justify-between mb-2.5">
                  <span
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}
                  >
                    {label}
                  </span>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: done ? "rgba(52,211,153,0.12)" : "rgba(255,255,255,0.05)",
                      color: done ? "#34d399" : "rgba(255,255,255,0.25)",
                      border: done ? "1px solid rgba(52,211,153,0.25)" : "1px solid rgba(255,255,255,0.07)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {done ? "Done" : "Add"}
                  </span>
                </div>
              ))}
              {/* Progress bar */}
              <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "80%",
                    background: "linear-gradient(90deg, #6366f1, #34d399)",
                  }}
                />
              </div>
              <p
                className="text-[10px] mt-1.5 text-right"
                style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-body)" }}
              >
                4 / 5 complete
              </p>
            </Card>

          </aside>

        </div>
      </div>

      {/* ── Settings panel (overlay, does not affect scroll) ──── */}
      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onEditProfile={handleEditProfile}
      />
    </div>
  );
}