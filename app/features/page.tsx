import React from 'react';
import { Metadata } from 'next';
import { CheckCircle, Search, TrendingUp, Shield, Zap, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SEO Features - Complete Audit Tools | AI SEO Turbo',
  description: 'Discover all the powerful features of AI SEO Turbo including comprehensive SEO audits, competitor analysis, real-time monitoring, and AI-powered recommendations.',
  keywords: 'SEO features, SEO audit, competitor analysis, keyword research, technical SEO, performance optimization',
};

const features = [
  {
    icon: Search,
    title: 'Comprehensive SEO Audit',
    description: 'Get detailed analysis of your website\'s SEO performance with actionable recommendations.',
    benefits: ['Technical SEO analysis', 'Content optimization', 'Meta tag analysis', 'URL structure review'],
    popular: true,
  },
  {
    icon: TrendingUp,
    title: 'Competitor Analysis',
    description: 'Analyze your competitors\' SEO strategies and discover opportunities to outrank them.',
    benefits: ['Competitor keyword analysis', 'Backlink comparison', 'Content gap analysis', 'SERP position tracking'],
    popular: false,
  },
  {
    icon: Shield,
    title: 'Real-time Monitoring',
    description: 'Monitor your website\'s SEO health 24/7 with instant alerts for critical issues.',
    benefits: ['Uptime monitoring', 'Performance tracking', 'Ranking alerts', 'Technical issue detection'],
    popular: false,
  },
  {
    icon: Zap,
    title: 'AI-Powered Recommendations',
    description: 'Get intelligent SEO suggestions powered by machine learning and industry best practices.',
    benefits: ['Personalized recommendations', 'Priority scoring', 'Implementation guides', 'ROI estimation'],
    popular: true,
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work together with your team to implement SEO improvements efficiently.',
    benefits: ['Team workspace', 'Task assignment', 'Progress tracking', 'Collaboration tools'],
    popular: false,
  },
  {
    icon: CheckCircle,
    title: 'White-label Reports',
    description: 'Generate professional SEO reports with your branding for clients and stakeholders.',
    benefits: ['Custom branding', 'Automated reports', 'Multiple formats', 'Scheduled delivery'],
    popular: false,
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Powerful SEO Features
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Everything you need to dominate search rankings and outperform your competition
          </p>
        </div>
      </section>

      {/* Comprehensive SEO Features Introduction */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-invert mx-auto">
            <h2>Master AI-Powered SEO Tools & Features</h2>
            <p>
              AI SEO Turbo provides a comprehensive suite of cutting-edge SEO tools designed to give you a competitive edge
              in search engine optimization. Whether you're a beginner or an experienced SEO professional, our platform
              offers the features and insights you need to drive organic growth and dominate search results.
            </p>

            <p>
              Our AI-powered platform combines machine learning algorithms with deep industry expertise to deliver
              actionable SEO insights that drive real results. From comprehensive technical audits to advanced competitor
              analysis, every feature is built to help you understand and improve your search engine visibility.
            </p>

            <h3>Why Choose AI SEO Turbo's Feature Suite?</h3>
            <p>
              What sets AI SEO Turbo apart is our commitment to combining artificial intelligence with human expertise.
              Our platform doesn't just identify problems – it provides context, explains solutions, and guides you
              through implementation. Every recommendation is backed by data and designed for real-world application.
            </p>

            <h3>Comprehensive Technical SEO Analysis</h3>
            <p>
              Our flagship SEO audit tool goes beyond basic checklists, providing AI-driven analysis that identifies
              critical issues and opportunities. The 47-point technical audit covers everything from crawlability and
              indexation to performance optimization and content gaps.
            </p>
            <ul>
              <li><strong>Core Web Vitals Assessment:</strong> Detailed analysis of loading performance, interactivity, and visual stability</li>
              <li><strong>Mobile Optimization:</strong> Comprehensive mobile-friendliness evaluation and recommendations</li>
              <li><strong>Schema Markup Validation:</strong> Structured data implementation and rich snippet opportunities</li>
              <li><strong>Internal Linking Analysis:</strong> Site structure optimization and link equity distribution</li>
            </ul>

            <h3>Advanced Competitor Intelligence</h3>
            <p>
              Stay ahead of the competition with our sophisticated competitor analysis tools. Our AI examines competitor
              strategies across multiple dimensions to identify opportunities and threats to your search presence.
            </p>

            <h4>Competitor Analysis Capabilities:</h4>
            <ul>
              <li>Keyword overlap and gap analysis</li>
              <li>Backlink profile comparison and opportunities</li>
              <li>Content strategy insights and topic clustering</li>
              <li>SERP feature analysis and rich snippet tracking</li>
              <li>Technology stack identification and recommendations</li>
            </ul>

            <h3>Real-Time Performance Monitoring</h3>
            <p>
              Monitor your SEO health 24/7 with our advanced monitoring system. Get instant alerts for critical issues
              and track performance trends over time to ensure consistent search engine visibility.
            </p>

            <h4>Monitoring Features:</h4>
            <ul>
              <li>Core Web Vitals tracking and alerting</li>
              <li>Ranking position monitoring for target keywords</li>
              <li>Technical issue detection and notification</li>
              <li>Site uptime and performance monitoring</li>
              <li>Google algorithm update impact assessment</li>
            </ul>

            <h3>AI-Powered Content Optimization</h3>
            <p>
              Leverage machine learning to optimize your content for search engines and users. Our AI analyzes
              successful content patterns and provides specific recommendations for improvement.
            </p>

            <h4>Content Optimization Tools:</h4>
            <ul>
              <li>Topic clustering and content gap identification</li>
              <li>Keyword optimization suggestions with search intent analysis</li>
              <li>Content structure recommendations for better readability</li>
              <li>Internal linking opportunities and suggestions</li>
              <li>Content performance prediction and improvement tracking</li>
            </ul>

            <h3>Team Collaboration & Workflow Management</h3>
            <p>
              Scale your SEO efforts with powerful team collaboration tools. Assign tasks, track progress, and
              ensure everyone stays aligned on SEO objectives and implementation.
            </p>

            <h4>Collaboration Features:</h4>
            <ul>
              <li>Role-based access control and permissions</li>
              <li>Task assignment and progress tracking</li>
              <li>Comment threads and discussion forums</li>
              <li>Automated workflow notifications</li>
              <li>Performance reporting and accountability metrics</li>
            </ul>

            <h3>Professional Reporting & White-Label Solutions</h3>
            <p>
              Generate stunning, professional SEO reports that impress clients and stakeholders. Our white-label
              reporting tools help agencies maintain their brand identity while delivering exceptional value.
            </p>

            <h4>Reporting Capabilities:</h4>
            <ul>
              <li>Custom branding and logo integration</li>
              <li>Automated report generation and scheduling</li>
              <li>Multiple export formats (PDF, CSV, JSON)</li>
              <li>Executive summaries and detailed technical reports</li>
              <li>Historical trend analysis and forecasting</li>
            </ul>

            <h2>Expert SEO Insights & Recommendations</h2>
            <p>
              Every feature in AI SEO Turbo is designed by SEO experts with decades of combined experience. Our
              recommendations aren't generic suggestions – they're data-driven insights tailored to your specific
              situation and goals. We understand that SEO isn't just about rankings; it's about driving meaningful
              business results through sustainable, ethical optimization strategies.
            </p>

            <p>
              Our platform continuously learns from successful SEO campaigns across industries, enabling us to provide
              increasingly accurate and valuable recommendations. Whether you're optimizing for local search, e-commerce,
              or content marketing, AI SEO Turbo adapts to your needs and provides the tools necessary for success.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="relative overflow-hidden border border-border/50 rounded-lg bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-colors">
                  {feature.popular && (
                    <span className="absolute top-4 right-4 inline-flex items-center rounded-full border-transparent bg-primary text-primary-foreground px-2.5 py-0.5 text-xs font-semibold">
                      Popular
                    </span>
                  )}
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold leading-none tracking-tight">{feature.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className="p-6 pt-0">
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of businesses that trust AI SEO Turbo for their SEO success
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Start free trial with AI SEO Turbo"
            >
              Start Free Trial
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-border rounded-lg font-semibold hover:bg-muted/50 transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Contact sales team"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
