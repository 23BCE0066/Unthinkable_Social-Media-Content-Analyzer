"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";

const engagementData = [
  { time: "00:00", rate: 1.2 },
  { time: "04:00", rate: 0.8 },
  { time: "08:00", rate: 3.4 },
  { time: "12:00", rate: 4.8 },
  { time: "16:00", rate: 5.2 },
  { time: "20:00", rate: 6.8 },
  { time: "24:00", rate: 2.1 },
];

export default function EngagementPage() {
  return (
    <div style={{ animation: "fadeIn 0.4s ease-out", paddingBottom: "var(--space-2xl)" }}>
      <div style={{ marginBottom: "var(--space-xl)" }}>
        <h1 className="h1" style={{ marginBottom: "var(--space-xs)" }}>Engagement Tracking</h1>
        <p className="text-muted">Monitor likes, comments, shares, and overall engagement health.</p>
      </div>

      <div className="metrics-grid" style={{ marginBottom: "var(--space-xl)" }}>
        {[
          { label: "Avg Likes", value: "3.4K", icon: Heart },
          { label: "Avg Comments", value: "482", icon: MessageCircle },
          { label: "Total Shares", value: "1.2K", icon: Share2 },
          { label: "Saves", value: "840", icon: Bookmark },
        ].map((kpi, i) => (
          <div key={i} className="dashboard-card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", fontWeight: 500 }}>{kpi.label}</p>
              <div style={{ color: "var(--accent-primary)", opacity: 0.8 }}><kpi.icon size={18} /></div>
            </div>
            <h3 style={{ fontSize: "1.75rem", fontWeight: 700 }}>{kpi.value}</h3>
          </div>
        ))}
      </div>

      <div className="dashboard-card">
        <h3 className="h3" style={{ marginBottom: "var(--space-lg)" }}>Engagement Heatmap (24h)</h3>
        <div style={{ height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={engagementData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEngage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-success)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--accent-success)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "var(--shadow-md)" }} />
              <Area type="monotone" dataKey="rate" stroke="var(--accent-success)" strokeWidth={3} fill="url(#colorEngage)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
