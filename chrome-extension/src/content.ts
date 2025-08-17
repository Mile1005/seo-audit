// Interfaces
export interface LinkAnalysis {
  href: string;
  text: string;
  rel: string | null;
  isInternal: boolean;
}

export interface ImageAnalysis {
  src: string;
  alt: string;
  hasAlt: boolean;
}

export interface PageElements {
  title: string;
  metaDescription: string | null;
  canonical: string | null;
  robots: string | null;
  viewport: string | null;
  openGraph: Record<string, string>;
  twitterCard: Record<string, string>;
  jsonLdTypes: string[];
}

export interface SEOData {
  page: PageElements;
  headings: { tag: string; text: string }[];
  headingCounts: Record<string, number>;
  images: ImageAnalysis[];
  links: LinkAnalysis[];
  wordCount: number;
  readability: {
    fleschKincaid: number | null;
    readingTimeMin: number;
  };
  coreWebVitals: {
    lcp: number | null;
    cls: number | null;
    inp: number | null;
  };
}

// Extraction functions
function extractPageElements(): PageElements {
  const title = document.title;
  const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || null;
  const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || null;
  const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content') || null;
  const viewport = document.querySelector('meta[name="viewport"]')?.getAttribute('content') || null;

  // Open Graph
  const ogTags: Record<string, string> = {};
  document.querySelectorAll('meta[property^="og:"]').forEach(meta => {
    const prop = meta.getAttribute('property');
    if (prop) ogTags[prop] = meta.getAttribute('content') || '';
  });
  // Twitter Card
  const twitterTags: Record<string, string> = {};
  document.querySelectorAll('meta[name^="twitter:"]').forEach(meta => {
    const name = meta.getAttribute('name');
    if (name) twitterTags[name] = meta.getAttribute('content') || '';
  });
  // JSON-LD
  const jsonLdTypes: string[] = [];
  document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
    try {
      const json = JSON.parse(script.textContent || '{}');
      if (json['@type']) {
        if (Array.isArray(json['@type'])) {
          json['@type'].forEach((t: string) => jsonLdTypes.push(t));
        } else {
          jsonLdTypes.push(json['@type']);
        }
      }
    } catch {}
  });
  return { title, metaDescription, canonical, robots, viewport, openGraph: ogTags, twitterCard: twitterTags, jsonLdTypes };
}

function extractHeadings() {
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
    tag: h.tagName,
    text: h.textContent?.trim() || ''
  }));
  const headingCounts: Record<string, number> = {};
  headings.forEach(h => {
    headingCounts[h.tag] = (headingCounts[h.tag] || 0) + 1;
  });
  return { headings, headingCounts };
}

function extractImages(): ImageAnalysis[] {
  return Array.from(document.getElementsByTagName('img')).map(img => ({
    src: img.src,
    alt: img.alt,
    hasAlt: !!img.alt
  }));
}

function extractLinks(): LinkAnalysis[] {
  const origin = window.location.origin;
  return Array.from(document.getElementsByTagName('a')).map(a => ({
    href: a.href,
    text: a.textContent?.trim() || '',
    rel: a.getAttribute('rel'),
    isInternal: a.href.startsWith(origin)
  }));
}

function getWordCount(): number {
  const text = document.body.innerText || '';
  return text.split(/\s+/).filter(Boolean).length;
}

function getFleschKincaid(text: string): number | null {
  // Simple FK calculation (not perfect, but works for demo)
  const sentences = text.split(/[.!?]+/).length;
  const words = text.split(/\s+/).length;
  const syllables = text.split(/[aeiouy]+/gi).length;
  if (sentences === 0 || words === 0) return null;
  return 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
}

function getReadingTime(wordCount: number): number {
  return Math.round(wordCount / 200); // 200 wpm
}

// Core Web Vitals observer
let lcp: number | null = null;
let cls: number | null = null;
let inp: number | null = null;

if ('PerformanceObserver' in window) {
  try {
    // LCP
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      if (lastEntry && lastEntry.startTime) lcp = lastEntry.startTime;
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    // CLS
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries() as any) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      cls = clsValue;
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
    // INP
    const inpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      if (lastEntry && lastEntry.startTime) inp = lastEntry.startTime;
    });
    inpObserver.observe({ type: 'event', buffered: true });
  } catch {}
}

