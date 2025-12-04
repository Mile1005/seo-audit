# i18n Audit Report

**Generated:** 11/23/2025, 1:28:06 PM

## Summary

- **Total Files Scanned:** 571
- **Total Issues Found:** 8261
- **Estimated i18n Coverage:** 0%

## Issues by Type

| Type | Count |
|------|-------|
| string-literal | 5204 |
| jsx-text | 2719 |
| attribute | 201 |
| aria-label | 78 |
| alt-text | 16 |
| placeholder | 43 |

## Issues by Severity

| Severity | Count |
|----------|-------|
| medium | 1118 |
| high | 7143 |

## Detailed Issues by File


### app\[locale]\blog\[slug]\page.tsx (614 issues)


- **Line 1** [`string-literal`] [medium]
  - Text: "use client"
  - Context: `"use client"`


- **Line 14** [`string-literal`] [medium]
  - Text: "Complete SEO Audit Checklist for 2025"
  - Context: `title: 'Complete SEO Audit Checklist for 2025',`


- **Line 17** [`jsx-text`] [high]
  - Text: "Introduction"
  - Context: `<h2>Introduction</h2>`


- **Line 18** [`jsx-text`] [high]
  - Text: "In 2025, SEO audits have become more sophisticated than ever. With the rise of AI-powered search algorithms and Core Web Vitals, it's crucial to have a comprehensive checklist to ensure your website is optimized for maximum visibility."
  - Context: `<p>In 2025, SEO audits have become more sophisticated than ever. With the rise of AI-powered search algorithms and Core Web Vitals, it's crucial to have a comprehensive checklist to ensure your website is optimized for maximum visibility.</p>`


- **Line 20** [`jsx-text`] [high]
  - Text: "Why SEO Audits Matter"
  - Context: `<h2>Why SEO Audits Matter</h2>`


- **Line 21** [`jsx-text`] [high]
  - Text: "Regular SEO audits help you:"
  - Context: `<p>Regular SEO audits help you:</p>`


- **Line 23** [`jsx-text`] [high]
  - Text: "Identify technical issues that may be hurting your rankings"
  - Context: `<li>Identify technical issues that may be hurting your rankings</li>`


- **Line 24** [`jsx-text`] [high]
  - Text: "Discover new keyword opportunities"
  - Context: `<li>Discover new keyword opportunities</li>`


- **Line 25** [`jsx-text`] [high]
  - Text: "Stay ahead of algorithm updates"
  - Context: `<li>Stay ahead of algorithm updates</li>`


- **Line 26** [`jsx-text`] [high]
  - Text: "Improve user experience and conversion rates"
  - Context: `<li>Improve user experience and conversion rates</li>`


_...and 604 more issues_


---

### lib\seo.ts (279 issues)


- **Line 22** [`string-literal`] [high]
  - Text: "SEO audit"
  - Context: `'SEO audit',`


- **Line 23** [`string-literal`] [high]
  - Text: "SEO analysis"
  - Context: `'SEO analysis',`


- **Line 24** [`string-literal`] [high]
  - Text: "website optimization"
  - Context: `'website optimization',`


- **Line 25** [`string-literal`] [high]
  - Text: "organic traffic"
  - Context: `'organic traffic',`


- **Line 26** [`string-literal`] [high]
  - Text: "search engine optimization"
  - Context: `'search engine optimization',`


- **Line 27** [`string-literal`] [high]
  - Text: "competitor analysis"
  - Context: `'competitor analysis',`


- **Line 28** [`string-literal`] [high]
  - Text: "keyword research"
  - Context: `'keyword research',`


- **Line 29** [`string-literal`] [high]
  - Text: "technical SEO"
  - Context: `'technical SEO',`


- **Line 30** [`string-literal`] [high]
  - Text: "AI SEO tools"
  - Context: `'AI SEO tools'`


- **Line 80** [`string-literal`] [high]
  - Text: "production"
  - Context: `if (csvTitleCache && process.env.NODE_ENV === 'production') return csvTitleCache;`


_...and 269 more issues_


---

### lib\comprehensive-audit.ts (216 issues)


- **Line 153** [`string-literal`] [high]
  - Text: ") || href.startsWith("
  - Context: `return href.startsWith("/") || href.startsWith("./");`


- **Line 162** [`string-literal`] [high]
  - Text: "script[type="
  - Context: `$("script[type='application/ld+json']").each((_, el) => {`


- **Line 183** [`string-literal`] [high]
  - Text: "meta[property="
  - Context: `og_title: $('meta[property="og:title"]').attr("content") || null,`


- **Line 184** [`string-literal`] [high]
  - Text: "meta[property="
  - Context: `og_url: $('meta[property="og:url"]').attr("content") || null,`


- **Line 185** [`string-literal`] [high]
  - Text: "meta[property="
  - Context: `og_description: $('meta[property="og:description"]').attr("content") || null,`


- **Line 186** [`string-literal`] [high]
  - Text: "meta[property="
  - Context: `og_image: $('meta[property="og:image"]').attr("content") || null,`


- **Line 202** [`string-literal`] [high]
  - Text: "Fetching real PageSpeed Insights data..."
  - Context: `console.log('Fetching real PageSpeed Insights data...');`


- **Line 220** [`string-literal`] [high]
  - Text: "✅ PSI data retrieved successfully"
  - Context: `console.log('✅ PSI data retrieved successfully');`


- **Line 236** [`string-literal`] [high]
  - Text: "Enable text compression"
  - Context: `"Enable text compression",`


- **Line 237** [`string-literal`] [high]
  - Text: "Optimize images"
  - Context: `"Optimize images",`


_...and 206 more issues_


---

### components\seo\StructuredData.tsx (154 issues)


- **Line 5** [`jsx-text`] [high]
  - Text: "| Record"
  - Context: `data: Record<string, any> | Record<string, any>[];`


- **Line 11** [`string-literal`] [medium]
  - Text: "application/ld+json"
  - Context: `type="application/ld+json"`


- **Line 22** [`string-literal`] [medium]
  - Text: "@context"
  - Context: `"@context": "https://schema.org",`


- **Line 23** [`string-literal`] [medium]
  - Text: "@language"
  - Context: `"@language": locale || "en",`


- **Line 24** [`string-literal`] [medium]
  - Text: "BreadcrumbList"
  - Context: `"@type": "BreadcrumbList",`


- **Line 25** [`string-literal`] [medium]
  - Text: "itemListElement"
  - Context: `"itemListElement": items.map((item, index) => ({`


- **Line 37** [`string-literal`] [medium]
  - Text: "@context"
  - Context: `"@context": "https://schema.org",`


- **Line 38** [`string-literal`] [medium]
  - Text: "@language"
  - Context: `"@language": locale || "en",`


- **Line 40** [`string-literal`] [medium]
  - Text: "mainEntity"
  - Context: `"mainEntity": faqs.map(faq => ({`


- **Line 43** [`string-literal`] [medium]
  - Text: "acceptedAnswer"
  - Context: `"acceptedAnswer": {`


_...and 144 more issues_


---

### app\[locale]\signup\page.tsx (147 issues)


- **Line 1** [`string-literal`] [high]
  - Text: "use client"
  - Context: `"use client";`


- **Line 17** [`string-literal`] [high]
  - Text: "Perfect for getting started"
  - Context: `description: 'Perfect for getting started',`


- **Line 19** [`string-literal`] [high]
  - Text: "10 SEO audits per month"
  - Context: `'10 SEO audits per month',`


- **Line 20** [`string-literal`] [high]
  - Text: "Basic crawling (5 pages)"
  - Context: `'Basic crawling (5 pages)',`


- **Line 21** [`string-literal`] [high]
  - Text: "Performance insights"
  - Context: `'Performance insights',`


- **Line 22** [`string-literal`] [high]
  - Text: "Core Web Vitals"
  - Context: `'Core Web Vitals',`


- **Line 23** [`string-literal`] [high]
  - Text: "Email support"
  - Context: `'Email support'`


- **Line 32** [`string-literal`] [high]
  - Text: "For growing businesses"
  - Context: `description: 'For growing businesses',`


- **Line 34** [`string-literal`] [high]
  - Text: "100 SEO audits per month"
  - Context: `'100 SEO audits per month',`


- **Line 35** [`string-literal`] [high]
  - Text: "Advanced crawling (50 pages)"
  - Context: `'Advanced crawling (50 pages)',`


_...and 137 more issues_


---

### app\help\security\gdpr\page.tsx (134 issues)


- **Line 1** [`string-literal`] [medium]
  - Text: "use client"
  - Context: `"use client"`


- **Line 22** [`jsx-text`] [high]
  - Text: "GDPR Compliance Guide"
  - Context: `<h1 className="text-4xl font-bold text-gray-900 mb-4">GDPR Compliance Guide</h1>`


- **Line 34** [`jsx-text`] [high]
  - Text: "Understanding GDPR"
  - Context: `<h2 className="text-2xl font-semibold text-gray-900 mb-2">Understanding GDPR</h2>`


- **Line 47** [`jsx-text`] [high]
  - Text: "Privacy Policy"
  - Context: `<h3 className="font-semibold text-gray-900 mb-1">Privacy Policy</h3>`


- **Line 48** [`jsx-text`] [high]
  - Text: "Clear, comprehensive privacy policy"
  - Context: `<p className="text-sm text-gray-600">Clear, comprehensive privacy policy</p>`


- **Line 52** [`jsx-text`] [high]
  - Text: "Data Security"
  - Context: `<h3 className="font-semibold text-gray-900 mb-1">Data Security</h3>`


- **Line 53** [`jsx-text`] [high]
  - Text: "Secure data handling and storage"
  - Context: `<p className="text-sm text-gray-600">Secure data handling and storage</p>`


- **Line 57** [`jsx-text`] [high]
  - Text: "User Consent"
  - Context: `<h3 className="font-semibold text-gray-900 mb-1">User Consent</h3>`


- **Line 58** [`jsx-text`] [high]
  - Text: "Proper consent mechanisms"
  - Context: `<p className="text-sm text-gray-600">Proper consent mechanisms</p>`


- **Line 62** [`jsx-text`] [high]
  - Text: "Data Subject Rights"
  - Context: `<h3 className="font-semibold text-gray-900 mb-1">Data Subject Rights</h3>`


_...and 124 more issues_


---

### components\backlinks\backlink-dashboard.tsx (133 issues)


- **Line 1** [`string-literal`] [high]
  - Text: "use client"
  - Context: `'use client'`


- **Line 108** [`string-literal`] [high]
  - Text: "Failed to fetch backlinks:"
  - Context: `console.error('Failed to fetch backlinks:', data.error)`


- **Line 111** [`string-literal`] [high]
  - Text: "Error fetching backlinks:"
  - Context: `console.error('Error fetching backlinks:', error)`


- **Line 129** [`string-literal`] [high]
  - Text: "Failed to generate mock data"
  - Context: `console.error('Failed to generate mock data')`


- **Line 132** [`string-literal`] [high]
  - Text: "Error generating mock data:"
  - Context: `console.error('Error generating mock data:', error)`


- **Line 159** [`string-literal`] [high]
  - Text: "Failed to collect backlinks:"
  - Context: `console.error('Failed to collect backlinks:', data.error)`


