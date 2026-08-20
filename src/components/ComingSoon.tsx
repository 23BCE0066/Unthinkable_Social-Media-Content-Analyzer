"use client";

import React from "react";
import { Construction } from "lucide-react";

interface ComingSoonProps {
  title: string;
}

export default function ComingSoon({ title }: ComingSoonProps) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "calc(100vh - var(--topbar-height) - var(--space-2xl))",
      textAlign: "center",
      animation: "fadeIn 0.5s ease-out"
    }}>
      <div style={{
        width: 80,
        height: 80,
        borderRadius: "50%",
        background: "var(--bg-hover)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "var(--space-lg)",
        color: "var(--text-tertiary)"
      }}>
        <Construction size={40} />
      </div>
      <h1 className="h1" style={{ marginBottom: "var(--space-sm)" }}>{title}</h1>
      <p className="text-muted" style={{ maxWidth: 400 }}>
        We are currently building this feature. Check back soon for exciting updates to your dashboard!
      </p>
    </div>
  );
}
