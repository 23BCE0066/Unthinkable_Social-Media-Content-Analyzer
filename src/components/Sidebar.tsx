"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Activity, 
  Users, 
  LineChart, 
  BarChart3, 
  MessageSquare,
  FileText,
  Download,
  HelpCircle,
  Settings,
  CreditCard
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Realtime", href: "/realtime", icon: Activity },
  { name: "Accounts", href: "/accounts", icon: Users },
  { name: "Performance", href: "/performance", icon: LineChart },
  { name: "Audience", href: "/audience", icon: BarChart3 },
  { name: "Engagement", href: "/engagement", icon: MessageSquare },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Export", href: "/export", icon: Download },
];

const BOTTOM_NAV_ITEMS = [
  { name: "Help Center", href: "/help", icon: HelpCircle },
  { name: "Subscription", href: "/billing", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div style={{ height: "var(--topbar-height)", display: "flex", alignItems: "center", padding: "0 var(--space-xl)", borderBottom: "1px solid var(--border-light)" }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--text-primary)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.25rem",
            }}
          >
            ✦
          </div>
          <span style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text-primary)" }}>
            ContentLens
          </span>
        </Link>
      </div>

      {/* Main Nav */}
      <div style={{ padding: "var(--space-lg) 0", flex: 1 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`nav-item ${isActive ? "active" : ""}`}
            >
              <Icon />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Bottom Nav */}
      <div style={{ padding: "var(--space-lg) 0", borderTop: "1px solid var(--border-light)" }}>
        {BOTTOM_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="nav-item"
              style={{ padding: "0.5rem var(--space-lg)", fontSize: "0.875rem" }}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
