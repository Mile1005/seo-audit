"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Lightbulb, TrendingUp, ChevronDown, ChevronUp, Clock, Code, ExternalLink } from 'lucide-react';
import { Badge } from '../ui/badge';

interface Opportunity { 
  title?: string; 
  description?: string; 
  displayValue?: string;
  implementation?: {
    steps: string[];
    difficulty: 'Easy' | 'Medium' | 'Hard';
    timeRequired: string;
    tools?: string[];
    resources?: { title: string; url: string }[];
  };
}

interface Props { opportunities: (string | Opportunity)[] }

const getImplementationDetails = (title: string): Opportunity['implementation'] => {
  // Normalize title to handle variations
  const normalizedTitle = title.toLowerCase();
  
  // Specific implementations for each unique opportunity
  if (normalizedTitle.includes('first contentful paint') || normalizedTitle.includes('fcp')) {
    return {
      steps: [
        '🎯 WHAT IS FCP: First Contentful Paint measures when the first text or image appears on your page',
        '📊 WHY IT MATTERS: Users see content faster = better experience + Google ranks faster sites higher',
        '🔧 FIX 1: Enable server compression (gzip/brotli) in your hosting control panel or .htaccess',
        '🔧 FIX 2: Inline critical CSS for above-the-fold content directly in <head><style>...</style>',
        '🔧 FIX 3: Add <link rel="preload" as="font" href="font.woff2"> for important fonts',
        '🔧 FIX 4: Optimize your largest image: convert to WebP, resize to actual display size',
        '✅ RESULT: Your page will appear 30-50% faster to users'
      ],
      difficulty: 'Medium',
      timeRequired: '2-3 hours',
      tools: ['Chrome DevTools Network tab', 'Squoosh.app for images', 'Critical CSS extractor'],
      resources: [{ title: 'Our detailed FCP guide', url: '#internal-fcp-guide' }]
    };
  }

  if (normalizedTitle.includes('largest contentful paint') || normalizedTitle.includes('lcp')) {
    return {
      steps: [
        '🎯 WHAT IS LCP: Largest Contentful Paint measures when your main content (hero image, headline) loads',
        '📊 WHY IT MATTERS: Google uses LCP as a ranking factor - slow LCP = lower search rankings',
        '🔧 FIX 1: Optimize your hero image - compress to WebP format and proper size',
        '🔧 FIX 2: Add <link rel="preload" as="image" href="hero.webp"> in <head> for hero images',
        '🔧 FIX 3: Ensure LCP element loads from same domain (no external slow servers)',
        '🔧 FIX 4: Remove any JavaScript that delays rendering of main content',
        '✅ RESULT: Your main content appears instantly, improving user engagement by 25%+'
      ],
      difficulty: 'Medium',
      timeRequired: '1-2 hours',
      tools: ['Chrome DevTools Performance tab', 'Image compression tools', 'Network analysis'],
      resources: [{ title: 'LCP optimization checklist', url: '#internal-lcp-guide' }]
    };
  }

  if (normalizedTitle.includes('cumulative layout shift') || normalizedTitle.includes('cls')) {
    return {
      steps: [
        '🎯 WHAT IS CLS: Cumulative Layout Shift measures how much your page content jumps around while loading',
        '📊 WHY IT MATTERS: Jumping content frustrates users and Google penalizes unstable pages',
        '🔧 FIX 1: Add width and height attributes to all <img> tags: <img src="pic.jpg" width="300" height="200">',
        '🔧 FIX 2: Reserve space for ads with min-height CSS: .ad-container { min-height: 250px; }',
        '🔧 FIX 3: Preload fonts to prevent text shifting: <link rel="preload" as="font" href="font.woff2">',
        '🔧 FIX 4: Use CSS aspect-ratio for responsive images: aspect-ratio: 16/9;',
        '✅ RESULT: Your page content stays stable, reducing user frustration to near zero'
      ],
      difficulty: 'Easy',
      timeRequired: '1-2 hours',
      tools: ['Chrome DevTools Layout Shift regions', 'CSS aspect-ratio', 'Image dimensions'],
      resources: [{ title: 'CLS prevention guide', url: '#internal-cls-guide' }]
    };
  }

  if (normalizedTitle.includes('render-blocking') || normalizedTitle.includes('blocking')) {
    return {
      steps: [
        '🎯 WHAT ARE RENDER-BLOCKING RESOURCES: CSS and JavaScript files that prevent your page from displaying',
        '📊 WHY IT MATTERS: Users see blank screen longer = higher bounce rate + poor SEO',
        '🔧 FIX 1: Inline critical CSS in <head><style>/* above-fold styles */</style>',
        '🔧 FIX 2: Load non-critical CSS async: <link rel="preload" as="style" onload="this.rel=\'stylesheet\'">',
        '🔧 FIX 3: Add defer to non-critical JS: <script defer src="script.js"></script>',
        '🔧 FIX 4: Move analytics and tracking scripts to bottom of <body>',
        '✅ RESULT: Your page displays immediately while other resources load in background'
      ],
      difficulty: 'Medium',
      timeRequired: '2-4 hours',
      tools: ['Chrome DevTools Network tab', 'Critical CSS generators', 'Script analysis'],
      resources: [{ title: 'Render-blocking elimination guide', url: '#internal-blocking-guide' }]
    };
  }

  if (normalizedTitle.includes('image') && (normalizedTitle.includes('optimize') || normalizedTitle.includes('compress'))) {
    return {
      steps: [
        '🎯 WHAT IS IMAGE OPTIMIZATION: Reducing image file sizes without losing visual quality',
        '📊 WHY IT MATTERS: Images are usually 60%+ of page weight - optimize them = much faster site',
        '🔧 FIX 1: Convert images to WebP format using Squoosh.app (50%+ smaller than JPEG)',
        '🔧 FIX 2: Add responsive images: <img srcset="small.webp 400w, large.webp 800w">',
        '🔧 FIX 3: Add loading="lazy" to images below the fold: <img loading="lazy" src="pic.webp">',
        '🔧 FIX 4: Resize images to actual display size (don\'t use 2000px image for 300px display)',
        '✅ RESULT: Your page loads 2-3x faster with identical visual quality'
      ],
      difficulty: 'Easy',
      timeRequired: '1-2 hours',
      tools: ['Squoosh.app', 'TinyPNG', 'ImageOptim', 'Responsive image generator'],
      resources: [{ title: 'Image optimization master guide', url: '#internal-image-guide' }]
    };
  }

  if (normalizedTitle.includes('minify') || normalizedTitle.includes('compress')) {
    return {
      steps: [
        '🎯 WHAT IS MINIFICATION: Removing unnecessary spaces, comments, and characters from code',
        '📊 WHY IT MATTERS: Smaller files = faster downloads = faster site + better SEO',
        '🔧 FIX 1: Use build tools - enable minification in webpack.config.js or vite.config.js',
        '🔧 FIX 2: For simple sites: use online CSS/JS minifiers before uploading',
        '🔧 FIX 3: Enable server compression (gzip/brotli) in hosting control panel',
        '🔧 FIX 4: Remove console.log() and debug code from production files',
        '✅ RESULT: Your CSS/JS files become 20-40% smaller with zero functionality loss'
      ],
      difficulty: 'Easy',
      timeRequired: '30-60 minutes',
      tools: ['Build tool configs', 'Online minifiers', 'Server compression settings'],
      resources: [{ title: 'Complete minification guide', url: '#internal-minify-guide' }]
    };
  }

  if (normalizedTitle.includes('font') || normalizedTitle.includes('web font')) {
    return {
      steps: [
        '🎯 WHAT ARE WEB FONTS: Custom fonts that must download before text appears',
        '📊 WHY IT MATTERS: Slow fonts = invisible text period = poor user experience',
        '🔧 FIX 1: Add font-display: swap; to all @font-face rules in CSS',
        '🔧 FIX 2: Preload critical fonts: <link rel="preload" as="font" href="font.woff2" crossorigin>',
        '🔧 FIX 3: Use WOFF2 format (30% smaller than WOFF)',
        '🔧 FIX 4: Limit font variants - only load weights/styles you actually use',
        '✅ RESULT: Text appears immediately with fallback, then upgrades to custom font smoothly'
      ],
      difficulty: 'Easy',
      timeRequired: '30-60 minutes',
      tools: ['Google Fonts', 'Font conversion tools', 'CSS font-display'],
      resources: [{ title: 'Web font optimization guide', url: '#internal-font-guide' }]
    };
  }

  if (normalizedTitle.includes('cache') || normalizedTitle.includes('caching')) {
    return {
      steps: [
        '🎯 WHAT IS BROWSER CACHING: Storing files locally so repeat visitors load your site instantly',
        '📊 WHY IT MATTERS: Cached sites load 90%+ faster for returning visitors',
        '🔧 FIX 1: Add Cache-Control headers for static files: max-age=31536000 (1 year)',
        '🔧 FIX 2: Set up .htaccess caching rules for Apache or nginx.conf for Nginx',
        '🔧 FIX 3: Use filename versioning for updates: style-v1.2.css',
        '🔧 FIX 4: Configure CDN caching if using Cloudflare/AWS CloudFront',
        '✅ RESULT: Returning visitors experience near-instant page loads'
      ],
      difficulty: 'Medium',
      timeRequired: '1-2 hours',
      tools: ['Server configuration', 'CDN settings', 'Cache testing tools'],
      resources: [{ title: 'Browser caching setup guide', url: '#internal-cache-guide' }]
    };
  }

  if (normalizedTitle.includes('server response') || normalizedTitle.includes('ttfb')) {
    return {
      steps: [
        '🎯 WHAT IS SERVER RESPONSE TIME: How long your server takes to start sending the page',
        '📊 WHY IT MATTERS: Slow servers = everything loads slowly regardless of optimization',
        '🔧 FIX 1: Enable server-side caching (Redis/Memcached) for database queries',
        '🔧 FIX 2: Optimize database with proper indexes on frequently queried columns',
        '🔧 FIX 3: Use CDN to serve content from servers closer to users',
        '🔧 FIX 4: Upgrade hosting if on shared hosting - consider VPS or dedicated server',
        '✅ RESULT: Your server responds instantly, making everything else load faster'
      ],
      difficulty: 'Hard',
      timeRequired: '3-6 hours',
      tools: ['Server monitoring', 'Database profiler', 'CDN providers', 'Hosting upgrades'],
      resources: [{ title: 'Server optimization guide', url: '#internal-server-guide' }]
    };
  }

  // Default fallback with more specific guidance
  return {
    steps: [
      '🎯 WHAT THIS MEANS: This optimization will improve your page loading performance',
      '📊 WHY IT MATTERS: Faster pages rank higher in Google and keep more visitors engaged',
      '🔧 ANALYZE: Use Chrome DevTools → Performance tab to identify the specific bottleneck',
      '🔧 RESEARCH: Look up the specific issue name for detailed optimization guides',
      '🔧 IMPLEMENT: Apply the recommended changes incrementally and test each one',
      '🔧 VALIDATE: Re-run the audit to confirm improvements',
      '✅ RESULT: Your site will load faster and provide better user experience'
    ],
    difficulty: 'Medium',
    timeRequired: '1-3 hours',
    tools: ['Chrome DevTools', 'Performance testing tools'],
    resources: [{ title: 'Performance optimization guide', url: 'https://web.dev/performance/' }]
  };
};

