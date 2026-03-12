import { FEATURES } from "../data/colleges";

const colorMap = {
  blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  amber: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  green: "bg-green-500/10 border-green-500/20 text-green-400",
  pink: "bg-pink-500/10 border-pink-500/20 text-pink-400",
  cyan: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
};

const FeatureCard = ({ icon, title, desc, color }) => (
  <div className="bg-gray-900/50 border border-gray-800/60 rounded-xl p-5 hover:border-gray-700 hover:bg-gray-900 transition-all duration-200 group">
    <div className={`w-10 h-10 rounded-lg border flex items-center justify-center mb-3 text-lg ${colorMap[color]}`}>
      {icon}
    </div>
    <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-blue-300 transition-colors">
      {title}
    </h3>
    <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

const Stat = ({ value, label }) => (
  <div className="text-center">
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-xs text-gray-600 mt-0.5">{label}</p>
  </div>
);

const LandingPage = ({ onRegister }) => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Navbar */}
      <nav className="relative z-10 border-b border-gray-800/60 bg-gray-950/80 backdrop-blur-md sticky top-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
            </div>
            <span className="text-base font-bold tracking-tight">
              Nex<span className="text-blue-400">Us</span>
            </span>
            <span className="ml-2 text-xs bg-blue-500/10 border border-blue-500/30 text-blue-400 px-2 py-0.5 rounded-full">
              beta
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block">
              Sign in
            </button>
            <button
              onClick={onRegister}
              className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg font-medium transition-colors"
            >
              Join now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 bg-gray-900/80 border border-gray-700/60 rounded-full px-3.5 py-1.5 text-xs text-gray-400 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Now open for NIT & IIT students — limited early access
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5 leading-tight">
          Your campus network,
          <br />
          <span className="text-blue-400">beyond your campus</span>
        </h1>

        <p className="text-base text-gray-500 max-w-xl mx-auto mb-8 leading-relaxed">
          Connect with students across all 50+ NITs and IITs. Share opportunities,
          discover events, and grow together — powered by AI that actually gets you.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <button
            onClick={onRegister}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 shadow-lg shadow-blue-500/20"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            Create your account
          </button>

          <button
            onClick={() => {
              document.getElementById("features-section")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200"
          >
            I'll do it later — explore first
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 sm:gap-12 pt-8 border-t border-gray-800/60">
          <Stat value="50+" label="Institutes" />
          <div className="w-px h-8 bg-gray-800" />
          <Stat value="5L+" label="Students" />
          <div className="w-px h-8 bg-gray-800" />
          <Stat value="100+" label="Events/year" />
          <div className="w-px h-8 bg-gray-800" />
          <Stat value="AI" label="Powered" />
        </div>
      </section>

      {/* Features Grid */}
      <section id="features-section" className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-2">
            What's inside
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Built for the NIT & IIT community
          </h2>
          <p className="text-sm text-gray-600 mt-3 max-w-md mx-auto">
            Everything you need to build connections, stay updated, and grow in one place
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      {/* Bottom CTA strip */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-gradient-to-r from-blue-600/10 via-blue-500/5 to-purple-600/10 border border-blue-500/20 rounded-2xl p-8 sm:p-10 text-center">
          <p className="text-xs text-blue-400 font-semibold uppercase tracking-widest mb-3">
            Early access is free
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
            Ready to join the network?
          </h3>
          <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
            Takes less than 2 minutes. Just your name, college, and institute email.
          </p>
          <button
            onClick={onRegister}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-blue-500/20"
          >
            Get started — it's free
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/60 py-6">
        <p className="text-center text-xs text-gray-700">
          © 2025 NexUs — Exclusively for NIT & IIT students
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;