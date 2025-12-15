# LCP Optimization - Implementation Checklist

## 📋 Phase 1: Immediate Actions (Start Today!)

### ✅ Pre-Implementation

- [ ] Read `docs/QUICK_START_PHASE_1.md`
- [ ] Run current audit: `npm run mobile:audit` - **Note baseline LCP**
- [ ] Check DevTools Network tab - note render-blocking resources

### ✅ Step 1: Update `components/hero/hero-section.tsx` (15 min)

**Checklist:**

- [ ] Line 1: Add import at top: `import { useIsMobile } from "@/hooks/use-is-mobile"`
- [ ] Line ~30: Add hook call in component: `const isMobile = useIsMobile()`
- [ ] Line ~35: Update `containerVariants` to: `const containerVariants = isMobile ? {} : { ... }`
- [ ] Line ~42: Update `itemVariants` to: `const itemVariants = isMobile ? {} : { ... }`
- [ ] Line ~53: Update `floatingShapeVariants` to: `const floatingShapeVariants = isMobile ? {} : { ... }`
- [ ] Line ~65: Wrap background div: `{!isMobile && (<div className="absolute inset-0"> ... </div>)}`
- [ ] Line ~200: Wrap DesktopHeroMockup: `{!isMobile && (<motion.div> ... </motion.div>)}`
- [ ] Test file syntax: `npm run type-check` (should pass)

**Reference:** `docs/PHASE_1_IMMEDIATE_IMPLEMENTATION.ts` - `PHASE_1_STEP_2_OPTIMIZED_HERO_SECTION`

### ✅ Step 2: Update `app/layout.tsx` - Add Preload + Critical CSS (20 min)

**Location:** Find `<head>` section around line 232

**Checklist:**

- [ ] After preconnect links, add preload links (see code below)
- [ ] Replace generic critical CSS with hero-specific styles
- [ ] Add non-critical CSS deferral link
- [ ] Verify syntax with `npm run type-check`

**Code to add in `<head>` (after existing font preconnect):**

