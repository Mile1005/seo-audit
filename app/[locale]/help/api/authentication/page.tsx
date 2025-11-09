"use client"

import { MainLayout } from '@/components/layout/main-layout'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { StructuredData, generateHowToSchema } from '@/components/seo/StructuredData'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, Key, Shield, Code, AlertTriangle, CheckCircle, Copy, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export default function AuthenticationPage() {
  const howToSchema = generateHowToSchema({
    name: "How to Generate API Keys for AISEOTurbo",
    description: "Step-by-step guide to generating and securely managing API keys for AISEOTurbo platform integration",
    totalTime: "PT3M",
    url: "https://www.aiseoturbo.com/help/api/authentication",
    datePublished: "2025-03-01T10:00:00+00:00",
    steps: [
      {
        name: "Access API settings",
        text: "Navigate to your account settings and find the API section in Dashboard → Settings → API → API Keys. You'll need an Enterprise plan or API add-on to access API features."
      },
      {
        name: "Create new API key",
        text: "Click 'Generate New Key' and give your key a descriptive name like 'Production App', 'Staging Environment', or 'Mobile App'. This helps you track which applications or services are using each key."
      },
      {
        name: "Copy and store securely",
        text: "Copy the generated API key immediately (it will only be shown once). Store it securely in your application's environment variables or secret management system. Never share API keys publicly or commit them to code repositories."
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
            { name: 'API', url: 'https://www.aiseoturbo.com/help/api-integrations' },
            { name: 'Authentication', url: 'https://www.aiseoturbo.com/help/api/authentication' }
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
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 p-3">
                  <Key className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-purple-400 text-sm font-medium">API & Integrations</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Authentication
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>6 min read</span>
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
                  <Shield className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <h2 className="text-white text-lg font-semibold mb-2">Secure API access</h2>
                    <p className="text-gray-300 mb-0">
                      Our API uses API keys for authentication. Keep your keys secure and rotate them regularly.
                      All API requests must include proper authentication headers to access protected endpoints.
                    </p>
                  </div>
                </div>
              </div>

              {/* API Key Generation */}
              <h2 className="text-2xl font-bold text-white mb-6">Generating API keys</h2>

              <div className="space-y-6 mb-8">

                {/* Step 1 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Access API settings</h3>
                      <p className="text-gray-300 mb-4">
                        Navigate to your account settings and find the API section. You'll need an Enterprise plan
                        or API add-on to access API features.
                      </p>
                      <div className="bg-slate-900/50 rounded-lg p-3">
                        <div className="text-gray-300 text-sm">
                          <strong>Dashboard:</strong> Settings → API → API Keys
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Create new API key</h3>
                      <p className="text-gray-300 mb-4">
                        Click "Generate New Key" and give your key a descriptive name. This helps you track
                        which applications or services are using each key.
                      </p>
                      <div className="bg-slate-900/50 rounded-lg p-3">
                        <div className="text-gray-300 text-sm">
                          <strong>Best practices:</strong> Use descriptive names like "Production App", "Staging Environment", "Mobile App"
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Copy and store securely</h3>
                      <p className="text-gray-300 mb-4">
                        Copy the generated API key immediately. For security, it will only be shown once.
                        Store it securely in your application's environment variables or secret management system.
                      </p>
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                          <span className="text-red-400 font-medium">Important security note</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          API keys provide full access to your account. Never share them publicly, commit them to code repositories,
                          or send them via unsecured channels.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Using API Keys */}
              <h3 className="text-2xl font-bold text-white mb-6">Using API keys in requests</h3>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <h3 className="text-white font-semibold mb-4">Include the API key in your request headers:</h3>

                <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Header</span>
                    <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
                      <Copy className="w-3 h-3" />
                      Copy
                    </button>
                  </div>
                  <code className="text-green-400 text-sm">
                    Authorization: Bearer your_api_key_here
                  </code>
                </div>

                <div className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                    <span>Use <code className="text-green-400">Bearer</code> authentication scheme</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                    <span>Include the header in all API requests</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                    <span>No additional authentication required</span>
                  </div>
                </div>
              </div>

              {/* Code Examples */}
              <h3 className="text-2xl font-bold text-white mb-6">Code examples</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                {/* cURL */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Code className="w-5 h-5 text-blue-400" />
                    cURL
                  </h3>
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <pre className="text-green-400 text-xs overflow-x-auto">
{`curl -X GET \\
  "https://api.aiseoturbo.com/v1/audits" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                    </pre>
                  </div>
                </div>

                {/* JavaScript */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Code className="w-5 h-5 text-yellow-400" />
                    JavaScript
                  </h3>
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <pre className="text-green-400 text-xs overflow-x-auto">
{`const response = await fetch('/v1/audits', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});`}
                    </pre>
                  </div>
                </div>

                {/* Python */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Code className="w-5 h-5 text-blue-500" />
                    Python
                  </h3>
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <pre className="text-green-400 text-xs overflow-x-auto">
{`import requests

response = requests.get(
    'https://api.aiseoturbo.com/v1/audits',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    }
)`}
                    </pre>
                  </div>
                </div>

                {/* PHP */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Code className="w-5 h-5 text-purple-400" />
                    PHP
                  </h3>
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <pre className="text-green-400 text-xs overflow-x-auto">
{`$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, '/v1/audits');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_API_KEY',
    'Content-Type: application/json'
]);

$response = curl_exec($ch);`}
                    </pre>
                  </div>
                </div>

              </div>

              {/* API Key Management */}
              <h3 className="text-2xl font-bold text-white mb-6">Managing API keys</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-blue-400" />
                    Viewing Keys
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">
                    You can view all your API keys in the dashboard, but the full key value is only shown during creation.
                  </p>
                  <div className="text-gray-400 text-xs">
                    Keys show masked values for security
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Key className="w-5 h-5 text-green-400" />
                    Rotating Keys
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Regularly rotate your API keys for security. Create new keys and update your applications before deleting old ones.
                  </p>
                  <div className="text-gray-400 text-xs">
                    Recommended: Rotate every 90 days
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    Revoking Keys
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Immediately revoke compromised keys. This will prevent any further API access using that key.
                  </p>
                  <div className="text-gray-400 text-xs">
                    Revocation is instant and irreversible
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-400" />
                    Key Permissions
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">
                    All API keys have full access to your account. We're working on granular permissions for future releases.
                  </p>
                  <div className="text-gray-400 text-xs">
                    Full account access currently
                  </div>
                </div>

              </div>

              {/* Security Best Practices */}
              <h3 className="text-2xl font-bold text-white mb-6">Security best practices</h3>

              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Environment Variables</h4>
                      <p className="text-gray-300 text-sm">
                        Store API keys in environment variables, never in your source code or configuration files.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Separate Keys</h4>
                      <p className="text-gray-300 text-sm">
                        Use different API keys for different environments (development, staging, production).
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Regular Rotation</h4>
                      <p className="text-gray-300 text-sm">
                        Rotate API keys every 90 days or immediately if you suspect compromise.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Monitor Usage</h4>
                      <p className="text-gray-300 text-sm">
                        Regularly check your API usage logs for unusual activity or unauthorized access.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">HTTPS Only</h4>
                      <p className="text-gray-300 text-sm">
                        Always use HTTPS when making API requests to ensure encrypted communication.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rate Limiting */}
              <h3 className="text-2xl font-bold text-white mb-6">Rate limiting</h3>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-2">1000</div>
                    <div className="text-gray-300 text-sm mb-1">Requests</div>
                    <div className="text-gray-400 text-xs">Per hour</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-2">10,000</div>
                    <div className="text-gray-300 text-sm mb-1">Requests</div>
                    <div className="text-gray-400 text-xs">Per day</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-2">429</div>
                    <div className="text-gray-300 text-sm mb-1">Status Code</div>
                    <div className="text-gray-400 text-xs">Rate limit exceeded</div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-slate-900/50 rounded-lg">
                  <p className="text-gray-300 text-sm">
                    Rate limits are applied per API key. If you exceed these limits, you'll receive a 429 status code.
                    Enterprise customers can request higher limits.
                  </p>
                </div>
              </div>

              {/* Need Help */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mt-8">
                <h3 className="text-white text-lg font-semibold mb-3">Need help with API authentication?</h3>
                <p className="text-gray-300 mb-4">
                  Having trouble with API keys or authentication? Our developer support team can help you get set up quickly.
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
