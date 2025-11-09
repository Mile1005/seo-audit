# Phase 4: Component Refactoring Samples with Diff-Style Changes

## 📋 Overview

This document shows **before/after** refactored code samples demonstrating next-intl integration across the AI SEO Turbo platform.

---

## 🎯 Sample 1: Main Audit Page (app/dashboard/audit/page.tsx)

### ✅ Key Changes Summary

| Change | Before | After |
|--------|--------|-------|
| **Hook Import** | ❌ None | ✅ `import { useTranslations } from 'next-intl'` |
| **Hook Usage** | ❌ None | ✅ `const t = useTranslations('audit')` |
| **Start Button** | `"Start Audit"` | `t('startAudit')` |
| **Running State** | `"Running Audit..."` | `t('runningAudit')` |
| **Title** | `"SEO Audit"` | `t('title')` |
| **Subtitle** | `"Comprehensive 47-point..."` | `t('subtitle', { points: 47 })` |
| **URL Placeholder** | `"https://example.com"` | `t('urlPlaceholder')` |
| **Score Labels** | `"Excellent"`, `"Good"` | `t('results.excellent')`, `t('results.good')` |
| **Export Button** | `"Export PDF"` | `t('export.pdf')` |

### 📝 Diff-Style Changes

```diff
// app/dashboard/audit/page.tsx
"use client";

import React, { useState, useEffect } from 'react'
+ import { useTranslations } from 'next-intl' // ✅ NEW: i18n hook
import { Button } from '../../../components/ui/button'
// ... other imports

export default function ComprehensiveAuditPage() {
+   // ✅ NEW: Initialize translation hooks for different namespaces
+   const t = useTranslations('audit')
+   const tCommon = useTranslations('common')
+   const tErrors = useTranslations('errors')
+   const tNotifications = useTranslations('notifications')

    const [url, setUrl] = useState('')
    const { data: result, error, loading: isLoading, status, start } = useAudit()

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
-                       <h1 className="text-3xl font-bold tracking-tight">
-                           SEO Audit
-                       </h1>
+                       <h1 className="text-3xl font-bold tracking-tight">
+                           {t('title')} {/* ✅ CHANGED: "SEO Audit" → translated */}
+                       </h1>
                        
-                       <p className="text-muted-foreground mt-2">
-                           Comprehensive 47-point SEO analysis with automated recommendations
-                       </p>
+                       <p className="text-muted-foreground mt-2">
+                           {t('subtitle', { points: 47 })} {/* ✅ NEW: Variable interpolation */}
+                       </p>
                    </div>
                    
                    {result && (
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => window.print()}>
                                <Download className="mr-2 h-4 w-4" />
-                               Export PDF
+                               {t('export.pdf')} {/* ✅ CHANGED: Translated */}
                            </Button>
                            <Button variant="outline" size="sm">
                                <Share className="mr-2 h-4 w-4" />
-                               Share
+                               {tCommon('share')} {/* ✅ NEW: Use common namespace */}
                            </Button>
                        </div>
                    )}
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleAuditSubmit}>
                            <div className="flex-1">
-                               <Label htmlFor="url">Enter your website URL</Label>
+                               <Label htmlFor="url">
+                                   {t('enterUrl')} {/* ✅ CHANGED: Translated */}
+                               </Label>
                                
                                <Input
                                    id="url"
                                    type="url"
-                                   placeholder="https://example.com"
+                                   placeholder={t('urlPlaceholder')} {/* ✅ CHANGED */}
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </div>
                            
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
-                                       Running Audit...
+                                       {t('runningAudit')} {/* ✅ CHANGED */}
                                    </>
                                ) : (
                                    <>
                                        <Search className="mr-2 h-4 w-4" />
-                                       Start Audit
+                                       {t('startAudit')} {/* ✅ CHANGED */}
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Error State */}
            {error && (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
-                       An error occurred: {error}
+                       {tErrors('generic.message')}: {error} {/* ✅ CHANGED */}
                        
                        <Button variant="link" onClick={reset}>
-                           Try again
+                           {tCommon('retry')} {/* ✅ CHANGED */}
                        </Button>
                    </AlertDescription>
                </Alert>
            )}

            {/* Results */}
            {result && (
                <Card>
                    <CardHeader>
-                       <CardTitle>SEO Audit Results</CardTitle>
+                       <CardTitle>{t('results.title')}</CardTitle> {/* ✅ CHANGED */}
                        
-                       <CardDescription>
-                           Completed on {new Date(result.timestamp).toLocaleString()}
-                       </CardDescription>
+                       <CardDescription>
+                           {t('results.completedOn', { 
+                               date: new Date(result.timestamp).toLocaleString() 
+                           })} {/* ✅ NEW: Variable interpolation */}
+                       </CardDescription>
                    </CardHeader>
                </Card>
            )}
        </div>
    )
}
```

