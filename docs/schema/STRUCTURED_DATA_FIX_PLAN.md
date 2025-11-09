# Structured Data Validation Errors - Fix Plan

## Date: October 20, 2025

## Issues Identified

From Screaming Frog audit:
- **52 pages**: "Google rich results validation error"
- **7 pages**: "Schema.org validation error + Google rich results validation error"
- **1 page**: "Google rich results validation error + Schema.org validation warning"

## Root Causes

### 1. **Organization Schema Issues**
**Problem**: Missing or invalid required fields for Organization
**Affected**: ALL 60 pages (Organization appears on every page)

**Current Issues**:
- ❌ Missing `image` as ImageObject (has string URL instead)
- ❌ Missing required `address` property
- ❌ `logo` should be ImageObject, not string
- ❌ Missing `telephone` for contact

**Fix Required**:
```json
{
  "@type": "Organization",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.aiseoturbo.com/logo.png",
    "width": 600,
    "height": 60
  },
  "image": {
    "@type": "ImageObject",
    "url": "https://www.aiseoturbo.com/logo.png",
    "width": 1200,
    "height": 630
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Partizanska 24",
    "addressLocality": "Skopje",
    "postalCode": "1000",
    "addressCountry": "MK"
  },
  "telephone": "+389-2-xxx-xxxx"
}
```

### 2. **SoftwareApplication Schema Issues**
**Problem**: Missing required fields for Google rich results
**Affected**: ALL 60 pages

**Current Issues**:
- ❌ `image` is string URL (should be ImageObject)
- ❌ Missing `author` as proper reference
- ❌ `aggregateRating` needs more specific counts

**Fix Required**:
```json
{
  "@type": "SoftwareApplication",
  "image": {
    "@type": "ImageObject",
    "url": "https://www.aiseoturbo.com/logo.png",
    "width": 1200,
    "height": 630
  },
  "author": {
    "@type": "Organization",
    "@id": "https://www.aiseoturbo.com/#organization"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1000",
    "reviewCount": "1000",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

### 3. **FAQPage Schema Issues**
**Problem**: Schema.org validation errors in FAQ structure
**Affected**: 7 pages (features pages with FAQs)

**Current Issues**:
- ❌ Missing `mainEntity` wrapper
- ❌ Answer text may have HTML that needs escaping

**Fix Required**:
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does it work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Plain text answer without HTML tags"
      }
    }
  ]
}
```

### 4. **BlogPosting Schema Issues**
**Problem**: Missing publisher logo dimensions
**Affected**: 6 blog post pages

**Current Issues**:
- ❌ `publisher.logo` missing width/height
- ❌ `image` needs to be ImageObject with dimensions

**Fix Required**: Already correct in StructuredData.tsx - just needs consistent use

### 5. **ItemList Schema Issues**
**Problem**: Missing required properties
**Affected**: 2 pages (blog index, case studies index)

**Current Issues**:
- ❌ Need proper `itemListElement` structure
- ❌ Missing position numbering

### 6. **HowTo Schema Issues**
**Problem**: Steps need proper structure
**Affected**: 4 help article pages

**Current Issues**:
- ✅ Actually looks correct - may be false positive

## Fix Priority

### HIGH PRIORITY (Fixes 52 pages immediately)
1. **Fix Organization Schema** in `app/layout.tsx`
   - Convert logo and image to ImageObject
   - Add complete address
   - Add telephone

2. **Fix SoftwareApplication Schema** in `app/layout.tsx`
   - Convert image to ImageObject
   - Fix aggregateRating structure

### MEDIUM PRIORITY (Fixes 7 pages)
3. **Fix FAQPage Schema** in `components/seo/StructuredData.tsx`
   - Ensure proper mainEntity structure
   - Sanitize HTML in answers

### LOW PRIORITY (Fixes 2 pages)
4. **Fix ItemList Schema** in blog and case studies pages
   - Add proper itemListElement
   - Add position to each item

## Files to Edit

1. ✅ **app/layout.tsx** (lines 87-230)
   - Fix Organization schema
   - Fix SoftwareApplication schema
   - Fix WebSite schema

2. ✅ **components/seo/StructuredData.tsx** (lines 31-46)
   - Ensure FAQ schema has mainEntity
   - Already correct - verify usage

3. ✅ **Blog index pages** (app/blog/page.tsx)
   - Fix ItemList schema

4. ✅ **Case studies index** (app/case-studies/page.tsx)
   - Fix ItemList schema

## Expected Results After Fix

- ✅ **0 Google rich results validation errors** (currently 52)
- ✅ **0 Schema.org validation errors** (currently 7)  
- ✅ **0 Schema.org validation warnings** (currently 1)
- ✅ **Rich snippets eligible** for Organization, Product, FAQs
- ✅ **Knowledge Graph eligible** for Organization

## Validation Tools

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema.org Validator**: https://validator.schema.org/
3. **Screaming Frog SEO Spider**: Re-crawl after fixes

## Implementation Steps

1. Fix Organization schema (highest impact)
2. Fix SoftwareApplication schema
3. Test with Google Rich Results tool
4. Deploy and verify
5. Fix remaining FAQPage issues
6. Fix ItemList issues
7. Final validation sweep

---

**Estimated Time**: 30-45 minutes
**Impact**: Clean structured data across all 60 pages
**SEO Benefit**: Rich snippets eligible, better SERP appearance, Knowledge Graph potential
