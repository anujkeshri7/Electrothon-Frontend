import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProfileHeader from "./helpers/ProfileHeader";
import { AboutSection, AcademicSection, SkillsSection, SocialSection } from "./helpers/ProfileSections";
import ActivityFeed from "./helpers/ActivityFeed";
import SettingsPanel from "./helpers/SettingsPanel";

const BASE = () => import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");

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
  const { id } = useParams();

  const [user, setUser]               = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [postsCount, setPostsCount]   = useState(0);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        // Profile being viewed
        const profileRes = await axios.get(`${BASE()}/api/profile/${id}`, {
          withCredentials: true,
        });

        // Logged-in user (for connect button + own profile check)
        const authRes = await axios.get(`${BASE()}/api/auth/check-auth`, {
          withCredentials: true,
        });

        if (profileRes.data.success) setUser(profileRes.data.student);
        if (authRes.data.success) {
          setCurrentUser(authRes.data.student);
          if (authRes.data.student.email === profileRes.data.student?.email) {
            setIsOwnProfile(true);
          }
        }
      } catch (err) {
        console.error("ProfilePage fetch error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAll();
  }, [id]);

  const handleEditProfile = () => {
    alert("Redirecting to Edit Profile...");
  };

  const profileStrength = user ? [
    { label: "Photo",       done: !!user.avatar },
    { label: "Bio",         done: !!user.bio && user.bio.length > 10 },
    { label: "Skills",      done: (user.skills?.length || 0) >= 2 },
    { label: "Academic",    done: !!user.branch && !!user.cgpa },
    { label: "Social links",done: !!(user.github || user.linkedin || user.portfolio) },
  ] : [];
  const doneCount = profileStrength.filter(p => p.done).length;
  const strengthPercent = profileStrength.length
    ? Math.round((doneCount / profileStrength.length) * 100)
    : 0;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#070711" }}>
      <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: "#6366f1", borderTopColor: "transparent" }} />
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: "#070711" }}>

      {/* Blobs */}
      <div className="fixed pointer-events-none" style={{ top: "-10%", left: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)", filter: "blur(60px)", zIndex: 0 }} />
      <div className="fixed pointer-events-none" style={{ bottom: "-15%", right: "-10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)", filter: "blur(60px)", zIndex: 0 }} />
      <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)`, backgroundSize: "60px 60px", zIndex: 0 }} />

      <div className="relative z-10 mx-auto w-full" style={{ maxWidth: "1080px", padding: "80px 16px 64px" }}>

        {/* Profile header */}
        <Card className="mb-4 overflow-hidden">
          <ProfileHeader
            user={{ ...user, isOwnProfile }}
            currentUserId={currentUser?._id}
            currentUserConnections={currentUser?.connections || []}
            onSettingsOpen={() => setSettingsOpen(true)}
            onEditProfile={handleEditProfile}
            postsCount={postsCount}
          />
        </Card>

        {/* Two col layout */}
        <div className="flex flex-col lg:flex-row gap-4 items-start">

          {/* Left */}
          <div className="flex-1 min-w-0 space-y-4">
            {user?.bio && <Card className="p-5"><AboutSection user={user} /></Card>}
            <Card className="p-5"><AcademicSection user={user} /></Card>
            <Card className="p-5"><SkillsSection user={user} /></Card>
            <Card className="p-5">
              <ActivityFeed setPostsCount={setPostsCount} />
            </Card>
          </div>

          {/* Right sidebar — sirf tab render karo jab kuch dikhana ho */}
          {(isOwnProfile || user?.github || user?.linkedin || user?.portfolio || user?.twitter || user?.instagram) ? (
            <aside
              className="w-full lg:w-72 xl:w-80 flex-shrink-0 space-y-4"
              style={{ position: "sticky", top: "80px", maxHeight: "calc(100vh - 96px)", overflowY: "auto", scrollbarWidth: "none" }}
            >
              {/* Social links */}
              {(user?.github || user?.linkedin || user?.portfolio || user?.twitter || user?.instagram) && (
                <Card className="p-5"><SocialSection user={user} /></Card>
              )}

              {/* Profile strength — sirf apne profile pe */}
              {isOwnProfile && (
                <Card className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>
                    Profile strength
                  </p>
                  {profileStrength.map(({ label, done }) => (
                    <div key={label} className="flex items-center justify-between mb-2.5">
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>{label}</span>
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          background: done ? "rgba(52,211,153,0.12)" : "rgba(255,255,255,0.05)",
                          color: done ? "#34d399" : "rgba(255,255,255,0.25)",
                          border: done ? "1px solid rgba(52,211,153,0.25)" : "1px solid rgba(255,255,255,0.07)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {done ? "✓ Done" : "Add"}
                      </span>
                    </div>
                  ))}
                  <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${strengthPercent}%`,
                        background: strengthPercent === 100
                          ? "linear-gradient(90deg, #34d399, #10b981)"
                          : "linear-gradient(90deg, #6366f1, #34d399)",
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[10px]" style={{ color: strengthPercent === 100 ? "#34d399" : "rgba(255,255,255,0.2)", fontFamily: "var(--font-body)" }}>
                      {strengthPercent === 100 ? "✓ Profile complete!" : `${strengthPercent}% complete`}
                    </span>
                    <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-body)" }}>
                      {doneCount}/{profileStrength.length}
                    </span>
                  </div>
                </Card>
              )}
            </aside>
          ) : null}
        </div>
      </div>

      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} onEditProfile={handleEditProfile} />
    </div>
  );
}