- **Line 163** [`string-literal`] [high]
  - Text: "Error collecting backlinks:"
  - Context: `console.error('Error collecting backlinks:', error)`


- **Line 236** [`jsx-text`] [high]
  - Text: "Backlink Analysis"
  - Context: `<h1 className="text-2xl font-bold">Backlink Analysis</h1>`


- **Line 264** [`jsx-text`] [high]
  - Text: "Total Backlinks"
  - Context: `<p className="text-sm text-muted-foreground">Total Backlinks</p>`


- **Line 276** [`jsx-text`] [high]
  - Text: "Referring Domains"
  - Context: `<p className="text-sm text-muted-foreground">Referring Domains</p>`


_...and 123 more issues_


---

### components\audit\PerformanceDiagnostics.tsx (115 issues)


- **Line 1** [`string-literal`] [high]
  - Text: "use client"
  - Context: `"use client";`


- **Line 22** [`string-literal`] [high]
  - Text: "implementation"
  - Context: `const getImplementationDetails = (title: string): Diagnostic['implementation'] => {`


- **Line 27** [`string-literal`] [high]
  - Text: "largest contentful paint"
  - Context: `if (normalizedTitle.includes('largest contentful paint') || normalizedTitle.includes('lcp')) {`


- **Line 30** [`string-literal`] [high]
  - Text: "🎯 WHAT IS LCP ISSUE: Your largest content element (hero image/text) loads slowly"
  - Context: `'🎯 WHAT IS LCP ISSUE: Your largest content element (hero image/text) loads slowly',`


- **Line 31** [`string-literal`] [high]
  - Text: "📊 PERFORMANCE IMPACT: Slow LCP makes users think your site is broken and leave"
  - Context: `'📊 PERFORMANCE IMPACT: Slow LCP makes users think your site is broken and leave',`


- **Line 32** [`string-literal`] [high]
  - Text: "🔧 IDENTIFY: Check Chrome DevTools → Performance → find your LCP element"
  - Context: `'🔧 IDENTIFY: Check Chrome DevTools → Performance → find your LCP element',`


- **Line 33** [`string-literal`] [high]
  - Text: "🔧 FIX IMAGE LCP: Convert hero image to WebP, resize to display size, add preload"
  - Context: `'🔧 FIX IMAGE LCP: Convert hero image to WebP, resize to display size, add preload',`


- **Line 35** [`string-literal`] [high]
  - Text: "🔧 FIX SERVER LCP: Move LCP resource to same domain or faster CDN"
  - Context: `'🔧 FIX SERVER LCP: Move LCP resource to same domain or faster CDN',`


- **Line 36** [`string-literal`] [high]
  - Text: "✅ RESULT: Your main content appears instantly, reducing bounce rate by 30%+"
  - Context: `'✅ RESULT: Your main content appears instantly, reducing bounce rate by 30%+'`


- **Line 40** [`string-literal`] [high]
  - Text: "Chrome DevTools Performance tab"
  - Context: `tools: ['Chrome DevTools Performance tab', 'Image optimization tools'],`


_...and 105 more issues_


---

### app\layout.tsx (112 issues)


- **Line 33** [`string-literal`] [high]
  - Text: "BlinkMacSystemFont"
  - Context: `fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'arial'],`


- **Line 33** [`string-literal`] [high]
  - Text: "Segoe UI"
  - Context: `fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'arial'],`


- **Line 48** [`string-literal`] [high]
  - Text: "SEO audit, AI SEO analysis, website optimization, organic traffic, search rankings"
  - Context: `keywords: "SEO audit, AI SEO analysis, website optimization, organic traffic, search rankings",`


- **Line 49** [`string-literal`] [high]
  - Text: "AI SEO Turbo"
  - Context: `authors: [{ name: "AI SEO Turbo" }],`


- **Line 50** [`string-literal`] [high]
  - Text: "AI SEO Turbo"
  - Context: `creator: "AI SEO Turbo",`


- **Line 51** [`string-literal`] [high]
  - Text: "AI SEO Turbo"
  - Context: `publisher: "AI SEO Turbo",`


- **Line 60** [`string-literal`] [high]
  - Text: "Get actionable SEO insights that boost rankings and drive organic traffic in minutes."
  - Context: `description: "Get actionable SEO insights that boost rankings and drive organic traffic in minutes.",`


- **Line 62** [`string-literal`] [high]
  - Text: "AI SEO Turbo"
  - Context: `siteName: "AI SEO Turbo",`


- **Line 77** [`string-literal`] [high]
  - Text: "Get actionable SEO insights that boost rankings and drive organic traffic in minutes."
  - Context: `description: "Get actionable SEO insights that boost rankings and drive organic traffic in minutes.",`


- **Line 78** [`string-literal`] [high]
  - Text: "@aiseoturbo"
  - Context: `creator: "@aiseoturbo",`


_...and 102 more issues_


---

### lib\heuristics.ts (108 issues)


- **Line 67** [`string-literal`] [high]
  - Text: "answerability"
  - Context: `| "answerability"`


- **Line 196** [`string-literal`] [high]
  - Text: "Performance data not available"
  - Context: `notes: ["Performance data not available"],`


- **Line 218** [`string-literal`] [high]
  - Text: "Missing title tag"
  - Context: `issues.push("Missing title tag");`


- **Line 223** [`string-literal`] [high]
  - Text: "Title too short"
  - Context: `issues.push("Title too short");`


- **Line 226** [`string-literal`] [high]
  - Text: "Title too long"
  - Context: `issues.push("Title too long");`


- **Line 229** [`string-literal`] [high]
  - Text: "Title length not optimal"
  - Context: `issues.push("Title length not optimal");`


- **Line 235** [`string-literal`] [high]
  - Text: "Target keyword not in title"
  - Context: `issues.push("Target keyword not in title");`


- **Line 242** [`string-literal`] [high]
  - Text: "Missing meta description"
  - Context: `issues.push("Missing meta description");`


- **Line 247** [`string-literal`] [high]
  - Text: "Meta description too short"
  - Context: `issues.push("Meta description too short");`


- **Line 250** [`string-literal`] [high]
  - Text: "Meta description too long"
  - Context: `issues.push("Meta description too long");`


_...and 98 more issues_


---

### lib\image-fallbacks.ts (106 issues)


- **Line 21** [`string-literal`] [medium]
  - Text: "${width}"
  - Context: `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">`


- **Line 21** [`string-literal`] [medium]
  - Text: "${height}"
  - Context: `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">`


- **Line 21** [`string-literal`] [medium]
  - Text: "0 0 ${width} ${height}"
  - Context: `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">`


- **Line 23** [`string-literal`] [medium]
  - Text: " fill="
  - Context: `<rect x="20%" y="30%" width="60%" height="40%" rx="8" fill="#e5e7eb"/>`


- **Line 24** [`string-literal`] [medium]
  - Text: " fill="
  - Context: `<circle cx="50%" cy="50%" r="30" fill="#d1d5db"/>`


- **Line 35** [`string-literal`] [medium]
  - Text: "${width}"
  - Context: `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">`


- **Line 35** [`string-literal`] [medium]
  - Text: "${height}"
  - Context: `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">`


- **Line 35** [`string-literal`] [medium]
  - Text: "0 0 ${width} ${height}"
  - Context: `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">`


- **Line 37** [`string-literal`] [medium]
  - Text: "bgGradient"
  - Context: `<linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">`


- **Line 38** [`string-literal`] [medium]
  - Text: " style="
  - Context: `<stop offset="0%" style="stop-color:#1e293b;stop-opacity:1" />`


_...and 96 more issues_


---

### components\audit\PerformanceOpportunities.tsx (104 issues)


- **Line 1** [`string-literal`] [high]
  - Text: "use client"
  - Context: `"use client";`


- **Line 23** [`string-literal`] [high]
  - Text: "implementation"
  - Context: `const getImplementationDetails = (title: string): Opportunity['implementation'] => {`


- **Line 28** [`string-literal`] [high]
  - Text: "first contentful paint"
  - Context: `if (normalizedTitle.includes('first contentful paint') || normalizedTitle.includes('fcp')) {`


- **Line 31** [`string-literal`] [high]
  - Text: "🎯 WHAT IS FCP: First Contentful Paint measures when the first text or image appears on your page"
  - Context: `'🎯 WHAT IS FCP: First Contentful Paint measures when the first text or image appears on your page',`


- **Line 32** [`string-literal`] [high]
  - Text: "📊 WHY IT MATTERS: Users see content faster = better experience + Google ranks faster sites higher"
  - Context: `'📊 WHY IT MATTERS: Users see content faster = better experience + Google ranks faster sites higher',`


- **Line 33** [`string-literal`] [high]
  - Text: "🔧 FIX 1: Enable server compression (gzip/brotli) in your hosting control panel or .htaccess"
  - Context: `'🔧 FIX 1: Enable server compression (gzip/brotli) in your hosting control panel or .htaccess',`


- **Line 35** [`string-literal`] [high]
  - Text: "🔧 FIX 3: Add <link rel="
  - Context: `'🔧 FIX 3: Add <link rel="preload" as="font" href="font.woff2"> for important fonts',`


- **Line 35** [`string-literal`] [high]
  - Text: " href="
  - Context: `'🔧 FIX 3: Add <link rel="preload" as="font" href="font.woff2"> for important fonts',`


- **Line 35** [`string-literal`] [high]
  - Text: "> for important fonts"
  - Context: `'🔧 FIX 3: Add <link rel="preload" as="font" href="font.woff2"> for important fonts',`


- **Line 36** [`string-literal`] [high]
  - Text: "🔧 FIX 4: Optimize your largest image: convert to WebP, resize to actual display size"
  - Context: `'🔧 FIX 4: Optimize your largest image: convert to WebP, resize to actual display size',`


_...and 94 more issues_


---

### app\[locale]\layout-main.tsx (101 issues)


- **Line 32** [`string-literal`] [high]
  - Text: "BlinkMacSystemFont"
  - Context: `fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'arial'],`


- **Line 32** [`string-literal`] [high]
  - Text: "Segoe UI"
  - Context: `fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'arial'],`


- **Line 97** [`string-literal`] [high]
  - Text: "@context"
  - Context: `"@context": "https://schema.org",`


- **Line 98** [`string-literal`] [high]
  - Text: "Organization"
  - Context: `"@type": "Organization",`


- **Line 100** [`string-literal`] [high]
  - Text: "AISEOTurbo"
  - Context: `"name": "AISEOTurbo",`


- **Line 101** [`string-literal`] [high]
  - Text: "AISEOTurbo"
  - Context: `"legalName": "AISEOTurbo",`


- **Line 102** [`string-literal`] [high]
  - Text: "alternateName"
  - Context: `"alternateName": "AI SEO Turbo",`


- **Line 102** [`string-literal`] [high]
  - Text: "AI SEO Turbo"
  - Context: `"alternateName": "AI SEO Turbo",`


- **Line 105** [`string-literal`] [high]
  - Text: "ImageObject"
  - Context: `"@type": "ImageObject",`


