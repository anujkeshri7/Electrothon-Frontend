import { useState } from "react";

const students = [
  { name: "Riya Sharma", college: "IIT Delhi", branch: "CS '25", skills: ["ML", "Python", "PyTorch"], avatar: "RS", color: "#6366f1", followers: "2.1k", projects: 8 },
  { name: "Aman Gupta", college: "NIT Surathkal", branch: "IT '26", skills: ["React", "Node", "AWS"], avatar: "AG", color: "#10b981", followers: "1.4k", projects: 5 },
  { name: "Arjun Patel", college: "IIT Bombay", branch: "MnC '24", skills: ["CP", "C++", "Codeforces"], avatar: "AP", color: "#f59e0b", followers: "3.2k", projects: 12 },
  { name: "Sneha Iyer", college: "IIT Madras", branch: "EE '25", skills: ["Robotics", "ROS", "Python"], avatar: "SI", color: "#ec4899", followers: "980", projects: 6 },
  { name: "Rahul Jha", college: "NIT Trichy", branch: "CS '25", skills: ["Web3", "Solidity", "React"], avatar: "RJ", color: "#8b5cf6", followers: "1.8k", projects: 9 },
  { name: "Kavya Nair", college: "IIT Roorkee", branch: "CS '26", skills: ["AI", "HuggingFace", "NLP"], avatar: "KN", color: "#06b6d4", followers: "2.7k", projects: 7 },
];

const events = [
  { title: "Smart India Hackathon", place: "IIT Bombay", time: "2 days left", prize: "₹1,00,000", tag: "Hackathon", color: "#6366f1", icon: "⚡", registered: 840 },
  { title: "AI Summit 2025", place: "IIT Delhi", time: "Register now", prize: "Free Entry", tag: "Summit", color: "#10b981", icon: "🧠", registered: 1200 },
  { title: "Web3 Jam", place: "NIT Trichy", time: "Open", prize: "₹50,000", tag: "Hackathon", color: "#8b5cf6", icon: "🌐", registered: 360 },
  { title: "Startup Pitch Fest", place: "IIT Hyderabad", time: "4 days left", prize: "Seed Funding", tag: "Startup", color: "#f59e0b", icon: "🚀", registered: 220 },
];

const placements = [
  { company: "Google", role: "SWE Intern", package: "₹1.2L/mo", colleges: "IIT + NIT", logo: "G", color: "#4285f4", trend: "+12%" },
  { company: "Microsoft", role: "SDE Intern", package: "₹95K/mo", colleges: "IIT", logo: "M", color: "#00a4ef", trend: "+8%" },
  { company: "Amazon", role: "ML Intern", package: "₹1L/mo", colleges: "IIT Bombay", logo: "A", color: "#ff9900", trend: "+15%" },
  { company: "Zepto", role: "SDE-1", package: "₹42 LPA", colleges: "IIT + NIT", logo: "Z", color: "#ec4899", trend: "+32%" },
  { company: "Atlassian", role: "Frontend Intern", package: "₹80K/mo", colleges: "NIT", logo: "At", color: "#0052cc", trend: "+5%" },
];

const communities = [
  { name: "AI / Machine Learning", icon: "🤖", members: "14.2k", color: "#6366f1", posts: 340 },
  { name: "Web Development", icon: "🌐", members: "9.8k", color: "#10b981", posts: 210 },
  { name: "Competitive Programming", icon: "⚡", members: "11k", color: "#f59e0b", posts: 180 },
  { name: "Startups", icon: "🚀", members: "6.5k", color: "#ec4899", posts: 95 },
  { name: "Robotics", icon: "🦾", members: "4.1k", color: "#8b5cf6", posts: 72 },
  { name: "Cybersecurity", icon: "🔐", members: "5.3k", color: "#06b6d4", posts: 130 },
];

const projects = [
  { title: "AI Resume Screener", desc: "Need ML Engineer", by: "IIT Kanpur", tech: ["Python", "NLP", "FastAPI"], color: "#6366f1", open: 2 },
  { title: "Campus Marketplace", desc: "React Dev Needed", by: "NIT Warangal", tech: ["React", "Node", "MongoDB"], color: "#10b981", open: 1 },
  { title: "Drone Swarm Control", desc: "Need Robotics Dev", by: "IIT Bombay", tech: ["ROS", "Python", "C++"], color: "#f59e0b", open: 3 },
  { title: "DeFi Yield Optimizer", desc: "Solidity + React", by: "IIT Hyderabad", tech: ["Solidity", "React", "Web3"], color: "#8b5cf6", open: 2 },
];

