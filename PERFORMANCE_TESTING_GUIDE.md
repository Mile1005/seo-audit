# 🧪 Performance Testing & Metrics Guide

## 📊 Where to See Performance Metrics

### 1. **Browser DevTools (Primary Method)**

#### Chrome DevTools:
1. **Open DevTools**: `F12` or `Ctrl+Shift+I`
2. **Performance Tab**:
   - Click "Performance" tab
   - Click record button (circle)
   - Refresh page or interact
   - Stop recording to see metrics

3. **Lighthouse Tab**:
   - Click "Lighthouse" tab
   - Select "Performance" checkbox
   - Click "Generate report"
   - View Core Web Vitals scores

4. **Console Tab**:
   - Our performance monitor logs metrics here
   - Look for "Core Web Vitals" logs
   - Real-time performance data displayed

#### Firefox DevTools:
1. **Open DevTools**: `F12`
2. **Performance Tab**: Similar to Chrome
3. **Network Tab**: Check caching effectiveness

### 2. **Real User Monitoring (RUM)**

#### In Your App Console:
```javascript
// Our Core Web Vitals optimizer logs to console
// Look for these messages:
- "🎯 LCP optimized: [time]ms"
- "⚡ INP tracked: [time]ms" 
- "📐 CLS prevented: [score]"
- "🚀 Performance hint applied"
```

#### Browser Console Commands:
```javascript
// Check if service worker is active
navigator.serviceWorker.controller

// Check cache status
caches.keys().then(console.log)

// Manual Core Web Vitals check
performance.getEntriesByType('navigation')
performance.getEntriesByType('measure')
```

### 3. **Online Testing Tools**

#### PageSpeed Insights:
- URL: https://pagespeed.web.dev/
- Enter your site URL
- View Core Web Vitals scores
- Get performance recommendations

#### GTmetrix:
- URL: https://gtmetrix.com/
- Detailed performance breakdown
- Core Web Vitals analysis
- Historical tracking

#### WebPageTest:
- URL: https://www.webpagetest.org/
- Advanced performance testing
- Multiple location testing
- Film strip view

## 🧪 How to Test Performance Features

### 1. **Service Worker Testing**

```bash
# Start development server
pnpm dev

# Open browser to http://localhost:3000
# Check DevTools > Application > Service Workers
# Should show "sw.js" as activated
```

**What to verify:**
- Service worker registration successful
- Cache entries created under "Storage > Cache Storage"
- Network tab shows "(from ServiceWorker)" for cached resources

### 2. **Image Optimization Testing**

```bash
# Test responsive images
# Open any page with images
# Check Network tab for:
# - AVIF format served (if supported)
# - WebP format fallback
# - Proper lazy loading
```

**What to verify:**
- Images load in optimal format
- Lazy loading works (check Network tab)
- Proper aspect ratios maintained
- Blur placeholder appears

### 3. **Core Web Vitals Testing**

#### Automated Testing:
```bash
# Run this in your browser console on any page
(async () => {
  const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
  getCLS(console.log);
  getFID(console.log);
  getFCP(console.log);
  getLCP(console.log);
  getTTFB(console.log);
})();
```

#### Manual Testing Steps:
1. **LCP (Largest Contentful Paint)**:
   - Refresh page
   - Note when largest element appears
   - Should be < 2.5 seconds

2. **INP (Interaction to Next Paint)**:
   - Click buttons, links
   - Note response time
   - Should be < 200ms

3. **CLS (Cumulative Layout Shift)**:
   - Watch for layout jumps during loading
   - Should be < 0.1

### 4. **Caching Effectiveness Testing**

#### Test Cache Performance:
```bash
# 1. First visit (cold cache)
# Open DevTools > Network
# Refresh page - note loading times

# 2. Second visit (warm cache)
# Refresh again - should be much faster
# Look for "(from cache)" in Network tab
```

#### Cache Verification:
```bash
# In browser console:
caches.open('static-v1').then(cache => cache.keys()).then(console.log)
caches.open('api-v1').then(cache => cache.keys()).then(console.log)
caches.open('images-v1').then(cache => cache.keys()).then(console.log)
```

## 📈 Performance Monitoring Dashboard

### Real-Time Metrics (Development):
```javascript
// Add this to browser console for real-time monitoring:
setInterval(() => {
  console.log('Performance Check:', {
    navigation: performance.getEntriesByType('navigation')[0],
    memory: performance.memory,
    timing: performance.timing
  });
}, 5000);
```

### Production Analytics:
Our performance optimizer automatically sends metrics to:
- Browser console (development)
- Your analytics platform (production)
- Core Web Vitals API (if configured)

## 🎯 Expected Performance Targets

### Core Web Vitals Goals:
- **LCP**: < 2.5s (Good), < 4.0s (Needs Improvement)
- **INP**: < 200ms (Good), < 500ms (Needs Improvement)  
- **CLS**: < 0.1 (Good), < 0.25 (Needs Improvement)

### Additional Metrics:
- **FCP**: < 1.8s (First Contentful Paint)
- **TTFB**: < 600ms (Time to First Byte)
- **Performance Score**: 90+ (Lighthouse)

## 🚀 Quick Performance Test

Run this complete test sequence:

```bash
# 1. Start development server
pnpm dev

# 2. Open http://localhost:3000 in Chrome
# 3. Open DevTools (F12)
# 4. Go to Lighthouse tab
# 5. Click "Generate report" with Performance selected
# 6. Check scores and recommendations

# 7. Test caching:
# - Refresh page
# - Check Network tab for cache hits
# - Look for ServiceWorker entries

# 8. Test responsiveness:
# - Resize browser window
# - Check image loading at different sizes
# - Verify lazy loading works
```

## 🔧 Troubleshooting

### If Service Worker Not Working:
1. Check browser console for errors
2. Verify `sw.js` is accessible at `/sw.js`
3. Check HTTPS (required for SW in production)

### If Performance Poor:
1. Check Network tab for large resources
2. Verify image optimization is working
3. Check for JavaScript errors blocking rendering
4. Use Performance tab to identify bottlenecks

### If Metrics Not Showing:
1. Ensure `web-vitals` package is installed
2. Check browser console for Core Web Vitals logs
3. Verify performance monitoring is enabled
4. Test in production environment

## 📝 Testing Checklist

- [ ] Service worker registers successfully
- [ ] Cache entries are created
- [ ] Images load in optimal format (AVIF/WebP)
- [ ] Lazy loading works properly
- [ ] Core Web Vitals scores are good
- [ ] Performance monitoring logs appear
- [ ] Cache improves repeat visit speed
- [ ] Resource preloading works
- [ ] No console errors
- [ ] Lighthouse score > 90

Your performance optimization system is now fully testable and monitorable! 🎉
