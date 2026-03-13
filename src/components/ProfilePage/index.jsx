import { useState } from "react";
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

export default function ProfilePage() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [user] = useState(DUMMY_USER);

  const handleEditProfile = () => {
    // In real app: navigate('/complete-profile')
    alert("Redirecting to Edit Profile...");
  };

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: "#070711" }}
    >
      {/* Ambient blobs */}
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

      {/* Grid overlay */}
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

      {/* Page content */}
      <div
        className="relative z-10 mx-auto px-4 py-6"
        style={{ maxWidth: "clamp(340px, 96vw, 1400px)" }}
      >
        <div className="space-y-4">
          {/* Header card */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: "rgba(255,255,255,0.025)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.04) inset, 0 24px 60px rgba(0,0,0,0.4)",
            }}
          >
            <ProfileHeader
              user={user}
              onSettingsOpen={() => setSettingsOpen(true)}
              onEditProfile={handleEditProfile}
            />
          </div>

          {/* Two column layout on wider screens */}
          <div className="flex flex-col lg:flex-row gap-4 items-start">
            {/* Left col — bio, academic, skills, social */}
            <div className="w-full lg:w-96 flex-shrink-0 space-y-4">
              <AboutSection user={user} />
              <AcademicSection user={user} />
              <SkillsSection user={user} />
              <SocialSection user={user} />
            </div>

            {/* Right col — activity feed */}
            <div className="flex-1 min-w-0">
              <ActivityFeed />
            </div>
          </div>
        </div>
      </div>

      {/* Settings panel */}
      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onEditProfile={handleEditProfile}
      />
    </div>
  );
}