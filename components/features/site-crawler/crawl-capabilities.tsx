"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Globe, 
  Settings, 
  BarChart3, 
  Link, 
  Image, 
  FileText, 
  Shield 
} from "lucide-react";

export default function CrawlCapabilities() {
  const capabilities = [
    {
      icon: Globe,
      title: "Unlimited Page Crawling",
      description: "Crawl up to 10,000 pages per scan with intelligent discovery",
      features: ["Smart page discovery", "Custom crawl depth", "Robots.txt compliance"]
    },
    {
      icon: Settings,
      title: "Custom Crawl Rules",
      description: "Configure crawling behavior with advanced settings",
      features: ["URL pattern filtering", "Custom user agents", "Crawl delay controls"]
    },
    {
      icon: Link,
      title: "Broken Link Detection",
      description: "Find and map all broken internal and external links",
      features: ["404 error detection", "Redirect chain analysis", "Link relationship mapping"]
    },
    {
      icon: Zap,
      title: "Page Speed Analysis",
      description: "Measure loading performance across your entire site",
      features: ["Core Web Vitals", "Resource optimization", "Performance bottlenecks"]
    },
    {
      icon: FileText,
      title: "Duplicate Content ID",
      description: "Identify and resolve content duplication issues",
      features: ["Content similarity", "Canonical analysis", "Thin content detection"]
    },
    {
      icon: Image,
      title: "Image Optimization",
      description: "Discover image optimization opportunities site-wide",
      features: ["Missing alt text", "Oversized images", "Format recommendations"]
    }
  ];

  const stats = [
    { number: "10,000+", label: "Pages Per Crawl", color: "from-blue-500 to-cyan-600" },
    { number: "50+", label: "Issue Types", color: "from-green-500 to-emerald-600" },
    { number: "< 5min", label: "Average Crawl Time", color: "from-purple-500 to-pink-600" },
    { number: "99.9%", label: "Accuracy Rate", color: "from-orange-500 to-red-600" }
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
            Powerful Crawling Capabilities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced website analysis with intelligent crawling algorithms and comprehensive issue detection
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-card rounded-xl border hover:shadow-lg transition-all duration-300"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", damping: 15, stiffness: 300, delay: 0.5 + index * 0.1 }}
                className={`text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-2`}
              >
                {stat.number}
              </motion.div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Capabilities Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group bg-card rounded-xl p-6 border hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {capability.title}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    {capability.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {capability.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.7 + index * 0.1 + featureIndex * 0.05 }}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Technical Specs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Enterprise-Grade Infrastructure
              </h3>
              <p className="text-muted-foreground mb-6">
                Built for scale with distributed crawling, intelligent rate limiting, 
                and real-time progress tracking.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-sm">Respect robots.txt and crawl delays</span>
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-5 h-5 text-blue-500 mr-3" />
                  <span className="text-sm">Real-time crawl progress and analytics</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-5 h-5 text-yellow-500 mr-3" />
                  <span className="text-sm">Distributed crawling for maximum speed</span>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border">
              <h4 className="text-lg font-semibold text-foreground mb-4">Crawl Progress</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Pages Discovered</span>
                    <span className="text-foreground font-medium">2,847</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, delay: 1 }}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Issues Found</span>
                    <span className="text-foreground font-medium">127</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "32%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, delay: 1.2 }}
                      className="bg-gradient-to-r from-yellow-500 to-red-500 h-2 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}