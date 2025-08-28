import { 
  Zap, 
  Brain, 
  Target, 
  TrendingUp, 
  Shield, 
  Clock, 
  BarChart3, 
  Search 
} from "lucide-react"

export interface Feature {
  id: string
  iconName: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  benefit: string
  details: string
  imageSrc?: string
}

export const features: Feature[] = [
  {
    id: "ai-powered-analysis",
    iconName: "Brain",
    icon: Brain,
    title: "AI-Powered Analysis",
    benefit: "Get insights that human auditors miss",
    details: "Our advanced AI analyzes over 200+ ranking factors, identifying critical issues and opportunities that traditional tools overlook. Machine learning algorithms continuously improve accuracy based on real-world ranking correlations.",
    imageSrc: "/features/ai-analysis.png"
  },
  {
    id: "instant-results",
    iconName: "Zap",
    icon: Zap,
    title: "3-Minute Audits",
    benefit: "Complete comprehensive audits in minutes, not hours",
    details: "Skip the waiting. Our distributed analysis engine processes your entire website simultaneously, delivering actionable insights in under 3 minutes. No more scheduling lengthy manual reviews or waiting days for results.",
    imageSrc: "/features/instant-results.png"
  },
  {
    id: "actionable-priorities",
    iconName: "Target",
    icon: Target,
    title: "Priority-Based Fixes",
    benefit: "Focus on changes that actually move rankings",
    details: "Every recommendation is ranked by impact potential and implementation effort. Our priority matrix helps you tackle high-impact, low-effort wins first, maximizing your ROI on SEO improvements.",
    imageSrc: "/features/priority-fixes.png"
  },
  {
    id: "traffic-predictions",
    iconName: "TrendingUp",
    icon: TrendingUp,
    title: "Traffic Impact Forecasts",
    benefit: "See potential traffic gains before implementing",
    details: "Predictive modeling estimates traffic increases for each recommended fix. Know which optimizations will drive the most organic growth, backed by data from millions of websites in our database.",
    imageSrc: "/features/traffic-forecast.png"
  },
  {
    id: "competitor-analysis",
    iconName: "Search",
    icon: Search,
    title: "Competitive Intelligence", 
    benefit: "Discover what top competitors are doing right",
    details: "Automated competitor audits reveal the SEO strategies driving their success. Identify content gaps, technical advantages, and ranking opportunities you're missing compared to industry leaders.",
    imageSrc: "/features/competitor-analysis.png"
  },
  {
    id: "technical-depth",
    iconName: "Shield",
    icon: Shield,
    title: "Technical SEO Scanner",
    benefit: "Catch technical issues killing your rankings",
    details: "Deep crawl analysis identifies critical technical problems: crawl errors, duplicate content, slow loading pages, mobile issues, and schema markup problems. Fix the foundation first.",
    imageSrc: "/features/technical-seo.png"
  },
  {
    id: "real-time-monitoring",
    iconName: "BarChart3",
    icon: BarChart3,
    title: "Progress Tracking",
    benefit: "Monitor improvements with before/after metrics",
    details: "Track your SEO progress with detailed before-and-after comparisons. Visual dashboards show ranking improvements, traffic growth, and technical health scores over time.",
    imageSrc: "/features/progress-tracking.png"
  },
  {
    id: "implementation-guide",
    iconName: "Clock",
    icon: Clock,
    title: "Step-by-Step Guides",
    benefit: "Get detailed instructions, not just problem lists",
    details: "Every issue comes with clear, actionable implementation guides. No more guessing how to fix problems - get specific instructions, code examples, and best practices for each recommendation.",
    imageSrc: "/features/implementation-guide.png"
  }
]
