"use client";

import React, { useState } from "react";

interface AnalysisData {
  summary: string;
  engagementScore: number;
  scoreExplanation: string;
  toneAnalysis: {
    primary: string;
    emotions: string[];
  };
  suggestions: Array<{
    title: string;
    description: string;
    impact: string;
  }>;
  hashtags: string[];
  platformTips: {
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  bestPostingTimes: string[];
  contentType: string;
  readabilityLevel: string;
  wordCount: number;
  estimatedReadTime: string;
}

interface AnalysisResultProps {
  analysis: AnalysisData;
}

export default function AnalysisResult({ analysis }: AnalysisResultProps) {
  const [activePlatform, setActivePlatform] = useState<"twitter" | "linkedin" | "instagram">("twitter");

  const getScoreColor = (score: number): string => {
    if (score >= 8) return "var(--accent-success)";
    if (score >= 5) return "var(--accent-warning)";
    return "var(--accent-danger)";
  };

  const getScoreLabel = (score: number): string => {
    if (score >= 9) return "Exceptional";
    if (score >= 7) return "Strong";
    if (score >= 5) return "Average";
    if (score >= 3) return "Below Average";
    return "Needs Work";
  };

  const getImpactColor = (impact: string): string => {
    switch (impact) {
      case "high":
        return "tag-success";
      case "medium":
        return "tag-warning";
      case "low":
        return "tag";
      default:
        return "tag";
    }
  };

  const platformIcons: Record<string, string> = {
    twitter: "𝕏",
    linkedin: "in",
    instagram: "📸",
  };

  return (
    <div className="stagger-children" style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
      {/* Score + Summary Row */}
      <div className="result-grid">
        {/* Engagement Score Card */}
        <div className="analysis-card" style={{ textAlign: "center" }}>
          <h3
            style={{
              fontSize: "0.8125rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--text-secondary)",
              marginBottom: "var(--space-lg)",
            }}
          >
            Engagement Score
          </h3>

          <div className="score-circle">
            <span className="score-value">{analysis.engagementScore}</span>
          </div>

          <p
            style={{
              marginTop: "var(--space-md)",
              fontSize: "1.125rem",
              fontWeight: 700,
              color: getScoreColor(analysis.engagementScore),
            }}
          >
            {getScoreLabel(analysis.engagementScore)}
          </p>

          <p
            style={{
              marginTop: "var(--space-sm)",
              fontSize: "0.8125rem",
              color: "var(--text-tertiary)",
              lineHeight: 1.5,
            }}
          >
            {analysis.scoreExplanation}
          </p>
        </div>

        {/* Content Summary Card */}
        <div className="analysis-card">
          <h3
            style={{
              fontSize: "0.8125rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--text-secondary)",
              marginBottom: "var(--space-md)",
            }}
          >
            Content Overview
          </h3>

          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--text-primary)",
              lineHeight: 1.7,
              marginBottom: "var(--space-lg)",
            }}
          >
            {analysis.summary}
          </p>

          {/* Meta Info */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--space-sm)",
            }}
          >
            <div
              style={{
                padding: "var(--space-sm) var(--space-md)",
                background: "var(--bg-glass)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <p style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>
                Type
              </p>
              <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)", textTransform: "capitalize" }}>
                {analysis.contentType}
              </p>
            </div>
            <div
              style={{
                padding: "var(--space-sm) var(--space-md)",
                background: "var(--bg-glass)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <p style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>
                Read Time
              </p>
              <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)" }}>
                {analysis.estimatedReadTime}
              </p>
            </div>
            <div
              style={{
                padding: "var(--space-sm) var(--space-md)",
                background: "var(--bg-glass)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <p style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>
                Words
              </p>
              <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)" }}>
                {analysis.wordCount?.toLocaleString()}
              </p>
            </div>
            <div
              style={{
                padding: "var(--space-sm) var(--space-md)",
                background: "var(--bg-glass)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <p style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>
                Level
              </p>
              <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)", textTransform: "capitalize" }}>
                {analysis.readabilityLevel}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tone Analysis */}
      <div className="analysis-card">
        <h3
          style={{
            fontSize: "0.8125rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--text-secondary)",
            marginBottom: "var(--space-md)",
          }}
        >
          Tone Analysis
        </h3>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", flexWrap: "wrap" }}>
          <span
            style={{
              padding: "var(--space-sm) var(--space-lg)",
              background: "var(--gradient-primary)",
              borderRadius: "var(--radius-full)",
              fontSize: "0.9375rem",
              fontWeight: 600,
              color: "white",
            }}
          >
            {analysis.toneAnalysis?.primary}
          </span>

          {analysis.toneAnalysis?.emotions?.map((emotion, i) => (
            <span key={i} className="tag">
              {emotion}
            </span>
          ))}
        </div>
      </div>

      {/* Improvement Suggestions */}
      <div className="analysis-card">
        <h3
          style={{
            fontSize: "0.8125rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--text-secondary)",
            marginBottom: "var(--space-lg)",
          }}
        >
          Improvement Suggestions
        </h3>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-sm)",
          }}
        >
          {analysis.suggestions?.map((suggestion, i) => (
            <div key={i} className="suggestion-item">
              <div className="suggestion-number">{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-sm)",
                    marginBottom: "var(--space-xs)",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    {suggestion.title}
                  </h4>
                  <span className={`tag ${getImpactColor(suggestion.impact)}`} style={{ fontSize: "0.6875rem" }}>
                    {suggestion.impact} impact
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {suggestion.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hashtag Recommendations */}
      <div className="analysis-card">
        <h3
          style={{
            fontSize: "0.8125rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--text-secondary)",
            marginBottom: "var(--space-md)",
          }}
        >
          Recommended Hashtags
        </h3>

        <div
          style={{
            display: "flex",
            gap: "var(--space-sm)",
            flexWrap: "wrap",
          }}
        >
          {analysis.hashtags?.map((tag, i) => (
            <button
              key={i}
              className="tag"
              onClick={() => navigator.clipboard.writeText(tag)}
              title="Click to copy"
              style={{ cursor: "pointer" }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Platform-Specific Tips */}
      <div className="analysis-card">
        <h3
          style={{
            fontSize: "0.8125rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--text-secondary)",
            marginBottom: "var(--space-md)",
          }}
        >
          Platform Tips
        </h3>

        <div className="platform-tabs" style={{ marginBottom: "var(--space-lg)" }}>
          {(["twitter", "linkedin", "instagram"] as const).map((platform) => (
            <button
              key={platform}
              className={`platform-tab ${activePlatform === platform ? "active" : ""}`}
              onClick={() => setActivePlatform(platform)}
            >
              <span style={{ marginRight: "var(--space-xs)" }}>{platformIcons[platform]}</span>
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </button>
          ))}
        </div>

        <div
          style={{
            padding: "var(--space-md)",
            background: "var(--bg-glass)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-primary)",
          }}
        >
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--text-primary)",
              lineHeight: 1.7,
            }}
          >
            {analysis.platformTips?.[activePlatform]}
          </p>
        </div>
      </div>

      {/* Best Posting Times */}
      {analysis.bestPostingTimes && analysis.bestPostingTimes.length > 0 && (
        <div className="analysis-card">
          <h3
            style={{
              fontSize: "0.8125rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--text-secondary)",
              marginBottom: "var(--space-md)",
            }}
          >
            Best Posting Times
          </h3>

          <div
            style={{
              display: "flex",
              gap: "var(--space-sm)",
              flexWrap: "wrap",
            }}
          >
            {analysis.bestPostingTimes.map((time, i) => (
              <span
                key={i}
                className="tag-success tag"
              >
                🕐 {time}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
