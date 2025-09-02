/**
 * Critical CSS extraction and optimization for mobile performance
 */

export const CRITICAL_CSS = `
/* Critical above-the-fold styles for mobile performance */
:root {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --radius: 0.5rem;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Critical layout classes */
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
    padding: 0 2rem;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

/* Critical typography */
.text-xl { font-size: 1.25rem; }
.text-2xl { font-size: 1.5rem; }
.text-3xl { font-size: 1.875rem; }
.text-4xl { font-size: 2.25rem; }
.font-bold { font-weight: 700; }
.font-medium { font-weight: 500; }

/* Critical spacing */
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mb-8 { margin-bottom: 2rem; }
.py-16 { padding-top: 4rem; padding-bottom: 4rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }

/* Critical flexbox */
.flex { display: flex; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.text-center { text-align: center; }

/* Critical colors */
.bg-slate-950 { background-color: #020617; }
.text-white { color: #ffffff; }
.text-gray-300 { color: #d1d5db; }

/* Critical button styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  text-decoration: none;
}

.btn-primary {
  background: hsl(var(--primary));
  color: hsl(var(--background));
}

.btn-primary:hover {
  opacity: 0.9;
}

/* Critical loading states */
.loading {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.loaded {
  opacity: 1;
  transform: translateY(0);
}

/* Skip link for accessibility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sr-only:focus {
  position: absolute;
  width: auto;
  height: auto;
  padding: 0.5rem 1rem;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
  border: 2px solid hsl(var(--primary));
  border-radius: var(--radius);
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  text-decoration: none;
  z-index: 9999;
  top: 1rem;
  left: 1rem;
}

/* Prevent layout shifts */
img {
  max-width: 100%;
  height: auto;
}

/* Critical responsive utilities */
@media (max-width: 767px) {
  .text-4xl { font-size: 2rem; }
  .text-3xl { font-size: 1.75rem; }
  .py-16 { padding-top: 2rem; padding-bottom: 2rem; }
}
`;

/**
 * Inject critical CSS for faster initial render
 */
export function injectCriticalCSS() {
  if (typeof document === 'undefined') return;

  // Check if critical CSS is already injected
  if (document.querySelector('[data-critical-css]')) return;

  const style = document.createElement('style');
  style.setAttribute('data-critical-css', 'true');
  style.textContent = CRITICAL_CSS;
  
  // Insert before other stylesheets for priority
  const firstStylesheet = document.querySelector('link[rel="stylesheet"], style');
  if (firstStylesheet) {
    document.head.insertBefore(style, firstStylesheet);
  } else {
    document.head.appendChild(style);
  }
}

/**
 * Preload non-critical CSS after page load
 */
export function preloadNonCriticalCSS() {
  if (typeof document === 'undefined') return;

  const loadCSS = (href: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    link.onload = function() {
      if (link instanceof HTMLLinkElement) {
        link.rel = 'stylesheet';
      }
    };
    document.head.appendChild(link);
  };

  // Load non-critical stylesheets after initial render
  requestAnimationFrame(() => {
    // Add your non-critical CSS files here
    // loadCSS('/path/to/non-critical.css');
  });
}

export default { injectCriticalCSS, preloadNonCriticalCSS };
