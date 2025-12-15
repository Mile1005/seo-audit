export interface SampleAuditData {
  url: string;
  type: "ecommerce" | "blog" | "corporate";
  overallScore: number;
  categories: {
    name: string;
    score: number;
    color: string;
    issues: number;
    description: string;
  }[];
  keyIssues: {
    severity: "critical" | "warning" | "info";
    title: string;
    impact: string;
    timeToFix: string;
  }[];
  metrics: {
    pageSpeed: number;
    coreWebVitals: number;
    mobileScore: number;
    seoScore: number;
  };
  opportunities: {
    title: string;
    potentialTraffic: string;
    difficulty: "Easy" | "Medium" | "Hard";
  }[];
}

export const sampleAudits: SampleAuditData[] = [
  {
    url: "example-store.com",
    type: "ecommerce",
    overallScore: 72,
    categories: [
      {
        name: "Technical SEO",
        score: 68,
        color: "#f59e0b",
        issues: 12,
        description: "Critical crawling and indexing issues found",
      },
      {
        name: "Content Quality",
        score: 85,
        color: "#10b981",
        issues: 3,
        description: "Strong product descriptions, minor optimization needed",
      },
      {
        name: "Page Speed",
        score: 58,
        color: "#ef4444",
        issues: 8,
        description: "Slow loading times affecting user experience",
      },
      {
        name: "Mobile Experience",
        score: 79,
        color: "#10b981",
        issues: 4,
        description: "Mobile-friendly with room for improvement",
      },
    ],
    keyIssues: [
      {
        severity: "critical",
        title: "Missing meta descriptions on 47 product pages",
        impact: "Could increase CTR by 15-20%",
        timeToFix: "2 hours",
      },
      {
        severity: "critical",
        title: "Slow server response time (3.2s average)",
        impact: "Reducing bounce rate by 25%",
        timeToFix: "1 day",
      },
      {
        severity: "warning",
        title: "Images without alt text",
        impact: "Better accessibility and image SEO",
        timeToFix: "4 hours",
      },
    ],
    metrics: {
      pageSpeed: 58,
      coreWebVitals: 62,
      mobileScore: 79,
      seoScore: 72,
    },
    opportunities: [
      {
        title: "Optimize product schema markup",
        potentialTraffic: "+2,400 monthly visits",
        difficulty: "Easy",
      },
      {
        title: "Fix internal linking structure",
        potentialTraffic: "+1,800 monthly visits",
        difficulty: "Medium",
      },
      {
        title: "Improve category page optimization",
        potentialTraffic: "+3,200 monthly visits",
        difficulty: "Medium",
      },
    ],
  },
  {
    url: "awesome-blog.com",
    type: "blog",
    overallScore: 84,
    categories: [
      {
        name: "Technical SEO",
        score: 92,
        color: "#10b981",
        issues: 2,
        description: "Excellent technical foundation",
      },
      {
        name: "Content Quality",
        score: 88,
        color: "#10b981",
        issues: 5,
        description: "High-quality content with minor gaps",
      },
      {
        name: "Page Speed",
        score: 76,
        color: "#f59e0b",
        issues: 6,
        description: "Good performance, some optimization needed",
      },
      {
        name: "Mobile Experience",
        score: 81,
        color: "#10b981",
        issues: 3,
        description: "Mobile-optimized with minor issues",
      },
    ],
    keyIssues: [
      {
        severity: "warning",
        title: "Missing featured snippets optimization",
        impact: "Could capture 12 featured snippets",
        timeToFix: "3 hours",
      },
      {
        severity: "warning",
        title: "Outdated content needs refreshing",
        impact: "Improve rankings for 15 articles",
        timeToFix: "2 days",
      },
      {
        severity: "info",
        title: "Add FAQ sections to posts",
        impact: "Better user engagement and SEO",
        timeToFix: "1 day",
      },
    ],
    metrics: {
      pageSpeed: 76,
      coreWebVitals: 81,
      mobileScore: 81,
      seoScore: 84,
    },
    opportunities: [
      {
        title: "Target long-tail keywords",
        potentialTraffic: "+5,600 monthly visits",
        difficulty: "Easy",
      },
      {
        title: "Internal linking optimization",
        potentialTraffic: "+2,100 monthly visits",
        difficulty: "Easy",
      },
      {
        title: "Featured snippet optimization",
        potentialTraffic: "+4,300 monthly visits",
        difficulty: "Medium",
      },
    ],
  },
  {
    url: "corporate-site.com",
    type: "corporate",
    overallScore: 65,
    categories: [
      {
        name: "Technical SEO",
        score: 71,
        color: "#f59e0b",
        issues: 9,
        description: "Some technical issues need attention",
      },
      {
        name: "Content Quality",
        score: 58,
        color: "#ef4444",
        issues: 15,
        description: "Content needs significant improvement",
      },
      {
        name: "Page Speed",
        score: 69,
        color: "#f59e0b",
        issues: 7,
        description: "Moderate performance issues",
      },
      {
        name: "Mobile Experience",
        score: 73,
        color: "#f59e0b",
        issues: 8,
        description: "Mobile experience needs optimization",
      },
    ],
    keyIssues: [
      {
        severity: "critical",
        title: "Thin content on service pages",
        impact: "Low-value pages hurting domain authority",
        timeToFix: "1 week",
      },
      {
        severity: "critical",
        title: "No local SEO optimization",
        impact: "Missing local search opportunities",
        timeToFix: "3 days",
      },
      {
        severity: "warning",
        title: "Outdated copyright and contact info",
        impact: "Affects trust and local rankings",
        timeToFix: "1 hour",
      },
    ],
    metrics: {
      pageSpeed: 69,
      coreWebVitals: 71,
      mobileScore: 73,
      seoScore: 65,
    },
    opportunities: [
      {
        title: "Local SEO optimization",
        potentialTraffic: "+3,800 monthly visits",
        difficulty: "Easy",
      },
      {
        title: "Industry-specific content creation",
        potentialTraffic: "+6,200 monthly visits",
        difficulty: "Hard",
      },
      {
        title: "Technical page improvements",
        potentialTraffic: "+2,900 monthly visits",
        difficulty: "Medium",
      },
    ],
  },
];

export const progressSteps = [
  { name: "Crawling website", duration: 1200 },
  { name: "Analyzing technical SEO", duration: 800 },
  { name: "Checking page speed", duration: 600 },
  { name: "Evaluating content quality", duration: 900 },
  { name: "Scanning mobile experience", duration: 700 },
  { name: "Generating recommendations", duration: 500 },
];
