/**
 * Anchor Text Analysis Engine
 * 
 * Analyzes anchor text distribution for natural link profile detection
 * Based on industry best practices and Google's quality guidelines
 * 
 * Natural Distribution (Industry Standard):
 * - Branded: 40-60%
 * - Exact Match: <20%
 * - Partial Match: 15-25%
 * - Generic: 10-20%
 * - Naked URLs: 5-15%
 * - Images: 5-10%
 */

import { BacklinkData, AnchorAnalysis } from '../types'

export class AnchorTextAnalyzer {
  
  private readonly genericPhrases = [
    'click here', 'read more', 'learn more', 'visit site',
    'website', 'homepage', 'check it out', 'see more',
    'this site', 'here', 'link', 'source', 'via',
    'read the article', 'full article', 'continue reading'
  ]
  
  /**
   * Analyze anchor text distribution for a backlink profile
   */
  analyzeDistribution(
    backlinks: BacklinkData[],
    targetDomain: string,
    targetKeywords: string[] = []
  ): AnchorAnalysis {
    const distribution = {
      branded: 0,
      exact: 0,
      partial: 0,
      generic: 0,
      naked: 0,
      image: 0,
      other: 0
    }
    
    const anchorCounts = new Map<string, number>()
    const brandName = this.extractBrandName(targetDomain)
    
    // Classify each backlink
    for (const link of backlinks) {
      const anchor = link.anchorText?.trim() || ''
      
      // Count occurrences
      if (anchor) {
        anchorCounts.set(anchor, (anchorCounts.get(anchor) || 0) + 1)
      }
      
      // Classify anchor type
      const type = this.classifyAnchor(anchor, brandName, targetDomain, targetKeywords)
      distribution[type]++
    }
    
    // Calculate percentages
    const total = backlinks.length
    const percentages: Record<string, number> = {}
    for (const [key, count] of Object.entries(distribution)) {
      percentages[key] = total > 0 ? (count / total) * 100 : 0
    }
    
    // Get top anchors
    const topAnchors = this.getTopAnchors(anchorCounts, 20)
    
    // Calculate health metrics
    const isNatural = this.isNaturalDistribution(percentages)
    const healthScore = this.calculateHealthScore(percentages)
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(percentages, distribution)
    
    return {
      distribution,
      percentages,
      topAnchors,
      isNatural,
      healthScore,
      recommendations
    }
  }
  
  /**
   * Classify individual anchor text
   */
  private classifyAnchor(
    anchor: string,
    brandName: string,
    targetDomain: string,
    targetKeywords: string[]
  ): keyof AnchorAnalysis['distribution'] {
    if (!anchor) return 'image'
    
    const lowerAnchor = anchor.toLowerCase()
    const lowerBrand = brandName.toLowerCase()
    
    // Naked URL
    if (this.isNakedURL(anchor)) {
      return 'naked'
    }
    
    // Branded
    if (this.isBranded(lowerAnchor, lowerBrand, targetDomain)) {
      return 'branded'
    }
    
    // Generic
    if (this.isGeneric(lowerAnchor)) {
      return 'generic'
    }
    
    // Exact match
    if (this.isExactMatch(lowerAnchor, targetKeywords)) {
      return 'exact'
    }
    
    // Partial match
    if (this.isPartialMatch(lowerAnchor, targetKeywords, lowerBrand)) {
      return 'partial'
    }
    
    return 'other'
  }
  
  /**
   * Check if anchor is a naked URL
   */
  private isNakedURL(anchor: string): boolean {
    return /^https?:\/\//.test(anchor) || anchor.includes('www.')
  }
  
  /**
   * Check if anchor is branded
   */
  private isBranded(anchor: string, brandName: string, domain: string): boolean {
    return (
      anchor.includes(brandName) ||
      anchor.includes(domain.replace(/\./g, ' ')) ||
      anchor === brandName
    )
  }
  
  /**
   * Check if anchor is generic
   */
  private isGeneric(anchor: string): boolean {
    for (const phrase of this.genericPhrases) {
      if (anchor === phrase || anchor.includes(phrase)) {
        return true
      }
    }
    return false
  }
  
  /**
   * Check if anchor is exact match keyword
   */
  private isExactMatch(anchor: string, keywords: string[]): boolean {
    for (const keyword of keywords) {
      if (anchor === keyword.toLowerCase()) {
        return true
      }
    }
    return false
  }
  
  /**
   * Check if anchor is partial match
   */
  private isPartialMatch(anchor: string, keywords: string[], brandName: string): boolean {
    for (const keyword of keywords) {
      if (anchor.includes(keyword.toLowerCase()) && !anchor.includes(brandName)) {
        return true
      }
    }
    return false
  }
  
