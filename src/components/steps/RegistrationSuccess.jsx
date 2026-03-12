const RegistrationSuccess = ({ data, onGoHome }) => {
  return (
    <div className="text-center py-4">
      <div className="relative inline-flex mb-6">
        <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
          <svg
            className="w-9 h-9 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <span className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      </div>

      <h2 className="text-xl font-semibold text-white mb-2">
        You're in, {data.name.split(" ")[0]}! 🎉
      </h2>
      <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
        A verification link has been sent to your institute email. Click it to
        activate your NexUs account.
      </p>

      <div className="bg-gray-900/60 border border-gray-700/50 rounded-xl p-4 text-left mb-6 divide-y divide-gray-800/60">
        {[
          { label: "Name", value: data.name },
          { label: "Phone", value: `+91 ${data.phone}` },
          { label: "Year", value: data.year },
          { label: "College", value: data.college?.name || "" },
          { label: "Email", value: data.email, mono: true },
        ].map(({ label, value, mono }) => (
          <div key={label} className="flex justify-between items-center py-2.5 first:pt-0 last:pb-0">
            <span className="text-xs text-gray-600">{label}</span>
            <span
              className={`text-xs font-medium text-gray-300 max-w-[60%] text-right truncate ${
                mono ? "font-mono text-blue-400" : ""
              }`}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-blue-500 hover:bg-blue-400 text-white rounded-xl py-3 text-sm font-semibold transition-colors"
        >
          Check email & verify →
        </button>
        <button
          onClick={onGoHome}
          className="w-full bg-transparent border border-gray-700 hover:border-gray-600 text-gray-400 hover:text-gray-300 rounded-xl py-3 text-sm font-medium transition-all"
        >
          Back to home
        </button>
      </div>
    </div>
  );
};

export default RegistrationSuccess;