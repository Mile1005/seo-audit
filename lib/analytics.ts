/**
 * Analytics and tracking utilities
 * Lightweight wrapper for GA4 with queue system and browser-only execution
 */

interface AnalyticsEvent {
  name: string
  parameters?: Record<string, any>
}

interface PageviewData {
  page_title?: string
  page_location?: string
  page_path?: string
}

// Queue for events before GA4 is ready
let eventQueue: AnalyticsEvent[] = []
let isInitialized = false

// Check if we're in browser and GA4 is available
const isClient = typeof window !== 'undefined'
const hasGtag = isClient && typeof window.gtag !== 'undefined'

/**
 * Initialize analytics tracking
 */
export function initAnalytics(measurementId: string) {
  if (!isClient) return

  // Load GA4 script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  // Initialize gtag
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }

  window.gtag('js', new Date())
  window.gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href,
  })

  // Process queued events
  eventQueue.forEach(event => {
    window.gtag('event', event.name, event.parameters)
  })
  eventQueue = []
  isInitialized = true
}

/**
 * Track page views
 */
export function pageview(data: PageviewData = {}) {
  if (!isClient) return

  const pageData = {
    page_title: data.page_title || document.title,
    page_location: data.page_location || window.location.href,
    page_path: data.page_path || window.location.pathname,
  }

  if (hasGtag && isInitialized) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, pageData)
  }
}

/**
 * Track custom events
 */
export function track(eventName: string, parameters: Record<string, any> = {}) {
  if (!isClient) return

  const event: AnalyticsEvent = {
    name: eventName,
    parameters: {
      ...parameters,
      timestamp: Date.now(),
      url: window.location.href,
      user_agent: navigator.userAgent,
    }
  }

  // Queue if not ready, otherwise send immediately
  if (hasGtag && isInitialized) {
    window.gtag('event', eventName, event.parameters)
  } else {
    eventQueue.push(event)
  }
}

/**
 * Track CTA clicks with enhanced data
 */
export function trackCTA(ctaText: string, location: string, additionalData: Record<string, any> = {}) {
  track('cta_click', {
    cta_text: ctaText,
    cta_location: location,
    ...additionalData
  })
}

/**
 * Track form submissions
 */
export function trackFormSubmission(formName: string, formData: Record<string, any> = {}) {
  track('form_submit', {
    form_name: formName,
    ...formData
  })
}

/**
 * Track user engagement milestones
 */
export function trackEngagement(action: string, value?: number) {
  track('engagement', {
    engagement_action: action,
    engagement_value: value,
  })
}

/**
 * Track demo interactions
 */
export function trackDemo(action: string, step?: string) {
  track('demo_interaction', {
    demo_action: action,
    demo_step: step,
  })
}

/**
 * Track scroll depth for content engagement
 */
export function trackScrollDepth(depth: number) {
  track('scroll_depth', {
    scroll_percentage: depth,
  })
}

// Declare global gtag types
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}
