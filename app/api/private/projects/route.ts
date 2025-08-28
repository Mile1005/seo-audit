import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ error: "API not available" }, { status: 404 })
}

export async function POST() {
  return NextResponse.json({ error: "API not available" }, { status: 404 })
}
