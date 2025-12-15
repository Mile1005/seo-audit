"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "@/lib/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
// ...existing code...

export default function ForgotPasswordPage() {
  const t = useTranslations("auth.forgotPassword");
  const tErrors = useTranslations("auth.errors");
  const params = useParams();
  const locale = params.locale as string;

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to send reset email");
      }
      setSubmitted(true);
    } catch (error: any) {
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      {/* Server-rendered SEO content */}
      <div className="sr-only">
        <h2>Password Security Best Practices</h2>
        <p>Learn about secure password management and account recovery procedures.</p>
        <h2>Account Recovery Process</h2>
        <p>Step-by-step guide to resetting your password and regaining account access.</p>
        <h2>Security Support</h2>
        <p>Get help with account security issues and password management.</p>
      </div>

      {/* Account Security Introduction */}
      <section className="bg-slate-900/50 border-b border-slate-800 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-invert mx-auto">
            <h2>Secure Account Recovery</h2>
            <p>
              Account security is paramount when working with SEO tools that handle sensitive
              website data and competitive intelligence. Our password reset process ensures that
              only authorized users can regain access to their accounts.
            </p>

            <h2>Why Secure Password Recovery Matters</h2>
            <p>
              SEO professionals often work with confidential client data, competitive analysis, and
              strategic business information. A compromised account could expose sensitive SEO
              strategies, keyword research, and performance data to unauthorized parties.
            </p>

            <h3>Our Security Measures:</h3>
            <ul>
              <li>
                <strong>Encrypted Communications:</strong> All password reset emails are sent over
                secure, encrypted channels
              </li>
              <li>
                <strong>Time-Limited Tokens:</strong> Reset links expire after a short period for
                security
              </li>
              <li>
                <strong>Account Verification:</strong> Multiple verification steps ensure legitimate
                account recovery
              </li>
              <li>
                <strong>Activity Monitoring:</strong> Suspicious activity is automatically flagged
                and investigated
              </li>
            </ul>

            <h3>Password Security Best Practices</h3>
            <p>
              While we help you recover access to your account, maintaining strong password hygiene
              is crucial for long-term security:
            </p>

            <h4>Strong Password Guidelines:</h4>
            <ul>
              <li>
                Use at least 12 characters with a mix of uppercase, lowercase, numbers, and symbols
              </li>
              <li>Avoid common words, personal information, or predictable patterns</li>
              <li>Use unique passwords for different services</li>
              <li>Consider using a reputable password manager</li>
              <li>Enable two-factor authentication when available</li>
            </ul>

            <h4>Account Protection Tips:</h4>
            <ul>
              <li>Never share your login credentials with others</li>
              <li>Log out of shared or public computers</li>
              <li>Monitor your account activity regularly</li>
              <li>Report suspicious activity immediately</li>
              <li>Keep your recovery email address current</li>
            </ul>

            <h2>Getting Help with Account Issues</h2>
            <p>
              If you're having trouble with the password reset process or suspect your account may
              be compromised, our support team is available to assist you. We can help verify your
              identity and restore secure access to your account.
            </p>

            <p>
              Remember, account security is a shared responsibility. By following best practices and
              promptly reporting any security concerns, you help maintain the integrity of your SEO
              data and protect your competitive advantage.
            </p>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-center min-h-[80vh] py-12 px-4">
        <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-800 text-white relative">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
          >
            Skip to main content
          </a>
          {submitted ? (
            <div className="text-center" id="main-content">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Check Your Email! <span aria-hidden>📧</span>
              </h2>
              <p className="text-gray-300 mb-6">We've sent a password reset link to:</p>
              <div className="bg-slate-800 rounded-xl p-4 mb-8">
                <p className="font-semibold text-blue-200">{email}</p>
              </div>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-300">1</span>
                  </div>
                  <p className="text-sm text-gray-300">Check your email inbox (and spam folder)</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-300">2</span>
                  </div>
                  <p className="text-sm text-gray-300">Click the reset password link</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-300">3</span>
                  </div>
                  <p className="text-sm text-gray-300">Create your new password</p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-800">
                <p className="text-sm text-gray-400 mb-4">
                  Didn't receive the email? Check your spam folder or{" "}
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-blue-400 hover:text-blue-300 font-medium"
                  >
                    try again
                  </button>
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-medium transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to sign in
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold mb-2" id="main-content">
                  Forgot Password? <span aria-hidden>🔑</span>
                </h1>
                <p className="text-gray-300">No worries! We'll send you reset instructions</p>
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-red-900/80 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6 flex items-center gap-2"
                  role="alert"
                  aria-live="assertive"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}
              <form
                onSubmit={handleSubmit}
                action="/api/auth/forgot-password"
                method="post"
                className="space-y-6"
              >
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 w-full px-3 py-3 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-950 text-white placeholder-gray-400"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading || !email}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {loading ? "Sending Reset Link..." : "Send Reset Link"}
                  {!loading && <ArrowRight className="w-5 h-5" />}
                </motion.button>
              </form>
              <div className="mt-8 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-medium transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to sign in
                </Link>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                <p className="text-xs text-gray-500">
                  Remember your password?{" "}
                  <Link href="/login" className="text-blue-400 hover:text-blue-300">
                    Sign in instead
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
