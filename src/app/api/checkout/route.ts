import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { type, documentCount, region } = await req.json();

    if (!type || (type !== "pack" && type !== "individual")) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const result = await createCheckoutSession(
      type,
      documentCount || 1,
      req.nextUrl.origin,
      region || "us"
    );

    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 503 });
    }

    return NextResponse.json({ url: result.url });
  } catch {
    return NextResponse.json(
      { error: "Checkout failed" },
      { status: 500 }
    );
  }
}
