"use client";

import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ArrowUpRight, ArrowDownRight, Activity, Users, Clock, Zap } from "lucide-react";

interface DummyDashboardProps {
  title: string;
  description: string;
}

const generateSparklineData = () => {
  return Array.from({ length: 14 }).map((_, i) => ({
    name: `Day ${i + 1}`,
    value: Math.floor(Math.random() * 5000) + 1000,
  }));
};

const generateBarData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  return months.map(month => ({
    name: month,
    organic: Math.floor(Math.random() * 8000) + 2000,
    paid: Math.floor(Math.random() * 4000) + 500,
  }));
};

const PIE_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#6366f1"];

export default function DummyDashboard({ title, description }: DummyDashboardProps) {
  const areaData = generateSparklineData();
  const barData = generateBarData();
  const pieData = [
    { name: "Direct", value: 400 },
    { name: "Social", value: 300 },
    { name: "Referral", value: 300 },
    { name: "Organic", value: 200 },
  ];

  return (
    <div style={{ animation: "fadeIn 0.4s ease-out", paddingBottom: "var(--space-2xl)" }}>
      <div style={{ marginBottom: "var(--space-xl)" }}>
        <h1 className="h1" style={{ marginBottom: "var(--space-xs)" }}>{title}</h1>
        <p className="text-muted">{description}</p>
      </div>

      {/* KPI Cards */}
      <div className="metrics-grid" style={{ marginBottom: "var(--space-xl)" }}>
        {[
          { label: "Total Views", value: "2.4M", trend: "+12.5%", isUp: true, icon: Activity },
          { label: "Active Users", value: "145.2K", trend: "+8.2%", isUp: true, icon: Users },
          { label: "Avg Session", value: "4m 32s", trend: "-2.1%", isUp: false, icon: Clock },
          { label: "Conversion", value: "3.24%", trend: "+1.1%", isUp: true, icon: Zap },
        ].map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="dashboard-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-md)" }}>
                <div style={{ color: "var(--text-secondary)" }}>
                  <Icon size={18} />
                </div>
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  fontSize: "0.75rem", 
                  fontWeight: 600,
                  color: kpi.isUp ? "var(--accent-success)" : "var(--accent-danger)",
                  backgroundColor: kpi.isUp ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "var(--radius-full)"
                }}>
                  {kpi.isUp ? <ArrowUpRight size={14} style={{ marginRight: 2 }} /> : <ArrowDownRight size={14} style={{ marginRight: 2 }} />}
                  {kpi.trend}
                </div>
              </div>
              <div>
                <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "var(--space-xs)" }}>{kpi.label}</p>
                <h3 style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text-primary)" }}>{kpi.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "var(--space-xl)", marginBottom: "var(--space-xl)", alignItems: "stretch" }}>
        
        {/* Main Area Chart */}
        <div className="dashboard-card" style={{ display: "flex", flexDirection: "column" }}>
          <h3 className="h3" style={{ marginBottom: "var(--space-xs)" }}>Traffic Overview</h3>
          <p className="text-muted" style={{ marginBottom: "var(--space-lg)" }}>Daily active users over the last 14 days</p>
          <div style={{ flex: 1, minHeight: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-tertiary)" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-tertiary)" }} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-md)" }} />
                <Area type="monotone" dataKey="value" stroke="var(--accent-primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Source Breakdown */}
        <div className="dashboard-card" style={{ display: "flex", flexDirection: "column" }}>
          <h3 className="h3" style={{ marginBottom: "var(--space-xs)" }}>Acquisition</h3>
          <p className="text-muted" style={{ marginBottom: "var(--space-lg)" }}>Traffic sources</p>
          <div style={{ flex: 1, minHeight: 250, position: "relative" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: "8px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 500 }}>Total</span>
              <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)" }}>1.2K</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="dashboard-card">
        <h3 className="h3" style={{ marginBottom: "var(--space-xs)" }}>Organic vs Paid Growth</h3>
        <p className="text-muted" style={{ marginBottom: "var(--space-lg)" }}>Monthly comparison</p>
        <div style={{ height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 20, right: 0, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-tertiary)" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-tertiary)" }} />
              <Tooltip cursor={{ fill: "var(--bg-hover)" }} contentStyle={{ borderRadius: "8px", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-md)" }} />
              <Bar dataKey="organic" name="Organic Reach" stackId="a" fill="var(--chart-1)" radius={[0, 0, 4, 4]} />
              <Bar dataKey="paid" name="Paid Reach" stackId="a" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
