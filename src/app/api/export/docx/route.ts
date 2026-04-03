import { NextRequest, NextResponse } from "next/server";
import { createDocumentDOCX } from "@/lib/docx";

export async function POST(req: NextRequest) {
  try {
    const { documents, businessName } = await req.json();

    if (!Array.isArray(documents) || documents.length === 0 || !businessName) {
      return NextResponse.json(
        { error: "Documents and business name required" },
        { status: 400 }
      );
    }

    const docxBuffer = await createDocumentDOCX(documents, businessName);

    const filename = businessName
      .replace(/[^a-zA-Z0-9-_ ]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();

    return new NextResponse(new Uint8Array(docxBuffer), {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${filename}-documents.docx"`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Word document generation failed" },
      { status: 500 }
    );
  }
}
