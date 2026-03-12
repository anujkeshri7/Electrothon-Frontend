const STEPS = [
  { id: 1, label: "About you" },
  { id: 2, label: "Your college" },
  { id: 3, label: "Verify email" },
];

const Stepper = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {STEPS.map((step, index) => {
        const isDone = step.id < currentStep;
        const isActive = step.id === currentStep;

        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold
                  transition-all duration-300 border
                  ${
                    isDone
                      ? "bg-blue-500 border-blue-500 text-white"
                      : isActive
                      ? "bg-blue-500/10 border-blue-500 text-blue-400"
                      : "bg-gray-900 border-gray-700 text-gray-600"
                  }
                `}
              >
                {isDone ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <span
                className={`text-xs mt-1.5 font-medium whitespace-nowrap ${
                  isDone
                    ? "text-blue-400"
                    : isActive
                    ? "text-white"
                    : "text-gray-600"
                }`}
              >
                {step.label}
              </span>
            </div>

            {index < STEPS.length - 1 && (
              <div
                className={`flex-1 h-px mx-3 mb-5 transition-all duration-500 ${
                  isDone ? "bg-blue-500" : "bg-gray-800"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;