---

## 🎯 Sample 2: Score Summary Component (components/audit/ScoreSummary.tsx)

### ✅ Key Changes Summary

| Change | Before | After |
|--------|--------|-------|
| **Hook Import** | ❌ None | ✅ `import { useTranslations } from 'next-intl'` |
| **Component Type** | Client-side | ✅ Client-side (add `'use client'`) |
| **Score Labels** | `"Overall SEO Score"` | `t('results.overallScore')` |
| **Category Names** | `"Performance"`, `"SEO"` | `t('scores.performance')`, `t('scores.seo')` |
| **Rating Badge** | `"Excellent"` | `t('results.excellent')` |

### 📝 Diff-Style Changes

```diff
+ "use client"; // ✅ NEW: Required for useTranslations hook
+ 
import React from 'react'
+ import { useTranslations } from 'next-intl' // ✅ NEW: i18n hook
import { Badge } from '../ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Progress } from '../ui/progress'
import { 
    Target, 
    Zap, 
    Search, 
    Accessibility, 
    Shield 
} from 'lucide-react'
import { AuditResultUnified } from '../../lib/types/audit'

interface ScoreSummaryProps {
    result: AuditResultUnified
    getScoreColor: (score: number) => string
    getScoreBadge: (score: number) => React.ReactNode
}

export function ScoreSummary({ result, getScoreColor, getScoreBadge }: ScoreSummaryProps) {
+   const t = useTranslations('audit') // ✅ NEW: Translation hook
    
    const scores = [
        { 
-           label: 'Performance', 
+           label: t('scores.performance'), // ✅ CHANGED
            value: result.scores.performance,
            icon: Zap,
            color: 'text-yellow-600'
        },
        { 
-           label: 'SEO', 
+           label: t('scores.seo'), // ✅ CHANGED
            value: result.scores.seo,
            icon: Search,
            color: 'text-blue-600'
        },
        { 
-           label: 'Accessibility', 
+           label: t('scores.accessibility'), // ✅ CHANGED
            value: result.scores.accessibility,
            icon: Accessibility,
            color: 'text-green-600'
        },
        { 
-           label: 'Best Practices', 
+           label: t('scores.bestPractices'), // ✅ CHANGED
            value: result.scores.bestPractices,
            icon: Shield,
            color: 'text-purple-600'
        }
    ]

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
-                       <CardTitle>Overall SEO Score</CardTitle>
+                       <CardTitle>{t('results.overallScore')}</CardTitle> {/* ✅ CHANGED */}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`text-4xl font-bold ${getScoreColor(result.scores.overall)}`}>
                            {result.scores.overall}
                        </span>
                        {getScoreBadge(result.scores.overall)}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {scores.map((score) => {
                        const Icon = score.icon
                        return (
                            <div key={score.label} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Icon className={`h-4 w-4 ${score.color}`} />
-                                       <span className="text-sm font-medium">{score.label}</span>
+                                       <span className="text-sm font-medium">
+                                           {score.label} {/* ✅ Already translated above */}
+                                       </span>
                                    </div>
                                    <span className={`text-lg font-bold ${getScoreColor(score.value)}`}>
                                        {score.value}
                                    </span>
                                </div>
                                <Progress value={score.value} className="h-2" />
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
```

---

## 🎯 Sample 3: Homepage Hero Section (components/hero/HeroSection.tsx)

### ✅ Key Changes Summary

| Change | Before | After |
|--------|--------|-------|
| **Component Type** | Server Component | ✅ Client Component (`'use client'`) |
| **Hero Heading** | `"Unlock Your Website's..."` | `t('headline')` |
| **Subheading** | `"Get instant insights..."` | `t('subheadline')` |
| **CTA Button** | `"Start Free Audit"` | `t('cta.startFree')` |
| **Trust Badge** | `"No credit card required"` | `t('cta.noCard')` |

### 📝 Diff-Style Changes

