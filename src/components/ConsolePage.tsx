import React, { useState, useEffect, useRef, FormEvent } from "react";
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
  RotateCcw,
  Sparkles,
  AlertTriangle,
  FileSpreadsheet,
  Settings,
  X,
  Play,
  Database,
  ArrowLeftRight,
  Gauge,
  HelpCircle,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage, BudgetLineItem, ComplianceAuditReport, HapiDelivery, HathorSupplyNode, MamiWataValves, RaPowerGrid } from "../types";
import AnimatedEmoticon from "./AnimatedEmoticon";

// Clean simple markdown text formatter to avoid complex external parse errors on React 19
function SmartMarkdown({ text }: { text: string }) {
  if (!text) return null;
  
  const lines = text.split("\n");
  return (
    <div className="space-y-2 font-sans text-neutral-300 text-sm leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        
        // Headers
        if (trimmed.startsWith("###")) {
          return (
            <h5 key={idx} className="font-display font-bold text-neutral-100 mt-4 border-b border-neutral-800 pb-1">
              {trimmed.replace("###", "")}
            </h5>
          );
        }
        if (trimmed.startsWith("##")) {
          return (
            <h4 key={idx} className="font-display font-bold text-amber-400 text-base mt-4">
              {trimmed.replace("##", "")}
            </h4>
          );
        }
        if (trimmed.startsWith("#")) {
          return (
            <h3 key={idx} className="font-display font-bold text-amber-500 text-lg mt-5">
              {trimmed.replace("#", "")}
            </h3>
          );
        }

        // List items
        if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
          const content = trimmed.substring(1).trim();
          return (
            <ul key={idx} className="list-disc pl-5 space-y-1">
              <li className="text-neutral-300">
                {parseInlineBold(content)}
              </li>
            </ul>
          );
        }
        if (/^\d+\./.test(trimmed)) {
          const content = trimmed.replace(/^\d+\./, "").trim();
          return (
            <ol key={idx} className="list-decimal pl-5 space-y-1">
              <li className="text-neutral-300">
                {parseInlineBold(content)}
              </li>
            </ol>
          );
        }

        // Code block indicator
        if (trimmed.startsWith("```")) {
          return null; // Skip markdown lines
        }

        // Regular line
        return trimmed ? (
          <p key={idx} className="my-1.5 text-neutral-300">
            {parseInlineBold(trimmed)}
          </p>
        ) : (
          <div key={idx} className="h-2" />
        );
      })}
    </div>
  );
}

// Inline formatting helper for **bold text**
function parseInlineBold(text: string) {
  const parts = text.split(/\*\*([\s\S]*?)\*\*/g);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return (
        <strong key={i} className="text-white font-medium bg-neutral-800 px-1 py-0.5 rounded-sm font-mono text-xs">
          {part}
        </strong>
      );
    }
    return part;
  });
}

interface ConsoleProps {
  onBackToLanding: () => void;
}

