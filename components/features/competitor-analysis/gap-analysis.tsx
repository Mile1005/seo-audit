"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Target, 
  TrendingUp, 
  Users, 
  Zap,
  ArrowRight,
  Search,
  Globe,
  BookOpen,
  ExternalLink,
  ChevronDown,
  Plus
} from "lucide-react";
import { Button } from "../../ui/button";

export default function GapAnalysis() {
  const [selectedCompetitor, setSelectedCompetitor] = useState("semrush.com");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const competitors = [
    "semrush.com",
    "ahrefs.com", 
    "screaming-frog.co.uk",
    "sitechecker.pro"
  ];

  const gapCategories = [
    { id: "all", label: "All Gaps", count: 247 },
    { id: "keywords", label: "Keyword Gaps", count: 156 },
    { id: "content", label: "Content Gaps", count: 43 },
    { id: "backlinks", label: "Backlink Gaps", count: 32 },
    { id: "technical", label: "Technical Gaps", count: 16 }
  ];

  const keywordGaps = [
    {
      keyword: "free seo audit tool",
      competitorRank: 3,
      yourRank: null,
      volume: 18000,
      difficulty: 45,
      opportunity: "high",
      intent: "commercial"
    },
    {
      keyword: "website seo checker",
      competitorRank: 1,
      yourRank: 12,
      volume: 14500,
      difficulty: 52,
      opportunity: "medium",
      intent: "commercial"
    },
    {
      keyword: "seo analysis tool",
      competitorRank: 2,
      yourRank: null,
      volume: 9800,
      difficulty: 48,
      opportunity: "high",
      intent: "commercial"
    },
    {
      keyword: "technical seo audit",
      competitorRank: 4,
      yourRank: 8,
      volume: 7200,
      difficulty: 61,
      opportunity: "medium",
      intent: "informational"
    },
    {
      keyword: "seo crawl tool",
      competitorRank: 2,
      yourRank: null,
      volume: 5400,
      difficulty: 43,
      opportunity: "high",
      intent: "commercial"
    }
  ];

  const contentGaps = [
    {
      topic: "How to perform technical SEO audit",
      competitorPages: 3,
      yourPages: 0,
      traffic: 15000,
      opportunity: "Create comprehensive guide"
    },
    {
      topic: "SEO audit checklist",
      competitorPages: 5,
      yourPages: 1,
      traffic: 12000,
      opportunity: "Expand existing content"
    },
    {
      topic: "Common SEO mistakes",
      competitorPages: 2,
      yourPages: 0,
      traffic: 8500,
      opportunity: "Create expert analysis"
    }
  ];

  const opportunityMetrics = [
    { label: "Total Traffic Gap", value: "245K", description: "Monthly organic traffic your competitors get that you don't" },
    { label: "Keyword Opportunities", value: "156", description: "Keywords your competitors rank for but you don't" },
    { label: "Content Gaps", value: "43", description: "Topic areas where competitors have content advantages" },
    { label: "Potential Revenue", value: "$18K", description: "Estimated monthly revenue from closing gaps" }
  ];

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case "high": return "text-green-400 bg-green-500/10";
      case "medium": return "text-yellow-400 bg-yellow-500/10";
      case "low": return "text-red-400 bg-red-500/10";
      default: return "text-muted-foreground bg-muted";
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
            Competitive Gap Analysis
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover untapped opportunities by analyzing what your competitors are doing that you're not
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-between items-center mb-8 p-6 bg-card rounded-xl border"
        >
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <label htmlFor="competitor-selector" className="sr-only">Select competitor to analyze</label>
              <select 
                id="competitor-selector"
                value={selectedCompetitor}
                onChange={(e) => setSelectedCompetitor(e.target.value)}
                className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Select competitor to analyze"
              >
                {competitors.map(competitor => (
                  <option key={competitor} value={competitor}>{competitor}</option>
                ))}
              </select>
            </div>
            
            <div className="flex space-x-1 bg-muted rounded-lg p-1">
              {gapCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </div>

          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Competitor
          </Button>
        </motion.div>

        {/* Opportunity Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {opportunityMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="bg-card p-6 rounded-xl border hover:shadow-lg transition-shadow"
            >
              <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
              <div className="text-sm font-medium text-foreground mb-2">{metric.label}</div>
              <div className="text-xs text-muted-foreground">{metric.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Gap Analysis Results */}
        <div className="space-y-8">
          {/* Keyword Gaps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-card rounded-xl border overflow-hidden"
          >
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Search className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Keyword Gaps</h3>
                    <p className="text-sm text-muted-foreground">
                      Keywords {selectedCompetitor} ranks for that you don't
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Export Keywords
                </Button>
              </div>
            </div>

            <div 
              className="overflow-x-auto" 
              tabIndex={0}
              role="region"
              aria-label="Keyword gap analysis table"
            >
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-foreground">Keyword</th>
                    <th className="text-center p-4 font-semibold text-foreground">Their Rank</th>
                    <th className="text-center p-4 font-semibold text-foreground">Your Rank</th>
                    <th className="text-center p-4 font-semibold text-foreground">Volume</th>
                    <th className="text-center p-4 font-semibold text-foreground">Difficulty</th>
                    <th className="text-center p-4 font-semibold text-foreground">Opportunity</th>
                    <th className="text-center p-4 font-semibold text-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {keywordGaps.map((gap, index) => (
                    <motion.tr
                      key={gap.keyword}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                      className="border-b hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="font-medium text-foreground">{gap.keyword}</div>
                        <div className="text-xs text-muted-foreground capitalize">{gap.intent}</div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mx-auto">
                          {gap.competitorRank}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        {gap.yourRank ? (
                          <div className="w-6 h-6 bg-muted text-foreground rounded-full flex items-center justify-center text-xs font-bold mx-auto">
                            {gap.yourRank}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">Not ranking</span>
                        )}
                      </td>
                      <td className="p-4 text-center text-muted-foreground">
                        {gap.volume.toLocaleString()}
                      </td>
                      <td className="p-4 text-center">
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          gap.difficulty < 30 ? "bg-green-500/10 text-green-400" :
                          gap.difficulty < 60 ? "bg-yellow-500/10 text-yellow-400" :
                          "bg-red-500/10 text-red-400"
                        }`}>
                          {gap.difficulty}%
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className={`text-xs px-2 py-1 rounded-full capitalize ${getOpportunityColor(gap.opportunity)}`}>
                          {gap.opportunity}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <Button variant="ghost" size="sm">
                          <Target className="w-3 h-3 mr-1" />
                          Target
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Content Gaps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-card rounded-xl border overflow-hidden"
          >
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Content Gaps</h3>
                    <p className="text-sm text-muted-foreground">
                      Topic areas where competitors have content advantages
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Content Strategy
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {contentGaps.map((gap, index) => (
                <motion.div
                  key={gap.topic}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">{gap.topic}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{gap.opportunity}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Their pages: {gap.competitorPages}</span>
                      <span>Your pages: {gap.yourPages}</span>
                      <span>Traffic potential: {gap.traffic.toLocaleString()}/mo</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Analyze
                    </Button>
                    <Button size="sm">
                      <Plus className="w-3 h-3 mr-1" />
                      Create
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Action Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-12 bg-card border rounded-xl p-8"
        >
          <div className="text-center">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Ready to Close These Gaps?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We've identified 247 opportunities to outrank your competitors. Let our AI create a 
              personalized action plan to capture this missed traffic.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg">
                <Zap className="w-4 h-4 mr-2" />
                Generate Action Plan
              </Button>
              <Button variant="outline" size="lg">
                <Target className="w-4 h-4 mr-2" />
                Prioritize Opportunities
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
