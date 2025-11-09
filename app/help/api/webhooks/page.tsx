"use client"

import { MainLayout } from '@/components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, Webhook, Bell, AlertTriangle, CheckCircle, Code, Settings, Zap, Shield, RefreshCw, Database } from 'lucide-react'
import Link from 'next/link'

export default function WebhooksPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">

        {/* Breadcrumb */}
        <section className="bg-slate-900/50 py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
              <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                Help Center
              </Link>
              <span className="text-gray-600">/</span>
              <Link href="/help/api-integrations" className="text-gray-400 hover:text-white transition-colors">
                API
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-white">Webhooks</span>
            </nav>
          </div>
        </section>

        {/* Article Header */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/help"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Help Center
              </Link>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 p-3">
                  <Webhook className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-orange-400 text-sm font-medium">API</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Webhooks
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>12 min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Last updated: March 2025</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg prose-invert max-w-none"
            >

              {/* Introduction */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <Bell className="w-6 h-6 text-orange-400 mt-1" />
                  <div>
                    <h2 className="text-white text-lg font-semibold mb-2">Real-time notifications</h2>
                    <p className="text-gray-300 mb-0">
                      Webhooks allow you to receive real-time notifications when events occur in your account.
                      Get instant updates about audit completions, errors, and other important events.
                    </p>
                  </div>
                </div>
              </div>

              {/* What are Webhooks */}
              <h2 className="text-2xl font-bold text-white mb-6">What are webhooks?</h2>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Webhooks are automated messages sent from our servers to your application when specific events occur.
                    Unlike traditional APIs where you poll for updates, webhooks push data to you instantly.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <h4 className="text-orange-400 font-medium mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Real-time
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Receive notifications instantly when events happen, no polling required.
                      </p>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <h4 className="text-orange-400 font-medium mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Secure
                      </h4>
                      <p className="text-gray-300 text-sm">
                        All webhooks are signed and verified to ensure authenticity.
                      </p>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <h4 className="text-orange-400 font-medium mb-2 flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Reliable
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Automatic retries ensure delivery even if your endpoint is temporarily unavailable.
                      </p>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <h4 className="text-orange-400 font-medium mb-2 flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Configurable
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Choose which events you want to receive and configure multiple endpoints.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Setting up Webhooks */}
              <h3 className="text-2xl font-bold text-white mb-6">Setting up webhooks</h3>

              <div className="space-y-6 mb-8">

                {/* Step 1 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Create an endpoint</h3>
                      <p className="text-gray-300 mb-4">
                        Set up an HTTPS endpoint in your application that can receive POST requests.
                        This endpoint should be publicly accessible and able to handle JSON payloads.
                      </p>

                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-orange-400 font-medium mb-2">Requirements:</h4>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Must accept POST requests</li>
                          <li>• Must use HTTPS (SSL/TLS)</li>
                          <li>• Should respond within 10 seconds</li>
                          <li>• Should return 2xx status codes for success</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Configure webhook URL</h3>
                      <p className="text-gray-300 mb-4">
                        In your dashboard, go to Settings → API → Webhooks and add your endpoint URL.
                        You can configure multiple webhooks for different purposes.
                      </p>

                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-orange-400 font-medium mb-2">Dashboard location:</h4>
                        <div className="text-gray-300 text-sm">
                          <strong>Settings → API → Webhooks → Add Webhook</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Select events</h3>
                      <p className="text-gray-300 mb-4">
                        Choose which events you want to receive notifications for. You can subscribe to
                        specific event types or receive all events.
                      </p>

                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-orange-400 font-medium mb-2">Available events:</h4>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• <code className="text-green-400">audit.completed</code> - Audit finished successfully</li>
                          <li>• <code className="text-green-400">audit.failed</code> - Audit encountered an error</li>
                          <li>• <code className="text-green-400">audit.started</code> - Audit began processing</li>
                          <li>• <code className="text-green-400">report.generated</code> - Report is ready for download</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Test your webhook</h3>
                      <p className="text-gray-300 mb-4">
                        Use the test button in your dashboard to send a sample webhook payload to your endpoint.
                        Verify that your application receives and processes the data correctly.
                      </p>

                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-blue-400" />
                          <span className="text-blue-400 font-medium">Test before going live</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          Always test your webhook endpoint with sample data before enabling it for production use.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Webhook Payload */}
              <h3 className="text-2xl font-bold text-white mb-6">Webhook payload structure</h3>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="space-y-6">

                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">Request headers</h3>
                    <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm text-gray-300">
                      <div>Content-Type: application/json</div>
                      <div>User-Agent: AISEOTurbo-Webhook/1.0</div>
                      <div>X-Webhook-Signature: sha256=abc123...</div>
                      <div>X-Webhook-ID: wh_1234567890</div>
                      <div>X-Webhook-Timestamp: 1640995200</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">Payload structure</h3>
                    <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto">
{`{
  "id": "wh_1234567890",
  "event": "audit.completed",
  "created": 1640995200,
  "data": {
    "audit_id": "audit_123",
    "url": "https://example.com",
    "status": "completed",
    "score": 85,
    "issues_found": 12,
    "report_url": "https://api.aiseoturbo.com/reports/audit_123"
  },
  "account": {
    "id": "acc_123",
    "name": "Example Account"
  }
}`}
                    </div>
                  </div>

                </div>
              </div>

              {/* Event Types */}
              <h3 className="text-2xl font-bold text-white mb-6">Available webhook events</h3>

              <div className="space-y-4 mb-8">

                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">audit.started</h4>
                      <p className="text-gray-300 text-sm mb-2">
                        Fired when an SEO audit begins processing.
                      </p>
                      <div className="bg-slate-900/50 rounded p-2 font-mono text-xs text-gray-300">
                        Contains: audit_id, url, started_at
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">audit.completed</h4>
                      <p className="text-gray-300 text-sm mb-2">
                        Fired when an SEO audit finishes successfully.
                      </p>
                      <div className="bg-slate-900/50 rounded p-2 font-mono text-xs text-gray-300">
                        Contains: audit_id, url, score, issues_found, report_url, completed_at
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">audit.failed</h4>
                      <p className="text-gray-300 text-sm mb-2">
                        Fired when an SEO audit encounters an error.
                      </p>
                      <div className="bg-slate-900/50 rounded p-2 font-mono text-xs text-gray-300">
                        Contains: audit_id, url, error_message, error_code, failed_at
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">report.generated</h4>
                      <p className="text-gray-300 text-sm mb-2">
                        Fired when a detailed report is generated and ready for download.
                      </p>
                      <div className="bg-slate-900/50 rounded p-2 font-mono text-xs text-gray-300">
                        Contains: audit_id, report_id, report_url, format, generated_at
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Security & Verification */}
              <h3 className="text-2xl font-bold text-white mb-6">Security & verification</h3>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="space-y-6">

                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">Webhook signatures</h3>
                    <p className="text-gray-300 mb-4">
                      All webhooks include a cryptographic signature to verify authenticity. You should always
                      verify the signature before processing webhook data.
                    </p>

                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <h4 className="text-orange-400 font-medium mb-2">How to verify signatures:</h4>
                      <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
                        <li>Get the signature from the <code className="text-green-400">X-Webhook-Signature</code> header</li>
                        <li>Create a string with <code className="text-green-400">timestamp.payload</code></li>
                        <li>Compute HMAC-SHA256 using your webhook secret</li>
                        <li>Compare the computed signature with the received signature</li>
                      </ol>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">Code example</h3>
                    <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm text-gray-300">
                      <div className="text-gray-500 mb-2">// Node.js example</div>
                      <div>const crypto = require('crypto');</div>
                      <div>const signature = req.headers['x-webhook-signature'];</div>
                      <div>const timestamp = req.headers['x-webhook-timestamp'];</div>
                      <div>const payload = JSON.stringify(req.body);</div>
                      <div>const expectedSignature = crypto</div>
                      <div className="ml-4">.createHmac('sha256', WEBHOOK_SECRET)</div>
                      <div className="ml-4">.update(`${'{'}timestamp{'}'}.${'{'}payload{'}'}`)</div>
                      <div className="ml-4">.digest('hex');</div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Best Practices */}
              <h3 className="text-2xl font-bold text-white mb-6">Best practices</h3>

              <div className="space-y-4 mb-8">

                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Always verify signatures</h4>
                      <p className="text-gray-300 text-sm">
                        Implement signature verification to ensure webhooks are genuinely from our service.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Handle duplicates</h4>
                      <p className="text-gray-300 text-sm">
                        Webhooks may be delivered multiple times. Use webhook IDs to handle duplicates gracefully.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Respond quickly</h4>
                      <p className="text-gray-300 text-sm">
                        Your endpoint should respond within 10 seconds to avoid timeouts and retries.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Log webhook activity</h4>
                      <p className="text-gray-300 text-sm">
                        Keep logs of received webhooks for debugging and audit purposes.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Troubleshooting */}
              <h3 className="text-2xl font-bold text-white mb-6">Troubleshooting</h3>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="space-y-6">

                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">Common issues</h3>
                    <div className="space-y-4">

                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                        <h4 className="text-red-400 font-medium mb-2">Webhook not received</h4>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Check that your endpoint is publicly accessible</li>
                          <li>• Verify the URL is correct in your webhook settings</li>
                          <li>• Ensure your server accepts POST requests</li>
                          <li>• Check firewall and security group settings</li>
                        </ul>
                      </div>

                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                        <h4 className="text-yellow-400 font-medium mb-2">Signature verification fails</h4>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Ensure you're using the correct webhook secret</li>
                          <li>• Check that you're including the timestamp in the signed payload</li>
                          <li>• Verify the payload is exactly as received (no modifications)</li>
                        </ul>
                      </div>

                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                        <h4 className="text-blue-400 font-medium mb-2">Timeout errors</h4>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Respond to webhooks within 10 seconds</li>
                          <li>• Process webhook data asynchronously if needed</li>
                          <li>• Return a 2xx status code immediately after validation</li>
                        </ul>
                      </div>

                    </div>
                  </div>

                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">Testing webhooks</h3>
                    <p className="text-gray-300 mb-4">
                      Use tools like ngrok or webhook.site to test your webhook endpoint during development.
                    </p>
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <h4 className="text-orange-400 font-medium mb-2">Testing tools:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• <strong>ngrok:</strong> Expose local servers to the internet</li>
                        <li>• <strong>webhook.site:</strong> Inspect webhook payloads online</li>
                        <li>• <strong>Postman:</strong> Test webhook endpoints manually</li>
                        <li>• <strong>Dashboard test button:</strong> Send test webhooks from your account</li>
                      </ul>
                    </div>
                  </div>

                </div>
              </div>

              {/* Need Help */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mt-8">
                <h3 className="text-white text-lg font-semibold mb-3">Need help with webhooks?</h3>
                <p className="text-gray-300 mb-4">
                  Having trouble setting up or troubleshooting webhooks? Our developer support team can help
                  you get real-time notifications working in your application.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Contact Developer Support
                  </Link>
                  <Link
                    href="/help/api-integrations"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    API Documentation
                  </Link>
                  <Link
                    href="/help/api/authentication"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Authentication Guide
                  </Link>
                </div>
              </div>

            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}