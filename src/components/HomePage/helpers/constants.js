import { Home, Compass, Users, MessageCircle, FolderKanban, Calendar, HelpCircle, Bookmark } from "lucide-react";
export const CURRENT_USER = {
  id: "me",
  name: "Arjun Sharma",
  headline: "3rd yr CSE · IIT Delhi",
  avatar: null,
  initials: "AS",
  college: { name: "IIT Delhi", color: "#f97316", shortName: "IITD" },
  stats: { connections: 342, posts: 18, profileViews: 91 },
};

export const STORIES = [
  { id: "s1", name: "Priya M", initials: "PM", college: "IITB", color: "#3b82f6", seen: false, time: "2m ago" },
  { id: "s2", name: "Rohan K", initials: "RK", college: "IITD", color: "#f97316", seen: false, time: "12m ago" },
  { id: "s3", name: "Ananya S", initials: "AS", college: "NIT-T", color: "#8b5cf6", seen: true, time: "1h ago" },
  { id: "s4", name: "Dev P", initials: "DP", college: "DTU", color: "#10b981", seen: false, time: "1h ago" },
  { id: "s5", name: "Sneha R", initials: "SR", college: "VIT", color: "#ec4899", seen: true, time: "2h ago" },
  { id: "s6", name: "Ayush G", initials: "AG", college: "IITM", color: "#14b8a6", seen: false, time: "3h ago" },
  { id: "s7", name: "Kavya N", initials: "KN", college: "NSUT", color: "#f59e0b", seen: true, time: "5h ago" },
];

export const FEED_POSTS = [
  {
    id: "fp1",
    author: {
      name: "Priya Mehta",
      initials: "PM",
      college: "IIT Bombay",
      collegeColor: "#3b82f6",
      role: "Final yr ECE · Placement Season",
      verified: true,
    },
    time: "2 hours ago",
    type: "post",
    content: "Just got my dream offer from Google SWE! 🎉\n\nHonestly couldn't have done it without the amazing seniors on this platform who reviewed my resume and did mock interviews with me. This community is something else.\n\nFor anyone in 3rd year — start NOW. DSA + System Design + projects. That's the formula.",
    images: ["https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80"],
    likes: 847,
    comments: 134,
    shares: 56,
    tags: ["#Placement", "#Google", "#SWE"],
    liked: false,
    saved: false,
  },
  {
    id: "fp2",
    author: {
      name: "Rohan Kapoor",
      initials: "RK",
      college: "IIT Delhi",
      collegeColor: "#f97316",
      role: "3rd yr CSE · ML Research",
      verified: true,
    },
    time: "4 hours ago",
    type: "project",
    content: "We're 2 weeks into building a real-time campus food ordering app and it's going surprisingly well 🔥\n\nStack: Next.js + Supabase + Stripe. The hardest part was realtime order tracking — ended up using Supabase realtime subscriptions.\n\nLooking for a designer who can help polish the UI. DM if interested!",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=80",
    ],
    likes: 312,
    comments: 47,
    shares: 23,
    tags: ["#BuildInPublic", "#NextJS", "#Startup"],
    liked: true,
    saved: false,
  },
  {
    id: "fp3",
    author: {
      name: "Ananya Singh",
      initials: "AS",
      college: "NIT Trichy",
      collegeColor: "#8b5cf6",
      role: "2nd yr CSE · Competitive Programmer",
      verified: true,
    },
    time: "6 hours ago",
    type: "question",
    content: "Hot take: Competitive programming is overrated for SDE roles at product companies.\n\nChange my mind 👇\n\nI've been grinding CF for 2 years and I think the time would've been better spent on system design and real projects. Most interview DSA is just LeetCode medium — no need for ICPC-level prep.",
    images: [],
    likes: 1203,
    comments: 289,
    shares: 178,
    tags: ["#CP", "#Placement", "#Opinion"],
    liked: false,
    saved: true,
  },
  {
    id: "fp4",
    author: {
      name: "Dev Patel",
      initials: "DP",
      college: "DTU",
      collegeColor: "#10b981",
      role: "4th yr IT · Founding member @ CampusMart",
      verified: true,
    },
    time: "Yesterday",
    type: "post",
    content: "Our team just crossed ₹2L in revenue from our college-based second-hand marketplace 🚀\n\nWhat started as a WhatsApp group for selling old books is now a proper platform with 800+ users across 3 colleges.\n\nHere's what we learned in 6 months of building →",
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&q=80",
    ],
    likes: 2341,
    comments: 412,
    shares: 891,
    tags: ["#Startup", "#StudentFounder", "#Bootstrapped"],
    liked: false,
    saved: false,
  },
];

export const SUGGESTED_PEOPLE = [
  { id: "sp1", name: "Sneha Rao", initials: "SR", college: "IIT Madras", color: "#ec4899", role: "ML Research Intern @ Adobe", mutuals: 12 },
  { id: "sp2", name: "Ayush Gupta", initials: "AG", college: "IIT Madras", color: "#14b8a6", role: "2nd yr CSE · Open Source", mutuals: 8 },
  { id: "sp3", name: "Kavya Nair", initials: "KN", college: "NSUT", color: "#f59e0b", role: "CP Expert · Codeforces 2100+", mutuals: 5 },
];

export const TRENDING_TAGS = [
  { tag: "#PlacementSeason2025", posts: "2.3k posts", hot: true },
  { tag: "#HackIITD", posts: "891 posts", hot: true },
  { tag: "#OpenToInternship", posts: "1.1k posts", hot: false },
  { tag: "#BuildInPublic", posts: "567 posts", hot: false },
  { tag: "#CGPADoesntDefineYou", posts: "3.4k posts", hot: true },
];

export const UPCOMING_EVENTS = [
  { id: "e1", name: "HackIITD 2025", college: "IIT Delhi", date: "Mar 22–23", type: "Hackathon", color: "#6366f1", going: 847 },
  { id: "e2", name: "ML Summit NIT", college: "NIT Trichy", date: "Mar 28", type: "Summit", color: "#f97316", going: 412 },
  { id: "e3", name: "Open Source Sprint", college: "Online", date: "Apr 2–5", type: "Workshop", color: "#10b981", going: 234 },
];


export const NAV_ITEMS = [
  { id: "home",     label: "Home",        icon: Home,          active: true  },
  { id: "explore",  label: "Explore",     icon: Compass,       active: false },
  { id: "connect",  label: "Connections", icon: Users,         active: false },
  { id: "messages", label: "Messages",    icon: MessageCircle, active: false, badge: 3 },
  { id: "projects", label: "Projects",    icon: FolderKanban,  active: false },
  { id: "events",   label: "Events",      icon: Calendar,      active: false },
  { id: "qa",       label: "Q&A",         icon: HelpCircle,    active: false },
  { id: "saved",    label: "Saved",       icon: Bookmark,      active: false },
];
 