- **Line 109** [`string-literal`] [high]
  - Text: "AISEOTurbo Logo"
  - Context: `"caption": "AISEOTurbo Logo"`


_...and 91 more issues_


---

### app\dashboard\audit\page.tsx (97 issues)


- **Line 1** [`string-literal`] [high]
  - Text: "use client"
  - Context: `"use client";`


- **Line 99** [`string-literal`] [high]
  - Text: "📊 Dashboard received audit result:"
  - Context: `console.log('📊 Dashboard received audit result:', {`


- **Line 130** [`string-literal`] [high]
  - Text: "destructive"
  - Context: `return 'destructive' // Red`


- **Line 182** [`jsx-text`] [high]
  - Text: "Professional SEO Audit"
  - Context: `<h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Professional SEO Audit</h1>`


- **Line 201** [`jsx-text`] [high]
  - Text: "Website URL"
  - Context: `<Label htmlFor="url">Website URL</Label>`


- **Line 205** [`placeholder`] [high]
  - Text: "https://example.com or example.com"
  - Context: `placeholder="https://example.com or example.com"`


- **Line 226** [`string-literal`] [high]
  - Text: "Run Again"
  - Context: `{status === 'completed' ? 'Run Again' : 'Start Professional Audit'}`


- **Line 226** [`string-literal`] [high]
  - Text: "Start Professional Audit"
  - Context: `{status === 'completed' ? 'Run Again' : 'Start Professional Audit'}`


- **Line 256** [`string-literal`] [high]
  - Text: "Export failed:"
  - Context: `console.error('Export failed:', error);`


- **Line 273** [`string-literal`] [high]
  - Text: "destructive"
  - Context: `<Alert variant="destructive">`


_...and 87 more issues_


---

### app\[locale]\dashboard\audit\page.tsx (97 issues)


- **Line 1** [`string-literal`] [high]
  - Text: "use client"
  - Context: `"use client";`


- **Line 99** [`string-literal`] [high]
  - Text: "📊 Dashboard received audit result:"
  - Context: `console.log('📊 Dashboard received audit result:', {`


- **Line 130** [`string-literal`] [high]
  - Text: "destructive"
  - Context: `return 'destructive' // Red`


- **Line 182** [`jsx-text`] [high]
  - Text: "Professional SEO Audit"
  - Context: `<h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Professional SEO Audit</h1>`


- **Line 201** [`jsx-text`] [high]
  - Text: "Website URL"
  - Context: `<Label htmlFor="url">Website URL</Label>`


- **Line 205** [`placeholder`] [high]
  - Text: "https://example.com or example.com"
  - Context: `placeholder="https://example.com or example.com"`


- **Line 226** [`string-literal`] [high]
  - Text: "Run Again"
  - Context: `{status === 'completed' ? 'Run Again' : 'Start Professional Audit'}`


- **Line 226** [`string-literal`] [high]
  - Text: "Start Professional Audit"
  - Context: `{status === 'completed' ? 'Run Again' : 'Start Professional Audit'}`


- **Line 256** [`string-literal`] [high]
  - Text: "Export failed:"
  - Context: `console.error('Export failed:', error);`


- **Line 273** [`string-literal`] [high]
  - Text: "destructive"
  - Context: `<Alert variant="destructive">`


_...and 87 more issues_


---

### app\help\api\webhooks\page.tsx (95 issues)


- **Line 1** [`string-literal`] [high]
  - Text: "use client"
  - Context: `"use client"`


- **Line 16** [`attribute`] [medium]
  - Text: "Breadcrumb"
  - Context: `<nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">`


- **Line 16** [`aria-label`] [high]
  - Text: "Breadcrumb"
  - Context: `<nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">`


- **Line 25** [`jsx-text`] [high]
  - Text: "Webhooks"
  - Context: `<span className="text-white">Webhooks</span>`


- **Line 51** [`jsx-text`] [high]
  - Text: "API"
  - Context: `<span className="text-orange-400 text-sm font-medium">API</span>`


- **Line 61** [`jsx-text`] [high]
  - Text: "12 min read"
  - Context: `<span>12 min read</span>`


- **Line 65** [`jsx-text`] [high]
  - Text: "Last updated: March 2025"
  - Context: `<span>Last updated: March 2025</span>`


- **Line 87** [`jsx-text`] [high]
  - Text: "Real-time notifications"
  - Context: `<h2 className="text-white text-lg font-semibold mb-2">Real-time notifications</h2>`


- **Line 97** [`jsx-text`] [high]
  - Text: "What are webhooks?"
  - Context: `<h2 className="text-2xl font-bold text-white mb-6">What are webhooks?</h2>`


- **Line 148** [`jsx-text`] [high]
  - Text: "Setting up webhooks"
  - Context: `<h3 className="text-2xl font-bold text-white mb-6">Setting up webhooks</h3>`


_...and 85 more issues_


---

### app\help\security\privacy\page.tsx (94 issues)


- **Line 1** [`string-literal`] [medium]
  - Text: "use client"
  - Context: `"use client"`


- **Line 16** [`attribute`] [medium]
  - Text: "Breadcrumb"
  - Context: `<nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">`


- **Line 16** [`aria-label`] [high]
  - Text: "Breadcrumb"
  - Context: `<nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">`


- **Line 25** [`jsx-text`] [high]
  - Text: "Privacy settings"
  - Context: `<span className="text-white">Privacy settings</span>`


- **Line 51** [`jsx-text`] [high]
  - Text: "Security"
  - Context: `<span className="text-purple-400 text-sm font-medium">Security</span>`


- **Line 61** [`jsx-text`] [high]
  - Text: "8 min read"
  - Context: `<span>8 min read</span>`


- **Line 65** [`jsx-text`] [high]
  - Text: "Last updated: March 2025"
  - Context: `<span>Last updated: March 2025</span>`


- **Line 87** [`jsx-text`] [high]
  - Text: "Your privacy matters"
  - Context: `<h2 className="text-white text-lg font-semibold mb-2">Your privacy matters</h2>`


- **Line 97** [`jsx-text`] [high]
  - Text: "What information we collect"
  - Context: `<h2 className="text-2xl font-bold text-white mb-6">What information we collect</h2>`


- **Line 107** [`jsx-text`] [high]
  - Text: "• Email address"
  - Context: `<li>• Email address</li>`


_...and 84 more issues_


---

### app\[locale]\layout.tsx (92 issues)


- **Line 39** [`string-literal`] [high]
  - Text: "@context"
  - Context: `"@context": "https://schema.org",`


- **Line 40** [`string-literal`] [high]
  - Text: "@language"
  - Context: `"@language": locale,`


- **Line 41** [`string-literal`] [high]
  - Text: "Organization"
  - Context: `"@type": "Organization",`


- **Line 43** [`string-literal`] [high]
  - Text: "AISEOTurbo"
  - Context: `"name": "AISEOTurbo",`


- **Line 44** [`string-literal`] [high]
  - Text: "AISEOTurbo"
  - Context: `"legalName": "AISEOTurbo",`


- **Line 45** [`string-literal`] [high]
  - Text: "alternateName"
  - Context: `"alternateName": "AI SEO Turbo",`


- **Line 45** [`string-literal`] [high]
  - Text: "AI SEO Turbo"
  - Context: `"alternateName": "AI SEO Turbo",`


- **Line 48** [`string-literal`] [high]
  - Text: "ImageObject"
  - Context: `"@type": "ImageObject",`


- **Line 52** [`string-literal`] [high]
  - Text: "AISEOTurbo Logo"
  - Context: `"caption": "AISEOTurbo Logo"`


- **Line 55** [`string-literal`] [high]
  - Text: "ImageObject"
  - Context: `"@type": "ImageObject",`


_...and 82 more issues_


---

### app\help\seo-tools-features\page.tsx (88 issues)


- **Line 1** [`string-literal`] [medium]
  - Text: "use client"
  - Context: `'use client'`


- **Line 10** [`string-literal`] [medium]
  - Text: "Complete SEO Audit Guide"
  - Context: `title: 'Complete SEO Audit Guide',`


- **Line 17** [`string-literal`] [medium]
  - Text: "Site Crawling & Analysis"
  - Context: `title: 'Site Crawling & Analysis',`


- **Line 24** [`string-literal`] [medium]
  - Text: "Keyword Research Tools"
  - Context: `title: 'Keyword Research Tools',`


- **Line 31** [`string-literal`] [medium]
  - Text: "Performance Monitoring"
  - Context: `title: 'Performance Monitoring',`


- **Line 38** [`string-literal`] [medium]
  - Text: "Competitor Analysis"
  - Context: `title: 'Competitor Analysis',`


- **Line 39** [`string-literal`] [medium]
  - Text: "Use our competitor intelligence tools to identify opportunities and stay ahead of the competition."
  - Context: `description: 'Use our competitor intelligence tools to identify opportunities and stay ahead of the competition.',`


- **Line 45** [`string-literal`] [medium]
  - Text: "Content Optimization"
  - Context: `title: 'Content Optimization',`


- **Line 52** [`string-literal`] [medium]
  - Text: "Enterprise Reporting"
  - Context: `title: 'Enterprise Reporting',`


- **Line 68** [`attribute`] [medium]
  - Text: "Breadcrumb"
  - Context: `<nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">`


_...and 78 more issues_


---

### components\keywords\keyword-variations-modal.tsx (87 issues)


- **Line 1** [`string-literal`] [high]
  - Text: "use client"
  - Context: `'use client';`


- **Line 17** [`string-literal`] [high]
  - Text: "COMMERCIAL"
  - Context: `intent?: 'COMMERCIAL' | 'INFORMATIONAL' | 'NAVIGATIONAL' | 'TRANSACTIONAL';`


- **Line 17** [`string-literal`] [high]
  - Text: "INFORMATIONAL"
  - Context: `intent?: 'COMMERCIAL' | 'INFORMATIONAL' | 'NAVIGATIONAL' | 'TRANSACTIONAL';`


- **Line 17** [`string-literal`] [high]
  - Text: "NAVIGATIONAL"
  - Context: `intent?: 'COMMERCIAL' | 'INFORMATIONAL' | 'NAVIGATIONAL' | 'TRANSACTIONAL';`


- **Line 17** [`string-literal`] [high]
  - Text: "TRANSACTIONAL"
  - Context: `intent?: 'COMMERCIAL' | 'INFORMATIONAL' | 'NAVIGATIONAL' | 'TRANSACTIONAL';`


- **Line 38** [`string-literal`] [high]
  - Text: "difficulty"
  - Context: `const [sortBy, setSortBy] = useState<'volume' | 'difficulty' | 'cpc'>('volume');`


- **Line 44** [`string-literal`] [high]
  - Text: "affordable"
  - Context: `const prefixes = ['best', 'top', 'free', 'online', 'cheap', 'affordable', 'professional', 'quick', 'easy', 'automated', 'new', 'latest', 'premium', 'ultimate', 'advanced', 'simple', 'powerful', 'fast', 'modern', 'leading', 'trusted', 'popular', 'recommended', 'effective', 'efficient'];`


