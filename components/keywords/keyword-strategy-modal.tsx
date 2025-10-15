'use client';

import React, { useState, useEffect } from 'react';
import { X, Target, Download, Lightbulb, TrendingUp, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface KeywordStrategyData {
  mainKeyword: string;
  supportingKeywords: string[];
  longTailKeywords: string[];
}

interface KeywordStrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseKeyword: string;
  baseVolume: number;
}

export function KeywordStrategyModal({ 
  isOpen, 
  onClose, 
  baseKeyword, 
  baseVolume
}: KeywordStrategyModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Generate keyword strategy
  const generateStrategy = (): KeywordStrategyData => {
    // Supporting keywords (5-10 related terms)
    const supportingKeywords = [
      `${baseKeyword} guide`,
      `${baseKeyword} tutorial`,
      `${baseKeyword} tips`,
      `best ${baseKeyword}`,
      `${baseKeyword} strategies`,
      `${baseKeyword} techniques`,
      `${baseKeyword} examples`,
      `${baseKeyword} best practices`,
      `professional ${baseKeyword}`,
      `${baseKeyword} checklist`
    ];

    // Long-tail keywords (20+ opportunities)
    const longtailPrefixes = ['how to', 'what is', 'best way to', 'top', 'free', 'quick', 'easy', 'step by step'];
    const longtailSuffixes = ['for beginners', 'for small business', 'guide', 'tutorial', '2024', '2025', 'tips', 'examples'];
    
    const longTailKeywords: string[] = [];
    longtailPrefixes.forEach(prefix => {
      longtailSuffixes.forEach(suffix => {
        longTailKeywords.push(`${prefix} ${baseKeyword} ${suffix}`);
      });
    });

    // Add more variations
    longTailKeywords.push(
      ...(`complete ${baseKeyword} guide for beginners,
      ${baseKeyword} for small businesses,
      ${baseKeyword} vs alternative,
      ${baseKeyword} comparison,
      ${baseKeyword} review 2024,
      ${baseKeyword} cost,
      ${baseKeyword} pricing,
      ${baseKeyword} features,
      ${baseKeyword} benefits,
      ${baseKeyword} disadvantages`).split(',').map(k => k.trim())
    );

    return {
      mainKeyword: baseKeyword,
      supportingKeywords: supportingKeywords.slice(0, 10),
      longTailKeywords: longTailKeywords.slice(0, 25)
    };
  };

  const strategy = generateStrategy();

  const exportStrategy = () => {
    const content = `
KEYWORD STRATEGY FOR: ${baseKeyword}
Generated: ${new Date().toLocaleDateString()}
Base Search Volume: ${baseVolume.toLocaleString()}/month

========================================
PILLAR CONTENT (Main Keyword)
========================================
${strategy.mainKeyword}

Use this as your main target keyword for pillar/cornerstone content.
Create comprehensive, authoritative content around this topic.

========================================
SUPPORTING KEYWORDS (5-10 Terms)
========================================
${strategy.supportingKeywords.map((k, i) => `${i + 1}. ${k}`).join('\n')}

Target these keywords in related articles and blog posts.
Link these articles back to your pillar content.

========================================
LONG-TAIL OPPORTUNITIES (20+ Keywords)
========================================
${strategy.longTailKeywords.map((k, i) => `${i + 1}. ${k}`).join('\n')}

Target these in FAQ sections, blog posts, and supporting content.
These typically have lower competition and faster ranking potential.

========================================
IMPLEMENTATION STRATEGY
========================================
1. Start with pillar content targeting: ${baseKeyword}
2. Create 5-10 supporting articles targeting related terms
3. Add FAQ sections with long-tail question keywords
4. Build internal links from supporting content to pillar
5. Monitor rankings and adjust strategy monthly

========================================
PRO TIPS
========================================
- Structure content with clear H2/H3 headings
- Answer questions directly in first paragraph
- Use schema markup for FAQ content
- Include step-by-step instructions
- Add visual content (images, infographics)
- Build high-quality backlinks to pillar content
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${baseKeyword}-strategy.txt`;
    a.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="p-6 pb-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 border-b border-green-100 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg shadow-md">
                  <Target className="h-5 w-5 text-white" />
                </div>
                Keyword Strategy
              </h2>
              <p className="text-slate-600 dark:text-slate-400 font-medium mt-1">
                Complete content strategy for "<span className="font-semibold text-green-700 dark:text-green-300">{baseKeyword}</span>"
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={exportStrategy}
                className="bg-white border-2 border-green-300 text-green-700 hover:bg-green-50 font-semibold"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Strategy
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-green-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Strategy Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* Main Keyword */}
            <div className="group p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-5 bg-white rounded-full shadow-md animate-pulse"></div>
                <span className="font-bold text-white text-xl">{strategy.mainKeyword}</span>
              </div>
              <p className="text-sm text-blue-100 font-medium mb-3">Main target keyword - Pillar Content</p>
              <Badge className="bg-white/20 text-white border-0 px-3 py-1.5 text-xs font-bold">
                PRIMARY FOCUS
              </Badge>
              <div className="mt-4 pt-4 border-t border-blue-400/30">
                <p className="text-xs text-blue-100">
                  Create comprehensive, authoritative content. Target: 2,000+ words
                </p>
              </div>
            </div>

            {/* Supporting Keywords */}
            <div className="group p-6 bg-white dark:bg-slate-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-slate-200 dark:border-slate-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-5 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full shadow-md"></div>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-xl">Supporting Keywords</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-3">
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{strategy.supportingKeywords.length}</span> related terms
              </p>
              <Badge className="bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-0 px-3 py-1.5 text-xs font-bold">
                SECONDARY TARGETS
              </Badge>
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Create 5-10 blog posts. Target: 800-1,500 words each
                </p>
              </div>
            </div>

            {/* Long-tail */}
            <div className="group p-6 bg-white dark:bg-slate-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-slate-200 dark:border-slate-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-5 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full shadow-md"></div>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-xl">Long-tail</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-3">
                <span className="text-2xl font-black text-green-600 dark:text-green-400">{strategy.longTailKeywords.length}</span> opportunities
              </p>
              <Badge className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-0 px-3 py-1.5 text-xs font-bold">
                EASY WINS
              </Badge>
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  FAQ sections, mini-posts. Target: 300-800 words
                </p>
              </div>
            </div>
          </div>

          {/* Supporting Keywords List */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Supporting Keywords ({strategy.supportingKeywords.length})</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {strategy.supportingKeywords.map((keyword, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl border-2 border-blue-100 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200 group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                      {keyword}
                    </span>
                    <Badge className="bg-blue-500 text-white border-0 text-xs font-bold">
                      Article {index + 1}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                    Create dedicated article • Link to pillar content
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Long-tail Keywords List */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Long-tail Opportunities ({strategy.longTailKeywords.length})</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {strategy.longTailKeywords.map((keyword, index) => (
                <div
                  key={index}
                  className="px-3 py-2 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 transition-all duration-200 cursor-pointer"
                >
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {keyword}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Implementation Guide */}
          <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3 text-lg">Implementation Strategy</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge className="bg-blue-600 text-white border-0 px-2 py-1 text-xs font-bold shrink-0">STEP 1</Badge>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      <strong>Pillar Content:</strong> Create comprehensive guide targeting "{strategy.mainKeyword}" (2,000+ words with H2/H3 structure)
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-purple-600 text-white border-0 px-2 py-1 text-xs font-bold shrink-0">STEP 2</Badge>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      <strong>Supporting Articles:</strong> Write 5-10 blog posts targeting supporting keywords (800-1,500 words each)
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-green-600 text-white border-0 px-2 py-1 text-xs font-bold shrink-0">STEP 3</Badge>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      <strong>Long-tail Content:</strong> Add FAQ sections, mini-guides, and question-based content (300-800 words)
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-orange-600 text-white border-0 px-2 py-1 text-xs font-bold shrink-0">STEP 4</Badge>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      <strong>Internal Linking:</strong> Link all supporting and long-tail content back to your pillar article
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge className="bg-red-600 text-white border-0 px-2 py-1 text-xs font-bold shrink-0">STEP 5</Badge>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      <strong>Monitor & Optimize:</strong> Track rankings monthly and update content based on performance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700 border-t border-slate-200 dark:border-slate-600 flex items-center justify-between">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <span className="font-bold text-green-700 dark:text-green-300">{strategy.supportingKeywords.length + strategy.longTailKeywords.length + 1}</span> total keywords in strategy
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