function collectSEOData(): SEOData {
  const page = extractPageElements();
  const { headings, headingCounts } = extractHeadings();
  const images = extractImages();
  const links = extractLinks();
  const wordCount = getWordCount();
  const text = document.body.innerText || '';
  const fleschKincaid = getFleschKincaid(text);
  const readingTimeMin = getReadingTime(wordCount);
  return {
    page,
    headings,
    headingCounts,
    images,
    links,
    wordCount,
    readability: {
      fleschKincaid,
      readingTimeMin
    },
    coreWebVitals: {
      lcp,
      cls,
      inp
    }
  };
}

// Content script bootstrap for overlay/analysis
import { analyzeDOM } from './analysis/analyzer';
import { placeBadges, clearBadges } from './overlay/badges';
import './overlay/index';

let overlayVisible = false;
let sidebarOpen = false;
let lastResult = null;
let overlayMounted = false;
let lastUrl = location.href;
let debounceTimer: number | null = null;

function showOverlay(result) {
  if (overlayMounted) return;
  placeBadges(result.issues);
  window.dispatchEvent(new CustomEvent('seo-audit-analysis', { detail: { result } }));
  overlayVisible = true;
  overlayMounted = true;
  chrome.storage.sync.set({ overlayVisible: true });
}
function hideOverlay() {
  clearBadges();
  window.dispatchEvent(new CustomEvent('seo-audit-close-sidebar'));
  overlayVisible = false;
  overlayMounted = false;
  chrome.storage.sync.set({ overlayVisible: false });
}
function toggleOverlay() {
  if (overlayVisible) hideOverlay(); else showOverlay(lastResult || { issues: [] });
}
function openSidebar() {
  window.dispatchEvent(new CustomEvent('seo-audit-open-sidebar'));
  sidebarOpen = true;
  chrome.storage.sync.set({ sidebarOpen: true });
}
function closeSidebar() {
  window.dispatchEvent(new CustomEvent('seo-audit-close-sidebar'));
  sidebarOpen = false;
  chrome.storage.sync.set({ sidebarOpen: false });
}
function toggleSidebar() {
  if (sidebarOpen) closeSidebar(); else openSidebar();
}

function debouncedAnalyze() {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(() => {
    const result = analyzeDOM();
    lastResult = result;
    if (overlayVisible) {
      clearBadges();
      placeBadges(result.issues);
      window.dispatchEvent(new CustomEvent('seo-audit-analysis', { detail: { result } }));
    }
  }, 400);
}

// Listen for ANALYZE message
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === 'ANALYZE') {
    const result = analyzeDOM();
    lastResult = result;
    showOverlay(result);
    openSidebar();
  }
});

// Hotkeys
window.addEventListener('keydown', (e) => {
  if (e.altKey && e.shiftKey && e.code === 'KeyO') {
    toggleOverlay();
  }
  if (e.altKey && e.shiftKey && e.code === 'KeyS') {
    toggleSidebar();
  }
});

// Restore persisted state
chrome.storage.sync.get(['overlayVisible', 'sidebarOpen'], (data) => {
  overlayVisible = !!data.overlayVisible;
  sidebarOpen = !!data.sidebarOpen;
  if (overlayVisible) {
    const result = analyzeDOM();
    lastResult = result;
    showOverlay(result);
  }
  if (sidebarOpen) openSidebar();
});

// MutationObserver for DOM changes (debounced)
const observer = new MutationObserver(() => {
  debouncedAnalyze();
});
observer.observe(document.body, { childList: true, subtree: true, attributes: true });

// SPA navigation detection
function onUrlChange() {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    debouncedAnalyze();
  }
}
const origPushState = history.pushState;
history.pushState = function (...args) {
  origPushState.apply(this, args);
  onUrlChange();
};
const origReplaceState = history.replaceState;
history.replaceState = function (...args) {
  origReplaceState.apply(this, args);
  onUrlChange();
};
window.addEventListener('popstate', onUrlChange);
