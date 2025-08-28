import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Target, Zap, TrendingUp, Shield, Play, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'SEO Audit Tool - Comprehensive Website Analysis',
  description: 'Get a complete SEO audit with 47+ technical checks, AI recommendations, and actionable insights.',
}

export default function SEOAuditFeaturePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Zap className="w-4 h-4 mr-2" />
                  AI-Powered Analysis
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Comprehensive SEO Audit in{' '}
                  <span className="text-primary">Under 3 Minutes</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  47+ technical checks, AI recommendations, and actionable insights to boost your search rankings and drive more organic traffic.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/seo-audit"
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Audit My Website Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
