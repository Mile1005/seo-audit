export interface PricingPlan {
  id: string
  name: string
  description: string
  priceMonthly: number
  priceAnnual: number
  features: string[]
  limits: {
    audits: string
    sites: string
    reports: string
    support: string
  }
  highlight?: boolean
  ctaText: string
  ctaVariant: 'primary' | 'secondary' | 'outline'
  popular?: boolean
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for trying out our SEO audit capabilities",
    priceMonthly: 0,
    priceAnnual: 0,
    features: [
      "3 comprehensive SEO audits per month",
      "Basic technical analysis",
      "Core Web Vitals check",
      "Meta tags optimization",
      "Basic keyword insights",
      "PDF report export",
      "Email support"
    ],
    limits: {
      audits: "3 per month",
      sites: "1 website",
      reports: "Basic reports",
      support: "Email support"
    },
    ctaText: "Start Free",
    ctaVariant: "outline"
  },
  {
    id: "pro",
    name: "Pro",
    description: "Advanced features for growing businesses and SEO professionals",
    priceMonthly: 49,
    priceAnnual: 490, // ~17% savings
    features: [
      "Unlimited SEO audits",
      "Advanced technical analysis",
      "Competitor analysis",
      "Keyword rank tracking",
      "Content optimization suggestions",
      "Local SEO insights",
      "White-label reports",
      "API access",
      "Priority support",
      "Weekly automated reports"
    ],
    limits: {
      audits: "Unlimited",
      sites: "5 websites",
      reports: "Advanced reports",
      support: "Priority support"
    },
    highlight: true,
    popular: true,
    ctaText: "Start Pro Trial",
    ctaVariant: "primary"
  },
  {
    id: "agency",
    name: "Agency",
    description: "Enterprise solution for agencies and large teams",
    priceMonthly: 149,
    priceAnnual: 1490, // ~17% savings
    features: [
      "Everything in Pro",
      "Multi-client dashboard",
      "Team collaboration tools",
      "Custom branding",
      "Advanced integrations",
      "Dedicated account manager",
      "Custom reporting",
      "Phone & Slack support",
      "Training & onboarding",
      "SLA guarantees"
    ],
    limits: {
      audits: "Unlimited",
      sites: "Unlimited",
      reports: "Custom reports",
      support: "Dedicated support"
    },
    ctaText: "Contact Sales",
    ctaVariant: "secondary"
  }
]

export interface ROICalculatorInputs {
  monthlyVisits: number
  conversionRate: number
  averageOrderValue: number
}

export interface ROICalculatorResults {
  currentRevenue: number
  potentialIncrease: number
  projectedRevenue: number
  monthlyROI: number
  annualROI: number
  paybackPeriod: number
}

export const calculateROI = (inputs: ROICalculatorInputs, planPrice: number): ROICalculatorResults => {
  const { monthlyVisits, conversionRate, averageOrderValue } = inputs
  
  // Current monthly revenue
  const currentRevenue = monthlyVisits * (conversionRate / 100) * averageOrderValue
  
  // Conservative estimate: 25-40% traffic increase based on our testimonials data
  const trafficIncrease = 0.30 // 30% average increase
  const conversionImprovement = 0.15 // 15% conversion rate improvement
  
  const newVisits = monthlyVisits * (1 + trafficIncrease)
  const newConversionRate = conversionRate * (1 + conversionImprovement)
  
  const projectedRevenue = newVisits * (newConversionRate / 100) * averageOrderValue
  const potentialIncrease = projectedRevenue - currentRevenue
  
  const monthlyROI = potentialIncrease - planPrice
  const annualROI = (monthlyROI * 12)
  const paybackPeriod = planPrice / potentialIncrease // months to pay back investment
  
  return {
    currentRevenue,
    potentialIncrease,
    projectedRevenue,
    monthlyROI,
    annualROI,
    paybackPeriod
  }
}

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Helper function to calculate savings percentage
export const calculateSavings = (monthly: number, annual: number): number => {
  const monthlyTotal = monthly * 12
  return Math.round(((monthlyTotal - annual) / monthlyTotal) * 100)
}
