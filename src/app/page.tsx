"use client";

import React, { useState, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import FileUploader from "@/components/FileUploader";
import ExtractedText from "@/components/ExtractedText";
import AnalysisResult from "@/components/AnalysisResult";
import LoadingState from "@/components/LoadingState";

interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnalysisData = any;

type AppState = "idle" | "extracting" | "extracted" | "analyzing" | "analyzed" | "error";

export default function Home() {
  const { isSignedIn } = useAuth();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [extractedText, setExtractedText] = useState<string>("");
  const [extractedFileName, setExtractedFileName] = useState<string>("");
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [appState, setAppState] = useState<AppState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  const handleFilesSelected = useCallback((newFiles: UploadedFile[]) => {
    setUploadedFiles((prev) => [...prev, ...newFiles]);
    setAppState("idle");
    setAnalysis(null);
    setExtractedText("");
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
    // Use Tesseract.js for OCR (loaded client-side)
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

      setExtractedText(allText);
      setExtractedFileName(
        uploadedFiles.length === 1
          ? uploadedFiles[0].file.name
          : `${uploadedFiles.length} files combined`
      );
      setProgress(50);
      setAppState("extracted");

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
    setExtractedText("");
    setExtractedFileName("");
    setAnalysis(null);
    setAppState("idle");
    setProgress(0);
    setErrorMessage("");
  };

  const isProcessing = appState === "extracting" || appState === "analyzing";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <section className="hero">
          <div className="container container-sm">
            <div className="animate-fade-in-up">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "var(--space-sm)",
                  padding: "var(--space-xs) var(--space-md)",
                  background: "var(--bg-glass)",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid var(--border-primary)",
                  fontSize: "0.8125rem",
                  color: "var(--text-secondary)",
                  marginBottom: "var(--space-lg)",
                }}
              >
                <span className="pulse-dot" />
                Powered by Gemini AI
              </div>

              <h1 className="hero-title">
                Analyze Your Content.{" "}
                <span className="gradient-text">Maximize Engagement.</span>
              </h1>

              <p className="hero-subtitle">
                Upload PDFs or images, extract text with advanced OCR, and get AI-powered
                insights to supercharge your social media presence.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section style={{ paddingBottom: "var(--space-4xl)" }}>
          <div className="container container-sm">
            {/* Upload Section */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <FileUploader
                onFilesSelected={handleFilesSelected}
                uploadedFiles={uploadedFiles}
                onRemoveFile={handleRemoveFile}
                isProcessing={isProcessing}
              />
            </div>

            {/* Action Buttons */}
            {uploadedFiles.length > 0 && appState !== "analyzed" && (
              <div
                className="animate-fade-in-up"
                style={{
                  display: "flex",
                  gap: "var(--space-md)",
                  justifyContent: "center",
                  marginTop: "var(--space-xl)",
                  animationDelay: "0.15s",
                }}
              >
                {!isProcessing && (
                  <>
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={handleExtractAndAnalyze}
                      disabled={!isSignedIn}
                      title={!isSignedIn ? "Please sign in to analyze content" : ""}
                      style={{
                        opacity: !isSignedIn ? 0.5 : 1,
                      }}
                    >
                      <span>🚀</span>
                      {!isSignedIn ? "Sign in to Analyze" : "Extract & Analyze"}
                    </button>
                    <button className="btn btn-secondary btn-lg" onClick={handleReset}>
                      Clear All
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Progress Bar */}
            {isProcessing && (
              <div
                className="animate-fade-in"
                style={{ marginTop: "var(--space-xl)" }}
              >
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Loading State */}
            {appState === "extracting" && (
              <LoadingState
                message="Extracting text from your files..."
                subMessage="PDF parsing and OCR in progress"
              />
            )}

            {appState === "analyzing" && (
              <LoadingState
                message="AI is analyzing your content..."
                subMessage="Generating engagement insights and suggestions"
              />
            )}

            {/* Error State */}
            {appState === "error" && (
              <div
                className="analysis-card animate-fade-in-up"
                style={{
                  marginTop: "var(--space-xl)",
                  textAlign: "center",
                  borderColor: "rgba(239, 68, 68, 0.3)",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "var(--space-md)" }}>⚠️</div>
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "var(--accent-danger)",
                    marginBottom: "var(--space-sm)",
                  }}
                >
                  Something went wrong
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.9375rem",
                    marginBottom: "var(--space-lg)",
                    maxWidth: 500,
                    margin: "0 auto var(--space-lg)",
                  }}
                >
                  {errorMessage}
                </p>
                <div style={{ display: "flex", gap: "var(--space-md)", justifyContent: "center" }}>
                  <button className="btn btn-primary" onClick={handleExtractAndAnalyze}>
                    Try Again
                  </button>
                  <button className="btn btn-secondary" onClick={handleReset}>
                    Start Over
                  </button>
                </div>
              </div>
            )}

            {/* Results Section */}
            {appState === "analyzed" && (
              <div style={{ marginTop: "var(--space-2xl)" }}>
                {/* Reset button */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "var(--space-lg)",
                  }}
                >
                  <button className="btn btn-secondary btn-sm" onClick={handleReset}>
                    ↻ New Analysis
                  </button>
                </div>

                {/* Extracted Text */}
                <div style={{ marginBottom: "var(--space-lg)" }}>
                  <ExtractedText text={extractedText} fileName={extractedFileName} />
                </div>

                {/* Analysis Results */}
                {analysis && <AnalysisResult analysis={analysis} />}
              </div>
            )}

            {/* Empty State (when no files uploaded) */}
            {uploadedFiles.length === 0 && appState === "idle" && (
              <div className="empty-state animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <div className="empty-state-icon">📊</div>
                <div>
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      marginBottom: "var(--space-xs)",
                    }}
                  >
                    No files uploaded yet
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-tertiary)",
                    }}
                  >
                    Upload a PDF or image to get started with AI-powered content analysis
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            borderTop: "1px solid var(--border-primary)",
            padding: "var(--space-xl) 0",
            textAlign: "center",
          }}
        >
          <div className="container">
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-tertiary)",
              }}
            >
              Built by <strong style={{ color: "var(--text-secondary)" }}>Mehul Goyal</strong> •{" "}
              Powered by{" "}
              <span className="gradient-text" style={{ fontWeight: 600 }}>
                Gemini AI
              </span>{" "}
              • Secured by{" "}
              <span style={{ color: "var(--accent-primary-light)", fontWeight: 600 }}>Clerk</span>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
