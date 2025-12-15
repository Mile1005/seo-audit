"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
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
  Eye,
  Lightbulb,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CompetitorAnalysisHeroProps {
  onCompetitorSubmit?: (data: { domain: string; competitors?: string[] }) => void;
  isSubmitting?: boolean;
  submitError?: string;
}

export function CompetitorAnalysisHero({
  onCompetitorSubmit,
  isSubmitting = false,
  submitError,
}: CompetitorAnalysisHeroProps) {
  const t = useTranslations("featurePages.competitorAnalysis");
  const tHero = useTranslations("featurePages.competitorAnalysis.hero");
  const [domain, setDomain] = useState("");
  const [competitors, setCompetitors] = useState("");
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
        competitors: competitors
          .split("\n")
          .map((c) => c.trim())
          .filter((c) => c),
      });
    }
  };

  const keyMetrics = [
    {
      icon: Target,
      title: tHero("keyMetrics.serp.label"),
      value: tHero("keyMetrics.serp.value"),
      change: tHero("keyMetrics.serp.change"),
    },
    {
      icon: TrendingUp,
      title: tHero("keyMetrics.improvements.label"),
      value: tHero("keyMetrics.improvements.value"),
      change: tHero("keyMetrics.improvements.change"),
    },
    {
      icon: Eye,
      title: tHero("keyMetrics.visibility.label"),
      value: tHero("keyMetrics.visibility.value"),
      change: tHero("keyMetrics.visibility.change"),
    },
    {
      icon: Lightbulb,
      title: tHero("keyMetrics.opportunities.label"),
      value: tHero("keyMetrics.opportunities.value"),
      change: tHero("keyMetrics.opportunities.change"),
    },
  ];

  const competitorData = [
    { name: "semrush.com", rank: 1, visibility: 94, keywords: 1247, trend: "up" },
    { name: "ahrefs.com", rank: 2, visibility: 87, keywords: 1134, trend: "down" },
    { name: "moz.com", rank: 3, visibility: 83, keywords: 998, trend: "up" },
    { name: "yoursite.com", rank: 4, visibility: 76, keywords: 892, trend: "up" },
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return "↗";
    if (trend === "down") return "↘";
    return "→";
  };

  const getTrendColor = (trend: string) => {
    if (trend === "up") return "text-emerald-400";
    if (trend === "down") return "text-rose-400";
    return "text-muted-foreground";
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -8, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5,
            }}
            className="absolute bottom-20 right-10 w-60 h-60 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 rounded-full text-purple-400 text-sm font-medium">
                  <Trophy className="w-4 h-4 mr-2" />
                  {tHero("badge")}
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  {tHero("title")}
                </h1>

                <p className="text-xl text-slate-300 leading-relaxed">{tHero("subtitle")}</p>
              </div>

              {/* Key Metrics Pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-2 gap-4"
              >
                {keyMetrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <motion.div
                      key={metric.title}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="bg-card/50 backdrop-blur-sm border rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
                    >
                      <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-lg font-bold text-foreground">{metric.value}</div>
                      <div className="text-xs text-muted-foreground">{metric.title}</div>
                      <div
                        className={`text-xs font-medium ${metric.change.startsWith("+") ? "text-emerald-400" : "text-rose-400"}`}
                      >
                        {metric.change}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Target className="w-5 h-5 mr-2" />
                  {tHero("cta.analyze")}
                </Button>
                <Button variant="outline" size="lg">
                  <Play className="w-5 h-5 mr-2" />
                  {tHero("cta.demo")}
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center space-x-2 text-sm text-slate-400">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>{tHero("trustIndicators.realTime")}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-400">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>{tHero("trustIndicators.accurate")}</span>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Competitor Ranking Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-card rounded-2xl border shadow-2xl overflow-hidden">
                {/* Dashboard Header */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
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
                    {competitorData.map((competitor, index) => (
                      <motion.div
                        key={competitor.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                          competitor.name === "yoursite.com"
                            ? "bg-primary/10 border border-primary/20"
                            : "bg-muted/50 hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              competitor.rank === 1
                                ? "bg-yellow-500 text-white"
                                : competitor.rank === 2
                                  ? "bg-gray-400 text-white"
                                  : competitor.rank === 3
                                    ? "bg-amber-600 text-white"
                                    : "bg-primary text-primary-foreground"
                            }`}
                          >
                            {competitor.rank}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{competitor.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {competitor.keywords} keywords
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="text-lg font-bold text-foreground">
                              {competitor.visibility}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {tHero("dashboard.visibility")}
                            </div>
                          </div>

                          <div className="text-center">
                            <div
                              className={`text-sm font-medium ${getTrendColor(competitor.trend)}`}
                            >
                              {getTrendIcon(competitor.trend)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {tHero("dashboard.trend")}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick Stats */}
                  <div className="mt-6 pt-4 border-t">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-emerald-400">+23</div>
                        <div className="text-xs text-muted-foreground">
                          {tHero("dashboard.gained")}
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-rose-400">-8</div>
                        <div className="text-xs text-muted-foreground">
                          {tHero("dashboard.lost")}
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-400">156</div>
                        <div className="text-xs text-muted-foreground">
                          {tHero("dashboard.opportunities")}
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

      {/* Competitor Analysis Form Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Start Competitor Analysis</h2>
            <p className="text-lg text-muted-foreground">
              Enter your domain to discover competitors and uncover opportunities
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
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Domain
                  </label>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="yourwebsite.com"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.domain && <p className="text-red-500 text-sm mt-1">{errors.domain}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Known Competitors (Optional)
                  </label>
                  <textarea
                    value={competitors}
                    onChange={(e) => setCompetitors(e.target.value)}
                    placeholder="competitor1.com&#10;competitor2.com&#10;competitor3.com"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    One domain per line. We'll find competitors automatically if not specified.
                  </p>
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
                      Analyzing Competitors...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Start Analysis
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
