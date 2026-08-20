"use client";

import React, { useCallback, useState } from "react";
import { UploadCloud, FileType, Image as ImageIcon, X } from "lucide-react";

interface UploadedFile {
  id: string;
  file: File;
  preview?: string;
}

interface FileUploaderProps {
  onFilesSelected: (files: UploadedFile[]) => void;
  uploadedFiles: UploadedFile[];
  onRemoveFile: (id: string) => void;
  isProcessing: boolean;
}

export default function FileUploader({
  onFilesSelected,
  uploadedFiles,
  onRemoveFile,
  isProcessing,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(Array.from(e.dataTransfer.files));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(Array.from(e.target.files));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const processFiles = (files: File[]) => {
    const validFiles = files.filter(
      (file) =>
        file.type === "application/pdf" || file.type.startsWith("image/")
    );

    const newUploadedFiles = validFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined,
    }));

    onFilesSelected(newUploadedFiles);
  };

  return (
    <div className="dashboard-card" style={{ marginBottom: "var(--space-xl)" }}>
      {uploadedFiles.length === 0 ? (
        <div
          className={`dropzone ${isDragging ? "active" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "var(--bg-card)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto var(--space-md)",
              boxShadow: "var(--shadow-sm)",
              color: "var(--accent-primary)",
            }}
          >
            <UploadCloud size={32} />
          </div>
          <h3 className="h3" style={{ marginBottom: "var(--space-xs)" }}>
            Upload Content for Analysis
          </h3>
          <p className="text-muted" style={{ marginBottom: "var(--space-lg)" }}>
            Drag and drop a PDF or Image, or click to browse
          </p>
          <input
            type="file"
            id="file-upload"
            className="sr-only"
            style={{ display: "none" }}
            multiple
            accept="application/pdf,image/png,image/jpeg,image/webp"
            onChange={handleFileInput}
            disabled={isProcessing}
          />
          <label
            htmlFor="file-upload"
            className="btn btn-primary"
            style={{ cursor: isProcessing ? "not-allowed" : "pointer", opacity: isProcessing ? 0.5 : 1 }}
          >
            Browse Files
          </label>
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-md)" }}>
            <h3 className="h3">Selected Files ({uploadedFiles.length})</h3>
            <input
              type="file"
              id="file-upload-add"
              className="sr-only"
              style={{ display: "none" }}
              multiple
              accept="application/pdf,image/png,image/jpeg,image/webp"
              onChange={handleFileInput}
              disabled={isProcessing}
            />
            <label
              htmlFor="file-upload-add"
              className="btn btn-secondary btn-sm"
              style={{ cursor: isProcessing ? "not-allowed" : "pointer" }}
            >
              + Add More
            </label>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "var(--space-md)" }}>
            {uploadedFiles.map((uf) => (
              <div
                key={uf.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-md)",
                  padding: "var(--space-md)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-hover)",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    background: "var(--bg-card)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    border: "1px solid var(--border-light)",
                  }}
                >
                  {uf.preview ? (
                    <img
                      src={uf.preview}
                      alt={uf.file.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <FileType size={24} color="var(--text-tertiary)" />
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {uf.file.name}
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                    {(uf.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <button
                  onClick={() => onRemoveFile(uf.id)}
                  disabled={isProcessing}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: isProcessing ? "not-allowed" : "pointer",
                    color: "var(--text-tertiary)",
                    padding: "4px",
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
