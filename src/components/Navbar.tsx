"use client";

import React from "react";
import { UserButton, SignInButton, Show } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-inner">
          {/* Brand */}
          <a href="/" className="navbar-brand" style={{ textDecoration: "none" }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "var(--radius-md)",
                background: "var(--gradient-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.125rem",
              }}
            >
              🔍
            </div>
            <span>
              Content<span className="gradient-text">Lens</span>{" "}
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "var(--text-tertiary)",
                  verticalAlign: "super",
                }}
              >
                AI
              </span>
            </span>
          </a>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
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
        </div>
      </div>
    </nav>
  );
}
