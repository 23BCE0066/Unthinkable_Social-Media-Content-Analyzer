import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `You are ContentLens AI, an expert social media content strategist and analyst. 
Analyze the provided text as potential social media content and provide actionable engagement improvement suggestions.

Respond ONLY with valid JSON (no markdown, no code fences) in this exact format:
{
  "summary": "Brief 2-3 sentence summary of the content",
  "engagementScore": <number 1-10>,
  "scoreExplanation": "Why this score was given",
  "toneAnalysis": {
    "primary": "The primary tone (e.g., Professional, Casual, Informative, Humorous, Inspirational)",
    "emotions": ["emotion1", "emotion2", "emotion3"]
  },
  "suggestions": [
    {
      "title": "Short suggestion title",
      "description": "Detailed actionable suggestion",
      "impact": "high|medium|low"
    }
  ],
  "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5"],
  "platformTips": {
    "twitter": "Specific tip for Twitter/X (max 280 chars consideration)",
    "linkedin": "Specific tip for LinkedIn (professional angle)",
    "instagram": "Specific tip for Instagram (visual + captions)"
  },
  "bestPostingTimes": ["Day HH:MM AM/PM timezone"],
  "contentType": "article|story|announcement|tutorial|opinion|promotional|other",
  "readabilityLevel": "elementary|intermediate|advanced",
  "wordCount": <number>,
  "estimatedReadTime": "X min read"
}

Provide 4-6 detailed suggestions. Be specific and actionable. Score fairly — only give 9-10 for truly exceptional content.`;

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "No text provided for analysis" },
        { status: 400 }
      );
    }

    if (text.trim().length < 10) {
      return NextResponse.json(
        { error: "Text is too short for meaningful analysis. Please provide more content." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI service is not configured. Please set GEMINI_API_KEY environment variable." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Truncate very long texts to avoid token limits
    const truncatedText = text.length > 8000 ? text.slice(0, 8000) + "\n...[truncated]" : text;

    const result = await model.generateContent([
      SYSTEM_PROMPT,
      `\nAnalyze this content:\n\n${truncatedText}`,
    ]);

    const responseText = result.response.text();

    // Clean response — remove markdown code fences if present
    const cleanJson = responseText
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();

    try {
      const analysis = JSON.parse(cleanJson);
      return NextResponse.json({ analysis });
    } catch {
      console.error("Failed to parse AI response:", responseText);
      return NextResponse.json(
        { error: "AI returned an unexpected format. Please try again." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Analysis error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    if (errorMessage.includes("API_KEY")) {
      return NextResponse.json(
        { error: "Invalid API key. Please check your GEMINI_API_KEY." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Analysis failed. Please try again later." },
      { status: 500 }
    );
  }
}
