import InputField from "../ui/InputField";

const YEARS = [
  { value: "1st", label: "1st Year — B.Tech / B.E." },
  { value: "2nd", label: "2nd Year — B.Tech / B.E." },
  { value: "3rd", label: "3rd Year — B.Tech / B.E." },
  { value: "4th", label: "4th Year — B.Tech / B.E." },
  { value: "5th", label: "5th Year — Dual / Integrated" },
  { value: "mtech1", label: "M.Tech / M.Sc — 1st Year" },
  { value: "mtech2", label: "M.Tech / M.Sc — 2nd Year" },
  { value: "phd", label: "PhD Scholar" },
];

const StepPersonalInfo = ({ data, onChange, errors }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-1">
        Tell us about yourself
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Basic details to set up your NexUs profile
      </p>

      <InputField
        label="Full name"
        id="name"
        value={data.name}
        onChange={(val) => onChange("name", val)}
        placeholder="e.g. Rahul Sharma"
        error={errors.name}
        required
        autoFocus
      />

      <InputField
        label="Phone number"
        id="phone"
        type="tel"
        value={data.phone}
        onChange={(val) => onChange("phone", val.replace(/\D/g, "").slice(0, 10))}
        placeholder="10-digit mobile number"
        prefix="+91"
        error={errors.phone}
        hint="OTP verification will be added in next step"
        required
      />

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Year of study <span className="text-blue-400">*</span>
        </label>
        <select
          value={data.year}
          onChange={(e) => onChange("year", e.target.value)}
          className={`
            w-full bg-gray-900 border rounded-xl px-4 py-3 text-sm outline-none
            transition-all duration-200 appearance-none cursor-pointer
            ${
              errors.year
                ? "border-red-500/60 text-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                : "border-gray-700/60 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            }
          `}
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", backgroundSize: "16px" }}
        >
          <option value="" disabled className="text-gray-600 bg-gray-900">
            — Select your year —
          </option>
          {YEARS.map((y) => (
            <option key={y.value} value={y.value} className="bg-gray-900">
              {y.label}
            </option>
          ))}
        </select>
        {errors.year && (
          <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
            <span>⚠</span> {errors.year}
          </p>
        )}
      </div>
    </div>
  );
};

export default StepPersonalInfo;