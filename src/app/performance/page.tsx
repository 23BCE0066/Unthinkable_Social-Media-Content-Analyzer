"use client";

import React from "react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpRight, TrendingUp, Target, MousePointerClick, BarChart3 } from "lucide-react";

const performanceData = [
  { name: "Week 1", reach: 4000, impressions: 8400 },
  { name: "Week 2", reach: 3000, impressions: 6398 },
  { name: "Week 3", reach: 5000, impressions: 11800 },
  { name: "Week 4", reach: 7280, impressions: 15908 },
  { name: "Week 5", reach: 6890, impressions: 14800 },
  { name: "Week 6", reach: 8390, impressions: 19800 },
  { name: "Week 7", reach: 10490, impressions: 24300 },
];

const conversionData = [
  { name: "Mon", rate: 2.4 },
  { name: "Tue", rate: 2.8 },
  { name: "Wed", rate: 3.1 },
  { name: "Thu", rate: 2.9 },
  { name: "Fri", rate: 3.8 },
  { name: "Sat", rate: 4.2 },
  { name: "Sun", rate: 3.9 },
];

export default function PerformancePage() {
  return (
    <div style={{ animation: "fadeIn 0.4s ease-out", paddingBottom: "var(--space-2xl)" }}>
      <div style={{ marginBottom: "var(--space-xl)" }}>
        <h1 className="h1" style={{ marginBottom: "var(--space-xs)" }}>Performance Metrics</h1>
        <p className="text-muted">Track your overall content reach, impressions, and ROI.</p>
      </div>

      <div className="metrics-grid" style={{ marginBottom: "var(--space-xl)" }}>
        {[
          { label: "Total Impressions", value: "101.4K", icon: BarChart3 },
          { label: "Avg Reach", value: "34.2K", icon: Target },
          { label: "Click Rate", value: "4.8%", icon: MousePointerClick },
          { label: "Conversion (ROI)", value: "2.1%", icon: TrendingUp },
        ].map((kpi, i) => (
          <div key={i} className="dashboard-card">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-md)" }}>
              <div style={{ color: "var(--accent-primary)" }}><kpi.icon size={20} /></div>
              <div style={{ color: "var(--accent-success)", fontSize: "0.75rem", fontWeight: 600 }}>+12%</div>
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{kpi.label}</p>
            <h3 style={{ fontSize: "1.75rem", fontWeight: 700 }}>{kpi.value}</h3>
          </div>
        ))}
      </div>

      <div className="dashboard-card" style={{ marginBottom: "var(--space-xl)" }}>
        <h3 className="h3" style={{ marginBottom: "var(--space-lg)" }}>Reach vs Impressions</h3>
        <div style={{ height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorImp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "var(--shadow-md)" }} />
              <Area type="monotone" dataKey="impressions" stroke="var(--chart-2)" fill="url(#colorImp)" />
              <Area type="monotone" dataKey="reach" stroke="var(--chart-1)" fill="url(#colorReach)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
