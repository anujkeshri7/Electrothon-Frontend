
import { useState } from "react";
import {
  Mail,
  Pill,
  ShieldCheck,
  Bot,
  Users,
  Zap,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckSquare,
  Square
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async () => {
    setError("");

    if (!email || !password){
      setError("Please fill in your email and password.");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);

   try {
      // Simulate API call

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, { email, password }, { withCredentials: true });
      console.log("Sign-in response:", response.data);
      navigate('/');
    
    
   } catch (error) {

    console.log("Sign-in error:", error);
      setError("An unexpected error occurred. Please try again.");
    
   }finally{
    setLoading(false);
   }
  };

  return (
    <div className="min-h-screen flex bg-[#0f0f1c]">

{/* LEFT SIDE BRANDING */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-20 relative z-10 left-in">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-14">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-2xl"
              style={{ background: "rgba(139,92,246,0.4)", animation: "pulseRing 2.5s ease-out infinite" }}
            />
            <div
              className="relative w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg"
              style={{
                background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                boxShadow: "0 8px 24px rgba(124,58,237,0.45)",
                fontFamily: "'Sora',sans-serif",
              }}
            >
              C
            </div>
          </div>
          <div>
            <p className="text-white font-bold text-xl leading-none" style={{ fontFamily: "'Sora',sans-serif" }}>
              Campus<span className="text-violet-400">Link</span>
            </p>
            <p className="text-white/25 text-xs mt-0.5">Verified student network</p>
          </div>
        </div>

        {/* Headline */}
        <div className="mb-10">
          <h2
            className="text-5xl font-extrabold text-white leading-[1.12] mb-5"
            style={{ fontFamily: "'Sora',sans-serif" }}
          >
            Connect with<br />
            <span className="text-shimmer">India's brightest</span><br />
            campus minds.
          </h2>
          <p className="text-white/45 text-base leading-relaxed max-w-sm">
            A verified network for engineering and management students
            across top colleges in India. Collaborate on projects,
            find internships, and grow — powered by AI.
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          
              <ShieldCheck size={16} className="text-green-400" />
              <span className="text-sm text-white/40 ml-1">College email verified</span>
              <Bot size={16} className="text-purple-400 ml-4" />
              <span className="text-sm text-white/40 ml-1">AI-powered matching</span>
              <Zap size={16} className="text-yellow-400 ml-4" />
              <span className="text-sm text-white/40 ml-1">Real-time collaboration</span>
        

        </div>

        {/* Stats strip */}
        <div
          className="flex items-center gap-8 px-6 py-4 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
            animation: "floatY 4s ease-in-out infinite",
          }}
        >
          {[
            { value: "50+",  label: "Colleges"     },
            { value: "10k+", label: "Students"     },
            { value: "2k+",  label: "Collaborations" },
          ].map(({ value, label }, i) => (
            <div key={label} className="flex items-center gap-5">
              {i > 0 && <div className="h-8 w-px bg-white/10" />}
              <div>
                <p
                  className="text-white font-bold text-lg leading-none"
                  style={{ fontFamily: "'Sora',sans-serif" }}
                >
                  {value}
                </p>
                <p className="text-white/35 text-xs mt-0.5">{label}</p>
              </div>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full bg-emerald-400"
              style={{ boxShadow: "0 0 8px rgba(52,211,153,0.8)" }}
            />
            <span className="text-xs text-emerald-400/80">Live</span>
          </div>
        </div>

      </div>


      {/* RIGHT SIDE LOGIN */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6">

        <div className="w-full max-w-md rounded-2xl p-8 bg-[#181825] border border-white/10 shadow-2xl">

          {/* Logo for mobile */}
          <div className="flex items-center gap-2 mb-6 lg:hidden">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-black bg-gradient-to-br from-violet-600 to-violet-400">
              C
            </div>
            <span className="font-bold text-white">
              Campus<span className="text-violet-400">Link</span>
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-2">
            Sign in to
            <span className="block text-violet-400">CampusLink</span>
          </h2>

          <p className="text-sm text-white/40 mb-6">
            Don't have an account?{" "}
            <span 
            onClick={() => navigate('/signup')} 
            className="text-violet-400 cursor-pointer">Sign up</span>
          </p>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/30 px-3 py-2 rounded-lg mb-4">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-4 relative">
            <Mail className="absolute left-3 top-3.5 text-white/30" size={16} />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <Lock className="absolute left-3 top-3.5 text-white/30" size={16} />
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
            />

            <button
              onClick={() => setShow(!show)}
              className="absolute right-3 top-3 text-white/40 hover:text-white"
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Remember */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setRemember(!remember)}
              className="flex items-center gap-2 text-sm text-white/40"
            >
              {remember ? (
                <CheckSquare size={16} className="text-violet-400" />
              ) : (
                <Square size={16} />
              )}
              Remember me
            </button>

            <span className="text-sm text-violet-400 cursor-pointer">
              Forgot password?
            </span>
          </div>

          {/* Button */}
          <button
            onClick={handleSignIn}
            className="w-full py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 bg-gradient-to-br from-violet-600 to-violet-500 hover:opacity-90"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In <ArrowRight size={16} />
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
}

