"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Target,
  TrendingUp,
  Clock,
  Star,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Zap,
  BarChart3,
  Users,
  Globe,
  FileText,
  Link,
  Search,
  Calendar,
  Play,
} from "lucide-react";
import { Button } from "../../ui/button";
import { useTranslations } from "next-intl";

export default function StrategyRecommendations() {
  const t = useTranslations("featurePages.competitorAnalysis.strategyRecommendations");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const priorities = [
    { id: "all", label: t("priorities.all"), count: 24 },
    { id: "high", label: t("priorities.high"), count: 8 },
    { id: "medium", label: t("priorities.medium"), count: 12 },
    { id: "low", label: t("priorities.low"), count: 4 },
  ];

  const categories = [
    { id: "all", label: t("categories.all") },
    { id: "content", label: t("categories.content") },
    { id: "keywords", label: t("categories.keywords") },
    { id: "technical", label: t("categories.technical") },
    { id: "backlinks", label: t("categories.backlinks") },
  ];

  const impactMetrics = [
    {
      label: t("impactMetrics.potentialTrafficGain.label"),
      value: t("impactMetrics.potentialTrafficGain.value"),
      unit: t("impactMetrics.potentialTrafficGain.unit"),
      description: t("impactMetrics.potentialTrafficGain.description"),
    },
    {
      label: t("impactMetrics.revenueOpportunity.label"),
      value: t("impactMetrics.revenueOpportunity.value"),
      unit: t("impactMetrics.revenueOpportunity.unit"),
      description: t("impactMetrics.revenueOpportunity.description"),
    },
    {
      label: t("impactMetrics.implementationTime.label"),
      value: t("impactMetrics.implementationTime.value"),
      unit: t("impactMetrics.implementationTime.unit"),
      description: t("impactMetrics.implementationTime.description"),
    },
    {
      label: t("impactMetrics.successProbability.label"),
      value: t("impactMetrics.successProbability.value"),
      unit: t("impactMetrics.successProbability.unit"),
      description: t("impactMetrics.successProbability.description"),
    },
  ];

  const recommendations = [
    {
      id: 1,
      title: t("recommendations.card1.title"),
      description: t("recommendations.card1.description"),
      category: "keywords",
      priority: t("recommendations.card1.priority"),
      effort: t("recommendations.card1.effort"),
      impact: "high",
      timeframe: t("recommendations.card1.timeframe"),
      confidence: t("recommendations.card1.confidence"),
      actions: [
        t("recommendations.card1.actions.item1"),
        t("recommendations.card1.actions.item2"),
        t("recommendations.card1.actions.item3"),
      ],
      metrics: {
        trafficPotential: t("recommendations.card1.metrics.trafficPotential"),
        difficulty: t("recommendations.card1.metrics.difficulty"),
        competition: t("recommendations.card1.metrics.competition"),
      },
    },
    {
      id: 2,
      title: t("recommendations.card2.title"),
      description: t("recommendations.card2.description"),
      category: "content",
      priority: t("recommendations.card2.priority"),
      effort: t("recommendations.card2.effort"),
      impact: "high",
      timeframe: t("recommendations.card2.timeframe"),
      confidence: t("recommendations.card2.confidence"),
      actions: [
        t("recommendations.card2.actions.item1"),
        t("recommendations.card2.actions.item2"),
        t("recommendations.card2.actions.item3"),
      ],
      metrics: {
        trafficPotential: t("recommendations.card2.metrics.trafficPotential"),
        difficulty: t("recommendations.card2.metrics.difficulty"),
        competition: t("recommendations.card2.metrics.competition"),
      },
    },
    {
      id: 3,
      title: t("recommendations.card3.title"),
      description: t("recommendations.card3.description"),
      category: "technical",
      priority: t("recommendations.card3.priority"),
      effort: t("recommendations.card3.effort"),
      impact: "medium",
      timeframe: t("recommendations.card3.timeframe"),
      confidence: t("recommendations.card3.confidence"),
      actions: [
        t("recommendations.card3.actions.item1"),
        t("recommendations.card3.actions.item2"),
        t("recommendations.card3.actions.item3"),
      ],
      metrics: {
        trafficPotential: t("recommendations.card3.metrics.trafficPotential"),
        difficulty: t("recommendations.card3.metrics.difficulty"),
        competition: t("recommendations.card3.metrics.competition"),
      },
    },
    {
      id: 4,
      title: t("recommendations.card4.title"),
      description: t("recommendations.card4.description"),
      category: "backlinks",
      priority: t("recommendations.card4.priority"),
      effort: t("recommendations.card4.effort"),
      impact: "medium",
      timeframe: t("recommendations.card4.timeframe"),
      confidence: t("recommendations.card4.confidence"),
      actions: [
        t("recommendations.card4.actions.item1"),
        t("recommendations.card4.actions.item2"),
        t("recommendations.card4.actions.item3"),
      ],
      metrics: {
        trafficPotential: t("recommendations.card4.metrics.trafficPotential"),
        difficulty: t("recommendations.card4.metrics.difficulty"),
        competition: t("recommendations.card4.metrics.competition"),
      },
    },
    {
      id: 5,
      title: t("recommendations.card5.title"),
      description: t("recommendations.card5.description"),
      category: "keywords",
      priority: t("recommendations.card5.priority"),
      effort: t("recommendations.card5.effort"),
      impact: "low",
      timeframe: t("recommendations.card5.timeframe"),
      confidence: t("recommendations.card5.confidence"),
      actions: [
        t("recommendations.card5.actions.item1"),
        t("recommendations.card5.actions.item2"),
        t("recommendations.card5.actions.item3"),
      ],
      metrics: {
        trafficPotential: t("recommendations.card5.metrics.trafficPotential"),
        difficulty: t("recommendations.card5.metrics.difficulty"),
        competition: t("recommendations.card5.metrics.competition"),
      },
    },
  ];

  const filteredRecommendations = recommendations.filter((rec) => {
    const priorityMatch = selectedPriority === "all" || rec.priority === selectedPriority;
    const categoryMatch = selectedCategory === "all" || rec.category === selectedCategory;
    return priorityMatch && categoryMatch;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "medium":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "low":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-muted-foreground";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "content":
        return <FileText className="w-4 h-4" />;
      case "keywords":
        return <Search className="w-4 h-4" />;
      case "technical":
        return <BarChart3 className="w-4 h-4" />;
      case "backlinks":
        return <Link className="w-4 h-4" />;
      default:
        return <Lightbulb className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{t("title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-between items-center mb-8 p-6 bg-card rounded-xl border"
        >
          <div className="flex flex-wrap gap-4">
            <div className="flex space-x-1 bg-muted rounded-lg p-1">
              {priorities.map((priority) => (
                <button
                  key={priority.id}
                  onClick={() => setSelectedPriority(priority.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    selectedPriority === priority.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {priority.label} ({priority.count})
                </button>
              ))}
            </div>

            <label htmlFor="strategy-category-selector" className="sr-only">
              Select strategy category
            </label>
            <select
              id="strategy-category-selector"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Select strategy category"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            {t("filters.createActionPlan")}
          </Button>
        </motion.div>

        {/* Impact Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="bg-card p-6 rounded-xl border hover:shadow-lg transition-shadow"
            >
              <div className="text-2xl font-bold text-foreground mb-1">
                {metric.value}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  {metric.unit}
                </span>
              </div>
              <div className="text-sm font-medium text-foreground mb-2">{metric.label}</div>
              <div className="text-xs text-muted-foreground">{metric.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recommendations List */}
        <div className="space-y-6">
          {filteredRecommendations.map((recommendation, index) => (
            <motion.div
              key={recommendation.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      {getCategoryIcon(recommendation.category)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {recommendation.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{recommendation.description}</p>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="text-muted-foreground">{t("labels.priority")}:</span>
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(recommendation.priority)}`}
                          >
                            {recommendation.priority}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-muted-foreground">{t("labels.effort")}:</span>
                          <span
                            className={`font-medium capitalize ${getEffortColor(recommendation.effort)}`}
                          >
                            {recommendation.effort}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-muted-foreground">{t("labels.timeframe")}:</span>
                          <span className="font-medium text-foreground">
                            {recommendation.timeframe}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-muted-foreground">{t("labels.confidence")}:</span>
                          <span className="font-medium text-foreground">
                            {recommendation.confidence}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {recommendation.metrics.trafficPotential}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t("labels.monthlyVisitors")}
                    </div>
                  </div>
                </div>

                {/* Action Items */}
                <div className="bg-muted/50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-foreground mb-3 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    {t("recommendations.card1.actions.title")}
                  </h4>
                  <div className="space-y-2">
                    {recommendation.actions.map((action, actionIndex) => (
                      <div key={actionIndex} className="flex items-center space-x-3 text-sm">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span className="text-muted-foreground">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm font-medium text-foreground">
                      {recommendation.metrics.trafficPotential}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t("labels.trafficPotential")}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm font-medium text-foreground">
                      {recommendation.metrics.difficulty}
                    </div>
                    <div className="text-xs text-muted-foreground">{t("labels.difficulty")}</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm font-medium text-foreground">
                      {recommendation.metrics.competition}
                    </div>
                    <div className="text-xs text-muted-foreground">{t("labels.competition")}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Star className="w-4 h-4" />
                    <span>
                      {t("labels.impactScore")}: {recommendation.impact}/High
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      {t("labels.viewDetails")}
                    </Button>
                    <Button size="sm">
                      <Play className="w-3 h-3 mr-1" />
                      {t("labels.startImplementation")}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Strategy Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 bg-card border rounded-xl p-8"
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-foreground mb-4">{t("cta.title")}</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">{t("cta.description")}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg">
                <Zap className="w-4 h-4 mr-2" />
                {t("cta.generatePlan")}
              </Button>
              <Button variant="outline" size="lg">
                <Calendar className="w-4 h-4 mr-2" />
                {t("cta.scheduleImplementation")}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