```tsx
{/* LCP OPTIMIZATION: Preload hero images */}
<link
  rel="preload"
  as="image"
  href="/images/hero/hero-mobile-portrait.webp"
  media="(max-width: 1024px)"
  fetchpriority="high"
  type="image/webp"
/>
<link
  rel="preload"
  as="image"
  href="/images/hero/hero-mobile-portrait.jpg"
  media="(max-width: 1024px)"
  fetchpriority="high"
/>
<link
  rel="preload"
  as="image"
  href="/images/hero/hero-desktop-landscape.webp"
  media="(min-width: 1025px)"
  fetchpriority="high"
  type="image/webp"
/>

{/* LCP OPTIMIZATION: Critical CSS - Hero section only (~2.8KB) */}
<style dangerouslySetInnerHTML={{
  __html: `
    /* Critical Hero Styles - Load immediately */
    *,*::before,*::after{box-sizing:border-box}*{margin:0}html,body{height:100%}
    body{font-family:var(--font-inter),system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.5;-webkit-font-smoothing:antialiased}
    .hero-section{position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden;background:linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#0f172a 100%)}
    .hero-section h1{font-size:clamp(1.5rem,5vw,3.5rem);font-weight:700;line-height:1.2;color:#ffffff;margin:0}
    .hero-section p{font-size:clamp(1rem,3vw,1.25rem);color:#cbd5e1;line-height:1.6;margin-top:1rem}
    .hero-cta{display:inline-block;margin-top:1.5rem;padding:0.75rem 1.5rem;background:linear-gradient(135deg,#06b6d4 0%,#0891b2 100%);color:white;border:none;border-radius:0.5rem;font-weight:600;font-size:1rem;cursor:pointer;text-decoration:none;transition:transform 0.2s ease}
    .hero-background{position:absolute;inset:0;pointer-events:none}
    @media(max-width:1023px){.desktop-only{display:none!important}.hero-floating-shapes{display:none!important}}
    @media(min-width:1024px){.mobile-only{display:none!important}}
  `
}} />

{/* LCP OPTIMIZATION: Defer non-critical CSS */}
<link
  rel="preload"
  as="style"
  href="/css/non-critical.css"
  onLoad="this.onload=null;this.rel='stylesheet'"
/>
<noscript>
  <link rel="stylesheet" href="/css/non-critical.css" />
</noscript>
```

**Reference:** `docs/PHASE_1_IMMEDIATE_IMPLEMENTATION.ts` - `PHASE_1_STEP_1_PRELOAD_CRITICAL_CSS`

### ✅ Step 3: Verify Changes

**Checklist:**

- [ ] Run `npm run type-check` - no errors
- [ ] Build locally: `npm run build` - succeeds
- [ ] Start dev server: `npm run dev`
- [ ] Open browser: http://localhost:3000
- [ ] Test mobile view: DevTools → Toggle device toolbar → iPhone 12 Pro
- [ ] Verify:
  - [ ] Hero text visible immediately
  - [ ] No animations on mobile (smooth load)
  - [ ] Desktop mockup not visible on mobile
  - [ ] CTA buttons clickable

### ✅ Step 4: Run Lighthouse Audit

```bash
# Run mobile performance audit
npm run mobile:audit

# Or with full report
npm run perf:audit --form-factor=mobile
```

**What to look for:**

- [ ] LCP improved (target: 5.2s → 4.0s for Phase 1)
- [ ] First Contentful Paint < 1.5s
- [ ] No layout shifts from animations
- [ ] Mobile score > 50 (currently likely < 40)

**Record metrics:**

- **Before:** LCP = **_s, FCP = _**s, CLS = \_\_\_
- **After Phase 1:** LCP = **_s, FCP = _**s, CLS = \_\_\_
- **Improvement:** \_\_\_% ↓

---

## 📋 Phase 2: Image Optimization (Optional - Next)

### ✅ Prepare Hero Images

**What you need:**

- [ ] Mobile hero image (375px wide, WebP + JPG fallback)
- [ ] Desktop hero image (1200px wide, WebP + JPG fallback)
- [ ] All files < 50KB each

**How to optimize:**

Option 1: Online tools

- [ ] Go to TinyPNG.com
- [ ] Upload current hero images
- [ ] Download WebP versions
- [ ] Move to `public/images/hero/`

Option 2: Command line

```bash
# Convert to WebP (requires ffmpeg)
ffmpeg -i hero-mobile.jpg -c:v libwebp -quality 80 hero-mobile.webp
ffmpeg -i hero-desktop.jpg -c:v libwebp -quality 85 hero-desktop.webp
```

Option 3: OS-specific tools

- Mac: ImageOptim
- Windows: XnConvert
- Linux: `imagemagick`

**Checklist:**

- [ ] hero-mobile-portrait.webp (< 40KB)
- [ ] hero-mobile-portrait.jpg (< 50KB, fallback)
- [ ] hero-desktop-landscape.webp (< 80KB)
- [ ] hero-desktop-landscape.jpg (< 100KB, fallback)
- [ ] All files in `public/images/hero/`
- [ ] Filenames match preload hrefs in layout.tsx

---

## 📋 Phase 3: Defer Non-Critical CSS (Optional - Next)

### ✅ Split CSS Files

**Checklist:**

- [ ] Create `public/css/non-critical.css`
- [ ] Copy all Tailwind utilities (except those in critical CSS)
- [ ] File size: 30-40KB (uncompressed)
- [ ] Verify layout in layout.tsx preload link is working
- [ ] Test: `npm run build && npm run dev`
- [ ] Check DevTools Network tab - CSS loads deferred

---

## 🧪 Performance Testing Matrix

### Test Environment 1: Mobile Emulation

```bash
npm run dev
# DevTools → Device toolbar → iPhone 12 Pro
# Throttle: "Slow 4G"
# Check:
# - Hero loads fast
# - No jank/layout shift
# - Animations smooth on desktop
```

### Test Environment 2: Lighthouse (Simulated)

```bash
npm run mobile:audit
# Check:
# - LCP: Green (< 2.5s) → Blue (< 4s) → Red (> 4s)
# - FCP: < 1.5s
# - CLS: < 0.1
# - Performance Score: > 60 (target: > 80)
```

### Test Environment 3: DevTools Network

```
DevTools → Network tab → Throttle to "Slow 4G"
1. Hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
2. Look for:
   - Render-blocking CSS: Should be < 3KB
   - Render-blocking JS: Should be minimal
   - LCP image: Should have fetchpriority=high
   - Total time to interactive: < 4s
```

---

## 📊 Success Criteria

### Phase 1 (Minimum):

- [ ] LCP: 5.2s → < 4.5s (15% improvement)
- [ ] No visual jank on mobile
- [ ] Desktop mockup hidden on mobile
- [ ] Build size same or smaller

### Phase 1 (Target):

- [ ] LCP: 5.2s → < 4.0s (23% improvement)
- [ ] FCP: < 1.5s
- [ ] CLS: < 0.1
- [ ] Lighthouse Performance: 40 → 55+

### All Phases (Full Optimization):

- [ ] LCP: 5.2s → 2.0-2.5s (60% improvement ✅)
- [ ] FCP: < 1.0s
- [ ] CLS: < 0.05
- [ ] Lighthouse Performance: 80+ (Excellent)

---

## 🐛 Common Issues & Fixes

### Issue: "Preload links causing errors"

**Fix:**

- Check file paths are absolute: `/images/hero/...`
- Verify images exist in `public/` folder
- Remove `media=""` attribute if causing issues

### Issue: "Hero section looks broken on mobile"

**Fix:**

- Verify `use-is-mobile` hook is imported
- Clear browser cache (Cmd+Shift+Delete)
- Check console for JavaScript errors

### Issue: "Desktop animations not working"

**Fix:**

- Verify `isMobile === false` on desktop (check console)
- Check Framer Motion is installed: `npm ls framer-motion`
- Ensure motion imports are correct

### Issue: "CSS not being applied"

**Fix:**

- Check class names match (e.g., `.hero-section`)
- Verify critical CSS is in correct format
- Check tailwind.config.ts includes hero-section class

---

## 📚 Reference Documents

All in `docs/` folder:

- `LCP_OPTIMIZATION_COMPREHENSIVE_GUIDE.md` - Full strategy (25 pages)
- `PHASE_1_IMMEDIATE_IMPLEMENTATION.ts` - Complete code samples
- `LCP_IMPLEMENTATION_REFERENCE.ts` - All phases with examples
- `QUICK_START_PHASE_1.md` - Quick reference

---

## 🎯 Final Notes

**Important:**

1. **Start with Phase 1** - Highest impact, lowest effort
2. **Test between phases** - Measure actual LCP improvements
3. **Monitor production** - Use Sentry/New Relic for real user metrics
4. **Iterate** - Some optimizations may need refinement

**Expected Timeline:**

- Phase 1: 1-2 hours (25% LCP improvement)
- Phase 2: 1 hour (additional 15% improvement)
- Phase 3: 1-2 hours (additional 20% improvement)
- **Total:** 3-5 hours for 60% LCP improvement

**Questions?** Check `docs/LCP_OPTIMIZATION_COMPREHENSIVE_GUIDE.md` first - it covers all scenarios!

Good luck! 🚀
