import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    // Parse service account JSON
    const serviceAccountJson = process.env.RISC_SERVICE_ACCOUNT_JSON;
    if (!serviceAccountJson) {
      return NextResponse.json({ error: "RISC_SERVICE_ACCOUNT_JSON not set" }, { status: 500 });
    }

    const serviceAccount = JSON.parse(serviceAccountJson);

    // Create JWT payload
    const payload = {
      iss: serviceAccount.client_email,
      sub: serviceAccount.client_email,
      aud: "https://risc.googleapis.com/google.identity.risc.v1beta.RiscManagementService",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
    };

    // Sign JWT
    const privateKey = serviceAccount.private_key.replace(/\\n/g, "\n");
    const signedJwt = jwt.sign(payload, privateKey, { algorithm: "RS256" });

    // Generate test state
    const testState = `test-state-${Date.now()}`;

    // Make verify request
    const response = await fetch("https://risc.googleapis.com/v1beta/stream:verify", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${signedJwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ state: testState }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("RISC Test failed:", response.status, errorText);
      return NextResponse.json(
        { error: "Failed to send test event", details: errorText },
        { status: 500 }
      );
    }

    const result = await response.json();
    console.log("RISC Test: Sent verify request with state:", testState);

    return NextResponse.json({
      success: true,
      message: "Test event sent. Check webhook logs for reception.",
      testState,
      response: result,
    });
  } catch (error) {
    console.error("RISC Test error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
