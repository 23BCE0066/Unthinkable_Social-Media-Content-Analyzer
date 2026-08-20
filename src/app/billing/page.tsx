"use client";

import React, { useState } from "react";
import { Check, Shield, Zap } from "lucide-react";

export default function BillingPage() {
  const [isProcessing, setIsProcessing] = useState(false);

  const loadRazorpay = async () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleSubscribe = async (amount: number, planName: string) => {
    setIsProcessing(true);
    const res = await loadRazorpay();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setIsProcessing(false);
      return;
    }

    try {
      // Create order on the backend
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
          currency: "INR",
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "ContentLens Pro",
        description: `Subscription for ${planName} Plan`,
        order_id: data.id,
        handler: function (response: any) {
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
          // Note: In production, send response.razorpay_payment_id, response.razorpay_order_id, and response.razorpay_signature to backend for verification.
        },
        prefill: {
          name: "John Doe",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3b82f6",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ animation: "fadeIn 0.4s ease-out", paddingBottom: "var(--space-2xl)" }}>
      <div style={{ textAlign: "center", marginBottom: "var(--space-2xl)", marginTop: "var(--space-xl)" }}>
        <h1 className="h1" style={{ marginBottom: "var(--space-sm)" }}>Upgrade to ContentLens Pro</h1>
        <p className="text-muted" style={{ maxWidth: 500, margin: "0 auto" }}>
          Unlock AI-powered engagement forecasting, unlimited PDF uploads, and custom data exports.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--space-xl)", maxWidth: 900, margin: "0 auto" }}>
        
        {/* Monthly Plan */}
        <div className="dashboard-card" style={{ display: "flex", flexDirection: "column", padding: "var(--space-xl)" }}>
          <div style={{ marginBottom: "var(--space-lg)" }}>
            <h3 className="h3">Monthly</h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 8 }}>
              <span style={{ fontSize: "2.5rem", fontWeight: 800 }}>₹199</span>
              <span className="text-muted">/month</span>
            </div>
          </div>
          
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 var(--space-xl) 0", flex: 1 }}>
            {[
              "100 AI Forecasts / month",
              "Basic Analytics Dashboard",
              "Standard Support",
            ].map((feature, i) => (
              <li key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, color: "var(--text-secondary)" }}>
                <Check size={18} color="var(--accent-primary)" />
                {feature}
              </li>
            ))}
          </ul>

          <button 
            onClick={() => handleSubscribe(199, "Monthly")}
            disabled={isProcessing}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "8px",
              border: "1px solid var(--accent-primary)",
              background: "transparent",
              color: "var(--accent-primary)",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: isProcessing ? "not-allowed" : "pointer",
            }}
          >
            {isProcessing ? "Processing..." : "Subscribe Monthly"}
          </button>
        </div>

        {/* Yearly Plan */}
        <div className="dashboard-card" style={{ display: "flex", flexDirection: "column", padding: "var(--space-xl)", border: "2px solid var(--accent-primary)", position: "relative" }}>
          <div style={{ 
            position: "absolute", 
            top: -12, 
            left: "50%", 
            transform: "translateX(-50%)", 
            background: "var(--accent-primary)", 
            color: "white",
            padding: "4px 12px",
            borderRadius: "12px",
            fontSize: "0.75rem",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 4
          }}>
            <Zap size={12} fill="currentColor" /> BEST VALUE
          </div>

          <div style={{ marginBottom: "var(--space-lg)" }}>
            <h3 className="h3">Yearly</h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 8 }}>
              <span style={{ fontSize: "2.5rem", fontWeight: 800 }}>₹1800</span>
              <span className="text-muted">/year</span>
            </div>
            <p style={{ color: "var(--accent-success)", fontSize: "0.875rem", fontWeight: 600, marginTop: 4 }}>Save ₹588 annually!</p>
          </div>
          
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 var(--space-xl) 0", flex: 1 }}>
            {[
              "Unlimited AI Forecasts",
              "Advanced Analytics & Exports",
              "Priority 24/7 Support",
              "Custom Integrations",
            ].map((feature, i) => (
              <li key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, color: "var(--text-secondary)" }}>
                <Check size={18} color="var(--accent-primary)" />
                {feature}
              </li>
            ))}
          </ul>

          <button 
            onClick={() => handleSubscribe(1800, "Yearly")}
            disabled={isProcessing}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "8px",
              border: "none",
              background: "var(--accent-primary)",
              color: "white",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: isProcessing ? "not-allowed" : "pointer",
              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
            }}
          >
            {isProcessing ? "Processing..." : "Subscribe Yearly"}
          </button>
        </div>

      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: "var(--space-xl)", color: "var(--text-tertiary)" }}>
        <Shield size={16} />
        <span style={{ fontSize: "0.875rem" }}>Secure payments powered by Razorpay</span>
      </div>
    </div>
  );
}
