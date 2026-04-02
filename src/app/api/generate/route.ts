import { NextRequest, NextResponse } from "next/server";
import { generateDocuments } from "@/lib/generate";

export async function POST(req: NextRequest) {
  try {
    const { businessDetails, documents: documentSlugs } = await req.json();

    if (!businessDetails?.businessName || !Array.isArray(documentSlugs) || documentSlugs.length === 0) {
      return NextResponse.json(
        { error: "Business details and document selection required" },
        { status: 400 }
      );
    }

    if (documentSlugs.length > 60) {
      return NextResponse.json(
        { error: "Too many documents requested" },
        { status: 400 }
      );
    }

    const results = await generateDocuments(businessDetails, documentSlugs);

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json(
      { error: "Generation failed" },
      { status: 500 }
    );
  }
}
