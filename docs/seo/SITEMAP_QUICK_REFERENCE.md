# SITEMAP QUICK REFERENCE
**Website:** https://www.aiseoturbo.com  
**Last Updated:** October 20, 2025

---

## ✅ INCLUDED IN SITEMAP (59 URLs)

### Homepage (1)
- `/` - Main landing page

### Features (5)
- `/features/seo-audit`
- `/features/site-crawler`
- `/features/keyword-tracking`
- `/features/competitor-analysis`
- `/features/ai-assistant`

### Marketing Pages (2)
- `/pricing`
- `/demo`

### Company Pages (2)
- `/about`
- `/careers`

### Blog (7)
- `/blog` - Index
- `/blog/ai-powered-seo-future`
- `/blog/complete-seo-audit-checklist-2025`
- `/blog/content-seo-creating-search-friendly-content`
- `/blog/core-web-vitals-optimization-guide`
- `/blog/local-seo-strategies-that-work`
- `/blog/technical-seo-best-practices-2025`

### Case Studies (7)
- `/case-studies` - Index
- `/case-studies/cloudsync-pro`
- `/case-studies/digital-growth-agency`
- `/case-studies/gearhub-pro`
- `/case-studies/peak-performance`
- `/case-studies/stylecraft-boutique`
- `/case-studies/techflow-solutions`

### Support (2)
- `/community`
- `/help` - Index

### Help Categories (6)
- `/help/getting-started`
- `/help/seo-tools-features`
- `/help/account-billing`
- `/help/api-integrations`
- `/help/security-privacy`
- `/help/troubleshooting`

### Help Articles (25)
**Getting Started:**
- `/help/getting-started/quick-start`
- `/help/getting-started/dashboard-setup`
- `/help/getting-started/first-audit`
- `/help/getting-started/seo-scores`

**Features:**
- `/help/features/seo-audit`
- `/help/features/site-crawler`
- `/help/features/ai-assistant`
- `/help/features/competitor-analysis`

**Billing:**
- `/help/billing/upgrade-plan`
- `/help/billing/payment-methods`
- `/help/billing/invoices`
- `/help/billing/cancellation`

**API:**
- `/help/api/authentication`
- `/help/api/webhooks`

**Security:**
- `/help/security/best-practices`
- `/help/security/privacy`
- `/help/security/gdpr`
- `/help/security/two-factor-authentication`

**Troubleshooting:**
- `/help/troubleshooting/audit-issues`
- `/help/troubleshooting/login-issues`
- `/help/troubleshooting/sync-issues`
- `/help/troubleshooting/performance`

### Utility Pages (2)
- `/contact`
- `/status`

### Legal Pages (2)
- `/privacy`
- `/terms`

---

## ❌ EXCLUDED FROM SITEMAP (17+ Routes)

### Authentication Pages (8)
❌ `/login` - Login page (noindex in robots.txt + meta tag)  
❌ `/signup` - Registration page  
❌ `/verify-email` - Email verification  
❌ `/reset-password` - Password reset  
❌ `/forgot-password` - Password recovery  
❌ `/auth-test` - Auth testing (dev only)  
❌ `/oauth-test` - OAuth testing (dev only)  
❌ `/onboarding` - User onboarding flow  

**Why:** No SEO value, security-sensitive, transactional pages

### Protected Dashboard (9+)
❌ `/dashboard` - Main dashboard (noindex in robots.txt + meta tag)  
❌ `/dashboard/audit` - Audit management  
❌ `/dashboard/backlinks` - Backlink analysis  
❌ `/dashboard/competitors` - Competitor tracking  
❌ `/dashboard/keywords` - Keyword tracking  
❌ `/dashboard/page-crawler` - Crawler management  
❌ `/dashboard/profile` - User profile  
❌ `/dashboard/projects` - Project management  
❌ `/dashboard/reports` - Custom reports  
❌ `/dashboard/settings` - Settings  

**Why:** Requires authentication, contains private user data, no public value

### API Routes (All)
❌ `/api/*` - All API endpoints  

**Why:** JSON/XML responses, not HTML, technical endpoints

### Internal Routes
❌ `/app/*` - Internal application routes  

**Why:** Development/internal tools, not public-facing

### Dynamic Private Content
❌ `/share/[token]` - Private share links  

**Why:** Private user content, security tokens, temporary/infinite URLs

### Static Assets (Allowed but Not in Sitemap)
⚠️ `/_next/static/chunks/**/*.js` - JavaScript bundles (100+ files)  
⚠️ `/_next/static/css/**/*.css` - Stylesheets  
⚠️ `/_next/image?url=*` - Image optimization  

**Why:** Non-HTML content, required for functionality, automatically handled by search engines

---

## 📊 Summary Statistics

| Metric | Count |
|--------|-------|
| **Total URLs in Sitemap** | **59** |
| **Excluded Routes** | **17+** |
| **Static Assets (allowed)** | **100+** |
| **Priority 1.0** | 1 |
| **Priority 0.8** | 7 |
| **Priority 0.7** | 3 |
| **Priority 0.6** | 13 |
| **Priority 0.5** | 8 |
| **Priority 0.4** | 25 |
| **Priority 0.3** | 2 |

---

## 🔍 How to Check

### Verify Included:
```bash
# View sitemap in browser
https://www.aiseoturbo.com/sitemap.xml

# Count URLs in sitemap
Get-Content sitemap.xml | Select-String "<loc>" | Measure-Object
```

### Verify Excluded:
```bash
# View robots.txt
https://www.aiseoturbo.com/robots.txt

# Check specific URL indexability
curl -I https://www.aiseoturbo.com/dashboard
# Look for: X-Robots-Tag or meta robots noindex
```

### Test Crawlability:
```bash
# Google Search Console
1. Submit sitemap.xml
2. Check Coverage report
3. Verify excluded URLs marked "Excluded by robots.txt" or "Duplicate without user-selected canonical"
```

---

## 📝 Quick Actions

### To Add a New Public Page:
1. Create the page in `/app/`
2. Add URL to `sitemap.xml` with appropriate priority
3. Verify not in `robots.txt` Disallow list
4. Test: `curl -I https://www.aiseoturbo.com/new-page`

### To Exclude a New Private Route:
1. Add to `robots.txt` Disallow section
2. Add `noindex,nofollow` meta robots tag to page
3. Verify not in `sitemap.xml`
4. Test: Check X-Robots-Tag header

---

**For detailed exclusion rationale, see:** `SITEMAP_EXCLUSIONS.md`  
**For full sitemap documentation, see:** `SITEMAP_REPORT.md`
