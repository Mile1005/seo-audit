import React from 'react';
import { Metadata } from 'next';
import { CheckCircle, Search, TrendingUp, Shield, Zap, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Features | AI SEO Turbo - Complete SEO Audit & Optimization',
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
