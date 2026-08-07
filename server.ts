import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

// Initialize express app
const app = express();
const PORT = 3000;

// Body parsing middlewares
app.use(express.json());

// Lazy-initialization helper for GoogleGenAI
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("Warning: GEMINI_API_KEY environment variable is not set. PTAH AI capabilities will operate in fallback mode.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

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

    const client = getAIClient();
    if (!client) {
      // Return a simulated high-quality engineering response if key is missing
      return res.json({
        text: `[SYSTEM: Operating in Demo Mode (Local PTAH Intelligence)]\n\nI have received your inquiry regarding "${prompt}". As PTAH, I would advise tracking logistics, safety parameters, and budget forecasts in real-time. Please configure a valid Google GenAI API key in the Secrets/Env settings to enable live full-stack reasoning.`,
        demo: true
      });
    }

    // Format history for @google/genai
    // Note that history should look like { role: 'user' | 'model', parts: [{ text: string }] }
    const formattedContents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        formattedContents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      });
    }
    // Append current prompt
    formattedContents.push({
      role: "user",
      parts: [{ text: prompt }]
    });

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: `You are PTAH, an expert AI-driven construction engineer and infrastructure intelligence systems advisor. 
You advise on complex building workflows, resource logs, materials delivery (HAPI), raw material mining and supply (HATHOR), site hydraulics and water works (MAMI_WATA), and clean site-power systems (RA).
Speak with authoritative, high-density engineering precision. Provide structured advice, technical calculations, or compliance steps. Keep response text streamlined and helpful. Use markdown.`
      }
    });

    res.json({ text: response.text });
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

    const client = getAIClient();
    if (!client) {
      // Local fallback simulator for demo purposes
      return res.json({
        report: `### PTAH Local Audit Log - Fallback Mode\n\n**Assessment Area:** ${systemModule || "General Site Operations"}\n\n**Input Scenario:** "${scenario}"\n\n**Preliminary Structural & Safety Audit:**\n\n1. Check standard OSHA Subparts depending on the machinery. If height operations are stated, verify harnesses.\n2. In soil/excavation, standard slope ratios (e.g. 1.5:1 or protective shielding) are critical below 1.5 meters.\n3. Water flow rate needs check valves to prevent backflow contamination (MAMI_WATA integration).\n\n*Note: Configure **GEMINI_API_KEY** under Secrets inside AI Studio to unlock live real-time AI regulatory checks.*`,
        score: 82,
        demo: true
      });
    }

    const systemPrompt = `You are PTAH's automated Compliance and Hazards Integrity module. Conduct a strict audit based on:
Scenario: "${scenario}"
Domain Target: ${systemModule || "General Infrastructure Operations"}.

Analyze risks under industry standards (OSHA compliance, structural integrity, eco-impact, and materials safety), issue severity metrics, specific guidelines violated, immediate corrections, and output a numeric "Hazard Safety Score" from 0 to 100 (where 100 means zero risks/flawless regulatory compliance, 0 is extreme critical danger/shut down site immediately).

You must return a response in valid JSON matching this schema:
{
  "report": "HTML or Markdown string of the full compliance audit report",
  "score": number, // safety score from 0 to 100
  "severity": "Low" | "Medium" | "High" | "Critical",
  "violations": ["string of violation details"],
  "corrections": ["string of corrective guidance actions"]
}`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: systemPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["report", "score", "severity", "violations", "corrections"],
          properties: {
            report: { type: Type.STRING, description: "Structured audit report in Markdown." },
            score: { type: Type.INTEGER, description: "Integrity score from 0 to 100." },
            severity: { type: Type.STRING, description: "Risk severity category." },
            violations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of regulation codes or safety infractions."
            },
            corrections: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Concrete step-by-step instructions to remediate hazards."
            }
          }
        }
      }
    });

    const resultText = response.text || "{}";
    res.json(JSON.parse(resultText));
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

    const client = getAIClient();
    if (!client) {
      return res.json({
        optimizedItems: items.map(item => ({
          ...item,
          suggestedCost: Math.round(item.currentCost * 0.92),
          wasteMetric: Math.round(item.currentCost * 0.08),
          procurementStrategy: "Leverage Sans Mercantile regional logistics networks for immediate volume rate discount."
        })),
        commentary: "Standard PTAH internal optimization rate of 8% applied. Connect Gemini AI to analyze raw material cost hedges dynamically.",
        demo: true
      });
    }

    const promptText = `Analyze and optimize this construction project's line-item materials budget:
${JSON.stringify(items, null, 2)}

Provide intelligent suggestions to:
1. Decrease cost values for wasteful segments.
2. Formulate specific sourcing strategies (e.g. batch orders, recycled raw materials, mining source hedges).
3. Evaluate waste metrics.

Return a valid JSON object matching this schema:
{
  "optimizedItems": [
    {
      "id": string_or_number,
      "name": string,
      "currentCost": number,
      "suggestedCost": number, // revised cost
      "wasteMetric": number,  // estimated raw material waste in dollars
      "procurementStrategy": "string explaining how to optimize"
    }
  ],
  "commentary": "General summary review of budget variance, price fluctuations, and overall waste mitigation advice."
}`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["optimizedItems", "commentary"],
          properties: {
            optimizedItems: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["id", "name", "currentCost", "suggestedCost", "wasteMetric", "procurementStrategy"],
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  currentCost: { type: Type.NUMBER },
                  suggestedCost: { type: Type.NUMBER },
                  wasteMetric: { type: Type.NUMBER },
                  procurementStrategy: { type: Type.STRING }
                }
              }
            },
            commentary: { type: Type.STRING }
          }
        }
      }
    });

    const resultText = response.text || "{}";
    res.json(JSON.parse(resultText));
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
