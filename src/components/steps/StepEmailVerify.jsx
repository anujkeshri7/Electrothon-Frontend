import InputField from "../ui/InputField";

const StepEmailVerify = ({ data, onChange, errors }) => {
  const emailLocal = data.email.split("@")[0] || "";
  const enteredDomain = data.email.includes("@") ? data.email.split("@")[1] : null;
  const expectedDomain = data.collegeDomain || `${data.college?.id || "your-college"}.ac.in`;

  const domainMatch =
    enteredDomain && enteredDomain === expectedDomain;

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-1">
        Verify your identity
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Use your official institute email to prove you're a student of{" "}
        <span className="text-blue-400 font-medium">
          {data.college?.name || "your college"}
        </span>
      </p>

      {data.college && (
        <div className="bg-gray-900/60 border border-gray-700/50 rounded-xl p-3.5 mb-5 flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
            <span className="text-base">{data.collegeType === "IIT" ? "🏛" : "🎓"}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">{data.college.name}</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Expected email domain:{" "}
              <span className="text-blue-400 font-mono">@{expectedDomain}</span>
            </p>
          </div>
          <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded-md border border-gray-700 shrink-0">
            {data.collegeType}
          </span>
        </div>
      )}

      <InputField
        label="Institute email address"
        id="email"
        type="email"
        value={data.email}
        onChange={(val) => onChange("email", val)}
        placeholder={`yourname@${expectedDomain}`}
        error={errors.email}
        hint={`Only @${expectedDomain} emails are accepted — no Gmail or personal IDs`}
        required
        autoFocus
      />

      {domainMatch && !errors.email && data.email.includes("@") && (
        <div className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2 -mt-2 mb-4">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Email domain matches your selected institute
        </div>
      )}

      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-xs text-amber-400/80">
        <p className="font-medium text-amber-400 mb-1">Why institute email?</p>
        <p className="leading-relaxed text-amber-400/70">
          NexUs is exclusively for NIT & IIT students. Your official email verifies
          enrollment. A verification link will be sent after you submit.
        </p>
      </div>
    </div>
  );
};

export default StepEmailVerify;