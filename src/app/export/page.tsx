"use client";

import React, { useState } from "react";
import { Download, Calendar, FileType, Filter } from "lucide-react";

export default function ExportPage() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("Data export complete! Check your downloads folder.");
    }, 2000);
  };

  return (
    <div style={{ animation: "fadeIn 0.4s ease-out" }}>
      <div style={{ marginBottom: "var(--space-xl)" }}>
        <h1 className="h1" style={{ marginBottom: "var(--space-xs)" }}>Export Data</h1>
        <p className="text-muted">Download your analytics and account data for external reporting.</p>
      </div>

      <div className="dashboard-card" style={{ maxWidth: 600, padding: "var(--space-2xl)" }}>
        
        <div style={{ marginBottom: "var(--space-xl)" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, marginBottom: "var(--space-sm)" }}>
            <Calendar size={18} color="var(--accent-primary)" /> Date Range
          </label>
          <select style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid var(--border-light)", background: "var(--bg-secondary)", color: "var(--text-primary)", fontSize: "1rem" }}>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last Quarter</option>
            <option>Year to Date</option>
            <option>All Time</option>
          </select>
        </div>

        <div style={{ marginBottom: "var(--space-xl)" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, marginBottom: "var(--space-sm)" }}>
            <Filter size={18} color="var(--accent-primary)" /> Data Modules
          </label>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {["Performance Metrics", "Audience Demographics", "Engagement Tracking", "Connected Accounts Status"].map((module, i) => (
              <label key={i} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
                <input type="checkbox" defaultChecked={i < 3} style={{ width: 18, height: 18, accentColor: "var(--accent-primary)" }} />
                <span style={{ color: "var(--text-secondary)" }}>{module}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "var(--space-2xl)" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, marginBottom: "var(--space-sm)" }}>
            <FileType size={18} color="var(--accent-primary)" /> Export Format
          </label>
          <div style={{ display: "flex", gap: 16 }}>
            {["CSV", "Excel", "PDF"].map((fmt, i) => (
              <label key={i} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", background: "var(--bg-hover)", padding: "8px 16px", borderRadius: "var(--radius-full)", border: "1px solid var(--border-light)" }}>
                <input type="radio" name="format" defaultChecked={i === 0} style={{ accentColor: "var(--accent-primary)" }} />
                <span style={{ fontWeight: 500 }}>{fmt}</span>
              </label>
            ))}
          </div>
        </div>

        <button 
          onClick={handleExport}
          disabled={isExporting}
          style={{
            width: "100%",
            padding: "16px",
            background: "var(--text-primary)",
            color: "var(--bg-primary)",
            border: "none",
            borderRadius: "8px",
            fontSize: "1.1rem",
            fontWeight: 600,
            cursor: isExporting ? "wait" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            boxShadow: "var(--shadow-md)"
          }}
        >
          {isExporting ? "Generating Archive..." : <><Download size={20} /> Export Now</>}
        </button>

      </div>
    </div>
  );
}
