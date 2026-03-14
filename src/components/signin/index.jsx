
import { useState } from "react";
import {
  Mail,
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
      <div className="hidden lg:flex w-1/2 items-center justify-center px-16">
        <div className="max-w-md">
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold bg-gradient-to-br from-violet-600 to-violet-400">
              C
            </div>
            <h1 className="text-2xl font-bold text-white">
              Campus<span className="text-violet-400">Connect</span>
            </h1>
          </div>

          <h2 className="text-4xl font-bold text-white leading-tight mb-6">
            Connect. Collaborate.
            <span className="text-violet-400 block">
              Build Your Campus Network.
            </span>
          </h2>

          <p className="text-white/50 text-lg">
            CampusConnect helps students collaborate on projects,
            discover opportunities, and grow their network across
            campus communities.
          </p>

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
              Campus<span className="text-violet-400">Connect</span>
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-2">
            Sign in to
            <span className="block text-violet-400">CampusConnect</span>
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

