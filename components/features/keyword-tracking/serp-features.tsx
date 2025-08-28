"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Image, 
  Video,
  Star,
  ShoppingCart,
  MessageSquare,
  BookOpen,
  Calendar,
  Users,
  TrendingUp,
  Eye,
  BarChart3,
  Target
} from "lucide-react";
import { Button } from "../../ui/button";

export default function SerpFeatures() {
  const [selectedFeature, setSelectedFeature] = useState("featured-snippets");

  const serpFeatures = [
    {
      id: "featured-snippets",
      name: "Featured Snippets",
      icon: BookOpen,
      description: "Position zero results that answer user queries directly",
      color: "blue",
      examples: ["Paragraph snippets", "List snippets", "Table snippets", "Video snippets"]
    },
    {
      id: "local-pack",
      name: "Local Pack",
      icon: MapPin,
      description: "Local business listings with map integration",
      color: "green",
      examples: ["3-pack results", "Local finder", "Maps integration", "Review stars"]
    },
    {
      id: "people-also-ask",
      name: "People Also Ask",
      icon: MessageSquare,
      description: "Related questions that expand search results",
      color: "purple",
      examples: ["Expandable questions", "Related queries", "Answer boxes", "Topic clusters"]
    },
    {
      id: "image-pack",
      name: "Image Pack",
      icon: Image,
      description: "Visual search results for image-based queries",
      color: "orange",
      examples: ["Image carousels", "Visual results", "Shopping images", "News images"]
    },
    {
      id: "video-results",
      name: "Video Results",
      icon: Video,
      description: "Video content prominently displayed in search",
      color: "red",
      examples: ["YouTube integration", "Video thumbnails", "Duration stamps", "Video carousels"]
    },
    {
      id: "shopping-results",
      name: "Shopping Results",
      icon: ShoppingCart,
      description: "Product listings with prices and merchant info",
      color: "yellow",
      examples: ["Product listings", "Price comparisons", "Merchant ratings", "Product images"]
    }
  ];

  const featureData = {
    "featured-snippets": {
      visibility: "78%",
      clickthrough: "35%",
      opportunity: "High",
      description: "Featured snippets appear in 78% of informational queries and capture 35% of clicks when present.",
      optimization: [
        "Structure content with clear headings and lists",
        "Answer questions directly in the first paragraph",
        "Use schema markup for FAQ and How-to content",
        "Optimize for question-based keywords",
        "Include step-by-step instructions where relevant"
      ],
      tracking: [
        "Monitor position zero rankings",
        "Track snippet format changes",
        "Identify snippet opportunities",
        "Measure click-through impact"
      ]
    },
    "local-pack": {
      visibility: "65%",
      clickthrough: "44%",
      opportunity: "Critical",
      description: "Local pack results dominate location-based searches with high click-through rates.",
      optimization: [
        "Optimize Google Business Profile completely",
        "Maintain consistent NAP across all platforms",
        "Collect and respond to customer reviews",
        "Use local keywords in title tags and content",
        "Build local citations and directories"
      ],
      tracking: [
        "Monitor local pack rankings",
        "Track review scores and counts",
        "Measure local visibility changes",
        "Analyze competitor local presence"
      ]
    },
    "people-also-ask": {
      visibility: "42%",
      clickthrough: "23%",
      opportunity: "Medium",
      description: "PAA boxes expand search results and provide additional visibility opportunities.",
      optimization: [
        "Create comprehensive FAQ sections",
        "Target related question keywords",
        "Structure answers for featured snippets",
        "Build topical authority with in-depth content",
        "Use natural language and conversational tone"
      ],
      tracking: [
        "Monitor PAA appearances",
        "Track question variations",
        "Identify content gaps",
        "Measure expansion rates"
      ]
    }
  };

  const currentFeatureData = featureData[selectedFeature as keyof typeof featureData];

  const getFeatureColor = (color: string) => {
    switch (color) {
      case "blue": return "from-blue-600 to-blue-700";
      case "green": return "from-green-600 to-green-700";
      case "purple": return "from-purple-600 to-purple-700";
      case "orange": return "from-orange-600 to-orange-700";
      case "red": return "from-red-600 to-red-700";
      case "yellow": return "from-yellow-600 to-yellow-700";
      default: return "from-gray-600 to-gray-700";
    }
  };

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case "Critical": return "text-red-600 bg-red-100 dark:bg-red-900/30";
      case "High": return "text-orange-600 bg-orange-100 dark:bg-orange-900/30";
      case "Medium": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30";
      case "Low": return "text-green-600 bg-green-100 dark:bg-green-900/30";
      default: return "text-muted-foreground bg-muted";
    }
  };

  const serpMetrics = [
    { label: "SERP Features Tracked", value: "15+", description: "Comprehensive coverage" },
    { label: "Average Visibility Lift", value: "+156%", description: "When optimizing for features" },
    { label: "Click Share Increase", value: "+67%", description: "From feature optimization" },
    { label: "Opportunity Detection", value: "Real-time", description: "Instant feature alerts" }
  ];

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
            SERP Features Monitoring
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Track your presence in featured snippets, local packs, image results, and other 
            SERP features that drive high-value traffic and visibility.
          </p>
        </motion.div>

        {/* SERP Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          {serpFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = selectedFeature === feature.id;
            
            return (
              <motion.button
                key={feature.id}
                onClick={() => setSelectedFeature(feature.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                  isActive 
                    ? `border-${feature.color}-500 bg-gradient-to-br ${getFeatureColor(feature.color)} text-white shadow-lg`
                    : "border-border bg-card hover:border-primary/50 hover:shadow-md"
                }`}
              >
                <Icon className={`w-8 h-8 mx-auto mb-2 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                <h3 className={`font-semibold text-sm mb-1 ${isActive ? "text-white" : "text-foreground"}`}>
                  {feature.name}
                </h3>
                <p className={`text-xs ${isActive ? "text-white/80" : "text-muted-foreground"}`}>
                  {feature.description}
                </p>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Feature Details */}
        {currentFeatureData && (
          <motion.div
            key={selectedFeature}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-card rounded-xl border p-8 mb-12"
          >
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Stats */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="text-muted-foreground">Visibility Rate</span>
                    <span className="font-bold text-primary">{currentFeatureData.visibility}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="text-muted-foreground">Click-Through Rate</span>
                    <span className="font-bold text-primary">{currentFeatureData.clickthrough}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <span className="text-muted-foreground">Opportunity Level</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getOpportunityColor(currentFeatureData.opportunity)}`}>
                      {currentFeatureData.opportunity}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mt-4">
                  {currentFeatureData.description}
                </p>
              </div>

              {/* Optimization */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Optimization Strategy</h3>
                <ul className="space-y-2">
                  {currentFeatureData.optimization.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Target className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tracking */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">What We Track</h3>
                <ul className="space-y-2">
                  {currentFeatureData.tracking.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Eye className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* SERP Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {serpMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 bg-card rounded-xl border hover:shadow-lg transition-shadow"
            >
              <div className="text-2xl font-bold text-primary mb-2">{metric.value}</div>
              <div className="text-sm font-medium text-foreground mb-1">{metric.label}</div>
              <div className="text-xs text-muted-foreground">{metric.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Visual Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-xl border p-8"
        >
          <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
            SERP Features in Action
          </h3>
          
          <div className="bg-muted/30 rounded-lg p-6 space-y-4">
            {/* Featured Snippet Example */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
              <div className="flex items-center space-x-2 mb-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-muted-foreground">Featured Snippet</span>
              </div>
              <h4 className="font-medium text-foreground mb-2">What is SEO audit?</h4>
              <p className="text-sm text-muted-foreground mb-2">
                An SEO audit is a comprehensive analysis of your website's search engine optimization performance...
              </p>
              <div className="text-xs text-blue-600">aiseoturbo.com › features › seo-audit</div>
            </div>

            {/* Local Pack Example */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-4 h-4 text-green-600" />
                <span className="text-xs text-muted-foreground">Local Pack</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-8 bg-muted rounded mb-1"></div>
                  <div className="text-xs font-medium">SEO Agency</div>
                  <div className="flex items-center justify-center text-xs text-yellow-500">
                    <Star className="w-3 h-3 mr-1" />
                    4.9 (127)
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-8 bg-muted rounded mb-1"></div>
                  <div className="text-xs font-medium">Digital Marketing</div>
                  <div className="flex items-center justify-center text-xs text-yellow-500">
                    <Star className="w-3 h-3 mr-1" />
                    4.7 (89)
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-8 bg-muted rounded mb-1"></div>
                  <div className="text-xs font-medium">SEO Consultant</div>
                  <div className="flex items-center justify-center text-xs text-yellow-500">
                    <Star className="w-3 h-3 mr-1" />
                    4.8 (156)
                  </div>
                </div>
              </div>
            </div>

            {/* People Also Ask Example */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
              <div className="flex items-center space-x-2 mb-2">
                <MessageSquare className="w-4 h-4 text-purple-600" />
                <span className="text-xs text-muted-foreground">People Also Ask</span>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-foreground">▶ How often should you do an SEO audit?</div>
                <div className="text-sm text-foreground">▶ What tools are best for SEO audits?</div>
                <div className="text-sm text-foreground">▶ How much does an SEO audit cost?</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Maximize Your SERP Features Presence
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Start tracking SERP features today and identify opportunities to capture 
              more visibility and traffic from search results.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <BarChart3 className="w-5 h-5 mr-2" />
                Start SERP Tracking
              </Button>
              <Button variant="outline" size="lg">
                <TrendingUp className="w-5 h-5 mr-2" />
                View Opportunities
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
