const InputField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  hint,
  maxLength,
  required = false,
  prefix,
  suffix,
  autoFocus = false,
}) => {
  return (
    <div className="mb-5">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-300 mb-1.5"
        >
          {label}
          {required && <span className="text-blue-400 ml-1">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-gray-500 text-sm select-none">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          autoFocus={autoFocus}
          className={`
            w-full bg-gray-900 border rounded-xl px-4 py-3 text-sm text-white
            placeholder:text-gray-600 outline-none transition-all duration-200
            ${prefix ? "pl-10" : ""}
            ${suffix ? "pr-24" : ""}
            ${
              error
                ? "border-red-500/60 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                : "border-gray-700/60 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            }
          `}
        />
        {suffix && (
          <span className="absolute right-3 text-gray-500 text-xs bg-gray-800 px-2 py-1 rounded-md border border-gray-700 select-none">
            {suffix}
          </span>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
      {hint && !error && (
        <p className="mt-1.5 text-xs text-gray-600">{hint}</p>
      )}
    </div>
  );
};

export default InputField;