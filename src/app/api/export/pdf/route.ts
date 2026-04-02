import { NextRequest, NextResponse } from "next/server";
import { createDocumentPDF } from "@/lib/pdf";

export async function POST(req: NextRequest) {
  try {
    const { documents, businessName } = await req.json();

    if (!Array.isArray(documents) || documents.length === 0 || !businessName) {
      return NextResponse.json(
        { error: "Documents and business name required" },
        { status: 400 }
      );
    }

    const pdfBuffer = createDocumentPDF(documents, businessName);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${businessName.replace(/[^a-zA-Z0-9-_ ]/g, "").replace(/\s+/g, "-").toLowerCase()}-documents.pdf"`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "PDF generation failed" },
      { status: 500 }
    );
  }
}
