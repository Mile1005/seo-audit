"use client";

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Target, Zap, TrendingUp, Shield, Play, ChevronRight, Clock, BarChart, Users, Star, AlertTriangle, Loader2, Search, Globe, Link, ExternalLink, FileText, Image, Zap as ZapIcon, TrendingDown, TrendingUp as TrendingUpIcon, Minus } from 'lucide-react'

interface SiteCrawlerHeroProps {
  onCrawlSubmit?: (data: { url: string; maxPages?: number; includeSubdomains?: boolean }) => void;
  isSubmitting?: boolean;
  submitError?: string;
}

// Normalize URL - accepts all formats: example.com, www.example.com, https://example.com
function normalizeUrl(input: string): string {
  let url = input.trim().toLowerCase();
  
  // Remove trailing slashes
  url = url.replace(/\/+$/, '');
  
  // Add https:// if no protocol
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  
  return url;
}

// Validate URL - accepts domains without protocol
function isValidUrl(input: string): boolean {
  const trimmed = input.trim();
  if (!trimmed) return false;
  
  // Pattern that accepts: example.com, www.example.com, https://example.com, etc.
  const pattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+([\/\w\-._~:?#\[\]@!$&'()*+,;=]*)?$/;
  return pattern.test(trimmed);
}

export function SiteCrawlerHero({ onCrawlSubmit, isSubmitting = false, submitError }: SiteCrawlerHeroProps) {
  const t = useTranslations('featurePages.siteCrawler');
  const [url, setUrl] = useState('');
  const [maxPages, setMaxPages] = useState('25');
  const [includeSubdomains, setIncludeSubdomains] = useState(false);
  const [errors, setErrors] = useState<{ url?: string }>({});

  const validateForm = () => {
    const newErrors: { url?: string } = {};

    if (!url.trim()) {
      newErrors.url = "URL is required";
    } else if (!isValidUrl(url)) {
      newErrors.url = "Please enter a valid URL (e.g., example.com or https://example.com)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (onCrawlSubmit) {
      onCrawlSubmit({
        url: normalizeUrl(url),
        maxPages: parseInt(maxPages) || 25,
        includeSubdomains
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
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t('hero.titleHighlight')}
                </span>
                <span className="block">{t('hero.titleEnd')}</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-muted-foreground">{t('features.pages')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-muted-foreground">{t('features.issues')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-muted-foreground">{t('features.speed')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-muted-foreground">{t('features.monitoring')}</span>
              </div>
            </div>
          </motion.div>

          {/* Crawl Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card rounded-2xl shadow-2xl border p-8"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">{t('form.title')}</h2>
              <p className="text-muted-foreground">{t('form.subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="crawl-url" className="block text-sm font-medium text-foreground mb-2">
                  {t('form.urlLabel')}
                </label>
                <input
                  type="text"
                  id="crawl-url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="example.com or https://example.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                    errors.url ? 'border-red-500' : 'border-muted-foreground/20'
                  }`}
                />
                {errors.url && (
                  <p className="mt-1 text-sm text-red-600">{errors.url}</p>
                )}
              </div>

              <div>
                <label htmlFor="max-pages" className="block text-sm font-medium text-foreground mb-2">
                  {t('form.maxPagesLabel')}
                </label>
                <select
                  id="max-pages"
                  value={maxPages}
                  onChange={(e) => setMaxPages(e.target.value)}
                  className="w-full px-4 py-3 border border-muted-foreground/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                >
                  <option value="10">10 pages (Quick scan)</option>
                  <option value="25">25 pages (Standard)</option>
                  <option value="50">50 pages (Comprehensive)</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="include-subdomains"
                  checked={includeSubdomains}
                  onChange={(e) => setIncludeSubdomains(e.target.checked)}
                  className="rounded border-muted-foreground/20"
                />
                <label htmlFor="include-subdomains" className="text-sm text-muted-foreground">
                  {t('form.includeSubdomains')}
                </label>
              </div>

              {submitError && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-destructive text-sm">{submitError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t('form.crawling')}
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    {t('form.startCrawl')}
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>{t('form.footer')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}