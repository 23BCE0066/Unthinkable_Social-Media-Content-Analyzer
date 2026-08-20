"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Users, TrendingUp, BarChart3, Activity } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AnalysisResult({ analysis }: { analysis: any }) {
  if (!analysis || !analysis.predictiveMetrics) return null;

  const {
    predictiveMetrics,
    performanceOverTime,
    demographics,
    toneAnalysis,
    suggestions,
    hashtags,
  } = analysis;

  // Format numbers to K or M
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f43f5e", "#f59e0b", "#64748b"];

  // Prepare Age Demographics data
  const ageData = Object.entries(demographics?.age || {}).map(([key, value]) => ({
    name: key,
    value: value as number,
  }));

  // Prepare Gender Demographics data
  const genderData = [
    { name: "Male", value: demographics?.gender?.male || 0 },
    { name: "Female", value: demographics?.gender?.female || 0 },
    { name: "Unspecified", value: demographics?.gender?.unspecified || 0 },
  ];

  return (
    <div style={{ animation: "fadeIn 0.5s ease-out" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-md)" }}>
        <h2 className="h2">Overview</h2>
        <div style={{ display: "flex", gap: "var(--space-sm)" }}>
          <button className="btn btn-secondary btn-sm" style={{ padding: "0.25rem 0.75rem", fontSize: "0.75rem" }}>
            AI Predictive Model
          </button>
        </div>
      </div>

      {/* Top Metrics Grid */}
      <div className="metrics-grid">
        <div className="dashboard-card">
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", color: "var(--text-secondary)", marginBottom: "var(--space-md)" }}>
            <Users size={16} />
            <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>Followers Growth</span>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "var(--space-xs)" }}>
            {formatNumber(predictiveMetrics.followerGrowth)}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--accent-success)", fontWeight: 500 }}>
            ▲ +{(predictiveMetrics.followerGrowth * 0.05).toFixed(1)}% Last 30 days
          </div>
        </div>

        <div className="dashboard-card">
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", color: "var(--text-secondary)", marginBottom: "var(--space-md)" }}>
            <Activity size={16} />
            <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>Engagement Rate</span>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "var(--space-xs)" }}>
            {predictiveMetrics.engagementRate}%
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--accent-success)", fontWeight: 500 }}>
            ▲ High Potential
          </div>
        </div>

        <div className="dashboard-card">
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", color: "var(--text-secondary)", marginBottom: "var(--space-md)" }}>
            <BarChart3 size={16} />
            <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>Post Reach</span>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "var(--space-xs)" }}>
            {formatNumber(predictiveMetrics.reach)}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--accent-success)", fontWeight: 500 }}>
            ▲ +14.11% Last 30 days
          </div>
        </div>

        <div className="dashboard-card">
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", color: "var(--text-secondary)", marginBottom: "var(--space-md)" }}>
            <TrendingUp size={16} />
            <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>Impressions</span>
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "var(--space-xs)" }}>
            {formatNumber(predictiveMetrics.impressions)}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--accent-success)", fontWeight: 500 }}>
            ▲ AI Forecast
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Main Line Chart */}
        <div className="dashboard-card" style={{ display: "flex", flexDirection: "column" }}>
          <h3 className="h3" style={{ marginBottom: "var(--space-lg)" }}>Platform Impressions Forecast</h3>
          <div style={{ flex: 1, minHeight: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceOverTime} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-secondary)" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--text-secondary)" }} tickFormatter={(value) => formatNumber(value)} />
                <Tooltip 
                  contentStyle={{ borderRadius: "8px", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-md)" }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Line type="monotone" dataKey="facebook" name="Facebook" stroke="var(--chart-1)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="instagram" name="Instagram" stroke="var(--chart-2)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="linkedin" name="LinkedIn" stroke="var(--chart-3)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tone & AI Score */}
        <div className="dashboard-card" style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
          <div>
            <h3 className="h3" style={{ marginBottom: "var(--space-xs)" }}>Content Quality</h3>
            <p className="text-muted">AI Engagement Score out of 10</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-sm)", marginTop: "var(--space-md)" }}>
              <span style={{ fontSize: "3.5rem", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1 }}>{analysis.engagementScore}</span>
              <span style={{ fontSize: "1.25rem", color: "var(--text-tertiary)" }}>/ 10</span>
            </div>
            <p style={{ fontSize: "0.875rem", marginTop: "var(--space-sm)", color: "var(--text-secondary)" }}>
              {analysis.scoreExplanation}
            </p>
          </div>

          <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "var(--space-lg)" }}>
            <h3 className="h3" style={{ marginBottom: "var(--space-md)" }}>Detected Tone</h3>
            <div style={{ 
              display: "inline-block", 
              padding: "0.35rem 0.75rem", 
              background: "rgba(14, 165, 233, 0.1)", 
              color: "var(--accent-primary)", 
              borderRadius: "var(--radius-full)",
              fontSize: "0.875rem",
              fontWeight: 600,
              marginBottom: "var(--space-sm)"
            }}>
              {toneAnalysis.primary}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-xs)" }}>
              {toneAnalysis.emotions.map((emotion: string, i: number) => (
                <span key={i} style={{ fontSize: "0.75rem", color: "var(--text-secondary)", background: "var(--bg-hover)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
                  {emotion}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Demographics Grid */}
      <div className="demographics-grid">
        {/* Age */}
        <div className="dashboard-card">
          <h3 className="h3" style={{ marginBottom: "var(--space-lg)" }}>Age</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
            {ageData.map((item, index) => (
              <div key={index}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: "var(--space-xs)" }}>
                  <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>{item.name}</span>
                  <span style={{ fontWeight: 600 }}>{item.value}%</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: `${item.value}%`, backgroundColor: COLORS[index % COLORS.length] }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gender */}
        <div className="dashboard-card" style={{ display: "flex", flexDirection: "column" }}>
          <h3 className="h3" style={{ marginBottom: "var(--space-xs)" }}>Gender</h3>
          <p className="text-muted" style={{ marginBottom: "var(--space-lg)" }}>Predicted audience demographic</p>
          <div style={{ flex: 1, position: "relative", minHeight: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Custom Legend to match BlazeCore */}
            <div style={{ position: "absolute", top: "50%", left: 0, transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
              {genderData.map((entry, index) => (
                <div key={index}>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{entry.name}</div>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>{entry.value}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Country */}
        <div className="dashboard-card">
          <h3 className="h3" style={{ marginBottom: "var(--space-lg)" }}>Country</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
            {demographics?.country?.map((item: any, index: number) => (
              <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: COLORS[index % COLORS.length], display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "10px", fontWeight: "bold" }}>
                    {item.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)", fontWeight: 500 }}>{item.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", width: "50%" }}>
                  <div style={{ fontSize: "0.875rem", fontWeight: 600, width: "40px", textAlign: "right" }}>
                    {item.percent}%
                  </div>
                  <div className="progress-bar-container" style={{ flex: 1, height: 4 }}>
                    <div className="progress-bar-fill" style={{ width: `${item.percent}%`, backgroundColor: COLORS[index % COLORS.length] }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Suggestions (Bottom Section) */}
      <div className="dashboard-card" style={{ marginTop: "var(--space-xl)" }}>
        <h3 className="h3" style={{ marginBottom: "var(--space-lg)" }}>AI Growth Suggestions</h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-lg)" }}>
          {suggestions?.map((suggestion: any, index: number) => (
            <div key={index} style={{ padding: "var(--space-md)", background: "var(--bg-hover)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-sm)" }}>
                <h4 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)" }}>{suggestion.title}</h4>
                <span style={{ 
                  fontSize: "0.75rem", 
                  fontWeight: 600, 
                  textTransform: "uppercase", 
                  padding: "0.2rem 0.5rem", 
                  borderRadius: "4px",
                  background: suggestion.impact === "high" ? "rgba(22, 163, 74, 0.1)" : "rgba(245, 158, 11, 0.1)",
                  color: suggestion.impact === "high" ? "#16a34a" : "#d97706"
                }}>
                  {suggestion.impact} Impact
                </span>
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                {suggestion.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Hashtags */}
        <div style={{ marginTop: "var(--space-lg)", paddingTop: "var(--space-lg)", borderTop: "1px solid var(--border-light)" }}>
          <h4 style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "var(--space-sm)" }}>Recommended Hashtags</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-sm)" }}>
            {hashtags?.map((tag: string, index: number) => (
              <span key={index} style={{ fontSize: "0.875rem", color: "var(--accent-primary)", cursor: "pointer" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