- **Line 44** [`string-literal`] [high]
  - Text: "professional"
  - Context: `const prefixes = ['best', 'top', 'free', 'online', 'cheap', 'affordable', 'professional', 'quick', 'easy', 'automated', 'new', 'latest', 'premium', 'ultimate', 'advanced', 'simple', 'powerful', 'fast', 'modern', 'leading', 'trusted', 'popular', 'recommended', 'effective', 'efficient'];`


- **Line 44** [`string-literal`] [high]
  - Text: "recommended"
  - Context: `const prefixes = ['best', 'top', 'free', 'online', 'cheap', 'affordable', 'professional', 'quick', 'easy', 'automated', 'new', 'latest', 'premium', 'ultimate', 'advanced', 'simple', 'powerful', 'fast', 'modern', 'leading', 'trusted', 'popular', 'recommended', 'effective', 'efficient'];`


- **Line 46** [`string-literal`] [high]
  - Text: "for beginners"
  - Context: `const modifiers = ['for beginners', 'for business', 'for websites', '2024', '2025', 'free trial', 'comparison', 'vs', 'alternative', 'review', 'guide', 'tutorial', 'tips', 'tricks', 'strategies', 'techniques', 'methods', 'best practices', 'examples', 'case studies', 'for small business', 'for enterprise', 'for startups', 'for agencies', 'for freelancers'];`


_...and 77 more issues_


---

### app\help\security\best-practices\page.tsx (85 issues)


- **Line 1** [`string-literal`] [medium]
  - Text: "use client"
  - Context: `"use client"`


- **Line 22** [`jsx-text`] [high]
  - Text: "Security Best Practices"
  - Context: `<h1 className="text-4xl font-bold text-gray-900 mb-4">Security Best Practices</h1>`


- **Line 34** [`jsx-text`] [high]
  - Text: "Why Security Matters"
  - Context: `<h2 className="text-2xl font-semibold text-gray-900 mb-2">Why Security Matters</h2>`


- **Line 45** [`jsx-text`] [high]
  - Text: "Account Security"
  - Context: `<h2 className="text-2xl font-semibold text-gray-900 mb-6">Account Security</h2>`


- **Line 49** [`jsx-text`] [high]
  - Text: "Strong Passwords"
  - Context: `<h3 className="text-lg font-semibold text-gray-900 mb-2">Strong Passwords</h3>`


- **Line 57** [`jsx-text`] [high]
  - Text: "Use password manager"
  - Context: `<span>Use password manager</span>`


- **Line 61** [`jsx-text`] [high]
  - Text: "Change every 90 days"
  - Context: `<span>Change every 90 days</span>`


- **Line 65** [`jsx-text`] [high]
  - Text: "Never reuse passwords"
  - Context: `<span>Never reuse passwords</span>`


- **Line 72** [`jsx-text`] [high]
  - Text: "Two-Factor Authentication"
  - Context: `<h3 className="text-lg font-semibold text-gray-900 mb-2">Two-Factor Authentication</h3>`


- **Line 79** [`jsx-text`] [high]
  - Text: "Use authenticator app"
  - Context: `<span>Use authenticator app</span>`


_...and 75 more issues_


---

### app\dashboard\audit\page-comprehensive.tsx (84 issues)


- **Line 1** [`string-literal`] [high]
  - Text: "use client"
  - Context: `"use client";`


- **Line 185** [`string-literal`] [high]
  - Text: "suggestion"
  - Context: `type: 'critical' | 'warning' | 'suggestion'`


- **Line 208** [`string-literal`] [high]
  - Text: "Please enter a valid URL"
  - Context: `setError('Please enter a valid URL')`


- **Line 217** [`string-literal`] [high]
  - Text: "Starting comprehensive audit for:"
  - Context: `console.log('Starting comprehensive audit for:', url)`


- **Line 227** [`string-literal`] [high]
  - Text: "Response status:"
  - Context: `console.log('Response status:', response.status)`


- **Line 229** [`string-literal`] [high]
  - Text: "Response data:"
  - Context: `console.log('Response data:', data)`


- **Line 232** [`string-literal`] [high]
  - Text: "Audit failed"
  - Context: `throw new Error(data.error || 'Audit failed')`


- **Line 237** [`string-literal`] [high]
  - Text: "Comprehensive audit completed successfully"
  - Context: `console.log('Comprehensive audit completed successfully')`


- **Line 239** [`string-literal`] [high]
  - Text: "Invalid response format:"
  - Context: `console.error('Invalid response format:', data)`


- **Line 240** [`string-literal`] [high]
  - Text: "Invalid response format"
  - Context: `throw new Error('Invalid response format')`


_...and 74 more issues_


---

### app\[locale]\dashboard\settings\page.tsx (76 issues)


- **Line 1** [`string-literal`] [high]
  - Text: "use client"
  - Context: `'use client'`


- **Line 31** [`string-literal`] [high]
  - Text: ", email: "
  - Context: `const [profile, setProfile] = useState({ name: '', email: '', hasPassword: false })`


- **Line 32** [`string-literal`] [high]
  - Text: ", timezone: "
  - Context: `const [prefs, setPrefs] = useState<Preferences>({ company: '', timezone: 'UTC' })`


- **Line 33** [`string-literal`] [high]
  - Text: ", next: "
  - Context: `const [pwd, setPwd] = useState({ current: '', next: '', confirm: '' })`


- **Line 33** [`string-literal`] [high]
  - Text: ", confirm: "
  - Context: `const [pwd, setPwd] = useState({ current: '', next: '', confirm: '' })`


- **Line 34** [`string-literal`] [high]
  - Text: ", token: "
  - Context: `const [twoFA, setTwoFA] = useState<TwoFAState>({ enabled: false, secret: '', qr: '', token: '' })`


- **Line 48** [`string-literal`] [high]
  - Text: ", email: user?.email || "
  - Context: `setProfile({ name: user?.name || '', email: user?.email || '', hasPassword: !!user?.hasPassword })`


- **Line 52** [`string-literal`] [high]
  - Text: ", timezone: preferences?.timezone || "
  - Context: `setPrefs({ company: preferences?.company || '', timezone: preferences?.timezone || 'UTC' })`


- **Line 56** [`string-literal`] [high]
  - Text: "Failed to load settings"
  - Context: `toast.error('Failed to load settings')`


- **Line 82** [`string-literal`] [high]
  - Text: "Name is required"
  - Context: `if (!profile.name.trim()) return toast.error('Name is required')`


_...and 66 more issues_


---

### lib\audit\analyzer.ts (75 issues)


- **Line 276** [`string-literal`] [high]
  - Text: "Missing robots.txt file"
  - Context: `title: 'Missing robots.txt file',`


- **Line 277** [`string-literal`] [high]
  - Text: "No robots.txt file found"
  - Context: `description: 'No robots.txt file found',`


- **Line 278** [`string-literal`] [high]
  - Text: "Search engines may have difficulty crawling your site"
  - Context: `impact: 'Search engines may have difficulty crawling your site',`


- **Line 280** [`string-literal`] [high]
  - Text: "Create a robots.txt file"
  - Context: `recommendation: 'Create a robots.txt file',`


- **Line 282** [`string-literal`] [high]
  - Text: "Robots.txt Guide"
  - Context: `title: 'Robots.txt Guide',`


- **Line 284** [`string-literal`] [high]
  - Text: "documentation"
  - Context: `type: 'documentation'`


- **Line 297** [`string-literal`] [high]
  - Text: "Page may not be indexed by search engines"
  - Context: `impact: 'Page may not be indexed by search engines',`


- **Line 299** [`string-literal`] [high]
  - Text: "Fix server configuration to return 200 status code"
  - Context: `recommendation: 'Fix server configuration to return 200 status code',`


- **Line 301** [`string-literal`] [high]
  - Text: "HTTP Status Codes"
  - Context: `title: 'HTTP Status Codes',`


- **Line 303** [`string-literal`] [high]
  - Text: "documentation"
  - Context: `type: 'documentation'`


_...and 65 more issues_


---

### app\[locale]\dashboard\page-crawler\page.tsx (73 issues)


- **Line 1** [`string-literal`] [high]
  - Text: "use client"
  - Context: `"use client";`


- **Line 114** [`string-literal`] [high]
  - Text: "unauthenticated"
  - Context: `if (status === 'unauthenticated') {`


- **Line 129** [`string-literal`] [high]
  - Text: "authenticated"
  - Context: `if (status === 'authenticated') {`


- **Line 147** [`string-literal`] [high]
  - Text: "Failed to load history:"
  - Context: `console.error('Failed to load history:', err);`


- **Line 155** [`string-literal`] [high]
  - Text: "Please enter a valid URL"
  - Context: `setError('Please enter a valid URL');`


- **Line 178** [`string-literal`] [high]
  - Text: "Failed to start crawl"
  - Context: `throw new Error(data.error || 'Failed to start crawl');`


- **Line 184** [`string-literal`] [high]
  - Text: "Failed to start crawl"
  - Context: `setError(err.message || 'Failed to start crawl');`


- **Line 193** [`string-literal`] [high]
  - Text: "Failed to fetch status"
  - Context: `if (!response.ok) throw new Error('Failed to fetch status');`


- **Line 208** [`string-literal`] [high]
  - Text: "Crawl failed"
  - Context: `setError(data.error || 'Crawl failed');`


- **Line 211** [`string-literal`] [high]
  - Text: "Poll error:"
  - Context: `console.error('Poll error:', err);`


_...and 63 more issues_


---

### app\help\api\authentication\page.tsx (69 issues)


- **Line 1** [`string-literal`] [high]
  - Text: "use client"
  - Context: `"use client"`


- **Line 16** [`attribute`] [medium]
  - Text: "Breadcrumb"
  - Context: `<nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">`


- **Line 16** [`aria-label`] [high]
  - Text: "Breadcrumb"
  - Context: `<nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">`


- **Line 25** [`jsx-text`] [high]
  - Text: "Authentication"
  - Context: `<span className="text-white">Authentication</span>`


- **Line 51** [`jsx-text`] [high]
  - Text: "API"
  - Context: `<span className="text-blue-400 text-sm font-medium">API</span>`


- **Line 61** [`jsx-text`] [high]
  - Text: "10 min read"
  - Context: `<span>10 min read</span>`


- **Line 65** [`jsx-text`] [high]
  - Text: "Last updated: March 2025"
  - Context: `<span>Last updated: March 2025</span>`


- **Line 87** [`jsx-text`] [high]
  - Text: "Secure API access"
  - Context: `<h2 className="text-white text-lg font-semibold mb-2">Secure API access</h2>`


- **Line 97** [`jsx-text`] [high]
  - Text: "Authentication methods"
  - Context: `<h2 className="text-2xl font-bold text-white mb-6">Authentication methods</h2>`


- **Line 118** [`jsx-text`] [high]
  - Text: "How to get your API key:"
  - Context: `<h4 className="text-blue-400 font-medium mb-2">How to get your API key:</h4>`


_...and 59 more issues_


---

### components\demo\sample-data.ts (66 issues)


- **Line 38** [`string-literal`] [medium]
  - Text: "Technical SEO"
  - Context: `name: "Technical SEO",`


- **Line 42** [`string-literal`] [medium]
  - Text: "Critical crawling and indexing issues found"
  - Context: `description: "Critical crawling and indexing issues found"`


