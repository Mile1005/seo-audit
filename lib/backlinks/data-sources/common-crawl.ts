/**
 * Common Crawl Data Provider
 * 
 * Fetches backlinks from Common Crawl's massive web archive
 * - 250+ billion web pages indexed
 * - Completely FREE (no API key needed)
 * - Updated monthly with fresh crawls
 * - 3.5+ petabytes of data
 * 
 * Documentation: https://commoncrawl.org/
 */

import { BacklinkData } from '../types'
import * as cheerio from 'cheerio'

export class CommonCrawlProvider {
  // Latest Common Crawl index (update monthly)
  private readonly indexes = [
    'CC-MAIN-2024-38', // October 2024
    'CC-MAIN-2024-33', // August 2024
    'CC-MAIN-2024-26', // June 2024
  ]
  
  private readonly baseUrl = 'https://index.commoncrawl.org'
  private readonly dataUrl = 'https://data.commoncrawl.org'
  
  /**
   * Find backlinks to a target domain using Common Crawl index
   */
  async findBacklinks(
    targetDomain: string,
    options: {
      limit?: number
      recentOnly?: boolean
    } = {}
  ): Promise<BacklinkData[]> {
    const limit = options.limit || 100
    const backlinks: BacklinkData[] = []
    
    try {
      console.log(`🔍 [CommonCrawl] Searching for backlinks to ${targetDomain}...`)
      
      // Use most recent index by default, or multiple for comprehensive results
      const indexesToSearch = options.recentOnly ? [this.indexes[0]] : this.indexes.slice(0, 2)
      
      for (const index of indexesToSearch) {
        if (backlinks.length >= limit) break
        
        const indexBacklinks = await this.searchIndex(index, targetDomain, limit - backlinks.length)
        backlinks.push(...indexBacklinks)
        
        console.log(`✓ Found ${indexBacklinks.length} backlinks in ${index}`)
      }
      
      console.log(`✅ [CommonCrawl] Total found: ${backlinks.length} backlinks`)
      return backlinks
      
    } catch (error) {
      console.error('❌ [CommonCrawl] Error:', error)
      return []
    }
  }
  
  /**
   * Search a specific Common Crawl index
   */
  private async searchIndex(
    index: string,
    targetDomain: string,
    limit: number
  ): Promise<BacklinkData[]> {
    const backlinks: BacklinkData[] = []
    
    try {
      // Query the CDX index for URLs containing the target domain
      const queries = [
        `*.${targetDomain}/*`,
        `*${targetDomain}*`,
      ]
      
      for (const query of queries) {
        if (backlinks.length >= limit) break
        
        const indexUrl = `${this.baseUrl}/${index}-index?url=${encodeURIComponent(query)}&output=json&limit=${limit}`
        
        const response = await fetch(indexUrl, {
          headers: {
            'User-Agent': 'SEO-Audit-Tool/1.0 (+https://seo-audit.com)',
            'Accept': 'application/json'
          },
          signal: AbortSignal.timeout(30000) // 30 second timeout
        })
        
        if (!response.ok) {
          console.warn(`⚠️ [CommonCrawl] HTTP ${response.status} for ${query}`)
          continue
        }
        
        const text = await response.text()
        const lines = text.trim().split('\n')
        
        for (const line of lines) {
          if (!line.trim() || backlinks.length >= limit) break
          
          try {
            const record = JSON.parse(line)
            const warc_record = await this.fetchWarcRecord(record)
            
            if (warc_record) {
              const links = this.extractBacklinksFromHTML(
                warc_record.html,
                warc_record.url,
                targetDomain
              )
              backlinks.push(...links)
            }
          } catch (parseError) {
            // Skip invalid JSON lines
            continue
          }
        }
      }
      
    } catch (error) {
      console.error(`❌ [CommonCrawl] Error searching index ${index}:`, error)
    }
    
    return backlinks
  }
  
