/**
 * SEO Dashboard Database Types
 * Manual type definitions for better compatibility
 */

// ============================================
// BASE MODEL TYPES (Manual definitions)
// ============================================

export interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  role: UserRole;
  status: UserStatus;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
  createdAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  stripePriceId: string | null;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  trialEndsAt: Date | null;
  canceledAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Team {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  plan: SubscriptionPlan;
  status: TeamStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  role: TeamRole;
  invitedAt: Date;
  joinedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  domain: string;
  description: string | null;
  ownerId: string;
  teamId: string | null;
  status: ProjectStatus;
  settings: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectMember {
  id: string;
  projectId: string;
  userId: string;
  role: ProjectRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface Keyword {
  id: string;
  projectId: string;
  keyword: string;
  country: string;
  language: string;
  device: DeviceType;
  searchVolume: number | null;
  difficulty: number | null;
  cpc: number | null;
  competition: number | null;
  intent: SearchIntent | null;
  status: KeywordStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface KeywordPosition {
  id: string;
  keywordId: string;
  position: number | null;
  url: string | null;
  title: string | null;
  description: string | null;
  featured: boolean;
  localPack: boolean;
  previousRank: number | null;
  changeType: RankChange | null;
  checkedAt: Date;
  createdAt: Date;
}

export interface SerpResult {
  id: string;
  keywordId: string;
  position: number;
  url: string;
  title: string;
  description: string | null;
  domain: string;
  type: SerpType;
  features: string | null;
  checkedAt: Date;
  createdAt: Date;
}

export interface SiteAudit {
  id: string;
  projectId: string;
  createdBy: string;
  url: string;
  status: AuditStatus;
  overallScore: number | null;
  summary: any;
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date | null;
}

export interface AuditIssue {
  id: string;
  auditId: string;
  type: IssueType;
  severity: IssueSeverity;
  title: string;
  description: string;
  element: string | null;
  page: string | null;
  count: number;
  fixed: boolean;
  fixedAt: Date | null;
  createdAt: Date;
}

export interface AuditPage {
  id: string;
  auditId: string;
  url: string;
  statusCode: number;
  title: string | null;
  metaDescription: string | null;
  h1: string | null;
  wordCount: number | null;
  loadTime: number | null;
  size: number | null;
  internalLinks: number;
  externalLinks: number;
  images: number;
  issues: any;
  createdAt: Date;
}

export interface Backlink {
  id: string;
  projectId: string;
  sourceUrl: string;
  sourceDomain: string;
  targetUrl: string;
  anchorText: string | null;
  linkType: LinkType;
  status: BacklinkStatus;
  domainRating: number | null;
  pageRating: number | null;
  traffic: number | null;
  firstSeen: Date;
  lastSeen: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReferringDomain {
  id: string;
  projectId: string;
  domain: string;
  domainRating: number | null;
  backlinks: number;
  traffic: number | null;
  firstSeen: Date;
  lastSeen: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Competitor {
  id: string;
  projectId: string;
  domain: string;
  name: string | null;
  status: CompetitorStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompetitorMetric {
  id: string;
  competitorId: string;
  type: MetricType;
  value: number;
  change: number | null;
  checkedAt: Date;
  createdAt: Date;
}

export interface CompetitorKeyword {
  id: string;
  competitorId: string;
  keyword: string;
  position: number;
  url: string | null;
  traffic: number | null;
  checkedAt: Date;
  createdAt: Date;
}

export interface CompetitorBacklink {
  id: string;
  competitorId: string;
  sourceUrl: string;
  sourceDomain: string;
  anchorText: string | null;
  domainRating: number | null;
  traffic: number | null;
  checkedAt: Date;
  createdAt: Date;
}

export interface Report {
  id: string;
  projectId: string;
  createdBy: string;
  name: string;
  type: ReportType;
  frequency: ReportFrequency | null;
  recipients: string | null;
  config: any;
  data: any;
  status: ReportStatus;
  scheduledAt: Date | null;
  sentAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Crawl {
  id: string;
  projectId: string;
  startUrl: string;
  status: CrawlStatus;
  pages: number;
  errors: number;
  settings: any;
  results: any;
  startedAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiKey {
  id: string;
  userId: string;
  name: string;
  key: string;
  provider: ApiProvider;
  encrypted: string;
  status: ApiKeyStatus;
  lastUsed: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Legacy types
export interface Run {
  id: string;
  pageUrl: string;
  targetKeyword: string | null;
  email: string | null;
  status: RunStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Audit {
  id: string;
  runId: string;
  json: any;
  createdAt: Date;
}

export interface GscToken {
  id: string;
  state: string;
  tokens: any;
  createdAt: Date;
}

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  DELETED = "DELETED",
}

export enum SubscriptionPlan {
  FREE = "FREE",
  STARTER = "STARTER",
  PROFESSIONAL = "PROFESSIONAL",
  ENTERPRISE = "ENTERPRISE",
}

export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  CANCELED = "CANCELED",
  PAST_DUE = "PAST_DUE",
  UNPAID = "UNPAID",
  INCOMPLETE = "INCOMPLETE",
}

export enum TeamRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export enum TeamStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  DELETED = "DELETED",
}

export enum ProjectRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
  VIEWER = "VIEWER",
}

export enum ProjectStatus {
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  ARCHIVED = "ARCHIVED",
}

export enum DeviceType {
  DESKTOP = "DESKTOP",
  MOBILE = "MOBILE",
  TABLET = "TABLET",
}

export enum SearchIntent {
  INFORMATIONAL = "INFORMATIONAL",
  NAVIGATIONAL = "NAVIGATIONAL",
  TRANSACTIONAL = "TRANSACTIONAL",
  COMMERCIAL = "COMMERCIAL",
}

export enum KeywordStatus {
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  DELETED = "DELETED",
}

export enum RankChange {
  UP = "UP",
  DOWN = "DOWN",
  NEW = "NEW",
  SAME = "SAME",
  LOST = "LOST",
}

export enum SerpType {
  ORGANIC = "ORGANIC",
  PAID = "PAID",
  FEATURED_SNIPPET = "FEATURED_SNIPPET",
  PEOPLE_ALSO_ASK = "PEOPLE_ALSO_ASK",
  LOCAL_PACK = "LOCAL_PACK",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  NEWS = "NEWS",
  SHOPPING = "SHOPPING",
}

export enum AuditStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELED = "CANCELED",
}

export enum IssueType {
  TECHNICAL = "TECHNICAL",
  CONTENT = "CONTENT",
  META = "META",
  STRUCTURE = "STRUCTURE",
  PERFORMANCE = "PERFORMANCE",
  ACCESSIBILITY = "ACCESSIBILITY",
  MOBILE = "MOBILE",
}

export enum IssueSeverity {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  INFO = "INFO",
}

export enum LinkType {
  FOLLOW = "FOLLOW",
  NOFOLLOW = "NOFOLLOW",
  SPONSORED = "SPONSORED",
  UGC = "UGC",
}

export enum BacklinkStatus {
  ACTIVE = "ACTIVE",
  LOST = "LOST",
  REDIRECT = "REDIRECT",
  BROKEN = "BROKEN",
}

export enum CompetitorStatus {
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  DELETED = "DELETED",
}

export enum MetricType {
  ORGANIC_TRAFFIC = "ORGANIC_TRAFFIC",
  ORGANIC_KEYWORDS = "ORGANIC_KEYWORDS",
  BACKLINKS = "BACKLINKS",
  REFERRING_DOMAINS = "REFERRING_DOMAINS",
  DOMAIN_RATING = "DOMAIN_RATING",
  PAGE_RATING = "PAGE_RATING",
}

export enum ReportType {
  KEYWORD_RANKING = "KEYWORD_RANKING",
  SITE_AUDIT = "SITE_AUDIT",
  BACKLINK_ANALYSIS = "BACKLINK_ANALYSIS",
  COMPETITOR_ANALYSIS = "COMPETITOR_ANALYSIS",
  CUSTOM = "CUSTOM",
}

export enum ReportFrequency {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
}

export enum ReportStatus {
  DRAFT = "DRAFT",
  SCHEDULED = "SCHEDULED",
  GENERATING = "GENERATING",
  SENT = "SENT",
  FAILED = "FAILED",
}

export enum CrawlStatus {
  QUEUED = "QUEUED",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELED = "CANCELED",
}

export enum ApiProvider {
  GOOGLE_SEARCH_CONSOLE = "GOOGLE_SEARCH_CONSOLE",
  GOOGLE_ANALYTICS = "GOOGLE_ANALYTICS",
  GOOGLE_PAGESPEED = "GOOGLE_PAGESPEED",
  OPENAI = "OPENAI",
  DATAFORSEO = "DATAFORSEO",
  SERPAPI = "SERPAPI",
  MOZ = "MOZ",
  AHREFS = "AHREFS",
}

export enum ApiKeyStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  INVALID = "INVALID",
  SUSPENDED = "SUSPENDED",
}

export enum RunStatus {
  QUEUED = "QUEUED",
  RUNNING = "RUNNING",
  READY = "READY",
  FAILED = "FAILED",
}

// ============================================
// EXTENDED TYPES WITH RELATIONSHIPS
// ============================================

export interface UserWithSubscription extends User {
  subscriptions: Subscription[];
  ownedProjects: Project[];
  teamMembers: TeamMember[];
}

export interface ProjectWithMembers extends Project {
  owner: User;
  members: (ProjectMember & { user: User })[];
  team: Team | null;
}

export interface ProjectWithStats extends Project {
  keywords: Keyword[];
  siteAudits: SiteAudit[];
  backlinks: Backlink[];
  competitors: Competitor[];
}

export interface KeywordWithPositions extends Keyword {
  positions: KeywordPosition[];
}

export interface SiteAuditWithIssues extends SiteAudit {
  issues: AuditIssue[];
  pages: AuditPage[];
  creator: User;
}

export interface CompetitorWithMetrics extends Competitor {
  metrics: CompetitorMetric[];
  keywords: CompetitorKeyword[];
  backlinks: CompetitorBacklink[];
}

export interface ReportWithData extends Report {
  project: Project;
  creator: User;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface DashboardStats {
  totalProjects: number;
  totalKeywords: number;
  totalBacklinks: number;
  averagePosition: number;
  organicTraffic?: number;
  lastAuditScore?: number;
}

export interface ProjectStats {
  keywordCount: number;
  averagePosition: number;
  visibilityScore: number;
  backlinkCount: number;
  referringDomains: number;
  lastAuditScore?: number;
  lastAuditDate?: Date;
}

export interface KeywordMetrics {
  totalKeywords: number;
  topPositions: number; // positions 1-3
  improvements: number;
  declines: number;
  newKeywords: number;
  lostKeywords: number;
}

export interface AuditSummary {
  overallScore: number;
  criticalIssues: number;
  warningIssues: number;
  infoIssues: number;
  pagesCrawled: number;
  issuesByType: Record<IssueType, number>;
}

export interface BacklinkMetrics {
  totalBacklinks: number;
  referringDomains: number;
  followLinks: number;
  nofollowLinks: number;
  newBacklinks: number;
  lostBacklinks: number;
  averageDomainRating: number;
}

export interface CompetitorInsights {
  competitorCount: number;
  averagePosition: number;
  sharedKeywords: number;
  gapKeywords: number;
  topCompetitors: {
    domain: string;
    visibility: number;
    keywords: number;
  }[];
}

// ============================================
// FORM INPUT TYPES
// ============================================

export interface CreateProjectInput {
  name: string;
  domain: string;
  description?: string;
  teamId?: string;
}

export interface AddKeywordInput {
  keyword: string;
  country?: string;
  language?: string;
  device?: DeviceType;
}

export interface CreateAuditInput {
  projectId: string;
  url: string;
}

export interface AddCompetitorInput {
  projectId: string;
  domain: string;
  name?: string;
}

export interface CreateReportInput {
  projectId: string;
  name: string;
  type: ReportType;
  frequency?: ReportFrequency;
  recipients: string[];
  config: Record<string, any>;
}

// ============================================
// SEARCH & FILTER TYPES
// ============================================

export interface ProjectFilters {
  status?: ProjectStatus;
  ownerId?: string;
  teamId?: string;
  search?: string;
}

export interface KeywordFilters {
  status?: KeywordStatus;
  country?: string;
  device?: DeviceType;
  intent?: SearchIntent;
  position?: {
    min?: number;
    max?: number;
  };
  searchVolume?: {
    min?: number;
    max?: number;
  };
  search?: string;
}

export interface AuditFilters {
  status?: AuditStatus;
  dateRange?: {
    from: Date;
    to: Date;
  };
  minScore?: number;
  maxScore?: number;
}

export interface BacklinkFilters {
  status?: BacklinkStatus;
  linkType?: LinkType;
  domainRating?: {
    min?: number;
    max?: number;
  };
  dateRange?: {
    from: Date;
    to: Date;
  };
  search?: string;
}

// ============================================
// PAGINATION TYPES
// ============================================

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// ============================================
// API ERROR TYPES
// ============================================

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// ============================================
// CHART DATA TYPES
// ============================================

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface KeywordPositionChart {
  keyword: string;
  data: ChartDataPoint[];
  currentPosition: number;
  change: RankChange;
}

export interface TrafficChart {
  data: ChartDataPoint[];
  total: number;
  change: number;
  changePercent: number;
}

// ============================================
// SUBSCRIPTION & BILLING TYPES
// ============================================

export interface PlanLimits {
  projects: number;
  keywords: number;
  auditsPerMonth: number;
  reportsPerMonth: number;
  teamMembers: number;
  apiCalls: number;
}

export interface UsageStats {
  projects: number;
  keywords: number;
  auditsThisMonth: number;
  reportsThisMonth: number;
  teamMembers: number;
  apiCallsThisMonth: number;
}

export const PLAN_LIMITS: Record<SubscriptionPlan, PlanLimits> = {
  FREE: {
    projects: 1,
    keywords: 10,
    auditsPerMonth: 3,
    reportsPerMonth: 1,
    teamMembers: 1,
    apiCalls: 100,
  },
  STARTER: {
    projects: 3,
    keywords: 100,
    auditsPerMonth: 10,
    reportsPerMonth: 5,
    teamMembers: 3,
    apiCalls: 1000,
  },
  PROFESSIONAL: {
    projects: 10,
    keywords: 1000,
    auditsPerMonth: 50,
    reportsPerMonth: 20,
    teamMembers: 10,
    apiCalls: 10000,
  },
  ENTERPRISE: {
    projects: -1, // unlimited
    keywords: -1,
    auditsPerMonth: -1,
    reportsPerMonth: -1,
    teamMembers: -1,
    apiCalls: -1,
  },
};