- **Line 45** [`string-literal`] [medium]
  - Text: "Content Quality"
  - Context: `name: "Content Quality",`


- **Line 49** [`string-literal`] [medium]
  - Text: "Strong product descriptions, minor optimization needed"
  - Context: `description: "Strong product descriptions, minor optimization needed"`


- **Line 52** [`string-literal`] [medium]
  - Text: "Page Speed"
  - Context: `name: "Page Speed",`


- **Line 56** [`string-literal`] [medium]
  - Text: "Slow loading times affecting user experience"
  - Context: `description: "Slow loading times affecting user experience"`


- **Line 59** [`string-literal`] [medium]
  - Text: "Mobile Experience"
  - Context: `name: "Mobile Experience",`


- **Line 69** [`string-literal`] [medium]
  - Text: "Missing meta descriptions on 47 product pages"
  - Context: `title: "Missing meta descriptions on 47 product pages",`


- **Line 71** [`string-literal`] [medium]
  - Text: "2 hours"
  - Context: `timeToFix: "2 hours"`


- **Line 75** [`string-literal`] [medium]
  - Text: "Slow server response time (3.2s average)"
  - Context: `title: "Slow server response time (3.2s average)",`


_...and 56 more issues_


---

### app\pricing\pricing-content.tsx (59 issues)


- **Line 1** [`string-literal`] [high]
  - Text: "use client"
  - Context: `"use client"`


- **Line 15** [`string-literal`] [high]
  - Text: "Can I cancel my subscription anytime?"
  - Context: `question: "Can I cancel my subscription anytime?",`


- **Line 19** [`string-literal`] [high]
  - Text: "Is there a free trial for paid plans?"
  - Context: `question: "Is there a free trial for paid plans?",`


- **Line 23** [`string-literal`] [high]
  - Text: "What payment methods do you accept?"
  - Context: `question: "What payment methods do you accept?",`


- **Line 24** [`string-literal`] [high]
  - Text: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual subscriptions."
  - Context: `answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual subscriptions."`


- **Line 27** [`string-literal`] [high]
  - Text: "Can I upgrade or downgrade my plan?"
  - Context: `question: "Can I upgrade or downgrade my plan?",`


- **Line 31** [`string-literal`] [high]
  - Text: "Do you offer custom enterprise plans?"
  - Context: `question: "Do you offer custom enterprise plans?",`


- **Line 32** [`string-literal`] [high]
  - Text: "Yes, for large organizations with specific needs, we offer custom enterprise solutions. Contact our sales team to discuss your requirements."
  - Context: `answer: "Yes, for large organizations with specific needs, we offer custom enterprise solutions. Contact our sales team to discuss your requirements."`


- **Line 35** [`string-literal`] [high]
  - Text: "What kind of support do you provide?"
  - Context: `question: "What kind of support do you provide?",`


- **Line 36** [`string-literal`] [high]
  - Text: "Free users get email support, Pro users get priority email support, and Agency users get dedicated phone and Slack support with a dedicated account manager."
  - Context: `answer: "Free users get email support, Pro users get priority email support, and Agency users get dedicated phone and Slack support with a dedicated account manager."`


_...and 49 more issues_


---

### app\pricing\pricing-client.tsx (59 issues)


- **Line 1** [`string-literal`] [high]
  - Text: "use client"
  - Context: `"use client"`


- **Line 15** [`string-literal`] [high]
  - Text: "Can I cancel my subscription anytime?"
  - Context: `question: "Can I cancel my subscription anytime?",`


- **Line 19** [`string-literal`] [high]
  - Text: "Is there a free trial for paid plans?"
  - Context: `question: "Is there a free trial for paid plans?",`


- **Line 23** [`string-literal`] [high]
  - Text: "What payment methods do you accept?"
  - Context: `question: "What payment methods do you accept?",`


- **Line 24** [`string-literal`] [high]
  - Text: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual subscriptions."
  - Context: `answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual subscriptions."`


- **Line 27** [`string-literal`] [high]
  - Text: "Can I upgrade or downgrade my plan?"
  - Context: `question: "Can I upgrade or downgrade my plan?",`


- **Line 31** [`string-literal`] [high]
  - Text: "Do you offer custom enterprise plans?"
  - Context: `question: "Do you offer custom enterprise plans?",`


- **Line 32** [`string-literal`] [high]
  - Text: "Yes, for large organizations with specific needs, we offer custom enterprise solutions. Contact our sales team to discuss your requirements."
  - Context: `answer: "Yes, for large organizations with specific needs, we offer custom enterprise solutions. Contact our sales team to discuss your requirements."`


- **Line 35** [`string-literal`] [high]
  - Text: "What kind of support do you provide?"
  - Context: `question: "What kind of support do you provide?",`


- **Line 36** [`string-literal`] [high]
  - Text: "Free users get email support, Pro users get priority email support, and Agency users get dedicated phone and Slack support with a dedicated account manager."
  - Context: `answer: "Free users get email support, Pro users get priority email support, and Agency users get dedicated phone and Slack support with a dedicated account manager."`


_...and 49 more issues_


---

### app\dashboard\audit\page-new.tsx (56 issues)


- **Line 1** [`string-literal`] [high]
  - Text: "use client"
  - Context: `"use client";`


- **Line 113** [`string-literal`] [high]
  - Text: "Failed to load audit history:"
  - Context: `console.error('Failed to load audit history:', error)`


- **Line 119** [`string-literal`] [high]
  - Text: "Please enter a valid URL"
  - Context: `setError('Please enter a valid URL')`


- **Line 143** [`string-literal`] [high]
  - Text: "Failed to perform audit"
  - Context: `setError(result.error || 'Failed to perform audit')`


- **Line 146** [`string-literal`] [high]
  - Text: "Error starting audit:"
  - Context: `console.error('Error starting audit:', error)`


- **Line 147** [`string-literal`] [high]
  - Text: "Failed to connect to audit service"
  - Context: `setError('Failed to connect to audit service')`


- **Line 204** [`jsx-text`] [high]
  - Text: "SEO Audit"
  - Context: `<h1 className="text-3xl font-bold text-slate-900 dark:text-white">SEO Audit</h1>`


- **Line 237** [`jsx-text`] [high]
  - Text: "Website URL"
  - Context: `<Label htmlFor="url" className="text-slate-700 dark:text-slate-300">Website URL</Label>`


- **Line 243** [`placeholder`] [high]
  - Text: "https://example.com"
  - Context: `placeholder="https://example.com"`


- **Line 324** [`string-literal`] [high]
  - Text: "bestPractices"
  - Context: `{metric === 'bestPractices' ? 'Best Practices' : metric}`


_...and 46 more issues_


---

### app\[locale]\help\seo-tools\page.tsx (55 issues)


- **Line 17** [`string-literal`] [medium]
  - Text: "Explore our comprehensive suite of SEO tools designed to boost your search rankings, analyze competitors, and optimize your website performance."
  - Context: `description: "Explore our comprehensive suite of SEO tools designed to boost your search rankings, analyze competitors, and optimize your website performance.",`


- **Line 18** [`string-literal`] [medium]
  - Text: "SEO tools"
  - Context: `keywords: ["SEO tools", "SEO features", "search rankings", "competitor analysis", "website optimization", "SEO toolkit", "technical SEO", "keyword research", "site audit"]`


- **Line 18** [`string-literal`] [medium]
  - Text: "SEO features"
  - Context: `keywords: ["SEO tools", "SEO features", "search rankings", "competitor analysis", "website optimization", "SEO toolkit", "technical SEO", "keyword research", "site audit"]`


- **Line 18** [`string-literal`] [medium]
  - Text: "search rankings"
  - Context: `keywords: ["SEO tools", "SEO features", "search rankings", "competitor analysis", "website optimization", "SEO toolkit", "technical SEO", "keyword research", "site audit"]`


- **Line 18** [`string-literal`] [medium]
  - Text: "competitor analysis"
  - Context: `keywords: ["SEO tools", "SEO features", "search rankings", "competitor analysis", "website optimization", "SEO toolkit", "technical SEO", "keyword research", "site audit"]`


- **Line 18** [`string-literal`] [medium]
  - Text: "website optimization"
  - Context: `keywords: ["SEO tools", "SEO features", "search rankings", "competitor analysis", "website optimization", "SEO toolkit", "technical SEO", "keyword research", "site audit"]`


- **Line 18** [`string-literal`] [medium]
  - Text: "SEO toolkit"
  - Context: `keywords: ["SEO tools", "SEO features", "search rankings", "competitor analysis", "website optimization", "SEO toolkit", "technical SEO", "keyword research", "site audit"]`


- **Line 18** [`string-literal`] [medium]
  - Text: "technical SEO"
  - Context: `keywords: ["SEO tools", "SEO features", "search rankings", "competitor analysis", "website optimization", "SEO toolkit", "technical SEO", "keyword research", "site audit"]`


- **Line 18** [`string-literal`] [medium]
  - Text: "keyword research"
  - Context: `keywords: ["SEO tools", "SEO features", "search rankings", "competitor analysis", "website optimization", "SEO toolkit", "technical SEO", "keyword research", "site audit"]`


- **Line 18** [`string-literal`] [medium]
  - Text: "site audit"
  - Context: `keywords: ["SEO tools", "SEO features", "search rankings", "competitor analysis", "website optimization", "SEO toolkit", "technical SEO", "keyword research", "site audit"]`


_...and 45 more issues_


---

### app\[locale]\login\page.tsx (51 issues)


- **Line 1** [`string-literal`] [high]
  - Text: "use client"
  - Context: `"use client";`


- **Line 14** [`string-literal`] [high]
  - Text: "auth.login"
  - Context: `const t = useTranslations('auth.login');`


- **Line 15** [`string-literal`] [high]
  - Text: "auth.errors"
  - Context: `const tErrors = useTranslations('auth.errors');`


- **Line 40** [`string-literal`] [high]
  - Text: "serverError"
  - Context: `setError(tErrors('serverError'));`


- **Line 50** [`string-literal`] [high]
  - Text: "credentials"
  - Context: `const result = await signIn('credentials', {`


- **Line 56** [`string-literal`] [high]
  - Text: "invalidCredentials"
  - Context: `setError(tErrors('invalidCredentials'));`


- **Line 61** [`string-literal`] [high]
  - Text: "serverError"
  - Context: `setError(tErrors('serverError'));`


- **Line 64** [`string-literal`] [high]
  - Text: "serverError"
  - Context: `setError(tErrors('serverError'));`


- **Line 82** [`jsx-text`] [high]
  - Text: "Skip to main content"
  - Context: `<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded">Skip to main content</a>`


- **Line 128** [`attribute`] [medium]
  - Text: "Login form"
  - Context: `<form onSubmit={handleEmailSignIn} action="/api/auth/signin" method="post" className="space-y-6" aria-label="Login form">`


_...and 41 more issues_


---

### app\[locale]\forgot-password\page.tsx (51 issues)


- **Line 2** [`string-literal`] [high]
  - Text: "use client"
  - Context: `"use client";`


- **Line 14** [`string-literal`] [high]
  - Text: "auth.forgotPassword"
  - Context: `const t = useTranslations('auth.forgotPassword');`


