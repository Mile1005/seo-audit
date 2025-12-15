import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { generateRandomToken } from "../../../../lib/utils";
import { sendEmailVerification } from "../../../../lib/email";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if email is already verified
    if (user.emailVerified) {
      return NextResponse.json({ message: "Email is already verified" }, { status: 400 });
    }

    // Check rate limiting (prevent spam)
    const lastSent = user.emailVerificationSentAt;
    if (lastSent && Date.now() - lastSent.getTime() < 60000) {
      // 1 minute cooldown
      return NextResponse.json(
        { message: "Please wait before requesting another verification email" },
        { status: 429 }
      );
    }

    // Generate verification token
    const verificationToken = generateRandomToken(32);
    const verificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Update user with verification token
    await (prisma.user as any).update({
      where: { id: user.id },
      data: {
        emailVerificationToken: verificationToken,
        emailVerificationExpiry: verificationExpiry,
        emailVerificationSentAt: new Date(),
      },
    });

    // Send verification email
    const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${verificationToken}`;

    try {
      await sendEmailVerification({
        to: user.email,
        verificationUrl,
        userName: user.name || undefined,
      });

      if (process.env.NODE_ENV === "development") {
        console.log("🔗 Email Verification Link:", verificationUrl);
        console.log("📧 Verification email sent to:", email);
      }
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Continue anyway - don't fail the whole request if email fails
    }

    return NextResponse.json({ message: "Verification email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Send verification error:", error);
    return NextResponse.json(
      { message: "An error occurred while sending verification email" },
      { status: 500 }
    );
  }
}
