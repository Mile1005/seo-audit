"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Shield, Zap, Search, Globe, FileText, Code, Eye } from "lucide-react";

// Simple grid of the 8 audit categories referenced on the feature page
export default function AuditCategories() {
  const categories = [
    { 
      title: "Technical SEO", 
      desc: "Crawlability, indexation, canonicalization",
      icon: Code,
      gradient: "from-blue-500 to-purple-600"
    },
    { 
      title: "On-Page SEO", 
      desc: "Titles, metas, headings, internal linking",
      icon: FileText,
      gradient: "from-green-500 to-teal-600"
    },
    { 
      title: "Performance", 
      desc: "Core Web Vitals, speed, best practices",
      icon: Zap,
      gradient: "from-yellow-500 to-orange-600"
    },
    { 
      title: "Indexing", 
      desc: "Sitemaps, robots.txt, noindex, duplicates",
      icon: Search,
      gradient: "from-purple-500 to-pink-600"
    },
    { 
      title: "Security", 
      desc: "HTTPS, security headers, mixed content",
      icon: Shield,
      gradient: "from-red-500 to-rose-600"
    },
    { 
      title: "Content", 
      desc: "Thin/duplicate checks, readability, freshness",
      icon: Globe,
      gradient: "from-indigo-500 to-blue-600"
    },
    { 
      title: "Structured Data", 
      desc: "Schema.org coverage and validity",
      icon: CheckCircle,
      gradient: "from-emerald-500 to-green-600"
    },
    { 
      title: "Accessibility", 
      desc: "Alt text, landmarks, contrast, ARIA",
      icon: Eye,
      gradient: "from-cyan-500 to-blue-600"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl lg:text-4xl font-bold text-foreground mb-10 text-center"
        >
          What We Check
        </motion.h2>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((c, index) => {
            const Icon = c.icon;
            return (
              <motion.div 
                key={c.title}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", damping: 15, stiffness: 300 }
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative rounded-xl border bg-background p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className={`+"absolute inset-0 bg-gradient-to-br "+$c.gradient+" opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className={`+"inline-flex p-2 rounded-lg bg-gradient-to-br "+$c.gradient+" mb-4`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300">
                    {c.title}
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-gray-600 transition-colors duration-300">
                    {c.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}