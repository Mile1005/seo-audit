/**
 * Simple auth helper for API routes
 */

import { NextRequest } from "next/server";

export async function requireUser(request: NextRequest) {
  // Simple header-based auth for now
  // In production, you'd validate JWT tokens or session cookies
  const userId = request.headers.get("x-user-id") || "demo-user";

  return {
    id: userId,
    email: "demo@example.com",
    name: "Demo User",
  };
}

export async function getCurrentUser(request: NextRequest) {
  try {
    return await requireUser(request);
  } catch {
    return null;
  }
}
