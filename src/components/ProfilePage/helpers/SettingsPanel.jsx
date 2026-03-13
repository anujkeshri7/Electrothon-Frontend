import { useState, useEffect } from "react";
import { X, ChevronRight, LogOut, AlertTriangle } from "lucide-react";
import { SETTINGS_SECTIONS } from "./constants";

function Toggle({ defaultOn, onChange }) {
  const [on, setOn] = useState(defaultOn);
  const toggle = () => {
    const next = !on;
    setOn(next);
    onChange?.(next);
  };
  return (
    <button
      onClick={toggle}
      className="relative flex-shrink-0 transition-all duration-300"
      style={{
        width: "36px",
        height: "20px",
        borderRadius: "10px",
        background: on
          ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
          : "rgba(255,255,255,0.1)",
        border: on ? "none" : "1px solid rgba(255,255,255,0.15)",
        cursor: "pointer",
        boxShadow: on ? "0 0 12px rgba(99,102,241,0.4)" : "none",
      }}
    >
      <span
        className="absolute top-0.5 transition-all duration-300 rounded-full"
        style={{
          width: "16px",
          height: "16px",
          background: "white",
          left: on ? "18px" : "2px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
        }}
      />
    </button>
  );
}

export default function SettingsPanel({ isOpen, onClose, onEditProfile }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  if (!isOpen && !visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
          opacity: visible ? 1 : 0,
        }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="fixed right-0 top-0 h-full z-50 flex flex-col transition-all duration-300"
        style={{
          width: "min(380px, 100vw)",
          background: "#0c0c1a",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.6)",
          transform: visible ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div>
            <h2
              className="text-lg font-bold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Settings
            </h2>
            <p
              className="text-xs mt-0.5"
              style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}
            >
              Manage your account & preferences
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
          >
            <X size={16} className="text-white" />
          </button>
        </div>

        {/* Scrollable content */}
        <div
          className="flex-1 overflow-y-auto px-4 py-4 space-y-6"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(99,102,241,0.3) transparent",
          }}
        >
          {SETTINGS_SECTIONS.map((section) => (
            <div key={section.title}>
              {/* Section title */}
              <div
                className="text-[10px] font-semibold uppercase tracking-widest px-2 mb-2"
                style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-body)" }}
              >
                {section.title}
              </div>

              {/* Items */}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isDanger = item.action === "danger";
                  const isLogout = item.action === "logout";

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.id === "edit_profile") { onClose(); onEditProfile?.(); return; }
                        if (item.action === "navigate" || isDanger || isLogout) {
                          alert(`Action: ${item.label}`);
                        }
                      }}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200"
                      style={{
                        background: isDanger
                          ? "rgba(248,113,113,0.04)"
                          : "rgba(255,255,255,0.03)",
                        border: isDanger
                          ? "1px solid rgba(248,113,113,0.12)"
                          : "1px solid rgba(255,255,255,0.06)",
                        cursor: "pointer",
                        textAlign: "left",
                        width: "100%",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = isDanger
                          ? "rgba(248,113,113,0.1)"
                          : "rgba(255,255,255,0.06)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = isDanger
                          ? "rgba(248,113,113,0.04)"
                          : "rgba(255,255,255,0.03)";
                      }}
                    >
                      {/* Icon */}
                      <span className="text-base flex-shrink-0">{item.icon}</span>

                      {/* Label */}
                      <span
                        className="flex-1 text-sm"
                        style={{
                          color: isDanger
                            ? "#f87171"
                            : isLogout
                            ? "rgba(255,255,255,0.5)"
                            : "rgba(255,255,255,0.75)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {item.label}
                      </span>

                      {/* Right side */}
                      {item.action === "toggle" && (
                        <Toggle defaultOn={item.defaultOn} />
                      )}
                      {(item.action === "navigate" || item.action === "edit") && (
                        <ChevronRight
                          size={14}
                          style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0 }}
                        />
                      )}
                      {isLogout && (
                        <LogOut size={14} style={{ color: "rgba(255,255,255,0.25)", flexShrink: 0 }} />
                      )}
                      {isDanger && (
                        <AlertTriangle size={14} style={{ color: "#f87171", flexShrink: 0 }} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* App version */}
          <div
            className="text-center py-4 text-xs"
            style={{ color: "rgba(255,255,255,0.15)", fontFamily: "var(--font-body)" }}
          >
            CampusConnect v1.0.0 · Made with ❤️ for students
          </div>
        </div>
      </div>
    </>
  );
}