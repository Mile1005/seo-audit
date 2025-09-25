-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "image" TEXT,
    "password" TEXT,
    "emailVerificationSentAt" DATETIME,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "lastLoginAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "stripePriceId" TEXT,
    "plan" TEXT NOT NULL DEFAULT 'FREE',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "currentPeriodStart" DATETIME,
    "currentPeriodEnd" DATETIME,
    "trialEndsAt" DATETIME,
    "canceledAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "plan" TEXT NOT NULL DEFAULT 'FREE',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'MEMBER',
    "invitedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "joinedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TeamMember_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TeamMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "description" TEXT,
    "ownerId" TEXT NOT NULL,
    "teamId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "settings" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Project_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProjectMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'VIEWER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProjectMember_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProjectMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Keyword" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'US',
    "language" TEXT NOT NULL DEFAULT 'en',
    "device" TEXT NOT NULL DEFAULT 'DESKTOP',
    "searchVolume" INTEGER,
    "difficulty" REAL,
    "cpc" REAL,
    "competition" REAL,
    "intent" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "trend" JSONB,
    "seasonality" JSONB,
    "lastChecked" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Keyword_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "KeywordGroup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "KeywordGroup_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "KeywordGroupMembership" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "keywordId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "KeywordGroupMembership_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "Keyword" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "KeywordGroupMembership_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "KeywordGroup" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "KeywordCompetitor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "keywordId" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "url" TEXT,
    "position" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "domainRating" REAL,
    "backlinks" INTEGER,
    "checkedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "KeywordCompetitor_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "Keyword" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "KeywordSuggestion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "searchVolume" INTEGER,
    "difficulty" REAL,
    "relevanceScore" REAL,
    "seedKeyword" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "KeywordSuggestion_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RankingAlert" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "keywordId" TEXT,
    "type" TEXT NOT NULL,
    "threshold" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "emailEnabled" BOOLEAN NOT NULL DEFAULT true,
    "slackEnabled" BOOLEAN NOT NULL DEFAULT false,
    "webhookUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "lastTriggered" DATETIME,
    CONSTRAINT "RankingAlert_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RankingAlert_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "Keyword" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "KeywordPosition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "keywordId" TEXT NOT NULL,
    "position" INTEGER,
    "url" TEXT,
    "title" TEXT,
    "description" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "localPack" BOOLEAN NOT NULL DEFAULT false,
    "serpFeatures" JSONB,
    "previousRank" INTEGER,
    "changeType" TEXT,
    "change" INTEGER,
    "location" TEXT NOT NULL DEFAULT 'US',
    "device" TEXT NOT NULL DEFAULT 'DESKTOP',
    "checkedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "KeywordPosition_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "Keyword" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SerpResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "keywordId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "domain" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'ORGANIC',
    "features" JSONB,
    "metrics" JSONB,
    "location" TEXT NOT NULL DEFAULT 'US',
    "device" TEXT NOT NULL DEFAULT 'DESKTOP',
    "checkedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SerpResult_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "Keyword" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SiteAudit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "overallScore" INTEGER,
    "summary" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "completedAt" DATETIME,
    CONSTRAINT "SiteAudit_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SiteAudit_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuditIssue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "auditId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "element" TEXT,
    "page" TEXT,
    "count" INTEGER NOT NULL DEFAULT 1,
    "fixed" BOOLEAN NOT NULL DEFAULT false,
    "fixedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditIssue_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "SiteAudit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuditPage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "auditId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "title" TEXT,
    "metaDescription" TEXT,
    "h1" TEXT,
    "wordCount" INTEGER,
    "loadTime" REAL,
    "size" INTEGER,
    "internalLinks" INTEGER NOT NULL DEFAULT 0,
    "externalLinks" INTEGER NOT NULL DEFAULT 0,
    "images" INTEGER NOT NULL DEFAULT 0,
    "issues" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditPage_auditId_fkey" FOREIGN KEY ("auditId") REFERENCES "SiteAudit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Backlink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "sourceDomain" TEXT NOT NULL,
    "targetUrl" TEXT NOT NULL,
    "anchorText" TEXT,
    "linkType" TEXT NOT NULL DEFAULT 'FOLLOW',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "domainRating" INTEGER,
    "pageRating" INTEGER,
    "traffic" INTEGER,
    "isToxic" BOOLEAN NOT NULL DEFAULT false,
    "toxicScore" REAL,
    "linkStrength" TEXT NOT NULL DEFAULT 'NORMAL',
    "context" TEXT,
    "altText" TEXT,
    "isInternal" BOOLEAN NOT NULL DEFAULT false,
    "isNofollow" BOOLEAN NOT NULL DEFAULT false,
    "isSponsored" BOOLEAN NOT NULL DEFAULT false,
    "isUGC" BOOLEAN NOT NULL DEFAULT false,
    "httpStatus" INTEGER,
    "lastChecked" DATETIME,
    "firstSeen" DATETIME NOT NULL,
    "lastSeen" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Backlink_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReferringDomain" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "domainRating" INTEGER,
    "pageRating" INTEGER,
    "backlinkCount" INTEGER NOT NULL DEFAULT 0,
    "traffic" INTEGER,
    "category" TEXT,
    "language" TEXT,
    "country" TEXT,
    "isToxic" BOOLEAN NOT NULL DEFAULT false,
    "toxicScore" REAL,
    "trustFlow" INTEGER,
    "citationFlow" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "emailContacts" JSONB,
    "socialProfiles" JSONB,
    "technologies" JSONB,
    "lastChecked" DATETIME,
    "firstSeen" DATETIME NOT NULL,
    "lastSeen" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ReferringDomain_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LinkProspect" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "url" TEXT,
    "contactEmail" TEXT,
    "contactName" TEXT,
    "outreachStatus" TEXT NOT NULL DEFAULT 'NOT_CONTACTED',
    "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
    "domainRating" INTEGER,
    "traffic" INTEGER,
    "relevanceScore" REAL,
    "notes" TEXT,
    "lastContactedAt" DATETIME,
    "nextFollowupAt" DATETIME,
    "responseAt" DATETIME,
    "linkedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "LinkProspect_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OutreachCampaign" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "emailSubject" TEXT NOT NULL,
    "emailTemplate" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "targetCount" INTEGER NOT NULL DEFAULT 0,
    "sentCount" INTEGER NOT NULL DEFAULT 0,
    "responseCount" INTEGER NOT NULL DEFAULT 0,
    "linkCount" INTEGER NOT NULL DEFAULT 0,
    "startedAt" DATETIME,
    "completedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "OutreachCampaign_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OutreachCampaignProspect" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "campaignId" TEXT NOT NULL,
    "prospectId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NOT_CONTACTED',
    "sentAt" DATETIME,
    "openedAt" DATETIME,
    "repliedAt" DATETIME,
    "linkedAt" DATETIME,
    "bounced" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "OutreachCampaignProspect_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "OutreachCampaign" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "OutreachCampaignProspect_prospectId_fkey" FOREIGN KEY ("prospectId") REFERENCES "LinkProspect" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BacklinkMonitor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "checkInterval" INTEGER NOT NULL DEFAULT 24,
    "alertOnNew" BOOLEAN NOT NULL DEFAULT true,
    "alertOnLost" BOOLEAN NOT NULL DEFAULT true,
    "alertOnToxic" BOOLEAN NOT NULL DEFAULT true,
    "emailEnabled" BOOLEAN NOT NULL DEFAULT true,
    "slackWebhook" TEXT,
    "lastChecked" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "BacklinkMonitor_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DisavowFile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "domains" INTEGER NOT NULL DEFAULT 0,
    "urls" INTEGER NOT NULL DEFAULT 0,
    "uploadedToGSC" BOOLEAN NOT NULL DEFAULT false,
    "uploadedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DisavowFile_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Competitor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "name" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Competitor_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CompetitorMetric" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "competitorId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "change" REAL,
    "checkedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CompetitorMetric_competitorId_fkey" FOREIGN KEY ("competitorId") REFERENCES "Competitor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CompetitorKeyword" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "competitorId" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "url" TEXT,
    "traffic" INTEGER,
    "checkedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CompetitorKeyword_competitorId_fkey" FOREIGN KEY ("competitorId") REFERENCES "Competitor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CompetitorBacklink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "competitorId" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "sourceDomain" TEXT NOT NULL,
    "anchorText" TEXT,
    "domainRating" INTEGER,
    "traffic" INTEGER,
    "checkedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CompetitorBacklink_competitorId_fkey" FOREIGN KEY ("competitorId") REFERENCES "Competitor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "frequency" TEXT,
    "recipients" TEXT,
    "config" JSONB,
    "data" JSONB,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "scheduledAt" DATETIME,
    "sentAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Report_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Report_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Crawl" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "startUrl" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'QUEUED',
    "pages" INTEGER NOT NULL DEFAULT 0,
    "errors" INTEGER NOT NULL DEFAULT 0,
    "settings" JSONB,
    "results" JSONB,
    "startedAt" DATETIME,
    "completedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Crawl_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ApiKey" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "encrypted" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "lastUsed" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ApiKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Run" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pageUrl" TEXT NOT NULL,
    "targetKeyword" TEXT,
    "email" TEXT,
    "status" TEXT NOT NULL DEFAULT 'QUEUED',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Audit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "runId" TEXT NOT NULL,
    "json" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Audit_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GscToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "state" TEXT NOT NULL,
    "tokens" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "AuditRun" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'completed',
    "score" INTEGER,
    "error" TEXT,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" DATETIME,
    "result" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AuditIssueSnapshot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "auditRunId" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "type" TEXT,
    "location" TEXT,
    "selector" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditIssueSnapshot_auditRunId_fkey" FOREIGN KEY ("auditRunId") REFERENCES "AuditRun" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PublicShare" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "auditRunId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME,
    CONSTRAINT "PublicShare_auditRunId_fkey" FOREIGN KEY ("auditRunId") REFERENCES "AuditRun" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RecurringAudit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "lastRunAt" DATETIME,
    "nextRunAt" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "UserUsage" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "auditsThisMonth" INTEGER NOT NULL DEFAULT 0,
    "siteCrawlsThisMonth" INTEGER NOT NULL DEFAULT 0,
    "monthKey" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserUsage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_status_idx" ON "User"("status");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_stripeCustomerId_key" ON "Subscription"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_stripeSubscriptionId_key" ON "Subscription"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "Subscription_userId_idx" ON "Subscription"("userId");