  /**
   * Fetch WARC record to get actual HTML content
   */
  private async fetchWarcRecord(record: any): Promise<{ url: string; html: string } | null> {
    try {
      const { filename, offset, length } = record
      
      if (!filename || !offset || !length) {
        return null
      }
      
      const url = `${this.dataUrl}/${filename}`
      const rangeEnd = parseInt(offset) + parseInt(length) - 1
      
      const response = await fetch(url, {
        headers: {
          'Range': `bytes=${offset}-${rangeEnd}`,
          'User-Agent': 'SEO-Audit-Tool/1.0'
        },
        signal: AbortSignal.timeout(15000) // 15 second timeout
      })
      
      if (!response.ok) {
        return null
      }
      
      const warcContent = await response.text()
      
      // Extract HTML from WARC record
      // WARC format has headers, then HTTP headers, then HTML content
      const htmlMatch = warcContent.split('\r\n\r\n')
      const html = htmlMatch[htmlMatch.length - 1] // Last part is HTML
      
      return {
        url: record.url,
        html
      }
      
    } catch (error) {
      // Skip failed WARC fetches silently (common due to network issues)
      return null
    }
  }
  
  /**
   * Extract backlinks from HTML content
   */
  private extractBacklinksFromHTML(
    html: string,
    sourceUrl: string,
    targetDomain: string
  ): BacklinkData[] {
    const backlinks: BacklinkData[] = []
    
    try {
      const $ = cheerio.load(html)
      const sourceDomain = this.extractDomain(sourceUrl)
      
      // Find all links
      $('a[href]').each((_, element) => {
        const href = $(element).attr('href')
        
        if (!href) return
        
        // Check if link points to target domain
        if (this.isBacklinkToTarget(href, targetDomain)) {
          const anchorText = $(element).text().trim()
          const rel = $(element).attr('rel') || ''
          const context = this.getContext($, element)
          const linkPosition = this.detectLinkPosition($, element)
          
          backlinks.push({
            id: this.generateId(),
            sourceUrl,
            sourceDomain,
            targetUrl: this.normalizeUrl(href, sourceUrl),
            anchorText: anchorText || null,
            linkType: rel.includes('nofollow') ? 'NOFOLLOW' : 'FOLLOW',
            status: 'ACTIVE',
            isToxic: false,
            toxicScore: 0,
            linkPosition,
            context,
            isNofollow: rel.includes('nofollow'),
            isSponsored: rel.includes('sponsored'),
            isUGC: rel.includes('ugc'),
            firstSeen: new Date(),
            lastSeen: new Date()
          })
        }
      })
      
    } catch (error) {
      // Skip HTML parsing errors
    }
    
    return backlinks
  }
  
  /**
   * Check if URL is a backlink to target domain
   */
  private isBacklinkToTarget(href: string, targetDomain: string): boolean {
    const lowerHref = href.toLowerCase()
    const lowerTarget = targetDomain.toLowerCase()
    
    return (
      lowerHref.includes(lowerTarget) ||
      lowerHref.includes(`//${lowerTarget}`) ||
      lowerHref.includes(`www.${lowerTarget}`)
    )
  }
  
  /**
   * Get context text around the link
   */
  private getContext($: any, element: any): string {
    const parent = $(element).parent()
    const text = parent.text().trim()
    
    // Get 200 chars around the link
    const linkText = $(element).text()
    const index = text.indexOf(linkText)
    
    if (index === -1) return text.slice(0, 200)
    
    const start = Math.max(0, index - 100)
    const end = Math.min(text.length, index + linkText.length + 100)
    
    return text.slice(start, end)
  }
  
  /**
   * Detect link position in page (content, footer, nav, etc)
   */
  private detectLinkPosition($: any, element: any): 'content' | 'footer' | 'sidebar' | 'nav' | 'comment' | 'other' {
    const parents = $(element).parents()
    
    // Check parent elements for position clues
    if (parents.is('footer, .footer')) return 'footer'
    if (parents.is('nav, header, .header, .navigation')) return 'nav'
    if (parents.is('aside, .sidebar, .widget')) return 'sidebar'
    if (parents.is('article, main, .content, .post, .entry')) return 'content'
    if (parents.is('.comment, .comments, #comments')) return 'comment'
    
    return 'other'
  }
  
  /**
   * Extract domain from URL
   */
  private extractDomain(url: string): string {
    try {
      const parsed = new URL(url)
      return parsed.hostname.replace(/^www\./, '')
    } catch {
      return ''
    }
  }
  
  /**
   * Normalize URL (handle relative URLs)
   */
  private normalizeUrl(href: string, baseUrl: string): string {
    try {
      return new URL(href, baseUrl).toString()
    } catch {
      return href
    }
  }
  
  /**
   * Generate unique ID for backlink
   */
  private generateId(): string {
    return `bl_cc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
}
