import { useState } from "react";

export default function Home() {

  const [mode, setMode] = useState("dynamic");

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-linear-to-br from-purple-900 via-indigo-900 to-black text-white px-6">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT CONTENT */}

        <div>

          <h1 className="text-5xl font-bold leading-tight mb-6">
            AI Powered <span className="text-purple-400">Interactive Storytelling</span>
          </h1>

          <p className="text-lg text-gray-300 mb-8">
            Create stories that evolve with your decisions. Speak or type at key
            moments and watch the narrative transform instantly. Sit back and
            listen as AI generates immersive stories with realistic narration.
          </p>

          {/* MODE SWITCH */}

          <div className="flex gap-4 mb-6">

            <button
              onClick={() => setMode("dynamic")}
              className={`px-6 py-3 rounded-xl font-semibold transition ${
                mode === "dynamic"
                  ? "bg-purple-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              Interactive Mode
            </button>

            <button
              onClick={() => setMode("passive")}
              className={`px-6 py-3 rounded-xl font-semibold transition ${
                mode === "passive"
                  ? "bg-purple-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              Passive Mode
            </button>

          </div>

          {/* CONDITIONAL UI */}

          {mode === "dynamic" ? (

            <div className="space-y-4">

              <p className="text-gray-300">
                Make decisions during the story using voice or text and shape the plot in real time.
              </p>

              <div className="flex gap-4">

                <button className="bg-purple-600 px-6 py-3 rounded-xl hover:bg-purple-700">
                  Start Story
                </button>

                <button className="border border-gray-500 px-6 py-3 rounded-xl hover:bg-gray-800">
                  Voice Input
                </button>

              </div>

            </div>

          ) : (

            <div className="space-y-4">

              <p className="text-gray-300">
                Choose a category and duration. AI will generate a complete narrated story for you instantly.
              </p>

              <div className="flex gap-4 flex-wrap">

                <select className="bg-gray-800 px-4 py-3 rounded-lg">
                  <option>Adventure</option>
                  <option>Horror</option>
                  <option>Sci-Fi</option>
                  <option>Fantasy</option>
                </select>

                <select className="bg-gray-800 px-4 py-3 rounded-lg">
                  <option>5 minutes</option>
                  <option>10 minutes</option>
                  <option>20 minutes</option>
                </select>

              </div>

              <button className="bg-purple-600 px-6 py-3 rounded-xl hover:bg-purple-700">
                Generate Story
              </button>

            </div>

          )}

        </div>

        {/* RIGHT SIDE VISUAL */}

        <div className="relative">

          <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700">

            <h3 className="text-xl font-semibold mb-4">
              AI Story Flow
            </h3>

            <div className="space-y-3 text-gray-300">

              <p>User Prompt / Decision</p>

              <p>↓</p>

              <p>Gemini AI generates story</p>

              <p>↓</p>

              <p>Voice narration with ElevenLabs</p>

              <p>↓</p>

              <p>Listen instantly 🎧</p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}