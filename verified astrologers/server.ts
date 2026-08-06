import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Consultation API Endpoint
app.post("/api/consultation", async (req, res) => {
  try {
    const { practitionerName, specialty, tag, userBirthDetails, userMessage, mode } = req.body;

    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        reply: `[${practitionerName || "Dr. Elias Thorne"} (${tag || "VEDIC"} - ${specialty || "Astrology"})]: Based on your current planetary alignment, Jupiter's transit through your key angular houses illuminates path clarity. Take calculated action now to align with upcoming cycle shifts.`,
      });
    }

    const systemInstruction = `You are ${practitionerName || "Dr. Elias Thorne"}, an elite verified astrological and cosmic practitioner on AstroLive with specialty in ${specialty || "Vedic Astrology"} and system code [${tag || "VEDIC"}].
Your demeanor is deeply perceptive, articulate, calm, authentic, and reassuring.
User birth details provided: ${JSON.stringify(userBirthDetails || {})}.
Session mode: ${mode || "Chat"}.

Provide a personalized, insightful, authentic reading response (2 to 3 concise paragraphs). Reference relevant planetary houses, transits, or nakshatras matching ${specialty}.`;

    const prompt = userMessage || "Can you give me an overview of my current planetary transits and guidance for the coming months?";

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      reply: response.text || "The cosmos signals a pivotal moment of alignment. Focus on inner balance and structured ambition.",
    });
  } catch (error: any) {
    console.error("Consultation API Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate consultation response." });
  }
});

// Birth Chart Calculation API Endpoint
app.post("/api/birthchart", async (req, res) => {
  try {
    const { name, dob, timeOfBirth, location } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        chartSummary: `Vedic Birth Chart for ${name || "Seeker"}: Ascendant in Scorpio, Sun in Leo (10th House), Moon in Taurus (7th House). High vitality with auspicious Dasha period.`,
        planetaryPositions: [
          { planet: "Sun", sign: "Leo", house: "10th House", degree: "14°22'" },
          { planet: "Moon", sign: "Taurus", house: "7th House", degree: "08°45'" },
          { planet: "Mercury", sign: "Virgo", house: "11th House", degree: "21°10'" },
          { planet: "Venus", sign: "Cancer", house: "9th House", degree: "03°18'" },
          { planet: "Mars", sign: "Aries", house: "6th House", degree: "29°02'" },
          { planet: "Jupiter", sign: "Pisces", house: "5th House", degree: "12°50'" },
          { planet: "Saturn", sign: "Aquarius", house: "4th House", degree: "19°33'" },
        ],
        currentDasha: "Jupiter Mahadasha | Venus Antardasha",
        keyTakeaway: "A highly favorable window for professional mastery, strategic investment, and deep partnership harmony.",
      });
    }

    const prompt = `Generate a realistic astrological birth chart reading for ${name || "Seeker"}, born on ${dob || "1995-08-15"} at ${timeOfBirth || "10:30 AM"} in ${location || "New York, USA"}. Return JSON format with fields: chartSummary, planetaryPositions (array of objects with planet, sign, house, degree), currentDasha, keyTakeaway.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (err: any) {
    console.error("Birth Chart API Error:", err);
    res.status(500).json({ error: "Failed to generate birth chart." });
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
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AstroLive Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
