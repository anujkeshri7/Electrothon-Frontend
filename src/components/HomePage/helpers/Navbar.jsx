import { useState, useEffect } from "react";
import { Search, Bell, MessageCircle, X, Command } from "lucide-react";
import axios from "axios";

export default function Navbar({ studentData, onProfileClick }) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [query, setQuery]                 = useState("");
  const [notifOpen, setNotifOpen]         = useState(false);
  const [notifs, setNotifs]               = useState([]);
  const [unreadCount, setUnread]          = useState(0);

  const userId = studentData?._id;

  const fetchNotifs = () => {
    if (!userId) return;
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/notifications/${userId}?limit=15`, {
        withCredentials: true,
      })
      .then(res => {
        if (res.data.success) {
          setNotifs(res.data.notifications);
          setUnread(res.data.unreadCount);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchNotifs();
    const interval = setInterval(fetchNotifs, 30000);
    return () => clearInterval(interval);
  }, [userId]);

  const markAllRead = () => {
    if (!userId) return;
    axios
      .patch(`${import.meta.env.VITE_BACKEND_URL}/api/notifications/${userId}/read-all`, {}, {
        withCredentials: true,
      })
      .then(() => {
        setUnread(0);
        setNotifs(prev => prev.map(n => ({ ...n, isRead: true })));
      })
      .catch(console.error);
  };

  const markOneRead = (notifId) => {
    axios
      .patch(`${import.meta.env.VITE_BACKEND_URL}/api/notifications/read/${notifId}`, {}, {
        withCredentials: true,
      })
      .catch(console.error);
    setNotifs(prev => prev.map(n => n._id === notifId ? { ...n, isRead: true } : n));
    setUnread(prev => Math.max(0, prev - 1));
  };

  const formatTime = (dateStr) => {
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
    if (diff < 60)     return "just now";
    if (diff < 3600)   return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400)  return `${Math.floor(diff / 3600)}h ago`;
    return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 md:px-6"
      style={{
        height: "60px",
        background: "rgba(7,7,17,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 16px rgba(99,102,241,0.4)" }}
        >
          <span style={{ color: "white", fontSize: "14px", fontWeight: 800, fontFamily: "var(--font-display)" }}>C</span>
        </div>
        <span
          className="text-base font-bold hidden sm:block"
          style={{ color: "white", fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
        >
          Campus<span style={{ color: "#818cf8" }}>Connect</span>
        </span>
      </div>

      {/* Search bar */}
      <div className="relative flex-1 mx-4 md:mx-8" style={{ maxWidth: "480px" }}>
        <div
          className="absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200"
          style={{ color: searchFocused ? "#6366f1" : "rgba(255,255,255,0.25)" }}
        >
          <Search size={15} />
        </div>
        <input
          type="text"
          placeholder="Search students, projects, questions..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="w-full pl-9 pr-10 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
          style={{
            background: searchFocused ? "rgba(99,102,241,0.1)" : "rgba(255,255,255,0.05)",
            border: searchFocused ? "1px solid rgba(99,102,241,0.5)" : "1px solid rgba(255,255,255,0.08)",
            color: "white",
            fontFamily: "var(--font-body)",
            boxShadow: searchFocused ? "0 0 0 3px rgba(99,102,241,0.1)" : "none",
          }}
        />
        {query ? (
          <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100">
            <X size={13} style={{ color: "white" }} />
          </button>
        ) : (
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-0.5 px-1.5 py-0.5 rounded-md"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <Command size={9} style={{ color: "rgba(255,255,255,0.3)" }} />
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", fontFamily: "var(--font-body)" }}>K</span>
          </div>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 flex-shrink-0">

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(o => !o)}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{
              background: notifOpen ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.05)",
              border: notifOpen ? "1px solid rgba(99,102,241,0.3)" : "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer",
            }}
          >
            <Bell size={16} style={{ color: notifOpen ? "#a5b4fc" : "rgba(255,255,255,0.6)" }} />
            {unreadCount > 0 && (
              <div
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", fontFamily: "var(--font-display)" }}
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </div>
            )}
          </button>

          {/* Dropdown */}
          {notifOpen && (
            <div
              className="absolute right-0 top-full mt-2 rounded-2xl z-50 overflow-hidden"
              style={{
                width: "340px",
                background: "#0f0f1e",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
                maxHeight: "420px",
                overflowY: "auto",
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(99,102,241,0.3) transparent",
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-4 py-3 sticky top-0"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "#0f0f1e" }}
              >
                <span className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
                  Notifications
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs transition-opacity hover:opacity-80"
                    style={{ color: "#6366f1", fontFamily: "var(--font-body)", background: "none", border: "none", cursor: "pointer" }}
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {/* List */}
              {notifs.length === 0 ? (
                <div className="text-center py-10 text-sm" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>
                  No notifications yet
                </div>
              ) : (
                notifs.map(n => (
                  <div
                    key={n._id}
                    className="flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors duration-150"
                    style={{
                      background: !n.isRead ? "rgba(99,102,241,0.06)" : "transparent",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = !n.isRead ? "rgba(99,102,241,0.06)" : "transparent"; }}
                    onClick={() => {
                      if (!n.isRead) markOneRead(n._id);
                      if (n.link) window.open(n.link, "_blank");
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 text-sm"
                      style={{
                        background: n.type === "opportunity"
                          ? "rgba(99,102,241,0.15)"
                          : "rgba(249,115,22,0.15)",
                      }}
                    >
                      {n.type === "opportunity" ? "🚀" : "📝"}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs font-semibold leading-snug mb-0.5 truncate"
                        style={{ color: !n.isRead ? "white" : "rgba(255,255,255,0.6)", fontFamily: "var(--font-display)" }}
                      >
                        {n.title}
                      </p>
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                      >
                        {n.message}
                      </p>
                      <p className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-body)" }}>
                        {formatTime(n.createdAt)}
                      </p>
                    </div>

                    {/* Unread dot */}
                    {!n.isRead && (
                      <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: "#6366f1" }} />
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Messages */}
        <button
          className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
        >
          <MessageCircle size={16} style={{ color: "rgba(255,255,255,0.6)" }} />
          <div
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
            style={{ background: "#f97316", fontFamily: "var(--font-display)" }}
          >
            3
          </div>
        </button>

        {/* Avatar */}
        <button
          onClick={onProfileClick}
          className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl transition-all duration-200"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
        >
          <div
            className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(139,92,246,0.3))", color: "#a5b4fc", fontFamily: "var(--font-display)" }}
          >
            {studentData?.avatar
              ? <img src={studentData.avatar} alt={studentData.name} className="w-full h-full object-cover" />
              : studentData?.name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
            }
          </div>
          <span className="text-xs font-medium hidden md:block" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)" }}>
            {studentData?.name?.split(" ")[0]}
          </span>
        </button>

      </div>
    </nav>
  );
}