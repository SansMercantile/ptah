import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import LandingPage from "./components/LandingPage";
import ConsolePage from "./components/ConsolePage";

export default function App() {
  const [currentView, setCurrentView] = useState<"landing" | "console">("landing");

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 selection:bg-amber-500/25 selection:text-amber-200">
      <AnimatePresence mode="wait">
        {currentView === "landing" ? (
          <motion.div
            key="landing-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="min-h-screen"
          >
            <LandingPage onLaunchApp={() => setCurrentView("console")} />
          </motion.div>
        ) : (
          <motion.div
            key="console-page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="min-h-screen"
          >
            <ConsolePage onBackToLanding={() => setCurrentView("landing")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
