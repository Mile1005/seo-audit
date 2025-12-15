// Performance Test Script
// Copy and paste this into your browser console on any page

console.log("🚀 Starting Performance Test...");

// Test 1: Check Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistration().then((registration) => {
    if (registration) {
      console.log("✅ Service Worker: Registered and active");
      console.log("   Scope:", registration.scope);
      console.log("   State:", registration.active?.state);
    } else {
      console.log("❌ Service Worker: Not registered");
    }
  });
} else {
  console.log("❌ Service Worker: Not supported");
}

// Test 2: Check Cache Storage
caches.keys().then((cacheNames) => {
  console.log("📦 Cache Storage:");
  if (cacheNames.length > 0) {
    console.log("✅ Active caches:", cacheNames);
    cacheNames.forEach((cacheName) => {
      caches.open(cacheName).then((cache) => {
        cache.keys().then((requests) => {
          console.log(`   ${cacheName}: ${requests.length} entries`);
        });
      });
    });
  } else {
    console.log("❌ No caches found");
  }
});

// Test 3: Core Web Vitals (requires web-vitals package)
const testCoreWebVitals = async () => {
  try {
    console.log("📊 Testing Core Web Vitals...");

    // Check if web-vitals is available
    if (typeof window !== "undefined") {
      // Manual checks using Performance API
      const navigation = performance.getEntriesByType("navigation")[0];
      if (navigation) {
        const ttfb = navigation.responseStart - navigation.requestStart;
        const fcp = performance.getEntriesByName("first-contentful-paint")[0]?.startTime || 0;

        console.log("⏱️  Performance Metrics:");
        console.log(`   TTFB: ${Math.round(ttfb)}ms ${ttfb < 600 ? "✅" : "⚠️"}`);
        console.log(`   FCP: ${Math.round(fcp)}ms ${fcp < 1800 ? "✅" : "⚠️"}`);
        console.log(
          `   DOM Load: ${Math.round(navigation.domContentLoadedEventEnd - navigation.navigationStart)}ms`
        );
        console.log(
          `   Page Load: ${Math.round(navigation.loadEventEnd - navigation.navigationStart)}ms`
        );
      }
    }
  } catch (error) {
    console.log("❌ Core Web Vitals test failed:", error.message);
  }
};

// Test 4: Image Optimization Check
const testImageOptimization = () => {
  console.log("🖼️  Testing Image Optimization...");
  const images = document.querySelectorAll("img");
  let optimizedCount = 0;
  let lazyCount = 0;

  images.forEach((img, index) => {
    const src = img.src || img.getAttribute("data-src");
    if (src) {
      if (src.includes(".webp") || src.includes(".avif")) {
        optimizedCount++;
      }
      if (img.loading === "lazy" || img.getAttribute("data-src")) {
        lazyCount++;
      }
    }
  });

  console.log(`   Total images: ${images.length}`);
  console.log(`   Optimized formats: ${optimizedCount} ${optimizedCount > 0 ? "✅" : "⚠️"}`);
  console.log(`   Lazy loaded: ${lazyCount} ${lazyCount > 0 ? "✅" : "⚠️"}`);
};

// Test 5: Resource Preloading Check
const testResourcePreloading = () => {
  console.log("🔗 Testing Resource Preloading...");
  const preloads = document.querySelectorAll(
    'link[rel="preload"], link[rel="prefetch"], link[rel="dns-prefetch"], link[rel="preconnect"]'
  );

  if (preloads.length > 0) {
    console.log("✅ Resource preloading active:");
    preloads.forEach((link) => {
      console.log(`   ${link.rel}: ${link.href || link.getAttribute("href")}`);
    });
  } else {
    console.log("❌ No resource preloading found");
  }
};

// Run all tests
setTimeout(() => {
  testCoreWebVitals();
  testImageOptimization();
  testResourcePreloading();
}, 2000);

// Test 6: Network Performance
const testNetworkPerformance = () => {
  console.log("🌐 Network Performance Test...");
  console.log("   Refresh the page and check the Network tab for:");
  console.log("   - (from ServiceWorker) entries");
  console.log("   - Optimal image formats (AVIF/WebP)");
  console.log("   - Fast loading times");
  console.log("   - Preloaded resources");
};

setTimeout(testNetworkPerformance, 3000);

console.log("✨ Performance test completed! Check the results above.");
console.log("📋 For detailed testing, open DevTools > Lighthouse and run a performance audit.");
