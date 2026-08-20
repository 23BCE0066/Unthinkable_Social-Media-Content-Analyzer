"use client";

import React from "react";
import { UserButton, SignInButton, Show } from "@clerk/nextjs";
import { Search, Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header className="topbar">
      {/* Search */}
      <div style={{ display: "flex", alignItems: "center", width: "100%", maxWidth: "400px" }}>
        <div 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "var(--space-sm)",
            backgroundColor: "var(--bg-app)",
            padding: "0.5rem 1rem",
            borderRadius: "var(--radius-full)",
            width: "100%",
            border: "1px solid var(--border-light)"
          }}
        >
          <Search size={18} color="var(--text-tertiary)" />
          <input 
            type="text" 
            placeholder="Search..." 
            style={{
              border: "none",
              background: "transparent",
              outline: "none",
              color: "var(--text-primary)",
              width: "100%",
              fontSize: "0.875rem"
            }}
          />
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-lg)" }}>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)" }}>
          <Bell size={20} />
        </button>

        <div style={{ width: "1px", height: "24px", backgroundColor: "var(--border-light)" }}></div>

        <Show when="signed-in">
          <UserButton />
        </Show>

        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="btn btn-primary btn-sm">
              Sign In
            </button>
          </SignInButton>
        </Show>
      </div>
    </header>
  );
}
