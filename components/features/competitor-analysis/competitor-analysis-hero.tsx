"use client";

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Target, Zap, TrendingUp, Shield, Play, ChevronRight, Clock, BarChart, Users, Star, AlertTriangle, Loader2, Search, Globe, Link, ExternalLink, FileText, Image, Zap as ZapIcon, TrendingDown, TrendingUp as TrendingUpIcon, Minus } from 'lucide-react'

interface CompetitorAnalysisHeroProps {
  onCompetitorSubmit?: (data: { domain: string; competitors?: string[] }) => void;
  isSubmitting?: boolean;
  submitError?: string;
}

export function CompetitorAnalysisHero({ onCompetitorSubmit, isSubmitting = false, submitError }: CompetitorAnalysisHeroProps) {
  const t = useTranslations('featurePages.competitorAnalysis');
  const [domain, setDomain] = useState('');
  const [competitors, setCompetitors] = useState('');
  const [errors, setErrors] = useState<{ domain?: string }>({});

  const validateForm = () => {
    const newErrors: { domain?: string } = {};

    if (!domain.trim()) {
      newErrors.domain = "Domain is required";
    } else {
      const domainPattern = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
      if (!domainPattern.test(domain.trim())) {
        newErrors.domain = "Please enter a valid domain";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (onCompetitorSubmit) {
      onCompetitorSubmit({
        domain: domain.trim(),
        competitors: competitors.split('\n').map(c => c.trim()).filter(c => c),
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
                <Zap className="w-4 h-4 mr-2 animate-pulse" />
                {t('hero.badge')}
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                {t('hero.title')}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t('hero.subtitle')}
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-muted-foreground">Competitor insights</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-muted-foreground">Gap analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-muted-foreground">Strategy recommendations</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-muted-foreground">Performance tracking</span>
              </div>
            </div>
          </motion.div>

          {/* Competitor Analysis Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card rounded-2xl shadow-2xl border p-8"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Analyze Competitors</h2>
              <p className="text-muted-foreground">Enter your domain and competitors to get comprehensive analysis</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="domain" className="block text-sm font-medium text-foreground mb-2">
                  Your Domain
                </label>
                <input
                  type="text"
                  id="domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="yourwebsite.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                    errors.domain ? 'border-red-500' : 'border-muted-foreground/20'
                  }`}
                  required
                />
                {errors.domain && (
                  <p className="mt-1 text-sm text-red-600">{errors.domain}</p>
                )}
              </div>

              <div>
                <label htmlFor="competitors" className="block text-sm font-medium text-foreground mb-2">
                  Competitor Domains <span className="text-muted-foreground">(Optional)</span>
                </label>
                <textarea
                  id="competitors"
                  value={competitors}
                  onChange={(e) => setCompetitors(e.target.value)}
                  placeholder="competitor1.com&#10;competitor2.com&#10;competitor3.com"
                  rows={3}
                  className="w-full px-4 py-3 border border-muted-foreground/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  One domain per line. We'll find competitors automatically if not specified.
                </p>
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
                disabled={isSubmitting || !domain.trim()}
                className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Competitors...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Start Analysis
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>✨ Free competitor analysis ✨ Detailed insights ✨ Actionable recommendations</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}