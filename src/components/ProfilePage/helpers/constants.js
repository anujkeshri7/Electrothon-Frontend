export const DUMMY_USER = {
  id: "u1",
  name: "Arjun Sharma",
  headline: "3rd yr CSE @ IIT Delhi · ML enthusiast · Open to internships",
  bio: "Building things that matter. Currently obsessed with large language models and distributed systems. Love hackathons, open source, and late-night debugging sessions. Looking for like-minded people to build cool stuff together.",
  avatar: null,
  college: {
    name: "IIT Delhi",
    shortName: "IITD",
    domain: "iitd.ac.in",
    type: "IIT",
    color: "#f97316",
  },
  branch: "Computer Science & Engineering",
  currentYear: "3rd Year",
  graduationYear: "2026",
  cgpa: 8.7,
  rollNumber: "2021CSE0042",
  skills: ["Python", "React", "Machine Learning", "Node.js", "TensorFlow", "Docker", "TypeScript", "FastAPI"],
  interests: ["Hackathons", "Open Source", "Startups", "Research"],
  openTo: [
    { id: "hackathon", label: "Hackathon teams", icon: "" },
    { id: "internship", label: "Internships", icon: "" },
    { id: "project", label: "Side projects", icon: "" },
  ],
  socials: {
    github: "github.com/arjunsharma",
    linkedin: "linkedin.com/in/arjunsharma",
    portfolio: "arjunsharma.dev",
    twitter: "@arjun_builds",
    instagram: null,
  },
  stats: {
    connections: 342,
    posts: 18,
    projects: 5,
  },
  isOwnProfile: true, // toggle this to false to see public view
  isVerified: true,
  joinedAt: "August 2021",
};

export const DUMMY_POSTS = [
  {
    id: "p1",
    type: "post",
    content: "Just shipped my first open-source project — a lightweight ML model serving library built on FastAPI. 3 weeks of late nights but totally worth it. Star it on GitHub if you find it useful 🚀",
    images: ["https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&q=80"],
    likes: 47,
    comments: 12,
    time: "2h ago",
    tags: ["#OpenSource", "#Python", "#MachineLearning"],
  },
  {
    id: "p2",
    type: "question",
    content: "For final year CSE students who got SDE internships — how did you approach system design prep? I feel like DSA alone isn't enough for top companies anymore. Drop your tips below 👇",
    images: [],
    likes: 89,
    comments: 34,
    time: "1d ago",
    tags: ["#Internship", "#SDE", "#Placement"],
  },
  {
    id: "p3",
    type: "project",
    content: "Looking for a frontend dev to collaborate on a campus events aggregator app. The backend is mostly done — auth, event CRUD, notifications all set. DM if interested!",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&q=80",
    ],
    likes: 23,
    comments: 8,
    time: "3d ago",
    tags: ["#BuildTogether", "#React", "#Campus"],
  },
  {
    id: "p4",
    type: "post",
    content: "Our team won 2nd place at HackIITD last weekend! Built an AI-powered study planner that adapts to your exam schedule and sleep patterns. Incredible 36 hours ✨",
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
    ],
    likes: 134,
    comments: 41,
    time: "5d ago",
    tags: ["#Hackathon", "#AI", "#HackIITD"],
  },
];

export const SETTINGS_SECTIONS = [
  {
    title: "Account",
    items: [
      { id: "edit_profile", label: "Edit Profile", icon: "✏️", action: "edit" },
      { id: "change_email", label: "Change Email", icon: "📧", action: "navigate" },
      { id: "change_password", label: "Change Password", icon: "🔑", action: "navigate" },
     
    ],
  },
  {
    title: "Privacy",
    items: [
      { id: "profile_visibility", label: "Profile Visibility", icon: "👁️", action: "toggle", defaultOn: true },
      { id: "show_cgpa", label: "Show CGPA", icon: "📊", action: "toggle", defaultOn: true },
      { id: "show_email", label: "Show Email", icon: "📧", action: "toggle", defaultOn: false },
      { id: "allow_dm", label: "Allow Direct Messages", icon: "💬", action: "toggle", defaultOn: true },
    ],
  },
  {
    title: "Notifications",
    items: [
      { id: "notif_connections", label: "Connection requests", icon: "🔔", action: "toggle", defaultOn: true },
      { id: "notif_likes", label: "Likes & Comments", icon: "❤️", action: "toggle", defaultOn: true },
      { id: "notif_messages", label: "Messages", icon: "💬", action: "toggle", defaultOn: true },
      { id: "notif_events", label: "Campus Events", icon: "📅", action: "toggle", defaultOn: false },
    ],
  },
  {
    title: "Danger Zone",
    items: [
      { id: "deactivate", label: "Deactivate Account", icon: "⚠️", action: "danger" },
      { id: "logout", label: "Log Out", icon: "🚪", action: "logout" },
    ],
  },
];