# Homepage Acceptance Criteria & Testing Guide

## 🎯 Global Acceptance Criteria

### Performance Requirements

- **Lighthouse Mobile (Slow 4G)**:
  - LCP (Largest Contentful Paint) < 3.0s
  - CLS (Cumulative Layout Shift) < 0.03
  - Performance Score ≥ 90
  - Accessibility Score ≥ 95
  - Best Practices Score ≥ 95
  - SEO Score ≥ 95

### Accessibility Requirements

- **Axe DevTools**: No Critical/Serious accessibility issues
- **Keyboard Navigation**: All interactive elements reachable with visible focus states
- **No Focus Traps**: Users can navigate away from all components
- **Screen Reader**: All content and interactions properly announced

### Responsiveness Requirements

- **Breakpoints**: 320px, 375px, 768px, 1024px, 1280px, 1440px
- **Layout Integrity**: Hierarchy and spacing maintained across all breakpoints
- **No Horizontal Scroll**: Content fits viewport at all breakpoints
- **Touch Targets**: Minimum 44px tap targets on mobile

### Image Optimization Requirements

- **No Layout Shifts**: All images declare width/height or aspect-ratio
- **Next.js Image**: Optimized with proper `sizes` attribute
- **Format**: WebP with fallbacks where needed

---

## 📝 Section-Specific Acceptance Criteria

### 🚀 Hero Section

**Performance Requirements:**

- ✅ Above-the-fold renders within 2.0s TTI on mid-tier device
- ✅ No blocking font loads (font-display: swap)
- ✅ CTAs visible without scroll on iPhone 12 Pro (390×844)

**Desktop Specific:**

- ✅ Parallax/floating elements don't trigger reflow or jank
- ✅ Hover states consistent across all interactive elements
- ✅ A/B test variants render consistently

**Animation & Accessibility:**

- ✅ KPI counters animate once per session
- ✅ Animations respect prefers-reduced-motion
- ✅ Counter animations announced to screen readers

**A/B Testing:**

- ✅ Stable user bucketing (same variant on refresh)
- ✅ Analytics exposure tracking fires correctly
- ✅ Data attributes present for testing tools

### ✨ Features Section

**Layout Requirements:**

- ✅ 8 feature cards render with consistent vertical rhythm
- ✅ Icons load without layout shift
- ✅ Responsive grid maintains hierarchy at all breakpoints

**Interactivity:**

- ✅ "Learn more" expanders accessible (aria-expanded)
- ✅ Focus management in expanded content
- ✅ Keyboard navigation between cards

### 🎮 Demo Preview Section

**Functionality:**

- ✅ Demo flow runs client-only (no backend calls)
- ✅ Progress updates announced with aria-live
- ✅ "Try your URL" CTA triggers modal/flow stub

**Accessibility:**

- ✅ Demo controls keyboard accessible
- ✅ Screen reader announces state changes
- ✅ Error states properly announced

### 💬 Testimonials Section

**Carousel Functionality:**

- ✅ Swipe gestures work on mobile
- ✅ Hover arrows appear on desktop
- ✅ Tab/Shift-Tab navigation works
- ✅ Roving tabindex if multiple focusable elements

**Performance:**

- ✅ No CLS when slides change
- ✅ Heights stabilized via aspect-ratio or min-height
- ✅ Smooth transitions without jank

### 💰 Pricing Section

**State Management:**

- ✅ Monthly/annual toggle persists user choice
- ✅ Price amounts update without layout shift
- ✅ A/B test pricing variants work correctly

**ROI Calculator:**

- ✅ Input validation with helpful error messages
- ✅ Formatted outputs with accessible labels
- ✅ Real-time calculation updates
- ✅ Keyboard accessible controls

### 📧 Lead Capture

**Form Validation:**

- ✅ Email validation with clear error messages
- ✅ Success state with proper focus management
- ✅ Form submission tracking works

**Exit Intent:**

- ✅ Triggers on desktop mouse exit
- ✅ Triggers on mobile scroll depth threshold
- ✅ Can be dismissed with keyboard
- ✅ Focus returns to prior element on close

---

## 🧪 Manual Testing Checklist

### Device Testing Matrix

- [ ] **Mobile**: iPhone 12 Pro (390×844), Pixel 5 (393×851)
- [ ] **Tablet**: iPad (768×1024), iPad Pro (1024×1366)
- [ ] **Desktop**: 1280×720, 1440×900, 1920×1080

### Accessibility Testing

- [ ] **Screen Reader**: NVDA/JAWS (Windows), VoiceOver (Mac)
- [ ] **Keyboard Only**: Complete navigation without mouse
- [ ] **High Contrast**: Windows High Contrast mode
- [ ] **Zoom**: 200% browser zoom, no horizontal scroll

### Performance Testing

- [ ] **Lighthouse**: Run on mobile with Slow 4G throttling
- [ ] **Network**: Test on Fast 3G, Slow 4G, WiFi
- [ ] **Device**: Test on low-end Android device

### Cross-Browser Testing

- [ ] **Chrome**: Latest stable
- [ ] **Firefox**: Latest stable
- [ ] **Safari**: Latest stable (Mac/iOS)
- [ ] **Edge**: Latest stable

---

## 🎯 Pass/Fail Criteria Summary

### ✅ PASS Criteria

- All Lighthouse scores meet thresholds
- Zero critical accessibility issues
- All interactive elements keyboard accessible
- No layout shifts during interactions
- A/B tests render consistently
- Analytics events fire correctly
- Forms validate and submit properly

### ❌ FAIL Criteria

- Any Lighthouse score below threshold
- Critical/Serious accessibility issues
- Focus traps or unreachable elements
- Layout shifts > 0.03 CLS
- A/B test bucketing inconsistent
- Missing analytics events
- Form errors unclear or inaccessible

---

## 📊 Testing Tools & Commands

### Lighthouse Testing

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run mobile audit
lighthouse http://localhost:3000 --preset=perf --form-factor=mobile --throttling-method=devtools --throttling.cpuSlowdownMultiplier=4 --throttling.rttMs=150 --throttling.throughputKbps=1638.4

# Run desktop audit
lighthouse http://localhost:3000 --preset=perf --form-factor=desktop
```

### Accessibility Testing

```bash
# Install axe-core CLI
npm install -g @axe-core/cli

# Run accessibility audit
axe http://localhost:3000
```

### Performance Monitoring

```bash
# Check Core Web Vitals
npx web-vitals-extension

# Bundle analysis
npm run build
npx @next/bundle-analyzer
```