-- CreateIndex
CREATE INDEX "Subscription_status_idx" ON "Subscription"("status");

-- CreateIndex
CREATE INDEX "Subscription_plan_idx" ON "Subscription"("plan");

-- CreateIndex
CREATE UNIQUE INDEX "Team_slug_key" ON "Team"("slug");

-- CreateIndex
CREATE INDEX "Team_ownerId_idx" ON "Team"("ownerId");

-- CreateIndex
CREATE INDEX "Team_slug_idx" ON "Team"("slug");

-- CreateIndex
CREATE INDEX "TeamMember_userId_idx" ON "TeamMember"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_teamId_userId_key" ON "TeamMember"("teamId", "userId");

-- CreateIndex
CREATE INDEX "Project_ownerId_idx" ON "Project"("ownerId");

-- CreateIndex
CREATE INDEX "Project_teamId_idx" ON "Project"("teamId");

-- CreateIndex
CREATE INDEX "Project_domain_idx" ON "Project"("domain");

-- CreateIndex
CREATE INDEX "Project_status_idx" ON "Project"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Project_ownerId_domain_key" ON "Project"("ownerId", "domain");

-- CreateIndex
CREATE INDEX "ProjectMember_userId_idx" ON "ProjectMember"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectMember_projectId_userId_key" ON "ProjectMember"("projectId", "userId");

