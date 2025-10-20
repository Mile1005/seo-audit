"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { 
  TrendingUp, 
  Target, 
  Search, 
  BarChart3, 
  Eye, 
  Lightbulb,
  Users,
  Trophy,
  ArrowRight,
  Play,
  Zap
} from "lucide-react";
import { MainLayout } from "../../../components/layout/main-layout";
import { Breadcrumbs } from "../../../components/navigation/breadcrumbs";
import SerpComparison from "../../../components/features/competitor-analysis/serp-comparison";
import GapAnalysis from "../../../components/features/competitor-analysis/gap-analysis";
import MonitoringDashboard from "../../../components/features/competitor-analysis/monitoring-dashboard";
import StrategyRecommendations from "../../../components/features/competitor-analysis/strategy-recommendations";
import { StructuredData, generateFeatureSchema, generateFAQSchema } from "../../../components/seo/StructuredData";

export default function CompetitorAnalysisPage() {
  const [selectedCompetitor, setSelectedCompetitor] = useState("competitor1");

  const featureSchema = generateFeatureSchema({
    name: "Competitor Analysis Tool",
    description: "Advanced competitor analysis platform that tracks competitor rankings, identifies content gaps, analyzes backlink profiles, and provides strategic insights to outrank your competition.",
    url: "https://www.aiseoturbo.com/features/competitor-analysis",
    features: [
      "Competitor Keyword Tracking",
      "SERP Position Monitoring",
      "Content Gap Analysis",
      "Backlink Comparison",
      "Traffic Estimation",
      "Ranking History Tracking",
      "Competitive Intelligence Reports",
      "Market Share Analysis",
      "Top Pages Discovery",
      "Strategic Recommendations"
    ],
    category: "Competitive Analysis"
  });

  const faqSchema = generateFAQSchema([
    {
      question: "How many competitors can I track?",
      answer: "You can track up to 3 competitors on the Professional plan and unlimited competitors on the Enterprise plan. The Starter plan allows tracking 1 competitor."
    },
    {
      question: "How often is competitor data updated?",
      answer: "Competitor rankings and metrics are updated daily for Professional users and weekly for Starter users. Enterprise customers get real-time updates."
    },
    {
      question: "Can I analyze competitors in different countries?",
      answer: "Yes! Our tool supports competitor analysis across 190+ countries and regions, allowing you to track local and international competition."
    },
    {
      question: "What insights does the competitor analysis provide?",
      answer: "You'll see keyword rankings, content gaps, backlink profiles, top-performing pages, estimated traffic, ranking trends, and actionable recommendations to outrank competitors."
    },
    {
      question: "Do I need to know who my competitors are?",
      answer: "Not necessarily! Our AI can automatically identify your top SEO competitors based on keyword overlap and market positioning."
    }
  ]);

  const keyMetrics = [
    {
      icon: Target,
      title: "SERP Tracking",
      description: "Monitor 1,000+ keywords",
      value: "1,000+",
      change: "+15%"
    },
    {
      icon: TrendingUp,
      title: "Rank Improvements",
      description: "Average position gain",
      value: "+12",
      change: "+23%"
    },
    {
      icon: Eye,
      title: "Visibility Score",
      description: "Search visibility increase",
      value: "89%",
      change: "+8%"
    },
    {
      icon: Lightbulb,
      title: "Opportunities",
      description: "Gap analysis findings",
      value: "247",
      change: "+31%"
    }
  ];

  const competitorData = [
    { name: "competitor1.com", rank: 1, visibility: 94, keywords: 1247, trend: "up" },
    { name: "competitor2.com", rank: 2, visibility: 87, keywords: 1134, trend: "down" },
    { name: "competitor3.com", rank: 3, visibility: 83, keywords: 998, trend: "up" },
    { name: "yoursite.com", rank: 4, visibility: 76, keywords: 892, trend: "up" }
  ];

  return (
    <MainLayout>
      <StructuredData data={featureSchema} />
      <StructuredData data={faqSchema} />
      <div className="min-h-screen bg-background overflow-x-hidden">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumbs
            items={[
              { name: 'Features', url: 'https://www.aiseoturbo.com/features' },
              { name: 'Competitor Analysis', url: 'https://www.aiseoturbo.com/features/competitor-analysis' }
            ]}
            className="mb-4"
          />
        </div>

        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
                ease: "easeInOut"
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
                delay: 5
              }}
              className="absolute bottom-20 right-10 w-60 h-60 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center lg:text-left"
              >
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                >
                  Outsmart Your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    Competition
                  </span>{" "}
                  with Data
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
                >
                  SERP analysis, gap identification, and strategic recommendations 
                  to dominate your market. Track competitor rankings and discover opportunities.
                </motion.p>

                {/* Key Metrics Pills */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
                >
                  {keyMetrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                      <motion.div
                        key={metric.title}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        className="text-center p-4 rounded-lg bg-card border hover:shadow-md transition-shadow"
                      >
                        <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                        <div className="text-lg font-bold text-foreground mb-1">
                          {metric.value}
                        </div>
                        <div className="text-xs text-muted-foreground/80 mb-1">
                          {metric.title}
                        </div>
                        <div className="text-xs text-green-400 font-medium bg-green-950/20 px-2 py-1 rounded">
                          {metric.change}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <Button size="lg" className="text-lg px-8 py-6">
                    <Target className="w-5 h-5 mr-2" />
                    Analyze Competitors
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                    <Play className="w-5 h-5 mr-2" />
                    View Demo
                  </Button>
                </motion.div>
              </motion.div>

              {/* Right Side - SERP Ranking Comparison */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="relative bg-card rounded-2xl p-8 border shadow-lg">
                  <div className="text-center mb-6">
                    <h2 className="text-lg font-semibold text-foreground mb-2">
                      <BarChart3 className="w-5 h-5 inline mr-2" />
                      Live SERP Rankings
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Real-time competitor position tracking
                    </p>
                  </div>
                  
                  {/* Competitor Rankings */}
                  <div className="space-y-4">
                    {competitorData.map((competitor, index) => (
                      <motion.div
                        key={competitor.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                          competitor.name === "yoursite.com" 
                            ? "bg-card border-primary/20 ring-1 ring-primary/20" 
                            : "bg-card hover:shadow-sm"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            index === 0 ? "bg-yellow-500 text-white" :
                            index === 1 ? "bg-gray-400 text-white" :
                            index === 2 ? "bg-orange-500 text-white" :
                            "bg-blue-500 text-white"
                          }`}>
                            #{competitor.rank}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{competitor.name}</div>
                            <div className="text-xs text-muted-foreground/80">
                              {competitor.keywords} keywords
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-foreground">{competitor.visibility}%</div>
                          <div className={`text-xs flex items-center ${
                            competitor.trend === "up" ? "text-green-600" : "text-red-600"
                          }`}>
                            <TrendingUp className={`w-3 h-3 mr-1 ${competitor.trend === "down" ? "rotate-180" : ""}`} />
                            {competitor.trend === "up" ? "+2.3%" : "-1.7%"}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Summary Stats */}
                  <div className="mt-6 pt-4 border-t grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">247</div>
                      <div className="text-xs text-muted-foreground/80">Opportunities Found</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">+12</div>
                      <div className="text-xs text-muted-foreground/80">Avg. Rank Improvement</div>
                    </div>
                  </div>
                </div>

                {/* Floating Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                >
                  <Zap className="w-4 h-4 inline mr-1" />
                  Live Updates
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Feature Sections */}
        <GapAnalysis />
        <SerpComparison />
        <MonitoringDashboard />
        <StrategyRecommendations />

        {/* Success Stories Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-background to-background border-t">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl lg:text-4xl font-bold text-white mb-6"
            >
              <Trophy className="w-8 h-8 inline mr-3 text-yellow-500" />
              Success Stories
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-muted-foreground mb-8"
            >
              See how businesses outranked their competition and increased organic traffic by 300%+
            </motion.p>

            {/* Customer Success Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid md:grid-cols-3 gap-8 mb-12"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">300%</div>
                <div className="text-muted-foreground">Traffic Increase</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">15</div>
                <div className="text-muted-foreground">Avg. Rank Improvement</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">89%</div>
                <div className="text-muted-foreground">Customer Success Rate</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/login">
                  <Users className="w-5 h-5 mr-2" />
                  Start Your Success Story
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
