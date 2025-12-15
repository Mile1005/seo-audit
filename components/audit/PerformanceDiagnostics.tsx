"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  Settings,
  ChevronDown,
  ChevronUp,
  Clock,
  Code,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import { Badge } from "../ui/badge";

interface Diagnostic {
  title?: string;
  description?: string;
  displayValue?: string;
  implementation?: {
    steps: string[];
    difficulty: "Easy" | "Medium" | "Hard";
    timeRequired: string;
    tools?: string[];
    resources?: { title: string; url: string }[];
  };
}

interface Props {
  diagnostics: (string | Diagnostic)[];
}

const getImplementationDetails = (title: string): Diagnostic["implementation"] => {
  // Normalize title to handle variations
  const normalizedTitle = title.toLowerCase();

  // Specific implementations for each unique diagnostic
  if (normalizedTitle.includes("largest contentful paint") || normalizedTitle.includes("lcp")) {
    return {
      steps: [
        "🎯 WHAT IS LCP ISSUE: Your largest content element (hero image/text) loads slowly",
        "📊 PERFORMANCE IMPACT: Slow LCP makes users think your site is broken and leave",
        "🔧 IDENTIFY: Check Chrome DevTools → Performance → find your LCP element",
        "🔧 FIX IMAGE LCP: Convert hero image to WebP, resize to display size, add preload",
        "🔧 FIX TEXT LCP: Ensure font loads quickly with font-display: swap",
        "🔧 FIX SERVER LCP: Move LCP resource to same domain or faster CDN",
        "✅ RESULT: Your main content appears instantly, reducing bounce rate by 30%+",
      ],
      difficulty: "Medium",
      timeRequired: "1-2 hours",
      tools: ["Chrome DevTools Performance tab", "Image optimization tools"],
      resources: [{ title: "LCP diagnostic guide", url: "#internal-lcp-diagnostic" }],
    };
  }

  if (normalizedTitle.includes("cumulative layout shift") || normalizedTitle.includes("cls")) {
    return {
      steps: [
        "🎯 WHAT IS CLS ISSUE: Your page content moves/jumps while loading",
        "📊 PERFORMANCE IMPACT: Users get frustrated clicking wrong buttons due to layout shifts",
        "🔧 IDENTIFY: Enable Layout Shift Regions in Chrome DevTools to see what moves",
        '🔧 FIX IMAGES: Add width/height attributes: <img src="pic.jpg" width="300" height="200">',
        '🔧 FIX FONTS: Preload fonts to prevent text reflow: <link rel="preload" as="font">',
        "🔧 FIX ADS: Reserve space with min-height CSS before ads load",
        "✅ RESULT: Your page stays completely stable, improving user experience dramatically",
      ],
      difficulty: "Easy",
      timeRequired: "1-2 hours",
      tools: ["Chrome DevTools Layout Shift regions", "CSS sizing properties"],
      resources: [{ title: "CLS prevention guide", url: "#internal-cls-diagnostic" }],
    };
  }

  if (normalizedTitle.includes("first input delay") || normalizedTitle.includes("fid")) {
    return {
      steps: [
        "🎯 WHAT IS FID ISSUE: Your page is slow to respond to user clicks/taps",
        "📊 PERFORMANCE IMPACT: Users click buttons but nothing happens = terrible experience",
        "🔧 IDENTIFY: Check Chrome DevTools → Performance → find long tasks (red bars)",
        "🔧 FIX JAVASCRIPT: Break up long-running scripts into smaller chunks",
        "🔧 FIX TIMING: Use requestIdleCallback() for non-critical tasks",
        "🔧 FIX WORKERS: Move heavy computations to Web Workers",
        "✅ RESULT: Your page responds instantly to every user interaction",
      ],
      difficulty: "Hard",
      timeRequired: "3-6 hours",
      tools: ["Chrome DevTools Main Thread analysis", "Web Workers API"],
      resources: [{ title: "FID optimization guide", url: "#internal-fid-diagnostic" }],
    };
  }

  if (normalizedTitle.includes("interaction to next paint") || normalizedTitle.includes("inp")) {
    return {
      steps: [
        "🎯 WHAT IS INP ISSUE: Delay between user interaction and visual response",
        "📊 PERFORMANCE IMPACT: Slow interactions make your site feel laggy and unresponsive",
        "🔧 IDENTIFY: Use Chrome DevTools → Performance → record user interactions",
        "🔧 FIX HANDLERS: Optimize click/touch event handlers - avoid heavy DOM queries",
        "🔧 FIX UPDATES: Use CSS transforms instead of layout-changing properties",
        "🔧 FIX DEBOUNCE: Throttle frequent events like scroll/resize handlers",
        "✅ RESULT: Every button click and interaction feels instantaneous",
      ],
      difficulty: "Medium",
      timeRequired: "2-4 hours",
      tools: ["Chrome DevTools Performance panel", "Event optimization techniques"],
      resources: [{ title: "INP optimization guide", url: "#internal-inp-diagnostic" }],
    };
  }

  if (normalizedTitle.includes("server response time") || normalizedTitle.includes("ttfb")) {
    return {
      steps: [
        "🎯 WHAT IS SERVER RESPONSE ISSUE: Your server takes too long to start sending the page",
        "📊 PERFORMANCE IMPACT: Everything loads slowly because server is the bottleneck",
        "🔧 IDENTIFY: Check Network tab → click on document → see Waiting time",
        "🔧 FIX DATABASE: Add indexes to frequently queried database columns",
        "🔧 FIX CACHING: Enable server-side caching (Redis/Memcached)",
        "🔧 FIX HOSTING: Upgrade from shared hosting to VPS/dedicated server",
        "✅ RESULT: Your server responds in milliseconds, making everything faster",
      ],
      difficulty: "Hard",
      timeRequired: "4-8 hours",
      tools: ["Server monitoring tools", "Database profiler", "Hosting upgrades"],
      resources: [{ title: "Server optimization guide", url: "#internal-server-diagnostic" }],
    };
  }

  if (
    normalizedTitle.includes("loading strategies") ||
    normalizedTitle.includes("resource loading")
  ) {
    return {
      steps: [
        "🎯 WHAT ARE LOADING STRATEGY ISSUES: Resources load in wrong order or timing",
        "📊 PERFORMANCE IMPACT: Important content waits for unimportant resources",
        "🔧 IDENTIFY: Check Network tab → see what loads first vs what should load first",
        '🔧 FIX PRIORITY: Add fetchpriority="high" to critical resources',
        '🔧 FIX PRELOAD: Use <link rel="preload"> for critical resources',
        '🔧 FIX LAZY: Add loading="lazy" to below-fold images',
        "✅ RESULT: Critical content loads first, everything else loads optimally",
      ],
      difficulty: "Medium",
      timeRequired: "2-3 hours",
      tools: ["Resource priority APIs", "Preload/prefetch techniques"],
      resources: [{ title: "Loading strategy guide", url: "#internal-loading-diagnostic" }],
    };
  }

  if (normalizedTitle.includes("mobile performance") || normalizedTitle.includes("mobile")) {
    return {
      steps: [
        "🎯 WHAT IS MOBILE PERFORMANCE ISSUE: Your site is slow on phones/tablets",
        "📊 PERFORMANCE IMPACT: Mobile users have less patience and slower connections",
        "🔧 IDENTIFY: Test on real devices or Chrome DevTools mobile simulation",
        "🔧 FIX IMAGES: Use responsive images with srcset for different screen sizes",
        "🔧 FIX JAVASCRIPT: Reduce JS execution time (mobile CPUs are slower)",
        "🔧 FIX NETWORK: Minimize requests and optimize for slower mobile networks",
        "✅ RESULT: Your site loads fast even on slow phones with poor connections",
      ],
      difficulty: "Medium",
      timeRequired: "3-5 hours",
      tools: ["Mobile device testing", "Chrome DevTools mobile throttling"],
      resources: [{ title: "Mobile optimization guide", url: "#internal-mobile-diagnostic" }],
    };
  }

  if (
    normalizedTitle.includes("passive listeners") ||
    normalizedTitle.includes("event listeners")
  ) {
    return {
      steps: [
        "🎯 WHAT ARE PASSIVE LISTENER ISSUES: Touch/scroll events block the main thread",
        "📊 PERFORMANCE IMPACT: Scrolling feels janky and unresponsive",
        "🔧 IDENTIFY: Check Chrome DevTools Console for passive listener warnings",
        "🔧 FIX EVENTS: Add {passive: true} to touch/wheel event listeners",
        '🔧 FIX CODE: Change addEventListener("touchstart", fn) to addEventListener("touchstart", fn, {passive: true})',
        "🔧 FIX CSS: Use touch-action CSS property for custom touch behaviors",
        "✅ RESULT: Scrolling and touch interactions become buttery smooth",
      ],
      difficulty: "Easy",
      timeRequired: "30-60 minutes",
      tools: ["Event listener APIs", "Touch-action CSS"],
      resources: [{ title: "Passive listener guide", url: "#internal-passive-diagnostic" }],
    };
  }

  if (normalizedTitle.includes("dom size") || normalizedTitle.includes("excessive dom")) {
    return {
      steps: [
        "🎯 WHAT IS DOM SIZE ISSUE: Your page has too many HTML elements",
        "📊 PERFORMANCE IMPACT: Large DOM slows down every JavaScript operation",
        '🔧 IDENTIFY: Run document.querySelectorAll("*").length in console (should be <1,500)',
        "🔧 FIX CLEANUP: Remove unused HTML elements and empty containers",
        "🔧 FIX LISTS: Use virtual scrolling for long lists instead of rendering all items",
        '🔧 FIX PAGINATION: Implement "load more" instead of showing all data at once',
        "✅ RESULT: Your page handles JavaScript operations much faster",
      ],
      difficulty: "Medium",
      timeRequired: "2-4 hours",
      tools: ["DOM analysis tools", "Virtual scrolling libraries"],
      resources: [{ title: "DOM optimization guide", url: "#internal-dom-diagnostic" }],
    };
  }

  // Default fallback with more specific guidance
  return {
    steps: [
      "🎯 WHAT THIS DIAGNOSTIC MEANS: This issue is affecting your page performance",
      "📊 PERFORMANCE IMPACT: Slower pages rank lower in Google and lose more visitors",
      "🔧 ANALYZE: Use Chrome DevTools → Performance tab to record and analyze the issue",
      "🔧 RESEARCH: Search for the specific diagnostic name to find targeted solutions",
      "🔧 IMPLEMENT: Apply fixes incrementally and test each change",
      "🔧 VALIDATE: Re-run the audit to confirm the diagnostic is resolved",
      "✅ RESULT: Your site will perform better and provide superior user experience",
    ],
    difficulty: "Medium",
    timeRequired: "1-3 hours",
    tools: ["Chrome DevTools", "Performance monitoring tools"],
    resources: [{ title: "Performance diagnostic guide", url: "https://web.dev/performance/" }],
  };
};

