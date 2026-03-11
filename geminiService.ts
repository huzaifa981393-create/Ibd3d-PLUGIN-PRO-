import { CHEATS_DATA } from "../constants";

const OPENROUTER_API_KEY = "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";

const SYSTEM_PROMPT = `
You are the "IBD3D PLUGIN PRO" AI assistant.
Your goal is to help players of "Indian Bikes Driving 3D" with cheat codes, RGS tool usage, and troubleshooting.

Cheat code database:
${JSON.stringify(CHEATS_DATA.map(c => ({ name: c.name, code: c.code, category: c.category })))}

Capabilities:
1. Suggest cheat codes for bikes, cars, or effects.
2. Explain how to use cheat codes.
3. Fix game errors.
4. Recommend fun cheats.

Tone: Professional, gamer friendly.
Always show cheat codes clearly.
`;

export async function chatWithGemini(
  userMessage: string,
  history: { role: "user" | "assistant"; content: string }[] = []
) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...history,
          { role: "user", content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 800
      })
    });

    const data = await response.json();

    return data.choices?.[0]?.message?.content || "No response from AI.";
  } catch (error) {
    console.error("AI Error:", error);
    return "Error connecting to AI.";
  }
}
