"use client";

import React from "react";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search, Zap, Globe, BarChart3, Clock, ArrowRight } from "lucide-react";
import CrawlCapabilities from "@/components/features/site-crawler/crawl-capabilities";
import SiteArchitecture from "@/components/features/site-crawler/site-architecture";
import IssueDetection from "@/components/features/site-crawler/issue-detection";
import MonitoringFeatures from "@/components/features/site-crawler/monitoring-features";
import IntegrationOptions from "@/components/features/site-crawler/integration-options";



export default function SiteCrawlerPage() {
  const features = [
    {
      icon: Globe,
      title: "10,000+ Pages",
      description: "Crawl massive websites"
    },
    {
      icon: Search,
      title: "50+ Issue Types",
      description: "Comprehensive detection"
    },
    {
      icon: Zap,
      title: "Minutes Not Hours",
      description: "Lightning-fast analysis"
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description: "Continuous site health"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
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
            className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"
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
            className="absolute bottom-20 right-10 w-60 h-60 bg-gradient-to-br from-green-400/10 to-blue-600/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
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
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
              >
                Analyze Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Entire Website
                </span>{" "}
                in Minutes
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
              >
                Crawl up to 10,000 pages, detect 50+ issues, monitor continuously. 
                Complete technical SEO analysis with visual site mapping.
              </motion.p>

              {/* Feature Pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
              >
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="text-center p-4 rounded-lg bg-card border hover:shadow-md transition-shadow"
                    >
                      <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-sm font-semibold text-foreground mb-1">
                        {feature.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {feature.description}
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
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link href="/crawl">
                    <Search className="w-5 h-5 mr-2" />
                    Crawl My Website
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  View Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Visual - Site Architecture Tree */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative bg-card rounded-2xl p-8 border shadow-lg">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Live Site Architecture</h3>
                  <p className="text-sm text-muted-foreground">Visual site mapping in real-time</p>
                </div>
                
                {/* Tree Diagram Placeholder */}
                <div className="space-y-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 1 }}
                    className="h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                        className="h-8 bg-muted rounded"
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.8 + i * 0.05 }}
                        className="h-6 bg-muted/60 rounded"
                      />
                    ))}
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  2,847 pages found
                </div>
                <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  98% crawled
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <CrawlCapabilities />
      <IssueDetection />
      <SiteArchitecture />
      <MonitoringFeatures />
      <IntegrationOptions />

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-bold text-foreground mb-6"
          >
            Ready to Crawl Your Website?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted-foreground mb-8"
          >
            Start your comprehensive website analysis in under 60 seconds.
            No setup required.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/crawl">
                <Globe className="w-5 h-5 mr-2" />
                Start Crawling Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}