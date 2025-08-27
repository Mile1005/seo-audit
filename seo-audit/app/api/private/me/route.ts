import { NextResponse } from "next/server"

export async function GET() {
  // Disabled during marketing homepage work to avoid DB at build time
  return NextResponse.json({ error: "Disabled" }, { status: 404 })
}
