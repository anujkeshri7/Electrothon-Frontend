import { useState } from "react";
import { Plus } from "lucide-react";
import { STORIES, CURRENT_USER } from "./constants";

export default function StoriesBar() {
  const [seen, setSeen] = useState({});

  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex gap-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {/* Add your story */}
        <div className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group">
          <div
            className="relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 group-hover:scale-105"
            style={{
              background: "rgba(99,102,241,0.15)",
              border: "2px dashed rgba(99,102,241,0.4)",
            }}
          >
            <span
              className="text-base font-bold"
              style={{ color: "#a5b4fc", fontFamily: "var(--font-display)" }}
            >
              {CURRENT_USER.initials}
            </span>
            <div
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                border: "2px solid #070711",
              }}
            >
              <Plus size={10} className="text-white" strokeWidth={3} />
            </div>
          </div>
          <span
            className="text-[10px] font-medium text-center"
            style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)", maxWidth: "56px", lineHeight: 1.2 }}
          >
            Your story
          </span>
        </div>

        {/* Other stories */}
        {STORIES.map((story) => {
          const isSeen = seen[story.id];
          return (
            <div
              key={story.id}
              className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group"
              onClick={() => setSeen((p) => ({ ...p, [story.id]: true }))}
            >
              <div
                className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-200 group-hover:scale-105"
                style={{
                  background: isSeen ? "rgba(255,255,255,0.06)" : story.color + "20",
                  border: `2.5px solid ${isSeen ? "rgba(255,255,255,0.15)" : story.color}`,
                  color: isSeen ? "rgba(255,255,255,0.4)" : story.color,
                  fontFamily: "var(--font-display)",
                  boxShadow: isSeen ? "none" : `0 0 16px ${story.color}35`,
                  transition: "all 0.2s",
                }}
              >
                {story.initials}
                {/* Online indicator */}
                {!isSeen && (
                  <div
                    className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full"
                    style={{
                      background: story.color,
                      border: "2px solid #070711",
                      boxShadow: `0 0 6px ${story.color}`,
                    }}
                  />
                )}
              </div>
              <div className="text-center" style={{ maxWidth: "56px" }}>
                <div
                  className="text-[10px] font-medium truncate"
                  style={{
                    color: isSeen ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.7)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {story.name.split(" ")[0]}
                </div>
                <div
                  className="text-[9px]"
                  style={{
                    color: isSeen ? "rgba(255,255,255,0.2)" : story.color,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {story.college}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}