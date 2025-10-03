/**
 * Toxicity Detection Algorithm
 * 
 * Analyzes backlinks for potential spam and toxic indicators
 * Based on:
 * - Domain quality metrics
 * - Spam keyword detection
 * - Suspicious TLDs
 * - Link positioning
 * - Anchor text quality
 * - Link velocity patterns
 */

import { BacklinkData, ReferringDomainData, ToxicityScore } from '../types'

export class ToxicityAnalyzer {
  
  private readonly spamKeywords = [
    'casino', 'viagra', 'cialis', 'porn', 'xxx', 'adult', 'sex',
    'pills', 'pharmacy', 'drug', 'payday', 'loan', 'gambling',
    'poker', 'bet', 'forex', 'crypto', 'essay', 'dissertation',
    'replica', 'fake', 'cheap', 'discount', 'seo', 'backlink',
    'link-building', 'guest-post', 'buy-link'
  ]
  
  private readonly suspiciousTLDs = [
    '.xyz', '.top', '.loan', '.work', '.click', '.download',
    '.stream', '.science', '.racing', '.party', '.gq', '.cf',
    '.ml', '.ga', '.tk', '.pw', '.cc', '.ws'
  ]
  
  private readonly spamAnchors = [
    'click here', 'buy now', 'cheap', 'discount', 'free',
    'make money', 'earn money', 'work from home', 'get rich',
    'lose weight', 'best price', 'limited offer'
  ]
  
  /**
   * Calculate comprehensive toxicity score for a backlink
   */
  calculateToxicity(
    backlink: BacklinkData,
    domain?: ReferringDomainData
  ): ToxicityScore {
    const breakdown = {
      domainQuality: this.scoreDomainQuality(backlink, domain),
      spamIndicators: this.scoreSpamIndicators(backlink, domain),
      suspiciousTLD: this.scoreSuspiciousTLD(backlink.sourceDomain),
      linkPosition: this.scoreLinkPosition(backlink.linkPosition),
      anchorText: this.scoreAnchorText(backlink.anchorText)
    }
    
    // Calculate overall score (0-100)
    const overall = Math.min(
      breakdown.domainQuality +
      breakdown.spamIndicators +
      breakdown.suspiciousTLD +
      breakdown.linkPosition +
      breakdown.anchorText,
      100
    )
    
    // Classify toxicity level
    const classification = this.classifyToxicity(overall)
    
    // Generate reasons
    const reasons = this.generateReasons(breakdown, backlink, domain)
    
    return {
      overall,
      breakdown,
      classification,
      reasons
    }
  }
  
  /**
   * Batch analyze multiple backlinks
   */
  analyzeBatch(
    backlinks: BacklinkData[],
    domains?: Map<string, ReferringDomainData>
  ): Map<string, ToxicityScore> {
    const results = new Map<string, ToxicityScore>()
    
    for (const backlink of backlinks) {
      const domain = domains?.get(backlink.sourceDomain)
      const score = this.calculateToxicity(backlink, domain)
      results.set(backlink.id, score)
    }
    
    return results
  }
  
  /**
   * Get toxic backlinks above threshold
   */
  filterToxicLinks(
    backlinks: BacklinkData[],
    threshold: number = 50
  ): Array<{ backlink: BacklinkData; score: ToxicityScore }> {
    const toxic: Array<{ backlink: BacklinkData; score: ToxicityScore }> = []
    
    for (const backlink of backlinks) {
      const score = this.calculateToxicity(backlink)
      if (score.overall >= threshold) {
        toxic.push({ backlink, score })
      }
    }
    
    return toxic.sort((a, b) => b.score.overall - a.score.overall)
  }
  
  /**
   * Calculate health score (inverse of toxicity)
   */
  calculateHealthScore(backlinks: BacklinkData[]): number {
    if (backlinks.length === 0) return 100
    
    let totalToxicity = 0
    for (const backlink of backlinks) {
      const score = this.calculateToxicity(backlink)
      totalToxicity += score.overall
    }
    
    const avgToxicity = totalToxicity / backlinks.length
    return Math.max(0, 100 - avgToxicity)
  }
  
  /**
   * Score domain quality (0-40 points = worse quality)
   */
  private scoreDomainQuality(
    backlink: BacklinkData,
    domain?: ReferringDomainData
  ): number {
    let score = 0
    
    const dr = backlink.domainRating || domain?.domainRating || 0
    
    // Very low domain rating
    if (dr < 10) score += 20
    else if (dr < 20) score += 15
    else if (dr < 30) score += 10
    else if (dr < 40) score += 5
    
    // Already marked as toxic
    if (backlink.isToxic || domain?.isToxic) {
      score += 20
    }
    
    return score
  }
  
  /**
   * Score spam indicators (0-30 points)
   */
  private scoreSpamIndicators(
    backlink: BacklinkData,
    domain?: ReferringDomainData
  ): number {
    let score = 0
    const sourceDomain = backlink.sourceDomain.toLowerCase()
    const context = (backlink.context || '').toLowerCase()
    
    // Check domain for spam keywords
    for (const keyword of this.spamKeywords) {
      if (sourceDomain.includes(keyword)) {
        score += 15
        break
      }
    }
    
    // Check context for spam
    if (context) {
      let spamCount = 0
      for (const keyword of this.spamKeywords) {
        if (context.includes(keyword)) {
          spamCount++
        }
      }
      if (spamCount >= 3) score += 15
      else if (spamCount >= 1) score += 10
    }
    
    // Excessive external links (link farm indicator)
    if (domain?.backlinkCount && domain.backlinkCount > 1000) {
      score += 5
    }
    
    return Math.min(score, 30)
  }
  
