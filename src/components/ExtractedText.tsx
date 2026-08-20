"use client";

import React, { useState } from "react";

interface ExtractedTextProps {
  text: string;
  fileName: string;
}

export default function ExtractedText({ text, fileName }: ExtractedTextProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for browsers without clipboard API
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const previewLength = 500;
  const isLong = text.length > previewLength;
  const displayText = isLong && !isExpanded ? text.slice(0, previewLength) + "..." : text;

  return (
    <div className="analysis-card">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "var(--space-md)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
          <span style={{ fontSize: "1.25rem" }}>📝</span>
          <div>
            <h3
              style={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--text-secondary)",
              }}
            >
              Extracted Text
            </h3>
            <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>{fileName}</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "var(--space-sm)" }}>
          {isLong && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Collapse" : "Expand"}
            </button>
          )}
          <button
            className="btn btn-secondary btn-sm"
            onClick={handleCopy}
          >
            {copied ? "✓ Copied!" : "📋 Copy"}
          </button>
        </div>
      </div>

      <div className="extracted-text-area">{displayText}</div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "var(--space-sm)",
        }}
      >
        <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
          {text.split(/\s+/).filter(Boolean).length} words • {text.length} characters
        </p>
      </div>
    </div>
  );
}
