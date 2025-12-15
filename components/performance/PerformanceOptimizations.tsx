import Script from "next/script";

export function PerformanceOptimizations() {
  return (
    <>
      {/* Preload critical fonts */}
      <link
        rel="preload"
        href="/_next/static/media/inter-latin.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />

      {/* DNS prefetch for external services */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />

      {/* Preconnect to critical domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Critical CSS for above-the-fold content */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          /* Critical CSS for hero section - inline for fastest rendering */
          .hero-gradient {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          
          .glass-effect {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.1);
          }
          
          /* Prevent layout shift */
          .hero-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
          }
          
          /* Optimize font loading */
          .font-display-swap {
            font-display: swap;
          }
        `,
        }}
      />

      {/* Service Worker for caching */}
      <Script
        id="service-worker"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js');
              });
            }
          `,
        }}
      />
    </>
  );
}
