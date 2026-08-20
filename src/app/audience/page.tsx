"use client";

import React from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Globe, Smartphone, Heart } from "lucide-react";

const geoData = [
  { name: "United States", users: 45000 },
  { name: "United Kingdom", users: 28000 },
  { name: "India", users: 15000 },
  { name: "Canada", users: 9000 },
  { name: "Australia", users: 6500 },
];

const ageData = [
  { name: "18-24", value: 35 },
  { name: "25-34", value: 45 },
  { name: "35-44", value: 15 },
  { name: "45+", value: 5 },
];
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];

export default function AudiencePage() {
  return (
    <div style={{ animation: "fadeIn 0.4s ease-out", paddingBottom: "var(--space-2xl)" }}>
      <div style={{ marginBottom: "var(--space-xl)" }}>
        <h1 className="h1" style={{ marginBottom: "var(--space-xs)" }}>Audience Insights</h1>
        <p className="text-muted">Deep dive into your followers demographics and behavior.</p>
      </div>

      <div className="metrics-grid" style={{ marginBottom: "var(--space-xl)" }}>
        {[
          { label: "Total Followers", value: "245.8K", icon: Users },
          { label: "Top Region", value: "USA", icon: Globe },
          { label: "Mobile Users", value: "84%", icon: Smartphone },
          { label: "Brand Sentiment", value: "Positive", icon: Heart },
        ].map((kpi, i) => (
          <div key={i} className="dashboard-card">
            <div style={{ display: "flex", alignItems: "center", marginBottom: "var(--space-md)" }}>
              <div style={{ 
                background: "var(--bg-hover)", 
                padding: "8px", 
                borderRadius: "8px", 
                color: "var(--accent-primary)",
                marginRight: "12px"
              }}>
                <kpi.icon size={18} />
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", fontWeight: 500 }}>{kpi.label}</p>
            </div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700 }}>{kpi.value}</h3>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-xl)" }}>
        <div className="dashboard-card">
          <h3 className="h3" style={{ marginBottom: "var(--space-lg)" }}>Age Distribution</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={ageData} innerRadius={80} outerRadius={110} paddingAngle={4} dataKey="value">
                  {ageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: "8px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="h3" style={{ marginBottom: "var(--space-lg)" }}>Top Regions</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={geoData} margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--border-light)" />
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "var(--bg-hover)" }} contentStyle={{ borderRadius: "8px" }} />
                <Bar dataKey="users" fill="var(--chart-3)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
