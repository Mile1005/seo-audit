/**
 * DataForSEO API Integration Service
 * Comprehensive keyword research and SERP analysis
 */

import { z } from 'zod';

// Configuration
const DATAFORSEO_API_BASE = 'https://api.dataforseo.com/v3';
const DATAFORSEO_USER = process.env.DATAFORSEO_LOGIN;
const DATAFORSEO_PASSWORD = process.env.DATAFORSEO_PASSWORD;

if (!DATAFORSEO_USER || !DATAFORSEO_PASSWORD) {
  console.warn('DataForSEO credentials not found. Keyword research features will be limited.');
}

// Request/Response schemas
const KeywordDataSchema = z.object({
  keyword: z.string(),
  search_volume: z.number().nullable(),
  competition: z.number().nullable(),
  competition_level: z.string().nullable(),
  cpc: z.number().nullable(),
  monthly_searches: z.array(z.object({
    year: z.number(),
    month: z.number(),
    search_volume: z.number()
  })).optional()
});

const SerpResultSchema = z.object({
  type: z.string(),
  rank_group: z.number(),
  rank_absolute: z.number(),
  position: z.string(),
  xpath: z.string(),
  domain: z.string(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  url: z.string(),
  breadcrumb: z.string().nullable(),
  is_image: z.boolean().optional(),
  is_video: z.boolean().optional(),
  is_featured_snippet: z.boolean().optional(),
  is_malicious: z.boolean().optional(),
  website_name: z.string().nullable(),
  relative_url: z.string().nullable(),
  etv: z.number().nullable(),
  impressions_etv: z.number().nullable(),
  estimated_paid_traffic_cost: z.number().nullable()
});

export interface KeywordResearchParams {
  keywords: string[];
  location?: string;
  language?: string;
  include_serp_info?: boolean;
  include_clickstream_data?: boolean;
  include_subdomains?: boolean;
  limit?: number;
}

export interface SerpAnalysisParams {
  keyword: string;
  location?: string;
  language?: string;
  device?: 'desktop' | 'mobile' | 'tablet';
  depth?: number;
}

export interface KeywordSuggestionsParams {
  seed_keywords: string[];
  location?: string;
  language?: string;
  limit?: number;
  include_seed_keyword?: boolean;
  include_serp_info?: boolean;
  filters?: Array<{
    field: string;
    operation: string;
    value: any;
  }>;
}

export class DataForSEOService {
  private apiUser: string;
  private apiPassword: string;
  private baseUrl: string;

  constructor() {
    this.apiUser = DATAFORSEO_USER || '';
    this.apiPassword = DATAFORSEO_PASSWORD || '';
    this.baseUrl = DATAFORSEO_API_BASE;
  }

  private async makeRequest(endpoint: string, data: any): Promise<any> {
    if (!this.apiUser || !this.apiPassword) {
      throw new Error('DataForSEO API credentials not configured');
    }

    const auth = Buffer.from(`${this.apiUser}:${this.apiPassword}`).toString('base64');
    
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`DataForSEO API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    if (result.status_code !== 20000) {
      throw new Error(`DataForSEO API error: ${result.status_message}`);
    }

    return result;
  }

  /**
   * Get keyword data including search volume, CPC, and competition
   */
  async getKeywordData(params: KeywordResearchParams) {
    const requestData = [{
      keywords: params.keywords,
      location_code: this.getLocationCode(params.location || 'US'),
      language_code: params.language || 'en',
      include_serp_info: params.include_serp_info || false,
      include_clickstream_data: params.include_clickstream_data || false,
      include_subdomains: params.include_subdomains || false,
      limit: params.limit || 1000
    }];

    try {
      const response = await this.makeRequest('/keywords_data/google_ads/search_volume/live', requestData);
      
      return response.tasks[0].result.map((item: any) => ({
        keyword: item.keyword,
        searchVolume: item.search_volume,
        competition: item.competition,
        competitionLevel: item.competition_level,
        cpc: item.cpc,
        difficulty: this.calculateDifficulty(item.competition, item.cpc),
        monthlySearches: item.monthly_searches || [],
        trend: this.calculateTrend(item.monthly_searches || [])
      }));
    } catch (error) {
      console.error('Error fetching keyword data:', error);
      throw error;
    }
  }

  /**
   * Get keyword suggestions based on seed keywords
   */
  async getKeywordSuggestions(params: KeywordSuggestionsParams) {
    const requestData = [{
      keywords: params.seed_keywords,
      location_code: this.getLocationCode(params.location || 'US'),
      language_code: params.language || 'en',
      limit: params.limit || 1000,
      include_seed_keyword: params.include_seed_keyword || false,
      include_serp_info: params.include_serp_info || false,
      filters: params.filters || []
    }];

    try {
      // Get different types of suggestions
      const [related, questions, autocomplete] = await Promise.all([
        this.makeRequest('/keywords_data/google_ads/keywords_for_keywords/live', requestData),
        this.makeRequest('/keywords_data/google_ads/keywords_for_keywords/live', [
          { ...requestData[0], filters: [{ field: 'keyword_length', operation: '>', value: 10 }] }
        ]),
        // Note: Real implementation would use autocomplete endpoint
        this.makeRequest('/keywords_data/google_ads/keywords_for_keywords/live', [
          { ...requestData[0], limit: 100 }
        ])
      ]);

      const suggestions = [
        ...this.processSuggestions(related.tasks[0].result, 'related'),
        ...this.processSuggestions(questions.tasks[0].result, 'questions'),
        ...this.processSuggestions(autocomplete.tasks[0].result, 'autocomplete')
      ];

      return suggestions;
    } catch (error) {
      console.error('Error fetching keyword suggestions:', error);
      throw error;
    }
  }

  /**
   * Analyze SERP results for a keyword
   */
  async analyzeSERP(params: SerpAnalysisParams) {
    const requestData = [{
      keyword: params.keyword,
      location_code: this.getLocationCode(params.location || 'US'),
      language_code: params.language || 'en',
      device: params.device || 'desktop',
      depth: params.depth || 100
    }];

    try {
      const response = await this.makeRequest('/serp/google/organic/live/advanced', requestData);
      const serpData = response.tasks[0].result[0];

      return {
        keyword: params.keyword,
        totalResults: serpData.items_count,
        serpFeatures: this.extractSerpFeatures(serpData.items),
        organicResults: serpData.items
          .filter((item: any) => item.type === 'organic')
          .map((item: any) => ({
            position: item.rank_absolute,
            url: item.url,
            domain: item.domain,
            title: item.title,
            description: item.description,
            breadcrumb: item.breadcrumb,
            etv: item.etv,
            estimatedTrafficCost: item.estimated_paid_traffic_cost
          })),
        paidResults: serpData.items
          .filter((item: any) => item.type === 'paid')
          .map((item: any) => ({
            position: item.rank_absolute,
            url: item.url,
            domain: item.domain,
            title: item.title,
            description: item.description
          })),
        checkedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error analyzing SERP:', error);
      throw error;
    }
  }

  /**
   * Get competitor keywords for a domain
   */
  async getCompetitorKeywords(domain: string, limit: number = 1000) {
    const requestData = [{
      target: domain,
      location_code: this.getLocationCode('US'),
      language_code: 'en',
      limit: limit,
      filters: [
        { field: 'search_volume', operation: '>', value: 100 },
        { field: 'position', operation: '<=', value: 20 }
      ]
    }];

    try {
      const response = await this.makeRequest('/dataforseo_labs/google/domain_rank_overview/live', requestData);
      
      return response.tasks[0].result.map((item: any) => ({
        keyword: item.keyword,
        position: item.se_results_count,
        searchVolume: item.search_volume,
        cpc: item.cpc,
        competition: item.competition,
        etv: item.etv,
        url: item.url
      }));
    } catch (error) {
      console.error('Error fetching competitor keywords:', error);
      throw error;
    }
  }

  /**
   * Batch process keywords with rate limiting
   */
  async batchProcessKeywords(keywords: string[], batchSize: number = 100) {
    const batches = [];
    for (let i = 0; i < keywords.length; i += batchSize) {
      batches.push(keywords.slice(i, i + batchSize));
    }

    const results = [];
    for (const batch of batches) {
      try {
        const batchResult = await this.getKeywordData({ keywords: batch });
        results.push(...batchResult);
        
        // Rate limiting - wait 1 second between batches
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Error processing batch:`, error);
        // Continue with other batches
      }
    }

    return results;
  }

  // Helper methods
  private getLocationCode(location: string): number {
    const locationCodes: Record<string, number> = {
      'US': 2840,
      'GB': 2826,
      'CA': 2124,
      'AU': 2036,
      'DE': 2276,
      'FR': 2250,
      'IT': 2380,
      'ES': 2724,
      'BR': 2076,
      'IN': 2356,
      'JP': 2392,
      'CN': 2156
    };
    
    return locationCodes[location.toUpperCase()] || 2840; // Default to US
  }

  private calculateDifficulty(competition: number, cpc: number): number {
    // Simple difficulty calculation based on competition and CPC
    // In a real implementation, you might use more sophisticated algorithms
    const competitionScore = (competition || 0) * 50;
    const cpcScore = Math.min((cpc || 0) * 10, 50);
    return Math.round(competitionScore + cpcScore);
  }

  private calculateTrend(monthlySearches: any[]): { direction: string; change: number } {
    if (monthlySearches.length < 2) {
      return { direction: 'stable', change: 0 };
    }

    const recent = monthlySearches.slice(-3);
    const older = monthlySearches.slice(-6, -3);
    
    const recentAvg = recent.reduce((sum, item) => sum + item.search_volume, 0) / recent.length;
    const olderAvg = older.reduce((sum, item) => sum + item.search_volume, 0) / older.length;
    
    const change = ((recentAvg - olderAvg) / olderAvg) * 100;
    
    if (change > 10) return { direction: 'up', change: Math.round(change) };
    if (change < -10) return { direction: 'down', change: Math.round(Math.abs(change)) };
    return { direction: 'stable', change: Math.round(Math.abs(change)) };
  }

  private processSuggestions(results: any[], source: string) {
    return results.map((item: any) => ({
      keyword: item.keyword,
      source,
      searchVolume: item.search_volume,
      competition: item.competition,
      cpc: item.cpc,
      relevanceScore: this.calculateRelevanceScore(item)
    }));
  }

  private calculateRelevanceScore(item: any): number {
    // Simple relevance calculation
    // In practice, you might use more sophisticated NLP techniques
    const volumeScore = Math.min((item.search_volume || 0) / 10000, 0.4);
    const competitionScore = (1 - (item.competition || 1)) * 0.3;
    const cpcScore = Math.min((item.cpc || 0) / 5, 0.3);
    
    return Math.round((volumeScore + competitionScore + cpcScore) * 100) / 100;
  }

  private extractSerpFeatures(items: any[]) {
    const features = new Set<string>();
    
    items.forEach(item => {
      if (item.type === 'featured_snippet') features.add('featured_snippet');
      if (item.type === 'local_pack') features.add('local_pack');
      if (item.type === 'knowledge_graph') features.add('knowledge_graph');
      if (item.type === 'people_also_ask') features.add('people_also_ask');
      if (item.type === 'images') features.add('images');
      if (item.type === 'videos') features.add('videos');
      if (item.type === 'shopping') features.add('shopping');
      if (item.type === 'news') features.add('news');
    });

    return Array.from(features);
  }
}

export const dataForSEOService = new DataForSEOService();
