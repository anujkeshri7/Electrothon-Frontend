import { useState } from "react";

const communities = [
  { name: "AI / Machine Learning", icon: "🤖", count: "14.2k" },
  { name: "Web Development", icon: "🌐", count: "9.8k" },
  { name: "Competitive Programming", icon: "⚡", count: "11k" },
  { name: "Startups", icon: "🚀", count: "6.5k" },
  { name: "Robotics", icon: "🦾", count: "4.1k" },
  { name: "Cybersecurity", icon: "🔐", count: "5.3k" },
];

const myGroups = [
  { name: "IIT Hackathons", color: "#6366f1" },
  { name: "Open Source Projects", color: "#10b981" },
  { name: "ML Research", color: "#f59e0b" },
];

const initialPosts = [
  {
    id: 1,
    name: "Rohan Sharma",
    college: "IIT Bombay",
    branch: "CS '25",
    avatar: "RS",
    avatarColor: "#6366f1",
    time: "2h ago",
    tag: "Hackathon",
    tagColor: "#6366f1",
    content:
      "Looking for ML teammate for hackathon at IIT Delhi next week. Skills needed: Python, TensorFlow. DM if interested — let's build something awesome 🔥",
    likes: 42,
    comments: 18,
    liked: false,
  },
  {
    id: 2,
    name: "Priya Verma",
    college: "NIT Trichy",
    branch: "ECE '24",
    avatar: "PV",
    avatarColor: "#ec4899",
    time: "4h ago",
    tag: "Achievement",
    tagColor: "#10b981",
    content:
      "Just got selected for Google STEP internship! 🎉 Will be sharing my full preparation journey + resources soon. Drop a 👍 if you'd like a detailed post!",
    likes: 120,
    comments: 34,
    liked: false,
  },
  {
    id: 3,
    name: "Arjun Mehta",
    college: "IIT Kharagpur",
    branch: "MnC '26",
    avatar: "AM",
    avatarColor: "#f59e0b",
    time: "6h ago",
    tag: "Discussion",
    tagColor: "#f59e0b",
    content:
      "Honest question: Is DSA grind still worth it in the age of AI coding tools? Or should we focus more on system design and product thinking? 🤔",
    likes: 87,
    comments: 51,
    liked: false,
  },
];

const trending = ["#HackathonSeason", "#AIProjects", "#OpenSource", "#StartupIdeas", "#Placements2025"];

const suggested = [
  { name: "AI Researchers", members: "12k members", icon: "🧠", color: "#6366f1" },
  { name: "Web Dev Network", members: "9k members", icon: "💻", color: "#10b981" },
];

const campusActivity = [
  { text: "IIT Delhi AI meetup — Today, 4 PM", dot: "#6366f1" },
  { text: "NIT Surathkal hackathon open", dot: "#10b981" },
  { text: "IITB Mood Indigo registrations live", dot: "#f59e0b" },
];

