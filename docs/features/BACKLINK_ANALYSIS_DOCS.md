# Backlink Analysis Module Documentation

## Overview

The Backlink Analysis Module is a comprehensive system similar to Ahrefs that provides complete backlink monitoring, analysis, and link building capabilities.

## Features Implemented

### 1. Database Schema

- **Backlinks Table**: Stores individual backlink data with toxicity analysis
- **ReferringDomains Table**: Tracks domain-level metrics and properties
- **LinkProspects Table**: Manages outreach opportunities
- **OutreachCampaigns Table**: Handles link building campaigns
- **DisavowFiles Table**: Generates and manages disavow files

### 2. API Endpoints

#### Main Backlinks API (`/api/backlinks`)

- **GET**: Fetch backlinks with advanced filtering (status, domain rating, toxic links, etc.)
- **POST**: Bulk import/update backlinks with automatic domain detection
- **PUT**: Update backlink status or toxic markers
- **DELETE**: Remove backlinks

#### Referring Domains API (`/api/backlinks/domains`)

- **GET**: Fetch referring domains with category and rating analysis
- **POST**: Bulk update domain information and metrics

#### Link Prospects API (`/api/backlinks/prospects`)

- **GET**: Fetch outreach prospects with status filtering
- **POST**: Create new prospects for link building campaigns
- **PUT**: Update outreach status and contact information
- **DELETE**: Remove prospects

#### Disavow File API (`/api/backlinks/disavow`)

- **GET**: Fetch existing disavow files
- **POST**: Generate disavow files from toxic backlinks
- **PUT**: Mark files as uploaded to Google Search Console
- **DELETE**: Remove disavow files

#### Mock Data API (`/api/backlinks/mock-data`)

- **POST**: Generate realistic demo data for testing (100+ backlinks)

### 3. Dashboard Components

#### Main Dashboard (`/dashboard/backlinks`)

- **Overview Tab**: Stats, charts, and recent activity
- **Backlinks Tab**: Filterable table with advanced search
- **Domains Tab**: Referring domain analysis
- **Toxic Analysis Tab**: Harmful link identification
- **Prospects Tab**: Link building opportunities

#### Key Metrics Displayed

- Total backlinks and referring domains
- Average domain rating
- Toxic link count and health score
- Domain rating distribution charts
- Link type breakdown (Follow/NoFollow)
- Recent backlink discoveries

### 4. Advanced Features

#### Toxicity Detection

- Automatic toxic score calculation (0-100)
- Domain-level and link-level analysis
- Integration with disavow file generation

#### Link Strength Analysis

- Categorizes links as: WEAK, NORMAL, STRONG, VERY_STRONG
- Based on domain rating and other quality metrics

#### Comprehensive Filtering

- Status (Active, Lost, Broken, Redirect)
- Domain rating ranges
- Link types (Follow, NoFollow, Sponsored, UGC)
- Toxic vs clean links
- Domain search and category filtering

## API Integration Setup

### For Production with Real APIs

When you have access to Moz Links API or Majestic API, simply:

1. Add API keys to environment variables:

```bash
MOZ_ACCESS_ID=your_moz_access_id
MOZ_SECRET_KEY=your_moz_secret_key
MAJESTIC_API_KEY=your_majestic_api_key
```

2. Update the backlink import service to use real data instead of mock data

3. The database schema and API endpoints are already designed to handle real backlink data

### Mock Data for Demo

- Use the `/api/backlinks/mock-data` endpoint to generate realistic demo data
- Creates 100+ backlinks from high-authority and low-quality domains
- Includes toxic links for testing disavow functionality

## Usage Examples

### Generate Demo Data

```javascript
// Generate 100 mock backlinks for a project
fetch("/api/backlinks/mock-data", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    projectId: "your-project-id",
    count: 100,
  }),
});
```

### Fetch Backlinks with Filtering

```javascript
const params = new URLSearchParams({
  projectId: "your-project-id",
  toxic: "false", // Only clean links
  minDomainRating: "50", // Domain rating >= 50
  status: "ACTIVE", // Only active links
  page: "1",
  limit: "50",
});

const response = await fetch(`/api/backlinks?${params}`);
const data = await response.json();
```

### Generate Disavow File

```javascript
// Generate disavow file from all toxic links
fetch("/api/backlinks/disavow", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    projectId: "your-project-id",
    includeAllToxic: true,
    customDomains: ["spam-site.com", "bad-domain.net"],
  }),
});
```

## Dashboard Access

Visit `/dashboard/backlinks` to access the full backlink analysis interface with:

- Real-time statistics and charts
- Advanced filtering and search
- Bulk operations
- Export capabilities
- Link building prospect management

## Future Enhancements

- Email finder integration (Hunter.io)
- Automated outreach campaigns
- Competitor backlink gap analysis
- Content-based link opportunities
- Advanced toxic link algorithms
- GSC integration for disavow uploads

## Support

The system is built with TypeScript, proper error handling, and rate limiting ready for external API integration. All components are responsive and production-ready.