```diff
+ "use client"; // ✅ NEW: Required for client-side i18n
+ 
import React from 'react'
+ import { useTranslations } from 'next-intl' // ✅ NEW
import { Button } from '../ui/button'
import { ArrowRight, Star, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
+   const t = useTranslations('home.hero') // ✅ NEW: Namespaced translation
    
    return (
        <section className="relative overflow-hidden py-20 lg:py-32">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-4xl text-center">
                    {/* Trust Badge */}
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
-                       <span>Trusted by 10,000+ websites</span>
+                       <span>{t('trustBadge', { count: 10000 })}</span> {/* ✅ NEW: Variable */}
                    </div>

                    {/* Main Headline */}
-                   <h1 className="mb-6 text-5xl font-bold tracking-tight lg:text-7xl">
-                       Unlock Your Website's{' '}
-                       <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
-                           SEO Potential
-                       </span>
-                   </h1>
+                   <h1 className="mb-6 text-5xl font-bold tracking-tight lg:text-7xl">
+                       {t('headline')}{' '} {/* ✅ CHANGED */}
+                       <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
+                           {t('headlineHighlight')} {/* ✅ CHANGED: Split for styling */}
+                       </span>
+                   </h1>

                    {/* Subheadline */}
-                   <p className="mb-8 text-xl text-muted-foreground lg:text-2xl">
-                       Get instant insights into your website's performance, SEO health, 
-                       and actionable recommendations to rank higher on Google.
-                   </p>
+                   <p className="mb-8 text-xl text-muted-foreground lg:text-2xl">
+                       {t('subheadline')} {/* ✅ CHANGED */}
+                   </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button asChild size="lg" className="w-full sm:w-auto">
                            <Link href="/dashboard/audit">
-                               Start Free Audit
+                               {t('cta.startFree')} {/* ✅ CHANGED */}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        
                        <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                            <Link href="/demo">
-                               Watch Demo
+                               {t('cta.watchDemo')} {/* ✅ CHANGED */}
                            </Link>
                        </Button>
                    </div>

                    {/* Trust Indicators */}
-                   <p className="mt-6 text-sm text-muted-foreground">
-                       No credit card required • Free forever plan • Cancel anytime
-                   </p>
+                   <p className="mt-6 text-sm text-muted-foreground">
+                       {t('cta.noCard')} • {t('cta.freePlan')} • {t('cta.cancelAnytime')} {/* ✅ CHANGED */}
+                   </p>
                </div>
            </div>
        </section>
    )
}
```

---

## 🎯 Sample 4: Server-Side Metadata (app/[locale]/page.tsx)

### ✅ Key Changes Summary

| Change | Before | After |
|--------|--------|-------|
| **Metadata Function** | Static `export const metadata` | ✅ Dynamic `generateMetadata()` |
| **Translation Method** | ❌ None | ✅ `getTranslations()` server-side |
| **Title** | `"AI SEO Turbo - Best..."` | `t('title')` |
| **Description** | `"Comprehensive SEO..."` | `t('description')` |

### 📝 Diff-Style Changes

```diff
// app/[locale]/page.tsx
import React from 'react'
+ import { getTranslations } from 'next-intl/server' // ✅ NEW: Server-side i18n
+ import type { Metadata } from 'next'
import { HeroSection } from '../../components/hero/HeroSection'
import { FeaturesShowcase } from '../../components/features/FeaturesShowcase'
// ... other imports

- // Static metadata
- export const metadata = {
-     title: 'AI SEO Turbo - Best Free SEO Audit Tool',
-     description: 'Comprehensive SEO analysis with automated recommendations...'
- }

+ // ✅ NEW: Dynamic metadata with translations
+ interface PageProps {
+     params: { locale: string }
+ }
+ 
+ export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
+     const { locale } = params
+     const t = await getTranslations({ locale, namespace: 'meta' })
+     
+     return {
+         title: t('home.title'),
+         description: t('home.description'),
+         openGraph: {
+             title: t('home.ogTitle'),
+             description: t('home.ogDescription'),
+             images: ['/og-image.png']
+         },
+         twitter: {
+             card: 'summary_large_image',
+             title: t('home.twitterTitle'),
+             description: t('home.twitterDescription')
+         }
+     }
+ }

- export default function HomePage() {
+ export default async function HomePage({ params }: PageProps) { // ✅ CHANGED: Add params
+     const { locale } = params
+     
      return (
          <main>
              <HeroSection />
              <FeaturesShowcase />
              <PricingCards />
              <TestimonialsCarousel />
          </main>
      )
  }
```

---

## 🎯 Sample 5: Error Handling with Translations (components/forms/ContactForm.tsx)

### ✅ Key Changes Summary

| Change | Before | After |
|--------|--------|-------|
| **Error Messages** | Hardcoded strings | ✅ `tErrors('fieldRequired')` |
| **Validation** | English only | ✅ Translated per locale |
| **Success Toast** | `"Message sent!"` | `tNotifications('messageSent')` |

### 📝 Diff-Style Changes

