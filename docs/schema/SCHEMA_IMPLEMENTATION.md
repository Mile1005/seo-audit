# Schema.org Structured Data Implementation Guide

## Overview

Comprehensive Schema.org implementation across AISEOTurbo to improve SEO, rich snippets, and search engine understanding.

## Global Schemas (app/layout.tsx)

### 1. Organization/SoftwareApplication Schema

**Location:** Every page (via root layout)

**Purpose:** Tells search engines about your business, contact info, and software

**Includes:**

- Company name and logo
- Contact points (support, sales, billing)
- Founder information (Mile Stoev)
- Social media profiles
- Location (Skopje, Macedonia)
- Rating (4.8/5 from 1000 reviews)
- Features list
- Pricing range ($0-$99)

### 2. WebSite Schema

**Location:** Every page (via root layout)

**Purpose:** Enables sitewide search in Google

**Includes:**

- Site name and URL
- Search action capability
- Language (en-US)

## Page-Specific Schemas

### Pricing Page (`/pricing`)

**Schema Type:** Product + AggregateOffer

**Implementation:**

```typescript
import { StructuredData, generateProductSchema } from '@/components/seo/StructuredData'

const pricingSchemas = [
  generateProductSchema({
    name: "AISEOTurbo Free Plan",
    description: "Free SEO audits with basic features",
    price: "0",
    currency: "USD",
    url: "https://www.aiseoturbo.com/pricing",
    features: ["10 audits per month", "Basic SEO checks", "Email support"]
  }),
  generateProductSchema({
    name: "AISEOTurbo Pro Plan",
    description: "Professional SEO audits with advanced features",
    price: "29",
    currency: "USD",
    url: "https://www.aiseoturbo.com/pricing",
    features: ["Unlimited audits", "Advanced SEO checks", "Priority support", "API access"]
  })
]

// In component
<StructuredData data={pricingSchemas} />
```

### Blog Posts (`/blog/[slug]`)

**Schema Type:** Article

**Implementation:**

```typescript
import { StructuredData, generateArticleSchema } from '@/components/seo/StructuredData'

const articleSchema = generateArticleSchema({
  title: "How to Improve Your SEO Rankings",
  description: "Complete guide to SEO improvement",
  author: "Mile Stoev",
  datePublished: "2025-10-14",
  dateModified: "2025-10-14",
  image: "https://www.aiseoturbo.com/blog/seo-guide.jpg",
  url: "https://www.aiseoturbo.com/blog/seo-guide"
})

<StructuredData data={articleSchema} />
```

### Help/FAQ Pages (`/help`)

**Schema Type:** FAQPage

**Implementation:**

```typescript
import { StructuredData, generateFAQSchema } from '@/components/seo/StructuredData'

const faqSchema = generateFAQSchema([
  {
    question: "How does AISEOTurbo work?",
    answer: "AISEOTurbo analyzes your website using AI-powered algorithms to identify SEO issues and provide actionable recommendations."
  },
  {
    question: "How long does an audit take?",
    answer: "Most audits complete in 2-3 minutes, providing instant insights into your website's SEO health."
  }
])

<StructuredData data={faqSchema} />
```

### How-To Guides

**Schema Type:** HowTo

**Implementation:**

```typescript
import { StructuredData, generateHowToSchema } from '@/components/seo/StructuredData'

const howToSchema = generateHowToSchema({
  name: "How to Run an SEO Audit",
  description: "Step-by-step guide to running comprehensive SEO audits",
  steps: [
    { name: "Enter your URL", text: "Go to AISEOTurbo and enter your website URL" },
    { name: "Start the audit", text: "Click 'Start Audit' to begin analysis" },
    { name: "Review results", text: "Review the comprehensive SEO report" },
    { name: "Implement fixes", text: "Follow the actionable recommendations" }
  ]
})

<StructuredData data={howToSchema} />
```

### Breadcrumbs (All Pages)

**Schema Type:** BreadcrumbList

**Implementation:**

```typescript
import { StructuredData, generateBreadcrumbSchema } from '@/components/seo/StructuredData'

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.aiseoturbo.com" },
  { name: "Help", url: "https://www.aiseoturbo.com/help" },
  { name: "Getting Started", url: "https://www.aiseoturbo.com/help/getting-started" }
])

<StructuredData data={breadcrumbSchema} />
```

## Schema Validation

### Tools to Validate Your Schemas

1. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Tests: All schema types
   - Shows preview of rich results

2. **Schema Markup Validator**
   - URL: https://validator.schema.org/
   - Tests: Schema.org compliance
   - Detailed error reporting

3. **Google Search Console**
   - Check "Enhancements" section
   - Monitor rich results performance
   - See which schemas are indexed

