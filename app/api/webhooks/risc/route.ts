import { NextRequest, NextResponse } from "next/server";
import { createRemoteJWKSet, jwtVerify, decodeJwt } from "jose";
import { prisma } from "@/lib/prisma";

// Google RISC JWKS
const jwks = createRemoteJWKSet(new URL("https://www.googleapis.com/oauth2/v3/certs"));

export async function POST(request: NextRequest) {
  let jwt: string | null = null;

  try {
    // Clone the request to avoid consuming the body stream
    const clonedRequest = request.clone();

    // Try to get JWT from form data first
    try {
      const formData = await request.formData();
      jwt = formData.get("jwt") as string;
    } catch {
      // If form data fails, try raw body from cloned request
      jwt = await clonedRequest.text();
    }

    if (!jwt) {
      console.error("RISC Webhook: No JWT found in request body or form data");
      return NextResponse.json({ error: "Invalid request - no JWT" }, { status: 400 });
    }

    console.log("RISC Webhook: Received JWT token (length:", jwt.length, ")");

    // First, try to decode without verification to see the payload
    try {
      const decoded = decodeJwt(jwt);
      console.log("RISC Webhook: Decoded JWT payload:", {
        iss: decoded.iss,
        aud: decoded.aud,
        sub: decoded.sub,
        events: decoded.events,
        iat: decoded.iat,
        exp: decoded.exp,
      });
    } catch (decodeError) {
      console.error("RISC Webhook: Failed to decode JWT:", decodeError);
    }

    // Verify JWT
    const { payload } = await jwtVerify(jwt, jwks, {
      issuer: "https://accounts.google.com",
      audience: process.env.GOOGLE_CLIENT_ID!,
    });

    console.log("RISC Webhook: Successfully verified JWT", {
      iss: payload.iss,
      aud: payload.aud,
      sub: payload.sub,
      events: payload.events,
      iat: payload.iat,
      exp: payload.exp,
    });

    // Process events asynchronously
    processEvents(payload).catch((error) => {
      console.error("RISC Webhook: Error processing events", error);
    });

    // Return 200 OK immediately
    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("RISC Webhook: JWT verification failed", {
      error: error instanceof Error ? error.message : String(error),
      code: error instanceof Error && "code" in error ? error.code : "unknown",
      jwtLength: jwt?.length,
      jwtPreview: jwt?.substring(0, 50) + "...",
    });
    return NextResponse.json(
      {
        error: "Invalid JWT",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 400 }
    );
  }
}

async function processEvents(payload: any) {
  const events = payload.events_requested || payload.events || [];

  for (const event of events) {
    const eventType = event.type || event["@type"];

    if (
      eventType === "https://schemas.openid.net/secevent/risc/event-type/tokens-revoked" ||
      eventType === "https://schemas.openid.net/secevent/risc/event-type/account-disabled"
    ) {
      const googleUserId = payload.sub;

      console.log(`RISC Event: ${eventType} for Google user ${googleUserId}`);

      // Find user via Account
      const account = await prisma.account.findFirst({
        where: {
          provider: "google",
          providerAccountId: googleUserId,
        },
        include: {
          user: true,
        },
      });

      if (account?.user) {
        // Revoke user session by suspending account
        await prisma.user.update({
          where: { id: account.user.id },
          data: { status: "SUSPENDED" },
        });

        console.log(`RISC: Suspended user ${account.user.email} due to ${eventType}`);

        // TODO: Clear any active sessions if needed
        // For JWT strategy, sessions are stateless, but we can add session invalidation logic
      } else {
        console.warn(`RISC: No user found for Google ID ${googleUserId}`);
      }
    }
  }
}
