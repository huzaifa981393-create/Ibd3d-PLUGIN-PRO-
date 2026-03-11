
import { GoogleGenAI } from "@google/genai";
import { CHEATS_DATA } from "../constants";

// Fix: Use process.env.API_KEY directly as per Gemini API initialization guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_PROMPT = `
You are the "IBD3D PLUGIN PRO" AI assistant.
Your goal is to help players of "Indian Bikes Driving 3D" with cheat codes, RGS tool usage, and troubleshooting.
You have access to the following cheat code database knowledge:
${JSON.stringify(CHEATS_DATA.map(c => ({ name: c.name, code: c.code, category: c.category })))}

Capabilities:
1. Suggest cheat codes for specific bikes, cars, or effects.
2. Explain how to use cheat codes (open mobile in game, enter code).
3. Fix common game errors (RGS file issues, lag, installation).
4. Recommend best cheats for fun gameplay.

Tone: Professional, helpful, concise, and gamer-friendly.
Response: Always provide the cheat codes clearly.
`;

export async function chatWithGemini(userMessage: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        maxOutputTokens: 800,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to AI. Please check your internet connection.";
  }
}