export const PerformanceOpportunities = ({ opportunities }: Props) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  
  if (!opportunities || opportunities.length === 0) return null;
  
  // Convert string opportunities to objects
  const normalizedOpportunities = opportunities.map((o, i) => {
    if (typeof o === 'string') {
      return {
        title: o,
        description: null,
        displayValue: null,
        implementation: getImplementationDetails(o)
      };
    }
    return {
      ...o,
      implementation: o.implementation || getImplementationDetails(o.title || '')
    };
  });

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-blue-500" />
          Performance Opportunities ({normalizedOpportunities.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {normalizedOpportunities.map((o, i) => {
            const isExpanded = expandedItems.has(i);
            const implementation = o.implementation!;
            
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="border rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-xl transition-all duration-300"
              >
                <motion.button
                  onClick={() => toggleExpanded(i)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-start gap-4 p-4 text-left hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 text-base">
                        {o.title || `Opportunity ${i + 1}`}
                      </h4>
                      <div className="flex items-center gap-2">
                        {o.displayValue && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                            {o.displayValue}
                          </Badge>
                        )}
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-blue-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                    </div>
                    
                    {o.description && (
                      <p className="text-sm text-blue-700 dark:text-blue-200 mb-2">{o.description}</p>
                    )}
                    
                    <div className="flex items-center gap-3 text-xs">
                      <span className={`px-2 py-1 rounded-full font-medium ${getDifficultyColor(implementation.difficulty)}`}>
                        {implementation.difficulty}
                      </span>
                      <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                        <Clock className="h-3 w-3" />
                        <span className="font-medium">{implementation.timeRequired}</span>
                      </div>
                      <span className="text-blue-600 dark:text-blue-400 font-medium">Click to see implementation steps</span>
                    </div>
                  </div>
                </motion.button>
                
                <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-800 p-4"
                  >
                    <div className="space-y-4">
                      {/* Implementation Steps */}
                      <div>
                        <h5 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                          <Code className="h-4 w-4 text-green-500" />
                          Implementation Steps
                        </h5>
                        <ol className="space-y-2">
                          {implementation.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex items-start gap-3">
                              <span className="bg-blue-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                {stepIndex + 1}
                              </span>
                              <span className="text-sm text-slate-700 dark:text-slate-200">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                      
                      {/* Integrated Analysis - No External Tools */}
                      {implementation.tools && (
                        <div>
                          <h5 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                            <div className="w-5 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center">⚙️</div>
                            Our Integrated Analysis
                          </h5>
                          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                            <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                              <strong>⚡ Direct Integration:</strong> We’ve analyzed your site using advanced performance tools so you don’t need to visit external platforms.
                            </p>
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                              <strong>🎯 Actionable Results:</strong> Follow the implementation steps above for immediate improvements.
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {/* Internal Support - No External Resources */}
                      <div>
                        <h5 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                          <div className="w-5 h-5 bg-green-500 rounded text-white text-xs flex items-center justify-center">🎯</div>
                          Implementation Support
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
                            <p className="text-sm text-green-800 dark:text-green-200 font-medium mb-1">
                              ✅ Ready to Implement?
                            </p>
                            <p className="text-xs text-green-700 dark:text-green-300">
                              Our support team can provide personalized guidance for your specific setup.
                            </p>
                          </div>
                          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg">
                            <p className="text-sm text-purple-800 dark:text-purple-200 font-medium mb-1">
                              📊 Track Progress
                            </p>
                            <p className="text-xs text-purple-700 dark:text-purple-300">
                              Re-run your audit after changes to see measurable improvements.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
