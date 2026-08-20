import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "ContentLens AI — Social Media Content Analyzer",
  description:
    "Upload PDFs and images, extract text with OCR, and get AI-powered engagement suggestions for your social media content.",
  keywords: [
    "social media analyzer",
    "content analyzer",
    "OCR",
    "PDF parser",
    "AI engagement",
    "Gemini AI",
  ],
  authors: [{ name: "Mehul Goyal" }],
  openGraph: {
    title: "ContentLens AI — Social Media Content Analyzer",
    description:
      "AI-powered content analysis and engagement improvement suggestions",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