  /**
   * Get top anchor texts
   */
  private getTopAnchors(
    counts: Map<string, number>,
    limit: number
  ): Array<{ text: string; count: number; percentage: number }> {
    const total = Array.from(counts.values()).reduce((a, b) => a + b, 0)
    
    return Array.from(counts.entries())
      .map(([text, count]) => ({
        text: text || '<image>',
        count,
        percentage: total > 0 ? (count / total) * 100 : 0
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
  }
  
  /**
   * Check if distribution is natural
   */
  private isNaturalDistribution(percentages: Record<string, number>): boolean {
    const { branded, exact, partial, generic } = percentages
    
    // Natural profile criteria:
    // - Branded should be dominant (30-70%)
    // - Exact match should be low (<25%)
    // - Good mix of other types
    
    const hasGoodBranded = branded >= 30 && branded <= 70
    const hasLowExact = exact <= 25
    const hasVariety = (generic + partial) >= 15
    
    return hasGoodBranded && hasLowExact && hasVariety
  }
  
  /**
   * Calculate health score (0-100)
   */
  private calculateHealthScore(percentages: Record<string, number>): number {
    let score = 100
    const { branded, exact, partial, generic, naked } = percentages
    
    // Branded penalties/bonuses
    if (branded < 30) score -= 20 // Too few branded
    else if (branded > 70) score -= 10 // Too many branded
    else if (branded >= 40 && branded <= 60) score += 10 // Perfect range
    
    // Exact match penalties
    if (exact > 30) score -= 30 // Dangerous over-optimization
    else if (exact > 20) score -= 15 // High risk
    else if (exact > 10) score -= 5 // Moderate risk
    
    // Generic penalties
    if (generic > 50) score -= 20 // Too many generic
    else if (generic < 5) score -= 10 // Too few generic (unnatural)
    
    // Naked URL penalties
    if (naked > 30) score -= 15 // Too many naked URLs
    
    // Variety bonus
    const typesUsed = [branded, exact, partial, generic, naked]
      .filter(pct => pct > 5).length
    if (typesUsed >= 4) score += 10 // Good variety
    
    return Math.max(0, Math.min(100, score))
  }
  
  /**
   * Generate actionable recommendations
   */
  private generateRecommendations(
    percentages: Record<string, number>,
    distribution: Record<string, number>
  ): string[] {
    const recommendations: string[] = []
    const { branded, exact, partial, generic, naked, image } = percentages
    
    // Branded anchor recommendations
    if (branded < 20) {
      recommendations.push('🔴 CRITICAL: Increase branded anchor texts to 40-60% of total links')
      recommendations.push('💡 Get links with your brand name or company name as anchor text')
    } else if (branded < 30) {
      recommendations.push('⚠️ Low branded anchors: Aim for 40-60% branded anchor text')
    } else if (branded > 70) {
      recommendations.push('⚠️ Too many branded anchors: Diversify with more descriptive anchors')
    }
    
    // Exact match recommendations
    if (exact > 30) {
      recommendations.push('🚨 DANGER: Excessive exact match anchors (>30%) - HIGH penalty risk!')
      recommendations.push('⚡ ACTION: Use disavow file for suspicious exact match links')
      recommendations.push('📉 Dilute with more branded and partial match anchors')
    } else if (exact > 20) {
      recommendations.push('⚠️ High exact match percentage: Reduce to <20% to avoid penalties')
      recommendations.push('💡 Focus on branded and natural anchors in future link building')
    } else if (exact > 15) {
      recommendations.push('ℹ️ Monitor exact match anchors: Keep below 20%')
    }
    
    // Generic recommendations
    if (generic > 50) {
      recommendations.push('⚠️ Too many generic anchors: Get more descriptive anchor text')
      recommendations.push('💡 Target branded and partial match anchors instead')
    } else if (generic < 5 && distribution.generic > 0) {
      recommendations.push('ℹ️ Very few generic anchors: Add some for natural variation')
    }
    
    // Naked URL recommendations
    if (naked > 25) {
      recommendations.push('⚠️ High percentage of naked URLs: Diversify anchor text')
    }
    
    // Image link recommendations
    if (image > 20) {
      recommendations.push('ℹ️ Many image links: Ensure alt text is optimized')
    }
    
    // Partial match recommendations
    if (partial < 10 && distribution.partial > 0) {
      recommendations.push('💡 Increase partial match anchors (target: 15-25%)')
    }
    
    // Variety recommendations
    const typesUsed = Object.values(percentages).filter(pct => pct > 5).length
    if (typesUsed < 3) {
      recommendations.push('🎯 Improve anchor text variety: Use diverse anchor types')
    }
    
    // Positive feedback
    if (recommendations.length === 0) {
      recommendations.push('✅ Anchor text distribution looks natural and healthy!')
      recommendations.push('📊 Continue maintaining this diverse anchor profile')
      recommendations.push('🎯 Keep branded anchors at 40-60% of total')
    }
    
    return recommendations
  }
  
  /**
   * Extract brand name from domain
   */
  private extractBrandName(domain: string): string {
    const cleaned = domain.replace(/^www\./, '')
    const parts = cleaned.split('.')
    return parts[0]
  }
  
  /**
   * Compare anchor profiles (for competitor analysis)
   */
  compareProfiles(
    yourBacklinks: BacklinkData[],
    competitorBacklinks: BacklinkData[],
    yourDomain: string,
    competitorDomain: string
  ): {
    yours: AnchorAnalysis
    competitor: AnchorAnalysis
    differences: string[]
  } {
    const yours = this.analyzeDistribution(yourBacklinks, yourDomain)
    const competitor = this.analyzeDistribution(competitorBacklinks, competitorDomain)
    
    const differences: string[] = []
    
    // Compare key metrics
    const yourBranded = yours.percentages.branded
    const compBranded = competitor.percentages.branded
    
    if (Math.abs(yourBranded - compBranded) > 15) {
      if (yourBranded < compBranded) {
        differences.push(`🔴 You have ${(compBranded - yourBranded).toFixed(1)}% fewer branded anchors than competitor`)
      } else {
        differences.push(`✅ You have ${(yourBranded - compBranded).toFixed(1)}% more branded anchors than competitor`)
      }
    }
    
    // Exact match comparison
    const yourExact = yours.percentages.exact
    const compExact = competitor.percentages.exact
    
    if (compExact > 25 && yourExact < compExact) {
      differences.push('⚠️ Competitor using risky exact match strategy - opportunity to rank safer')
    } else if (yourExact > 25 && compExact < yourExact) {
      differences.push('🚨 You have more exact match risk than competitor - reduce immediately')
    }
    
    // Health score comparison
    if (yours.healthScore > competitor.healthScore + 10) {
      differences.push(`✅ Your anchor profile is healthier (${yours.healthScore} vs ${competitor.healthScore})`)
    } else if (competitor.healthScore > yours.healthScore + 10) {
      differences.push(`⚠️ Competitor has healthier anchor profile (${competitor.healthScore} vs ${yours.healthScore})`)
    }
    
    return { yours, competitor, differences }
  }
  
  /**
   * Detect over-optimization
   */
  detectOverOptimization(backlinks: BacklinkData[]): {
    isOverOptimized: boolean
    score: number
    warnings: string[]
  } {
    const warnings: string[] = []
    let score = 0
    
    const analysis = this.analyzeDistribution(backlinks, '')
    
    // Check exact match percentage
    if (analysis.percentages.exact > 30) {
      score += 40
      warnings.push('🚨 Dangerously high exact match anchor percentage (>30%)')
    } else if (analysis.percentages.exact > 20) {
      score += 25
      warnings.push('⚠️ High exact match anchor percentage (>20%)')
    }
    
    // Check anchor repetition
    const topAnchor = analysis.topAnchors[0]
    if (topAnchor && topAnchor.percentage > 50) {
      score += 30
      warnings.push(`🚨 Single anchor dominates profile: "${topAnchor.text}" (${topAnchor.percentage.toFixed(1)}%)`)
    }
    
    // Check branded percentage
    if (analysis.percentages.branded < 20) {
      score += 20
      warnings.push('⚠️ Suspiciously low branded anchor percentage')
    }
    
    // Check variety
    const typesUsed = Object.values(analysis.percentages).filter(pct => pct > 5).length
    if (typesUsed < 3) {
      score += 10
      warnings.push('⚠️ Low anchor text variety - appears unnatural')
    }
    
    return {
      isOverOptimized: score >= 50,
      score,
      warnings: warnings.length > 0 ? warnings : ['✅ No over-optimization detected']
    }
  }
}

/**
 * Singleton instance
 */
let analyzerInstance: AnchorTextAnalyzer | null = null

export function getAnchorTextAnalyzer(): AnchorTextAnalyzer {
  if (!analyzerInstance) {
    analyzerInstance = new AnchorTextAnalyzer()
  }
  return analyzerInstance
}
