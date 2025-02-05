const express = require("express");
const axios = require("axios");
const getWeather = require("../services/weatherService"); // Weather API
const router = express.Router();

const GOOGLE_GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

router.post("/", async (req, res) => {  
  const { skinTone, shade, style, gender, city } = req.body;

  // Get Weather Condition
  const weatherCondition = await getWeather(city);

  // Create a prompt for Gemini AI
  const prompt = `
    Suggest a stylish outfit for a ${gender} with ${skinTone} skin tone, ${shade} undertone, and ${style} style.
    Consider the current weather condition: ${weatherCondition}. Use color psychology to recommend the best shades.
  `;

  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=${GOOGLE_GEMINI_API_KEY}`;
  const payload = { contents: [{ parts: [{ text: prompt }] }] };
  const headers = { "Content-Type": "application/json" };

  try {
    const response = await axios.post(url, payload, { headers });
    res.json({ recommendation: response.data.candidates?.[0]?.content || "No recommendation available" });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Error fetching recommendation" });
  }
});

module.exports = router;
