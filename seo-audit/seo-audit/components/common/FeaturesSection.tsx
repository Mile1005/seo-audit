"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const features: Feature[] = [
  {
    title: "Technical SEO",
    description: "Meta tags, canonical URLs, robots.txt, sitemap, and schema markup.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
    ),
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Content Quality",
    description: "Readability, word count, keyword usage, and content structure.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "User Experience",
    description: "Navigation, internal links, layout, and engagement signals.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
    ),
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Actionable Insights",
    description: "Specific, prioritized recommendations to improve your SEO.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
    ),
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Core Web Vitals",
    description: "Performance metrics: LCP, CLS, INP, and mobile speed.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1H3a1 1 0 01-1-1v-6zm6-4a1 1 0 011-1h2a1 1 0 011 1v10a1 1 0 01-1 1h-2a1 1 0 01-1-1V7zm6-2a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V5z" /></svg>
    ),
    color: "from-yellow-500 to-orange-400"
  },
  {
    title: "Accessibility (ARIA)",
    description: "WCAG, ARIA, alt text, color contrast, and keyboard navigation.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12.93V15a1 1 0 11-2 0v-2.07A6.002 6.002 0 014 10a6.002 6.002 0 015-5.93V5a1 1 0 112 0v2.07A6.002 6.002 0 0116 10a6.002 6.002 0 01-5 5.93z" /></svg>
    ),
    color: "from-pink-500 to-fuchsia-500"
  },
  {
    title: "Mobile Friendliness",
    description: "Responsive design, viewport, tap targets, and mobile usability.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm0 2h6v12H7V4z" /></svg>
    ),
    color: "from-teal-500 to-cyan-400"
  },
  {
    title: "AI SEO Insights",
    description: "AI-powered analysis, FAQ generation, and competitor gap analysis.",
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none" /><path d="M10 6v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
    color: "from-indigo-500 to-blue-700"
  }
];

export default function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section className="py-20 bg-bg-secondary">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            What We Analyze
          </h2>
          <h3 className="text-2xl md:text-3xl font-semibold text-accent-primary mb-2">
            All-in-One SEO & Web Health Audit
          </h3>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Comprehensive, AI-powered SEO and web analysis. We check every detail that matters for your ranking, user experience, and technical health.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 relative"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="glass-card p-10 min-h-[260px] flex flex-col justify-between relative overflow-hidden group rounded-2xl shadow-lg"
              aria-label={feature.title}
            >
              {/* Always-on gradient for mobile, hover for desktop */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20 md:opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              {/* Icon */}
              <motion.div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 relative z-10`}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
              >
                {feature.icon}
              </motion.div>
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-lg text-accent-primary font-semibold mb-2">
                  {feature.title === "Technical SEO" ? "Crawlability & Indexing" :
                   feature.title === "Content Quality" ? "Content Depth & Relevance" :
                   feature.title === "User Experience" ? "Navigation & Engagement" :
                   feature.title === "Actionable Insights" ? "Step-by-Step Fixes" :
                   feature.title === "Core Web Vitals" ? "Performance & Speed" :
                   feature.title === "Accessibility (ARIA)" ? "Inclusive Design" :
                   feature.title === "Mobile Friendliness" ? "Responsive & Usable" :
                   feature.title === "AI SEO Insights" ? "AI-Driven Analysis" :
                   "SEO Feature"
                  }
                </p>
                <p className="text-base text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
              {/* Hover Effect */}
              <div className="absolute inset-0 border border-accent-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
          {/* Floating/fading accent for section depth */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-accent-primary/10 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-accent-secondary/10 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-accent-primary/30 rounded-full blur-sm floating" />
        <div className="absolute bottom-20 right-10 w-6 h-6 bg-accent-secondary/30 rounded-full blur-sm floating" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-20 w-3 h-3 bg-accent-tertiary/30 rounded-full blur-sm floating" style={{ animationDelay: '2s' }} />
      </div>
    </section>
  );
}