export default function ConsolePage({ onBackToLanding }: ConsoleProps) {
  // Navigation tabs of console
  const [activeTab, setActiveTab] = useState<"dashboard" | "chat" | "compliance" | "budget" | "constellation">("dashboard");
  // Sub-constellation active system tab
  const [activeConstellationSubTab, setActiveConstellationSubTab] = useState<"HAPI" | "HATHOR" | "MAMI_WATA" | "RA">("HAPI");

  // Chat Copywriter States
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "intro",
      role: "model",
      text: "Uplink Secure. PTAH Infrastructure Brain online.\n\nAsk me any operational safety, compliance rules, materials shipping matrices, hydraulic configurations (MAMI_WATA), clean-energy (RA) structures or mineral ledger limits (HATHOR).",
      createdAt: new Date().toISOString()
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Compliance states
  const [complianceScenario, setComplianceScenario] = useState("Worker operating heavy excavation loader near an unsloped trench depth 1.8 meters without a competent soils observer present.");
  const [complianceTarget, setComplianceTarget] = useState("General Site Operations");
  const [complianceAuditResult, setComplianceAuditResult] = useState<ComplianceAuditReport | null>(null);
  const [isComplianceLoading, setIsComplianceLoading] = useState(false);

  // Default Line Items list for Budget Variance Optimizer
  const [budgetItems, setBudgetItems] = useState<BudgetLineItem[]>([
    { id: "1", name: "High-Tensile Rebar Carbon-Steel Preform", category: "Materials", currentCost: 45000, status: "Active" },
    { id: "2", name: "Class III Hydraulic Excavators Operations (4-week leasing)", category: "Equipment", currentCost: 28000, status: "Active" },
    { id: "3", name: "Potable Hydraulic Grade Ductile Piping Lines", category: "Materials", currentCost: 19500, status: "Active" },
    { id: "4", name: "Structural Soil Compaction Testing and Geologist Permitting", category: "Permits", currentCost: 12400, status: "Active" },
    { id: "5", name: "Site Off-Grid Photovoltaic Lithium Storage Modules planning", category: "Materials", currentCost: 34000, status: "Active" }
  ]);
  const [isBudgetLoading, setIsBudgetLoading] = useState(false);
  const [budgetCommentary, setBudgetCommentary] = useState("Awaiting optimization parameters. Click optimized to analyze material price hedges across Sans Mercantile network.");
  const [newBudgetItem, setNewBudgetItem] = useState({ name: "", category: "Materials" as any, currentCost: 0 });

  // Operational Constellations local dynamic elements
  
  // HAPI Logistics deliveries
  const [hapiDeliveries, setHapiDeliveries] = useState<HapiDelivery[]>([
    { id: "D-102", materialName: "Aggregates - Grade A Sand", quantity: "450 t", source: "HATHOR Pit-3", destination: "Suez Base Site", status: "In Transit", driver: "Nils S.", eta: "14 Mins" },
    { id: "D-103", materialName: "Structural Steel Frame Preforms", quantity: "180 t", source: "S Constellation Dock B", destination: "Giza Hub Alpha", status: "Dispatched", driver: "Kofi A.", eta: "45 Mins" },
    { id: "D-104", materialName: "Potable Hydraulic Pipes", quantity: "40 Units", source: "Port Said Logistic Arch", destination: "Giza Hub Beta", status: "Delivered", driver: "Mona H.", eta: "Delivered" }
  ]);
  const [newDelivery, setNewDelivery] = useState({ materialName: "", quantity: "", source: "HATHOR Pit-3", destination: "Suez Base" });

  // HATHOR Geological Nodes
  const [hathorNodes] = useState<HathorSupplyNode[]>([
    { id: "H-1", siteName: "Quarry Sinai North", resourceType: "Limestone", dailyYield: 1200, purity: 98.4, freightStatus: "Optimal", lastTonnageReport: "1,180 Tons" },
    { id: "H-2", siteName: "Suez Ore Arch", resourceType: "Copper Ore", dailyYield: 450, purity: 89.2, freightStatus: "Critical Alert", lastTonnageReport: "310 Tons" },
    { id: "H-3", siteName: "Eastern Desert Shaft VII", resourceType: "Granite", dailyYield: 800, purity: 94.6, freightStatus: "Sufficient", lastTonnageReport: "790 Tons" }
  ]);

  // MAMI_WATA valves
  const [mamiWataValves, setMamiWataValves] = useState<MamiWataValves[]>([
    { id: "MW-V1", valveName: "Intake Water Pressure Main", pressure: 4.8, flowRate: 1.2, status: "Open", integrityPct: 94 },
    { id: "MW-V2", valveName: "Sewer Grid Outlet Bypass", pressure: 1.4, flowRate: 0.3, status: "Closed", integrityPct: 99 },
    { id: "MW-V3", valveName: "Concrete Mixer Hydraulic Injector", pressure: 5.2, flowRate: 0.8, status: "Open", integrityPct: 88 }
  ]);

  // RA Solar grid and dynamic meters
  const [raPowerField, setRaPowerField] = useState<RaPowerGrid>({
    arrayName: "Suez Site Solar Fields (Primary)",
    solarYieldKw: 1280,
    batteryPercent: 86,
    gridPowerStatus: "Nominal",
    siteConsumptionKw: 940
  });

  // Simulated live event logger feed
  const [liveTerminalLogs, setLiveTerminalLogs] = useState<string[]>([
    "[SYSTEM SETUP] PTAH Unified Workspace online.",
    "Connecting subdivisions HAPI, HATHOR, MAMI_WATA, RA...",
    "Telemetry established. Safety Score nominal at 94%.",
    "HAPI Logistics reporting: D-104 Delivered successfully.",
  ]);

  // Handle auto scroll in chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isChatLoading]);

  // Trigger simulated logger feeds periodically
  useEffect(() => {
    const logs = [
      "[MAMI_WATA] Pump ValveMW-V1 automated stability audit complete.",
      "[RA Power] Battery buffer surplus activated. Net feed -340 kW.",
      "[HATHOR] Tonnage report updated at Sinai: nominal throughput.",
      "[HAPI] Scheduler triggered secondary aggregate dispatch request.",
      "[PTAH Guard] SafeSite computer vision model triggered: harness compliance high.",
    ];
    let interval = setInterval(() => {
      const idx = Math.floor(Math.random() * logs.length);
      setLiveTerminalLogs(prev => [
        `[${new Date().toLocaleTimeString()}] ${logs[idx]}`,
        ...prev.slice(0, 8)
      ]);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  // ----------------------------------------------------
  // Backend API Call Handlers
  // ----------------------------------------------------

  const handleSendMessage = async (customPrompt?: string) => {
    const activePrompt = customPrompt || chatInput;
    if (!activePrompt.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      text: activePrompt,
      createdAt: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setIsChatLoading(true);

    try {
      // Map history correctly for Express API
      const history = chatMessages.map(msg => ({
        role: msg.role,
        text: msg.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: activePrompt, history })
      });

      const data = await res.json();
      const modelMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "model",
        text: data.text || "Operated fallback response: PTAH has completed task analysis.",
        createdAt: new Date().toISOString()
      };
      setChatMessages(prev => [...prev, modelMsg]);
    } catch (e: any) {
      console.error(e);
      setChatMessages(prev => [...prev, {
        id: Math.random().toString(),
        role: "model",
        text: `Error connecting to PTAH system: ${e.message || "Failed communication. Verify local server.ts config was loaded."}`,
        createdAt: new Date().toISOString()
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleRunComplianceAudit = async () => {
    if (!complianceScenario.trim()) return;
    setIsComplianceLoading(true);

    try {
      const res = await fetch("/api/compliance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario: complianceScenario, systemModule: complianceTarget })
      });

      const data = await res.json();
      setComplianceAuditResult({
        scenario: complianceScenario,
        report: data.report || "Audit log generated.",
        score: data.score || 85,
        severity: data.severity || "Medium",
        violations: data.violations || ["OSHA generic standard alert"],
        corrections: data.corrections || ["Set structural parameters on site"],
        systemModule: complianceTarget,
        createdAt: new Date().toISOString()
      });
    } catch (e) {
      console.error(e);
      // Hard fallback if backend call fails
      setComplianceAuditResult({
        scenario: complianceScenario,
        report: "### Error generating compliance analysis. The backend request failed -- check server connectivity and AWS credentials.\n\n*Emergency Fallback Guideline:* Ensure proper structural shielding on excavations and verify active crane lift weights.",
        score: 41,
        severity: "Critical",
        violations: ["API Connect Failure", "Harness check unreachable"],
        corrections: ["Verify the server can reach AWS Bedrock (credentials, network, region)."],
        systemModule: complianceTarget,
        createdAt: new Date().toISOString()
      });
    } finally {
      setIsComplianceLoading(false);
    }
  };

  const handleOptimizeBudget = async () => {
    setIsBudgetLoading(true);
    try {
      const res = await fetch("/api/budget-optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: budgetItems })
      });

      const data = await res.json();
      if (data.optimizedItems) {
        setBudgetItems(data.optimizedItems.map((item: any) => ({
          ...item,
          status: "Optimized"
        })));
        setBudgetCommentary(data.commentary || "Sourcing optimized securely across mining and production nodes.");
      }
    } catch (e) {
      console.error(e);
      alert("Error optimizing materials budget. Check console server connection.");
    } finally {
      setIsBudgetLoading(false);
    }
  };

  const handleAddBudgetItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBudgetItem.name || newBudgetItem.currentCost <= 0) return;
    const item: BudgetLineItem = {
      id: Math.random().toString(),
      name: newBudgetItem.name,
      category: newBudgetItem.category,
      currentCost: newBudgetItem.currentCost,
      status: "Active"
    };
    setBudgetItems(prev => [...prev, item]);
    setNewBudgetItem({ name: "", category: "Materials", currentCost: 0 });
  };

  // Add Delivery
  const handleDispatchHapiDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDelivery.materialName || !newDelivery.quantity) return;
    const delivery: HapiDelivery = {
      id: `D-${Math.floor(Math.random() * 900) + 100}`,
      materialName: newDelivery.materialName,
      quantity: newDelivery.quantity,
      source: newDelivery.source,
      destination: newDelivery.destination,
      status: "Dispatched",
      driver: "Operator Assignee",
      eta: "35 Mins"
    };
    setHapiDeliveries(prev => [delivery, ...prev]);
    setNewDelivery({ materialName: "", quantity: "", source: "HATHOR Pit-3", destination: "Suez Base" });
    setLiveTerminalLogs(prev => [`[LOGISTICS DISPATCHED] Ordered delivery ${delivery.id} for ${delivery.materialName}`, ...prev]);
  };

  // Adjust pressure slider mami wata
  const handleUpdateValveState = (id: string, pressure: number) => {
    setMamiWataValves(prev => prev.map(v => {
      if (v.id === id) {
        return {
          ...v,
          pressure: Number(pressure),
          flowRate: Number((pressure * 0.25).toFixed(2)),
          status: pressure > 0 ? "Open" : "Closed"
        };
      }
      return v;
    }));
  };

  // Ra solar generation slider simulation
  const handleRaPowerTweak = (val: number) => {
    setRaPowerField(prev => ({
      ...prev,
      solarYieldKw: val,
      gridPowerStatus: val > prev.siteConsumptionKw ? "Surplus Active" : "Low Charging"
    }));
  };

  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen font-sans flex flex-col antialiased">
      {/* Structural layout banner for the workspace */}
      <nav id="console-header" className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 shrink-0 z-30">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" className="w-9 h-9 animate-[pulse_3s_ease-in-out_infinite]" alt="PTAH Logo" referrerPolicy="no-referrer" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-sans font-extrabold text-base text-slate-200 tracking-tight">Infrastructure Intelligence Console</h1>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-400 font-bold">UPLINK ACTIVE</span>
            </div>
            <p className="text-[10px] font-mono text-slate-500 tracking-wider">SANS MERCANTILE SYSTEM MATRIX</p>
          </div>
        </div>

        {/* Global Key Status Banner Indicators */}
        <div className="flex flex-wrap items-center gap-4 bg-slate-950/60 p-2 rounded border border-slate-800 font-mono text-slate-400 text-xs">
          <div className="px-3 py-1 border-r border-slate-800">
            <span className="text-slate-500 text-[10px] block font-mono">SITE SAFETY INTEGRITY</span>
            <span className="text-amber-500 font-bold flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
              94.8%
            </span>
          </div>
          <div className="px-3 py-1 border-r border-slate-800">
            <span className="text-slate-500 text-[10px] block">ACTIVE SENSORS</span>
            <span className="text-blue-400 font-bold leading-none">1,240 ONLINE</span>
          </div>
          <div className="px-3 py-1 mr-2">
            <span className="text-slate-500 text-[10px] block">SITE CO2 OFFSET</span>
            <span className="text-green-400 font-bold leading-none">38.4 TONS</span>
          </div>
          <button 
            id="exit-console-btn"
            onClick={onBackToLanding}
            className="text-xs bg-slate-900 hover:bg-slate-800 hover:text-white text-slate-400 font-sans border border-slate-800 py-1.5 px-3.5 rounded flex items-center gap-1.5 transition-all"
          >
            Exit Workspace
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* Primary Workspace container - Left side selectors, Right side active module viewport */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Module Sidebar Selector Menu */}
        <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-4 shrink-0 flex flex-col justify-between hidden md:flex">
          <div className="space-y-6">
            <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase block pl-2">CONTROL CENTERS</span>
            
            <nav className="space-y-1">
              <button
                id="tab-dashboard"
                onClick={() => setActiveTab("dashboard")}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-sans font-medium tracking-tight transition-all text-left ${
                  activeTab === "dashboard"
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Building2 className="w-4.5 h-4.5" />
                Unified Dashboard
              </button>

              <button
                id="tab-chat"
                onClick={() => setActiveTab("chat")}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-sans font-medium tracking-tight transition-all text-left ${
                  activeTab === "chat"
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Sparkles className="w-4.5 h-4.5" />
                PTAH Co-Pilot (AI)
              </button>

              <button
                id="tab-compliance"
                onClick={() => setActiveTab("compliance")}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-sans font-medium tracking-tight transition-all text-left ${
                  activeTab === "compliance"
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <ShieldAlert className="w-4.5 h-4.5" />
                AI Safety Scanner
              </button>

              <button
                id="tab-budget"
                onClick={() => setActiveTab("budget")}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-sans font-medium tracking-tight transition-all text-left ${
                  activeTab === "budget"
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10"
                    : "text-slate-400 hover:text-white hover:bg-slate-805"
                }`}
              >
                <Coins className="w-4.5 h-4.5" />
                Budget Optimizer
              </button>

              <button
                id="tab-constellation"
                onClick={() => setActiveTab("constellation")}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-sans font-medium tracking-tight transition-all text-left ${
                  activeTab === "constellation"
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Database className="w-4.5 h-4.5" />
                Constellation Subsystems
              </button>
            </nav>
          </div>

          {/* Running Terminal log feedback at bottom of sidebar */}
          <div className="bg-slate-950 border border-slate-800 rounded p-3 font-mono text-[10px] text-slate-400">
            <span className="text-slate-650 uppercase text-[9px] block mb-2 border-b border-slate-900 pb-1 flex items-center justify-between">
              Live Systems Feed
              <Clock className="w-2.5 h-2.5 text-slate-600" />
            </span>
            <div className="space-y-1.5 h-24 overflow-y-auto select-none overflow-x-hidden">
              {liveTerminalLogs.map((log, lIdx) => (
                <div key={lIdx} className="text-[10px] leading-tight text-slate-450 font-mono">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Small Navigation header for mobile screens */}
        <div className="md:hidden bg-slate-950 border-b border-slate-800 p-3 flex flex-wrap gap-2 justify-center">
          <button 
            onClick={() => setActiveTab("dashboard")} 
            className={`px-3 py-1.5 rounded-sm text-xs font-mono border ${activeTab === "dashboard" ? "bg-amber-500 text-slate-950 border-amber-500" : "bg-slate-900 text-slate-400 border-slate-800"}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab("chat")} 
            className={`px-3 py-1.5 rounded-sm text-xs font-mono border ${activeTab === "chat" ? "bg-amber-500 text-slate-950 border-amber-500" : "bg-slate-900 text-slate-400 border-slate-800"}`}
          >
            PTAH AI
          </button>
          <button 
            onClick={() => setActiveTab("compliance")} 
            className={`px-3 py-1.5 rounded-sm text-xs font-mono border ${activeTab === "compliance" ? "bg-amber-500 text-slate-950 border-amber-500" : "bg-slate-900 text-slate-400 border-slate-800"}`}
          >
            Safety
          </button>
          <button 
            onClick={() => setActiveTab("budget")} 
            className={`px-3 py-1.5 rounded-sm text-xs font-mono border ${activeTab === "budget" ? "bg-amber-500 text-slate-950 border-amber-500" : "bg-slate-900 text-slate-400 border-slate-800"}`}
          >
            Budget
          </button>
          <button 
            onClick={() => setActiveTab("constellation")} 
            className={`px-3 py-1.5 rounded-sm text-xs font-mono border ${activeTab === "constellation" ? "bg-amber-500 text-slate-950 border-amber-500" : "bg-slate-900 text-slate-400 border-slate-800"}`}
          >
            Sectors
          </button>
        </div>

        {/* Active main content workspace panels */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-950 relative">

          {/* 1. TAILORED DASHBOARD SCREEN */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Card headers */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-900 pb-4">
                <div>
                  <h2 className="font-sans font-bold text-2xl text-white uppercase">Engineering Command Dashboard</h2>
                  <p className="text-xs text-slate-400">Integrated site diagnostics for Suez Base Site Beta.</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-[10px] font-mono text-slate-500">LAST SYNCED: 19:52:57 UTC</span>
                </div>
              </div>

              {/* Grid bento box of quick analytics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Site Progress Card */}
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-slate-400">CONSTRUCTION TIMELINE PROGRESS</span>
                    <Clock className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="my-6">
                    <span className="font-sans text-4xl font-extrabold text-white">68.2%</span>
                    <span className="text-xs text-emerald-400 font-mono ml-2">▲ 1.4% ahead of pace</span>
                  </div>
                  <div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: "68%" }} />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2">
                      <span>START: FEB 2026</span>
                      <span>ETA: DEC 2026</span>
                    </div>
                  </div>
                </div>

                {/* OSHA Hazards/Compliance Gauge */}
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-slate-400 font-sans">PTAH INTEGRITY SCORE</span>
                    <AlertTriangle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="my-6 flex items-center justify-between gap-4">
                    <div className="flex items-baseline gap-2">
                      <span className="font-sans text-4xl font-extrabold text-slate-205">94 / 100</span>
                      <span className="text-xs text-emerald-400 font-mono">NOMINAL</span>
                    </div>
                    <AnimatedEmoticon score={94} size={48} />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans mt-2">
                    PTAH Computer Vision scanner shows harness compliance is high. 2 active scaffolding observations pending review.
                  </p>
                </div>

                {/* Sourcing/Budget Health Card */}
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-slate-400">SANS MERCANTILE FINANCE</span>
                    <Coins className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="my-6">
                    <span className="font-sans text-4xl font-extrabold text-white">$138,900</span>
                    <span className="text-xs text-blue-400 font-mono ml-2">Optimized Sourcing</span>
                  </div>
                  <div className="flex gap-2 justify-self-end mt-2">
                    <button 
                      onClick={() => setActiveTab("budget")}
                      className="text-xs hover:text-white text-blue-400 font-sans font-medium flex items-center gap-1 group"
                    >
                      Audit Materials Budget 
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Sub-constellations status blocks */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Integrated Systems Overview */}
                <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-6">
                  <h3 className="font-display font-bold text-lg text-neutral-100 mb-4 flex items-center gap-2">
                    <Database className="w-4.5 h-4.5 text-amber-500" />
                    Constellation Modules State
                  </h3>                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* HAPI Card */}
                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 hover:border-blue-500/20 transition-all flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-950/40 border border-blue-900/50 text-blue-400 rounded-lg">
                          <Truck className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-sans font-bold text-sm text-slate-200">HAPI Logistics</h4>
                          <p className="text-slate-500 text-[11px] font-mono">3 DELIVERIES IN TRANSIT</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => { setActiveTab("constellation"); setActiveConstellationSubTab("HAPI"); }}
                        className="text-slate-400 hover:text-white p-1"
                      >
                        <ArrowRight className="w-4.5 h-4.5" />
                      </button>
                    </div>

                    {/* HATHOR Card */}
                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 hover:border-emerald-500/20 transition-all flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-950/40 border border-emerald-900/50 text-emerald-400 rounded-lg">
                          <Layers className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-sans font-bold text-sm text-slate-200">HATHOR Supply</h4>
                          <p className="text-slate-505 text-[11px] font-mono">COPPER PURITY CODES OK</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => { setActiveTab("constellation"); setActiveConstellationSubTab("HATHOR"); }}
                        className="text-slate-400 hover:text-white p-1"
                      >
                        <ArrowRight className="w-4.5 h-4.5" />
                      </button>
                    </div>

                    {/* MAMI_WATA Card */}
                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 hover:border-cyan-500/20 transition-all flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-cyan-950/40 border border-cyan-900/50 text-cyan-400 rounded-lg">
                          <Droplet className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-sans font-bold text-sm text-slate-200">MAMI_WATA Hydro</h4>
                          <p className="text-slate-505 text-[11px] font-mono">VALVES: 4.8 BAR NOMINAL</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => { setActiveTab("constellation"); setActiveConstellationSubTab("MAMI_WATA"); }}
                        className="text-slate-400 hover:text-white p-1"
                      >
                        <ArrowRight className="w-4.5 h-4.5" />
                      </button>
                    </div>

                    {/* RA Card */}
                    <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 hover:border-amber-500/20 transition-all flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-950/40 border border-amber-900/50 text-amber-500 rounded-lg">
                          <Sun className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-sans font-bold text-sm text-slate-200">RA Solar Grid</h4>
                          <p className="text-slate-505 text-[11px] font-mono">BATTERY AT 86% CAP</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => { setActiveTab("constellation"); setActiveConstellationSubTab("RA"); }}
                        className="text-slate-400 hover:text-white p-1"
                      >
                        <ArrowRight className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-800 pt-6">
                    <h4 className="font-sans font-semibold text-slate-200 text-sm mb-3">AI Quick Actions Launchpad</h4>
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => { setActiveTab("chat"); handleSendMessage("What are the core environmental compliance rules for water works near excavation bases under MAMI_WATA guidelines?"); }}
                        className="bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs px-3 py-2 rounded text-amber-500 flex items-center gap-1 transition-all"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Hydraulics Compliance Advice
                      </button>
                      <button 
                        onClick={() => { setActiveTab("compliance"); setComplianceScenario("A hydraulic line has ruptured releasing standard coolant fluid into open soil excavation base 3 meters distance from trench slope."); }}
                        className="bg-slate-950 border border-slate-800 hover:border-slate-705 text-xs px-3 py-2 rounded text-red-500 flex items-center gap-1 transition-all"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        Scan Rupture Hazard Scenario
                      </button>
                    </div>
                  </div>
                </div>

                {/* Live Activity Stream feed */}
                <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-sans font-bold text-lg text-slate-200 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400" />
                      Compliance Audit Feed
                    </h3>

                    <div className="space-y-4">
                      <div className="border-l-2 border-emerald-500 pl-3 py-1 text-xs">
                        <span className="text-[10px] text-slate-500 font-mono block">OSHA CERTIFICATION</span>
                        <p className="text-slate-300 mt-0.5">Sinai South trench slope verified at 1.5:1 ratio.</p>
                      </div>
                      <div className="border-l-2 border-amber-500 pl-3 py-1 text-xs">
                        <span className="text-[10px] text-slate-500 font-mono block">LOGISTICS SCHEDULE</span>
                        <p className="text-slate-300 mt-0.5">HAPI scheduled aggregate trucks to avoid local center hours bottleneck.</p>
                      </div>
                      <div className="border-l-2 border-emerald-500 pl-3 py-1 text-xs">
                        <span className="text-[10px] text-slate-500 font-mono block">SUSTAINABILITY REPORT</span>
                        <p className="text-slate-300 mt-0.5">RA solar planning reached off-grid power target of 89%.</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveTab("compliance")}
                    className="w-full bg-slate-950 border border-slate-800 hover:bg-slate-800 hover:text-white transition-all text-xs font-semibold py-3 font-sans rounded-lg mt-6"
                  >
                    Initiate Custom Compliance Scanner
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* 2. CHAT / AI CO-ENGINEER PILOT */}
          {activeTab === "chat" && (
            <div className="flex flex-col h-[calc(110vh-220px)] min-h-[480px]">
              {/* Header inside chat */}
              <div className="border-b border-slate-900 pb-4 mb-4 flex justify-between items-center">
                <div>
                  <h2 className="font-sans font-bold text-2xl text-white flex items-center gap-2 uppercase">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    PTAH AI Co-Engineer
                  </h2>
                  <p className="text-xs text-slate-400">Query site schematics, safety specifications, and logistics chains.</p>
                </div>
                <button
                  onClick={() => setChatMessages([{
                    id: "intro",
                    role: "model",
                    text: "Terminal history wiped. PTAH AI online. How can I assist you with your project controls today?",
                    createdAt: new Date().toISOString()
                  }])}
                  className="p-1.5 text-slate-400 hover:text-white rounded border border-slate-800 hover:bg-slate-900"
                  title="Wipe Terminal Logs"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Chat View messages body */}
              <div className="flex-1 overflow-y-auto bg-slate-900 rounded-lg border border-slate-800 p-4 space-y-4 mb-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-3xl rounded p-4 ${
                      msg.role === "user"
                        ? "bg-amber-500 text-slate-950 font-sans font-bold"
                        : "bg-slate-950/80 text-slate-200 border border-slate-800"
                    }`}>
                      <div className="flex items-center justify-between border-b border-slate-800/50 pb-1 mb-2">
                        <span className="text-[9px] font-mono tracking-wider opacity-60 uppercase">
                          {msg.role === "user" ? "OFFICIAL AGENT" : "PTAH BRAIN NODE"}
                        </span>
                        <span className="text-[8px] font-mono opacity-50">
                          {new Date(msg.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                      
                      {msg.role === "user" ? (
                        <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                      ) : (
                        <SmartMarkdown text={msg.text} />
                      )}
                    </div>
                  </div>
                ))}
                
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-950/80 text-slate-200 border border-slate-800 max-w-sm rounded p-4 flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs font-mono tracking-widest text-amber-500">PTAH REASONING IN PROGRESS...</span>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Standard pre-cooked engineering prompt guidelines to boost usability */}
              <div className="mb-3">
                <span className="text-[10px] font-mono text-slate-500 block mb-1.5 uppercase">UPLINK SUGGESTIONS:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleSendMessage("Generate a compliant OSHA excavators site safety brief specifically concerning high rain conditions.")}
                    className="bg-slate-900 border border-slate-800 hover:border-slate-700 text-[11px] px-3 py-1.5 rounded text-slate-300 transition-all font-mono"
                  >
                    Generate Rain OSHA Brief
                  </button>
                  <button
                    onClick={() => handleSendMessage("Analyze structural steel rebar supply line bottlenecks. Suggest sustainable alternatives.")}
                    className="bg-slate-900 border border-slate-800 hover:border-slate-700 text-[11px] px-3 py-1.5 rounded text-slate-300 transition-all font-mono"
                  >
                    Supply Bottlenecks Help
                  </button>
                  <button
                    onClick={() => handleSendMessage("We are planning clean wind energy structures under RA module guidelines. How do we configure energy grid storage battery levels properly?")}
                    className="bg-slate-900 border border-slate-800 hover:border-slate-700 text-[11px] px-3 py-1.5 rounded text-slate-300 transition-all font-mono"
                  >
                    Configure Sustainable Energy Grid
                  </button>
                </div>
              </div>

              {/* Chat Input form footer */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Inquire on structural guidelines, active logistics, safety metrics..."
                  className="flex-1 bg-slate-900 text-slate-200 border border-slate-800 rounded px-4 py-3 text-sm focus:outline-hidden focus:border-amber-500"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isChatLoading}
                  className="bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 text-slate-950 font-sans font-bold px-5 py-3 rounded text-sm flex items-center gap-1 cursor-pointer transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                >
                  <Send className="w-4 h-4" />
                  Transmit
                </button>
              </div>
            </div>
          )}          {/* 3. COMPLIANCE SCANNER / HAZARD AUDITOR */}
          {activeTab === "compliance" && (
            <div className="space-y-8">
              <div className="border-b border-slate-900 pb-4">
                <h2 className="font-sans font-bold text-2xl text-white flex items-center gap-2 uppercase">
                  <ShieldAlert className="w-5 h-5 text-red-500" />
                  AI Site Compliance Scanners
                </h2>
                <p className="text-xs text-slate-400">Automated project integrity, safety metrics checks and OSHA subpart compliance reviews.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Audit Input Form panel on left */}
                <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded p-6 space-y-6">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">LAUNCH HAZARD AUDIT REPORT</span>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-2">TARGET OPERATION CONSTELLATION</label>
                    <select
                      value={complianceTarget}
                      onChange={(e) => setComplianceTarget(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2.5 text-xs text-slate-200 focus:outline-hidden focus:border-amber-500"
                    >
                      <option value="General Site Operations">General Site Excavations</option>
                      <option value="HAPI Logistics">HAPI Material Hauling Logistics</option>
                      <option value="HATHOR Quality">HATHOR Limestone Extraction</option>
                      <option value="MAMI_WATA Hydro">MAMI_WATA High-pressure Hydraulics</option>
                      <option value="RA Solar Energy">RA Clean Microgrid Power planning</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-2">SCENARIO DETAILS TO SCAN</label>
                    <textarea
                      rows={5}
                      value={complianceScenario}
                      onChange={(e) => setComplianceScenario(e.target.value)}
                      placeholder="Type details in full of a safety occurrence, layout query, water pipe diameter concern, soil moisture levels, or mineral purity variance..."
                      className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-xs text-slate-205 focus:outline-hidden focus:border-amber-500 font-sans leading-relaxed"
                    />
                  </div>

                  {/* Preset quick buttons to swap text quickly */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-500 block">QUICK HAZARD TEMPLATES:</span>
                    <button
                      type="button"
                      onClick={() => setComplianceScenario("Steel columns showing rust oxidation traces stored in a water drainage channel location near Egypt clay bed layout.")}
                      className="w-full text-left bg-slate-950 p-2 text-[11px] text-slate-405 border border-slate-800 hover:bg-slate-900 rounded font-mono truncate"
                    >
                      Steel Column Rust
                    </button>
                    <button
                      type="button"
                      onClick={() => setComplianceScenario("Excavator operator is lifting soil tonnage above payload guidelines. Tension pressure spikes to critical levels at MAMI_WATA valve indicators.")}
                      className="w-full text-left bg-slate-950 p-2 text-[11px] text-slate-405 border border-slate-800 hover:bg-slate-900 rounded font-mono truncate"
                    >
                      Excavator Valve Pressure Spikes
                    </button>
                  </div>

                  <button
                    onClick={handleRunComplianceAudit}
                    disabled={isComplianceLoading}
                    className="w-full bg-red-650 hover:bg-red-500 disabled:bg-slate-805 text-white font-sans font-bold py-3.5 rounded text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
                  >
                    {isComplianceLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Scanning Site Regulations...
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="w-4 h-4" />
                        Execute AI Compliance Scan
                      </>
                    )}
                  </button>
                </div>

                {/* Audit Output Result Panel on right */}
                <div className="lg:col-span-8 bg-slate-905 border border-slate-800 rounded p-6 min-h-[460px] relative flex flex-col justify-between">
                  {complianceAuditResult ? (
                    <div className="space-y-6">
                      {/* Safety Gauge Rating Panel */}
                      <div className="bg-slate-950 p-4 border border-slate-800 rounded flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                          <span className="text-[10px] font-mono text-slate-500 block uppercase">OSHA HAZARD AUDIT SCORE</span>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="font-sans text-3xl font-extrabold text-slate-205">
                              {complianceAuditResult.score} / 100
                            </span>
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                              complianceAuditResult.severity === "Critical" ? "bg-red-950/50 text-red-400 border border-red-900/40" :
                              complianceAuditResult.severity === "High" ? "bg-orange-950/50 text-orange-400 border border-orange-900/40" :
                              complianceAuditResult.severity === "Medium" ? "bg-yellow-950/50 text-yellow-400 border border-yellow-900/40" :
                              "bg-emerald-950/50 text-emerald-400 border border-emerald-900/40"
                            }`}>
                              {complianceAuditResult.severity.toUpperCase()} RISK LEVEL
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-505 mt-2 block">
                            Generated by PTAH Compliance Node // Suez-001
                          </span>
                        </div>

                        <div className="flex items-center gap-4">
                          <AnimatedEmoticon score={complianceAuditResult.score} size={54} />
                          
                          {/* Custom visual progress bar gauge */}
                          <div className="w-full md:w-36 bg-slate-900 h-4 rounded-full overflow-hidden border border-slate-800 p-0.5">
                            <div className={`h-full rounded-full transition-all duration-1000 ${
                              complianceAuditResult.score > 80 ? "bg-emerald-500" :
                              complianceAuditResult.score > 60 ? "bg-yellow-500" :
                              complianceAuditResult.score > 40 ? "bg-orange-500" :
                              "bg-red-500"
                            }`} style={{ width: `${complianceAuditResult.score}%` }} />
                          </div>
                        </div>
                      </div>

                      {/* Split infractions & step guidance */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-950 p-4 rounded border border-slate-800">
                          <span className="text-[10px] font-mono text-red-450 font-bold uppercase block mb-3">INFRACTIONS IDENTIFIED</span>
                          <ul className="space-y-2 text-xs text-slate-300 pl-4 list-disc font-sans leading-relaxed">
                            {complianceAuditResult.violations.map((violation, vIdx) => (
                              <li key={vIdx}>{violation}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-slate-950 p-4 rounded border border-slate-800">
                          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block mb-3">REMEDIATION ACTIONS</span>
                          <ul className="space-y-2 text-xs text-slate-300 pl-4 list-disc font-sans leading-relaxed">
                            {complianceAuditResult.corrections.map((correction, cIdx) => (
                              <li key={cIdx}>{correction}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Main Markdown explanation */}
                      <div className="border-t border-slate-850 pt-6">
                        <SmartMarkdown text={complianceAuditResult.report} />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-24 my-auto flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded flex items-center justify-center text-slate-600 mb-4 animate-pulse">
                        <ShieldAlert className="w-8 h-8 font-sans" />
                      </div>
                      <h3 className="font-sans font-bold text-lg text-slate-350">Awaiting Hazard Scan Uplink</h3>
                      <p className="text-slate-500 text-xs max-w-sm mt-1 leading-relaxed">
                        Input site coordinates, machinery details, soil measurements, or worker status logs to compile an AI-powered safety integrity report.
                      </p>
                    </div>
                  )}

                  <div className="border-t border-slate-800/60 pt-4 flex justify-between text-[11px] font-mono text-slate-500">
                    <span>Core scanning safety engine active.</span>
                    <span>SANS_REGULATE_MATRIX</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 4. BUDGET OPTIMIZER */}
          {activeTab === "budget" && (
            <div className="space-y-8">
              <div className="border-b border-slate-900 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="font-sans font-bold text-2xl text-white flex items-center gap-2 uppercase">
                    <Coins className="w-5 h-5 text-emerald-550" />
                    AI Materials Budget & Sourcing Optimizer
                  </h2>
                  <p className="text-xs text-slate-400">Track raw mineral costs, calculate waste variance, and target sustainable sourcing avenues.</p>
                </div>

                <button
                  onClick={handleOptimizeBudget}
                  disabled={isBudgetLoading}
                  className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-805 text-white font-sans font-bold px-5 py-3 rounded text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                >
                  {isBudgetLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Optimizing Materials Ledger...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Optimize Materials Budget 
                    </>
                  )}
                </button>
              </div>

              {/* Add Custom Budget Item inline layout */}
              <div className="bg-slate-900 border border-slate-800 rounded p-5">
                <span className="text-[10px] font-mono text-slate-400 block mb-3 uppercase">Add Material Sourcing Inquiry Line</span>
                
                <form onSubmit={handleAddBudgetItem} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-mono text-slate-500 mb-1">MATERIAL / ITEM NAME</label>
                    <input
                      type="text"
                      required
                      value={newBudgetItem.name}
                      onChange={(e) => setNewBudgetItem({ ...newBudgetItem, name: e.target.value })}
                      placeholder="e.g. Sinai Sourced Recycled Limestone Aggregate"
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-hidden focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 mb-1">CATEGORY</label>
                    <select
                      value={newBudgetItem.category}
                      onChange={(e) => setNewBudgetItem({ ...newBudgetItem, category: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-300 focus:outline-hidden focus:border-amber-500"
                    >
                      <option value="Materials">Materials</option>
                      <option value="Equipment">Equipment</option>
                      <option value="Labor">Labor</option>
                      <option value="Permits">Permits</option>
                      <option value="Logistics">Logistics</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-500 mb-1">CURRENT COST ($)</label>
                    <input
                      type="number"
                      required
                      value={newBudgetItem.currentCost || ""}
                      onChange={(e) => setNewBudgetItem({ ...newBudgetItem, currentCost: Number(e.target.value) })}
                      placeholder="Cost in USD"
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-hidden"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-sans font-bold py-2.5 rounded text-xs transition-all border border-slate-705 cursor-pointer"
                  >
                    Append Line Item
                  </button>
                </form>
              </div>

              {/* Main table and comments panel */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full font-mono text-xs text-left">
                      <thead className="bg-slate-950 border-b border-slate-800 text-slate-500 text-[10px] uppercase">
                        <tr>
                          <th className="px-4 py-3">Item Descriptor</th>
                          <th className="px-4 py-3">Category</th>
                          <th className="px-4 py-3 text-right font-bold">Standard Cost</th>
                          <th className="px-4 py-3 text-right font-bold text-amber-500">Optimized Cost</th>
                          <th className="px-4 py-3 text-right font-bold text-red-400">Waste Metric</th>
                          <th className="px-4 py-3 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {budgetItems.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-800/40">
                            <td className="px-4 py-4.5 font-sans font-medium text-slate-200 max-w-[220px]">
                              {item.name}
                              {item.procurementStrategy && (
                                <span className="block text-[10px] font-mono text-slate-500 mt-1.5 leading-relaxed bg-slate-950/60 p-2 border border-slate-800 rounded-sm">
                                  {item.procurementStrategy}
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-4.5">
                              <span className="bg-slate-950 border border-slate-800 px-2 py-0.5 text-[10px] rounded-sm text-slate-400">
                                {item.category.toUpperCase()}
                              </span>
                            </td>
                            <td className="px-4 py-4.5 text-right font-bold">${item.currentCost.toLocaleString()}</td>
                            <td className="px-4 py-4.5 text-right font-bold text-amber-500">
                              {item.suggestedCost ? `$${item.suggestedCost.toLocaleString()}` : "—"}
                            </td>
                            <td className="px-4 py-4.5 text-right font-bold text-red-450 font-sans">
                              {item.wasteMetric ? `$${item.wasteMetric.toLocaleString()}` : "—"}
                            </td>
                            <td className="px-4 py-4.5 text-center">
                              <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded border font-bold ${
                                item.status === "Optimized"
                                  ? "bg-emerald-950/50 text-emerald-400 border-emerald-950/40"
                                  : "bg-slate-950 text-slate-505 border-slate-800"
                              }`}>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Sourcing commentary */}
                <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded p-6 relative flex flex-col justify-between min-h-[310px]">
                  <div>
                    <h3 className="font-sans font-bold text-base text-slate-200 mb-3 flex items-center gap-1.5 uppercase">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      PTAH AI Sourcing Advice
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans font-hairline">
                      {budgetCommentary}
                    </p>
                  </div>
                  
                  <div className="border-t border-slate-800 pt-4 mt-6">
                    <div className="flex justify-between text-xs font-mono text-slate-500">
                      <span>PROJECT OUTLAY:</span>
                      <span className="text-white font-bold font-sans">
                        ${budgetItems.reduce((acc, current) => acc + (current.suggestedCost || current.currentCost), 0).toLocaleString()}
                      </span>
                    </div>
                    {budgetItems.some(i => i.wasteMetric) && (
                      <div className="flex justify-between text-xs font-mono text-red-400 mt-1 font-bold">
                        <span>TOTAL AI SAVINGS:</span>
                        <span className="font-sans">
                          ${budgetItems.reduce((acc, current) => acc + (current.wasteMetric || 0), 0).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 5. CONSTELLATION SECTORS (HAPI, HATHOR, MAMI_WATA, RA) */}
          {activeTab === "constellation" && (
            <div className="space-y-8">
              
              {/* Subdivision Header Selector Bar */}
              <div className="border-b border-slate-900 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="font-sans font-bold text-2xl text-white flex items-center gap-2 uppercase">
                    <Database className="w-5 h-5 text-amber-500" />
                    Subdivisions Matrix Controls
                  </h2>
                  <p className="text-xs text-slate-400">Direct parameter integration and live control levers for construction subsystems.</p>
                </div>

                {/* Local pill buttons */}
                <div className="flex flex-wrap gap-1.5 bg-slate-900 p-1.5 border border-slate-800 rounded text-xs font-mono">
                  <button
                    onClick={() => setActiveConstellationSubTab("HAPI")}
                    className={`px-3 py-1.5 rounded font-bold transition-all ${activeConstellationSubTab === "HAPI" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"}`}
                  >
                    HAPI Logistics
                  </button>
                  <button
                    onClick={() => setActiveConstellationSubTab("HATHOR")}
                    className={`px-3 py-1.5 rounded font-bold transition-all ${activeConstellationSubTab === "HATHOR" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"}`}
                  >
                    HATHOR Mines
                  </button>
                  <button
                    onClick={() => setActiveConstellationSubTab("MAMI_WATA")}
                    className={`px-3 py-1.5 rounded font-bold transition-all ${activeConstellationSubTab === "MAMI_WATA" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"}`}
                  >
                    MAMI_WATA Hydro
                  </button>
                  <button
                    onClick={() => setActiveConstellationSubTab("RA")}
                    className={`px-3 py-1.5 rounded font-bold transition-all ${activeConstellationSubTab === "RA" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"}`}
                  >
                    RA Solar Grid
                  </button>
                </div>
              </div>

              {/* ACTIVE SUB-TAB VIEWPORT PANEL */}
              <div className="bg-slate-900 border border-slate-800 rounded p-6">
                
                {/* A. HAPI Subsystem */}
                {activeConstellationSubTab === "HAPI" && (
                  <div className="space-y-8">
                    <div className="flex justify-between border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-blue-400 text-xs font-mono block">AUTOMATED SHIPPING LANES</span>
                        <h3 className="font-sans text-xl font-bold text-white mt-1">HAPI Live Material Deliveries</h3>
                      </div>
                      <span className="text-xs text-slate-500 font-mono self-end">SANS_REF_HAPI // MATRIX CODE</span>
                    </div>

                    {/* Dispatch Delivery Form */}
                    <div className="bg-slate-950 p-4 rounded border border-slate-850">
                      <h4 className="font-sans text-xs font-bold text-slate-400 uppercase mb-3 text-left">Schedule Rapid Material Freight lease</h4>
                      <form onSubmit={handleDispatchHapiDelivery} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div>
                          <label className="block text-[9px] font-mono text-slate-500 mb-1">AGGREGATES / RAW MATERIAL</label>
                          <input
                            type="text"
                            required
                            value={newDelivery.materialName}
                            onChange={(e) => setNewDelivery({ ...newDelivery, materialName: e.target.value })}
                            placeholder="e.g. Sinai Fine Quartz Sand"
                            className="w-full bg-slate-900 border border-slate-800 px-3 py-2 text-xs rounded text-slate-200"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono text-slate-505 mb-1">TOTAL QUANTITY (Tons/Units)</label>
                          <input
                            type="text"
                            required
                            value={newDelivery.quantity}
                            onChange={(e) => setNewDelivery({ ...newDelivery, quantity: e.target.value })}
                            placeholder="e.g. 240 t"
                            className="w-full bg-slate-900 border border-slate-800 px-3 py-2 text-xs rounded text-slate-200"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono text-slate-505 mb-1">SOURCE EXTRACTION QUARRY</label>
                          <select
                            value={newDelivery.source}
                            onChange={(e) => setNewDelivery({ ...newDelivery, source: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 px-3 py-2 text-xs rounded text-slate-300"
                          >
                            <option value="HATHOR Sinai Mine VII">HATHOR Sinai Mine VII</option>
                            <option value="HATHOR Pit-3">HATHOR Limestone Pit-3</option>
                            <option value="SConstellation Suez Dock B">S Constellation Suez Dock B</option>
                          </select>
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-sans font-bold py-2.5 rounded text-xs transition-all cursor-pointer shadow-[0_0_15px_rgba(37,99,235,0.15)]"
                        >
                          Dispatch Aggregate Truck
                        </button>
                      </form>
                    </div>

                    {/* Shipments Table List */}
                    <div className="overflow-x-auto border border-slate-800 rounded bg-slate-950">
                      <table className="w-full font-mono text-xs text-left">
                        <thead className="bg-slate-950 text-slate-500 text-[10px] border-b border-slate-800">
                          <tr>
                            <th className="p-3">DELID</th>
                            <th className="p-3">Item Name</th>
                            <th className="p-3">Volume</th>
                            <th className="p-3">Freight Track</th>
                            <th className="p-3">Destination</th>
                            <th className="p-3">Leased Operator</th>
                            <th className="p-3 font-bold text-blue-400">ETA Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {hapiDeliveries.map((del) => (
                            <tr key={del.id} className="hover:bg-slate-900/60 transition-colors">
                              <td className="p-3 font-bold text-slate-300">{del.id}</td>
                              <td className="p-3 font-sans font-medium text-slate-200">{del.materialName}</td>
                              <td className="p-3">{del.quantity}</td>
                              <td className="p-3 text-slate-400">{del.source}</td>
                              <td className="p-3 text-slate-400">{del.destination}</td>
                              <td className="p-3 text-slate-500">{del.driver}</td>
                              <td className="p-3">
                                <span className={`font-bold uppercase text-[10px] ${
                                  del.status === "Delivered" ? "text-emerald-400" : "text-blue-400 animate-pulse"
                                }`}>
                                  {del.eta}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* B. HATHOR Subsystem */}
                {activeConstellationSubTab === "HATHOR" && (
                  <div className="space-y-6">
                    <div className="flex justify-between border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-emerald-400 text-xs font-mono block">SANS_GEOLOGICAL_RESOURCES</span>
                        <h3 className="font-sans text-xl font-bold text-white mt-1">HATHOR Ore & Aggregate Quarry Ledgers</h3>
                      </div>
                      <span className="text-xs text-slate-500 font-mono self-end">SANS_REF_HATHOR // GEORADIAL</span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed max-w-2xl font-sans">
                      HATHOR conducts continuous diagnostics on mineral raw stockpiles across quarry layouts. Review yield quotas and trace minerals extraction purity below:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {hathorNodes.map((node) => (
                        <div key={node.id} className="bg-slate-950 p-5 rounded border border-slate-800 flex flex-col justify-between h-44">
                          <div className="flex justify-between items-start border-b border-slate-900 pb-2 mb-2 font-mono">
                            <span className="text-slate-500 text-[10px]">{node.id}</span>
                            <span className={`text-[9px] uppercase px-1.5 py-0.5 border rounded-xs font-bold ${
                              node.freightStatus === "Optimal" ? "bg-emerald-950/40 text-emerald-400 border-emerald-900/40" :
                              node.freightStatus === "Sufficient" ? "bg-blue-950/40 text-blue-400 border-blue-900/40" :
                              "bg-red-950/40 text-red-500 border-red-900/40 animate-pulse"
                            }`}>
                              {node.freightStatus}
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] text-slate-500 font-mono block">Node Location:</span>
                            <h4 className="font-sans font-extrabold text-slate-100 text-sm">{node.siteName}</h4>
                          </div>

                          <div className="grid grid-cols-2 gap-2 mt-4 font-mono text-xs border-t border-slate-900 pt-3">
                            <div>
                              <span className="text-[9px] text-slate-500 block">RAW SUBSTANCE</span>
                              <span className="text-slate-200">{node.resourceType.toUpperCase()}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[9px] text-neutral-500 block">PURITY LEVEL</span>
                              <span className="text-emerald-400 font-bold">{node.purity}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* C. MAMI_WATA Subsystem */}
                {activeConstellationSubTab === "MAMI_WATA" && (
                  <div className="space-y-6">
                    <div className="flex justify-between border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-cyan-400 text-xs font-mono block">SANS_HYDRAULICS_INFRASTRUCTURE</span>
                        <h3 className="font-sans text-xl font-bold text-white mt-1">MAMI_WATA Water valves & Drainage Levers</h3>
                      </div>
                      <span className="text-xs text-slate-500 font-mono self-end">SANS_REF_MAMI_WATA // HYDRAULIC</span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed max-w-2xl font-sans">
                      Orchestrate high-pressure drainage valves dynamically below. Modify pressure thresholds to optimize hydraulic flow patterns for building foundations:
                    </p>

                    <div className="space-y-4">
                      {mamiWataValves.map((v) => (
                        <div key={v.id} className="bg-slate-950 p-4 rounded border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
                          <div className="w-full md:w-1/3">
                            <span className="text-[9px] text-slate-500 font-mono block uppercase">{v.id} VALVE TRACK</span>
                            <h4 className="font-sans font-medium text-sm text-slate-200">{v.valveName}</h4>
                            <span className={`text-[9px] font-mono font-bold mt-1 inline-block uppercase ${
                              v.status === "Open" ? "text-cyan-400" : "text-slate-550"
                            }`}>
                              STATUS: {v.status}
                            </span>
                          </div>

                          {/* Interactive slider for pressure adjustments */}
                          <div className="w-full md:w-1/3 flex items-center gap-4">
                            <span className="text-[10px] font-mono text-slate-500 uppercase">PRESSURE (Bar):</span>
                            <input
                              type="range"
                              min="0"
                              max="8"
                              step="0.1"
                              value={v.pressure}
                              onChange={(e) => handleUpdateValveState(v.id, Number(e.target.value))}
                              className="flex-1 accent-cyan-400 bg-slate-900 border border-slate-800 rounded-lg"
                            />
                            <span className="text-xs font-mono font-bold text-slate-100 w-12 text-right">
                              {v.pressure} B.
                            </span>
                          </div>

                          <div className="w-full md:w-1/4 grid grid-cols-2 gap-4 text-xs font-mono">
                            <div>
                              <span className="text-[9px] text-slate-500 block font-sans">FLOW RATE</span>
                              <span className="text-slate-200">{v.flowRate} m³/s</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[9px] text-slate-500 block">STRUCTURAL INTEGRITY</span>
                              <span className="text-emerald-400 font-bold">{v.integrityPct}% OK</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* D. RA Subsystem */}
                {activeConstellationSubTab === "RA" && (
                  <div className="space-y-6">
                    <div className="flex justify-between border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-amber-500 text-xs font-mono block">SANS_POWER_INFRASTRUCTURE</span>
                        <h3 className="font-sans text-xl font-bold text-white mt-1">RA Clean Photovoltaic Site-Power Levers</h3>
                      </div>
                      <span className="text-xs text-slate-500 font-mono self-end">SANS_REF_RA // POWER</span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed max-w-2xl font-sans">
                      Integrate clean solar fields planning and off-grid electricity allocation below. Tweak generation inputs to test battery capacities under load fluctuations:
                    </p>

                    <div className="bg-slate-950 border border-slate-800 rounded p-5 space-y-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-940 pb-4">
                        <div>
                          <span className="text-[9px] text-slate-500 block font-mono">ACTIVE SOLAR AREA NAME</span>
                          <h4 className="font-sans font-extrabold text-slate-200 text-sm mt-0.5">{raPowerField.arrayName}</h4>
                        </div>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 border rounded-sm uppercase ${
                          raPowerField.gridPowerStatus === "Surplus Active" ? "bg-emerald-950/40 text-emerald-400 border-emerald-900/40" :
                          "bg-amber-955 text-amber-500 border-amber-900/40 animate-pulse"
                        }`}>
                          {raPowerField.gridPowerStatus}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Interactive Solar Slider */}
                        <div className="bg-slate-900 p-4 rounded border border-slate-850 flex flex-col justify-between">
                          <span className="text-[9px] text-slate-500 font-mono uppercase block mb-2 font-bold text-left">Simulate Daily Solar Output (kW)</span>
                          <input
                            type="range"
                            min="200"
                            max="3000"
                            step="10"
                            value={raPowerField.solarYieldKw}
                            onChange={(e) => handleRaPowerTweak(Number(e.target.value))}
                            className="accent-amber-500 my-4"
                          />
                          <div className="flex justify-between text-xs font-mono text-slate-400">
                            <span>CURRENT YIELD:</span>
                            <span className="text-amber-500 font-extrabold">{raPowerField.solarYieldKw} kW</span>
                          </div>
                        </div>

                        {/* Battery Level Gauge */}
                        <div className="bg-slate-900 p-4 rounded border border-slate-850 flex flex-col justify-between">
                          <span className="text-[9px] text-slate-500 font-mono uppercase block mb-2 font-bold text-left">Site Battery Buffer Capacity</span>
                          <div className="my-3 flex items-baseline gap-2">
                            <span className="font-sans text-2xl font-extrabold text-slate-200">{raPowerField.batteryPercent}%</span>
                            <span className="text-xs text-slate-500 font-mono">LI-ION CELL VOLT</span>
                          </div>
                          <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-850">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${raPowerField.batteryPercent}%` }} />
                          </div>
                        </div>

                        {/* Net consumption calculation */}
                        <div className="bg-slate-900 p-4 rounded border border-slate-850 flex flex-col justify-between font-mono text-xs">
                          <div>
                            <span className="text-[9px] text-slate-500 uppercase block mb-2 font-sans font-bold text-left">Power Balance Variance Ledger</span>
                            <div className="flex justify-between border-b border-slate-950 pb-1.5 mt-2 text-slate-400">
                              <span>SOLAR GENERATION:</span>
                              <span className="text-amber-400">{raPowerField.solarYieldKw} kW</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-950 pb-1.5 pt-1.5 text-slate-400">
                              <span>MIXERS & HOISTS RUN:</span>
                              <span className="text-slate-200">-{raPowerField.siteConsumptionKw} kW</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between font-bold border-t border-slate-800 pt-2 text-slate-200 mt-2 font-sans">
                            <span>NET SURPLUS BALANCE:</span>
                            <span className={raPowerField.solarYieldKw > raPowerField.siteConsumptionKw ? "text-emerald-400" : "text-amber-450"}>
                              {raPowerField.solarYieldKw - raPowerField.siteConsumptionKw} kW
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