const aiRecs = [
  { title: "Hackathon at IIT Roorkee", reason: "Based on your ML skills", icon: "⚡", color: "#6366f1" },
  { title: "Startup Internship @ Zepto", reason: "Matches your profile", icon: "🚀", color: "#ec4899" },
  { title: "Open Source: React UI Kit", reason: "Web Dev community", icon: "💻", color: "#10b981" },
];

const stats = [
  { value: "12,500+", label: "Students Connected", icon: "👥", color: "#6366f1" },
  { value: "40+", label: "Active Campuses", icon: "🏛️", color: "#10b981" },
  { value: "25+", label: "Events This Month", icon: "📅", color: "#f59e0b" },
  { value: "₹2.1Cr+", label: "Prize Money Listed", icon: "🏆", color: "#ec4899" },
];

const quickFilters = ["#AI", "#Hackathons", "#Startups", "#OpenSource", "#Placements", "#CP", "#Robotics", "#Internships"];

export default function Explore() {
  const [search, setSearch] = useState("");
  const [followed, setFollowed] = useState({});
  const [joined, setJoined] = useState({});
  const [activeSection, setActiveSection] = useState("all");

  const navItems = [
    { id: "all", label: "All" },
    { id: "students", label: "Students" },
    { id: "events", label: "Events" },
    { id: "placements", label: "Placements" },
    { id: "projects", label: "Projects" },
  ];

  return (
    <div style={{ fontFamily: "'Sora', 'Segoe UI', sans-serif", background: "#080810", minHeight: "100vh", color: "#e2e8f0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2d2d40; border-radius: 10px; }
        .card { transition: transform 0.22s cubic-bezier(.4,0,.2,1), box-shadow 0.22s ease; }
        .card:hover { transform: translateY(-4px); }
        .btn { transition: all 0.15s ease; cursor: pointer; font-family: inherit; }
        .btn:hover { filter: brightness(1.15); transform: scale(1.03); }
        .filter-tag { transition: all 0.15s ease; cursor: pointer; }
        .filter-tag:hover { color: #a5b4fc; background: rgba(99,102,241,0.12) !important; }
        .nav-pill { transition: all 0.2s ease; cursor: pointer; }
        .search-wrap input:focus { border-color: #6366f1 !important; box-shadow: 0 0 0 3px rgba(99,102,241,0.2); }
        .placement-row { transition: background 0.15s ease; }
        .placement-row:hover { background: rgba(255,255,255,0.04) !important; }
        .stat-card { transition: transform 0.2s ease; }
        .stat-card:hover { transform: scale(1.04); }
        .glow { animation: glow-pulse 3s ease-in-out infinite; }
        @keyframes glow-pulse { 0%,100%{ opacity:0.6; } 50%{ opacity:1; } }
        .badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; }
        .scroll-x { overflow-x: auto; scrollbar-width: none; }
        .scroll-x::-webkit-scrollbar { display: none; }
      `}</style>

      {/* HERO SEARCH SECTION */}
      <div style={{ background: "linear-gradient(160deg, #0f0f1a 0%, #0d0d18 40%, #080810 100%)", padding: "48px 24px 0", position: "relative", overflow: "hidden" }}>
        {/* background blobs */}
        <div style={{ position: "absolute", top: -80, left: "10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -60, right: "15%", width: 300, height: 300, background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 20, padding: "5px 14px", marginBottom: 20 }}>
            <span className="glow" style={{ width: 7, height: 7, borderRadius: "50%", background: "#6366f1", display: "inline-block" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#a5b4fc" }}>12,500+ students across 40+ campuses</span>
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.15, marginBottom: 10 }}>
            Explore the <span style={{ background: "linear-gradient(90deg, #6366f1, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>IIT · NIT</span> universe
          </h1>
          <p style={{ color: "#6b7280", fontSize: 15, marginBottom: 32, fontWeight: 400 }}>Find teammates, discover hackathons, track placements — all in one place</p>

          {/* SEARCH BAR */}
          <div className="search-wrap" style={{ position: "relative", maxWidth: 580, margin: "0 auto 20px" }}>
            <span style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", fontSize: 17, opacity: 0.4 }}>🔍</span>
            <input
              type="text"
              placeholder="Search students, skills, events, colleges..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: "100%", padding: "15px 18px 15px 48px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e2e8f0", fontSize: 14, outline: "none", fontFamily: "inherit", transition: "all 0.2s" }}
            />
            <button style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "#6366f1", border: "none", borderRadius: 10, padding: "8px 18px", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Search</button>
          </div>

          {/* QUICK FILTERS */}
          <div className="scroll-x" style={{ display: "flex", gap: 8, justifyContent: "center", paddingBottom: 4, flexWrap: "wrap" }}>
            {quickFilters.map((f, i) => (
              <span key={i} className="filter-tag" style={{ padding: "5px 14px", borderRadius: 20, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", fontSize: 12, fontWeight: 600, color: "#6b7280" }}>{f}</span>
            ))}
          </div>
        </div>

        {/* SECTION NAV */}
        <div style={{ maxWidth: 900, margin: "32px auto 0", display: "flex", gap: 2, borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: 0 }}>
          {navItems.map(n => (
            <button key={n.id} className="nav-pill btn" onClick={() => setActiveSection(n.id)}
              style={{ padding: "10px 20px", border: "none", background: "transparent", color: activeSection === n.id ? "#a5b4fc" : "#6b7280", fontWeight: 700, fontSize: 13, fontFamily: "inherit", borderBottom: activeSection === n.id ? "2px solid #6366f1" : "2px solid transparent", marginBottom: -1 }}>
              {n.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* STATS ROW */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 52 }}>
          {stats.map((s, i) => (
            <div key={i} className="stat-card" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "20px 22px", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-1px" }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 500, marginTop: 2 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* AI RECOMMENDATIONS */}
        <Section label="✨ AI Recommended For You">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {aiRecs.map((r, i) => (
              <div key={i} className="card" style={{ background: `linear-gradient(135deg, ${r.color}15, rgba(255,255,255,0.02))`, border: `1px solid ${r.color}30`, borderRadius: 16, padding: "20px 22px", cursor: "pointer" }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{r.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{r.title}</div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>{r.reason}</div>
                <button className="btn" style={{ marginTop: 14, padding: "7px 16px", borderRadius: 10, background: `${r.color}22`, border: `1px solid ${r.color}44`, color: r.color, fontWeight: 700, fontSize: 12 }}>Explore →</button>
              </div>
            ))}
          </div>
        </Section>

        {/* TRENDING STUDENTS */}
        <Section label="🔥 Trending Students">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {students.map((s, i) => (
              <div key={i} className="card" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "22px", overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: `radial-gradient(circle at top right, ${s.color}20, transparent)`, pointerEvents: "none" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: s.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, color: "#fff", boxShadow: `0 0 0 3px ${s.color}33` }}>{s.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>{s.college} · {s.branch}</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                  {s.skills.map((sk, j) => (
                    <span key={j} style={{ padding: "3px 10px", borderRadius: 20, background: `${s.color}15`, border: `1px solid ${s.color}30`, fontSize: 11, fontWeight: 600, color: s.color }}>{sk}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{s.followers}</div>
                    <div style={{ fontSize: 10, color: "#6b7280" }}>Followers</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{s.projects}</div>
                    <div style={{ fontSize: 10, color: "#6b7280" }}>Projects</div>
                  </div>
                </div>
                <button className="btn" onClick={() => setFollowed(f => ({ ...f, [i]: !f[i] }))}
                  style={{ width: "100%", padding: "9px", borderRadius: 10, border: `1px solid ${followed[i] ? "rgba(255,255,255,0.1)" : s.color}`, background: followed[i] ? "rgba(255,255,255,0.05)" : `${s.color}22`, color: followed[i] ? "#6b7280" : s.color, fontWeight: 700, fontSize: 13 }}>
                  {followed[i] ? "✓ Following" : "+ Follow"}
                </button>
              </div>
            ))}
          </div>
        </Section>

        {/* EVENTS */}
        <Section label="📅 Tech Events & Hackathons">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {events.map((e, i) => (
              <div key={i} className="card" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "24px", display: "flex", gap: 18, alignItems: "flex-start", cursor: "pointer" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${e.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{e.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{e.title}</span>
                    <span className="badge" style={{ background: `${e.color}20`, color: e.color, border: `1px solid ${e.color}40` }}>{e.tag}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 10 }}>{e.place} · {e.registered.toLocaleString()} registered</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <span style={{ fontSize: 11, color: "#6b7280" }}>Prize: </span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#10b981" }}>{e.prize}</span>
                    </div>
                    <button className="btn" style={{ padding: "7px 18px", borderRadius: 10, background: e.color, color: "#fff", border: "none", fontWeight: 700, fontSize: 12 }}>
                      {e.time === "Register now" ? "Register →" : `Register (${e.time})`}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* PLACEMENT RADAR */}
        <Section label="📊 Placement Radar">
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1.5fr 1.5fr 1fr", padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: "#4b5563", textTransform: "uppercase" }}>
              <span>Company</span><span>Role</span><span>Package</span><span>Colleges</span><span>Trend</span>
            </div>
            {placements.map((p, i) => (
              <div key={i} className="placement-row" style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1.5fr 1.5fr 1fr", padding: "16px 20px", borderBottom: i < placements.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", alignItems: "center", cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${p.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: p.color }}>{p.logo}</div>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{p.company}</span>
                </div>
                <span style={{ fontSize: 13, color: "#cbd5e1" }}>{p.role}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#10b981" }}>{p.package}</span>
                <span style={{ fontSize: 12, color: "#6b7280" }}>{p.colleges}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#10b981" }}>↑ {p.trend}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* COMMUNITIES */}
        <Section label="👥 Skill Communities">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {communities.map((c, i) => (
              <div key={i} className="card" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "22px", cursor: "pointer", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", bottom: -20, right: -20, width: 90, height: 90, background: `radial-gradient(circle, ${c.color}15, transparent)`, pointerEvents: "none" }} />
                <div style={{ fontSize: 30, marginBottom: 10 }}>{c.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 14 }}>{c.members} members · {c.posts} posts/week</div>
                <button className="btn" onClick={() => setJoined(j => ({ ...j, [i]: !j[i] }))}
                  style={{ width: "100%", padding: "8px", borderRadius: 10, border: `1px solid ${joined[i] ? "rgba(255,255,255,0.1)" : c.color + "66"}`, background: joined[i] ? "rgba(255,255,255,0.05)" : `${c.color}18`, color: joined[i] ? "#6b7280" : c.color, fontWeight: 700, fontSize: 12 }}>
                  {joined[i] ? "✓ Joined" : "+ Join Community"}
                </button>
              </div>
            ))}
          </div>
        </Section>

        {/* PROJECTS */}
        <Section label="🛠️ Projects & Collaboration">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {projects.map((p, i) => (
              <div key={i} className="card" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 18, padding: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 3 }}>{p.title}</div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>By student from {p.by}</div>
                  </div>
                  <span style={{ padding: "4px 10px", borderRadius: 20, background: "#10b98120", color: "#10b981", fontSize: 11, fontWeight: 700, border: "1px solid #10b98140", whiteSpace: "nowrap" }}>{p.open} spots open</span>
                </div>
                <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 14 }}>{p.desc}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  {p.tech.map((t, j) => (
                    <span key={j} style={{ padding: "3px 10px", borderRadius: 20, background: `${p.color}15`, border: `1px solid ${p.color}30`, fontSize: 11, fontWeight: 600, color: p.color }}>{t}</span>
                  ))}
                </div>
                <button className="btn" style={{ padding: "9px 20px", borderRadius: 10, background: p.color, border: "none", color: "#fff", fontWeight: 700, fontSize: 13 }}>🤝 Join Project</button>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  );
}

function Section({ label, children }) {
  return (
    <div style={{ marginBottom: 52 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px" }}>{label}</h2>
        <button style={{ fontSize: 12, fontWeight: 600, color: "#6366f1", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>View all →</button>
      </div>
      {children}
    </div>
  );
}