- **Line 15** [`string-literal`] [high]
  - Text: "auth.errors"
  - Context: `const tErrors = useTranslations('auth.errors');`


- **Line 36** [`string-literal`] [high]
  - Text: "Failed to send reset email"
  - Context: `throw new Error(data.message || "Failed to send reset email");`


- **Line 40** [`string-literal`] [high]
  - Text: "Something went wrong. Please try again."
  - Context: `setError(error.message || "Something went wrong. Please try again.");`


- **Line 50** [`jsx-text`] [high]
  - Text: "Password Security Best Practices"
  - Context: `<h2>Password Security Best Practices</h2>`


- **Line 51** [`jsx-text`] [high]
  - Text: "Learn about secure password management and account recovery procedures."
  - Context: `<p>Learn about secure password management and account recovery procedures.</p>`


- **Line 52** [`jsx-text`] [high]
  - Text: "Account Recovery Process"
  - Context: `<h2>Account Recovery Process</h2>`


- **Line 53** [`jsx-text`] [high]
  - Text: "Step-by-step guide to resetting your password and regaining account access."
  - Context: `<p>Step-by-step guide to resetting your password and regaining account access.</p>`


- **Line 54** [`jsx-text`] [high]
  - Text: "Security Support"
  - Context: `<h2>Security Support</h2>`


_...and 41 more issues_


---

### app\share\[token]\page.tsx (46 issues)


- **Line 25** [`string-literal`] [medium]
  - Text: "This shared SEO audit link is invalid or has expired."
  - Context: `description: 'This shared SEO audit link is invalid or has expired.',`


- **Line 26** [`string-literal`] [medium]
  - Text: "noindex, nofollow"
  - Context: `robots: 'noindex, nofollow'`


- **Line 37** [`string-literal`] [medium]
  - Text: "SEO audit, website analysis, performance score, accessibility check, SEO report"
  - Context: `keywords: 'SEO audit, website analysis, performance score, accessibility check, SEO report',`


- **Line 38** [`string-literal`] [medium]
  - Text: "noindex, nofollow"
  - Context: `robots: 'noindex, nofollow',`


- **Line 49** [`jsx-text`] [high]
  - Text: "Link Invalid or Expired"
  - Context: `if (!data) return <div className="p-10 max-w-2xl mx-auto"><h1 className="text-2xl font-semibold mb-4">Link Invalid or Expired</h1><p className="text-muted-foreground">Request a new share link from the dashboard.</p></div>`


- **Line 49** [`jsx-text`] [high]
  - Text: "Request a new share link from the dashboard."
  - Context: `if (!data) return <div className="p-10 max-w-2xl mx-auto"><h1 className="text-2xl font-semibold mb-4">Link Invalid or Expired</h1><p className="text-muted-foreground">Request a new share link from the dashboard.</p></div>`


- **Line 61** [`jsx-text`] [high]
  - Text: "Shared SEO Audit Report"
  - Context: `<h1>Shared SEO Audit Report</h1>`


- **Line 68** [`jsx-text`] [high]
  - Text: "Understanding SEO Audit Reports"
  - Context: `<h2>Understanding SEO Audit Reports</h2>`


- **Line 75** [`jsx-text`] [high]
  - Text: "What This Report Includes:"
  - Context: `<h3>What This Report Includes:</h3>`


- **Line 77** [`jsx-text`] [high]
  - Text: "Performance Scores:"
  - Context: `<li><strong>Performance Scores:</strong> Overall SEO health across five key categories</li>`


_...and 36 more issues_


---

### components\audit\CrawledPagesAnalysis.tsx (46 issues)


- **Line 1** [`string-literal`] [high]
  - Text: "use client"
  - Context: `"use client";`


- **Line 79** [`jsx-text`] [high]
  - Text: "= 200 && statusCode"
  - Context: `if (statusCode >= 200 && statusCode < 300) {`


- **Line 80** [`jsx-text`] [high]
  - Text: "Healthy"
  - Context: `return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Healthy</Badge>;`


- **Line 81** [`jsx-text`] [high]
  - Text: "= 300 && statusCode"
  - Context: `} else if (statusCode >= 300 && statusCode < 400) {`


- **Line 82** [`jsx-text`] [high]
  - Text: "Redirect"
  - Context: `return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">Redirect</Badge>;`


- **Line 84** [`jsx-text`] [high]
  - Text: "Error"
  - Context: `return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Error</Badge>;`


- **Line 86** [`jsx-text`] [high]
  - Text: "Unknown"
  - Context: `return <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">Unknown</Badge>;`


- **Line 107** [`jsx-text`] [high]
  - Text: "= 200 && page.statusCode"
  - Context: `return page.statusCode >= 200 && page.statusCode < 300 && page.issues.length === 0;`


- **Line 141** [`jsx-text`] [high]
  - Text: "= 200 && page.statusCode"
  - Context: `const healthyPages = pages.filter(page => page.statusCode >= 200 && page.statusCode < 300 && page.issues.length === 0).length;`


- **Line 155** [`jsx-text`] [high]
  - Text: "Analyzing crawled pages..."
  - Context: `<span className="text-slate-600 dark:text-slate-300">Analyzing crawled pages...</span>`


_...and 36 more issues_


---

### components\blog\SEOCharts.tsx (43 issues)


- **Line 1** [`string-literal`] [high]
  - Text: "use client"
  - Context: `"use client"`


- **Line 36** [`jsx-text`] [high]
  - Text: "Traffic Growth After SEO Audit"
  - Context: `<h3 className="text-xl font-semibold text-white">Traffic Growth After SEO Audit</h3>`


- **Line 42** [`jsx-text`] [high]
  - Text: "Comparison of organic traffic before and after implementing audit recommendations"
  - Context: `<p className="text-gray-400 text-sm">Comparison of organic traffic before and after implementing audit recommendations</p>`


- **Line 48** [`string-literal`] [high]
  - Text: "colorBefore"
  - Context: `<linearGradient id="colorBefore" x1="0" y1="0" x2="0" y2="1">`


- **Line 49** [`string-literal`] [high]
  - Text: " stopColor="
  - Context: `<stop offset="5%" stopColor="#64748b" stopOpacity={0.3}/>`


- **Line 52** [`string-literal`] [high]
  - Text: "colorAfter"
  - Context: `<linearGradient id="colorAfter" x1="0" y1="0" x2="0" y2="1">`


- **Line 53** [`string-literal`] [high]
  - Text: " stopColor="
  - Context: `<stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>`


- **Line 63** [`string-literal`] [high]
  - Text: "1px solid #334155"
  - Context: `border: '1px solid #334155',`


- **Line 74** [`string-literal`] [high]
  - Text: "url(#colorBefore)"
  - Context: `fill="url(#colorBefore)"`


- **Line 75** [`string-literal`] [high]
  - Text: "Before Audit"
  - Context: `name="Before Audit"`


_...and 33 more issues_


---

### components\audit\HeadingStructure.tsx (42 issues)


- **Line 1** [`string-literal`] [medium]
  - Text: "use client"
  - Context: `"use client";`


- **Line 19** [`string-literal`] [medium]
  - Text: "No H1 tag found"
  - Context: `issues.push('No H1 tag found');`


- **Line 20** [`string-literal`] [medium]
  - Text: "Add a descriptive H1 tag to your page"
  - Context: `recommendations.push('Add a descriptive H1 tag to your page');`


- **Line 24** [`string-literal`] [medium]
  - Text: "Use only one H1 tag per page"
  - Context: `recommendations.push('Use only one H1 tag per page');`


- **Line 29** [`string-literal`] [medium]
  - Text: "H1 tag is too short"
  - Context: `issues.push('H1 tag is too short');`


- **Line 33** [`string-literal`] [medium]
  - Text: "H1 tag is too long"
  - Context: `issues.push('H1 tag is too long');`


- **Line 34** [`string-literal`] [medium]
  - Text: "Keep your H1 concise (under 60 characters)"
  - Context: `recommendations.push('Keep your H1 concise (under 60 characters)');`


- **Line 41** [`string-literal`] [medium]
  - Text: "No H2 tags found"
  - Context: `issues.push('No H2 tags found');`


- **Line 42** [`string-literal`] [medium]
  - Text: "Add H2 tags to structure your content"
  - Context: `recommendations.push('Add H2 tags to structure your content');`


- **Line 45** [`string-literal`] [medium]
  - Text: "Consider if all H2 tags are necessary for content structure"
  - Context: `recommendations.push('Consider if all H2 tags are necessary for content structure');`


_...and 32 more issues_


---

### app\[locale]\help\page.tsx (41 issues)


- **Line 54** [`string-literal`] [high]
  - Text: "helpCenter"
  - Context: `const t = await getTranslations({ locale, namespace: 'helpCenter' })`


- **Line 59** [`string-literal`] [high]
  - Text: "How do I run my first SEO audit?"
  - Context: `question: "How do I run my first SEO audit?",`


- **Line 60** [`string-literal`] [high]
  - Text: "To run your first SEO audit, sign up for a free account, connect your website, and click "
  - Context: `answer: "To run your first SEO audit, sign up for a free account, connect your website, and click 'Start Audit'. Our AI will analyze your site and provide detailed recommendations within minutes."`


- **Line 60** [`string-literal`] [high]
  - Text: ". Our AI will analyze your site and provide detailed recommendations within minutes."
  - Context: `answer: "To run your first SEO audit, sign up for a free account, connect your website, and click 'Start Audit'. Our AI will analyze your site and provide detailed recommendations within minutes."`


- **Line 63** [`string-literal`] [high]
  - Text: "What SEO metrics should I focus on first?"
  - Context: `question: "What SEO metrics should I focus on first?",`


- **Line 67** [`string-literal`] [high]
  - Text: "How often should I run SEO audits?"
  - Context: `question: "How often should I run SEO audits?",`


- **Line 68** [`string-literal`] [high]
  - Text: "Run comprehensive audits monthly and quick checks weekly. Major content changes or technical updates should trigger immediate audits."
  - Context: `answer: "Run comprehensive audits monthly and quick checks weekly. Major content changes or technical updates should trigger immediate audits."`


- **Line 71** [`string-literal`] [high]
  - Text: "Can I export my SEO audit results?"
  - Context: `question: "Can I export my SEO audit results?",`


- **Line 72** [`string-literal`] [high]
  - Text: "Yes, all audit results can be exported as PDF reports or CSV files. Premium plans include advanced reporting and team sharing features."
  - Context: `answer: "Yes, all audit results can be exported as PDF reports or CSV files. Premium plans include advanced reporting and team sharing features."`


- **Line 76** [`string-literal`] [high]
  - Text: "Our AI provides personalized recommendations, competitor intelligence, and automated optimization suggestions that other tools miss. We focus on actionable insights over just data."
  - Context: `answer: "Our AI provides personalized recommendations, competitor intelligence, and automated optimization suggestions that other tools miss. We focus on actionable insights over just data."`


_...and 31 more issues_


---

### app\help\billing\invoices\page.tsx (41 issues)


- **Line 1** [`string-literal`] [medium]
  - Text: "use client"
  - Context: `"use client"`


