"use client"

import { MainLayout } from '../../../../components/layout/main-layout'
import { Breadcrumbs } from '../../../../components/navigation/breadcrumbs'
import { StructuredData, generateHowToSchema } from '../../../../components/seo/StructuredData'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, Webhook, Zap, AlertTriangle, CheckCircle, Code, Settings, TestTube, Eye } from 'lucide-react'
import Link from 'next/link'

export default function WebhooksPage() {
  const howToSchema = generateHowToSchema({
    name: "How to Set Up Webhooks for AISEOTurbo",
    description: "Step-by-step guide to configuring webhooks for real-time notifications when events occur in your AISEOTurbo account",
    totalTime: "PT7M",
    url: "https://www.aiseoturbo.com/help/api/webhooks",
    datePublished: "2025-03-01T10:00:00+00:00",
    steps: [
      {
        name: "Create webhook endpoint",
        text: "Build an HTTPS endpoint in your application that can receive POST requests. This endpoint should handle JSON payloads and return appropriate HTTP status codes (200 for success)."
      },
      {
        name: "Configure webhook URL",
        text: "In your dashboard, go to Settings → API → Webhooks → Add Webhook. Enter your webhook endpoint URL. You can configure multiple webhooks for different events or environments."
      },
      {
        name: "Select events",
        text: "Choose which events you want to receive notifications for. You can subscribe to all events or select specific ones like audit.completed, audit.failed, billing.payment, or account.updated."
      },
      {
        name: "Test your webhook",
        text: "Use the webhook testing tool to send test events to your endpoint. Verify that your application correctly receives and processes the webhook data before enabling it for production events."
      }
    ]
  })

  return (
    <MainLayout>
      <StructuredData data={howToSchema} />
      <div className="min-h-screen bg-slate-950">

        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: 'Home', url: 'https://www.aiseoturbo.com' },
            { name: 'Help', url: 'https://www.aiseoturbo.com/help' },
            { name: 'API', url: 'https://www.aiseoturbo.com/help/api' },
            { name: 'Webhooks', url: 'https://www.aiseoturbo.com/help/api/webhooks' }
          ]}
        />

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
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 p-3">
                  <Webhook className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-cyan-400 text-sm font-medium">API & Integrations</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Webhooks
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>7 min read</span>
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
                  <Zap className="w-6 h-6 text-yellow-400 mt-1" />
                  <div>
                    <h2 className="text-white text-lg font-semibold mb-2">Real-time notifications</h2>
                    <p className="text-gray-300 mb-0">
                      Webhooks allow you to receive real-time notifications when events occur in your account.
                      Get instant updates about audit completions, errors, and other important events without polling the API.
                    </p>
                  </div>
                </div>
              </div>

              {/* What are Webhooks */}
              <h2 className="text-2xl font-bold text-white mb-6">What are webhooks?</h2>

              <h3 className="text-xl font-semibold text-white mb-4">Webhook Basics</h3>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <p className="text-gray-300 mb-4">
                  Webhooks are automated messages sent from our servers to your application when specific events occur.
                  Instead of constantly checking for updates via API calls, webhooks push data to your endpoints instantly.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Traditional Polling</h4>
                    <div className="text-gray-400 text-sm space-y-1">
                      <div>• Check API every few minutes</div>
                      <div>• Wasteful API calls</div>
                      <div>• Delayed notifications</div>
                      <div>• Server load</div>
                    </div>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h4 className="text-green-400 font-medium mb-2">Webhooks</h4>
                    <div className="text-gray-300 text-sm space-y-1">
                      <div>• Instant notifications</div>
                      <div>• No unnecessary API calls</div>
                      <div>• Real-time updates</div>
                      <div>• Efficient resource usage</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Setting Up Webhooks */}
              <h3 className="text-2xl font-bold text-white mb-6">Setting up webhooks</h3>

              <div className="space-y-6 mb-8">

                {/* Step 1 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Create webhook endpoint</h3>
                      <p className="text-gray-300 mb-4">
                        Build an HTTPS endpoint in your application that can receive POST requests.
                        This endpoint should be able to handle JSON payloads and return appropriate HTTP status codes.
                      </p>
                      <div className="bg-slate-900/50 rounded-lg p-3">
                        <div className="text-gray-300 text-sm">
                          <strong>Requirements:</strong> HTTPS, POST method, JSON handling, 200 status response
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Configure webhook URL</h3>
                      <p className="text-gray-300 mb-4">
                        In your dashboard, go to API settings and add your webhook endpoint URL.
                        You can configure multiple webhooks for different events or environments.
                      </p>
                      <div className="bg-slate-900/50 rounded-lg p-3">
                        <div className="text-gray-300 text-sm">
                          <strong>Dashboard:</strong> Settings → API → Webhooks → Add Webhook
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Select events</h3>
                      <p className="text-gray-300 mb-4">
                        Choose which events you want to receive notifications for. You can subscribe to all events
                        or select specific ones like audit completions, errors, or billing updates.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <div className="bg-slate-900/50 rounded px-3 py-1 text-center text-xs text-gray-400">audit.completed</div>
                        <div className="bg-slate-900/50 rounded px-3 py-1 text-center text-xs text-gray-400">audit.failed</div>
                        <div className="bg-slate-900/50 rounded px-3 py-1 text-center text-xs text-gray-400">billing.payment</div>
                        <div className="bg-slate-900/50 rounded px-3 py-1 text-center text-xs text-gray-400">account.updated</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Test your webhook</h3>
                      <p className="text-gray-300 mb-4">
                        Use our webhook testing tool to send test events to your endpoint.
                        Verify that your application correctly receives and processes the webhook data.
                      </p>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <TestTube className="w-5 h-5 text-green-400" />
                          <span className="text-green-400 font-medium">Test before going live</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          Always test your webhook endpoint with sample data before enabling it for production events.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Webhook Events */}
              <h3 className="text-2xl font-bold text-white mb-6">Available webhook events</h3>

              <div className="space-y-4 mb-8">

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">audit.completed</h3>
                      <p className="text-gray-300 text-sm mb-2">
                        Fired when an SEO audit finishes successfully. Includes audit results and metadata.
                      </p>
                      <div className="text-gray-400 text-xs">Contains: audit_id, status, results_url, completed_at</div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-red-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">audit.failed</h3>
                      <p className="text-gray-300 text-sm mb-2">
                        Fired when an SEO audit fails or encounters an error. Includes error details and retry information.
                      </p>
                      <div className="text-gray-400 text-xs">Contains: audit_id, error_message, error_code, retry_count</div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Settings className="w-6 h-6 text-blue-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">audit.started</h3>
                      <p className="text-gray-300 text-sm mb-2">
                        Fired when an SEO audit begins processing. Useful for tracking audit queue status.
                      </p>
                      <div className="text-gray-400 text-xs">Contains: audit_id, started_at, estimated_completion</div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Webhook className="w-6 h-6 text-purple-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">billing.payment_succeeded</h3>
                      <p className="text-gray-300 text-sm mb-2">
                        Fired when a payment is successfully processed. Includes invoice details and billing information.
                      </p>
                      <div className="text-gray-400 text-xs">Contains: invoice_id, amount, currency, payment_method</div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-orange-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">billing.payment_failed</h3>
                      <p className="text-gray-300 text-sm mb-2">
                        Fired when a payment attempt fails. Includes failure reason and retry information.
                      </p>
                      <div className="text-gray-400 text-xs">Contains: invoice_id, failure_reason, next_retry_date</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Webhook Payload */}
              <h3 className="text-2xl font-bold text-white mb-6">Webhook payload format</h3>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <h3 className="text-white font-semibold mb-4">All webhooks send JSON payloads with this structure:</h3>

                <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                  <pre className="text-green-400 text-sm overflow-x-auto">
{`{
  "event": "audit.completed",
  "id": "wh_1234567890",
  "timestamp": "2025-03-15T10:30:00Z",
  "data": {
    "audit_id": "audit_abc123",
    "status": "completed",
    "results_url": "https://api.aiseoturbo.com/v1/audits/audit_abc123/results",
    "completed_at": "2025-03-15T10:29:45Z",
    "metadata": {
      "url": "https://example.com",
      "crawl_depth": 2,
      "user_agent": "AISEO Turbo Crawler"
    }
  }
}`}
                  </pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-2">Common Fields</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li><code className="text-green-400">event</code> - Event type identifier</li>
                      <li><code className="text-green-400">id</code> - Unique webhook ID</li>
                      <li><code className="text-green-400">timestamp</code> - ISO 8601 timestamp</li>
                      <li><code className="text-green-400">data</code> - Event-specific payload</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">Headers</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li><code className="text-blue-400">Content-Type</code> - application/json</li>
                      <li><code className="text-blue-400">User-Agent</code> - AISEO Turbo Webhook</li>
                      <li><code className="text-blue-400">X-Webhook-ID</code> - Webhook identifier</li>
                      <li><code className="text-blue-400">X-Signature</code> - Request signature</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Security & Verification */}
              <h3 className="text-2xl font-bold text-white mb-6">Security & verification</h3>

              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Request Signatures</h4>
                      <p className="text-gray-300 text-sm">
                        All webhook requests include a cryptographic signature in the X-Signature header.
                        Verify this signature to ensure the request comes from our servers.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">HTTPS Only</h4>
                      <p className="text-gray-300 text-sm">
                        Webhooks are only sent to HTTPS endpoints. HTTP endpoints are not supported for security reasons.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Retry Logic</h4>
                      <p className="text-gray-300 text-sm">
                        Failed webhook deliveries are automatically retried with exponential backoff for up to 24 hours.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Idempotency</h4>
                      <p className="text-gray-300 text-sm">
                        Each webhook event has a unique ID. Use this to prevent processing duplicate events.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Handling Webhooks */}
              <h3 className="text-2xl font-bold text-white mb-6">Handling webhook requests</h3>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <h3 className="text-white font-semibold mb-4">Best practices for webhook endpoints:</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Respond Quickly</h4>
                      <p className="text-gray-300 text-sm">
                        Return a 200 status code immediately. Process the webhook asynchronously to avoid timeouts.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Verify Signatures</h4>
                      <p className="text-gray-300 text-sm">
                        Always verify the webhook signature before processing to prevent spoofing attacks.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Handle Duplicates</h4>
                      <p className="text-gray-300 text-sm">
                        Use the webhook ID to detect and ignore duplicate events that may be retried.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Log Everything</h4>
                      <p className="text-gray-300 text-sm">
                        Log all webhook requests for debugging and audit purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testing Webhooks */}
              <h3 className="text-2xl font-bold text-white mb-6">Testing webhooks</h3>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <TestTube className="w-8 h-8 text-blue-400 mt-1" />
                  <div>
                    <h3 className="text-blue-400 text-lg font-semibold mb-3">Test your webhook setup</h3>
                    <p className="text-gray-300 mb-4">
                      Use our webhook testing tools to ensure your endpoint is working correctly before enabling live webhooks.
                    </p>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-white font-medium mb-1">Webhook Tester</h4>
                        <p className="text-gray-300 text-sm">
                          Send test events to your endpoint directly from the dashboard. View delivery status and response codes.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">Sample Payloads</h4>
                        <p className="text-gray-300 text-sm">
                          Use our documentation to get sample webhook payloads for testing your parsing logic.
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">Request Inspector</h4>
                        <p className="text-gray-300 text-sm">
                          Inspect the headers, signatures, and payloads of test webhook requests.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Troubleshooting */}
              <h3 className="text-2xl font-bold text-white mb-6">Troubleshooting</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    Webhook Not Received
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Check endpoint URL is correct</li>
                    <li>• Verify HTTPS is enabled</li>
                    <li>• Ensure server is responding</li>
                    <li>• Check firewall settings</li>
                    <li>• Review webhook logs</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-blue-400" />
                    Signature Verification Failed
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Verify webhook secret key</li>
                    <li>• Check signature algorithm</li>
                    <li>• Ensure raw request body</li>
                    <li>• Compare expected vs received</li>
                    <li>• Check timestamp validity</li>
                  </ul>
                </div>

              </div>

              {/* Need Help */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mt-8">
                <h3 className="text-white text-lg font-semibold mb-3">Need help with webhooks?</h3>
                <p className="text-gray-300 mb-4">
                  Having trouble setting up or troubleshooting webhooks? Our developer support team can help you get everything working.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Contact Developer Support
                  </Link>
                  <Link
                    href="/help/category/api-integrations"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    View All API Articles
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
