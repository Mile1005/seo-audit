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
  Play
} from "lucide-react";
import { Button } from "../../ui/button";

export default function StrategyRecommendations() {
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const priorities = [
    { id: "all", label: "All Recommendations", count: 24 },
    { id: "high", label: "High Priority", count: 8 },
    { id: "medium", label: "Medium Priority", count: 12 },
    { id: "low", label: "Low Priority", count: 4 }
  ];

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "content", label: "Content Strategy" },
    { id: "keywords", label: "Keyword Targeting" },
    { id: "technical", label: "Technical SEO" },
    { id: "backlinks", label: "Link Building" }
  ];

  const impactMetrics = [
    { 
      label: "Potential Traffic Gain", 
      value: "125K", 
      unit: "visitors/month",
      description: "Estimated organic traffic increase"
    },
    { 
      label: "Revenue Opportunity", 
      value: "$45K", 
      unit: "monthly",
      description: "Potential revenue from traffic gains"
    },
    { 
      label: "Implementation Time", 
      value: "3-6", 
      unit: "months",
      description: "Average time to see results"
    },
    { 
      label: "Success Probability", 
      value: "78%", 
      unit: "confidence",
      description: "Based on competitor analysis"
    }
  ];

  const recommendations = [
    {
      id: 1,
      title: "Target High-Volume Keyword Gaps",
      description: "Focus on 15 high-volume keywords where competitors rank but you don't, with estimated 45K monthly traffic potential.",
      category: "keywords",
      priority: "high",
      effort: "medium",
      impact: "high",
      timeframe: "3-4 months",
      confidence: 85,
      actions: [
        "Create comprehensive content for 'free seo audit tool'",
        "Optimize existing pages for 'website seo checker'",
        "Build topical authority around 'seo analysis'"
      ],
      metrics: {
        trafficPotential: "45K",
        difficulty: "Medium",
        competition: "High"
      }
    },
    {
      id: 2,
      title: "Content Gap Strategy",
      description: "Develop content around 8 key topics where competitors have strong content but you have minimal coverage.",
      category: "content",
      priority: "high",
      effort: "high",
      impact: "high",
      timeframe: "4-6 months",
      confidence: 82,
      actions: [
        "Create 'Complete Technical SEO Guide'",
        "Develop interactive SEO audit checklist",
        "Build comparison content vs competitors"
      ],
      metrics: {
        trafficPotential: "32K",
        difficulty: "Medium",
        competition: "Medium"
      }
    },
    {
      id: 3,
      title: "Technical SEO Improvements",
      description: "Address technical gaps that competitors have already optimized, improving site performance and crawlability.",
      category: "technical",
      priority: "medium",
      effort: "medium",
      impact: "medium",
      timeframe: "1-2 months",
      confidence: 90,
      actions: [
        "Implement structured data markup",
        "Optimize Core Web Vitals scores",
        "Improve internal linking structure"
      ],
      metrics: {
        trafficPotential: "15K",
        difficulty: "Low",
        competition: "Low"
      }
    },
    {
      id: 4,
      title: "Strategic Link Building",
      description: "Target high-authority domains that link to competitors but not to you, focusing on industry-relevant sites.",
      category: "backlinks",
      priority: "medium",
      effort: "high",
      impact: "medium",
      timeframe: "2-4 months",
      confidence: 75,
      actions: [
        "Outreach to industry publications",
        "Create linkable assets and tools",
        "Guest posting on authoritative sites"
      ],
      metrics: {
        trafficPotential: "18K",
        difficulty: "High",
        competition: "High"
      }
    },
    {
      id: 5,
      title: "Local SEO Optimization",
      description: "Capitalize on local search opportunities where competitors have strong presence but you're underrepresented.",
      category: "keywords",
      priority: "low",
      effort: "low",
      impact: "low",
      timeframe: "1-3 months",
      confidence: 70,
      actions: [
        "Optimize Google Business Profile",
        "Target location-based keywords",
        "Build local citations"
      ],
      metrics: {
        trafficPotential: "8K",
        difficulty: "Low",
        competition: "Medium"
      }
    }
  ];

  const filteredRecommendations = recommendations.filter(rec => {
    const priorityMatch = selectedPriority === "all" || rec.priority === selectedPriority;
    const categoryMatch = selectedCategory === "all" || rec.category === selectedCategory;
    return priorityMatch && categoryMatch;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400";
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "low": return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case "high": return "text-red-600";
      case "medium": return "text-yellow-600";
      case "low": return "text-green-600";
      default: return "text-muted-foreground";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "content": return <FileText className="w-4 h-4" />;
      case "keywords": return <Search className="w-4 h-4" />;
      case "technical": return <BarChart3 className="w-4 h-4" />;
      case "backlinks": return <Link className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
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
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            AI-Powered Strategy Recommendations
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get data-driven action plans to outrank competitors based on comprehensive analysis and proven strategies
          </p>
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
              {priorities.map(priority => (
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
            
            <label htmlFor="strategy-category-selector" className="sr-only">Select strategy category</label>
            <select 
              id="strategy-category-selector"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Select strategy category"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.label}</option>
              ))}
            </select>
          </div>

          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Create Action Plan
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
                      <p className="text-muted-foreground mb-4">
                        {recommendation.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="text-muted-foreground">Priority:</span>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(recommendation.priority)}`}>
                            {recommendation.priority}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-muted-foreground">Effort:</span>
                          <span className={`font-medium capitalize ${getEffortColor(recommendation.effort)}`}>
                            {recommendation.effort}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-muted-foreground">Timeframe:</span>
                          <span className="font-medium text-foreground">
                            {recommendation.timeframe}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-muted-foreground">Confidence:</span>
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
                      monthly visitors
                    </div>
                  </div>
                </div>

                {/* Action Items */}
                <div className="bg-muted/50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-foreground mb-3 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Action Items
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
                    <div className="text-xs text-muted-foreground">Traffic Potential</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm font-medium text-foreground">
                      {recommendation.metrics.difficulty}
                    </div>
                    <div className="text-xs text-muted-foreground">Difficulty</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm font-medium text-foreground">
                      {recommendation.metrics.competition}
                    </div>
                    <div className="text-xs text-muted-foreground">Competition</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Star className="w-4 h-4" />
                    <span>Impact Score: {recommendation.impact}/High</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button size="sm">
                      <Play className="w-3 h-3 mr-1" />
                      Start Implementation
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
          className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-purple-200 dark:border-purple-800"
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Ready to Execute Your Strategy?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our AI has analyzed 247 data points to create these personalized recommendations. 
              Start with high-priority items for maximum impact.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg">
                <Zap className="w-4 h-4 mr-2" />
                Generate Full Action Plan
              </Button>
              <Button variant="outline" size="lg">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Implementation
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
