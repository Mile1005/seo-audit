# JSON-LD SCHEMA QUICK REFERENCE GUIDE
**Quick lookup for schema implementation status**

---

## 📊 SCHEMA STATUS BY PAGE

### ✅ COMPLETE (Global Schemas)
| Schema Type | Location | Status |
|-------------|----------|--------|
| Organization | `/app/layout.tsx` | ✅ Perfect |
| SoftwareApplication | `/app/layout.tsx` | ✅ Perfect |
| WebSite + SearchAction | `/app/layout.tsx` | ✅ Perfect |

---

### ⚠️ PARTIAL (Implemented but needs enhancement)
| Page | Current Schema | Missing | Priority |
|------|----------------|---------|----------|
| All Case Studies (6) | Article | Review/Rating | 🟠 Medium |
| `/help/troubleshooting/audit-issues` | TroubleshootingGuide + FAQPage | BreadcrumbList | 🟡 Low |
| `/help/getting-started/quick-start` | HowTo | BreadcrumbList | 🟡 Low |
| `/help/getting-started/dashboard-setup` | HowTo | BreadcrumbList | 🟡 Low |
| `/help/getting-started/seo-scores` | Article | BreadcrumbList | 🟡 Low |

---

### ❌ MISSING (Critical - Need immediate attention)

#### Blog Posts (6 pages) - 🔴 CRITICAL
All need **BlogPosting** schema:
- `/blog/ai-powered-seo-future`
- `/blog/complete-seo-audit-checklist-2025`
- `/blog/content-seo-creating-search-friendly-content`
- `/blog/core-web-vitals-optimization-guide`
- `/blog/local-seo-strategies-that-work`
- `/blog/technical-seo-best-practices-2025`

**Required Properties:**
- headline, description, image
- datePublished, dateModified
- author (Person), publisher (Organization)
- mainEntityOfPage, wordCount, keywords

---

#### Marketing Pages - 🔴 HIGH Priority

| Page | Missing Schema | Impact | Priority |
|------|----------------|--------|----------|
| `/pricing` | Product/Offer + FAQPage | Very High | 🔴 Critical |
| `/about` | AboutPage | Medium | 🟠 High |
| `/features/seo-audit` | Service/SoftwareFeature + FAQPage | Medium | 🟠 High |
| `/features/site-crawler` | Service/SoftwareFeature + FAQPage | Medium | 🟠 High |
| `/features/backlink-analysis` | Service/SoftwareFeature + FAQPage | Medium | 🟠 High |
| `/features/keyword-research` | Service/SoftwareFeature + FAQPage | Medium | 🟠 High |
| `/features/competitor-analysis` | Service/SoftwareFeature + FAQPage | Medium | 🟠 High |

---

#### Help Pages (24 pages) - 🟡 MEDIUM Priority
Most help pages need **HowTo** or **Article** schemas

**Categories:**
- Getting Started: 3 pages (1 has schema, 2 need)
- Dashboard Guide: 5 pages (0 have schemas)
- Audit Types: 4 pages (0 have schemas)
- Understanding Reports: 4 pages (0 have schemas)
- Troubleshooting: 4 pages (1 has schema, 3 need)
- Advanced Features: 4 pages (0 have schemas)

---

## 🎯 IMPLEMENTATION PRIORITIES

### Week 1 - CRITICAL (Must Do)
1. ✅ Add **BlogPosting** to all 6 blog posts
2. ✅ Add **Product/Offer** schema to `/pricing`
3. ✅ Add **FAQPage** schema to `/pricing`

**Expected Impact:** +25-35% CTR on blog, +20% pricing visibility

---

### Week 2 - HIGH (Should Do)
4. ✅ Add **AboutPage** schema to `/about`
5. ✅ Add **Service** schemas to all 5 feature pages
6. ✅ Add **FAQPage** schemas to feature pages
7. ✅ Enhance case study schemas with **Review/Rating**

**Expected Impact:** +15-20% overall rich snippet coverage

---

### Week 3-4 - MEDIUM (Nice to Have)
8. ✅ Add **BreadcrumbList** to all pages
9. ✅ Extend **HowTo** schemas to all help tutorials
10. ✅ Add more **FAQPage** schemas to help section

**Expected Impact:** Better navigation, +10-15% help page visibility

---

## 🔧 QUICK IMPLEMENTATION SNIPPETS

### BlogPosting (for blog posts)
```tsx
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Your Blog Title",
  "image": "https://www.aiseoturbo.com/blog/image.jpg",
  "datePublished": "2025-10-20T10:00:00+00:00",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "publisher": {
    "@type": "Organization",
    "name": "AISEOTurbo",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.aiseoturbo.com/logo.png"
    }
  }
}
</script>
```

### FAQPage (for pricing, features, help)
```tsx
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is included?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Full answer here..."
      }
    }
  ]
}
</script>
```

### Product (for pricing page)
```tsx
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "AI SEO Turbo",
  "offers": {
    "@type": "Offer",
    "price": "49",
    "priceCurrency": "USD"
  }
}
</script>
```

### BreadcrumbList (for all pages)
```tsx
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.aiseoturbo.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Section"
    }
  ]
}
</script>
```

---

## 📋 TESTING CHECKLIST

Before deploying:
- [ ] Test with Google Rich Results Test
- [ ] Validate with Schema.org validator
- [ ] Check all required properties present
- [ ] Verify dates in ISO 8601 format
- [ ] Ensure URLs are absolute
- [ ] No duplicate schemas on page
- [ ] JSON syntax is valid

**Test URLs:**
- https://search.google.com/test/rich-results
- https://validator.schema.org/

---

## 📈 SUCCESS METRICS

Track in Google Search Console:

| Metric | Current | Target | Timeline |
|--------|---------|--------|----------|
| Schema Coverage | 26% | 90%+ | 4-6 weeks |
| Blog CTR | Baseline | +20-30% | 2-4 weeks |
| Pricing CTR | Baseline | +15-25% | 2-4 weeks |
| Rich Results | ~13 pages | 45+ pages | 4-6 weeks |
| Schema Errors | Unknown | 0 critical | Ongoing |

---

## 🚨 COMMON MISTAKES TO AVOID

❌ **DON'T:**
- Use relative URLs (use absolute: `https://...`)
- Mix Article + BlogPosting on same page
- Include content not visible on page
- Ignore required properties
- Skip testing before deployment
- Use wrong date format (must be ISO 8601)
- Nest JSON-LD scripts (keep separate)

✅ **DO:**
- Test every schema before deploying
- Use Schema.org types exactly
- Include all required properties
- Keep schemas updated with content
- Monitor Search Console weekly
- Document what you implement

---

## 📞 NEED HELP?

**Resources:**
- Full audit: `SCHEMA_AUDIT_AND_PLAN.md`
- Schema.org docs: https://schema.org/
- Google guidelines: https://developers.google.com/search/docs/appearance/structured-data

**Testing Tools:**
- Rich Results Test: https://search.google.com/test/rich-results
- Validator: https://validator.schema.org/

---

**Last Updated:** October 20, 2025  
**Status:** 📋 Active Implementation  
**Current Coverage:** 26% (13 of 50 pages)  
**Target Coverage:** 90%+ (45+ of 50 pages)
