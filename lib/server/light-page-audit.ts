// Phase 10: lightweight page audit (subset)
// Extract meta title, description, headings, word count, images alt ratio, internal link count

export interface LightPageAuditResult {
  title?: string
  metaDescription?: string
  h1Count: number
  h2Count: number
  wordCount: number
  images: number
  imagesWithoutAlt: number
  internalLinkCount: number
}

export function lightPageAudit(html: string, origin: string): LightPageAuditResult {
  // naive regex/DOM hybrid using DOMParser via JSDOM-like fallback; to avoid heavy deps, crude extraction
  // If cheerio or JSDOM is added later, replace this.
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const title = doc.querySelector('title')?.textContent?.trim()
  const metaDescription = doc.querySelector('meta[name="description"]')?.getAttribute('content') || undefined
  const h1Count = doc.querySelectorAll('h1').length
  const h2Count = doc.querySelectorAll('h2').length
  const text = doc.body?.textContent || ''
  const wordCount = text.split(/\s+/).filter(Boolean).length
  const images = Array.from(doc.querySelectorAll('img'))
  const imagesWithoutAlt = images.filter(i=>!i.getAttribute('alt')).length
  const internalLinkCount = Array.from(doc.querySelectorAll('a'))
    .filter(a => {
      const href = a.getAttribute('href') || ''
      if (!href) return false
      if (href.startsWith('#')) return false
      try {
        const u = new URL(href, origin)
        return u.origin === origin
      } catch { return false }
    }).length
  return { title, metaDescription, h1Count, h2Count, wordCount, images: images.length, imagesWithoutAlt, internalLinkCount }
}