  /**
   * Score suspicious TLD (0-15 points)
   */
  private scoreSuspiciousTLD(domain: string): number {
    const lowerDomain = domain.toLowerCase()
    
    for (const tld of this.suspiciousTLDs) {
      if (lowerDomain.endsWith(tld)) {
        return 15
      }
    }
    
    return 0
  }
  
  /**
   * Score link position (0-10 points)
   */
  private scoreLinkPosition(position?: string): number {
    if (!position) return 5
    
    switch (position) {
      case 'content':
        return 0 // Best position
      case 'nav':
        return 3
      case 'sidebar':
        return 7
      case 'footer':
        return 10 // Worst position
      case 'comment':
        return 8
      default:
        return 5
    }
  }
  
  /**
   * Score anchor text quality (0-5 points)
   */
  private scoreAnchorText(anchorText: string | null): number {
    if (!anchorText) return 0
    
    const lowerAnchor = anchorText.toLowerCase()
    
    // Check for spam anchor phrases
    for (const spam of this.spamAnchors) {
      if (lowerAnchor.includes(spam)) {
        return 5
      }
    }
    
    // Over-optimized (exact match repeated keywords)
    const words = lowerAnchor.split(/\s+/)
    const uniqueWords = new Set(words)
    if (words.length > 3 && uniqueWords.size < words.length / 2) {
      return 3
    }
    
    return 0
  }
  
  /**
   * Classify toxicity level
   */
  private classifyToxicity(score: number): 'safe' | 'warning' | 'toxic' | 'dangerous' {
    if (score < 20) return 'safe'
    if (score < 40) return 'warning'
    if (score < 70) return 'toxic'
    return 'dangerous'
  }
  
  /**
   * Generate human-readable reasons
   */
  private generateReasons(
    breakdown: any,
    backlink: BacklinkData,
    domain?: ReferringDomainData
  ): string[] {
    const reasons: string[] = []
    
    // Domain quality issues
    if (breakdown.domainQuality >= 15) {
      const dr = backlink.domainRating || domain?.domainRating || 0
      reasons.push(`⚠️ Very low domain authority (DR: ${dr})`)
    }
    if (backlink.isToxic || domain?.isToxic) {
      reasons.push('🚨 Previously marked as toxic')
    }
    
    // Spam indicators
    if (breakdown.spamIndicators >= 15) {
      reasons.push('🔴 Contains spam keywords in domain or content')
    } else if (breakdown.spamIndicators >= 10) {
      reasons.push('⚠️ Multiple spam indicators detected')
    }
    
    // Suspicious TLD
    if (breakdown.suspiciousTLD > 0) {
      reasons.push(`⚠️ Suspicious TLD (${this.getTLD(backlink.sourceDomain)})`)
    }
    
    // Bad link position
    if (breakdown.linkPosition >= 10) {
      reasons.push('📍 Link in footer (low value position)')
    } else if (breakdown.linkPosition >= 7) {
      reasons.push('📍 Link in sidebar or comments')
    }
    
    // Anchor text issues
    if (breakdown.anchorText >= 5) {
      reasons.push('🔗 Spam-like anchor text detected')
    }
    
    // Link type
    if (backlink.linkType === 'NOFOLLOW') {
      reasons.push('ℹ️ NoFollow link (no SEO value)')
    }
    
    if (reasons.length === 0) {
      reasons.push('✅ No major issues detected')
    }
    
    return reasons
  }
  
  /**
   * Extract TLD from domain
   */
  private getTLD(domain: string): string {
    const parts = domain.split('.')
    return parts.length > 1 ? `.${parts[parts.length - 1]}` : domain
  }
  
  /**
   * Get recommendations for toxic links
   */
  getRecommendations(toxicityScore: ToxicityScore): string[] {
    const recommendations: string[] = []
    
    switch (toxicityScore.classification) {
      case 'dangerous':
        recommendations.push('🚨 URGENT: Add to disavow file immediately')
        recommendations.push('📧 Contact webmaster to request removal')
        recommendations.push('🔍 Monitor for negative SEO attack')
        break
        
      case 'toxic':
        recommendations.push('⚠️ Add to disavow file')
        recommendations.push('📊 Monitor this link closely')
        recommendations.push('🔎 Review other links from this domain')
        break
        
      case 'warning':
        recommendations.push('👀 Monitor this link')
        recommendations.push('📈 Track domain quality changes')
        recommendations.push('⏰ Review again in 30 days')
        break
        
      case 'safe':
        recommendations.push('✅ Link appears safe')
        recommendations.push('📊 Continue monitoring')
        break
    }
    
    return recommendations
  }
}

/**
 * Singleton instance
 */
let analyzerInstance: ToxicityAnalyzer | null = null

export function getToxicityAnalyzer(): ToxicityAnalyzer {
  if (!analyzerInstance) {
    analyzerInstance = new ToxicityAnalyzer()
  }
  return analyzerInstance
}