- **Line 22** [`jsx-text`] [high]
  - Text: "Understanding Your Invoices"
  - Context: `<h1 className="text-4xl font-bold text-gray-900 mb-4">Understanding Your Invoices</h1>`


- **Line 31** [`jsx-text`] [high]
  - Text: "What You'll Find on Your Invoice"
  - Context: `<h2 className="text-2xl font-semibold text-gray-900 mb-6">What You'll Find on Your Invoice</h2>`


- **Line 35** [`jsx-text`] [high]
  - Text: "Invoice Number"
  - Context: `<h3 className="font-semibold text-gray-900 mb-1">Invoice Number</h3>`


- **Line 36** [`jsx-text`] [high]
  - Text: "Unique identifier for each invoice"
  - Context: `<p className="text-sm text-gray-600">Unique identifier for each invoice</p>`


- **Line 40** [`jsx-text`] [high]
  - Text: "Billing Period"
  - Context: `<h3 className="font-semibold text-gray-900 mb-1">Billing Period</h3>`


- **Line 41** [`jsx-text`] [high]
  - Text: "Service period covered"
  - Context: `<p className="text-sm text-gray-600">Service period covered</p>`


- **Line 45** [`jsx-text`] [high]
  - Text: "Amount Due"
  - Context: `<h3 className="font-semibold text-gray-900 mb-1">Amount Due</h3>`


- **Line 46** [`jsx-text`] [high]
  - Text: "Total charges for the period"
  - Context: `<p className="text-sm text-gray-600">Total charges for the period</p>`


- **Line 50** [`jsx-text`] [high]
  - Text: "Download PDF"
  - Context: `<h3 className="font-semibold text-gray-900 mb-1">Download PDF</h3>`


_...and 31 more issues_


---

### components\keywords\keyword-research.tsx (40 issues)


- **Line 1** [`string-literal`] [high]
  - Text: "use client"
  - Context: `'use client';`


- **Line 55** [`string-literal`] [high]
  - Text: "Error loading keywords:"
  - Context: `console.error('Error loading keywords:', error);`


- **Line 67** [`string-literal`] [high]
  - Text: "No keyword input provided"
  - Context: `console.log('No keyword input provided');`


- **Line 72** [`string-literal`] [high]
  - Text: "Starting keyword research..."
  - Context: `console.log('Starting keyword research...');`


- **Line 73** [`string-literal`] [high]
  - Text: "Raw input:"
  - Context: `console.log('Raw input:', keywordInput);`


- **Line 81** [`string-literal`] [high]
  - Text: "Parsed keyword list:"
  - Context: `console.log('Parsed keyword list:', keywordList);`


- **Line 82** [`string-literal`] [high]
  - Text: "Project ID:"
  - Context: `console.log('Project ID:', projectId);`


- **Line 99** [`string-literal`] [high]
  - Text: "Response status:"
  - Context: `console.log('Response status:', response.status);`


- **Line 101** [`string-literal`] [high]
  - Text: "API response:"
  - Context: `console.log('API response:', result);`


- **Line 104** [`string-literal`] [high]
  - Text: "Keywords received:"
  - Context: `console.log('Keywords received:', result.data.keywords);`


_...and 30 more issues_


---

### app\help\billing\cancellation\page.tsx (39 issues)


- **Line 1** [`string-literal`] [medium]
  - Text: "use client"
  - Context: `"use client"`


- **Line 22** [`jsx-text`] [high]
  - Text: "Account Cancellation & Refunds"
  - Context: `<h1 className="text-4xl font-bold text-gray-900 mb-4">Account Cancellation & Refunds</h1>`


- **Line 34** [`jsx-text`] [high]
  - Text: "Before You Cancel"
  - Context: `<h3 className="text-lg font-semibold text-amber-900 mb-2">Before You Cancel</h3>`


- **Line 59** [`jsx-text`] [high]
  - Text: "Cancellation Options"
  - Context: `<h2 className="text-2xl font-semibold text-gray-900 mb-6">Cancellation Options</h2>`


- **Line 64** [`jsx-text`] [high]
  - Text: "Pause Subscription"
  - Context: `<h3 className="text-lg font-semibold text-green-900">Pause Subscription</h3>`


- **Line 70** [`jsx-text`] [high]
  - Text: "• No charges during pause period"
  - Context: `<li>• No charges during pause period</li>`


- **Line 71** [`jsx-text`] [high]
  - Text: "• Resume anytime without setup"
  - Context: `<li>• Resume anytime without setup</li>`


- **Line 72** [`jsx-text`] [high]
  - Text: "• Data preserved for up to 1 year"
  - Context: `<li>• Data preserved for up to 1 year</li>`


- **Line 73** [`jsx-text`] [high]
  - Text: "• Access to billing history"
  - Context: `<li>• Access to billing history</li>`


- **Line 80** [`jsx-text`] [high]
  - Text: "Cancel Subscription"
  - Context: `<h3 className="text-lg font-semibold text-red-900">Cancel Subscription</h3>`


_...and 29 more issues_


---

### components\features\keyword-tracking\keyword-tracking-hero.tsx (39 issues)


- **Line 1** [`string-literal`] [high]
  - Text: "use client"
  - Context: `"use client";`


- **Line 16** [`string-literal`] [high]
  - Text: "featurePages.keywordTracking"
  - Context: `const t = useTranslations('featurePages.keywordTracking');`


- **Line 17** [`string-literal`] [high]
  - Text: "featurePages.keywordTracking.hero"
  - Context: `const tHero = useTranslations('featurePages.keywordTracking.hero');`


- **Line 27** [`string-literal`] [high]
  - Text: "Keywords are required"
  - Context: `newErrors.keywords = "Keywords are required";`


- **Line 49** [`string-literal`] [high]
  - Text: "metrics.keywordsTracked.label"
  - Context: `{ label: tHero('metrics.keywordsTracked.label'), value: tHero('metrics.keywordsTracked.value'), description: tHero('metrics.keywordsTracked.description') },`


- **Line 49** [`string-literal`] [high]
  - Text: "metrics.keywordsTracked.value"
  - Context: `{ label: tHero('metrics.keywordsTracked.label'), value: tHero('metrics.keywordsTracked.value'), description: tHero('metrics.keywordsTracked.description') },`


- **Line 49** [`string-literal`] [high]
  - Text: "metrics.keywordsTracked.description"
  - Context: `{ label: tHero('metrics.keywordsTracked.label'), value: tHero('metrics.keywordsTracked.value'), description: tHero('metrics.keywordsTracked.description') },`


- **Line 50** [`string-literal`] [high]
  - Text: "metrics.dailyUpdates.label"
  - Context: `{ label: tHero('metrics.dailyUpdates.label'), value: tHero('metrics.dailyUpdates.value'), description: tHero('metrics.dailyUpdates.description') },`


- **Line 50** [`string-literal`] [high]
  - Text: "metrics.dailyUpdates.value"
  - Context: `{ label: tHero('metrics.dailyUpdates.label'), value: tHero('metrics.dailyUpdates.value'), description: tHero('metrics.dailyUpdates.description') },`


- **Line 50** [`string-literal`] [high]
  - Text: "metrics.dailyUpdates.description"
  - Context: `{ label: tHero('metrics.dailyUpdates.label'), value: tHero('metrics.dailyUpdates.value'), description: tHero('metrics.dailyUpdates.description') },`


_...and 29 more issues_


---

### components\features\competitor-analysis\serp-comparison.tsx (39 issues)


- **Line 1** [`string-literal`] [high]
  - Text: "use client"
  - Context: `"use client";`


- **Line 19** [`string-literal`] [high]
  - Text: "featurePages.competitorAnalysis.serpComparison"
  - Context: `const t = useTranslations('featurePages.competitorAnalysis.serpComparison');`


- **Line 20** [`string-literal`] [high]
  - Text: "seo audit tool"
  - Context: `const [selectedKeyword, setSelectedKeyword] = useState("seo audit tool");`


- **Line 24** [`string-literal`] [high]
  - Text: "seo audit tool"
  - Context: `"seo audit tool",`


- **Line 25** [`string-literal`] [high]
  - Text: "website analyzer"
  - Context: `"website analyzer",`


- **Line 26** [`string-literal`] [high]
  - Text: "seo checker"
  - Context: `"seo checker",`


- **Line 27** [`string-literal`] [high]
  - Text: "site audit software"
  - Context: `"site audit software",`


- **Line 28** [`string-literal`] [high]
  - Text: "technical seo"
  - Context: `"technical seo"`


- **Line 33** [`string-literal`] [high]
  - Text: "seo audit tool"
  - Context: `keyword: "seo audit tool",`


- **Line 37** [`string-literal`] [high]
  - Text: "semrush.com"
  - Context: `{ name: "semrush.com", rank: 1, change: 0 },`


_...and 29 more issues_


---

### lib\seed-keyword.ts (39 issues)


- **Line 10** [`string-literal`] [high]
  - Text: "semrush.com"
  - Context: `'semrush.com',`


- **Line 11** [`string-literal`] [high]
  - Text: "ahrefs.com"
  - Context: `'ahrefs.com',`


- **Line 13** [`string-literal`] [high]
  - Text: "serpstat.com"
  - Context: `'serpstat.com',`


- **Line 14** [`string-literal`] [high]
  - Text: "spyfu.com"
  - Context: `'spyfu.com',`


- **Line 15** [`string-literal`] [high]
  - Text: "ubersuggest.com"
  - Context: `'ubersuggest.com',`


- **Line 16** [`string-literal`] [high]
  - Text: "majestic.com"
  - Context: `'majestic.com',`


- **Line 17** [`string-literal`] [high]
  - Text: "mangools.com"
  - Context: `'mangools.com',`


- **Line 18** [`string-literal`] [high]
  - Text: "seranking.com"
  - Context: `'seranking.com',`


- **Line 19** [`string-literal`] [high]
  - Text: "brightlocal.com"
  - Context: `'brightlocal.com',`


- **Line 21** [`string-literal`] [high]
  - Text: "sitebulb.com"
  - Context: `'sitebulb.com',`


_...and 29 more issues_


---

### app\api\backlinks\mock-data\route.ts (38 issues)


- **Line 15** [`string-literal`] [high]
  - Text: "Project ID is required"
  - Context: `{ error: 'Project ID is required' },`


- **Line 27** [`string-literal`] [high]
  - Text: "Project not found"
  - Context: `{ error: 'Project not found' },`


- **Line 34** [`string-literal`] [high]
  - Text: "techcrunch.com"
  - Context: `{ domain: 'techcrunch.com', rating: 94, category: 'Technology', traffic: 50000000, toxic: false },`


- **Line 34** [`string-literal`] [high]
  - Text: "Technology"
  - Context: `{ domain: 'techcrunch.com', rating: 94, category: 'Technology', traffic: 50000000, toxic: false },`


- **Line 35** [`string-literal`] [high]
  - Text: "medium.com"
  - Context: `{ domain: 'medium.com', rating: 96, category: 'Publishing', traffic: 200000000, toxic: false },`


- **Line 35** [`string-literal`] [high]
  - Text: "Publishing"
  - Context: `{ domain: 'medium.com', rating: 96, category: 'Publishing', traffic: 200000000, toxic: false },`


