import { useState } from "react";
import LandingPage from "./components/LandingPage";
import RegistrationPage from "./components/RegistrationPage";

// Views: "landing" | "register"
export default function App() {
  const [view, setView] = useState("landing");

  return (
    <div className="font-sans antialiased">
      {view === "landing" && (
        <LandingPage onRegister={() => setView("register")} />
      )}
      {view === "register" && (
        <RegistrationPage onClose={() => setView("landing")} />
      )}
    </div>
  );
}