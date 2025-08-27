import { NextResponse } from "next/server"

// Disabled during marketing-only deployment; avoids DB/auth at build time
export async function POST() {
  return NextResponse.json({ error: "Disabled" }, { status: 404 })
}