## Schema Priority by Page Type

### Homepage

- ✅ Organization (Global)
- ✅ WebSite (Global)
- ⭐ Service (Add this)

### Pricing Page

- ✅ Organization (Global)
- ⭐ Product/Offer (Add this)
- ⭐ AggregateOffer for multiple plans

### Blog Posts

- ✅ Organization (Global)
- ⭐ Article
- ⭐ Breadcrumb
- ⭐ Author Person schema

### Help/Documentation

- ✅ Organization (Global)
- ⭐ FAQPage
- ⭐ HowTo (for guides)
- ⭐ Breadcrumb

### Contact Page

- ✅ Organization (Global - includes contact points)
- ⭐ ContactPage type

### About Page

- ✅ Organization (Global - includes founder)
- ⭐ AboutPage type
- ⭐ Team members (Person schema)

## Benefits of Schema Implementation

### SEO Benefits

- 📈 **Rich Snippets** - Enhanced search results with ratings, prices, etc.
- 🎯 **Better Click-Through Rate** - More attractive search results
- 🔍 **Knowledge Panel** - Potential for branded knowledge panel
- ⭐ **Star Ratings** - Show aggregate ratings in search
- 💰 **Price Display** - Show pricing directly in results

### Search Features Enabled

- **Sitewide Search** - Users can search your site from Google
- **FAQ Rich Results** - FAQ accordion in search results
- **How-To Rich Results** - Step-by-step guides in search
- **Article Rich Results** - Blog posts with author, date, image
- **Product Rich Results** - Pricing page with product cards

### AI & Voice Search

- Better understanding by AI assistants (ChatGPT, Gemini, etc.)
- Improved voice search results
- More accurate AI-generated summaries

## Implementation Checklist

### Phase 1: Global (✅ Complete)

- [x] Organization schema in layout
- [x] WebSite schema with search action
- [x] Social media links
- [x] Contact points
- [x] Founder information
- [x] Ratings and reviews

### Phase 2: Key Pages (To Do)

- [ ] Add Product schema to pricing page
- [ ] Add FAQ schema to help pages
- [ ] Add Service schema to features pages
- [ ] Add Breadcrumb to all pages

### Phase 3: Content (To Do)

- [ ] Article schema for blog posts
- [ ] HowTo schema for guides
- [ ] Video schema (if adding videos)
- [ ] Review schema (for testimonials)

### Phase 4: Advanced (Future)

- [ ] Event schema (for webinars/launches)
- [ ] Course schema (if adding courses)
- [ ] JobPosting schema (for careers page)
- [ ] Q&A schema (for community features)

## Monitoring & Maintenance

### Weekly

- Check Google Search Console for schema errors
- Monitor rich results impressions
- Review structured data coverage report

### Monthly

- Validate all schemas after content updates
- Check for new schema types to implement
- Update aggregate ratings based on new reviews

### Quarterly

- Review schema best practices (Google updates)
- Audit all pages for missing schemas
- Update company information if changed

## Common Issues & Solutions

### Issue: Schema Not Showing in Search

**Solution:**

- Wait 2-4 weeks for Google to process
- Ensure schema is valid (use validator)
- Check robots.txt isn't blocking indexing
- Verify page is indexed in Search Console

### Issue: Schema Validation Errors

**Solution:**

- Use schema validator tools
- Check for required fields
- Ensure proper JSON formatting
- Remove any non-standard fields

### Issue: Duplicate Schema

**Solution:**

- Check for multiple schema blocks
- Ensure child pages don't duplicate parent schemas
- Use @id to link related entities

## Best Practices

1. **Use @id for Entity Linking**
   - Link related schemas with unique IDs
   - Example: `"@id": "https://www.aiseoturbo.com/#organization"`

2. **Keep It Accurate**
   - Only add schemas for content that exists
   - Update schemas when content changes
   - Remove schemas for deleted content

3. **Follow Google Guidelines**
   - Don't add spammy or misleading data
   - Ensure schema matches visible content
   - Use recommended schema types

4. **Test Before Deploy**
   - Always validate in testing environment
   - Use Rich Results Test
   - Check mobile and desktop views

5. **Monitor Performance**
   - Track rich result impressions
   - Monitor CTR improvements
   - A/B test schema variations

## Resources

- **Schema.org Documentation:** https://schema.org/
- **Google Search Central:** https://developers.google.com/search/docs/appearance/structured-data
- **Schema Markup Generator:** https://technicalseo.com/tools/schema-markup-generator/
- **JSON-LD Playground:** https://json-ld.org/playground/

---

**Last Updated:** October 14, 2025
**Status:** Phase 1 Complete (Global schemas implemented)
**Next Steps:** Add page-specific schemas (Product, FAQ, Article)
