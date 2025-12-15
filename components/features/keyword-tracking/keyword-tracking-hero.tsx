"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Target,
  Zap,
  TrendingUp,
  Shield,
  Play,
  ChevronRight,
  Clock,
  BarChart,
  Users,
  Star,
  AlertTriangle,
  Loader2,
  Search,
  Globe,
  Link,
  ExternalLink,
  FileText,
  Image,
  Zap as ZapIcon,
  TrendingDown,
  TrendingUp as TrendingUpIcon,
  Minus,
} from "lucide-react";
import { Button } from "../../ui/button";

interface KeywordTrackingHeroProps {
  onKeywordSubmit?: (data: { keywords: string[]; domain?: string; location?: string }) => void;
  isSubmitting?: boolean;
  submitError?: string;
}

export function KeywordTrackingHero({
  onKeywordSubmit,
  isSubmitting = false,
  submitError,
}: KeywordTrackingHeroProps) {
  const t = useTranslations("featurePages.keywordTracking");
  const tHero = useTranslations("featurePages.keywordTracking.hero");
  const router = useRouter();
  const [keywords, setKeywords] = useState("");
  const [domain, setDomain] = useState("");
  const [location, setLocation] = useState("US");
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
        keywords: keywords
          .split("\n")
          .map((k) => k.trim())
          .filter((k) => k),
        domain: domain.trim() || undefined,
        location: location || undefined,
      });
    }
  };

  const heroMetrics = [
    {
      label: tHero("metrics.keywordsTracked.label"),
      value: tHero("metrics.keywordsTracked.value"),
      description: tHero("metrics.keywordsTracked.description"),
    },
    {
      label: tHero("metrics.dailyUpdates.label"),
      value: tHero("metrics.dailyUpdates.value"),
      description: tHero("metrics.dailyUpdates.description"),
    },
    {
      label: tHero("metrics.globalLocations.label"),
      value: tHero("metrics.globalLocations.value"),
      description: tHero("metrics.globalLocations.description"),
    },
    {
      label: tHero("metrics.serpFeatures.label"),
      value: tHero("metrics.serpFeatures.value"),
      description: tHero("metrics.serpFeatures.description"),
    },
  ];

  const rankingPreview = [
    {
      keyword: "seo audit tool",
      position: 4,
      change: +2,
      volume: 12100,
      url: "/features/seo-audit",
      featured: ["organic", "related-questions"],
    },
    {
      keyword: "competitor analysis tool",
      position: 7,
      change: +3,
      volume: 8200,
      url: "/features/competitor-analysis",
      featured: ["organic"],
    },
    {
      keyword: "website crawler",
      position: 2,
      change: 0,
      volume: 5400,
      url: "/features/site-crawler",
      featured: ["organic", "people-also-ask", "related-searches"],
    },
    {
      keyword: "ai seo assistant",
      position: 12,
      change: -1,
      volume: 3200,
      url: "/features/ai-assistant",
      featured: ["organic"],
    },
  ];

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-emerald-400";
    if (change < 0) return "text-rose-400";
    return "text-muted-foreground";
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return "↗";
    if (change < 0) return "↘";
    return "→";
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Lightweight grid background for consistency & low paint cost */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.001 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-green-500/10 rounded-full text-green-400 text-sm font-medium">
                  <BarChart className="w-4 h-4 mr-2" />
                  {tHero("badge")}
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold text-foreground">{tHero("title")}</h1>

                <p className="text-xl text-muted-foreground leading-relaxed">{tHero("subtitle")}</p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  onClick={() => router.push("/signup")}
                >
                  <Target className="w-5 h-5 mr-2" />
                  {tHero("cta.track")}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    document
                      .getElementById("keyword-form")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  <Play className="w-5 h-5 mr-2" />
                  {tHero("cta.demo")}
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>{tHero("trustIndicators.uptime")}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>{tHero("trustIndicators.dailyUpdates")}</span>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Ranking Dashboard Preview */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.001 }}
              className="relative"
            >
              <div className="bg-card rounded-2xl border shadow-2xl overflow-hidden">
                {/* Dashboard Header */}
                <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">{tHero("dashboard.title")}</h2>
                      <p className="text-sm opacity-90">{tHero("dashboard.subtitle")}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm">{tHero("dashboard.live")}</span>
                    </div>
                  </div>
                </div>

                {/* Rankings Table */}
                <div className="p-6">
                  <div className="space-y-4">
                    {rankingPreview.map((item) => (
                      <motion.div
                        key={item.keyword}
                        initial={false}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.001 }}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-foreground mb-1">{item.keyword}</div>
                          <div className="text-sm text-muted-foreground">
                            {item.volume.toLocaleString()} {tHero("dashboard.monthlySearches")}
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-foreground">
                              #{item.position}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {tHero("dashboard.position")}
                            </div>
                          </div>

                          <div className="text-center">
                            <div className={`text-sm font-medium ${getChangeColor(item.change)}`}>
                              {getChangeIcon(item.change)} {item.change > 0 ? "+" : ""}
                              {item.change}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {tHero("dashboard.change")}
                            </div>
                          </div>

                          <div className="flex space-x-1">
                            {item.featured.map((feature, featureIndex) => (
                              <div
                                key={featureIndex}
                                className="w-2 h-2 bg-blue-500 rounded-full"
                                title={feature}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick Stats */}
                  <div className="mt-6 pt-4 border-t">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-emerald-400">+12</div>
                        <div className="text-xs text-muted-foreground">
                          {tHero("dashboard.improved")}
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-rose-400">-3</div>
                        <div className="text-xs text-muted-foreground">
                          {tHero("dashboard.declined")}
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-muted-foreground">5</div>
                        <div className="text-xs text-muted-foreground">
                          {tHero("dashboard.unchanged")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {heroMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={false}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2 }}
                className="text-center p-6 bg-card rounded-xl border hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                <div className="text-sm font-medium text-foreground mb-1">{metric.label}</div>
                <div className="text-xs text-muted-foreground">{metric.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Keyword Research Form Section */}
      <section id="keyword-form" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Start Tracking Keywords</h2>
            <p className="text-lg text-muted-foreground">
              Enter keywords to research and start monitoring their rankings
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-2xl p-8 border shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="keywords-input"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Keywords (one per line)
                  </label>
                  <textarea
                    id="keywords-input"
                    name="keywords"
                    aria-describedby="keywords-help"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="Enter keywords to track..."
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    rows={4}
                  />
                  <p id="keywords-help" className="text-xs text-muted-foreground mt-1">
                    Enter one keyword per line.
                  </p>
                  {errors.keywords && (
                    <p className="text-red-500 text-sm mt-1">{errors.keywords}</p>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="domain-input"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Domain (Optional)
                    </label>
                    <input
                      id="domain-input"
                      name="domain"
                      type="text"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      placeholder="yourwebsite.com"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="location-select"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Location
                    </label>
                    <select
                      id="location-select"
                      name="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                    </select>
                  </div>
                </div>
              </div>

              {submitError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">{submitError}</p>
                </div>
              )}

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Researching Keywords...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Research Keywords
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>✨ Free keyword research ✨ Real-time data ✨ No credit card required</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