-- CreateIndex
CREATE INDEX "Keyword_projectId_idx" ON "Keyword"("projectId");

-- CreateIndex
CREATE INDEX "Keyword_difficulty_idx" ON "Keyword"("difficulty");

-- CreateIndex
CREATE INDEX "Keyword_searchVolume_idx" ON "Keyword"("searchVolume");

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_keyword_projectId_country_device_key" ON "Keyword"("keyword", "projectId", "country", "device");

-- CreateIndex
CREATE INDEX "KeywordGroup_projectId_idx" ON "KeywordGroup"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "KeywordGroup_name_projectId_key" ON "KeywordGroup"("name", "projectId");

-- CreateIndex
CREATE INDEX "KeywordGroupMembership_keywordId_idx" ON "KeywordGroupMembership"("keywordId");

-- CreateIndex
CREATE INDEX "KeywordGroupMembership_groupId_idx" ON "KeywordGroupMembership"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "KeywordGroupMembership_keywordId_groupId_key" ON "KeywordGroupMembership"("keywordId", "groupId");

-- CreateIndex
CREATE INDEX "KeywordCompetitor_keywordId_idx" ON "KeywordCompetitor"("keywordId");

-- CreateIndex
CREATE INDEX "KeywordCompetitor_domain_idx" ON "KeywordCompetitor"("domain");

