import { useState } from "react";
import StepIndicator from "./helpers/StepIndicator";
import BasicInfo from "./helpers/BasicInfo";
import AcademicInfo from "./helpers/AcademicInfo";
import SkillsInterests from "./helpers/SkillsInterests";
import SocialLinks from "./helpers/SocialLinks";
import ProfileSuccess from "./helpers/ProfileSuccess";

const STEPS = { BASIC: 1, ACADEMIC: 2, SKILLS: 3, SOCIAL: 4, SUCCESS: 5 };

export default function CompleteProfile() {
  const [step, setStep] = useState(STEPS.BASIC);
  const [transitioning, setTransitioning] = useState(false);
  const [profileData, setProfileData] = useState({
    // Basic
    avatar: null, avatarPreview: null, headline: "", bio: "",
    // Academic
    branch: "", cgpa: "", currentYear: "", graduationYear: "", rollNumber: "",
    // Skills
    skills: [], interests: [], openTo: [],
    // Social
    github: "", linkedin: "", portfolio: "", twitter: "", instagram: "",
  });

  const transition = (fn) => {
    setTransitioning(true);
    setTimeout(() => { fn(); setTransitioning(false); }, 280);
  };

  const goNext = (newData = {}) => {
    setProfileData((prev) => ({ ...prev, ...newData }));
    transition(() => setStep((s) => s + 1));
  };

  const goBack = () => transition(() => setStep((s) => s - 1));

  const handleSkipAll = () => transition(() => setStep(STEPS.SUCCESS));

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "#070711" }}
    >
      {/* Ambient blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-15%", left: "-10%",
          width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-20%", right: "-10%",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "40%", left: "50%", transform: "translateX(-50%)",
          width: "800px", height: "200px",
          background: "radial-gradient(ellipse, rgba(56,189,248,0.03) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Card */}
      <div className="relative z-10 w-full" style={{ maxWidth: "clamp(440px, 55vw, 700px)" }}>
        <div
          className="rounded-2xl p-8 transition-all duration-[280ms]"
          style={{
            background: "rgba(255,255,255,0.025)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.04) inset, 0 32px 80px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.3)",
            opacity: transitioning ? 0 : 1,
            transform: transitioning
              ? "translateY(10px) scale(0.99)"
              : "translateY(0) scale(1)",
          }}
        >
          {/* Step indicator — hide on success */}
          {step !== STEPS.SUCCESS && <StepIndicator currentStep={step} />}

          {/* Steps */}
          {step === STEPS.BASIC && (
            <BasicInfo
              data={profileData}
              onNext={(d) => goNext(d)}
              onSkip={handleSkipAll}
            />
          )}

          {step === STEPS.ACADEMIC && (
            <AcademicInfo
              data={profileData}
              onNext={(d) => goNext(d)}
              onBack={goBack}
            />
          )}

          {step === STEPS.SKILLS && (
            <SkillsInterests
              data={profileData}
              onNext={(d) => goNext(d)}
              onBack={goBack}
            />
          )}

          {step === STEPS.SOCIAL && (
            <SocialLinks
              data={profileData}
              onNext={(d) => goNext({ links: d })}
              onBack={goBack}
            />
          )}

          {step === STEPS.SUCCESS && (
            <ProfileSuccess profileData={profileData} />
          )}
        </div>

        {/* Bottom tag */}
        {step !== STEPS.SUCCESS && (
          <div
            className="text-center mt-5 text-xs"
            style={{ color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-body)" }}
          >
            You can always edit this later from your profile
          </div>
        )}
      </div>
    </div>
  );
}