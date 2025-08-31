"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Clock,
  Link,
  Image,
  FileText,
  Code,
  Search,
  Zap,
  Shield
} from "lucide-react";

export default function IssueDetection() {
  const issueCategories = [
    {
      icon: XCircle,
      title: "Critical Issues",
      count: 12,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      issues: [
        "404 Error Pages",
        "Broken Internal Links", 
        "Missing Title Tags",
        "Duplicate Content"
      ]
    },
    {
      icon: AlertTriangle,
      title: "High Priority",
      count: 28,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      issues: [
        "Slow Loading Pages",
        "Missing Meta Descriptions",
        "Large Image Files",
        "Redirect Chains"
      ]
    },
    {
      icon: AlertCircle,
      title: "Medium Priority",
      count: 45,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
      issues: [
        "Missing Alt Text",
        "Long Page Titles",
        "External Link Issues",
        "Crawlability Problems"
      ]
    },
    {
      icon: CheckCircle,
      title: "Optimized",
      count: 156,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      issues: [
        "Proper Title Tags",
        "Optimized Images",
        "Fast Loading Pages",
        "Clean URL Structure"
      ]
    }
  ];

  const detectionFeatures = [
    {
      icon: Link,
      title: "Link Analysis",
      description: "Comprehensive link health monitoring",
      items: ["Broken internal links", "External link validation", "Redirect chain detection", "Orphaned pages"]
    },
    {
      icon: Zap,
      title: "Performance Issues",
      description: "Page speed and optimization problems",
      items: ["Core Web Vitals", "Large resource files", "Render-blocking resources", "Unused CSS/JS"]
    },
    {
      icon: Code,
      title: "Technical SEO",
      description: "Code-level SEO implementation issues",
      items: ["Missing meta tags", "Improper heading structure", "Schema markup errors", "Canonical issues"]
    },
    {
      icon: Image,
      title: "Content Optimization",
      description: "Content and media optimization opportunities",
      items: ["Image optimization", "Alt text missing", "Duplicate content", "Thin content pages"]
    },
    {
      icon: Search,
      title: "Crawlability",
      description: "Search engine accessibility problems",
      items: ["Robots.txt issues", "XML sitemap errors", "Noindex problems", "Crawl depth issues"]
    },
    {
      icon: Shield,
      title: "Security & Structure",
      description: "Website security and structural issues",
      items: ["HTTPS implementation", "Mixed content warnings", "URL structure problems", "Mobile usability"]
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
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
            What Gets Detected
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            50+ issue types automatically identified and categorized by priority level with actionable solutions
          </p>
        </motion.div>

        {/* Issue Categories Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {issueCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`${category.bgColor} ${category.borderColor} border rounded-xl p-6 hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-8 h-8 ${category.color}`} />
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", damping: 15, stiffness: 300, delay: 0.5 + index * 0.1 }}
                    className={`text-2xl font-bold ${category.color}`}
                  >
                    {category.count}
                  </motion.span>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {category.title}
                </h3>
                
                <ul className="space-y-1">
                  {category.issues.map((issue, issueIndex) => (
                    <motion.li
                      key={issue}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.7 + index * 0.1 + issueIndex * 0.05 }}
                      className="text-sm text-muted-foreground"
                    >
                       {issue}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Detection Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {detectionFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="bg-card rounded-xl p-6 border hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {feature.items.map((item, itemIndex) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.9 + index * 0.1 + itemIndex * 0.05 }}
                      className="flex items-center text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Sample Issue Report */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-card rounded-2xl p-8 border"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Sample Issue Report</h3>
            <p className="text-muted-foreground">Real-time issue identification with detailed context and solutions</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <XCircle className="w-5 h-5 text-red-500 mr-2" />
                Critical Issue Found
              </h4>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
                <div className="text-sm font-medium text-red-400 mb-2">
                  404 Error on Important Page
                </div>
                <div className="text-sm text-red-300 mb-3">
                  /products/featured-item  Returns 404 status
                </div>
                <div className="text-xs text-red-400">
                  Found on 12 pages  High traffic page  SEO impact: High
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                Suggested Solution
              </h4>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="text-sm font-medium text-green-400 mb-2">
                  Immediate Action Required
                </div>
                <ul className="text-sm text-green-300 space-y-1">
                  <li> Check if page should exist or redirect</li>
                  <li> Update internal links pointing to this URL</li>
                  <li> Consider 301 redirect if content moved</li>
                  <li> Remove links if page permanently deleted</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}