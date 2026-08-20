# ContentLens AI — Social Media Content Analyzer

![ContentLens AI](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript) ![Gemini AI](https://img.shields.io/badge/Gemini-AI-purple?style=for-the-badge&logo=google) ![Clerk](https://img.shields.io/badge/Clerk-Auth-indigo?style=for-the-badge)

An AI-powered web application that analyzes social media content and suggests engagement improvements. Upload PDFs or images, extract text using advanced PDF parsing and OCR technology, and receive comprehensive AI-driven analysis powered by Google Gemini.

## ✨ Features

- **Document Upload** — Drag-and-drop or file picker for PDFs and images (PNG, JPG, WebP, BMP)
- **PDF Text Extraction** — Server-side parsing with formatting preservation using `pdf-parse`
- **OCR (Optical Character Recognition)** — Client-side image text extraction using Tesseract.js
- **AI Content Analysis** — Google Gemini-powered engagement scoring, tone analysis, and improvement suggestions
- **Platform-Specific Tips** — Tailored recommendations for Twitter/X, LinkedIn, and Instagram
- **Hashtag Recommendations** — AI-generated relevant hashtags with one-click copy
- **Authentication** — Secure user authentication powered by Clerk
- **Premium Dark UI** — Glassmorphism design with animated gradients and micro-animations

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** (App Router) | Full-stack React framework |
| **TypeScript** | Type-safe development |
| **Clerk** | Authentication & user management |
| **pdf-parse** | Server-side PDF text extraction |
| **Tesseract.js** | Client-side OCR for images |
| **Google Gemini AI** | Content analysis & suggestions |
| **Vanilla CSS** | Premium glassmorphism design system |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- [Clerk Account](https://dashboard.clerk.com) (free tier)
- [Google AI Studio API Key](https://aistudio.google.com/apikey) (free tier)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/contentlens-ai.git
cd contentlens-ai

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Add your API keys to .env.local
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
# CLERK_SECRET_KEY=sk_test_...
# GEMINI_API_KEY=your_key_here

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts        # Gemini AI analysis endpoint
│   │   └── extract-pdf/route.ts    # PDF text extraction endpoint
│   ├── sign-in/[[...sign-in]]/     # Clerk sign-in page
│   ├── sign-up/[[...sign-up]]/     # Clerk sign-up page
│   ├── globals.css                 # Design system & animations
│   ├── layout.tsx                  # Root layout with Clerk provider
│   └── page.tsx                    # Main dashboard
├── components/
│   ├── AnalysisResult.tsx          # AI analysis display cards
│   ├── ExtractedText.tsx           # Extracted text viewer
│   ├── FileUploader.tsx            # Drag-and-drop file upload
│   ├── LoadingState.tsx            # Animated loading states
│   └── Navbar.tsx                  # Navigation with auth
└── middleware.ts                   # Clerk auth middleware
```

## 📝 Approach (200 words)

ContentLens AI solves the challenge of analyzing social media content through a three-stage pipeline: **Upload → Extract → Analyze**.

**Upload**: A responsive drag-and-drop interface accepts both PDFs and images. File validation ensures type safety and size limits, while preview thumbnails provide visual confirmation.

**Extract**: For PDFs, server-side extraction via `pdf-parse` preserves document formatting. For images (scanned documents), Tesseract.js performs OCR entirely in the browser, eliminating server dependency for image processing. This hybrid approach optimizes both accuracy and performance.

**Analyze**: Extracted text is sent to Google Gemini AI with a carefully crafted system prompt that returns structured JSON. The AI evaluates engagement potential (1-10 score), identifies content tone and emotions, generates 4-6 actionable improvement suggestions with impact ratings, recommends relevant hashtags, and provides platform-specific tips for Twitter/X, LinkedIn, and Instagram.

The architecture uses Next.js 14 App Router with API routes for server-side operations and client components for interactive UI. Clerk handles authentication with a dark-themed integration. The glassmorphism design system uses CSS custom properties for maintainable theming with smooth animations and micro-interactions throughout.

## 📄 License

MIT License — Built for Unthinkable Solutions Technical Assessment
