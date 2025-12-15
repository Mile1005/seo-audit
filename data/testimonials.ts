export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  companyLogo: string;
  avatar: string;
  rating: number;
  quoteKey: string;
  metric: {
    value: string;
    descriptionKey: string;
  };
  category: "agency" | "smb" | "ecommerce" | "saas";
  caseStudy?: {
    beforeMetricKey: string;
    afterMetricKey: string;
    improvementKey: string;
    timeframeKey: string;
    link: string; // placeholder for now
  };
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
    quoteKey: "testimonialsData.testimonial-1.quote",
    metric: {
      value: "300%",
      descriptionKey: "testimonialsData.testimonial-1.metric.description",
    },
    category: "agency",
    caseStudy: {
      beforeMetricKey: "testimonialsData.testimonial-1.caseStudy.beforeMetric",
      afterMetricKey: "testimonialsData.testimonial-1.caseStudy.afterMetric",
      improvementKey: "testimonialsData.testimonial-1.caseStudy.improvement",
      timeframeKey: "testimonialsData.testimonial-1.caseStudy.timeframe",
      link: "/case-studies/digital-growth-agency",
    },
  },
  {
    id: "testimonial-2",
    name: "Marcus Rodriguez",
    title: "Founder & CEO",
    company: "TechFlow Solutions",
    companyLogo: "/testimonials/logos/techflow.svg",
    avatar: "/testimonials/avatars/marcus-rodriguez.jpg",
    rating: 5,
    quoteKey: "testimonialsData.testimonial-2.quote",
    metric: {
      value: "180%",
      descriptionKey: "testimonialsData.testimonial-2.metric.description",
    },
    category: "smb",
    caseStudy: {
      beforeMetricKey: "testimonialsData.testimonial-2.caseStudy.beforeMetric",
      afterMetricKey: "testimonialsData.testimonial-2.caseStudy.afterMetric",
      improvementKey: "testimonialsData.testimonial-2.caseStudy.improvement",
      timeframeKey: "testimonialsData.testimonial-2.caseStudy.timeframe",
      link: "/case-studies/techflow-solutions",
    },
  },
  {
    id: "testimonial-3",
    name: "Emma Thompson",
    title: "Head of Marketing",
    company: "StyleCraft Boutique",
    companyLogo: "/testimonials/logos/stylecraft.svg",
    avatar: "/testimonials/avatars/emma-thompson.jpg",
    rating: 5,
    quoteKey: "testimonialsData.testimonial-3.quote",
    metric: {
      value: "85%",
      descriptionKey: "testimonialsData.testimonial-3.metric.description",
    },
    category: "ecommerce",
    caseStudy: {
      beforeMetricKey: "testimonialsData.testimonial-3.caseStudy.beforeMetric",
      afterMetricKey: "testimonialsData.testimonial-3.caseStudy.afterMetric",
      improvementKey: "testimonialsData.testimonial-3.caseStudy.improvement",
      timeframeKey: "testimonialsData.testimonial-3.caseStudy.timeframe",
      link: "/case-studies/stylecraft-boutique",
    },
  },
  {
    id: "testimonial-4",
    name: "David Park",
    title: "Growth Marketing Manager",
    company: "CloudSync Pro",
    companyLogo: "/testimonials/logos/cloudsync.svg",
    avatar: "/testimonials/avatars/david-park.jpg",
    rating: 5,
    quoteKey: "testimonialsData.testimonial-4.quote",
    metric: {
      value: "60%",
      descriptionKey: "testimonialsData.testimonial-4.metric.description",
    },
    category: "saas",
    caseStudy: {
      beforeMetricKey: "testimonialsData.testimonial-4.caseStudy.beforeMetric",
      afterMetricKey: "testimonialsData.testimonial-4.caseStudy.afterMetric",
      improvementKey: "testimonialsData.testimonial-4.caseStudy.improvement",
      timeframeKey: "testimonialsData.testimonial-4.caseStudy.timeframe",
      link: "/case-studies/cloudsync-pro",
    },
  },
  {
    id: "testimonial-5",
    name: "Lisa Morgan",
    title: "Digital Marketing Director",
    company: "Peak Performance Agency",
    companyLogo: "/testimonials/logos/peak-performance.svg",
    avatar: "/testimonials/avatars/lisa-morgan.jpg",
    rating: 5,
    quoteKey: "testimonialsData.testimonial-5.quote",
    metric: {
      value: "40%",
      descriptionKey: "testimonialsData.testimonial-5.metric.description",
    },
    category: "agency",
    caseStudy: {
      beforeMetricKey: "testimonialsData.testimonial-5.caseStudy.beforeMetric",
      afterMetricKey: "testimonialsData.testimonial-5.caseStudy.afterMetric",
      improvementKey: "testimonialsData.testimonial-5.caseStudy.improvement",
      timeframeKey: "testimonialsData.testimonial-5.caseStudy.timeframe",
      link: "/case-studies/peak-performance",
    },
  },
  {
    id: "testimonial-6",
    name: "Alex Kim",
    title: "E-commerce Manager",
    company: "GearHub Pro",
    companyLogo: "/testimonials/logos/gearhub.svg",
    avatar: "/testimonials/avatars/alex-kim.jpg",
    rating: 5,
    quoteKey: "testimonialsData.testimonial-6.quote",
    metric: {
      value: "45%",
      descriptionKey: "testimonialsData.testimonial-6.metric.description",
    },
    category: "ecommerce",
    caseStudy: {
      beforeMetricKey: "testimonialsData.testimonial-6.caseStudy.beforeMetric",
      afterMetricKey: "testimonialsData.testimonial-6.caseStudy.afterMetric",
      improvementKey: "testimonialsData.testimonial-6.caseStudy.improvement",
      timeframeKey: "testimonialsData.testimonial-6.caseStudy.timeframe",
      link: "/case-studies/gearhub-pro",
    },
  },
];

// Helper function to get testimonials by category
export const getTestimonialsByCategory = (category: Testimonial["category"]) => {
  return testimonials.filter((testimonial) => testimonial.category === category);
};

// Helper function to get testimonials with case studies
export const getTestimonialsWithCaseStudies = () => {
  return testimonials.filter((testimonial) => testimonial.caseStudy);
};
