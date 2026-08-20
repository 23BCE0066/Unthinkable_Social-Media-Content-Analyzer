"use client";

import React from "react";
import { CheckCircle, AlertCircle, RefreshCw, Camera, MessageSquare, Briefcase, Globe } from "lucide-react";

const accounts = [
  { platform: "Instagram", handle: "@contentlens_pro", status: "Active", icon: Camera, color: "#e1306c" },
  { platform: "Twitter", handle: "@ContentLensHQ", status: "Syncing", icon: MessageSquare, color: "#1da1f2" },
  { platform: "LinkedIn", handle: "ContentLens SaaS", status: "Active", icon: Briefcase, color: "#0077b5" },
  { platform: "Facebook", handle: "ContentLens Official", status: "Error", icon: Globe, color: "#4267B2" },
];

export default function AccountsPage() {
  return (
    <div style={{ animation: "fadeIn 0.4s ease-out" }}>
      <div style={{ marginBottom: "var(--space-xl)" }}>
        <h1 className="h1" style={{ marginBottom: "var(--space-xs)" }}>Managed Accounts</h1>
        <p className="text-muted">Connect and manage your social media integrations.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--space-lg)" }}>
        {accounts.map((acc, i) => (
          <div key={i} className="dashboard-card" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: "12px", background: acc.color, display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                  <acc.icon size={24} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 600 }}>{acc.platform}</h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{acc.handle}</p>
                </div>
              </div>
              
              {acc.status === "Active" && <CheckCircle size={20} color="var(--accent-success)" />}
              {acc.status === "Syncing" && <RefreshCw size={20} color="var(--accent-primary)" style={{ animation: "spin 2s linear infinite" }} />}
              {acc.status === "Error" && <AlertCircle size={20} color="var(--accent-danger)" />}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-light)", paddingTop: "16px" }}>
              <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>Status: <strong>{acc.status}</strong></span>
              <button style={{ background: "transparent", border: "1px solid var(--border-light)", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem", fontWeight: 600 }}>
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
