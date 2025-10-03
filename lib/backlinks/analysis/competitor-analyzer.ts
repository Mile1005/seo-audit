/**
 * Competitor Backlink Analyzer
 * 
 * Performs comprehensive competitive intelligence:
 * - Gap analysis (links competitors have that you don't)
 * - Common backlinks (shared link sources)
 * - Unique advantages (your exclusive links)
 * - Opportunity scoring and prioritization
 * 
 * Based on methodologies used by Ahrefs/SEMrush
 */

import { BacklinkData, CompetitorComparison, LinkOpportunity } from '../types'

export interface CompetitorProfile {
  domain: string
  backlinks: BacklinkData[]
  totalLinks: number
  totalDomains: number
  averageDR: number
  topAnchors: string[]
}

export interface GapAnalysisResult {
  totalGaps: number
  highValueGaps: LinkOpportunity[]
  mediumValueGaps: LinkOpportunity[]
  lowValueGaps: LinkOpportunity[]
  estimatedEffort: {
    easy: number
    medium: number
    hard: number
  }
}

export class CompetitorAnalyzer {
  
  /**
   * Full competitor comparison
   */
  analyzeCompetitor(
    yourBacklinks: BacklinkData[],
    competitorBacklinks: BacklinkData[],
    yourDomain: string,
    competitorDomain: string
  ): CompetitorComparison {
    // Calculate basic metrics
    const yourDomains = this.getUniqueDomains(yourBacklinks)
    const competitorDomains = this.getUniqueDomains(competitorBacklinks)
    
    // Find common domains
    const commonDomains = yourDomains.filter(d => competitorDomains.includes(d))
    
    // Get common backlinks (same source domain)
    const commonBacklinks = competitorBacklinks.filter(cb => 
      yourBacklinks.some(yb => yb.sourceDomain === cb.sourceDomain)
    )
    
    // Find gaps (competitor has, you don't)
    const gapBacklinks = competitorBacklinks.filter(cb =>
      !yourBacklinks.some(yb => yb.sourceDomain === cb.sourceDomain)
    )
    
    // Your unique backlinks
    const yourUniqueBacklinks = yourBacklinks.filter(yb =>
      !competitorBacklinks.some(cb => cb.sourceDomain === yb.sourceDomain)
    )
    
    // Calculate averages
    const yourAvgDR = this.calculateAverageDR(yourBacklinks)
    const competitorAvgDR = this.calculateAverageDR(competitorBacklinks)
    
    // Get top gaps (sorted by quality)
    const topGaps = this.sortByQuality(gapBacklinks).slice(0, 100)
    
    // Generate recommendations
    const recommendations = this.generateCompetitorRecommendations(
      yourBacklinks,
      competitorBacklinks,
      gapBacklinks,
      commonBacklinks,
      yourUniqueBacklinks
    )
    
    return {
      summary: {
        yourTotal: yourBacklinks.length,
        yourDomains: yourDomains.length,
        yourAvgDR,
        competitorTotal: competitorBacklinks.length,
        competitorDomains: competitorDomains.length,
        competitorAvgDR,
        commonDomains: commonDomains.length,
        gapOpportunities: gapBacklinks.length,
        yourUniqueLinks: yourUniqueBacklinks.length
      },
      topGaps,
      commonBacklinks: commonBacklinks.slice(0, 50),
      yourUniqueBacklinks: yourUniqueBacklinks.slice(0, 50),
      recommendations
    }
  }
  
  /**
   * Detailed gap analysis with opportunity scoring
   */
  analyzeGaps(
    yourBacklinks: BacklinkData[],
    competitorBacklinks: BacklinkData[],
    priorityKeywords: string[] = []
  ): GapAnalysisResult {
    // Find all gaps
    const gapBacklinks = competitorBacklinks.filter(cb =>
      !yourBacklinks.some(yb => yb.sourceDomain === cb.sourceDomain)
    )
    
    // Score each opportunity
    const opportunities = gapBacklinks.map(link => 
      this.scoreOpportunity(link, priorityKeywords)
    )
    
    // Categorize by value
    const highValueGaps = opportunities
      .filter(o => o.relevanceScore >= 70)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 50)
    
