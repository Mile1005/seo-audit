"use client"

import { MainLayout } from '@/components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Bot, MessageSquare, Lightbulb, Target, Zap, Brain, CheckCircle, Sparkles, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function AIAssistantPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/help"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Help Center
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Assistant Best Practices</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Master our AI SEO assistant for maximum results. Learn how to ask effective questions,
              interpret AI recommendations, and combine AI insights with your SEO expertise.
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <Brain className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Understanding the AI SEO Assistant</h2>
                <p className="text-gray-600">
                  Our AI assistant combines machine learning with SEO expertise to provide personalized recommendations.
                  Trained on millions of websites and the latest SEO best practices, it helps you make data-driven decisions.
                </p>
              </div>
            </div>

            {/* AI Capabilities */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Keyword Research</h3>
                <p className="text-sm text-gray-600">Advanced keyword analysis and opportunities</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Lightbulb className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Content Optimization</h3>
                <p className="text-sm text-gray-600">Smart content improvement suggestions</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Technical SEO</h3>
                <p className="text-sm text-gray-600">Technical issue identification and fixes</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Strategy Development</h3>
                <p className="text-sm text-gray-600">Custom SEO strategy recommendations</p>
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Best Practices for AI Interactions</h2>

            <div className="space-y-8">
              {/* Be Specific */}
              <div className="border-l-4 border-blue-500 pl-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Be Specific in Your Questions</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  The more specific your question, the better the AI can provide targeted, actionable advice.
                  Include context about your industry, goals, and current situation.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Good Examples:</h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• "How can I improve my e-commerce site's ranking for 'wireless headphones'?"</li>
                    <li>• "What technical SEO issues should I prioritize for my SaaS landing page?"</li>
                    <li>• "Suggest content topics for my B2B blog about cybersecurity"</li>
                  </ul>
                </div>
              </div>

              {/* Provide Context */}
              <div className="border-l-4 border-green-500 pl-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Provide Context and Data</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Share relevant data from your audits, analytics, or current performance metrics.
                  This helps the AI give more accurate and personalized recommendations.
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Include in your questions:</h4>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>• Current search rankings and traffic data</li>
                    <li>• Target keywords and competitors</li>
                    <li>• Your industry and target audience</li>
                    <li>• Recent changes or campaigns</li>
                  </ul>
                </div>
              </div>

              {/* Ask Follow-up Questions */}
              <div className="border-l-4 border-purple-500 pl-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Ask Follow-up Questions</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Don't stop at the first response. Ask clarifying questions or request more details
                  about specific recommendations to deepen your understanding.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Follow-up strategies:</h4>
                  <ul className="space-y-2 text-sm text-purple-800">
                    <li>• "Can you explain why this recommendation would help?"</li>
                    <li>• "What metrics should I track to measure success?"</li>
                    <li>• "Are there any potential risks with this approach?"</li>
                    <li>• "How does this fit with my overall SEO strategy?"</li>
                  </ul>
                </div>
              </div>

              {/* Combine AI with Expertise */}
              <div className="border-l-4 border-orange-500 pl-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-semibold">4</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Combine AI Insights with Your Expertise</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Use AI recommendations as a starting point, but apply your industry knowledge and experience
                  to determine what makes sense for your specific situation.
                </p>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">Best approach:</h4>
                  <ul className="space-y-2 text-sm text-orange-800">
                    <li>• Evaluate recommendations against your business goals</li>
                    <li>• Consider your resources and timeline constraints</li>
                    <li>• Test recommendations on a small scale first</li>
                    <li>• Use AI for research, you for strategy and execution</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Common Use Cases */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Common AI Assistant Use Cases</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <MessageSquare className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Strategy</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get help with content planning, topic ideation, and optimization strategies.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Keyword research and content gaps</li>
                  <li>• Content calendar planning</li>
                  <li>• SEO-friendly title and meta suggestions</li>
                  <li>• Content structure recommendations</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <Target className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical SEO</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Identify and fix technical SEO issues with AI-powered analysis.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Crawl error analysis and fixes</li>
                  <li>• Core Web Vitals optimization</li>
                  <li>• Schema markup implementation</li>
                  <li>• Mobile optimization guidance</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Competitor Analysis</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Understand competitor strategies and find opportunities.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Competitor keyword analysis</li>
                  <li>• Content strategy comparison</li>
                  <li>• Backlink opportunity identification</li>
                  <li>• SERP feature targeting</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <Sparkles className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Optimization</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Improve site performance and user experience.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Page speed optimization tips</li>
                  <li>• User experience improvements</li>
                  <li>• Conversion rate optimization</li>
                  <li>• A/B testing recommendations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tips for Success */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">Tips for Success</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Do's</h3>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Start with specific, well-defined questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Provide context and current performance data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Experiment with different question formats</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Track and measure the impact of AI recommendations</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Don'ts</h3>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Ask vague or overly broad questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Expect AI to replace your SEO expertise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Implement recommendations without testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Ignore your industry-specific knowledge</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Getting Started */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Getting Started with the AI Assistant</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Access the AI Assistant</h3>
                  <p className="text-gray-600">Navigate to the AI Assistant section in your dashboard.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Start with a Simple Question</h3>
                  <p className="text-gray-600">Begin with a specific question about your current SEO challenges.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Refine and Iterate</h3>
                  <p className="text-gray-600">Use follow-up questions to get more detailed insights.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Apply and Track Results</h3>
                  <p className="text-gray-600">Implement recommendations and monitor their impact on your SEO performance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}