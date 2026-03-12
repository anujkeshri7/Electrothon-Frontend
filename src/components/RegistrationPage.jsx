import { useState } from "react";
import Stepper from "./ui/Stepper";
import StepPersonalInfo from "./steps/StepPersonalInfo";
import StepCollegeSelect from "./steps/StepCollegeSelect";
import StepEmailVerify from "./steps/StepEmailVerify";
import RegistrationSuccess from "./steps/RegistrationSuccess";

const TOTAL_STEPS = 2 //your college + email verification;

const initialData = {
  name: "",
  phone: "",
  year: "",
  collegeType: "",
  college: null,
  collegeDomain: "",
  email: "",
};

const validate = (step, data) => {
  const errors = {};

  if (step === 1) {
    if (!data.name.trim()) errors.name = "Full name is required";
    else if (data.name.trim().length < 3) errors.name = "Enter your complete name";

    if (!data.phone.trim()) errors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(data.phone.trim())) errors.phone = "Enter a valid 10-digit number";

    if (!data.year) errors.year = "Please select your year of study";
  }

  if (step === 2) {
    if (!data.collegeType) errors.collegeType = "Please select NIT or IIT";
    if (!data.college) errors.college = "Please select your institute";
  }

  if (step === 3) {
    if (!data.email.trim()) {
      errors.email = "Institute email is required";
    } else if (!data.email.includes("@")) {
      errors.email = "Enter a valid email address";
    } else {
      const enteredDomain = data.email.split("@")[1];
      if (enteredDomain !== data.collegeDomain) {
        errors.email = `Use your official @${data.collegeDomain} email only`;
      }
    }
  }

  return errors;
};

const RegistrationPage = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleNext = () => {
    const errs = validate(step, data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
      setErrors({});
    } else {
      setDone(true);
    }
  };

  const handleBack = () => {
    setErrors({});
    if (step > 1) setStep((s) => s - 1);
    else onClose?.();
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </button>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-sm font-bold text-white tracking-tight">NexUs</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-gray-900 border border-gray-800/60 rounded-2xl p-6 shadow-2xl shadow-black/40">
          {!done ? (
            <>
              <Stepper currentStep={step} />

              <div className="min-h-[340px]">
                {step === 1 && (
                  <StepPersonalInfo data={data} onChange={handleChange} errors={errors} />
                )}
                {step === 2 && (
                  <StepCollegeSelect data={data} onChange={handleChange} errors={errors} />
                )}
                {step === 3 && (
                  <StepEmailVerify data={data} onChange={handleChange} errors={errors} />
                )}
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-gray-800/60">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-700 text-sm text-gray-400 hover:text-white hover:border-gray-600 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  {step === 1 ? "Cancel" : "Back"}
                </button>

                <button
                  onClick={handleNext}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl py-2.5 text-sm font-semibold transition-all duration-200"
                >
                  {step === TOTAL_STEPS ? (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Create my account
                    </>
                  ) : (
                    <>
                      Continue
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-xs text-gray-700 mt-4">
                Step {step} of {TOTAL_STEPS}
              </p>
            </>
          ) : (
            <RegistrationSuccess data={data} onGoHome={onClose} />
          )}
        </div>

        <p className="text-center text-xs text-gray-700 mt-4">
          By registering, you agree to our{" "}
          <span className="text-gray-500 cursor-pointer hover:text-gray-400">Terms</span> &{" "}
          <span className="text-gray-500 cursor-pointer hover:text-gray-400">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;