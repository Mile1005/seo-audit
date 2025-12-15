import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { generateRandomToken } from "../../../../lib/utils";
import { sendPasswordResetEmail } from "../../../../lib/email";
import { rateLimit, validateEmail, sanitizeInput } from "../../../../lib/security";

const forgotPasswordHandler = async (request: NextRequest) => {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    // Validate and sanitize email
    const cleanEmail = sanitizeInput(email);
    if (!validateEmail(cleanEmail)) {
      return NextResponse.json({ message: "Please enter a valid email address" }, { status: 400 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: cleanEmail.toLowerCase() },
    });

    // For security, we always return success even if email doesn't exist
    if (!user) {
      return NextResponse.json(
        { message: "If an account with that email exists, we have sent a password reset link." },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = generateRandomToken(32);
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Save reset token to database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      } as any,
    });

    // TODO: Send email with reset link
    // For now, we'll just log it (in production, use a proper email service)
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

    // Send password reset email
    try {
      await sendPasswordResetEmail({
        to: user.email,
        resetUrl,
        userName: user.name || undefined,
      });

      if (process.env.NODE_ENV === "development") {
        console.log("🔗 Password Reset Link:", resetUrl);
        console.log("📧 Email sent to:", email);
      }
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Continue anyway - don't fail the whole request if email fails
    }

    return NextResponse.json(
      { message: "If an account with that email exists, we have sent a password reset link." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ message: "An error occurred. Please try again." }, { status: 500 });
  }
};

// Apply rate limiting: 5 requests per minute
export const POST = rateLimit(5, 60000)(forgotPasswordHandler);
