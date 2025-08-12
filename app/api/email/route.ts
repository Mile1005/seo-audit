import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { to, subject, html } = body;

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: "Missing required fields: to, subject, html" },
        { status: 400 }
      );
    }

    // For development, we'll just log the email
    // In production, you'd integrate with a service like SendGrid, Mailgun, etc.
    console.log("=== EMAIL NOTIFICATION ===");
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("HTML:", html);
    console.log("==========================");

    // TODO: Integrate with actual email service
    // Example with SendGrid:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send({
    //   to,
    //   from: process.env.FROM_EMAIL,
    //   subject,
    //   html
    // });

    return NextResponse.json({ 
      success: true, 
      message: "Email notification logged (development mode)" 
    });

  } catch (err) {
    console.error("Error sending email:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}


