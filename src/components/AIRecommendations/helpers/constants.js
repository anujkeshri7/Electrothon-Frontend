export const DUMMY_RESPONSE = {
  success: true,
  data: {
    output: {
      student_summary:
        "2nd year Computer Science & Engineering student at IIT Bombay with a 9 CGPA. Skilled in JavaScript, Node.js, and Java, interested in Competitive Programming and Open Source. Open to hackathons, internships, mentorship, and collaborations.",
      recommended_opportunities: [
        {
          title: "Trust Lab Internship",
          type: "Internship",
          organization: "Trust Lab, IIT Bombay",
          difficulty: "Competitive",
          apply_link: "https://trustlab.iitb.ac.in/event/trust-lab-internship-2024",
          deadline: "Check website for current deadlines",
          why_recommended:
            "Directly associated with IIT Bombay's Computer Science Department, offers a stipend, and provides research/development experience, suitable for a 2nd-year CS student.",
          eligibility: "Computer Science students, competitive selection.",
        },
        {
          title: "Google Summer of Code (GSoC)",
          type: "Open Source Program",
          organization: "Google",
          difficulty: "Highly Competitive",
          apply_link: "https://summerofcode.withgoogle.com/",
          deadline: "Annually in early spring (check for 2025)",
          why_recommended:
            "Highly recognized global open-source program, excellent for contributing to real-world projects, gaining mentorship, and applying skills like JavaScript/Java.",
          eligibility: "University students (typically 18+).",
        },
        {
          title: "MLH Fellowship",
          type: "Open Source Program/Fellowship",
          organization: "Major League Hacking (MLH)",
          difficulty: "Competitive",
          apply_link: "https://fellowship.mlh.io/",
          deadline: "Multiple cohorts, check website for specific deadlines",
          why_recommended:
            "Offers structured mentorship and collaboration on open-source projects, enhancing practical skills and providing valuable industry exposure for students.",
          eligibility: "College students.",
        },
        {
          title: "Smart India Hackathon (SIH)",
          type: "Hackathon",
          organization: "Government of India",
          difficulty: "Competitive",
          apply_link: "https://sih.gov.in/",
          deadline: "Annually (check sih.gov.in for 2025 dates)",
          why_recommended:
            "Nationwide initiative promoting innovation and problem-solving for real-world challenges, excellent for applying technical skills and teamwork for a CS student.",
          eligibility: "College students in India.",
        },
        {
          title: "HackIndia",
          type: "Hackathon Series",
          organization: "HackIndia",
          difficulty: "Varies by hackathon",
          apply_link: "https://hackindia.org/",
          deadline: "Ongoing series, check website for upcoming events",
          why_recommended:
            "India's largest hackathon platform with focus on emerging tech like AI & Web3; great for showcasing skills (JavaScript, Node.js), networking, and winning prizes.",
          eligibility: "Students and Developers.",
        },
      ],
    },
  },
};

export const TYPE_CONFIG = {
  Internship: {
    color: "#34d399",
    bg: "rgba(52,211,153,0.1)",
    border: "rgba(52,211,153,0.25)",
    icon: "💼",
  },
  "Open Source Program": {
    color: "#f97316",
    bg: "rgba(249,115,22,0.1)",
    border: "rgba(249,115,22,0.25)",
    icon: "🌐",
  },
  "Open Source Program/Fellowship": {
    color: "#f97316",
    bg: "rgba(249,115,22,0.1)",
    border: "rgba(249,115,22,0.25)",
    icon: "🤝",
  },
  Hackathon: {
    color: "#6366f1",
    bg: "rgba(99,102,241,0.1)",
    border: "rgba(99,102,241,0.25)",
    icon: "⚡",
  },
  "Hackathon Series": {
    color: "#6366f1",
    bg: "rgba(99,102,241,0.1)",
    border: "rgba(99,102,241,0.25)",
    icon: "⚡",
  },
  Fellowship: {
    color: "#ec4899",
    bg: "rgba(236,72,153,0.1)",
    border: "rgba(236,72,153,0.25)",
    icon: "🎓",
  },
  Research: {
    color: "#14b8a6",
    bg: "rgba(20,184,166,0.1)",
    border: "rgba(20,184,166,0.25)",
    icon: "🔬",
  },
  default: {
    color: "#a5b4fc",
    bg: "rgba(165,180,252,0.1)",
    border: "rgba(165,180,252,0.25)",
    icon: "🚀",
  },
};

export const DIFFICULTY_CONFIG = {
  "Highly Competitive": { color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.25)", dot: "#f87171" },
  Competitive:          { color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.25)",  dot: "#f59e0b" },
  Moderate:             { color: "#34d399", bg: "rgba(52,211,153,0.1)",  border: "rgba(52,211,153,0.25)",  dot: "#34d399" },
  "Varies by hackathon":{ color: "#a5b4fc", bg: "rgba(165,180,252,0.1)", border: "rgba(165,180,252,0.2)", dot: "#a5b4fc" },
  default:              { color: "#a5b4fc", bg: "rgba(165,180,252,0.1)", border: "rgba(165,180,252,0.2)", dot: "#a5b4fc" },
};