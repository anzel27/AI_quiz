require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


app.post("/generate-quiz", async (req, res) => {
  try {
    const inputText = req.body.text;

    if (!inputText || inputText.trim() === "") {
      return res.status(400).json({ error: "No input text provided" });
    }

    const prompt = `Create exactly 5 MCQs.

Rules:
- 4 options each
- Mention correct answer
- No explanation

Format:

Q1. Question
A) Option
B) Option
C) Option
D) Option
Answer: A

Content:
${inputText}`;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash"
    });
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    console.log("✅ Quiz generated!");
    res.json({ text });

  } catch (err) {
    console.error("Error:", err.message);
    
    if (err.status === 429) {
      return res.status(429).json({ 
        error: "Rate limit - wait 1 minute",
        retryAfter: 60
      });
    }
    
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Quiz Generator! 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

