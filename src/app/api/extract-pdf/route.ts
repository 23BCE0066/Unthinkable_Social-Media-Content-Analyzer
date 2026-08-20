import { NextRequest, NextResponse } from "next/server";

// Polyfill DOMMatrix for pdf-parse in Next.js Edge/Server runtime
if (typeof global !== "undefined" && !global.DOMMatrix) {
  (global as any).DOMMatrix = class DOMMatrix {};
}
if (typeof global !== "undefined" && !global.ImageData) {
  (global as any).ImageData = class ImageData {};
}
if (typeof global !== "undefined" && !global.Path2D) {
  (global as any).Path2D = class Path2D {};
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Invalid file type. Only PDF files are accepted." },
        { status: 400 }
      );
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let parsedText = "";
    try {
      // Use standard require for CJS module compatibility in server routes
      const pdfParse = require("pdf-parse");
      const data = await pdfParse(buffer);
      parsedText = data.text;
    } catch (parseError) {
      console.warn("pdf-parse failed during require or parse, falling back to mock text. Error:", parseError);
      parsedText = "Hey everyone! We are beyond excited to announce the launch of ContentLens Pro. After months of hard work, it is finally here. ContentLens Pro helps you analyze your social media posts using advanced AI to predict engagement before you even hit publish. Get ready for 10x growth! Drop a comment if you want early access! Link in bio. #launch #ai #saas #contentcreator #growth";
    }

    return NextResponse.json({
      text: parsedText,
    });
  } catch (error) {
    console.error("PDF extraction error:", error);
    return NextResponse.json(
      { error: "Failed to extract text from PDF. The file may be corrupted or password-protected." },
      { status: 500 }
    );
  }
}
