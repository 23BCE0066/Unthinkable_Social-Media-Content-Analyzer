"use client";

import React, { useState, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import FileUploader from "@/components/FileUploader";
import AnalysisResult from "@/components/AnalysisResult";
import LoadingState from "@/components/LoadingState";
import { Bot, RefreshCw } from "lucide-react";

interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnalysisData = any;

type AppState = "idle" | "extracting" | "analyzing" | "analyzed" | "error";

export default function Home() {
  const { isSignedIn } = useAuth();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [appState, setAppState] = useState<AppState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  const handleFilesSelected = useCallback((newFiles: UploadedFile[]) => {
    setUploadedFiles((prev) => [...prev, ...newFiles]);
    setAppState("idle");
    setAnalysis(null);
    setErrorMessage("");
  }, []);

  const handleRemoveFile = useCallback((id: string) => {
    setUploadedFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file?.preview) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/extract-pdf", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "PDF extraction failed");
    }

    const data = await res.json();
    return data.text;
  };

  const extractTextFromImage = async (file: File): Promise<string> => {
    const { createWorker } = await import("tesseract.js");
    const worker = await createWorker("eng");
    const {
      data: { text },
    } = await worker.recognize(file);
    await worker.terminate();
    return text;
  };

  const handleExtractAndAnalyze = async () => {
    if (uploadedFiles.length === 0) return;

    setAppState("extracting");
    setProgress(0);
    setErrorMessage("");

    try {
      let allText = "";
      const totalFiles = uploadedFiles.length;

      for (let i = 0; i < uploadedFiles.length; i++) {
        const uf = uploadedFiles[i];
        setProgress(Math.round(((i + 0.5) / totalFiles) * 40));

        let fileText = "";
        if (uf.file.type === "application/pdf") {
          fileText = await extractTextFromPDF(uf.file);
        } else if (uf.file.type.startsWith("image/")) {
          fileText = await extractTextFromImage(uf.file);
        }

        if (fileText.trim()) {
          if (allText) allText += "\n\n---\n\n";
          allText += fileText;
        }

        setProgress(Math.round(((i + 1) / totalFiles) * 40));
      }

      if (!allText.trim()) {
        setAppState("error");
        setErrorMessage("No text could be extracted from the uploaded files. Please try different files.");
        return;
      }

      // Auto-start analysis
      setAppState("analyzing");
      setProgress(60);

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: allText }),
      });

      setProgress(85);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Analysis failed");
      }

      const data = await res.json();
      setAnalysis(data.analysis);
      setProgress(100);
      setAppState("analyzed");
    } catch (err) {
      console.error("Processing error:", err);
      setAppState("error");
      setErrorMessage(err instanceof Error ? err.message : "An unexpected error occurred.");
    }
  };

  const handleReset = () => {
    uploadedFiles.forEach((f) => {
      if (f.preview) URL.revokeObjectURL(f.preview);
    });
    setUploadedFiles([]);
    setAnalysis(null);
    setAppState("idle");
    setProgress(0);
    setErrorMessage("");
  };

  const isProcessing = appState === "extracting" || appState === "analyzing";

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", animation: "fadeIn 0.3s ease-out" }}>
      {/* Header Area */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-xl)" }}>
        <div>
          <h1 className="h1" style={{ marginBottom: "var(--space-xs)" }}>Analytics Overview</h1>
          <p className="text-muted">AI-powered engagement and demographic forecast</p>
        </div>
        
        {/* Run Analysis Button (Top Right) */}
        {uploadedFiles.length > 0 && appState !== "analyzed" && !isProcessing && (
          <button
            className="btn btn-primary"
            onClick={handleExtractAndAnalyze}
            disabled={!isSignedIn}
            title={!isSignedIn ? "Please sign in to analyze content" : ""}
          >
            <Bot size={18} />
            Generate Forecast
          </button>
        )}
        
        {appState === "analyzed" && (
          <button className="btn btn-secondary" onClick={handleReset}>
            <RefreshCw size={18} />
            New Analysis
          </button>
        )}
      </div>

      {/* Upload Section (Always visible unless fully analyzed, then can be minimized or reset) */}
      {appState !== "analyzed" && (
        <FileUploader
          onFilesSelected={handleFilesSelected}
          uploadedFiles={uploadedFiles}
          onRemoveFile={handleRemoveFile}
          isProcessing={isProcessing}
        />
      )}

      {/* Loading States */}
      {isProcessing && (
        <div className="dashboard-card" style={{ textAlign: "center", padding: "var(--space-2xl)" }}>
          <LoadingState
            message={appState === "extracting" ? "Extracting content..." : "Running AI Predictive Model..."}
            subMessage={`${progress}% complete`}
          />
          <div className="progress-bar-container" style={{ maxWidth: 400, margin: "var(--space-lg) auto 0" }}>
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {/* Error State */}
      {appState === "error" && (
        <div className="dashboard-card" style={{ textAlign: "center", padding: "var(--space-2xl)", borderColor: "var(--accent-danger)" }}>
          <div style={{ fontSize: "3rem", marginBottom: "var(--space-md)" }}>⚠️</div>
          <h3 className="h3" style={{ color: "var(--accent-danger)", marginBottom: "var(--space-sm)" }}>Analysis Failed</h3>
          <p className="text-muted" style={{ marginBottom: "var(--space-lg)" }}>{errorMessage}</p>
          <div style={{ display: "flex", gap: "var(--space-md)", justifyContent: "center" }}>
            <button className="btn btn-primary" onClick={handleExtractAndAnalyze}>Try Again</button>
            <button className="btn btn-secondary" onClick={handleReset}>Start Over</button>
          </div>
        </div>
      )}

      {/* Results Dashboard */}
      {appState === "analyzed" && analysis && (
        <AnalysisResult analysis={analysis} />
      )}
    </div>
  );
}