    const mediumValueGaps = opportunities
      .filter(o => o.relevanceScore >= 40 && o.relevanceScore < 70)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 50)
    
    const lowValueGaps = opportunities
      .filter(o => o.relevanceScore < 40)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 50)
    
    // Calculate effort distribution
    const estimatedEffort = {
      easy: opportunities.filter(o => o.estimatedDifficulty === 'easy').length,
      medium: opportunities.filter(o => o.estimatedDifficulty === 'medium').length,
      hard: opportunities.filter(o => o.estimatedDifficulty === 'hard').length
    }
    
    return {
      totalGaps: gapBacklinks.length,
      highValueGaps,
      mediumValueGaps,
      lowValueGaps,
      estimatedEffort
    }
  }
  
  /**
   * Score a link opportunity
   */
  private scoreOpportunity(link: BacklinkData, keywords: string[] = []): LinkOpportunity {
    let score = 0
    const reasons: string[] = []
    
    // Domain rating factor (0-40 points)
    const dr = link.domainRating || 0
    const drScore = Math.min(40, dr * 0.4)
    score += drScore
    
    if (dr >= 70) {
      reasons.push(`High authority domain (DR ${dr})`)
    } else if (dr >= 50) {
      reasons.push(`Good authority domain (DR ${dr})`)
    }
    
    // Traffic factor (0-20 points)
    const traffic = link.traffic || 0
    const trafficScore = Math.min(20, Math.log10(traffic + 1) * 4)
    score += trafficScore
    
    if (traffic > 10000) {
      reasons.push(`High traffic site (${traffic.toLocaleString()} monthly visits)`)
    }
    
    // Link type factor (0-15 points)
    if (link.linkType === 'FOLLOW') {
      score += 15
      reasons.push('DoFollow link (passes SEO value)')
    } else {
      score += 5
      reasons.push('NoFollow link (limited SEO value)')
    }
    
    // Link position factor (0-10 points)
    if (link.linkPosition === 'content') {
      score += 10
      reasons.push('Content link (most valuable placement)')
    } else if (link.linkPosition === 'nav' || link.linkPosition === 'sidebar') {
      score += 5
    } else {
      score += 2
    }
    
    // Keyword relevance factor (0-15 points)
    const anchorText = link.anchorText?.toLowerCase() || ''
    const matchingKeywords = keywords.filter(k => anchorText.includes(k.toLowerCase()))
    if (matchingKeywords.length > 0) {
      score += matchingKeywords.length * 5
      reasons.push(`Relevant anchor text: "${anchorText}"`)
    }
    
    // Toxicity penalty
    if (link.isToxic) {
      score -= link.toxicScore
      reasons.push('⚠️ Warning: This site may be toxic or spammy')
    }
    
    // Determine priority
    let priority: 'high' | 'medium' | 'low'
    if (score >= 70) priority = 'high'
    else if (score >= 40) priority = 'medium'
    else priority = 'low'
    
    // Estimate difficulty
    let difficulty: 'easy' | 'medium' | 'hard'
    if (dr < 30) difficulty = 'easy'
    else if (dr < 60) difficulty = 'medium'
    else difficulty = 'hard'
    
    if (link.linkType === 'NOFOLLOW') {
      difficulty = difficulty === 'easy' ? 'easy' : 'medium' // NoFollow sites are usually easier
    }
    
    return {
      domain: link.sourceDomain,
      url: link.sourceUrl,
      domainRating: dr,
      traffic,
      relevanceScore: Math.min(100, Math.round(score)),
      outreachPriority: priority,
      reasons,
      estimatedDifficulty: difficulty
    }
  }
  
  /**
   * Find common backlinks across multiple competitors
   */
  findCommonBacklinks(
    yourBacklinks: BacklinkData[],
    competitorBacklinks: BacklinkData[][],
    minCompetitors: number = 2
  ): Array<{
    backlink: BacklinkData
    competitorCount: number
    youHaveIt: boolean
    priority: 'critical' | 'high' | 'medium'
  }> {
    const domainCounts = new Map<string, { link: BacklinkData; count: number }>()
    const yourDomains = new Set(yourBacklinks.map(b => b.sourceDomain))
    
    // Count occurrences across competitors
    for (const competitorLinks of competitorBacklinks) {
      for (const link of competitorLinks) {
        const existing = domainCounts.get(link.sourceDomain)
        if (existing) {
          existing.count++
        } else {
          domainCounts.set(link.sourceDomain, { link, count: 1 })
        }
      }
    }
    
    // Filter by minimum competitor threshold
    const commonLinks = Array.from(domainCounts.values())
      .filter(entry => entry.count >= minCompetitors)
      .map(entry => ({
        backlink: entry.link,
        competitorCount: entry.count,
        youHaveIt: yourDomains.has(entry.link.sourceDomain),
        priority: this.calculateCommonLinkPriority(entry.count, competitorBacklinks.length)
      }))
      .sort((a, b) => b.competitorCount - a.competitorCount)
    
    return commonLinks
  }
  
  /**
   * Calculate priority for common backlinks
   */
  private calculateCommonLinkPriority(
    competitorCount: number,
    totalCompetitors: number
  ): 'critical' | 'high' | 'medium' {
    const percentage = (competitorCount / totalCompetitors) * 100
    
    if (percentage >= 75) return 'critical' // 75%+ competitors have it
    if (percentage >= 50) return 'high'     // 50-74% competitors have it
    return 'medium'                         // 25-49% competitors have it
  }
  
  /**
   * Analyze link building strategies used by competitor
   */
  analyzeStrategy(backlinks: BacklinkData[]): {
    primaryStrategies: string[]
    linkSources: Record<string, number>
    anchorStrategy: string
    velocityPattern: string
    recommendations: string[]
  } {
    const primaryStrategies: string[] = []
    const linkSources: Record<string, number> = {
      blogs: 0,
      news: 0,
      directories: 0,
      forums: 0,
      social: 0,
      ecommerce: 0,
      educational: 0,
      government: 0,
      other: 0
    }
    
    // Categorize link sources
    for (const link of backlinks) {
      const domain = link.sourceDomain.toLowerCase()
      const url = link.sourceUrl.toLowerCase()
      
      if (domain.includes('blog') || url.includes('/blog/')) {
        linkSources.blogs++
      } else if (domain.includes('news') || domain.includes('times') || domain.includes('post')) {
        linkSources.news++
      } else if (domain.includes('directory') || domain.includes('listing')) {
        linkSources.directories++
      } else if (domain.includes('forum') || url.includes('/forum/')) {
        linkSources.forums++
      } else if (domain.includes('facebook') || domain.includes('twitter') || domain.includes('linkedin')) {
        linkSources.social++
      } else if (domain.includes('.edu')) {
        linkSources.educational++
      } else if (domain.includes('.gov')) {
        linkSources.government++
      } else {
        linkSources.other++
      }
    }
    
    // Identify primary strategies
    if (linkSources.blogs > backlinks.length * 0.3) {
      primaryStrategies.push('Heavy guest blogging and content marketing')
    }
    if (linkSources.news > backlinks.length * 0.2) {
      primaryStrategies.push('PR and news coverage')
    }
    if (linkSources.directories > backlinks.length * 0.15) {
      primaryStrategies.push('Directory submissions')
    }
    if (linkSources.educational > 10) {
      primaryStrategies.push('Educational outreach (.edu links)')
    }
    if (linkSources.government > 5) {
      primaryStrategies.push('Government relations (.gov links)')
    }
    
    // Analyze anchor text strategy
    const brandedAnchors = backlinks.filter(b => 
      b.anchorText && this.isBrandedAnchor(b.anchorText, '')
    ).length
    const brandedPercent = (brandedAnchors / backlinks.length) * 100
    
    let anchorStrategy: string
    if (brandedPercent > 60) {
      anchorStrategy = 'Conservative (mostly branded anchors)'
    } else if (brandedPercent < 30) {
      anchorStrategy = 'Aggressive (low branded, high keyword anchors)'
    } else {
      anchorStrategy = 'Balanced (mix of branded and keyword anchors)'
    }
    
    // Velocity pattern (simplified)
    const velocityPattern = 'Steady growth pattern' // Would need time-series data
    
    // Generate recommendations
    const recommendations: string[] = []
    
    const topSource = Object.entries(linkSources)
      .sort((a, b) => b[1] - a[1])[0]
    
    if (topSource) {
      recommendations.push(`Competitor focuses on ${topSource[0]} - consider similar strategy`)
    }
    
    if (linkSources.educational > 0) {
      recommendations.push('Competitor has .edu links - pursue educational partnerships')
    }
    
    if (primaryStrategies.includes('Heavy guest blogging and content marketing')) {
      recommendations.push('Increase guest posting efforts to match competitor')
    }
    
    return {
      primaryStrategies,
      linkSources,
      anchorStrategy,
      velocityPattern,
      recommendations
    }
  }
  
  /**
   * Multi-competitor comparison (up to 5 competitors)
   */
  compareMultipleCompetitors(
    yourBacklinks: BacklinkData[],
    competitors: Array<{ domain: string; backlinks: BacklinkData[] }>
  ): {
    summary: Record<string, any>
    commonOpportunities: BacklinkData[]
    uniqueAdvantages: BacklinkData[]
    recommendations: string[]
  } {
    const summary: Record<string, any> = {
      you: {
        domain: 'your-site',
        total: yourBacklinks.length,
        domains: this.getUniqueDomains(yourBacklinks).length,
        avgDR: this.calculateAverageDR(yourBacklinks)
      }
    }
    
    // Add each competitor to summary
    for (const competitor of competitors) {
      summary[competitor.domain] = {
        total: competitor.backlinks.length,
        domains: this.getUniqueDomains(competitor.backlinks).length,
        avgDR: this.calculateAverageDR(competitor.backlinks)
      }
    }
    
    // Find links that multiple competitors have but you don't
    const competitorBacklinks = competitors.map(c => c.backlinks)
    const commonOpportunities = this.findCommonBacklinks(yourBacklinks, competitorBacklinks, 2)
      .filter(c => !c.youHaveIt)
      .map(c => c.backlink)
      .slice(0, 100)
    
    // Find your unique advantages
    const allCompetitorDomains = new Set(
      competitors.flatMap(c => c.backlinks.map(b => b.sourceDomain))
    )
    const uniqueAdvantages = yourBacklinks
      .filter(b => !allCompetitorDomains.has(b.sourceDomain))
      .filter(b => (b.domainRating || 0) >= 40) // Only quality links
      .slice(0, 50)
    
    // Generate recommendations
    const recommendations: string[] = []
    
    const avgCompetitorLinks = competitors.reduce((sum, c) => sum + c.backlinks.length, 0) / competitors.length
    if (yourBacklinks.length < avgCompetitorLinks * 0.5) {
      recommendations.push('🔴 CRITICAL: You have significantly fewer backlinks than competitors')
      recommendations.push(`📊 Target: Reach at least ${Math.round(avgCompetitorLinks * 0.7)} backlinks`)
    }
    
    if (commonOpportunities.length > 50) {
      recommendations.push(`🎯 HIGH PRIORITY: ${commonOpportunities.length} opportunities where multiple competitors have links`)
      recommendations.push('💡 Focus on these common opportunities first - they\'re proven to work')
    }
    
    if (uniqueAdvantages.length > 20) {
      recommendations.push(`✅ You have ${uniqueAdvantages.length} unique quality backlinks competitors don't have`)
      recommendations.push('🛡️ Protect these relationships - they\'re your competitive advantage')
    }
    
    return {
      summary,
      commonOpportunities,
      uniqueAdvantages,
      recommendations
    }
  }
  
  /**
   * Helper: Get unique domains
   */
  private getUniqueDomains(backlinks: BacklinkData[]): string[] {
    return [...new Set(backlinks.map(b => b.sourceDomain))]
  }
  
  /**
   * Helper: Calculate average domain rating
   */
  private calculateAverageDR(backlinks: BacklinkData[]): number {
    const validDRs = backlinks
      .map(b => b.domainRating || 0)
      .filter(dr => dr > 0)
    
    if (validDRs.length === 0) return 0
    
    return Math.round(validDRs.reduce((sum, dr) => sum + dr, 0) / validDRs.length)
  }
  
  /**
   * Helper: Sort by quality
   */
  private sortByQuality(backlinks: BacklinkData[]): BacklinkData[] {
    return backlinks.sort((a, b) => {
      const scoreA = (a.domainRating || 0) + (a.traffic || 0) / 1000
      const scoreB = (b.domainRating || 0) + (b.traffic || 0) / 1000
      return scoreB - scoreA
    })
  }
  
  /**
   * Helper: Check if anchor is branded
   */
  private isBrandedAnchor(anchor: string, brandName: string): boolean {
    // Simplified check
    return anchor.length < 30 && !anchor.includes(' ') && !/^https?:\/\//.test(anchor)
  }
  
  /**
   * Generate competitor-specific recommendations
   */
  private generateCompetitorRecommendations(
    yourBacklinks: BacklinkData[],
    competitorBacklinks: BacklinkData[],
    gaps: BacklinkData[],
    common: BacklinkData[],
    unique: BacklinkData[]
  ): string[] {
    const recommendations: string[] = []
    
    // Quantity gap
    const linkDifference = competitorBacklinks.length - yourBacklinks.length
    if (linkDifference > 100) {
      recommendations.push(`🔴 Competitor has ${linkDifference} more backlinks than you`)
      recommendations.push('📈 Priority: Accelerate link building efforts')
    } else if (linkDifference < -100) {
      recommendations.push(`✅ You have ${Math.abs(linkDifference)} more backlinks than competitor`)
    }
    
    // Quality gap
    const yourAvgDR = this.calculateAverageDR(yourBacklinks)
    const compAvgDR = this.calculateAverageDR(competitorBacklinks)
    
    if (compAvgDR > yourAvgDR + 10) {
      recommendations.push(`⚠️ Competitor has higher quality links (Avg DR ${compAvgDR} vs ${yourAvgDR})`)
      recommendations.push('🎯 Focus on acquiring links from high-authority domains')
    }
    
    // Gap opportunities
    if (gaps.length > 50) {
      const highQualityGaps = gaps.filter(g => (g.domainRating || 0) >= 50).length
      recommendations.push(`🎯 ${gaps.length} link opportunities identified (${highQualityGaps} high-quality)`)
      recommendations.push('💡 Start outreach to top 20 gap opportunities')
    }
    
    // Common backlinks
    if (common.length > 20) {
      recommendations.push(`✅ ${common.length} shared backlink sources with competitor`)
      recommendations.push('🤝 These sites are proven to link to similar businesses')
    }
    
    // Unique advantages
    if (unique.length > 10) {
      recommendations.push(`🛡️ You have ${unique.length} unique quality backlinks`)
      recommendations.push('📧 Maintain relationships with these exclusive sources')
    }
    
    return recommendations
  }
}

/**
 * Singleton instance
 */
let analyzerInstance: CompetitorAnalyzer | null = null

export function getCompetitorAnalyzer(): CompetitorAnalyzer {
  if (!analyzerInstance) {
    analyzerInstance = new CompetitorAnalyzer()
  }
  return analyzerInstance
}
