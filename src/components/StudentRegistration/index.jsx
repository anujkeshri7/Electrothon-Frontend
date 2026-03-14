import { useState } from "react";
import StepIndicator from "./helpers/StepIndicator";
import CollegeSelect from "./helpers/CollegeSelect";
import EmailVerify from "./helpers/EmailVerify";
import OtpVerify from "./helpers/OtpVerify";
import SuccessStep from "./helpers/SuccessStep";
import { STEPS } from "./helpers/constants";

export default function StudentRegistration() {
  const [step, setStep] = useState(STEPS.COLLEGE_SELECT);
  const [transitioning, setTransitioning] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    yearOfStudy: "",
  });

  const [studentId, setStudentId] = useState("");

  const goNext = (data = {}) => {
    setTransitioning(true);
    setFormData((prev) => ({ ...prev, ...data }));
    setTimeout(() => {
      setStep((s) => s + 1);
      setTransitioning(false);
    }, 280);
  };

  const goBack = () => {
    setTransitioning(true);
    setTimeout(() => {
      setStep((s) => s - 1);
      setTransitioning(false);
    }, 280);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "#070711" }}
    >
      {/* Ambient background blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-15%",
          left: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-20%",
          right: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "40%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "200px",
          background: "radial-gradient(ellipse, rgba(56,189,248,0.04) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Subtle grid overlay */}
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

      {/* Main card */}
      <div
        className="relative z-10 w-full"
        style={{ maxWidth: "clamp(440px, 55vw, 700px)" }}
      >
        {/* Card */}
        <div
          className="rounded-2xl p-8 transition-all duration-280"
          style={{
            background: "rgba(255,255,255,0.025)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.04) inset, 0 32px 80px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.3)",
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? "translateY(10px) scale(0.99)" : "translateY(0) scale(1)",
          }}
        >
          {/* Step indicator — hide on success */}
          {step !== STEPS.SUCCESS && (
            <StepIndicator currentStep={step} />
          )}

          {/* Step content */}
          {step === STEPS.COLLEGE_SELECT && (
            <CollegeSelect
              onNext={(college) => {
                setSelectedCollege(college);
                goNext();
              }}
            />
          )}

          {step === STEPS.EMAIL_INFO && (
            <EmailVerify
              college={selectedCollege}
              onNext={(data) => goNext(data)}
              onBack={goBack}
            />
          )}

          {step === STEPS.OTP_VERIFY && (
            <OtpVerify
              email={formData.email}
              onVerified={() => goNext()}
              onBack={goBack}
              setStudentId={setStudentId}
            />
          )}

          {step === STEPS.SUCCESS && (
            <SuccessStep
              name={formData.fullName}
              college={selectedCollege}
              studentId={studentId}
            />
          )}
        </div>

        {/* Bottom brand tag */}
        <div
          className="text-center mt-5 text-xs"
          style={{ color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-body)" }}
        >
          Secured · Student Verified · End-to-end encrypted
        </div>
      </div>
    </div>
  );
}