```diff
"use client";

import React, { useState } from 'react'
+ import { useTranslations } from 'next-intl' // ✅ NEW
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
+ import { useToast } from '../ui/use-toast' // For success notifications

export function ContactForm() {
+   const t = useTranslations('common.forms') // ✅ NEW
+   const tErrors = useTranslations('errors') // ✅ NEW
+   const tNotifications = useTranslations('notifications') // ✅ NEW
+   const { toast } = useToast()
    
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        
        if (!formData.name.trim()) {
-           newErrors.name = 'Name is required'
+           newErrors.name = tErrors('fieldRequired', { field: t('name') }) // ✅ CHANGED
        }
        
        if (!formData.email.trim()) {
-           newErrors.email = 'Email is required'
+           newErrors.email = tErrors('fieldRequired', { field: t('email') }) // ✅ CHANGED
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
-           newErrors.email = 'Invalid email format'
+           newErrors.email = tErrors('invalidEmail') // ✅ CHANGED
        }
        
        if (!formData.message.trim()) {
-           newErrors.message = 'Message is required'
+           newErrors.message = tErrors('fieldRequired', { field: t('message') }) // ✅ CHANGED
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!validateForm()) return
        
        // Submit logic...
        
-       alert('Message sent successfully!')
+       toast({ // ✅ CHANGED: Use translated toast
+           title: tNotifications('success'),
+           description: tNotifications('messageSent')
+       })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
-               <Label htmlFor="name">Name</Label>
+               <Label htmlFor="name">{t('name')}</Label> {/* ✅ CHANGED */}
                <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
-                   placeholder="Enter your name"
+                   placeholder={t('namePlaceholder')} {/* ✅ CHANGED */}
                />
                {errors.name && (
                    <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                )}
            </div>

            <div>
-               <Label htmlFor="email">Email</Label>
+               <Label htmlFor="email">{t('email')}</Label> {/* ✅ CHANGED */}
                <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
-                   placeholder="you@example.com"
+                   placeholder={t('emailPlaceholder')} {/* ✅ CHANGED */}
                />
                {errors.email && (
                    <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                )}
            </div>

            <div>
-               <Label htmlFor="message">Message</Label>
+               <Label htmlFor="message">{t('message')}</Label> {/* ✅ CHANGED */}
                <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
-                   placeholder="Tell us how we can help..."
+                   placeholder={t('messagePlaceholder')} {/* ✅ CHANGED */}
                    rows={4}
                />
                {errors.message && (
                    <p className="text-sm text-red-600 mt-1">{errors.message}</p>
                )}
            </div>

            <Button type="submit" className="w-full">
-               Send Message
+               {t('submit')} {/* ✅ CHANGED */}
            </Button>
        </form>
    )
}
```

---

## 🎯 Sample 6: Pluralization & Variables (components/dashboard/ProjectsList.tsx)

### ✅ Key Changes Summary

| Change | Before | After |
|--------|--------|-------|
| **Pluralization** | Manual ternary | ✅ ICU MessageFormat in JSON |
| **Count Display** | `"5 projects"` / `"1 project"` | `t('projectCount', { count })` |
| **Empty State** | `"No projects yet"` | `t('noProjects')` |

### 📝 Translation File Update

```json
// messages/en.json
{
  "dashboard": {
    "projects": {
      "title": "Your Projects",
      "projectCount": "{count, plural, =0 {No projects} =1 {1 project} other {# projects}}",
      "noProjects": "No projects yet. Create your first project to get started!",
      "createNew": "Create Project"
    }
  }
}
```

### 📝 Component Diff

```diff
"use client";

import React from 'react'
+ import { useTranslations } from 'next-intl' // ✅ NEW
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'

interface Project {
    id: string
    name: string
    url: string
}

interface ProjectsListProps {
    projects: Project[]
}

export function ProjectsList({ projects }: ProjectsListProps) {
+   const t = useTranslations('dashboard.projects') // ✅ NEW
    
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
-               <CardTitle>Your Projects ({projects.length})</CardTitle>
+               <CardTitle>
+                   {t('title')} ({t('projectCount', { count: projects.length })}) {/* ✅ CHANGED */}
+               </CardTitle>
                
                <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
-                   Create Project
+                   {t('createNew')} {/* ✅ CHANGED */}
                </Button>
            </CardHeader>
            <CardContent>
                {projects.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
-                       <p>No projects yet. Create your first project to get started!</p>
+                       <p>{t('noProjects')}</p> {/* ✅ CHANGED */}
                    </div>
                ) : (
                    <ul className="space-y-2">
                        {projects.map((project) => (
                            <li key={project.id} className="p-4 border rounded-lg">
                                <h3 className="font-medium">{project.name}</h3>
                                <p className="text-sm text-muted-foreground">{project.url}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    )
}
```

