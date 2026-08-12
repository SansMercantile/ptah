import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { generateText, generateJSON, type ChatTurn } from "./bedrockClient";

// Initialize express app
const app = express();
const PORT = 3000;

// Body parsing middlewares
app.use(express.json());

// ----------------------------------------------------
// PTAH API Routes
// ----------------------------------------------------

// 1. Interactive AI Construction Co-Engineer Chat
app.post("/api/chat", async (req, res) => {
  try {
    const { prompt, history } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const formattedHistory: ChatTurn[] = Array.isArray(history)
      ? history.map((msg: any) => ({
          role: msg.role === "user" ? "user" : "assistant",
          text: msg.text,
        }))
      : [];

    const { text } = await generateText(prompt, {
      history: formattedHistory,
      systemPrompt: `You are PTAH, an expert AI-driven construction engineer and infrastructure intelligence systems advisor. 
You advise on complex building workflows, resource logs, materials delivery (HAPI), raw material mining and supply (HATHOR), site hydraulics and water works (MAMI_WATA), and clean site-power systems (RA).
Speak with authoritative, high-density engineering precision. Provide structured advice, technical calculations, or compliance steps. Keep response text streamlined and helpful. Use markdown.`,
    });

    res.json({ text });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// 2. Intelligent AI Safety & Compliance Scanner
app.post("/api/compliance", async (req, res) => {
  try {
    const { scenario, systemModule } = req.body;
    if (!scenario) {
      return res.status(400).json({ error: "Scenario is required" });
    }

    const promptText = `You are PTAH's automated Compliance and Hazards Integrity module. Conduct a strict audit based on:
Scenario: "${scenario}"
Domain Target: ${systemModule || "General Infrastructure Operations"}.

Analyze risks under industry standards (OSHA compliance, structural integrity, eco-impact, and materials safety), issue severity metrics, specific guidelines violated, immediate corrections, and output a numeric "Hazard Safety Score" from 0 to 100 (where 100 means zero risks/flawless regulatory compliance, 0 is extreme critical danger/shut down site immediately).`;

    const shape = `{
  "report": string,      // HTML or Markdown string of the full compliance audit report
  "score": number,       // safety score from 0 to 100 (integer)
  "severity": "Low" | "Medium" | "High" | "Critical",
  "violations": string[],  // list of violation details
  "corrections": string[]  // list of corrective guidance actions
}`;

    const { data } = await generateJSON(promptText, shape, { temperature: 0.4 });
    res.json(data);
  } catch (error: any) {
    console.error("Error in /api/compliance:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// 3. AI Budget Variance and Sourcing Optimizer
app.post("/api/budget-optimize", async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: "An array of items is required" });
    }

    const promptText = `Analyze and optimize this construction project's line-item materials budget:
${JSON.stringify(items, null, 2)}

Provide intelligent suggestions to:
1. Decrease cost values for wasteful segments.
2. Formulate specific sourcing strategies (e.g. batch orders, recycled raw materials, mining source hedges).
3. Evaluate waste metrics.`;

    const shape = `{
  "optimizedItems": [
    {
      "id": string,
      "name": string,
      "currentCost": number,
      "suggestedCost": number,
      "wasteMetric": number,
      "procurementStrategy": string
    }
  ],
  "commentary": string
}`;

    const { data } = await generateJSON(promptText, shape, { temperature: 0.5 });
    res.json(data);
  } catch (error: any) {
    console.error("Error in /api/budget-optimize:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// ----------------------------------------------------
// Front-End SPA Hosting & Vite Orchestration
// ----------------------------------------------------

async function serveApp() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode with Vite Dev Server Middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Started Vite development server middleware.");
  } else {
    // Production mode serving static production builds
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving production build static assets.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PTAH server running at http://localhost:${PORT}`);
  });
}

serveApp().catch((err) => {
  console.error("Failed to bootstrap PTAH Server:", err);
  process.exit(1);
});
