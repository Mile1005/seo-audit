import { Resend } from "resend";

// Initialize Resend lazily to avoid build-time errors
let resend: Resend | null = null;

const getResendClient = () => {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("⚠️  RESEND_API_KEY not found. Email functionality will be disabled.");
      return null;
    }
    resend = new Resend(apiKey);
  }
  return resend;
};

// Create a transporter for development and production
const createTransporter = () => {
  if (process.env.NODE_ENV === "development") {
    // For development, log emails to console AND send via Resend
    return {
      sendMail: async (options: any) => {
        console.log("📧 Sending email via Resend:");
        console.log("To:", options.to);
        console.log("Subject:", options.subject);

        const resendClient = getResendClient();
        if (!resendClient) {
          console.error("❌ Resend API key not configured");
          throw new Error("Resend API key not configured");
        }

        try {
          const result = await resendClient.emails.send({
            from: options.from,
            to: options.to,
            subject: options.subject,
            html: options.html,
          });
          console.log("✅ Email sent successfully:", result);
          return result;
        } catch (error) {
          console.error("❌ Email sending failed:", error);
          throw error;
        }
      },
    };
  }

  // For production, use Resend directly
  return {
    sendMail: async (options: any) => {
      const resendClient = getResendClient();
      if (!resendClient) {
        throw new Error("Resend API key not configured");
      }

      return await resendClient.emails.send({
        from: options.from,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });
    },
  };
};

export const sendPasswordResetEmail = async ({
  to,
  resetUrl,
  userName,
}: {
  to: string;
  resetUrl: string;
  userName?: string;
}) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM || "noreply@seoaudit.com",
    to,
    subject: "Reset Your Password - SEO Audit",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Reset Your Password</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 40px 30px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0; border-top: none;">
            <p style="font-size: 16px; margin-bottom: 20px;">
              ${userName ? `Hi ${userName},` : "Hello,"}
            </p>
            
            <p style="font-size: 16px; margin-bottom: 30px;">
              We received a request to reset your password for your SEO Audit account. If you didn't make this request, you can safely ignore this email.
            </p>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="${resetUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
                Reset Password
              </a>
            </div>
            
            <p style="font-size: 14px; color: #64748b; margin-bottom: 10px;">
              Or copy and paste this link in your browser:
            </p>
            <p style="font-size: 14px; word-break: break-all; background: #e2e8f0; padding: 10px; border-radius: 5px;">
              ${resetUrl}
            </p>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="font-size: 14px; color: #64748b; margin-bottom: 10px;">
                This password reset link will expire in 1 hour for security reasons.
              </p>
              <p style="font-size: 14px; color: #64748b;">
                If you're having trouble clicking the button, copy and paste the URL above into your web browser.
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 20px;">
            <p style="font-size: 12px; color: #94a3b8;">
              This email was sent by SEO Audit. If you have any questions, please contact our support team.
            </p>
          </div>
        </body>
      </html>
    `,
    text: `
Reset Your Password

${userName ? `Hi ${userName},` : "Hello,"}

We received a request to reset your password for your SEO Audit account. If you didn't make this request, you can safely ignore this email.

To reset your password, click the following link:
${resetUrl}

This password reset link will expire in 1 hour for security reasons.

If you're having trouble with the link, copy and paste it into your web browser.

This email was sent by SEO Audit. If you have any questions, please contact our support team.
    `,
  };

  return await transporter.sendMail(mailOptions);
};

export const sendEmailVerification = async ({
  to,
  verificationUrl,
  userName,
}: {
  to: string;
  verificationUrl: string;
  userName?: string;
}) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM || "noreply@seoaudit.com",
    to,
    subject: "Verify Your Email - SEO Audit",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Verify Your Email</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 40px 30px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0; border-top: none;">
            <p style="font-size: 16px; margin-bottom: 20px;">
              ${userName ? `Hi ${userName},` : "Hello,"}
            </p>
            
            <p style="font-size: 16px; margin-bottom: 30px;">
              Welcome to SEO Audit! Please verify your email address to complete your account setup and start optimizing your website's SEO.
            </p>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="${verificationUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
                Verify Email
              </a>
            </div>
            
            <p style="font-size: 14px; color: #64748b; margin-bottom: 10px;">
              Or copy and paste this link in your browser:
            </p>
            <p style="font-size: 14px; word-break: break-all; background: #e2e8f0; padding: 10px; border-radius: 5px;">
              ${verificationUrl}
            </p>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="font-size: 14px; color: #64748b; margin-bottom: 10px;">
                This verification link will expire in 24 hours for security reasons.
              </p>
              <p style="font-size: 14px; color: #64748b;">
                If you didn't create an account with us, you can safely ignore this email.
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 20px;">
            <p style="font-size: 12px; color: #94a3b8;">
              This email was sent by SEO Audit. If you have any questions, please contact our support team.
            </p>
          </div>
        </body>
      </html>
    `,
    text: `
Verify Your Email

${userName ? `Hi ${userName},` : "Hello,"}

Welcome to SEO Audit! Please verify your email address to complete your account setup and start optimizing your website's SEO.

To verify your email, click the following link:
${verificationUrl}

This verification link will expire in 24 hours for security reasons.

If you didn't create an account with us, you can safely ignore this email.

This email was sent by SEO Audit. If you have any questions, please contact our support team.
    `,
  };

  return await transporter.sendMail(mailOptions);
};
