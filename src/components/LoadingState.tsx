"use client";

import React from "react";

interface LoadingStateProps {
  message: string;
  subMessage?: string;
}

export default function LoadingState({ message, subMessage }: LoadingStateProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-3xl) var(--space-lg)",
        gap: "var(--space-lg)",
        animation: "fadeIn 0.3s ease-out",
      }}
    >
      {/* Animated loader */}
      <div
        style={{
          position: "relative",
          width: 56,
          height: 56,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: "3px solid var(--border-secondary)",
            borderTopColor: "var(--accent-primary)",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 6,
            border: "3px solid var(--border-primary)",
            borderBottomColor: "var(--accent-secondary)",
            borderRadius: "50%",
            animation: "spin 1.2s linear infinite reverse",
          }}
        />
      </div>

      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: "var(--space-xs)",
          }}
        >
          {message}
        </p>
        {subMessage && (
          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--text-tertiary)",
            }}
          >
            {subMessage}
          </p>
        )}
      </div>

      {/* Progress dots */}
      <div style={{ display: "flex", gap: "var(--space-sm)" }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--accent-primary)",
              animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
