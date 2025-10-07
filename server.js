import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_KEY,
});

app.post("/analyze", async (req, res) => {
  try {
    const { matchData } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyse ce match de football : ${matchData}`,
    });

    res.json({ result: response.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur d'analyse du match" });
  }
});

app.listen(3000, () => {
  console.log("✅ Serveur en ligne sur le port 3000");
});