- **Line 36** [`string-literal`] [high]
  - Text: "wikipedia.org"
  - Context: `{ domain: 'wikipedia.org', rating: 99, category: 'Reference', traffic: 15000000000, toxic: false },`


- **Line 37** [`string-literal`] [high]
  - Text: "github.com"
  - Context: `{ domain: 'github.com', rating: 96, category: 'Technology', traffic: 2000000000, toxic: false },`


- **Line 37** [`string-literal`] [high]
  - Text: "Technology"
  - Context: `{ domain: 'github.com', rating: 96, category: 'Technology', traffic: 2000000000, toxic: false },`


- **Line 38** [`string-literal`] [high]
  - Text: "stackoverflow.com"
  - Context: `{ domain: 'stackoverflow.com', rating: 91, category: 'Technology', traffic: 1500000000, toxic: false },`


_...and 28 more issues_


---

### app\help\billing\upgrade-plan\page.tsx (37 issues)


- **Line 1** [`string-literal`] [medium]
  - Text: "use client"
  - Context: `"use client"`


- **Line 22** [`jsx-text`] [high]
  - Text: "Upgrading Your Plan"
  - Context: `<h1 className="text-4xl font-bold text-gray-900 mb-4">Upgrading Your Plan</h1>`


- **Line 31** [`jsx-text`] [high]
  - Text: "Plan Comparison"
  - Context: `<h2 className="text-2xl font-semibold text-gray-900 mb-6">Plan Comparison</h2>`


- **Line 36** [`jsx-text`] [high]
  - Text: "Free Plan"
  - Context: `<h3 className="text-lg font-semibold text-gray-900">Free Plan</h3>`


- **Line 38** [`jsx-text`] [high]
  - Text: "Perfect for getting started with basic SEO audits."
  - Context: `<p className="text-gray-600 mb-4">Perfect for getting started with basic SEO audits.</p>`


- **Line 40** [`jsx-text`] [high]
  - Text: "• 3 audits per month"
  - Context: `<li>• 3 audits per month</li>`


- **Line 41** [`jsx-text`] [high]
  - Text: "• Basic SEO analysis"
  - Context: `<li>• Basic SEO analysis</li>`


- **Line 42** [`jsx-text`] [high]
  - Text: "• Limited reporting"
  - Context: `<li>• Limited reporting</li>`


- **Line 48** [`jsx-text`] [high]
  - Text: "Popular"
  - Context: `<span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">Popular</span>`


- **Line 52** [`jsx-text`] [high]
  - Text: "Pro Plan - $49/month"
  - Context: `<h3 className="text-lg font-semibold text-gray-900">Pro Plan - $49/month</h3>`


_...and 27 more issues_


---

### app\[locale]\blog\core-web-vitals-optimization-guide\page.tsx (35 issues)


- **Line 15** [`string-literal`] [high]
  - Text: "Complete guide to optimizing Core Web Vitals. Learn how to improve LCP, FID, and CLS for better Google rankings and user experience."
  - Context: `description: 'Complete guide to optimizing Core Web Vitals. Learn how to improve LCP, FID, and CLS for better Google rankings and user experience.',`


- **Line 16** [`string-literal`] [high]
  - Text: "Core Web Vitals"
  - Context: `keywords: ['Core Web Vitals', 'LCP optimization', 'FID improvement', 'CLS fixes', 'page experience'],`


- **Line 16** [`string-literal`] [high]
  - Text: "LCP optimization"
  - Context: `keywords: ['Core Web Vitals', 'LCP optimization', 'FID improvement', 'CLS fixes', 'page experience'],`


- **Line 16** [`string-literal`] [high]
  - Text: "FID improvement"
  - Context: `keywords: ['Core Web Vitals', 'LCP optimization', 'FID improvement', 'CLS fixes', 'page experience'],`


- **Line 16** [`string-literal`] [high]
  - Text: "CLS fixes"
  - Context: `keywords: ['Core Web Vitals', 'LCP optimization', 'FID improvement', 'CLS fixes', 'page experience'],`


- **Line 16** [`string-literal`] [high]
  - Text: "page experience"
  - Context: `keywords: ['Core Web Vitals', 'LCP optimization', 'FID improvement', 'CLS fixes', 'page experience'],`


- **Line 32** [`string-literal`] [high]
  - Text: "blog.coreWebVitals2025"
  - Context: `const t = await getTranslations({ locale, namespace: 'blog.coreWebVitals2025' })`


- **Line 35** [`attribute`] [medium]
  - Text: "Table of Contents"
  - Context: `<div role="navigation" aria-label="Table of Contents" class="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 mb-8">`


- **Line 35** [`aria-label`] [high]
  - Text: "Table of Contents"
  - Context: `<div role="navigation" aria-label="Table of Contents" class="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 mb-8">`


- **Line 46** [`string-literal`] [high]
  - Text: "introduction"
  - Context: `<section id="introduction">`


_...and 25 more issues_


---

### app\help\security\two-factor-authentication\page.tsx (35 issues)


- **Line 1** [`string-literal`] [medium]
  - Text: "use client"
  - Context: `"use client"`


- **Line 22** [`jsx-text`] [high]
  - Text: "Two-Factor Authentication"
  - Context: `<h1 className="text-4xl font-bold text-gray-900 mb-4">Two-Factor Authentication</h1>`


- **Line 31** [`jsx-text`] [high]
  - Text: "Why Enable Two-Factor Authentication?"
  - Context: `<h2 className="text-2xl font-semibold text-gray-900 mb-6">Why Enable Two-Factor Authentication?</h2>`


- **Line 36** [`jsx-text`] [high]
  - Text: "Enhanced Security"
  - Context: `<h3 className="text-lg font-semibold text-gray-900 mb-2">Enhanced Security</h3>`


- **Line 46** [`jsx-text`] [high]
  - Text: "Account Protection"
  - Context: `<h3 className="text-lg font-semibold text-gray-900 mb-2">Account Protection</h3>`


- **Line 58** [`jsx-text`] [high]
  - Text: "Available 2FA Methods"
  - Context: `<h2 className="text-2xl font-semibold text-gray-900 mb-6">Available 2FA Methods</h2>`


- **Line 63** [`jsx-text`] [high]
  - Text: "Authenticator App"
  - Context: `<h3 className="text-lg font-semibold text-gray-900">Authenticator App</h3>`


- **Line 72** [`jsx-text`] [high]
  - Text: "Most secure option"
  - Context: `<span>Most secure option</span>`


- **Line 76** [`jsx-text`] [high]
  - Text: "Works without cell service"
  - Context: `<span>Works without cell service</span>`


- **Line 80** [`jsx-text`] [high]
  - Text: "Backup codes available"
  - Context: `<span>Backup codes available</span>`


_...and 25 more issues_


---

### app\[locale]\help\getting-started\seo-scores\SEOScoresContent.tsx (35 issues)


- **Line 1** [`string-literal`] [high]
  - Text: "use client"
  - Context: `"use client"`


- **Line 28** [`string-literal`] [high]
  - Text: "application/ld+json"
  - Context: `type="application/ld+json"`


- **Line 31** [`string-literal`] [high]
  - Text: "@context"
  - Context: `"@context": "https://schema.org",`


- **Line 33** [`string-literal`] [high]
  - Text: "Understanding SEO Scores: Complete Guide to AISEOTurbo Scoring System"
  - Context: `"headline": "Understanding SEO Scores: Complete Guide to AISEOTurbo Scoring System",`


- **Line 34** [`string-literal`] [high]
  - Text: "description"
  - Context: `"description": "Comprehensive guide to understanding SEO scores, metrics, and how AISEOTurbo calculates your website's search optimization performance.",`


- **Line 34** [`string-literal`] [high]
  - Text: "Comprehensive guide to understanding SEO scores, metrics, and how AISEOTurbo calculates your website"
  - Context: `"description": "Comprehensive guide to understanding SEO scores, metrics, and how AISEOTurbo calculates your website's search optimization performance.",`


- **Line 37** [`string-literal`] [high]
  - Text: "Organization"
  - Context: `"@type": "Organization",`


- **Line 38** [`string-literal`] [high]
  - Text: "AISEOTurbo"
  - Context: `"name": "AISEOTurbo",`


- **Line 42** [`string-literal`] [high]
  - Text: "Organization"
  - Context: `"@type": "Organization",`


- **Line 43** [`string-literal`] [high]
  - Text: "AISEOTurbo"
  - Context: `"name": "AISEOTurbo",`


_...and 25 more issues_


---

### components\keywords\keyword-overview.tsx (35 issues)


- **Line 1** [`string-literal`] [high]
  - Text: "use client"
  - Context: `'use client';`


- **Line 70** [`string-literal`] [high]
  - Text: "Very Easy"
  - Context: `if (difficulty < 30) return { label: 'Very Easy', color: 'text-green-600', bgColor: 'bg-green-100' };`


- **Line 74** [`string-literal`] [high]
  - Text: "Very Hard"
  - Context: `return { label: 'Very Hard', color: 'text-red-600', bgColor: 'bg-red-100' };`


- **Line 79** [`string-literal`] [high]
  - Text: "COMMERCIAL"
  - Context: `case 'COMMERCIAL': return 'bg-white/90 text-blue-700 border-blue-300 shadow-sm';`


- **Line 80** [`string-literal`] [high]
  - Text: "INFORMATIONAL"
  - Context: `case 'INFORMATIONAL': return 'bg-white/90 text-purple-700 border-purple-300 shadow-sm';`


- **Line 81** [`string-literal`] [high]
  - Text: "NAVIGATIONAL"
  - Context: `case 'NAVIGATIONAL': return 'bg-white/90 text-green-700 border-green-300 shadow-sm';`


- **Line 82** [`string-literal`] [high]
  - Text: "TRANSACTIONAL"
  - Context: `case 'TRANSACTIONAL': return 'bg-white/90 text-orange-700 border-orange-300 shadow-sm';`


- **Line 146** [`jsx-text`] [high]
  - Text: "Volume"
  - Context: `<CardTitle className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Volume</CardTitle>`


- **Line 156** [`jsx-text`] [high]
  - Text: "Monthly searches"
  - Context: `<p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-3">Monthly searches</p>`


- **Line 159** [`jsx-text`] [high]
  - Text: "+5% this month"
  - Context: `<span className="text-xs text-green-700 font-bold">+5% this month</span>`


_...and 25 more issues_



## Recommendations

1. **High Priority (7143 issues)**
   - JSX text content in user-facing components
   - Form placeholders and labels
   - Aria labels for accessibility
   - Alt texts for images

2. **Medium Priority (1118 issues)**
   - String literals in components
   - Component props with hardcoded text
   - Error messages and notifications

3. **Low Priority (0 issues)**
   - Console logs and debug messages
   - Technical identifiers
   - Internal configuration strings

## Next Steps

1. Review and categorize each issue
2. Extract strings to `messages/en.json` with proper namespaces
3. Update components to use `useTranslations()` or `getTranslations()`
4. Run auto-translation for all locales (fr, it, es, id, de)
5. Test locale switching across all affected pages
6. Re-run this audit to verify 100% coverage
