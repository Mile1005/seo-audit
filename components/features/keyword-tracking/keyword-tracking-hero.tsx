"use client";

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Target, Zap, TrendingUp, Shield, Play, ChevronRight, Clock, BarChart, Users, Star, AlertTriangle, Loader2, Search, Globe, Link, ExternalLink, FileText, Image, Zap as ZapIcon, TrendingDown, TrendingUp as TrendingUpIcon, Minus } from 'lucide-react'

interface KeywordTrackingHeroProps {
  onKeywordSubmit?: (data: { keywords: string[]; domain?: string; location?: string }) => void;
  isSubmitting?: boolean;
  submitError?: string;
}

export function KeywordTrackingHero({ onKeywordSubmit, isSubmitting = false, submitError }: KeywordTrackingHeroProps) {
  const t = useTranslations('featurePages.keywordTracking');
  const [keywords, setKeywords] = useState('');
  const [domain, setDomain] = useState('');
  const [location, setLocation] = useState('US');
  const [errors, setErrors] = useState<{ keywords?: string }>({});

  const validateForm = () => {
    const newErrors: { keywords?: string } = {};

    if (!keywords.trim()) {
      newErrors.keywords = "Keywords are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (onKeywordSubmit) {
      onKeywordSubmit({
        keywords: keywords.split('\n').map(k => k.trim()).filter(k => k),
        domain: domain.trim() || undefined,
        location: location || undefined,
      });
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <TrendingUp className="w-4 h-4 mr-2 animate-pulse" />
                Keyword Research
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Track Your Keywords
              </h1>
              <p className="text-xl text-muted-foreground">
                Discover high-value keywords, track rankings, and optimize your SEO strategy with real-time insights.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-muted-foreground">Real-time tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-muted-foreground">Accurate rankings</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-muted-foreground">Global coverage</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-muted-foreground">Actionable insights</span>
              </div>
            </div>
          </motion.div>

          {/* Keyword Research Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card rounded-2xl shadow-2xl border p-8"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Start Keyword Research</h2>
              <p className="text-muted-foreground">Enter keywords to analyze rankings and opportunities</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="keywords" className="block text-sm font-medium text-foreground mb-2">
                  Keywords to Research
                </label>
                <textarea
                  id="keywords"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="Enter keywords (one per line)&#10;e.g.,&#10;seo tools&#10;keyword research&#10;seo audit"
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                    errors.keywords ? 'border-red-500' : 'border-muted-foreground/20'
                  }`}
                  required
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Enter up to 100 keywords for comprehensive analysis
                </p>
                {errors.keywords && (
                  <p className="mt-1 text-sm text-red-600">{errors.keywords}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="domain" className="block text-sm font-medium text-foreground mb-2">
                    Domain <span className="text-muted-foreground">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="domain"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="yourwebsite.com"
                    className="w-full px-4 py-3 border border-muted-foreground/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                    Location
                  </label>
                  <select
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 border border-muted-foreground/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  >
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="ES">Spain</option>
                    <option value="IT">Italy</option>
                    <option value="JP">Japan</option>
                    <option value="IN">India</option>
                  </select>
                </div>
              </div>

              {/* Error Message */}
              {submitError && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-destructive text-sm">{submitError}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !keywords.trim()}
                className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Researching Keywords...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Start Research
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>✨ Free keyword research ✨ Real-time data ✨ No credit card required</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}