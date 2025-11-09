"use client"

import { MainLayout } from '@/components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Users, TrendingUp, Search, Target, Eye, Zap, BarChart3, Shield, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function CompetitorAnalysisPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Competitor Analysis Guide</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Master competitor analysis to gain strategic advantages. Learn how to identify competitors,
              analyze their strategies, and uncover opportunities for your SEO campaigns.
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <Users className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Understanding Competitor Analysis</h2>
                <p className="text-gray-600">
                  Competitor analysis helps you understand what works in your industry. By studying successful competitors,
                  you can identify proven strategies, uncover keyword opportunities, and develop data-driven SEO tactics.
                </p>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Keyword Gaps</h3>
                <p className="text-sm text-gray-600">Find keywords competitors rank for that you don't</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Strategy Insights</h3>
                <p className="text-sm text-gray-600">Learn from competitors' successful tactics</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <Eye className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Content Ideas</h3>
                <p className="text-sm text-gray-600">Discover content topics that drive results</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <BarChart3 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Performance Tracking</h3>
                <p className="text-sm text-gray-600">Monitor competitor ranking changes</p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">How Competitor Analysis Works</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Identify Your Competitors</h3>
                  <p className="text-gray-600 mb-3">
                    Start by finding websites that compete with you for the same keywords and target audience.
                    Look beyond direct competitors to include indirect competitors in related niches.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Where to find competitors:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Google search results for your target keywords</li>
                      <li>• Industry directories and review sites</li>
                      <li>• Social media and industry forums</li>
                      <li>• SimilarWeb or SEMrush competitor reports</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyze Their SEO Strategy</h3>
                  <p className="text-gray-600 mb-3">
                    Examine competitors' on-page SEO, content strategy, backlink profile, and technical SEO implementation.
                    Look for patterns in their successful pages and identify opportunities.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-blue-600 font-medium mb-1">On-Page Factors</div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>• Title tags and meta descriptions</div>
                        <div>• Heading structure (H1-H6)</div>
                        <div>• Content depth and quality</div>
                        <div>• Internal linking patterns</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-purple-600 font-medium mb-1">Off-Page Factors</div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>• Backlink quality and quantity</div>
                        <div>• Social media presence</div>
                        <div>• Brand mentions and citations</div>
                        <div>• Domain authority trends</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Identify Opportunities</h3>
                  <p className="text-gray-600 mb-3">
                    Use competitor insights to find gaps in your strategy. Look for keyword opportunities,
                    content topics competitors haven't covered, and technical SEO improvements.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-blue-800 font-medium mb-2">Common opportunities:</h4>
                    <ul className="space-y-1 text-sm text-blue-700">
                      <li>• Keywords with low competition that competitors ignore</li>
                      <li>• Content formats competitors haven't tried</li>
                      <li>• Technical SEO issues competitors have fixed</li>
                      <li>• Link building strategies that work in your niche</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Track and Monitor</h3>
                  <p className="text-gray-600 mb-3">
                    Set up ongoing monitoring to track competitor performance changes and identify new opportunities
                    as the competitive landscape evolves.
                  </p>
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-orange-600" />
                    <div>
                      <div className="text-gray-900 font-medium">Continuous monitoring</div>
                      <div className="text-gray-600 text-sm">Stay ahead of competitor strategy changes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Best Practices for Competitor Analysis</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Focus on Direct Competitors</h3>
                    <p className="text-sm text-gray-600">Prioritize competitors targeting the same audience and keywords as you.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Look for Patterns</h3>
                    <p className="text-sm text-gray-600">Identify common strategies across multiple successful competitors.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Don't Copy Blindly</h3>
                    <p className="text-sm text-gray-600">Adapt strategies to fit your unique brand and resources.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Monitor Regularly</h3>
                    <p className="text-sm text-gray-600">Competitor strategies change, so review analysis quarterly.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Combine with Your Data</h3>
                    <p className="text-sm text-gray-600">Use competitor insights alongside your own analytics.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Track Implementation</h3>
                    <p className="text-sm text-gray-600">Measure results when you implement competitor-derived strategies.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tools and Features */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Competitor Analysis Tools</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <Search className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Keyword Gap Analysis</h3>
                <p className="text-sm text-gray-600">Find keywords competitors rank for that you're missing</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <BarChart3 className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Backlink Analysis</h3>
                <p className="text-sm text-gray-600">Analyze competitors' link profiles and strategies</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <TrendingUp className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">SERP Tracking</h3>
                <p className="text-sm text-gray-600">Monitor competitor ranking changes over time</p>
              </div>
            </div>
          </div>

          {/* Getting Started */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Ready to Analyze Your Competitors?</h2>
            <p className="text-gray-600 mb-6">
              Start by identifying 3-5 main competitors and running a comprehensive analysis.
              Use the insights to improve your SEO strategy and gain competitive advantages.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Start Competitor Analysis
              </Link>
              <Link
                href="/help/getting-started/quick-start"
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                View Quick Start Guide
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}