-- CreateIndex
CREATE INDEX "KeywordCompetitor_position_idx" ON "KeywordCompetitor"("position");

-- CreateIndex
CREATE INDEX "KeywordSuggestion_projectId_idx" ON "KeywordSuggestion"("projectId");

-- CreateIndex
CREATE INDEX "KeywordSuggestion_searchVolume_idx" ON "KeywordSuggestion"("searchVolume");

-- CreateIndex
CREATE INDEX "KeywordSuggestion_status_idx" ON "KeywordSuggestion"("status");

-- CreateIndex
CREATE UNIQUE INDEX "KeywordSuggestion_keyword_seedKeyword_projectId_key" ON "KeywordSuggestion"("keyword", "seedKeyword", "projectId");

-- CreateIndex
CREATE INDEX "RankingAlert_projectId_idx" ON "RankingAlert"("projectId");

-- CreateIndex
CREATE INDEX "RankingAlert_keywordId_idx" ON "RankingAlert"("keywordId");

-- CreateIndex
CREATE INDEX "RankingAlert_isActive_idx" ON "RankingAlert"("isActive");

-- CreateIndex
CREATE INDEX "KeywordPosition_keywordId_checkedAt_idx" ON "KeywordPosition"("keywordId", "checkedAt");

-- CreateIndex
CREATE INDEX "KeywordPosition_checkedAt_idx" ON "KeywordPosition"("checkedAt");

-- CreateIndex
CREATE INDEX "KeywordPosition_position_idx" ON "KeywordPosition"("position");

-- CreateIndex
CREATE INDEX "SerpResult_keywordId_checkedAt_idx" ON "SerpResult"("keywordId", "checkedAt");

-- CreateIndex
CREATE INDEX "SerpResult_domain_idx" ON "SerpResult"("domain");

-- CreateIndex
CREATE INDEX "SerpResult_position_idx" ON "SerpResult"("position");

-- CreateIndex
CREATE INDEX "SiteAudit_projectId_createdAt_idx" ON "SiteAudit"("projectId", "createdAt");

-- CreateIndex
CREATE INDEX "SiteAudit_status_idx" ON "SiteAudit"("status");

-- CreateIndex
CREATE INDEX "AuditIssue_auditId_severity_idx" ON "AuditIssue"("auditId", "severity");

-- CreateIndex
CREATE INDEX "AuditIssue_type_idx" ON "AuditIssue"("type");

