"use client";

import React from "react";
import { Mail, MessageCircle, FileQuestion, ExternalLink } from "lucide-react";

export default function HelpCenterPage() {
  const faqs = [
    { q: "How accurate is the AI forecast?", a: "Our AI uses advanced predictive models trained on millions of social media posts, offering highly accurate engagement estimates based on your content structure and sentiment." },
    { q: "How do I connect my social accounts?", a: "Navigate to the Managed Accounts tab and click 'Connect' on the desired platform. You will be redirected to authorize ContentLens Pro securely." },
    { q: "Can I upgrade or downgrade my plan?", a: "Yes! You can change your subscription plan at any time from the Subscription & Billing page. Prorated charges will apply automatically." },
    { q: "What formats do data exports support?", a: "Currently, you can export your analytics reports in PDF, CSV, and Excel formats from the Custom Reports page." }
  ];

  return (
    <div style={{ animation: "fadeIn 0.4s ease-out", paddingBottom: "var(--space-2xl)" }}>
      <div style={{ marginBottom: "var(--space-2xl)" }}>
        <h1 className="h1" style={{ marginBottom: "var(--space-xs)" }}>Help Center</h1>
        <p className="text-muted">Find answers to common questions or reach out to our team.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-xl)", marginBottom: "var(--space-2xl)" }}>
        
        {/* Contact Card */}
        <div className="dashboard-card" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "var(--space-2xl) var(--space-xl)", background: "var(--bg-hover)", border: "1px solid var(--accent-primary)" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--accent-primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", marginBottom: "var(--space-lg)", boxShadow: "0 8px 16px rgba(59, 130, 246, 0.3)" }}>
            <Mail size={32} />
          </div>
          <h2 className="h2" style={{ marginBottom: "var(--space-xs)" }}>Contact Support</h2>
          <p className="text-muted" style={{ marginBottom: "var(--space-lg)" }}>We usually respond within 24 hours.</p>
          <a href="mailto:mehulgoyal8888@gmail.com" style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--accent-primary)",
            textDecoration: "none",
            background: "white",
            padding: "12px 24px",
            borderRadius: "var(--radius-full)",
            border: "1px solid var(--border-light)",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            boxShadow: "var(--shadow-sm)"
          }}>
            mehulgoyal8888@gmail.com <ExternalLink size={18} />
          </a>
        </div>

        {/* Resources */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          <div className="dashboard-card" style={{ display: "flex", alignItems: "center", gap: 16, cursor: "pointer", transition: "transform 0.2s", ":hover": { transform: "translateY(-2px)" } } as React.CSSProperties}>
            <div style={{ padding: 12, background: "rgba(59, 130, 246, 0.1)", color: "var(--accent-primary)", borderRadius: 12 }}>
              <MessageCircle size={24} />
            </div>
            <div>
              <h3 style={{ fontWeight: 600, fontSize: "1.1rem" }}>Live Chat</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Chat with our AI assistant for instant help.</p>
            </div>
          </div>
          <div className="dashboard-card" style={{ display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }}>
            <div style={{ padding: 12, background: "rgba(16, 185, 129, 0.1)", color: "var(--accent-success)", borderRadius: 12 }}>
              <FileQuestion size={24} />
            </div>
            <div>
              <h3 style={{ fontWeight: 600, fontSize: "1.1rem" }}>Documentation</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Detailed guides on using ContentLens Pro.</p>
            </div>
          </div>
        </div>

      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="h2" style={{ marginBottom: "var(--space-lg)" }}>Frequently Asked Questions</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          {faqs.map((faq, i) => (
            <div key={i} className="dashboard-card" style={{ padding: "var(--space-lg)" }}>
              <h3 style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: 8, color: "var(--text-primary)" }}>{faq.q}</h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
