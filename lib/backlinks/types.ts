/**
 * Backlink Types and Interfaces
 * Professional-grade type definitions for backlink analysis
 */

export interface BacklinkData {
  id: string;
  projectId?: string;
  sourceUrl: string;
  sourceDomain: string;
  targetUrl: string;
  anchorText: string | null;
  linkType: "FOLLOW" | "NOFOLLOW";
  status: "ACTIVE" | "LOST" | "BROKEN" | "REDIRECT";
  domainRating?: number;
  pageRating?: number;
  traffic?: number;
  isToxic: boolean;
  toxicScore: number;
  linkStrength?: "WEAK" | "NORMAL" | "STRONG" | "VERY_STRONG";
  linkPosition?: "content" | "footer" | "sidebar" | "nav" | "comment" | "other";
  context?: string;
  altText?: string | null;
  isNofollow: boolean;
  isSponsored: boolean;
  isUGC: boolean;
  httpStatus?: number | null;
  foundDate?: Date; // Date when backlink was discovered
  firstSeen: Date;
  lastSeen: Date;
  lastChecked?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DomainMetrics {
  domain: string;
  domainRating: number;
  pageRating: number;
  rank?: number;
  status?: number;
  traffic?: number;
  trustFlow?: number;
  citationFlow?: number;
}

export interface ReferringDomainData {
  id?: string;
  projectId?: string;
  domain: string;
  domainRating?: number;
  pageRating?: number;
  backlinkCount: number;
  traffic?: number;
  category?: string | null;
  language?: string | null;
  country?: string | null;
  isToxic: boolean;
  toxicScore?: number;
  trustFlow?: number;
  citationFlow?: number;
  status?: "ACTIVE" | "LOST";
  emailContacts?: any;
  socialProfiles?: any;
  technologies?: any;
  firstSeen: Date;
  lastSeen: Date;
  lastChecked?: Date | null;
}

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  position?: number;
}

export interface CollectionStats {
  totalFound: number;
  uniqueBacklinks: number;
  uniqueDomains: number;
  averageDomainRating: number;
  sources: {
    commonCrawl: number;
    search: number;
    manual: number;
  };
  duration: number;
}

export interface ToxicityScore {
  overall: number;
  breakdown: {
    domainQuality: number;
    spamIndicators: number;
    suspiciousTLD: number;
    linkPosition: number;
    anchorText: number;
  };
  classification: "safe" | "warning" | "toxic" | "dangerous";
  reasons: string[];
}

export interface AnchorAnalysis {
  distribution: {
    branded: number;
    exact: number;
    partial: number;
    generic: number;
    naked: number;
    image: number;
    other: number;
  };
  percentages: Record<string, number>;
  topAnchors: Array<{ text: string; count: number; percentage: number }>;
  isNatural: boolean;
  healthScore: number;
  recommendations: string[];
}

export interface VelocityDataPoint {
  date: Date;
  count: number;
  newLinks: number;
  lostLinks: number;
  netGrowth: number;
}

export interface VelocityTrend {
  type: "rapid" | "steady" | "stable" | "declining" | "volatile";
  confidence: number;
  description: string;
}

export interface VelocitySpikeDetection {
  hasSuspiciousSpikes: boolean;
  spikes: Array<{
    date: Date;
    count: number;
    percentageIncrease: number;
    severity: "low" | "medium" | "high" | "critical";
  }>;
  naturalGrowth: boolean;
}

export interface VelocityAnalysis {
  dailyData: VelocityDataPoint[];
  weeklyData: VelocityDataPoint[];
  monthlyData: VelocityDataPoint[];
  trend: VelocityTrend;
  spikeDetection: VelocitySpikeDetection;
  metrics: Record<string, number>;
  recommendations: string[];
}

export interface CompetitorComparison {
  summary: {
    yourTotal: number;
    yourDomains: number;
    yourAvgDR: number;
    competitorTotal: number;
    competitorDomains: number;
    competitorAvgDR: number;
    commonDomains: number;
    gapOpportunities: number;
    yourUniqueLinks: number;
  };
  topGaps: BacklinkData[];
  commonBacklinks: BacklinkData[];
  yourUniqueBacklinks: BacklinkData[];
  recommendations: string[];
}

export interface LinkOpportunity {
  domain: string;
  url: string;
  domainRating: number;
  traffic: number;
  relevanceScore: number;
  outreachPriority: "high" | "medium" | "low";
  contactEmail?: string;
  reasons: string[];
  estimatedDifficulty: "easy" | "medium" | "hard";
}

export interface BacklinkProfile {
  totalBacklinks: number;
  totalReferringDomains: number;
  totalReferringIPs: number;
  dofollowLinks: number;
  nofollowLinks: number;
  newBacklinks: number;
  lostBacklinks: number;
  brokenBacklinks: number;
  averageDomainAuthority: number;
  averageSpamScore: number;
  toxicityScore: number;
  healthScore: number;
  monthlyGrowth: number;
  velocityTrend: "increasing" | "stable" | "decreasing";
  topAnchorTexts: Array<{ text: string; count: number }>;
  topReferringDomains: Array<{ domain: string; count: number; dr: number }>;
  topCountries: Array<{ country: string; count: number }>;
  linkTypeDistribution: Record<string, number>;
  linkPositionDistribution: Record<string, number>;
}
