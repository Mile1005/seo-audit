"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Globe, 
  Folder, 
  FileText, 
  Link, 
  BarChart3, 
  Map,
  Search,
  Eye,
  ArrowRight,
  TreePine
} from "lucide-react";

export default function SiteArchitecture() {
  const architectureFeatures = [
    {
      icon: TreePine,
      title: "Visual Site Mapping",
      description: "Interactive tree visualization of your website structure",
      benefits: ["Clear site hierarchy", "Navigation flow analysis", "Orphaned page detection"]
    },
    {
      icon: Map,
      title: "URL Structure Analysis",
      description: "Comprehensive analysis of URL patterns and organization",
      benefits: ["URL optimization tips", "Structure consistency", "SEO-friendly patterns"]
    },
    {
      icon: Link,
      title: "Internal Link Mapping",
      description: "Visualize internal linking patterns and authority flow",
      benefits: ["Link equity distribution", "Navigation improvements", "Content relationships"]
    },
    {
      icon: Search,
      title: "Crawl Path Optimization",
      description: "Identify the most efficient crawl paths for search engines",
      benefits: ["Crawl budget optimization", "Priority page identification", "Indexation improvements"]
    }
  ];

  const siteMetrics = [
    { label: "Total Pages", value: "2,847", change: "+12%", color: "text-blue-600" },
    { label: "Page Depth", value: "4.2 avg", change: "-8%", color: "text-green-600" },
    { label: "Internal Links", value: "18,492", change: "+24%", color: "text-purple-600" },
    { label: "Orphaned Pages", value: "23", change: "-31%", color: "text-orange-600" }
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
            Site Architecture Visualization
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Interactive site mapping with visual hierarchy analysis and crawl path optimization
          </p>
        </motion.div>

        {/* Site Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {siteMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-card rounded-xl p-6 border text-center hover:shadow-lg transition-shadow duration-300"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", damping: 15, stiffness: 300, delay: 0.5 + index * 0.1 }}
                className={`text-2xl font-bold ${metric.color} mb-1`}
              >
                {metric.value}
              </motion.div>
              <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
              <div className={`text-xs ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change} vs last month
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Architecture Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-16"
        >
          {/* Left: Features */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Interactive Site Mapping
            </h3>
            <div className="space-y-6">
              {architectureFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-start group"
                  >
                    <div className="p-3 bg-primary/10 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground mb-3">
                        {feature.description}
                      </p>
                      <ul className="space-y-1">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <motion.li
                            key={benefit}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.7 + index * 0.1 + benefitIndex * 0.05 }}
                            className="flex items-center text-sm text-muted-foreground"
                          >
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                            {benefit}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Site Tree Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-card rounded-2xl p-8 border"
          >
            <div className="text-center mb-6">
              <h4 className="text-lg font-semibold text-foreground mb-2">Live Site Structure</h4>
              <p className="text-sm text-muted-foreground">Real-time visualization of your website architecture</p>
            </div>

            {/* Site Tree Diagram */}
            <div className="space-y-4">
              {/* Root Level */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1 }}
                className="flex justify-center"
              >
                <div className="flex items-center bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-lg">
                  <Globe className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium">Homepage</span>
                </div>
              </motion.div>

              {/* Level 1 */}
              <div className="flex justify-center space-x-4">
                {['Products', 'About', 'Blog', 'Contact'].map((page, index) => (
                  <motion.div
                    key={page}
                    initial={{ scale: 0, y: -20 }}
                    whileInView={{ scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
                    <div className="flex items-center bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded text-xs">
                      <Folder className="w-3 h-3 text-green-600 mr-1" />
                      {page}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Level 2 */}
              <div className="grid grid-cols-4 gap-2">
                {[...Array(12)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, y: -20 }}
                    whileInView={{ scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 1.6 + index * 0.05 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-px h-3 bg-gray-300 dark:bg-gray-600" />
                    <div className="w-full h-6 bg-muted rounded text-xs flex items-center justify-center">
                      <FileText className="w-3 h-3 text-muted-foreground" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Level 3 */}
              <div className="grid grid-cols-6 gap-1">
                {[...Array(18)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: 2 + index * 0.02 }}
                    className="h-4 bg-muted/60 rounded"
                  />
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 pt-6 border-t grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-foreground">4.2</div>
                <div className="text-xs text-muted-foreground">Avg Depth</div>
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">98%</div>
                <div className="text-xs text-muted-foreground">Crawlable</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* URL Structure Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                URL Structure Optimization
              </h3>
              <p className="text-muted-foreground mb-6">
                Analyze and optimize your URL patterns for better SEO performance and user experience.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <BarChart3 className="w-5 h-5 text-blue-500 mr-3" />
                  <span className="text-sm">SEO-friendly URL pattern analysis</span>
                </div>
                <div className="flex items-center">
                  <Eye className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-sm">User-friendly navigation structure</span>
                </div>
                <div className="flex items-center">
                  <Search className="w-5 h-5 text-purple-500 mr-3" />
                  <span className="text-sm">Search engine crawl optimization</span>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border">
              <h4 className="text-lg font-semibold text-foreground mb-4">URL Pattern Analysis</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                  <span className="text-sm font-mono">/products/category/item</span>
                  <span className="text-xs text-green-400 font-medium">Optimized</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg">
                  <span className="text-sm font-mono">/page.php?id=123&cat=5</span>
                  <span className="text-xs text-yellow-400 font-medium">Needs Work</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg">
                  <span className="text-sm font-mono">/very/deep/nested/structure/page</span>
                  <span className="text-xs text-red-400 font-medium">Too Deep</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}