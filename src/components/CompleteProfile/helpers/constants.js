export const PROFILE_STEPS = [
  { step: 1, label: "Basic" },
  { step: 2, label: "Academic" },
  { step: 3, label: "Skills" },
  { step: 4, label: "Socials" },
  { step: 5, label: "Done" },
];

export const BRANCHES = [
  "Computer Science & Engineering",
  "Information Technology",
  "Electronics & Communication",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Biotechnology",
  "Aerospace Engineering",
  "Data Science & AI",
  "Cybersecurity",
  "Mathematics & Computing",
  "Physics",
  "Chemistry",
  "MBA",
  "MCA",
  "Other",
];

export const GRADUATION_YEARS = Array.from({ length: 8 }, (_, i) => {
  const year = new Date().getFullYear() + i - 2;
  return { value: String(year), label: String(year) };
});

export const POPULAR_SKILLS = [
  "Python", "JavaScript", "React", "Node.js", "C++", "Java", "Machine Learning",
  "Data Science", "Deep Learning", "Flutter", "Android", "iOS", "DevOps",
  "Docker", "Kubernetes", "AWS", "MongoDB", "SQL", "GraphQL", "Figma",
  "UI/UX", "Blockchain", "Web3", "Solidity", "Rust", "Go", "TypeScript",
  "Next.js", "Django", "FastAPI", "Spring Boot", "TensorFlow", "PyTorch",
  "OpenCV", "NLP", "Computer Vision", "AR/VR", "Game Dev", "Unity",
];

export const INTERESTS = [
  "Competitive Programming", "Open Source", "Hackathons", "Research",
  "Startups", "Product Management", "Design", "Content Creation",
  "Photography", "Music", "Gaming", "Sports", "Reading", "Robotics",
  "Space Tech", "FinTech", "HealthTech", "EdTech", "Climate Tech",
];

export const OPEN_TO = [
  { id: "hackathon", label: "Hackathon teams", icon: "⚡" },
  { id: "internship", label: "Internships", icon: "💼" },
  { id: "project", label: "Side projects", icon: "🚀" },
  { id: "mentorship", label: "Mentorship", icon: "🎓" },
  { id: "fulltime", label: "Full-time roles", icon: "🏢" },
  { id: "collab", label: "Research collab", icon: "🔬" },
];