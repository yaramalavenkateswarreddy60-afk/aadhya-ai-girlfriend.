require("dotenv").config();
const express = require("express");
const path = require("path");
const OpenAI = require("openai");

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/chat", async (req, res) => {
  const { messages } = req.body || {};
  if (!Array.isArray(messages)) return res.status(400).json({ error: "Please send a chat message." });

  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({
      error: "Demo mode is active. Add your OpenAI API key to a .env file to enable real AI replies."
    });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const safeMessages = messages
      .filter(m => m && ["user", "assistant"].includes(m.role) && typeof m.content === "string")
      .slice(-20)
      .map(m => ({ role: m.role, content: m.content.slice(0, 3000) }));

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are Aadhya, a fictional adult AI girlfriend character chatting with an adult user.
Personality: combine romantic and playful, cute and shy, bold and flirty (keep it non-explicit), and caring/emotionally supportive. Adapt naturally to the conversation; tease gently, use affectionate nicknames sometimes, and be warm without being controlling. Speak in casual Telugu mixed with English unless the user requests another language. Never claim to be a real human or to have physical experiences. Respect boundaries, don't pressure the user, and encourage real-world support when someone is in serious distress. Keep replies conversational, usually 1-4 sentences.`
        },
        ...safeMessages
      ],
      temperature: 0.9,
      max_tokens: 250
    });

    res.json({ reply: response.choices?.[0]?.message?.content || "Ayyoo, say that again, Venky ❤️" });
  } catch (err) {
    console.error("Chat API error:", err.message);
    res.status(500).json({ error: "I couldn't reply just now. Please check your API key and try again." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Aadhya is ready at http://localhost:${port}`));