export const PerformanceDiagnostics = ({ diagnostics }: Props) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  if (!diagnostics || diagnostics.length === 0) return null;

  // Convert string diagnostics to objects
  const normalizedDiagnostics = diagnostics.map((d, i) => {
    if (typeof d === "string") {
      return {
        title: d,
        description: null,
        displayValue: null,
        implementation: getImplementationDetails(d),
      };
    }
    return {
      ...d,
      implementation: d.implementation || getImplementationDetails(d.title || ""),
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
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400";
    }
  };

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 border-2 border-orange-200 dark:border-orange-700">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold flex items-center gap-3 text-orange-900 dark:text-orange-100">
          <div className="p-2 bg-orange-500 rounded-lg">
            <Settings className="h-5 w-5 text-white" />
          </div>
          Performance Diagnostics ({normalizedDiagnostics.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {normalizedDiagnostics.map((d, i) => {
            const isExpanded = expandedItems.has(i);
            const implementation = d.implementation!;

            return (
              <div
                key={i}
                className="border border-orange-200 dark:border-orange-700 rounded-xl overflow-hidden bg-white dark:bg-slate-700"
              >
                <button
                  onClick={() => toggleExpanded(i)}
                  className="w-full flex items-start gap-4 p-4 text-left hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
                >
                  <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-orange-900 dark:text-orange-100 text-base">
                        {d.title || `Diagnostic ${i + 1}`}
                      </h4>
                      <div className="flex items-center gap-2">
                        {d.displayValue && (
                          <Badge
                            variant="secondary"
                            className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200"
                          >
                            {d.displayValue}
                          </Badge>
                        )}
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-orange-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-orange-500" />
                        )}
                      </div>
                    </div>

                    {d.description && (
                      <p className="text-sm text-orange-700 dark:text-orange-200 mb-2">
                        {d.description}
                      </p>
                    )}

                    <div className="flex items-center gap-3 text-xs">
                      <span
                        className={`px-2 py-1 rounded-full font-medium ${getDifficultyColor(implementation.difficulty)}`}
                      >
                        {implementation.difficulty}
                      </span>
                      <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                        <Clock className="h-3 w-3" />
                        <span className="font-medium">{implementation.timeRequired}</span>
                      </div>
                      <span className="text-orange-600 dark:text-orange-400 font-medium">
                        Click to see how to fix
                      </span>
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-orange-200 dark:border-orange-700 bg-orange-50 dark:bg-slate-600 p-4">
                    <div className="space-y-4">
                      {/* Implementation Steps */}
                      <div>
                        <h5 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                          <Code className="h-4 w-4 text-green-500" />
                          How to Fix This Issue
                        </h5>
                        <ol className="space-y-2">
                          {implementation.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex items-start gap-3">
                              <span className="bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                {stepIndex + 1}
                              </span>
                              <span className="text-sm text-slate-800 dark:text-slate-100">
                                {step}
                              </span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Integrated Analysis - No External Tools */}
                      {implementation.tools && (
                        <div>
                          <h5 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                            <div className="w-5 h-5 bg-orange-500 rounded text-white text-xs flex items-center justify-center">
                              🔍
                            </div>
                            Our Analysis Tools
                          </h5>
                          <div className="p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg">
                            <p className="text-sm text-orange-800 dark:text-orange-200 mb-2">
                              <strong>🎯 Integrated Diagnostics:</strong> We’ve identified this
                              issue using our comprehensive analysis engine.
                            </p>
                            <p className="text-sm text-orange-700 dark:text-orange-300">
                              <strong>⚙️ No External Tools Needed:</strong> Follow the steps above
                              with our built-in guidance and monitoring.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Internal Support - No External Resources */}
                      <div>
                        <h5 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
                          <div className="w-5 h-5 bg-purple-500 rounded text-white text-xs flex items-center justify-center">
                            📚
                          </div>
                          Get Help & Track Progress
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg">
                            <p className="text-sm text-purple-800 dark:text-purple-200 font-medium mb-1">
                              🛠️ Need Help?
                            </p>
                            <p className="text-xs text-purple-700 dark:text-purple-300">
                              Contact our support team for implementation guidance specific to your
                              site.
                            </p>
                          </div>
                          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                            <p className="text-sm text-blue-800 dark:text-blue-200 font-medium mb-1">
                              📊 Measure Results
                            </p>
                            <p className="text-xs text-blue-700 dark:text-blue-300">
                              Re-audit your site after implementing fixes to track performance
                              improvements.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
