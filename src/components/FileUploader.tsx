"use client";

import React, { useCallback, useRef, useState } from "react";

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
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ACCEPTED_TYPES = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "image/bmp",
    "image/tiff",
  ];

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const processFiles = useCallback(
    (fileList: FileList | File[]) => {
      const newFiles: UploadedFile[] = [];

      Array.from(fileList).forEach((file) => {
        if (!ACCEPTED_TYPES.includes(file.type)) {
          alert(`"${file.name}" is not a supported file type. Please upload PDF or image files.`);
          return;
        }
        if (file.size > MAX_FILE_SIZE) {
          alert(`"${file.name}" exceeds the 10MB file size limit.`);
          return;
        }

        const uploadedFile: UploadedFile = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          file,
        };

        if (file.type.startsWith("image/")) {
          uploadedFile.preview = URL.createObjectURL(file);
        }

        newFiles.push(uploadedFile);
      });

      if (newFiles.length > 0) {
        onFilesSelected(newFiles);
      }
    },
    [onFilesSelected]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
      if (e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    },
    [processFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files);
      }
      // Reset input value so the same file can be re-selected
      e.target.value = "";
    },
    [processFiles]
  );

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getFileIcon = (type: string): string => {
    if (type === "application/pdf") return "📄";
    if (type.startsWith("image/")) return "🖼️";
    return "📁";
  };

  return (
    <div>
      {/* Drop Zone */}
      <div
        className={`upload-zone ${isDragActive ? "drag-active" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isProcessing && fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Upload files by dropping them here or clicking to browse"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        style={{ opacity: isProcessing ? 0.6 : 1, pointerEvents: isProcessing ? "none" : "auto" }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.png,.jpg,.jpeg,.webp,.bmp,.tiff"
          onChange={handleFileInput}
          style={{ display: "none" }}
          id="file-upload-input"
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontSize: "3rem",
              marginBottom: "var(--space-md)",
              animation: isDragActive ? "floatUp 1s ease-in-out infinite" : "none",
            }}
          >
            {isDragActive ? "📥" : "☁️"}
          </div>

          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              marginBottom: "var(--space-sm)",
              color: isDragActive ? "var(--accent-primary-light)" : "var(--text-primary)",
            }}
          >
            {isDragActive ? "Drop your files here" : "Drag & drop files here"}
          </h3>

          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.875rem",
              marginBottom: "var(--space-lg)",
            }}
          >
            or click to browse from your device
          </p>

          <div
            style={{
              display: "flex",
              gap: "var(--space-sm)",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <span className="tag">PDF</span>
            <span className="tag">PNG</span>
            <span className="tag">JPG</span>
            <span className="tag">WebP</span>
            <span className="tag">BMP</span>
          </div>

          <p
            style={{
              color: "var(--text-tertiary)",
              fontSize: "0.75rem",
              marginTop: "var(--space-md)",
            }}
          >
            Max 10MB per file
          </p>
        </div>
      </div>

      {/* File List */}
      {uploadedFiles.length > 0 && (
        <div
          style={{
            marginTop: "var(--space-lg)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-sm)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "var(--space-xs)",
            }}
          >
            <h4
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--text-secondary)",
              }}
            >
              {uploadedFiles.length} file{uploadedFiles.length > 1 ? "s" : ""} selected
            </h4>
          </div>

          {uploadedFiles.map((uf) => (
            <div key={uf.id} className="file-card">
              {uf.preview ? (
                <img
                  src={uf.preview}
                  alt={uf.file.name}
                  style={{
                    width: 44,
                    height: 44,
                    objectFit: "cover",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-primary)",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "var(--radius-sm)",
                    background: "var(--bg-glass-strong)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.25rem",
                    flexShrink: 0,
                  }}
                >
                  {getFileIcon(uf.file.type)}
                </div>
              )}

              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  className="truncate"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                  }}
                >
                  {uf.file.name}
                </p>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-tertiary)",
                    marginTop: "2px",
                  }}
                >
                  {formatFileSize(uf.file.size)} •{" "}
                  {uf.file.type === "application/pdf" ? "PDF Document" : "Image"}
                </p>
              </div>

              <button
                className="btn btn-ghost btn-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFile(uf.id);
                }}
                disabled={isProcessing}
                aria-label={`Remove ${uf.file.name}`}
                style={{ fontSize: "1.25rem", color: "var(--text-tertiary)" }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
