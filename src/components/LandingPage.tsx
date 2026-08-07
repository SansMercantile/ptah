import React, { useState, FormEvent } from "react";
import { 
  Building2, 
  ShieldAlert, 
  Coins, 
  CheckCircle2, 
  ArrowRight, 
  Truck, 
  Layers, 
  Droplet, 
  Sun, 
  Send, 
  Check,
  ChevronRight,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import AnimatedEmoticon from "./AnimatedEmoticon";

interface LandingPageProps {
  onLaunchApp: () => void;
}

export default function LandingPage({ onLaunchApp }: LandingPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "Infrastructure",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Active module preview selector on landing
  const [activePreviewModule, setActivePreviewModule] = useState<"HAPI" | "HATHOR" | "MAMI_WATA" | "RA">("HAPI");

  // Active Landing page tab
  const [activeLandingTab, setActiveLandingTab] = useState<"home" | "functions" | "modules" | "contact">("home");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: "", email: "", company: "", projectType: "Infrastructure", message: "" });
      }, 5000);
    }, 1200);
  };

  return (
    <div className="bg-slate-950 text-slate-200 font-sans min-h-screen relative overflow-x-hidden flex flex-col justify-between">
      {/* Structural technical grid background - higher density (3rem size) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      {/* Primary Landing Header */}
      <nav id="landing-navbar" className="relative border-b border-slate-800 bg-slate-900/50 backdrop-blur-md z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveLandingTab("home")}
              className="flex items-center gap-2.5 text-left cursor-pointer focus:outline-hidden"
            >
              <img src="/logo.svg" className="w-9 h-9 animate-[pulse_3s_ease-in-out_infinite]" alt="PTAH Logo" referrerPolicy="no-referrer" />
              <span className="text-xl font-display font-black tracking-widest uppercase text-white">PTAH</span>
            </button>
            <div className="hidden lg:flex items-center space-x-4 border-l border-slate-800 pl-4">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                System Status: <span className="text-emerald-400 font-bold">Operational</span> • 22 Active Nodes
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Desktop Navbar Controls */}
            <div className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setActiveLandingTab("home")}
                className={`text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 rounded transition-all cursor-pointer ${
                  activeLandingTab === "home" ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10" : "text-slate-400 hover:text-white"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveLandingTab("functions")}
                className={`text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 rounded transition-all cursor-pointer ${
                  activeLandingTab === "functions" ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10" : "text-slate-400 hover:text-white"
                }`}
              >
                Key Functions
              </button>
              <button
                onClick={() => setActiveLandingTab("modules")}
                className={`text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 rounded transition-all cursor-pointer ${
                  activeLandingTab === "modules" ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10" : "text-slate-400 hover:text-white"
                }`}
              >
                Constellation Modules
              </button>
              <button
                onClick={() => setActiveLandingTab("contact")}
                className={`text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 rounded transition-all cursor-pointer ${
                  activeLandingTab === "contact" ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10" : "text-slate-400 hover:text-white"
                }`}
              >
                Contact
              </button>
            </div>

            <button
              id="header-launch-app-btn"
              onClick={onLaunchApp}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded transition-colors uppercase tracking-tight shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center gap-1.5 cursor-pointer"
            >
              Launch App
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation sub-header */}
        <div className="md:hidden bg-slate-950/90 border-t border-slate-900 p-2 flex gap-1 justify-center overflow-x-auto shrink-0 z-30">
          <button
            onClick={() => setActiveLandingTab("home")}
            className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1.5 rounded transition-all whitespace-nowrap ${
              activeLandingTab === "home" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveLandingTab("functions")}
            className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1.5 rounded transition-all whitespace-nowrap ${
              activeLandingTab === "functions" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            Functions
          </button>
          <button
            onClick={() => setActiveLandingTab("modules")}
            className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1.5 rounded transition-all whitespace-nowrap ${
              activeLandingTab === "modules" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            Modules
          </button>
          <button
            onClick={() => setActiveLandingTab("contact")}
            className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1.5 rounded transition-all whitespace-nowrap ${
              activeLandingTab === "contact" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            Contact
          </button>
        </div>
      </nav>

      {/* Main viewport with animated page transitions */}
      <main className="flex-1 min-h-[calc(100vh-140px)] flex flex-col relative z-10 justify-center">
        <AnimatePresence mode="wait">
          {activeLandingTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              {/* Hero Section Container */}
              <header className="relative py-12 lg:py-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 flex flex-col justify-center">
                      {/* Badge */}
                      <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 rounded px-3 py-1.5 w-fit mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-[10px] font-mono text-amber-500 tracking-widest uppercase">High Density System Control</span>
                      </div>

                      <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase leading-[1.05] mb-6">
                        Infrastructure <span className="text-slate-500 italic">Intelligence</span>
                      </h1>

                      <p className="text-base sm:text-lg text-slate-350 font-sans leading-relaxed mb-4 max-w-2xl">
                        Building smarter, safer infrastructure with AI-powered project control and compliance.
                      </p>
                      
                      <p className="text-xs text-slate-500 leading-relaxed mb-8 max-w-2xl font-sans font-hairline">
                        PTAH transforms construction workflows with intelligent project management, hazard monitoring, budget optimization, and quality assurance. The system supports end-to-end delivery for complex infrastructure projects while ensuring worker safety and environmental compliance.
                      </p>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <button
                          id="hero-launch-primary"
                          onClick={onLaunchApp}
                          className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded transition-colors uppercase tracking-tight shadow-[0_0_15px_rgba(245,158,11,0.3)] flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          Launch App Workspace
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setActiveLandingTab("functions")}
                          className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-705 text-xs font-bold rounded uppercase tracking-tight transition-all text-center cursor-pointer"
                        >
                          Explore Capabilities
                        </button>
                      </div>
                    </div>

                    {/* Micro-Dashboard Teaser Box */}
                    <div className="lg:col-span-5 relative">
                      <div className="absolute inset-0 bg-amber-500/10 rounded-xl blur-3xl opacity-50" />
                      <div className="relative border border-slate-800 bg-slate-900/50 backdrop-blur-md rounded-lg p-5">
                        <div className="flex items-center justify-between border-b border-slate-850 pb-3 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></span>
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Real-Time Feed</span>
                          </div>
                          <span className="text-[10px] font-mono text-amber-500 animate-pulse">LIVE</span>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-4 bg-slate-950/30 p-2.5 rounded border border-slate-850">
                            <AnimatedEmoticon score={94} size={36} />
                            <div className="flex-1">
                              <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                                <span>PROJECT CONTROL HUB</span>
                                <span className="text-emerald-400">94.8% OPTIMAL</span>
                              </div>
                              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                                <div className="bg-amber-500 h-full" style={{ width: "94%" }}></div>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-slate-950/50 p-3 rounded border border-slate-850">
                              <span className="text-[9px] font-mono text-slate-500 block">RA CLEAN POWER</span>
                              <span className="font-mono text-xs font-bold text-emerald-400">89.4% SOLAR</span>
                            </div>
                            <div className="bg-slate-950/50 p-3 rounded border border-slate-850">
                              <span className="text-[9px] font-mono text-slate-500 block">HAPI FREIGHTS</span>
                              <span className="font-mono text-xs font-bold text-blue-400">22 ACTIVE</span>
                            </div>
                          </div>

                          <div className="bg-slate-950 p-3 rounded border border-slate-850 font-mono text-[10px] text-slate-500 space-y-1.5 leading-snug text-left">
                            <p>&gt; SAFETY: Zone 4 clear</p>
                            <p>&gt; LOGS: HAPI delivery ETA 5m</p>
                            <p>&gt; SENS: Structural integrity OK</p>
                            <p>&gt; ENV: CO2 levels 320ppm</p>
                          </div>

                          <button 
                            onClick={onLaunchApp}
                            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded py-2.5 transition-colors uppercase tracking-tight flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            Deploy Workspace View
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </header>
            </motion.div>
          )}

          {activeLandingTab === "functions" && (
            <motion.div
              key="functions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              {/* Key Functions Grid Section */}
              <section className="py-12 bg-slate-900/10 h-full flex flex-col justify-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto mb-12">
                    <h3 className="text-[10px] font-mono text-amber-500 uppercase tracking-[0.2em] mb-3 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span> System Control Hub
                    </h3>
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase mb-4">
                      Core Capabilities Matrix
                    </h2>
                    <p className="text-slate-400 text-sm">
                      Transforming traditional operational risk management into a unified, predictive AI-guided timeline.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Project Management */}
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-slate-600 transition-all flex flex-col justify-between">
                      <div>
                        <div className="text-amber-500 mb-3">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <h4 className="text-white font-bold uppercase tracking-tight text-sm">Project Management</h4>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                          Optimize timelines, resource allocation, and progress monitoring across complex sites.
                        </p>
                      </div>
                      <div className="border-t border-slate-850 pt-3 mt-4 text-[9px] font-mono text-slate-500 uppercase">
                        HAPI INTEGRATED
                      </div>
                    </div>

                    {/* Safety Systems */}
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-slate-600 transition-all flex flex-col justify-between">
                      <div>
                        <div className="text-amber-500 mb-3">
                          <ShieldAlert className="w-5 h-5" />
                        </div>
                        <h4 className="text-white font-bold uppercase tracking-tight text-sm">Safety Systems</h4>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                          Real-time hazard detection, worker monitoring, and automated incident prevention protocols.
                        </p>
                      </div>
                      <div className="border-t border-slate-850 pt-3 mt-4 text-[9px] font-mono text-slate-500 uppercase">
                        CO-PILOT GUARDED
                      </div>
                    </div>

                    {/* Budget Optimization */}
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-slate-600 transition-all flex flex-col justify-between">
                      <div>
                        <div className="text-amber-500 mb-3">
                          <Coins className="w-5 h-5" />
                        </div>
                        <h4 className="text-white font-bold uppercase tracking-tight text-sm">Budget Optimization</h4>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                          Track costs, minimize logistical waste, and forecast spend to keep projects within margin.
                        </p>
                      </div>
                      <div className="border-t border-slate-850 pt-3 mt-4 text-[9px] font-mono text-slate-500 uppercase">
                        HATHOR OPTIMIZED
                      </div>
                    </div>

                    {/* Quality Assurance */}
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-slate-600 transition-all flex flex-col justify-between">
                      <div>
                        <div className="text-amber-500 mb-3">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <h4 className="text-white font-bold uppercase tracking-tight text-sm">Quality Assurance</h4>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                          Automated inspections, compliance checks, and sub-millimeter defect detection systems.
                        </p>
                      </div>
                      <div className="border-t border-slate-850 pt-3 mt-4 text-[9px] font-mono text-slate-500 uppercase">
                        MAMI_WATA COMPLIANT
                      </div>
                    </div>
                  </div>

                  {/* Inline call back to Launch */}
                  <div className="mt-12 text-center">
                    <button
                      onClick={onLaunchApp}
                      className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded transition-colors uppercase tracking-tight shadow-[0_0_15px_rgba(245,158,11,0.3)] inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      Initialize Workspace Console
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeLandingTab === "modules" && (
            <motion.div
              key="modules"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              {/* Integrated Subdivision Sections (HAPI, HATHOR, MAMI_WATA, RA) */}
              <section className="py-12 bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Tabs listing on left */}
                    <div className="lg:col-span-5 space-y-4">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">Operational Constellation</span>
                      <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase mb-4">
                        Subdivision Controls
                      </h2>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        PTAH orchestrates operational subsystems to coordinate raw resources, energy networks, water, and supply pipelines.
                      </p>

                      <div className="space-y-2 pt-2">
                        {/* HAPI Card Tab */}
                        <button
                          onClick={() => setActivePreviewModule("HAPI")}
                          className={`w-full text-left p-3.5 rounded border transition-all flex items-center justify-between cursor-pointer ${
                            activePreviewModule === "HAPI"
                              ? "bg-slate-900 border-amber-500 shadow-sm"
                              : "bg-slate-900/30 border-slate-800/80 hover:bg-slate-900/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-amber-500 font-bold tracking-widest text-xs">HAPI</span>
                            <div>
                              <h4 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-tight">Logistics Automation</h4>
                            </div>
                          </div>
                          <ChevronRight className={`w-3.5 h-3.5 text-slate-500 transition-transform ${activePreviewModule === "HAPI" ? "rotate-90 text-amber-500" : ""}`} />
                        </button>

                        {/* HATHOR Card Tab */}
                        <button
                          onClick={() => setActivePreviewModule("HATHOR")}
                          className={`w-full text-left p-3.5 rounded border transition-all flex items-center justify-between cursor-pointer ${
                            activePreviewModule === "HATHOR"
                              ? "bg-slate-900 border-amber-500 shadow-sm"
                              : "bg-slate-900/30 border-slate-800/80 hover:bg-slate-900/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-amber-500 font-bold tracking-widest text-xs">HATHOR</span>
                            <div>
                              <h4 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-tight">Mining & Supply Chain</h4>
                            </div>
                          </div>
                          <ChevronRight className={`w-3.5 h-3.5 text-slate-500 transition-transform ${activePreviewModule === "HATHOR" ? "rotate-90 text-amber-500" : ""}`} />
                        </button>

                        {/* MAMI_WATA Card Tab */}
                        <button
                          onClick={() => setActivePreviewModule("MAMI_WATA")}
                          className={`w-full text-left p-3.5 rounded border transition-all flex items-center justify-between cursor-pointer ${
                            activePreviewModule === "MAMI_WATA"
                              ? "bg-slate-900 border-amber-500 shadow-sm"
                              : "bg-slate-900/30 border-slate-800/80 hover:bg-slate-900/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-amber-500 font-bold tracking-widest text-xs">MAMI_WATA</span>
                            <div>
                              <h4 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-tight">Water Infrastructure</h4>
                            </div>
                          </div>
                          <ChevronRight className={`w-3.5 h-3.5 text-slate-500 transition-transform ${activePreviewModule === "MAMI_WATA" ? "rotate-90 text-amber-500" : ""}`} />
                        </button>

                        {/* RA Card Tab */}
                        <button
                          onClick={() => setActivePreviewModule("RA")}
                          className={`w-full text-left p-3.5 rounded border transition-all flex items-center justify-between cursor-pointer ${
                            activePreviewModule === "RA"
                              ? "bg-slate-900 border-amber-500 shadow-sm"
                              : "bg-slate-900/30 border-slate-800/80 hover:bg-slate-900/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-amber-500 font-bold tracking-widest text-xs">RA</span>
                            <div>
                              <h4 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-tight">Clean Power Planning</h4>
                            </div>
                          </div>
                          <ChevronRight className={`w-3.5 h-3.5 text-slate-500 transition-transform ${activePreviewModule === "RA" ? "rotate-90 text-amber-500" : ""}`} />
                        </button>
                      </div>
                    </div>

                    {/* Dynamic visual preview of the active module on the right */}
                    <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 min-h-[380px] relative overflow-hidden flex flex-col justify-between">
                      
                      <div className="absolute top-0 right-0 p-2 bg-slate-950 border-l border-b border-slate-800 text-[8px] font-mono text-slate-500">
                        MODULE PREVIEW ENGINE // Core v4.1
                      </div>

                      {activePreviewModule === "HAPI" && (
                        <div className="space-y-4">
                          <div>
                            <span className="text-amber-500 font-bold tracking-widest text-xs">HAPI</span>
                            <p className="text-[10px] text-slate-400 mt-1 uppercase">Logistics Automation</p>
                            <p className="text-slate-450 text-xs leading-relaxed mt-2 font-sans font-hairline">
                              Automate materials delivery and logistic support for complex building sites. Track material orders, trigger dispatch queues, and manage active truck telemetry to prevent bottleneck delays.
                            </p>
                          </div>

                          <div className="bg-slate-950 rounded border border-slate-800 p-3.5 font-mono text-[10px]">
                            <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2">
                              <span className="text-slate-400 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                ACTIVE LOGISTICS CO-ORDINATION
                              </span>
                              <span className="text-blue-400 font-bold">ACTIVE // v2.4</span>
                            </div>
                            <div className="space-y-1 text-slate-400">
                              <div className="flex justify-between">
                                <span>TRUCK-A4 (Grade A Sand)</span>
                                <span className="text-emerald-500">ETA 12 MIN // TRANSIT</span>
                              </div>
                              <div className="flex justify-between">
                                <span>TRUCK-B8 (Steel Preform)</span>
                                <span className="text-emerald-500">DISPATCHED</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activePreviewModule === "HATHOR" && (
                        <div className="space-y-4">
                          <div>
                            <span className="text-amber-500 font-bold tracking-widest text-xs">HATHOR</span>
                            <p className="text-[10px] text-slate-400 mt-1 uppercase">Mining & Supply Chain</p>
                            <p className="text-slate-450 text-xs leading-relaxed mt-2 font-sans font-hairline">
                              Analyze raw material intake and mining supply chains for building projects. Oversee material purity diagnostics, quarry stockpiles, and bulk volume transfers to ensure consistency.
                            </p>
                          </div>

                          <div className="bg-slate-950 rounded border border-slate-800 p-3.5 font-mono text-[10px]">
                            <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2">
                              <span className="text-slate-400">QUARRY STOCKPILES PROFILE</span>
                              <span className="text-emerald-500 font-bold">ACTIVE // v1.9</span>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                              <div className="bg-slate-900/50 p-2 rounded border border-slate-850">
                                <span className="text-[9px] text-slate-500 block">BASE COPPER</span>
                                <span className="text-[10px] font-bold text-slate-200">14.2k TONS</span>
                              </div>
                              <div className="bg-slate-900/50 p-2 rounded border border-slate-850">
                                <span className="text-[9px] text-slate-500 block">GRANITE</span>
                                <span className="text-[10px] font-bold text-slate-200">8.9k TONS</span>
                              </div>
                              <div className="bg-slate-900/50 p-2 rounded border border-slate-850">
                                <span className="text-[9px] text-slate-500 block">SILICA MATCH</span>
                                <span className="text-[10px] font-bold text-emerald-400">98.2% PURITY</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activePreviewModule === "MAMI_WATA" && (
                        <div className="space-y-4">
                          <div>
                            <span className="text-amber-500 font-bold tracking-widest text-xs">MAMI_WATA</span>
                            <p className="text-[10px] text-slate-400 mt-1 uppercase">Water Infrastructure</p>
                            <p className="text-slate-450 text-xs leading-relaxed mt-2 font-sans font-hairline">
                              Coordinate hydraulic pipelines and water infrastructure needs for complex building sites. Handle sewage grid feeds, structural foundation pumping rates, and main valve flow integrity.
                            </p>
                          </div>

                          <div className="bg-slate-950 rounded border border-slate-800 p-3.5 font-mono text-[10px]">
                            <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2">
                              <span className="text-slate-400">PRESSURE GAUGING MATRIX</span>
                              <span className="text-blue-400 font-bold">SYNCING // v3.0</span>
                            </div>
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span>PUMP VALVE B4 PRESSURE</span>
                                <span className="text-cyan-400 font-bold">4.21 BAR</span>
                              </div>
                              <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden border border-slate-800">
                                <div className="bg-cyan-500 h-full" style={{ width: "70%" }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activePreviewModule === "RA" && (
                        <div className="space-y-4">
                          <div>
                            <span className="text-amber-500 font-bold tracking-widest text-xs">RA</span>
                            <p className="text-[10px] text-slate-400 mt-1 uppercase">Clean Power Planning</p>
                            <p className="text-slate-450 text-xs leading-relaxed mt-2 font-sans font-hairline">
                              Integrate clean power planning for sustainable site energy systems. Coordinate solar array planning, carbon mitigation quotas, active microgrid batteries and generator feeds.
                            </p>
                          </div>

                          <div className="bg-slate-950 rounded border border-slate-800 p-3.5 font-mono text-[10px]">
                            <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2">
                              <span className="text-slate-400">PHOTOVOLTAIC CELLS ARRAY</span>
                              <span className="text-emerald-500 font-bold">STABLE // v2.1</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-slate-900/50 p-2 rounded border border-slate-850">
                                <span className="text-[9px] text-slate-500 block">DAILY YIELD</span>
                                <span className="text-slate-100 font-bold">2.68 MW/h</span>
                              </div>
                              <div className="bg-slate-900/50 p-2 border border-slate-850 rounded">
                                <span className="text-[9px] text-slate-500 block">CARBON OFFSET</span>
                                <span className="text-emerald-400 font-bold">42 T CO2</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="border-t border-slate-800 pt-4 mt-4 flex justify-between items-center bg-slate-900">
                        <span className="text-[10px] text-slate-500 font-mono">
                          All systems integrate with PTAH Unified Analytics.
                        </span>
                        <button
                          onClick={onLaunchApp}
                          className="text-xs font-mono font-medium text-amber-500 hover:text-amber-400 flex items-center gap-1 group cursor-pointer"
                        >
                          Deploy Active Submodule Dashboard
                          <ArrowRight className="w-3.5 h-3.5 transition-transform" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeLandingTab === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              {/* Contact Form Section */}
              <section className="py-12 bg-slate-900/20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-12">
                    <h3 className="text-[10px] font-mono text-amber-500 uppercase tracking-[0.2em] mb-3 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span> Operations Link
                    </h3>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase mb-4">
                      Secure Communications Uplink
                    </h2>
                    <p className="text-slate-400 text-xs max-w-xl mx-auto">
                      Initiate transmission with the engineering and compliance team of the Sans Mercantile Constellation.
                    </p>
                  </div>

                  <div id="contact-form-container" className="bg-slate-900 border border-slate-800 rounded p-6 relative overflow-hidden">
                    {isSuccess ? (
                      <div className="text-center py-12">
                        <div className="w-12 h-12 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-500/30">
                          <Check className="w-6 h-6" />
                        </div>
                        <h4 className="font-sans font-bold text-xl text-slate-100 mb-2 uppercase">Transmission Established</h4>
                        <p className="text-slate-400 text-xs max-w-md mx-auto mb-6 leading-relaxed font-sans font-hairline">
                          Thank you for reaching out. A PTAH infrastructure coordinator and safety officer will evaluate your project scope immediately.
                        </p>
                        <div className="text-xs font-mono text-slate-500">
                          SANS_REF_TOKEN: MSG-{Math.floor(Math.random() * 90000) + 10000}
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase">Official / Agent Name</label>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-800 rounded px-3.5 py-2.5 text-xs text-slate-100 focus:outline-hidden focus:border-amber-500 transition-all font-sans"
                              placeholder="e.g. Commander Imhotep"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase">Email Destination</label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-800 rounded px-3.5 py-2.5 text-xs text-slate-100 focus:outline-hidden focus:border-amber-500 transition-all font-sans"
                              placeholder="e.g. imhotep@sans-mercantile.com"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase">Organization / Authority</label>
                            <input
                              type="text"
                              required
                              value={formData.company}
                              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-800 rounded px-3.5 py-2.5 text-xs text-slate-100 focus:outline-hidden focus:border-amber-500 transition-all font-sans"
                              placeholder="Sans Mercantile Constellation"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase">Infrastructure Matrix</label>
                            <select
                              value={formData.projectType}
                              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-800 rounded px-3.5 py-2.5 text-xs text-slate-300 focus:outline-hidden focus:border-amber-500 transition-all font-sans"
                            >
                              <option value="Infrastructure">Civil Infrastructure & Roads</option>
                              <option value="HAPI Logistics">HAPI Core Logistics</option>
                              <option value="HATHOR Resources">HATHOR Georadial Materials</option>
                              <option value="MAMI_WATA Hydraulics">MAMI_WATA Hydraulics</option>
                              <option value="RA Power Grid">RA Clean Energy Power Systems</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase">Communication Message</label>
                          <textarea
                            rows={4}
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded px-3.5 py-2.5 text-xs text-slate-100 focus:outline-hidden focus:border-amber-500 transition-all font-sans leading-relaxed"
                            placeholder="Describe your site parameters, regulatory compliance conflicts, or materials logistics bottlenecks..."
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 text-slate-950 font-sans font-bold py-3 text-xs uppercase tracking-tight rounded flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                              Establishing Secure Uplink...
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              Establish Uplink Transmission
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Landing Footer */}
      <footer className="px-6 py-4 bg-black flex flex-col md:flex-row justify-between items-center text-[9px] font-mono text-slate-600 gap-4 shrink-0 z-30">
        <span>© 2026 PTAH INFRASTRUCTURE INTELLIGENCE</span>
        <div className="flex space-x-4 uppercase">
          <span>Encrypted Protocol S-12</span>
          <span className="text-slate-500">Sans Mercantile Constellation Group</span>
        </div>
      </footer>
    </div>
  );
}
