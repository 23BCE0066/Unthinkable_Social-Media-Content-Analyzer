"use client";

import React from "react";
import { FileText, Download, Clock } from "lucide-react";

const reports = [
  { id: 1, name: "Q2 Social Media Performance", date: "Aug 15, 2026", type: "PDF", size: "2.4 MB" },
  { id: 2, name: "Audience Growth Analysis", date: "Aug 10, 2026", type: "CSV", size: "1.1 MB" },
  { id: 3, name: "Campaign: Summer Launch", date: "Jul 28, 2026", type: "PDF", size: "4.8 MB" },
  { id: 4, name: "Competitor Benchmarking", date: "Jul 15, 2026", type: "PDF", size: "3.2 MB" },
  { id: 5, name: "Monthly Digest - June", date: "Jul 01, 2026", type: "Excel", size: "1.9 MB" },
];

export default function ReportsPage() {
  return (
    <div style={{ animation: "fadeIn 0.4s ease-out" }}>
      <div style={{ marginBottom: "var(--space-xl)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="h1" style={{ marginBottom: "var(--space-xs)" }}>Custom Reports</h1>
          <p className="text-muted">Generate and download automated analytics reports.</p>
        </div>
        <button style={{
          background: "var(--accent-primary)",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          fontWeight: 500,
          cursor: "pointer"
        }}>
          Generate New
        </button>
      </div>

      <div className="dashboard-card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "var(--bg-hover)", borderBottom: "1px solid var(--border-light)" }}>
              <th style={{ padding: "16px 24px", color: "var(--text-secondary)", fontWeight: 500, fontSize: "0.875rem" }}>Report Name</th>
              <th style={{ padding: "16px 24px", color: "var(--text-secondary)", fontWeight: 500, fontSize: "0.875rem" }}>Date Generated</th>
              <th style={{ padding: "16px 24px", color: "var(--text-secondary)", fontWeight: 500, fontSize: "0.875rem" }}>Format</th>
              <th style={{ padding: "16px 24px", color: "var(--text-secondary)", fontWeight: 500, fontSize: "0.875rem", textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} style={{ borderBottom: "1px solid var(--border-light)" }}>
                <td style={{ padding: "16px 24px", display: "flex", alignItems: "center", gap: "12px", fontWeight: 500 }}>
                  <FileText size={18} color="var(--accent-primary)" />
                  {report.name}
                </td>
                <td style={{ padding: "16px 24px", color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Clock size={14} /> {report.date}
                  </div>
                </td>
                <td style={{ padding: "16px 24px" }}>
                  <span style={{ 
                    background: "var(--bg-hover)", 
                    padding: "4px 10px", 
                    borderRadius: "12px", 
                    fontSize: "0.75rem", 
                    fontWeight: 600,
                    color: "var(--text-secondary)"
                  }}>
                    {report.type}
                  </span>
                </td>
                <td style={{ padding: "16px 24px", textAlign: "right" }}>
                  <button style={{
                    background: "transparent",
                    border: "1px solid var(--border-light)",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    color: "var(--text-primary)",
                    fontSize: "0.875rem",
                    fontWeight: 500
                  }}>
                    <Download size={14} /> Download ({report.size})
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
