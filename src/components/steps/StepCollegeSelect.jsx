import { useState } from "react";
import { NITS, IITS } from "../../data/colleges";

const TypeCard = ({ type, selected, onClick, count, tagline }) => (
  <button
    onClick={() => onClick(type)}
    className={`
      relative flex-1 rounded-xl border p-4 text-left transition-all duration-200 cursor-pointer
      ${
        selected
          ? "border-blue-500 bg-blue-500/10"
          : "border-gray-700/60 bg-gray-900/50 hover:border-gray-600"
      }
    `}
  >
    {selected && (
      <span className="absolute top-3 right-3 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
    )}
    <p
      className={`text-2xl font-bold mb-1 tracking-tight ${
        selected ? "text-blue-400" : "text-gray-400"
      }`}
    >
      {type}
    </p>
    <p className="text-xs font-medium text-gray-300 leading-snug">{tagline}</p>
    <p className="text-xs text-gray-600 mt-1">{count} institutes</p>
  </button>
);

const StepCollegeSelect = ({ data, onChange, errors }) => {
  const [search, setSearch] = useState("");

  const list = data.collegeType === "NIT" ? NITS : data.collegeType === "IIT" ? IITS : [];
  const filtered = list.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.state.toLowerCase().includes(search.toLowerCase())
  );

  const handleTypeChange = (type) => {
    onChange("collegeType", type);
    onChange("college", null);
    onChange("collegeDomain", "");
    setSearch("");
  };

  const handleSelect = (college) => {
    onChange("college", college);
    onChange("collegeDomain", college.domain);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-1">
        Your institute
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Select your college type and then find your specific institute
      </p>

      <p className="text-sm font-medium text-gray-300 mb-2">
        College type <span className="text-blue-400">*</span>
      </p>
      <div className="flex gap-3 mb-4">
        <TypeCard
          type="NIT"
          selected={data.collegeType === "NIT"}
          onClick={handleTypeChange}
          count={31}
          tagline="National Institutes of Technology"
        />
        <TypeCard
          type="IIT"
          selected={data.collegeType === "IIT"}
          onClick={handleTypeChange}
          count={23}
          tagline="Indian Institutes of Technology"
        />
      </div>
      {errors.collegeType && (
        <p className="mb-3 text-xs text-red-400 flex items-center gap-1">
          <span>⚠</span> {errors.collegeType}
        </p>
      )}

      {data.collegeType && (
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Select your {data.collegeType} <span className="text-blue-400">*</span>
          </label>

          <div className="relative mb-2">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${data.collegeType} by name or state...`}
              className="w-full bg-gray-900 border border-gray-700/60 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          <div className="max-h-48 overflow-y-auto rounded-xl border border-gray-700/60 bg-gray-900/50 divide-y divide-gray-800/60">
            {filtered.length === 0 ? (
              <p className="text-center text-xs text-gray-600 py-6">No results found</p>
            ) : (
              filtered.map((college) => (
                <button
                  key={college.id}
                  onClick={() => handleSelect(college)}
                  className={`
                    w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors
                    ${
                      data.college?.id === college.id
                        ? "bg-blue-500/10 text-blue-300"
                        : "text-gray-300 hover:bg-gray-800/50"
                    }
                  `}
                >
                  <span className="text-sm font-medium">{college.name}</span>
                  <span className="text-xs text-gray-600 ml-2 shrink-0">{college.state}</span>
                </button>
              ))
            )}
          </div>

          {data.college && (
            <div className="mt-2 flex items-center gap-2 text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
              Selected: <span className="font-semibold">{data.college.name}</span>
              <span className="text-gray-600 ml-auto">@{data.college.domain}</span>
            </div>
          )}

          {errors.college && (
            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
              <span>⚠</span> {errors.college}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default StepCollegeSelect;