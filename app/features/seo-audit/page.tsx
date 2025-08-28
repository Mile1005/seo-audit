"use client";

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Target, Zap, TrendingUp, Shield, Play, ChevronRight, Clock, BarChart, Users, Star } from 'lucide-react'

// Import all feature components
import AuditCategories from '../../../components/features/seo-audit/audit-categories'
import AuditPreview from '../../../components/features/seo-audit/audit-preview'
import TechnicalBreakdown from '../../../components/features/seo-audit/technical-breakdown'
import ResultsShowcase from '../../../components/features/seo-audit/results-showcase'

export default function SEOAuditFeaturePage() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errors, setErrors] = useState<{ url?: string; email?: string }>({});

  const validateForm = () => {
    const newErrors: { url?: string; email?: string } = {};

    if (!url.trim()) {
      newErrors.url = "URL is required";
    } else if (!url.match(/^https?:\/\/.+/)) {
      newErrors.url = "Please enter a valid URL starting with http:// or https://";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsAnalyzing(true);
    
    try {
      const response = await fetch('/api/seo-audit/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim(), email: email.trim() })
      });

      if (response.ok) {
        const data = await response.json();
        // For now, just show success - in Phase 3 we'll add proper results handling
        alert('SEO audit started! You will receive results via email.');
        setUrl("");
        setEmail("");
      } else {
        throw new Error('Failed to start audit');
      }
    } catch (error) {
      console.error('Error starting audit:', error);
      alert('Failed to start audit. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Zap className="w-4 h-4 mr-2" />
                  AI-Powered Analysis
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Comprehensive SEO Audit in 
                  <span className="text-primary"> Under 3 Minutes</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  47+ technical checks, AI recommendations, and actionable insights to boost your search rankings and drive more organic traffic.
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-muted-foreground">47+ Technical Checks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-muted-foreground">AI Recommendations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-muted-foreground">Actionable Insights</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-muted-foreground">Free Analysis</span>
                </div>
              </div>
            </motion.div>

            {/* Audit Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-background rounded-2xl shadow-2xl border p-8"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">Start Your Free SEO Audit</h2>
                <p className="text-muted-foreground">Get comprehensive analysis in minutes</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="website-url" className="block text-sm font-medium text-foreground mb-2">
                    Website URL
                  </label>
                  <input
                    type="url"
                    id="website-url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                      errors.url ? 'border-red-500' : 'border-muted-foreground/20'
                    }`}
                  />
                  {errors.url && (
                    <p className="mt-1 text-sm text-red-600">{errors.url}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                      errors.email ? 'border-red-500' : 'border-muted-foreground/20'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isAnalyzing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing Your Website...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Start Free SEO Audit
                    </span>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p> No credit card required   Results in under 3 minutes   47+ checks included</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered SEO audit analyzes your website in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Enter Your URL",
                description: "Simply paste your website URL and email address into our secure audit form.",
                icon: Target,
                color: "from-blue-500 to-cyan-500"
              },
              {
                step: "2",
                title: "AI Analysis",
                description: "Our advanced AI analyzes 47+ technical SEO factors across 8 critical categories.",
                icon: Zap,
                color: "from-purple-500 to-violet-500"
              },
              {
                step: "3",
                title: "Get Results",
                description: "Receive a comprehensive report with actionable recommendations to improve your SEO.",
                icon: BarChart,
                color: "from-green-500 to-emerald-500"
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${step.color} p-4`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="mb-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold mb-2">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Categories */}
      <AuditCategories />

      {/* Technical Deep Dive */}
      <TechnicalBreakdown />

      {/* Interactive Preview */}
      <AuditPreview />

      {/* Customer Results */}
      <ResultsShowcase />

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose Our SEO Audit?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Compare our comprehensive analysis with basic SEO tools
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">Our Comprehensive Audit</h3>
              <div className="space-y-4">
                {[
                  "47+ technical SEO checks across 8 categories",
                  "AI-powered recommendations and insights",
                  "Core Web Vitals and performance analysis",
                  "Competitive analysis and benchmarking",
                  "Actionable improvement roadmap",
                  "Free detailed report with priority matrix"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-muted/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">Basic SEO Tools</h3>
              <div className="space-y-4">
                {[
                  "Limited to 5-10 basic checks",
                  "Generic recommendations",
                  "No performance analysis",
                  "No competitive insights",
                  "Vague improvement suggestions",
                  "Requires paid subscription for details"
                ].map((limitation, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground/70">{limitation}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Ready to Improve Your SEO?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of websites that have improved their search rankings with our comprehensive SEO audit. Get started in under 3 minutes.
            </p>
            
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-muted-foreground">4.9/5 rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-muted-foreground">10,000+ audits completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-green-500" />
                <span className="text-sm text-muted-foreground">Results in 3 minutes</span>
              </div>
            </div>

            <button
              onClick={() => {
                document.querySelector('#website-url')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold text-lg group"
            >
              Start Your Free Audit Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