-- CreateIndex
CREATE INDEX "AuditIssue_fixed_idx" ON "AuditIssue"("fixed");

-- CreateIndex
CREATE INDEX "AuditPage_auditId_idx" ON "AuditPage"("auditId");

-- CreateIndex
CREATE INDEX "AuditPage_statusCode_idx" ON "AuditPage"("statusCode");

-- CreateIndex
CREATE UNIQUE INDEX "AuditPage_auditId_url_key" ON "AuditPage"("auditId", "url");

-- CreateIndex
CREATE INDEX "Backlink_projectId_status_idx" ON "Backlink"("projectId", "status");

-- CreateIndex
CREATE INDEX "Backlink_sourceDomain_idx" ON "Backlink"("sourceDomain");

-- CreateIndex
CREATE INDEX "Backlink_lastSeen_idx" ON "Backlink"("lastSeen");

-- CreateIndex
CREATE INDEX "Backlink_isToxic_idx" ON "Backlink"("isToxic");

-- CreateIndex
CREATE INDEX "Backlink_domainRating_idx" ON "Backlink"("domainRating");

-- CreateIndex
CREATE UNIQUE INDEX "Backlink_projectId_sourceUrl_targetUrl_key" ON "Backlink"("projectId", "sourceUrl", "targetUrl");

-- CreateIndex
CREATE INDEX "ReferringDomain_projectId_idx" ON "ReferringDomain"("projectId");

-- CreateIndex
CREATE INDEX "ReferringDomain_domain_idx" ON "ReferringDomain"("domain");

-- CreateIndex
CREATE INDEX "ReferringDomain_domainRating_idx" ON "ReferringDomain"("domainRating");

-- CreateIndex
CREATE INDEX "ReferringDomain_isToxic_idx" ON "ReferringDomain"("isToxic");

-- CreateIndex
CREATE INDEX "ReferringDomain_category_idx" ON "ReferringDomain"("category");

-- CreateIndex
CREATE UNIQUE INDEX "ReferringDomain_projectId_domain_key" ON "ReferringDomain"("projectId", "domain");

-- CreateIndex
CREATE INDEX "LinkProspect_projectId_idx" ON "LinkProspect"("projectId");

-- CreateIndex
CREATE INDEX "LinkProspect_outreachStatus_idx" ON "LinkProspect"("outreachStatus");

-- CreateIndex
CREATE INDEX "LinkProspect_priority_idx" ON "LinkProspect"("priority");

-- CreateIndex
CREATE INDEX "LinkProspect_nextFollowupAt_idx" ON "LinkProspect"("nextFollowupAt");

-- CreateIndex
CREATE UNIQUE INDEX "LinkProspect_projectId_domain_key" ON "LinkProspect"("projectId", "domain");

-- CreateIndex
CREATE INDEX "OutreachCampaign_projectId_idx" ON "OutreachCampaign"("projectId");

-- CreateIndex
CREATE INDEX "OutreachCampaign_status_idx" ON "OutreachCampaign"("status");

-- CreateIndex
CREATE INDEX "OutreachCampaignProspect_campaignId_idx" ON "OutreachCampaignProspect"("campaignId");

-- CreateIndex
CREATE INDEX "OutreachCampaignProspect_prospectId_idx" ON "OutreachCampaignProspect"("prospectId");

-- CreateIndex
CREATE INDEX "OutreachCampaignProspect_status_idx" ON "OutreachCampaignProspect"("status");

-- CreateIndex
CREATE UNIQUE INDEX "OutreachCampaignProspect_campaignId_prospectId_key" ON "OutreachCampaignProspect"("campaignId", "prospectId");

-- CreateIndex
CREATE INDEX "BacklinkMonitor_projectId_idx" ON "BacklinkMonitor"("projectId");

-- CreateIndex
CREATE INDEX "BacklinkMonitor_isActive_idx" ON "BacklinkMonitor"("isActive");

-- CreateIndex
CREATE INDEX "BacklinkMonitor_lastChecked_idx" ON "BacklinkMonitor"("lastChecked");

