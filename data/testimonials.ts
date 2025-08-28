export interface Testimonial {
  id: string
  name: string
  title: string
  company: string
  companyLogo: string
  avatar: string
  rating: number
  quote: string
  metric: {
    value: string
    description: string
  }
  category: 'agency' | 'smb' | 'ecommerce' | 'saas'
  caseStudy?: {
    beforeMetric: string
    afterMetric: string
    improvement: string
    timeframe: string
    link: string // placeholder for now
  }
}

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Sarah Chen",
    title: "SEO Director",
    company: "Digital Growth Agency",
    companyLogo: "/testimonials/logos/digital-growth.svg",
    avatar: "/testimonials/avatars/sarah-chen.jpg",
    rating: 5,
    quote: "AISEOTurbo reduced our audit time from 6 hours to 20 minutes. Our team can now handle 3x more clients with the same resources.",
    metric: {
      value: "300%",
      description: "increase in client capacity"
    },
    category: "agency",
    caseStudy: {
      beforeMetric: "6 hours per audit",
      afterMetric: "20 minutes per audit",
      improvement: "95% time reduction",
      timeframe: "Within 30 days",
      link: "/case-studies/digital-growth-agency"
    }
  },
  {
    id: "testimonial-2",
    name: "Marcus Rodriguez",
    title: "Founder & CEO",
    company: "TechFlow Solutions",
    companyLogo: "/testimonials/logos/techflow.svg",
    avatar: "/testimonials/avatars/marcus-rodriguez.jpg",
    rating: 5,
    quote: "We increased organic traffic by 180% in 4 months following AISeOTurbo's actionable recommendations. Game-changing insights.",
    metric: {
      value: "180%",
      description: "organic traffic growth"
    },
    category: "smb",
    caseStudy: {
      beforeMetric: "2.5K monthly visits",
      afterMetric: "7K monthly visits",
      improvement: "180% traffic increase",
      timeframe: "4 months",
      link: "/case-studies/techflow-solutions"
    }
  },
  {
    id: "testimonial-3",
    name: "Emma Thompson",
    title: "Head of Marketing",
    company: "StyleCraft Boutique",
    companyLogo: "/testimonials/logos/stylecraft.svg",
    avatar: "/testimonials/avatars/emma-thompson.jpg",
    rating: 5,
    quote: "Our e-commerce sales jumped 85% after implementing the technical SEO fixes. The ROI was immediate and measurable.",
    metric: {
      value: "85%",
      description: "e-commerce sales increase"
    },
    category: "ecommerce",
    caseStudy: {
      beforeMetric: "$45K monthly revenue",
      afterMetric: "$83K monthly revenue",
      improvement: "85% revenue growth",
      timeframe: "3 months",
      link: "/case-studies/stylecraft-boutique"
    }
  },
  {
    id: "testimonial-4",
    name: "David Park",
    title: "Growth Marketing Manager",
    company: "CloudSync Pro",
    companyLogo: "/testimonials/logos/cloudsync.svg",
    avatar: "/testimonials/avatars/david-park.jpg",
    rating: 5,
    quote: "AISeOTurbo identified critical Core Web Vitals issues that our dev team missed. Page speed improved 60% and conversions followed.",
    metric: {
      value: "60%",
      description: "page speed improvement"
    },
    category: "saas",
    caseStudy: {
      beforeMetric: "4.2s load time",
      afterMetric: "1.7s load time",
      improvement: "60% speed increase",
      timeframe: "6 weeks",
      link: "/case-studies/cloudsync-pro"
    }
  },
  {
    id: "testimonial-5",
    name: "Lisa Morgan",
    title: "Digital Marketing Director",
    company: "Peak Performance Agency",
    companyLogo: "/testimonials/logos/peak-performance.svg",
    avatar: "/testimonials/avatars/lisa-morgan.jpg",
    rating: 5,
    quote: "The competitive analysis feature helped us steal 40% market share from competitors. Our clients love the detailed reports.",
    metric: {
      value: "40%",
      description: "market share gained"
    },
    category: "agency",
    caseStudy: {
      beforeMetric: "15% market visibility",
      afterMetric: "55% market visibility",
      improvement: "40% share increase",
      timeframe: "5 months",
      link: "/case-studies/peak-performance"
    }
  },
  {
    id: "testimonial-6",
    name: "Alex Kim",
    title: "E-commerce Manager",
    company: "GearHub Pro",
    companyLogo: "/testimonials/logos/gearhub.svg",
    avatar: "/testimonials/avatars/alex-kim.jpg",
    rating: 5,
    quote: "Product page optimization suggestions increased our conversion rate by 45%. Every recommendation was data-driven and actionable.",
    metric: {
      value: "45%",
      description: "conversion rate boost"
    },
    category: "ecommerce",
    caseStudy: {
      beforeMetric: "2.1% conversion rate",
      afterMetric: "3.8% conversion rate",
      improvement: "45% conversion boost",
      timeframe: "2 months",
      link: "/case-studies/gearhub-pro"
    }
  }
]

// Helper function to get testimonials by category
export const getTestimonialsByCategory = (category: Testimonial['category']) => {
  return testimonials.filter(testimonial => testimonial.category === category)
}

// Helper function to get testimonials with case studies
export const getTestimonialsWithCaseStudies = () => {
  return testimonials.filter(testimonial => testimonial.caseStudy)
}
