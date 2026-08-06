import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Cosmic Reading API
app.post("/api/cosmic-reading", async (req, res) => {
  try {
    const { milestones, userContext } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Fallback offline reading generator if no key is present
      const fallbackReading = {
        title: "Celestial Blueprint Analysis",
        summary: "Your life constellation shows a distinct harmony of milestone clusters across career pivots and personal expansions.",
        theme: "The Path of Luminous Transformation",
        insights: [
          "A major epoch shift occurred around your career pivot, forging a direct connection between your early foundation and upcoming milestones.",
          "Your travel and project launch stars align in an ascending triangular constellation, signaling high creative momentum.",
          "The upcoming constellation nodes suggest a convergence between wisdom gained and future bold decisions."
        ],
        astrologicalAnalogy: "Cosmic alignments mirror major Jupiter-Saturn milestone conjuncts in your life timeline."
      };
      return res.json({ reading: fallbackReading, isFallback: true });
    }

    const prompt = `You are AstroLive, a celestial life biographer and cosmic astrologer analyzing a user's Life Constellation Map.
    
    Here is the list of life milestones (stars in their constellation map):
    ${JSON.stringify(milestones, null, 2)}
    
    User Context / Request: ${userContext || "Provide a holistic celestial synthesis of my life path, major milestone turning points, and upcoming life constellation trajectory."}

    Respond ONLY with valid JSON in this structure:
    {
      "title": "A poetic cosmic reading title",
      "summary": "A 2-3 sentence overarching reading of their life constellation journey",
      "theme": "Core Archetype/Theme Name (e.g. The Luminous Voyager)",
      "insights": [
        "Insight 1 about milestone clusters or trajectory",
        "Insight 2 about emotional/career growth connection",
        "Insight 3 about future constellation potential"
      ],
      "astrologicalAnalogy": "A poetic celestial/astrological analogy connecting their timeline to cosmic patterns."
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "";
    const reading = JSON.parse(text);
    res.json({ reading, isFallback: false });
  } catch (error: any) {
    console.error("Error generating cosmic reading:", error);
    res.status(500).json({
      error: "Failed to generate cosmic reading",
      details: error.message || "An unexpected error occurred",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
