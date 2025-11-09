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
    title: "home.features.cards.ai-powered-analysis.title",
    benefit: "home.features.cards.ai-powered-analysis.benefit",
    details: "home.features.cards.ai-powered-analysis.details",
    imageSrc: "/features/ai-analysis.png"
  },
  {
    id: "instant-results",
    iconName: "Zap",
    icon: Zap,
    title: "home.features.cards.instant-results.title",
    benefit: "home.features.cards.instant-results.benefit",
    details: "home.features.cards.instant-results.details",
    imageSrc: "/features/instant-results.png"
  },
  {
    id: "actionable-priorities",
    iconName: "Target",
    icon: Target,
    title: "home.features.cards.actionable-priorities.title",
    benefit: "home.features.cards.actionable-priorities.benefit",
    details: "home.features.cards.actionable-priorities.details",
    imageSrc: "/features/priority-fixes.png"
  },
  {
    id: "traffic-predictions",
    iconName: "TrendingUp",
    icon: TrendingUp,
    title: "home.features.cards.traffic-predictions.title",
    benefit: "home.features.cards.traffic-predictions.benefit",
    details: "home.features.cards.traffic-predictions.details",
    imageSrc: "/features/traffic-forecast.png"
  },
  {
    id: "competitor-analysis",
    iconName: "Search",
    icon: Search,
    title: "home.features.cards.competitor-analysis.title",
    benefit: "home.features.cards.competitor-analysis.benefit",
    details: "home.features.cards.competitor-analysis.details",
    imageSrc: "/features/competitor-analysis.png"
  },
  {
    id: "technical-depth",
    iconName: "Shield",
    icon: Shield,
    title: "home.features.cards.technical-depth.title",
    benefit: "home.features.cards.technical-depth.benefit",
    details: "home.features.cards.technical-depth.details",
    imageSrc: "/features/technical-seo.png"
  },
  {
    id: "real-time-monitoring",
    iconName: "BarChart3",
    icon: BarChart3,
    title: "home.features.cards.real-time-monitoring.title",
    benefit: "home.features.cards.real-time-monitoring.benefit",
    details: "home.features.cards.real-time-monitoring.details",
    imageSrc: "/features/progress-tracking.png"
  },
  {
    id: "implementation-guide",
    iconName: "Clock",
    icon: Clock,
    title: "home.features.cards.implementation-guide.title",
    benefit: "home.features.cards.implementation-guide.benefit",
    details: "home.features.cards.implementation-guide.details",
    imageSrc: "/features/implementation-guide.png"
  }
]