export default function Community() {
  const [posts, setPosts] = useState(initialPosts);
  const [postText, setPostText] = useState("");
  const [selectedTag, setSelectedTag] = useState("Discussion");
  const [activeTab, setActiveTab] = useState("All");
  const [activeCommunity, setActiveCommunity] = useState(null);

  const tags = ["Discussion", "Hackathon", "Achievement", "Question", "Resource"];
  const tabs = ["All", "Following", "Trending"];

  const handleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  };

  const handlePost = () => {
    if (!postText.trim()) return;
    const newPost = {
      id: Date.now(),
      name: "You",
      college: "Your College",
      branch: "CS '25",
      avatar: "YO",
      avatarColor: "#6366f1",
      time: "Just now",
      tag: selectedTag,
      tagColor: tags.includes(selectedTag) ? "#6366f1" : "#6366f1",
      content: postText,
      likes: 0,
      comments: 0,
      liked: false,
    };
    setPosts([newPost, ...posts]);
    setPostText("");
  };

  return (
    <div style={{ fontFamily: "'Sora', 'Segoe UI', sans-serif", background: "#0a0a0f", minHeight: "100vh", color: "#e2e8f0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        .post-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .post-card:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(99,102,241,0.12); }
        .comm-item { transition: all 0.15s ease; }
        .comm-item:hover { background: rgba(99,102,241,0.12) !important; color: #a5b4fc; }
        .like-btn { transition: all 0.15s ease; }
        .like-btn:hover { transform: scale(1.1); }
        .tab-btn { transition: all 0.2s ease; }
        .glow-avatar { box-shadow: 0 0 0 2px #0a0a0f, 0 0 0 4px currentColor; }
        textarea { transition: border-color 0.2s; }
        textarea:focus { border-color: #6366f1 !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
        .join-btn { transition: all 0.2s ease; }
        .join-btn:hover { transform: scale(1.05); }
        .tag-pill { transition: all 0.15s ease; cursor: pointer; }
        .tag-pill:hover { opacity: 0.85; transform: scale(1.05); }
        .tag-pill.active { box-shadow: 0 0 0 2px rgba(99,102,241,0.5); }
        .trend-item { transition: all 0.15s ease; }
        .trend-item:hover { color: #a5b4fc; padding-left: 6px; }
        .post-btn { transition: all 0.2s ease; }
        .post-btn:hover { background: #4f46e5 !important; transform: scale(1.02); }
      `}</style>

      {/* TOP NAV */}
      <div style={{ background: "rgba(10,10,15,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 100, padding: "0 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚡</div>
            <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px" }}>Campus<span style={{ color: "#6366f1" }}>Hub</span></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "6px 14px", border: "1px solid rgba(255,255,255,0.07)", flex: 1, maxWidth: 340, margin: "0 24px" }}>
            <span style={{ opacity: 0.4, fontSize: 14 }}>🔍</span>
            <input placeholder="Search posts, people, communities..." style={{ background: "transparent", border: "none", outline: "none", color: "#e2e8f0", fontSize: 13, width: "100%" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>YO</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", gap: 0, padding: "0" }}>

        {/* LEFT SIDEBAR */}
        <div style={{ width: 260, padding: "24px 16px", borderRight: "1px solid rgba(255,255,255,0.05)", position: "sticky", top: 60, height: "calc(100vh - 60px)", overflowY: "auto", flexShrink: 0 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#4b5563", textTransform: "uppercase", marginBottom: 12, paddingLeft: 8 }}>Communities</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {communities.map((c, i) => (
              <div key={i} className="comm-item" onClick={() => setActiveCommunity(activeCommunity === i ? null : i)}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 10px", borderRadius: 10, cursor: "pointer", background: activeCommunity === i ? "rgba(99,102,241,0.15)" : "transparent", color: activeCommunity === i ? "#a5b4fc" : "#94a3b8" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, fontWeight: 500 }}>
                  <span>{c.icon}</span>{c.name}
                </span>
                <span style={{ fontSize: 11, color: "#4b5563", fontWeight: 600 }}>{c.count}</span>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "20px 0" }} />
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#4b5563", textTransform: "uppercase", marginBottom: 12, paddingLeft: 8 }}>My Groups</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {myGroups.map((g, i) => (
              <div key={i} className="comm-item" style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 10, cursor: "pointer", color: "#94a3b8", fontSize: 13, fontWeight: 500 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: g.color, flexShrink: 0 }} />
                {g.name}
              </div>
            ))}
          </div>
        </div>

        {/* MAIN FEED */}
        <div style={{ flex: 1, padding: "24px 28px", maxWidth: 680 }}>

          {/* TABS */}
          <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 4, border: "1px solid rgba(255,255,255,0.06)", width: "fit-content" }}>
            {tabs.map((tab) => (
              <button key={tab} className="tab-btn" onClick={() => setActiveTab(tab)}
                style={{ padding: "6px 18px", borderRadius: 9, border: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: 600, fontSize: 13, background: activeTab === tab ? "#6366f1" : "transparent", color: activeTab === tab ? "#fff" : "#6b7280", transition: "all 0.2s" }}>
                {tab}
              </button>
            ))}
          </div>

          {/* CREATE POST */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 20, marginBottom: 24 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>YO</div>
              <textarea
                placeholder="Share a project, ask a question, or start a discussion..."
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", padding: "12px 14px", borderRadius: 12, resize: "none", color: "#e2e8f0", fontSize: 14, minHeight: 80, outline: "none", fontFamily: "inherit", lineHeight: 1.6 }}
              />
            </div>

            {/* TAG SELECTOR */}
            <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap", paddingLeft: 50 }}>
              {tags.map((t) => (
                <span key={t} className={`tag-pill ${selectedTag === t ? "active" : ""}`} onClick={() => setSelectedTag(t)}
                  style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: selectedTag === t ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.05)", color: selectedTag === t ? "#a5b4fc" : "#6b7280", border: `1px solid ${selectedTag === t ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.07)"}` }}>
                  {t}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 14, paddingLeft: 50 }}>
              <button className="post-btn" onClick={handlePost}
                style={{ background: "#6366f1", color: "#fff", border: "none", padding: "9px 22px", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                Post
              </button>
              <button style={{ background: "rgba(255,255,255,0.05)", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.08)", padding: "9px 16px", borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                📎 Attach
              </button>
              <button style={{ background: "rgba(255,255,255,0.05)", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.08)", padding: "9px 16px", borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                🔗 Link
              </button>
            </div>
          </div>

          {/* POSTS */}
          {posts.map((p) => (
            <div key={p.id} className="post-card" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "22px 24px", marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div className="glow-avatar" style={{ width: 42, height: 42, borderRadius: "50%", background: p.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "#fff", flexShrink: 0 }}>
                    {p.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginTop: 1 }}>{p.college} · {p.branch} · {p.time}</div>
                  </div>
                </div>
                <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: `${p.tagColor}22`, color: p.tagColor, border: `1px solid ${p.tagColor}44`, letterSpacing: 0.5 }}>
                  {p.tag}
                </span>
              </div>

              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#cbd5e1", margin: 0 }}>{p.content}</p>

              <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "16px 0" }} />

              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <button className="like-btn" onClick={() => handleLike(p.id)}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10, border: "none", cursor: "pointer", background: p.liked ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.05)", color: p.liked ? "#f87171" : "#6b7280", fontWeight: 600, fontSize: 13, fontFamily: "inherit", transition: "all 0.15s" }}>
                  {p.liked ? "❤️" : "🤍"} {p.likes}
                </button>
                <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10, border: "none", cursor: "pointer", background: "rgba(255,255,255,0.05)", color: "#6b7280", fontWeight: 600, fontSize: 13, fontFamily: "inherit" }}>
                  💬 {p.comments}
                </button>
                <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10, border: "none", cursor: "pointer", background: "rgba(99,102,241,0.1)", color: "#818cf8", fontWeight: 600, fontSize: 13, fontFamily: "inherit", marginLeft: "auto" }}>
                  🤝 Join Team
                </button>
                <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10, border: "none", cursor: "pointer", background: "rgba(255,255,255,0.05)", color: "#6b7280", fontWeight: 600, fontSize: 13, fontFamily: "inherit" }}>
                  ↗ Share
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDEBAR */}
        <div style={{ width: 280, padding: "24px 16px", borderLeft: "1px solid rgba(255,255,255,0.05)", position: "sticky", top: 60, height: "calc(100vh - 60px)", overflowY: "auto", flexShrink: 0 }}>

          {/* TRENDING */}
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#4b5563", textTransform: "uppercase", marginBottom: 12, paddingLeft: 4 }}>Trending</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 24 }}>
            {trending.map((t, i) => (
              <div key={i} className="trend-item" style={{ padding: "8px 10px", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#818cf8", transition: "all 0.15s" }}>
                {t}
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 20 }} />

          {/* CAMPUS ACTIVITY */}
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#4b5563", textTransform: "uppercase", marginBottom: 12, paddingLeft: 4 }}>Campus Activity</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
            {campusActivity.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.dot, marginTop: 4, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>{a.text}</span>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 20 }} />

          {/* SUGGESTED COMMUNITIES */}
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#4b5563", textTransform: "uppercase", marginBottom: 12, paddingLeft: 4 }}>Suggested</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {suggested.map((s, i) => (
              <div key={i} style={{ padding: "14px 16px", borderRadius: 14, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${s.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: "#6b7280" }}>{s.members}</div>
                  </div>
                </div>
                <button className="join-btn" style={{ width: "100%", padding: "7px", borderRadius: 10, border: `1px solid ${s.color}66`, background: `${s.color}15`, color: s.color, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
                  + Join Community
                </button>
              </div>
            ))}
          </div>

          {/* STATS CARD */}
          <div style={{ marginTop: 16, padding: "16px", borderRadius: 14, background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))", border: "1px solid rgba(99,102,241,0.25)" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#a5b4fc", marginBottom: 12 }}>Your Stats This Week</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[{ label: "Posts", val: "3" }, { label: "Connections", val: "12" }, { label: "Profile Views", val: "48" }, { label: "Reactions", val: "97" }].map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "10px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#e2e8f0" }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}