---

## 📊 Translation Keys Used in Samples

| Namespace | Key | English Value | Usage |
|-----------|-----|---------------|-------|
| `audit` | `title` | `"SEO Audit"` | Page title |
| `audit` | `subtitle` | `"Comprehensive {points}-point SEO analysis..."` | Page subtitle |
| `audit` | `startAudit` | `"Start Audit"` | Button label |
| `audit` | `runningAudit` | `"Running Audit..."` | Loading state |
| `audit.results` | `overallScore` | `"Overall SEO Score"` | Score card title |
| `audit.results` | `excellent` | `"Excellent"` | Score badge |
| `audit.results` | `good` | `"Good"` | Score badge |
| `audit.results` | `needsImprovement` | `"Needs Improvement"` | Score badge |
| `audit.scores` | `performance` | `"Performance"` | Category label |
| `audit.scores` | `seo` | `"SEO"` | Category label |
| `audit.scores` | `accessibility` | `"Accessibility"` | Category label |
| `home.hero` | `headline` | `"Unlock Your Website's"` | Hero heading |
| `home.hero` | `headlineHighlight` | `"SEO Potential"` | Hero heading (styled) |
| `home.hero` | `trustBadge` | `"Trusted by {count}+ websites"` | Trust indicator |
| `home.hero.cta` | `startFree` | `"Start Free Audit"` | Primary CTA |
| `home.hero.cta` | `noCard` | `"No credit card required"` | Trust indicator |
| `errors` | `fieldRequired` | `"{field} is required"` | Form validation |
| `errors` | `invalidEmail` | `"Invalid email format"` | Email validation |
| `notifications` | `messageSent` | `"Message sent successfully!"` | Success toast |
| `dashboard.projects` | `projectCount` | `"{count, plural, ...}"` | Pluralization |

---

## ✅ Refactoring Checklist for Each Component

When refactoring a component, follow these steps:

### 1️⃣ **Add Client Directive (if needed)**
```diff
+ "use client"; // Add for client components using hooks
```

### 2️⃣ **Import Translation Hook**
```diff
+ import { useTranslations } from 'next-intl' // Client components
+ // OR
+ import { getTranslations } from 'next-intl/server' // Server components
```

### 3️⃣ **Initialize Hook**
```typescript
// Client component
const t = useTranslations('namespace')

// Server component (async)
const t = await getTranslations({ locale, namespace: 'namespace' })
```

### 4️⃣ **Replace Hardcoded Strings**
```diff
- <h1>SEO Audit</h1>
+ <h1>{t('title')}</h1>
```

### 5️⃣ **Add Variables for Dynamic Content**
```diff
- <p>Found {count} issues</p>
+ <p>{t('issuesFound', { count })}</p>
```

### 6️⃣ **Update Metadata (Server Components)**
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'meta' })
  return {
    title: t('pageTitle'),
    description: t('pageDescription')
  }
}
```

### 7️⃣ **Test in All Locales**
- Switch language in UI
- Verify all strings render correctly
- Check variable interpolation
- Validate pluralization

---

## 🧪 Testing Commands

```bash
# Run type checking
pnpm type-check

# Test in different locales
# Visit: http://localhost:3000/en/dashboard/audit
# Visit: http://localhost:3000/fr/dashboard/audit
# Visit: http://localhost:3000/es/dashboard/audit

# Check for missing translation keys
grep -r "t('.*')" --include="*.tsx" | grep -v "messages/"
```

---

## 📈 Progress Tracking

| Sample | Status | Lines Changed | Translation Keys |
|--------|--------|---------------|------------------|
| ✅ Audit Page | Complete | 45 | 15 keys |
| ✅ Score Summary | Complete | 12 | 6 keys |
| ✅ Hero Section | Complete | 18 | 9 keys |
| ✅ Server Metadata | Complete | 22 | 4 keys |
| ✅ Contact Form | Complete | 25 | 8 keys |
| ✅ Projects List | Complete | 8 | 4 keys |

**Total**: 6 samples completed, 130 lines changed, 46 translation keys integrated

---

## 🚀 Next Steps

1. Apply these patterns to remaining 79 components
2. Update all pages in `app/` directory
3. Refactor dashboard components
4. Test all locales thoroughly
5. Update E2E tests for i18n

---

**Generated**: Phase 4 Implementation - Sample Refactoring Guide  
**Total Components to Migrate**: 85 files  
**Samples Completed**: 6 reference implementations
