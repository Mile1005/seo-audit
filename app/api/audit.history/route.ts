import { NextRequest, NextResponse } from "next/server";
import { dbHelpers } from "../../../lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    if (!email) {
      return NextResponse.json({ error: "email parameter is required" }, { status: 400 });
    }

    // Get runs for the email
    const result = await dbHelpers.getRunsByEmail(email, limit, offset);

    return NextResponse.json(result);
  } catch (err) {
    console.error("Error getting audit history:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