-- CreateIndex
CREATE INDEX "DisavowFile_projectId_idx" ON "DisavowFile"("projectId");

-- CreateIndex
CREATE INDEX "DisavowFile_uploadedToGSC_idx" ON "DisavowFile"("uploadedToGSC");

-- CreateIndex
CREATE INDEX "Competitor_projectId_idx" ON "Competitor"("projectId");

-- CreateIndex
CREATE INDEX "Competitor_domain_idx" ON "Competitor"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "Competitor_projectId_domain_key" ON "Competitor"("projectId", "domain");

-- CreateIndex
CREATE INDEX "CompetitorMetric_competitorId_type_checkedAt_idx" ON "CompetitorMetric"("competitorId", "type", "checkedAt");

-- CreateIndex
CREATE INDEX "CompetitorKeyword_competitorId_keyword_idx" ON "CompetitorKeyword"("competitorId", "keyword");

-- CreateIndex
CREATE INDEX "CompetitorKeyword_competitorId_position_idx" ON "CompetitorKeyword"("competitorId", "position");

-- CreateIndex
CREATE INDEX "CompetitorBacklink_competitorId_sourceDomain_idx" ON "CompetitorBacklink"("competitorId", "sourceDomain");

-- CreateIndex
CREATE INDEX "Report_projectId_type_idx" ON "Report"("projectId", "type");

-- CreateIndex
CREATE INDEX "Report_status_idx" ON "Report"("status");

-- CreateIndex
CREATE INDEX "Report_scheduledAt_idx" ON "Report"("scheduledAt");

-- CreateIndex
CREATE INDEX "Crawl_projectId_status_idx" ON "Crawl"("projectId", "status");

-- CreateIndex
CREATE INDEX "Crawl_status_idx" ON "Crawl"("status");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_key_key" ON "ApiKey"("key");

-- CreateIndex
CREATE INDEX "ApiKey_userId_idx" ON "ApiKey"("userId");

-- CreateIndex
CREATE INDEX "ApiKey_provider_idx" ON "ApiKey"("provider");

-- CreateIndex
CREATE INDEX "ApiKey_status_idx" ON "ApiKey"("status");

-- CreateIndex
CREATE INDEX "Audit_runId_idx" ON "Audit"("runId");

-- CreateIndex
CREATE UNIQUE INDEX "GscToken_state_key" ON "GscToken"("state");

-- CreateIndex
CREATE INDEX "AuditRun_url_idx" ON "AuditRun"("url");

-- CreateIndex
CREATE INDEX "AuditRun_status_idx" ON "AuditRun"("status");

-- CreateIndex
CREATE INDEX "AuditRun_createdAt_idx" ON "AuditRun"("createdAt");

-- CreateIndex
CREATE INDEX "AuditIssueSnapshot_auditRunId_idx" ON "AuditIssueSnapshot"("auditRunId");

-- CreateIndex
CREATE INDEX "AuditIssueSnapshot_severity_idx" ON "AuditIssueSnapshot"("severity");

-- CreateIndex
CREATE INDEX "AuditIssueSnapshot_category_idx" ON "AuditIssueSnapshot"("category");

-- CreateIndex
CREATE UNIQUE INDEX "PublicShare_token_key" ON "PublicShare"("token");

-- CreateIndex
CREATE INDEX "PublicShare_auditRunId_idx" ON "PublicShare"("auditRunId");

-- CreateIndex
CREATE INDEX "PublicShare_token_idx" ON "PublicShare"("token");

-- CreateIndex
CREATE INDEX "RecurringAudit_isActive_nextRunAt_idx" ON "RecurringAudit"("isActive", "nextRunAt");

-- CreateIndex
CREATE INDEX "RecurringAudit_url_idx" ON "RecurringAudit"("url");

-- CreateIndex
CREATE INDEX "UserUsage_monthKey_idx" ON "UserUsage"("monthKey");
